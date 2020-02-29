/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
var app=app||{};app.SinglePostView=Backbone.View.extend({model:void 0,appinst:void 0,parentEl:void 0,templateSrc:void 0,template:void 0,initialize:function(t){"use strict";this.appinst=t.appinst,this.model=t.model,_.bindAll(this,"render"),this.parentEl=document.getElementById("main"),this.templateSrc=this.appinst.site.cmd("fileGet","/src/js/App/templates/SinglePost.html",this.render)},render:function(t){this.template=_.template(t),this.el=this.template(this.model.attributes),this.$el=$(this.el),$(this.parentEl).append(this.el)}});