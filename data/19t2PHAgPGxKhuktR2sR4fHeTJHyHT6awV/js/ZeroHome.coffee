class ZeroHome extends ZeroFrame
    init: ->
        @log "inited!"

    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "siteInfo", {}, (siteInfo) =>
            @log "mysite siteInfo response", siteInfo


window.ZeroHome = new ZeroHome()