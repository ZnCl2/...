class CorsRequester extends Class
	constructor: ->
		@siteRequest = {}
		@thisSiteAddress = null

	parseUrl: (url) ->
		ZeroUrl.parse(url, {normalize: true})


	checkSiteAvailable: (siteAddress, options = {}) =>
		if options.parseUrl
			parsedUrl = @parseUrl(siteAddress)
			if not parsedUrl
				return $.Deferred().reject()
			siteAddress = parsedUrl.siteAddress

		if @siteRequest[siteAddress] and @siteRequest[siteAddress].state() == "resolved"
			return @siteRequest[siteAddress]

		if siteAddress == @thisSiteAddress
			return $.Deferred().resolve(true)

		return $.Deferred().resolve()
		.then () =>
			$.Deferred (d) => # Check the permission
				Page.cmd "siteInfo", {}, (siteInfo) =>
					@thisSiteAddress = siteInfo.address
					if siteAddress == @thisSiteAddress
						d.resolve(true)
					else if "Cors:#{siteAddress}" in siteInfo.settings.permissions
						# We have the permission, check if site wasn't deleted
						Page.cmd "fileGet", ["cors-#{siteAddress}/content.json", false, "text", 0], (res) =>
							if typeof(res) == "string"
								@log "#{siteAddress}: available"
								d.resolve(true) # Available
							else
								@log "#{siteAddress}: we have permission, but the site is unavailable"
								d.resolve(false) # Deleted
					else # No permission
						@log "#{siteAddress}: no permission"
						d.resolve(false)
		.promise()


	requestSite: (siteAddress, options = {}) =>
		if options.parseUrl
			parsedUrl = @parseUrl(siteAddress)
			if not parsedUrl
				return $.Deferred().reject()
			siteAddress = parsedUrl.siteAddress

		if @siteRequest[siteAddress]
			return @siteRequest[siteAddress]

		request = @siteRequest[siteAddress] = @checkSiteAvailable(siteAddress)
		.then (site_available) =>
			$.Deferred (d) => # Request permissions
				if site_available
					return d.resolve()
				Page.cmd "corsPermission", [siteAddress], (res) =>
					if res == "ok"
						d.resolve()
					else # Should never happen in the current ZN implementation
						d.reject()
		.then () =>
			$.Deferred (d) => # Wait for content.json
				if siteAddress == @thisSiteAddress
					return d.resolve(true)
				Page.cmd "siteInfo", {}, (siteInfo) =>
					Page.cmd "fileGet", ["cors-#{siteAddress}/content.json", true, "text", 5000], (res) =>
						if typeof(res) == "string"
							@log "#{siteAddress}: permission is granted and content.json is available"
						else
							@log "#{siteAddress}: permission is granted but content.json is unavailable"
						d.resolve(true)
		.promise()
		return request

	requestSiteAndContentJson: (url) =>
		parsedUrl = @parseUrl(url)
		if not parsedUrl
			return $.Deferred().reject()
		siteAddress = parsedUrl.siteAddress
		innerPath = parsedUrl.innerPath

		request = @requestSite(siteAddress)
		.then () =>
			$.Deferred (d) =>
				timeout = 10000
				if match = innerPath.match /^(data\/users\/[^\/]+)/
					contentJsonPath = match[1] + "/content.json"
				else
					contentJsonPath = "content.json"

				if siteAddress == @thisSiteAddress
					corsPathPrefix = ""
				else
					corsPathPrefix = "cors-#{siteAddress}/"

				Page.cmd "fileGet", ["#{corsPathPrefix}#{contentJsonPath}", true, "text", timeout], (res) =>
					if d.state() == "pending"
						d.resolve(res)
				setTimeout (=>
					if d.state() == "pending"
						d.resolve(false)
				), timeout
		.promise()
		
		return request

window.corsRequester = new CorsRequester()

