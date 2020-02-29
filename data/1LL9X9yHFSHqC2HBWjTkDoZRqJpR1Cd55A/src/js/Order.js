(function() {
  var Order,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

    Order = (function(_super) {
        __extends(Product, _super);

        function Order() {
        }

        Order.prototype.init = function() {
            this.addRoute();
        };

        Order.prototype.addRoute = function() {
            var _this = this;

            //My Orders View
            my_site.routes.push({
                regex: /my-orders/,
                cb: function(match){
                    _this.showMyOrders();
                }
            });
            
            //Order View
            my_site.routes.push({
                regex: /order=([0-9]{0,4})/,
                cb: function(match){
                    _this.showOrder(match[1]);
                }
            });
        };

        Order.prototype.showMyOrders = function() {
            var _this = this;
            Render.addOnce((function(_this){
                //my_site.cmd("dbQuery", ["SELECT * FROM products WHERE vendor = '" + my_site.site_info.auth_address + "'"], function (res) {
                    _this.compile('content', {
                        items: {}
                    }, 'tmpl-my-orders');
                //});
            })(Render));
            Render.start();

            return true;
        };

        Order.prototype.showOrder = function(oder_id) {
            var _this = this;
            Render.addOnce((function(_this){
                //my_site.cmd("dbQuery", ["SELECT * FROM products WHERE vendor = '" + my_site.site_info.auth_address + "'"], function (res) {
                    _this.compile('content', {
                        items: {}
                    }, 'tmpl-order');
                //});
            })(Render));
            Render.start();

            return true;
        };
        
        return Order;
    })(Class);
    
    window.Order = new Order();
    if(typeof window.modules == 'undefined') window.modules = [];
    window.modules.push( window.Order )
}).call(this);