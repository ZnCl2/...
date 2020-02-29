class UnreadCount extends Logger
  getAll: =>
    result = []
    for board in Object.keys(Nullchan.boards)
      result[board] = @get(board)
    return result

  get: (board) =>
    Nullchan.storage.get("read/#{board}/") || 0

  set: (board, count) =>
    Nullchan.storage.set("read/#{board}/", count)

window.UnreadCount = new UnreadCount()
