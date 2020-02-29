// Generated by CoffeeScript 1.10.0
(function() {
  var MySite,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MySite = (function(superClass) {
    extend(MySite, superClass);

    function MySite() {
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.selectUser = bind(this.selectUser, this);
      this.sendQuote = bind(this.sendQuote, this);
      return MySite.__super__.constructor.apply(this, arguments);
    }

    MySite.prototype.init = function() {
      var bodycount, ibody;
      this.log("inited!");
      this.my_quote_votes = {};
      this.sort_order = "date_added";
      this.sort_order_user = "date_added";
      this.show_votes = false;
      $("#shutter").hide();
      ibody = document.getElementById("input-body");
      bodycount = document.getElementById("bodycount");
      ibody.addEventListener("input", function() {
        return bodycount.innerHTML = this.value.length + " / 250";
      });
      $("#quotes-list").append(this.orderByHtml());
      $("body").on("keydown", function(e) {
        var height;
        if (e.which === 27) {
          this.sort_order_user = "date_added";
          this.show_votes = false;
          height = $(".user-box-outer").height();
          $(".user-box-outer").animate({
            top: -height,
            bottom: height
          }, 250, function() {
            $(".user-box-outer").remove();
            return $("#shutter").fadeOut();
          });
        }
        return true;
      });
      $(document).on("click", "#shutter", (function(_this) {
        return function() {
          var height;
          _this.sort_order_user = "date_added";
          _this.show_votes = false;
          height = $(".user-box-outer").height();
          return $(".user-box-outer").animate({
            top: -height,
            bottom: height
          }, 250, function() {
            $(".user-box-outer").remove();
            return $("#shutter").fadeOut();
          });
        };
      })(this));
      $(document).on("click", ".author", (function(_this) {
        return function(e) {
          var user;
          if ($(".user-box").length > 0) {
            return;
          }
          user = $(e.target).text();
          $("#shutter").fadeIn();
          return _this.showUser(user);
        };
      })(this));
      $(document).on("click", ".order-button, .tab", (function(_this) {
        return function(e) {
          var element, sort_order, user;
          element = $(e.target);
          if (element.hasClass("active")) {
            return false;
          }
          element.parent().find(".active").first().removeClass("active");
          element.addClass("active");
          sort_order = false;
          switch (element.text()) {
            case "date":
              sort_order = "date_added";
              break;
            case "votes":
              sort_order = "votes";
              break;
            case "created":
              _this.show_votes = false;
              break;
            case "voted for":
              _this.show_votes = true;
              break;
            default:
              _this.log("Something is very wrong here...");
          }
          if (element.parent().parent().attr("id") === "quotes-list") {
            _this.sort_order = sort_order;
            return _this.updateMyVotes(function() {
              return _this.loadQuotes();
            });
          } else {
            if (sort_order) {
              _this.sort_order_user = sort_order;
            }
            user = $(".user-box-outer").data("user");
            return _this.showUser(user, true);
          }
        };
      })(this));
      return $(document).on("click", ".votes", (function(_this) {
        return function(e) {
          var element, inner_path;
          element = $(e.target);
          if (element.hasClass("loading") || element.hasClass("disabled")) {
            return false;
          }
          if (!Page.site_info.cert_user_id) {
            Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
            return false;
          }
          inner_path = "data/users/" + _this.site_info.auth_address + "/data.json";
          element.toggleClass("active").addClass("loading");
          return _this.cmd("fileGet", {
            "inner_path": inner_path,
            "required": false
          }, function(data) {
            var json_raw, num_votes, quote_uri;
            if (data) {
              data = JSON.parse(data);
              if (data.next_quote_id == null) {
                data.next_quote_id = 100;
              }
            } else {
              data = {
                "next_quote_id": 1,
                "quote": []
              };
            }
            if (data.quote_vote == null) {
              data.quote_vote = {};
            }
            quote_uri = element.parent().attr("id").match("-([0-9]+-[A-Za-z0-9]+)$")[1];
            num_votes = element.parent().data("votes");
            if (element.hasClass("active")) {
              data.quote_vote[quote_uri] = 1;
              num_votes += 1;
              element.parent().data("votes", num_votes);
              element.text("Votes: " + num_votes);
            } else {
              delete data.quote_vote[quote_uri];
              num_votes -= 1;
              element.parent().data("votes", num_votes);
              element.text("Votes: " + num_votes);
            }
            json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
            return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
              if (res === "ok") {
                _this.updateMyVotes();
                return _this.cmd("sitePublish", {
                  "inner_path": inner_path
                }, function(res) {
                  return element.removeClass("loading");
                });
              } else {
                return _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
              }
            });
          });
        };
      })(this));
    };

    MySite.prototype.showUser = function(user, update) {
      var cb;
      if (update == null) {
        update = false;
      }
      cb = (function(_this) {
        return function(quotes) {
          var height, i, len, qbody, qby, quote, quote_el, quote_id, qwork, title, userbox, userbox_outer;
          if (update) {
            userbox = $(".user-box");
            userbox.empty();
          } else {
            userbox_outer = $('<div class="user-box-outer"></div>');
            title = $("<h2 class='user-box-h2'>Quotes by " + user + "</h2>");
            title.append(_this.tabsHtml());
            title.append(_this.orderByHtml());
            userbox_outer.append(title);
            userbox = $('<div class="user-box"></div>');
            userbox_outer.data("user", user);
            userbox_outer.append(userbox);
          }
          for (i = 0, len = quotes.length; i < len; i++) {
            quote = quotes[i];
            if (quote.body !== "") {
              qbody = quote.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              qby = quote.by.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              qwork = quote.work.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              if (quote.quote_id != null) {
                quote_id = quote.quote_id;
              } else {
                quote_id = 999;
              }
              quote_el = _this.quoteHtml(qbody, qby, qwork, quote.cert_user_id, quote_id, quote.user_address, quote.votes);
              userbox.append(quote_el);
            }
          }
          if (!update) {
            $("body").append(userbox_outer);
            height = userbox_outer.height();
            userbox_outer.css({
              top: -height,
              bottom: height
            });
            return userbox_outer.animate({
              top: 40,
              bottom: 40
            }, 250);
          }
        };
      })(this);
      if (this.show_votes) {
        return this.votesBy(user, cb);
      } else {
        return this.quotesBy(user, cb);
      }
    };

    MySite.prototype.orderByHtml = function() {
      return $('<span class="orderby">Order by <span class="order-button active">date</span> or <span class="order-button">votes</span></span>');
    };

    MySite.prototype.tabsHtml = function() {
      return $('<span class="tabs">Show <span class="tab active">created</span> or <span class="tab">voted for</span></span>');
    };

    MySite.prototype.quoteHtml = function(body, byline, work, author, quote_id, user_address, votes) {
      var line;
      if (work !== "") {
        line = $("<li id=\"quote-" + quote_id + "-" + user_address + "\"><span class=\"byline\">" + byline + "</span><span class=\"quote\">" + body + "</span><span class=\"link\"><a href=\"" + work + "\">" + work + "</a></span><span class=\"author\">" + author + "</span><span class=\"votes\">Votes: " + votes + "</span></li>");
      } else {
        line = $("<li id=\"quote-" + quote_id + "-" + user_address + "\"><span class=\"byline\">" + byline + "</span><span class=\"quote\">" + body + "</span><span class=\"author\">" + author + "</span><span class=\"votes\">Votes: " + votes + "</span></li>");
      }
      if (author === this.site_info.cert_user_id) {
        line.find(".votes").first().addClass("disabled");
      }
      if (this.my_quote_votes[quote_id + "-" + user_address]) {
        line.find(".votes").first().addClass("active");
      }
      line.data("votes", votes);
      return line;
    };

    MySite.prototype.addLine = function(body, byline, work, author, quote_id, user_address, votes) {
      var quotes;
      quotes = $("#quotes");
      return quotes.prepend(this.quoteHtml(body, byline, work, author, quote_id, user_address, votes));
    };

    MySite.prototype.updateMyVotes = function(cb) {
      var query;
      if (cb == null) {
        cb = null;
      }
      query = "SELECT 'quote_vote' AS type, quote_uri AS uri FROM json LEFT JOIN quote_vote USING (json_id) WHERE directory = \"" + Page.site_info.auth_address + "\" AND file_name = 'data.json'";
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(votes) {
          var i, len, vote;
          _this.my_quote_votes = {};
          for (i = 0, len = votes.length; i < len; i++) {
            vote = votes[i];
            _this.my_quote_votes[vote.uri] = true;
          }
          if (cb) {
            return cb();
          }
        };
      })(this));
    };

    MySite.prototype.votesBy = function(user, cb) {
      var user_query;
      user_query = "SELECT\n    keyvalue.value AS name,\n    content_json.directory AS address,\n    data_json.json_id AS cid\nFROM keyvalue\nLEFT JOIN json AS content_json USING (json_id)\nLEFT JOIN json AS data_json ON (\n    data_json.directory = content_json.directory AND data_json.file_name = 'data.json'\n)\nWHERE name = '" + user + "'";
      return this.cmd("dbQuery", [user_query], (function(_this) {
        return function(result) {
          var query, user_address, user_id;
          if (result.length === 1) {
            user_address = result[0].address;
            user_id = result[0].cid;
            query = "SELECT\n    quote.*,\n    keyvalue.value AS cert_user_id,\n    content_json.directory AS user_address,\n    (SELECT COUNT(*) FROM quote_vote WHERE quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory)+1 AS votes\nFROM quote\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nJOIN quote_vote ON (quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory AND quote_vote.json_id = " + user_id + ")\nORDER BY " + _this.sort_order_user + " DESC";
            return _this.cmd("dbQuery", [query], cb);
          }
        };
      })(this));
    };

    MySite.prototype.quotesBy = function(user, cb) {
      var query;
      query = "SELECT\n    quote.*,\n    keyvalue.value AS cert_user_id,\n    content_json.directory AS user_address,\n    (SELECT COUNT(*) FROM quote_vote WHERE quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory)+1 AS votes\nFROM quote\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nWHERE cert_user_id = '" + user + "'\nORDER BY " + this.sort_order_user + " DESC";
      return this.cmd("dbQuery", [query], cb);
    };

    MySite.prototype.loadQuotes = function() {
      var query;
      query = "SELECT\n    quote.*,\n    keyvalue.value AS cert_user_id,\n    content_json.directory AS user_address,\n    (SELECT COUNT(*) FROM quote_vote WHERE quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory)+1 AS votes\nFROM quote\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nORDER BY " + this.sort_order;
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(quotes) {
          var i, len, qbody, qby, quote, quote_id, qwork, results;
          document.getElementById("quotes").innerHTML = "";
          results = [];
          for (i = 0, len = quotes.length; i < len; i++) {
            quote = quotes[i];
            if (quote.body !== "") {
              qbody = quote.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              qby = quote.by.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              qwork = quote.work.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              if (quote.quote_id != null) {
                quote_id = quote.quote_id;
              } else {
                quote_id = 999;
              }
              results.push(_this.addLine(qbody, qby, qwork, quote.cert_user_id, quote_id, quote.user_address, quote.votes));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this));
    };

    MySite.prototype.sendQuote = function() {
      var inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
        return false;
      }
      if (document.getElementById("input-body").value === "") {
        Page.cmd("wrapperNotification", ["info", "You need to enter a Quote before submitting"]);
        return false;
      }
      if (document.getElementById("input-by").value === "") {
        Page.cmd("wrapperNotification", ["info", "You need to specify who the quote is from before submitting"]);
        return false;
      }
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      this.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          var json_raw;
          if (data) {
            data = JSON.parse(data);
            if (data.next_quote_id == null) {
              data.next_quote_id = 100;
            }
          } else {
            data = {
              "next_quote_id": 1,
              "quote": []
            };
          }
          data.quote.push({
            "quote_id": data.next_quote_id,
            "body": document.getElementById("input-body").value,
            "by": document.getElementById("input-by").value,
            "work": document.getElementById("input-work").value,
            "date_added": +(new Date)
          });
          data.next_quote_id += 1;
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (res === "ok") {
              _this.updateMyVotes(function() {
                return _this.loadQuotes();
              });
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                document.getElementById("input-body").value = "";
                document.getElementById("input-by").value = "";
                document.getElementById("input-work").value = "";
                return document.getElementById("bodycount").innerHTML = "0 / 250";
              });
            } else {
              return _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            }
          });
        };
      })(this));
      return false;
    };

    MySite.prototype.selectUser = function() {
      Page.cmd("certSelect", [["zeroid.bit"]]);
      return false;
    };

    MySite.prototype.route = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        if (message.params.cert_user_id) {
          document.getElementById("select_user").innerHTML = message.params.cert_user_id;
        } else {
          document.getElementById("select_user").innerHTML = "Select user";
        }
        this.site_info = message.params;
        if (message.params.event[0] === "file_done") {
          return this.updateMyVotes((function(_this) {
            return function() {
              return _this.loadQuotes();
            };
          })(this));
        }
      }
    };

    MySite.prototype.onOpenWebsocket = function(e) {
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(siteInfo) {
          if (siteInfo.cert_user_id) {
            document.getElementById("select_user").innerHTML = siteInfo.cert_user_id;
          }
          _this.site_info = siteInfo;
          return _this.updateMyVotes(function() {
            return _this.loadQuotes();
          });
        };
      })(this));
    };

    return MySite;

  })(ZeroFrame);

  window.Page = new MySite();

}).call(this);
