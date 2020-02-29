/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
var app=app||{};app.PostLoopItemView=Backbone.View.extend({tagName:"div",model:void 0,appinst:void 0,parentEl:void 0,templateSrc:void 0,template:void 0,events:{},initialize:function(t){"use strict";this.appinst=t.appinst,_.bindAll(this,"render","openPostSingleView"),this.parentEl=document.getElementById("post-loop"),this.templateSrc=this.appinst.site.cmd("fileGet","/src/js/App/templates/PostLoopItem.html",this.render)},openPostSingleView:function(t){},render:function(t){this.template=_.template(t),this.el=this.template(this.model.attributes),this.$el=$(this.el),$(this.parentEl).append(this.el)}});