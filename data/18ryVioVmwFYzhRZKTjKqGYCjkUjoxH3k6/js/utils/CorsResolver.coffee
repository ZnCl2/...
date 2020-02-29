class CorsResolver extends Class
	constructor: (cb_selector) ->
		@imagesLoaded = null
		@cb_selector = null
		@max_retries = 9
		@accessibleSites = {}
		@timeStarted = null
		@maxTimeout = 200


	start: (cb_selector) =>
		@cb_selector = cb_selector
		@timeStarted = Time.timestamp()
		@restartImageWatcher()
		@onTick()

	getAttachedData: (img) ->
		data = $(img).data("cors-resolver-data")
		if not data
			data = {
				retries: 0,
				startedAt: Time.timestamp()
				statusCheckRequired: true
				siteAvailable: null
				contentJsonAvailable: null
				fileInList: null
			}
			$(img).data("cors-resolver-data", data)
		return data


	getStatusIndicator: (img) ->
		data = @getAttachedData(img)

		parsedUrl = corsRequester.parseUrl(img.src)
		siteAddress = parsedUrl.siteAddress

		indicator = (name, value) ->
			if value == true
				v = "image-loading-indicator-true"
			else if value == false
				v = "image-loading-indicator-false"
			else
				v = "image-loading-indicator-unknown"
			"<span class='image-loading-indicator image-loading-indicator-#{name} #{v}'></span>"
		return \
			indicator("site-accessible", @accessibleSites[siteAddress]) +
			indicator("site-available", data.siteAvailable) +
			indicator("content-json-available", data.contentJsonAvailable) +
			indicator("file-in-list", data.fileInList)


	runStatusCheck: (img) ->
		data = @getAttachedData(img)
		data.statusCheckRequired = false
		url = img.src

		corsRequester.checkSiteAvailable(url, {parseUrl: true})
		.then (res) =>
			data.siteAvailable = res

		corsRequester.requestSiteAndContentJson(url)
		.then (res) =>
			if typeof(res) == "string"
				data.siteAvailable = true
				data.contentJsonAvailable = true
				try
					json = JSON.parse(res)
					path = (json.inner_path ? "").replace(/\/?content\.json$/, "")
					parsedUrl = corsRequester.parseUrl(url)
					fileName = (parsedUrl.innerPath ? "").removePrefix(path).removePrefix("/")
					if json["files"][fileName] || json["files_optional"][fileName]
						data.fileInList = true
					else
						data.fileInList = false
				catch
					data.fileInList = false
				


	reloadImage: (img) ->
		data = @getAttachedData(img)
		if data.retries > @max_retries
			return
		data.retries += 1
		src = img.src
		@log("Reloading image [#{data.retries}]: #{src}")
		img.src = ""
		img.src = src
		@runStatusCheck(img)

	handleImageProgress: (image) ->
		img = image.img
		data = @getAttachedData(img)

		parsedUrl = corsRequester.parseUrl(img.src)
		siteAddress = parsedUrl.siteAddress

		if image.isLoaded
			if $(img).next().hasClass("image-loading-box")
				$(img).next().hide();
			if siteAddress
				@accessibleSites[siteAddress] = true
		else
			if data.statusCheckRequired
				@runStatusCheck(img)
			if not $(img).next().hasClass("image-loading-box")
				message_div = $("<div class='image-loading-box'></div>")
				$(message_div).insertAfter($(img))
				$(message_div).html("""
					<p class="image-loading-message"></p>
					<pre><code class="image-url no-highlight"><a href="#{img.src}">#{$("<div>").text(img.src).html()}</a></code></pre>
			""")
			timePassed = Time.timestamp() - data.startedAt;
			m = Math.floor(timePassed / 60)
			s = timePassed % 60
			m = ("00" + m).slice (-2)
			s = ("00" + s).slice (-2)
			indicator = @getStatusIndicator(img)

			if data.fileInList == false and timePassed > 3
				$(".image-loading-message", $(img).next()).html("Failed to load image: file not found")
				$(img).next().addClass("failed")
			else if data.retries > 6 and timePassed > 100
				$(".image-loading-message", $(img).next()).html("Failed to load image: timeout")
				$(img).next().addClass("failed")
			else
				$(".image-loading-message", $(img).next()).html("Loading image... #{m}:#{s} #{indicator}")


	handleFailedImage: (image) ->
		if image.isLoaded
			return

		img = image.img
		data = @getAttachedData(img)

		if data.retries > @max_retries
			return

		parsedUrl = corsRequester.parseUrl(img.src)
		if not parsedUrl
			return

		corsRequester.requestSiteAndContentJson(img.src)
		.then () =>
			if data.retries > @max_retries
				return
			setTimeout (=>
				@reloadImage(img)
			), 500 + data.retries * 4000


	onImagesLoaded_Progress: =>
		for image in @imagesLoaded.images
			@handleImageProgress(image)


	onImagesLoaded_Always: () =>
		for image in @imagesLoaded.images
			@handleImageProgress(image)
			@handleFailedImage(image)


	restartImageWatcher: ->
		@imagesLoaded = new imagesLoaded(@cb_selector())
		@imagesLoaded.on "always", (instance) =>
			@onImagesLoaded_Always()
		@imagesLoaded.on "progress", (instance, image, y) =>
			@onImagesLoaded_Progress()

	onTick: ->
		if (Time.timestamp() - @timeStarted) > @maxTimeout
			return

		@onImagesLoaded_Progress()

		if @imagesLoaded.isComplete and not @imagesLoaded.hasAnyBroken
			return

		if @imagesLoaded.isComplete and @imagesLoaded.hasAnyBroken
			@restartImageWatcher()

		setTimeout (=>
			@onTick()
		), 1000

window.CorsResolver = CorsResolver

