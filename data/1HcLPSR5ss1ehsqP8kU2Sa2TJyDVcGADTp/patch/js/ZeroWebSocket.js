class ZeroWebsocket {
	constructor(url) {
		this.url = url;
		this.next_message_id = 10000000;
		this.waiting_cb = {};
	}

	connect(isReconnect) {
		this.connected = false;
		this.message_queue = [];
		this.isReconnect = isReconnect;
		this.ws = new WebSocket(this.url);
		this.ws.onmessage = this.onMessage.bind(this);
		this.ws.onopen = this.onOpenWebsocket.bind(this);
		this.ws.onclose = this.onCloseWebsocket.bind(this);
	}

	onMessage(e) {
		let message = JSON.parse(e.data);
		let cmd = message.cmd;
		if(cmd == "response") {
			if(this.waiting_cb[message.to]) {
				this.waiting_cb[message.to](message.result);
			}
		} else if(cmd == "ping") {
			this.response(message.id, "pong");
		}
	}

	response(to, result) {
		this.send({cmd: "response", to: to, result: result});
	}

	cmd(cmd, params={}, cb=null) {
		this.send({cmd: cmd, params: params}, cb);
	}


	send(message, cb=null) {
		if(!message.id) {
			message.id = this.next_message_id++;
		}
		if(this.connected) {
			this.ws.send(JSON.stringify(message));
		} else {
			this.message_queue.push(message);
		}
		if(cb) {
			this.waiting_cb[message.id] = cb;
		}
	}

	onOpenWebsocket(e) {
		this.connected = true;
		if(this.onOpen) {
			this.onOpen();
			delete this.onOpen;
		}

		// Process messages sent before websocket opened
		for(let message of this.message_queue) {
			this.ws.send(JSON.stringify(message));
		}
		this.message_queue = [];
	}

	onCloseWebsocket(e, reconnect=500) {
		this.connected = false;
		if(!e || e.code != 1000 || !e.wasClean) {
			// Connection error
			setTimeout(() => {
				this.connect(true);
			}, reconnect);
		}
	}
}

window.ZeroWebsocket = ZeroWebsocket;