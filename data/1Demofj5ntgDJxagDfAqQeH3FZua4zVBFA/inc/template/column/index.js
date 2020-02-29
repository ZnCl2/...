let sortPosts = posts => {
	let isSmallIntro = post => post.section == "demo" && post.partition.indexOf("intro") == 0 && post.partition.slice(-1)[0] != "k";

	let smallIntros = posts.map((post, i) => i).filter(i => isSmallIntro(posts[i]));
	if(smallIntros.length % 2 == 1) {
		smallIntros.pop();
	}

	for(let i = 0; i < smallIntros.length; i += 2) {
		posts[smallIntros[i]].hasPair = "first";
		posts[smallIntros[i + 1]].hasPair = "second";

		posts.splice(smallIntros[i] + 1, 0, posts[smallIntros[i + 1]]);
		posts.splice(smallIntros[i + 1] + 1, 1);
	}
};

let columnNode = document.getElementById("column-" + args.page + "-" + args.section);
let headerNode = document.getElementById("column-" + args.page + "-" + args.section + "-header");
let sectionNode = document.getElementById("column_" + args.page + "_" + args.section + "_header_section");
let node = document.getElementById("column-" + args.page + "-" + args.section + "-posts");
let mainContainer = document.getElementById("main_container");

let loadHandler = () => true;
let currentPartition = "";
let currentPosts = [];
let currentPostsIndex = 0;
let currentPostsOffset = 0;
let isLoading = false;

let load = partition => {
	currentPartition = partition;
	isLoading = true;
	return Posts.load(args.page, args.section, partition)
		.then(posts => {
			if(currentPartition != partition) {
				// Loading another
				return;
			}

			sortPosts(posts);

			node.innerHTML = "";

			currentPosts = posts.filter(loadHandler);
			currentPostsIndex = 0;
			currentPostsOffset = 0;

			return loadPart();
		}).then(() => {
			columnNode.style.flexGrow = "";
			headerNode.style.flexGrow = "";
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

				if(node.getBoundingClientRect().height > Math.max(500, window.innerHeight * 2) + currentPostsOffset) {
					node.removeChild(postNode);
					currentPostsIndex += i;
					currentPostsOffset = node.getBoundingClientRect().height;
					return Promise.reject();
				}

				return _includes.loadTo(postNode, "template/post", postArgs);
			});
		}, Promise.resolve())
		.then(() => {
			currentPostsIndex = currentPosts.length;
			currentPostsOffset = node.getBoundingClientRect().height;
			isLoading = false;
		})
		.catch(() => {
			isLoading = false;
		});
};

load("");

mainContainer.addEventListener("scroll", loadMore);
window.addEventListener("resize", loadMore);

let dropdownNode = document.getElementById("column-" + args.section + "-dropdown");
if(dropdownNode) {
	let dropdown = new DropDown(dropdownNode, "right");

	dropdown.addEventListener("change", () => {
		if(dropdown.value.indexOf("show_") == 0) {
			sectionNode.innerHTML = (
				dropdown.value == "show_"
					? Pages.pages[args.page].sections[args.section].header
					: Pages.pages[args.page].sections[args.section].partitions[dropdown.value.replace("show_", "")].header
			);

			load(dropdown.value.replace("show_", ""));
		} else if(dropdown.value.indexOf("add_") == 0) {
			location.href = "?/" + args.page + "/add/" + args.section + "/" + dropdown.value.replace("add_", "");
		}
	});
}

// All platforms [v]
if(!window.postsReload) {
	window.postsReload = handler => {
		window.postsReload.listeners.forEach(f => f(handler));
	};
	window.postsReload.listeners = [];
	window.postsReload.on = f => window.postsReload.listeners.push(f);
}

window.postsReload.on(handler => {
	loadHandler = handler;
	load(currentPartition);
});

let columnShown = true;

let offset = document.getElementById("columns_headers").getBoundingClientRect().bottom;
let lastScrollTop = 0;

mainContainer.addEventListener("scroll", () => {
	let rect = node.getBoundingClientRect();

	if(mainContainer.scrollTop < lastScrollTop) {
		// Scroll up
		if(mainContainer.scrollTop < currentPostsOffset && !columnShown) {
			columnShown = true;
			columnNode.style.flexGrow = "";
			headerNode.style.flexGrow = "";
			headerNode.style.opacity = "1";
		}
	} else if(mainContainer.scrollTop > lastScrollTop) {
		// Scroll down
		if(rect.bottom <= offset && columnShown) {
			columnShown = false;
			columnNode.style.flexGrow = "0";
			headerNode.style.flexGrow = "0";
			headerNode.style.opacity = "0";
		}
	}

	lastScrollTop = mainContainer.scrollTop;
});