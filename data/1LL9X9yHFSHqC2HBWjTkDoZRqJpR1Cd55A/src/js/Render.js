(function() {
  var Render,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Render = (function(_super) {
    __extends(Render, _super);

    function Render() {
        this.render_always   = [];
        this.render_once     = [];
    }

    Render.prototype.addAlways = function(cb) {
        this.render_always.push(cb);
    };
      
    Render.prototype.addOnce = function(cb) {
        this.render_once.push(cb);
    };
      
    Render.prototype.start = function() {
        var _this = this;
        
        //render always
        $.each(this.render_always, function( index, value ) {
            if( typeof value == 'function' ) value();
        });
        
        //render once
        $.each(this.render_once, function( index, value ) {
            if( typeof value == 'function' ) value();
        });
        this.render_once = [];
    };
      
    Render.prototype.compile = function(target, context, src) {
        if(!context) context = {};
        if(!src) src = "tmpl-" + target;
        
        var theTemplateScript = $("#"+src).html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        var theCompiledHtml = theTemplate(context);
        $('#'+target).html(theCompiledHtml);
    };

    return Render;

  })(Class);

  window.Render = new Render();

}).call(this);