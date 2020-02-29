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
            this.renderSpeed = bind(this.renderSpeed, this);
            this.renderBlob = bind(this.renderBlob, this);
            this.animationBlobEnter = bind(this.animationBlobEnter, this);
            this.blobs = [];
            this.percent = 0;
            "setInterval ( =>\n	if @percent < 100 and Math.random() > 0.2\n		@setPercent(@percent + Math.random())\n), 100";
        }

        Uploader.prototype.setPercent = function (percent) {
            var i;
            this.blobs = (function () {
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

        Uploader.prototype.getRandomOutpos = function () {
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

        Uploader.prototype.animationBlobEnter = function (elem, projector, vnode, properties) {
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

        Uploader.prototype.renderBlob = function (blob) {
            return h("div.blob", {
                id: "blob-" + blob.id,
                key: blob.id,
                blob: blob,
                afterCreate: this.animationBlobEnter
            });
        };

        Uploader.prototype.renderSpeed = function () {
            return "<svg height=\"500\" width=\"500\">\n <linearGradient id=\"linearColors\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n     <stop offset=\"15%\" stop-color=\"#FF4136\"></stop>\n     <stop offset=\"40%\" stop-color=\"#1BA1E2\"></stop>\n     <stop offset=\"90%\" stop-color=\"#F012BE\"></stop>\n  </linearGradient>\n  <circle cx=\"300\" cy=\"300\" r=\"150\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg\"></circle>\n  <circle cx=\"300\" cy=\"300\" r=\"155\" stroke=\"black\" stroke-width=\"3\" class=\"speed-bg speed-bg-big\" stroke=\"url(#linearColors)\"></circle>\n  <circle cx=\"300\" cy=\"300\" r=\"150\" stroke-width=\"3\" class=\"speed-current\" stroke=\"url(#linearColors)\"></circle>\n  <text x=\"190\" y=\"373\" class=\"speed-text\">0</text>\n  <text x=\"173\" y=\"282\" class=\"speed-text\">20</text>\n  <text x=\"217\" y=\"210\" class=\"speed-text\">40</text>\n  <text x=\"292\" y=\"178\" class=\"speed-text\">60</text>\n  <text x=\"371\" y=\"210\" class=\"speed-text\">80</text>\n  <text x=\"404\" y=\"282\" class=\"speed-text\">100</text>\n  <text x=\"390\" y=\"373\" class=\"speed-text\">120</text>\n</svg>";
        };

        Uploader.prototype.render = function () {
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