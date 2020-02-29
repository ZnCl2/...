var warned = 0;
var pic = document.getElementById('pic');
var vid = document.getElementById('vid');
var adiv = document.getElementById('adiv');
var aaud = document.getElementById('aaud');
var apic = document.getElementById('apic');
var text = document.getElementById('txt');

function settext(texts) { text.innerHTML = texts }

function init() {
    vid.pause();
    aaud.pause();
    pic.setAttribute("hidden", "true");
    vid.setAttribute("hidden", "true");
    adiv.setAttribute("hidden", "true");
    vid.volume = 0.5;
    aaud.volume = 0.5;
    settext('欢迎使用');
}

function err() {
    init();
    pic.src = "data:image/png;base64,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";
    pic.removeAttribute("hidden");
    settext('出错了（常见原因：数据站未加载或未更新、浏览器不支持该格式）');
}

function pctload(picsrc, ptext) {
    init();
    pic.removeAttribute("hidden");
    pic.src = "/1Le23xkmxXkW3EYBjwqRMMZfMdsc2yzzjz/data/picture/" + picsrc;
    settext(ptext);
}

function vidload(vidsrc, vidtyp, vidvol, vtext) {
    init();
    vid.removeAttribute("hidden");
    vid.src = "/1Le23xkmxXkW3EYBjwqRMMZfMdsc2yzzjz/data/video/" + vidsrc;
    vid.type = vidtyp;
    vid.volume = vidvol;
    settext(vtext);
}

function audload(audsrc, apicsrc, audtyp, audvol, atext) {
    init();
    adiv.removeAttribute("hidden");
    aaud.src = "/1Le23xkmxXkW3EYBjwqRMMZfMdsc2yzzjz/data/music/" + audsrc;
    if (apicsrc == null) {
        apic.src = "data:image/jpeg;base64,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";
    } else {
        apic.src = "/1Le23xkmxXkW3EYBjwqRMMZfMdsc2yzzjz/data/music/pic/" + apicsrc;
    }
    aaud.type = audtyp;
    aaud.volume = audvol;
    settext(atext);
}

function shhi(id) {
    document.getElementById('hint').hidden = true;
    var el = document.getElementById(id);
    if (el.hidden == true) {
        el.hidden = false;
    } else {
        el.hidden = true;
    }
}

function psewarn(){
  if (warned == 0) {
    init();
    pic.removeAttribute('hidden');
    pic.src = '/1Le23xkmxXkW3EYBjwqRMMZfMdsc2yzzjz/files/psewarn.svg';
    settext('该分类内容可能包含闪烁的图形。如您观看时不适，请立即停止播放并咨询医生。');
    warned = 1;
  }
}

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
                delete this.waiting_cb[message.to]
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

    cmd(cmd, params = {}, cb = null) {
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    cmdp(cmd, params = {}) {
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

    send(message, cb = null) {
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

    async monkeyPatchAjax() {
        var page = this
        XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open
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

        this.ajax_key = await page.cmdp("wrapperGetAjaxKey", [])
    }
}


class Page extends ZeroFrame {
    setSiteInfo(site_info) {
        var sizeKB = site_info.settings.size / 1024
        var updated = new Date(site_info.content.modified * 1000)
        var out = document.getElementById("zerostat")
        out.innerHTML =
            "【节点数：" + site_info.peers +
            "】【数据量：" + sizeKB.toFixed(2) + "KB" +
            "】<br>【上次更新：" + updated.toLocaleDateString() + " " + updated.toLocaleTimeString() + "】"
    }

    onOpenWebsocket() {
        this.cmd("siteInfo", [], function (site_info) {
            page.setSiteInfo(site_info)
        })
    }

    onRequest(cmd, message) {
        if (cmd == "setSiteInfo")
            this.setSiteInfo(message.params)
        else
            this.log("Unknown incoming message:", cmd)
    }
}
page = new Page()