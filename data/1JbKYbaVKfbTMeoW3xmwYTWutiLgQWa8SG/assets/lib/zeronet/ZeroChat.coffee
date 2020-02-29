class ZeroChat extends ZeroFrame
    #init: ->
    #    @addLine "inited!"

    addLine: (line) ->
        messages = document.getElementById("messages")
        messages.innerHTML = "<li>#{line}</li>"+messages.innerHTML

    loadMessages: ->
        @cmd "dbQuery", ["SELECT * FROM message ORDER BY date_added"], (messages) =>
            document.getElementById("messages").innerHTML = ""  # Always start with empty messages
            for message in messages
                @addLine message.body

    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                document.getElementById("select_user").innerHTML = message.params.cert_user_id
            else
                document.getElementById("select_user").innerHTML = "Select user"
            @site_info = message.params  # Save site info data to allow access it later

window.Page = new ZeroChat()