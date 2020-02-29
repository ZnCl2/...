toColor = (text) ->
		hash = 0
		for i in [0..text.length-1]
			hash = text.charCodeAt(i) + ((hash << 5) - hash)
		color = '#'
		return "hsl(" + (hash % 360) + ",30%,50%)";
		for i in [0..2]
			value = (hash >> (i * 8)) & 0xFF
			color += ('00' + value.toString(16)).substr(-2)
		return color

class Plus1s extends ZeroFrame
	init: ->
		$("#plus1").on "click", @onPlusClick
		@loggedIn = false

	onOpenWebsocket: ->
		@cmd "siteInfo", {}, (site_info) =>
			@siteInfo = site_info
			@render()

	onRequest: (cmd, message) ->
		if cmd == "setSiteInfo"
			@siteInfo = message.params
			@render()

	render: ->
		if @siteInfo.cert_user_id
			@loggedIn = true
			$("#plus1").text("#{@siteInfo.cert_user_id}: #{hahaQuotes[Math.floor(Math.random() * hahaQuotes.length)]} +1s")
		
		query = "SELECT SUM(seconds) AS sum FROM pluses"
		@cmd "dbQuery", [query], (result) =>
			$("#seconds").text(result[0].sum + "s")

		# Show the top 5 users
		query = """
			SELECT pluses.*, keyvalue.value AS cert_user_id FROM pluses
			LEFT JOIN json AS data_json USING (json_id)
			LEFT JOIN json AS content_json ON (
				data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
			)
			LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
			ORDER BY seconds DESC LIMIT 5
		"""
		@cmd "dbQuery", [query], (result) =>
			$("#top_users").html("")
			for r, i in result
				$("#top_users").append("<li><span id=\"user_#{i}\">#{r.cert_user_id}</span> +#{r.seconds}s")
				$("#user_#{i}").css("color": toColor(r.cert_user_id))
		
	onPlusClick: =>
		if !@loggedIn
			@cmd "certSelect", [["zeroid.bit"]]
		else
			# Add 1s to the user's data
			inner_path = "data/users/#{@siteInfo.auth_address}/data.json"

			@cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
				if data
					data = JSON.parse data
				else
					data = {"pluses": [{"seconds": 0}]}

				data.pluses[0].seconds++

				json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

				@cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
					if res is "ok"
						@cmd "sitePublish", {"inner_path": inner_path}, (res) =>
							@render()
					else
						@cmd "wrapperNotification", ["error", "File write error: #{res}"]

window.Page = new Plus1s()

hahaQuotes = [
	"我是身经百战了，见得多啦！",
	"不要“见得风，是得雨”",
	"我可以回答你一句“无可奉告”",
	"too simple,sometimes naive",
	"你们啊 naive！I am angry！",
	"我今天是得罪了你们一下",
	"闷声发大财",
	"我有这个必要好告诉你们一点人生的经验。"
]
