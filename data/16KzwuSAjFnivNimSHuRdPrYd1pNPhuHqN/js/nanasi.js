// Generated by CoffeeScript 1.10.0
(function() {
  var Nanasi,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Nanasi = (function(superClass) {
    extend(Nanasi, superClass);

    function Nanasi() {
      this.createCert = bind(this.createCert, this);
      this.write = bind(this.write, this);
      this.update_posts = bind(this.update_posts, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return Nanasi.__super__.constructor.apply(this, arguments);
    }

    Nanasi.prototype.init = function() {
      this.last_checked = 0;
      this.site_info = null;
      return this.nanasi = bitcoin.ECPair.fromWIF("L21fbJbceebx6B3bwMK2U46W1Un7peLqBtPjfyARZpxsME9rxWFz");
    };

    Nanasi.prototype.onOpenWebsocket = function(e) {
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          _this.site_info = site_info;
          if (_this.site_info.cert_user_id) {
            document.getElementById("id_show").textContent = _this.site_info.cert_user_id;
            return document.getElementById("submit_button").textContent = "Post";
          }
        };
      })(this));
      return this.update_posts();
    };

    Nanasi.prototype.update_posts = function() {
      return this.cmd("dbQuery", ["select\n    hash,\n    name,\n    time,\n    body,\n    keyvalue.value as cert_user_id\nfrom post\nleft join json as data on (data.json_id = post.json_id)\nleft join json as content on (content.directory = data.directory AND content.file_name = 'content.json')\nleft join keyvalue on (keyvalue.json_id = content.json_id AND keyvalue.key = 'cert_user_id')\nwhere time > " + this.last_checked + " order by time asc"], (function(_this) {
        return function(res) {
          var body, hash, i, len, post, posts, r;
          if (res.error) {
            _this.cmd("wrapperNotification", ["error", "Failed to query:" + res.error]);
            return;
          }
          _this.last_checked = new Date().getTime();
          posts = document.getElementById("posts");
          for (i = 0, len = res.length; i < len; i++) {
            r = res[i];
            console.log(JSON.stringify(r));
            post = document.getElementById("post_base").cloneNode(true);
            post.id = "";
            hash = post.getElementsByClassName("hash")[0];
            hash.textContent = r.hash.slice(0, 8);
            hash.name = r.hash.slice(0, 8);
            hash.href = "#" + r.hash.slice(0, 8);
            post.getElementsByClassName("name")[0].textContent = r.name;
            post.getElementsByClassName("time")[0].textContent = new Date(r.time).toLocaleString();
            body = post.getElementsByClassName("body")[0];
            body.textContent = r.body;
            body.innerHTML = body.innerHTML.replace(/&gt;&gt;([A-Za-z0-9+\/]{8})/g, "<a href=\"#$1\">$&</a>");
            post.getElementsByClassName("id")[0].textContent = r.cert_user_id;
            if (posts.firstChild) {
              posts.insertBefore(post, posts.firstChild);
            } else {
              posts.appendChild(post);
            }
          }
          return console.log("updated");
        };
      })(this));
    };

    Nanasi.prototype.route = function(cmd, message) {
      var btn;
      if (cmd === "setSiteInfo") {
        this.site_info = message.params;
        btn = document.getElementById("submit_button");
        if (this.site_info.cert_user_id) {
          btn.textContent = "Post";
        } else {
          btn.textContent = "Create account";
        }
        document.getElementById("id_show").textContent = this.site_info.cert_user_id;
        if (this.site_info.event) {
          console.log(this.site_info.event);
          if (this.site_info.event[0] === "file_done" && this.site_info.event[1].match(/.*data\.json$/)) {
            return this.update_posts();
          }
        }
      }
    };

    Nanasi.prototype.write = function() {
      var inner_path, submit_button;
      if (!this.site_info.cert_user_id) {
        this.createCert();
        return;
      }
      submit_button = document.getElementById("submit_button");
      submit_button.disabled = true;
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      return this.cmd("fileGet", {
        inner_path: inner_path,
        required: false
      }, (function(_this) {
        return function(data) {
          var json_raw, k, name, sha;
          if (data) {
            data = JSON.parse(data);
          } else {
            data = {
              post: []
            };
          }
          name = document.getElementById("name_input").value;
          if (name === "") {
            name = "No name";
          }
          k = {
            name: name,
            body: document.getElementById("body_input").value,
            time: new Date().getTime()
          };
          sha = new jsSHA("SHA-256", "TEXT");
          sha.update(JSON.stringify([_this.site_info.auth_address, k.name, k.body, k.time]));
          k.hash = sha.getHash("B64");
          data.post.push(k);
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, null, "\t")));
          return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (res === "ok") {
              return _this.cmd("sitePublish", {
                inner_path: inner_path
              }, function(res) {
                if (res === "ok") {
                  document.getElementById("body_input").value = "";
                  submit_button.disabled = false;
                  return _this.update_posts();
                } else {
                  return _this.cmd("wrapperNotification", ["error", "Failed to post: " + res.error]);
                }
              });
            } else {
              return _this.cmd("wrapperNotification", ["error", "Failed to post: " + res.error]);
            }
          });
        };
      })(this));
    };

    Nanasi.prototype.createCert = function() {
      var cert;
      cert = bitcoin.message.sign(this.nanasi, (this.site_info.auth_address + "#web/") + this.site_info.auth_address.slice(0, 13)).toString("base64");
      return this.cmd("certAdd", ["nanasi", "web", this.site_info.auth_address.slice(0, 13), cert], (function(_this) {
        return function(res) {
          if (res.error && res.error.startsWith("You already")) {
            return _this.cmd("certSelect", [["zeroid.bit", "nanasi"]]);
          } else if (res.error) {
            return _this.cmd("wrapperNotification", ["error", "Failed to create account: " + res.error]);
          } else {
            return _this.cmd("certSelect", [["zeroid.bit", "nanasi"]]);
          }
        };
      })(this));
    };

    Nanasi.prototype.insertHash = function(e) {
      var body;
      body = document.getElementById("body_input");
      body.value = body.value.slice(0, body.selectionStart) + (">>" + e.textContent + "\n") + body.value.slice(body.selectionStart);
      window.scrollTo(0, 0);
      return body.focus();
    };

    return Nanasi;

  })(ZeroFrame);

  window.Page = new Nanasi();

}).call(this);
