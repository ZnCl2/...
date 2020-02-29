/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/lib/Class.coffee ---- */
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


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/lib/Dollar.coffee ---- */


(function() {
    window.$ = function(selector) {
        if (selector.startsWith("#")) {
            return document.getElementById(selector.replace("#", ""));
        }
    };

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/lib/Promise.coffee ---- */


(function() {
    var Promise,
        slice = [].slice;

    Promise = (function() {
        Promise.join = function() {
            var args, fn, i, len, num_uncompleted, promise, task, task_id, tasks;
            tasks = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            num_uncompleted = tasks.length;
            args = new Array(num_uncompleted);
            promise = new Promise();
            fn = function(task_id) {
                return task.then(function() {
                    var callback, j, len1, ref, results;
                    args[task_id] = Array.prototype.slice.call(arguments);
                    num_uncompleted--;
                    if (num_uncompleted === 0) {
                        ref = promise.callbacks;
                        results = [];
                        for (j = 0, len1 = ref.length; j < len1; j++) {
                            callback = ref[j];
                            results.push(callback.apply(promise, args));
                        }
                        return results;
                    }
                });
            };
            for (task_id = i = 0, len = tasks.length; i < len; task_id = ++i) {
                task = tasks[task_id];
                fn(task_id);
            }
            return promise;
        };

        function Promise() {
            this.resolved = false;
            this.end_promise = null;
            this.result = null;
            this.callbacks = [];
        }

        Promise.prototype.resolve = function() {
            var back, callback, i, len, ref;
            if (this.resolved) {
                return false;
            }
            this.resolved = true;
            this.data = arguments;
            if (!arguments.length) {
                this.data = [true];
            }
            this.result = this.data[0];
            ref = this.callbacks;
            for (i = 0, len = ref.length; i < len; i++) {
                callback = ref[i];
                back = callback.apply(callback, this.data);
            }
            if (this.end_promise && back && back.then) {
                return back.then((function(_this) {
                    return function(back_res) {
                        return _this.end_promise.resolve(back_res);
                    };
                })(this));
            }
        };

        Promise.prototype.fail = function() {
            return this.resolve(false);
        };

        Promise.prototype.then = function(callback) {
            if (this.resolved === true) {
                return callback.apply(callback, this.data);
            }
            this.callbacks.push(callback);
            this.end_promise = new Promise();
            return this.end_promise;
        };

        return Promise;

    })();

    window.Promise = Promise;


    /*
    s = Date.now()
    log = (text) ->
    	console.log Date.now()-s, Array.prototype.slice.call(arguments).join(", ")

    log "Started"

    cmd = (query) ->
    	p = new Promise()
    	setTimeout ( ->
    		p.resolve query+" Result"
    	), 100
    	return p


    back = cmd("SELECT * FROM message").then (res) ->
    	log res
    	p = new Promise()
    	setTimeout ( ->
    		p.resolve("DONE parsing SELECT")
    	), 100
    	return p
    .then (res) ->
    	log "Back of messages", res
    	return cmd("SELECT * FROM users")
    .then (res) ->
    	log "End result", res

    log "Query started", back


    q1 = cmd("SELECT * FROM anything")
    q2 = cmd("SELECT * FROM something")

    Promise.join(q1, q2).then (res1, res2) ->
      log res1, res2
     */

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/lib/Property.coffee ---- */


(function() {
    Function.prototype.property = function(prop, desc) {
        return Object.defineProperty(this.prototype, prop, desc);
    };

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/lib/Prototypes.coffee ---- */


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


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/lib/RateLimitCb.coffee ---- */


(function() {
    var call_after_interval, calling, last_time,
        slice = [].slice;

    last_time = {};

    calling = {};

    call_after_interval = {};

    window.RateLimitCb = function(interval, fn, args) {
        var cb;
        if (args == null) {
            args = [];
        }
        cb = function() {
            var left;
            left = interval - (Date.now() - last_time[fn]);
            if (left <= 0) {
                delete last_time[fn];
                if (calling[fn]) {
                    RateLimitCb(interval, fn, calling[fn]);
                }
                return delete calling[fn];
            } else {
                return setTimeout((function() {
                    delete last_time[fn];
                    if (calling[fn]) {
                        RateLimitCb(interval, fn, calling[fn]);
                    }
                    return delete calling[fn];
                }), left);
            }
        };
        if (last_time[fn]) {
            return calling[fn] = args;
        } else {
            last_time[fn] = Date.now();
            return fn.apply(this, [cb].concat(slice.call(args)));
        }
    };

    window.RateLimit = function(interval, fn) {
        if (!calling[fn]) {
            call_after_interval[fn] = false;
            fn();
            return calling[fn] = setTimeout((function() {
                if (call_after_interval[fn]) {
                    fn();
                }
                delete calling[fn];
                return delete call_after_interval[fn];
            }), interval);
        } else {
            return call_after_interval[fn] = true;
        }
    };


    /*
    window.s = Date.now()
    window.load = (done, num) ->
      console.log "Loading #{num}...", Date.now()-window.s
      setTimeout (-> done()), 1000

    RateLimit 500, window.load, [0] # Called instantly
    RateLimit 500, window.load, [1]
    setTimeout (-> RateLimit 500, window.load, [300]), 300
    setTimeout (-> RateLimit 500, window.load, [600]), 600 # Called after 1000ms
    setTimeout (-> RateLimit 500, window.load, [1000]), 1000
    setTimeout (-> RateLimit 500, window.load, [1200]), 1200  # Called after 2000ms
    setTimeout (-> RateLimit 500, window.load, [3000]), 3000  # Called after 3000ms
     */

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/Animation.coffee ---- */


(function() {
    var Animation;

    Animation = (function() {
        function Animation() {}

        Animation.prototype.slideDown = function(elem, props) {
            var border_bottom_width, border_top_width, cstyle, h, margin_bottom, margin_top, next_elem, padding_bottom, padding_top, parent, top_after, top_before, transition;
            h = elem.offsetHeight;
            cstyle = window.getComputedStyle(elem);
            margin_top = cstyle.marginTop;
            margin_bottom = cstyle.marginBottom;
            padding_top = cstyle.paddingTop;
            padding_bottom = cstyle.paddingBottom;
            border_top_width = cstyle.borderTopWidth;
            border_bottom_width = cstyle.borderBottomWidth;
            transition = cstyle.transition;
            if (window.Animation.shouldScrollFix(elem, props)) {
                top_after = document.body.scrollHeight;
                next_elem = elem.nextSibling;
                parent = elem.parentNode;
                parent.removeChild(elem);
                top_before = document.body.scrollHeight;
                console.log("Scrollcorrection down", top_before - top_after);
                window.scrollTo(window.scrollX, window.scrollY - (top_before - top_after));
                if (next_elem) {
                    parent.insertBefore(elem, next_elem);
                } else {
                    parent.appendChild(elem);
                }
                return;
            }
            if (props.animate_scrollfix && elem.getBoundingClientRect().top > 1600) {
                return;
            }
            elem.style.boxSizing = "border-box";
            elem.style.overflow = "hidden";
            if (!props.animate_noscale) {
                elem.style.transform = "scale(0.6)";
            }
            elem.style.opacity = "0";
            elem.style.height = "0px";
            elem.style.marginTop = "0px";
            elem.style.marginBottom = "0px";
            elem.style.paddingTop = "0px";
            elem.style.paddingBottom = "0px";
            elem.style.borderTopWidth = "0px";
            elem.style.borderBottomWidth = "0px";
            elem.style.transition = "none";
            setTimeout((function() {
                elem.className += " animate-inout";
                elem.style.height = h + "px";
                elem.style.transform = "scale(1)";
                elem.style.opacity = "1";
                elem.style.marginTop = margin_top;
                elem.style.marginBottom = margin_bottom;
                elem.style.paddingTop = padding_top;
                elem.style.paddingBottom = padding_bottom;
                elem.style.borderTopWidth = border_top_width;
                return elem.style.borderBottomWidth = border_bottom_width;
            }), 1);
            return elem.addEventListener("transitionend", function() {
                elem.classList.remove("animate-inout");
                elem.style.transition = elem.style.transform = elem.style.opacity = elem.style.height = null;
                elem.style.boxSizing = elem.style.marginTop = elem.style.marginBottom = null;
                elem.style.paddingTop = elem.style.paddingBottom = elem.style.overflow = null;
                elem.style.borderTopWidth = elem.style.borderBottomWidth = elem.style.overflow = null;
                return elem.removeEventListener("transitionend", arguments.callee, false);
            });
        };

        Animation.prototype.shouldScrollFix = function(elem, props) {
            var pos;
            pos = elem.getBoundingClientRect();
            if (props.animate_scrollfix && window.scrollY > 300 && pos.top < 0 && !document.querySelector(".noscrollfix:hover")) {
                return true;
            } else {
                return false;
            }
        };

        Animation.prototype.slideDownAnime = function(elem, props) {
            var cstyle;
            cstyle = window.getComputedStyle(elem);
            elem.style.overflowY = "hidden";
            return anime({
                targets: elem,
                height: [0, elem.offsetHeight],
                easing: 'easeInOutExpo'
            });
        };

        Animation.prototype.slideUpAnime = function(elem, remove_func, props) {
            elem.style.overflowY = "hidden";
            return anime({
                targets: elem,
                height: [elem.offsetHeight, 0],
                complete: remove_func,
                easing: 'easeInOutExpo'
            });
        };

        Animation.prototype.slideUp = function(elem, remove_func, props) {
            var next_elem, parent, top_after, top_before;
            if (window.Animation.shouldScrollFix(elem, props) && elem.nextSibling) {
                top_after = document.body.scrollHeight;
                next_elem = elem.nextSibling;
                parent = elem.parentNode;
                parent.removeChild(elem);
                top_before = document.body.scrollHeight;
                console.log("Scrollcorrection down", top_before - top_after);
                window.scrollTo(window.scrollX, window.scrollY + (top_before - top_after));
                if (next_elem) {
                    parent.insertBefore(elem, next_elem);
                } else {
                    parent.appendChild(elem);
                }
                remove_func();
                return;
            }
            if (props.animate_scrollfix && elem.getBoundingClientRect().top > 1600) {
                remove_func();
                return;
            }
            elem.className += " animate-inout";
            elem.style.boxSizing = "border-box";
            elem.style.height = elem.offsetHeight + "px";
            elem.style.overflow = "hidden";
            elem.style.transform = "scale(1)";
            elem.style.opacity = "1";
            elem.style.pointerEvents = "none";
            setTimeout((function() {
                var cstyle;
                cstyle = window.getComputedStyle(elem);
                elem.style.height = "0px";
                elem.style.marginTop = (0 - parseInt(cstyle.borderTopWidth) - parseInt(cstyle.borderBottomWidth)) + "px";
                elem.style.marginBottom = "0px";
                elem.style.paddingTop = "0px";
                elem.style.paddingBottom = "0px";
                elem.style.transform = "scale(0.8)";
                return elem.style.opacity = "0";
            }), 1);
            return elem.addEventListener("transitionend", function(e) {
                if (e.propertyName === "opacity" || e.elapsedTime >= 0.6) {
                    elem.removeEventListener("transitionend", arguments.callee, false);
                    return setTimeout((function() {
                        return remove_func();
                    }), 2000);
                }
            });
        };

        Animation.prototype.showRight = function(elem, props) {
            elem.className += " animate";
            elem.style.opacity = 0;
            elem.style.transform = "TranslateX(-20px) Scale(1.01)";
            setTimeout((function() {
                elem.style.opacity = 1;
                return elem.style.transform = "TranslateX(0px) Scale(1)";
            }), 1);
            return elem.addEventListener("transitionend", function() {
                elem.classList.remove("animate");
                elem.style.transform = elem.style.opacity = null;
                return elem.removeEventListener("transitionend", arguments.callee, false);
            });
        };

        Animation.prototype.show = function(elem, props) {
            var delay, ref;
            delay = ((ref = arguments[arguments.length - 2]) != null ? ref.delay : void 0) * 1000 || 1;
            elem.className += " animate";
            elem.style.opacity = 0;
            setTimeout((function() {
                return elem.style.opacity = 1;
            }), delay);
            return elem.addEventListener("transitionend", function() {
                elem.classList.remove("animate");
                elem.style.opacity = null;
                return elem.removeEventListener("transitionend", arguments.callee, false);
            });
        };

        Animation.prototype.hide = function(elem, remove_func, props) {
            var delay, ref;
            delay = ((ref = arguments[arguments.length - 2]) != null ? ref.delay : void 0) * 1000 || 1;
            elem.className += " animate";
            setTimeout((function() {
                return elem.style.opacity = 0;
            }), delay);
            return elem.addEventListener("transitionend", function(e) {
                if (e.propertyName === "opacity") {
                    remove_func();
                    return elem.removeEventListener("transitionend", arguments.callee, false);
                }
            });
        };

        Animation.prototype.addVisibleClass = function(elem, props) {
            return setTimeout(function() {
                return elem.classList.add("visible");
            });
        };

        Animation.prototype.cloneAnimation = function(elem, animation) {
            return window.requestAnimationFrame((function(_this) {
                return function() {
                    var clone, cloneleft, cstyle;
                    if (elem.style.pointerEvents === "none") {
                        elem = elem.nextSibling;
                    }
                    elem.style.position = "relative";
                    elem.style.zIndex = "2";
                    clone = elem.cloneNode(true);
                    cstyle = window.getComputedStyle(elem);
                    clone.classList.remove("loading");
                    clone.style.position = "absolute";
                    clone.style.zIndex = "1";
                    clone.style.pointerEvents = "none";
                    clone.style.animation = "none";
                    elem.parentNode.insertBefore(clone, elem);
                    cloneleft = clone.offsetLeft;
                    clone.parentNode.removeChild(clone);
                    clone.style.marginLeft = parseInt(cstyle.marginLeft) + elem.offsetLeft - cloneleft + "px";
                    elem.parentNode.insertBefore(clone, elem);
                    clone.style.animation = animation + " 0.8s ease-in-out forwards";
                    return setTimeout((function() {
                        return clone.remove();
                    }), 1000);
                };
            })(this));
        };

        Animation.prototype.flashIn = function(elem) {
            if (elem.offsetWidth > 100) {
                return this.cloneAnimation(elem, "flash-in-big");
            } else {
                return this.cloneAnimation(elem, "flash-in");
            }
        };

        Animation.prototype.flashOut = function(elem) {
            if (elem.offsetWidth > 100) {
                return this.cloneAnimation(elem, "flash-out-big");
            } else {
                return this.cloneAnimation(elem, "flash-out");
            }
        };

        return Animation;

    })();

    window.Animation = new Animation();

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/Autosize.coffee ---- */


(function() {
    var Autosize,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    Autosize = (function(superClass) {
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
            get: function() {
                return this.attrs.classes.loading;
            },
            set: function(loading) {
                this.attrs.classes.loading = loading;
                this.node.value = this.attrs.value;
                this.autoHeight();
                return Page.projector.scheduleRender();
            }
        });

        Autosize.prototype.storeNode = function(node) {
            this.node = node;
            if (this.attrs.focused) {
                node.focus();
            }
            return setTimeout((function(_this) {
                return function() {
                    return _this.autoHeight();
                };
            })(this));
        };

        Autosize.prototype.setValue = function(value) {
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

        Autosize.prototype.autoHeight = function() {
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

        Autosize.prototype.handleInput = function(e) {
            if (e == null) {
                e = null;
            }
            this.attrs.value = e.target.value;
            return RateLimit(300, this.autoHeight);
        };

        Autosize.prototype.handleKeydown = function(e) {
            if (e == null) {
                e = null;
            }
            if (e.which === 13 && !e.shiftKey && this.attrs.onsubmit && this.attrs.value.trim()) {
                this.attrs.onsubmit();
                setTimeout(((function(_this) {
                    return function() {
                        return _this.autoHeight();
                    };
                })(this)), 100);
                return false;
            }
        };

        Autosize.prototype.render = function(body) {
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


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/Editable.coffee ---- */


(function() {
    var Editable,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    Editable = (function(superClass) {
        extend(Editable, superClass);

        function Editable(type, handleSave, handleDelete) {
            this.type = type;
            this.handleSave = handleSave;
            this.handleDelete = handleDelete;
            this.render = bind(this.render, this);
            this.handleSaveClick = bind(this.handleSaveClick, this);
            this.handleDeleteClick = bind(this.handleDeleteClick, this);
            this.handleCancelClick = bind(this.handleCancelClick, this);
            this.handleEditClick = bind(this.handleEditClick, this);
            this.storeNode = bind(this.storeNode, this);
            this.node = null;
            this.editing = false;
            this.render_function = null;
            this.empty_text = "Click here to edit this field";
        }

        Editable.prototype.storeNode = function(node) {
            return this.node = node;
        };

        Editable.prototype.handleEditClick = function(e) {
            this.editing = true;
            this.field_edit = new Autosize({
                focused: 1,
                style: "height: 0px"
            });
            return false;
        };

        Editable.prototype.handleCancelClick = function() {
            this.editing = false;
            return false;
        };

        Editable.prototype.handleDeleteClick = function() {
            Page.cmd("wrapperConfirm", ["Are you sure?", "Delete"], (function(_this) {
                return function() {
                    _this.field_edit.loading = true;
                    return _this.handleDelete(function(res) {
                        return _this.field_edit.loading = false;
                    });
                };
            })(this));
            return false;
        };

        Editable.prototype.handleSaveClick = function() {
            this.field_edit.loading = true;
            this.handleSave(this.field_edit.attrs.value, (function(_this) {
                return function(res) {
                    _this.field_edit.loading = false;
                    if (res) {
                        return _this.editing = false;
                    }
                };
            })(this));
            return false;
        };

        Editable.prototype.render = function(body) {
            if (this.editing) {
                return h("div.editable.editing", {
                    exitAnimation: Animation.slideUp
                }, this.field_edit.render(body), h("div.editablebuttons", h("a.button.button-submit.button-small.button-outline", {
                    href: "#Cancel",
                    onclick: this.handleCancelClick,
                    tabindex: "-1"
                }, "取消"), this.handleDelete ? h("a.button.button-submit.button-small.button-outline", {
                    href: "#Delete",
                    onclick: this.handleDeleteClick,
                    tabindex: "-1"
                }, "删除") : void 0, h("a.button.button-submit.button-small", {
                    href: "#Save",
                    onclick: this.handleSaveClick
                }, "保存")));
            } else {
                return h("div.editable", {
                    enterAnimation: Animation.slideDown
                }, h("a.icon.icon-edit", {
                    key: this.node,
                    href: "#Edit",
                    onclick: this.handleEditClick
                }), !body ? h(this.type, h("span.empty", {
                    onclick: this.handleEditClick
                }, this.empty_text)) : this.render_function ? h(this.type, {
                    innerHTML: this.render_function(body)
                }) : h(this.type, body));
            }
        };

        return Editable;

    })(Class);

    window.Editable = Editable;

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/ItemList.coffee ---- */


(function() {
    var ItemList;

    ItemList = (function() {
        function ItemList(item_class1, key1) {
            this.item_class = item_class1;
            this.key = key1;
            this.items = [];
            this.items_bykey = {};
        }

        ItemList.prototype.sync = function(rows, item_class, key) {
            var current_obj, i, item, len, results, row;
            this.items.splice(0, this.items.length);
            results = [];
            for (i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                current_obj = this.items_bykey[row[this.key]];
                if (current_obj) {
                    current_obj.setRow(row);
                    results.push(this.items.push(current_obj));
                } else {
                    item = new this.item_class(row, this);
                    this.items_bykey[row[this.key]] = item;
                    results.push(this.items.push(item));
                }
            }
            return results;
        };

        ItemList.prototype.deleteItem = function(item) {
            var index;
            index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            } else {
                console.log("Can't delete item", item);
            }
            return delete this.items_bykey[item.row[this.key]];
        };

        return ItemList;

    })();

    window.ItemList = ItemList;

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/Text.coffee ---- */


(function() {
    var Text,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };

    Text = (function() {
        function Text() {
            this.renderLinks = bind(this.renderLinks, this);
            this.renderMarked = bind(this.renderMarked, this);
        }

        Text.prototype.toColor = function(text, saturation, lightness) {
            var hash, i, j, ref;
            if (saturation == null) {
                saturation = 30;
            }
            if (lightness == null) {
                lightness = 50;
            }
            hash = 0;
            for (i = j = 0, ref = text.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
                hash += text.charCodeAt(i) * i;
                hash = hash % 1777;
            }
            return "hsl(" + (hash % 360) + ("," + saturation + "%," + lightness + "%)");
        };

        Text.prototype.renderMarked = function(text, options) {
            if (options == null) {
                options = {};
            }
            if (!text) {
                return "";
            }
            options["gfm"] = true;
            options["breaks"] = true;
            options["sanitize"] = true;
            options["renderer"] = marked_renderer;
            text = this.fixReply(text);
            text = marked(text, options);
            text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:');
            return this.fixHtmlLinks(text);
        };

        Text.prototype.renderLinks = function(text) {
            text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            text = text.replace(/(https?:\/\/[^\s)]+)/g, function(match) {
                return "<a href=\"" + (match.replace(/&amp;/g, '&')) + "\">" + match + "</a>";
            });
            text = text.replace(/\n/g, '<br>');
            text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:');
            text = this.fixHtmlLinks(text);
            return text;
        };

        Text.prototype.emailLinks = function(text) {
            return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
        };

        Text.prototype.fixHtmlLinks = function(text) {
            text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110\/(Me.ZeroNetwork.bit|1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH)\/\?/gi, 'href="?');
            if (window.is_proxy) {
                text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/gi, 'href="http://zero');
                text = text.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
            } else {
                text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
            }
            text = text.replace(/href="\?/g, 'onclick="return Page.handleLinkClick(window.event)" href="?');
            return text;
        };

        Text.prototype.fixLink = function(link) {
            var back;
            if (window.is_proxy) {
                back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
                return back.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
            } else {
                return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
            }
        };

        Text.prototype.toUrl = function(text) {
            return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
        };

        Text.prototype.getSiteUrl = function(address) {
            if (window.is_proxy) {
                if (indexOf.call(address, ".") >= 0) {
                    return "http://" + address + "/";
                } else {
                    return "http://zero/" + address + "/";
                }
            } else {
                return "/" + address + "/";
            }
        };

        Text.prototype.fixReply = function(text) {
            return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
        };

        Text.prototype.toBitcoinAddress = function(text) {
            return text.replace(/[^A-Za-z0-9]/g, "");
        };

        Text.prototype.jsonEncode = function(obj) {
            return unescape(encodeURIComponent(JSON.stringify(obj)));
        };

        Text.prototype.jsonDecode = function(obj) {
            return JSON.parse(decodeURIComponent(escape(obj)));
        };

        Text.prototype.fileEncode = function(obj) {
            if (typeof obj === "string") {
                return btoa(unescape(encodeURIComponent(obj)));
            } else {
                return btoa(unescape(encodeURIComponent(JSON.stringify(obj, void 0, '\t'))));
            }
        };

        Text.prototype.utf8Encode = function(s) {
            return unescape(encodeURIComponent(s));
        };

        Text.prototype.utf8Decode = function(s) {
            return decodeURIComponent(escape(s));
        };

        Text.prototype.distance = function(s1, s2) {
            var char, extra_parts, j, key, len, match, next_find, next_find_i, val;
            s1 = s1.toLocaleLowerCase();
            s2 = s2.toLocaleLowerCase();
            next_find_i = 0;
            next_find = s2[0];
            match = true;
            extra_parts = {};
            for (j = 0, len = s1.length; j < len; j++) {
                char = s1[j];
                if (char !== next_find) {
                    if (extra_parts[next_find_i]) {
                        extra_parts[next_find_i] += char;
                    } else {
                        extra_parts[next_find_i] = char;
                    }
                } else {
                    next_find_i++;
                    next_find = s2[next_find_i];
                }
            }
            if (extra_parts[next_find_i]) {
                extra_parts[next_find_i] = "";
            }
            extra_parts = (function() {
                var results;
                results = [];
                for (key in extra_parts) {
                    val = extra_parts[key];
                    results.push(val);
                }
                return results;
            })();
            if (next_find_i >= s2.length) {
                return extra_parts.length + extra_parts.join("").length;
            } else {
                return false;
            }
        };

        Text.prototype.queryParse = function(query) {
            var j, key, len, params, part, parts, ref, val;
            params = {};
            parts = query.split('&');
            for (j = 0, len = parts.length; j < len; j++) {
                part = parts[j];
                ref = part.split("="), key = ref[0], val = ref[1];
                if (val) {
                    params[decodeURIComponent(key)] = decodeURIComponent(val);
                } else {
                    params["url"] = decodeURIComponent(key);
                    params["urls"] = params["url"].split("/");
                }
            }
            return params;
        };

        Text.prototype.queryEncode = function(params) {
            var back, key, val;
            back = [];
            if (params.url) {
                back.push(params.url);
            }
            for (key in params) {
                val = params[key];
                if (!val || key === "url") {
                    continue;
                }
                back.push((encodeURIComponent(key)) + "=" + (encodeURIComponent(val)));
            }
            return back.join("&");
        };

        Text.prototype.highlight = function(text, search) {
            var back, i, j, len, part, parts;
            parts = text.split(RegExp(search, "i"));
            back = [];
            for (i = j = 0, len = parts.length; j < len; i = ++j) {
                part = parts[i];
                back.push(part);
                if (i < parts.length - 1) {
                    back.push(h("span.highlight", {
                        key: i
                    }, search));
                }
            }
            return back;
        };

        Text.prototype.sqlIn = function(values) {
            var value;
            return "(" + ((function() {
                var j, len, results;
                results = [];
                for (j = 0, len = values.length; j < len; j++) {
                    value = values[j];
                    results.push("'" + value + "'");
                }
                return results;
            })()).join(',') + ")";
        };

        Text.prototype.formatSize = function(size) {
            var size_mb;
            size_mb = size / 1024 / 1024;
            if (size_mb >= 1000) {
                return (size_mb / 1024).toFixed(1) + " GB";
            } else if (size_mb >= 100) {
                return size_mb.toFixed(0) + " MB";
            } else if (size / 1024 >= 1000) {
                return size_mb.toFixed(2) + " MB";
            } else {
                return (size / 1024).toFixed(2) + " KB";
            }
        };

        return Text;

    })();

    window.is_proxy = document.location.host === "zero" || window.location.pathname === "/";

    window.Text = new Text();

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/Time.coffee ---- */


(function() {
    var Time;

    Time = (function() {
        function Time() {}

        Time.prototype.since = function(timestamp) {
            var back, now, secs;
            now = +(new Date) / 1000;
            if (timestamp > 1000000000000) {
                timestamp = timestamp / 1000;
            }
            secs = now - timestamp;
            if (secs < 60) {
                back = "Just now";
            } else if (secs < 60 * 60) {
                back = (Math.round(secs / 60)) + " minutes ago";
            } else if (secs < 60 * 60 * 24) {
                back = (Math.round(secs / 60 / 60)) + " hours ago";
            } else if (secs < 60 * 60 * 24 * 3) {
                back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
            } else {
                back = "on " + this.date(timestamp);
            }
            back = back.replace(/^1 ([a-z]+)s/, "1 $1");
            return back;
        };

        Time.prototype.date = function(timestamp, format) {
            var display, parts;
            if (format == null) {
                format = "short";
            }
            if (timestamp > 1000000000000) {
                timestamp = timestamp / 1000;
            }
            parts = (new Date(timestamp * 1000)).toString().split(" ");
            if (format === "short") {
                display = parts.slice(1, 4);
            } else {
                display = parts.slice(1, 5);
            }
            return display.join(" ").replace(/( [0-9]{4})/, ",$1");
        };

        Time.prototype.timestamp = function(date) {
            if (date == null) {
                date = "";
            }
            if (date === "now" || date === "") {
                return parseInt(+(new Date) / 1000);
            } else {
                return parseInt(Date.parse(date) / 1000);
            }
        };

        return Time;

    })();

    window.Time = new Time;

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/utils/ZeroFrame.coffee ---- */


(function() {
    var ZeroFrame,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    ZeroFrame = (function(superClass) {
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

        ZeroFrame.prototype.init = function() {
            return this;
        };

        ZeroFrame.prototype.connect = function() {
            this.target = window.parent;
            window.addEventListener("message", this.onMessage, false);
            this.send({
                "cmd": "innerReady"
            });
            window.addEventListener("beforeunload", (function(_this) {
                return function(e) {
                    _this.log("Save scrollTop", window.pageYOffset);
                    _this.history_state["scrollTop"] = window.pageYOffset;
                    return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
                };
            })(this));
            return this.cmd("wrapperGetState", [], (function(_this) {
                return function(state) {
                    return _this.handleState(state);
                };
            })(this));
        };

        ZeroFrame.prototype.handleState = function(state) {
            if (state != null) {
                this.history_state = state;
            }
            this.log("Restore scrollTop", state, window.pageYOffset);
            if (window.pageYOffset === 0 && state) {
                return window.scroll(window.pageXOffset, state.scrollTop);
            }
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

        ZeroFrame.prototype.processQueue = function() {
            var cb, cmd, i, len, params, ref, ref1;
            ref = this.queue;
            for (i = 0, len = ref.length; i < len; i++) {
                ref1 = ref[i], cmd = ref1[0], params = ref1[1], cb = ref1[2];
                this.cmd(cmd, params, cb);
            }
            return this.queue = [];
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
            if (this.ready) {
                return this.send({
                    "cmd": cmd,
                    "params": params
                }, cb);
            } else {
                return this.queue.push([cmd, params, cb]);
            }
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


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/.Uploader-Blobs.coffee ---- */


(function() {
    var Uploader,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    Uploader = (function(superClass) {
        extend(Uploader, superClass);

        function Uploader() {
            this.render = bind(this.render, this);
            this.renderSpeed = bind(this.renderSpeed, this);
            this.renderBlob = bind(this.renderBlob, this);
            this.animationBlobEnter = bind(this.animationBlobEnter, this);
            this.blobs = [];
            this.percent = 0;
            "setInterval ( =>\n	if @percent < 100 and Math.random() > 0.2\n		@setPercent(@percent + Math.random())\n), 100";
        }

        Uploader.prototype.setPercent = function(percent) {
            var i;
            this.blobs = (function() {
                var j, ref, results;
                results = [];
                for (i = j = 1, ref = percent; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                    results.push({
                        id: i,
                        percent: i
                    });
                }
                return results;
            })();
            this.percent = percent;
            return Page.projector.scheduleRender();
        };

        Uploader.prototype.getRandomOutpos = function() {
            var left, rand, top;
            rand = Math.random();
            if (rand < 0.25) {
                left = 105;
                top = Math.random() * 100;
            } else if (rand < 0.5) {
                left = 100 * Math.random();
                top = 105;
            } else if (rand < 0.75) {
                left = -5;
                top = 100 * Math.random();
            } else {
                left = 100 * Math.random();
                top = -5;
            }
            return [left, top];
        };

        Uploader.prototype.animationBlobEnter = function(elem, projector, vnode, properties) {
            var ref, start_left, start_top;
            ref = this.getRandomOutpos(), start_top = ref[0], start_left = ref[1];
            return anime({
                targets: elem,
                top: [start_top, 50 + (Math.random() * 10 - 5) + "%"],
                left: [start_left, 50 + (Math.random() * 10 - 5) + "%"],
                elasticity: 200,
                duration: 2000,
                delay: Math.random() * 100
            });
        };

        Uploader.prototype.renderBlob = function(blob) {
            return h("div.blob", {
                id: "blob-" + blob.id,
                key: blob.id,
                blob: blob,
                afterCreate: this.animationBlobEnter
            });
        };

        Uploader.prototype.renderSpeed = function() {
            return "<svg height=\"500\" width=\"500\">\n <linearGradient id=\"linearColors\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n     <stop offset=\"15%\" stop-color=\"#FF4136\"></stop>\n     <stop offset=\"40%\" stop-color=\"#1BA1E2\"></stop>\n     <stop offset=\"90%\" stop-color=\"#F012BE\"></stop>\n  </linearGradient>\n  <circle cx=\"300\" cy=\"300\" r=\"150\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg\"></circle>\n  <circle cx=\"300\" cy=\"300\" r=\"155\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg speed-bg-big\" stroke=\"url(#linearColors)\"></circle>\n  <circle cx=\"300\" cy=\"300\" r=\"150\" stroke-width=\"3\" class=\"speed-current\" stroke=\"url(#linearColors)\"></circle>\n  <text x=\"190\" y=\"373\" class=\"speed-text\">0</text>\n  <text x=\"173\" y=\"282\" class=\"speed-text\">20</text>\n  <text x=\"217\" y=\"210\" class=\"speed-text\">40</text>\n  <text x=\"292\" y=\"178\" class=\"speed-text\">60</text>\n  <text x=\"371\" y=\"210\" class=\"speed-text\">80</text>\n  <text x=\"404\" y=\"282\" class=\"speed-text\">100</text>\n  <text x=\"390\" y=\"373\" class=\"speed-text\">120</text>\n</svg>";
        };

        Uploader.prototype.render = function() {
            return h("div.Uploader", [
                h("div.speed", {
                    innerHTML: this.renderSpeed()
                }), h("div.percent", Math.round(this.percent) + "%"), h("div.blobs", [
                    h("div.blob.blob-center", {
                        style: "transform: scale(" + (0.1 + this.percent / 90) + ")"
                    }), this.blobs.map(this.renderBlob)
                ])
            ]);
        };

        return Uploader;

    })(Class);

    window.Uploader = Uploader;

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/Bg.coffee ---- */


(function() {
    var Bg,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    Bg = (function(superClass) {
        extend(Bg, superClass);

        function Bg(bg_elem) {
            this.bg_elem = bg_elem;
            this.repositionItem = bind(this.repositionItem, this);
            this.handleResize = bind(this.handleResize, this);
            this.item_types = ["video", "gamepad", "ipod", "image", "file"];
            window.onresize = this.handleResize;
            this.handleResize();
            this.randomizePosition();
            setTimeout(((function(_this) {
                return function() {
                    return _this.randomizeAnimation();
                };
            })(this)), 10);
            this.log("inited");
        }

        Bg.prototype.handleResize = function() {
            this.width = window.innerWidth;
            return this.height = window.innerHeight;
        };

        Bg.prototype.randomizePosition = function() {
            var i, item, left, len, ref, ref1, results, rotate, scale, top;
            ref = this.bg_elem.querySelectorAll(".bgitem");
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                item = ref[i];
                top = Math.random() * this.height * 0.8;
                left = Math.random() * this.width * 0.8;
                if (Math.random() > 0.8) {
                    ref1 = this.getRandomOutpos(), left = ref1[0], top = ref1[1];
                }
                rotate = 45 - (Math.random() * 90);
                scale = 0.5 + Math.min(0.5, Math.random());
                results.push(item.style.transform = "TranslateX(" + left + "px) TranslateY(" + top + "px) rotateZ(" + rotate + "deg) scale(" + scale + ")");
            }
            return results;
        };

        Bg.prototype.getRandomOutpos = function() {
            var left, rand, top;
            rand = Math.random();
            if (rand < 0.25) {
                left = this.width + 100;
                top = this.height * Math.random();
            } else if (rand < 0.5) {
                left = this.width * Math.random();
                top = this.height + 100;
            } else if (rand < 0.75) {
                left = -100;
                top = this.height * Math.random();
            } else {
                left = this.width * Math.random();
                top = -100;
            }
            return [left, top];
        };

        Bg.prototype.randomizeAnimation = function() {
            var bg, i, interval, item, left, len, ref, ref1, results, rotate, scale, top;
            ref = this.bg_elem.querySelectorAll(".bgitem");
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                item = ref[i];
                item.style.visibility = "visible";
                interval = 30 + (Math.random() * 60);
                item.style.transition = "all " + interval + "s linear";
                ref1 = this.getRandomOutpos(), left = ref1[0], top = ref1[1];
                rotate = 360 - (Math.random() * 720);
                scale = 0.5 + Math.min(0.5, Math.random());
                item.style.transform = "TranslateX(" + left + "px) TranslateY(" + top + "px) rotateZ(" + rotate + "deg) scale(" + scale + ")";
                bg = this;
                results.push(item.addEventListener("transitionend", function(e) {
                    if (e.propertyName === "transform") {
                        return bg.repositionItem(this);
                    }
                }));
            }
            return results;
        };

        Bg.prototype.repositionItem = function(item) {
            var left, ref, rotate, scale, top;
            ref = this.getRandomOutpos(), left = ref[0], top = ref[1];
            rotate = 360 - (Math.random() * 720);
            scale = 0.5 + Math.min(0.5, Math.random());
            return item.style.transform = "TranslateX(" + left + "px) TranslateY(" + top + "px) rotateZ(" + rotate + "deg) scale(" + scale + ")";
        };

        return Bg;

    })(Class);

    window.Bg = Bg;

}).call(this);

/* ---- Video player ---- */

(function() {
    var VideoPlayer,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    VideoPlayer = (function(superClass) {
        extend(VideoPlayer, superClass);

        function VideoPlayer() {
            this.render = bind(this.render, this);
            this.loadComments = bind(this.loadComments, this);
        }

        // Open video player, close video list
        VideoPlayer.prototype.render = function( /*nameHash, nameTitle, nameDescription,*/ nameDateAdded, nameDirectory) {

            /*nameHash = "vidnamehash";
	nameTitle = "vidnametitle";
	nameDescription = "vidnamedescription";*/

            query = "SELECT * FROM file LEFT JOIN json USING (json_id) WHERE date_added='" + nameDateAdded + "' AND directory='" + nameDirectory + "'";
            Page.cmd("dbQuery", [query], (res) => {
                my_row = res[0];
                nameHash = my_row["file_name"];
                nameTitle = my_row["title"];
                nameDescription = my_row["description"];
                nameDirectory = my_row["directory"]
                fullFile = "data/users/" + nameDirectory + "/" + nameHash;

                // Shortened variables
                $main = document.getElementById('main');
                $menuLeftContainer = document.getElementById('menu_left_container');
                $listContainer = document.getElementById('list_container');
                $mainContainer = document.getElementById('main');
                $AdvertisingContainer = document.getElementById('advertising');
                $videoPlayer = document.getElementById('VideoPlayer');
                menu_state = 0;

                // Render video player
                $main.width = "100%";
                $menuLeftContainer.style.display = "none";
                $menu_scrim.style.width = '100%';
                $mainContainer.className  = "main main-scope"
                $listContainer.className  = "style-scope";
                $AdvertisingContainer.className  = "style-scope ytd-browse";
                $videoPlayer.style.display = "block";
                $videoPlayer.innerHTML = "<div class='titleBox'><video class='videoBox' controls autoplay src='" + fullFile + "'></video><div><a class='fullscreen_link' href='" + fullFile + "'>最大化</a></div><div class='video_title'><h1 class='ytd-video-primary-info-renderer'>" + nameTitle + "</h1></div><div style='float: left'><img src='img/media_comment.svg' style='float: left; opacity: .5; height: 47px'></img></div><div class='video_description'>" + nameDescription + "</div><div class='comment_input_wrapper'><input id='video_comment' class='video_comment' placeholder='我要评头论足(๑•̀ㅂ•́)و✧'></input></div><div id='video_comment_box' class='video_comment_box'></div>";

                $videoComment = document.getElementById('video_comment');
                $videoCommentBox = document.getElementById('video_comment_box');

                $videoComment.addEventListener('keypress', function(evt) {
                    var comment_body = this.value;
                    if (evt.which == 13) {
                        /*Page.selector.writeComment(nameDateAdded, nameCertUserId, comment_body);*/

                        if (Page.site_info.cert_user_id) {
                            return Page.selector.writeComment(nameDateAdded, nameDirectory, comment_body);
                        } else {
                            return Page.cmd("certSelect", [
                                ["zeroid.bit"]
                            ], (function(_this) {
                                return function(res) {
                                    return Page.selector.writeComment(nameDateAdded, nameDirectory, comment_body);
                                };
                            })(this));
                        }

                    }
                });

            });

            this.loadComments(nameDateAdded, nameDirectory);

            return this;
        };

        VideoPlayer.prototype.loadComments = function(nameDateAdded, nameDirectory) {

            video_name = nameDateAdded + "_" + nameDirectory;
            query = "SELECT * FROM comment LEFT JOIN json USING (json_id) WHERE file_uri='" + video_name + "' ORDER BY date_added DESC";
            Page.cmd("dbQuery", [query], (res) => {
                var comment, comment_uri, elem, i, len;

                $videoCommentBox = document.getElementById('video_comment_box');

                if (res.error || res.length == 0) {
                    return;
                } else {
                    $videoCommentBox.innerHTML = "";
                }


                for (i = 0, len = res.length; i < len; i++) {

                    comment = res[i];
                    comment_body = comment["body"];
                    comment_date_added = comment["date_added"];
                    comment_directory = comment["directory"];
		                comment_user_id = comment["cert_user_id"].split("@")[0];
                    comment_id = "comment_" + comment_date_added + "_" + comment_directory;

                    /*var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];*/
                    var date = new Date(comment_date_added * 1000);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    var seconds = "0" + date.getSeconds();
                    // Day part from the timestamp
                    var day = date.getDate();
                    // Month part from the timestamp
                    var month = date.getMonth() + 1;
                    // Year part from the timestamp
                    var year = date.getFullYear();

                    // Will display time in dd/mm/yy, 10:30:23 format
                    var comment_formatted_date = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    divComment = document.createElement("div");
                    divComment.setAttribute("class", "video_comment_single");
                    divComment.setAttribute("id", comment_id);
                    divComment.innerHTML = "<div style='float: left; margin-left: 5px'></div><div style='margin-left: 64px;'><div style='color: #FFF; font-weight: 600; font-size: 1.4rem'>" + comment_user_id + "</div><div style='font-size: 1.2rem; color: #666'>" + comment_formatted_date + "</div><div>" + comment_body + "</div>";
                    $videoCommentBox.appendChild(divComment);

                };
            });

            return this;
        };

        return VideoPlayer;

    })(Class);

    window.VideoPlayer = VideoPlayer;

}).call(this);

/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/File.coffee ---- */


(function() {
    var File,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        };

    File = (function() {

        function File(row, item_list) {
            this.item_list = item_list;
            this.handleOpenClick = bind(this.handleOpenClick, this);
            this.handleVideoClick = bind(this.handleVideoClick, this);
            this.handleNeedClick = bind(this.handleNeedClick, this);
            this.handleTitleSave = bind(this.handleTitleSave, this);
            this.handleImageSave = bind(this.handleImageSave, this);
            this.handleBriefSave = bind(this.handleBriefSave, this);
            this.handleDelete = bind(this.handleDelete, this);
            this.deleteFromDataJson = bind(this.deleteFromDataJson, this);
            this.deleteFromContentJson = bind(this.deleteFromContentJson, this);
            this.deleteFile = bind(this.deleteFile, this);
            this.editable_title = null;
            this.editable_image = null;
            this.editable_brief = null;
            this.status = "unknown";
            this.setRow(row);
        }

        File.prototype.getRatioColor = function(ratio) {
            var ratio_h, ratio_l, ratio_s;
            ratio_h = Math.min(ratio * 50, 145);
            ratio_s = Math.min(ratio * 100, 60);
            ratio_l = 80 - Math.min(ratio * 5, 30);
            return "hsl(" + ratio_h + ", " + ratio_s + "%, " + ratio_l + "%)";
        };

        File.prototype.setRow = function(row1) {
            var ref;
            this.row = row1;
            this.owned = Page.site_info.auth_address === this.row.directory;

            if (this.owned && !this.editable_title) {
                this.editable_title = new Editable("div.body", this.handleTitleSave, this.handleDelete);
                this.editable_title.empty_text = " ";
            }

            if (this.owned && !this.editable_image) {
                this.editable_image = new Editable("div.body", this.handleImageSave, this.handleDelete);
                this.editable_image.empty_text = " ";
            }

            if (this.owned && !this.editable_brief) {
                this.editable_brief = new Editable("div.body", this.handleBriefSave, this.handleDelete);
                this.editable_brief.empty_text = " ";
            }

            if (this.row.stats.bytes_downloaded >= this.row.size) {
                return this.status = "seeding";
            } else if (this.row.stats.is_downloading) {
                return this.status = "downloading";
            } else if ((0 < (ref = this.row.stats.bytes_downloaded) && ref < this.row.size)) {
                return this.status = "partial";
            } else {
                return this.status = "inactive";
            }
        };

        File.prototype.deleteFile = function(cb) {
            return Page.cmd("optionalFileDelete", this.row.inner_path, (function(_this) {
                return function() {
                    return Page.cmd("optionalFileDelete", _this.row.inner_path + ".piecemap.msgpack", function() {
                        return cb(true);
                    });
                };
            })(this));
        };

        File.prototype.deleteFromContentJson = function(cb) {
            return Page.cmd("fileGet", this.row.content_inner_path, (function(_this) {
                return function(res) {
                    var data;
                    data = JSON.parse(res);
                    delete data["files_optional"][_this.row.file_name];
                    delete data["files_optional"][_this.row.file_name + ".piecemap.msgpack"];
                    return Page.cmd("fileWrite", [_this.row.content_inner_path, Text.fileEncode(data)], function(res) {
                        return cb(res);
                    });
                };
            })(this));
        };

        File.prototype.deleteFromDataJson = function(cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function(_this) {
                return function(res) {
                    var data;
                    data = JSON.parse(res);
                    delete data["file"][_this.row.file_name];
                    delete data["file"][_this.row.file_name + ".piecemap.msgpack"];
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function(res) {
                        return cb(res);
                    });
                };
            })(this));
        };

        File.prototype.handleDelete = function(cb) {
            return this.deleteFile((function(_this) {
                return function(res) {
                    return _this.deleteFromContentJson(function(res) {
                        if (!res === "ok") {
                            return cb(false);
                        }
                        return _this.deleteFromDataJson(function(res) {
                            if (res === "ok") {
                                Page.cmd("sitePublish", {
                                    "inner_path": _this.row.content_inner_path
                                });
                                Page.list.update();
                                return cb(true);
                            }
                        });
                    });
                };
            })(this));
        };

        File.prototype.handleTitleSave = function(title, cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function(_this) {
                return function(res) {
                    var data;
                    data = JSON.parse(res);
                    data["file"][_this.row.file_name]["title"] = title;
                    _this.row.title = title;
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function(res) {
                        if (res === "ok") {
                            cb(true);
                            return Page.cmd("sitePublish", {
                                "inner_path": _this.row.content_inner_path
                            });
                        } else {
                            return cb(false);
                        }
                    });
                };
            })(this));
        };

        File.prototype.handleImageSave = function(image_link, cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function(_this) {
                return function(res) {
                    var data;
                    data = JSON.parse(res);
                    data["file"][_this.row.file_name]["image_link"] = image_link;
                    _this.row.image_link = image_link;
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function(res) {
                        if (res === "ok") {
                            cb(true);
                            return Page.cmd("sitePublish", {
                                "inner_path": _this.row.content_inner_path
                            });
                        } else {
                            return cb(false);
                        }
                    });
                };
            })(this));
        };

        File.prototype.handleBriefSave = function(description, cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function(_this) {
                return function(res) {
                    var data;
                    data = JSON.parse(res);
                    data["file"][_this.row.file_name]["description"] = description;
                    _this.row.description = description;
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function(res) {
                        if (res === "ok") {
                            cb(true);
                            return Page.cmd("sitePublish", {
                                "inner_path": _this.row.content_inner_path
                            });
                        } else {
                            return cb(false);
                        }
                    });
                };
            })(this));
        };

        File.prototype.handleNeedClick = function() {
            this.status = "downloading";
            Page.cmd("fileNeed", this.row.inner_path + "|all", (function(_this) {
                return function(res) {
                    return console.log(res);
                };
            })(this));
            return false;
        };

        File.prototype.handleVideoClick = function() {
            Page.setUrl("?watch=" + this.row.date_added + "_" + this.row.directory);
            /*Page.setUrl("?watch=" + this.row.date_added + "_" + this.row.cert_user_id);*/
            Page.videoPlayer.render(this.row.inner_path, this.row.title, this.row.description, this.row.date_added, this.row.directory);
            return false;
        }

        File.prototype.handleOpenClick = function() {
            Page.cmd("serverShowdirectory", ["site", this.row.inner_path]);
            return false;
        };

        File.prototype.render = function() {
            var ext, low_seeds, peer_num, ratio, ratio_color, ref, ref1, ref2, ref3, style, type;
            if (this.row.stats.bytes_downloaded) {
                ratio = this.row.stats.uploaded / this.row.stats.bytes_downloaded;
            } else {
                ratio = 0;
            }
            ratio_color = this.getRatioColor(ratio);
            if ((ref = this.status) === "downloading" || ref === "partial") {
                style = "box-shadow: inset " + (this.row.stats.downloaded_percent * 2.5) + "px 0px 0px #11151d";
            } else {
                style = "";
            }
            ext = this.row.file_name.toLowerCase().replace(/.*\./, "");
            if (ext === "m4v" || ext === "mp4" || ext === "webm" || ext === "ogm") {
                type = "video";
            } else {
                type = "other";
            }

            if (this.row.is_featured === 1) {
                peer_num = Math.max((this.row.stats.peer_seed + this.row.stats.peer_leech) - 1000000 || 0, this.row.stats.peer || 0);
            } else {
                peer_num = Math.max((this.row.stats.peer_seed + this.row.stats.peer_leech) || 0, this.row.stats.peer || 0);
            };

            low_seeds = this.row.stats.peer_seed <= peer_num * 0.1 && this.row.stats.peer_leech >= peer_num * 0.2;

            // Build file div
            return h("div.file." + type, {
                    key: this.row.id,
                }, h("div.stats", [
                    h("div.stats-col.peers", {
                        title: "Seeder: " + this.row.stats.peer_seed + ", Leecher: " + this.row.stats.peer_leech
                    }, [
                        h("span.value", peer_num), h("span.icon.icon-profile", {
                            style: low_seeds ? "background: #cccccc" : "background: #666"
                        })
                    ]), h("div.stats-col.ratio", {
                      title: "Hash id: " + this.row.stats.hash_id
                    }, h("span.value", {
                        "style": "background-color: " + ratio_color
                    }, ratio >= 10 ? ratio.toFixed(0) : ratio.toFixed(1))), h("div.stats-col.uploaded", "\u2BA5 " + (Text.formatSize(this.row.stats.uploaded)))
                ]),

                // Video Link
                h("div.linkJoiner.videoimage", [
                    h("a.playVideo", {
                        href: "?watch=" + this.row.date_added + "_" + this.row.directory,
                        /*onclick: Page.handleLinkClick,*/
                        style: ""
                    }, [h("div.video_empty", {
                        style: 'background-image: url("' + this.row.image_link + '")'
                    })]), h("span.size", {
                            classes: {
                                downloading: this.status === "downloading",
                                partial: this.status === "partial",
                                seeding: this.status === "seeding"
                            },
                            style: style
                        }, [this.status === "seeding" || this.status === "downloading" || this.status === "partial" ? [h("span.downloaded"/*, Text.formatSize(this.row.stats.bytes_downloaded)*/)/*, " of "*/] : void 0/*, Text.formatSize(this.row.size)*/])
                ]),

                h("div.left-info", [h("div.linkJoiner", [h("div.linkSeparator", {
                            style: ""
                        }, [
                            ((ref1 = this.editable_title) != null ? ref1.editing : void 0) ? this.editable_title.render(this.row.title) : h("a.title.link", {
                              href: "?watch=" + this.row.date_added + "_" + this.row.directory,
                              enterAnimation: Animation.slideDown
                            }, ((ref2 = this.editable_title) != null ? ref2.render(this.row.title) : void 0) || this.row.title)


                        ])

                    ]),

                    h("div.details", [h("div.linkSeparator", [
                         h("span.detail.uploader", [
                            h("a.link.username", {
				href: "?Channel=" + this.row.directory,
                                title: this.row.directory
                            }, this.row.cert_user_id.split("@")[0]),
			h("span.detail.added", {
                            title: Time.date(this.row.date_added, "long")
                        }, Time.since(this.row.date_added))
                        ])]), h("div.linkSeparator", [(ref3 = this.status) === "inactive" || ref3 === "partial" ? h("a.add", {
                            href: "#Add",
                            title: "Download and seed",
                            onclick: this.handleNeedClick
                        }, "+ seed") : void 0,
			 h("span.detail.size-counter", [this.status === "downloading" || this.status === "partial" ? [Text.formatSize(this.row.stats.bytes_downloaded) + " / "] : void 0, Text.formatSize(this.row.size)])]),
                        h("div.linkSeparator.ytd-compact-thumbnail", [
                            ((ref1 = this.editable_image) != null ? ref1.editing : void 0) ? this.editable_image.render(this.row.image_link) : h("a.title.link.imgy", {
                                href: "#",
                                style: "font-size: 13px; overflow: hidden",
                                enterAnimation: Animation.slideDown
                            }, ((ref2 = this.editable_image) != null ? ref2.render("给个视频头像地址吧(｡◕ˇ∀ˇ◕）") : void 0) || this.row.image_link)
                        ]),
                        h("div.linkSeparator.ytd-compact-description", [
                            ((ref1 = this.editable_brief) != null ? ref1.editing : void 0) ? this.editable_brief.render(this.row.description) : h("a.title.link.briefy", {
                                href: "#",
                                style: "font-size: 13px; overflow: hidden;",
                                enterAnimation: Animation.slideDown
                            }, ((ref2 = this.editable_brief) != null ? ref2.render("介绍一下吧(◕ܫ◕)") : void 0) || this.row.description)
                        ])
                    ])
                ]));

        };

        return File;

    })();

    window.File = File;

}).call(this);

/* ---- MenuAll  ---- */

(function() {
    var MenuAll,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    MenuAll = (function(superClass) {
        extend(MenuAll, superClass);

        function MenuAll() {
            this.render = bind(this.render, this);
            this.render_top = bind(this.render_top, this);
            this.type = "Home";
        }

        MenuAll.prototype.getUserId = function() {
	    Page.setUrl("?Channel=" + Page.site_info.cert_user_id);
	    document.getElementById('debugger1').innerHTML = Page.site_info.cert_user_id;
            Page.list.openVideoChannel();
            return this;
        };

        // Render top menu items
        MenuAll.prototype.render_top = function() {
            return h("div.main_upload_placeholder", [
                h("a.upload", {
                    href: "#",
                    onclick: Page.selector.handleBrowseClick
                }, [h("div.main_upload")]),
            ]);
        };

        // Render left menu items
        MenuAll.prototype.render = function() {
            return h("div.menu_left", [
                h("ul.list-types-new", [
                    h("li", [h("a.list-type.ytd-home", {
                        href: "?Home",
                        onclick: Page.handleLinkClick,
                        classes: {
                            active: this.type === "Home"
                        }
                    }, "首页")]),

                    // Trending
                    h("li", [h("a.list-type.ytd-trending", {
                        href: "?Trending",
                        onclick: Page.handleLinkClick,
                        classes: {
                            active: this.type === "Trending"
                        }
                    }, "流行")]),

                    // Latest
                    h("li", [h("a.list-type.ytd-latest", {
                        href: "?Latest",
                        onclick: Page.handleLinkClick,
                        classes: {
                            active: this.type === "Latest"
                        }
                    }, "最新")]),

                    // My
                    h("li", [h("a.list-type.ytd-my-channel", {
                        href: "?My",
                        onclick: Page.handleLinkClick,
                        classes: {
                            active: this.type === "My"
                        }
                    }, "我的频道")]),

                    // Seeding
                    h("li", [h("a.list-type.ytd-seeding", {
                        href: "?Seeding",
                        onclick: Page.handleLinkClick,
                        classes: {
                            active: this.type === "Seeding"
                        }
                    }, "历史")]),

                    h("li", {style: "background:#11151d; font-weight: bold; margin-top:14px; color: #949494"}, "相关网站"),

                    // 英文版YouTubed
                    h("li", [h("a.list-type.ytd-discord", {
                        href: "http://127.0.0.1:43110/149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN",
                    }, "YouTube英文版")]),

                    // Donate
                    h("li", [h("a.list-type.ytd-donate", {
                        href: "../Talk.ZeroNetwork.bit/?Topic:1512912701_149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/Donate+to+YouTube",
                    }, "请杯咖啡")])
                ])
            ]);
        };

        return MenuAll;

    })(Class);

    window.MenuAll = MenuAll;

}).call(this);

/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/List.coffee ---- */


(function() {
    var List,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    List = (function(superClass) {
        extend(List, superClass);

        function List() {
            this.render = bind(this.render, this);
            this.handleMoreClick = bind(this.handleMoreClick, this);
            this.update = bind(this.update, this);
            this.needFile = bind(this.needFile, this);
            this.item_list = new ItemList(File, "id");
            this.files = this.item_list.items;
            this.need_update = true;
            this.loaded = false;
            this.type = "Home";
            this.limit = 10;
            this.channelMode = false;
        }

        // Opens video channel, after retrieving userId
        List.prototype.openVideoChannel = function() {
            this.channelMode = true;
            this.type = "Latest";
            Page.menuAll.type = "Latest";
            this.update();
        };

        List.prototype.needFile = function() {
            this.log(args);
            return false;
        };

        List.prototype.update = function() {
            var order;
            var order_mode;
            var search_query;
            var search_field;
            /*var topic_sticky_uris;*/
            var certUserId = document.getElementById('debugger1').innerHTML;
            this.log("update");
            this.loaded = false;

            if (this.type === "Home") {
                this.channelMode = false;
                order = "peer";
                order_mode = "featured";

            } else if (this.type === "Trending") {
                this.channelMode = false;
                order = "peer";
                order_mode = "none";

            } else {
                order = "date_added";
                order_mode = "none";
            }

            // List of subqueries
            search_field = document.getElementById('searchTerm').value;
            search_field_no_space = search_field.replace(/\s/g, '%');

            if (this.channelMode == true) {
                search_query = 'WHERE directory="' + certUserId + '" AND file.title LIKE "%' + search_field_no_space + '%"';
            } else {
                search_query = 'WHERE file.title LIKE "%' + search_field_no_space + '%"';
            };

            // Start querying the database with the given parameters!
            return Page.cmd("dbQuery", "SELECT * FROM file LEFT JOIN json USING (json_id) " + search_query + " ORDER BY date_added DESC", (function(_this) {
                return function(files_res) {
                    return Page.cmd("optionalFileList", {
                        filter: "",
                        limit: 1000
                    }, function(stat_res) {
                        var base, base1, base2, file, i, j, len, len1, stat, stats;
                        var topic_sticky_uris = Page.site_info.content.settings.topic_sticky_uris;
                        stats = {};

                        /*document.getElementById('debugger2').innerHTML = "Sticky uris : " + Page.site_info.content.settings.topic_sticky_uris;*/

                        for (i = 0, len = stat_res.length; i < len; i++) {
                            stat = stat_res[i];
                            stats[stat.inner_path] = stat;
                        }
                        for (j = 0, len1 = files_res.length; j < len1; j++) {
                            file = files_res[j];
                            file.id = file.directory + "_" + file.date_added;
                            file.inner_path = "data/users/" + file.directory + "/" + file.file_name;
                            file.data_inner_path = "data/users/" + file.directory + "/data.json";
                            file.content_inner_path = "data/users/" + file.directory + "/content.json";
                            file.stats = stats[file.inner_path];
                            file_date_added = file["date_added"];
                            file_directory = file["directory"];
      			                file_size = file["size"];
                            video_string = file_date_added + "_" + file_directory;

                            if (file.stats == null) {
                                file.stats = {};
                            }

                            if ((base = file.stats).peer == null) {
                                base.peer = 0;
                            }
                            if ((base1 = file.stats).peer_seed == null) {
                                base1.peer_seed = 0;
                            }
                            if ((base2 = file.stats).peer_leech == null) {
                                base2.peer_leech = 0;
                            }

                            // If one of the files is a sticky Uri, then add 1000000 peers to it.. keep it top!
                            if (order_mode === "featured") {
                                if (topic_sticky_uris.indexOf(video_string) >= 0) {
									/*document.getElementById('debugger3').innerHTML = video_string;*/
                                    file.stats["peer_seed"] = file.stats["peer_seed"] + 1000000;
									/*document.getElementById('debugger3').innerHTML = file.stats["peer_seed"];*/
                                    file["is_featured"] = 1;
                                }
                            } //else if (order_mode === "")

                        }

                        if (order === "peer") {
                            files_res.sort(function(a, b) {
                                return b.stats["peer_seed"] + b.stats["peer"] - a.stats["peer"] - a.stats["peer_seed"];
                            });
                        }
                        if (_this.type === "Seeding") {
                          files_res = (function() {
                            var k, len2, results;
                            results = [];
                            for (k = 0, len2 = files_res.length; k < len2; k++) {
                              file = files_res[k];
                              if (file.stats.bytes_downloaded > 0) {
                                results.push(file);
                              }
                            }
                            return results;
                          })();
                        }
                        if (_this.type === "My") {
                          files_res = (function() {
                            var k, len2, results;
                            results = [];
                            for (k = 0, len2 = files_res.length; k < len2; k++) {
                              file = files_res[k];
                              if (file.directory === Page.site_info.auth_address) {
                                results.push(file);
                              }
                            }
                            return results;
                          })();
                        }

                        _this.item_list.sync(files_res);
                        _this.loaded = true;
                        return Page.projector.scheduleRender();
                    });
                };
            })(this));

        };

        List.prototype.handleMoreClick = function() {
            this.limit += 20;
            return false;
        };

        List.prototype.render = function() {
            if (this.need_update) {
                this.update();
                this.need_update = false;
            }

            // Listen to search box
            document.getElementById('searchButton').addEventListener('click', function(evt) {
                evt.preventDefault();
                Page.list.update();
            });

            document.getElementById('searchTerm').addEventListener('keypress', function(evt) {
                if (evt.which == 13) {
                    Page.list.update();
                }
            });

            return h("div.List", {
                ondragenter: document.body.ondragover,
                ondragover: document.body.ondragover,
                ondrop: Page.selector.handleFileDrop,
                classes: {
                    hidden: Page.state.page !== "list"
                }
            }, [
                /* File list starts */
                this.files.length ? h("div.files", [
                    h("div.file.header", h("div.stats", [h("div.stats-col.peers", "Peers"), h("div.stats-col.ratio", "Ratio"), h("div.stats-col.downloaded", "Uploaded")])), this.files.slice(0, +this.limit + 1 || 9e9).map((function(_this) {
                        return function(file) {
                            return file.render();
                        };
                    })(this))
                ]) : void 0, this.loaded && !this.files.length ? this.type === "Seeding" ? h("h2", "没人做种 o(TヘTo) ") : h("h2", "还没有上传哦╮(╯▽╰)╭。少年，要不上传一个(o゜▽゜)o☆") : void 0, this.files.length > this.limit ? h("a.more.link", {
                    href: "#",
                    onclick: this.handleMoreClick
                }, "小二，再来一打视频=￣ω￣=") : void 0
            ]);
        };

        return List;

    })(Class);

    window.List = List;

}).call(this);



/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/Selector.coffee ---- */


(function() {
    var Selector,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    Selector = (function(superClass) {
        extend(Selector, superClass);

        function Selector() {
            this.render = bind(this.render, this);
            this.preventEvent = bind(this.preventEvent, this);
            this.handleUploadClick = bind(this.handleUploadClick, this);
            this.handleBrowseClick = bind(this.handleBrowseClick, this);
            this.handleFileDrop = bind(this.handleFileDrop, this);
            this.uploadFile = bind(this.uploadFile, this);
            this.writeComment = bind(this.writeComment, this);
            this.handleUploadDone = bind(this.handleUploadDone, this);
            this.registerUpload = bind(this.registerUpload, this);
            this.registerComment = bind(this.registerComment, this);
            this.checkContentJson = bind(this.checkContentJson, this);
            this.file_info = {};
            document.body.ondragover = (function(_this) {
                return function(e) {
                    var ref;
                    if (((ref = e.dataTransfer.items[0]) != null ? ref.kind : void 0) === "file") {
                        document.body.classList.add("drag-over");
                    }
                    return _this.preventEvent(e);
                };
            })(this);
            document.body.ondragleave = (function(_this) {
                return function(e) {
                    if (!e.pageX) {
                        document.body.classList.remove("drag-over");
                    }
                    return _this.preventEvent(e);
                };
            })(this);
        }

        Selector.prototype.checkContentJson = function(cb) {
            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
            return Page.cmd("fileGet", [inner_path, false], (function(_this) {
                return function(res) {
                    var optional_pattern;
                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    optional_pattern = "(?!data.json)";
                    if (res.optional === optional_pattern) {
                        return cb();
                    }
                    res.optional = optional_pattern;
                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };

        Selector.prototype.registerUpload = function(title, type, description, image_link, is_featured, file_name, file_size, date_added, cb) {
            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
            return Page.cmd("fileGet", [inner_path, false], (function(_this) {
                return function(res) {
                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    if (res.file == null) {
                        res.file = {};
                    }
                    res.file[file_name] = {
                        title: title,
                        type: type,
                        description: description,
                        is_featured: is_featured,
                        image_link: image_link,
                        size: file_size,
                        date_added: date_added
                    };
                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };

        Selector.prototype.handleUploadDone = function(file) {
            Page.setUrl("?Latest");
            return this.log("Upload done", file);
        };

        // Write comment function. Use this in the video section.. remember to sign the comment, then publish it!
        Selector.prototype.registerComment = function(file_uri, body, date_added, cb) {
            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
            return Page.cmd("fileGet", [inner_path, false], (function(_this) {
                return function(res) {
                    var _base, _name;

                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    if (res.comment == null) {
                        res.comment = {};
                    }
                    if ((_base = res.comment)[_name = file_uri] == null) {
                        _base[_name] = [];
                    }

                    res.comment[file_uri].push({
                        body: body,
                        date_added: date_added
                    });
                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };

        Selector.prototype.writeComment = function(file_date_added, file_directory, comment_body) {
            var file_uri = file_date_added + "_" + file_directory;
            return this.checkContentJson(function(_this) {
                return function(res) {
                    return _this.registerComment(file_uri, comment_body, Time.timestamp(), function(res) {
			Page.videoPlayer.loadComments(file_date_added, file_directory);
                        return Page.cmd("siteSign", {
                            inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
                        }, function(res) {
                            return Page.cmd("sitePublish", {
                                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                                "sign": false
                            });
                        });
                    });
                };
            }(this));
        };

        Selector.prototype.uploadFile = function(file) {
            var ref;
            if (file.size > 10000 * 1024 * 1024) {
                Page.cmd("wrapperNotification", ["info", "本站测试期间最大文件大小为: 2GB"]);
                return false;
            }
            if (file.size < 1 * 1024 * 10) {
                Page.cmd("wrapperNotification", ["info", "最小视频体积: 10KB"]);
                return false;
            }
            if ((ref = file.name.split(".").slice(-1)[0]) !== "mp4" && ref !== "m4v" && ref !== "webm") {
                Page.cmd("wrapperNotification", ["info", "本网站暂时只支持mp4, m4v and webm格式视频上传"]);
                debugger;
                return false;
            }
            this.file_info = {};
            return this.checkContentJson((function(_this) {
                return function(res) {
                    var file_name;
                    file_name = file.name;
                    if (file_name.replace(/[^A-Za-z0-9]/g, "").length < 20) {
                        file_name = Time.timestamp() + "-" + file_name;
                    }
                    return Page.cmd("bigfileUploadInit", ["data/users/" + Page.site_info.auth_address + "/" + file_name, file.size], function(init_res) {
                        var formdata, req;
                        formdata = new FormData();
                        formdata.append(file_name, file);
                        req = new XMLHttpRequest();
                        _this.req = req;
                        _this.file_info = {
                            size: file.size,
                            name: file_name,
                            type: file.type,
                            url: init_res.url
                        };
                        req.upload.addEventListener("loadstart", function(progress) {
                            _this.log("loadstart", arguments);
                            _this.file_info.started = progress.timeStamp;
                            return Page.setPage("uploader");
                        });
                        req.upload.addEventListener("loadend", function() {
                            var defaultType = "video";
                            var defaultImage = "img/media.gif";
                            var defaultDescription = "主人很懒，都不介绍一下我╮(╯▽╰)╭";
                            var defaultFeatured = 0;
                            _this.log("loadend", arguments);
                            _this.file_info.status = "done";

                            // Register the uploaded file into the user folder data. This can be emulated for the comment function
                            return _this.registerUpload(file.name.replace(/\.[^\.]+$/, ""), defaultType, defaultDescription, defaultImage, defaultFeatured, init_res.file_relative_path, file.size, Time.timestamp(), function(res) {
                                return Page.cmd("siteSign", {
                                    inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
                                }, function(res) {
                                    return Page.cmd("sitePublish", {
                                        inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                                        "sign": false
                                    }, function(res) {
                                        return _this.handleUploadDone(file);
                                    });
                                });
                            });
                        });
                        req.upload.addEventListener("progress", function(progress) {
                            _this.file_info.speed = 1000 * progress.loaded / (progress.timeStamp - _this.file_info.started);
                            _this.file_info.percent = progress.loaded / progress.total;
                            _this.file_info.loaded = progress.loaded;
                            _this.file_info.updated = progress.timeStamp;
                            return Page.projector.scheduleRender();
                        });
                        req.addEventListener("load", function() {
                            return _this.log("load", arguments);
                        });
                        req.addEventListener("error", function() {
                            return _this.log("error", arguments);
                        });
                        req.addEventListener("abort", function() {
                            return _this.log("abort", arguments);
                        });
                        req.withCredentials = true;
                        req.open("POST", init_res.url);
                        return req.send(formdata);
                    });
                };
            })(this));
        };

        Selector.prototype.handleFileDrop = function(e) {
            this.log("File drop", e);
            document.body.classList.remove("drag-over");
            if (!event.dataTransfer.files[0]) {
                return false;
            }
            this.preventEvent(e);
            if (Page.site_info.cert_user_id) {
                return this.uploadFile(event.dataTransfer.files[0]);
            } else {
                return Page.cmd("certSelect", [
                    ["zeroid.bit"]
                ], (function(_this) {
                    return function(res) {
                        return _this.uploadFile(event.dataTransfer.files[0]);
                    };
                })(this));
            }
        };

        Selector.prototype.handleBrowseClick = function(e) {
            if (Page.site_info.cert_user_id) {
                return this.handleUploadClick(e);
            } else {
                return Page.cmd("certSelect", [
                    ["zeroid.bit"]
                ], (function(_this) {
                    return function(res) {
                        return _this.handleUploadClick(e);
                    };
                })(this));
            }
        };

        Selector.prototype.handleUploadClick = function(e) {
            var input;
            input = document.createElement('input');
            document.body.appendChild(input);
            input.type = "file";
            input.style.visibility = "hidden";
            input.onchange = (function(_this) {
                return function(e) {
                    return _this.uploadFile(input.files[0]);
                };
            })(this);
            input.click();
            return false;
        };

        Selector.prototype.preventEvent = function(e) {
            e.stopPropagation();
            return e.preventDefault();
        };

        Selector.prototype.render = function() {
            return h("div#Selector.Selector", {
                classes: {
                    hidden: Page.state.page !== "selector"
                }
            }, h("div.browse", [
                h("div.icon.icon-upload"), h("a.button", {
                    href: "#Browse",
                    onclick: this.handleBrowseClick
                }, "Select file from computer")
            ]), h("div.dropzone", {
                ondragenter: this.preventEvent,
                ondragover: this.preventEvent,
                ondrop: this.handleFileDrop
            }));
        };

        return Selector;

    })(Class);

    window.Selector = Selector;

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/Uploader.coffee ---- */


(function() {
    var Uploader,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    Uploader = (function(superClass) {
        extend(Uploader, superClass);

        function Uploader() {
            this.render = bind(this.render, this);
            this.handleFinishUpload = bind(this.handleFinishUpload, this);
            this.randomBase2 = bind(this.randomBase2, this);
            this.renderSpeed = bind(this.renderSpeed, this);
            this;
        }

        Uploader.prototype.renderSpeed = function() {
            return "<svg>\n <linearGradient id=\"linearColors\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n     <stop offset=\"15%\" stop-color=\"#FF4136\"></stop>\n     <stop offset=\"40%\" stop-color=\"#1BA1E2\"></stop>\n     <stop offset=\"90%\" stop-color=\"#F012BE\"></stop>\n  </linearGradient>\n  <circle cx=\"0\" cy=\"0\" r=\"150\" transform=\"translate(300, 300) rotate(-72.7)\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg\"></circle>\n  <circle cx=\"0\" cy=\"0\" r=\"155\" transform=\"translate(300, 300) rotate(149.3)\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg speed-bg-big\" stroke=\"url(#linearColors)\"></circle>\n  <circle cx=\"0\" cy=\"0\" r=\"150\" transform=\"translate(300, 300) rotate(-210)\" stroke-width=\"3\" class=\"speed-current\" stroke=\"url(#linearColors)\" id=\"speed_current\"></circle>\n  <text x=\"190\" y=\"373\" class=\"speed-text\">0</text>\n  <text x=\"173\" y=\"282\" class=\"speed-text\">20</text>\n  <text x=\"217\" y=\"210\" class=\"speed-text\">40</text>\n  <text x=\"292\" y=\"178\" class=\"speed-text\">60</text>\n  <text x=\"371\" y=\"210\" class=\"speed-text\">80</text>\n  <text x=\"404\" y=\"282\" class=\"speed-text\">100</text>\n  <text x=\"390\" y=\"373\" class=\"speed-text\">120</text>\n</svg>";
        };

        Uploader.prototype.randomBase2 = function(len) {
            return (Math.random()).toString(2).slice(2, len);
        };

        Uploader.prototype.handleFinishUpload = function() {
            Page.state.page = "list";
            Page.projector.scheduleRender();
            setTimeout(((function(_this) {
                return function() {
                    return Page.list.update();
                };
            })(this)), 1000);
            return false;
        };

        Uploader.prototype.render = function() {
            var dash_offset, file_info;
            file_info = Page.selector.file_info;
            dash_offset = Math.max(2390 - (486 * file_info.speed / 1024 / 1024 / 100), 1770) + Math.random() * 10;
            if (dash_offset !== this.last_dash_offset) {
                this.last_dash_offset = dash_offset;
                setTimeout(((function(_this) {
                    return function() {
                        var ref;
                        return (ref = document.getElementById("speed_current")) != null ? ref.style.strokeDashoffset = dash_offset : void 0;
                    };
                })(this)), 1);
            }
            return h("div.Uploader", {
                classes: {
                    hidden: Page.state.page !== "uploader"
                }
            }, [
                h("div.speed", {
                    innerHTML: this.renderSpeed()
                }), h("div.status", [
                    h("div.icon.icon-file-empty.file-fg", {
                        style: "clip: rect(0px 100px " + (114 * file_info.percent) + "px 0px)"
                    }, [this.randomBase2(13), h("br"), this.randomBase2(13), h("br"), this.randomBase2(13), h("br"), this.randomBase2(40), this.randomBase2(40), this.randomBase2(40), this.randomBase2(24)]), h("div.icon.icon-file-empty.file-bg"), h("div.percent", {
                        style: "transform: translateY(" + (114 * file_info.percent) + "px"
                    }, [Math.round(file_info.percent * 100), h("span.post", "% \u25B6")]), h("div.name", file_info.name), h("div.size", Text.formatSize(file_info.size)), file_info.status === "done" ? h("div.message.message-done", "File uploaded in " + (((file_info.updated - file_info.started) / 1000).toFixed(1)) + "s @ " + (Text.formatSize(file_info.speed)) + "/s!") : file_info.speed ? h("div.message", "Hashing @ " + (Text.formatSize(file_info.speed)) + "/s...") : h("div.message", "Opening file..."), h("a.button-big.button-finish", {
                        href: "?List",
                        onclick: this.handleFinishUpload,
                        classes: {
                            visible: file_info.status === "done"
                        }
                    }, "Finish upload \u00BB")
                ])
            ]);
        };

        return Uploader;

    })(Class);

    window.Uploader = Uploader;

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/ZeroUp.coffee ---- */


(function() {
    var ZeroUp,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
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

    ZeroUp = (function(superClass) {
        extend(ZeroUp, superClass);

        function ZeroUp() {
            this.handleLinkClick = bind(this.handleLinkClick, this);
            this.updateSiteInfo = bind(this.updateSiteInfo, this);
            this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
            return ZeroUp.__super__.constructor.apply(this, arguments);
        }

        ZeroUp.prototype.init = function() {
            this.bg = new Bg($("#Bg"));
            this.state = {};
            this.state.page = "list";
            this.on_site_info = new Promise();
            return this.on_loaded = new Promise();

        };

        ZeroUp.prototype.createProjector = function() {
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
                  };
              }
            this.projector.replace($("#List"), this.list.render);
            this.projector.replace($("#menu_left"), this.menuAll.render);
            this.projector.replace($("#main_upload_placeholder"), this.menuAll.render_top);
            return this.projector.replace($("#Uploader"), this.uploader.render);
        };

        ZeroUp.prototype.videoRoute = function() {
            var href_video = base.href.split('=', 2);
            var text_video = href_video[1];
            var new_text = text_video.split('_', 2);

            var vid_date_added = new_text[0];
            var vid_user_directory = new_text[1];

            this.videoPlayer.render(vid_date_added, vid_user_directory);
            return this;
        };

	ZeroUp.prototype.channelRoute = function() {
	    var href_channel = base.href.split('=')[1];
	    document.getElementById('debugger1').innerHTML = href_channel;
	    Page.list.openVideoChannel();
	};

        ZeroUp.prototype.setPage = function(page_name) {
            this.state.page = page_name;
            return this.projector.scheduleRender();
        };

        ZeroUp.prototype.setSiteInfo = function(site_info) {
            return this.site_info = site_info;
        };

        ZeroUp.prototype.onOpenWebsocket = function() {
            this.updateSiteInfo();
            return this.cmd("serverInfo", {}, (function(_this) {
                return function(server_info) {
                    _this.server_info = server_info;
                    if (_this.server_info.rev < 3090) {
                        return _this.cmd("wrapperNotification", ["error", "This site requires ZeroNet 0.6.0"]);
                    }
                };
            })(this));
        };

        ZeroUp.prototype.updateSiteInfo = function() {
            return this.cmd("siteInfo", {}, (function(_this) {
                return function(site_info) {
                    _this.address = site_info.address;
                    _this.setSiteInfo(site_info);
                    return _this.on_site_info.resolve();
                };
            })(this));
        };

        ZeroUp.prototype.onRequest = function(cmd, params) {
            var ref, ref1;
            if (cmd === "setSiteInfo") {
                this.setSiteInfo(params);
                if ((ref = (ref1 = params.event) != null ? ref1[0] : void 0) === "file_done" || ref === "file_delete" || ref === "peernumber_updated") {
                    return RateLimit(1000, (function(_this) {
                        return function() {
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
                    document.body.className = "";
                    window.scroll(window.pageXOffset, params.state.scrollTop || 0);
                    return this.route(params.state.url || "");
                }
            } else {
                return this.log("Unknown command", cmd, params);
            }
        };

        ZeroUp.prototype.route = function(query) {
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

        ZeroUp.prototype.setUrl = function(url, mode) {
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

        ZeroUp.prototype.handleLinkClick = function(e) {
            if (e.which === 2) {
                return true;
            } else {
                this.log("save scrollTop", window.pageYOffset);
                this.history_state["scrollTop"] = window.pageYOffset;
                this.cmd("wrapperReplaceState", [this.history_state, null]);
                window.scroll(window.pageXOffset, 0);
                this.history_state["scrollTop"] = 0;
                this.on_loaded.resolved = false;
                document.body.className = "";
                this.setUrl(e.currentTarget.search);
                return false;
            }
        };

        ZeroUp.prototype.createUrl = function(key, val) {
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

        ZeroUp.prototype.returnFalse = function() {
          return false;
        };

        return ZeroUp;

    })(ZeroFrame);

    window.Page = new ZeroUp();

    window.Page.createProjector();

}).call(this);


/* ---- /149EPBN4hQRpwj5TcoPETepnoXHCUXzaCN/js/clone.js ---- */


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}
