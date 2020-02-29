/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
var app=app||{};app.OZNWorkspace=Backbone.Router.extend({appinst:void 0,routes:{"":"home","posts/:slug":"singlePost","new":"createPost"},initialize:function(t){this.appinst=t.appinst},home:function(){"use strict";this.appinst.site.cmd("route","",this.appinst.showHome)},singlePost:function(t){"use strict";this.appinst.showSinglePost(t)},createPost:function(t){"use strict";this.appinst.showCreatePost()}});