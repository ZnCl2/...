

/* ---- data/1ZeroeuDnL2jNS6t1epQa1SPvC91KG8ER/js/lib/ZeroFrame.coffee ---- */


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


/* ---- data/1ZeroeuDnL2jNS6t1epQa1SPvC91KG8ER/js/ZeroChat.coffee ---- */


(function() {
  var ZeroChat,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ZeroChat = (function(_super) {
    __extends(ZeroChat, _super);

    function ZeroChat() {
      this.sendMessage = __bind(this.sendMessage, this);
      this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
      this.selectUser = __bind(this.selectUser, this);
      return ZeroChat.__super__.constructor.apply(this, arguments);
    }

    ZeroChat.prototype.init = function() {
      var sendmsg;
      return sendmsg = 0;
    };

    ZeroChat.prototype.selectUser = function() {
      Page.cmd("certSelect", [["zeroid.bit"]]);
      return false;
    };

    ZeroChat.prototype.setMsg = function() {
      var sendmsg;
      return sendmsg = 1;
    };

    ZeroChat.prototype.onOpenWebsocket = function(e) {
      var inlist, query, url;
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          return _this.site_info = site_info;
        };
      })(this));
      url = window.location !== window.parent.location ? document.referrer : document.location;
      if (url.indexOf("queue.html") > -1) {
        inlist = [];
        query = "SELECT message.*, keyvalue.value AS cert_user_id FROM message\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nORDER BY date_added";
        return this.cmd("dbQuery", [query], (function(_this) {
          return function(messages) {
            var body, cert_user_id, date_added, innlist, message, name, tags, _i, _len;
            for (_i = 0, _len = messages.length; _i < _len; _i++) {
              message = messages[_i];
              innlist = [];
              body = message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              name = message.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              tags = message.tags.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              date_added = message.date_added;
              cert_user_id = message.cert_user_id.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              innlist.push(name);
              innlist.push(body);
              innlist.push(tags);
              innlist.push(date_added);
              innlist.push(cert_user_id);
              inlist.push(innlist);
            }
            return window.inlist = inlist;
          };
        })(this));
      }
    };

    ZeroChat.prototype.route = function(cmd, message) {
      var sendmsg;
      if (cmd === "setSiteInfo") {
        this.site_info = message.params;
      }
      if (Page.site_info.cert_user_id) {
        if (sendmsg = 1) {
          sendmsg = 0;
          return Page.sendMessage();
        }
      }
    };

    ZeroChat.prototype.sendMessage = function() {
      var g, inner_path, sendmsg;
      if (sendmsg = 0) {
        return false;
      }
      g = document.getElementById("addtext").value;
      if (g.search("^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$") === -1) {
        document.getElementById("addhelp").innerHTML = "That's not a valid address.";
        return false;
      }
      if (document.getElementById("addname").value.length < 5) {
        document.getElementById("addhelp").innerHTML = "The site name must have at least 5 characters.";
        return false;
      }
      if (document.getElementById("addname").value.length > 30) {
        document.getElementById("addhelp").innerHTML = "The site name must have less than characters.";
        return false;
      }
      if ((document.getElementById("addtags").value.match(/,/g) || []).length < 2) {
        document.getElementById("addhelp").innerHTML = "You need to add at least 3 tags.";
        return false;
      }
      if ((document.getElementById("addtags").value.match(/,/g) || []).length > 200) {
        document.getElementById("addhelp").innerHTML = "You can't add more than 200 tags.";
        return false;
      }
      if (document.getElementById("addtags").value.length < 10) {
        document.getElementById("addhelp").innerHTML = "The tags must be bigger.";
        return false;
      }
      if (document.getElementById("addtags").value.length > 1000) {
        document.getElementById("addhelp").innerHTML = "The tags must be smaller.";
        return false;
      }
      if (!Page.site_info.cert_user_id) {
        Page.selectUser();
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
            "body": document.getElementById("addtext").value,
            "name": document.getElementById("addname").value,
            "tags": document.getElementById("addtags").value,
            "date_added": +(new Date)
          });
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (res === "ok") {
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                document.getElementById("addtext").value = "";
                document.getElementById("addname").value = "";
                document.getElementById("addtags").value = "";
                return _this.cmd("wrapperNotification", ["done", "Success!", 1500]);
              });
            } else {
              return _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            }
          });
        };
      })(this));
      return false;
    };

    return ZeroChat;

  })(ZeroFrame);

  window.Page = new ZeroChat();

}).call(this);
