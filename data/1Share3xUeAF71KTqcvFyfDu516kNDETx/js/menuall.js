(function () {
    var MenuAll,
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

    MenuAll = (function (superClass) {
        extend(MenuAll, superClass);

        function MenuAll() {
            this.render = bind(this.render, this);
            this.render_top = bind(this.render_top, this);
            this.type = "Home";
        }

        MenuAll.prototype.getUserId = function () {
            Page.setUrl("?Channel=" + Page.site_info.cert_user_id);
            document.getElementById('debugger1').innerHTML = Page.site_info.cert_user_id;
            Page.list.openVideoChannel();
            return this;
        };

        // Render top menu items
        MenuAll.prototype.render_top = function () {
            return h("div.main_upload_placeholder", [
                h("a.upload", {
                    href: "#",
                    onclick: Page.selector.handleBrowseClick
                }, [h("div.main_upload")]),
            ]);
        };

        // Render left menu items
        MenuAll.prototype.render = function () {
            return h("div.menu_left", [
                h("ul.list-types-new", [
                    h("li.ytd-item-home", [h("a.list-type.ytd-home", {
                            href: "?Home",
                            onclick: Page.handleLinkClick,
                            classes: {
                                active: this.type === "Home"
                            }
                        }, [h("i.yt-icon-menu-left", {}, "")], "Home")]),

                    // Trending
                    h("li.ytd-item-trending", [h("a.list-type.ytd-trending", {
                            href: "?Trending",
                            onclick: Page.handleLinkClick,
                            classes: {
                                active: this.type === "Trending"
                            }
                        }, [h("i.yt-icon-menu-left", {}, "")], "Trending")]),

                    // Latest
                    h("li.ytd-item-latest", [h("a.list-type.ytd-latest", {
                            href: "?Latest",
                            onclick: Page.handleLinkClick,
                            classes: {
                                active: this.type === "Latest"
                            }
                        }, [h("i.yt-icon-menu-left", {}, "")], "View New")]),

                    // My
                    h("li.ytd-item-channel", [h("a.list-type.ytd-my-channel", {
                            href: "?My",
                            onclick: Page.handleLinkClick,
                            classes: {
                                active: this.type === "My"
                            }
                        }, [h("i.yt-icon-menu-left", {}, "")], "My Channel")]),

                    // Seeding
                    h("li.ytd-item-seeding", [h("a.list-type.ytd-seeding", {
                            href: "?Seeding",
                            onclick: Page.handleLinkClick,
                            classes: {
                                active: this.type === "Seeding"
                            }
                        }, [h("i.yt-icon-menu-left", {}, "")], "History")]),

                    h("li.menu_not_react", {}, "RELATED SITES"),

                    // Telegram
                    h("li.ytd-item-telegram", [h("a.list-type.ytd-telegram", {
                            href: "/Talk.ZeroNetwork.bit/?Topic:1552575038_17ArNJgy6YwDKjMSsnx1es2ie5jLHJbD9P/ShareTube+Project",
                        }, [h("i.yt-icon-menu-left", {}, "💬")], "ZeroTalk")])
                            //<div class="minero-donate-widget" data-key="36b00a9d7c698afb2be57b3c1f1769e7" data-autostart="false" data-speed="low"><em>Please disable Adblock!</em></div>
                ]),
                h("iframe.aads", {
                    'data-aa': "1136721",
                    'src': '//acceptable.a-ads.com/1136721',
                    'scrolling': 'no',
                    'style': 'border:0px; padding:0; overflow:hidden',
                    'allowtransparency': 'true'
                }, "A-Ads Frame"),
                h("div#cpu_time_donation_link", {
                },/* h("a", {
                    'href': 'javascript:void',
                    'onclick': 'donateCpuTime()'
                }, "I want to donate CPU time")*/)
            ]);
        };

        return MenuAll;

    })(Class);

    window.MenuAll = MenuAll;

}).call(this);
