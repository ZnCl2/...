class ZeroChat extends ZeroFrame
    init: ->
        @addLine "inited!"

    addLine: (line) ->
        messages = document.getElementById("messages")
        messages.innerHTML = "<li>#{line}</li>"+messages.innerHTML


    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "serverInfo", {}, (server_info) =>
            @addLine "serverInfo response: <pre>" + JSON.stringify(server_info,null,2) + "</pre>"
        @cmd "siteInfo", {}, (site_info) =>
            @addLine "siteInfo response: <pre>" + JSON.stringify(site_info,null,2) + "</pre>"

window.Page = new ZeroChat()
