class Thread extends Logger
  full:    off
  opHash:  null
  posts:   []

  constructor: (@posts, @randID) ->
    @full   = Nullchan.view.currentView == "thread"
    @opHash = @posts[0]

  getPost: (hash) =>
    return Nullchan.getPost(hash)

  render: =>
    key   = "thread-#{@opHash}"
    skip  = null
    rest  = 1

    unless @full
      count = @posts.length - 6
      if count > 0
        skip = @renderSkipGap(count)
        rest  = @posts.length - 5

    h "div##{key}.thread", { key }, 
      @getPost(@opHash).render()
      skip
      @posts.slice(rest, @posts.length).map (h) => @getPost(h).render()

  expand: =>
    @full = on
    Nullchan.projector.scheduleRender()

  renderSkipGap: (count) =>
    props = { onclick: @expand, key: "skip-#{@opHash}" }
    h "div.skip-gap.no-select", props,
      "#{count} post(s) omitted. ↕ "
      h "span.expand-button", "expand"


window.Thread = Thread
