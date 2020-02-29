

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
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
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



/* ---- data/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg/js/utils/Time.coffee ---- */


(function() {
  var Time;

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(time) {
      var back, now, secs;
      now = +(new Date) / 1000;
      secs = now - time;
      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " mins ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hrs ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = "on " + this.date(time);
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



/* ---- data/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg/js/ZeroChat.coffee ---- */


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
          return this.loadMessages();
        }
      }
    };

function debugmsg(msg)
{
  // debug
  var newElement = document.createElement('li');
  newElement.innerHTML = msg;
  document.getElementById("list").appendChild(newElement);
}

    ZeroChat.prototype.sendMessage = function() {
      var inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
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

          // EMPTY MESSAGES
          message = document.getElementById("message").value;
          if(message == "" || message == "/me" || message == "/me "){
            debugmsg('empty message');
            document.getElementById("message").disabled = false;
            document.getElementById("message").value = "";
            document.getElementById("message").focus();
            return false;
          }

          data.message.push({
            "body": document.getElementById("message").value,
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

    ZeroChat.prototype.loadMessages = function() {
      var query;
      query = "SELECT message.*, keyvalue.value AS cert_user_id FROM message\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nORDER BY date_added";
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(messages) {
          var added, body, message, message_lines, _i, _len;
          document.getElementById("messages").innerHTML = "";
          message_lines = [];

          // REGEXES
    replacePattern0 = /(http:\/\/127.0.0.1:43110\/)/gi;
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacePattern4 = /0net:\/\/([-a-zA-Z0-9+&.\/=?]*)/g
          document.getElementById("list").innerHTML = "";

          for (_i = 0, _len = messages.length; _i < _len; _i++) {
            message = messages[_i];
            body = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            added = new Date(message.date_added);
            time = (Time.since(message.date_added / 1000));
            userid = message.cert_user_id;
            useridcolor = (Text.toColor(userid));
            username = (message.cert_user_id.replace('@zeroid.bit', ''));
            msgseparator = ':';

    // url rewriting (TODO: move the regexes out of the loop so there's no reassignment)
    inputText = body.replace(replacePattern0, '0net://');

    //URLs starting with http://, https://, or ftp://
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank" style="color: red; font-weight: bold;">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" style="color: red; font-weight: bold;">$2</a>');

    //Change email addresses to mailto:: links.
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" style="color: red; font-weight: bold;">$1</a>');

    //zeronet URLs starting with http://127.0.0.1:43110
    replacedText = replacedText.replace(replacePattern4, '<a href="http://127.0.0.1:43110/$1" target="_blank" style="color: green; font-weight: bold;">0net://$1</a>');

    body = replacedText;

            // IRC /me
            if(body.substr(0,3) == "/me")
            {
              body = body.substr(4);
              username = username+' '+body;
              body = '';
              msgseparator = '';
            }

            // highlight our messages
//            debugmsg(body.indexOf(Page.site_info.cert_user_id.replace('@zeroid.bit', '')));
            prestyle="";
            poststyle="";
            if(userid == Page.site_info.cert_user_id)
            {
                prestyle = '<span style="color:black; font-weight:bold;">'
                poststyle = '</span>';
            }

            // highlight mentions of us
            if(Page.site_info.cert_user_id && body.indexOf(Page.site_info.cert_user_id.replace('@zeroid.bit', '')) > -1)
            {
                prestyle = '<span style="color:blue; font-weight:bold;">'
                poststyle = '</span>';
            }
            body = prestyle + body + poststyle;

            // TODO: maybe use template (ugh, slow?) instead of mixing code with markup like below
            message_lines.push("<li><small title='" + added + "'>" + time + "</small> <b style='color: " + useridcolor + "'>" + username +  "</b>" + msgseparator + " " + body + "</li>");
          }
          message_lines.reverse();
          return document.getElementById("messages").innerHTML = message_lines.join("\n");
        };
      })(this));
    };

    ZeroChat.prototype.addLine = function(line) {
      var messages;
      messages = document.getElementById("messages");
      return messages.innerHTML = ("<li>" + line + "</li>") + messages.innerHTML;
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
