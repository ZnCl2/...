#TODO: sort -> natsort

collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'})

class ZeroFrameA extends ZeroFrame
	init: ->
		frontend="1PGaLLNiadMzrmw6MMMnpZnskwFcdgZoS4"
		hub="1ChByYBAm9S5pT7F3pckjSTb2wxTaYwGeX"
		ctitles = {
			loli: "Lolicon",
			female: "Female only",
			male: "Male only",
			zoo: "Bestiality",
		}
		missing=true
		@cmd "fileGet", ["anthologies.json"], (result) =>
			anthologies = JSON.parse(result)
			#anthologies.sort((a,b) => a["sort_as"]>b["sort_as"])
			total = 0
			for k, antho of anthologies
				if antho["volumes"].length>0
					total+=antho["volumes"].length
					complete = "incomplete"
					checked = ""
					if antho["total"]==antho["volumes"].length and antho["total"]>0
						complete = "complete"
					if antho["checked"]!=undefined
						checked = "checked"
					html = "<div class=\"antho\" onclick=\"this.classList.toggle('show-hidden')\">"
					html+="<h3 class=\""+complete+" "+checked+"\">"
					for k, c of antho["categories"]
						html+="<img class=\"icon\" title=\""+ctitles[c]+"\" src=\"./icons/"+c+".svg\"/>"
					html+=antho["title"]
					html+="<span class=\"volcount\">("+antho["volumes"].length
					if missing==true
						if antho["missing"]!=undefined
							html+="<span class=\"missing\"> +"+antho["missing"].length+"</span>"
							antho["volumes"]
							for vol in antho["missing"]
								volume = {
									"title":vol
									"path":null
								}
								antho["volumes"].push(volume)
							antho["volumes"] = antho["volumes"].sort(
								(a,b) => collator.compare(a["title"],b["title"])
							)
					html+=")</span></h3><ol>"
					for vol in antho["volumes"]
						html+="<li>"
						if vol["path"]!=null
							html+="<a onmouseover=\"this.nextElementSibling.firstChild.src=\'galleries/"+vol["path"]+"/"+vol["cover"]+"\'\" href=\"/"+frontend+"/?!/g/"+hub+"/"+vol["path"]+"\">"+vol["title"]+"</a>"
							html+="<div class=\"cover\"><img/></div>"
						else
							html+="<div class=\"missing\">"+vol["title"]+"</div>"
						html+="</li>"
					html+="</ol></div>"
					document.getElementById("lists").innerHTML+=html
			document.getElementById("totalcount").innerHTML="Hosting "+total+" volumes"
	
window.Page = new ZeroFrameA()
