class Tag extends Class
  constructor: (tag) ->
    @tag = tag
    @mentions = {seen:[],unseen:[]}
    @max_date = 0
    @feed_worker = null
    @loadMentions()
    
  getAllMentions: =>
    @log "Getting all mentions."
    return @mentions.seen.concat(@mentions.unseen) 

  getUnseenMentions: () =>
    @log "Getting unseen mentions"
    unseen = []
    while @mentions.unseen.length > 0
      x = @mentions.unseen.pop()
      @mentions.seen.push x
      unseen.push x
    return unseen

  watchMentions:  =>
    @log "Watching mentions of #{@tag}"
    if @feed_worker
      @stopWatchingMentions()
    @feed_worker = setInterval (=> @loadRecentMentions()) , 30000


  stopWatchingMentions: =>
    @log "No longer watching for #{@tag}"
    if @feed_worker
      clearInterval @feed_worker
      @feed_worker = null
  
  render: -> 
    @log "Rendering."
    Page.results.html ""
    for m in @getUnseenMentions() 
       @makeRow(m).appendTo Page.results


  loadMentions: ->
    @log "Loading all mentions."
    query = """
            SELECT 
            'Post' AS type, date_added, body, user_name,  
            '?Post/' || json.site || '/' || REPLACE(json.directory, 'data/users/', '') || '/' || post_id AS url,
            'post-' || json.directory || post.post_id AS m_id
            FROM post 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%#{@tag}%' 

            UNION ALL

            SELECT 
            'Comment' AS type, date_added, body, user_name,
            '?Post/' || json.site || '/' || REPLACE(comment.post_uri,'_','/') AS url,
            'comment-' || json.directory || comment.comment_id AS m_id
            
            FROM comment 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%#{@tag}%' 
            ORDER BY date_added ASC 
            """
    Page.cmd "dbQuery", [query], (res) => 
      if res
        for r in res
          if r.date_added > @max_date
            @max_date = r.date_added
          @pushMention r
      @log @mentions
      @onLoad()

  loadRecentMentions: ->
    @log "Loading recent mentions for #{@tag}"
    query = """
            SELECT 
            'Post' AS type, date_added, body, user_name,  
            '?Post/' || json.site || '/' || REPLACE(json.directory, 'data/users/', '') || '/' || post_id AS url,
            'post-' || json.directory || post.post_id AS m_id
            FROM post 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%#{@tag}%' AND date_added > #{@max_date-12000}

            UNION ALL

            SELECT 
            'Comment' AS type, date_added, body, user_name,
            '?Post/' || json.site || '/' || REPLACE(comment.post_uri,'_','/') AS url,
            'comment-' || json.directory || comment.comment_id AS m_id
            FROM comment 
            LEFT JOIN json USING (json_id) 
            WHERE lower(body) LIKE '%#{@tag}%' AND date_added > #{@max_date-12000}

            ORDER BY date_added DESC 
            """
    Page.cmd "dbQuery", [query], (res) => 
      @log res
      if res
        for r in res
          if r.date_added > @max_date
            @max_date = r.date_added
          @pushMention r 
          @onMention r 
    
  onMention: (m) =>
    @log m
    @log "Current: #{Page.tag}, mine #{@tag}"
    if Page.tag == @tag
      my_unseen = @getUnseenMentions()
      if my_unseen.length > 0
        Page.tag_box.css "background","Red"
        setTimeout ( -> Page.tag_box.css "background","Navy" ) , 500
        for x in my_unseen
          @makeRow(x,true).prependTo Page.results

  onLoad: =>
    @log "Loaded."
    @render()

  pushMention: (m) ->
    for old in @mentions.seen.concat(@mentions.unseen)
      if m.m_id == old.m_id
        return
    @mentions.unseen.push m 

  makeRow: (m,is_new = false) ->
    r = $("<div class='row' />") 
    if is_new
      r.addClass "new" 
    r.html "<a href='/Me.ZeroNetwork.bit/#{m.url}' target='_blank' class='nothing'><b>#{m.type} by #{m.user_name}:</b> <span class='date_added'>(#{Time.date m.date_added})</span> <br/><span class='mention_body'>#{m.body}</span></a>" 
    return r
    

window.Tag = Tag
