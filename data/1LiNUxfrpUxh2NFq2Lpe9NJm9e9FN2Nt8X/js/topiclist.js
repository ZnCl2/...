
(function() {
  var TopicList,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  TopicList = (function(superClass) {
    extend(TopicList, superClass);

    function TopicList() {
      this.submitTopicVote = bind(this.submitTopicVote, this);
      this.thread_sorter = null;
      this.parent_topic_uri = void 0;
      this.limit = 31;
      this.topic_parent_uris = {};
      this.topic_sticky_uris = {};
    }

    TopicList.prototype.actionList = function(parent_topic_id, parent_topic_user_address) {
      var j, len, ref, topic_sticky_uri;
      ref = Page.site_info.content.settings.topic_sticky_uris;
      for (j = 0, len = ref.length; j < len; j++) {
        topic_sticky_uri = ref[j];
        this.topic_sticky_uris[topic_sticky_uri] = 1;
      }
      $(".topics-loading").cssLater("top", "0px", 200);
      if (parent_topic_id) {
        $(".topics-title").html("&nbsp;");
        this.parent_topic_uri = parent_topic_id + "_" + parent_topic_user_address;
        Page.local_storage["topic." + parent_topic_id + "_" + parent_topic_user_address + ".visited"] = Time.timestamp();
        Page.cmd("wrapperSetLocalStorage", Page.local_storage);
      } else {
        $(".topics-title").html("Newest topics");
      }
      this.loadTopics("noanim");
      $(".topic-new-link").on("click", (function(_this) {
        return function() {
          if (Page.site_info.address === "1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT") {
            $(".topmenu").css("background-color", "#fffede");
            $(".topic-new .message").css("display", "block");
          }
          $(".topic-new").fancySlideDown();
          $(".topic-new-link").slideUp();
          return false;
        };
      })(this));
      $(".topic-new .button-submit").on("click", (function(_this) {
        return function() {
          _this.submitCreateTopic();
          return false;
        };
      })(this));
      $(".topics-more").on("click", (function(_this) {
        return function() {
          _this.limit += 100;
          $(".topics-more").text("Loading...");
          _this.loadTopics("noanim");
          return false;
        };
      })(this));
      return this.initFollowButton();
    };

    TopicList.prototype.initFollowButton = function() {
      var username;
      this.follow = new Follow($(".feed-follow-list"));
      if (this.parent_topic_uri) {
        this.follow.addFeed("New topics in this group", "SELECT title AS title, body, added AS date_added, 'topic' AS type, '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url, parent_topic_uri AS param FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) WHERE parent_topic_uri IN (:params)", true, this.parent_topic_uri);
      } else {
        this.follow.addFeed(_("New topics"), "SELECT title AS title, body, added AS date_added, 'topic' AS type, '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) WHERE parent_topic_uri IS NULL", true);
        if (Page.site_info.cert_user_id) {
          username = Page.site_info.cert_user_id.replace(/@.*/, "");
          this.follow.addFeed("Username mentions", "SELECT 'mention' AS type, comment.added AS date_added, topic.title, commenter_user.value || ': ' || comment.body AS body, topic_creator_json.directory AS topic_creator_address, topic.topic_id || '_' || topic_creator_json.directory AS row_topic_uri, '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN comment ON (comment.topic_uri = row_topic_uri) LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id) LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = 'content.json') LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id') WHERE comment.body LIKE '%[" + username + "%' OR comment.body LIKE '%@" + username + "%'", true);
        }
        this.follow.addFeed("All comments", "SELECT 'comment' AS type, comment.added AS date_added, topic.title, commenter_user.value || ': ' || comment.body AS body, topic_creator_json.directory AS topic_creator_address, topic.topic_id || '_' || topic_creator_json.directory AS row_topic_uri, '?Topic:' || topic.topic_id || '_' || topic_creator_json.directory AS url FROM topic LEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id) LEFT JOIN comment ON (comment.topic_uri = row_topic_uri) LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id) LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = 'content.json') LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id')");
      }
      return this.follow.init();
    };

    TopicList.prototype.loadTopics = function(type, cb) {
      var last_elem, query, ref, sql_sticky, sql_sticky_whens, topic_uri, where;
      if (type == null) {
        type = "list";
      }
      if (cb == null) {
        cb = false;
      }
      this.logStart("Load topics...");
      if (this.parent_topic_uri) {
        where = "WHERE parent_topic_uri = '" + this.parent_topic_uri + "' OR row_topic_uri = '" + this.parent_topic_uri + "'";
      } else {
        where = "WHERE topic.type IS NULL AND topic.parent_topic_uri IS NULL";
      }
      last_elem = $(".topics-list .topic.template");
      if (((ref = Page.site_info.content.settings.topic_sticky_uris) != null ? ref.length : void 0) > 0) {
        sql_sticky_whens = ((function() {
          var j, len, ref1, results;
          ref1 = Page.site_info.content.settings.topic_sticky_uris;
          results = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            topic_uri = ref1[j];
            results.push("WHEN '" + topic_uri + "' THEN 1");
          }
          return results;
        })()).join(" ");
        sql_sticky = "CASE topic.topic_id || '_' || topic_creator_content.directory " + sql_sticky_whens + " ELSE 0 END AS sticky";
      } else {
        sql_sticky = "0 AS sticky";
      }
      query = "SELECT\n COUNT(comment_id) AS comments_num, MAX(comment.added) AS last_comment, topic.added as last_added, CASE WHEN MAX(comment.added) IS NULL THEN topic.added ELSE MAX(comment.added) END as last_action,\n topic.*,\n topic_creator_user.value AS topic_creator_user_name,\n topic_creator_content.directory AS topic_creator_address,\n topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri,\n NULL AS row_topic_sub_uri, NULL AS row_topic_sub_title,\n (SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes,\n " + sql_sticky + "\nFROM topic\nLEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)\nLEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json')\nLEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id')\nLEFT JOIN comment ON (comment.topic_uri = row_topic_uri AND comment.added < " + (Date.now() / 1000 + 120) + ")\n" + where + "\nGROUP BY topic.topic_id, topic.json_id\nHAVING last_action < " + (Date.now() / 1000 + 120);
      if (!this.parent_topic_uri) {
        query += "\nUNION ALL\n\nSELECT\n COUNT(comment_id) AS comments_num, MAX(comment.added) AS last_comment,\n MAX(topic_sub.added) AS last_added,\n CASE WHEN MAX(topic_sub.added) > MAX(comment.added) OR MAX(comment.added) IS NULL THEN MAX(topic_sub.added) ELSE MAX(comment.added) END as last_action,\n topic.*,\n topic_creator_user.value AS topic_creator_user_name,\n topic_creator_content.directory AS topic_creator_address,\n topic.topic_id || '_' || topic_creator_content.directory AS row_topic_uri,\n topic_sub.topic_id || '_' || topic_sub_creator_content.directory AS row_topic_sub_uri,\n topic_sub.title AS topic_sub_title,\n (SELECT COUNT(*) FROM topic_vote WHERE topic_vote.topic_uri = topic.topic_id || '_' || topic_creator_content.directory)+1 AS votes,\n " + sql_sticky + "\nFROM topic\nLEFT JOIN json AS topic_creator_json ON (topic_creator_json.json_id = topic.json_id)\nLEFT JOIN json AS topic_creator_content ON (topic_creator_content.directory = topic_creator_json.directory AND topic_creator_content.file_name = 'content.json')\nLEFT JOIN keyvalue AS topic_creator_user ON (topic_creator_user.json_id = topic_creator_content.json_id AND topic_creator_user.key = 'cert_user_id')\nLEFT JOIN topic AS topic_sub ON (topic_sub.parent_topic_uri = topic.topic_id || '_' || topic_creator_content.directory)\nLEFT JOIN json AS topic_sub_creator_json ON (topic_sub_creator_json.json_id = topic_sub.json_id)\nLEFT JOIN json AS topic_sub_creator_content ON (topic_sub_creator_content.directory = topic_sub_creator_json.directory AND topic_sub_creator_content.file_name = 'content.json')\nLEFT JOIN comment ON (comment.topic_uri = row_topic_sub_uri AND comment.added < " + (Date.now() / 1000 + 120) + ")\nWHERE topic.type = \"group\"\nGROUP BY topic.topic_id\nHAVING last_action < " + (Date.now() / 1000 + 120);
      }
      if (!this.parent_topic_uri) {
        query += " ORDER BY sticky DESC, last_action DESC LIMIT " + this.limit;
      }
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(topics) {
          var elem, i, j, len, limited, topic, topic_parent;
          topics.sort(function(a, b) {
            var booster_a, booster_b;
            booster_a = booster_b = 0;
            if (window.TopicList.topic_sticky_uris[a.row_topic_uri]) {
              booster_a = window.TopicList.topic_sticky_uris[a.row_topic_uri] * 10000000;
            }
            if (window.TopicList.topic_sticky_uris[b.row_topic_uri]) {
              booster_b = window.TopicList.topic_sticky_uris[b.row_topic_uri] * 10000000;
            }
            return Math.max(b.last_comment + booster_b, b.last_added + booster_b) - Math.max(a.last_comment + booster_a, a.last_added + booster_a);
          });
          limited = false;
          for (i = j = 0, len = topics.length; j < len; i = ++j) {
            topic = topics[i];
            topic_uri = topic.row_topic_uri;
            if (topic.last_added) {
              topic.added = topic.last_added;
            }
            if (_this.parent_topic_uri && topic_uri === _this.parent_topic_uri) {
              topic_parent = topic;
              continue;
            }
            elem = $("#topic_" + topic_uri);
            if (elem.length === 0) {
              elem = $(".topics-list .topic.template").clone().removeClass("template").attr("id", "topic_" + topic_uri);
              if (type !== "noanim") {
                elem.cssSlideDown();
              }
              _this.applyTopicListeners(elem, topic);
            }
            if (i + 1 < _this.limit) {
              elem.insertAfter(last_elem);
            } else {
              limited = true;
            }
            last_elem = elem;
            _this.applyTopicData(elem, topic);
          }
          Page.addInlineEditors();
          $("body").css({
            "overflow": "auto",
            "height": "auto"
          });
          _this.logEnd("Load topics...");
          if (parseInt($(".topics-loading").css("top")) > -30) {
            $(".topics-loading").css("top", "-30px");
          } else {
            $(".topics-loading").remove();
          }
          if (_this.parent_topic_uri) {
            $(".topics-title").html("<span class='parent-link'><a href='?Main'>" + "Main" + ("</a> &rsaquo;</span> " + topic_parent.title));
          }
          $(".topics").css("opacity", 1);
          if (topics.length === 0) {
            if (Page.site_info.bad_files) {
              $(".message-big").text("Initial sync in progress...");
            } else {
              $(".message-big").text("Welcome to your own forum! :)");
              $(".topic-new-link").trigger("click");
            }
            $(".message-big").css("display", "block").cssLater("opacity", 1);
          } else {
            $(".message-big").css("display", "none");
          }
          if (limited) {
            $(".topics-more").css("display", "block");
          } else {
            $(".topics-more").css("display", "none");
          }
          if (cb) {
            return cb();
          }
        };
      })(this));
    };

    TopicList.prototype.applyTopicListeners = function(elem, topic) {
      return $(".user_menu", elem).on("click", (function(_this) {
        return function() {
          var menu;
          menu = new Menu($(".user_menu", elem));
          /*menu.addItem("Mute this user", function() {
            elem.fancySlideUp();
            return Page.cmd("muteAdd", [topic.topic_creator_address, topic.topic_creator_user_name, "Topic: " + topic.title]);
          });*/
          menu.show();
          return false;
        };
      })(this));
    };

    TopicList.prototype.applyTopicData = function(elem, topic, type) {
      var body, last_action, subtopic_title_hash, subtopic_uri, title_hash, topic_uri, url, url_match, visited;
      if (type == null) {
        type = "list";
      }
      title_hash = Text.toUrl(topic.title);
      topic_uri = topic.row_topic_uri;
      $(".title .title-link", elem).text(topic.title);
      $(".title .title-link, a.image, .comment-num", elem).attr("href", "?Topic:" + topic_uri + "/" + title_hash);
      elem.data("topic_uri", topic_uri);
      body = topic.body;
      if (topic.link) { url_match = topic.link;}    //mod: take rss link rather than one in body
      else { url_match = body.match(/http[s]{0,1}:\/\/[^"', \r\n)$]+/);}    //
      if (topic.type === "group") {
        $(elem).addClass("topic-group");
        $(".image .icon", elem).removeClass("icon-topic-chat").addClass("icon-topic-group");
        $(".link", elem).css("display", "none");
        $(".title .title-link, a.image, .comment-num", elem).attr("href", "?Topics:" + topic_uri + "/" + title_hash);
      } else if (url_match) {
        if (topic.link) { url = url_match;}    //mod : idem
        else { url = url_match[0];}    //
        if (type !== "show") {
          body = body.replace(/http[s]{0,1}:\/\/[^"' \r\n)$]+$/g, "");
        }
        if (topic.doc === "depeche") { $(".image .icon", elem).removeClass("icon-topic-chat").addClass("icon-topic-tox");} //special icon for "depeche"
        else if (topic.doc === "journal") { $(".image .icon", elem).removeClass("icon-topic-chat").addClass("icon-topic-gnu");} //idem for "journal"
        else { $(".image .icon", elem).removeClass("icon-topic-chat").addClass("icon-topic-link");}
        $(".link", elem).css("display", "").attr("href", Text.fixLink(url));
        $(".link .link-url", elem).text(url);
      } else {
        $(".image .icon", elem).removeClass("icon-topic-link").addClass("icon-topic-chat");
        $(".link", elem).css("display", "none");
      }
      if (topic.doc) {
        if (topic.doc === "depeche") { $(".doc", elem).html("Dépêche");} //add the type of document under the logo ("depeche" or "journal" in this case)
        if (topic.doc === "journal") { $(".doc", elem).html("Journal");}
        if (type === "show") {
            document.getElementById("monbody").innerHTML = "<span><a href='" + topic.link + "' class='link'><div class='icon icon-link'></div><span class='link-url'>" + topic.link + "</span></a>" + "<a href='http://creativecommons.org/licenses/by-sa/4.0/deed.fr' class='link link-licence'><span class='link-url'>" + "Licence CC by-sa" + "</span></a></span><br>" + topic.body.replace(/src\s{0,1}=/gi, 'class="nosrc" onclick="showImage();" nosrc=').replace(/srcset\s{0,1}=/gi, 'class="nosrcset" onclick="showImage();" nosrcset=');  // there is always marker in rss body so we don't modify it. At the beginning we add the rss link (link to the original page). And licence !!!
            var nosrcs = document.getElementsByClassName("nosrc");
            for (var i = 0; i < nosrcs.length; i++) {
                nosrcs[i].setAttribute("alt", "Display images");
                nosrcs[i].setAttribute("style", "cursor:pointer; color:blue; font-weight: bold;");
            }
        } else {
            var body_rep = body.replace(/<[^>]*>/gi," "); //remove marker to show properly the first line we need without.
            $(".body", elem).text(body_rep.slice(0,100)); //reduce length because it's hidden. No need to load all text in the webpage.
        }
      } else {
        if (type === "show") {
            $(".body", elem).html(Text.toMarked(body, {
            "sanitize": true
            }));
        } else {
            $(".body", elem).text(body.slice(0,100)); //reduce length because it's hidden
        }
      }
      if (window.TopicList.topic_sticky_uris[topic_uri]) {
        elem.addClass("topic-sticky");
      }
      if (type !== "show") {
        last_action = Math.max(topic.last_comment, topic.added);
        if (topic.type === "group") {
          $(".comment-num", elem).text("last activity");
          $(".added", elem).text(Time.since(last_action));
        } else if (topic.comments_num === 1) {
          $(".comment-num", elem).text(topic.comments_num + " comment");
          $(".added", elem).text("last " + Time.since(last_action));
        } else if (topic.comments_num > 0) {
          $(".comment-num", elem).text(topic.comments_num + " comments");
          $(".added", elem).text("last " + Time.since(last_action));
        } else {
          $(".comment-num", elem).text("0 comments");
          if (topic.pubDate) {
              $(".added", elem).text("published on " + topic.pubDate.split(" ")[0] + " at " + topic.pubDate.split(" ")[1]);    // show the original publishing date
          } else {
              $(".added", elem).text(Time.since(last_action));
          }
        }
      }
      if (topic.author) {
        $(".user_name", elem).text(topic.author).attr("title", topic.topic_creator_user_name + ": " + topic.topic_creator_address);    //show the original author
      } else {
        $(".user_name", elem).text(topic.topic_creator_user_name.replace(/@.*/, "")).attr("title", topic.topic_creator_user_name + ": " + topic.topic_creator_address);
      }
      if (User.my_topic_votes[topic_uri]) {
        $(".score-inactive .score-num", elem).text(topic.votes - 1);
        $(".score-active .score-num", elem).text(topic.votes);
        $(".score", elem).addClass("active");
      } else {
        $(".score-inactive .score-num", elem).text(topic.votes);
        $(".score-active .score-num", elem).text(topic.votes + 1);
      }
      $(".score", elem).off("click").on("click", this.submitTopicVote);
      visited = Page.local_storage["topic." + topic_uri + ".visited"];
      if (!visited) {
        elem.addClass("visit-none");
      } else if (visited < last_action) {
        elem.addClass("visit-newcomment");
      }
      if (type === "show") {
        if (topic.pubDate) { $(".added", elem).text("published on " + topic.pubDate.split(' ')[0] + ' at ' + topic.pubDate.split(' ')[1]);}  // show the original publishing date
        else { $(".added", elem).text("posted " + Time.since(topic.added));}
      }
      if (topic.row_topic_sub_title) {
        subtopic_title_hash = Text.toUrl(topic.row_topic_sub_title);
        subtopic_uri = topic.row_topic_sub_uri;
        $(".subtopic", elem).css("display", "block");
        $(".subtopic-link", elem).attr("href", "?Topic:" + subtopic_uri + "/" + subtopic_title_hash).text(topic.row_topic_sub_title);
      }
      if ((topic.topic_creator_address === Page.site_info.auth_address) && !(topic.doc)) {
        $(elem).attr("data-object", "Topic:" + topic_uri).attr("data-deletable", "yes");
        $(".title .title-link", elem).attr("data-editable", "title").data("content", topic.title);
        return $(".body", elem).attr("data-editable", "body").data("content", topic.body);
      }
    };

    TopicList.prototype.submitCreateTopic = function() {
      var body, title;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("certSelect", [["zeroid.bit"]]);
        return false;
      }
      title = $(".topic-new #topic_title").val().trim();
      body = $(".topic-new #topic_body").val().trim();
      if (!title) {
        return $(".topic-new #topic_title").focus();
      }
      $(".topic-new .button-submit").addClass("loading");
      return User.getData((function(_this) {
        return function(data) {
          var topic;
          topic = {
            "topic_id": data.next_topic_id + Time.timestamp(),
            "title": title,
            "body": body,
            "added": Time.timestamp()
          };
          if (Page.site_info.address === "1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT" && (title + body).match(/[\u3400-\u9FBF]/)) {
            topic.parent_topic_uri = "10_1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj";
          }
          if (_this.parent_topic_uri) {
            topic.parent_topic_uri = _this.parent_topic_uri;
          }
          data.topic.push(topic);
          data.next_topic_id += 1;
          return User.publishData(data, function(res) {
            $(".topic-new .button-submit").removeClass("loading");
            $(".topic-new").slideUp();
            $(".topic-new-link").slideDown();
            setTimeout((function() {
              if (topic.parent_topic_uri && _this.parent_topic_uri !== topic.parent_topic_uri) {
                return window.top.location = "?Topics:" + topic.parent_topic_uri;
              } else {
                return _this.loadTopics();
              }
            }), 600);
            $(".topic-new #topic_body").val("");
            return $(".topic-new #topic_title").val("");
          });
        };
      })(this));
    };

    TopicList.prototype.submitTopicVote = function(e) {
      var elem, inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("certSelect", [["zeroid.bit"]]);
        return false;
      }
      elem = $(e.currentTarget);
      elem.toggleClass("active").addClass("loading");
      inner_path = "data/users/" + User.my_address + "/data.json";
      User.getData((function(_this) {
        return function(data) {
          var topic_uri;
          if (data.topic_vote == null) {
            data.topic_vote = {};
          }
          topic_uri = elem.parents(".topic").data("topic_uri");
          if (elem.hasClass("active")) {
            data.topic_vote[topic_uri] = 1;
          } else {
            delete data.topic_vote[topic_uri];
          }
          return User.publishData(data, function(res) {
            return elem.removeClass("loading");
          });
        };
      })(this));
      return false;
    };

    return TopicList;

  })(Class);

  window.TopicList = new TopicList();

}).call(this);


