class SiteLists extends Class
	constructor: ->
		@sitelists_db = {}		
		#@sitelists_db["forum"] = new SiteList({"title":"Forums, Boards", "sites": []})
		#@sitelists_db["blog"] = new SiteList({"title":"Blogs", "sites": []})
		#@sitelists_db["other"] = new SiteList({"title":"Other", "sites": []})		
		# @sitelists_db["game"] = new SiteList({"title":"Games", "sites": []})
		@sitelists_db["all"] = new SiteList({"title":"all", "sites": []})
		@sitelists = (sitelist for key, sitelist of @sitelists_db)
		Page.on_site_info.then =>
			@updateSitelists()

	updateSitelists: ->
		Page.cmd "dbQuery", ["SELECT * FROM site ORDER BY sort, title COLLATE NOCASE"], (rows) =>
			sites_db = {}
			# Group by category
			for row in rows				
				#sites_db[row["category"]] ?= []
				#sites_db[row["category"]].push(row)				
				sites_db["all"]?= []
				sites_db["all"].push(row)
				
			# Sync items
			for category,sites of sites_db
				@sitelists_db[category].item_list.sync(sites)				

			Page.projector.scheduleRender()

	render: =>
		h("div#SiteLists",
			h("a.addsite",
				{"href": Text.fixLink("http://127.0.0.1:43110/Talk.ZeroNetwork.bit/?Topic:6_1QBLGLcgKfcpfLmiDYuDzUKVXFfmTAew55/Anyone+using+Zero+on+mobile")},
				"Submit new site"
			),
			h("div.sitelists", @sitelists.map (sitelist) ->
				sitelist.render()
			)
		)

	onSiteInfo: (site_info) ->
		if site_info.event
			[action, inner_path] = site_info.event
			if action == "file_done" and inner_path == "data/data.json"
				@updateSitelists()

window.SiteLists = SiteLists