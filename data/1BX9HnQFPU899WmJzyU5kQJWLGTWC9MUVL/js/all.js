

/* ---- data/1BX9HnQFPU899WmJzyU5kQJWLGTWC9MUVL/js/lib/ZeroFrame.js ---- */


const CMD_INNER_READY = 'innerReady'
const CMD_RESPONSE = 'response'
const CMD_WRAPPER_READY = 'wrapperReady'
const CMD_PING = 'ping'
const CMD_PONG = 'pong'
const CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
const CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

class ZeroFrame {
    constructor(url) {
        this.url = url
        this.waiting_cb = {}
        this.connect()
        this.next_message_id = 1
        this.init()
    }

    init() {
        return this
    }

    connect() {
        this.target = window.parent
        window.addEventListener('message', e => this.onMessage(e), false)
        this.cmd(CMD_INNER_READY)
    }

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === CMD_RESPONSE) {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            }
            else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === CMD_WRAPPER_READY) {
            this.cmd(CMD_INNER_READY)
        } else if (cmd === CMD_PING) {
            this.response(message.id, CMD_PONG)
        } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
            this.onOpenWebsocket()
        } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
            this.onCloseWebsocket()
        } else {
            this.route(cmd, message)
        }
    }

    route(cmd, message) {
        this.log("Unknown command", message)
    }

    response(to, result) {
        this.send({
            cmd: CMD_RESPONSE,
            to: to,
            result: result
        })
    }

    cmd(cmd, params={}, cb=null) {
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    send(message, cb=null) {
        message.id = this.next_message_id
        this.next_message_id++
        this.target.postMessage(message, '*')
        if (cb) {
            this.waiting_cb[message.id] = cb
        }
    }

    log(...args) {
        console.log.apply(console, ['[ZeroFrame]'].concat(args))
    }

    onOpenWebsocket() {
        this.log('Websocket open')
    }

    onCloseWebsocket() {
        this.log('Websocket close')
    }
}

//export default ZeroFrame


/* ---- data/1BX9HnQFPU899WmJzyU5kQJWLGTWC9MUVL/js/ZeroGram.js ---- */


const NOTIF_TIMEOUT = 3000;

class ZeroGram extends ZeroFrame {

	/*constructor() {
		this.site_info = {};
		this.data = {};
	}*/


	init() {
		this.addLine ("inited!");
	}
				
	addLine(line) {
		var messages = document.getElementById("messages");
		messages.innerHTML = messages.innerHTML + "<li>" + line + "</li>";
	}
	
	/*loadMessages: ->
		query = """
			SELECT message.*, keyvalue.value AS cert_user_id FROM message
			LEFT JOIN json AS data_json USING (json_id)
			LEFT JOIN json AS content_json ON (
				data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
			)
			LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
			ORDER BY date_added
		"""
		@cmd "dbQuery", [query], (messages) =>
			document.getElementById("messages").innerHTML = ""  # Always start with empty messages
			for message in messages
				body = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;")  # Escape html tags in body
				@addLine "<i>#{message.cert_user_id}:</i> #{body}"
			document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight 
		@log "scrollTop " + document.getElementById("main").scrollTop
		@log "Messages loaded"*/		

	// Get public key (ECIES) for cert_user_id (joe@zeroid.bit)
	/*getPublickey: (cert_user_id) ->
		query = """
			SELECT directory FROM keyvalue
			LEFT JOIN json USING (json_id)
			WHERE value = '#{cert_user_id}'
		"""
		@log query
		ans = @cmd "dbQuery", query
    	if ans.error or ans.length == 0 # Db not ready yet or No user found
        	@log "dbQuery ERROR: " + JSON.stringify(ans, undefined, '\t')
        	return false
        @log "dbQuery OK: " + JSON.stringify(ans, undefined, '\t')		
		inner_path = ans[0].directory
		@log "inner_path: #{inner_path}"
		res = @dataRead inner_path
		if res
			data = JSON.parse(res)
			return data.publickey
		else
			return false*/
			
	decodeSettings(settings_enc) {
		
		this.cmd("eciesDecrypt", settings_enc, (settings_str) => {settings_json = JSON.parse(settings_str)});
		return settings_json;			
	}

	encodeSettings(settings_json) {
		var settings_enc = null;
		
		return settings_enc; 
	}
	
	/*addSecret: (cert_user_id, cb) ->
		@getPublickey cert_user_id, (publickey) =>
			if not publickey
				@cmd "wrapperNotification", ["error", "No publickey for user #{cert_user_id}", NOTIF_TIMEOUT]
				@log "ERROR getPublickey: No publickey for user #{cert_user_id}"
				cb false
				return
			@log "publickey found: #{publickey}"	
			@cmd "aesEncrypt", [""], (aes_res) =>  # Generate new random AES key
				secret_data = @jsonEncode({"key": aes_res.key, "iv": aes_res.iv})
				# Encrypt the new key for remote user
				@log "AES key generated: #{aes_res.key}"
				@cmd "eciesEncrypt", [secret_data, publickey], (secret) =>  
					# Add secrret for remote user
					@data.secrets[@getNewIndex("secret")] = secret
				# Decrypt my settings
				@log "data updated: " + JSON.stringify(@data, undefined, '\t')
				@log "encoded old settings: #{@data.settings}"
				@getSettings @data.settings, (settings_json) =>
					# Add secret for me
					@log "old settings: " + JSON.stringify(settings_json, undefined, '\t')
					settings_json.secrets_sent[cert_user_id] = secret_data
					# Encrypt my settings
					@log "new settings: " + JSON.stringify(settings_json, undefined, '\t')
					@saveSettings settings_json, (settings_enc) =>
						# Save settings
						@data.settings = settings_enc
						@log "encoded new settings: #{@data.settings}"
			# Update data file
			inner_path = @getInnerPath()
			@dataWrite @data, inner_path, (res_write) =>
				if not res_write
					@log "ERROR dataWrite: Can't write file with updated data"
					cb false
					return
				else
					@log "OK: File udated"
					cb true
					return	*/
						

	// Find new avalible index
	/*getNewIndex: (node) ->
		new_index = Date.now()
		for i in [0..100]  # Find a free index
			if not @data[node][new_index+i]
				return new_index+i*/

	/*jsonEncode: (obj) ->
		return unescape(encodeURIComponent(JSON.stringify(obj)))

	jsonDecode: (obj) ->
		return JSON.parse(decodeURIComponent(escape(obj)))*/

	//Check object emptyness
	isEmptyObject(obj) {
		return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
	}

	//Get path to user's data file			
	getInnerPath() {
		return "data/users/"+ this.site_info.auth_address + "/data.json"; // This is our data file
	}
	//Get publickey for current user
	
	
	// Read user's data file
	
					
	
	//Write user's data file				
	dataWrite() {
		var settings_str = unescape(encodeURIComponent(JSON.stringify(this.data.settings, undefined, '\t')));
		this.cmd("eciesEncrypt", settings_str, (res_set_enc) => {
			var data_write = {};			
			data_write.publickey = this.data.publickey;
			data_write.secrets = this.data.secrets;
			data_write.messages = this.data.messages;
			data_write.settings = res_set_enc;
			// Encode data array to utf8 json text
			var json_raw = unescape(encodeURIComponent(JSON.stringify(data_write, undefined, '\t')));
			// Write file to disk
			this.cmd("fileWrite", [this.inner_path, btoa(json_raw)], (res_write) => {
				if (res_write === "ok") {
					this.log("(fileWrite): File write OK.");
					//Publish the file to other users
					this.cmd ("sitePublish", {"inner_path": this.inner_path}, (res_pub) => {
						if (res_pub === "ok") {
							this.log("(sitePublish): File publish OK.");
							return res_pub;
						} else {
							this.log("ERROR (sitePublish): " + JSON.stringify(res_pub, undefined, '\t'));
							return res_pub;
						}
					});							
				} else {
					this.log("ERROR (fileWrite): " + JSON.stringify(res_write, undefined, '\t'));
					return res_write;
				}
			});
		});				
	}			

	//Add new contact
	/*addContact: ->
		if not @site_info.cert_user_id  # No account selected, display error
			@cmd "wrapperNotification", ["info", "Please, select your account.", NOTIF_TIMEOUT]

		@cmd "wrapperPrompt", ["Enter contact ID:", "text"], (contact_id) =>
			if not contact_id
				@cmd "wrapperNotification", ["error", "You didn't enter anything.", NOTIF_TIMEOUT]
			else
				@addSecret contact_id, (res_add) =>
					if not res_add
						@cmd "wrapperNotification", ["error", "Error adding user #{contact_id}.", NOTIF_TIMEOUT]	
					else
						@cmd "wrapperNotification", ["info", "Succesfully added #{contact_id}.", NOTIF_TIMEOUT]	
	
		//check user func
		@log "route: #{@data}"
				inner_path = @getInnerPath()
				@dataRead inner_path, (data_read) =>					
					@log "data: #{data_read}"
					if not data_read #user file is empty or doen't exist
						@cmd "userPublickey", [], (key) =>
							if key.error
								@cmd "wrapperNotification", ["error", "Publickey read error: #{key.error}", NOTIF_TIMEOUT]
								return false
							else #good key is returned
								@log "userPublickey: #{key}"
								@data = { "publickey": key, "secrets": {}, "messages": {}, "settings": "" }
								@dataWrite @data, inner_path, (res_write) =>
									if res_write
										document.getElementById("select_user").innerHTML = message.params.cert_user_id
										@log "New user created. Add some contacts to chat with!"
									else
										document.getElementById("select_user").innerHTML = "Error. Try again"
										@log "ERROR dataWrite: Look at previous messages"
					else
						@data = data_read
						document.getElementById("select_user").innerHTML = message.params.cert_user_id
						@log "data: " + JSON.stringify(@data, undefined, '\t') 
						if @isEmptyObject @data.secrets						
							@cmd "wrapperNotification", ["info", "Add some contacts to chat with!", NOTIF_TIMEOUT]				
						
*/



		
		/*	
		#inner_path = "content.json"    
		# Load our current messages
		#@cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
			#@addLine "siteInfo response: <pre>" + JSON.stringify(data,null,2) + "</pre>"	*/


	// Wrapper websocket connection ready
	onOpenWebsocket(e) {
		this.cmd("siteInfo", {}, (res) => {
			this.log("res:", JSON.stringify(res));
			this.site_info = res; // Save site info data to allow access it later
			if (res.cert_user_id) {
				this.loadUserData();				
			} else {
				document.getElementById("select_user").innerHTML = "Select user";
				document.getElementById("message").disabled = true;
				document.getElementById("send").disabled = true;
			}
		});		
	}

	selectUser() {
		this.cmd('certSelect', { accepted_domains: ['zeroid.bit'] });
	}

	//Message from ZeroNet is received
	route(cmd, message) {
		if (cmd == "setSiteInfo") {
			this.site_info = message.params;  // Save site info data to allow access it later
			this.log("site_info.cert_user_id: " + this.site_info.cert_user_id);
			if (this.site_info.cert_user_id) {
				this.loadUserData();				
			} else { //user has not cert id
				document.getElementById("message").disabled = true;
				document.getElementById("send").disabled = true;
				document.getElementById("select_user").innerHTML = "Select user";
				document.getElementById("messages").innerHTML = "Select user to start messaging";
			}
			 // Reload messages if new file arrives
			//if message.params.event[0] == "file_done"
				//this.loadMessages()
		}
	}

	loadUserData() {
		this.inner_path = this.getInnerPath();
		this.log ("(dataRead) Loading user file...", this.inner_path);
		this.cmd( "fileGet", [this.inner_path, false], (res_read) => {
			if (res_read === null || res_read === "") { //file dont exist or empty
				this.log("(loadUserData): File is empty or doesn't exist.")
				this.log ("(getUserPublickey) Getting my publickey...");
				this.cmd("userPublickey", [], (res_key) => {
					this.log ("(getUserPublickey): Got key " + res_key);
					if (res_key) {
						this.data = { "publickey": res_key, "secrets": {}, "messages": {}, "settings": "" };
						this.dataWrite();						
					} else {
						document.getElementById("select_user").innerHTML = "Error";
						document.getElementById("messages").innerHTML = "User publickey error";
					}
				});
			} else {
				var data_read = JSON.parse(res_read);
				this.data = {};
				this.data.publickey = data_read.publickey;
				this.data.secrets = data_read.secrets;
				this.data.messages = data_read.messages;
				this.cmd("eciesDecrypt", data_read.settings, (settings_str) => {
					this.data.settings = JSON.parse(settings_str);
					this.renderContacts();
					if (this.data.settings === "" || this.isEmptyObject(this.data.settings.secrets_sent)) {
						document.getElementById("messages").innerHTML = "Add some contacts to chat with.";
					} else {
						document.getElementById("messages").innerHTML = "Choose contact to chat.";
					}
				});
				document.getElementById("select_user").innerHTML = this.site_info.cert_user_id;
						
			}
		});
	}

	renderContacts() {
		document.getElementById("personal").innerHTML = "not found";
	}

	/*sendMessage: =>
		if not @site_info.cert_user_id  # No account selected, display error
			@cmd "wrapperNotification", ["info", "Please, select your account.", NOTIF_TIMEOUT]
			return false
		document.getElementById("message").value = ""  # Reset the message input
		return false	*/	
}

window.Page = new ZeroGram();