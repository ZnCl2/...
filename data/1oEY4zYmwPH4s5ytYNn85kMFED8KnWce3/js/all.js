

/* ---- /1oEY4zYmwPH4s5ytYNn85kMFED8KnWce3/js/lib/ZeroFrame.coffee ---- */


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


/* ---- /1oEY4zYmwPH4s5ytYNn85kMFED8KnWce3/js/ZeroCoffee.coffee ---- */


(function() {
  var ZeroCoffee,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroCoffee = (function(superClass) {
    extend(ZeroCoffee, superClass);

    function ZeroCoffee() {
      this.sendMessage = bind(this.sendMessage, this);
      this.route = bind(this.route, this);
      this.selectUser = bind(this.selectUser, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return ZeroCoffee.__super__.constructor.apply(this, arguments);
    }

    ZeroCoffee.prototype.init = function() {
      return console.log("Online");
    };

    ZeroCoffee.prototype.onOpenWebsocket = function(e) {
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          if (document.querySelector("#online") !== null) {
            document.querySelector("#online").innerHTML = site_info.peers.toString();
          }
          if (document.querySelector("#userid") !== null) {
            document.querySelector("#userid").textContent = site_info.cert_user_id;
          } else {
            document.querySelector("#userid").textContent = "SELECT USER";
          }
          console.log("siteInfo response: " + JSON.stringify(site_info, null, 2));
          return null;
        };
      })(this));
      return this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {
          console.log("serverInfo response:" + JSON.stringify(server_info, null, 2));
          return null;
        };
      })(this));
    };

    ZeroCoffee.prototype.selectUser = function() {
      Page.cmd("certSelect", [["zeroid.bit"]]);
      return false;
    };

    ZeroCoffee.prototype.route = function(cmd, message) {
      console.log("Update Site Info");
      if (cmd === "setSiteInfo") {
        if (document.querySelector("#userid") !== null) {
          if (message.params.cert_user_id) {
            document.querySelector("#userid").textContent = message.params.cert_user_id;
          } else {
            document.querySelector("#userid").textContent = "SELECT USER";
          }
          return this.site_info = message.params;
        }
      }
    };

    ZeroCoffee.prototype.sendMessage = function() {
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
            "body": document.getElementById("commentContent").value,
            "date_added": +(new Date)
          });
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (res === "ok") {
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                return document.getElementById("commentContent").value = "";
              });
            } else {
              return _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            }
          });
        };
      })(this));
      return false;
    };

    return ZeroCoffee;

  })(ZeroFrame);

  window.Page = new ZeroCoffee();

}).call(this);



/* ---- /1oEY4zYmwPH4s5ytYNn85kMFED8KnWce3/js/script.js ---- */


window.onload = function(e){
	window.onscroll = function(e){
		var wrap = document.querySelector(".wrap"),
			top = document.querySelector(".top"),
			allHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight,
			scrollHeight = document.body.scrollTop;
		// console.log((scrollHeight / allHeight).toFixed(3));
		top.style.opacity = scrollHeight / allHeight;
		top.onclick = function(e){
			document.body.scrollTop = 0;
		}
	}
	
}