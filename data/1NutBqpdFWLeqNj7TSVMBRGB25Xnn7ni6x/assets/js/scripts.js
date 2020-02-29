/**
 * ojraskatzeronet v0.1.0
 * @author Otto J. Rask
 */
function OZNSite(){this.initialize=function(){"use strict";return this.log("Initializing site."),"undefined"==typeof _?void this.die("Missing components."):"undefined"==typeof Backbone?void this.die("Missing components"):(this.validateStyles(),void this.startApplication())},this.startApplication=function(){"use strict";window.OZN.Application=new app.Application},this.validateStyles=function(){"use strict"},this.die=function(i){"use strict";document.querySelector("#main").innerHTML="<p>"+i+"</p>"}}window.OZN={},OZNSite.prototype=new ZeroFrame,OZNSite.prototype.init=function(){this.initialize()},document.addEventListener("DOMContentLoaded",function(){window.OZN.Site=new OZNSite});