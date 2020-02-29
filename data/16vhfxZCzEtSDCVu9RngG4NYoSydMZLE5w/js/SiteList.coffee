class SiteList
	constructor: (@row) ->
		@item_list = new ItemList(Site, "address")
		@sites = @item_list.items
		@item_list.sync(@row.sites)

	render: ->		
		h("div.sitelist", [			
			h("div.num", "Number of sites:"+@sites.length)
			if @sites.length > 0 then h("div.sites", [
				@sites.map (item) ->
					item.render()
			])
		])

window.SiteList = SiteList