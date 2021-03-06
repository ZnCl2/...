// Generated by CoffeeScript 1.11.1
(function() {
  var ZeroChat,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroChat = (function(superClass) {
    extend(ZeroChat, superClass);

    function ZeroChat() {
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return ZeroChat.__super__.constructor.apply(this, arguments);
    }

    ZeroChat.prototype.init = function() {
      return this.addLine("inited!");
    };

    ZeroChat.prototype.addLine = function(line) {
      var messages;
      messages = document.getElementById("messages");
      return messages.innerHTML = ("<li>" + line + "</li>") + messages.innerHTML;
    };

    ZeroChat.prototype.onOpenWebsocket = function(e) {
      this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {
          return _this.addLine("serverInfo response: <pre>" + JSON.stringify(server_info, null, 2) + "</pre>");
        };
      })(this));
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          return _this.addLine("siteInfo response: <pre>" + JSON.stringify(site_info, null, 2) + "</pre>");
        };
      })(this));
    };

    return ZeroChat;

  })(ZeroFrame);

  window.Page = new ZeroChat();

}).call(this);
