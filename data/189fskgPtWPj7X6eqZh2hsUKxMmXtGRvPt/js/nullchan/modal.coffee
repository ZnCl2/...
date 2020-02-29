class Modal extends Logger
  shown: off

  constructor: ->
    @projector = Nullchan.projector
    @onInit()

  onInit: =>

  show: =>
    @shown = on
    # Nullchan.view.blur(on)
    cnt = document.getElementById('modal')
    @projector.replace(cnt, @renderOuter)
    @afterShow?()

  hide: =>
    @shown = off
    # Nullchan.view.blur(off)
    @afterHide?()
    @projector.scheduleRender()

  renderOuter: =>
    shown = @shown 
    shown = false if Nullchan.started == false
    h 'div#modal', { classes:  { @shown } },
      h 'div#modal-bg', { classes:  { shown } }
      h 'div#modal-inner', @render()

  render: => "(empty view)"

window.Modal = Modal
