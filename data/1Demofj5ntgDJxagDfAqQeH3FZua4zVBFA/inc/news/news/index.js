let columnNode = document.getElementById("news_column");
let headerNode = document.getElementById("column-news-news-header");
let node = document.getElementById("news_posts");
let mainContainer = document.getElementById("main_container");

columnNode.style.flexGrow = "0";
columnNode.style.flexBasis = "20%";
headerNode.style.flexGrow = "0";
headerNode.style.flexBasis = "20%";

let currentPosts = [];
let currentPostsIndex = 0;
let currentPostsOffset = 0;
let isLoading = false;

let getRealNodeHeight = () => {
	let display = node.style.display;
	node.style.display = "";
	let height = node.getBoundingClientRect().height;
	node.style.display = display;
	return height;
};

let load = () => {
	isLoading = true;
	return Posts.load("news", "news")
		.then(posts => {
			node.innerHTML = "";

			currentPosts = posts;
			currentPostsIndex = 0;
			currentPostsOffset = 0;

			return loadPart();
		});
};
let loadMore = () => {
	if(mainContainer.scrollTop > mainContainer.scrollHeight - document.documentElement.clientHeight - 200 && columnShown) {
		if(isLoading) {
			return;
		}
		isLoading = true;

		loadPart();
	}
};
let loadPart = () => {
	return currentPosts
		.slice(currentPostsIndex)
		.reduce((promise, post, i) => {
			let postArgs = Object.assign({}, args, post);

			return promise.then(() => {
				let postNode = document.createElement("span");
				node.appendChild(postNode);

				if(getRealNodeHeight() > Math.max(500, window.innerHeight * 2) + currentPostsOffset) {
					node.removeChild(postNode);
					currentPostsIndex += i;
					currentPostsOffset = getRealNodeHeight();
					return Promise.reject();
				}

				return _includes.loadTo(postNode, "news/post", postArgs);
			});
		}, Promise.resolve())
		.then(() => {
			currentPostsIndex = currentPosts.length;
			currentPostsOffset = getRealNodeHeight();
			isLoading = false;
		})
		.catch(() => {
			isLoading = false;
		});
};

load("");

mainContainer.addEventListener("scroll", loadMore);
window.addEventListener("resize", loadMore);


let columnShown = true;

let offset = document.getElementById("columns_headers").getBoundingClientRect().bottom;
let lastScrollTop = 0;

mainContainer.addEventListener("scroll", () => {
	let rect = node.getBoundingClientRect();

	if(mainContainer.scrollTop < lastScrollTop) {
		// Scroll up
		if(mainContainer.scrollTop < currentPostsOffset && !columnShown) {
			columnShown = true;
			columnNode.style.flexBasis = "20%";
			headerNode.style.flexBasis = "20%";
			headerNode.style.opacity = "1";

			setTimeout(() => {
				node.style.display = "";
			}, 1000);
		}
	} else if(mainContainer.scrollTop > lastScrollTop) {
		// Scroll down
		if(rect.bottom <= offset && columnShown) {
			columnShown = false;
			columnNode.style.flexBasis = "";
			headerNode.style.flexBasis = "";
			headerNode.style.opacity = "0";
			node.style.display = "none";
		}
	}

	lastScrollTop = mainContainer.scrollTop;
});