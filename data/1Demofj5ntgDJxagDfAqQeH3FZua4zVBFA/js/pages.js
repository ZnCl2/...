Pages = {};
Pages.platforms = [
	"Amiga",
	"DOS",
	"Linux",
	"Mac OS Intel",
	"Mac OS PowerPC",
	"PDP-1",
	"Web Browser",
	"Windows"
].sort();
Pages.pages = {
	releases: {
		header: "RELEASES",
		singular: "release",
		sections: {
			music: {
				header: "MUSIC",
				singular: "music",
				partitions: {
					disks: {
						header: "music disks",
						singular: "music disk"
					},
					executable: {
						header: "executable music",
						singular: "executable music"
					},
					singles: {
						header: "singles",
						singular: "single"
					}
				},
				types: {
					mod: {
						name: "MOD",
						platform: "Amiga"
					},
					stm: {
						name: "Scream Tracker 2",
						platform: "DOS"
					},
					s3m: {
						name: "Scream Tracker 3",
						platform: "DOS"
					},
					xm: {
						name: "Fast Tracker",
						platform: "DOS"
					},
					it: {
						name: "Impulse Tracker",
						platform: "DOS"
					}
				},
				emptyImageFileAllowed: true,
				emptyImageFileHandler: data => {
					return "url(img/posts/" + data.musicType + "_single.png)";
				}
			},
			demo: {
				header: "DEMOS & INTROS",
				singular: "demo",
				partitions: {
					intro64b: {
						header: "intros 64 bytes",
						singular: "intro 64 bytes"
					},
					intro128b: {
						header: "intros 128 bytes",
						singular: "intro 128 bytes"
					},
					intro256b: {
						header: "intros 256 bytes",
						singular: "intro 256 bytes"
					},
					intro512b: {
						header: "intros 512 bytes",
						singular: "intro 512 bytes"
					},
					intro4k: {
						header: "intros 4 kilobytes",
						singular: "intro 4 kilobytes"
					},
					intro8k: {
						header: "intros 8 kilobytes",
						singular: "intro 8 kilobytes"
					},
					intro64k: {
						header: "intros 64 kilobytes",
						singular: "intro 64 kilobytes"
					},
					megademo: {
						header: "megademos",
						singular: "megademo"
					}
				}
			},
			graphics: {
				header: "GRAPHICS",
				singular: "graphic",
				partitions: {
					animation: {
						header: "animation",
						singular: "animation"
					},
					handdrawn: {
						header: "handdrawn",
						singular: "handdrawn"
					},
					procedural: {
						header: "procedural",
						singular: "procedural"
					},
					rendered: {
						header: "rendered",
						singular: "rendered"
					}
				}
			}
		},
		columns: [
			{
				size: "big",
				section: "demo"
			},
			{
				size: "small",
				section: "graphics"
			},
			{
				size: "small",
				section: "music"
			}
		]
	},
	tools: {
		header: "TOOLS",
		singular: "tool",
		sections: {
			design: {
				header: "DESIGN",
				singular: "design tool",
				partitions: {
					demosystems: {
						header: "demosystems",
						singular: "demosystem"
					}
				}
			},
			code: {
				header: "CODE",
				singular: "code tool",
				partitions: {
					packers: {
						header: "packers",
						singular: "packer"
					}
				}
			},
			music: {
				header: "MUSIC",
				singular: "music tool",
				partitions: {
					players: {
						header: "players",
						singular: "player"
					},
					synthesizers: {
						header: "synthesizers",
						singular: "synthesizer"
					},
					trackers: {
						header: "trackers",
						singular: "tracker"
					}
				}
			},
			emulators: {
				header: "EMULATORS",
				singular: "emulator",
				partitions: {}
			}
		},
		columns: [
			{
				size: "small",
				section: "design"
			},
			{
				size: "small",
				section: "code"
			},
			{
				size: "small",
				section: "music"
			},
			{
				size: "small",
				section: "emulators"
			}
		]
	},
	news: {
		header: "NEWS",
		singular: "news",
		sections: {
			news: {
				header: "NEWS",
				singular: "news",
				partitions: {}
			}
		},
		columns: [
			{
				size: "small",
				section: "news"
			}
		]
	}
};

_includes.register("template/page", "inc/template/page/index.html");
_includes.register("template/add", "inc/template/add/index.html");
_includes.register("template/post", "inc/template/post/index.html");
_includes.register("template/modal-post", "inc/template/modal-post/index.html");
_includes.register("template/comments-comment", "inc/template/comments-comment/index.html");
_includes.register("template/comments-new", "inc/template/comments-new/index.html");

_includes.register("news/add", "inc/news/add/index.html");
_includes.register("news/post", "inc/news/news/post.html");

_router.on("/", () => {
	_includes.load("template/page", {
		page: "releases"
	});
});

_router.on("/:page", page => {
	if(!Pages.pages.hasOwnProperty(page)) {
		return false;
	}

	_includes.load("template/page", {
		page: page
	});
});

_router.on("/:page/add/:section/:partition", (page, section, partition) => {
	if(page == "news") {
		_includes.load("news/add", {
			edit: false
		});
		return;
	}

  	if(
		!Pages.pages.hasOwnProperty(page) ||
		!Pages.pages[page].sections.hasOwnProperty(section) ||
		(
			Object.keys(Pages.pages[page].sections[section].partitions).length &&
			!Pages.pages[page].sections[section].partitions.hasOwnProperty(partition)
		)
	) {
		return false;
	}

	_includes.load("template/add", {
		page: page,
		section: section,
		partition: partition,
		edit: false
	});
});
_router.on("/:page/add/:section", (page, section) => {
	if(page == "news") {
		_includes.load("news/add", {
			edit: false
		});
		return;
	}

	if(
		!Pages.pages.hasOwnProperty(page) ||
		!Pages.pages[page].sections.hasOwnProperty(section) ||
		Object.keys(Pages.pages[page].sections[section].partitions).length
	) {
		return false;
	}

	_includes.load("template/add", {
		page: page,
		section: section,
		partition: "",
		edit: false
	});
});

_router.on("/:page/edit/:section/:partition/:id", (page, section, partition, id) => {
	if(page == "news") {
		_includes.load("news/add", {
			edit: false
		});
		return;
	}

	if(
		!Pages.pages.hasOwnProperty(page) ||
		!Pages.pages[page].sections.hasOwnProperty(section) ||
		(
			Object.keys(Pages.pages[page].sections[section].partitions).length &&
			!Pages.pages[page].sections[section].partitions.hasOwnProperty(partition)
		)
	) {
		return false;
	}

	_includes.load("template/add", {
		page: page,
		section: section,
		partition: partition,
		edit: true,
		id: id
	});
});
_router.on("/:page/edit/:section/:id", (page, section, id) => {
	if(page == "news") {
		_includes.load("news/add", {
			edit: false
		});
		return;
	}

	if(
		!Pages.pages.hasOwnProperty(page) ||
		!Pages.pages[page].sections.hasOwnProperty(section) ||
		Object.keys(Pages.pages[page].sections[section].partitions).length
	) {
		return false;
	}

	_includes.load("template/add", {
		page: page,
		section: section,
		partition: "",
		edit: true,
		id: id
	});
});