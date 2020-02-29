
(function () {
    var Autosize,
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

    Autosize = (function (superClass) {
        extend(Autosize, superClass);

        function Autosize(attrs1) {
            var base;
            this.attrs = attrs1 != null ? attrs1 : {};
            this.render = bind(this.render, this);
            this.handleKeydown = bind(this.handleKeydown, this);
            this.handleInput = bind(this.handleInput, this);
            this.autoHeight = bind(this.autoHeight, this);
            this.setValue = bind(this.setValue, this);
            this.storeNode = bind(this.storeNode, this);
            this.node = null;
            if ((base = this.attrs).classes == null) {
                base.classes = {};
            }
            this.attrs.classes.loading = false;
            this.attrs.oninput = this.handleInput;
            this.attrs.onkeydown = this.handleKeydown;
            this.attrs.afterCreate = this.storeNode;
            this.attrs.rows = 1;
            this.attrs.disabled = false;
        }

        Autosize.property('loading', {
            get: function () {
                return this.attrs.classes.loading;
            },
            set: function (loading) {
                this.attrs.classes.loading = loading;
                this.node.value = this.attrs.value;
                this.autoHeight();
                return Page.projector.scheduleRender();
            }
        });

        Autosize.prototype.storeNode = function (node) {
            this.node = node;
            if (this.attrs.focused) {
                node.focus();
            }
            return setTimeout((function (_this) {
                return function () {
                    return _this.autoHeight();
                };
            })(this));
        };

        Autosize.prototype.setValue = function (value) {
            if (value == null) {
                value = null;
            }
            this.attrs.value = value;
            if (this.node) {
                this.node.value = value;
                this.autoHeight();
            }
            return Page.projector.scheduleRender();
        };

        Autosize.prototype.autoHeight = function () {
            var h, height_before, scrollh;
            height_before = this.node.style.height;
            if (height_before) {
                this.node.style.height = "0px";
            }
            h = this.node.offsetHeight;
            scrollh = this.node.scrollHeight;
            this.node.style.height = height_before;
            if (scrollh > h) {
                return anime({
                    targets: this.node,
                    height: scrollh,
                    scrollTop: 0
                });
            } else {
                return this.node.style.height = height_before;
            }
        };

        Autosize.prototype.handleInput = function (e) {
            if (e == null) {
                e = null;
            }
            this.attrs.value = e.target.value;
            return RateLimit(300, this.autoHeight);
        };

        Autosize.prototype.handleKeydown = function (e) {
            if (e == null) {
                e = null;
            }
            if (e.which === 13 && !e.shiftKey && this.attrs.onsubmit && this.attrs.value.trim()) {
                this.attrs.onsubmit();
                setTimeout(((function (_this) {
                    return function () {
                        return _this.autoHeight();
                    };
                })(this)), 100);
                return false;
            }
        };

        Autosize.prototype.render = function (body) {
            var attrs;
            if (body == null) {
                body = null;
            }
            if (body && this.attrs.value === void 0) {
                this.setValue(body);
            }
            if (this.loading) {
                attrs = clone(this.attrs);
                attrs.disabled = true;
                return h("textarea.autosize", attrs);
            } else {
                return h("textarea.autosize", this.attrs);
            }
        };

        return Autosize;

    })(Class);

    window.Autosize = Autosize;

}).call(this);