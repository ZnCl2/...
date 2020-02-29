(function() {
  var User,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  User = (function(_super) {
    __extends(User, _super);

    function User() {
      this.data;
      this.certselectButtons();
    }

    User.prototype.certselectButtons = function() {
        return $(".certselect").on("click", (function(_this) {
            return function() {
                if (my_site.server_info.rev < 160) {
                    my_site.cmd("wrapperNotification", ["error", "Comments requires at least ZeroNet 0.3.0 Please upgade!"]);
                } else {
                    my_site.cmd("certSelect", [["zeroid.bit"]]);
                }
                return false;
            };
        })(this));
    };

    User.prototype.getData = function(cb) {
        if( User.data ) return cb(User.data);
        
        var inner_path;
        inner_path = "data/users/" + my_site.site_info.auth_address + "/data.json";
        return my_site.cmd("fileGet", {
            "inner_path": inner_path,
            "required": false
        }, (function(_this) {
            return function(data) {
                if (data) {
                    data = JSON.parse(data);
                } else {
                    data = {
                        "message": [],
                        "products": [],
                        "next_product_id": 1
                    };
                }
                //proof
                if( typeof data.message == 'undefined' ) data.message = [];
                if( typeof data.products == 'undefined' ) data.products = [];
                if( typeof data.next_product_id == 'undefined' ) data.next_product_id = 1;
                
                User.data = data;
                return cb(data);
            };
        })(this));
    };

    User.prototype.publishData = function(data, cb) {
        var inner_path;
        if (!my_site.site_info.cert_user_id) {
            this.cmd("wrapperNotification", ["info", "Please, select your account."]);
            return false;
        }
        inner_path = "data/users/" + my_site.site_info.auth_address + "/data.json";
        json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
        return my_site.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (cb) {
                return cb(res);
            }
            if (res === "ok") {
                return my_site.cmd("sitePublish", {
                    "inner_path": inner_path
                }, function(res) {
                    //done!!
                    return true;
                });
            } else {
                my_site.cmd("wrapperNotification", ["error", "File write error: " + res]);
                return true;
            }
        });
    };

    return User;

  })(Class);

  window.User = new User();

}).call(this);