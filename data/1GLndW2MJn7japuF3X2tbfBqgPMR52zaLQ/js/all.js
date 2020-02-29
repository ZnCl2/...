

/* ---- /1GLndW2MJn7japuF3X2tbfBqgPMR52zaLQ/js/lib/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.onRequest = bind(this.onRequest, this);
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
        return this.onRequest(cmd, message);
      }
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
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


/* ---- /1GLndW2MJn7japuF3X2tbfBqgPMR52zaLQ/js/GetAllHub.coffee ---- */


(function() {
  var GetAllHub,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  GetAllHub = (function(superClass) {
    extend(GetAllHub, superClass);

    function GetAllHub() {
      this.onRequest = bind(this.onRequest, this);
      this.init = bind(this.init, this);
      return GetAllHub.__super__.constructor.apply(this, arguments);
    }

    GetAllHub.prototype.init = function() {
      return this.siteList = ['1BLueGvui1GdbtsjcKqCf4F67uKfritG49', '1GrEenUGRWnzaNZjR3XsQa6dQgdPDTyt7i', '1RedkCkVaXuVXrqCMpoXQS29bwaqsuFdL', '1oranGeS2xsKZ4jVsu9SVttzgkYXu4k9v', '18FheQ1v3bz4iv5yx8hr9hg5W5BJ8WNJ8d', 'hub.kaffie.bit', '1ARSTRDgMSH2E81pcZCbaEq28TZ72Levxh', '16bNGdxFkGWGnCEfVue3w4CSp3Ew2hcyBB', '12rTbtzcEZH7RiVfShBB3qhoe3rfwbpm8S', '1JUDmCT4UCSdnPsJAHBoXNkDS61Y31Ue52', '1Gb25pK7XqrgnBYjhHLGBjEYURg2MhbJCq', '1HNf26SK9Hi9LES1kUKg6r36hDwhBdNBKM', '1GnSLuqqmB8oRAJ4SK4hvzt6Jo1qAnEbXn', '149fpM31r6YUc7WZ1m28Lq6Ef3zwdBFKBq', '1KNmG5rJUGhgUJGFbLkv2B5isaqu9PrZqi', '1MATTnuthfsvTUqEwtvTR6nMiLmtqGXyfv', '15mV5T1R1wxg3E1FPsvZw19bw6QzvRREfn', '12cm58PYhaSaHUkKgsbf62Rg9Db5DukWYd', '1CiGGh6RrTtaTJfutVKUrfURsP5J4stJDk', '185yXNL48LTZyKfNo6WgyKshtMgcV3mecL', '1AbRRDveQD5EFtmXxBqQfS1guUWXxytMJZ', '1D7xb8vwnWUYSXziENcnoi3meD5Gk2xgFj', '1LQeBa8AgXPd9YXyfTGm9FbcJZTM4p1vgY', '1CouTPX7rK6cyffPCyyxttdZhB1u7NPtqz','1White24UrrwQrD86o6Vrc1apgZ1x1o51', '1ABFCaadiEa3bFNzN3RcCZSsviqMNTbz3m', '1Jhb5snQN5z198ELyFoj2apeuuaRCM9Pqm', '1N9sU8qh3S4ei9PHE1qQyYPbcckJomvwMd', '1SunAWK2VUT9GQK32MpwRfFPVgcBSJN9a', '1H51ZJ118ubwYAceszZ6CRMp4MPaSwcMh1'];
    };

    GetAllHub.prototype.onOpenWebsocket = function() {
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          _this.permission = indexOf.call(site_info.settings.permissions, 'Merger:ZeroMe') >= 0;
          return _this.siteInfo = site_info;
        };
      })(this));
    };

    GetAllHub.prototype.onRequest = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        return this.siteInfo = message.params;
      } else {
        return this.log("Unknown incoming message:", cmd);
      }
    };

    GetAllHub.prototype.addHub = function() {
      if (!this.permission) {
        this.requirePermission();
        return;
      }
      return this.cmd('mergerSiteAdd', [this.siteList], (function(_this) {
        return function(e) {
          return _this.cmd("wrapperNotification", ["done", "Please click <b>\"add\"</b> to seed these hub and then you can see all post in ZeroMe!", 10000]);
        };
      })(this));
    };

    GetAllHub.prototype.requirePermission = function() {
      return this.cmd('wrapperPermissionAdd', ['Merger:ZeroMe'], (function(_this) {
        return function(e) {
          if (e === 'Granted') {
            _this.permission = true;
            return _this.addHub();
          }
        };
      })(this));
    };

    GetAllHub.prototype.buttonClick = function() {
      return this.addHub();
    };

    return GetAllHub;

  })(ZeroFrame);

  window.GetAllHub = new GetAllHub();

}).call(this);
