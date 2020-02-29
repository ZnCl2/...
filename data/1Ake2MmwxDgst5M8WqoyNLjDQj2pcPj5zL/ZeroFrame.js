'use strict';

var CMD_INNER_READY = 'innerReady'
var CMD_RESPONSE = 'response'
var CMD_WRAPPER_READY = 'wrapperReady'
var CMD_PING = 'ping'
var CMD_PONG = 'pong'
var CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
var CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

function ZeroFrame(url) {
	this.url = url
	this.waiting_cb = {}
	this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1")
	this.connect()
	this.next_message_id = 1
	this.init()
}

ZeroFrame.prototype.init = function init() {
	return this
}

ZeroFrame.prototype.connect = function connect() {
	var _this = this
	this.target = window.parent
	window.addEventListener('message', function (e) {
		return _this.onMessage(e)
	}, false)
	this.cmd(CMD_INNER_READY)
}

ZeroFrame.prototype.onMessage = function onMessage(e) {
	var message = e.data
	var cmd = message.cmd
	if (cmd === CMD_RESPONSE) {
		if (this.waiting_cb[message.to] !== undefined) {
			this.waiting_cb[message.to](message.result)
		} else {
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

ZeroFrame.prototype.onRequest = function onRequest(cmd, message) {
	this.log("Unknown request", message)
}

ZeroFrame.prototype.response = function response(to, result) {
	this.send({
		cmd: CMD_RESPONSE,
		to: to,
		result: result
	})
}

ZeroFrame.prototype.cmd = function cmd(_cmd, params, cb) {
	if (params === void 0) {
		params = {}
	}
	if (cb === void 0) {
		cb = null
	}
	this.send({
		cmd: _cmd,
		params: params
	}, cb)
}

ZeroFrame.prototype.cmdp = function cmdp(cmd, params) {
	var _this2 = this
	if (params === void 0) {
		params = {}
	}
	return new Promise(function (resolve, reject) {
		_this2.cmd(cmd, params, function (res) {
			if (res && res.error) {
				reject(res.error)
			} else {
				resolve(res)
			}
		})
	})
}

ZeroFrame.prototype.send = function send(message, cb) {
	if (cb === void 0) {
		cb = null
	}
	message.wrapper_nonce = this.wrapper_nonce
	message.id = this.next_message_id
	this.next_message_id++
	this.target.postMessage(message, '*')
	if (cb) {
		this.waiting_cb[message.id] = cb
	}
}

ZeroFrame.prototype.log = function log() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key]
	}
	console.log.apply(console, ['[ZeroFrame]'].concat(args))
}

ZeroFrame.prototype.onOpenWebsocket = function onOpenWebsocket() {
	this.log('Websocket open')
}

ZeroFrame.prototype.onCloseWebsocket = function onCloseWebsocket() {
	this.log('Websocket close')
}