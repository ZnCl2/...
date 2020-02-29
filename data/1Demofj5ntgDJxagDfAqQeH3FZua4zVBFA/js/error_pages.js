let data = {};
let currentCoverContent = "";

function loadErrorPage(page) {
	if(currentCoverContent == page) {
		return;
	}

	let cover = document.getElementById("main_cover");

	cover.style.display = "inline-block";
	_includes.loadTo(cover, "error-" + page);
}
function hideErrorPage() {
	currentCoverContent = "";

	let cover = document.getElementById("main_cover");

	cover.style.display = "none";
}

_includes.register("error-notFound", "inc/error/notfound/index.html");
_includes.on("notFound", file => {
	loadErrorPage("notFound");
	data = {file: file};
});
_router.on("::mismatch", url => {
	loadErrorPage("notFound");
	data = {file: url};
});

_includes.on("change", section => {
	if(section.substr(0, 6) != "error-") {
		hideErrorPage();
	}
});
_includes.on("preInsert", (section, html) => {
	if(section.substr(0, 6) != "error-") {
		// Handle only error pages
		return html;
	}

	if(section == "error-notFound") {
		return html.replace(/{{file}}/g, data.file);
	}

	return html;
});