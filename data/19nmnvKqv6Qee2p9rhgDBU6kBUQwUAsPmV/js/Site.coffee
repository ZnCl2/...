class Site
	constructor: (@row) ->
		@

	render: =>
		h("a.site", { href: Text.fixLink("http://127.0.0.1:43110/"+@row.address), key: @row.address, enterAnimation: Animation.slideDown, exitAnimation: Animation.slideUp}, [
			h("div.go", "\u203A")
			h("div.title", @row.title),
			if @row.category == 'forum' then h("div.tag.tag-new", "Forum & Boards"),			
			if @row.category == 'blog' then h("div.tag.tag-popular", "Blogs"),		
			if @row.category == 'other' then h("div.tag.tag-other", "Other"),		
			#if @row.tags.indexOf("new") >= 0 then h("div.tag.tag-new", "New"),
			#if @row.tags.indexOf("popular") >= 0 then h("div.tag.tag-popular", "Popular"),
			h("div.description", @row.description)
		])

window.Site = Site