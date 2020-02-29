

/* ---- data/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg/js/lib/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = __bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
      this.route = __bind(this.route, this);
      this.onMessage = __bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      return this.cmd("innerReady");
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.route(cmd, message);
      }
    };

    ZeroFrame.prototype.route = function(cmd, message) {
      return this.log("Unknown command", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[ZeroFrame]"].concat(__slice.call(args)));
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })();

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- data/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg/js/utils/Text.coffee ---- */


(function() {
  var Text;

  Text = (function() {
    function Text() {}

    Text.prototype.toColor = function(text, saturation, lightness) {
      var hash, i, _i, _ref;
      if (saturation == null) {
        saturation = 30;
      }
      if (lightness == null) {
        lightness = 40;
      }
      hash = 0;
      for (i = _i = 0, _ref = text.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        hash += text.charCodeAt(i) * i;
        hash = hash % 1777;
      }
      return "hsl(" + (hash % 360) + ("," + saturation + "%," + lightness + "%)");
    };

    return Text;

  })();

  window.Text = new Text();

}).call(this);


(function() {
  var Time;

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(time) {
      var back, now, secs;
      now = +(new Date) / 1000;
      secs = now - time;
      if (secs < 60) {
        back = "Just now &nbsp;";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " min. ago&nbsp;";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago&nbsp;";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago&nbsp;";
      } else {
        back = this.date(time) + "&nbsp;";
      }
      back = back.replace(/1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Time.prototype.date = function(timestamp, format) {
      var display, parts;
      if (format == null) {
        format = "short";
      }
      parts = (new Date(timestamp * 1000)).toString().split(" ");
      if (format === "short") {
        display = parts.slice(1, 4);
      } else {
        display = parts.slice(1, 5);
      }
      return display.join(" ").replace(/( [0-9]{4})/, ",$1");
    };

    Time.prototype.timestamp = function(date) {
      if (date == null) {
        date = "";
      }
      if (date === "now" || date === "") {
        return parseInt(+(new Date) / 1000);
      } else {
        return parseInt(Date.parse(date) / 1000);
      }
    };

    return Time;

  })();

  window.Time = new Time;

}).call(this);


var UserTimeout = 180; // seconds

function createUserElement(cert_user_id)
{
	var div = document.createElement('div');
	var b = document.createElement('b');
	b.style.color = Text.toColor(cert_user_id);
	b.textContent = (cert_user_id.replace('@zeroid.bit', ''));
	div.appendChild(b);
	document.querySelector('#userlist').appendChild(div);
	return div;
}

function UserList()
{
	this.users = {}

	function removeUserTimeout(this_, auth_addr)
	{
		return function ()
		{
			var user = this_.users[auth_addr];
			document.querySelector('#userlist').removeChild(user.element);
			this_.users[auth_addr] = undefined;
		};
	}

	function createUser(this_, auth_addr)
	{
		Page.cmd('fileGet', {
			'inner_path' : 'data/users/' + auth_addr + '/content.json',
			'required' : false }, function (data) {
				var cert_user_id = JSON.parse(data).cert_user_id;
				var element = createUserElement(cert_user_id);
				var remove = removeUserTimeout(this_, auth_addr);
				this_.users[auth_addr] = {
					cert_user_id : cert_user_id,
					element : element,
					remove : remove,
					timeout : setTimeout(remove, UserTimeout * 1000),
				};
			}
		);
	}

	this.updateUser = function (auth_addr)
	{
		var user = this.users[auth_addr];
		if (user === undefined)
		{
			createUser(this, auth_addr);
			return;
		}
		clearTimeout(user.timeout);
		user.timeout = setTimeout(user.remove, UserTimeout * 1000);
	}
}
var userlist = new UserList();

(function() {
  var ZeroChat,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  ZeroChat = (function(_super) {
    __extends(ZeroChat, _super);

    function ZeroChat() {
      this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
      this.sendMessage = __bind(this.sendMessage, this);
      this.selectUser = __bind(this.selectUser, this);
      return ZeroChat.__super__.constructor.apply(this, arguments);
    }

    ZeroChat.prototype.init = function() {
      return this.addLine("inited!");
    };

    ZeroChat.prototype.selectUser = function() {
      Page.cmd("certSelect", [["zeroid.bit"]]);
      return false;
    };

    ZeroChat.prototype.route = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        if (message.params.cert_user_id) {
          document.getElementById("select_user").innerHTML = message.params.cert_user_id;
        } else {
          document.getElementById("select_user").innerHTML = "Select user";
        }
        this.site_info = message.params;
        if (message.params.event[0] === "file_done") {
          var auth_addr = message.params.event[1];
          if (auth_addr.startsWith('data/users') && auth_addr.endsWith('/data.json'))
          {
            userlist.updateUser(auth_addr.substring(11, auth_addr.length-10));
		document.getElementById('blopsound').play();

			}
          return this.loadMessages();
        }
      }
    };

    ZeroChat.prototype.sendMessage = function() {
      var inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
		document.getElementById('pingsound').play();
        return false;
      }
      else if (document.getElementById("message").value.length == 0) {
        Page.cmd("wrapperNotification", ["info", "No input message."]);
		document.getElementById('pingsound').play();
        return false;
      }
      else if (document.getElementById("message").value.length > 120) {
        Page.cmd("wrapperNotification", ["info", "Message too long. Max 120 characters."]);
		document.getElementById('pingsound').play();
        return false;
      }
      document.getElementById("message").disabled = true;
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      this.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          var json_raw;
          if (data) {
            data = JSON.parse(data);
          } else {
            data = {
              "message": []
            };
          }
          data.message.push({
            "body": document.getElementById("message").value.replace(/(https?:\/\/|)127.0.0.1:43110\//,'0net://'),
            "date_added": +(new Date)
          });
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (res === "ok") {
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                document.getElementById("message").disabled = false;
                document.getElementById("message").value = "";
                document.getElementById("message").focus();
                return _this.loadMessages();
              });
            } else {
              _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
              return document.getElementById("message").disabled = false;
            }
          });
        };
      })(this));
      return false;
    };

    ZeroChat.prototype.loadMessages = function(mode) {
      var query;
      if (mode == null) {
        mode = "normal";
      }
      query = "SELECT message.*, keyvalue.value AS cert_user_id FROM message\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nORDER BY date_added DESC";
      if (mode !== "nolimit") {
        query += " LIMIT 60";
      }
      this.cmd("dbQuery", [query], (function(_this) {
        return function(messages) {
          var added, body, message, message_lines, _i, _len, userid, prestyle, poststyle;
          document.getElementById("messages").innerHTML = "";
          message_lines = [];
          for (_i = 0, _len = messages.length; _i < _len; _i++) {
            message = messages[_i];
            if (message.date_added > (+(new Date)) + 60 * 3) {
              continue;
            }
            body = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            body = body.replace(/:\)|:\-\)\)/g, '<img src="media/happy.png" width="24" height="24"/>');
            body = body.replace(/:\-\)/g, '<img src="media/smile.png" width="24" height="24"/>');
            body = body.replace(/:\-\(\(/g, '<img src="media/crying.png" width="24" height="24"/>');
            body = body.replace(/:\(|:\-\(/g, '<img src="media/sad.png" width="24" height="24"/>');
            body = body.replace(/:\-\|\|/g, '<img src="media/angry.png" width="24" height="24"/>');
            body = body.replace(/:\||:\-\|/g, '<img src="media/undecided.png" width="24" height="24"/>');
            body = body.replace(/;\-\)/g, '<img src="media/wink.png" width="24" height="24"/>');
            body = body.replace(/:\-\*/g, '<img src="media/kiss.png" width="24" height="24"/>');
            body = body.replace(/:\-P/g, '<img src="media/tongue.png" width="24" height="24"/>');
            body = body.replace(/:\-O/g, '<img src="media/surprise.png" width="24" height="24"/>');
            body = body.replace(/:(myheart|cupid|brheart|pray|okhand|uphand|handsh|vhand|tbup|tbdown|clap|punch|fist|muscle):/g, '<img src="media/$1.png" width="24" height="24"/>');
			body = body.replace(/(\b(https?|ftps?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, '<a href="$1" target="_blank" style="color: red; font-weight: bold;">$1</a>');
			body = body.replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim, '$1<a href="http://$2" target="_blank" style="color: red; font-weight: bold;">$2</a>');
			body = body.replace(/0net:\/\/([-a-zA-Z0-9+&@#+\/%?=~_|!:,.;]*)/g, '<a href="http://127.0.0.1:43110/$1" target="_blank">0net://$1</a>');
			body = body.replace(/(([a-zA-Z0-9\-\_\.])+)@zeroid\.bit/gim, '<a href="http://127.0.0.1:43110/Mail.ZeroNetwork.bit/?to=$1@zeroid.bit" style="color: green;">$1@zeroid.bit</a>');
			body = body.replace(/:reversiR(\d)C(\d):|:ReversiMoveRow(\d)Col(\d):/, '<b style="color: blue; cursor: pointer" onclick="reversi.insert($1,$2)">ReversiMoveRow$1Col$2</b>');
            added = new Date(message.date_added);
            prestyle = "";
            poststyle = "";
            userid = message.cert_user_id;
            if (userid === Page.site_info.cert_user_id) {
              prestyle = '<span style="color:black; font-weight:bold;">';
              poststyle = '</span>';
            }
            if (Page.site_info.cert_user_id && body.indexOf('@'+Page.site_info.cert_user_id.replace('@zeroid.bit', '')) > -1) {
/*			document.getElementById('pingsound').play();	*/
			prestyle = '<span style="color:violet; font-weight:bold;">';
            poststyle = '</span>';
            }
            body = prestyle + body + poststyle;


            message_lines.push("<li><small title='" + added + "'>" + (Time.since(message.date_added / 1000)) + "</small><a href='http://127.0.0.1:43110/Mail.ZeroNetwork.bit/?to=" + userid + "'>ZMail</a> <b style='color: " + (Text.toColor(userid)) + "; cursor: pointer' onclick='Page.mention(this)'>" + (userid.replace(/(\w+)\@zeroid\.bit/, '$1')) + "</b>: " + body + "</li>");
          }
          if (mode !== "nolimit") {
            message_lines.push("<li><a href='#More' onclick='this.style.opacity = 0.4; return Page.loadMessages(\"nolimit\"); '>Load more messages...</a></li>");
          }

          return document.getElementById("messages").innerHTML = message_lines.join("\n");
        };
      })(this));
      return false;
    };

    ZeroChat.prototype.addLine = function(line) {
      var messages;
      messages = document.getElementById("messages");
      return messages.innerHTML = ("<li>" + line + "</li>") + messages.innerHTML;
    };
    ZeroChat.prototype.mention = function(user) {//and this function
		document.getElementById("message").value += "@" + user.innerHTML + ": "
		document.getElementById("message").focus()
    };
    ZeroChat.prototype.emoticon = function(emovar) {
		document.getElementById("message").value +=  emovar;
		document.getElementById("message").focus()
    };
    ZeroChat.prototype.emoticons = function(emovar) {
		document.getElementById(emovar).play();
		document.getElementById("message").value += ':' + emovar +':';
		document.getElementById("message").focus()
    };

    ZeroChat.prototype.onOpenWebsocket = function(e) {
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          if (site_info.cert_user_id) {
            document.getElementById("select_user").innerHTML = site_info.cert_user_id;
          }
          return _this.site_info = site_info;
        };
      })(this));
      return this.loadMessages();
    };

    return ZeroChat;

  })(ZeroFrame);

  window.Page = new ZeroChat();

}).call(this);
