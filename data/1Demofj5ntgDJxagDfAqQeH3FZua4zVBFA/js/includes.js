class Includes {
	constructor(container, page) {
		if(typeof container != "object" || !container instanceof HTMLElement) {
			throw new TypeError("container should be an instance of HTMLElement");
		}
		if(typeof page != "object" || !page instanceof ZeroPage) {
			throw new TypeError("page should be an instance of ZeroPage");
		}

		this.container = container;
		this.page = page;
		this.fs = new ZeroFS(page);

		this.sections = {};
		this.cache = {};

		this.handlers = [];
	}

	on(e, f) {
		this.handlers.push({
			e: e,
			f: f
		});
	}
	emit(e) {
		let args = Array.prototype.slice.call(arguments, 1);
		this.handlers.filter(h => h.e == e).forEach(h => h.f.apply(null, args));
	}

	register(section, file) {
		this.sections[section] = file;
		this.cache[file] = undefined;

		this.loadFile(file).catch(e => {
			this.page.warn(e);
		});
	}

	load(section, args) {
		return this.loadTo(this.container, section, args);
	}
	loadTo(container, section, args) {
		if(!this.sections[section]) {
			return Promise.reject("No '" + section + "' section");
		}

		let links = container.querySelectorAll("link[rel=stylesheet]");
		Array.prototype.slice.call(links).forEach(link => {
			link.disabled = true;
		});

		this.emit("change", section);

		return this.loadFile(this.sections[section])
			.catch(() => {
				return Promise.reject("/" + this.sections[section]);
			}).then(html => {
				html =
					this.handlers
						.filter(h => h.e == "preInsert")
						.reduce((html, h) => h.f(section, html, args || {}), html);

				return this.loadHtml(container, html, args);
			}).then(() => {
				this.emit("loaded", section);
			}).catch(container => {
				if(container instanceof HTMLElement) {
					container.innerHTML = "";

					let badFile;

					let href = container.href || container.src;
					if(href) {
						badFile = "/" + href.substr(href.indexOf(location.pathname) + location.pathname.length);
					} else {
						href = container.getAttribute("src") || "";
						badFile = "/" + href;
					};

					this.emit("notFound", badFile);
				} else {
					console.error(container);
				}
			});
	}
	loadHtml(container, html, args) {
		args = args || {};

		let fakeNode = document.createElement("div");
		fakeNode.innerHTML = html.replace(/\{\{(.*?)\}\}/g, (all, name) => "{{" + btoa(name) + "}}");

		// Remove comments
		let iterator = document.createNodeIterator(fakeNode, NodeFilter.SHOW_COMMENT, () => NodeFilter.FILTER_ACCEPT, false);
		let curNode;
		while(curNode = iterator.nextNode()) {
			curNode.parentNode.removeChild(curNode);
		}

		// Handle <for>
		let fors = fakeNode.querySelectorAll("for");
		Array.prototype.slice.call(fors).filter(forNode => {
			let parent = forNode;
			while(parent.parentNode != fakeNode) {
				parent = parent.parentNode;
				if(parent.tagName == "FOR" || parent.tagName == "IF") {
					return false; // Don't handle nested <for>
				}
			}
			return true;
		}).forEach(forNode => {
			forNode.setAttribute("code", btoa(forNode.innerHTML.replace(/\{\{(.*?)\}\}/g, (all, name) => "{{" + atob(name) + "}}")));
			forNode.innerHTML = "";
		});

		// Handle <if>
		let ifs = fakeNode.querySelectorAll("if");
		Array.prototype.slice.call(ifs).filter(ifNode => {
			let parent = ifNode;
			while(parent.parentNode != fakeNode) {
				parent = parent.parentNode;
				if(parent.tagName == "FOR" || parent.tagName == "IF") {
					return false; // Don't handle nested <if>
				}
			}
			return true;
		}).forEach(ifNode => {
			ifNode.setAttribute("code", btoa(ifNode.innerHTML.replace(/\{\{(.*?)\}\}/g, (all, name) => "{{" + atob(name) + "}}")));
			ifNode.innerHTML = "";

			ifNode.setAttribute("condition", btoa(ifNode.getAttribute("condition").replace(/\{\{(.*?)\}\}/g, (all, name) => "{{" + atob(name) + "}}")));
		});

		// Handle <include>
		let includes = fakeNode.querySelectorAll("include");
		Array.prototype.slice.call(includes).forEach(include => {
			Array.prototype.slice.call(include.attributes).forEach(attr => {
				if(attr.name.substr(0, 5) == "pass-" || attr.name == "pass") {
					attr.value = btoa(attr.value.replace(/\{\{(.*?)\}\}/g, (all, name) => "{{" + atob(name) + "}}"));
				}
			});
		});

		container.innerHTML = fakeNode.innerHTML.replace(/\{\{(.*?)\}\}/g, (all, name) => {
			name = atob(name).replace(/&(.*?);/g, (all, tag) => {
				let node = document.createElement("div");
				node.innerHTML = "&" + tag + ";";
				return node.textContent || node.innerText;
			});

			return this.getVariable(name, args);
		});

		// Handle <if>
		ifs = container.querySelectorAll("if");
		return Promise.all(Array.prototype.slice.call(ifs).map(ifNode => {
			ifNode.innerHTML = atob(ifNode.getAttribute("code")).replace(/{{(.*?)}}/g, (all, name) => "{{" + btoa(name) + "}}");

			let thenCode = ifNode.querySelector("then");
			if(thenCode) {
				thenCode = thenCode.innerHTML;
			} else {
				thenCode = "";
			}

			let elseCode = ifNode.querySelector("else");
			if(elseCode) {
				elseCode = elseCode.innerHTML;
			} else {
				elseCode = "";
			}

			let catchCode = ifNode.querySelector("catch");
			if(catchCode) {
				catchCode = catchCode.innerHTML;
			} else {
				catchCode = "";
			}

			let condition = atob(ifNode.getAttribute("condition"));

			try {
				condition = this.getVariable(condition, args);

				if(!(condition instanceof Promise)) {
					condition = Promise.resolve(condition);
				}
			} catch(e) {
				condition = Promise.reject(e);
			}

			ifNode.style.display = "none";

			return condition
				.then(condition => {
					return condition ? thenCode : elseCode;
				}, () => {
					return catchCode;
				}).then(code => {
					code = code.replace(/{{(.*?)}}/g, (all, name) => "{{" + atob(name) + "}}");

					return this.loadHtml(ifNode, code, args)
						.then(() => {
							let fragment = document.createDocumentFragment();
							while(ifNode.childNodes.length) {
								fragment.appendChild(ifNode.childNodes[0]);
							}
							ifNode.parentNode.replaceChild(fragment, ifNode);
						});
				});
		})).then(() => {
			// Handle <for>
			let fors = container.querySelectorAll("for");
			return Promise.all(Array.prototype.slice.call(fors).filter(forNode => {
				let parent = forNode;
				while(parent.parentNode != container) {
					parent = parent.parentNode;
					if(parent.tagName == "for") {
						return false; // Don't handle nested <for>
					}
				}
				return true;
			}).map(forNode => {
				let code = atob(forNode.getAttribute("code"));

				let each = this.getAttribute("each", forNode, container);
				if(each) { // <for each="..." as="...">
					let as = this.getAttribute("as", forNode, container);

					try {
						each = this.getVariable(each, args);
					} catch(e) {
						return Promise.reject(e);
					}

					if(!(each instanceof Promise)) {
						each = Promise.resolve(each);
					}

					return each.then(each => {
						if(!(each instanceof Array)) {
							each = Object.keys(each).map(key => {
								return {
									key: key,
									value: each[key]
								};
							});
						}

						return Promise.all(each.map(obj => {
							let entry = document.createElement("entry");
							forNode.appendChild(entry);

							let entryArgs = Object.assign({}, args);
							entryArgs[as] = obj;

							return this.loadHtml(entry, code, entryArgs)
								.then(() => {
									while(entry.childNodes.length) {
										forNode.insertBefore(entry.childNodes[0], entry);
									}
									forNode.removeChild(entry);
								});
						}));
					}).then(() => {
						let fragment = document.createDocumentFragment();
						while(forNode.childNodes.length) {
							fragment.appendChild(forNode.childNodes[0]);
						}
						forNode.parentNode.replaceChild(fragment, forNode);
					});
				}
			}));
		}).then(() => {
			// Handle <include>
			let includes = container.querySelectorAll("include");
			return Promise.all(Array.prototype.slice.call(includes).map(include => {
				let promise;
				if(this.emptyAllowed(include)) {
					promise = this.loadFile(include.getAttribute("src"))
						.catch(err => this.getAttribute("allow-empty", include, container));
				} else {
					promise = this.loadFile(include.getAttribute("src"))
						.catch(() => {
							return Promise.reject(include);
						});
				}

				return promise.then(content => {
					let nestedArgs = {};
					Array.prototype.slice.call(include.attributes).filter(attr => {
						return attr.name.substr(0, 5) == "pass-" || attr.name == "pass";
					}).map(attr => {
						return {
							name: attr.name.substr(5),
							value: atob(attr.value)
						};
					}).map(attr => {
						let value = this.attributeToValue(attr, container);

						let valueVar = value.match(/^\{\{([^\}]*?)\}\}$/);
						if(valueVar) {
							if(valueVar[1] == "*") {
								value = Object.assign({}, args);
							} else {
								value = this.getVariable(valueVar[1], args);
							}
						} else {
							value = value.replace(/\{\{(.*?)\}\}/g, (all, name) => this.getVariable(name, args));
						}

						if(attr.name == "") {
							nestedArgs = Object.assign(nestedArgs, value);
						} else {
							nestedArgs[attr.name] = value;
						}
					});

					return this.loadHtml(include, content, nestedArgs);
				}).then(() => {
					while(include.childNodes.length) {
						include.parentNode.insertBefore(include.childNodes[0], include);
					}
					include.parentNode.removeChild(include);

					return include;
				});
			}));
		}).then(() => {
			// Inserted scripts don't execute, so we recreate them
			let scripts = container.querySelectorAll("script");
			Array.prototype.slice.call(scripts).forEach(script => {
				if([
					"text/javascript",
					"application/x-javascript",
					"application/javascript",
					"text/ecmascript",
					"application/ecmascript",
					"text/jscript",
					""
				].indexOf(script.type.toLowerCase()) == -1) {
					return;
				}

				let src = script.getAttribute("src");

				script.parentNode.removeChild(script);

				if(src) {
					this.loadFile(src).then(code => Includes.eval(code, args));
				} else {
					let code = script.text || script.textContent || script.innerHTML || "";

					Includes.eval(code, args);
				}
			});
		});
	}

	loadFile(file) {
		if(this.cache[file] !== undefined) {
			// Make cache async
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(this.cache[file]);
				}, 0);
			});
		}

		return this.fs.readFile(file)
			.then(content => {
				this.cache[file] = content;

				return content;
			});
	}

	static eval(code, args) {
		try {
			return eval(code); //# sourceURL=Includes::eval()
		} catch(e) {
			return e;
		}
	}

	emptyAllowed(tag) {
		return (
			tag.hasAttribute("allow-empty") &&
			tag.getAttribute("allow-empty") != "false" &&
			tag.getAttribute("allow-empty") != "no" &&
			tag.getAttribute("allow-empty") != "0"
		);
	}
	attributeToValue(attr, container) {
		if(attr.name[0] == "&") {
			let tag = container.querySelector(attr.value);
			return tag ? tag.innerHTML : "";
		} else {
			return attr.value;
		}
	}
	getAttribute(name, node, container, prefix) {
		prefix = prefix || "";

		let attr = Array.prototype.slice.call(node.attributes).find(attr => {
			return attr.name == prefix +       name ||
			       attr.name == prefix + "&" + name;
		});

		if(!attr) {
			return "";
		}

		return this.attributeToValue({
			name: attr.name.substr(prefix.length),
			value: attr.value
		}, container);
	}

	getVariable(/* name, args, returnValue */) {
		try {
			return eval(
				Object.keys(arguments[1]).map(key => {
					return "let " + key + " = " + JSON.stringify(arguments[1][key]) + ";";
				}).join("\n") +
				arguments[0] +
				(arguments[2]
					? "\n; (" + arguments[2] + ");"
					: ""
				)
			);
		} catch(e) {
			e.message = "{{" + arguments[0] + "}} called with " + JSON.stringify(arguments[1]) + ": " + e.message;
			console.error(e);
			return "";
		}
	}
};