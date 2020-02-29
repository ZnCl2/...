/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
var app=app||{};app.PostView=Backbone.View.extend({tagName:"article",model:void 0,initialize:function(){"use strict"},render:function(){"use strict";window.OZN.Application.router.navigate("posts/"+this.model.get("slug"))}});