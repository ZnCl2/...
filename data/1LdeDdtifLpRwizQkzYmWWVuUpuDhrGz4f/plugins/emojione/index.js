const NAME = 'emojione';

/**
 * Using [EmojiOne](https://github.com/joypixels/emojione)
 */

const deps = ['deps/emojione.min.js', 'deps/style.css'];
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

var emojione;

const init = () => {
	emojione.emojiSize = '64';
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

			let rmsgbody = emojione.toImage(msgbody);

			postMessage({
				renderMsgBody: rmsgbody,
				resolveId: data.resolveId
			});
		}
	}
};
