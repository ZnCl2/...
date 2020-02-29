

/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/ZeroFS.js ---- */


class ZeroFS {
	constructor(page) {
		if(typeof page != "object" || !page instanceof ZeroPage) {
			throw new Error("page should be an instance of ZeroPage");
		}
		this.page = page;
	}

	fileExists(file) {
		if(file == "") { // root
			return Promise.resolve(true); // the following check will fail for root
		}

		let dirPath = file.split("/").slice(0, -1).join("/");
		let basePath = file.split("/").pop();

		return this.readDirectory(dirPath)
			.then(children => {
				return Promise.resolve(children.indexOf(basePath) > -1);
			});
	}
	readFile(file) {
		return this.page.cmd("fileGet", [
			file, // file
			false, // required (wait until file exists)
			"text", // text or base64
			300 // timeout
		]).then(res => {
			if(res === null || res === false) {
				return Promise.reject("File doesn't exist: " + file);
			} else {
				return Promise.resolve(res);
			}
		});
	}
	writeFile(file, content) {
		return this.page.cmd("fileWrite", [
			file, // file
			this.toBase64(content) // base64-encoded content
		]).then(res => {
			if(res === "ok") {
				return Promise.resolve(file);
			} else {
				return Promise.reject(res);
			}
		});
	}
	deleteFile(file) {
		return this.page.cmd("fileDelete", [
			file // file
		]).then(res => {
			if(res === "ok") {
				return Promise.resolve(file);
			} else {
				return Promise.reject(res);
			}
		});
	}

	readDirectory(dir, recursive) {
		return this.page.cmd("fileList", [
			dir, // directory
		]).then(res => {
			if(recursive) {
				return res.sort(); // If recursive, return as given
			} else {
				return res.map(file => { // Otherwise, crop by "/" symbol
					if(file.indexOf("/") == -1) {
						return file;
					} else {
						return file.substr(0, file.indexOf("/"));
					}
				}).reduce((arr, cur) => { // And make them unique
					return arr.indexOf(cur) > -1 ? arr : arr.concat(cur);
				}, []).sort();
			}
		});
	}

	getType(file) {
		if(file == "") {
			return Promise.resolve("dir");
		}

		let dir = file.split("/");
		let relative = dir.pop();
		dir = dir.join("/");

		return this.page.cmd("fileList", [
			dir, // directory
		]).then(res => {
			res = res.map(file => { // Crop by "/" symbol
				if(file.indexOf("/") == -1) {
					return file;
				} else {
					return file.substr(0, file.indexOf("/")) + "/";
				}
			});

			if(res.indexOf(relative) > -1) {
				return "file";
			} else if(res.indexOf(relative + "/") > -1) {
				return "dir";
			} else {
				return Promise.reject("File doesn't exist: " + file);
			}
		});
	}

	toBase64(str) {
		return btoa(unescape(encodeURIComponent(str)));
	}
	fromBase64(str) {
		return decodeURIComponent(escape(atob(str)));
	}
}


/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/ZeroFrame.js ---- */


const CMD_INNER_READY = 'innerReady'
const CMD_RESPONSE = 'response'
const CMD_WRAPPER_READY = 'wrapperReady'
const CMD_PING = 'ping'
const CMD_PONG = 'pong'
const CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
const CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

class ZeroFrame {
    constructor(url) {
        this.url = url
        this.waiting_cb = {}
        this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1")
        this.connect()
        this.next_message_id = 1
        this.init()
    }

    init() {
        return this
    }

    connect() {
        this.target = window.parent
        window.addEventListener('message', e => this.onMessage(e), false)
        this.cmd(CMD_INNER_READY)
    }

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === CMD_RESPONSE) {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            }
            else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === CMD_WRAPPER_READY) {
            this.cmd(CMD_INNER_READY)
        } else if (cmd === CMD_PING) {
            this.response(message.id, CMD_PONG)
        } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
            this.onOpenWebsocket()
        } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
            this.onCloseWebsocket()
        } else {
            this.onRequest(cmd, message)
        }
    }

    onRequest(cmd, message) {
        this.log("Unknown request", message)
    }

    response(to, result) {
        this.send({
            cmd: CMD_RESPONSE,
            to: to,
            result: result
        })
    }

    cmd(cmd, params={}, cb=null) {
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    send(message, cb=null) {
        message.wrapper_nonce = this.wrapper_nonce
        message.id = this.next_message_id
        this.next_message_id++
        this.target.postMessage(message, '*')
        if (cb) {
            this.waiting_cb[message.id] = cb
        }
    }

    log(...args) {
        console.log.apply(console, ['[ZeroFrame]'].concat(args))
    }

    onOpenWebsocket() {
        this.log('Websocket open')
    }

    onCloseWebsocket() {
        this.log('Websocket close')
    }
}




/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/ZeroOptional.js ---- */


class ZeroOptional {
	constructor(page) {
		if(typeof page != "object" || !page instanceof ZeroPage) {
			throw new Error("page should be an instance of ZeroPage");
		}
		this.page = page;
	}

	fileExists(file) {
		if(file == "") { // root
			return Promise.resolve(false);
		}

		let dirPath = file.split("/").slice(0, -1).join("/");
		let basePath = file.split("/").pop();

		return this.readDirectory(dirPath)
			.then(children => {
				return Promise.resolve(children.indexOf(basePath) > -1);
			});
	}
	readFile(file) {
		return this.page.cmd("fileGet", [
			file, // file
			true, // required (wait until file exists)
			"text", // text or base64
			5000 // timeout
		]).then(res => {
			if(res === null || res === false) {
				return Promise.reject("File doesn't exist: " + file);
			} else {
				return Promise.resolve(res);
			}
		});
	}
	writeFile(file, content) {
		return this.page.cmd("fileWrite", [
			file, // file
			this.toBase64(content) // base64-encoded content
		]).then(res => {
			if(res === "ok") {
				return Promise.resolve(file);
			} else {
				return Promise.reject(res);
			}
		});
	}
	deleteFile(file) {
		return this.page.cmd("optionalFileDelete", [
			file // file
		]).then(() => {
			return Promise.resolve(file);
		});
	}

	getFileList(directory, recursive) {
		return this.page.cmd("fileGet", ["content.json", true, "text", 300])
			.then(json => {
				let files = Object.keys(JSON.parse(json).files_optional || {});
				return ZeroPage.async.map(files, file => this.page.cmd("optionalFileInfo", [file]));
			})
			.then(files => {
				files = files
					.map(file => {
						if(file.inner_path.substr(0, directory.length + 1) == directory + "/") {
							file.inner_path = file.inner_path.substr(directory.length + 1);
							return file;
						} else if(directory == "") {
							return file;
						} else {
							return null;
						}
					})
					.filter(file => file);

				if(!recursive) {
					files = files
						.map(file => {
							let pos = file.inner_path.indexOf("/")
							file.type = pos == -1 ? "file" : "dir";
							if(pos != -1) {
								file.inner_path = file.inner_path.substr(0, pos);
							}
							return file;
						})
						.reduce((arr, cur) => {
							return arr.find(a => a.inner_path == cur.inner_path) ? arr : arr.concat(cur);
						}, [])
						.sort((a, b) => a.inner_path.localeCompare(b.inner_path));
				}

				return files
					.map(file => {
						return {
							path: file.inner_path,
							type: file.type,
							downloaded: !!file.is_downloaded,
							pinned: !!file.is_pinned
						};
					});
			});
	}
	readDirectory(dir, recursive) {
		return this.getFileList(dir, recursive)
			.then(files => files.map(file => file.path));
	}

	getType(file) {
		if(file == "") {
			return Promise.reject("File doesn't exist: " + file);
		}

		let dir = file.split("/");
		let relative = dir.pop();
		dir = dir.join("/");

		return this.getFileList(dir)
			.then(res => {
				let found = res.find(f => f.path == relative);
				if(!found) {
					return Promise.reject("File doesn't exist: " + file);
				}

				return found.type;
			});
	}
	isOptional(file) {
		if(file == "") {
			return Promise.resolve(false);
		}

		let dir = file.split("/");
		let relative = dir.pop();
		dir = dir.join("/");

		return this.getFileList(dir)
			.then(res => {
				return res.find(f => f.path == relative);
			});
	}
	isDownloaded(file) {
		if(file == "") {
			return Promise.resolve(false);
		}

		let dir = file.split("/");
		let relative = dir.pop();
		dir = dir.join("/");

		return this.getFileList(dir)
			.then(res => {
				let found = res.find(f => f.path == relative);
				return found && found.downloaded;
			});
	}
};


/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/ZeroOptionalProxy.js ---- */


class ZeroOptionalProxy {
	constructor(page) {
		if(typeof page != "object" || !page instanceof ZeroPage) {
			throw new Error("page should be an instance of ZeroPage");
		}
		this.page = page;

		this.fs = new ZeroFS(page);
		this.optional = new ZeroOptional(page);
	}

	fileExists(file) {
		return this.fs.fileExists(file)
			.then(exists => {
				if(exists) {
					return exists;
				}

				return this.optional.fileExists(file);
			});
	}
	readFile(file) {
		return this.fs.readFile(file)
			.catch(() => this.optional.readFile(file));
	}
	writeFile(file, content) {
		return this.fs.writeFile(file, content)
			.catch(() => this.optional.writeFile(file, content));
	}
	deleteFile(file) {
		return this.optional.deleteFile(file)
			.catch(() => {})
			.then(() => this.fs.deleteFile(file))
			.catch(() => {});
	}

	readDirectory(dir, recursive) {
		let fs, optional, err;

		return this.fs.readDirectory(dir, recursive)
			.then(content => fs = content)
			.catch(e => { fs = []; err = e })
			.then(() => this.optional.readDirectory(dir, recursive))
			.then(content => optional = content)
			.catch(e => {
				optional = [];

				if(err) {
					return Promise.reject(err);
				}
			})
			.then(() => {
				return [].concat(fs, optional)
					.filter((obj, i, arr) => arr.indexOf(obj) == i);
			});
	}

	getType(file) {
		return this.fs.getType(file)
			.catch(() => this.optional.getType(file));
	}
	isOptional(file) {
		return this.optional.isOptional(file);
	}
	isDownloaded(file) {
		return this.optional.isDownloaded(file);
	}
};


/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/ZeroPage.js ---- */


class ZeroPage {
	constructor(frame) {
		if(typeof frame != "object" || !frame instanceof ZeroFrame) {
			throw new Error("frame should be an instance of ZeroFrame");
		}
		this.frame = frame;
		this.progressId = 0;

		this.initEventListeners();
	}

	/********************************* Logging ********************************/
	logWith(type, args) {
		let msg = args.map(v => this.objectToString(v)).join("\n");

		this.cmd("wrapperNotification", [type, msg]);
	}
	log() {
		console.info.apply(console, Array.prototype.slice.call(arguments));
		this.logWith("info", Array.prototype.slice.call(arguments));
	}
	warn() {
		console.warn.apply(console, Array.prototype.slice.call(arguments));
		this.logWith("error", Array.prototype.slice.call(arguments));
	}
	error() {
		console.error.apply(console, Array.prototype.slice.call(arguments));
		this.logWith("error", Array.prototype.slice.call(arguments));
	}
	progress() {
		let id = "progress" + (this.progressId++);
		let msg;
		let percent = 0;
		let done = false;

		let obj = {
			setPercent: p => {
				if(done) return;

				percent = p;

				if(percent == 0) {
					this.cmd("wrapperProgress", [
						id, // ID
						msg, // message
						0.05 // percent
					]);
					this.cmd("wrapperProgress", [
						id, // ID
						msg, // message
						0 // percent
					]);
				} else {
					this.cmd("wrapperProgress", [
						id, // ID
						msg, // message
						percent // percent
					]);
				}
			},
			setMessage: (...args) => {
				if(done) return;

				msg = args.map(v => this.objectToString(v)).join("\n");

				this.cmd("wrapperProgress", [
					id, // ID
					msg, // message
					percent // percent
				]);
			},
			done: () => {
				if(done) return;
				
				obj.setPercent(100);
				done = true;
			}
		};

		obj.setMessage.apply(this, Array.prototype.slice.call(arguments));
		
		return obj;
	}
	prompt(msg, type) {
		msg = this.objectToString(msg);
		return this.cmd("wrapperPrompt", [msg, type || "text"]);
	}
	alert(msg) {
		msg = this.objectToString(msg);
		this.cmd("wrapperConfirm", [msg, "OK"]);
	}
	confirm(msg, ok) {
		return this.cmd("wrapperConfirm", [msg, ok || "OK"]);
	}

	/******************************** Commands ********************************/
	cmd(cmd, params) {
		return new Promise((resolve, reject) => {
			this.frame.cmd(cmd, params || [], res => {
				if(arguments.length) {
					resolve(res);
				} else {
					resolve();
				}
			});
		});
	}

	/****************************** EventEmmiter ******************************/
	initEventListeners() {
		this.eventListeners = {
			on: {},
			once: {}
		};

		this.frame.onRequest = (cmd, msg) => {
			this.emit(cmd, msg);
		};
	}
	on(cmd, callback) {
		if(!this.eventListeners.on.hasOwnProperty(cmd)) {
			this.eventListeners.on[cmd] = [];
		}

		this.eventListeners.on[cmd].push(callback);
	}
	off(cmd, callback) {
		if(this.eventListeners.on.hasOwnProperty(cmd)) {
			if(this.eventListeners.on[cmd].indexOf(callback) != -1) {
				this.eventListeners.on[cmd].splice(this.eventListeners.on[cmd].indexOf(callback), 1);
			}
		}
		if(this.eventListeners.once.hasOwnProperty(cmd)) {
			if(this.eventListeners.once[cmd].indexOf(callback) != -1) {
				this.eventListeners.once[cmd].splice(this.eventListeners.once[cmd].indexOf(callback), 1);
			}
		}
	}
	once(cmd, callback) {
		if(!this.eventListeners.once.hasOwnProperty(cmd)) {
			this.eventListeners.once[cmd] = [];
		}

		if(arguments.length <= 1) {
			return new Promise((resolve, reject) => {
				this.eventListeners.once[cmd].push((...args) => {
					resolve(...args);
				});
			});
		} else {
			this.eventListeners.once[cmd].push(callback);
		}
	}
	emit(cmd, arg) {
		if(this.eventListeners.on.hasOwnProperty(cmd)) {
			this.eventListeners.on[cmd].forEach(v => {
				if(arguments.length >= 2) {
					v(arg);
				} else {
					v();
				}
			});
		}
		if(this.eventListeners.once.hasOwnProperty(cmd)) {
			this.eventListeners.once[cmd].forEach(v => {
				if(arguments.length >= 2) {
					v(arg);
				} else {
					v();
				}
			});
			this.eventListeners.once[cmd] = [];
		}
	}

	/****************************** Site control ******************************/
	sign(file) {
		file = file || "content.json";

		return this.cmd(
			"siteSign",
			[
				"stored", // private key
				file // file to sign
			]
		).then(res => {
			if(res === "ok") {
				return Promise.resolve(file);
			} else {
				return Promise.reject(res);
			}
		});
	}
	publish(file) {
		file = file || "content.json";

		return this.cmd(
			"sitePublish",
			[
				"stored", // private key
				file, // file to sign
				true // sign before publish
			]
		).then(res => {
			if(res === "ok") {
				return Promise.resolve(file);
			} else {
				return Promise.reject(res);
			}
		});
	}
	getSiteInfo() {
		return this.cmd("siteInfo");
	}
	getUser() {
		return this.getSiteInfo()
			.then(res => res.auth_address);
	}

	/************************** Additional functions **************************/
	objectToString(v) {
		if(typeof v == "string") {
			return v;
		} else if(typeof v == "number") {
			return v.toString();
		} else if(typeof v == "undefined") {
			return "undefined";
		} else if(typeof v == "object") {
			if(v === null) {
				return "null";
			} else {
				let res;
				try {
					res = JSON.stringify(v, null, 4);
				} catch(e) {
					res = res.toString();
				}
				return res;
			}
		} else if(typeof v == "boolean") {
			return v ? "true" : "false";
		} else if(typeof v == "function") {
			return v.toString();
		} else {
			return "unknown";
		}
	}
	isFunctionCalledInside(search) { // Returns true if <search> function called function (that called isFunctionCalledInside)
		let caller = arguments.callee.caller;
		while(caller) {
			if(caller == selfFunc) {
				return true;
			}
			caller = caller.caller;
		}
		return false;
	}
};
ZeroPage.async = {
	setTimeout: time => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, time);
		});
	},
	filter: (arr, f) => {
		return Promise.all(
				arr.map((elem, i) => {
					let v = f(elem, i, arr);
					if(v instanceof Promise) {
						return v;
					} else {
						return Promise.resolve(v);
					}
				})
			).then(result => { // Use the result of promises to call sync filter()
				return arr.filter((element, index) => {
					return result[index];
				});
			});
	},
	map: (arr, f) => {
		return Promise.all(
				arr.map((elem, i) => {
					let v = f(elem, i, arr);
					if(v instanceof Promise) {
						return v;
					} else {
						return Promise.resolve(v);
					}
				})
			).then(result => { // Use the result of promises to call sync filter()
				return arr.map((element, index) => {
					return result[index];
				});
			});
	},
	forEach: (arr, f) => {
		return Promise.all(
				arr.map((elem, i) => {
					let v = f(elem, i, arr);
					if(v instanceof Promise) {
						return v;
					} else {
						return Promise.resolve(v);
					}
				})
			);
	}
};


/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/binary.js ---- */


function binaryToText(binary) {
	if(binary == "") {
		return "Empty file";
	}

	let segments = []
	for(let i = 0; i < binary.length; i += 16) {
		segments.push(binary.substr(i, 16));
	}

	console.log(segments);

	return segments
		.map((segment, pos) => {
			let posString = (pos * 16).toString(16);
			posString = "0".repeat(8 - posString.length) + posString;

			let binChars = segment
				.split("")
				.map(char => {
					let str = char.charCodeAt(0).toString(16);
					str = "0".repeat(2 - str.length) + str;

					return str;
				})
				.join(" ");
			binChars += " ".repeat(3 * 16 - 1 - binChars.length);

			let chars = segment
				.split("")
				.map(char => {
					if(char.charCodeAt(0) >= 32) {
						return char == "<" ? "&lt;" :
						       char == ">" ? "&gt;" :
						       char == "&" ? "&amp;" :
						       char;
					} else {
						return ".";
					}
				})
				.join("");

			return "<span class='binary-pos'>" + posString + "</span> <span class='binary-binchars'>" + binChars + "</span> <span class='binary-chars'>" + chars + "</span>";
		})
		.join("<br>");
}


/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/files.js ---- */


class Files {
	constructor(fs) {
		this.fs = fs;
		this.shownPathDelim = " " + String.fromCharCode(8250) + " "; /* right arrow */
		this.root = "files";
		this.showRoot = "Root";

		this.types = {
			image: [
				"jpg", // JPEG
				"jpeg",
				"jp2", // JPEG 200
				"jpx",
				"tiff", // Tiff
				"gif", // GIF
				"bmp", // BMP
				"png", // PNG
				"webp", // WebP
				"bpg", // Better Portable Graphics
				"svg" // SVG
			],
			music: [
				"3gp", // 3GP
				"aiff", // AIFF
				"au", // Au
				"flac", // Flac
				"gsm", // GSM
				"m4a", // M4A
				"mp3", // MP3
				"ogg", // Ogg
				"oga",
				"mogg",
				"vox", // vox
				"wav", // WAV
				"wma" // WMA
			],
			video: [
				"mkv", // MKV
				"ogv", // Ogg
				"avi", // AVI
				"mov", // MOV
				"wmv", // WMV
				"mp4", // MP4
				"mpg", // MPEG
				"mpeg",
				"m4v" // M4V
			],
			text: [
				"text", // TXT
				"txt",
				"readme"
			]
		};
	}

	guessType(file) {
		return this.fs.getType(file)
			.then(type => {
				if(type == "dir") {
					return "dir";
				}

				let filename = file.split("/").slice(-1)[0].split(".");

				let ext;
				if(filename.length == 1) {
					ext = "";
				} else {
					ext = filename[filename.length - 1].toLowerCase();
				}

				return Object.keys(this.types).find(type => this.types[type].indexOf(ext) > -1) || "file";
			});
	}
	getFiles(path) {
		path = this.getAbsolutePath(path);

		return this.fs.readDirectory(path)
			.then(files => {
				files = files.filter(file => {
					return file[0] != ".";
				});

				return ZeroPage.async.map(files, file => {
					return Promise.all([
						this.guessType((path ? path + "/" : "") + file),
						this.fs.isOptional((path ? path + "/" : "") + file),
						this.fs.isDownloaded((path ? path + "/" : "") + file)
					])
						.then(([type, optional, downloaded]) => {
							return {
								type: type,
								name: file,
								optional: optional,
								downloaded: downloaded
							};
						});
				});
			});
	}

	getAbsolutePath(path) {
		if(!this.root) {
			return path;
		}

		if(path) {
			return this.root + "/" + path;
		} else {
			return this.root;
		}
	}

	load(path) {
		let pathNode = document.getElementById("path");
		pathNode.innerHTML = "";
		let pathSplit = path ? path.split("/") : [];

		if(this.showRoot) {
			let fileNode;
			if(path) {
				fileNode = document.createElement("a");
				fileNode.href = "#/";
			} else {
				fileNode = document.createElement("span");
			}
			fileNode.textContent = this.showRoot;
			pathNode.appendChild(fileNode);
		}

		pathSplit.forEach((file, i) => {
			if(i > 0 || this.showRoot) {
				let delim = document.createElement("span");
				delim.innerHTML = this.shownPathDelim;
				pathNode.appendChild(delim);
			}

			let fileNode;
			if(i < pathSplit.length - 1) {
				fileNode = document.createElement("a");
				fileNode.href = "#/" + btoa(pathSplit.slice(0, i + 1).join("/"));
			} else {
				fileNode = document.createElement("span");
			}
			fileNode.textContent = file;
			pathNode.appendChild(fileNode);
		});

		return this.fs.getType(this.getAbsolutePath(path))
			.then(type => {
				if(type == "dir") {
					return this.loadDirectory(path);
				} else {
					return this.loadFile(path);
				}
			});
	}
	loadDirectory(path) {
		let filesNode = document.getElementById("files");
		filesNode.innerHTML = "";

		let loaded = false;
		let errorNode = null;
		setTimeout(() => {
			if(!loaded) {
				errorNode = this.showFileError(filesNode, "Loading...");
			}
		}, 500);

		return this.getFiles(path)
			.then(files => {
				loaded = true;
				if(errorNode) {
					errorNode.style.display = "none";
				}

				filesNode.innerHTML = "";

				files.forEach(file => {
					let fileNode = document.createElement("a");
					fileNode.className = "file" + (file.type == "dir" ? " file-dir" : "");
					fileNode.href = "#/" + btoa((path ? path + "/" : "") + file.name);

					if(file.optional && file.type != "dir") {
						let fileDownload = document.createElement("div");
						fileDownload.className = (file.downloaded ? "file-delete" : "file-download");
						fileDownload.title = (file.downloaded
							? "This file is marked as optional and was downloaded"
							: "This file is marked as optional and wasn't downloaded yet"
						);
						if(file.downloaded) {
							let clickFunc = e => {
								fileDownload.onclick = e => {
									e.preventDefault();
									e.stopPropagation();
								};
								fileDownload.classList.add("file-delete-inactive");

								this.fs.deleteFile(this.getAbsolutePath((path ? path + "/" : "") + file.name))
									.then(() => {
										fileDownload.title = "This file is marked as optional and wasn't downloaded yet";
										fileDownload.classList.remove("file-delete-inactive");
										fileDownload.classList.remove("file-delete");
										fileDownload.classList.add("file-download");
										fileDownload.onclick = e => {
											e.preventDefault();
											e.stopPropagation();
										};
									}, () => {
										fileDownload.onclick = clickFunc;
										fileDownload.classList.remove("file-delete-inactive");
									});

								e.preventDefault();
								e.stopPropagation();
							};
							fileDownload.onclick = clickFunc;
						} else {
							fileDownload.onclick = e => {
								e.preventDefault();
								e.stopPropagation();
							};
						}
						fileNode.appendChild(fileDownload);
					}

					let fileIconContainer = document.createElement("div");
					fileIconContainer.className = "file-icon-container";
					let fileIcon = document.createElement("img");
					fileIcon.className = "file-icon";
					fileIcon.src = "img/file/" + file.type + ".png";
					fileIconContainer.appendChild(fileIcon);
					fileNode.appendChild(fileIconContainer);

					let link = document.createElement("span");
					link.className = "file-name";
					link.textContent = file.name;
					fileNode.appendChild(link);

					filesNode.appendChild(fileNode);
				});
			});
	}
	loadFile(path) {
		let absolute = this.getAbsolutePath(path);

		let filesNode = document.getElementById("files");
		filesNode.innerHTML = "";

		return this.guessType(absolute)
			.then(type => {
				let contentNode = document.createElement("div");
				contentNode.className = "file-content";

				if(type == "image") {
					let image = document.createElement("img");
					image.className = "file-content-image";
					image.src = encodeURI(absolute);
					image.onerror = () => {
						image.onerror = null;
						image.style.display = "none";

						this.showFileError(contentNode, "File was removed or corrupted");
					};
					contentNode.appendChild(image);
				} else if(type == "text") {
					let loaded = false;

					let node = null;
					setTimeout(() => {
						if(!loaded) {
							node = this.showFileError(contentNode, "Loading...");
						}
					}, 500);

					this.fs.readFile(absolute)
						.then(content => {
							loaded = true;
							if(node) {
								node.style.display = "none";
							}

							let text = document.createElement("div");
							text.className = "file-content-text";
							text.textContent = content;
							contentNode.appendChild(text);
						});
				} else if(type == "video") {
					let video = document.createElement("video");
					video.className = "file-content-video";
					video.src = encodeURI(absolute);
					video.controls = true;
					video.onerror = () => {
						video.onerror = null;
						video.style.display = "none";

						this.showFileError(contentNode, "File was removed or corrupted");
					};
					contentNode.appendChild(video);
				} else if(type == "music") {
					let music = document.createElement("audio");
					music.className = "file-content-music";
					music.src = encodeURI(absolute);
					music.controls = true;
					music.onerror = () => {
						music.onerror = null;
						music.style.display = "none";

						this.showFileError(contentNode, "File was removed or corrupted");
					};
					contentNode.appendChild(music);
				} else if(type == "file") {
					let loaded = false;

					let node = null;
					setTimeout(() => {
						if(!loaded) {
							node = this.showFileError(contentNode, "Loading...");
						}
					}, 500);

					this.fs.readFile(absolute)
						.then(content => {
							loaded = true;
							if(node) {
								node.style.display = "none";
							}

							let text = document.createElement("div");
							text.className = "file-content-text";
							text.innerHTML = binaryToText(content);
							contentNode.appendChild(text);
						});
				}

				filesNode.appendChild(contentNode);
			});
	}
	showFileError(contentNode, html) {
		let text = document.createElement("div");
		text.className = "file-content-error";
		text.innerHTML = html;
		contentNode.appendChild(text);
		return text;
	}
};


/* ---- /1KgAQscdGPvWqL8uMPkTrHnA5mZE6TR51S/js/main.js ---- */


window.addEventListener("load", () => {
	window.zeroFrame = new ZeroFrame();
	window.zeroPage = new ZeroPage(zeroFrame);
	window.zeroOptionalProxy = new ZeroOptionalProxy(zeroPage);
	window.files = new Files(zeroOptionalProxy);

	zeroPage.cmd("wrapperInnerLoaded");
	setTimeout(() => {
		if(location.hash.substr(0, 2) != "#/") {
			files.load("");
		}
	}, 0);
});

window.addEventListener("hashchange", () => {
	if(location.hash.indexOf("#/") == 0) {
		let path = atob(location.hash.replace(/^#\//, ""));
		files.load(path);
	}
});