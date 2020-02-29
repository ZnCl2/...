const NAME = 'markdown';

const deps = [
	'deps/marked.min.js',
	'deps/highlight.pack.js',
	'deps/highlight-dark.css',
	'deps/style.css'
];
let loadedDeps = [];
const loadDep = function(depPath, depType, depCode) {
	if (depType === 'js') {
		importScripts(depCode);
	}
	loadedDeps.push(depPath);

	let finished = true;
	for (let i = 0; i < deps.length; i++) {
		let d = deps[i];
		if (loadedDeps.indexOf(d) === -1) {
			finished = false;
			break;
		}
	}
	return finished;
};

var hljs, marked, markedR;

const init = () => {
	hljs.initHighlightingOnLoad();

	marked.setOptions({
		gfm: true,
		xhtml: true,
		breaks: true,
		sanitize: true, // THIS IS OUTDATED!!
		smartLists: true,
		smartypants: true,
		highlight: code => {
			console.log('Highlighting >> ', code);
			return hljs.highlightAuto(code).value;
		}
	});

	markedR = new marked.Renderer();

	// markedR.text = (text) => {
	//     return '<span class="text">' + text + '</span>';
	// };

	markedR.link = (href, title, text) => {
		href = href || '';
		title = title || '';
		text = text || '';

		if (markedR.options.sanitize) {
			let prot = null;
			try {
				prot = decodeURIComponent(unescape(href))
					.replace(/[^\w:]/g, '')
					.toLowerCase();
			} catch (e) {
				return '';
			}
			if (
				prot.indexOf('javascript:') === 0 ||
				prot.indexOf('vbscript:') === 0 ||
				prot.indexOf('data:') === 0
			) {
				return '';
			}
		}

		return (
			'<a href="' +
			href +
			'" target="_blank" ' +
			(title ? 'title="' + title + '"' : '') +
			'>' +
			text +
			'</a>'
		);
	};

	markedR.image = (href, title, text) => {
		href = href || '';
		title = title || '';
		text = text || '';

		return (
			'<div class="image hovershadow" ' +
			(title
				? 'title="' + title + '"'
				: text
				? 'title="' + text + '"'
				: '') +
			'><img src="' +
			href +
			'" alt="' +
			text +
			'" class="img-responsive" ' +
			(title
				? 'title="' + title + '"'
				: text
				? 'title="' + text + '"'
				: '') +
			(markedR.options.xhtml ? '/>' : '>') +
			(title
				? '<p class="image-desc">' + title + '</p>'
				: text
				? '<p class="image-desc">' + text + '</p>'
				: '') +
			'</div>'
		);
	};
};

onmessage = e => {
	let data = e.data;
	console.log(NAME, 'received from main', data);
	if (typeof data === 'string') {
		if (data === 'registered') {
			for (let depI = 0; depI < deps.length; depI++) {
				let depPath = deps[depI];
				let depType = depPath.substring(depPath.lastIndexOf('.') + 1);
				console.log(NAME, 'getting depCode', depPath, depType);
				postMessage({
					getDepCode: {
						depPath,
						depType
					}
				});
			}
			postMessage({
				declareFunctionalities: ['renderMsgBody']
			});
		}
	} else if (typeof data === 'object') {
		if (
			data.hasOwnProperty('depPath') &&
			data.hasOwnProperty('depType') &&
			data.hasOwnProperty('depCode')
		) {
			let finished = loadDep(data.depPath, data.depType, data.depCode);

			if (finished) {
				init();
				postMessage({
					ready: true
				});
			}
		}
		if (data.hasOwnProperty('renderMsgBody')) {
			let msgbody = data.renderMsgBody.msgbody;
			// let msg = data.renderMsgBody.msg;

			let rmsgbody = marked(msgbody, {
				renderer: markedR
			});

			postMessage({
				renderMsgBody: rmsgbody,
				resolveId: data.resolveId
			});
		}
	}
};
