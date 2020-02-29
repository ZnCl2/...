class Threads extends View
  name:         "Threads"
  currentView:  null

  loadData: =>
    new Promise (resolve) =>
      @DB.loadBoard(@params.board).then(@buildData(resolve), @onError)

  afterShow: =>
    hl = @params.highlight
    if hl and hl.substring(0, 3) == "hl-"
      full = @shortMap[hl.substring(3)]
      @posts[full]?.scrollTo()    
    @setupEvents()
    if @currentView == "list" and @nextNum
      @DB.loadPostCounts().then (counts) =>
        UnreadCount.set(@currentBoard.key, counts[@currentBoard.key])

  setupEvents: =>
    $(document.body).on "mousedown", ".floating .mode", (e) =>
      if e.ctrlKey or e.altKey or e.shiftKey or e.metaKey or e.which == 3
        return
      window.dragging = $(e.target).closest(".post-form")
      window.drag2 = $(e.target)
      @unselectable = true
      Nullchan.preloader.overlayOn = true
      Nullchan.projector.scheduleRender()

    $(document.body).on "mouseup", (e) =>
      window.dragging = null
      window.drag2 = null
      @unselectable = false
      Nullchan.preloader.overlayOn = false
      Nullchan.projector.scheduleRender()

    $(document.body).on "mousemove", (e) =>
      if window.dragging
        el_w = window.drag2.outerWidth()
        el_h = window.drag2.outerHeight()
        window.dragging.offset(top: (e.pageY - el_h / 2), left: (e.pageX - el_w / 2))


  buildData: (resolve) =>
    return (posts) =>
      @nextNum      = (posts[posts.length-1].num + 1) if posts.length > 1
      @currentView  = (if @params.thread then "thread" else "list")
      @currentBoard = Nullchan.boards[@params.board]
      unless @currentBoard 
        @notFound = true
        @log("Board not found")
        return resolve()

      @buildPosts(posts)
      if @currentView == "thread"
        @buildThread(@params.thread)
      else
        @buildPage(@params.page)
      @prerenderMarkup()
      resolve()

  buildPosts: (posts) =>
    @posts       = {}
    @allThreads  = {}
    @shortMap    = {}
    @fileCount   = 0
    @floatingForm= new Form(@currentBoard.key, false, true)
    @floatingForm.shown = false

    for post in posts        
      post = new Post(post)
      unless post.isValid()
        # @log("Invalid post", post)
        continue 
      @posts[post.hashsum] = post
      @shortMap[post.short_hash] = post.hashsum
      @fileCount++ if !!post.attachment
      if !!post.parent 
        @allThreads[post.parent] ||= []
        @allThreads[post.parent].push(post.hashsum)
      else
        @allThreads[post.hashsum] = []

    for hash in Object.keys(@allThreads)
      if @posts[hash]
        @allThreads[hash].unshift(hash)
      else
        delete @allThreads[hash]

  prerenderMarkup: =>
    for thread in @pageThreads
      for hash in thread.posts
        continue unless @posts[hash]
        @posts[hash].rendered_body = Markup.render(@posts[hash].body, hash)

  buildThread: (hash) =>
    @topForm = new Form(@currentBoard.key, hash)

    posts = @allThreads[hash]
    unless posts
      @notFound = true
      return
    @pageThreads = [new Thread(posts, @randID)]

  buildPage: (page) =>
    page = parseInt(page)
    if page == NaN or page <= 0
      page = 1

    perPage = Nullchan.settings.threadsPerPage
    perPage = 15 if parseInt(perPage) == NaN or perPage <= 1
    sorted  = Object.keys(@allThreads).map((k) => @allThreads[k]).sort(@sortThreads)
    pages   = Helpers.paginate(sorted, { page, perPage })

    @topForm     = new Form(@currentBoard.key, false)
    @pageThreads = pages.array.map (h) => (new Thread(h, @randID))
    @currentPage = pages.currentPage
    @totalPages  = pages.totalPages

  sortPosts: (a, b) =>
    if @posts[a].created_at > @posts[b].created_at then 1 else -1

  sortThreads: (a, b) =>
    comp = @posts[a[a.length-1]].created_at > @posts[b[b.length-1]].created_at
    if comp then -1 else 1

  logCount: =>
    @log(
      "Reloaded /#{@currentBoard.key}/:"
      Object.keys(@posts).length
      "messages (with"
      @fileCount
      "files) in"
      Object.keys(@allThreads).length
      "threads"
    )

  render: =>
    @log("Ayoo")
    pagination = new Pagination(@currentPage, @totalPages, @currentBoard.key, @currentView)

    return [
      @renderHeader() 
      @topForm.render()
      @floatingForm.render()
      pagination.render("top")
      @renderThreads()
      pagination.render("bottom")
      @renderFooter()
    ]

  showFloatingForm: (parent, text = "") =>
    @floatingForm.show(parent, text)

  hideFloatingForm: =>
    @floatingForm.hide()

  renderHeader: =>
    key  = "/#{@currentBoard.key}/"
    addr = Nullchan.settings.siteAddress
    cls  = { classes: { board: true } }
    h "div#board-header",
      @link("/#{addr}?" + key, cls, h("h1", "#{key} — #{@currentBoard.name}"))
      h "h2", @currentBoard.description if !!@currentBoard.description
      @link "root", "back to main page"

  renderThreads: =>
    h "div#board-contents",  @pageThreads.map (t) => t.render()

window.Threads = Threads
