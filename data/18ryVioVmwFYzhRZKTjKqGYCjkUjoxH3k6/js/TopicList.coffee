class TopicList extends Class
	constructor: ->
		@topic_sorter = {
			last_activity : {
				order_by: "last_action"
				compare: (a, b) ->
					return Math.max(b.last_comment, b.last_added) - Math.max(a.last_comment, a.last_added)
			}
			topic_creation : {
				order_by: "last_added"
				compare: (a, b) ->
					return b.last_added - a.last_added
			}
			comments_num : {
				order_by: "comments_num"
				compare: (a, b) ->
					return b.comments_num - a.comments_num
			}
			votes_num : {
				order_by: "votes"
				compare: (a, b) ->
					return b.votes - a.votes
			}
			topic_author : {
				order_by: "topic_creator_user_name"
				compare: (a, b) ->
					return a.topic_creator_user_name.localeCompare(b.topic_creator_user_name, "en-US")
			}
		}
		@parent_topic_uri = undefined
		@limit = 31
		@topic_search_query = null
		@topic_parent_uris = {}
		@topic_sticky_uris = {}
		@topictype = "topic"

	isTopicSticky: (topic_uri) ->
		return !!@topic_sticky_uris[topic_uri]

	getSettings: ->
		return Page.getSettings()

	calculateStickyTopicSortingOrder: ->
		@topic_sticky_uris = {}
		if @getSettings().topic_sticky_uris?.length > 0
			i = 1
			for topic_sticky_uri in @getSettings().topic_sticky_uris
				@topic_sticky_uris[topic_sticky_uri] = i++

	actionList: (parent_topic_id, parent_topic_user_address) ->
		@calculateStickyTopicSortingOrder()

		$(".topics-loading").cssLater("top", "0px", 200)

		# Topic group listing
		if parent_topic_id
			$(".topics-title").html("&nbsp;")
			@parent_topic_uri = "#{parent_topic_id}_#{parent_topic_user_address}"

			# Update visited info
			Page.local_storage["topic.#{parent_topic_id}_#{parent_topic_user_address}.visited"] = Time.timestamp()
			Page.cmd "wrapperSetLocalStorage", Page.local_storage
		else
			$(".topics-title").html(Page.site_info.content.title)

		@loadTopics("noanim")

		# Show create new topic form
		if Page.site_info.settings.own or parent_topic_id
			$(".topic-new-link").css("display", "flex")

		topic_new_link = @getSettings().topic_new_link
		if topic_new_link and topic_new_link.length > 0
			$(".topic-new-link").html(topic_new_link)

		$(".topic-new-link").on "click", =>
			if @getSettings().new_topic_notice?.length > 0
				$(".topic-new .message").html(@getSettings().new_topic_notice)
				$(".topic-new .message").css("display", "block")
			else
				$(".topic-new .message").css("display", "none")
			$(".topic-new").fancySlideDown()
			$(".topic-new-link").slideUp()
			return false

		# Create new topic
		$(".topic-new .button-submit").on "click", =>
			@submitCreateTopic()
			return false

		$(".topic-new .topic_type").on "click", =>
			@log "Create menu"
			menu = new Menu($(".topic_type"))
			menu.addItem "Create a topic", =>
				@topictype = "topic"
				menu.hide()
				$(".topic-new .image .icon").removeClass("icon-topic-group").addClass("icon-topic-chat")
				$(".topic-new #topic_body").trigger("input").focus()
				return true
			menu.addItem "Create a group", =>
				@topictype = "group"
				menu.hide()
				$(".topic-new .image .icon").removeClass("icon-topic-chat").addClass("icon-topic-group")
				$(".topic-new #topic_body").trigger("input").focus()
				return true
			menu.show()
			return false

		$(".topics-more").on "click", =>
			@limit += 100
			$(".topics-more").text("Loading...")
			@loadTopics("noanim")
			return false

		$(".topic-search-button").on "click", =>
			@limit = 50
			@topic_search_query = $(".topic-search").val()
			@loadTopics("list")
			return false

		$(".topic-search").on "keypress", (e) =>
			if e.keyCode == 13
				@limit = 50
				@topic_search_query = e.currentTarget.value
				@loadTopics("list")
				return false

		# Follow button
		@initFollowButton()

	initFollowButton: ->
		@follow = new Follow($(".feed-follow-list"))
		if @parent_topic_uri  # Subtopic
			@follow.addFeed("New topics in this group", "
				SELECT
				 title AS title,
				 body,
				 added AS date_added,
				 'topic' AS type,
				 '?Topic:' || topic.topic_id || '_' || REPLACE(topic_creator_json.directory, '/', '_') AS url,
				 parent_topic_uri AS param
				FROM topic
				LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)
				WHERE parent_topic_uri IN (:params)
			", true, @parent_topic_uri)
		else
			@follow.addFeed(_("New topics"), "
				SELECT
				 title AS title,
				 body,
				 added AS date_added,
				 'topic' AS type,
				 '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url
				FROM topic
				LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)
				WHERE parent_topic_uri IS NULL
			", true)
			if Page.site_info.cert_user_id
				username = Page.site_info.cert_user_id.replace /@.*/, ""
				@follow.addFeed("Username mentions", "
					SELECT
					 'mention' AS type,
					 comment.added AS date_added,
					 topic.title,
					 commenter_user.value || ': ' || comment.body AS body,
					 topic_creator_json.directory AS topic_creator_address,
					 topic.topic_id || '_' || REPLACE(topic_creator_json.directory, '/', '_') AS row_topic_uri,
					 '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url
					FROM topic
					 LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)
					 LEFT JOIN comment ON (comment.topic_uri = row_topic_uri)
					 LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id)
					 LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = (CASE WHEN commenter_content.directory LIKE 'mirrored/%' THEN 'data.json' ELSE 'content.json' END))
					 LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id')
					WHERE
					 comment.body LIKE '%[#{username}%' OR comment.body LIKE '%@#{username}%'
				", true)
			@follow.addFeed("All comments", "
				SELECT
				 'comment' AS type,
				 comment.added AS date_added,
				 topic.title,
				 commenter_user.value || ': ' || comment.body AS body,
				 topic_creator_json.directory AS topic_creator_address,
				 topic.topic_id || '_' || REPLACE(topic_creator_json.directory, '/', '_') AS row_topic_uri,
				 '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url
				FROM topic
				 LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)
				 LEFT JOIN comment ON (comment.topic_uri = row_topic_uri)
				 LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id)
				 LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = (CASE WHEN commenter_content.directory LIKE 'mirrored/%' THEN 'data.json' ELSE 'content.json' END))
				 LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id')
			")
		@follow.init()

	deleteMissingTopicsFromUI: (present_topics, type) ->
		topic_ids = present_topics.map (topic) =>
				"topic_#{topic.row_topic_uri}"

		$(".topics-list .topics .topic:not(.deletion-in-progress)").each (i, elem) =>
			id = $(elem).attr("id")
			if id and id not in topic_ids
				if type != "noanim"
					$(elem).addClass("deletion-in-progress")
					$(elem).slideUp 600, =>
						$(elem).remove()
				else
					$(elem).remove()

	parseTopicSearchQuery: () ->
		# Supported predicates:
		# author:name
		# date-before:2019-12-31
		# date-after:2019-12-31
		# comments:(<|>|=|<>|<=|>=)20
		# votes:(<|>|=|<>|<=|>=)20
		# type[s]:(topic[s]|group[s]|comment[s]) # TODO: comments to be implemented

		search_query = @topic_search_query ? ""

		# These are parsed results to return
		where = ""
		having = ""
		types = []

		# Temporary values
		where_conditions = []
		having_conditions = []
		search_words = []

		for s in search_query.split(/\s+/)
			if match = s.match /^author:([a-zA-Z0-9.@]*)/
				where_conditions.push(
					"topic_creator_address LIKE '#{match[1]}%' OR topic_creator_user_name LIKE '#{match[1]}%'"
				)
			else if match = s.match /^date-(before|after):(\d+[.-]\d+[.-]\d+)/
				d = match[2].replace('.', '-')
				d = Date.parse(d)
				if isNaN(d) # Skip invalid date
					continue
				timestamp = (+d/1000).toFixed(0)
				condition = "<"
				if match[1] == "after"
					condition = ">"
				where_conditions.push("topic.added #{condition} #{timestamp}")
			else if match = s.match /^(comments|votes):(<|>|=|<>|<=|>=|)(\d+)/
				field = match[1]
				if field == "comments" # FIXME: fix naming: "votes" vs "comments_num" in the SQL query
					field = "comments_num"
				condition = match[2]
				if condition == ""
					condition = "="
				value = match[3]
				if field == "votes"
					where_conditions.push("#{field} #{condition} #{value}")
				else
					having_conditions.push("#{field} #{condition} #{value}")
			else if match = s.match /^(type|types):([a-z,]+)/
				types = match[2].split(",")
			else
				s = s.replace(/\s+/, '')
				if s != ""
					search_words.push(s.replace(/["'%]/, '_'))

		if search_words.length > 0
			w = search_words.join("%")
			where_conditions.push(
				"(topic.title || ' ' || topic.body) LIKE '%#{w}%'"
			)

		if where_conditions.length > 0
			where = where_conditions.map (v) ->
				return "(#{v})"
			.join(" AND ")

		if having_conditions.length > 0
			having = having_conditions.map (v) ->
				return "(#{v})"
			.join(" AND ")

		result = {
			where: where
			having: having
			types: types
			nonempty: where != "" or having != "" or types.length != 0

			isTypeEnabled: (type, default_value) ->
				if !@nonempty or @types.length == 0
					return default_value
				return type in @types or "#{type}s" in @types
		}

		if result.where == ""
			result.where = "1=1"

		if result.having == ""
			result.having = "1=1"

		#Page.log(result)

		return result


	loadTopics: (type="list", cb=false) ->
		@logStart "Load topics..."

		default_order_by = "last_activity"
		topic_sorter = @topic_sorter[@getSettings().topic_list_order_by or default_order_by]
		if not topic_sorter
			topic_sorter = @topic_sorter[default_order_by]

		search_query = @parseTopicSearchQuery()

		where = ""
		if search_query.nonempty
			# The user query searches the entire database, ignoring topic group selection
			where = "topic.type IS NULL AND (#{search_query.where})"
		else if @parent_topic_uri # Topic group
			where = "(topic.type IS NULL AND parent_topic_uri = '#{@parent_topic_uri}') OR row_topic_uri = '#{@parent_topic_uri}'"
		else # The root group
			where = "topic.type IS NULL AND topic.parent_topic_uri IS NULL"
		last_elem = $(".topics-list .topic.template")

		if @getSettings().topic_sticky_uris?.length > 0
			sql_sticky_whens = ("WHEN '#{topic_uri}' THEN 1" for topic_uri in @getSettings().topic_sticky_uris).join(" ")
			sql_sticky = "CASE topic.topic_id || '_' || topic_creator_content.directory #{sql_sticky_whens} ELSE 0 END AS sticky"
		else
			sql_sticky = "0 AS sticky"

		sql_votes = """
			(
				SELECT
				COUNT(*)
				FROM topic_vote
				LEFT JOIN json AS topic_voter ON (topic_vote.json_id = topic_voter.json_id)
				WHERE topic_vote.topic_uri = topic.topic_id || '_' || REPLACE(topic_creator_content.directory, '/', '_')
				AND topic_creator_content.directory <> topic_voter.directory
			) AS votes
		"""

		topics_query = """
			SELECT
			 COUNT(comment_id) AS comments_num,
			 MAX(comment.added) AS last_comment,
			 topic.added as last_added,
			 CASE WHEN MAX(comment.added) IS NULL THEN topic.added ELSE MAX(comment.added) END AS last_action,
			 topic.*,
			 topic_creator_user.value AS topic_creator_user_name,
			 topic_creator_content.directory AS topic_creator_address,
			 topic.topic_id || '_' || REPLACE(topic_creator_content.directory, '/', '_') AS row_topic_uri,
			 NULL AS row_topic_sub_uri,
			 NULL AS row_topic_sub_title,
			 NULL AS row_topic_sub_type,
			 #{sql_votes},
			 #{sql_sticky}
			FROM topic
			LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)
			LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = (CASE WHEN topic_creator_content.directory LIKE 'mirrored/%' THEN 'data.json' ELSE 'content.json' END))
			LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id')
			LEFT JOIN comment ON (comment.topic_uri = row_topic_uri AND comment.added < #{Date.now()/1000+120})
			WHERE #{where}
			GROUP BY topic.topic_id, topic.json_id
			HAVING last_action < #{Date.now()/1000+120} AND #{search_query.having}
		"""

		# Union topic groups

		where = ""
		if search_query.nonempty
			where = "(#{search_query.where})"
		else if not @parent_topic_uri
			where = "topic.parent_topic_uri IS NULL"
		else
			where = "topic.parent_topic_uri = '#{@parent_topic_uri}'"

		groups_query = """
			SELECT
			 COUNT(comment_id) AS comments_num,
			 MAX(comment.added) AS last_comment,
			 IFNULL(MAX(topic_sub.added), topic.added) AS last_added,
			 CASE WHEN MAX(topic_sub.added) > MAX(comment.added) OR MAX(comment.added) IS NULL THEN IFNULL(MAX(topic_sub.added), topic.added) ELSE MAX(comment.added) END AS last_action,
			 topic.*,
			 topic_creator_user.value AS topic_creator_user_name,
			 topic_creator_content.directory AS topic_creator_address,
			 topic.topic_id || '_' || REPLACE(topic_creator_content.directory, '/', '_') AS row_topic_uri,
			 topic_sub.topic_id || '_' || REPLACE(topic_sub_creator_content.directory, '/', '_') AS row_topic_sub_uri,
			 topic_sub.title AS row_topic_sub_title,
			 topic_sub.type AS row_topic_sub_type,
			 #{sql_votes},
			 #{sql_sticky}
			FROM topic
			LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)
			LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = (CASE WHEN topic_creator_content.directory LIKE 'mirrored/%' THEN 'data.json' ELSE 'content.json' END))
			LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id')
			LEFT JOIN topic AS topic_sub ON (topic_sub.parent_topic_uri = topic.topic_id || '_' || REPLACE(topic_creator_content.directory, '/', '_'))
			LEFT JOIN json AS topic_sub_creator_json ON (topic_sub_creator_json.json_id = topic_sub.json_id)
			LEFT JOIN json AS topic_sub_creator_content ON (topic_sub_creator_content.directory = topic_sub_creator_json.directory AND topic_sub_creator_content.file_name = (CASE WHEN topic_sub_creator_content.directory LIKE 'mirrored/%' THEN 'data.json' ELSE 'content.json' END))
			LEFT JOIN comment ON (comment.topic_uri = row_topic_sub_uri AND comment.added < #{Date.now()/1000+120})
			WHERE topic.type = "group" AND #{where}
			GROUP BY topic.topic_id
			HAVING last_action < #{Date.now()/1000+120} AND #{search_query.having}
		"""

		if !search_query.isTypeEnabled("topic", true)
				topics_query = ""
		if !search_query.isTypeEnabled("group", true)
				groups_query = ""

		query = [topics_query, groups_query].filter (v) ->
			v and v != ""
		.join("\n\nUNION ALL\n\n")

		order_by = ""
		if topic_sorter.order_by != "last_action"
			order_by = "#{topic_sorter.order_by} DESC, "

		query += "\n\nORDER BY sticky DESC, #{order_by} last_action DESC LIMIT #{@limit}"

		Page.log(query)

		Page.cmd "dbQuery", [query], (topics) =>
			topics.sort (a,b) =>
				topic_sticky_uris = window.TopicList.topic_sticky_uris
				sticky_position_a = topic_sticky_uris[a.row_topic_uri] or @getSettings().topic_sticky_uris.length + 1
				sticky_position_b = topic_sticky_uris[b.row_topic_uri] or @getSettings().topic_sticky_uris.length + 1

				if sticky_position_a != sticky_position_b
					return sticky_position_a - sticky_position_b

				c = topic_sorter.compare(a, b)
				if c == 0
					c = @topic_sorter["last_activity"].compare(a, b)
				return c
			limited = false

			present_topics = []

			for topic, i in topics
				topic_uri = topic.row_topic_uri
				if topic.last_added
					topic.added = topic.last_added

				# Parent topic for group that we currently listing
				if @parent_topic_uri and topic_uri == @parent_topic_uri
					topic_parent = topic
					continue # Dont display it

				elem = $("#topic_"+topic_uri)
				if elem.length == 0 # Create if not exits yet
					elem = $(".topics-list .topic.template").clone().removeClass("template").attr("id", "topic_"+topic_uri)
					if type != "noanim" then elem.cssSlideDown()

					@applyTopicListeners(elem, topic)

				if i + 1 < @limit
					elem.insertAfter(last_elem)
				else
					limited = true
				last_elem = elem

				@applyTopicData(elem, topic)

				present_topics.push(topic)

			@deleteMissingTopicsFromUI(present_topics, type)

			Page.addInlineEditors()


			$("body").css({"overflow-y": "auto", "height": "auto"}) # Auto height body

			@logEnd "Load topics..."

			# Hide loading
			if parseInt($(".topics-loading").css("top")) > -30 # Loading visible, animate it
				$(".topics-loading").css("top", "-30px")
			else
				$(".topics-loading").remove()

			# Set sub-title listing title
			if @parent_topic_uri
				Page.cmd "wrapperSetTitle", "#{topic_parent.title} - #{Page.site_info.content.title}"
				$(".topics-title").html("<span class='parent-link'><a href='?Main'>" + Page.site_info.content.title + "</a> &rsaquo;</span> #{topic_parent.title}")

			$(".topics").css("opacity", 1)

			# Show loading / empty forum bigmessage
			if topics.length == 0
				if search_query.nonempty
					$(".message-big").text("Sorry, we couldn't find any results matching your query...")
				else if Page.site_info.bad_files
					$(".message-big").text("Initial sync in progress...")
				else
					$(".message-big").text("Welcome to your own forum! :)")
				$(".message-big").css("display", "block").cssLater("opacity", 1)
			else
				$(".message-big").css("display", "none")

			if limited
				$(".topics-more").css("display", "block")
			else
				$(".topics-more").css("display", "none")

			if cb then cb()

	applyTopicListeners: (elem, topic) ->
		# User hide
		$(".user_menu", elem).on "click", =>
			menu = new Menu($(".user_menu", elem))
			menu.addItem "Mute this user", =>
				elem.fancySlideUp()
				Page.cmd "muteAdd", [topic.topic_creator_address, topic.topic_creator_user_name, "Topic: #{topic.title}"]
			menu.show()
			return false

	# Get an image to be used in the Topic List
	extractTopicImage: (topic) ->
		# TODO: Disabled. Work in progress.
		return null

		image_url_match = null
		if @getSettings().allow_images ? true
			# FIXME: Hackish way. We should probably run markdown parser to get the image.
			# FIXME: Disallow clearnet links!
			image_url_match = topic.body.match /(!\[[^\[\]]*\]\()(http[s]{0,1}:\/\/[^"', \r\n\[\]\)$]+\.(jpeg|jpg|png|gif))/
		if image_url_match
			return image_url_match[2]
		return null

	applyTopicData: (elem, topic, type="list") ->
		title_hash = Text.toUrl(topic.title)
		topic_uri = topic.row_topic_uri
		$(".title .title-link", elem).text(topic.title)
		$(".title .title-link, a.image, .comment-num", elem).attr("href", "?Topic:#{topic_uri}/#{title_hash}#Comments")
		elem.data "topic_uri", topic_uri

		# FIXME: this should be controlled by user
		topic_list_mode = @getSettings().topic_list_mode or "normal"
		if @isTopicSticky(topic_uri)
			topic_list_mode = @getSettings().sticky_topic_list_mode or topic_list_mode

		topic_image_url = null
		if type == "list" and topic_list_mode == "normal"
			topic_image_url = window.TopicList.extractTopicImage(topic)

		# Get links in body
		body = topic.body
		url_match = body.match /http[s]{0,1}:\/\/[^"', \r\n)$]+/
		if topic.type == "group" # Group type topic
			$(elem).addClass("topic-group")
			$(".image .icon", elem).removeClass("icon-topic-chat").addClass("icon-topic-group")
			$(".link", elem).css("display", "none")
			#$(".info", elem).css("display", "none")
			$(".title .title-link, a.image, .comment-num", elem).attr("href", "?Topics:#{topic_uri}/#{title_hash}")
		else if url_match # Link type topic
			url = url_match[0]
			if type != "show" then body = body.replace /http[s]{0,1}:\/\/[^"' \r\n)$]+$/g, "" # Remove links from end
			$(".image .icon", elem).removeClass("icon-topic-chat").addClass("icon-topic-link")
			$(".link", elem).css("display", "").attr "href", Text.fixLink(url)
			$(".link .link-url", elem).text(url)
		else # Normal type topic
			$(".image .icon", elem).removeClass("icon-topic-link").addClass("icon-topic-chat")
			$(".link", elem).css("display", "none")

		if topic_image_url
			$(".image", elem).addClass("real-image")
			$(".image .icon", elem).html("<img src=\"#{topic_image_url}\">")
		else
			$(".image", elem).removeClass("real-image")
			$(".image .icon", elem).html("")

		topic_options = {
			"sanitize": true
			"allow_images": @getSettings().allow_images ? true
			"detect_media_by_description": @getSettings().detect_media_by_description ? true
			"detect_media_by_extension": @getSettings().detect_media_by_extension ? true
		}

		if type == "show" # Markdon syntax at topic show
			$(".body", elem).html Text.toMarked(body, topic_options)
		else
			if topic_list_mode == "brief"
				$(".body", elem).text(body.split("\n")[0])
			else if topic_list_mode == "long"
				$(".body", elem).html(Text.toMarked(body, topic_options))
			else if topic_list_mode == "full"
				$(".body", elem).html(Text.toMarked(body, topic_options))
			else # "normal" and unknown values
				$(".body", elem).text(body)

			for c in Array.from($(elem).prop("classList")).filter((v) -> /-mode$/.test(v))
				$(elem).removeClass(c)
			$(elem).addClass("#{topic_list_mode}-mode")

		if @isTopicSticky(topic_uri)
			elem.addClass("topic-sticky")

		# Last activity and comment num
		if type != "show"
			last_action = Math.max(topic.last_comment, topic.added)
			if topic.type == "group"
				$(".comment-num", elem).text "last activity"
				$(".added", elem).text Time.since(last_action)
			else if topic.comments_num == 1
				$(".comment-num", elem).text "#{topic.comments_num} comment"
				$(".added", elem).text "last " + Time.since(last_action)
			else if topic.comments_num > 0
				$(".comment-num", elem).text "#{topic.comments_num} comments"
				$(".added", elem).text "last " + Time.since(last_action)
			else
				$(".comment-num", elem).text "0 comments"
				$(".added", elem).text ""

			$(".started .date", elem)
				.text(Time.since(topic.added))
				.attr("title", Time.date(topic.added, "long"))

		# Modified
		if topic.modified and topic.modified > topic.added
			$(".modified .date", elem)
				.text(Time.since(topic.modified))
				.attr("title", Time.date(topic.modified, "long"))
			$(".modified", elem).css("display", "")
		else
			$(".modified", elem).css("display", "none")

		# Creator address and user name
		$(".user_name", elem)
			.text(topic.topic_creator_user_name.replace(/@.*/, ""))
			.attr("title", topic.topic_creator_user_name+": "+topic.topic_creator_address.replace("mirrored/", ""))
			.css("color": Text.toColor(topic.topic_creator_address))

		# Apply topic score
		if User.my_topic_votes[topic_uri] # Voted on topic
			$(".score-inactive .score-num", elem).text topic.votes-1
			$(".score-active .score-num", elem).text topic.votes
			$(".score", elem).addClass("active")
		else # Not voted on it
			$(".score-inactive .score-num", elem).text topic.votes
			$(".score-active .score-num", elem).text topic.votes+1

		if Page.site_info.auth_address and topic.topic_creator_address == Page.site_info.auth_address
			$(".score", elem).addClass("disabled")
			$(".score", elem).removeAttr("href")
		else
			$(".score", elem).attr("#Upvote")
			$(".score", elem).removeClass("disabled")

		# Visited
		visited = Page.local_storage["topic.#{topic_uri}.visited"]
		if not visited
			elem.addClass("visit-none")
		else if visited < last_action
			elem.addClass("visit-newcomment")

		if type == "show" then $(".added", elem).text Time.since(topic.added)

		# Sub-topic
		if topic.row_topic_sub_title
			subtopic_title_hash = Text.toUrl(topic.row_topic_sub_title)
			subtopic_uri = topic.row_topic_sub_uri
			$(".subtopic", elem)
				.css("display", "")
			if topic.row_topic_sub_type == "group"
				$(".subtopic-link", elem)
					.attr("href", "?Topics:#{subtopic_uri}/#{subtopic_title_hash}")
					.text(topic.row_topic_sub_title)
			else
			$(".subtopic-link", elem)
				.attr("href", "?Topic:#{subtopic_uri}/#{subtopic_title_hash}")
				.text(topic.row_topic_sub_title)
		else
			$(".subtopic", elem)
				.css("display", "none")

		# My topic
		if Page.allowedToEditContentBy(topic.topic_creator_address)
			$(elem).attr("data-object", "Topic:#{topic_uri}").attr("data-deletable", "yes")
			$(".title .title-link", elem).attr("data-editable", "title").data("content", topic.title)
			$(".body", elem).attr("data-editable", "body").data("content", topic.body)


	submitCreateTopic: ->
		# if not Page.hasOpenPort() then return false
		if not Page.site_info.cert_user_id # No selected cert
			Page.certSelect()
			return false

		title = $(".topic-new #topic_title").val().trim()
		body = $(".topic-new #topic_body").val().trim()
		#if not body then return $(".topic-new #topic_body").focus()
		if not title then return $(".topic-new #topic_title").focus()

		$(".topic-new .button-submit").addClass("loading")
		User.getData (data) =>
			topic = {
				"topic_id": data.next_topic_id + Time.timestamp(),
				"title": title,
				"body": body,
				"added": Time.timestamp()
			}

			if @parent_topic_uri then topic.parent_topic_uri = @parent_topic_uri
			if @topictype == "group" then topic.type = "group"
			data.topic.push topic
			data.next_topic_id += 1
			User.publishData data, (res) =>
				$(".topic-new .button-submit").removeClass("loading")
				$(".topic-new").slideUp()
				$(".topic-new-link").slideDown()
				setTimeout (=>
					if @topictype == "group"
						return window.top.location = "?Topics:" + topic.topic_id.toString() + "_users_" + Page.site_info.auth_address;
					else if topic.parent_topic_uri and @parent_topic_uri != topic.parent_topic_uri
						window.top.location = "?Topics:" + topic.parent_topic_uri
					else
						@loadTopics()
					# Follow topic comments
					window.TopicShow.topic_uri = "#{topic.topic_id}_users_#{Page.site_info.auth_address}"
					window.TopicShow.initFollowButton =>
						for title, [query, menu_item, is_default_feed, param] of window.TopicShow.follow.feeds
							menu_item.addClass("selected")
						window.TopicShow.follow.saveFeeds()
				), 600
				$(".topic-new #topic_body").val("")
				$(".topic-new #topic_title").val("")


window.TopicList = new TopicList()
