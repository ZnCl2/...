class ZeroChat extends ZeroFrame
	init: ->
		@addLine "inited!"
		
		
		
	selectUser: =>
		Page.cmd "certSelect", [["zeroid.bit"]]
		return false
		
		
	route: (cmd, message) ->
		if cmd == "setSiteInfo"
			if message.params.cert_user_id
				document.getElementById("select_user").innerHTML = message.params.cert_user_id
			else
				document.getElementById("select_user").innerHTML = "Select user"
			@site_info = message.params #save site info data to allow access it later
			
	

	sendMessage: =>
		if not Page.site_info.cert_user_id # no account selected, display error
			Page.cmd "wrapperNotification", ["info", "Please, select your account."]
			return false
			
		inner_path = "data/users/#{@site_info.auth_address}/data.json" #This is our data file
		
		# Load our current messages 
		@cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
			if data # Parse if already exits
				data = JSON.parse(data)
			else # Not exits yet, use default data
				data = { "message": [] }
			
			# Add the message to data 
			data.message.push({
				"body": document.getElementById("message").value,
			})
			
			#Encode data array to utf8 json text
			json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
			
			#Write file to disk
			@cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
				if res =="ok"
					#Publish the file to other user
					@cmd "sitePublish", {"inner_path": inner_path}, (res) =>
						document.getElementById("message").value = "" #Reset the message input
				else 
					@cmd "wrapperNotification", ["error", "File write error: #{res}"]
					
		return false		







	
		
	addLine: (line) ->
		messages = document.getElementById("messages")
		messages.innerHTML = "<li>#{line}</li>"+messages.innerHTML
		
		
	#Wrapper websocket connection ready
	onOpenWebsocket: (e) =>
		@cmd "serverInfo", {}, (server_info) =>
			@addLine "serverInfo response: <pre>" + JSON.stringify(server_info,null,2) + "</pre>"
		@cmd "siteInfo", {}, (site_info) =>
			@addLine "siteInfo response: <pre>" + JSON.stringify(site_info,null,2) + "</pre>"
			#Update currently selected username
			if site_info.cert_user_id
				document.getElementById("select_user").innerHTML = site_info.cert_user_id
			@site_info = site_info #Save site info data to allow accee it later
			
window.Page = new ZeroChat()		