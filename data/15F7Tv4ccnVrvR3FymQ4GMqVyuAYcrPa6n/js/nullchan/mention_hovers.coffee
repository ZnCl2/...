class MentionHovers extends Logger
  constructor: ->
    $(document).on('mouseenter', '.mention', @mouseenter)
    $(document).on('mouseleave', '.mention', @mouseleave)
    $(document).on('click',      '.mention', @click)

  isVisible: ($el) =>
    return (
      $el.offset().top >= $(window).scrollTop() and
      $el.offset().top + $el.height() <= $(window).scrollTop() + $(window).height()
    )

  getPost: (hash) =>
    return Nullchan.view.posts[hash]

  mouseenter: (event) =>
    $mention = $(event.target)
    return if $mention.hasClass("broken")

    post     = @getPost($mention.data('to'))
    $post    = $(".msg-#{post?.hashsum}")

    if !!post and $post?.is(":visible") and @isVisible($post.first())
      post.highlight(on)
    else
      post.unlockHighlight()
      host = @getPost($mention.data('from'))
      host.preview(post.hashsum, @calculateStyle($mention, event))

  mouseleave: (event) =>
    $link = $(event.target)
    return if $link.hasClass("broken")
    @getPost($link.data('to')).highlight(off)
    @getPost($link.data('from')).preview(off)

  click: (event) =>
    event.preventDefault()
    event.stopPropagation()

    $link = $(event.target)
    @getPost($link.data('from')).preview(off)
    target = @getPost($link.data('to'))

    if target.onPage()
      target.lockHighlight()
      target.scrollTo()
      setTimeout target.unlockHighlight, 3000
    else 
      Nullchan.navigate($link.prop("href"), event)

  calculateStyle: ($target, event) =>
    pos   = $target.position()
    width = $target.outerWidth()

    return {
      top:      (pos.top + 20) + "px"
      left:     ((pos.left + width) - 12) + "px"
    }

window.MentionHovers = new MentionHovers()
