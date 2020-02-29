const NAME = 'defaultPack';

let plugins = ['markdown', 'emojione', 'tempsaveMsginput', 'pushNotification'];

onmessage = e => {
	let data = e.data;
	console.log(NAME, 'received from main', data);
	if (typeof data === 'string') {
		if (data === 'registered') {
			postMessage({
				ready: true,
				declareFunctionalities: ['install']
			});
			for (let pluginI = 0; pluginI < plugins.length; pluginI++) {
				let pluginName = plugins[pluginI];
				postMessage({
					install: pluginName
				});
			}
		}
	}
};
