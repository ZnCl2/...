(function () {
    var ZeroFrame,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key))
                        child[key] = parent[key];
                }
                function ctor() {
                    this.constructor = child;
                }
                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

    ZeroFrame = (function (superClass) {
        extend(ZeroFrame, superClass);

        function ZeroFrame(url) {
            this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
            this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
            this.onRequest = bind(this.onRequest, this);
            this.onMessage = bind(this.onMessage, this);
            this.queue = [];
            this.url = url;
            this.waiting_cb = {};
            this.history_state = {};
            this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
            this.connect();
            this.next_message_id = 1;
            this.init();
            this.ready = false;
        }

        ZeroFrame.prototype.init = function () {
            return this;
        };

        ZeroFrame.prototype.connect = function () {
            this.target = window.parent;
            window.addEventListener("message", this.onMessage, false);
            this.send({
                "cmd": "innerReady"
            });
            window.addEventListener("beforeunload", (function (_this) {
                return function (e) {
                    _this.log("Save scrollTop", window.pageYOffset);
                    _this.history_state["scrollTop"] = window.pageYOffset;
                    return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
                };
            })(this));
            return this.cmd("wrapperGetState", [], (function (_this) {
                return function (state) {
                    return _this.handleState(state);
                };
            })(this));
        };

        ZeroFrame.prototype.handleState = function (state) {
            if (state != null) {
                this.history_state = state;
            }
            this.log("Restore scrollTop", state, window.pageYOffset);
            if (window.pageYOffset === 0 && state) {
                return window.scroll(window.pageXOffset, state.scrollTop);
            }
        };

        ZeroFrame.prototype.onMessage = function (e) {
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
                return this.send({
                    "cmd": "innerReady"
                });
            } else if (cmd === "ping") {
                return this.response(message.id, "pong");
            } else if (cmd === "wrapperOpenedWebsocket") {
                this.onOpenWebsocket();
                this.ready = true;
                return this.processQueue();
            } else if (cmd === "wrapperClosedWebsocket") {
                return this.onCloseWebsocket();
            } else if (cmd === "wrapperPopState") {
                this.handleState(message.params.state);
                return this.onRequest(cmd, message.params);
            } else {
                return this.onRequest(cmd, message.params);
            }
        };

        ZeroFrame.prototype.processQueue = function () {
            var cb, cmd, i, len, params, ref, ref1;
            ref = this.queue;
            for (i = 0, len = ref.length; i < len; i++) {
                ref1 = ref[i], cmd = ref1[0], params = ref1[1], cb = ref1[2];
                this.cmd(cmd, params, cb);
            }
            return this.queue = [];
        };

        ZeroFrame.prototype.onRequest = function (cmd, message) {
            return this.log("Unknown request", message);
        };

        ZeroFrame.prototype.response = function (to, result) {
            return this.send({
                "cmd": "response",
                "to": to,
                "result": result
            });
        };

        ZeroFrame.prototype.cmd = function (cmd, params, cb) {
            if (params == null) {
                params = {};
            }
            if (cb == null) {
                cb = null;
            }
            if (this.ready) {
                return this.send({
                    "cmd": cmd,
                    "params": params
                }, cb);
            } else {
                return this.queue.push([cmd, params, cb]);
            }
        };

        ZeroFrame.prototype.send = function (message, cb) {
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

        ZeroFrame.prototype.onOpenWebsocket = function () {
            return this.log("Websocket open");
        };

        ZeroFrame.prototype.onCloseWebsocket = function () {
            return this.log("Websocket close");
        };

        return ZeroFrame;

    })(Class);

    window.ZeroFrame = ZeroFrame;

}).call(this);