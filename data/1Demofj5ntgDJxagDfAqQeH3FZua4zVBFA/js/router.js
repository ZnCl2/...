class Router {
	constructor(page) {
		this.handlers = [];
		this.page = page;

		window.addEventListener("load", () => this.hashChange());
	}

	on(pattern, handler) {
		// pattern is:
		//     /demo/:section/?*/?:demo/![12345]:group/?![01]:group/*
		//      ^      ^      ^  ^           ^         ^            ^
		//      |      |      |  |           |         |            \ any
		//      |      |      |  |           |         \ optional regexp
		//      |      |      |  |           \ regexp
		//      |      |      |  \ optional match name
		//      |      |      \ any or empty
		//      |      \ match name
		//      \ literal

		this.handlers.push({
			pattern: pattern,
			handler: handler
		});
	}
	emitMismatch() {
		let hash = this.getHash();

		this.handlers.filter(h => h.pattern == "::mismatch").forEach(h => h.handler(hash));
	}

	hashChange() {
		let hash = this.getHash();

		let matched = false;
		this.handlers.forEach(h => {
			if(h.pattern == "::mismatch") {
				return;
			}

			let match = this.matches(h.pattern, hash);
			if(match) {
				let result = h.handler.apply(null, match);
				matched = matched || result !== false;
			}
		});

		if(!matched) {
			this.emitMismatch();
		}
	}

	matches(pattern, address) {
		pattern = pattern.split("/");
		if(pattern[0] == "") {
			pattern.shift();
		}
		if(pattern[pattern.length - 1] == "") {
			pattern.pop();
		}

		if(pattern.length == 1 && pattern[0] == "::") { // /::
			return true;
		}

		pattern = pattern.map(part => {
			if(part == "*") { // any
				return "/(.*)";
			} else if(part == "?*") { // any or empty
				return "(?:/(.*)|)";
			} else if(part[0] == ":") { // match name
				return "/([^/]+)";
			} else if(part[0] == "?" && part[1] == ":") { // optional match name
				return "(?:/([^/]+)|)";
			} else if(part[0] == "!" && part.indexOf(":") > -1) { // regexp
				return "/(" + part.match(/^!(.*):/)[1] + ")";
			} else if(part[0] == "?" && part[1] == "!" && part.indexOf(":") > -1) { // optional regexp
				return "(/" + part.match(/^\?!(.*):/)[1] + "|)";
			} else { // literal
				return "/" + part.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
			}
		});

		pattern = "^" + pattern.join("") + "$";

		if(address[0] != "/") {
			address = "/" + address;
		}
		if(address[address.length - 1] == "/") {
			address = address.substr(0, address.length - 1);
		}

		let match = address.match(pattern);
		if(match) {
			return match.slice(1);
		} else {
			return null;
		}
	}

	getHash() {
		return location.search.replace(/[?&]wrapper_nonce=[\d\w]+/, "").replace(/^[?&]/, "");
	}
	is(pattern) {
		return this.matches(pattern, this.getHash());
	}
};