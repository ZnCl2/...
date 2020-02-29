
(function() {
  var ZeroTalk,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroTalk = (function(superClass) {
    extend(ZeroTalk, superClass);

    function ZeroTalk() {
      this.setSiteinfo = bind(this.setSiteinfo, this);
      this.actionSetSiteInfo = bind(this.actionSetSiteInfo, this);
      this.saveContent = bind(this.saveContent, this);
      this.getObject = bind(this.getObject, this);
      this.getContent = bind(this.getContent, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return ZeroTalk.__super__.constructor.apply(this, arguments);
    }

    ZeroTalk.prototype.init = function() {
      var i, len, ref, textarea;
      this.log("inited!");
      this.site_info = null;
      this.server_info = null;
      this.local_storage = {};
      this.site_address = null;
      ref = $("textarea");
      for (i = 0, len = ref.length; i < len; i++) {
        textarea = ref[i];
        this.autoExpand($(textarea));
      }
      return $(".editbar .icon-help").on("click", (function(_this) {
        return function() {
          $(".editbar .markdown-help").css("display", "block");
          $(".editbar .markdown-help").toggleClassLater("visible", 10);
          $(".editbar .icon-help").toggleClass("active");
          return false;
        };
      })(this));
    };

    ZeroTalk.prototype.onOpenWebsocket = function(e) {
      this.cmd("wrapperSetViewport", "width=device-width, initial-scale=0.8");
      this.cmd("wrapperGetLocalStorage", [], (function(_this) {
        return function(res) {
          if (res == null) {
            res = {};
          }
          return _this.local_storage = res;
        };
      })(this));
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site) {
          _this.site_address = site.address;
          _this.setSiteinfo(site);
          return User.updateMyInfo(function() {
            return _this.routeUrl(window.location.search.substring(1));
          });
        };
      })(this));
      return this.cmd("serverInfo", {}, (function(_this) {
        return function(ret) {
          var version;
          _this.server_info = ret;
          version = parseInt(_this.server_info.version.replace(/\./g, ""));
          if (version < 31) {
            return _this.cmd("wrapperNotification", ["error", "ZeroTalk requires ZeroNet 0.3.1, please update!"]);
          }
        };
      })(this));
    };

    ZeroTalk.prototype.onPageLoaded = function() {
      return $("body").addClass("loaded");
    };

    ZeroTalk.prototype.routeUrl = function(url) {
      var match;
      this.log("Routing url:", url);
      if (match = url.match(/Topic:([0-9]+)_([0-9a-zA-Z]+)/)) {
        $("body").addClass("page-topic");
        return TopicShow.actionShow(parseInt(match[1]), Text.toBitcoinAddress(match[2]));
      } else if (match = url.match(/Topics:([0-9]+)_([0-9a-zA-Z]+)/)) {
        $("body").addClass("page-topics");
        return TopicList.actionList(parseInt(match[1]), Text.toBitcoinAddress(match[2]));
      } else {
        $("body").addClass("page-main");
        return TopicList.actionList();
      }
    };

    ZeroTalk.prototype.addInlineEditors = function() {
      var editor, elem, elems, i, len;
      this.logStart("Adding inline editors");
      elems = $("[data-editable]");
      for (i = 0, len = elems.length; i < len; i++) {
        elem = elems[i];
        elem = $(elem);
        if (!elem.data("editor") && !elem.hasClass("editor")) {
          editor = new InlineEditor(elem, this.getContent, this.saveContent, this.getObject);
          elem.data("editor", editor);
        }
      }
      return this.logEnd("Adding inline editors");
    };

    ZeroTalk.prototype.getContent = function(elem, raw) {
      if (raw == null) {
        raw = false;
      }
      return elem.data("content");
    };

    ZeroTalk.prototype.getObject = function(elem) {
      if (elem.data("object")) {
        return elem;
      } else {
        return elem.parents("[data-object]");
      }
    };

    ZeroTalk.prototype.saveContent = function(elem, content, cb) {
      var delete_object, id, object, ref, type;
      if (cb == null) {
        cb = false;
      }
      if (elem.data("deletable") && content === null) {
        delete_object = true;
      } else {
        delete_object = false;
      }
      object = this.getObject(elem);
      ref = object.data("object").split(":"), type = ref[0], id = ref[1];
      return User.getData((function(_this) {
        return function(data) {
          var comment, comment_id, comment_uri, ref1, ref2, ref3, ref4, topic, topic_creator_address, topic_id, topic_uri, user_address;
          if (type === "Topic") {
            ref1 = id.split("_"), topic_id = ref1[0], user_address = ref1[1];
            topic_id = parseInt(topic_id);
            topic = ((function() {
              var i, len, ref2, results;
              ref2 = data.topic;
              results = [];
              for (i = 0, len = ref2.length; i < len; i++) {
                topic = ref2[i];
                if (topic.topic_id === topic_id) {
                  results.push(topic);
                }
              }
              return results;
            })())[0];
            if (delete_object) {
              data.topic.splice(data.topic.indexOf(topic), 1);
            } else {
              topic[elem.data("editable")] = content;
            }
          }
          if (type === "Comment") {
            ref2 = id.split("@"), comment_uri = ref2[0], topic_uri = ref2[1];
            ref3 = comment_uri.split("_"), comment_id = ref3[0], user_address = ref3[1];
            ref4 = topic_uri.split("_"), topic_id = ref4[0], topic_creator_address = ref4[1];
            comment_id = parseInt(comment_id);
            comment = ((function() {
              var i, len, ref5, results;
              ref5 = data.comment[topic_uri];
              results = [];
              for (i = 0, len = ref5.length; i < len; i++) {
                comment = ref5[i];
                if (comment.comment_id === comment_id) {
                  results.push(comment);
                }
              }
              return results;
            })())[0];
            if (delete_object) {
              data.comment[topic_uri].splice(data.comment[topic_uri].indexOf(comment), 1);
            } else {
              comment[elem.data("editable")] = content;
            }
          }
          return User.publishData(data, function(res) {
            if (res) {
              if (delete_object) {
                if (cb) {
                  cb(true);
                }
                return elem.fancySlideUp();
              } else {
                if (type === "Topic") {
                  if ($("body").hasClass("page-main") || $("body").hasClass("page-topics")) {
                    TopicList.loadTopics("list", (function() {
                      if (cb) {
                        return cb(true);
                      }
                    }));
                  }
                  if ($("body").hasClass("page-topic")) {
                    TopicShow.loadTopic((function() {
                      if (cb) {
                        return cb(true);
                      }
                    }));
                  }
                }
                if (type === "Comment") {
                  return TopicShow.loadComments("normal", (function() {
                    if (cb) {
                      return cb(true);
                    }
                  }));
                }
              }
            } else {
              if (cb) {
                return cb(false);
              }
            }
          });
        };
      })(this));
    };

    ZeroTalk.prototype.onRequest = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        return this.actionSetSiteInfo(message);
      } else {
        return this.log("Unknown command", message);
      }
    };

    ZeroTalk.prototype.writePublish = function(inner_path, data, cb) {
      return this.cmd("fileWrite", [inner_path, data], (function(_this) {
        return function(res) {
          if (res !== "ok") {
            _this.cmd("wrapperNotification", ["error", "File write error: " + res.error]);
            cb(false);
            return false;
          }
          return _this.cmd("sitePublish", {
            "inner_path": inner_path
          }, function(res) {
            if (res === "ok") {
              return cb(true);
            } else {
              return cb(res);
            }
          });
        };
      })(this));
    };

    ZeroTalk.prototype.actionSetSiteInfo = function(res) {
      var mentions_menu_elem, ref, site_info;
      site_info = res.params;
      this.setSiteinfo(site_info);
      if (site_info.event && site_info.event[0] === "file_done" && site_info.event[1].match(/.*users.*data.json$/)) {
        return RateLimit(500, (function(_this) {
          return function() {
            if ($("body").hasClass("page-topic")) {
              TopicShow.loadTopic();
              TopicShow.loadComments();
            }
            if ($("body").hasClass("page-main") || $("body").hasClass("page-topics")) {
              return TopicList.loadTopics();
            }
          };
        })(this));
      } else if (((ref = site_info.event) != null ? ref[0] : void 0) === "cert_changed" && site_info.cert_user_id) {
        TopicList.initFollowButton();
        mentions_menu_elem = TopicList.follow.feeds["Username mentions"][1];
        return setTimeout(((function(_this) {
          return function() {
            if (!mentions_menu_elem.hasClass("selected")) {
              return mentions_menu_elem.trigger("click");
            }
          };
        })(this)), 100);
      }
    };

    ZeroTalk.prototype.setSiteinfo = function(site_info) {
      this.site_info = site_info;
      return User.checkCert();
    };

    ZeroTalk.prototype.autoExpand = function(elem) {
      var editor;
      editor = elem[0];
      if (elem.height() > 0) {
        elem.height(1);
      }
      elem.on("input", function() {
        var min_height, new_height, old_height;
        if (editor.scrollHeight > elem.height()) {
          old_height = elem.height();
          elem.height(1);
          new_height = editor.scrollHeight;
          new_height += parseFloat(elem.css("borderTopWidth"));
          new_height += parseFloat(elem.css("borderBottomWidth"));
          new_height -= parseFloat(elem.css("paddingTop"));
          new_height -= parseFloat(elem.css("paddingBottom"));
          min_height = parseFloat(elem.css("lineHeight")) * 2;
          if (new_height < min_height) {
            new_height = min_height + 4;
          }
          return elem.height(new_height - 4);
        }
      });
      if (elem.height() > 0) {
        return elem.trigger("input");
      } else {
        return elem.height("48px");
      }
    };
    
    /*ZeroTalk.prototype.showImage = function(site_info) {
      alert("jkgjhghjhhgj");
    };*/

    
    /*ZeroTalk.prototype.showImage = function() {
            this.cmd("wrapperConfirm", ["Are you sure ? Download images from external sources (outside Zeronet network) expose you ", "Display"], (confirmed) => {
                if (confirmed) { 
                    var nosrcs = document.getElementsByClassName("nosrc");
                    console.log("ohoh " + nosrcs);
                    for (var i = 0; i < nosrcs.length; i++) {
                        nosrcs[i].setAttribute("src", nosrcs[i].getAttribute("nosrc"));
                    }
                    var nosrcsets = document.getElementsByClassName("nosrcset");
                    for (var i = 0; i < nosrcsets.length; i++) {
                        nosrcsets[i].onclick = function() {
                            nosrcsets[i].setAttribute("srcset", nosrcs[i].getAttribute("nosrcset"));
                        };
                    }
                }
            });
            return false;
    };*/

    return ZeroTalk;

  })(ZeroFrame);

  window.Page = new ZeroTalk();

}).call(this);
