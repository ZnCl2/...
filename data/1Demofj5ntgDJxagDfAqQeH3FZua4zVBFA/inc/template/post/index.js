let node = document.getElementById("post_" + args.page + "_" + args.section + "_" + args.partition + "_" + args.id);

if(!window.reloadPostListener) {
	window.reloadPostListener = (page, section, partition, id) => {
		let uniqueId = Posts.getUniqueId(page, section, partition, id);

		reloadPostListener.listeners
			.filter(listener => {
				return listener.uniqueId == uniqueId && listener.handler != handler;
			})
			.forEach(listener => listener.handler());
	};
	reloadPostListener.listeners = [];
}

let handler = () => {
	reloadPostListener.listeners.splice(reloadPostListener.listeners.indexOf(handler), 1);

	let newNode;

	Posts.loadOne(args.page, args.section, args.partition, args.id)
		.then(post => {
			if(node.classList.contains("post-pair-first")) {
				post.hasPair = "first";
			} else if(node.classList.contains("post-pair-second")) {
				post.hasPair = "second";
			}

			newNode = document.createElement("span");
			return _includes.loadTo(newNode, "template/post", post);
		})
		.then(() => {
			node.parentNode.parentNode.replaceChild(newNode, node.parentNode);
		});
};
reloadPostListener.listeners.push({
	handler: handler,
	uniqueId: Posts.getUniqueId(args.page, args.section, args.partition, args.id)
});