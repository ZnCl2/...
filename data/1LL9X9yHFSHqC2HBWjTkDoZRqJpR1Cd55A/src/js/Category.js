(function() {
  var Category,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Category = (function(_super) {
    __extends(Category, _super);

    function Category() {
        this.init = __bind(this.init, this);
    }

    Category.prototype.init = function() {
        this.addRoute();
        this.registerHelperCategorySelect();    
    };
      
    Category.prototype.addRoute = function() {
        var _this = this;
        my_site.routes.push({
            regex: /category=([0-9]{1,3})/,
            cb: function(match){
                _this.showAction( parseInt(match[1]) );
            }
        });
    };
      
    Category.prototype.registerHelperCategorySelect = function() {
        my_site.cmd("dbQuery", ["SELECT * FROM categories"], function (res) {
            Handlebars.registerHelper('category-select', function() {
                var subTemplate = Handlebars.compile($("#tmpl-category-select").html());

                return new Handlebars.SafeString(subTemplate({
                    items: res
                }));
            });
        });
    };
      
    Category.prototype.showAction = function(category_id) {
        var _this = this;
        Render.addOnce((function(_this){
            my_site.cmd("dbQuery", ["SELECT * FROM products WHERE category = " + parseInt(category_id) + ""], function (res) {
                _this.compile('content', {
                    items: res
                }, 'tmpl-category');
            });
        })(Render));
        Render.start();

        return true;
    };
      
    return Category;

  })(Class);

  window.Category = new Category();
  if(typeof window.modules == 'undefined') window.modules = [];
  window.modules.push( window.Category )

}).call(this);