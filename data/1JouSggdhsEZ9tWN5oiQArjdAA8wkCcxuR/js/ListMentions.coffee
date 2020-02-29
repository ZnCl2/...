class ListMentions extends ZeroFrame

  init: ->

    @tag_field = $("<textarea class='editor hidden'></textarea>")
    @tag_box = $("div.username")
    @feed = $("<a class='button hidden'>Feed + History</a>")
    @stationary = $(".username span")
    @results = $(".results")
    @userdb = "1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV"

    @following = {}

    @tag_field.appendTo @tag_box 
    @feed.appendTo @tag_box

    @stationary.on "click", @enterTag
    @tag_field.on "keydown", (e) =>
      if e.keyCode == 13
        @goAhead()
    @feed.on "click", @goAhead    

    @on_site_info = new Promise()
    @on_loaded = new Promise()

    @on_site_info.then =>
      # Check merger permissions
      if "Merger:ZeroMe" not in @site_info.settings.permissions
        @log "Get permission."
        @cmd "wrapperPermissionAdd", "Merger:ZeroMe", =>
          @updateSiteInfo =>
            @on_loaded.resolve() 
      else
        @on_loaded.resolve()

  goAhead: () => 
    if @setTag()
      for other_tag in Object.keys(@following)
        @following[other_tag].stopWatchingMentions()
      my_tag = new Tag(@tag)
      @following[@tag] = my_tag 
      my_tag.watchMentions()

  setTag: =>
    res = @tag_field.val().match(/[@#]\w+/)
    if not res 
      @tag_field.val ""
      return false
    @tag = res[0].toLowerCase()
    @feed.addClass "hidden"
    @tag_field.addClass "hidden"
    @stationary.text @tag 
    @stationary.removeClass "hidden"
    @results.html ""
    return true

  onOpenWebsocket: (e) =>
    @updateSiteInfo()
    @updateServerInfo()

  updateSiteInfo: (cb=null) =>
    on_site_info = new Promise()
    @cmd "mergerSiteList", {}, (merged_sites) =>
      @merged_sites = merged_sites
      on_site_info.then =>
        if "Merger:ZeroMe" in @site_info.settings.permissions and not @merged_sites[@userdb]
          @log "Adding UserDb."
          @cmd "mergerSiteAdd", @userdb
        @on_site_info.resolve()

    @cmd "siteInfo", {}, (site_info) =>
      @address = site_info.address
      @site_info = site_info
      on_site_info.resolve()

  updateServerInfo: =>
    @cmd "serverInfo", {}, (server_info) =>
      @server_info = server_info
      if @server_info.rev < 1400
        @cmd "wrapperNotification", ["error","You need v 0.4.0."]


  enterTag: =>
    $(".log").addClass "hidden"
    @stationary.addClass "hidden"
    @tag_field.removeClass "hidden"
    @tag_field.val ""
    @tag_field.focus()
    @feed.removeClass "hidden" 

  
window.Page = new ListMentions()
