

/* ---- data/14ETRYjD3XREhoCzaSfJ2fsrQHbX9kzMkh/js/lib/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.route = bind(this.route, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
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
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[ZeroFrame]"].concat(slice.call(args)));
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


/* ---- data/14ETRYjD3XREhoCzaSfJ2fsrQHbX9kzMkh/js/ZeroChat.coffee ---- */


(function() {
  var ZeroChat,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroChat = (function(superClass) {
    extend(ZeroChat, superClass);

    function ZeroChat() {
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.sendMessage = bind(this.sendMessage, this);
      this.selectUser = bind(this.selectUser, this);
      return ZeroChat.__super__.constructor.apply(this, arguments);
    }

    ZeroChat.prototype.init = function() {
      return this.addLine("inited!");
    };

    ZeroChat.prototype.addLine = function(line) {
      var messages;
      messages = document.getElementById("messages");
      return messages.innerHTML = ("<li>" + line + "</li>") + messages.innerHTML;
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

    ZeroChat.prototype.sendMessage = function() {
      var inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
        return false;
      }
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
          var body, i, len, message, results;
          document.getElementById("messages").innerHTML = "";
          results = [];
          for (i = 0, len = messages.length; i < len; i++) {
            message = messages[i];
            body = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            results.push(_this.addLine("<b>" + message.cert_user_id + "</b>: " + body));
          }
          return results;
        };
      })(this));
    };

    ZeroChat.prototype.onOpenWebsocket = function(e) {
      this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {
          return _this.addLine("serverInfo response: <pre>" + JSON.stringify(server_info, null, 2) + "</pre>");
        };
      })(this));
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          _this.addLine("siteInfo response: <pre>" + JSON.stringify(site_info, null, 2) + "</pre>");
          if (site_info.cert_user_id) {
            document.getElementById("select_user").innerHTML = site_info.cert_user_id;
          }
          _this.site_info = site_info;
          return _this.loadMessages();
        };
      })(this));
    };

    return ZeroChat;

  })(ZeroFrame);

  window.Page = new ZeroChat();

}).call(this);
