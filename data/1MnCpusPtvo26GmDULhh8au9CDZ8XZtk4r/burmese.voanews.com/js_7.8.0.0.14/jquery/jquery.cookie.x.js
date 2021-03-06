/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(n){typeof define=="function"&&define.amd?define(["jquery"],n):n(jQuery)})(function(n){function u(n){return n}function f(n){return decodeURIComponent(n.replace(r," "))}function i(n){n.indexOf('"')===0&&(n=n.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return t.json?JSON.parse(n):n}catch(i){}}var r=/\+/g,t=n.cookie=function(r,e,o){var l,h,s,y;if(e!==undefined)return o=n.extend({},t.defaults,o),typeof o.expires=="number"&&(l=o.expires,h=o.expires=new Date,h.setDate(h.getDate()+l)),e=t.json?JSON.stringify(e):String(e),document.cookie=[t.raw?r:encodeURIComponent(r),"=",t.raw?e:encodeURIComponent(e),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("");var a=t.raw?u:f,v=document.cookie.split("; "),c=r?undefined:{};for(s=0,y=v.length;s<y;s++){var p=v[s].split("="),w=a(p.shift()),b=a(p.join("="));if(r&&r===w){c=i(b);break}r||(c[w]=i(b))}return c};t.defaults={};n.removeCookie=function(t,i){return n.cookie(t)!==undefined?(n.cookie(t,"",n.extend({},i,{expires:-1})),!0):!1}});;