class Messages extends Logger
  submit: (formData, form) =>
    @processFiles(formData).then (post) =>
      post = Nullchan.db.packPost(post)
      FileManager.readJSON("data.json", false).then (rawData) =>
        rawData     ?= { message: [] }
        filteredData = { message: [] }

        for oldPost in rawData.message
          filteredData.message.push(oldPost) if !!oldPost.p1 
        filteredData.message.push(post)
        data = Helpers.encodeObject(filteredData)
        FileManager.upload("data.json", data, true).then(@onSuccess(form, post), @onError(form))

  onSuccess: (form, newPost) =>
    return =>
      post = new Post(Nullchan.db.unpackPost(newPost))
      if post.parent
        post.cert_user_id = Nullchan.siteInfo.cert_user_id
        post.insert()
        form.clear()
        form.hide() if form.floating
      else
        Nullchan.navigate("/#{Nullchan.settings.siteAddress}" + post.urlTo(), true)

  onError: (form) =>
    return =>
      alert("Failed to submit your post")

  processFiles: (formData) =>
    new Promise (resolve, reject) =>
      if !!!formData.file
        delete formData.file
        return resolve(formData)

      if ["image/jpeg", "image/png", "image/jpg"].indexOf(formData.file.type) == -1
        reject("Sorry! Only JPEG and PNG files are supported at the moment.")
        return

      image  = document.createElement("img")
      reader = new FileReader()
      reader.onload = (event) => image.src = event.target.result
      image.onload = =>
        canvas    = document.createElement("canvas")
        ctx       = canvas.getContext("2d")
        canvas.width  = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        imageFull = canvas.toDataURL(formData.file.type, 1).split(',')[1]
        maxWidth  = 200
        maxHeight = 200
        width     = image.width
        height    = image.height

        formData.attachment             = formData.file.name.trim()
        formData.attachment_size        = formData.file.size
        formData.attachment_full_height = height
        formData.attachment_full_width  = width

        if (width > height)
          if (width > maxWidth)
            height *= (maxWidth / width)
            width   = maxWidth
        else
          if (height > maxHeight)
            width *= (maxHeight/ height)
            height = maxHeight

        canvas.width  = width
        canvas.height = height
    
        formData.attachment_thumb_height = height
        formData.attachment_thumb_width  = width

        ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0, width, height)

        imageThumb  = canvas.toDataURL("image/jpeg", 1).split(',')[1]
        hash        = md5(imageFull)

        formData.attachment = "#{hash}.jpg" if Helpers.isEmptyString(formData.attachment)


        Promise.all([
          FileManager.write("#{hash}.jpg", imageFull)
          FileManager.write("#{hash}-thumb.jpg", imageThumb)
        ]).then (paths) =>
          formData.attachment_thumb_path = paths[1]
          formData.attachment_full_path = paths[0]
          delete formData.file
          resolve(formData)

      reader.readAsDataURL(formData.file)

window.Messages = new Messages()
