class Preloader extends Modal
  projector:   null
  overlayOn:   null
  timeout:     null

  onInit: =>
    @projector.replace(document.getElementById('overlay'), @renderOverlay)
    @delayedShow()

  renderOverlay: =>
    shown   = (@shown == on || @timeout != null || @overlayOn == true)
    classes = { shown }

    h "div#overlay", { classes }

  afterHide: =>
    clearTimeout(@timeout) if @timeout
    @timeout = null

  delayedShow: =>
    @timeout = setTimeout((=> @show()), 1000)
    @projector.scheduleRender()

  render: =>
    h "div.preloader-inner.no-select",
      h "span.bigger", "Loading..."
      h "img", src: "img/preloader.gif", width: 70, height: 70
      h "span.lesser", "this may take a while"

window.Preloader = Preloader
