class ZeroChat extends ZeroFrame
	
    init: ->
        @audio = new Audio('notify.mp3')


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
            
            if message.params.event?["0"] == "file_done" && message.params.event?[1].includes('data.json')
                inner_path = message.params.event?[1]
                @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
                    if data
                        data = JSON.parse(data)
                        @addLine data
                        @audio.play()
                    else
                        @addLine error
                        
    sendMessage: =>
        if not Page.site_info.cert_user_id  # No account selected, display error
            Page.cmd "wrapperNotification", ["info", "Please, select your account."]
            return false

        #document.getElementById("message").disabled = true
        inner_path = "data/users/#{@site_info.auth_address}/data.json"  # This is our data file

        # Add the message to data
        data = document.getElementById("message").value

        # Encode data array to utf8 json text
        json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

        # Write file to disk
        @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
            if res == "ok"
                # Publish the file to other users
                @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                    @addLine data
                    document.getElementById("message").disabled = false
                    document.getElementById("message").value = ""  # Reset the message input
                    document.getElementById("message").focus()
            else
                @cmd "wrapperNotification", ["error", "File write error: #{res.error}"]
                document.getElementById("message").disabled = false

        return false
    
    addLine: (line) ->
        messages = document.getElementById "messages" 
        li = document.createElement "li" 
        @notouch li

        p = document.createElement "p"
        p.innerHTML = line
        p.style.display = "none"

        li.appendChild p 
        messages.appendChild li 

        pj = jQuery(p)
        lj = jQuery(li)

        pj.fadeIn 1000, ->
            pj.fadeOut 10000, ->
                lj.hide 300 , ->
                    li.parentNode.removeChild li

    notouch: (li) ->
        lj = jQuery(li)
        li.addEventListener "mouseover", ->
            lj.fadeOut 300 , ->
                lj.hide 300, ->
                    lj.stop

    onOpenWebsocket: (e) =>
        @cmd "serverInfo", {}, (serverInfo) => 
            @log "mysite serverInfo response", serverInfo
        @cmd "siteInfo", {}, (siteInfo) => 
            @log "mysite siteInfo response", siteInfo
            if siteInfo.cert_user_id
                document.getElementById("select_user").innerHTML = siteInfo.cert_user_id
            else
                document.getElementById("select_user").innerHTML = "Select user"
            
            if siteInfo.peers == 1
                @addLine siteInfo.peers + " person whispering."
            else
                @addLine siteInfo.peers + " people whispering."
            @site_info = siteInfo
    


window.Page = new ZeroChat()
