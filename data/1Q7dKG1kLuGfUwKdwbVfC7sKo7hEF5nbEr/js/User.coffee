class User extends Class
	constructor: ->
		@my_topic_votes = {}
		@my_comment_votes = {}
		@rules = {}  # Last result for fileRules command

		@certselectButtons()

		
	certselectButtons: ->
		$("#select_user").on "click", =>
			ZeroUpload.cmd "certSelect", [["zeroid.bit"]]
			return false

			
	getData: (cb) ->
		inner_path = "data/users/#{ZeroUpload.site_info.auth_address}/data.json"
		ZeroUpload.cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
			if data
				data = JSON.parse(data)
			else # Default data
				data = {"next_topic_id": 1, "topic": [], "topic_vote": {}, "next_comment_id": 1, "comment": {}, "comment_vote": {}}
			cb(data)
			
			
	publishData: (data, cb) ->
		inner_path = "data/users/#{ZeroUpload.site_info.auth_address}/data.json"
		ZeroUpload.writePublish inner_path, Text.jsonEncode(data), (res) =>
			if cb then cb(res)


window.User = new User()