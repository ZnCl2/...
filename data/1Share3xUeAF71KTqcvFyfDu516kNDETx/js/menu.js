
(function () {
    var Menu,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

    Menu = (function () {
        function Menu() {
            this.render = bind(this.render, this);
            this.renderItem = bind(this.renderItem, this);
            this.handleClick = bind(this.handleClick, this);
            this.storeNode = bind(this.storeNode, this);
            this.toggle = bind(this.toggle, this);
            this.hide = bind(this.hide, this);
            this.show = bind(this.show, this);
            this.visible = false;
            this.items = [];
            this.node = null;
        }

        Menu.prototype.show = function () {
            var ref;
            if ((ref = window.visible_menu) != null) {
                ref.hide();
            }
            this.visible = true;
            return window.visible_menu = this;
        };

        Menu.prototype.hide = function () {
            return this.visible = false;
        };

        Menu.prototype.toggle = function () {
            if (this.visible) {
                this.hide();
            } else {
                this.show();
            }
            return Page.projector.scheduleRender();
        };

        Menu.prototype.addItem = function (title, cb, selected) {
            if (selected == null) {
                selected = false;
            }
            return this.items.push([title, cb, selected]);
        };

        Menu.prototype.storeNode = function (node) {
            this.node = node;
            if (this.visible) {
                node.className = node.className.replace("visible", "");
                return setTimeout((function () {
                    return node.className += " visible";
                }), 10);
            }
        };

        Menu.prototype.handleClick = function (e) {
            var cb, i, item, keep_menu, len, ref, selected, title;
            keep_menu = false;
            ref = this.items;
            for (i = 0, len = ref.length; i < len; i++) {
                item = ref[i];
                title = item[0], cb = item[1], selected = item[2];
                if (title === e.target.textContent) {
                    keep_menu = cb(item);
                }
            }
            if (keep_menu !== true) {
                this.hide();
            }
            return false;
        };

        Menu.prototype.renderItem = function (item) {
            var cb, href, onclick, selected, title;
            title = item[0], cb = item[1], selected = item[2];
            if (typeof selected === "function") {
                selected = selected();
            }
            if (title === "---") {
                return h("div.menu-item-separator");
            } else {
                if (typeof cb === "string") {
                    href = cb;
                    onclick = true;
                } else {
                    href = "#" + title;
                    onclick = this.handleClick;
                }
                return h("a.menu-item", {
                    href: href,
                    onclick: onclick,
                    key: title,
                    classes: {
                        "selected": selected
                    }
                }, [title]);
            }
        };

        Menu.prototype.render = function (class_name) {
            if (class_name == null) {
                class_name = "";
            }
            if (this.visible || this.node) {
                return h("div.menu" + class_name, {
                    classes: {
                        "visible": this.visible
                    },
                    afterCreate: this.storeNode
                }, this.items.map(this.renderItem));
            }
        };

        return Menu;

    })();

    window.Menu = Menu;

    document.body.addEventListener("mouseup", function (e) {
        if (!window.visible_menu || !window.visible_menu.node) {
            return false;
        }
        if (e.target !== window.visible_menu.node.parentNode && e.target.parentNode !== window.visible_menu.node && e.target.parentNode !== window.visible_menu.node.parentNode && e.target.parentNode !== window.visible_menu.node && e.target.parentNode.parentNode !== window.visible_menu.node.parentNode) {
            window.visible_menu.hide();
            return Page.projector.scheduleRender();
        }
    });

}).call(this);