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
            @site_info = message.params  # Save site info data to allow access it later

    addLine: (line) ->
        messages = document.getElementById("messages")
        messages.innerHTML = "<li>#{line}</li>"+messages.innerHTML


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

window.Page = new ZeroChat()