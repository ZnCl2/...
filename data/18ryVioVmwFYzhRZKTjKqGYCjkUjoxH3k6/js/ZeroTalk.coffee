# Variable namings:
# comment_uri: #{comment_id}_#{topic_id}_#{topic_user_id}
# topic_uri: #{topic_id}_#{topic_user_id}

class ZeroTalk extends ZeroApp
	init: ->
		super()
		@user_settings = {}
		@local_storage = {}  # Visited topics
		@site_address = null  # Site bitcoin address

		# Autoexpand
		for textarea in $("textarea")
			@autoExpand $(textarea)


		# Markdown help
		$(".editbar .icon-help").on "click", =>
			$(".editbar .markdown-help").css("display", "block")
			$(".editbar .markdown-help").toggleClassLater("visible", 10)
			$(".editbar .icon-help").toggleClass("active")
			return false

		$.when(@event_site_ready).done =>
			@loadUserSettings().done =>
			User.updateMyInfo =>
				if @getSettings().force_signing_all_content_with_master_key and @site_info.settings.own
					@forceSigningAllContent()
				@applyMenuContent()
				@routeUrl(window.location.search.substring(1))

		@log "inited!"


	# Wrapper websocket connection ready
	onOpenWebsocket: (e) =>
		super(e)
		@cmd "wrapperSetViewport", "width=device-width, initial-scale=0.8"
		@cmd "wrapperGetLocalStorage", [], (res) =>
			res ?= {}
			@local_storage = res


	# All page content loaded
	onPageLoaded: ->
		if not $("body").hasClass("loaded")
			$("body").addClass("loaded") # Back/forward button keep position support
			Page.cmd("wrapperInnerLoaded")

	forceSigningAllContent: ->
		signAllContent = new SignAllContent(this)
		signAllContent.run("data/users", "stored")

	markSelfLinks: (selector) ->
		that = @
		$("a", selector).each ->
			href = $(@).attr("href")
			parsed_url = ZeroUrl.parse(href)
			if parsed_url.siteAddress == that.site_address
				$(@).addClass("this-site-link")
			else
				$(@).removeClass("this-site-link")

	applyContentToSelector: (html, toplevel_selector, content_selector) ->
		toplevel = $(toplevel_selector)
		if html and html.length > 0
			if content_selector
				$(content_selector, toplevel).html(html)
				@markSelfLinks($(content_selector, toplevel))
			else
				$(toplevel).html(html)
				@markSelfLinks($(toplevel))
			$(toplevel).css("display", "")
		else
			$(toplevel).css("display", "none")

	applyMenuContent: ->
		@applyContentToSelector(@getSettings().topmenu_links, ".topmenu", ".links")
		@applyContentToSelector(
			@getSettings().header_menu_links or @getSettings().head_more_links,
			".head .primary-links", null)
		@applyContentToSelector(
			@getSettings().header_menu_secondary_links or "",
			".head .secondary-links", null)

	routeUrl: (url) ->
		@log "Routing url:", url
		if match = url.match /Topic:([0-9]+)_([0-9a-zA-Z_]+)/  # Topic
			$("body").addClass("page-topic")
			TopicShow.actionShow parseInt(match[1]), match[2]

		else if match = url.match /Topics:([0-9]+)_([0-9a-zA-Z_]+)/  # Sub-topics
			$("body").addClass("page-topics")
			TopicList.actionList parseInt(match[1]), match[2]

		else  # Main
			$("body").addClass("page-main")
			TopicList.actionList()

		# FIXME: should be event-driven, in the same way as in ZeroBlog++
		setTimeout (=>
			if @getSettings().enable_cors_resolver ? true
				@corsResolver = new CorsResolver().start =>
					$(".topics-full, .topics")
		), 3000


	addInlineEditors: ->
		@logStart "Adding inline editors"
		elems = $("[data-editable]")
		for elem in elems
			elem = $(elem)
			if not elem.data("editor") and not elem.hasClass("editor")
				editor = new InlineEditor(elem, @getContent, @saveContent, @getObject)
				elem.data("editor", editor)
		@logEnd "Adding inline editors"


	getOptionClass: (name) ->
		# FIXME: should not be hard-coded
		a = {
			topic_list_mode: "visitor"
		}
		return a[name] or "owner"

	filterUserOptions: (settings) ->
		s = {}
		for k of settings
			if @getOptionClass(k) == "visitor" and settings[k] != null
				s[k] = settings[k]
		return s

	loadUserSettings: (cb) ->
		return $.when()
		.then => $.Deferred (d) =>
			@cmd "userGetSettings", [], (res) =>
				if res && res.zero_talk_user_settings
					@user_settings = res
				else
					@user_settings = {}
				@user_settings = @filterUserOptions(@user_settings)
				if cb
					cb()
				d.resolve()
		.promise()

	saveUserSettings: (cb) ->
		return $.when()
		.then => $.Deferred (d) =>
			if @user_settings
				@user_settings.zero_talk_user_settings = true
				@cmd "userSetSettings", [@user_settings], (res) =>
					if cb
						cb(res)
					d.resolve(res)
			else
				d.resolve()
		.promise()

	setUserOption: (key, value) ->
		if @getOptionClass(key) == "visitor"
			@user_settings[key] = value
			@saveUserSettings()

	getSettings: ->
		s1 = {}
		try
			s1 = @site_info.content.settings
		catch
			s1 = {}

		s2 = @filterUserOptions(@user_settings)

		return $.extend({}, s1, s2)

	# Get content
	getContent: (elem, raw=false) =>
		return elem.data("content")


	# Returns the elem parent object
	getObject: (elem) =>
		if elem.data("object")
			return elem
		else
			return elem.parents("[data-object]")


	parseObjectURI: (object) ->
		o = {}

		[o.type, o.id] = object.split(":")

		if o.type == "Topic"
			[_, o.topic_id, o.topic_creator_address] = o.id.match(/(.*?)_(.*)/)
			o.user_address = o.topic_creator_address
			o.topic_id = parseInt(o.topic_id)

		if o.type == "Comment"
			[o.comment_uri, o.topic_uri] = o.id.split("@")
			[_, o.comment_id, o.comment_creator_address] = o.comment_uri.match(/(.*?)_(.*)/)
			o.user_address = o.comment_creator_address
			o.topic_id = parseInt(o.topic_id)
			[_, o.topic_id, o.topic_creator_address] = o.topic_uri.match(/(.*?)_(.*)/)
			o.comment_id = parseInt(o.comment_id)

		return o

	# Save content
	saveContent: (elem, content, cb=false) =>
		if elem.data("deletable") and content == null # Its a delete request
			delete_object = true
		else
			delete_object = false

		o = @parseObjectURI(@getObject(elem).data("object"))
		@log o

		User.getDataByUserAddress o.user_address, (data) =>
			if o.type == "Topic"
				topic = (topic for topic in data.topic when topic.topic_id == o.topic_id)[0]

				if delete_object # Delete
					data.topic.splice(data.topic.indexOf(topic), 1)
				else # Update
					topic.modified = Time.timestamp()
					topic[elem.data("editable")] = content

			if o.type == "Comment"
				comment = (comment for comment in data.comment[o.topic_uri] when comment.comment_id == o.comment_id)[0]

				if delete_object # Delete
					data.comment[o.topic_uri].splice(data.comment[o.topic_uri].indexOf(comment), 1)
				else # Update
					comment.modified = Time.timestamp()
					comment[elem.data("editable")] = content

			User.publishDataByUserAddress o.user_address, data, (res) =>
				if res
					if delete_object # Delete
						if cb then cb(true)
						elem.fancySlideUp()
					else # Update
						if o.type == "Topic"
							if $("body").hasClass("page-main") or $("body").hasClass("page-topics") then TopicList.loadTopics "list", ( -> if cb then cb(true) )
							if $("body").hasClass("page-topic") then TopicShow.loadTopic ( -> if cb then cb(true) )
						if o.type == "Comment"
							TopicShow.loadComments "normal", ( -> if cb then cb(true) )
				else
					if cb then cb(false)


	writePublish: (inner_path, data, cb) ->

		@cmd "fileRules", {inner_path: inner_path}, (res) =>
			rules = res

			privatekey = null

			if @site_info.settings.own
				privatekey = "stored"

			if @site_info.auth_address 
				if rules and rules.signers and @site_info.auth_address in rules.signers
					privatekey = null

			@cmd "fileWrite", [inner_path, data], (res) =>
				if res != "ok" # fileWrite failed
					@cmd "wrapperNotification", ["error", "File write error: #{res.error}"]
					cb(false)
					return false

				@cmd "sitePublish", {"inner_path": inner_path, "privatekey": privatekey}, (res) =>
					if res == "ok"
						cb(true)
					else
						cb(res)


	setSiteInfo: (site_info) =>
		super(site_info)
		@site_address = site_info.address
		User.checkCert()
		if site_info.event and site_info.event[0] == "file_done" and site_info.event[1].match /.*users.*data.json$/  # Data changed
			RateLimit 500, =>
				if $("body").hasClass("page-topic")
					TopicShow.loadTopic()
					TopicShow.loadComments()
				if $("body").hasClass("page-main") or $("body").hasClass("page-topics")
					TopicList.loadTopics()
		else if site_info.event?[0] == "cert_changed" and site_info.cert_user_id
			# Auto click follow username mentions on cert change
			TopicList.initFollowButton()
			mentions_menu_elem = TopicList.follow.feeds["Username mentions"][1]
			setTimeout ( =>
				if not mentions_menu_elem.hasClass("selected")
					mentions_menu_elem.trigger("click")
			), 100


	autoExpand: (elem) ->
		editor = elem[0]
		# Autoexpand
		if elem.height() > 0 then elem.height(1)

		elem.on "input", ->
			if editor.scrollHeight > elem.height()
				old_height = elem.height()
				elem.height(1)
				new_height = editor.scrollHeight
				new_height += parseFloat elem.css("borderTopWidth")
				new_height += parseFloat elem.css("borderBottomWidth")
				new_height -= parseFloat elem.css("paddingTop")
				new_height -= parseFloat elem.css("paddingBottom")

				min_height = parseFloat(elem.css("lineHeight"))*2 # 2 line minimum
				if new_height < min_height then new_height = min_height+4

				elem.height(new_height-4)
		if elem.height() > 0 then elem.trigger "input"
		else elem.height("48px")


	allowedToEditContentBy: (user_address) =>
		if user_address == @site_info.auth_address
			return true

		if not @moderatorModeEnabled()
			return false

		if @site_info.settings.own
			return true

		# FIXME: The correct implementation should check per-user permissions with fileRules()
		#        Not sure if we actually need the correct one.
		content_json = @getCachedJSON(@data_users_path + "content.json")
		try
			if content_json.user_contents.permission_rules[".*"].signers.includes(@site_info.auth_address)
				return true
		catch
			return false

		return false

	moderatorModeEnabled: () =>
		# TODO: implement the UI for enabling/disabling the mode
		return true


window.Page = new ZeroTalk()
