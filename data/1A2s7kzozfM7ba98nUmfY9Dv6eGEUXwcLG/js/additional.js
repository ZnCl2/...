class Page extends ZeroFrame {


/*        setSiteInfo(site_info) {
                var out = document.getElementById("out")
                out.innerHTML =
                        "Page address: " + site_info.address +
                        "<br>- Peers: " + site_info.peers +
                        "<br>- Size: " + site_info.settings.size +
                        "<br>- Modified: " + (new Date(site_info.content.modified*1000))
        }

        onOpenWebsocket() {
                this.cmd("siteInfo", [], function(site_info) {
                        page.setSiteInfo(site_info)
                })
        }

        onRequest(cmd, message) {
                if (cmd == "setSiteInfo")
                        this.setSiteInfo(message.params)
                else
                        this.log("Unknown incoming message:", cmd)
        }
}
page = new Page()
*/

// General load data
/*
ZeroBlog.prototype.loadData2 = function(query) {
  if (query == null) {
    query = "new";
  }
  if (query === "old") {
    query = "SELECT key, value FROM json LEFT JOIN keyvalue USING (json_id) WHERE path = 'data.json'";
  } else {
    query = "SELECT key, value FROM json LEFT JOIN keyvalue USING (json_id) WHERE directory = '' AND file_name = 'data.json'";
  }
  return this.cmd("dbQuery", [query], (function(_this) {
    return function(res) {
      var j, len, row;
      _this.data = {};
      if (res) {
        for (j = 0, len = res.length; j < len; j++) {
          row = res[j];
          _this.data[row.key] = row.value;
        }
        $(".left h1 a:not(.editable-edit)").html(_this.data.title).data("content", _this.data.title);
        $(".left h2").html(Text.renderMarked(_this.data.description)).data("content", _this.data.description);
        return $(".left .links").html(Text.renderMarked(_this.data.links)).data("content", _this.data.links);
      }
    };
  })(this));


// pageMain2
  ZeroBlog.prototype.pageMain2 = function() {
    var limit, order_limit_closure, query;
    limit = 15;
    order_limit_closure = "ORDER BY date_published DESC\nLIMIT " + ((this.page - 1) * limit) + ", " + limit + " ";
    query = "SELECT COUNT(*) as post_id,\n  NULL as title,NULL as body,NULL as date_published,\n  NULL as json_id, NULL as comments,NULL as votes\nFROM post\nUNION ALL\nSELECT * FROM (\nSELECT\n  post.*, COUNT(comment_id) AS comments,\n  (SELECT COUNT(*) FROM post_vote\n  WHERE post_vote.post_id = post.post_id) AS votes\nFROM post\nLEFT JOIN comment USING (post_id)\nGROUP BY post_id\n" + order_limit_closure + "\n)";
    return this.cmd("dbQuery", [query], (function(_this) {
      return function(res) {
        var deal_post, parse_res, tag_query;
        parse_res = function(res, tags) {
          var elem, j, l, len, len1, post, s, tag, total;
          total = res[0].post_id;
          res = res.slice(1);
          s = +(new Date);
          _this.applyPagerdata(_this.page, limit, total);
          res.reverse();
          for (j = 0, len = res.length; j < len; j++) {
            post = res[j];
            post.tag = [];
            for (l = 0, len1 = tags.length; l < len1; l++) {
              tag = tags[l];
              if (post.post_id === tag.post_id) {
                post.tag.push(tag.value);
              }
            }
            elem = $("#post_" + post.post_id);
            if (elem.length === 0) {
              elem = $(".post.template").clone().removeClass("template").attr("id", "post_" + post.post_id);
              elem.prependTo(".posts");
              elem.find(".like").attr("id", "post_like_" + post.post_id).off("click").on("click", _this.submitPostVote);
            }
            _this.applyPostdata(elem, post);
          }
          _this.pageLoaded();
          _this.log("Posts loaded in", (+(new Date)) - s, "ms");
          return $(".posts .new").off("click").on("click", function() {
            _this.cmd("fileGet", ["data/data.json"], function(res) {
              var data;
              data = JSON.parse(res);
              data.post.unshift({
                post_id: data.next_post_id,
                title: "New Project",
                date_published: (+(new Date)) / 1000,
                body: "Project Description"
              });
              data.next_post_id += 1;
              elem = $(".post.template").clone().removeClass("template");
              _this.applyPostdata(elem, data.post[0]);
              elem.hide();
              elem.prependTo(".posts").slideDown();
              _this.addInlineEditors(elem);
              return _this.writeData(data);
            });
            return false;
          });
        };
        tag_query = "SELECT tag.* FROM tag\nLEFT JOIN (\nSELECT post_id FROM post\n" + order_limit_closure + "\n) AS post USING (post_id)";
        deal_post = function(post_res, tag_res) {
          if (res.error) {
            query = "SELECT\n  post.*, COUNT(comment_id) AS comments,\n  -1 AS votes\nFROM post\nLEFT JOIN comment USING (post_id)\nGROUP BY post_id\nORDER BY date_published DESC\nLIMIT " + ((this.page - 1) * limit) + ", " + (limit + 1);
            return this.cmd("dbQuery", [query], function(res) {
              return parse_res(res, tag_res);
            });
          } else {
            return parse_res(res, tag_res);
          }
        };
        return _this.cmd("dbQuery", [tag_query], function(tag_res) {
          if (tag_res.error) {
            return deal_post(res, []);
          } else {
            return deal_post(res, tag_res);
          }
        });
      };
    })(this));*/
  };
