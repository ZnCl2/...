class Storage extends Logger
  data: {}

  reload: =>
    new Promise (resolve) =>
      Nullchan.cmd "wrapperGetLocalStorage", [], (response) =>
        @data = response || {}
        resolve()

  set: (key, value) =>
    @data[key] = value
    @save()

  save: =>
    new Promise (resolve) =>
      Nullchan.cmd "wrapperSetLocalStorage", @data

  get: (key) =>
    return @data[key]

window.Storage = Storage
