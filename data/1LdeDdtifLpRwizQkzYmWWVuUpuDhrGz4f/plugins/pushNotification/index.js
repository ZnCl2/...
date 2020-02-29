const NAME = 'pushNotification';

const createNotification = (conversation, msg) => {
	postMessage({
		displayNotification: {
			// showAlways: true,
			title: conversation.name + ' (' + conversation.providerName + ')',
			options: {
				body:
					(msg.userName || msg.userId) +
					': ' +
					decodeURIComponent(msg.body)
			}
		}
	});
};

onmessage = e => {
	let data = e.data;
	console.log(NAME, 'received from main', data);
	if (typeof data === 'string') {
		if (data === 'registered') {
			postMessage({
				ready: true,
				declareFunctionalities: ['newMsg', 'displayNotification']
			});
		}
	} else if (typeof data === 'object') {
		if (data.hasOwnProperty('newMsg')) {
			const user = data.newMsg.curUser;
			const conversation = data.newMsg.conversation;
			const msg = data.newMsg.msg;

			if (msg.userId !== user.userId) {
				createNotification(conversation, msg);
			}
		}
	}
};
