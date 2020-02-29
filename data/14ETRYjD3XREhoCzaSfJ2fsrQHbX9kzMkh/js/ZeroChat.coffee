class ZeroChat extends ZeroFrame
    init: ->
        @addLine "inited!"

    addLine: (line) ->
        messages = document.getElementById("messages")
        messages.innerHTML = "<li>#{line}</li>"+messages.innerHTML
        
    selectUser: =>
        Page.cmd "certSelect", [["zeroid.bit"]]
        return false
    
    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                document.getElementById("select_user").innerHTML = message.params.cert_user_id
            else
                document.getElementById("select_user").innerHTML = "Select user"
            @site_info = message.params  # Save site info data to allow access it later
            # Reload messages if new file arrives
            if message.params.event[0] == "file_done"
                @loadMessages()
            
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
                "body": document.getElementById("message").value,
                "date_added": (+new Date)
            })

            # Encode data array to utf8 json text
            json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            # Write file to disk
            @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
                if res == "ok"
                    # Publish the file to other users
                    @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                        document.getElementById("message").disabled = false
                        document.getElementById("message").value = ""  # Reset the message input
                        document.getElementById("message").focus()
                        @loadMessages()
                else
                    @cmd "wrapperNotification", ["error", "File write error: #{res}"]
                    document.getElementById("message").disabled = false

        return false
    
    loadMessages: ->
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
                @addLine "<b>#{message.cert_user_id}</b>: #{body}"


    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "serverInfo", {}, (server_info) =>
            @addLine "serverInfo response: <pre>" + JSON.stringify(server_info,null,2) + "</pre>"
        @cmd "siteInfo", {}, (site_info) =>
            @addLine "siteInfo response: <pre>" + JSON.stringify(site_info,null,2) + "</pre>"
            # Update currently selected username
            if site_info.cert_user_id
                document.getElementById("select_user").innerHTML = site_info.cert_user_id
            @site_info = site_info  # Save site info data to allow access it later
            @loadMessages()

window.Page = new ZeroChat()