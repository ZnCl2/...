
class SignAllContent

	constructor: (@page) ->
		return

	run: (path, private_key) =>
		filenames = null
		return $.when()
		.then => $.Deferred (d) =>
			@page.cmd "fileList", {"inner_path": path}, (res) =>
				filenames = res
				d.resolve()
		.then => $.Deferred (d) =>
			promises = []
			for f in filenames.filter((f) -> /\/content\.json$/.test(f))
				promises.push ($.Deferred (d) =>
					inner_path = path + "/" + f
					@page.cmd "sitePublish", {"inner_path": inner_path, "privatekey": private_key}, (res) =>
						if res == "ok"
							@page.log("Signed: #{inner_path}")
						else
							@page.log("Failed to sign: #{inner_path}")
							@page.log(res)
						d.resolve()
				.promise())
			$.when(promises).then => d.resolve()
		.promise()

window.SignAllContent = SignAllContent