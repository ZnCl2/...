class Images extends Logger
  getPost: (evt) =>
    unless Nullchan.view.posts
      return null 

    $post = $(evt.target).closest(".post")
    cls   = $post.prop('class').split(' ')

    for name in cls
      continue unless name.substring(0,4) == "msg-"
      return Nullchan.view.posts[name.substring(4)]
    return null

  onload: (evt) =>
    post = @getPost(evt)
    post?.onImageLoad()

  onerror: (evt) =>
    post = @getPost(evt)
    post?.onImageError()

window.Images = new Images
