class ZeroApp extends ZeroFrame
	init: ->
		super()

		@data_users_path = "data/users/"
		@cached_json = []

		@components = []

		@site_info = null
		@server_info = null
		@event_site_info_ready = $.Deferred()
		@event_server_info_ready = $.Deferred()
		@event_site_ready = $.Deferred()
		@event_data_ready = $.Deferred()
		@event_page_load = $.Deferred()

		$.when(@event_site_info_ready).done =>
			@log "event_site_info_ready"
		$.when(@event_server_info_ready).done =>
			@log "event_server_info_ready"
		$.when(@event_site_ready).done =>
			@log "event_site_ready"
		$.when(@event_data_ready).done =>
			@log "event_data_ready"
		$.when(@event_page_load).done =>
			@log "event_page_load"

		$.when(@event_site_info_ready, @event_server_info_ready).done =>
			@event_site_ready.resolve();


	# Component system


	registerComponent: (c) ->
		@log("registered component: #{c.constructor.name}")

		@components.push(c)

		event_map = [
			["event_site_info_ready", "onSiteInfoReady"]
			["event_server_info_ready", "onServerInfoReady"]
			["event_site_ready", "onSiteReady"]
			["event_data_ready", "onDataReady"]
			["event_page_load", "onPageLoad"]
		]

		for pair in event_map
			do =>
				event = pair[0]
				method = pair[1]
				$.when(@[event]).done ->
					if c[method]
						c[method].apply(c)


	dispatchToComponents: (method, args) ->
		results = []
		for c in @components
			if c[method]
				result = c[method].apply(c, args)
				if result?
					results.push(result)
		return results


	# Message handling


	# Wrapper websocket connection ready
	onOpenWebsocket: (e) =>
		@cmd "siteInfo", {}, (site_info) =>
			@setSiteInfo(site_info)

		@cmd "serverInfo", {}, (server_info) =>
			@setServerInfo(server_info)

		@readCachedJSON(["content.json"])
		@readCachedJSON([@data_users_path + "content.json"])


	# Parse incoming requests
	onRequest: (cmd, message) ->
		if cmd == "setSiteInfo"
			@actionSetSiteInfo(message)
		else if cmd == "setServerInfo"
			@actionSetServerInfo(message)
		else
			@log "Unknown command", message


	actionSetSiteInfo: (message) =>
		@setSiteInfo(message.params)


	actionSetServerInfo: (message) =>
		@setServerInfo(message.params)


	setServerInfo: (server_info) ->
		@server_info = server_info
		@event_server_info_ready.resolve()
		@dispatchToComponents "setServerInfo", [server_info]


	setSiteInfo: (site_info) =>
		@site_info = site_info
		@event_site_info_ready.resolve()
		@dispatchToComponents "setSiteInfo", [site_info]

		if (site_info.event?[0] or "").match /^file_/
			@onFileUpdate site_info.event[1], site_info.event[0]


	# state can be:
	#     file_started/file_done/file_failed - the appropriate event on the siteChanged channel
	#     file_written - file was written from the code
	#     file_published - file was successfully published
	#     file_publication_failed - file publication failed
	onFileUpdate: (inner_path, state) =>
		@dispatchToComponents "onFileUpdate", [inner_path, state]


	# Reading/writing files


	readJSON: (params, cb) ->
		json = null
		return $.when()
		.then => $.Deferred (d) =>
			@cmd "fileGet", params, (res) =>
				if res
					try
						json = JSON.parse(res)
					catch
						json = null
				if cb
					cb(json)
				if json
					d.resolve(json)
				else
					d.reject()
		.promise()


	writeJSON: (inner_path, json, publish, cb) ->
		json.modified = Time.timestamp()
		json_raw = null
		return $.when()
		.then => $.Deferred (d) =>
			try
				json_raw = unescape(encodeURIComponent(JSON.stringify(json, undefined, '\t')))
				d.resolve()
			catch
				d.reject()
		.then => $.Deferred (d) =>
			@cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
				if res == "ok"
					if cb
						cb("write_ok")
					@onFileUpdate(inner_path, "file_written")
					d.resolve()
				else
					@cmd "wrapperNotification", ["error", "File write error: #{res}"]
					if cb
						cb("write_error")
					d.reject()
		.then => $.Deferred (d) =>
			if publish
				@cmd "sitePublish", {"inner_path": inner_path}, (res) =>
					if res == "ok"
						if cb
							cb("publish_ok")
						@onFileUpdate(inner_path, "file_published")
						d.resolve()
					else
						if cb
							cb("publish_error")
						@onFileUpdate(inner_path, "file_publication_failed")
						d.reject()
			else
				d.resolve()
		.promise()


	readCachedJSON: (params, cb) ->
		inner_path = params.inner_path or params[0]
		json = null
		return $.when()
		.then => $.Deferred (d) =>
			if not inner_path
				d.resolve()
			else
				json = @getCachedJSON(inner_path)
				if json
					d.resolve()
				else
					@readJSON params, (res) =>
						json = res
						d.resolve()
		.then => $.Deferred (d) =>
			if inner_path and json
				@cached_json[inner_path] = json
			if cb
				cb(json)
			if json
				d.resolve(json)
			else
				d.reject()
		.promise()


	getCachedJSON: (inner_path) ->
		return @cached_json[inner_path]


	# Handling user certs


	certSelect: () ->
		@readCachedJSON [@data_users_path + "content.json"], (res) =>
			if res
				cert_signers = false
				try
					cert_signers = Object.keys(res.user_contents.cert_signers)
				catch
					@log "Failed to get keys of user_contents.cert_signers from " + @data_users_content_json_path
					@log res
				if cert_signers
					@cmd "certSelect", [cert_signers]


window.ZeroApp = ZeroApp
