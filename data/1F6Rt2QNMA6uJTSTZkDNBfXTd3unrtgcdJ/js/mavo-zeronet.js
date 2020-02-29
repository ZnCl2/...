// Mavo storage decentralized and P2P backend using ZeroNet
// Based on https://github.com/lizziew/mavo-firebase/blob/master/mavo-firebase.js
// Version: 0.1.0

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
			} else
				console.log("Unknown incoming message:", cmd)
		}
		return zero_frame
	},

	isAuthenticated: function() {
		return (this.user.name != null)
	},

	updateUser: function() {
		if (this.zero_frame.site_info) {
			this.user = {name: this.zero_frame.site_info.cert_user_id}
			if (this.mavo.element.getAttribute("mv-data-user") && this.zero_frame.site_info.cert_user_id) {
				// Logged in
				this.inner_path = this.mavo.element.getAttribute("mv-data-user").replace("{auth_address}", this.zero_frame.site_info.auth_address)
				this.content_inner_path = this.mavo.element.getAttribute("mv-data-user").replace("{auth_address}", this.zero_frame.site_info.auth_address)
				this.privatekey = null
				this.permissions.on(["save", "edit", "delete", "add"])
				this.permissions.off(["login"]).on("logout")
			} else {
				// Logged out
				this.inner_path = this.mavo.element.getAttribute("mv-data")
				this.content_inner_path = this.mavo.element.getAttribute("mv-content") || "content.json"
				this.privatekey = "stored"
				if (this.mavo.element.getAttribute("mv-data-user")) // Allow login
					this.permissions.on(["login"]).off("logout")
			}
			if (this.zero_frame.site_info.settings.own) // Site owner always able to edit
				this.permissions.on(["save", "edit", "delete", "add"])
		}
		this.updateData()
	},

	get: function() {
		this.mavo.progress = "loading"
		if (!this.zero_frame.site_info)
			return Promise.resolve({})

		return (new Promise((resolve, reject) => {
			this.zero_frame.cmd("fileGet", [this.inner_path, false], (res) => {
				var back = {}
				if (res) {
					back = JSON.parse(res)[this.mavo.id]
				}
				this.mavo.element.style.display = null
				resolve(back)

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
			this.zero_frame.cmd("certSelect", [], (res) => {
				this.updateUser()
				resolve()
			})
		}))
	},

	logout: function() {
		return (new Promise((resolve, reject) => {
			this.zero_frame.cmd("certSelect", [], (res) => {
				mavo_storage.mavo.root.clear()
				this.updateUser()
				resolve()
			})
		}))
	},

	put: function(data, path = this.path, o = {}) {
		var data_obj = JSON.parse(data)

		return (new Promise((resolve, reject) => {
			this.zero_frame.cmd("fileGet", [this.inner_path, false], (res) => {
				var doc = JSON.parse(res)
				if (!doc) doc = {}
				doc[this.mavo.id] = data_obj
				var data_b64 = btoa(unescape(encodeURIComponent(JSON.stringify(doc, undefined, '\t'))))
				this.zero_frame.cmd("fileWrite", [this.inner_path, data_b64], (res) => {
					if (res != "ok")
						return reject(res)

					this.updateData()

					this.zero_frame.cmd("sitePublish", {"inner_path": this.content_inner_path, "privatekey": this.privatekey}, (res) => {
						if (res == "ok")
							resolve()
						else
							reject(res)
					})
				})
			})

		}))
	},

	upload: function(file, path) {
		return (new Promise((resolve, reject) => {
			Mavo.readFile(file).then(data_url => {
				data_b64 = data_url.replace(/.*?,/, "")
				inner_path = this.inner_path.replace(/(.*\/).*?$/, "$1")+path
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
			if(url.indexOf("zeronet") !== -1) {
				return url
			}
			else {
				return false
			}
		},
	}
}))

})(Bliss)
