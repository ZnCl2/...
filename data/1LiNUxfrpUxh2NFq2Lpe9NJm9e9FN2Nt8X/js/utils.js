
/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/Class.coffee ---- */


(function() {
  var Class,
    __slice = [].slice;

  Class = (function() {
    function Class() {}

    Class.prototype.trace = true;

    Class.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
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
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.trace) {
        return;
      }
      this.logtimers || (this.logtimers = {});
      this.logtimers[name] = +(new Date);
      if (args.length > 0) {
        this.log.apply(this, ["" + name].concat(__slice.call(args), ["(started)"]));
      }
      return this;
    };

    Class.prototype.logEnd = function() {
      var args, ms, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ms = +(new Date) - this.logtimers[name];
      this.log.apply(this, ["" + name].concat(__slice.call(args), ["(Done in " + ms + "ms)"]));
      return this;
    };

    return Class;

  })();

  window.Class = Class;

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/Follow.coffee ---- */


(function() {
  var Follow,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Follow = (function(_super) {
    __extends(Follow, _super);

    function Follow(_at_elem) {
      this.elem = _at_elem;
      this.handleMenuClick = __bind(this.handleMenuClick, this);
      this.init = __bind(this.init, this);
      this.menu = new Menu(this.elem);
      this.feeds = {};
      this.follows = {};
      this.elem.off("click");
      this.elem.on("click", (function(_this) {
        return function() {
          if (Page.server_info.rev > 850) {
            if (_this.elem.hasClass("following")) {
              _this.showFeeds();
            } else {
              _this.followDefaultFeeds();
            }
          } else {
            Page.cmd("wrapperNotification", ["info", "Please update your ZeroNet client to use this feature"]);
          }
          return false;
        };
      })(this));
      this.elem.css("display", "inline-block");
      this.width_following = this.elem.find(".text-following").width();
      this.width_follow = this.elem.find(".text-follow").width();
      this.elem.css("display", "none");
    }

    Follow.prototype.init = function() {
      if (!this.feeds) {
        return;
      }
      Page.cmd("feedListFollow", [], (function(_this) {
        return function(_at_follows) {
          var is_default_feed, menu_item, param, queries, query, title, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          _this.follows = _at_follows;
          queries = {};
          _ref = _this.feeds;
          for (title in _ref) {
            _ref1 = _ref[title], query = _ref1[0], menu_item = _ref1[1], is_default_feed = _ref1[2], param = _ref1[3];
            queries[query] = title;
          }
          _ref2 = _this.follows;
          for (title in _ref2) {
            _ref3 = _ref2[title], query = _ref3[0], param = _ref3[1];
            _this.log(title, "->", queries[query]);
            if (queries[query] && title !== queries[query]) {
              _this.log("Renamed query", title, "->", queries[query]);
              _this.follows[queries[query]] = _this.follows[title];
              delete _this.follows[title];
            }
          }
          _ref4 = _this.feeds;
          for (title in _ref4) {
            _ref5 = _ref4[title], query = _ref5[0], menu_item = _ref5[1], is_default_feed = _ref5[2], param = _ref5[3];
            if (_this.follows[title] && __indexOf.call(_this.follows[title][1], param) >= 0) {
              menu_item.addClass("selected");
            } else {
              menu_item.removeClass("selected");
            }
          }
          _this.updateListitems();
          return _this.elem.css("display", "inline-block");
        };
      })(this));
      return setTimeout(((function(_this) {
        return function() {
          if (typeof Page.site_info.feed_follow_num !== "undefined" && Page.site_info.feed_follow_num === null) {
            _this.log("Following default feeds");
            return _this.followDefaultFeeds();
          }
        };
      })(this)), 100);
    };

    Follow.prototype.addFeed = function(title, query, is_default_feed, param) {
      var menu_item;
      if (is_default_feed == null) {
        is_default_feed = false;
      }
      if (param == null) {
        param = "";
      }
      menu_item = this.menu.addItem(title, this.handleMenuClick);
      return this.feeds[title] = [query, menu_item, is_default_feed, param];
    };

    Follow.prototype.handleMenuClick = function(item) {
      item.toggleClass("selected");
      this.updateListitems();
      this.saveFeeds();
      return true;
    };

    Follow.prototype.showFeeds = function() {
      return this.menu.show();
    };

    Follow.prototype.followDefaultFeeds = function() {
      var is_default_feed, menu_item, param, query, title, _ref, _ref1;
      _ref = this.feeds;
      for (title in _ref) {
        _ref1 = _ref[title], query = _ref1[0], menu_item = _ref1[1], is_default_feed = _ref1[2], param = _ref1[3];
        if (is_default_feed) {
          menu_item.addClass("selected");
          this.log("Following", title);
        }
      }
      this.updateListitems();
      return this.saveFeeds();
    };

    Follow.prototype.updateListitems = function() {
      if (this.menu.elem.find(".selected").length > 0) {
        this.elem.addClass("following");
        this.elem.find(".text-follow").width(0);
        return this.elem.find(".text-following").width(this.width_following + 5);
      } else {
        this.elem.removeClass("following");
        this.elem.find(".text-following").width(0);
        return this.elem.find(".text-follow").width(this.width_follow + 5);
      }
    };

    Follow.prototype.saveFeeds = function() {
      var is_default_feed, item, menu_item, param, params, query, title, _ref, _ref1;
      _ref = this.feeds;
      for (title in _ref) {
        _ref1 = _ref[title], query = _ref1[0], menu_item = _ref1[1], is_default_feed = _ref1[2], param = _ref1[3];
        if (this.follows[title]) {
          params = (function() {
            var _i, _len, _ref2, _results;
            _ref2 = this.follows[title][1];
            _results = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              item = _ref2[_i];
              if (item !== param) {
                _results.push(item);
              }
            }
            return _results;
          }).call(this);
        } else {
          params = [];
        }
        if (menu_item.hasClass("selected")) {
          params.push(param);
        }
        if (params.length === 0) {
          delete this.follows[title];
        } else {
          this.follows[title] = [query, params];
        }
      }
      return Page.cmd("feedFollow", [this.follows]);
    };

    return Follow;

  })(Class);

  window.Follow = Follow;

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/InlineEditor.coffee ---- */


(function() {
  var InlineEditor,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  InlineEditor = (function() {
    function InlineEditor(_at_elem, _at_getContent, _at_saveContent, _at_getObject) {
      this.elem = _at_elem;
      this.getContent = _at_getContent;
      this.saveContent = _at_saveContent;
      this.getObject = _at_getObject;
      this.cancelEdit = __bind(this.cancelEdit, this);
      this.deleteObject = __bind(this.deleteObject, this);
      this.saveEdit = __bind(this.saveEdit, this);
      this.stopEdit = __bind(this.stopEdit, this);
      this.startEdit = __bind(this.startEdit, this);
      this.edit_button = $("<a href='#Edit' class='editable-edit icon-edit'></a>");
      this.edit_button.on("click", this.startEdit);
      this.elem.addClass("editable").before(this.edit_button);
      this.editor = null;
      this.elem.on("mouseenter", (function(_this) {
        return function(e) {
          var scrolltop, top;
          _this.edit_button.css("opacity", "0.4");
          scrolltop = $(window).scrollTop();
          top = _this.edit_button.offset().top - parseInt(_this.edit_button.css("margin-top"));
          if (scrolltop > top) {
            return _this.edit_button.css("margin-top", scrolltop - top + e.clientY - 20);
          } else {
            return _this.edit_button.css("margin-top", "");
          }
        };
      })(this));
      this.elem.on("mouseleave", (function(_this) {
        return function() {
          return _this.edit_button.css("opacity", "");
        };
      })(this));
      if (this.elem.is(":hover")) {
        this.elem.trigger("mouseenter");
      }
    }

    InlineEditor.prototype.startEdit = function() {
      var _i, _results;
      this.content_before = this.elem.html();
      this.editor = $("<textarea class='editor'></textarea>");
      this.editor.val(this.getContent(this.elem, "raw"));
      this.elem.after(this.editor);
      $(".editbg").css("display", "block").cssLater("opacity", 0.9, 10);
      this.elem.html((function() {
        _results = [];
        for (_i = 1; _i <= 50; _i++){ _results.push(_i); }
        return _results;
      }).apply(this).join("fill the width"));
      this.copyStyle(this.elem, this.editor);
      this.elem.html(this.content_before);
      this.autoExpand(this.editor);
      this.elem.css("display", "none");
      if ($(window).scrollTop() === 0) {
        this.editor[0].selectionEnd = 0;
        this.editor.focus();
      }
      $(".editable-edit").css("display", "none");
      $(".editbar").css("display", "inline-block").addClassLater("visible", 10);
      $(".publishbar").css("opacity", 0);
      $(".editbar .object").text(this.getObject(this.elem).data("object") + "." + this.elem.data("editable"));
      $(".editbar .button").removeClass("loading");
      $(".editbar .save").off("click").on("click", this.saveEdit);
      $(".editbar .delete").off("click").on("click", this.deleteObject);
      $(".editbar .cancel").off("click").on("click", this.cancelEdit);
      if (this.getObject(this.elem).data("deletable")) {
        $(".editbar .delete").css("display", "").html("Delete " + this.getObject(this.elem).data("object").split(":")[0]);
      } else {
        $(".editbar .delete").css("display", "none");
      }
      window.onbeforeunload = function() {
        return 'Your unsaved blog changes will be lost!';
      };
      return false;
    };

    InlineEditor.prototype.stopEdit = function() {
      if (this.editor) {
        this.editor.remove();
      }
      this.editor = null;
      this.elem.css("display", "");
      $(".editbg").css("opacity", 0).cssLater("display", "none", 300);
      $(".editable-edit").css("display", "");
      $(".editbar").cssLater("display", "none", 1000).removeClass("visible");
      $(".publishbar").css("opacity", 1);
      return window.onbeforeunload = null;
    };

    InlineEditor.prototype.saveEdit = function() {
      var content;
      content = this.editor.val();
      $(".editbar .save").addClass("loading");
      this.saveContent(this.elem, content, (function(_this) {
        return function(content_html) {
          if (content_html) {
            $(".editbar .save").removeClass("loading");
            _this.stopEdit();
            if (typeof content_html === "string") {
              _this.elem.html(content_html);
            }
            return $('pre code').each(function(i, block) {
              return hljs.highlightBlock(block);
            });
          } else {
            return $(".editbar .save").removeClass("loading");
          }
        };
      })(this));
      return false;
    };

    InlineEditor.prototype.deleteObject = function() {
      var object_type;
      object_type = this.getObject(this.elem).data("object").split(":")[0];
      Page.cmd("wrapperConfirm", ["Are you sure you sure to delete this " + object_type + "?", "Delete"], (function(_this) {
        return function(confirmed) {
          $(".editbar .delete").addClass("loading");
          return Page.saveContent(_this.getObject(_this.elem), null, function() {
            return _this.stopEdit();
          });
        };
      })(this));
      return false;
    };

    InlineEditor.prototype.cancelEdit = function() {
      this.stopEdit();
      this.elem.html(this.content_before);
      $('pre code').each(function(i, block) {
        return hljs.highlightBlock(block);
      });
      return false;
    };

    InlineEditor.prototype.copyStyle = function(elem_from, elem_to) {
      var from_style;
      elem_to.addClass(elem_from[0].className);
      from_style = getComputedStyle(elem_from[0]);
      elem_to.css({
        fontFamily: from_style.fontFamily,
        fontSize: from_style.fontSize,
        fontWeight: from_style.fontWeight,
        marginTop: from_style.marginTop,
        marginRight: from_style.marginRight,
        marginBottom: from_style.marginBottom,
        marginLeft: from_style.marginLeft,
        paddingTop: from_style.paddingTop,
        paddingRight: from_style.paddingRight,
        paddingBottom: from_style.paddingBottom,
        paddingLeft: from_style.paddingLeft,
        lineHeight: from_style.lineHeight,
        textAlign: from_style.textAlign,
        color: from_style.color,
        letterSpacing: from_style.letterSpacing
      });
      if (elem_from.innerWidth() < 1000) {
        return elem_to.css("minWidth", elem_from.innerWidth());
      }
    };

    InlineEditor.prototype.autoExpand = function(elem) {
      var editor;
      editor = elem[0];
      elem.height(1);
      elem.on("input", function() {
        if (editor.scrollHeight > elem.height()) {
          return elem.height(1).height(editor.scrollHeight + parseFloat(elem.css("borderTopWidth")) + parseFloat(elem.css("borderBottomWidth")));
        }
      });
      elem.trigger("input");
      return elem.on('keydown', function(e) {
        var s, val;
        if (e.which === 9) {
          e.preventDefault();
          s = this.selectionStart;
          val = elem.val();
          elem.val(val.substring(0, this.selectionStart) + "\t" + val.substring(this.selectionEnd));
          return this.selectionEnd = s + 1;
        }
      });
    };

    return InlineEditor;

  })();

  window.InlineEditor = InlineEditor;

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/Menu.coffee ---- */


(function() {
  var Menu,
    __slice = [].slice;

  Menu = (function() {
    function Menu(_at_button) {
      this.button = _at_button;
      this.elem = $(".menu.template").clone().removeClass("template");
      this.elem.appendTo("body");
      this.items = [];
    }

    Menu.prototype.show = function() {
      var button_pos;
      if (window.visible_menu && window.visible_menu.button[0] === this.button[0]) {
        window.visible_menu.hide();
        return this.hide();
      } else {
        button_pos = this.button.offset();
        this.elem.css({
          "top": button_pos.top + this.button.outerHeight(),
          "left": button_pos.left
        });
        this.button.addClass("menu-active");
        this.elem.addClass("visible");
        if (window.visible_menu) {
          window.visible_menu.hide();
        }
        return window.visible_menu = this;
      }
    };

    Menu.prototype.hide = function() {
      this.elem.removeClass("visible");
      this.button.removeClass("menu-active");
      return window.visible_menu = null;
    };

    Menu.prototype.addItem = function(title, cb) {
      var item;
      item = $(".menu-item.template", this.elem).clone().removeClass("template");
      item.html(title);
      item.on("click", (function(_this) {
        return function() {
          if (!cb(item)) {
            _this.hide();
          }
          return false;
        };
      })(this));
      item.appendTo(this.elem);
      this.items.push(item);
      return item;
    };

    Menu.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[Menu]"].concat(__slice.call(args)));
    };

    return Menu;

  })();

  window.Menu = Menu;

  $("body").on("click", function(e) {
    if (window.visible_menu && e.target !== window.visible_menu.button[0] && $(e.target).parent()[0] !== window.visible_menu.elem[0]) {
      return window.visible_menu.hide();
    }
  });

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/RateLimit.coffee ---- */


(function() {
  var call_after_interval, limits;

  limits = {};

  call_after_interval = {};

  window.RateLimit = function(interval, fn) {
    if (!limits[fn]) {
      call_after_interval[fn] = false;
      fn();
      return limits[fn] = setTimeout((function() {
        if (call_after_interval[fn]) {
          fn();
        }
        delete limits[fn];
        return delete call_after_interval[fn];
      }), interval);
    } else {
      return call_after_interval[fn] = true;
    }
  };

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/Text.coffee ---- */


(function() {
  var Renderer, Text,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Renderer = (function(_super) {
    __extends(Renderer, _super);

    function Renderer() {
      return Renderer.__super__.constructor.apply(this, arguments);
    }

    Renderer.prototype.image = function(href, title, text) {
      return "<code>![" + text + "](" + href + ")</code>";
    };

    return Renderer;

  })(marked.Renderer);

  Text = (function() {
    function Text() {}

    Text.prototype.toColor = function(text) {
      var hash, i, _i, _ref;
      hash = 0;
      for (i = _i = 0, _ref = text.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        hash += text.charCodeAt(i) * i;
      }
      return "hsl(" + (hash % 360) + ",30%,50%)";

      /*
      		for i in [0..2]
      			value = (hash >> (i * 8)) & 0xFF
      			color += ('00' + value.toString(16)).substr(-2)
      		return color
       */
    };

    Text.prototype.toMarked = function(text, options) {
      if (options == null) {
        options = {};
      }
      options["gfm"] = true;
      options["breaks"] = true;
      options["renderer"] = renderer;
      text = this.fixReply(text);
      text = marked(text, options);
      return this.fixHtmlLinks(text);
    };

    Text.prototype.fixHtmlLinks = function(text) {
      var back;
      if (window.is_proxy) {
        back = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="http://zero');
        return back.replace(/http:\/\/zero\/([^\/]+\.bit)/g, "http://$1");
      } else {
        return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
      }
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

    Text.prototype.fixReply = function(text) {
      return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
    };

    Text.prototype.toBitcoinAddress = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "");
    };

    Text.prototype.jsonEncode = function(obj) {
      return btoa(unescape(encodeURIComponent(JSON.stringify(obj, void 0, '\t'))));
    };

    return Text;

  })();

  window.is_proxy = window.location.pathname === "/";

  window.renderer = new Renderer();

  window.Text = new Text();

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/Time.coffee ---- */


(function() {
  var Time;

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(time) {
      var back, now, secs;
      now = +(new Date) / 1000;
      secs = now - time;
      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " minutes ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = "on " + this.date(time);
      }
      back = back.replace(/1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Time.prototype.date = function(timestamp, format) {
      var display, parts;
      if (format == null) {
        format = "short";
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


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/Translate.coffee ---- */


(function() {
  window._ = function(s) {
    return s;
  };

}).call(this);


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/utils/ZeroFrame.coffee ---- */



/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/TopicList.coffee ---- */



/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/TopicShow.coffee ---- */


/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/User.coffee ---- */



/* ---- /1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT/js/ZeroTalk.coffee ---- */
