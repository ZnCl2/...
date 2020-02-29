let mainContainer = document.getElementById("main_container");
let headersNode = document.getElementById("columns_headers");

let offset = headersNode.getBoundingClientRect().top;

mainContainer.addEventListener("scroll", () => {
	headersNode.style.top = mainContainer.scrollTop + offset + "px";
});

mainContainer.addEventListener("click", e => {
	if(
		e.target.classList.contains("post-link-like") &&
		!e.target.classList.contains("post-link-liked")
	) {
		let page = e.target.getAttribute("data-page");
		let section = e.target.getAttribute("data-section");
		let partition = e.target.getAttribute("data-partition");
		let id = parseInt(e.target.getAttribute("data-id"));

		Posts.like(page, section, partition, id)
			.then(likes => {
				e.target.innerHTML = Translate.likes(likes);
				e.target.classList.add("post-link-liked");

				if(reloadPostListener) {
					reloadPostListener(page, section, partition, id);
				}
			});
	}
});