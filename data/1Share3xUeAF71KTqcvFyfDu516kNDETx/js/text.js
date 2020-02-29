(function () {
    var Text,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            indexOf = [].indexOf || function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
                return i;
        }
        return -1;
    };

    Text = (function () {
        function Text() {
            this.renderLinks = bind(this.renderLinks, this);
            this.renderMarked = bind(this.renderMarked, this);
        }

        Text.prototype.toColor = function (text, saturation, lightness) {
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

        Text.prototype.renderMarked = function (text, options) {
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

        Text.prototype.renderLinks = function (text) {
            text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            text = text.replace(/(https?:\/\/[^\s)]+)/g, function (match) {
                return "<a href=\"" + (match.replace(/&amp;/g, '&')) + "\">" + match + "</a>";
            });
            text = text.replace(/\n/g, '<br>');
            text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:');
            text = this.fixHtmlLinks(text);
            return text;
        };

        Text.prototype.emailLinks = function (text) {
            return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
        };

        Text.prototype.fixHtmlLinks = function (text) {
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

        Text.prototype.fixLink = function (link) {
            var back;
            if (window.is_proxy) {
                back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
                return back.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
            } else {
                return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
            }
        };

        Text.prototype.toUrl = function (text) {
            return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
        };

        Text.prototype.getSiteUrl = function (address) {
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

        Text.prototype.fixReply = function (text) {
            return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
        };

        Text.prototype.toBitcoinAddress = function (text) {
            return text.replace(/[^A-Za-z0-9]/g, "");
        };

        Text.prototype.jsonEncode = function (obj) {
            return unescape(encodeURIComponent(JSON.stringify(obj)));
        };

        Text.prototype.jsonDecode = function (obj) {
            return JSON.parse(decodeURIComponent(escape(obj)));
        };

        Text.prototype.fileEncode = function (obj) {
            if (typeof obj === "string") {
                return btoa(unescape(encodeURIComponent(obj)));
            } else {
                return btoa(unescape(encodeURIComponent(JSON.stringify(obj, void 0, '\t'))));
            }
        };

        Text.prototype.utf8Encode = function (s) {
            return unescape(encodeURIComponent(s));
        };

        Text.prototype.utf8Decode = function (s) {
            return decodeURIComponent(escape(s));
        };

        Text.prototype.distance = function (s1, s2) {
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
            extra_parts = (function () {
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

        Text.prototype.queryParse = function (query) {
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

        Text.prototype.queryEncode = function (params) {
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

        Text.prototype.highlight = function (text, search) {
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

        Text.prototype.sqlIn = function (values) {
            var value;
            return "(" + ((function () {
                var j, len, results;
                results = [];
                for (j = 0, len = values.length; j < len; j++) {
                    value = values[j];
                    results.push("'" + value + "'");
                }
                return results;
            })()).join(',') + ")";
        };

        Text.prototype.formatSize = function (size) {
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
