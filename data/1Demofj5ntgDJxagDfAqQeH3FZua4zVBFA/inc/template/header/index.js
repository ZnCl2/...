let mainContainer = document.getElementById("main_container");
let headerNode = document.getElementById("header");
mainContainer.addEventListener("scroll", () => {
	headerNode.style.top = mainContainer.scrollTop + "px";
});

// All platforms [v]
/*
let platformsNode = document.getElementById("header_platforms_value");

let dropdown = new DropDown(document.getElementById("header_platforms"), "right");
platformsNode.onclick = () => {
	document.getElementById("header_platforms").click();
};
dropdown.addEventListener("change", () => {
	platformsNode.innerHTML = dropdown.value || "All platforms";

	postsReload(post => {
		return post.platform == dropdown.value || !dropdown.value;
	});
});

if(!window.postsReload) {
	window.postsReload = handler => {
		window.postsReload.listeners.forEach(f => f(handler));
	};
	window.postsReload.listeners = [];
	window.postsReload.on = f => window.postsReload.listeners.push(f);
}
*/