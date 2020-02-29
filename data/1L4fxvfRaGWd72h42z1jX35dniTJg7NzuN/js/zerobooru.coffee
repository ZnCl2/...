class zerobooru extends ZeroFrame
    init: ->
        @addLine "inited!"
        @wall = new Freewall("#posts")
        @wall.reset({
            selector: '.cell',
            animate: true,
            cellW: 50,
            cellH: 50,
            gutterX: 'auto',
            gutterY: 10,
            onResize: () ->
                Page.wall.fitWidth()
                return false
            })
        $(window).trigger("resize");
        return false

    addLine: (line) ->
        console.log(line)

    addImage: (image) ->

        e = document.createElement('div')
        document.getElementById("posts").appendChild(e)
        e.style.backgroundImage = "url('#{image.pathThumb}')"
        console.log(image)
        e.style.height = image.heightThumb
        e.style.width = image.widthThumb
        e.setAttribute('class', 'cell')
        e.setAttribute('onClick', "window.open('#{image.path}', '_blank');")
        @wall.fitWidth()
        return false

    selectUser: =>
        Page.cmd "certSelect", [["zeroid.bit"]]
        return false

    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @loadMessages()
        @cmd "serverInfo", {}, (server_info) =>
            @addLine server_info
        @cmd "siteInfo", {}, (site_info) =>
            if site_info.cert_user_id
                document.getElementById("select_user").innerHTML = site_info.cert_user_id
            @site_info = site_info  # Save site info data to allow access it later

    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                document.getElementById("select_user").innerHTML = message.params.cert_user_id
            else
                document.getElementById("select_user").innerHTML = "Login"
            # Reload messages if new file arrives
            if message.params.event[0] == "file_done"
                @loadMessages()

    loadMessages: ->
        @cmd "dbQuery", ["SELECT * FROM images ORDER BY date_added DESC"], (images) =>
            document.getElementById('posts').innerHTML = ''
            for image in images
                console.log(image.hashsum)
                if image.hashsum
                    @addImage image

    addMessage: (formData) ->
        content_path = "data/users/#{@site_info.auth_address}/content.json"
        inner_path = "data/users/#{@site_info.auth_address}/images.json"
        image  = document.createElement("img")
        file = formData.children.file.files[0]
        reader = new FileReader()

        reader.onload = (event) ->
            image.src = event.target.result

        image.onload = () ->
            canvas = document.createElement("canvas")
            ctx = canvas.getContext("2d")
            canvas.width  = image.width
            canvas.height = image.height
            ctx.drawImage(image, 0, 0, image.width, image.height)
            imageFull = canvas.toDataURL(formData.file.type, 1).split(',')[1]
            maxWidth  = 250
            maxHeight = 250
            width     = image.width
            height    = image.height

            if width > height
                if width > maxWidth
                    height *= (maxWidth / width)
                    width   = maxWidth
            else
                if height > maxHeight
                    width *= (maxHeight/ height)
                    height = maxHeight

            canvas.width  = width
            canvas.height = height

            ctx = canvas.getContext("2d")
            ctx.drawImage(image, 0, 0, width, height)

            imageThumb  = canvas.toDataURL("image/jpeg", 1).split(',')[1]

            hash = md5(imageFull)

            data.images.push({
                "hashsum": hash,
                "path": "data/users/#{Page.site_info.auth_address}/#{hash}.jpg",
                "pathThumb": "data/users/#{Page.site_info.auth_address}/#{hash}-thumb.jpg",
                "height": image.height,
                "width": image.width,
                "heightThumb": height,
                "widthThumb": width,
                "date_added": (+new Date)
            })

            json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            Page.cmd "dbQuery", ["SELECT hashsum FROM images WHERE hashsum='#{hash}'"], (images) =>
                if !images.length
                    # Write file to disk
                    Page.cmd "fileWrite", ["data/users/#{Page.site_info.auth_address}/#{hash}.jpg", imageFull], (write) =>
                        if write == "ok"
                            Page.cmd "fileWrite", ["data/users/#{Page.site_info.auth_address}/#{hash}-thumb.jpg", imageThumb], (write) =>
                                if write == "ok"
                                    Page.cmd "fileWrite", [inner_path, btoa(json_raw)], (writeres) =>
                                        Page.cmd "siteSign", { inner_path: content_path }, (basicResponse) => 
                                            if basicResponse == "ok"
                                                # Publish the file to other users
                                                Page.cmd "sitePublish", {"inner_path": content_path}, (res) =>
                                                    Page.loadMessages()
                                                    return false  
                                            else
                                                Page.cmd "wrapperNotification", ["error", "File write error: #{basicResponse}"]
                        return false
                else
                    Page.cmd "wrapperNotification", ["error", "Image already uploaded."]

        reader.readAsDataURL(file)
        return false

    sendMessage: (formData) ->
        if not Page.site_info.cert_user_id  # No account selected, display error
            Page.cmd "wrapperNotification", ["info", "Please, select your account."]
            return false

        inner_path = "data/users/#{@site_info.auth_address}/images.json"
        content_path = "data/users/#{@site_info.auth_address}/content.json"
        test_path = "data/users/#{@site_info.auth_address}/test.json"

        @cmd "fileGet", {"inner_path": content_path, "required": false}, (contentdata) =>
            if !contentdata or !JSON.parse(contentdata).hasOwnProperty('optional')
                console.log('Cant find content.json - creating …')
                raw_json = unescape(encodeURIComponent(JSON.stringify({"optional": ".*\\.(jpg|png|gif)"}, undefined, '\t')))
                Page.cmd "fileWrite", [test_path, btoa(raw_json)], (write)  => 
                    console.log("Created content.json")
                    if write == "ok"
                        console.log("Signing content.json…")
                        Page.cmd "siteSign", { inner_path: content_path }, (basicResponse) => 
                            console.log("Signed content.json")
                            Page.addMessage formData
                    else
                        Page.cmd "wrapperNotification", ["error", "File write error: #{basicResponse}"]
                
            else
                console.log("Signing content.json…")
                Page.cmd "siteSign", { inner_path: content_path }, (basicResponse) => 
                    console.log("Signed content.json")
                    Page.addMessage formData
        return false

                
            
        


window.Page = new zerobooru()
