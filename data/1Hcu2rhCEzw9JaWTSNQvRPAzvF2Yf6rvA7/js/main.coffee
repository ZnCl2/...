class MySite extends ZeroFrame
  init: ->
    @log "inited!"

  # Wrapper websocket connection ready
  onOpenWebsocket: (e) =>
    @cmd "serverInfo", {}, (serverInfo) =>
      @log "mysite serverInfo response", serverInfo
    @cmd "siteInfo", {}, (siteInfo) ->
      updateInfo(siteInfo)
    
window.my_site = new MySite()