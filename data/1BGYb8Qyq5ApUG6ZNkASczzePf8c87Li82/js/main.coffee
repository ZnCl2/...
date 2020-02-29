class ZeroPolBooks extends ZeroFrameP
	init: ->
		@loaded = false

	onOpenWebsocket: (e) =>
		collections = [
			"pol books 01 - sept 2015",
			"pol books 02 - oct 2015",
			"pol books 03 - nov 2015",
			"pol books 04 - dec 2015",
			"pol books 05 - jan 2016",
			"pol books 06 - jan 2016",
			"pol books 07 - feb 2016",
			"pol books 08 - feb 2016",
			"pol books 09 - march 2016",
			"pol books 10 - april 2016",
			"pol books 11 - may 2016",
			"pol books 12 - june 2016",
			"pol books 13 - july 2016",
			"pol books 14 - nov 2016",
			"pol books 15 - feb 2017",
			"pol books 16 - march 2017",
			"pol books 17 - nov 2017",
			"pol books 18 - feb 2018",
			"pol books 19 - dec 2018",
			"pol books 20 - jan 2019",
			"pol books 21 - march 2019",
			"pol books 22 - may 2019"
		]
		url = window.location.search.substring(1)
		if @loaded!=true
			@loaded=true
			if match = url.match /^(\d+)/
				console.log "loading collection", match[1]
				@listBooks(collections[match[1]-1])
			else
				@drawIndex()
				# @listBooks(collections[0])

	listBooks: (collection) =>
		@cmd "fileGet", [collection+"/collection.json"], (data) =>
			data = JSON.parse(data)
			document.getElementById("collection").innerHTML += """
				<div class="topbar">
					<span class="number"></span>
					—
					<span class="title"></span>
					<span class="date"></span>
				</div>
				<div class="books">
				</div>
			"""
			$(".number").html "POLITICALLY INCORRECT BOOKS #"+data["number"]
			$(".title").html data["title"]
			$(".date").html data["date"]
			for book in data["books"]
				if book["title"]==""
					continue
				if book["title"]=="empty"
					inner = "<div class=\"book\"></div>"
				else
					inner = "
					<div class=\"book\">"
					if book["cover"]!=undefined
						inner += "<img src=\"./"+collection+"/"+book["cover"]+"\"/>"
					else
						inner += "<img src=\"./"+collection+"/"+book["title"]+".jpeg\"/>"
					inner += "
						<b>"+book["title"]+" </b>— "+
						book["author"]+" ("+
						book["published"]+")
						<span class=\"downloads\">"
					if book["files"]["epub"] != undefined
						inner += "<a class=\"epub\" href=\"./"+collection+"/"+book["files"]["epub"]+"\">epub</a> "
					if book["files"]["epub-alt"] != undefined
						inner += "<a class=\"epub\" href=\"./"+collection+"/"+book["files"]["epub-alt"]+"\">epub</a> "
					if book["files"]["pdf"] != undefined
						inner += "<a class=\"pdf\" href=\"./"+collection+"/"+book["files"]["pdf"]+"\">pdf</a> "
					if book["files"]["pdf-alt"] != undefined
						inner += "<a class=\"pdf\" href=\"./"+collection+"/"+book["files"]["pdf-alt"]+"\">pdf</a> "
					if book["files"]["pdf-alt2"] != undefined
						inner += "<a class=\"pdf\" href=\"./"+collection+"/"+book["files"]["pdf-alt2"]+"\">pdf</a> "
					if book["files"]["inclib"] != undefined
						inner += "<a class=\"inclib\" href=\"./"+collection+"/"+book["files"]["inclib"]+"\">inclib epub</a>"
					inner += "
						</span>
					</div>
					"
				$(".books").append inner

	drawIndex: () =>
		document.getElementById("collection").innerHTML += """
		<div class="welcome">
			<h1>/pol/books</h1>
			<p>Spreading knowledge since 1488 AD</p>
		</div>
		"""

window.Page = new ZeroPolBooks()
