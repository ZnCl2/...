(function() {
  var MySite,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  MySite = (function(_super) {
    __extends(MySite, _super);

    function MySite() {
        var _this = this;

        this.site_info = null;
        this.server_info = null;

        this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
        this.route = __bind(this.route, this);
        this.routes = [];
        //this.onMessage = __bind(this.onMessage, this);        
        
        return MySite.__super__.constructor.apply(this, arguments);
    }

    MySite.prototype.renderMenu = function() {
        this.cmd("dbQuery", ["SELECT * FROM categories"], function (res) {
            var theTemplateScript = $("#base-nav").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            var theCompiledHtml = theTemplate({
                items: res
            });
            $('#tmpl-nav').html(theCompiledHtml);
        })
        return true;
    };
      
    MySite.prototype.setSiteinfo = function(site_info) {
        this.site_info = site_info;
        this.log('setSiteinfo', site_info);
        this.routeUrl(window.location.search.substring(1));
        Render.start();
        return true;
    };
      
    MySite.prototype.routeUrl = function(url) {
        var match;
        
        var test = [ /category=([0-9]){1,3}/, /my-products/ ];
        var route_found = false;
        $.each(this.routes, function( index, value ) {
            if( match = url.match(value.regex) ){
                value.cb(match);
                route_found = true;
                return false;
            }
        });
        
        if( !route_found ){
            //Open Homepage; replace with 404
            var _this = this;
            Render.addOnce((function(_this){
                _this.compile('content', {}, 'tmpl-homepage');
            })(Render));
        }
    };
      
    MySite.prototype.init = function() {                
        return this;
    };
      
    MySite.prototype.loadModules = function() {        
        $.each(window.modules, function( index, value ) {
            value.init.call(this);
        });
        
        return this;
    };
      
    //on page open
    MySite.prototype.onOpenWebsocket = function(e) {
        this.loadModules();
        
        this.cmd("serverInfo", {}, (function(_this) {
            return function(serverInfo) {
                _this.server_info = serverInfo;
                return _this.log("mysite serverInfo response", serverInfo);
            };
        })(this));
        
        return this.cmd("siteInfo", {}, (function(_this) {
            return function(siteInfo) {
                return _this.setSiteinfo(siteInfo);
            };
        })(this));
    };
      
    //after opened
    MySite.prototype.route = function(cmd, message) {
        if (cmd === "setSiteInfo") {
            return this.setSiteinfo(message.params);
        } else {
            return this.log("Unknown command", message);
        }
    };

    return MySite;

  })(ZeroFrame);

  window.my_site = new MySite();
    
}).call(this);