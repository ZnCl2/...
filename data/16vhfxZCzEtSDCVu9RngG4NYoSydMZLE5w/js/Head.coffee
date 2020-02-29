class Head
	render: ->
		h("div#Head", [
			h("div.logo", [				
				h("h1", "Zeronet Central"),
				h("h2", "Welcome to Zeronet Central - A Zeronet Sites Catalogue"),
				h("div.headimg")				
			]),
		])

window.Head = Head