
(function () {
    var Animation;

    Animation = (function () {
        function Animation() {}

        Animation.prototype.slideDown = function (elem, props) {
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
            setTimeout((function () {
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
            return elem.addEventListener("transitionend", function () {
                elem.classList.remove("animate-inout");
                elem.style.transition = elem.style.transform = elem.style.opacity = elem.style.height = null;
                elem.style.boxSizing = elem.style.marginTop = elem.style.marginBottom = null;
                elem.style.paddingTop = elem.style.paddingBottom = elem.style.overflow = null;
                elem.style.borderTopWidth = elem.style.borderBottomWidth = elem.style.overflow = null;
                return elem.removeEventListener("transitionend", arguments.callee, false);
            });
        };

        Animation.prototype.shouldScrollFix = function (elem, props) {
            var pos;
            pos = elem.getBoundingClientRect();
            if (props.animate_scrollfix && window.scrollY > 300 && pos.top < 0 && !document.querySelector(".noscrollfix:hover")) {
                return true;
            } else {
                return false;
            }
        };

        Animation.prototype.slideDownAnime = function (elem, props) {
            var cstyle;
            cstyle = window.getComputedStyle(elem);
            elem.style.overflowY = "hidden";
            return anime({
                targets: elem,
                height: [0, elem.offsetHeight],
                easing: 'easeInOutExpo'
            });
        };

        Animation.prototype.slideUpAnime = function (elem, remove_func, props) {
            elem.style.overflowY = "hidden";
            return anime({
                targets: elem,
                height: [elem.offsetHeight, 0],
                complete: remove_func,
                easing: 'easeInOutExpo'
            });
        };

        Animation.prototype.slideUp = function (elem, remove_func, props) {
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
            setTimeout((function () {
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
            return elem.addEventListener("transitionend", function (e) {
                if (e.propertyName === "opacity" || e.elapsedTime >= 0.6) {
                    elem.removeEventListener("transitionend", arguments.callee, false);
                    return setTimeout((function () {
                        return remove_func();
                    }), 2000);
                }
            });
        };

        Animation.prototype.showRight = function (elem, props) {
            elem.className += " animate";
            elem.style.opacity = 0;
            elem.style.transform = "TranslateX(-20px) Scale(1.01)";
            setTimeout((function () {
                elem.style.opacity = 1;
                return elem.style.transform = "TranslateX(0px) Scale(1)";
            }), 1);
            return elem.addEventListener("transitionend", function () {
                elem.classList.remove("animate");
                elem.style.transform = elem.style.opacity = null;
                return elem.removeEventListener("transitionend", arguments.callee, false);
            });
        };

        Animation.prototype.show = function (elem, props) {
            var delay, ref;
            delay = ((ref = arguments[arguments.length - 2]) != null ? ref.delay : void 0) * 1000 || 1;
            elem.className += " animate";
            elem.style.opacity = 0;
            setTimeout((function () {
                return elem.style.opacity = 1;
            }), delay);
            return elem.addEventListener("transitionend", function () {
                elem.classList.remove("animate");
                elem.style.opacity = null;
                return elem.removeEventListener("transitionend", arguments.callee, false);
            });
        };

        Animation.prototype.hide = function (elem, remove_func, props) {
            var delay, ref;
            delay = ((ref = arguments[arguments.length - 2]) != null ? ref.delay : void 0) * 1000 || 1;
            elem.className += " animate";
            setTimeout((function () {
                return elem.style.opacity = 0;
            }), delay);
            return elem.addEventListener("transitionend", function (e) {
                if (e.propertyName === "opacity") {
                    remove_func();
                    return elem.removeEventListener("transitionend", arguments.callee, false);
                }
            });
        };

        Animation.prototype.addVisibleClass = function (elem, props) {
            return setTimeout(function () {
                return elem.classList.add("visible");
            });
        };

        Animation.prototype.cloneAnimation = function (elem, animation) {
            return window.requestAnimationFrame((function (_this) {
                return function () {
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
                    return setTimeout((function () {
                        return clone.remove();
                    }), 1000);
                };
            })(this));
        };

        Animation.prototype.flashIn = function (elem) {
            if (elem.offsetWidth > 100) {
                return this.cloneAnimation(elem, "flash-in-big");
            } else {
                return this.cloneAnimation(elem, "flash-in");
            }
        };

        Animation.prototype.flashOut = function (elem) {
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