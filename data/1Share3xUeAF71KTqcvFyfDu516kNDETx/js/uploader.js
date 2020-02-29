
(function () {
    var Uploader,
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

    Uploader = (function (superClass) {
        extend(Uploader, superClass);

        function Uploader() {
            this.render = bind(this.render, this);
            this.handleFinishUpload = bind(this.handleFinishUpload, this);
            this.randomBase2 = bind(this.randomBase2, this);
            this.renderSpeed = bind(this.renderSpeed, this);
            this;
        }

        Uploader.prototype.renderSpeed = function () {
            return "<svg>\n <linearGradient id=\"linearColors\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n     <stop offset=\"15%\" stop-color=\"#FF4136\"></stop>\n     <stop offset=\"40%\" stop-color=\"#1BA1E2\"></stop>\n     <stop offset=\"90%\" stop-color=\"#F012BE\"></stop>\n  </linearGradient>\n  <circle cx=\"0\" cy=\"0\" r=\"150\" transform=\"translate(300, 300) rotate(-72.7)\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg\"></circle>\n  <circle cx=\"0\" cy=\"0\" r=\"155\" transform=\"translate(300, 300) rotate(149.3)\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg speed-bg-big\" stroke=\"url(#linearColors)\"></circle>\n  <circle cx=\"0\" cy=\"0\" r=\"150\" transform=\"translate(300, 300) rotate(-210)\" stroke-width=\"3\" class=\"speed-current\" stroke=\"url(#linearColors)\" id=\"speed_current\"></circle>\n  <text x=\"190\" y=\"373\" class=\"speed-text\">0</text>\n  <text x=\"173\" y=\"282\" class=\"speed-text\">20</text>\n  <text x=\"217\" y=\"210\" class=\"speed-text\">40</text>\n  <text x=\"292\" y=\"178\" class=\"speed-text\">60</text>\n  <text x=\"371\" y=\"210\" class=\"speed-text\">80</text>\n  <text x=\"404\" y=\"282\" class=\"speed-text\">100</text>\n  <text x=\"390\" y=\"373\" class=\"speed-text\">120</text>\n</svg>";
        };

        Uploader.prototype.randomBase2 = function (len) {
            return (Math.random()).toString(2).slice(2, len);
        };

        Uploader.prototype.handleFinishUpload = function () {
            Page.state.page = "list";
            Page.projector.scheduleRender();
            setTimeout(((function (_this) {
                return function () {
                    return Page.list.update();
                };
            })(this)), 1000);
            return false;
        };

        Uploader.prototype.render = function () {
            var dash_offset, file_info;
            file_info = Page.selector.file_info;
            dash_offset = Math.max(2390 - (486 * file_info.speed / 1024 / 1024 / 100), 1770) + Math.random() * 10;
            if (dash_offset !== this.last_dash_offset) {
                this.last_dash_offset = dash_offset;
                setTimeout(((function (_this) {
                    return function () {
                        var ref;
                        return (ref = document.getElementById("speed_current")) != null ? ref.style.strokeDashoffset = dash_offset : void 0;
                    };
                })(this)), 1);
            }
            return h("div.Uploader", {
                classes: {
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
