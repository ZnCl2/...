/* ZeroFrame.js naming mod */
const zmCMD_INNER_READY = 'innerReady'
const zmCMD_RESPONSE = 'response'
const zmCMD_WRAPPER_READY = 'wrapperReady'
const zmCMD_PING = 'ping'
const zmCMD_PONG = 'pong'
const zmCMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
const zmCMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

class zmZeroFrame {
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
        this.cmd(zmCMD_INNER_READY)
    }

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === zmCMD_RESPONSE) {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            }
            else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === zmCMD_WRAPPER_READY) {
            this.cmd(zmCMD_INNER_READY)
        } else if (cmd === zmCMD_PING) {
            this.response(message.id, zmCMD_PONG)
        } else if (cmd === zmCMD_WRAPPER_OPENED_WEBSOCKET) {
            this.onOpenWebsocket()
        } else if (cmd === zmCMD_WRAPPER_CLOSE_WEBSOCKET) {
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
            cmd: zmCMD_RESPONSE,
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


/* ZeroMessage */

class ZeroMessage extends zmZeroFrame {
    addMessage (username, message) {
        var message_escaped = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")  // Escape html tags in the message
        this.messages = document.getElementById("zm-messages")
        this.messages.innerHTML += "<li title='" + formatDate(message.date_added) + "'><b>" + username + "</b>: " + message_escaped + "</li>"
    }
    loadSiteInfo () {
        this.cmd("siteInfo", {}, (site_info) => {
            if (site_info.cert_user_id)
                document.getElementById("zm-select-user").innerText = site_info.cert_user_id
            this.site_info = site_info
        })
    }

    // To make the “Select User” button display the user select dialog add the following function to the ZeroChat class:
    selectUser () {
        this.cmd("certSelect", {accepted_domains: ["zeroid.bit"]})
        return false
    }
    onRequest (cmd, message) {
        if (cmd == "setSiteInfo") {
            if (message.params.cert_user_id)
                document.getElementById("zm-select-user").innerHTML = message.params.cert_user_id
            else
                document.getElementById("zm-select-user").innerHTML = "Select user"
            this.site_info = message.params  // Save site info data to allow access it later

            // Reload messages if new file arrives
            if (message.params.event[0] == "file_done")
                this.loadMessages()
        }
    }

    sendMessage () {
        if (!this.site_info.cert_user_id) {  // No account selected, display error
            this.cmd("wrapperNotification", ["info", "Please, select your account."])
            return false
        }

        // This is our data file path
        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        // Load our current messages
        this.cmd("fileGet", {"inner_path": data_inner_path, "required": false}, (data) => {
            if (data)  // Parse current data file
                data = JSON.parse(data)
            if (data == null)
              data = {
                "next_comment_id": 1,
                "comment": [],
                "comment_vote": {},
                "topic_vote": {}
              }
            if (data.zm_message == null)  // Not exists yet, use default data
                data.zm_message = []

            // Add the new message to data
            data.zm_message.push({
                "body": document.getElementById("zm-message").value,
                "date_added": Date.now()
            })

            // Encode data array to utf8 json text
            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            // Write file to disk
            this.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
                if (res == "ok") {
                    // Reset the message input
                    document.getElementById("zm-message").value = ""
                    // Sign the changed file in our user's directory
                    this.cmd("siteSign", {"inner_path": content_inner_path}, (res) => {
                        this.loadMessages() // Reload messages
                        // Publish to other users
                        this.cmd("sitePublish", {"inner_path": content_inner_path, "sign": false})
                    })
                } else {
                    this.cmd("wrapperNotification", ["error", "File write error: #{res}"])
                }
            })
        })

        return false
    }

    loadMessages () {
        this.cmd("dbQuery", ["SELECT * FROM zm_message LEFT JOIN json USING (json_id) ORDER BY date_added DESC"], (messages) => {
            //document.getElementById("zm-messages").innerHTML = ""  // Always start with empty messages
            document.getElementById("zm-messages").innerHTML = "<div>Here is ZeroMessage. Feel free to leave some messages ^^ You can use Ctrl+Enter to send it. <br>Also you can follow <a href=/1EiMAqhd6sMjPG2tznkkGXxhdwFBDdeqT9/?Post:35>this tutorial</a> to set up this widget for your zite.</div>"  // Always start with empty messages
            for (var i=0; i < messages.length; i++) {
                var cert_user = messages[i].cert_user_id.split('@')[0]
                this.addMessage(cert_user, messages[i])
            }
        })
    }

    followMessages () {
			this.cmd("feedListFollow", [], (followList) => {
				var newList = followList
				if (followList["Zm-message"]) {
					delete newList["Zm-message"]
					this.cmd("feedFollow", [newList])
					document.getElementById("zm-follow").value = "Follow"
        } else {
          var query = "SELECT 'message' AS type, 'New Message' AS title, '' AS url, date_added, REPLACE(cert_user_id, '@zeroid.bit', '') || ': ' || body AS body FROM zm_message LEFT JOIN json USING (json_id)"
          var params = [""]
          newList["Zm-message"] = [query, params]
          this.cmd("feedFollow", [newList])
					document.getElementById("zm-follow").value = "Following"
				}
      })
    }

    checkFollowMessages () {
			this.cmd("feedListFollow", [], (followList) => {
				if (followList["Zm-message"]) {
					document.getElementById("zm-follow").value = "Following"
        } else {
					document.getElementById("zm-follow").value = "Follow"
				}
      })
    }
}

function formatDate(timestamp) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var date = new Date(timestamp);
  var hour = date.getHours();
  var min = "0" + date.getMinutes();
  var sec = "0" + date.getSeconds();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + months[monthIndex] + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
}

function zmExpandTextArea() {
  var textarea = document.getElementById('zm-message');
  textarea.oninput = function() {
  textarea.style.height = "";
  textarea.style.height = textarea.scrollHeight + "px";
  };
}

function zmLoadMessages() {
  var trigger = document.getElementById('zm-trigger');
  if (trigger.checked) {
    zmpage = new ZeroMessage();
    zmpage.loadMessages();
    zmpage.loadSiteInfo();
    zmpage.checkFollowMessages();
  }
}

function zmInsertHTML() {
  var div = document.createElement('div');
  div.setAttribute('class', 'zm-wrapper');
  div.innerHTML = `
	  <input id="zm-trigger" class="zm-trigger" type="checkbox" onclick='zmLoadMessages()'></input>
	  <div class="trigger">
	    <label class="titlebar" for="zm-trigger">
	      <span class="zm-title-text">Show Messages</span>
	      <span class="zm-title-text2">ZeroMessage</span>
	      <span class="buttons"><span id="zm-minimize">×</span></span>
	    </label>
	    <div class="widget-wrapper">
	      <a href="#Select+user" id="zm-select-user" onclick='return zmpage.selectUser()'>Select user</a>
		    <input type="button" id="zm-follow" value="Follow" onclick="return zmpage.followMessages()"/>
	      <div class="input-wrapper">
		<textarea type="text" id="zm-message" onkeypress="if (event.keyCode == 13 && event.ctrlKey) zmpage.sendMessage()"></textarea>
		<input type="button" id="zm-send" value="Send" onclick="return zmpage.sendMessage()"/>
	      </div>
	      <div class="message-wrapper">
		<ul id="zm-messages">
		  <li>Welcome to ZeroMessage!</li>
		</ul>
	      </div>
	      <link rel="stylesheet" href="zeromessage/all.css"/>
		<style>.zeromessage { display: none }</style>
	    </div>
	  </div>
  `;
  document.getElementById('zeromessage').appendChild(div);
}

window.onload = function() {
  zmInsertHTML();
  zmExpandTextArea();
}
