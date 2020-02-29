class Renderer extends marked.Renderer
	image: (href, title, text) ->
		if not @options.allow_images
			if title and title != ""
				title = "\" #{title}\""
			else
				title = ""
			return "<code>![#{text}](#{href}#{title})</code>"

		if not @options.allow_clearnet_media and not ZeroUrl.isZeroNetUrl(href)
			if title and title != ""
				title = "\" #{title}\""
			else
				title = ""
			return "<a class='warning-clearnet-media' href='#{href}'>![#{text}](#{href}#{title})</a>"

		if @options.detect_media_by_description
			if text.match /^video:/
				return @extVideo(href, title, text)
			else if text.match /^audio:/
				return @extAudio(href, title, text)

		if @options.detect_media_by_extension
			if href.match /\.(mp4|webm)(#.*)?$/i
				return @extVideo(href, title, text)
			else if href.match /\.(mp3|wav|flac)(#.*)?$/i
				return @extAudio(href, title, text)

		return super(href, title, text)

	extVideo: (href, title, text) ->
		title ?= ""
		return """
			<video controls="controls" src="#{href}" title="#{title}">
				Your browser does not support the video tag.
			</video>
		"""

	extAudio: (href, title, text) ->
		title ?= ""
		return """
			<audio controls="controls" src="#{href}" title="#{title}">
				Your browser does not support the audio tag.
			</audio>
		"""

	listitem: (text) =>
		if text.startsWith "[ ] "
			text = text.replace("[ ] ", "<i class='icon-checkbox-off'></i>")
		else if text.startsWith "[x] "
			text = text.replace("[x] ", "<i class='icon-checkbox-on'></i>")
		return "<li>#{text}</li>"

class Text
	formatBytes: (n) ->
		if n >= 1000000000
			"#{(n/1000000000).toFixed(1)}GB"
		else if n >= 1000000
			"#{(n/1000000).toFixed(1)}MB"
		else if n >= 1000
			"#{(n/1000).toFixed(1)}kB"
		else
			"#{(n).toFixed(0)}B"

	toColor: (text, saturation=30, lightness=50) ->
		hash = 0
		for i in [0..text.length-1]
			hash += text.charCodeAt(i)*i
			hash = hash % 1777
		if Page.server_info?.user_settings?.theme == "dark"
			return "hsl(" + (hash % 360) + ",#{saturation + 5}%,#{lightness + 15}%)";
		else
			return "hsl(" + (hash % 360) + ",#{saturation}%,#{lightness}%)";

	toMarked: (text, options={}) ->
		options["gfm"] = true
		options["breaks"] = true
		options["renderer"] = renderer
		text = @fixReply(text)
		text = marked(text, options)
		return @fixHtmlLinks text

	fixHtmlLinks: (text) ->
		ZeroUrl.rebaseHtmlLinks(text)

	fixLink: (link) ->
		ZeroUrl.rebaseUrl(link)

	toUrl: (text) ->
		return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "")

	format: () ->
		args = Array.from(arguments);
		fmt = args.shift()
		return fmt

	fixReply: (text) ->
		return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2")


	jsonEncode: (obj) ->
		return btoa(unescape(encodeURIComponent(JSON.stringify(obj, undefined, '\t'))))


window.renderer = new Renderer()
window.Text = new Text()
