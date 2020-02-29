let coverNode = document.getElementById("modal_cover");
let modalNode = document.getElementById("modal_node");
let closeNode = document.getElementById("modal_close");
let headerNode = document.getElementById("modal_header");
let postsNode = document.getElementById("modal_posts");

closeNode.onclick = () => {
	coverNode.style.display = "none";
	modalNode.style.display = "none";
};

window.Modal = {
	open: () => {
		coverNode.style.display = "inline-block";
		modalNode.style.display = "inline-block";
	},
	search: (type, content) => {
		Modal.open();

		headerNode.innerHTML = (
			type == "by"        ? "Releases by " + content :
			type == "bygroup"   ? "Releases by " + content :
			type == "demoparty" ? content + " demoparty" : ""
		);

		postsNode.innerHTML = "";

		Posts.search(type, content)
			.then(posts => {
				posts.forEach(post => {
					let node = document.createElement("div");
					postsNode.appendChild(node);
					_includes.loadTo(node, "template/modal-post", post);
				});
			});
	},
	comment: (page, section, partition, id) => {
		Modal.open();

		headerNode.innerHTML = "";
		postsNode.innerHTML = "";

		Posts.loadOne(page, section, partition, id)
			.then(post => {
				post.hideComments = true;

				let node = document.createElement("div");
				postsNode.appendChild(node);
				_includes.loadTo(node, "template/modal-post", post);

				let newNode = document.createElement("div");
				postsNode.appendChild(newNode);
				_includes.loadTo(newNode, "template/comments-new")
					.then(() => {
						let commentNewContent = document.getElementById("comment_new_content");
						let commentNewPublish = document.getElementById("comment_new_publish");

						let publishing = false;
						commentNewPublish.onclick = () => {
							if(publishing || commentNewContent.value.trim().length == 0) {
								return;
							}

							commentNewPublish.classList.add("publishing");
							commentNewPublish.innerHTML = "Publishing...";
							publishing = true;

							Posts.comment(page, section, partition, id, commentNewContent.value)
								.then(comment => {
									commentNewPublish.classList.remove("publishing");
									commentNewPublish.innerHTML = "Publish comment";
									publishing = false;

									let node = document.createElement("div");
									postsNode.insertBefore(node, newNode.nextSibling);
									_includes.loadTo(node, "template/comments-comment", comment);

									commentNewContent.value = "";

									if(reloadPostListener) {
										reloadPostListener(page, section, partition, id);
									}
								});
						};
					});

				Posts.loadComments(page, section, partition, id)
					.then(comments => {
						comments.forEach(comment => {
							let node = document.createElement("div");
							postsNode.appendChild(node);
							_includes.loadTo(node, "template/comments-comment", comment);
						});
					});
			});
	}
};