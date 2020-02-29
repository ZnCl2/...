# video_player.coffee

class video_playing
  constructor: ->
    @video_started = 0
    @player_timeout

  delete_from_data_json: (file_uri, cid, com_body, com_date_added, cb) =>
    data_inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
    console.log("deleting comment from data.json at directory: " + Page.site_info.auth_address)
    Page.cmd "fileGet", data_inner_path, (res) =>
      data = JSON.parse(res)
      console.log(data["comment"][file_uri])

      comment_count = 0
      for i in data["comment"][file_uri]
        console.log("Comment row: " + data["comment"][file_uri][comment_count]) 
        if com_date_added.toString().indexOf(data["comment"][file_uri][comment_count]["date_added"]) != -1
          data["comment"][file_uri].splice(comment_count, 1)
          break
        comment_count++    
      
      Page.cmd "fileWrite", [data_inner_path, Text.fileEncode(data)], (res) =>
        cb?(res)
  
  delete_comment: (file_uri, cid, body, date_added) =>
    delete_from_data_json = @delete_from_data_json
    content_inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";

    this_load_comments = @load_comments

    Page.cmd "wrapperConfirm", ["Delete comment?", "Delete"], =>
      delete_from_data_json file_uri, cid, body, date_added, (res) ->
        if res == "ok"
          Page.cmd "sitePublish", {"inner_path": content_inner_path} 
          console.log("[KopyKate: Deleted comment]")
          this_load_comments()

  register_comment: (file_uri, body, date_added, cb) =>
    inner_path = "data/users/" + Page.site_info.auth_address + "/data.json"
    Page.cmd "fileGet", [inner_path, false], (res) =>
      console.log "This is comment res: " + JSON.parse(res)
      if res
        res = JSON.parse(res)
      if res is null
        res = {}
      if res.comment is null or res.comment is undefined
        res.comment = {}
      if res.comment[file_uri] is null or res.comment[file_uri] is undefined
        res.comment[file_uri] = []

      console.log(res.comment)
      console.log(file_uri)
      console.log(res.comment[file_uri])
      
      res.comment[file_uri].push({body: body, date_added: date_added})
      Page.cmd "fileWrite", [inner_path, Text.fileEncode(res)], cb

  write_comment: (file_date_added, file_directory, comment_body) =>    
    register_comment = @register_comment
    load_comments = @load_comments
    file_uri = file_date_added + "_" + file_directory
    editor.check_content_json (res) =>
      register_comment file_uri, comment_body, Time.timestamp(), (res) ->
        load_comments()
        Page.cmd "siteSign", {inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"}, (res) ->
          Page.cmd "sitePublish", {inner_path: "data/users/" + Page.site_info.auth_address + "/content.json", "sign": false}

  load_related: (query_string) =>
    Page.cmd "dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) WHERE file.title LIKE '%" +query_string+ "%' ORDER BY date_added DESC"], (res0) =>
      if res0.length < 15
        query = "WHERE file.title LIKE '%%'" 
      else
        query = "WHERE file.title LIKE '%" +query_string+ "%'"

      console.log("FIRST WORD: " + query_string)
      #query = "WHERE file.title LIKE '%" +query_string+ "%'"
      order_actual = {filter: "", address: "18Pfr2oswXvD352BbJvo59gZ3GbdbipSzh", limit: 1000}
      Page.cmd "dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) "+query+" ORDER BY date_added DESC LIMIT 15"], (res1) =>
        #Page.cmd "optionalFileList", order_actual, (res2) =>
      
        related_counter = 0
        
        $("#related_column").html ""
        $("#related_column").append "<span>Up next</span>"
        
        for row1, i in res1
          #for row2, j in res2
          #optional_name = row2.inner_path.replace /.*\//, ""
            
          #if row1.file_name == optional_name
          video_string = row1.date_added + "_" + row1.directory
          full_channel_name = row1.cert_user_id
          video_channel_name = row1.cert_user_id.split("@")[0]
            
          video_row_id = "related_" + related_counter
          video_row = $("<div></div>")
          video_row.attr "id", video_row_id
          video_row.attr "class", "related_row"
              
          video_info_id = "relate_info_" + related_counter
          video_info = $("<div></div>")
          video_info.attr "id", video_info_id
          video_info.attr "class", "related_info"
              
          video_link_id = "related_link_" + related_counter
          video_link = $("<a></a>")
          video_link.attr "id", video_link_id
          video_link.attr "class", "related_link"
          video_link.attr "href", "?Video=" + video_string
          video_link.text row1.title
              
          video_channel_id = "related_channel" + related_counter
          video_channel = $("<a></a>")
          video_channel.attr "id", video_channel_id
          video_channel.attr "class", "related_channel"
          video_channel.attr "href", "?Channel=" + full_channel_name
          video_channel.text video_channel_name.charAt(0).toUpperCase() + video_channel_name.slice(1)
              
          thumbnail_id = "related_thumb_" + related_counter
          thumbnail = $("<a></a>")
          thumbnail.attr "id", thumbnail_id
          thumbnail.attr "class", "related_thumb"
          thumbnail.css "background-image", "url('"+row1.image_link+"')"
          thumbnail.attr "href", "?Video=" + video_string
          
          $("#related_column").append video_row
          $("#" + video_row_id).append thumbnail
          $("#" + video_row_id).append video_info
          $("#" + video_info_id).append video_link
          $("#" + video_info_id).append video_channel
          $("#" + thumbnail_id).on "click", ->
            Page.nav(this.href)
          $("#" + video_link_id).on "click", ->
            Page.nav(this.href)
          $("#" + video_channel_id).on "click", ->
            Page.nav(this.href)
		  
          related_counter += 1
        

  load_comments: =>
    init_url = Page.history_state["url"]
    real_url = init_url.split("Video=")[1]

    video_date_added = real_url.split("_")[0]
    video_user_address = real_url.split("_")[1]
    file_uri = real_url

    query = "SELECT * FROM comment LEFT JOIN json USING (json_id) WHERE file_uri='" + real_url + "' ORDER BY date_added DESC"

    Page.cmd "dbQuery", [query], (res) =>

      comment_input = $("<input>")
      comment_input.attr "id", "comment_box_input"
      comment_input.attr "class", "comment_box_input"
      comment_input.attr "placeholder", "Write a comment..."

      my_counter = 0
      comment_counter = 0
      $("#comment_actual").html ""
      $("#comment_actual").append comment_input

      write_comment = @write_comment
      $("#comment_box_input").on "keypress", (e) ->
        comment_body = this.value
        if e.which == 13
          if Page.site_info.cert_user_id
            write_comment video_date_added, video_user_address, comment_body
          else
            Page.cmd "certSelect", [["zeroid.bit"]], (res) =>
              write_comment video_date_added, video_user_address, comment_body

      for comment in res
        comment_body = comment.body
        comment_body = comment.body.replace /</g, ' < '
        comment_body = comment.body.replace />/g, ' > '
        comment_date_added = comment.date_added
        comment_directory = comment.directory
        if comment.cert_user_id is null or comment.cert_user_id is undefined
          comment_user_id = "guest"
        else 
          comment_user_id = comment.cert_user_id.split("@")[0]
        comment_id = "comment_" + comment_date_added + "_" + comment_directory
      
        comment_single_id = "comment_" + comment_counter
        comment_single = $("<div></div>")
        comment_single.attr "id", comment_single_id
        comment_single.attr "class", "comment_single"
 
        comment_this_user_id = "comment_user_" + comment_counter 
        comment_user = $("<div></div>")
        comment_user.attr "id", comment_this_user_id
        #comment_user.attr "class", "comment_user"
        #comment_user.text comment_user_id.charAt(0).toUpperCase() + comment_user_id.slice(1)
        
        comment_icon = $("<div></div>")
        #comment_icon.attr "id", "comment_icon"
        comment_icon.attr "class", "comment_icon"
        
        comment_username = $("<span></span>")
        #comment_username.attr "id", "comment_username"
        comment_username.attr "class", "comment_user"
        comment_username.text comment_user_id.charAt(0).toUpperCase() + comment_user_id.slice(1)
        
        comment_date = $("<span></span>")
        comment_date.attr "id", "comment_date"
        comment_date.attr "class", "comment_date"
        comment_date.text " " + Time.since(comment_date_added)
        
        comment_delete_id = "comment_delete_" + comment_counter
        comment_delete = $("<a></a>")
        comment_delete.attr "id", comment_delete_id
        comment_delete.attr "class", "comment_delete"
        comment_delete.attr "href", "javascript:void(0)"
        comment_delete.attr "data-uri", file_uri
        comment_delete.attr "data-cid", my_counter
        comment_delete.attr "data-body", comment.body
        comment_delete.attr "data-date", comment.date_added
        comment_delete.text " [-delete]"

        comment_text = $("<div></div>")
        comment_text.attr "id", "comment_text"
        comment_text.attr "class", "comment_text"
        comment_text.text comment_body

        $("#comment_actual").append comment_single
        $("#" + comment_single_id).append comment_user
        $("#" + comment_this_user_id).append comment_username
        $("#" + comment_this_user_id).append comment_date
        $("#" + comment_this_user_id).append comment_icon
        if Page.site_info.cert_user_id is comment.cert_user_id
          $("#" + comment_this_user_id).append comment_delete
        $("#" + comment_single_id).append comment_text
        
        delete_comment = @delete_comment
        $("#" + comment_delete_id).on "click", ->
          console.log("Body: " + $(this).data("body"))
          console.log("Date added: " + $(this).data("date"))
          console.log("File uri: " + $(this).data("uri"))
          console.log("Cid: " + $(this).data("cid"))
          delete_comment $(this).data("uri"), $(this).data("cid"), $(this).data("body"), $(this).data("date")

        comment_counter = comment_counter + 1
        if Page.site_info.cert_user_id is comment.cert_user_id
          my_counter += 1

  render_video: (video_path) =>
  
    $("#video_box").html ""
        
    video_actual = $("<video></video>")
    video_actual.attr "id", "video_actual"
    video_actual.attr "class", "video_actual"
    video_actual.attr "src", video_path
    video_actual.attr "controls", true
    video_actual.attr "autoplay", true
    
    loading_signal = $("<div></div>")
    loading_signal.attr "id", "player_loading"
    loading_signal.attr "class", "player_loading"
    
    video_started = @video_started
    render_video = @render_video
    
    @player_timeout = setTimeout ->
      if video_started is 0
        console.log "[KopyKate] Player reloaded!"
        render_video(video_path)
    , 10000
    
    $("#video_box").append video_actual
    $("#video_box").append loading_signal
    $("#video_actual").on "canplaythrough", ->
      video_started = 1
      $("#player_loading").remove()

  render_player: =>
    init_url = Page.history_state["url"]
    real_url = init_url.split("Video=")[1]
    
    date_added = real_url.split("_")[0]
    user_address = real_url.split("_")[1]
  
    query = "SELECT * FROM file LEFT JOIN json USING (json_id) WHERE date_added='" + date_added + "' AND directory='" + user_address + "'"
    Page.cmd "dbQuery", [query], (res1) =>
      Page.cmd "optionalFileList", {filter: "", limit: 1000}, (res2) =>
        my_row = res1[0]
        file_name = my_row['file_name']
        video_title = my_row['title']
        video_channel = my_row['cert_user_id'].split("@")[0]
        video_description = my_row['description']
        video_date_added = my_row['date_added']
        user_directory = my_row['directory']

        stats_loaded = false

        i = 0
        for my_file, i in res2
          optional_name = my_file['inner_path'].replace /.*\//, ""
          optional_peer = my_file['peer']
          optional_seed = my_file['peer_seed'] 

          if optional_name is file_name
            stats_loaded = true
            $("#player_info").append "<span class='video_player_title'>" + video_title + "</span>"
            $("#player_info").append "<span class='video_player_stats'>" + optional_seed + " / " + optional_peer + " peers</span>"
            $("#player_info").append "<span class='video_player_username'>" + video_channel.charAt(0).toUpperCase() + video_channel.slice(1) + "</span>"
            $("#player_info").append "<span class='video_player_userdate'>Published " + Time.since(video_date_added) + "</span><br>"
            $("#player_info").append "<span class='video_player_brief'>" + video_description + "</span>"
            $("#player_info").append "<div class='player_icon'></div>"

        if i is res2.length
          if stats_loaded is false
            $("#player_info").append "<span class='video_player_title'>" + video_title + "</span>"
            $("#player_info").append "<span class='video_player_stats'>0 / 0 peers</span><br>"
            $("#player_info").append "<span class='video_player_username'>" + video_channel.charAt(0).toUpperCase() + video_channel.slice(1) + "</span>"
            $("#player_info").append "<span class='video_player_userdate'>Published " + Time.since(video_date_added) + "</span><br>"
            $("#player_info").append "<span class='video_player_brief'>" + video_description + "</span>"
            $("#player_info").append "<div class='player_icon'></div>"   
        
        video_actual = "data/users/" + user_directory + "/" + file_name
        
        @render_video(video_actual)
        
        word_array = video_title.split(" ")
          
        @load_related(word_array[0])

  render: =>
    video_player = $("<div></div>")
    video_player.attr "id", "video_player"
    video_player.attr "class", "video_player"
    
    video_column = $("<div></div>")
    video_column.attr "id", "video_column"
    video_column.attr "class", "video_column"
    
    related_column = $("<div></div>")
    related_column.attr "id", "related_column"
    related_column.attr "class", "related_column"
    
    related_text = 

    video_box = $("<div></div>")
    video_box.attr "id", "video_box"
    video_box.attr "class", "video_box"

    video_info = $("<div></div>")
    video_info.attr "id", "player_info"
    video_info.attr "class", "player_info"

    comment_div = $("<div></div>")
    comment_div.attr "id", "comment_box"
    comment_div.attr "class", "player_info"

    comment_actual = $("<div></div>")
    comment_actual.attr "id", "comment_actual"
    comment_actual.attr "class", "comment_actual"
  
    $("#main").attr "class", "main_nomenu"
    $("#main").html ""
    donav()

    $("#main").append video_player
    $("#video_player").append video_column
    $("#video_player").append related_column
    $("#related_column").html "<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>" 
    $("#video_column").append video_box
    $("#video_column").append video_info
    $("#video_column").append comment_div
    $("#comment_box").append comment_actual

    clearTimeout(@player_timeout)
    @render_player()
    @load_comments()

video_playing = new video_playing()
