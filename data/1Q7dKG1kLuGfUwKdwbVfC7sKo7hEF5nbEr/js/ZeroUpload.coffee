class ZeroUpload extends ZeroFrame
    init: ->
        @site_info = null  # Last site info response
        @last_elem = $('.fileRow')
        @log "inited!"


    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "siteInfo", {}, (siteInfo) =>
            @onRequest "setSiteInfo", { "params": siteInfo }


    uploadFiles: (files) ->
        if not @site_info.cert_user_id
            @cmd "wrapperNotification", ["error", "You have to be logged to submit a file."]
            return false
        @log "uploadFiles"
        file_number = 0
        for file in files
            if not file
                continue

            inner_path = "files/#{@site_info.auth_address}/#{file.name}"

            reader = new FileReader();
            file_number++
            # Closure to capture the file information.
            reader.onloadend = () =>
                @writePublish inner_path, reader.result.split(",")[1], (res) =>
                    if res == true
                        @displayFileInList(file_number, file.name, inner_path)
                    else
                        @cmd "wrapperNotification", ["error", "Unable to publish the file modifications."]

            # Read in the image file as a data URL.
            reader.readAsDataURL(file);

    displayFileInList: (fileNumber, filename, inner_path) ->
        elem = $('.fileRow').clone().removeClass("template")

        $(".fileNumber", elem).text(fileNumber)
        $(".filename", elem).text(filename)
        $(".url .link", elem).attr("href", inner_path)
        $(".url .link", elem).text(inner_path)

        #Display the line
        elem.insertAfter(@last_elem)
        $('#fileUploadResults').removeClass("template")


    writePublish: (inner_path, data, cb) ->
        @cmd "fileWrite", [inner_path, data], (res) =>
            @log "fileWrite cb: ", res
            if res != "ok" # fileWrite failed
                @cmd "wrapperNotification", ["error", "File write error: #{res}"]
                cb(false)
                return false

            @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                @log "sitePublish cb: ", inner_path, res
                if res == "ok"
                    cb(true)
                else
                    cb(res)


    startFileUpload: () ->
        if not @site_info.cert_user_id
            @cmd "wrapperNotification", ["info", "Please sign in before uploading a file."]
            return false

        $('#fileUpload')[0].click()


    onRequest: (cmd, message) ->
        @log "cmd received: ", cmd
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                $("#select_user").text(message.params.cert_user_id)
            else
                $("#select_user").text("Sign in...")
            @site_info = message.params  # Save site info data to allow access it later

window.ZeroUpload = new ZeroUpload()