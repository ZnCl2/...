class ZeroChat extends ZeroFrame
    init: ->
        sendmsg = 0
    selectUser: () =>
        Page.cmd "certSelect", [["zeroid.bit"]]
        return false;
    setMsg: ->
        sendmsg = 1
    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "siteInfo", {}, (site_info) =>
            # Update currently selected username
            @site_info = site_info  # Save site info data to allow access it later
        url = if window.location != window.parent.location then document.referrer else document.location
        if url.indexOf("queue.html") > -1
            inlist = []
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
                for message in messages
                    innlist = []
                    body = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;") 
                    name = message.name.replace(/</g, "&lt;").replace(/>/g, "&gt;") 
                    tags = message.tags.replace(/</g, "&lt;").replace(/>/g, "&gt;") 
                    date_added = message.date_added
                    cert_user_id = message.cert_user_id.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    innlist.push name
                    innlist.push body
                    innlist.push tags
                    innlist.push date_added
                    innlist.push cert_user_id
                    inlist.push innlist
                window.inlist = inlist
    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            @site_info = message.params  # Save site info data to allow access it later
        if Page.site_info.cert_user_id
            if sendmsg = 1
                sendmsg = 0
                Page.sendMessage()
    sendMessage: () =>
        if sendmsg = 0
            return false
        g = document.getElementById("addtext").value
        if g.search("^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$") == -1 
            document.getElementById("addhelp").innerHTML = "That's not a valid address."
            return false
        if document.getElementById("addname").value.length < 5
            document.getElementById("addhelp").innerHTML = "The site name must have at least 5 characters."
            return false
        if document.getElementById("addname").value.length > 30
            document.getElementById("addhelp").innerHTML = "The site name must have less than characters."
            return false
        if (document.getElementById("addtags").value.match(/,/g) || []).length < 2
            document.getElementById("addhelp").innerHTML = "You need to add at least 3 tags."
            return false
        if (document.getElementById("addtags").value.match(/,/g) || []).length > 200
            document.getElementById("addhelp").innerHTML = "You can't add more than 200 tags."
            return false
        if document.getElementById("addtags").value.length < 10
            document.getElementById("addhelp").innerHTML = "The tags must be bigger."
            return false
        if document.getElementById("addtags").value.length > 1000
            document.getElementById("addhelp").innerHTML = "The tags must be smaller."
            return false
        
        if not Page.site_info.cert_user_id  # No account selected, display error
            Page.selectUser()
            return false;
        inner_path = "data/users/#{@site_info.auth_address}/data.json"  # This is our data file
        # Load our current messages
        @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
            if data  # Parse if already exits
                data = JSON.parse(data)
            else  # Not exits yet, use default data
                data = { "message": [] }
            # Add the message to data
            data.message.push({
                "body": document.getElementById("addtext").value,
                "name": document.getElementById("addname").value,
                "tags": document.getElementById("addtags").value,
                "date_added": (+new Date)
            })
            # Encode data array to utf8 json text
            json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
            # Write file to disk
            @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
                if res == "ok"
                    # Publish the file to other users
                    @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                        document.getElementById("addtext").value = "";
                        document.getElementById("addname").value = "";
                        document.getElementById("addtags").value = "";
                        @cmd "wrapperNotification", ["done", "Success!", 1500]
                else
                    @cmd "wrapperNotification", ["error", "File write error: #{res}"]
        return false
window.Page = new ZeroChat()