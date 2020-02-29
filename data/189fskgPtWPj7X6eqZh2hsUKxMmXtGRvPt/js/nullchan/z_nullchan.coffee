anonWIF = "5JH6tV2QhqMiVh8vSNS4p4HTjBmuYzxrDMVRgvFcBAfo1nA2FJm"

class Nullchan extends ZeroFrame
  onError: (e) =>
    console.log(e)
    alert("Critical error occured. Wait for the admin to fix it.")

  start: =>
    window.onError  = @onError
    @started    = false
    @onSiteInfo = new Promise((r) => @siResolve = r)
    @siteInfo   = null
    @settings   = null
    @boards     = {}
    @projector  = maquette.createProjector()
    @db         = new Database()
    @preloader  = new Preloader(@projector)
    @storage    = new Storage()
    @anonKey    = bitcoin.ECPair.fromWIF(anonWIF)
    @isProxy    = !!base.href.match("bit.no.com")

    @onSiteInfo.then =>
      @checkCertificates()
      @siResolve = null
      @storage.reload().then =>
        @reloadSettings().then(@updateRoute, @settingsCorrupted)

  updateRoute: (external) =>
    params = null
    if external != undefined
      params = Helpers.parseQuery(external)
    else if base.href.indexOf("?") != -1
      params = Helpers.parseQuery(base.href.replace(/.*?\?/, ""))

    if params?.url 
      parts = params.url.split("/").filter (p) -> p.length > 0 and p != "?"

      if parts[1] == "thread"
        return @displayView(Threads, board: parts[0], thread: parts[2], highlight: parts[3])

      page = 1
      page = parseInt(parts[2]) if parts[1] == "page"
      @displayView(Threads, board: parts[0], page: page)
    else
      @displayView(MainPage)

  displayView: (view, params) =>
    @view?.detach()
    @view = new view(params, @db)
    @view.show().then => @started = true

  getPost: (hash) =>
    return null unless @view.name == "Threads"
    unless @view.posts
      return null
    return @view.posts[hash]

  navigate: (address, evt) =>
    return unless address?.match("/#{@settings.siteAddress}")
    if evt
      @pushState(address) 
      evt.preventDefault?()
    @preloader.delayedShow()
    @updateRoute(@grepPath(address))

  grepPath: (address) =>
    split = address.split("/#{@settings.siteAddress}") 
    path  = split[split.length-1]
    path  = path.substring(1) if path[0] == "/"
    return path

  pushState: (address) =>
    @cmd("wrapperPushState", [{}, "0chan", @grepPath(address)])

  checkCertificates: =>
    return unless @siteInfo.cert_user_id == null

    addr = @siteInfo.auth_address
    cert = bitcoin.message.sign(@anonKey, (addr + "#web/") + addr.slice(0, 13)).toString("base64")

    @cmd "certAdd", ["0ch.anonymous", "web", addr.slice(0, 13), cert], (res) =>
      if res != "Not changed"
        @cmd "wrapperNotification", ["done", "Anonymous certificate generated.", 7000]
      

  certSelect: =>
    if @isProxy
      @cmd("certSelect", accepted_domains: ["zeroid.bit"])
    else
      @cmd("certSelect", accepted_domains: ["0ch.anonymous", "zeroid.bit"])

  reloadSettings: =>
    return new Promise (resolve, reject) =>
      FileManager.readJSON("data/settings.json").then (settings) =>
        @settings = settings
        @reloadBoards()
        resolve()
      , (fail) =>
        reject(fail)

  reloadBoards: =>
    @boards = {}
    for board in @settings.boards
      @boards[board.key] = board

  settingsCorrupted: =>
    alert("Something wrong with your data/settings.json file!")

  setSiteInfo: (siteInfo) =>
    @siteInfo = siteInfo
    @siResolve?()
    @view?.onSiteInfo()
    @projector.scheduleRender()


  route: (cmd, params) ->
    # @log("Route", cmd, params)
    switch cmd
      when "setSiteInfo"
        @setSiteInfo(params.params)
      when "wrapperPopState"
        @navigate(params.params.href)
      else
        @log("Unknown command :^)", cmd, params)

  onOpenWebsocket: =>
    @log("Websocket opened.")
    @cmd "siteInfo", {}, (siteInfo) =>
      @setSiteInfo(siteInfo)

  onCloseWebsocket: =>
    @log("Websocket closed.")

  onLinkClick: (evt) =>
    if evt.ctrlKey or evt.altKey or evt.shiftKey or evt.metaKey
      return
    $target = $(evt.target)
    $target = $target.parent() if $target.is("h1")
    @navigate($target.prop('href'), evt)

  emptyClick: (evt) =>
    evt.preventDefault()
    evt.stopPropagation()

window.Nullchan = new Nullchan()
window.Nullchan.start()
