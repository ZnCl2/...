class Head
	render: ->
		h("div#Head", [
			h("div.logo", [
				h("img", {"src": "img/logo.png", "width": 58, "height": 64}),
				h("h1", "Maggie's ZeroNet Sites"),
				h("h2", "created by Maggie")
			]),
		])

window.Head = Head