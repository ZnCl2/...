class View extends Logger
  params:       null
  DB:           null
  blurred:      off
  notFound:     false
  name:         "View Base"
  unselectable: false

  constructor: (@params, @DB) ->
    @randID = Math.random().toString().substring(3, 9)

  afterShow: =>

  onSiteInfo: =>

  _render: =>
    props = { classes: { @blurred, @unselectable } }

    if @notFound
      h("div#container", props, @renderNotFound())
    else
      h("div#container", props, @render())

  renderNotFound: =>
    h "div#not-found.wide-notice",
      h "h1", "404"
      h "p", "Nothing to see here."
      @link "root", "back to main page"

  renderFooter: =>
    h 'blockquote#footer.muted.no-select',
      'Powered by '
      @link repoLink, "Nullchan engine"
      " (v #{NullchanVersion})"
      h "br"
      "You can message the devs on "
      @link "/Mail.ZeroNetwork.bit/?to=sthetz", "ZeroMail"

  loadData: =>
    new Promise (resolve) => resolve()

  blur: (state) =>
    @blurred = state

  onError: (e) =>
    Nullchan.onError(e)

  link: (href, opts, children) =>
    Markup.renderLink(href, opts, children)

  detach: =>
    Nullchan.projector.detach(@_render)

  show: =>
    new Promise (resolve) =>
      @loadData().then =>
        cnt = document.getElementById("container")
        Nullchan.projector.replace(cnt, @_render)
        Nullchan.preloader.hide()
        $.scrollTo("0px", 0)
        @afterShow()

        if Nullchan.storage.get("anon-disclaimer-shown") != true
          (new AnonymityDisclaimer()).show()

        resolve()

window.View = View

