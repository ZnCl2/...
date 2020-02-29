class ZeroUrl

	isZeronetDomainsProxied: =>
		(window.location.host == "zero" or window.location.pathname == "/")


	isZeroNetUrl: (url) ->
		if url.match /^\//
			return true
		else if url.match /^http:\/\/(127\.0\.0\.1|localhost):43110/i
			return true
		return false


	# Convert ZeroNet html links to the relative (gateway) form
	rebaseHtmlLinks: (text) ->
		replacer = (match, p1, p2, p3) =>
			p1 + @rebaseUrl(p2) + p3
		return text
		.replace(/(href=")([^"]+)(")/g, replacer)
		.replace(/(href=')([^']+)(')/g, replacer)
		.replace(/(src=")([^"]+)(")/g, replacer)
		.replace(/(src=')([^']+)(')/g, replacer)


	# Convert a ZeroNet URL to the relative (gateway) form
	rebaseUrl: (url) =>
		if @isZeronetDomainsProxied()
			tmp = url.replace(/^http:\/\/(127.0.0.1|localhost):43110/, 'http://zero')
			return tmp.replace(/^http:\/\/zero\/([^\/]+\.bit)/, "http://$1")  # Domain links
		else
			return url.replace(/^http:\/\/(127.0.0.1|localhost):43110/, '')


	# Convert a relative (gateway) URL to the normalized form
	normalizeUrl: (url) =>
		if @isZeronetDomainsProxied()
			if match = url.match /^http:\/\/zero\/(.+)/
				return 'http://127.0.0.1:43110/' + match[1]
			else if match = url.match /^http:\/\/([^\/]+\.bit)\/(.+)/
				return 'http://127.0.0.1:43110/' + match[1] + '/' + match[2]
			else
				return url
		else
			if url.match /^\/(1[a-km-zA-HJ-NP-Z1-9]{25,34}|[[^\/]+\.bit])/
				return 'http://127.0.0.1:43110' + url
			if url.startsWith(window.location.origin)
				return 'http://127.0.0.1:43110' + url.removePrefix(window.location.origin)
			else
				return url


	parse: (url, options = {}) =>
		if options.normalize
			url = @normalizeUrl(url)

		match = url.match /^http:\/\/127\.0\.0\.1:43110\/([^\/]+)\/?(.*)/
		if not match
			return false

		return {
			url: url,
			siteAddress: match[1],
			innerPath: match[2]
		}


window.ZeroUrl = new ZeroUrl()

