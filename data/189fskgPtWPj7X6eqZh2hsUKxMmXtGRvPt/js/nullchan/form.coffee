class Form extends Logger
  sending:  off
  shown:    false
  floating: false
  addText:  null

  constructor: (@boardKey, @replyTo, @floating) ->

  isDisabled: =>
    noCert = true
    if !!Nullchan.siteInfo.cert_user_id
      noCert = false
      if Nullchan.siteInfo.cert_user_id.endsWith("@anonymous")
        noCert = true
    return (noCert || @sending)

  submit: (evt) =>
    evt.preventDefault()

    unless Nullchan.siteInfo.cert_user_id.endsWith("anonymous")
      if Nullchan.storage.get("zeroid-cert-warned") != true and !Nullchan.isProxy
        return unless confirm("You are about to post with your ZeroID certificate.
          Your username (#{Nullchan.siteInfo.cert_user_id}) will be seen on your posts. 
          If you don't want that, you can select an anonymous certificate by clicking 'change certificate' button.
          Click OK if you still want to post with ZeroID.
        ")
        Nullchan.storage.set("zeroid-cert-warned", true)

    data = @collectData()
    return if data == false
    @sending = on
    Messages.submit(data, @)

  clear: =>
    @sending = off
    @$el()[0].reset()
    Nullchan.projector.scheduleRender()

  show: (parent, text) =>
    @shown    = true
    @replyTo  = parent
    @addText  = text

    Nullchan.projector.scheduleRender()

  hide: =>
    @shown = false
    Nullchan.projector.scheduleRender()

  collectData: =>
    $form  = @$el()
    result = 
      board:      @boardKey
      title:      $form.find('.title').first().val()
      body:       $form.find('.text').first().val()
      file:       $form.find('.file').first()[0].files[0]
      created_at: Helpers.unixTimestamp()

    if Nullchan.isProxy
      result.anonymous = true

    if @replyTo
      result.parent = @replyTo
    if (!!!result.file && (Helpers.isEmptyString(result.body)))
      alert("Your post is empty")
      return false

    delete(result.title) if Helpers.isEmptyString(result.title)
    delete(result.body)  if Helpers.isEmptyString(result.body)
    delete(result.file)  unless result.file

    return result

  updateTextarea: =>
    return if @addText == null
    $el = $(".post-form.floating .text").first()
    $el.focus()
    if @addText != "" 
      $el.val($el.val() + @addText)
    @addText = null

  $el: =>
    $(".post-form.#{if @floating then 'floating' else 'top'}").first()

  render: =>
    opts = 
      onsubmit: @submit
      classes:  { @shown, @floating, top: !@floating }

    if @floating
      opts.afterUpdate = @updateTextarea

    h "form.post-form.no-select", opts,
      @renderPreloader()
      h "table", { classes: { blurred: @isDisabled() } },
        @renderCloseButton()
        @renderMode()
        h "tr",
          h "td", "Title"
          h "td", @renderTitleInput()
        h "tr",
          h "td", "Comment"
          h "td", @renderTextarea()
        h "tr",
          h "td", "File"
          h "td", @renderFileInput()
        h "tr",
          h "td", "Post as..."
          h "td", @renderBottom()

  renderMode: =>
    text = "starting new thread"
    if @replyTo 
      text = "replying to thread ##{Nullchan.getPost(@replyTo).num}"
    h "tr", innerHTML: "<tr><td class='mode' colspan='2'>Mode: #{text}</td></tr>"

  renderCloseButton: =>
    return [] unless @floating
    opts = { onclick: Nullchan.view.hideFloatingForm }
    h "div.close", opts, "[x]"

  renderPreloader: =>
    return [] unless @isDisabled()

    if @sending
      h "div.form-preloader.shown",
        h "div.sending", "Sending your message..."
    else
      h "div.form-preloader.shown",
        h "div.cert-info", { onclick: Nullchan.certSelect },
          "ZeroNet requires a user certificate to sign your content. "
          "You can use auto-generated anonymous certificate or ZeroID."
          h "span.cert-select", "[click to select certificate]"

  renderAuthor: =>
    name = "selecting..."
    anon = true
    cert = Nullchan.siteInfo.cert_user_id

    if !!cert
      name = cert.split("@")[0]
      name = "Anonymous" if cert.endsWith("anonymous") || Nullchan.isProxy
      anon = false if name != "Anonymous"

    h "div.author", 
      h "span.name", { classes: { anon } }, name
      h "span.cert-select", { onclick: Nullchan.certSelect }, "[change certificate]"

  renderBottom: =>
    value  = if @replyTo then "New Reply" else "New Thread"
    button = h "input.submit", { type: "submit", value, disabled: @isDisabled() }
    return [@renderAuthor(), button]

  renderTitleInput: =>
    h "input.title", { type: "text", name: "title", disabled: @isDisabled() }

  renderFileInput: =>
    h "input.file", { type: "file", name: "file", disabled: @isDisabled() }

  renderTextarea: =>
    opts = { name: "body", disabled: @isDisabled() }
    h "textarea.text", opts

window.Form = Form
