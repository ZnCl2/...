/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Class {
	static initClass() {
		this.prototype.trace = true;
	}

	log(...args) {
		if (!this.trace) { return; }
		if (typeof console === 'undefined') { return; }
		args.unshift(`[${this.constructor.name}]`);
		console.log(...Array.from(args || []));
		return this;
	}

	logStart(name, ...args) {
		if (!this.trace) { return; }
		if (!this.logtimers) { this.logtimers = {}; }
		this.logtimers[name] = +(new Date);
		if (args.length > 0) { this.log(`${name}`, ...Array.from(args), '(started)'); }
		return this;
	}

	logEnd(name, ...args) {
		const ms = +(new Date)-this.logtimers[name];
		this.log(`${name}`, ...Array.from(args), `(Done in ${ms}ms)`);
		return this;
	}
}
Class.initClass();

window.Class = Class;

/* eslint-disable
		no-undef,
		no-var,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// From: http://dev.bizo.com/2011/12/promises-in-javascriptcoffeescript.html

class Promise {
	static when(...tasks) {
		let num_uncompleted = tasks.length;
		const args = new Array(num_uncompleted);
		const promise = new Promise();

		for (let task_id = 0; task_id < tasks.length; task_id++) {
			var task = tasks[task_id];
			(task_id =>
				task.then(function() {
					args[task_id] = Array.prototype.slice.call(arguments);
					num_uncompleted--;
					if (num_uncompleted === 0) { return promise.complete.apply(promise, args); }
				})
			)(task_id);
		}

		return promise;
	}

	constructor() {
		this.resolved = false;
		this.end_promise = null;
		this.result = null;
		this.callbacks = [];
	}

	resolve() {
		let back;
		if (this.resolved) {
			return false;
		}
		this.resolved = true;
		this.data = arguments;
		if (!arguments.length) {
			this.data = [true];
		}
		this.result = this.data[0];
		for (let callback of Array.from(this.callbacks)) {
			back = callback.apply(callback, this.data);
		}
		if (this.end_promise) {
			return this.end_promise.resolve(back);
		}
	}

	fail() {
		return this.resolve(false);
	}

	then(callback) {
		if (this.resolved === true) {
			callback.apply(callback, this.data);
			return;
		}

		this.callbacks.push(callback);

		return this.end_promise = new Promise();
	}
}

window.Promise = Promise;

/*
s = Date.now()
log = (text) ->
	console.log Date.now()-s, Array.prototype.slice.call(arguments).join(", ")

log "Started"

cmd = (query) ->
	p = new Promise()
	setTimeout ( ->
		p.resolve query+" Result"
	), 100
	return p

back = cmd("SELECT * FROM message").then (res) ->
	log res
	return "Return from query"
.then (res) ->
	log "Back then", res

log "Query started", back
*/
// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Function.prototype.property = function(prop, desc) {
	return Object.defineProperty(this.prototype, prop, desc);
};
/* eslint-disable
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Animation {
	slideDown(elem, props) {
		const h = elem.offsetHeight;
		const cstyle = window.getComputedStyle(elem);
		const margin_top = cstyle.marginTop;
		const margin_bottom = cstyle.marginBottom;
		const padding_top = cstyle.paddingTop;
		const padding_bottom = cstyle.paddingBottom;
		const { transition } = cstyle;

		elem.style.boxSizing = 'border-box';
		elem.style.overflow = 'hidden';
		elem.style.transform = 'scale(0.6)';
		elem.style.opacity = '0';
		elem.style.height = '0px';
		elem.style.marginTop = '0px';
		elem.style.marginBottom = '0px';
		elem.style.paddingTop = '0px';
		elem.style.paddingBottom = '0px';
		elem.style.transition = 'none';

		setTimeout((function() {
			elem.className += ' animate-inout';
			elem.style.height = h+'px';
			elem.style.transform = 'scale(1)';
			elem.style.opacity = '1';
			elem.style.marginTop = margin_top;
			elem.style.marginBottom = margin_bottom;
			elem.style.paddingTop = padding_top;
			return elem.style.paddingBottom = padding_bottom;
		}), 1);

		return elem.addEventListener('transitionend', function() {
			elem.classList.remove('animate-inout');
			elem.style.transition = (elem.style.transform = (elem.style.opacity = (elem.style.height = null)));
			elem.style.boxSizing = (elem.style.marginTop = (elem.style.marginBottom = null));
			elem.style.paddingTop = (elem.style.paddingBottom = (elem.style.overflow = null));
			return elem.removeEventListener('transitionend', arguments.callee, false);
		});
	}


	slideUp(elem, remove_func, props) {
		elem.className += ' animate-back';
		elem.style.boxSizing = 'border-box';
		elem.style.height = elem.offsetHeight+'px';
		elem.style.overflow = 'hidden';
		elem.style.transform = 'scale(1)';
		elem.style.opacity = '1';
		elem.style.pointerEvents = 'none';
		setTimeout((function() {
			elem.style.height = '0px';
			elem.style.marginTop = '0px';
			elem.style.marginBottom = '0px';
			elem.style.paddingTop = '0px';
			elem.style.paddingBottom = '0px';
			elem.style.transform = 'scale(0.8)';
			elem.style.borderTopWidth = '0px';
			elem.style.borderBottomWidth = '0px';
			return elem.style.opacity = '0';
		}), 1);
		return elem.addEventListener('transitionend', function(e) {
			if ((e.propertyName === 'opacity') || (e.elapsedTime >= 0.6)) {
				elem.removeEventListener('transitionend', arguments.callee, false);
				return remove_func();
			}
		});
	}


	slideUpInout(elem, remove_func, props) {
		elem.className += ' animate-inout';
		elem.style.boxSizing = 'border-box';
		elem.style.height = elem.offsetHeight+'px';
		elem.style.overflow = 'hidden';
		elem.style.transform = 'scale(1)';
		elem.style.opacity = '1';
		elem.style.pointerEvents = 'none';
		setTimeout((function() {
			elem.style.height = '0px';
			elem.style.marginTop = '0px';
			elem.style.marginBottom = '0px';
			elem.style.paddingTop = '0px';
			elem.style.paddingBottom = '0px';
			elem.style.transform = 'scale(0.8)';
			elem.style.borderTopWidth = '0px';
			elem.style.borderBottomWidth = '0px';
			return elem.style.opacity = '0';
		}), 1);
		return elem.addEventListener('transitionend', function(e) {
			if ((e.propertyName === 'opacity') || (e.elapsedTime >= 0.6)) {
				elem.removeEventListener('transitionend', arguments.callee, false);
				return remove_func();
			}
		});
	}


	showRight(elem, props) {
		elem.className += ' animate';
		elem.style.opacity = 0;
		elem.style.transform = 'TranslateX(-20px) Scale(1.01)';
		setTimeout((function() {
			elem.style.opacity = 1;
			return elem.style.transform = 'TranslateX(0px) Scale(1)';
		}), 1);
		return elem.addEventListener('transitionend', function() {
			elem.classList.remove('animate');
			return elem.style.transform = (elem.style.opacity = null);
		});
	}


	show(elem, props) {
		const delay = (__guard__(arguments[arguments.length-2], x => x.delay)*1000) || 1;
		elem.className += ' animate';
		elem.style.opacity = 0;
		setTimeout((() => elem.style.opacity = 1), delay);
		return elem.addEventListener('transitionend', function() {
			elem.classList.remove('animate');
			return elem.style.opacity = null;
		});
	}

	hide(elem, remove_func, props) {
		const delay = (__guard__(arguments[arguments.length-2], x => x.delay)*1000) || 1;
		elem.className += ' animate';
		setTimeout((() => elem.style.opacity = 0), delay);
		return elem.addEventListener('transitionend', function(e) {
			if (e.propertyName === 'opacity') {
				return remove_func();
			}
		});
	}

	addVisibleClass(elem, props) {
		return setTimeout(() => elem.classList.add('visible'));
	}
}


window.Animation = new Animation();
function __guard__(value, transform) {
	return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
window.$ = function(selector) {
	if (selector.startsWith('#')) {
		return document.getElementById(selector.replace('#', ''));
	}
};
/* eslint-disable
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ItemList {
	constructor(item_class, key) {
		this.item_class = item_class;
		this.key = key;
		this.items = [];
		this.items_bykey = {};
	}

	sync(rows, item_class, key) {
		this.items.splice(0, this.items.length);	// Empty items
		return (() => {
			const result = [];
			for (let row of Array.from(rows)) {
				const current_obj = this.items_bykey[row[this.key]];
				if (current_obj) {
					current_obj.row = row;
					result.push(this.items.push(current_obj));
				} else {
					const item = new this.item_class(row, this);
					this.items_bykey[row[this.key]] = item;
					result.push(this.items.push(item));
				}
			}
			return result;
		})();
	}

	deleteItem(item) {
		const index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1);
		} else {
			console.log("Can't delete item", item);
		}
		return delete this.items_bykey[item.row[this.key]];
	}
}

window.ItemList = ItemList;
/* eslint-disable
		max-len,
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Menu {
	constructor() {
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.toggle = this.toggle.bind(this);
		this.storeNode = this.storeNode.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.render = this.render.bind(this);
		this.visible = false;
		this.items = [];
		this.node = null;
	}

	show() {
		if (window.visible_menu != null) {
			window.visible_menu.hide();
		}
		this.visible = true;
		return window.visible_menu = this;
	}

	hide() {
		return this.visible = false;
	}

	toggle() {
		if (this.visible) {
			this.hide();
		} else {
			this.show();
		}
		return Page.projector.scheduleRender();
	}


	addItem(title, cb, selected) {
		if (selected == null) { selected = false; }
		return this.items.push([title, cb, selected]);
	}


	storeNode(node) {
		this.node = node;
		// Animate visible
		if (this.visible) {
			node.className = node.className.replace('visible', '');
			return setTimeout((() => node.className += ' visible'), 20);
		}
	}

	handleClick(e) {
		let cb;
		let keep_menu = false;
		for (let item of Array.from(this.items)) {
			let selected, title;
			[title, cb, selected] = Array.from(item);
			if ((title === e.target.textContent) || (e.target['data-title'] === title)) {
				keep_menu = cb(item);
				break;
			}
		}
		if ((keep_menu !== true) && (cb !== null)) {
			this.hide();
		}
		return false;
	}

	renderItem(item) {
		let [title, cb, selected] = Array.from(item);
		if (typeof(selected) === 'function') {
			selected = selected();
		}
		if (title === '---') {
			return h('div.menu-item-separator');
		} else {
			let href, onclick;
			if (typeof(cb) === 'string') {	// Url
				href = cb;
				onclick = true;
			} else {	// Callback
				href = `#${title}`;
				onclick = this.handleClick;
			}
			return h('a.menu-item', {href, onclick, 'data-title': title, key: title, classes: {'selected': selected, 'noaction': (cb === null)}}, title);
		}
	}

	render(class_name) {
		if (class_name == null) { class_name = ''; }
		if (this.visible || this.node) {
			return h(`div.menu${class_name}`, {classes: {'visible': this.visible}, afterCreate: this.storeNode}, this.items.map(this.renderItem));
		}
	}
}

window.Menu = Menu;

// Hide menu on outside click
document.body.addEventListener('mouseup', function(e) {
	if (!window.visible_menu || !window.visible_menu.node) {
		return false;
	}
	if ((e.target !== window.visible_menu.node.parentNode) && (e.target.parentNode !== window.visible_menu.node) && (e.target.parentNode !== window.visible_menu.node.parentNode) && (e.target.parentNode !== window.visible_menu.node) && (e.target.parentNode.parentNode !== window.visible_menu.node.parentNode)) {
		window.visible_menu.hide();
		return Page.projector.scheduleRender();
	}
});
/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
String.prototype.startsWith = function(s) { return this.slice(0, s.length) === s; };
String.prototype.endsWith = function(s) { return (s === '') || (this.slice(-s.length) === s); };
String.prototype.repeat = function(count) { return new Array( count + 1 ).join(this); };

window.isEmpty = function(obj) {
	for (let key in obj) {
		return false;
	}
	return true;
};
/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const last_time = {};
const calling = {};
const calling_iterval = {};


// Rate limit function call and don't allow to run in parallel (until callback is called)
window.RateLimitCb = function(interval, fn, args) {
	if (args == null) { args = []; }
	const cb = function() {	// Callback when function finished
		const left = interval - (Date.now() - last_time[fn]);	// Time life until next call
		// console.log "CB, left", left, "Calling:", calling[fn]
		if (left <= 0) {	// No time left from rate limit interval
			delete last_time[fn];
			if (calling[fn]) {	// Function called within interval
				RateLimitCb(interval, fn, calling[fn]);
			}
			return delete calling[fn];
		} else {	// Time left from rate limit interval
			return setTimeout((function() {
				delete last_time[fn];
				if (calling[fn]) {	// Function called within interval
					RateLimitCb(interval, fn, calling[fn]);
				}
				return delete calling[fn];
			}), left);
		}
	};
	if (last_time[fn]) {	// Function called within interval
		return calling[fn] = args;	// Schedule call and update arguments
	} else {	// Not called within interval, call instantly
		last_time[fn] = Date.now();
		return fn.apply(this, [cb, ...Array.from(args)]);
	}
};


window.RateLimit = function(interval, fn) {
	if (calling_iterval[fn] > interval) {
		clearInterval(calling[fn]);
		delete calling[fn];
	}

	if (!calling[fn]) {
		call_after_interval[fn] = false;
		fn(); // First call is not delayed
		calling_iterval[fn] = interval;
		return calling[fn] = setTimeout((function() {
			if (call_after_interval[fn]) {
				fn();
			}
			delete calling[fn];
			return delete call_after_interval[fn];
		}), interval);
	} else { // Called within iterval, delay the call
		return call_after_interval[fn] = true;
	}
};


/*
window.s = Date.now()
window.load = (done, num) ->
	console.log "Loading #{num}...", Date.now()-window.s
	setTimeout (-> done()), 1000

RateLimit 500, window.load, [0] # Called instantly
RateLimit 500, window.load, [1]
setTimeout (-> RateLimit 500, window.load, [300]), 300
setTimeout (-> RateLimit 500, window.load, [600]), 600 # Called after 1000ms
setTimeout (-> RateLimit 500, window.load, [1000]), 1000
setTimeout (-> RateLimit 500, window.load, [1200]), 1200	# Called after 2000ms
setTimeout (-> RateLimit 500, window.load, [3000]), 3000	# Called after 3000ms
*/
/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const limits = {};
const call_after_interval = {};
window.RateLimit = function(interval, fn) {
	if (!limits[fn]) {
		call_after_interval[fn] = false;
		fn(); // First call is not delayed
		return limits[fn] = setTimeout((function() {
			if (call_after_interval[fn]) {
				fn();
			}
			delete limits[fn];
			return delete call_after_interval[fn];
		}), interval);
	} else { // Called within iterval, delay the call
		return call_after_interval[fn] = true;
	}
};
/* eslint-disable
		max-len,
		no-undef,
		no-unused-vars,
		no-useless-escape,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class MarkedRenderer extends marked.Renderer {
	image(href, title, text) {
		return (`<code>![${text}](${href})</code>`);
	}
}

class TextClass {
	toColor(text, saturation, lightness) {
		if (saturation == null) { saturation = 30; }
		if (lightness == null) { lightness = 50; }
		let hash = 0;
		for (let i = 0, end = text.length-1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
			hash += text.charCodeAt(i)*i;
			hash = hash % 1777;
		}
		return `hsl(${hash % 360}${`,${saturation}%,${lightness}%)`}`;
	}


	renderMarked(text, options) {
		if (options == null) { options = {}; }
		options['gfm'] = true;
		options['breaks'] = true;
		options['sanitize'] = true;
		options['renderer'] = marked_renderer;
		text = marked(text, options);
		return this.fixHtmlLinks(text);
	}

	emailLinks(text) {
		return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
	}

	// Convert zeronet html links to relaitve
	fixHtmlLinks(text) {
		if (window.is_proxy) {
			return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="http://zero');
		} else {
			return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
		}
	}

	// Convert a single link to relative
	fixLink(link) {
		if (window.is_proxy) {
			const back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
			return back.replace(/http:\/\/zero\/([^\/]+\.bit)/, 'http://$1');	// Domain links
		} else {
			return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
		}
	}

	toUrl(text) {
		return text.replace(/[^A-Za-z0-9]/g, '+').replace(/[+]+/g, '+').replace(/[+]+$/, '');
	}

	getSiteUrl(address) {
		if (window.is_proxy) {
			if (Array.from(address).includes('.')) { // Domain
				return `http://${address}/`;
			} else {
				return `http://zero/${address}/`;
			}
		} else {
			return `/${address}/`;
		}
	}


	fixReply(text) {
		return text.replace(/(>.*\n)([^\n>])/gm, '$1\n$2');
	}

	toBitcoinAddress(text) {
		return text.replace(/[^A-Za-z0-9]/g, '');
	}


	jsonEncode(obj) {
		return unescape(encodeURIComponent(JSON.stringify(obj)));
	}

	jsonDecode(obj) {
		return JSON.parse(decodeURIComponent(escape(obj)));
	}

	fileEncode(obj) {
		if (typeof(obj) === 'string') {
			return btoa(unescape(encodeURIComponent(obj)));
		} else {
			return btoa(unescape(encodeURIComponent(JSON.stringify(obj, undefined, '\t'))));
		}
	}

	utf8Encode(s) {
		return unescape(encodeURIComponent(s));
	}

	utf8Decode(s) {
		return decodeURIComponent(escape(s));
	}


	distance(s1, s2) {
		s1 = s1.toLocaleLowerCase();
		s2 = s2.toLocaleLowerCase();
		let next_find_i = 0;
		let next_find = s2[0];
		const match = true;
		let extra_parts = {};
		for (let char of Array.from(s1)) {
			if (char !== next_find) {
				if (extra_parts[next_find_i]) {
					extra_parts[next_find_i] += char;
				} else {
					extra_parts[next_find_i] = char;
				}
			} else {
				next_find_i++;
				next_find = s2[next_find_i];
			}
		}

		if (extra_parts[next_find_i]) {
			extra_parts[next_find_i] = '';	// Extra chars on the end doesnt matter
		}
		extra_parts = ((() => {
			const result = [];
			for (let key in extra_parts) {
				const val = extra_parts[key];
				result.push(val);
			}
			return result;
		})());
		if (next_find_i >= s2.length) {
			return extra_parts.length + extra_parts.join('').length;
		} else {
			return false;
		}
	}


	parseQuery(query) {
		const params = {};
		const parts = query.split('&');
		for (let part of Array.from(parts)) {
			const [key, val] = Array.from(part.split('='));
			if (val) {
				params[decodeURIComponent(key)] = decodeURIComponent(val);
			} else {
				params['url'] = decodeURIComponent(key);
			}
		}
		return params;
	}

	encodeQuery(params) {
		const back = [];
		if (params.url) {
			back.push(params.url);
		}
		for (let key in params) {
			const val = params[key];
			if (!val || (key === 'url')) {
				continue;
			}
			back.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
		}
		return back.join('&');
	}

	highlight(text, search) {
		const parts = text.split(RegExp(search, 'i'));
		const back = [];
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			back.push(part);
			if (i < (parts.length-1)) {
				back.push(h('span.highlight', {key: i}, search));
			}
		}
		return back;
	}

	formatSize(size) {
		const size_mb = size/1024/1024;
		if (size_mb >= 1000) {
			return (size_mb/1024).toFixed(1)+' GB';
		} else if (size_mb >= 100) {
			return size_mb.toFixed(0)+' MB';
		} else if ((size/1024) >= 1000) {
			return size_mb.toFixed(2)+' MB';
		} else {
			return (size/1024).toFixed(2)+' KB';
		}
	}
}

window.marked_renderer = new MarkedRenderer();
window.is_proxy = ((document.location.host === 'zero') || (window.location.pathname === '/'));
const Text = new TextClass();
/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class TimeClass {
	since(timestamp) {
		let back;
		const now = +(new Date)/1000;
		if (timestamp > 1000000000000) {	// In ms
			timestamp = timestamp/1000;
		}
		const secs = now - timestamp;
		if (secs < 60) {
			back = 'Just now';
		} else if (secs < (60*60)) {
			const minutes = Math.round(secs/60);
			back = `${minutes} minutes ago`;
		} else if (secs < (60*60*24)) {
			back = `${Math.round(secs/60/60)} hours ago`;
		} else if (secs < (60*60*24*3)) {
			back = `${Math.round(secs/60/60/24)} days ago`;
		} else {
			back = `on ${this.date(timestamp)}`;
		}
		back = back.replace(/^1 ([a-z]+)s/, '1 $1'); // 1 days ago fix
		return back;
	}


	date(timestamp, format) {
		let display;
		if (format == null) { format = 'short'; }
		if (timestamp > 1000000000000) {	// In ms
			timestamp = timestamp/1000;
		}
		const parts = (new Date(timestamp*1000)).toString().split(' ');
		if (format === 'short') {
			display = parts.slice(1, 4);
		} else {
			display = parts.slice(1, 5);
		}
		return display.join(' ').replace(/( [0-9]{4})/, ',$1');
	}


	timestamp(date) {
		if (date == null) { date = ''; }
		if ((date === 'now') || (date === '')) {
			return parseInt(+(new Date)/1000);
		} else {
			return parseInt(Date.parse(date)/1000);
		}
	}
}


const Time = new TimeClass;
/* eslint-disable
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
window._ = s => s;
/* eslint-disable
		constructor-super,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ZeroFrame extends Class {
	constructor(url) {
		super(url);
		this.onMessage = this.onMessage.bind(this);
		this.onRequest = this.onRequest.bind(this);
		this.onOpenWebsocket = this.onOpenWebsocket.bind(this);
		this.onCloseWebsocket = this.onCloseWebsocket.bind(this);
		this.url = url;
		this.waiting_cb = {};
		this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, '$1');
		this.connect();
		this.next_message_id = 1;
		this.history_state = {};
		this.init();
	}


	init() {
		return this;
	}


	connect() {
		this.target = window.parent;
		window.addEventListener('message', this.onMessage, false);
		this.cmd('innerReady');

		// Save scrollTop
		window.addEventListener('beforeunload', e => {
			this.log('save scrollTop', window.pageYOffset);
			this.history_state['scrollTop'] = window.pageYOffset;
			return this.cmd('wrapperReplaceState', [this.history_state, null]);
		});

		// Restore scrollTop
		return this.cmd('wrapperGetState', [], state => {
			if (state != null) { this.history_state = state; }
			this.log('restore scrollTop', state, window.pageYOffset);
			if ((window.pageYOffset === 0) && state) {
				return window.scroll(window.pageXOffset, state.scrollTop);
			}
		});
	}


	onMessage(e) {
		const message = e.data;
		const { cmd } = message;
		if (cmd === 'response') {
			if (this.waiting_cb[message.to] != null) {
				return this.waiting_cb[message.to](message.result);
			} else {
				return this.log('Websocket callback not found:', message);
			}
		} else if (cmd === 'wrapperReady') { // Wrapper inited later
			return this.cmd('innerReady');
		} else if (cmd === 'ping') {
			return this.response(message.id, 'pong');
		} else if (cmd === 'wrapperOpenedWebsocket') {
			return this.onOpenWebsocket();
		} else if (cmd === 'wrapperClosedWebsocket') {
			return this.onCloseWebsocket();
		} else {
			return this.onRequest(cmd, message.params);
		}
	}


	onRequest(cmd, message) {
		return this.log('Unknown request', message);
	}


	response(to, result) {
		return this.send({'cmd': 'response', 'to': to, 'result': result});
	}


	cmd(cmd, params, cb=null) {
		if (params == null) { params = {}; }
		return this.send({'cmd': cmd, 'params': params}, cb);
	}


	send(message, cb=null) {
		message.wrapper_nonce = this.wrapper_nonce;
		message.id = this.next_message_id;
		this.next_message_id += 1;
		this.target.postMessage(message, '*');
		if (cb) {
			return this.waiting_cb[message.id] = cb;
		}
	}


	onOpenWebsocket() {
		return this.log('Websocket open');
	}


	onCloseWebsocket() {
		return this.log('Websocket close');
	}
}



window.ZeroFrame = ZeroFrame;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Dashboard extends Class {
	constructor() {
		super();
		this.handleTorClick = this.handleTorClick.bind(this);
		this.handleEnableAlwaysTorClick = this.handleEnableAlwaysTorClick.bind(this);
		this.handleDisableAlwaysTorClick = this.handleDisableAlwaysTorClick.bind(this);
		this.handlePortClick = this.handlePortClick.bind(this);
		this.handlePortRecheckClick = this.handlePortRecheckClick.bind(this);
		this.handleMultiuserClick = this.handleMultiuserClick.bind(this);
		this.handleDonateClick = this.handleDonateClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleNewversionClick = this.handleNewversionClick.bind(this);
		this.handleBrowserwarningClick = this.handleBrowserwarningClick.bind(this);
		this.handleTorBrowserwarningClick = this.handleTorBrowserwarningClick.bind(this);
		this.render = this.render.bind(this);
		this.menu_newversion = new Menu();
		this.menu_tor = new Menu();
		this.menu_port = new Menu();
		this.menu_multiuser = new Menu();
		this.menu_donate = new Menu();
		this.menu_browserwarning = new Menu();
		this.menu_torbrowserwarning = new Menu();

		this.port_checking = false;
		this.has_web_gl = null;
	}

	isTorAlways() {
		return Page.server_info.fileserver_ip === '127.0.0.1';
	}

	hasWebGl() {
		if (this.has_web_gl === null) {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('webgl');
			this.has_web_gl = ctx ? true : false;
			this.log('Webgl:', this.has_web_gl);
		}
		return this.has_web_gl;
	}

	getTorTitle() {
		let tor_title = Page.server_info.tor_status.replace(/\((.*)\)/, '').trim();
		if (tor_title === 'Disabled') { tor_title = _('Disabled');
		} else if (tor_title === 'Error') { tor_title = _('Error'); }
		return tor_title;
	}

	handleTorClick() {
		this.menu_tor.items = [];
		this.menu_tor.items.push([`Status: ${(Page.server_info != null ? Page.server_info.tor_status : undefined)}`, 'http://zeronet.readthedocs.org/en/latest/faq/#how-to-make-zeronet-work-with-tor-under-linux']);
		if (this.getTorTitle() !== 'OK') {
			this.menu_tor.items.push(['How to make Tor connection work?', 'http://zeronet.readthedocs.org/en/latest/faq/#how-to-make-zeronet-work-with-tor-under-linux']);
		}
		this.menu_tor.items.push(['How to use ZeroNet in Tor Browser?', 'http://zeronet.readthedocs.org/en/latest/faq/#how-to-use-zeronet-in-tor-browser']);
		this.menu_tor.items.push(['---']);
		if (this.isTorAlways()) {
			this.menu_tor.items.push(['Disable always Tor mode', this.handleDisableAlwaysTorClick]);
		} else {
			this.menu_tor.items.push(['Enable Tor for every connection (slower)', this.handleEnableAlwaysTorClick]);
		}

		this.menu_tor.toggle();
		return false;
	}

	handleEnableAlwaysTorClick() {
		return Page.cmd('configSet', ['tor', 'always'], res => {
			return Page.cmd('wrapperNotification', ['done', 'Tor always mode enabled, please restart your ZeroNet to make it work.<br>For your privacy switch to Tor browser and start a new profile by renaming the data directory.']);
		});
	}

	handleDisableAlwaysTorClick() {
		return Page.cmd('configSet', ['tor', null], res => {
			return Page.cmd('wrapperNotification', ['done', 'Tor always mode disabled, please restart your ZeroNet.']);
		});
	}

	handlePortClick() {
		this.menu_port.items = [];
		if (Page.server_info.ip_external) {
			this.menu_port.items.push([`Nice! Your port ${Page.server_info.fileserver_port} is opened.`, 'http://zeronet.readthedocs.org/en/latest/faq/#do-i-need-to-have-a-port-opened']);
		} else if (this.isTorAlways()) {
			this.menu_port.items.push(['Good, your port is always closed when using ZeroNet in Tor always mode.', 'http://zeronet.readthedocs.org/en/latest/faq/#do-i-need-to-have-a-port-opened']);
		} else if (this.getTorTitle() === 'OK') {
			this.menu_port.items.push([`Your port ${Page.server_info.fileserver_port} is closed, but your Tor gateway is running well.`, 'http://zeronet.readthedocs.org/en/latest/faq/#do-i-need-to-have-a-port-opened']);
		} else {
			this.menu_port.items.push([`Your port ${Page.server_info.fileserver_port} is closed. You are still fine, but for faster experience try open it.`, 'http://zeronet.readthedocs.org/en/latest/faq/#do-i-need-to-have-a-port-opened']);
		}

		this.menu_port.items.push(['---']);
		this.menu_port.items.push(['Re-check opened port', this.handlePortRecheckClick]);

		this.menu_port.toggle();
		return false;
	}

	handlePortRecheckClick() {
		this.port_checking = true;
		return Page.cmd('serverPortcheck', [], res => {
			this.port_checking = false;
			return Page.reloadServerInfo();
		});
	}

	handleMultiuserClick() {
		this.menu_multiuser.items = [];
		this.menu_multiuser.items.push(['Show your masterseed', ( () => Page.cmd('userShowMasterSeed'))]);
		this.menu_multiuser.items.push(['Logout', ( () => Page.cmd('userLogout'))]);

		this.menu_multiuser.toggle();
		return false;
	}

	handleDonateClick() {
		this.menu_donate.items = [];
		this.menu_donate.items.push(['Help to keep this project alive', 'https://zeronet.readthedocs.org/en/latest/help_zeronet/donate/']);

		this.menu_donate.toggle();
		return false;
	}

	handleLogoutClick() {
		return Page.cmd('uiLogout');
	}

	handleNewversionClick() {
		this.menu_newversion.items = [];
		this.menu_newversion.items.push(['Update and restart ZeroNet', ( function() {
			Page.cmd('wrapperNotification', ['info', 'Updating to latest version...<br>Please restart ZeroNet manually if it does not come back in the next few minutes.', 8000]);
			return Page.cmd('serverUpdate');
		})]);

		this.menu_newversion.toggle();
		return false;
	}

	handleBrowserwarningClick() {
		this.menu_browserwarning.items = [];
		this.menu_browserwarning.items.push(['Internet Explorer is not fully supported browser by ZeroNet, please consider switching to Chrome or Firefox', 'http://browsehappy.com/']);
		this.menu_browserwarning.toggle();
		return false;
	}


	handleTorBrowserwarningClick() {
		this.menu_torbrowserwarning.items = [];
		this.menu_torbrowserwarning.items.push(['To protect your anonymity you should use ZeroNet in the Tor browser.', 'http://zeronet.readthedocs.io/en/latest/faq/#how-to-use-zeronet-in-tor-browser']);
		this.menu_torbrowserwarning.toggle();
		return false;
	}

	render() {
		if (Page.server_info) {
			const tor_title = this.getTorTitle();
			return h('div#Dashboard',
				h('a.owner.dashboard-item.owner', {href: 'https://magicinventor.xyz'}, [
					h('span', 'Owner '),
					h('span.status',
						{style: 'color: #e64338'},
						"MagicInventor"
					)
				]),

				// IE not supported
				navigator.userAgent.match(/(\b(MS)?IE\s+|Trident\/7.0)/) ?
					h('a.port.dashboard-item.browserwarning', {href: 'http://browsehappy.com/', onmousedown: this.handleBrowserwarningClick, onclick: Page.returnFalse}, [
						h('span', 'Unsupported browser')
					]) : undefined,
				this.menu_browserwarning.render('.menu-browserwarning'),

				// No tor browser detected
				this.isTorAlways() && (!navigator.userAgent.match(/(Firefox)/) || this.hasWebGl() || (navigator.serviceWorker != null)) ?
					h('a.port.dashboard-item.torbrowserwarning', {href: 'http://zeronet.readthedocs.io/en/latest/faq/#how-to-use-zeronet-in-tor-browser', onmousedown: this.handleTorBrowserwarningClick, onclick: Page.returnFalse}, [
						h('span', 'Your browser is not safe')
					]) : undefined,
				this.menu_torbrowserwarning.render('.menu-browserwarning'),

				// Update
				parseFloat(Page.server_info.version.replace('.', '0')) < parseFloat(Page.latest_version.replace('.', '0')) ?
					h('a.newversion.dashboard-item', {href: '#Update', onmousedown: this.handleNewversionClick, onclick: Page.returnFalse}, `New ZeroNet version: ${Page.latest_version}`) : undefined,
				this.menu_newversion.render('.menu-newversion'),

				// Donate
				h('a.port.dashboard-item.donate', {'href': '#Donate', onmousedown: this.handleDonateClick, onclick: Page.returnFalse}, [h('div.icon-heart')]),
				this.menu_donate.render('.menu-donate'),

				// Multiuser
				Page.server_info.multiuser ?
					h('a.port.dashboard-item.multiuser', {href: '#Multiuser', onmousedown: this.handleMultiuserClick, onclick: Page.returnFalse}, [
						h('span', 'User '),
						h('span.status',
							{style: `color: ${Text.toColor(Page.server_info.master_address)}`},
							Page.server_info.master_address.slice(0, 5)+'..'+Page.server_info.master_address.slice(-4)
						)
					]) : undefined,
				Page.server_info.multiuser ?
					this.menu_multiuser.render('.menu-multiuser') : undefined,

				Array.from(Page.server_info.plugins).includes('UiPassword') ?
					h('a.port.dashboard-item.logout', {href: '#Logout', onmousedown: this.handleLogoutClick, onclick: Page.returnFalse}, [
						h('span', 'Logout'),
					]) : undefined,
	
				// Port open status
				h('a.port.dashboard-item.port', {href: '#Port', classes: {bounce: this.port_checking}, onmousedown: this.handlePortClick, onclick: Page.returnFalse}, [
					h('span', 'Port '),
					this.port_checking ?
						h('span.status', 'Checking')
						: Page.server_info.ip_external === null ?
							h('span.status', 'Checking')
							: Page.server_info.ip_external === true ?
								h('span.status.status-ok', 'Opened')
								: this.isTorAlways ?
									h('span.status.status-ok', 'Closed')
									: tor_title === 'OK' ?
										h('span.status.status-warning', 'Closed')
										:
										h('span.status.status-bad', 'Closed')
				]),
				this.menu_port.render('.menu-port'),
				// Tor status
				h('a.tor.dashboard-item.tor', {href: '#Tor', onmousedown: this.handleTorClick, onclick: Page.returnFalse}, [
					h('span', 'Tor '),
					tor_title === 'OK' ?
						this.isTorAlways() ?
							h('span.status.status-ok', 'Always')
							:
							h('span.status.status-ok', 'Available')
						:
						h('span.status.status-warning', tor_title)
				]),
				this.menu_tor.render('.menu-tor')
			);
		} else {
			return h('div#Dashboard');
		}
	}
}


window.Dashboard = Dashboard;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
		no-useless-escape,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class FeedList extends Class {
	constructor() {
		super();
		this.checkScroll = this.checkScroll.bind(this);
		this.displayRows = this.displayRows.bind(this);
		this.update = this.update.bind(this);
		this.search = this.search.bind(this);
		this.storeNodeSearch = this.storeNodeSearch.bind(this);
		this.handleSearchInput = this.handleSearchInput.bind(this);
		this.handleSearchKeyup = this.handleSearchKeyup.bind(this);
		this.enterAnimation = this.enterAnimation.bind(this);
		this.exitAnimation = this.exitAnimation.bind(this);
		this.renderFeed = this.renderFeed.bind(this);
		this.renderWelcome = this.renderWelcome.bind(this);
		this.getClass = this.getClass.bind(this);
		this.render = this.render.bind(this);
		this.onSiteInfo = this.onSiteInfo.bind(this);
		this.feeds = null;
		this.searching = null;
		this.searched = null;
		this.searched_info = null;
		this.loading = false;
		this.need_update = false;
		this.updating = false;
		this.limit = 30;
		this.query_limit = 20;
		this.query_day_limit = 3;
		Page.on_settings.then(() => {
			this.need_update = true;
			return document.body.onscroll = () => {
				return RateLimit(300, () => {
					return this.checkScroll();
				});
			};
		});
		this;
	}

	checkScroll() {
		const scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		if (((scroll_top + window.innerHeight) > (document.getElementById('FeedList').clientHeight - 400)) && !this.updating && ((this.feeds != null ? this.feeds.length : undefined) > 5) && (Page.mode === 'Sites') && (this.limit < 300)) {
			this.limit += 30;
			this.query_limit += 30;
			this.query_day_limit += 5;
			this.log('checkScroll update');
			this.update();
			return true;
		} else {
			return false;
		}
	}

	displayRows(rows, search) {
		this.feeds = [];
		if (!rows) {
			return false;
		}

		rows.sort((a, b) => (a.date_added + (a.type === 'mention' ? 1 : 0)) - b.date_added - (b.type === 'mention' ? 1 : 0));	// Prefer mention

		let row_group = {};
		let last_row = {};
		rows.reverse();
		for (let row of Array.from(rows)) {
			if ((last_row.body === row.body) && (last_row.date_added === row.date_added)) {
				continue;	// Duplicate (eg. also signed up for comments and mentions)
			}

			if ((row_group.type === row.type) && (row.url === row_group.url)) {
				if ((row_group.body_more == null)) {
					row_group.body_more = [];
					row_group.body_more.push(row.body);
				} else if (row_group.body_more.length < 3) {
					row_group.body_more.push(row.body);
				} else {
					if (row_group.more == null) { row_group.more = 0; }
					row_group.more += 1;
				}
				row_group.feed_id = row.date_added;
			} else {
				if (row.feed_id == null) { row.feed_id = row.date_added; }
				this.feeds.push(row);
				row_group = row;
			}
			last_row = row;
		}
		return Page.projector.scheduleRender();
	}


	update(cb) {
		let params;
		if (this.searching || this.updating) {
			return false;
		}
		if (!Page.server_info || (Page.server_info.rev < 1850)) {
			params = [];
		} else {
			params = [this.query_limit, this.query_day_limit];
		}
		this.logStart('Updating feed');
		this.updating = true;
		return Page.cmd('feedQuery', params, rows => {
			if ((rows.length < 10) && (this.day_limit !== null)) {
				// Query without day limit if too few result
				this.limit = 20;
				this.day_limit = null;
				this.updating = false;
				this.update();
				return false;
			}

			this.displayRows(rows);
			setTimeout(this.checkScroll, 100);
			this.logEnd('Updating feed');
			if (cb) { cb(); }
			return this.updating = false;
		});
	}

	search(search, cb) {
		if (Page.server_info.rev < 1230) {
			this.displayRows([]);
			if (cb) { cb(); }
			return;
		}
		this.loading = true;
		return Page.cmd('feedSearch', search, res => {
			this.loading = false;
			this.displayRows(res['rows'], search);
			delete res['rows'];
			this.searched_info = res;
			this.searched = search;
			if (cb) { return cb(); }
		});
	}

	// Focus on search input if key pressed an no input on focus
	storeNodeSearch(node) {
		return document.body.onkeypress = e => {
			if ([0, 32].includes(e.charCode)) {	// Not a normal character or space
				return;
			}
			if ((document.activeElement != null ? document.activeElement.tagName : undefined) !== 'INPUT') {
				return node.focus();
			}
		};
	}

	handleSearchInput(e) {
		let delay;
		if (this.searching && (this.searching.length > 3)) {
			delay = 100;
		} else if (this.searching) {
			delay = 300;
		} else {
			delay = 600;
		}
		this.searching = e.target.value;

		if (Page.server_info.rev < 1230) {
			this.feeds = [];
		}

		if (e.target.value === '') {	// No delay when returning to newsfeed
			delay = 1;
		}
		clearInterval(this.input_timer);
		setTimeout(() => {
			return this.loading = true;
		});

		// Delay calls to reduce server load
		this.input_timer = setTimeout(( () => {
			return RateLimitCb(delay, cb_done => {
				this.loading = false;
				if (this.searching) {
					return this.search(this.searching, () => {
						return cb_done();
					});
				} else {
					return this.update(() => {
						cb_done();
						if (!this.searching) {
							this.searching = null;
						}
						return this.searched = null;
					});
				}
			});
		}
		), delay);
		return false;
	}

	handleSearchKeyup(e) {
		if (e.keyCode === 27) { // Esc
			e.target.value = '';
			this.handleSearchInput(e);
		}
		return false;
	}

	formatTitle(title) {
		if (this.searching && (this.searching.length > 1)) {
			return Text.highlight(title, this.searching);
		} else {
			return title;
		}
	}

	formatBody(body, type) {
		body = body.replace(/[\n\r]+/, '\n');	// Remove empty lines
		if ((type === 'comment') || (type === 'mention')) {
			// Display Comment
			let username_formatted;
			const username_match = body.match(/^(([a-zA-Z0-9\.]+)@[a-zA-Z0-9\.]+|@(.*?)):/);
			if (username_match) {
				if (username_match[2]) {
					username_formatted = username_match[2] + ' › ';
				} else {
					username_formatted = username_match[3] + ' › ';
				}
				body = body.replace(/> \[(.*?)\].*/g, '$1: ');	// Replace original message quote
				body = body.replace(/^[ ]*>.*/gm, '');	// Remove quotes
				body = body.replace(username_match[0], '');	// Remove commenter from body
			} else {
				username_formatted = '';
			}
			body = body.replace(/\n/g, ' ');
			body = body.trim();

			// Highligh matched search parts
			if (this.searching && (this.searching.length > 1)) {
				body = Text.highlight(body, this.searching);
				if ((body[0].length > 60) && (body.length > 1)) {
					body[0] = `...${body[0].slice(body[0].length-50, +(body[0].length-1) + 1 || undefined)}`;
				}
				return [h('b', Text.highlight(username_formatted, this.searching)), body];
			} else {
				body = body.slice(0, 201);
				return [h('b', [username_formatted]), body];
			}
		} else {
			// Display post
			body = body.replace(/\n/g, ' ');

			// Highligh matched search parts
			if (this.searching && (this.searching.length > 1)) {
				body = Text.highlight(body, this.searching);
				if (body[0].length > 60) {
					body[0] = `...${body[0].slice(body[0].length-50, +(body[0].length-1) + 1 || undefined)}`;
				}
			} else {
				body = body.slice(0, 201);
			}
			return body;
		}
	}

	formatType(type, title) {
		if (type === 'comment') {
			return 'Comment on';
		} else if (type === 'mention') {
			if (title) {
				return 'You got mentioned in';
			} else {
				return 'You got mentioned';
			}
		} else {
			return '';
		}
	}

	enterAnimation(elem, props) {
		if (this.searching === null) {
			return Animation.slideDown.apply(this, arguments);
		} else {
			return null;
		}
	}

	exitAnimation(elem, remove_func, props) {
		if (this.searching === null) {
			return Animation.slideUp.apply(this, arguments);
		} else {
			return remove_func();
		}
	}

	renderFeed(feed) {
		try {
			const site = Page.site_list.item_list.items_bykey[feed.site];
			const type_formatted = this.formatType(feed.type, feed.title);
			return h(`div.feed.${feed.type}`, {key: feed.site+feed.type+feed.title+feed.feed_id, enterAnimation: this.enterAnimation, exitAnimation: this.exitAnimation}, [
				h('div.details', [
					h('a.site', {href: site.getHref()}, [site.row.content.title]),
					h('div.added', [Time.since(feed.date_added)])
				]),
				h('div.circle', {style: `border-color: ${Text.toColor(feed.type+site.row.address, 60, 60)}`}),
				type_formatted ? h('span.type', type_formatted) : undefined,
				h('a.title', {href: site.getHref()+feed.url}, this.formatTitle(feed.title)),
				h('div.body', {key: feed.body, enterAnimation: this.enterAnimation, exitAnimation: this.exitAnimation}, this.formatBody(feed.body, feed.type)),
				feed.body_more ?	// Display comments
				feed.body_more.map(body_more => {
					return h('div.body', {key: body_more, enterAnimation: this.enterAnimation, exitAnimation: this.exitAnimation}, this.formatBody(body_more, feed.type));
				}) : undefined,
				feed.more > 0 ?	// Collapse other types
				h('a.more', {href: site.getHref()+feed.url}, [`+${feed.more} more`]) : undefined
			]);
		} catch (err) {
			this.log(err);
			return h('div');
		}
	}

	renderWelcome(feed) {
		return h('div.the-body#the-body', {style: "overflow: auto;"}, [
			h('div.the-main', [
				h('div.welcome', [
					h('img', {src: 'assets/img/weed.png', height: 150}),
					h('h1', 'l0y'),
					h('h2', ["With the zeronet, the internet is free"]),
					h('div.served', ['This site currently served by ', h('b.peers', (Page.site_info['peers'] || 'n/a')), ' peers, without any central server.']),
				]),
				/*
				to do
				h('div.posts-list', [
					h('div', [
						h('div.info', [
							h('div.avatar', [
								h('img.avatar', {src: 'img/weed.png'})
							]),
							h('div.subinfo', [
								h('div.user', [
									h('a', {href: 'hoohle.com'}, [
										h('i.icon.person'),
										"test"
									])
								]),
								h('div.date', [
										h('i.icon.clock'),
										"test"
								])
							]),
						]),
						h('div.content', []),
						h('div.feedback', []),
						h('div.reply', []),
					])
				]),*/
				h('div.feed', feed)
			]),
			h('div.sites-list', [
				h('h3.the-title', 'UnOfficial'),
				h('a.site.site-paid', {href: "#", onclick: "window.open(\"https://www.paypal.me/LordMagic/5\")"}, [
					h('div.title', ['$5 USD']),
					h('div.description', ['To be here (send info in the note)']),
					h('div.visit', ['Via Paypal'])
				]),
				h('h3.the-title', 'Official'),
				h('a.site.site-zeroboard', {href: Text.getSiteUrl('Board.ZeroNetwork.bit')}, [
					h('div.title', ['ZeroBoard']),
					h('div.description', ['Simple messaging board']),
					h('div.visit', ['Activate \u2501'])
				]),
				h('a.site.site-zerotalk', {href: Text.getSiteUrl('Talk.ZeroNetwork.bit')}, [
					h('div.title', ['ZeroTalk']),
					h('div.description', ['Reddit-like, decentralized forum']),
					h('div.visit', ['Activate \u2501'])
				]),
				h('a.site.site-zeroblog', {href: Text.getSiteUrl('Blog.ZeroNetwork.bit')}, [
					h('div.title', ['ZeroBlog']),
					h('div.description', ['Microblogging platform']),
					h('div.visit', ['Activate \u2501'])
				]),
				h('a.site.site-zeromail', {href: Text.getSiteUrl('Mail.ZeroNetwork.bit')}, [
					h('div.title', ['ZeroMail']),
					h('div.description', ['End-to-end encrypted mailing']),
					h('div.visit', ['Activate \u2501'])
				]),
				h('a.site.site-zerome', {href: Text.getSiteUrl('Me.ZeroNetwork.bit')}, [
					h('div.title', ['ZeroMe']),
					h('div.description', ['P2P social network']),
					h('div.visit', ['Activate \u2501'])
				]),
				h('a.site.site-zerosites', {href: Text.getSiteUrl('Sites.ZeroNetwork.bit')}, [
					h('div.title', ['ZeroSites']),
					h('div.description', ['Discover more sites']),
					h('div.visit', ['Activate \u2501'])
				])

			])
			
		]);

		
	}

	getClass() {
		if (this.searching !== null) {
			return 'search';
		} else {
			return `newsfeed.limit-${this.limit}`;
		}
	}

	render() {
		if (this.need_update) {
			RateLimitCb(5000, this.update);
			this.need_update = false;
		}

		if (this.feeds && Page.site_list.loaded && (document.body.className !== 'loaded') && !this.updating) {
			if (document.body.scrollTop > 500) {	// Scrolled down wait until next render
				setTimeout((() => document.body.className = 'loaded'), 2000);
			} else {
				document.body.className = 'loaded';
			}
		}

		return this.renderWelcome(h('div#FeedList.FeedContainer', {classes: {faded: Page.mute_list.visible}},
			
			(this.feeds === null) || !Page.site_list.loaded ?
				h('div.loading')
				: (this.feeds.length > 0) || (this.searching !== null) ?
					[
						h('div.feeds-search', {classes: {'searching': this.searching}},
							h('div.icon-magnifier'),
							this.loading ?
								h('div.loader', {enterAnimation: Animation.show, exitAnimation: Animation.hide}, h('div.arc')) : undefined,
							h('input', {type: 'text', placeholder: 'Search in connected sites', value: this.searching, onkeyup: this.handleSearchKeyup, oninput: this.handleSearchInput, afterCreate: this.storeNodeSearch}),
							this.searched && this.searched_info && !this.loading ?
								h('div.search-info',
									{enterAnimation: Animation.show, exitAnimation: Animation.hide},
									`${this.searched_info.num} results from ${this.searched_info.sites} sites in ${this.searched_info.taken.toFixed(2)}s`
								) : undefined,
							(() => {
								if ((Page.server_info.rev < 1230) && this.searching) {
									return h('div.search-noresult', {enterAnimation: Animation.show}, ['You need to ', h('a', {href: '#Update', onclick: Page.head.handleUpdateZeronetClick}, 'update'), ' your ZeroNet client to use the search feature!']);
								} else if ((this.feeds.length === 0) && this.searched) {
									return h('div.search-noresult', {enterAnimation: Animation.show}, `No results for ${this.searched}`);
								}
							})()
						),
						h('div.feeds-line'),
						h(`div.FeedList.${this.getClass()}`, {classes: {loading: this.loading}}, this.feeds.slice(0, +this.limit + 1 || undefined).map(this.renderFeed))
					]
					: ""
					
		));
	}

	onSiteInfo(site_info) {
		if (((site_info.event != null ? site_info.event[0] : undefined) === 'file_done') && (site_info.event != null ? site_info.event[1].endsWith('.json') : undefined) && !(site_info.event != null ? site_info.event[1].endsWith('content.json') : undefined)) {
			if (!this.searching) {
				return this.need_update = true;
			}
		}
	}
}

window.FeedList = FeedList;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
		no-var,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class FileList extends Class {
	constructor() {
		super();
		this.checkSelectedFiles = this.checkSelectedFiles.bind(this);
		this.handleSelectbarCancel = this.handleSelectbarCancel.bind(this);
		this.handleSelectbarPin = this.handleSelectbarPin.bind(this);
		this.handleSelectbarUnpin = this.handleSelectbarUnpin.bind(this);
		this.handleSelectbarDelete = this.handleSelectbarDelete.bind(this);
		this.handleTotalbarOver = this.handleTotalbarOver.bind(this);
		this.handleTotalbarOut = this.handleTotalbarOut.bind(this);
		this.handleEditlimitClick = this.handleEditlimitClick.bind(this);
		this.handleLimitCancelClick = this.handleLimitCancelClick.bind(this);
		this.handleLimitSetClick = this.handleLimitSetClick.bind(this);
		this.handleTotalbarMenu = this.handleTotalbarMenu.bind(this);
		this.handleLimitInput = this.handleLimitInput.bind(this);
		this.renderTotalbar = this.renderTotalbar.bind(this);
		this.renderSelectbar = this.renderSelectbar.bind(this);
		this.updateOptionalStats = this.updateOptionalStats.bind(this);
		this.updateAllFiles = this.updateAllFiles.bind(this);
		this.render = this.render.bind(this);
		this.onSiteInfo = this.onSiteInfo.bind(this);
		this.need_update = true;
		this.updating_files = 0;
		this.optional_stats = {limit: 0, free: 0, used: 0};
		this.updateOptionalStats();
		this.hover_totalbar = false;
		this.menu_totalbar = new Menu();
		this.editing_limit = false;
		this.limit = '';
		this.selected_files_num = 0;
		this.selected_files_size = 0;
		this.selected_files_pinned = 0;
		this;
	}

	checkSelectedFiles() {
		this.selected_files_num = 0;
		this.selected_files_size = 0;
		this.selected_files_pinned = 0;
		return Array.from(Page.site_list.sites).map((site) =>
			(() => {
				const result = [];
				for (let site_file of Array.from(site.files.items)) {
					if (site.files.selected[site_file.inner_path]) {
						this.selected_files_num += 1;
						this.selected_files_size += site_file.size;
						result.push(this.selected_files_pinned += site_file.is_pinned);
					}
				}
				return result;
			})());
	}

	handleSelectbarCancel() {
		for (let site of Array.from(Page.site_list.sites)) {
			for (let site_file of Array.from(site.files.items)) {
				site.files.selected = {};
			}
		}
		this.checkSelectedFiles();
		Page.projector.scheduleRender();
		return false;
	}

	handleSelectbarPin() {
		for (var site of Array.from(Page.site_list.sites)) {
			var inner_paths = (Array.from(site.files.items).filter((site_file) => site.files.selected[site_file.inner_path]).map((site_file) => site_file.inner_path));

			if (inner_paths.length > 0) {
				(site =>
					Page.cmd('optionalFilePin', [inner_paths, site.row.address], () => site.files.update())
				)(site);
			}
		}
		return this.handleSelectbarCancel();
	}

	handleSelectbarUnpin() {
		for (var site of Array.from(Page.site_list.sites)) {
			var inner_paths = (Array.from(site.files.items).filter((site_file) => site.files.selected[site_file.inner_path]).map((site_file) => site_file.inner_path));

			if (inner_paths.length > 0) {
				(site =>
					Page.cmd('optionalFileUnpin', [inner_paths, site.row.address], () => site.files.update())
				)(site);
			}
		}
		return this.handleSelectbarCancel();
	}

	handleSelectbarDelete() {
		for (var site of Array.from(Page.site_list.sites)) {
			const inner_paths = (Array.from(site.files.items).filter((site_file) => site.files.selected[site_file.inner_path]).map((site_file) => site_file.inner_path));

			if (inner_paths.length > 0) {
				for (let inner_path of Array.from(inner_paths)) {
					Page.cmd('optionalFileDelete', [inner_path, site.row.address]);
				}
				site.files.update();
			}
		}
		Page.site_list.update();
		return this.handleSelectbarCancel();
	}

	handleTotalbarOver() {
		this.hover_totalbar = true;
		return Page.projector.scheduleRender();
	}

	handleTotalbarOut() {
		this.hover_totalbar = false;
		return Page.projector.scheduleRender();
	}

	handleEditlimitClick() {
		this.editing_limit = true;
		return false;
	}

	handleLimitCancelClick() {
		this.editing_limit = false;
		return false;
	}

	handleLimitSetClick() {
		let limit;
		if ((this.limit.indexOf('M') > 0) || (this.limit.indexOf('m') > 0)) {
			limit = (parseFloat(this.limit) / 1024).toString();
		} else if (this.limit.indexOf('%') > 0) {
			limit = parseFloat(this.limit) + '%';
		} else {
			limit = parseFloat(this.limit).toString();
		}
		this.optional_stats.limit = limit;
		Page.cmd('optionalLimitSet', limit);

		this.editing_limit = false;
		return false;
	}

	handleTotalbarMenu() {
		this.menu_totalbar.items = [];
		this.menu_totalbar.items.push(['Edit optional files limit', this.handleEditlimitClick]);

		if (this.menu_totalbar.visible) {
			this.menu_totalbar.hide();
		} else {
			this.menu_totalbar.show();
		}
		return false;
	}

	handleLimitInput(e) {
		return this.limit = e.target.value;
	}

	renderTotalbar() {
		/*
		size_optional = 0
		optional_downloaded = 0
		for site in Page.site_list.sites
			size_optional += site.row.settings.size_optional
			optional_downloaded += site.row.settings.optional_downloaded
		*/
		let limit, total_space_limited;
		if (this.editing_limit && (parseFloat(this.limit) > 0)) {
			if ((this.limit.indexOf('M') > 0) || (this.limit.indexOf('m') > 0)) {
				limit = (parseFloat(this.limit) / 1024) + 'GB';
			} else {
				({ limit } = this);
			}
		} else {
			({ limit } = this.optional_stats);
		}

		if (limit.endsWith('%')) {
			limit = this.optional_stats.free * (parseFloat(limit)/100);
		} else {
			limit = parseFloat(limit) * 1024 * 1024 * 1024;
		}

		if ((this.optional_stats.free > (limit * 1.8)) && !this.hover_totalbar) {
			total_space_limited = limit * 1.8;	// Too much free space, keep it visible
		} else {
			total_space_limited = this.optional_stats.free;
		}


		const percent_optional_downloaded = (this.optional_stats.used/limit) * 100;
		const percent_optional_used = percent_optional_downloaded * (limit/total_space_limited);
		const percent_limit = (limit/total_space_limited) * 100;

		return h('div#FileListDashboard', {classes: {editing: this.editing_limit}}, [
			h('div.totalbar-edit', [
				h('span.title', 'Optional files limit:'),
				h('input', {type: 'text', value: this.limit, oninput: this.handleLimitInput}),
				h('a.set', {href: '#', onclick: this.handleLimitSetClick}, 'Set'),
				h('a.cancel', {href: '#', onclick: this.handleLimitCancelClick}, 'Cancel')
			]),
			h('a.totalbar-title', {href: '#', title: 'Space current used by optional files', onclick: this.handleTotalbarMenu},
				`Used: ${Text.formatSize(this.optional_stats.used)} / ${Text.formatSize(limit)} (${Math.round(percent_optional_downloaded)}%)`,
				h('div.icon-arrow-down')
			),
			this.menu_totalbar.render(),
			h('div.totalbar', { onmouseover: this.handleTotalbarOver, onmouseout: this.handleTotalbarOut },
				h('div.totalbar-used', {style: `width: ${percent_optional_used}%`}),
				h('div.totalbar-limitbar', {style: `width: ${percent_limit}%`}),
				h('div.totalbar-limit', {style: `margin-left: ${percent_limit}%`},
					h('span', {title: 'Space allowed to used by optional files'}, Text.formatSize(limit))
				),
				h('div.totalbar-hddfree',
					h('span', {title: 'Total free space on your storage'}, [
						Text.formatSize(this.optional_stats.free),
						h('div.arrow', { style: this.optional_stats.free > total_space_limited ? 'width: 10px' : 'width: 0px' }, ' \u25B6')
					])
				)
			)
		]);
	}

	renderSelectbar() {
		return h('div.selectbar', {classes: {visible: this.selected_files_num > 0}}, [
			'Selected:',
			h('span.info', [
				h('span.num', `${this.selected_files_num} files`),
				h('span.size', `(${Text.formatSize(this.selected_files_size)})`),
			]),
			h('div.actions', [
				this.selected_files_pinned > (this.selected_files_num / 2) ?
					h('a.action.pin.unpin', {href: '#', onclick: this.handleSelectbarUnpin}, 'UnPin')
					:
					h('a.action.pin', {href: '#', title: "Don't delete these files automatically", onclick: this.handleSelectbarPin}, 'Pin'),
				h('a.action.delete', {href: '#', onclick: this.handleSelectbarDelete}, 'Delete')
			]),
			h('a.cancel.link', {href: '#', onclick: this.handleSelectbarCancel}, 'Cancel')
		]);
	}

	updateOptionalStats() {
		return Page.cmd('optionalLimitStats', [], res => {
			this.limit = res.limit;
			if (!this.limit.endsWith('%')) {
				this.limit += ' GB';
			}
			return this.optional_stats = res;
		});
	}

	updateAllFiles() {
		this.updating_files = 0;
		let used = 0;
		Page.site_list.sites.map(site => {
			if (!site.row.settings.size_optional) {
				return;
			}
			this.updating_files += 1;
			used += site.row.settings.optional_downloaded;
			return site.files.update(() => {
				return this.updating_files -= 1;
			});
		});
		if (used !== this.optional_stats.used) {
			this.log(`Used ${Text.formatSize(this.optional_stats.used)} -> ${Text.formatSize(used)}`);
			return this.optional_stats.used = used;
		}
	}



	render() {
		let site;
		if (Page.site_list.sites && !this.need_update && (this.updating_files === 0) && (document.body.className !== 'loaded')) {
			document.body.className = 'loaded';
		}
		if (this.need_update && Page.site_list.sites.length) {
			this.updateAllFiles();
			this.need_update = false;
		}

		const sites = ((() => {
			const result = [];
			for (site of Array.from(Page.site_list.sites)) { 				if (site.row.settings.size_optional) {
				result.push(site);
			}
			}
			return result;
		})());
		let sites_favorited = ((() => {
			const result1 = [];
			for (site of Array.from(sites)) { 				if (site.favorite) {
				result1.push(site);
			}
			}
			return result1;
		})());
		let sites_connected = ((() => {
			const result2 = [];
			for (site of Array.from(sites)) { 				if (!site.favorite) {
				result2.push(site);
			}
			}
			return result2;
		})());
		if ((sites.length > 0) && (sites[0].files.loaded === false)) {
			// Sites loaded but not site files yet
			if (sites_favorited.length) {
				sites_favorited = [sites_favorited[0]];
				sites_connected = [];
			} else {
				sites_favorited = [];
				sites_connected = [sites_connected[0]];
			}
		}

		if (sites.length === 0) {
			document.body.className = 'loaded';
			return h('div#FileList',
				this.renderSelectbar(),
				this.renderTotalbar(),
				h('div.empty', [
					h('h4', 'Hello newcomer!'),
					h('small', 'You have not downloaded any optional files yet')
				])
			);
		}

		return h('div#FileList', [
			this.renderSelectbar(),
			this.renderTotalbar(),
			sites_favorited.map(site => {
				return site.renderOptionalStats();
			}),
			sites_connected.map(site => {
				return site.renderOptionalStats();
			})
		]);
	}

	onSiteInfo(site_info) {
		let rate_limit;
		if ((site_info.event != null ? site_info.event[0] : undefined) === 'peers_added') {
			return false;
		}
		if ((site_info.tasks === 0) && ((site_info.event != null ? site_info.event[0] : undefined) === 'file_done')) {
			rate_limit = 1000;
		} else {
			rate_limit = 10000;
		}
		return RateLimit(rate_limit, () => {
			return this.need_update = true;
		});
	}
}

window.FileList = FileList;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Head extends Class {
	constructor() {
		super();
		this.handleLanguageClick = this.handleLanguageClick.bind(this);
		this.renderMenuLanguage = this.renderMenuLanguage.bind(this);
		this.handleCreateSiteClick = this.handleCreateSiteClick.bind(this);
		this.handleBackupClick = this.handleBackupClick.bind(this);
		this.handleSettingsClick = this.handleSettingsClick.bind(this);
		this.handleUpdateAllClick = this.handleUpdateAllClick.bind(this);
		this.handleOrderbyClick = this.handleOrderbyClick.bind(this);
		this.handleTorClick = this.handleTorClick.bind(this);
		this.handleManageMutesClick = this.handleManageMutesClick.bind(this);
		this.handleUpdateZeronetClick = this.handleUpdateZeronetClick.bind(this);
		this.handleShutdownZeronetClick = this.handleShutdownZeronetClick.bind(this);
		this.handleModeClick = this.handleModeClick.bind(this);
		this.render = this.render.bind(this);
		this.menu_settings = new Menu();
	}

	formatUpdateInfo() {
		if (parseFloat(Page.server_info.version.replace('.', '0')) < parseFloat(Page.latest_version.replace('.', '0'))) {
			return 'New version available!';
		} else {
			return 'Up to date!';
		}
	}

	handleLanguageClick(e) {
		if (Page.server_info.rev < 1750) {
			return Page.cmd('wrapperNotification', ['info', "You need ZeroNet 0.5.1 to change the interface's language"]);
		}
		const lang = e.target.hash.replace('#', '');
		Page.cmd('configSet', ['language', lang], function() {
			Page.server_info.language = lang;
			return top.location = '?Home';
		});
		return false;
	}

	renderMenuLanguage() {
		const langs = ['da', 'de', 'en', 'es', 'fr', 'hu', 'it', 'nl', 'pl', 'pt', 'pt-br', 'ru', 'tr', 'uk', 'zh', 'zh-tw'];
		if (Page.server_info.language && !Array.from(langs).includes(Page.server_info.language)) {
			langs.push(Page.server_info.language);
		}

		return h('div.menu-radio',
			h('div', 'Language: '),
			Array.from(langs).map((lang) =>
				[
					h('a', {href: `#${lang}`, onclick: this.handleLanguageClick, classes: {selected: Page.server_info.language === lang, long: lang.length > 2}}, lang),
					' '
				])
		);
	}

	handleCreateSiteClick() {
		if (Page.server_info.rev < 1770) {
			return Page.cmd('wrapperNotification', ['info', 'You need to update your ZeroNet client to use this feature']);
		}
		return Page.cmd('siteClone', [Page.site_info.address, 'template-new']);
	}

	handleBackupClick() {
		if (Page.server_info.rev < 2165) {
			return Page.cmd('wrapperNotification', ['info', 'You need to update your ZeroNet client to use this feature']);
		}
		Page.cmd('serverShowdirectory', 'backup');
		return Page.cmd('wrapperNotification', ['info', 'Backup <b>users.json</b> file to keep your identity safe.']);
	}



	handleSettingsClick() {
		if (Page.settings.sites_orderby == null) { Page.settings.sites_orderby = 'peers'; }
		const orderby = Page.settings.sites_orderby;

		this.menu_settings.items = [];
		this.menu_settings.items.push(['Update all sites', this.handleUpdateAllClick]);
		this.menu_settings.items.push(['---']);
		this.menu_settings.items.push(['Order sites by peers', ( () => this.handleOrderbyClick('peers') ), (orderby === 'peers')]);
		this.menu_settings.items.push(['Order sites by update time', ( () => this.handleOrderbyClick('modified') ), (orderby === 'modified')]);
		this.menu_settings.items.push(['Order sites by add time', ( () => this.handleOrderbyClick('addtime') ), (orderby === 'addtime')]);
		this.menu_settings.items.push(['Order sites by size', ( () => this.handleOrderbyClick('size') ), (orderby === 'size')]);
		this.menu_settings.items.push(['---']);
		this.menu_settings.items.push([this.renderMenuLanguage(), null ]);
		this.menu_settings.items.push(['---']);
		this.menu_settings.items.push(['Create new, empty site', this.handleCreateSiteClick]);
		this.menu_settings.items.push(['---']);
		this.menu_settings.items.push([[h('span.emoji', '\uD83D\uDD07 '), 'Manage muted users'], this.handleManageMutesClick]);
		//this.menu_settings.items.push(['Show data directory', this.handleBackupClick]);
		//this.menu_settings.items.push([`Version ${Page.server_info.version} (rev${Page.server_info.rev}): ${this.formatUpdateInfo()}`, this.handleUpdateZeronetClick]);
		//this.menu_settings.items.push(['Shut down ZeroNet', this.handleShutdownZeronetClick]);
		this.menu_settings.items.push(['l0y by MagicInventor', () => window.open("https://magicinventor.xyz")]);
		if (this.menu_settings.visible) {
			this.menu_settings.hide();
		} else {
			this.menu_settings.show();
		}
		return false;
	}

	handleUpdateAllClick() {
		return (() => {
			const result = [];
			for (let site of Array.from(Page.site_list.sites)) {
				if (site.row.settings.serving) {
					result.push(Page.cmd('siteUpdate', {'address': site.row.address}));
				} else {
					result.push(undefined);
				}
			}
			return result;
		})();
	}

	handleOrderbyClick(orderby) {
		Page.settings.sites_orderby = orderby;
		Page.site_list.reorder();
		return Page.saveSettings();
	}

	handleTorClick() {
		return true;
	}

	handleManageMutesClick() {
		if (Page.server_info.rev < 1880) {
			return Page.cmd('wrapperNotification', ['info', 'You need ZeroNet 0.5.2 to use this feature.']);
		}

		Page.projector.replace($('#MuteList'), Page.mute_list.render);
		return Page.mute_list.show();
	}

	handleUpdateZeronetClick() {
		Page.cmd('wrapperConfirm', ['Update to latest development version?', `Update ZeroNet ${Page.latest_version}`], () => {
			Page.cmd('wrapperNotification', ['info', 'Updating to latest version...<br>Please restart ZeroNet manually if it does not come back in the next few minutes.', 8000]);
			Page.cmd('serverUpdate');
			return this.log('Updating...');
		});
		return false;
	}


	handleShutdownZeronetClick() {
		return Page.cmd('wrapperConfirm', ['Are you sure?', 'Shut down ZeroNet'], () => {
			return Page.cmd('serverShutdown');
		});
	}

	handleModeClick(e) {
		if (Page.server_info.rev < 1700) {
			Page.cmd('wrapperNotification', ['info', 'This feature requires ZeroNet version 0.5.0']);
		} else {
			Page.setProjectorMode(e.target.hash.replace('#', ''));
		}
		return false;
	}

	render() {
		return h('div#Head',
			h('a.settings', {href: '#Settings', onmousedown: this.handleSettingsClick, onclick: Page.returnFalse}, ['\u22EE']),
			this.menu_settings.render(),
			h('a.logo', {href: '?Home'}, [
				h('img', {src: 'assets/img/weed.png', width: 40, height: 40}),
				h('span', 'l0y')
			]),
			h('div.modes', [
				h('a.mode.sites', {href: '#Sites', classes: {active: Page.mode === 'Sites'}, onclick: this.handleModeClick}, _('Sites')),
				h('a.mode.files', {href: '#Files', classes: {active: Page.mode === 'Files'}, onclick: this.handleModeClick}, _('Files'))
			])
		);
	}
}

window.Head = Head;
/* eslint-disable
		constructor-super,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class MuteList extends Class {
	constructor() {
		super();
		this.update = this.update.bind(this);
		this.handleHideClick = this.handleHideClick.bind(this);
		this.handleMuteRemoveClick = this.handleMuteRemoveClick.bind(this);
		this.render = this.render.bind(this);
		this.show = this.show.bind(this);
		this.mutes = null;
		this.visible = false;
		Page.on_settings.then(() => {
			return this.need_update = true;
		});
		this;
	}

	update() {
		this.need_update = false;
		return Page.cmd('MuteList', [], res => {
			this.mutes = [];
			for (let auth_address in res) {
				const mute = res[auth_address];
				mute.auth_address = auth_address;
				mute.site = Page.site_list.sites_byaddress[mute.source];
				this.mutes.push(mute);
			}

			this.mutes.sort((a, b) => b.date_added - a.date_added);

			return Page.projector.scheduleRender();
		});
	}

	handleHideClick() {
		return this.visible = false;
	}

	handleMuteRemoveClick(e) {
		const { mute } = e.target;
		if (mute.removed) {
			// Re-add
			Page.cmd('muteAdd', [mute.auth_address, mute.cert_user_id, mute.reason]);
		} else {
			// Remove
			Page.cmd('muteRemove', mute.auth_address);
		}
		mute.removed = !mute.removed;
		return false;
	}

	render() {
		let max_height;
		if (this.need_update) {
			this.update();
		}
		if (!this.mutes) {
			return h('div#MuteList', {classes: {visible: false}}, 'Muted');
		}

		if (this.visible) {
			max_height = 100 + (this.mutes.length * 70);
		} else {
			max_height = 0;
		}

		return h('div#MuteList', {classes: {visible: this.visible}, style: `max-height: ${max_height}px`}, [
			h('a.mute-hide', {href: '#Hide', onclick: this.handleHideClick}, '\u2039 Back to feed'),

			this.mutes.length === 0 ?
				h('div.mute-empty', 'Your mute list is empty! :)')
				:
				[
					h('div.mute.mute-head', [
						h('div.mute-col', 'Muted user'),
						h('div.mute-col', {style: 'width: 66%'}, 'Why?')
					]),
					this.mutes.map(mute => {
						return h('div.mute', {key: mute.auth_address, classes: {removed: mute.removed}}, [
							h('div.mute-col', [
								h('div.cert_user_id', mute.cert_user_id),
								h('div.auth_address', mute.auth_address),
							]),
							h('div.mute-col', {style: 'width: 66%'}, [
								h('div.source', (mute.site != null) ? mute.site.row.content.title : mute.source),
								h('div.reason', {innerHTML: Text.renderMarked(mute.reason)}),
								h('div.date_added', ` \u2500 ${Time.since(mute.date_added)}`)
							]),
							h('a.action', {href: '#Unmute', onclick: this.handleMuteRemoveClick, mute}, '×')
						]);
					})
				]
		]);
	}

	show() {
		this.visible = true;
		this.need_update = true;
		return Page.projector.scheduleRender();
	}
}

window.MuteList = MuteList;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class SiteFiles extends Class {
	constructor(site) {
		super(site);
		this.handleSelectClick = this.handleSelectClick.bind(this);
		this.handleSelectEnd = this.handleSelectEnd.bind(this);
		this.handleSelectMousedown = this.handleSelectMousedown.bind(this);
		this.handleRowMouseenter = this.handleRowMouseenter.bind(this);
		this.handleOrderbyClick = this.handleOrderbyClick.bind(this);
		this.handleMoreClick = this.handleMoreClick.bind(this);
		this.renderOrder = this.renderOrder.bind(this);
		this.renderOrderRight = this.renderOrderRight.bind(this);
		this.render = this.render.bind(this);
		this.update = this.update.bind(this);
		this.site = site;
		this.limit = 10;
		this.selected = {};
		this.items = [];
		this.loaded = false;
		this.orderby = 'time_downloaded';
		this.orderby_desc = true;
		this.has_more = false;
	}

	handleSelectClick(e) {
		return false;
	}

	handleSelectEnd(e) {
		document.body.removeEventListener('mouseup', this.handleSelectEnd);
		return this.select_action = null;
	}

	handleSelectMousedown(e) {
		const inner_path = e.target.attributes.inner_path.value;
		if (this.selected[inner_path]) {
			delete this.selected[inner_path];
			this.select_action = 'deselect';
		} else {
			this.selected[inner_path] = true;
			this.select_action = 'select';
		}
		Page.file_list.checkSelectedFiles();
		document.body.addEventListener('mouseup', this.handleSelectEnd);
		e.stopPropagation();
		Page.projector.scheduleRender();
		return false;
	}

	handleRowMouseenter(e) {
		if (e.buttons && this.select_action) {
			const inner_path = e.target.attributes.inner_path.value;
			if (this.select_action === 'select') {
				this.selected[inner_path] = true;
			} else {
				delete this.selected[inner_path];
			}
			Page.file_list.checkSelectedFiles();
			Page.projector.scheduleRender();
		}
		return false;
	}

	handleOrderbyClick(e) {
		const orderby = e.currentTarget.attributes.orderby.value;
		if (this.orderby === orderby) {
			this.orderby_desc = !this.orderby_desc;
		}
		this.orderby = orderby;
		this.update();
		Page.projector.scheduleRender();
		return false;
	}

	handleMoreClick() {
		this.limit += 15;
		this.update();
		return false;
	}

	renderOrder(title, orderby) {
		return h('a.title.orderby', {
			href: `#${orderby}`,
			orderby,
			onclick: this.handleOrderbyClick,
			classes: {selected: this.orderby === orderby, desc: this.orderby_desc}
		}, [
			title,
			h('div.icon.icon-arrow-down')
		]);
	}

	renderOrderRight(title, orderby) {
		return h('a.title.orderby', {
			href: `#${orderby}`,
			orderby,
			onclick: this.handleOrderbyClick,
			classes: {selected: this.orderby === orderby, desc: this.orderby_desc}
		}, [
			h('div.icon.icon-arrow-down'),
			title
		]);
	}

	render() {
		if (!(this.items != null ? this.items.length : undefined)) {
			return [];
		}
		return [
			h('div.files', {exitAnimation: Animation.slideUpInout}, [
				h('div.tr.thead', [
					h('div.td.inner_path', this.renderOrder('Optional file', 'is_pinned DESC, inner_path')),
					h('div.td.size', this.renderOrderRight('Size', 'size')),
					h('div.td.peer', this.renderOrder('Peers', 'peer')),
					h('div.td.uploaded', this.renderOrder('Uploaded', 'uploaded')),
					h('div.td.added', this.renderOrder('Finished', 'time_downloaded'))
					//h("th.access", "Access")
				]),
				h('div.tbody', this.items.map(file => {
					let profile_color;
					if (file.peer >= 10) {
						profile_color = '#47d094';
					} else if (file.peer > 0) {
						profile_color = '#f5b800';
					} else {
						profile_color = '#d1d1d1';
					}
					return h('div.tr', {key: file.inner_path, inner_path: file.inner_path, exitAnimation: Animation.slideUpInout, enterAnimation: Animation.slideDown, classes: {selected: this.selected[file.inner_path]}, onmouseenter: this.handleRowMouseenter}, [
						h('div.td.inner_path',
							h('a.checkbox', {
								href: '#Select',
								onmousedown: this.handleSelectMousedown,
								onclick: this.handleSelectClick,
								inner_path: file.inner_path
							}),
							h('a.title', {href: this.site.getHref()+file.inner_path, target: '_top'}, file.inner_path),
							file.is_pinned ?
								h('span.pinned', {exitAnimation: Animation.slideUpInout, enterAnimation: Animation.slideDown}, 'Pinned') : undefined
						),
						h('div.td.size', Text.formatSize(file.size)),
						h('div.td.peer', [
							h('div.icon.icon-profile', {style: `color: ${profile_color}`}),
							h('span.num', file.peer)
						]),
						h('div.td.uploaded',
							h('div.uploaded-text', Text.formatSize(file.uploaded)),
							h('div.dots-container', [
								h('span.dots.dots-bg', {title: `Ratio: ${(file.uploaded/file.size).toFixed(1)}`}, '\u2022\u2022\u2022\u2022\u2022'),
								h('span.dots.dots-fg', {title: `Ratio: ${(file.uploaded/file.size).toFixed(1)}`, style: `width: ${Math.min(5, file.uploaded/file.size) * 9}px`}, '\u2022\u2022\u2022\u2022\u2022')
							])
						),
						h('div.td.added', file.time_downloaded ? Time.since(file.time_downloaded) : 'n/a'),
						//h("td.access", if file.time_accessed then Time.since(file.time_accessed) else "n/a")
					]);
				}))
			]),
			this.has_more ?
				h('div.more-container', h('a.more', {href: '#More', onclick: this.handleMoreClick}, 'More files...')) : undefined
		];
	}

	update(cb) {
		const orderby = this.orderby + (this.orderby_desc ? ' DESC' : '');
		return Page.cmd('optionalFileList', {address: this.site.row.address, limit: this.limit+1, orderby}, res => {
			this.items = res.slice(0, +(this.limit-1) + 1 || undefined);
			this.loaded = true;
			this.has_more = res.length > this.limit;
			Page.projector.scheduleRender();
			return (typeof cb === 'function' ? cb() : undefined);
		});
	}
}

window.SiteFiles = SiteFiles;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
		no-var,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Site extends Class {
	constructor(row, item_list) {
		super(row, item_list);
		this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
		this.handleUnfavoriteClick = this.handleUnfavoriteClick.bind(this);
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
		this.handleCheckfilesClick = this.handleCheckfilesClick.bind(this);
		this.handleResumeClick = this.handleResumeClick.bind(this);
		this.handlePauseClick = this.handlePauseClick.bind(this);
		this.handleCloneClick = this.handleCloneClick.bind(this);
		this.handleCloneUpgradeClick = this.handleCloneUpgradeClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleSettingsClick = this.handleSettingsClick.bind(this);
		this.handleHelpClick = this.handleHelpClick.bind(this);
		this.handleHelpAllClick = this.handleHelpAllClick.bind(this);
		this.handleHelpsClick = this.handleHelpsClick.bind(this);
		this.render = this.render.bind(this);
		this.renderOptionalStats = this.renderOptionalStats.bind(this);
		this.item_list = item_list;
		this.deleted = false;
		this.show_errors = false;
		this.message_visible = false;
		this.message = null;
		this.message_class = '';
		this.message_collapsed = false;
		this.message_timer = null;
		this.favorite = Page.settings.favorite_sites[row.address];
		this.key = row.address;
		this.optional_helps = [];
		this.optional_helps_disabled = {};
		this.setRow(row);
		this.files = new SiteFiles(this);
		this.menu = new Menu();
		this.menu_helps = null;
	}

	setRow(row) {
		// Message
		if (((row.event != null ? row.event[0] : undefined) === 'updated') && (row.content_updated !== false)) {
			this.setMessage('Updated!', 'done');
		} else if ((row.event != null ? row.event[0] : undefined) === 'updating') {
			this.setMessage('Updating...');
		} else if (row.tasks > 0) {
			this.setMessage(`Updating: ${Math.max(row.tasks, row.bad_files)} left`);
		} else if (row.bad_files > 0) {
			this.setMessage(row.bad_files+' file update failed', 'error');
		} else if (row.content_updated === false) {
			if (row.peers <= 1) {
				this.setMessage('No peers', 'error');
			} else {
				this.setMessage('Update failed', 'error');
			}
		} else if ((row.tasks === 0) && ((this.row != null ? this.row.tasks : undefined) > 0)) {
			this.setMessage('Updated!', 'done');
		}

		if ((row.body == null)) {
			row.body = '';
		}

		this.optional_helps = ((() => {
			const result = [];
			for (let key in row.settings.optional_help) {
				const val = row.settings.optional_help[key];
				result.push([key, val]);
			}
			return result;
		})());

		return this.row = row;
	}

	setMessage(message, message_class) {
		// Set message
		if (message_class == null) { message_class = ''; }
		this.message_class = message_class;
		if (message) {
			this.message = message;
			this.message_visible = true;
			if ((this.message_class === 'error') && !this.show_errors) {
				this.message_collapsed = true;
			} else {
				this.message_collapsed = false;
			}

		} else {
			this.message_visible = false;
		}

		// Hide done message after 3 seconds
		clearInterval(this.message_timer);
		if (this.message_class === 'done') {
			this.message_timer = setTimeout((() => {
				return this.setMessage('');
			}
			), 5000);
		}
		return Page.projector.scheduleRender();
	}

	isWorking() {
		return (this.row.tasks > 0) || ((this.row.event != null ? this.row.event[0] : undefined) === 'updating');
	}


	handleFavoriteClick() {
		this.favorite = true;
		this.menu = new Menu();
		Page.settings.favorite_sites[this.row.address] = true;
		Page.saveSettings();
		Page.site_list.reorder();
		return false;
	}

	handleUnfavoriteClick() {
		this.favorite = false;
		this.menu = new Menu();
		delete Page.settings.favorite_sites[this.row.address];
		Page.saveSettings();
		Page.site_list.reorder();
		return false;
	}

	handleUpdateClick() {
		Page.cmd('siteUpdate', {'address': this.row.address});
		this.show_errors = true;
		return false;
	}

	handleCheckfilesClick() {
		Page.cmd('siteUpdate', {'address': this.row.address, 'check_files': true, since: 0});
		this.show_errors = true;
		return false;
	}

	handleResumeClick() {
		Page.cmd('siteResume', {'address': this.row.address});
		return false;
	}

	handlePauseClick() {
		Page.cmd('sitePause', {'address': this.row.address});
		return false;
	}

	handleCloneClick() {
		Page.cmd('siteClone', {'address': this.row.address});
		return false;
	}

	handleCloneUpgradeClick() {
		Page.cmd('wrapperConfirm', [`Are you sure?${` Any modifications you made on<br><b>${this.row.content.title}</b> site's js/css files will be lost.`}`, 'Upgrade'], confirmed => {
			return Page.cmd('siteClone', {'address': this.row.content.cloned_from, 'root_inner_path': this.row.content.clone_root, 'target_address': this.row.address});
		});
		return false;
	}

	handleDeleteClick() {
		if (this.row.settings.own) {
			Page.cmd('wrapperNotification', ['error', "Sorry, you can't delete your own site.<br>Please remove the directory manually."]);
		} else {
			if (Page.server_info.rev > 2060) {
				Page.cmd('wrapperConfirm', [`Are you sure?${` <b>${this.row.content.title}</b>`}`, ['Delete', 'Blacklist']], confirmed => {
					if (confirmed === 1) {
						Page.cmd('siteDelete', {'address': this.row.address});
						this.item_list.deleteItem(this);
						return Page.projector.scheduleRender();
					} else if (confirmed === 2) {
						return Page.cmd('wrapperPrompt', [`Blacklist <b>${this.row.content.title}</b>`, 'text', 'Delete and Blacklist', 'Reason'], reason => {
							Page.cmd('siteDelete', {'address': this.row.address});
							Page.cmd('blacklistAdd', [this.row.address, reason]);
							this.item_list.deleteItem(this);
							return Page.projector.scheduleRender();
						});
					}
				});
			} else {
				Page.cmd('wrapperConfirm', [`Are you sure?${` <b>${this.row.content.title}</b>`}`, 'Delete'], confirmed => {
					if (confirmed) {
						Page.cmd('siteDelete', {'address': this.row.address});
						this.item_list.deleteItem(this);
						return Page.projector.scheduleRender();
					}
				});
			}
		}
		return false;
	}

	handleSettingsClick(e) {
		this.menu.items = [];
		if (this.favorite) {
			this.menu.items.push(['Unfavorite', this.handleUnfavoriteClick]);
		} else {
			this.menu.items.push(['Favorite', this.handleFavoriteClick]);
		}
		this.menu.items.push(['Update', this.handleUpdateClick]);
		this.menu.items.push(['Check files', this.handleCheckfilesClick]);
		if (this.row.settings.serving) {
			this.menu.items.push(['Pause', this.handlePauseClick]);
		} else {
			this.menu.items.push(['Resume', this.handleResumeClick]);
		}
		if (this.row.content.cloneable === true) {
			this.menu.items.push(['Clone', this.handleCloneClick]);
		}
		if (this.row.settings.own && this.row.content.cloned_from && (Page.server_info.rev >= 2080)) {
			this.menu.items.push(['---']);
			this.menu.items.push(['Upgrade code', this.handleCloneUpgradeClick]);
		}
		this.menu.items.push(['---']);
		this.menu.items.push(['Delete', this.handleDeleteClick]);

		if (this.menu.visible) {
			this.menu.hide();
		} else {
			this.menu.show();
		}
		return false;
	}

	handleHelpClick(directory, title) {
		if (this.optional_helps_disabled[directory]) {
			Page.cmd('OptionalHelp', [directory, title, this.row.address]);
			delete this.optional_helps_disabled[directory];
		} else {
			Page.cmd('OptionalHelpRemove', [directory, this.row.address]);
			this.optional_helps_disabled[directory] = true;
		}
		return true;
	}

	handleHelpAllClick() {
		if (this.row.settings.autodownloadoptional === true) {
			return Page.cmd('OptionalHelpAll', [false, this.row.address], () => {
				this.row.settings.autodownloadoptional = false;
				return Page.projector.scheduleRender();
			});
		} else {
			return Page.cmd('OptionalHelpAll', [true, this.row.address], () => {
				this.row.settings.autodownloadoptional = true;
				return Page.projector.scheduleRender();
			});
		}
	}

	handleHelpsClick(e) {
		if (e.target.classList.contains('menu-item')) {
			return;
		}
		if (!this.menu_helps) {
			this.menu_helps = new Menu();
		}

		this.menu_helps.items = [];
		this.menu_helps.items.push(['Help distribute all new files', this.handleHelpAllClick, ( () => { return this.row.settings.autodownloadoptional; })]);
		if (this.optional_helps.length > 0) {
			this.menu_helps.items.push(['---']);
		}
		for (var [directory, title] of Array.from(this.optional_helps)) {
			this.menu_helps.items.push([title, ( () => this.handleHelpClick(directory, title) ), ( () => { return !this.optional_helps_disabled[directory]; } )]);
		}

		this.menu_helps.toggle();

		return true;
	}

	getHref() {
		let href;
		const has_plugin = ((Page.server_info != null ? Page.server_info.plugins : undefined) != null) && (Array.from(Page.server_info.plugins).includes('Zeroname') || Array.from(Page.server_info.plugins).includes('Dnschain') || Array.from(Page.server_info.plugins).includes('Zeroname-local'));
		if (has_plugin && (this.row.content != null ? this.row.content.domain : undefined)) { // Domain
			href = Text.getSiteUrl(this.row.content.domain);
		} else { // Address
			href = Text.getSiteUrl(this.row.address);
		}
		return href;
	}


	render() {
		const now = Date.now()/1000;
		return h('div.site', {
			key: this.key, 'data-key': this.key,
			classes: {
				'modified-lastday': (now - this.row.settings.modified) < (60*60*24),
				'disabled': !this.row.settings.serving && !this.row.demo,
				'working': this.isWorking()
			}
		},
		h('div.circle', {style: `color: ${Text.toColor(this.row.address, 40, 50)}`}, ['\u2022']),
		h('a.inner', {href: this.getHref(), title: (this.row.content.title != null ? this.row.content.title.length : undefined) > 20 ? this.row.content.title : undefined}, [
			h('span.title', [this.row.content.title]),
			h('div.details', [
				h('span.modified', [
					h('div.icon-clock'),
					Page.settings.sites_orderby === 'size' ?
						h('span.value', [((this.row.settings.size/1024/1024) + ((this.row.settings.size_optional != null)/1024/1024)).toFixed(1), 'MB'])
						:
						h('span.value', [Time.since(this.row.settings.modified)])
				]),
				h('span.peers', [
					h('div.icon-profile'),
					h('span.value', [Math.max((this.row.settings.peers ? this.row.settings.peers : 0), this.row.peers)])
				])
			]),
			this.row.demo ?
				h('div.details.demo', 'Activate \u00BB') : undefined,
			h('div.message',
				{classes: {visible: this.message_visible, done: this.message_class === 'done', error: this.message_class === 'error', collapsed: this.message_collapsed}},
				[this.message]
			)
		]),
		h('a.settings', {href: '#', onmousedown: this.handleSettingsClick, onclick: Page.returnFalse}, ['\u22EE']),
		this.menu.render()
		);
	}

	renderCircle(value, max) {
		let dashoffset;
		if (value < 1) {
			dashoffset = 75+((1-value)*75);
		} else {
			dashoffset = Math.max(0, 75-(((value-1)/9)*75));
		}
		const stroke = `hsl(${Math.min(555, value*50)}, 100%, 61%)`;
		return h('div.circle', {title: 'Upload/Download ratio', innerHTML: `\
<svg class="circle-svg" width="30" height="30" viewPort="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<circle r="12" cx="15" cy="15" fill="transparent" class='circle-bg'></circle>
				<circle r="12" cx="15" cy="15" fill="transparent" class='circle-fg' style='stroke-dashoffset: ${dashoffset}; stroke: ${stroke}'></circle>
</svg>\
`});
	}

	renderOptionalStats() {
		const { row } = this;
		let ratio = (row.settings.bytes_sent/row.settings.bytes_recv).toFixed(1);
		if (ratio >= 100) {
			ratio = '\u221E';
		} else if (ratio >= 10) {
			ratio = (row.settings.bytes_sent/row.settings.bytes_recv).toFixed(0);
		}
		const ratio_hue = Math.min(555, (row.settings.bytes_sent/row.settings.bytes_recv)*50);
		return h('div.site', {key: this.key}, [
			h('div.title', [
				h('h3.name', h('a', {href: this.getHref()}, row.content.title)),
				h('div.size', {title: `Site size limit: ${Text.formatSize(row.size_limit*1024*1024)}`}, [
					`${Text.formatSize(row.settings.size)}`,
					h('div.bar', h('div.bar-active', {style: `width: ${100*(row.settings.size/(row.size_limit*1024*1024))}%`}))
				]),
				h('div.plus', '+'),
				h('div.size.size-optional', {title: `Optional files on site: ${Text.formatSize(row.settings.size_optional)}`}, [
					`${Text.formatSize(row.settings.optional_downloaded)}`,
					h('span.size-title', 'Optional'),
					h('div.bar', h('div.bar-active', {style: `width: ${100*(row.settings.optional_downloaded/row.settings.size_optional)}%`}))
				]),
				h('a.helps', {href: '#', onmousedown: this.handleHelpsClick, onclick: Page.returnFalse},
					h('div.icon-share'),
					this.row.settings.autodownloadoptional ? '\u2661' : this.optional_helps.length,
					h('div.icon-arrow-down'),
					this.menu_helps ? this.menu_helps.render() : undefined
				),
				this.renderCircle(parseFloat((row.settings.bytes_sent/row.settings.bytes_recv).toFixed(1)), 10),
				h('div.circle-value', {classes: {negative: ratio < 1}, style: `color: hsl(${ratio_hue}, 70%, 60%)`}, ratio),
				h('div.transfers', [
					h('div.up', {'title': 'Uploaded'}, `\u22F0 \u00A0${Text.formatSize(row.settings.bytes_sent)}`),
					h('div.down', {'title': 'Downloaded'}, `\u22F1 \u00A0${Text.formatSize(row.settings.bytes_recv)}`)
				])
			]),
			this.files.render()
		]);
	}
}


window.Site = Site;
/* eslint-disable
		constructor-super,
		max-len,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class SiteList extends Class {
	constructor() {
		super();
		this.reorderTimer = this.reorderTimer.bind(this);
		this.sortRows = this.sortRows.bind(this);
		this.reorder = this.reorder.bind(this);
		this.renderMergedSites = this.renderMergedSites.bind(this);
		this.render = this.render.bind(this);
		this.onSiteInfo = this.onSiteInfo.bind(this);
		this.item_list = new ItemList(Site, 'address');
		this.sites = this.item_list.items;
		this.sites_byaddress = this.item_list.items_bykey;
		this.inactive_demo_sites = null;
		this.loaded = false;
		this.schedule_reorder = false;
		this.merged_db = {};
		setInterval(this.reorderTimer, 10000);

		Page.on_settings.then(() => {
			this.update();
			return Page.cmd('channelJoinAllsite', {'channel': 'siteChanged'});
		});
	}

	reorderTimer() {
		if (!this.schedule_reorder) {
			return;
		}

		// Don't reorder if user if over site list or any of the sites are updating
		if (!document.querySelector('.left:hover') && !document.querySelector('.working')) {
			this.reorder();
			return this.schedule_reorder = false;
		}
	}

	sortRows(rows) {
		if (Page.settings.sites_orderby === 'modified') {
			rows.sort((a, b) => b.row.settings.modified - a.row.settings.modified);
		} else if (Page.settings.sites_orderby === 'addtime') {
			rows.sort((a, b) => (b.row.settings.added || 0) - (a.row.settings.added || 0));
		} else if (Page.settings.sites_orderby === 'size') {
			rows.sort((a, b) => b.row.settings.size - a.row.settings.size);
		} else {
			rows.sort((a, b) => Math.max(b.row.peers, b.row.settings.peers) - Math.max(a.row.peers, a.row.settings.peers));
		}
		return rows;
	}

	reorder() {
		this.sortRows(this.item_list.items);
		return Page.projector.scheduleRender();
	}

	update() {
		Page.cmd('siteList', {}, site_rows => {
			const { favorite_sites } = Page.settings;

			this.item_list.sync(site_rows);

			this.sortRows(this.item_list.items);

			if (this.inactive_demo_sites === null) {
				this.updateInactiveDemoSites();
			}
			Page.projector.scheduleRender();
			return this.loaded = true;
		});
		return this;
	}

	updateInactiveDemoSites() {
		const demo_site_rows = [
			{address: '1Gfey7wVXXg1rxk751TBTxLJwhddDNfcdp', demo: true, content: {title: 'ZeroBoard', domain: 'Board.ZeroNetwork.bit'}, settings: {}},
			{address: '1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT', demo: true, content: {title: 'ZeroTalk', domain: 'Talk.ZeroNetwork.bit'}, settings: {}},
			{address: '1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8', demo: true, content: {title: 'ZeroBlog', domain: 'Blog.ZeroNetwork.bit'}, settings: {}},
			{address: '1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27', demo: true, content: {title: 'ZeroMail', domain: 'Mail.ZeroNetwork.bit'}, settings: {}},
			{address: '1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h', demo: true, content: {title: 'GIF Time'}, settings: {}},
			{address: '1SiTEs2D3rCBxeMoLHXei2UYqFcxctdwBa', demo: true, content: {title: 'More @ ZeroSites', domain: 'Sites.ZeroNetwork.bit'}, settings: {}}
		];
		if (Page.server_info.rev >= 1400) {
			demo_site_rows.push({address: '1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH', demo: true, content: {title: 'ZeroMe', domain: 'Me.ZeroNetwork.bit'}, settings: {}});
		}

		this.inactive_demo_sites = [];
		return (() => {
			const result = [];
			for (let site_row of Array.from(demo_site_rows)) {
				if (!this.sites_byaddress[site_row.address]) {
					result.push(this.inactive_demo_sites.push(new Site(site_row)));
				} else {
					result.push(undefined);
				}
			}
			return result;
		})();
	}

	renderMergedSites() {
		const merged_db = {};
		for (let site of Array.from(this.sites_merged)) {
			if (!site.row.content.merged_type) {
				continue;
			}
			if (merged_db[site.row.content.merged_type] == null) { merged_db[site.row.content.merged_type] = []; }
			merged_db[site.row.content.merged_type].push(site);
		}

		const back = [];
		for (let merged_type in merged_db) {
			const merged_sites = merged_db[merged_type];
			back.push([
				h('h2.more', {key: `Merged: ${merged_type}`}, `Merged: ${merged_type}`),
				h(`div.SiteList.merged.merged-${merged_type}`, merged_sites.map(item => item.render()))
			]);
		}
		return back;
	}

	render() {
		if (!this.loaded) {
			return h('div#SiteList');
		}

		this.sites_needaction = [];
		this.sites_favorited = [];
		this.sites_owned = [];
		this.sites_connected = [];
		this.sites_merged = [];

		for (let site of Array.from(this.sites)) {
			if ((site.row.settings.size * 1.2) > (site.row.size_limit * 1024 * 1024)) {
				this.sites_needaction.push(site);
			} else if (site.favorite) {
				this.sites_favorited.push(site);
			} else if (site.row.content.merged_type) {
				this.sites_merged.push(site);
			} else if ((site.row.settings != null ? site.row.settings.own : undefined)) {
				this.sites_owned.push(site);
			} else {
				this.sites_connected.push(site);
			}
		}

		return h('div#SiteList', [
			this.sites_needaction.length > 0 ? h('h2.needaction', 'Running out of size limit') : undefined,
			h('div.SiteList.needaction', this.sites_needaction.map(item => item.render())),
			this.sites_favorited.length > 0 ? h('h2.favorited', 'Favorited sites') : undefined,
			h('div.SiteList.favorited', this.sites_favorited.map(item => item.render())),
			this.sites_owned.length > 0 ? h('h2.owned', 'Owned sites') : undefined,
			h('div.SiteList.owned', this.sites_owned.map(item => item.render())),
			h('h2.connected', 'Connected sites'),
			h('div.SiteList.connected', this.sites_connected.map(item => item.render())),
			this.renderMergedSites(),
			(this.inactive_demo_sites !== null) && (this.inactive_demo_sites.length > 0) ?
				[
					h('h2.more', {key: 'More'}, 'More sites'),
					h('div.SiteList.more', this.inactive_demo_sites.map(item => item.render()))
				] : undefined
		]);
	}


	onSiteInfo(site_info) {
		if (this.item_list.items_bykey[site_info.address] != null) {
			this.item_list.items_bykey[site_info.address].setRow(site_info);
		}
		this.schedule_reorder = true;
		return Page.projector.scheduleRender();
	}
}


window.SiteList = SiteList;
/* eslint-disable
		constructor-super,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Trigger extends Class {
	constructor() {
		super();
		this.handleTitleClick = this.handleTitleClick.bind(this);
		this.render = this.render.bind(this);
		this.active = false;
	}

	handleTitleClick() {
		this.active = !this.active;
		if (this.active) {
			document.getElementById('left').classList.add('trigger-on');
		} else {
			document.getElementById('left').classList.remove('trigger-on');
		}

		return false;
	}

	render() {
		return h('div.Trigger', {classes: { 'active': this.active }}, [
			h('a.icon', {'href': '#Trigger', onclick: this.handleTitleClick, ontouchend: ''}, h('div.arrow-right'))
		]);
	}
}
window.Trigger = Trigger;
/* eslint-disable
		constructor-super,
		no-constant-condition,
		no-mixed-spaces-and-tabs,
		no-this-before-super,
		no-undef,
		no-unused-vars,
		valid-typeof,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.h = maquette.h;

class ZeroHello extends ZeroFrame {
	constructor(...args) {
		super(...args);
		this.onOpenWebsocket = this.onOpenWebsocket.bind(this);
		this.reloadSiteInfo = this.reloadSiteInfo.bind(this);
		this.reloadServerInfo = this.reloadServerInfo.bind(this);

	}

	init() {
		this.params = {};
		this.site_info = null;
		this.server_info = null;
		this.address = null;

		this.on_site_info = new Promise();
		this.on_settings = new Promise();
		this.settings = null;

		this.latest_version = '0.5.7';
		this.mode = 'Sites';
		this.change_timer = null;
		return document.body.id = `Page${this.mode}`;
	}

	setProjectorMode(mode) {
		this.log('setProjectorMode', mode);
		if (mode === 'Sites') {
			try {
				this.projector.detach(this.file_list.render);
			} catch (error) {
				this;
			}
			this.projector.replace($('#the-body'), this.feed_list.render);
			this.projector.replace($('#SiteList'), this.site_list.render);
		} else if (mode === 'Files') {
			try {
				this.projector.detach(this.feed_list.render);
				this.projector.detach(this.site_list.render);
			} catch (error1) {
				this;
			}
			this.projector.replace($('#FileList'), this.file_list.render);
		}
		if (this.mode !== mode) {
			this.mode = mode;
			return setTimeout(( function() {
				// Delayed to avoid loosing anmation because of dom re-creation
				document.body.id = `Page${mode}`;

				if (this.change_timer) {
					clearInterval(this.change_timer);
				}
				document.body.classList.add('changing');
				return this.change_timer = setTimeout(( () => document.body.classList.remove('changing')), 400);

			}), 60);
		}
	}


	createProjector() {
		this.projector = maquette.createProjector();	// Dummy, will set later
		this.projectors = {};

		this.site_list = new SiteList();
		this.feed_list = new FeedList();
		this.file_list = new FileList();
		this.head = new Head();
		this.dashboard = new Dashboard();
		this.mute_list = new MuteList();
		this.trigger = new Trigger();

		this.route('');

		this.loadSettings();
		this.on_site_info.then(() => {
			this.projector.replace($('#Head'), this.head.render);
			this.projector.replace($('#Dashboard'), this.dashboard.render);
			this.projector.merge($('#Trigger'), this.trigger.render);
			return this.setProjectorMode(this.mode);
		});

		// Update every minute to keep time since fields up-to date
		return setInterval(( () => Page.projector.scheduleRender()), 60*1000);
	}


	// Route site urls
	route(query) {
		this.params = Text.parseQuery(query);
		return this.log('Route', this.params);
	}

	// Add/remove/change parameter to current site url
	createUrl(key, val) {
		const params = JSON.parse(JSON.stringify(this.params));	// Clone
		if (typeof key === 'Object') {
			const vals = key;
			for (key in keys) {
				val = keys[key];
				params[key] = val;
			}
		} else {
			params[key] = val;
		}
		return `?${Text.encodeQuery(params)}`;
	}

	setUrl(url, mode) {
		if (mode == null) { mode = 'push'; }
		url = url.replace(/.*?\?/, '');
		this.log('setUrl', this.history_state['url'], '->', url);
		if (this.history_state['url'] === url) {
			this.content.update();
			return false;
		}
		this.history_state['url'] = url;
		if (mode === 'replace') {
			this.cmd('wrapperReplaceState', [this.history_state, '', url]);
		} else {
			this.cmd('wrapperPushState', [this.history_state, '', url]);
		}
		this.route(url);
		return false;
	}

	loadSettings() {
		return this.on_site_info.then(() => {
			return this.cmd('userGetSettings', [], res => {
				if (!res || res.error) {
					return this.loadLocalStorage();
				} else {
					this.settings = res;
					if (this.settings.sites_orderby == null) { this.settings.sites_orderby = 'peers'; }
					if (this.settings.favorite_sites == null) { this.settings.favorite_sites = {}; }
					return this.on_settings.resolve(this.settings);
				}
			});
		});
	}

	loadLocalStorage() {
		return this.cmd('wrapperGetLocalStorage', [], settings => {
			this.settings = settings;
			this.log('Loaded localstorage');
			if (this.settings == null) { this.settings = {}; }
			if (this.settings.sites_orderby == null) { this.settings.sites_orderby = 'peers'; }
			if (this.settings.favorite_sites == null) { this.settings.favorite_sites = {}; }
			return this.on_settings.resolve(this.settings);
		});
	}

	saveSettings(cb) {
		if (this.settings) {
			if (Page.server_info.rev > 2140) {
				return this.cmd('userSetSettings', [this.settings], res => {
					if (cb) { return cb(res); }
				});
			} else {
				return this.cmd('wrapperSetLocalStorage', this.settings, res => {
					if (cb) { return cb(res); }
				});
			}
		}
	}


	onOpenWebsocket(e) {
		this.reloadSiteInfo();
		return this.reloadServerInfo();
	}

	reloadSiteInfo() {
		return this.cmd('siteInfo', {}, site_info => {
			this.address = site_info.address;
			return this.setSiteInfo(site_info);
		});
	}

	reloadServerInfo() {
		return this.cmd('serverInfo', {}, server_info => {
			return this.setServerInfo(server_info);
		});
	}

	// Parse incoming requests from UiWebsocket server
	onRequest(cmd, params) {
		if (cmd === 'setSiteInfo') { // Site updated
			return this.setSiteInfo(params);
		} else {
			return this.log('Unknown command', params);
		}
	}

	setSiteInfo(site_info) {
		if (site_info.address === this.address) {
			this.site_info = site_info;
		}
		this.site_list.onSiteInfo(site_info);
		this.feed_list.onSiteInfo(site_info);
		this.file_list.onSiteInfo(site_info);
		return this.on_site_info.resolve();
	}

	setServerInfo(server_info) {
		this.server_info = server_info;
		return this.projector.scheduleRender();
	}

	// Simple return false to avoid link clicks
	returnFalse() {
		return false;
	}
}

window.Page = new ZeroHello();
window.Page.createProjector();
