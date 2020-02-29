class Post
  constructor: (data) ->
    @previewing  = off
    @imageLoaded = false
    @imageError  = false
    @highlighted = off

    for key, value of data 
      @[key] = value

  isValid: =>
    return false if @hashsum.length != 32
    return true

  shortName: =>
    return "Anonymous" if @anonymous == true
    return "Anonymous" unless @cert_user_id
    return "Anonymous" if @cert_user_id.endsWith("anonymous")
    return @cert_user_id.split("@")[0]

  fileHash: =>
    split = @attachment_full_path.split("/")
    name  = split[split.length-1]
    split = name.split(".") 
    return split[0].substring(0, 15) + "⋯." + split[1]

  fileName: =>
    split = @attachment.split('.')
    name  = split.slice(0, split.length-1).join(".")
    name  = name.substring(0, 25) + "⋯" if name.length > 25
    return name + "."  + split[split.length-1]

  addMention: (from) =>
    @reflinks ||= {}
    @reflinks[from] = true

  urlTo: =>
    parent = @parent || @hashsum
    result = "?/#{@board}/thread/#{parent}"
    if !!@parent
      result += "/hl-#{@short_hash}"
    return result

  onPage: =>
    return @$el() != null

  $el: =>
    for el in $(".msg-#{@hashsum}")
      continue if $(el).parent().hasClass('preview')
      return $(el)
    return null

  insert: =>
    v = Nullchan.view
    parent = (@parent || @hashsum)
    @num = v.nextNum
    @inserted = true
    v.nextNum++
    v.posts[@hashsum] = @
    v.shortMap[@short_hash] = @hashsum
    v.allThreads[parent] ||= []
    v.allThreads[parent].push(@hashsum)

    for thread in v.pageThreads
      if thread[0] == parent
        thread.push(@hashsum)
    v.prerenderMarkup()
    UnreadCount.set(@board, @num)
    Nullchan.projector.scheduleRender()

  scrollTo: =>
    $.scrollTo(@$el(), 300, { offset: { top: -200 } })
    setTimeout (=> @highlight(on)), 600
    setTimeout (=> @highlight(off)), 3600

  lockHighlight: =>
    @highlighted   = on
    @highlightLock = on
    Nullchan.projector.scheduleRender()

  unlockHighlight: =>
    @highlighted   = off
    @highlightLock = off
    Nullchan.projector.scheduleRender()

  highlight: (value = on) =>
    return if @highlightLock
    @highlighted = value
    Nullchan.projector.scheduleRender()

  preview: (hash = off, style) =>
    if hash == off    
      @previewing = off
      @style = null
    else
      @previewing = { hash, style }
    Nullchan.projector.scheduleRender()

  onImageLoad: =>
    clearTimeout(@imgpTimeout) if @imgpTimeout
    @imgpTimeout = null
    @imageLoaded = true
    Nullchan.projector.scheduleRender()
    setTimeout(@removeImgPreloader, 500)

  removeImgPreloader: =>
    @preloaderRemoved = true
    Nullchan.projector.scheduleRender()

  onImageError: =>
    clearTimeout(@imgpTimeout) if @imgpTimeout
    @imgpTimeout = null
    @imageError = true
    # Nullchan.projector.scheduleRender()

  callForm: (evt) =>
    evt.preventDefault()
    evt.stopPropagation()
    text = ">>#{@short_hash}\n"
    Nullchan.view.showFloatingForm(@parent || @hashsum, text)

  onInsert: =>
    return unless @inserted
    @scrollTo()

  render: =>
    key     = "msg-#{@hashsum}"
    classes = 
      "op":               (@parent == null)
      "has-file":         @attachment?
      "body-not-empty":   (@body?.length > 0)
      "highlighted":      @highlighted
    classes[key] = true
    h "div.post", { classes, key, afterCreate: @onInsert },
      @renderIntro()
      @renderFiles()
      @renderBody()
      @renderPreview()

  renderPreview: =>
    return unless @previewing

    target = Nullchan.view.posts[@previewing.hash]
    h "div.preview", { styles: @previewing.style }, target.render()

  renderAuthor: =>
    if Nullchan.settings.admins?[@cert_user_id] and @anonymous != true
      h "span.name.not-anon.admin", "Admin"
    else
      name = @shortName()
      h "span.name", classes: { "not-anon": (name != "Anonymous") }, name

  renderIntro: =>
    date = new Date(@created_at * 1000)
    key  = "post-no-#{@num}"
    opts = { classes: { "post-no": true }, onclick: @callForm, id: key, key }

    h "p.intro",
      h "span.subject", [@title, " "]
      @renderAuthor()
      " "
      h "time", title: date.toString(), Helpers.timeSince(date.getTime() / 1000)
      " "
      Markup.renderLink(@urlTo(), opts, "No.#{@num}")
      @renderThreadLink()      
      @renderMentions()

  renderThreadLink: =>
    return [] unless @parent == null and Nullchan.view.currentView == "list"
    classes = { "no-underscore": true }
    Markup.renderLink(@urlTo(), { classes }, "[Reply]")

  renderMentions: =>
    return [] unless @reflinks?
    hashes = Object.keys(@reflinks).sort(Nullchan.view.sortPosts)
    html   = hashes.map (to) => Markup.renderMention(@hashsum, to)
    h "span.mentioned.unimportant", innerHTML: html.join("")

  renderBody: =>
    h "div.body", innerHTML: @rendered_body

  renderImgPreloader: (styles) =>
    if @preloaderRemoved
      return []

    text = "loading file..."
    text = "file not found" if @imageError == true

    opts = 
      classes:  { error: (@imageError == true) }
      styles:   styles
      onclick:  Nullchan.emptyClick

    if @imageLoaded
      opts.classes.error  = false
      opts.classes.hidden = true

    h "div.image-preloader.no-select", opts, 
      h "span", text

  renderFiles: () =>
    return [] unless !!@attachment
    href     = @attachment_full_path
    props    = { href: @attachment_full_path, download: @attachment }

    styles = 
      width:   @attachment_thumb_width.toString()  + "px"
      height:  @attachment_thumb_height.toString() + "px"
    imgprops   = 
      src:     @attachment_thumb_path 
      styles:  styles
      onload:  Images.onload
      onerror: Images.onerror

    h "div.files",
      h "div.file",
        h "p.fileinfo",
          h "span", "File: "
          h "a", { href, target: "_blank" }, @fileHash()
          h "span.unimportant", 
            " (#{Helpers.formatSize(@attachment_size)}, "
            "#{@attachment_full_width}x#{@attachment_full_height}, "
            h "a", { href, download: @attachment }, @fileName()
            ")"
        h "a", { href: @attachment_full_path, key: "preload" },
          @renderImgPreloader(styles)
          h "img.post-image", imgprops

window.Post = Post
