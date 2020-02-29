class Database extends Logger
  selectMessages: "SELECT message.*, keyvalue.value AS cert_user_id FROM message
    LEFT JOIN json AS data_json USING (json_id)
    LEFT JOIN json AS content_json ON 
    (data_json.directory = content_json.directory AND content_json.file_name = 'content.json')
    LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)"

  execute: (query, callback) ->
    new Promise (resolve) =>
      Nullchan.cmd("dbQuery",  query.trim(), (response) => resolve(response))

  loadPostCounts: ->
    query = "SELECT message.board, COUNT(*) FROM message
      WHERE message.p1 IS NOT NULL GROUP BY board"

    new Promise (resolve) =>
      @execute(query).then (response) =>
        result = {}
        for res in response
          result[res.board] = res["COUNT(*)"]
        resolve(result)

  loadLastPost: =>
    new Promise (resolve) =>
      query = "#{@selectMessages} WHERE message.p1 IS NOT NULL ORDER BY message.p5 DESC LIMIT 1"
      @execute(query).then (response) =>
        if response.length == 1
          resolve(@unpackPost(response[0], 0))
        else
          resolve(false)

  loadBoard: (boardKey) =>
    new Promise (resolve) =>
      query = " #{@selectMessages}
        WHERE message.board = '#{boardKey}' AND message.p1 IS NOT NULL
        GROUP BY message.p1
        ORDER BY message.p5 ASC
      "
      @execute(query).then (response) =>
        result = []
        posts  = response.sort (a, b) -> (if a.p5 > b.p5 then 1 else -1)
        num    = 1
        for post in posts
          try
            result.push(@unpackPost(post, num))
          catch e
            @log("Failed to unpack post!", post, e)
            continue
          num++
        resolve(result, num)

  packPost: (raw) =>
    data = 
      board:  raw.board
      p2:     raw.title
      p3:     raw.body
      p5:     raw.created_at
      p6:     raw.parent

    if raw.attachment
      data.a1 = raw.attachment
      data.a2 = raw.attachment_size
      data.a3 = raw.attachment_full_height
      data.a4 = raw.attachment_full_width
      data.a5 = raw.attachment_full_path
      data.a6 = raw.attachment_thumb_height
      data.a7 = raw.attachment_thumb_width
      data.a8 = raw.attachment_thumb_path

    for attr in ["p2", "p3", "a1"]
      if (Helpers.isEmptyString(data[attr])) or data[attr] == undefined
        delete(data[attr])
      else
        data[attr] = Helpers.UTFtoBase64(data[attr])

    data.p4 = true if raw.anonymous
    data.p6 = null unless !!data.p6
    data.p1 = md5(JSON.stringify(data))
    return data

  unpackPost: (raw, num) ->
    post = 
      board:        raw.board
      num:          num
      cert_user_id: raw.cert_user_id
      json_id:      raw.json_id
      short_hash:   raw.p1.substring(22, 32)
      hashsum:      raw.p1.replace(/\s/g, '')
      body:         raw.p3
      anonymous:    !!raw.p4
      created_at:   raw.p5
      parent:       raw.p6
      title:        raw.p2

    if raw.a1
      post.attachment               = raw.a1
      post.attachment_size          = raw.a2
      post.attachment_full_height   = raw.a3
      post.attachment_full_width    = raw.a4
      post.attachment_full_path     = raw.a5
      post.attachment_thumb_height  = raw.a6
      post.attachment_thumb_width   = raw.a7
      post.attachment_thumb_path    = raw.a8

    for column in ["title", "body", "attachment"]
      if post[column]
        post[column] = Helpers.Base64toUTF(post[column])

    if !!raw.p7
      post.cert_user_id = raw.p7

    return post

window.Database = Database

