

/* ---- data/17SyG68UgnCATwbmnmf7pvRmQVej8ZnWUe/js/lib/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.route = bind(this.route, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      return this.cmd("innerReady");
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
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.route(cmd, message);
      }
    };

    ZeroFrame.prototype.route = function(cmd, message) {
      return this.log("Unknown command", message);
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
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
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

    ZeroFrame.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[ZeroFrame]"].concat(slice.call(args)));
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })();

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- data/17SyG68UgnCATwbmnmf7pvRmQVej8ZnWUe/js/Main.coffee ---- */


(function() {
  var RE_CAPTURE, RE_NO_CAPTURE, RE_SEP_2, Test, elide, equalArray, esc, example, j, len1, markup, markup2, plural, readFile, readItem, readPage, readWord, shard, utf8decode, utf8encode, x, y, z,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  RE_SEP_2 = /[\x00--\/;-@[-`{-~]+/g;

  RE_NO_CAPTURE = /[\x00-\/:-@[-`{-~]+/g;

  RE_CAPTURE = /([\x00-\x09\x0b-\/:-@[-`{-~]+|\n)/g;

  esc = function(text) {
    return (((String(text)).replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/\"/g, "&quot;");
  };

  plural = function(n, t) {
    if (n === 1) {
      return n + ' ' + t;
    } else {
      return n + ' ' + t + 's';
    }
  };

  elide = (function(_this) {
    return function(text, size) {
      if (text.length > size) {
        return (text.substr(0, size - 3)) + '...';
      } else {
        return text;
      }
    };
  })(this);

  markup2 = (function(_this) {
    return function(words, queries) {
      var j, len1, ref, result, word;
      result = '';
      for (j = 0, len1 = words.length; j < len1; j++) {
        word = words[j];
        if (ref = word.toLowerCase(), indexOf.call(queries, ref) >= 0) {
          result += '<b>' + (esc(word)) + '</b>';
        } else {
          result += esc(word);
        }
        if (result.length > 400) {
          break;
        }
      }
      return result.substr(0, 500);
    };
  })(this);

  markup = (function(_this) {
    return function(text, query) {
      var queries, words;
      words = text.split(RE_CAPTURE);
      queries = query.toLowerCase().split(RE_NO_CAPTURE);
      return markup2(words, queries);
    };
  })(this);

  example = (function(_this) {
    return function(text, query) {
      var i, j, nl, queries, ref, ref1, result, start, word, words;
      words = text.split(RE_CAPTURE);
      queries = query.toLowerCase().split(RE_NO_CAPTURE);
      nl = 0;
      for (i = j = 0, ref = words.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        word = words[i];
        if (word === '\n') {
          nl = i;
        }
        if (ref1 = word.toLowerCase(), indexOf.call(queries, ref1) >= 0) {
          if (i - nl < 20) {
            start = nl;
            result = words.slice(start, start + 100);
            return (markup2(result, queries)) + '...';
          } else {
            start = Math.max(i - 5, 0);
            result = words.slice(start, start + 100);
            return '...' + (markup2(result, queries)) + '...';
          }
        }
      }
      result = words.slice(0, 100);
      return '...' + (markup2(result, queries)) + '...';
    };
  })(this);

  shard = (function(_this) {
    return function(t) {
      var c, h, j, len1;
      h = 0;
      for (j = 0, len1 = t.length; j < len1; j++) {
        c = t[j];
        h = (2 * h + (c.charCodeAt(0))) % 255;
      }
      return h;
    };
  })(this);

  utf8encode = (function(_this) {
    return function(s) {
      var a, c;
      a = unescape(encodeURIComponent(s)).split('');
      return new Uint8Array((function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = a.length; j < len1; j++) {
          c = a[j];
          results.push(c.charCodeAt(0));
        }
        return results;
      })());
    };
  })(this);

  utf8decode = (function(_this) {
    return function(b) {
      var s;
      s = String.fromCharCode.apply(null, b);
      return decodeURIComponent(escape(s));
    };
  })(this);

  Test = (function(superClass) {
    extend(Test, superClass);

    function Test() {
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return Test.__super__.constructor.apply(this, arguments);
    }

    Test.prototype.onOpenWebsocket = function() {
      return begin();
    };

    return Test;

  })(ZeroFrame);

  readFile = (function(_this) {
    return function(path, cb) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.open('GET', path);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
        return cb(xhr.response);
      };
      xhr.onerror = function(e) {
        return cb(null);
      };
      return xhr.send();
    };
  })(this);

  readPage = (function(_this) {
    return function(id, cb) {
      return readFile('d/' + (Math.floor(id / 20)) + '.x', function(data) {
        var a, contents, i, id2, j, p, size, title, url, view;
        if (!data) {
          return cb('', '', '');
        }
        view = new DataView(data);
        p = 4;
        while (p < view.byteLength) {
          id2 = view.getUint32(p, true);
          p += 4;
          if (id === id2) {
            size = view.getUint16(p, true);
            title = utf8decode(new Uint8Array(data, p + 2, size));
            p += 2 + size;
            size = view.getUint16(p, true);
            url = utf8decode(new Uint8Array(data, p + 2, size));
            p += 2 + size;
            size = view.getUint16(p, true);
            contents = utf8decode(new Uint8Array(data, p + 2, size));
            p += 2 + size;
            return cb(title, url, contents);
          } else {
            for (i = j = 0; j <= 2; i = ++j) {
              a = view.getUint16(p, true);
              p += 2 + a;
            }
          }
        }
        return cb('', '', '');
      });
    };
  })(this);

  readWord = (function(_this) {
    return function(word, cb) {
      return readFile('w/' + shard(word) + '.x', function(data) {
        var count, i, ids, j, p, ref, size, view, word2;
        if (!data) {
          return cb([]);
        }
        view = new DataView(data);
        p = 0;
        while (p < view.byteLength) {
          size = view.getUint16(p, true);
          p += 2;
          word2 = utf8decode(new Uint8Array(data, p, size));
          p += size;
          count = view.getUint16(p, true);
          p += 2;
          if (word2 === word) {
            ids = [];
            for (i = j = 0, ref = count - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
              ids.push(view.getUint16(p, true));
              p += 2;
            }
            return cb(ids);
          } else {
            p += 2 * count;
          }
        }
        return cb([]);
      });
    };
  })(this);

  equalArray = (function(_this) {
    return function(a, b) {
      var i, j, ref;
      if (a.length !== b.length) {
        return false;
      }
      for (i = j = 0, ref = a.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    };
  })(this);

  readItem = (function(_this) {
    return function(name, text, cb) {
      var needle;
      needle = utf8encode(text);
      return readBucket(name, text, function(d) {
        var count, data, i, j, len, pos, ptrs, ref;
        if (d) {
          count = new Uint32Array(d, 4, 1)[0];
          ptrs = new Uint32Array(d, 8, count + 1);
          for (i = j = 0, ref = ptrs.length - 2; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            len = new Uint8Array(d, ptrs[i], 1)[0];
            data = new Uint8Array(d, ptrs[i] + 1, len);
            if (equalArray(needle, data)) {
              pos = ptrs[i] + 1 + len;
              cb(d.slice(pos, ptrs[i + 1]));
              return;
            }
          }
        }
        return cb(null);
      });
    };
  })(this);

  window.gets = {};

  x = (location.search.substr(1)).split('&');

  for (j = 0, len1 = x.length; j < len1; j++) {
    y = x[j];
    z = y.split('=');
    window.gets[z[0]] = decodeURIComponent(z[1].replace(/\+/g, ' '));
  }

  window.callback = (function(_this) {
    return function(obj) {
      return main.innerHTML = obj.html;
    };
  })(this);

  window.begin = (function(_this) {
    return function() {
      var html, k, len2, page, ress, results, showResults, w, word, ww;
      window.middle = document.getElementById('middle');
      window.info = document.getElementById('info');
      window.main = document.getElementById('main');
      window.pages = document.getElementById('pages');
      window.q = document.getElementById('q');
      window.info.innerHTML = '';
      window.pages.innerHTML = '';
      if (window.gets.s) {
        document.getElementById('middle').hidden = false;
        document.getElementById(window.gets.s).hidden = false;
      }
      window.q.focus();
      if (window.gets.q) {
        q.value = gets.q;
        window.middle.hidden = false;
        main.innerHTML = '<p class="info">Loading...</p>';
        word = window.gets.q.toLowerCase();
        if (window.gets.p) {
          page = Number(window.gets.p);
        } else {
          page = 1;
        }
        showResults = function(ids, word) {
          var f, html, html1, html2, i, k, page_count, ref;
          page_count = Math.ceil(ids.length / 20);
          html2 = '';
          html2 += 'Found ' + (plural(ids.length, 'result'));
          html2 += ' for <span class="url">';
          html2 += (esc(window.gets.q)) + '</span>.';
          if (page !== 1) {
            html2 += ' Page ' + page;
          }
          window.info.innerHTML = html2;
          ids = ids.slice(20 * page - 20, 20 * page);
          html1 = '';
          for (i = k = 1, ref = page_count; k <= ref; i = k += 1) {
            if (i !== page) {
              html1 += '<a href="?q=';
              html1 += esc(encodeURIComponent(window.gets.q));
              html1 += '&p=' + i + '">';
            }
            if (i < 10) {
              html1 += '&nbsp;&nbsp;' + i + '&nbsp;&nbsp;';
            } else {
              html1 += '&nbsp;' + i + '&nbsp;';
            }
            if (i !== page) {
              html1 += '</a>';
            }
            html1 += ' ';
          }
          window.pages.innerHTML = html1;
          html = '';
          i = 0;
          f = function(i) {
            var id;
            if (i >= ids.length) {
              return;
            }
            id = ids[i];
            return readPage(id, function(title, url, contents) {
              if (url) {
                if (!title) {
                  title = 'No Title';
                }
                html += '<p>';
                html += '<a rel="noreferrer" href="/' + (esc(url)) + '">';
                html += (markup(title, word)) + '</a><br>';
                html += '<span class="url">';
                html += (markup(elide(url, 100), word)) + '</span><br>';
                html += example(contents, word);
                html += '</p>';
              } else {
                html += '<p>This result failed to load (Result ID: ' + id + ').</p>';
              }
              window.main.innerHTML = html;
              return f(i + 1);
            });
          };
          if (ids.length === 0) {
            html += '<p>No results.</p>';
            return window.main.innerHTML = html;
          } else {
            return f(0);
          }
        };
        ress = [];
        ww = word.split(RE_SEP_2);
        ww = ww.filter(function(x) {
          return x !== '';
        });
        if (ww.length === 0) {
          html = '<p class="info">The search string appears to be empty (Code: 7).</p>';
          window.main.innerHTML = html;
        }
        results = [];
        for (k = 0, len2 = ww.length; k < len2; k++) {
          w = ww[k];
          if (w === '') {
            continue;
          }
          results.push(readWord(w, function(ids) {
            var count, id, l, len3, len4, m, map, max2, res;
            ress.push(ids);
            if (ress.length === ww.length) {
              map = {};
              for (l = 0, len3 = ress.length; l < len3; l++) {
                res = ress[l];
                for (m = 0, len4 = res.length; m < len4; m++) {
                  id = res[m];
                  map[id] = (map[id] | 0) + 1;
                }
              }
              ids = [];
              max2 = 0;
              for (id in map) {
                count = map[id];
                max2 = Math.max(max2, count);
              }
              for (id in map) {
                count = map[id];
                if (count === max2) {
                  ids.push(id | 0);
                }
              }
              return showResults(ids, word);
            }
          }));
        }
        return results;
      }
    };
  })(this);

  window.test = new Test();

}).call(this);
