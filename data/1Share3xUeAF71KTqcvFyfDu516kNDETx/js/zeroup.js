(function () {
    var ZeroUp,
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

    window.h = maquette.h;

    ZeroUp = (function (superClass) {
        extend(ZeroUp, superClass);

        function ZeroUp() {
            this.handleLinkClick = bind(this.handleLinkClick, this);
            this.updateSiteInfo = bind(this.updateSiteInfo, this);
            this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
            return ZeroUp.__super__.constructor.apply(this, arguments);
        }

        ZeroUp.prototype.init = function () {
            this.bg = new Bg($("#Bg"));
            this.state = {};
            this.state.page = "list";
            this.on_site_info = new Promise();
            return this.on_loaded = new Promise();

        };

        ZeroUp.prototype.createProjector = function () {
            var url;
            /*menustate = 1;*/
            this.projector = maquette.createProjector();
            this.list = new List();
            this.videoPlayer = new VideoPlayer();
            this.menuAll = new MenuAll();
            this.selector = new Selector();
            this.uploader = new Uploader();
            if (base.href.indexOf("?") === -1) {
                this.route("");
            } else {
                url = base.href.replace(/.*?\?/, "");
                this.history_state["url"] = url;

                if (base.href.indexOf("watch") > -1) {
                    this.videoRoute();
                } else if (base.href.indexOf("Channel") > -1) {
                    this.channelRoute();
                } else {
                    this.route(url);
                }
                ;
            }
            this.projector.replace($("#listavideos"), this.list.render);
            this.projector.replace($("#menu_left"), this.menuAll.render);
            this.projector.replace($("#main_upload_placeholder"), this.menuAll.render_top);
            return this.projector.replace($("#Uploader"), this.uploader.render);
        };

        ZeroUp.prototype.videoRoute = function () {
            var href_video = base.href.split('=', 2);
            var text_video = href_video[1];
            var new_text = text_video.split('_', 2);

            var vid_date_added = new_text[0];
            var vid_user_directory = new_text[1];

            this.videoPlayer.render(vid_date_added, vid_user_directory);
            return this;
        };

        ZeroUp.prototype.channelRoute = function () {
            var href_channel = base.href.split('=')[1];
            document.getElementById('debugger1').innerHTML = href_channel;
            Page.list.openVideoChannel();
        };

        ZeroUp.prototype.setPage = function (page_name) {
            this.state.page = page_name;
            return this.projector.scheduleRender();
        };

        ZeroUp.prototype.setSiteInfo = function (site_info) {
            return this.site_info = site_info;
        };

        ZeroUp.prototype.onOpenWebsocket = function () {
            this.updateSiteInfo();
            return this.cmd("serverInfo", {}, (function (_this) {
                return function (server_info) {
                    _this.server_info = server_info;
                    if (_this.server_info.rev < 3090) {
                        return _this.cmd("wrapperNotification", ["error", "This site requires ZeroNet 0.6.0"]);
                    }
                };
            })(this));
        };

        ZeroUp.prototype.updateSiteInfo = function () {
            return this.cmd("siteInfo", {}, (function (_this) {
                return function (site_info) {
                    _this.address = site_info.address;
                    _this.setSiteInfo(site_info);
                    return _this.on_site_info.resolve();
                };
            })(this));
        };

        ZeroUp.prototype.onRequest = function (cmd, params) {
            var ref, ref1;
            if (cmd === "setSiteInfo") {
                this.setSiteInfo(params);
                if ((ref = (ref1 = params.event) != null ? ref1[0] : void 0) === "file_done" || ref === "file_delete" || ref === "peernumber_updated") {
                    return RateLimit(1000, (function (_this) {
                        return function () {
                            _this.list.need_update = true;
                            return Page.projector.scheduleRender();
                        };
                    })(this));
                }
            } else if (cmd === "wrapperPopState") {
                if (params.state) {
                    if (!params.state.url) {
                        params.state.url = params.href.replace(/.*\?/, "");
                    }
                    this.on_loaded.resolved = false;
                    //document.body.className = "";
                    window.scroll(window.pageXOffset, params.state.scrollTop || 0);
                    return this.route(params.state.url || "");
                }
            } else {
                return this.log("Unknown command", cmd, params);
            }
        };

        ZeroUp.prototype.route = function (query) {
            this.params = Text.queryParse(query);
            this.log("Route", this.params);
            this.content = this.list;
            if (this.params.url) {
                this.list.type = this.params.url;
                this.menuAll.type = this.params.url;
            }
            this.content.limit = 10;
            this.content.need_update = true;
            return this.projector.scheduleRender();
        };

        ZeroUp.prototype.setUrl = function (url, mode) {
            if (mode == null) {
                mode = "push";
            }
            url = url.replace(/.*?\?/, "");
            this.log("setUrl", this.history_state["url"], "->", url);
            if (this.history_state["url"] === url) {
                this.content.update();
                return false;
            }
            this.history_state["url"] = url;
            if (mode === "replace") {
                this.cmd("wrapperReplaceState", [this.history_state, "", url]);
            } else {
                this.cmd("wrapperPushState", [this.history_state, "", url]);
            }
            this.route(url);
            return false;
        };

        ZeroUp.prototype.handleLinkClick = function (e) {
            document.getElementById("VideoPlayer").innerHTML = "";
            if (e.which === 2) {
                return true;
            } else {
                this.log("save scrollTop", window.pageYOffset);
                this.history_state["scrollTop"] = window.pageYOffset;
                this.cmd("wrapperReplaceState", [this.history_state, null]);
                window.scroll(window.pageXOffset, 0);
                this.history_state["scrollTop"] = 0;
                this.on_loaded.resolved = false;
                //document.body.className = "";
                this.setUrl(e.currentTarget.search);
                return false;
            }
        };

        ZeroUp.prototype.createUrl = function (key, val) {
            var params, vals;
            params = JSON.parse(JSON.stringify(this.params));
            if (typeof key === "Object") {
                vals = key;
                for (key in keys) {
                    val = keys[key];
                    params[key] = val;
                }
            } else {
                params[key] = val;
            }
            return "?" + Text.queryEncode(params);
        };

        ZeroUp.prototype.returnFalse = function () {
            return false;
        };

        return ZeroUp;

    })(ZeroFrame);

    window.Page = new ZeroUp();

    window.Page.createProjector();

}).call(this);
