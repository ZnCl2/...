class FileManager extends Logger
  correctOptional: ".*\\.(png|jpg|gif)"
  optionalOK: false

  resolvePath: (path) =>
    if path.startsWith("data/users") || path.startsWith("data/archive") 
      return path
    if path == "data/settings.json"
      return path
    return "data/users/#{Nullchan.siteInfo.auth_address}/#{path}"

  checkOptional: =>
    new Promise (resolve, reject) =>
      if @optionalOK == true
        resolve()

      @readJSON("content.json", false).then (content) =>
        if content?.optional == @correctOptional
          @optionalOK = true
          return resolve()
        else
          @submitInitialContent().then => resolve()

  submitInitialContent: =>
    new Promise (resolve, reject) =>
      cnt = 
        address:        Nullchan.settings.siteAddress
        cert_auth_type: "web"
        cert_user_id:   Nullchan.siteInfo.cert_user_id
        inner_path:     "data/users/#{Nullchan.siteInfo.auth_address}/content.json"
        optional:       @correctOptional

      @write("content.json", Helpers.encodeObject(cnt)).then (res) =>
        @log("Written content:", res)
        @optionalOK = true
        resolve()

  sign: (inner_path) =>
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "siteSign", { inner_path }, (response) =>
        if response == "ok"
          resolve()
        else
          reject()

  checkCertificate: =>
    new Promise (resolve, reject) =>
      @readJSON("content.json", false).then (content) =>
        unless content
          return resolve()

        if content.cert_user_id == Nullchan.siteInfo.cert_user_id
          return resolve()

        @log("Wrong cert_user_id, setting up...")
        content.cert_user_id   = Nullchan.siteInfo.cert_user_id
        content.cert_auth_type = "web"
        delete content.cert_sign
        delete content.signs

        @write("content.json", Helpers.encodeObject(content)).then =>
          @sign("content.json").then => resolve()

  upload: (inner_path, rawData, publish = false) =>
    new Promise (resolve, reject) =>
      Promise.all([@checkOptional(), @checkCertificate()]).then =>
        @write(inner_path, rawData).then =>
          if publish
            @publish(inner_path).then (=> resolve()), (=> reject())
          else
            resolve()

  write: (inner_path, rawData)  =>
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "fileWrite", [inner_path, rawData], (response) =>
        if response == "ok"
          resolve(inner_path)
        else
          reject("Failed to write file #{name}: '#{response.error}'")

  publish: (inner_path) =>
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "sitePublish", { inner_path }, (response) =>
        if response == "ok"
          resolve(inner_path)
        else
          reject("Failed to publish file #{inner_path}: '#{response.error}'")

  readJSON: (inner_path, required) ->
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "fileGet", { inner_path, required }, (data) =>
        unless data
          return resolve(null) unless required
        try
          parsed = JSON.parse(data)
          resolve(parsed)
        catch exc
          reject("Failed to read JSON #{inner_path}: #{exc}")
        
window.FileManager = new FileManager()
