
/* ---- /14SZmBpbGv5u99zibmGMd6f9NHMhMbWKUF/js/ZeroFrame.js ---- */


// Version 1.0.0 - Initial release
// Version 1.1.0 (2017-08-02) - Added cmdp function that returns promise instead of using callback
// Version 1.2.0 (2017-08-02) - Added Ajax monkey patch to emulate XMLHttpRequest over ZeroFrame API
// Version 1.3.0 (2018-12-05) - Added monkey patch for fetch API

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

    cmdp(cmd, params={}) {
        return new Promise((resolve, reject) => {
            this.cmd(cmd, params, (res) => {
                if (res && res.error) {
                    reject(res.error)
                } else {
                    resolve(res)
                }
            })
        })
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

    monkeyPatchAjax() {
        var page = this
        XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open
        this.cmd("wrapperGetAjaxKey", [], (res) => { this.ajax_key = res })
        var newOpen = function (method, url, async) {
            url += "?ajax_key=" + page.ajax_key
            return this.realOpen(method, url, async)
        }
        XMLHttpRequest.prototype.open = newOpen

        window.realFetch = window.fetch
        var newFetch = function (url) {
            url += "?ajax_key=" + page.ajax_key
            return window.realFetch(url)
        }
        window.fetch = newFetch
    }
}

/* ---- /14SZmBpbGv5u99zibmGMd6f9NHMhMbWKUF/js/page.js ---- */


class Page extends ZeroFrame {
    sendMessage(text) {
        this.cmd("peerBroadcast", {
            message: {
                text: text,
                timestamp: new Date().valueOf()
            },
            privatekey: false
        }); // send message "text" to everybody
        messageInput.value = "";
    }

    setSiteInfo(site_info) {
        let out = document.getElementById("out");
        out.innerHTML =
            "Page address: " + site_info.address +
            "<br>- Peers: " + site_info.peers +
            "<br>- Size: " + site_info.settings.size +
            "<br>- Modified: " + (new Date(site_info.content.modified * 1000));
    }

    onOpenWebsocket() {
        this.cmd("siteInfo", [], function(site_info) {
            page.setSiteInfo(site_info);
        });
    }

    onRequest(cmd, message) {
        if (cmd == "setSiteInfo") {
            this.setSiteInfo(message.params);
        } else if (cmd == "peerReceive") { // and it's from PeerMessage plugin
            let text = decodeURIComponent(message.params.message.text);
            let timestamp = message.params.message.timestamp;
            let identityAddress = message.params.signed_by;
            let userName = message.params.cert;

            console.log("onRequest::peerReceive", message);

            let el = document.createElement("li");
            el.appendChild(document.createTextNode(new Date(timestamp) + " >> " + userName + ": "));
            el.appendChild(document.createTextNode(text));
            messageHistory.insertBefore(el, messageHistory.firstChild);

            this.cmd("peerValid", [message.params.hash]); // This message is correct - broadcast to other peers
        } else {
            this.log("Unknown incoming message:", cmd);
        }
    }
}

page = new Page();

const messageSend = document.getElementById("messageSend")
const messageInput = document.getElementById("messageInput");
const messageHistory = document.getElementById("messageHistory");

messageSend.onclick = function() {
    page.sendMessage(encodeURIComponent(messageInput.value.trim()));
};

const changeCertBtn = document.getElementById("changeCertBtn");
changeCertBtn.onclick = function() {
    page.cmd("certSelect", [
        [
            "zeroid.bit",
            "kaffie.bit",
            "cryptoid.bit",
            "peak.id",
            "zeroverse.bit",
            "kxoid.bit"
        ]
    ]);
};