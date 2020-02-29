Posts = {
	gather: (page, section, partition) => {
		if(page == "news") {
			let where = [];

			return _zeroDB.query("SELECT *, \"" + page + "\" AS page FROM " + page + (where.length ? " WHERE (" + where.join(") AND (") + ")" : ""));
		} else if(page == "releases" || page == "tools") {
			let where = [];
			if(section) {
				where.push("section = \"" + section + "\"");
			}
			if(partition) {
				where.push("partition = \"" + partition + "\"");
			}

			return _zeroDB.query("SELECT *, \"" + page + "\" AS page FROM " + page + (where.length ? " WHERE (" + where.join(") AND (") + ")" : ""));
		} else if(!page) {
			return ZeroPage.async.concat(
				Posts.gather("releases", section, partition),
				Posts.gather("tools", section, partition)
			);
		} else {
			return Promise.resolve([]);
		}
	},
	load: (page, section, partition) => {
		return Posts.gather(page, section, partition).then(Posts.mapData).then(Posts.sort).then(Posts.normalize);
	},

	mapData: posts => {
		let ids;

		let auth = _zeroAuth.getAuth(); // Don't use requestAuth() as we don't need user to log in
		return Promise.all([
			_zeroDB.query("SELECT unique_id, COUNT(*) AS count FROM post_like GROUP BY unique_id"),
			_zeroDB.query("SELECT unique_id, COUNT(*) AS count FROM post_comment GROUP BY unique_id"),
			auth
				? _zeroDB.query("SELECT * FROM post_like, json WHERE json.directory = \"users/" + auth.address + "\" AND json.json_id = post_like.json_id")
				: []
		])
			.then(data => {
				ids = {};

				data[0].forEach(row => {
					ids[row.unique_id] = {
						likes: row.count,
						liked: false
					};
				});
				data[1].forEach(row => {
					if(!ids[row.unique_id]) {
						ids[row.unique_id] = {};
					}

					ids[row.unique_id].comments = row.count;
				});

				data[2].forEach(like => {
					if(ids[like.unique_id]) {
						ids[like.unique_id].liked = true;
					}
				});

				posts.forEach(post => {
					let uniqueId = Posts.getUniqueId(post.page, post.section, post.partition, post.id);
					post.mapped = ids[uniqueId];
				});

				return posts;
			});
	},

	gatherOne: (page, section, partition, id) => {
		if(page == "news") {
			let where = [];
			where.push("id = " + id);

			return _zeroDB.query("SELECT *, \"" + page + "\" AS page FROM " + page + (where.length ? " WHERE (" + where.join(") AND (") + ")" : ""))
				.then(posts => posts[0]);
		} else if(page == "releases" || page == "tools") {
			let where = [];
			where.push("id = " + id);
			if(section) {
				where.push("section = \"" + section + "\"");
			}
			if(partition) {
				where.push("partition = \"" + partition + "\"");
			}

			return _zeroDB.query("SELECT *, \"" + page + "\" AS page FROM " + page + (where.length ? " WHERE (" + where.join(") AND (") + ")" : ""))
				.then(posts => posts[0]);
		} else {
			return Promise.resolve(null);
		}
	},
	loadOne: (page, section, partition, id) => {
		return Posts.gatherOne(page, section, partition, id)
			.then(post => Posts.mapData([post]))
			.then(posts => posts[0])
			.then(Posts.normalizeOne);
	},

	loadComments: (page, section, partition, id) => {
		let uniqueId = Posts.getUniqueId(page, section, partition, id);
		return _zeroDB.query("SELECT post_comment.*, json.cert_user_id AS author FROM post_comment, json WHERE post_comment.unique_id = \"" + uniqueId + "\" AND post_comment.json_id = json.json_id");
	},

	sort: posts => posts.sort((a, b) => b.dateAdded - a.dateAdded),
	normalize: posts => {
		return ZeroPage.async.map(posts, Posts.normalizeOne);
	},
	normalizeOne: post => {
		let date = new Date(post.dateAdded);
		post.dateAdded = Translate.date(date.getDate(), date.getMonth(), date.getFullYear());

		post.plainPicture = post.picture;
		post.hasPicture = post.picture !== null;
		if(post.picture === null) {
			if(post.page != "news") {
				post.picture = Pages.pages[post.page].sections[post.section].emptyImageFileHandler(post);
			}
		} else {
			post.picture = "url(" + post.picture + ")";
		}

		return _isAdmin
			.then(isAdmin => {
				if(isAdmin) {
					post.activeLink = "?/" + post.page + "/edit/" + post.section + "/" + (post.partition ? post.partition + "/" : "") + post.id;
				} else {
					post.activeLink = post.downloadLink;
				}

				return post;
			});
	},

	add: (page, section, partition, info) => {
		if(page == "news") {
			let promise = Promise.resolve();
			if(info.picture) {
				promise = _zeroFS.writeFile("data/downloads/news/" + info.picture.name, info.picture.binary, true)
					.then(() => {
						info.picture = "data/downloads/news/" + info.picture.name;
					});
			}

			return _zeroDB.insertRow(
				"data/admin/data.json",
				"data/content.json",
				"news",
				info,
				{
					column: "id",
					source: "next_news_id"
				}
			);
		} else {
			info.section = section;
			info.partition = partition;

			let downloadDir = "data/downloads/" + page + "/" + section + (partition ? "/" + partition : "");

			let viewLink = info.view;
			if(viewLink && !viewLink.match(/^(ftp|https?):\/\//g)) {
				viewLink = downloadDir + "/" + info.download.name + "/" + viewLink;
			}

			return _zeroFS.writeFile(downloadDir + "/" + info.download.name, info.download.binary, true)
				.then(() => {
					if(info.picture) {
						let binary = info.picture.binary;

						info.picture = downloadDir + "/" + info.picture.name;
						return _zeroFS.writeFile(info.picture, binary, true);
					}
				}).then(() => {
					info.viewLink = viewLink || null;
					info.downloadLink = downloadDir + "/" + info.download.name;

					delete info.view;
					delete info.download;

					return _zeroDB.insertRow(
						"data/admin/data.json",
						"data/content.json",
						page,
						info,
						{
							column: "id",
							source: "next_" + page + "_id"
						}
					);
				});
		}
	},
	edit: (page, section, partition, id, info) => {
		if(page == "news") {
			info.id = id;

			let promise = Promise.resolve();
			if(info.picture) {
				let binary = info.picture.binary;

				info.picture = "data/downloads/news/" + info.picture.name;

				if(binary) {
					promise = _zeroFS.writeFile(info.picture, binary, true);
				}
			}

			return promise.then(() => {
				return _zeroDB.changeRow(
					"data/admin/data.json",
					"data/content.json",
					page,
					post => {
						return post.id == id ? info : post;
					}
				);
			});
		} else {
			info.section = section;
			info.partition = partition;
			info.id = id;

			let downloadDir = "data/downloads/" + page + "/" + section + (partition ? "/" + partition : "");

			let viewLink = info.view;
			if(viewLink && !viewLink.match(/^(ftp|https?):\/\//g)) {
				viewLink = downloadDir + "/" + info.download.name + "/" + viewLink;
			}

			let promise = Promise.resolve();
			if(info.download.binary) {
				promise = _zeroFS.writeFile(downloadDir + "/" + info.download.name, info.download.binary, true);
			}

			return promise
				.then(() => {
					if(info.picture) {
						let binary = info.picture.binary;

						info.picture = downloadDir + "/" + info.picture.name;

						if(binary) {
							return _zeroFS.writeFile(info.picture, binary, true);
						}
					}
				}).then(() => {
					info.viewLink = viewLink || null;
					info.downloadLink = downloadDir + "/" + info.download.name;

					delete info.view;
					delete info.download;

					return _zeroDB.changeRow(
						"data/admin/data.json",
						"data/content.json",
						page,
						post => {
							return post.id == id ? info : post;
						}
					);
				});
		}
	},
	like: (page, section, partition, id) => {
		let uniqueId = Posts.getUniqueId(page, section, partition, id);

		let dataFile;
		let likes;

		return _zeroAuth.requestAuth()
			.then(auth => {
				return _zeroDB.changePair(
					"data/users/" + auth.address + "/data.json",
					"data/users/" + auth.address + "/content.json",
					"post_like",
					uniqueId,
					Math.floor(Date.now() / 1000)
				);
			})
			.then(() => {
				return _zeroDB.query("SELECT COUNT(*) AS count FROM post_like WHERE unique_id = \"" + uniqueId + "\"");
			})
			.then(db => {
				return db[0].count;
			});
	},
	comment: (page, section, partition, id, content) => {
		let uniqueId = Posts.getUniqueId(page, section, partition, id);

		let auth;

		return _zeroAuth.requestAuth()
			.then(a => {
				auth = a;

				return _zeroDB.insertRow(
					"data/users/" + auth.address + "/data.json",
					"data/users/" + auth.address + "/content.json",
					"post_comment",
					{
						unique_id: uniqueId,
						content: content,
						date_added: Math.floor(Date.now() / 1000)
					},
					{
						column: "id",
						source: "next_comment_id"
					}
				);
			})
			.then(() => {
				return {
					content: content,
					author: auth.user
				};
			});
	},

	search: (type, content) => {
		return Posts.load()
			.then(posts => {
				return posts.filter(post => {
					return post[type] == content;
				});
			});
	},

	getUniqueId: (page, section, partition, id) => {
		return page + "_" + (section || "") + "_" + (partition || "") + "_" + id;
	}
}