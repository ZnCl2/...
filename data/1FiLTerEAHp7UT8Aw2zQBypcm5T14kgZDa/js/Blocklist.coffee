window.h = maquette.h

class Blocklist extends ZeroFrame
	init: ->
		@params = {}
		@server_info = null
		@need_update = true
		@sites = []
		@users = []
		@includes_active = []

	createProjectors: =>
		@projector = maquette.createProjector()
		@projector.replace($("#content"), @render)

	# Parse incoming requests from UiWebsocket server
	onRequest: (cmd, params) ->
		if cmd == "setSiteInfo" # Site updated
			@setSiteInfo(params)
		else if cmd == "setServerInfo"
			@setServerInfo(params)
		else
			@log "Unknown command", params

	setSiteInfo: (site_info) ->
		@site_info = site_info

	setServerInfo: (server_info) ->
		@server_info = server_info

	update: =>
		@need_update = false
		Page.cmd "fileGet", "filters/users.json", (res) =>
			@users = []
			for auth_address, row of JSON.parse(res)["mutes"]
				row.auth_address = auth_address
				@users.push(row)
			@users.sort (a, b) ->
				return b.date_added - a.date_added
			@projector.scheduleRender()

		Page.cmd "fileGet", "filters/sites.json", (res) =>
			@sites = []
			for address, row of JSON.parse(res)["siteblocks"]
				row.address = address
				@sites.push(row)
			@sites.sort (a, b) ->
				return b.date_added - a.date_added
			@projector.scheduleRender()

		Page.cmd "filterIncludeList", [], (res) =>
			@includes_active = []
			for row in res
				@includes_active[row.inner_path] = true

	handleBlockSitesClick: =>
		if @includes_active["filters/sites.json"]
			Page.cmd "filterIncludeRemove", "filters/sites.json", (res) =>
				@update()
		else
			Page.cmd "filterIncludeAdd", "filters/sites.json", (res) =>
				@update()

	handleBlockUsersClick: =>
		if @includes_active["filters/users.json"]
			Page.cmd "filterIncludeRemove", "filters/users.json", (res) =>
				@update()
		else
			Page.cmd "filterIncludeAdd", "filters/users.json", (res) =>
				@update()

	renderSites: (rows) =>
		return h("div.sites", [
			h("h2", [
				"Sites: ",
				h("div.help.checkbox", {classes: {checked: @includes_active["filters/sites.json"]}, onclick: @handleBlockSitesClick},
					h("div.checkbox-skin"),
					h("div.title", "Block sites on the list")
				)
			]),
			h("table.list",
				h("tr", h("th.added", "Added"), h("th.subject", "Site"), h("th.reason", "Reason")),
				rows.map (row) ->
					h("tr",
						h("td.added", Time.date(row.date_added, "long")),
						h("td.subject", h("a", {href: Text.getSiteUrl(row.address)}, row.name)),
						h("td.reason", {innerHTML: Text.renderMarked(row.reason)}, "")
					)
			)
		])

	renderUsers: (rows) =>
		return h("div.users", [
			h("h2", [
				"Users: ",
				h("div.help.checkbox", {classes: {checked: @includes_active["filters/users.json"]}, onclick: @handleBlockUsersClick},
					h("div.checkbox-skin"),
					h("div.title", "Block users on the list")
				)
			]),
			h("table.list",
				h("tr", h("th.added", "Added"), h("th.subject", "User"), h("th.reason", "Reason")),
				rows.map (row) ->
					h("tr",
						h("td.added", Time.date(row.date_added, "long")),
						h("td.subject", {title: "Auth address: #{row.auth_address}"}, row.cert_user_id),
						h("td.reason", {innerHTML: Text.renderMarked(row.reason)}, "")
					)
			)
		])

	render: =>
		if @need_update
			@update()
		h("div.content",
			if @sites.length > 0
				@renderSites(@sites)
			if @users.length > 0
				@renderUsers(@users)

		)

	# Simple return false to avoid link clicks
	returnFalse: ->
		return false

window.Page = new Blocklist()
window.Page.createProjectors()
