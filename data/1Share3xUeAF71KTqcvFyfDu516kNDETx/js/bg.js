(function () {
    var Bg,
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

    Bg = (function (superClass) {
        extend(Bg, superClass);

        function Bg(bg_elem) {
            this.bg_elem = bg_elem;
            this.repositionItem = bind(this.repositionItem, this);
            this.handleResize = bind(this.handleResize, this);
            this.item_types = ["video", "gamepad", "ipod", "image", "file"];
            window.onresize = this.handleResize;
            this.handleResize();
            this.randomizePosition();
            setTimeout(((function (_this) {
                return function () {
                    return _this.randomizeAnimation();
                };
            })(this)), 10);
            this.log("inited");
        }

        Bg.prototype.handleResize = function () {
            this.width = window.innerWidth;
            return this.height = window.innerHeight;
        };

        Bg.prototype.randomizePosition = function () {
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

        Bg.prototype.getRandomOutpos = function () {
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

        Bg.prototype.randomizeAnimation = function () {
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
                results.push(item.addEventListener("transitionend", function (e) {
                    if (e.propertyName === "transform") {
                        return bg.repositionItem(this);
                    }
                }));
            }
            return results;
        };

        Bg.prototype.repositionItem = function (item) {
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