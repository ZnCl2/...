(function() {
  var Menu,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Menu = (function(_super) {
    __extends(Menu, _super);

    function Menu() {
        this.init = __bind(this.init, this);
    }

    Menu.prototype.init = function() {
        this.renderMenu();
    };

    Menu.prototype.renderMenu = function() {
        var _this = this;
        Render.addAlways((function(_this){
            my_site.cmd("dbQuery", ["SELECT * FROM categories"], function (res) {
                _this.compile('navigation', {
                    items: res
                });
            });
        })(Render));
    };
      
    return Menu;

  })(Class);

  window.Menu = new Menu();

  if(typeof window.modules == 'undefined') window.modules = [];
  window.modules.push( window.Menu )

}).call(this);