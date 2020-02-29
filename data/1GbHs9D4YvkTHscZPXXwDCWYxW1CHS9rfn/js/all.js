
/* ---- /1uPDaT3uSyWAPdCv1WkMb5hBQjWSNNACf/js/utils/Class.coffee ---- */


(function() {
  var Class,
    slice = [].slice;

  Class = (function() {
    function Class() {}

    Class.prototype.trace = true;

    Class.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!this.trace) {
        return;
      }
      if (typeof console === 'undefined') {
        return;
      }
      args.unshift("[" + this.constructor.name + "]");
      console.log.apply(console, args);
      return this;
    };

    Class.prototype.logStart = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (!this.trace) {
        return;
      }
      this.logtimers || (this.logtimers = {});
      this.logtimers[name] = +(new Date);
      if (args.length > 0) {
        this.log.apply(this, ["" + name].concat(slice.call(args), ["(started)"]));
      }
      return this;
    };

    Class.prototype.logEnd = function() {
      var args, ms, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ms = +(new Date) - this.logtimers[name];
      this.log.apply(this, ["" + name].concat(slice.call(args), ["(Done in " + ms + "ms)"]));
      return this;
    };

    return Class;

  })();

  window.Class = Class;

}).call(this);

/* ---- /1uPDaT3uSyWAPdCv1WkMb5hBQjWSNNACf/js/utils/Prototypes.coffee ---- */


(function() {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) === s;
  };

  String.prototype.endsWith = function(s) {
    return s === '' || this.slice(-s.length) === s;
  };

  String.prototype.repeat = function(count) {
    return new Array(count + 1).join(this);
  };

  window.isEmpty = function(obj) {
    var key;
    for (key in obj) {
      return false;
    }
    return true;
  };

}).call(this);

/* ---- /1uPDaT3uSyWAPdCv1WkMb5hBQjWSNNACf/js/utils/RateLimit.coffee ---- */


(function() {
  var call_after_interval, limits;

  limits = {};

  call_after_interval = {};

  window.RateLimit = function(interval, fn) {
    if (!limits[fn]) {
      call_after_interval[fn] = false;
      fn();
      return limits[fn] = setTimeout((function() {
        if (call_after_interval[fn]) {
          fn();
        }
        delete limits[fn];
        return delete call_after_interval[fn];
      }), interval);
    } else {
      return call_after_interval[fn] = true;
    }
  };

}).call(this);

/* ---- /1uPDaT3uSyWAPdCv1WkMb5hBQjWSNNACf/js/utils/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroFrame = (function(superClass) {
    extend(ZeroFrame, superClass);

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
      this.history_state = {};
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      this.cmd("innerReady");
      window.addEventListener("beforeunload", (function(_this) {
        return function(e) {
          _this.log("save scrollTop", window.pageYOffset);
          _this.history_state["scrollTop"] = window.pageYOffset;
          return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
        };
      })(this));
      return this.cmd("wrapperGetState", [], (function(_this) {
        return function(state) {
          if (state != null) {
            _this.history_state = state;
          }
          _this.log("restore scrollTop", state, window.pageYOffset);
          if (window.pageYOffset === 0 && state) {
            return window.scroll(window.pageXOffset, state.scrollTop);
          }
        };
      })(this));
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
        return this.onRequest(cmd, message.params);
      }
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
      return this.log("Unknown request", message);
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

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })(Class);

  window.ZeroFrame = ZeroFrame;

}).call(this);

/* ---- /1uPDaT3uSyWAPdCv1WkMb5hBQjWSNNACf/js/ZeroUpdate.coffee ---- */


(function() {
  var ZeroUpdate,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroUpdate = (function(superClass) {
    extend(ZeroUpdate, superClass);

    function ZeroUpdate() {
      this.onRequest = bind(this.onRequest, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.updateBadFiles = bind(this.updateBadFiles, this);
      this.updateVersionInfo = bind(this.updateVersionInfo, this);
      this.updateHtml = bind(this.updateHtml, this);
      this.setSiteInfo = bind(this.setSiteInfo, this);
      this.setServerInfo = bind(this.setServerInfo, this);
      this.handleUpdateClick = bind(this.handleUpdateClick, this);
      return ZeroUpdate.__super__.constructor.apply(this, arguments);
    }

    ZeroUpdate.prototype.init = function() {
      this.latest_version = "...";
      this.latest_rev = "...";
      this.server_info = {};
      this.left_num = null;
      this.site_info;
      return document.getElementById("button").onclick = this.handleUpdateClick;
    };

    ZeroUpdate.prototype.handleUpdateClick = function() {
      Page.cmd("serverUpdate");
      return false;
    };

    ZeroUpdate.prototype.setServerInfo = function(server_info) {
      this.server_info = server_info;
      this.cmd("optionalHelpList", [], (function(_this) {
        return function(res) {
          _this.log("Optional help: " + (JSON.stringify(res)) + ", dist type: " + server_info.dist_type);
          if (server_info.dist_type.startsWith("bundle_") && !res[server_info.dist_type]) {
            return Page.cmd("optionalHelp", [server_info.dist_type, "Runtime files"]);
          }
        };
      })(this));
      return this.updateHtml();
    };

    ZeroUpdate.prototype.setSiteInfo = function(site_info) {
      this.site_info = site_info;
      return this.updateHtml();
    };

    ZeroUpdate.prototype.updateHtml = function() {
      var button_elem, percent, ref;
      document.getElementById("version_running").innerText = this.server_info.version + " (rev" + this.server_info.rev + ")";
      document.getElementById("version_latest").innerText = this.latest_version + " (rev" + this.latest_rev + ")";
      if (this.latest_rev === this.server_info.rev) {
        document.body.className = "result-latest";
        document.getElementById("result").innerText = "On the edge with the latest revision!";
      } else if (this.latest_version === this.server_info.version) {
        document.body.className = "result-sameversion";
        document.getElementById("result").innerText = "Latest version!";
      } else if (this.latest_version !== "...") {
        document.body.className = "result-outdated";
        document.getElementById("result").innerText = "Outdated!";
      }
      button_elem = document.getElementById("button");
      if (this.left_num === 0) {
        button_elem.classList.remove("disabled");
        button_elem.innerText = "Update to latest version";
      } else if (this.left_num > 0) {
        button_elem.innerText = "Downloading: " + ((ref = this.site_info) != null ? ref.bad_files : void 0) + " files";
      } else {
        button_elem.innerText = "Downloading...";
      }
      if (this.site_info) {
        if (this.site_info.started_task_num > 0) {
          percent = this.site_info.bad_files / this.site_info.started_task_num;
        } else {
          percent = 0;
        }
        return button_elem.style.boxShadow = (0 - parseInt(percent * 240)) + "px 0px 0px rgba(0,0,0,0.2) inset";
      }
    };

    ZeroUpdate.prototype.updateVersionInfo = function() {
      return Page.cmd("fileGet", "core/src/Config.py", (function(_this) {
        return function(config_py) {
          _this.latest_rev = parseInt(config_py.match(/self.rev = ([0-9]+)/)[1]);
          _this.latest_version = config_py.match(/self.version = "([0-9\\.]+)"/)[1];
          return _this.updateHtml();
        };
      })(this));
    };

    ZeroUpdate.prototype.updateBadFiles = function() {
      return this.cmd("siteBadFiles", [], (function(_this) {
        return function(bad_files) {
          var bad_file, i, len;
          _this.left_num = 0;
          for (i = 0, len = bad_files.length; i < len; i++) {
            bad_file = bad_files[i];
            if (bad_file.startsWith("core/")) {
              _this.left_num += 1;
            }
          }
          console.log("Files left: " + _this.left_num);
          return _this.updateHtml();
        };
      })(this));
    };

    ZeroUpdate.prototype.onOpenWebsocket = function() {
      this.cmd("serverInfo", {}, this.setServerInfo);
      this.cmd("siteInfo", {}, this.setSiteInfo);
      this.updateVersionInfo();
      return this.updateBadFiles();
    };

    ZeroUpdate.prototype.onRequest = function(cmd, message) {
      var ref;
      if (cmd === "setSiteInfo") {
        this.setSiteInfo(message);
        if (((ref = message.event) != null ? ref[1] : void 0) === "core/src/Config.py") {
          this.updateVersionInfo();
        }
        return RateLimit(1000, this.updateBadFiles);
      }
    };

    return ZeroUpdate;

  })(ZeroFrame);

  window.Page = new ZeroUpdate();

}).call(this);
