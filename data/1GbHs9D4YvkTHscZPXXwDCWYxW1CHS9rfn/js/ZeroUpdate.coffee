class ZeroUpdate extends ZeroFrame
    init: ->
        @latest_version = "..."
        @latest_rev = "..."
        @server_info = {}
        @left_num = null
        @site_info
        document.getElementById("button").onclick = @handleUpdateClick

    handleUpdateClick: =>
        Page.cmd "serverUpdate"
        return false

    setServerInfo: (server_info) =>
        @server_info = server_info
        @cmd "optionalHelpList", [], (res) =>
            @log "Optional help: #{JSON.stringify(res)}, dist type: #{server_info.dist_type}"
            if server_info.dist_type.startsWith("bundle_") and not res[server_info.dist_type]
                Page.cmd("optionalHelp", [server_info.dist_type, "Runtime files"])
        @updateHtml()

    setSiteInfo: (site_info) =>
        @site_info = site_info
        @updateHtml()

    updateHtml: =>
        document.getElementById("version_running").innerText = "#{@server_info.version} (rev#{@server_info.rev})"
        document.getElementById("version_latest").innerText = "#{@latest_version} (rev#{@latest_rev})"

        if @latest_rev == @server_info.rev
            document.body.className = "result-latest"
            document.getElementById("result").innerText = "On the edge with the latest revision!"
        else if @latest_version == @server_info.version
            document.body.className = "result-sameversion"
            document.getElementById("result").innerText = "Latest version!"
        else if @latest_version != "..."
            document.body.className = "result-outdated"
            document.getElementById("result").innerText = "Outdated!"

        button_elem = document.getElementById("button")
        if @left_num == 0
            button_elem.classList.remove("disabled")
            button_elem.innerText = "Update to latest version"
        else if @left_num > 0
            button_elem.innerText = "Downloading: #{@site_info?.bad_files} files"
        else
            button_elem.innerText = "Downloading..."

        if @site_info
            if @site_info.started_task_num > 0
                percent = (@site_info.bad_files / @site_info.started_task_num)
            else
                percent = 0
            button_elem.style.boxShadow = "#{0-parseInt(percent * 240)}px 0px 0px rgba(0,0,0,0.2) inset"


    updateVersionInfo: =>
        Page.cmd "fileGet", "core/src/Config.py", (config_py) =>
            @latest_rev = parseInt(config_py.match(/self.rev = ([0-9]+)/)[1])
            @latest_version = config_py.match(/self.version = "([0-9\\.]+)"/)[1]
            @updateHtml()

    updateBadFiles: =>
        @cmd "siteBadFiles", [], (bad_files) =>
            @left_num = 0
            for bad_file in bad_files
                if bad_file.startsWith("core/")
                    @left_num += 1
            console.log "Files left: #{@left_num}"
            @updateHtml()

    onOpenWebsocket: =>
        @cmd("serverInfo", {}, @setServerInfo)
        @cmd("siteInfo", {}, @setSiteInfo)
        @updateVersionInfo()
        @updateBadFiles()

    onRequest: (cmd, message) =>
        if cmd == "setSiteInfo"
            @setSiteInfo(message)
            if message.event?[1] == "core/src/Config.py"
                @updateVersionInfo()
            RateLimit 1000, @updateBadFiles

window.Page = new ZeroUpdate()
