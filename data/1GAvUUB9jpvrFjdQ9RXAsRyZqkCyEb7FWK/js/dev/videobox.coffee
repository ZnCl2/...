# videobox.coffee

class videobox
  constructor: ->
    @max_videos=15
    @query_string=""
    @counter=1

  more_videos_yes: =>
    @max_videos+=15
    @counter=1
    @update()

  flush: (mode) =>
    if mode is "all"
      @max_videos=15
      @counter=1
    else
      @counter=1

  get_query: =>
    query_value = $("#search_bar").val()
    @query_string=query_value
    @flush("all")
    @update()

  delete_from_content_json: (inner_path, cb) =>
    video_directory = inner_path.split("/")[2]
    video_name = inner_path.split("/")[3]
    content_inner_path = "data/users/" + video_directory + "/content.json";
    console.log("deleting from content.json at directory: " + video_directory + "and file: " + video_name)
    Page.cmd "fileGet", content_inner_path, (res) =>
      data = JSON.parse(res)
      delete data["files_optional"][video_name]
      delete data["files_optional"][video_name+ ".piecemap.msgpack"]
      Page.cmd "fileWrite", [content_inner_path, Text.fileEncode(data)], (res) =>
        cb?(res)

  delete_from_data_json: (inner_path, cb) =>
    video_directory = inner_path.split("/")[2]
    video_name = inner_path.split("/")[3]
    data_inner_path = "data/users/" + video_directory + "/data.json";
    console.log("deleting from data.json at directory: " + video_directory + "and file: " + video_name)
    Page.cmd "fileGet", data_inner_path, (res) =>
      data = JSON.parse(res)
      delete data["file"][video_name]
      delete data["file"][video_name+ ".piecemap.msgpack"]
      Page.cmd "fileWrite", [data_inner_path, Text.fileEncode(data)], (res) =>
        cb?(res)

  delete_video: (video) =>
    delete_from_data_json = @delete_from_data_json
    delete_from_content_json = @delete_from_content_json    
    video_directory = video.split("/")[2]
    content_inner_path = "data/users/" + video_directory + "/content.json";

    this_flush = @flush
    this_update = @update

    Page.cmd "wrapperConfirm", ["Are you sure?", "Delete"], =>
      delete_from_content_json video, (res) ->
        if not res == "ok"
          return cb(false)
        delete_from_data_json video, (res) ->
          if res == "ok"
            Page.cmd "sitePublish", {"inner_path": content_inner_path} 
            console.log("[KopyKate: Deleted video " + video + "]")
            this_flush("all")
            this_update()

  update: =>
    console.log "[KopyKate: Retrieving videobox]"
    query_string_no_space = @query_string.replace /\s/g, "%"
    query = "WHERE file.title LIKE '%" +query_string_no_space+ "%'"
    
    Page.cmd "dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) "+query+" ORDER BY date_added DESC"], (res1) =>
      Page.cmd "optionalFileList", {filter: "", limit: 1000}, (res2) =>

        $("#videobox").html ""
        $("#more_videos").html "<div class='more_videos text'>More videos!</div>"

        for row1, i in res1
          for row2, j in res2
            optional_path = row2['inner_path']
            file_name = row2['inner_path'].replace /.*\//, ""
            file_seed = row2['peer_seed']
            file_peer = row2['peer']
            video_name = row1['file_name']
            video_title = row1['title']
            video_brief = row1['description']
            video_image = row1['image_link']
            video_date_added = row1['date_added']
            video_user_address = row1['directory']

            if video_name is file_name and video_user_address is Page.site_info.auth_address and @counter < @max_videos
              file_seed_no_null = file_seed || 0

              video_string = video_date_added + "_" + video_user_address
              video_row_id = "boxrow_" + @counter
              video_link_id = video_string

              video_row = $("<div></div>")
              video_row.attr "id", video_row_id
              video_row.attr "class", "videobox_row"

              video_edit_link_id = "edit_" + @counter
              video_edit_link = $("<a></a>")
              video_edit_link.attr "id", video_edit_link_id
              video_edit_link.attr "class", "editor_button"
              video_edit_link.attr "href", "?Editor=" + video_string

              video_delete_link_id = "delete_" + @counter
              video_delete_link = $("<button></button>")
              video_delete_link.attr "id", video_delete_link_id
              video_delete_link.attr "class", "delete_button"
              video_delete_link.attr "value", optional_path

              video_link_id = "vlink_" + video_string
              video_link = $("<a></a>")
              video_link.attr "id", video_link_id
              video_link.attr "class", "video_link edit_link_alt"
              video_link.attr "href", "?Video=" + video_string
              video_link.text video_title

              $("#videobox").append video_row
              $("#" + video_row_id).append video_delete_link
              $("#" + video_row_id).append video_edit_link
              $("#" + video_row_id).append video_link

              delete_video = @delete_video
              $("#" + video_delete_link_id).on "click", ->
                delete_video(this.value)
              $("#" + video_edit_link_id).on "click", ->
                Page.nav(this.href)
              $("#" + video_link_id).on "click", ->
                Page.nav(this.href)

              @counter = @counter + 1

  render: =>
    query_value = $("#search_bar").val()
    @query_string=query_value
    videobox_div = $("<div></div>")
    videobox_div.attr "id", "videobox"
    videobox_div.attr "class", "videobox"

    footer = $("<div></div>")
    footer.attr "id", "footer"
    footer.attr "class", "footer"

    more_videos = $("<a></a>")
    more_videos.attr "id", "more_videos"
    more_videos.attr "class", "more_videos"
    more_videos.attr "href", "javascript:void(0)"

    $("#main").attr "class", "main"
    $("#main").html ""
    donav()
    #$("#main").attr "style", "width: calc(100% - 236.25px); margin-left: 236.25px"
    #$("#nav").show()
    $("#main").append videobox_div

    $("#main").append footer
    $("#footer").append more_videos
    $("#more_videos").html "<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>"

    more_videos_yes = @more_videos_yes
    $("#more_videos").on "click", ->
      $("#more_videos").html "<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>" 
      more_videos_yes()

    #delete_videos = @delete_videos
    #$("#videobox_form").on "submit", (e) ->
    #  delete_videos(this)
    #  e.preventDefault()

    @update()

videobox = new videobox()
