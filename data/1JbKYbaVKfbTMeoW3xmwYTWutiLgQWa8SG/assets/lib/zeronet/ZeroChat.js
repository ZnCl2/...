(function() {
  var ZeroChat,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ZeroChat = (function(_super) {
    __extends(ZeroChat, _super);

    function ZeroChat() {
      return ZeroChat.__super__.constructor.apply(this, arguments);
    }

    ZeroChat.prototype.addLine = function(line) {
      var messages;
      messages = document.getElementById("messages");
      return messages.innerHTML = ("<li>" + line + "</li>") + messages.innerHTML;
    };

    ZeroChat.prototype.loadMessages = function() {
      return this.cmd("dbQuery", ["SELECT * FROM message ORDER BY date_added"], (function(_this) {
        return function(messages) {
          var message, _i, _len, _results;
          document.getElementById("messages").innerHTML = "";
          _results = [];
          for (_i = 0, _len = messages.length; _i < _len; _i++) {
            message = messages[_i];
            _results.push(_this.addLine(message.body));
          }
          return _results;
        };
      })(this));
    };

    ZeroChat.prototype.route = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        if (message.params.cert_user_id) {
          document.getElementById("select_user").innerHTML = message.params.cert_user_id;
        } else {
          document.getElementById("select_user").innerHTML = "Select user";
        }
        return this.site_info = message.params;
      }
    };

    return ZeroChat;

  })(ZeroFrame);

  window.Page = new ZeroChat();

}).call(this);
