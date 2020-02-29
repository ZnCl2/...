let musicTypeNode = document.getElementById("add_musictype");

if(musicTypeNode) {
	musicTypeNode.onchange = () => {
		let platform = Pages.pages[args.page].sections[args.section].types[musicTypeNode.value].platform;
		document.getElementById("add_platform").value = platform;
	};
	musicTypeNode.onchange();
}