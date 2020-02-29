// Mavo storage decentralized and P2P backend using ZeroNet and global data
// Based on https://github.com/lizziew/mavo-firebase/blob/master/mavo-firebase.js
// Version: 0.1.0

function debug () {}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

(function($) {

    if (!self.Mavo) {
	return
    }
    
    Mavo.Plugins.url = "js"
    
    var _ = Mavo.Backend.register($.Class({
	extends: Mavo.Backend,
	id: "ZeroNet",
	constructor: function() {
	    this.zero_frame = this.createZeroFrame()
	    this.updateUser()

	    window.mavo_storage = this
	    Mavo.hooks.add("domexpression-update-end", env => {
		// Call this.updateUser() if the value of mv-data-query-* changed
		if (env.context.attribute && env.context.attribute.match(/^mv-data-query-(?<table>[a-zA-Z\_]+)$/) && !arraysEqual(env.context.oldValue, env.context.value)) {
		    this.updateUser()
		}
	    });
	},

	createZeroFrame: function() {
	    var zero_frame = new ZeroFrame()
	    zero_frame.site_info = null
	    zero_frame.onOpenWebsocket = () => {
		zero_frame.cmd("siteInfo", [], (site_info) => {
		    zero_frame.site_info = site_info
		    this.updateUser()
		})
	    }
	    zero_frame.onRequest = (cmd, message) => {
		if (cmd == "setSiteInfo") {
		    zero_frame.site_info = message.params
		    if (zero_frame.site_info.event && zero_frame.site_info.event[0] == "cert_changed")
			this.updateUser()
		    if (message.params.event != undefined && message.params.event[0] == "file_done")
			this.updateUser()
		} else
		    console.log("Unknown incoming message:", cmd)
	    }
	    return zero_frame
	},
	
	isAuthenticated: function() {
	    return (this.user.name != null)
	},
	
	/* For the mavo element we should have the following attributes for the storage:
	 * mv-data-write: Data that can be edited by the current user.
	 *                Can contain {auth_address}
	 * mv-data-query-*: SELECT statement for getting data for the current element when logged in.
	 * ----------------------------------------------------------------------------------------------------
	 * Logged in user: mv-data-query-logged-in
	 * Logged in user write to: mv-data-write
	 * Logged out user: mv-data-query-logged-out
	 * ----------------------------------------------------------------------------------------------------
	 * Example for topic and comments:
	 * TABLES:
	 *   TOPIC: topic_id INT AUTOINCREMENT
	 *          title TEXT
	 *          body TEXT
	 *          publish_date DATE
	 *   COMMENT: comment_id INT AUTOINCREMENT
	 *            topic_id INT
	 *            body TEXT
	 * 
	 * QUERIES:
	 *   mv-data-query-topic: SELECT * FROM topic ORDER BY publish_date DESC LIMIT 10;
	 *   mv-data-query-comment: SELECT * FROM comment WHERE topic_id IN (SELECT id FROM topic ORDER BY publish_date DESC LIMIT 10);
	 *
	 * FRAMEWORK: The code in javascript will execute both queries and will return the topic query, which is specified as principal,
	 *            inserting the comments with topic_id = to the topic one as subkeys in topic.comment
	 */
	updateUser: function() {
	    this.key_only = this.mavo.element.getAttribute("mv-data-only-query").split(" ")
	    if (this.zero_frame.site_info) {
		this.user = { name: this.zero_frame.site_info.cert_user_id, auth_id: this.zero_frame.site_info.auth_address }
		window.user = this.user
		this.db_query = {}
		for (let attribute of this.mavo.element.attributes) {
		    let match = attribute.nodeName.match(/^mv-data-query-(?<table>[a-zA-Z\_]+)$/)
		    if (match)
			this.db_query[match.groups.table] = attribute.nodeValue.replace("{auth_address}", this.zero_frame.site_info.auth_address)
		}
		if (this.mavo.element.getAttribute("mv-data-write") && this.zero_frame.site_info.cert_user_id) {
		    // Logged in user
		    this.inner_path = this.mavo.element.getAttribute("mv-data-write").replace("{auth_address}", this.zero_frame.site_info.auth_address)
		    this.content_inner_path = this.mavo.element.getAttribute("mv-data-write").replace("{auth_address}", this.zero_frame.site_info.auth_address)
		    this.privatekey = null
		    this.permissions.on(["save", "edit", "add"])
		    this.permissions.off(["login"]).on("logout")
		} else {
		    // Logged out user
		    this.content_inner_path = this.mavo.element.getAttribute("mv-content") || "content.json"
		    this.privatekey = "stored"
		    if (this.mavo.element.getAttribute("mv-data-write")) // Allow login
			this.permissions.on(["login"]).off("logout")
		}
		if (this.zero_frame.site_info.settings.own) // Site owner always able to edit
		    this.permissions.on(["save", "edit", "delete", "add"])
	    }
	    this.accepted_domain = this.mavo.element.getAttribute("mv-zeronet-accepted-domain")
	    this.updateData()
	},
	
	get: function() {
	    this.mavo.progress = "loading"
	    if (!this.zero_frame.site_info)
		return Promise.resolve({})
	    
	    return (new Promise((resolve, reject) => {
		let back = {}
		let promises = []
		for (let key of Object.keys(this.db_query)) {
		    promises.push(new Promise((resolve, reject) => {
			this.zero_frame.cmd("dbQuery", [this.db_query[key]], (res) => {
			    console.log("Query " + this.db_query[key] + " gave result: " + JSON.stringify(res))
			    back[key] = res ? res : []
			    resolve()
			})
		    }))
		}
		Promise.all(promises).then(() => {
		    // Save the ids of the returned objects
		    this.returned_objects = {}
		    for (let key of Object.keys(back)) {
			this.returned_objects[key] = {}
			console.log("Back[key] is: " + JSON.stringify(back[key]) + " for key " + key)
			for (let row of back[key])
			    this.returned_objects[key][row.id] = true
		    }
		    let toret = db_join(back)
		    // Returning only objects of the prescribed tables
		    for (let key of Object.keys(toret))
			if (this.key_only.indexOf(key) == -1)
			    delete toret[key]
		    this.mavo.element.style.display = null
		    console.log("Giving back object: " + JSON.stringify(toret))
		    resolve(toret)
		})
	    }))
	},

	updateData: function() {
	    this.load().then( (res) => this.mavo.render(res) )
	},

	login: function() {
	    var saving = this.mavo.inProgress
	    if (this.isAuthenticated() || saving && this.privatekey)  // Don't show login dialog if already logged in or when saving to site file
		return Promise.resolve()
	    
	    return (new Promise((resolve, reject) => {
		let domains = this.accepted_domain ? [[this.accepted_domain]] : []
		this.zero_frame.cmd("certSelect", domains, (res) => {
		    this.updateUser()
		    resolve()
		})
	    }))
	},
	
	logout: function() {
	    // return (new Promise((resolve, reject) => {
	    // 	this.user = null
	    // 	resolve()
	    // }))

	    return (new Promise((resolve, reject) => {
	    	let domains = this.accepted_domain ? [[this.accepted_domain]] : []
	    	this.zero_frame.cmd("certSelect", domains, (res) => {
	    	    this.updateUser()
	    	    resolve()
	    	})
	    }))
	},

	put: function(data, path = this.path, o = {}) {
	    var data_obj = JSON.parse(data)

	    return (new Promise((resolve, reject) => {
		this.zero_frame.cmd("fileGet", [this.inner_path, false], (res) => {
		    var file_doc = JSON.parse(res)
		    if (!file_doc) file_doc = {}
		    // PATCHING doc[this.mavo.id] = data_obj
		    console.log("current mavo state: " + data)
		    mavo_doc = db_separate(data_obj)
		    // We now filter out the entries that don't come from our user
		    // and we delete cert_auth_user, cert_user_id, json_id, file_name, directory, site
		    for (let table of Object.keys(mavo_doc)) {
			for (let i = 0; i < mavo_doc[table].length; i++) {
			    let row = mavo_doc[table][i]
			    console.log("Now considering row: " + JSON.stringify(row))
			    if (row.directory != undefined && row.directory != this.zero_frame.site_info.auth_address) {
				console.log("Deleting row because directory is: " + row.directory + " and cert_auth_user " + this.zero_frame.site_info.auth_address)
				mavo_doc[table].splice(i, 1)
				i--
			    } else {
				console.log("Deleting unuseful variables")
				delete row["cert_user_id"]
				delete row["json_id"]
				delete row["file_name"]
				delete row["directory"]
				delete row["site"]
				delete row["error"]
				console.log("Row after deletions is: " + JSON.stringify(row, null, 2))
			    }
			}
		    }
		    // Now we update only the objects who were returned previously and those added
		    var object_map = {} // map id --> array index
		    for (let table of Object.keys(mavo_doc)) {
			object_map[table] = {}
			for (let i = 0; i < mavo_doc[table].length; i++) {
			    let row = mavo_doc[table][i]
			    object_map[table][row.id] = i
			}
		    }
		    console.log("Object map: " + JSON.stringify(object_map, null, 2))

		    for (let table of Object.keys(mavo_doc)) {
			file_doc[table] = file_doc[table] ? file_doc[table] : []
			console.log("Now considering table " + table + " where filedoc length: " + file_doc[table].length + " where file_doc is: " + JSON.stringify(file_doc[table], null, 2))
			console.log("Returned objects: " + JSON.stringify(this.returned_objects, null, 2))
			for (let i = 0; i < file_doc[table].length; i++) {
			    let row = file_doc[table][i]
			    let mavo_id = object_map[table][row.id]
			    let was_returned = this.returned_objects[table] ? this.returned_objects[table][row.id] : undefined
			    if (mavo_id != undefined) {
				console.log("Cloning " + JSON.stringify(mavo_doc[table][mavo_id], null, 2))
				file_doc[table][i] = mavo_doc[table][mavo_id]
			    } else if (mavo_id == undefined && was_returned) {
				delete file_doc[table][i]
				i--
			    }
			    delete object_map[table][row.id]
			}
			// At the end we add those lines that were added
			console.log("Now object map is:  " + JSON.stringify(object_map, null, 2))
			for (let row_table_id of Object.keys(object_map[table])) {
			    let mavo_id = object_map[table][row_table_id]
			    file_doc[table].push(mavo_doc[table][mavo_id])
			}
		    }
		    console.log("At the end we write: " + JSON.stringify(file_doc, null, 2))
		    var data_b64 = btoa(unescape(encodeURIComponent(JSON.stringify(file_doc, null, 2))))
		    this.zero_frame.cmd("fileWrite", [this.inner_path, data_b64], (res) => {
			if (res != "ok")
			    return reject(res)

			let slim_content = {
			    "files": {},
			    "optional": "update/.*",
			    "files_optional": {}
			}
			let slim_content_b64 = btoa(unescape(encodeURIComponent(JSON.stringify(slim_content, null, 2))))
			this.zero_frame.cmd("fileWrite", [this.inner_path.replace("/data.json", "/content.json"), slim_content_b64], (res) => {
			    if (res != "ok")
				return rejected(res)
			
			    this.zero_frame.cmd("sitePublish", {"inner_path": this.content_inner_path, "privatekey": this.privatekey}, (res) => {
				if (res == "ok")
				    resolve()
				else
				    reject(res)
			    })
			})
		    })
		})
	    }))
	},

	upload: function(file, path) {
	    console.log("Called upload with path " + path + " with file: " + JSON.stringify(file, null, 2))
	    return (new Promise((resolve, reject) => {
		Mavo.readFile(file).then(data_url => {
		    data_b64 = data_url.replace(/.*?,/, "")
		    inner_path = this.inner_path.replace(/(.*\/).*?$/, "upload/$1") + path
		    console.log("Inner_path: " + inner_path)
		    this.zero_frame.cmd("fileWrite", [inner_path, data_b64], (res) => {
			if (res != "ok")
			    return reject(res)

			resolve(inner_path)
		    })
		})
	    }))
	},

	static: {
	    test: function(url) {
		if(url.indexOf("zn_global") !== -1) {
		    return url
		}
		else {
		    return false
		}
	    },
	}
    }))
})(Bliss)
