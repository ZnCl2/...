
(function() {
  var User,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  User = (function(_super) {
    __extends(User, _super);

    function User() {
      this.my_topic_votes = {};
      this.my_comment_votes = {};
      this.rules = {};
      this.certselectButtons();
    }

    User.prototype.updateMyInfo = function(cb) {
      if (cb == null) {
        cb = null;
      }
      this.log("Updating user info...", this.my_address);
      return this.updateMyVotes(cb);
    };

    User.prototype.updateMyVotes = function(cb) {
      var query;
      if (cb == null) {
        cb = null;
      }
      query = "SELECT 'topic_vote' AS type, topic_uri AS uri FROM json LEFT JOIN topic_vote USING (json_id) WHERE directory = \"" + Page.site_info.auth_address + "\" AND file_name = 'data.json'\nUNION\nSELECT 'comment_vote' AS type, comment_uri AS uri FROM json LEFT JOIN comment_vote USING (json_id) WHERE directory = \"" + Page.site_info.auth_address + "\" AND file_name = 'data.json'";
      Page.cmd("dbQuery", [query], (function(_this) {
        return function(votes) {
          var vote, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = votes.length; _i < _len; _i++) {
            vote = votes[_i];
            if (vote.type === "topic_vote") {
              _results.push(_this.my_topic_votes[vote.uri] = true);
            } else {
              _results.push(_this.my_comment_votes[vote.uri] = true);
            }
          }
          return _results;
        };
      })(this));
      if (cb) {
        return cb();
      }
    };

    User.prototype.certselectButtons = function() {
      return $(".certselect").on("click", (function(_this) {
        return function() {
          if (Page.server_info.rev < 160) {
            Page.cmd("wrapperNotification", ["error", "Comments requires at least ZeroNet 0.3.0 Please upgade!"]);
          } else {
            Page.cmd("certSelect", [["zeroid.bit"]]);
          }
          return false;
        };
      })(this));
    };

    User.prototype.checkCert = function(type) {
      var last_cert_user_id;
      last_cert_user_id = $(".user_name-my").text();
      if ($(".comment-new .user_name").text() !== Page.site_info.cert_user_id || type === "updaterules") {
        if (Page.site_info.cert_user_id) {
          $(".comment-new").removeClass("comment-nocert");
          $(".user_name-my").text(Page.site_info.cert_user_id).css({
            "color": Text.toColor(Page.site_info.cert_user_id)
          });
        } else {
          $(".comment-new").addClass("comment-nocert");
          $(".user_name-my").text("Please sign in");
        }
        if (Page.site_info.cert_user_id) {
          return Page.cmd("fileRules", "data/users/" + Page.site_info.auth_address + "/content.json", (function(_this) {
            return function(rules) {
              _this.rules = rules;
              if (rules.max_size) {
                return _this.setCurrentSize(rules.current_size);
              } else {
                return _this.setCurrentSize(0);
              }
            };
          })(this));
        } else {
          return this.setCurrentSize(0);
        }
      }
    };

    User.prototype.setCurrentSize = function(current_size) {
      var current_size_kb, percent;
      if (current_size) {
        current_size_kb = current_size / 1000;
        $(".user-size").text("used: " + (current_size_kb.toFixed(1)) + "k/" + (Math.round(this.rules.max_size / 1000)) + "k").attr("title", "Every new user has limited space to store comments, topics and votes.\n" + "This indicator shows your used/total allowed KBytes.\n" + "The site admin can increase it if you about to run out of it.");
        percent = Math.round(100 * current_size / this.rules.max_size);
        $(".user-size-used").css("width", percent + "%");
        if (percent > 80) {
          return $(".user-size-warning").css("display", "block").find("a").text(Page.site_info.content.settings.admin).attr("href", Text.fixLink(Page.site_info.content.settings.admin_href));
        }
      } else {
        return $(".user-size").text("");
      }
    };

    User.prototype.getData = function(cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          if (data) {
            data = JSON.parse(data);
          } else {
            data = {
              "next_topic_id": 1,
              "topic": [],
              "topic_vote": {},
              "next_comment_id": 1,
              "comment": {},
              "comment_vote": {}
            };
          }
          return cb(data);
        };
      })(this));
    };

    User.prototype.publishData = function(data, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.writePublish(inner_path, Text.jsonEncode(data), (function(_this) {
        return function(res) {
          _this.checkCert("updaterules");
          if (cb) {
            return cb(res);
          }
        };
      })(this));
    };

    return User;

  })(Class);

  window.User = new User();

}).call(this);

