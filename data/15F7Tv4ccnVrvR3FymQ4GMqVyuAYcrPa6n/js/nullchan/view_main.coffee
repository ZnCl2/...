class MainPage extends View
  name:   "Main Page"
  counts: null
  boards: null
  unread: {}

  loadData: =>
    new Promise (resolve, reject) => @reloadData(resolve)

  reloadData: (resolve) =>
    @unread = UnreadCount.getAll()
    Promise.all([@DB.loadPostCounts(), @DB.loadLastPost()]).then(@buildData(resolve), @onError)

  onSiteInfo: => @reloadData()

  buildData: (resolve) =>
    return (values) =>
      @counts   = values[0]
      @lastPost = new Post(values[1])
      @boards   = $.extend({}, Nullchan.settings.boards)

      if resolve
        resolve()
      else
        Nullchan.projector.scheduleRender()

  showAnon: (evt) =>
    evt.preventDefault()
    evt.stopPropagation()
    anon = new AnonymityDisclaimer()
    anon.show()

  render: =>
    h 'div#main-page',
      h 'div.logo-container',
        @renderLogo()
        @renderDisclaimer()
      h 'hr'
      h 'div.inner',
        h 'table',
          h 'tbody',
            h 'tr',
              @renderBoardList()
              @renderDescription()
      h 'hr'
      @renderFooter() 

  renderDisclaimer: ->
    h 'div.anonymity-disclaimer',
      "Please keep in mind that due to ZeroNet technical restrictions"
      h "br"
      "your posts on this site are not completely anonymous."
      h "br"
      @link "#", { onclick: @showAnon }, "Read about how it works"

  renderBoardList: ->
    h 'td.board-list-container', 
      h 'table#board-list',
        h 'tbody',
          h 'tr',
            h 'th', "Board"
            h "th", "Title"
            h "th", "Total posts"
            h "th", "Unread"
          (@renderBoard(board) for key, board of @boards)
      @renderLastPost()

  renderLastPost: =>
    return [] unless @lastPost
    h "div.last-post", 
      "Last post: "
      @link(@lastPost.urlTo(), Helpers.timeSince(@lastPost.created_at))

  renderBoard: (board) ->
    return [] if board.hidden
    unread = "—"

    if @counts[board.key] > @unread[board.key]
      unread = "+#{@counts[board.key] - @unread[board.key]}"

    h 'tr',
      h "td", @link("?/#{board.key}/", "/#{board.key}/")
      h "td", board.name
      h "td", @counts[board.key]
      h "td.unread", { classes: { some: (unread != "—") } }, unread

  renderMOTD: ->
    text = Nullchan.settings.motd.text.replace(/\n/g, "<br/>")
    h "div.motd.row",
      h "em", "Message of the day:"
      h "span.text", innerHTML: text
      h "span.date", "— #{Nullchan.settings.motd.date}"

  renderDescription: ->
    h 'td.main-page-description',
      h "div.row",
        h 'strong', "0chan"
        " is a decentralised P2P imageboard "
        h "br"
        "powered by "
        @link repoLink, "Nullchan"
        " engine running on "
        @link "https://github.com/HelloZeroNet/ZeroNet", "ZeroNet"
        "."
        h "br"
        h "br"
        "The engine is still very early in development and thus this site "
        h "br"
        "is basically just a proof-of-concept tech demo which misses "
        h "br"
        "a lot of crucial features, "
        "but it will get better with time."
      @renderMOTD()
      @renderFriends()

  renderFriends: ->
    return [] unless Nullchan.settings.friends
    h "div.row.friend-chans",
      h "em", "List of imageboards on Nullchan engine:"
        h "ul",
          (@renderFriendLink(domain, name) for domain, name of Nullchan.settings.friends)

  renderFriendLink: (domain, name) ->
    h("li", @link("/#{domain}", name))

  renderLogo: =>
    h 'div#logo.no-select', 
      h 'pre',
        h 'code', document.getElementById("logo-template").innerHTML

window.MainPage = MainPage
