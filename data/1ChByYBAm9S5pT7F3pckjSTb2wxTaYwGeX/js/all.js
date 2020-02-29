
/* ---- lib/ZeroFrame.js ---- */


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
}


/* ---- anthologies.coffee ---- */


(function() {
  //TODO: sort -> natsort
  var ZeroFrameA, collator;

  collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base'
  });

  ZeroFrameA = class ZeroFrameA extends ZeroFrame {
    init() {
      var ctitles, frontend, hub, missing;
      frontend = "1PGaLLNiadMzrmw6MMMnpZnskwFcdgZoS4";
      hub = "1ChByYBAm9S5pT7F3pckjSTb2wxTaYwGeX";
      ctitles = {
        loli: "Lolicon",
        female: "Female only",
        male: "Male only",
        zoo: "Bestiality"
      };
      missing = true;
      return this.cmd("fileGet", ["anthologies.json"], (result) => {
        var antho, anthologies, c, checked, complete, html, i, j, k, len, len1, ref, ref1, ref2, total, vol, volume;
        anthologies = JSON.parse(result);
        //anthologies.sort((a,b) => a["sort_as"]>b["sort_as"])
        total = 0;
        for (k in anthologies) {
          antho = anthologies[k];
          if (antho["volumes"].length > 0) {
            total += antho["volumes"].length;
            complete = "incomplete";
            checked = "";
            if (antho["total"] === antho["volumes"].length && antho["total"] > 0) {
              complete = "complete";
            }
            if (antho["checked"] !== void 0) {
              checked = "checked";
            }
            html = "<div class=\"antho\" onclick=\"this.classList.toggle('show-hidden')\">";
            html += "<h3 class=\"" + complete + " " + checked + "\">";
            ref = antho["categories"];
            for (k in ref) {
              c = ref[k];
              html += "<img class=\"icon\" title=\"" + ctitles[c] + "\" src=\"./icons/" + c + ".svg\"/>";
            }
            html += antho["title"];
            html += "<span class=\"volcount\">(" + antho["volumes"].length;
            if (missing === true) {
              if (antho["missing"] !== void 0) {
                html += "<span class=\"missing\"> +" + antho["missing"].length + "</span>";
                antho["volumes"];
                ref1 = antho["missing"];
                for (i = 0, len = ref1.length; i < len; i++) {
                  vol = ref1[i];
                  volume = {
                    "title": vol,
                    "path": null
                  };
                  antho["volumes"].push(volume);
                }
                antho["volumes"] = antho["volumes"].sort((a, b) => {
                  return collator.compare(a["title"], b["title"]);
                });
              }
            }
            html += ")</span></h3><ol>";
            ref2 = antho["volumes"];
            for (j = 0, len1 = ref2.length; j < len1; j++) {
              vol = ref2[j];
              html += "<li>";
              if (vol["path"] !== null) {
                html += "<a onmouseover=\"this.nextElementSibling.firstChild.src=\'galleries/" + vol["path"] + "/" + vol["cover"] + "\'\" href=\"/" + frontend + "/?!/g/" + hub + "/" + vol["path"] + "\">" + vol["title"] + "</a>";
                html += "<div class=\"cover\"><img/></div>";
              } else {
                html += "<div class=\"missing\">" + vol["title"] + "</div>";
              }
              html += "</li>";
            }
            html += "</ol></div>";
            document.getElementById("lists").innerHTML += html;
          }
        }
        return document.getElementById("totalcount").innerHTML = "Hosting " + total + " volumes";
      });
    }

  };

  window.Page = new ZeroFrameA();

}).call(this);
