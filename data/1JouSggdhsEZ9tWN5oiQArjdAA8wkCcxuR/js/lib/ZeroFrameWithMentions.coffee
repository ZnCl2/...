class ZeroFrameWithMentions extends ZeroFrame
  constructor: ->
    @mentions = {}
    @recent_mentions = {}
    @userdb = "1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV"
    @merged_sites = {}
    @site_info = null
    @max_date = 0 
    @feed_worker = null
    @loaded = false
    
    super()

  onMention: (m) =>
    @log m

  getMentions: (user=null) =>
    if user
      if @mentions[user]
        return @mentions[user]
      else
        return []
    else
      return @mentions

  loadMentions: (user=null) =>
    
    if user
      tag = user
    else
      tag = "@"

    # Query the database for posts
    query = """
            SELECT 'Post' AS type, date_added, body, user_name FROM post 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%#{tag}%' 
            UNION ALL
            SELECT 'Comment' AS type, date_added, body, user_name FROM comment 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%#{tag}%' 
            ORDER BY date_added ASC 
            """
    @cmd "dbQuery", [query], (res) => 
      if res
        for r in res
          if r.date_added > @max_date
            @max_date = r.date_added
          match = r.body.match /@\w+/ig 
          if match
            for x in match
              m = JSON.stringify { type: r.type, date_added: r.date_added, body: r.body, user_name: r.user_name.toLowerCase() } 
              @pushMention x.toLowerCase(), m

    @log @mentions

  pushMention: (x,m) =>
    if not @mentions[x]
      @mentions[x] = {seen: [], unseen: [m]}
      return
    if m not in @mentions[x].seen.concat @mentions[x].unseen 
      @mentions[x].unseen.push m


  getUnseenMentions: (user) =>
    @log "Getting unseen mentions"
    if not @mentions[user]
      return []
    unseen = []
    while @mentions[user].unseen.length > 0
      x = @mentions[user].unseen.pop()
      @mentions[user].seen.push x
      unseen.push JSON.parse x
    return unseen

  getAllMentions: (user) =>
    @log "Getting all mentions"
    if not @mentions[user]
      return []
    else
      return @mentions[user].seen.map(JSON.parse).concat @getUnseenMentions(user) 


  loadRecentMentions: =>
    @log "Loading Recent mentions"
    query = """
            SELECT 'Post' AS type, date_added, body, user_name FROM post 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%@%' AND date_added > #{@max_date-12000}
            UNION ALL
            SELECT 'Comment' AS type, date_added, body, user_name FROM comment 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%@%' AND date_added > #{@max_date-12000}
            ORDER BY date_added ASC 
            """
    @cmd "dbQuery", [query], (res) => 
      if res
        for r in res
          match = r.body.match /@\w+/ig 
          if match
            for x in match
              if r.date_added > @max_date
                @max_date = r.date_added

              m = { type: r.type, date_added: r.date_added, body: r.body, user_name: r.user_name.toLowerCase() } 
              @pushMention x.toLowerCase(), JSON.stringify(m)
              @onMention m 
    @log @mentions
    
  watchMentions: (user=null) =>
    if @feed_worker
      @stopWatchingMentions()
    @feed_worker = setInterval ( => @loadRecentMentions(user) ) , 30000
   
  stopWatchingMentions: =>
    if @feed_worker
      clearInterval @feed_worker
      @feed_worker = null

window.ZeroFrameWithMentions = ZeroFrameWithMentions
