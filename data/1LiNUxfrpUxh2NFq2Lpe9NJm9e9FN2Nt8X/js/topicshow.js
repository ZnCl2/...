
(function() {
  var TopicShow,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  TopicShow = (function(_super) {
    __extends(TopicShow, _super);

    function TopicShow() {
      this.submitCommentVote = __bind(this.submitCommentVote, this);
      return TopicShow.__super__.constructor.apply(this, arguments);
    }

    TopicShow.prototype.actionShow = function(topic_id, topic_user_address) {
      var textarea;
      this.topic_id = topic_id;
      this.topic_user_address = topic_user_address;
      this.topic_uri = this.topic_id + "_" + this.topic_user_address;
      this.topic = null;
      this.list_all = false;
      $(".topic-title").css("display", "none");
      this.loadTopic();
      this.loadComments("noanim");
      $(".comment-new .button-submit-form").on("click", (function(_this) {
        return function() {
          _this.submitComment();
          return false;
        };
      })(this));
      textarea = $(".comment-new #comment_body");
      $(".comment-new #comment_body").on("input", (function(_this) {
        return function() {
          var current_size;
          if (User.rules.max_size) {
            if (textarea.val().length > 0) {
              current_size = User.rules.current_size + textarea.val().length + 90;
            } else {
              current_size = User.rules.current_size;
            }
            return User.setCurrentSize(current_size);
          }
        };
      })(this));
      $(".comments-more").on("click", (function(_this) {
        return function() {
          _this.list_all = true;
          $(".comments-more").text("Loading...");
          _this.loadComments("noanim");
          return false;
        };
      })(this));
      return this.initFollowButton();
    };

    TopicShow.prototype.initFollowButton = function() {
      this.follow = new Follow($(".feed-follow-show"));
      this.follow.addFeed("Comments in this topic", "SELECT 'comment' AS type, comment.added AS date_added, topic.title, commenter_user.value || ': ' || comment.body AS body, topic_creator_json.directory AS topic_creator_address, topic.topic_id || '_' || topic_creator_json.directory AS row_topic_uri, '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN comment ON (comment.topic_uri = row_topic_uri) LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id) LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = 'content.json') LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id') WHERE row_topic_uri IN (:params)", true, this.topic_uri);
      return this.follow.init();
    };

    TopicShow.prototype.queryTopic = function(topic_id, topic_user_address) {
      return "SELECT topic.*, topic_creator_user.value AS topic_creator_user_name, topic_creator_content.directory AS topic_creator_address, topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri, (SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json') LEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id') WHERE topic.topic_id = " + topic_id + " AND topic_creator_address = '" + topic_user_address + "' LIMIT 1";
    };

    TopicShow.prototype.loadTopic = function(cb) {
      if (cb == null) {
        cb = false;
      }
      this.logStart("Loading topic...");
      $(".topic-full").attr("id", "topic_" + this.topic_uri);
      return Page.cmd("dbQuery", [this.queryTopic(this.topic_id, this.topic_user_address)], (function(_this) {
        return function(res) {
          var parent_topic_id, parent_topic_user_address, _ref;
          _this.topic = res[0];
          TopicList.applyTopicData($(".topic-full"), _this.topic, "show");
          if (_this.topic.parent_topic_uri) {
            $(".topic-title").css("display", "");
            _ref = _this.topic.parent_topic_uri.split("_"), parent_topic_id = _ref[0], parent_topic_user_address = _ref[1];
            Page.cmd("dbQuery", [_this.queryTopic(parent_topic_id, parent_topic_user_address)], function(parent_res) {
              var parent_topic;
              parent_topic = parent_res[0];
              return $(".topic-title").html("<span class='parent-link'><a href='?Main'>" + "Main" + ("</a> &rsaquo;</span> <span class='parent-link'><a href='?Topics:" + parent_topic.row_topic_uri + "/" + (Text.toUrl(parent_topic.title)) + "'>" + parent_topic.title + "</a> &rsaquo;</span> " + _this.topic.title));
            });
          }
          $(".topic-full").css("opacity", 1);
          $("body").addClass("page-topic");
          _this.logEnd("Loading topic...");
          if (cb) {
            return cb();
          }
        };
      })(this));

    };

    TopicShow.prototype.loadComments = function(type, cb) {
      var query;
      if (type == null) {
        type = "show";
      }
      if (cb == null) {
        cb = false;
      }
      this.logStart("Loading comments...");
      query = "SELECT comment.*, user.value AS user_name, user_json_content.directory AS user_address, (SELECT COUNT(*) FROM comment_vote WHERE comment_vote.comment_uri = comment.comment_id || '_' || user_json_content.directory)+1 AS votes FROM comment LEFT JOIN json AS user_json_data ON (user_json_data.json_id = comment.json_id) LEFT JOIN json AS user_json_content ON (user_json_content.directory = user_json_data.directory AND user_json_content.file_name = 'content.json') LEFT JOIN keyvalue AS user ON (user.json_id = user_json_content.json_id AND user.key = 'cert_user_id') WHERE comment.topic_uri = '" + this.topic_id + "_" + this.topic_user_address + "' AND added < " + (Date.now() / 1000 + 120) + " ORDER BY added DESC";
      if (!this.list_all) {
        query += " LIMIT 60";
      }
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(comments) {
          var comment, comment_uri, elem, focused, _i, _len;
          focused = $(":focus");
          _this.logEnd("Loading comments...");
          $(".comments .comment:not(.template)").attr("missing", "true");
          for (_i = 0, _len = comments.length; _i < _len; _i++) {
            comment = comments[_i];
            comment_uri = comment.comment_id + "_" + comment.user_address;
            elem = $("#comment_" + comment_uri);
            if (elem.length === 0) {
              elem = $(".comment.template").clone().removeClass("template").attr("id", "comment_" + comment_uri).data("topic_uri", _this.topic_uri);
              if (type !== "noanim") {
                elem.cssSlideDown();
              }
              _this.applyCommentListeners(elem, comment);
              $(".score", elem).attr("id", "comment_score_" + comment_uri).on("click", _this.submitCommentVote);
            }
            _this.applyCommentData(elem, comment);
            elem.appendTo(".comments").removeAttr("missing");
          }
          $("body").css({
            "overflow": "auto",
            "height": "auto"
          });
          $(".comment[missing]").remove();
          Page.addInlineEditors();
          if (comments.length === 60) {
            $(".comments-more").css("display", "block");
          } else {
            $(".comments-more").css("display", "none");
          }
          if (comments.length > 0) {
            Page.local_storage["topic." + _this.topic_id + "_" + _this.topic_user_address + ".visited"] = comments[0].added;
          } else {
            Page.local_storage["topic." + _this.topic_id + "_" + _this.topic_user_address + ".visited"] = _this.topic.added;
          }
          Page.cmd("wrapperSetLocalStorage", Page.local_storage);
          focused.focus();
          if (cb) {
            return cb();
          }
        };
      })(this));
    };

    TopicShow.prototype.applyCommentListeners = function(elem, comment) {
      $(".reply", elem).on("click", (function(_this) {
        return function(e) {
          return _this.buttonReply($(e.target).parents(".comment"));
        };
      })(this));
      return $(".menu_3dot", elem).on("click", (function(_this) {
        return function() {
          var menu;
          menu = new Menu($(".menu_3dot", elem));
          menu.addItem("Mute this user", function() {
            elem.fancySlideUp();
            return Page.cmd("muteAdd", [comment.user_address, comment.user_name, "Comment: " + comment.body.slice(0, 21)]);
          });
          menu.show();
          return false;
        };
      })(this));
    };

    TopicShow.prototype.applyCommentData = function(elem, comment) {
      var comment_uri, user_name;
      user_name = comment.user_name;
      $(".body", elem).html(Text.toMarked(comment.body, {
        "sanitize": true
      }));
      $(".user_name", elem).text(user_name.replace(/@.*/, "")).css({
        "color": Text.toColor(user_name)
      }).attr("title", user_name + ": " + comment.user_address);
      $(".added", elem).text(Time.since(comment.added)).attr("title", Time.date(comment.added, "long"));
      comment_uri = elem.attr("id").replace("comment_", "");
      if (User.my_comment_votes[comment_uri]) {
        $(".score-inactive .score-num", elem).text(comment.votes - 1);
        $(".score-active .score-num", elem).text(comment.votes);
        $(".score", elem).addClass("active");
      } else {
        $(".score-inactive .score-num", elem).text(comment.votes);
        $(".score-active .score-num", elem).text(comment.votes + 1);
      }
      if (comment.user_address === Page.site_info.auth_address) {
        $(elem).attr("data-object", "Comment:" + comment_uri + "@" + this.topic_uri).attr("data-deletable", "yes");
        return $(".body", elem).attr("data-editable", "body").data("content", comment.body);
      }
    };

    TopicShow.prototype.buttonReply = function(elem) {
      var body_add, elem_quote, post_id, selected_text, user_name;
      this.log("Reply to", elem);
      user_name = $(".user_name", elem).text();
      post_id = elem.attr("id");
      body_add = "> [" + user_name + "](\#" + post_id + "): ";
      elem_quote = $(".body", elem).clone();
      $("blockquote", elem_quote).remove();
      selected_text = window.getSelection().toString();
      if (selected_text) {
        body_add += selected_text;
      } else {
        body_add += elem_quote.text().trim("\n").replace(/\n[\s\S]+/g, " [...]");
      }
      body_add += "\n\n";
      $(".comment-new #comment_body").val($(".comment-new #comment_body").val() + body_add);
      $(".comment-new #comment_body").trigger("input").focus();
      return false;
    };

    TopicShow.prototype.submitComment = function() {
      var body;
      if (!this.follow.feeds["Comments in this topic"][1].hasClass("selected")) {
        this.follow.feeds["Comments in this topic"][1].trigger("click");
      }
      body = $(".comment-new #comment_body").val().trim();
      if (!body) {
        $(".comment-new #comment_body").focus();
        return;
      }
      $(".comment-new .button-submit").addClass("loading");
      return User.getData((function(_this) {
        return function(data) {
          var _base, _name;
          if ((_base = data.comment)[_name = _this.topic_uri] == null) {
            _base[_name] = [];
          }
          data.comment[_this.topic_uri].push({
            "comment_id": data.next_comment_id,
            "body": body,
            "added": Time.timestamp()
          });
          data.next_comment_id += 1;
          return User.publishData(data, function(res) {
            $(".comment-new .button-submit").removeClass("loading");
            if (res === true) {
              _this.log("File written");
              _this.loadComments();
              return $(".comment-new #comment_body").val("").delay(600).animate({
                "height": 72
              }, {
                "duration": 1000,
                "easing": "easeInOutCubic"
              });
            }
          });
        };
      })(this));
    };

    TopicShow.prototype.submitCommentVote = function(e) {
      var elem;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, choose your account before upvoting."]);
        return false;
      }
      elem = $(e.currentTarget);
      elem.toggleClass("active").addClass("loading");
      User.getData((function(_this) {
        return function(data) {
          var comment_uri;
          if (data.comment_vote == null) {
            data.comment_vote = {};
          }
          comment_uri = elem.attr("id").match("_([0-9]+_[A-Za-z0-9]+)$")[1];
          if (elem.hasClass("active")) {
            data.comment_vote[comment_uri] = 1;
          } else {
            delete data.comment_vote[comment_uri];
          }
          return User.publishData(data, function(res) {
            return elem.removeClass("loading");
          });
        };
      })(this));
      return false;
    };

    return TopicShow;

  })(Class);

  window.TopicShow = new TopicShow();

}).call(this);


