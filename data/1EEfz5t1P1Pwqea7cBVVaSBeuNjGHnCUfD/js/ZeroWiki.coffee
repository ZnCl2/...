class ZeroWiki extends ZeroFrame

  #
  # The constructor sets the pageId variable. It is used later on
  # to keep track of the page the user loaded.
  #

  constructor: ->
    super()
    @editingPage  = false
    @pageId       = null
    @waitingConfirmation = false

  #
  # Handle ZeroNet onOpenWebsocket.
  #

  onOpenWebsocket: (e) ->
    @cmd "siteInfo", {}, (site_info) =>
      @site_info = site_info
      WikiUi.loggedInMessage(site_info.cert_user_id)
      @updateUserQuota()
    if not @isStaticRequest()
      @pageLoad()

  #
  # Handle ZeroNet messages.
  #

  route: (cmd, message) ->
    if cmd is "setSiteInfo"
      @site_info = message.params
      WikiUi.loggedInMessage(message.params.cert_user_id)
      @updateUserQuota()
      if message.params.event[0] is "file_done"
        slug = @getSlug()
        query = "SELECT * FROM pages WHERE pages.slug = '#{slug}' ORDER BY date_added DESC LIMIT 1"
        @cmd "dbQuery", [query], (page) =>
          if page.length is 1 and @editingPage is true
            if page[0].id isnt @pageId and @waitingConfirmation isnt true
              @waitingConfirmation = true
              confirmMessage  = "This page has been updated. Do you want to load the changes?"
              @cmd "wrapperConfirm", [confirmMessage, "Yes"], (confirmed) =>
                @waitingConfirmation = false
                @pageLoad()
          else
            if not @isStaticRequest()
              @pageLoad()

  #
  # Select user certificate.
  #

  selectUser: =>
    Page.cmd "certSelect", [["zeroid.bit"]]
    return false

  #
  # Load page content or open the editor if
  # the page still does not exist.
  #

  pageLoad: (slug=null, rev=null) ->
    @editingPage = false
    slug = @getSlug() unless slug isnt null
    rev  = @getRevisionNumber() unless rev isnt null

    if rev is null
      query = "SELECT * FROM pages WHERE pages.slug = '#{slug}' ORDER BY date_added DESC LIMIT 1"
    else
      query = "SELECT * FROM pages WHERE pages.id = '#{rev}'"

    @cmd "dbQuery", [query], (page) =>
      if page.length is 1
        @pageId = page[0].id
        @parseContent(page[0].body, rev)
      else
        if rev isnt null
          @cmd "wrapperNotification", ["error", "Wrong revision number."]
        else
          WikiUi.showNewPageMessage()

  #
  # Update the page contents or create a new page
  # if still does not exist.
  #

  pageSave: (reload=false) ->
    if not Page.site_info.cert_user_id
      Page.cmd "wrapperNotification", ["info", "Please, select your account."]
      return false

    slug = @getSlug()
    if slug is false
      @cmd "wrapperNotification", ["error", "Operation not permitted."]
      return false

    inner_path = "data/users/#{@site_info.auth_address}/data.json"
    @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
      if data
        data = JSON.parse(data)
      else
        data = {"pages":[]}

      data.pages.unshift({
        "id": uuid.v1(),
        "body": document.getElementById("editor").value,
        "date_added": new Date().getTime()
        "slug": slug
      })

      new_data = {"pages":[]}

      # Keep last 5 page reviews per user to save storage space
      pages_limit = {}
      for page in data.pages
        pages_limit[page.slug] = 0 if pages_limit[page.slug] is undefined
        if pages_limit[page.slug] < 5
          new_data.pages.push(page)
          pages_limit[page.slug]++

      json_raw = unescape(encodeURIComponent(JSON.stringify(new_data, undefined, '\t')))
      @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
        if res is "ok"
          if reload is true
            return window.location = "?Page:#{slug}"
          @pageLoad()
          @updateUserQuota()
          @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
            if res.error
              @cmd "wrapperNotification", ["error", res.error]
        else
          @cmd "wrapperNotification", ["error", "File write error: #{res}"]

      return false

  #
  # Show the page editor.
  #

  pageEdit: ->
    @editingPage = true
    WikiUi.showEdit()

  #
  # Load the page history to show a list of
  # users who edited the page.
  #

  pageHistory: (slug) ->
    query = """
                SELECT pages.*, keyvalue.value AS cert_user_id FROM pages
                LEFT JOIN json AS data_json USING (json_id)
                LEFT JOIN json AS content_json ON (
                    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
                )
                LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
                WHERE pages.slug = '#{slug}'
                ORDER BY date_added DESC
            """
    @cmd "dbQuery", [query], (pages) =>
      WikiUi.showHistory(pages)

  #
  # Load all internal links from content.
  #

  showIndexPage: ->
    query = "SELECT id, body, slug, MAX(date_added), json_id FROM pages GROUP BY pages.slug ORDER BY date_added DESC"
    @cmd "dbQuery", [query], (pages) =>
      LinkHelper.reset()

      for page in pages
        LinkHelper.parseContent(page.body)

      linkTags = LinkHelper.getLinks()
      slugs = LinkHelper.getSlugs(true).join(",")
      query = "SELECT slug FROM pages WHERE pages.slug in (#{slugs}) GROUP BY slug"
      @cmd "dbQuery", [query], (slugs) =>
        existingPages = LinkHelper.getSlugs(false, slugs)
        links= []
        normalized = []

        for tag in linkTags
          if tag.text.toLowerCase() not in normalized
            cssClass = ""
            cssClass = "red" unless tag.slug in existingPages
            links.push("<a href=\"?Page:#{tag.slug}\" class=\"#{cssClass}\">#{tag.text}</a>")
            normalized.push(tag.text.toLowerCase())

        slugs = LinkHelper.getSlugs()
        orphaned = []
        uniqueOrphans = []
        for page in pages
          if page.slug not in slugs and page.slug not in uniqueOrphans and page.slug isnt "home"
            orphaned.push("<a href=\"?Page:#{page.slug}\">[[#{page.slug}]]</a>")
            uniqueOrphans.push(page.slug)

        WikiUi.showIndexPage(links, orphaned.sort())

  #
  # Check if this is a request to static content
  #

  isStaticRequest: (url=null) ->
    url = window.location.search.substring(1) unless url isnt null

    if match = url.match /Index(&.*)?$/
      @showIndexPage()
      return true

    if @isHistory(url)
      @pageHistory(@getSlug())
      return true

    return false

  #
  # Check if current page is an history page
  #

  isHistory: (url=null) ->
    url = window.location.search.substring(1) unless url isnt null
    if match = url.match /Page:([a-z0-9\-]*)(&.*)?History(&.*)?$/
      return true

    return false


  #
  # Return current page slug or an empty string
  # if there are no slug matches.
  #

  getSlug: (url=null) ->
    url = window.location.search.substring(1) unless url isnt null

    if match = url.match /Page:([a-z0-9\-]*)(&.*)?$/
      return match[1].toLowerCase()
    else
      return "home"

  #
  # Get the content revision id from the url.
  #

  getRevisionNumber: (url=null) ->
    url = window.location.search.substring(1) unless url isnt null

    if match = url.match /Rev:([a-z0-9\-]*)(&.*)?$/
      return match[1]
    else
      return null

  #
  # Parse the contents to create internal links
  # and convert Markdown to HTML.
  # Update the UI.
  #

  parseContent: (content, rev=null) ->
    HTMLcontent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    HTMLcontent = marked(HTMLcontent, @markedOptions)
    LinkHelper.reset()
    LinkHelper.parseContent(HTMLcontent)
    links = LinkHelper.getLinks()
    slugs = LinkHelper.getSlugs(true).join(",")
    query = "SELECT slug FROM pages WHERE pages.slug in (#{slugs}) GROUP BY slug ORDER BY date_added"
    @cmd "dbQuery", [query], (slugs) =>
      existingPages = LinkHelper.getSlugs(false, slugs)

      for link in links
        cssClass = "internal"
        cssClass += " red" unless link.slug in existingPages
        replace = "<a href=\"?Page:#{link.slug}\" class=\"#{cssClass}\">#{link.text}</a>"
        link.tag = link.tag.replace /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"
        HTMLcontent = HTMLcontent.replace(new RegExp(link.tag, "g"), replace)

      WikiUi.loadContent(content, HTMLcontent, rev)

  #
  # Update the user data quota message.
  #

  updateUserQuota: ->
    if @site_info.cert_user_id
      @cmd "fileRules", "data/users/#{@site_info.auth_address}/content.json", (rules) =>
        WikiUi.setUserQuota(rules.current_size, rules.max_size)
    else
      WikiUi.setUserQuota()

  #
  # Redirect user to the current version of the document.
  #

  getCurrentRevision: ->
    slug = @getSlug()
    return window.location = "?Page:#{slug}"

  #
  # Redirect the user to the current page history.
  #

  getHistory: ->
    slug = @getSlug()
    return window.location = "?Page:#{slug}&History"

#
# Create the ZeroWiki. Here we go!
#

window.Page = new ZeroWiki()
