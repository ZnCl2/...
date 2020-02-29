/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
var app=app||{};app.PostLoopView=Backbone.View.extend({el:void 0,appinst:void 0,initialize:function(i){"use strict";this.appinst=i.appinst,_.bindAll(this,"render"),this.render()},render:function(i){"use strict";this.el=document.createElement("div"),this.el.id="post-loop",this.$el=$(this.el),$("#main").append(this.el),this.appinst.trigger("loop_container_ready")}});