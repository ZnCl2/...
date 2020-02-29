class ZeroCoffee extends ZeroFrame
 init: ->
  console.log "Online"
 # Wrapper websocket connection ready
 onOpenWebsocket: (e) =>
  @cmd "siteInfo", {}, (site_info) =>
   if document.querySelector("#online") != null
    document.querySelector("#online").innerHTML = site_info.peers.toString()
   if document.querySelector("#userid") != null
    console.log site_info.cert_user_id
    document.querySelector("#userid").textContent = site_info.cert_user_id
   else
    document.querySelector("#userid").textContent = "SELECT USER"
   console.log  "siteInfo response: " + JSON.stringify(site_info,null,2)
   return null
  
  @cmd "serverInfo", {}, (server_info) =>
   console.log "serverInfo response:" + JSON.stringify(server_info,null,2)
   return null
   
 selectUser: =>
  Page.cmd "certSelect", [["zeroid.bit"]]
  return false
   
 route: (cmd, message) =>
  console.log "Update Site Info"
  if cmd == "setSiteInfo"
   if document.querySelector("#userid") != null
    if message.params.cert_user_id
     document.querySelector("#userid").textContent = message.params.cert_user_id
    else
     document.querySelector("#userid").textContent = "SELECT USER"
    @site_info = message.params

	sendMessage: =>

        if not Page.site_info.cert_user_id  # No account selected, display error
            Page.cmd "wrapperNotification", ["info", "Please, select your account."]
            return false

        inner_path = "data/users/#{@site_info.auth_address}/data.json"  # This is our data file

        # Load our current messages
        @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>

            if data  # Parse if already exits
                data = JSON.parse(data)
            else  # Not exits yet, use default data
                data = { "message": [] }

            # Add the message to data
            data.message.push({
                "body": document.getElementById("commentContent").value,
                "date_added": (+new Date)
            })

            # Encode data array to utf8 json text
            json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            # Write file to disk
            @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>

                @loadMessages()
                if res == "ok"
                    # Publish the file to other users
                    @cmd "sitePublish", {"inner_path": inner_path}, (res) =>

                        document.getElementById("commentContent").value = ""  # Reset the message input
                else
                    @cmd "wrapperNotification", ["error", "File write error: #{res}"]

        return false

	loadMessages: ->

        @cmd "dbQuery", ["SELECT * FROM message ORDER BY date_added"], (messages) =>
            console.log "LoadMessages"
            #document.getElementById("messages").innerHTML = ""  # Always start with empty messages
            #for message in messages
                #@addLine message.body

window.Page = new ZeroCoffee()
