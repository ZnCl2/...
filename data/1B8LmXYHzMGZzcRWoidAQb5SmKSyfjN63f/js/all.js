

/* ---- data/1B8LmXYHzMGZzcRWoidAQb5SmKSyfjN63f/js/lib/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.route = bind(this.route, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      return this.cmd("innerReady");
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.route(cmd, message);
      }
    };

    ZeroFrame.prototype.route = function(cmd, message) {
      return this.log("Unknown command", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[ZeroFrame]"].concat(slice.call(args)));
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })();

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- data/1B8LmXYHzMGZzcRWoidAQb5SmKSyfjN63f/js/lib/vue.min.js ---- */


/*!
 * Vue.js v1.0.16
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Vue=e()}(this,function(){"use strict";function t(e,n,r){if(i(e,n))return void(e[n]=r);if(e._isVue)return void t(e._data,n,r);var s=e.__ob__;if(!s)return void(e[n]=r);if(s.convert(n,r),s.dep.notify(),s.vms)for(var o=s.vms.length;o--;){var a=s.vms[o];a._proxy(n),a._digest()}return r}function e(t,e){if(i(t,e)){delete t[e];var n=t.__ob__;if(n&&(n.dep.notify(),n.vms))for(var r=n.vms.length;r--;){var s=n.vms[r];s._unproxy(e),s._digest()}}}function i(t,e){return mi.call(t,e)}function n(t){return gi.test(t)}function r(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function s(t){return null==t?"":t.toString()}function o(t){if("string"!=typeof t)return t;var e=Number(t);return isNaN(e)?t:e}function a(t){return"true"===t?!0:"false"===t?!1:t}function h(t){var e=t.charCodeAt(0),i=t.charCodeAt(t.length-1);return e!==i||34!==e&&39!==e?t:t.slice(1,-1)}function l(t){return t.replace(_i,c)}function c(t,e){return e?e.toUpperCase():""}function u(t){return t.replace(yi,"$1-$2").toLowerCase()}function f(t){return t.replace(bi,c)}function p(t,e){return function(i){var n=arguments.length;return n?n>1?t.apply(e,arguments):t.call(e,i):t.call(e)}}function d(t,e){e=e||0;for(var i=t.length-e,n=new Array(i);i--;)n[i]=t[i+e];return n}function v(t,e){for(var i=Object.keys(e),n=i.length;n--;)t[i[n]]=e[i[n]];return t}function m(t){return null!==t&&"object"==typeof t}function g(t){return Ci.call(t)===wi}function _(t,e,i,n){Object.defineProperty(t,e,{value:i,enumerable:!!n,writable:!0,configurable:!0})}function y(t,e){var i,n,r,s,o,a=function h(){var a=Date.now()-s;e>a&&a>=0?i=setTimeout(h,e-a):(i=null,o=t.apply(r,n),i||(r=n=null))};return function(){return r=this,n=arguments,s=Date.now(),i||(i=setTimeout(a,e)),o}}function b(t,e){for(var i=t.length;i--;)if(t[i]===e)return i;return-1}function C(t){var e=function i(){return i.cancelled?void 0:t.apply(this,arguments)};return e.cancel=function(){e.cancelled=!0},e}function w(t,e){return t==e||(m(t)&&m(e)?JSON.stringify(t)===JSON.stringify(e):!1)}function $(t){this.size=0,this.limit=t,this.head=this.tail=void 0,this._keymap=Object.create(null)}function k(){var t,e=Hi.slice(zi,Mi).trim();if(e){t={};var i=e.match(Ki);t.name=i[0],i.length>1&&(t.args=i.slice(1).map(x))}t&&(Li.filters=Li.filters||[]).push(t),zi=Mi+1}function x(t){if(Zi.test(t))return{value:o(t),dynamic:!1};var e=h(t),i=e===t;return{value:i?t:e,dynamic:i}}function A(t){var e=Gi.get(t);if(e)return e;for(Hi=t,Ii=Ui=!1,qi=Ji=Qi=0,zi=0,Li={},Mi=0,Wi=Hi.length;Wi>Mi;Mi++)if(Bi=Vi,Vi=Hi.charCodeAt(Mi),Ii)39===Vi&&92!==Bi&&(Ii=!Ii);else if(Ui)34===Vi&&92!==Bi&&(Ui=!Ui);else if(124===Vi&&124!==Hi.charCodeAt(Mi+1)&&124!==Hi.charCodeAt(Mi-1))null==Li.expression?(zi=Mi+1,Li.expression=Hi.slice(0,Mi).trim()):k();else switch(Vi){case 34:Ui=!0;break;case 39:Ii=!0;break;case 40:Qi++;break;case 41:Qi--;break;case 91:Ji++;break;case 93:Ji--;break;case 123:qi++;break;case 125:qi--}return null==Li.expression?Li.expression=Hi.slice(0,Mi).trim():0!==zi&&k(),Gi.put(t,Li),Li}function O(t){return t.replace(Yi,"\\$&")}function N(){var t=O(hn.delimiters[0]),e=O(hn.delimiters[1]),i=O(hn.unsafeDelimiters[0]),n=O(hn.unsafeDelimiters[1]);en=new RegExp(i+"(.+?)"+n+"|"+t+"(.+?)"+e,"g"),nn=new RegExp("^"+i+".*"+n+"$"),tn=new $(1e3)}function T(t){tn||N();var e=tn.get(t);if(e)return e;if(t=t.replace(/\n/g,""),!en.test(t))return null;for(var i,n,r,s,o,a,h=[],l=en.lastIndex=0;i=en.exec(t);)n=i.index,n>l&&h.push({value:t.slice(l,n)}),r=nn.test(i[0]),s=r?i[1]:i[2],o=s.charCodeAt(0),a=42===o,s=a?s.slice(1):s,h.push({tag:!0,value:s.trim(),html:r,oneTime:a}),l=n+i[0].length;return l<t.length&&h.push({value:t.slice(l)}),tn.put(t,h),h}function j(t,e){return t.length>1?t.map(function(t){return E(t,e)}).join("+"):E(t[0],e,!0)}function E(t,e,i){return t.tag?t.oneTime&&e?'"'+e.$eval(t.value)+'"':F(t.value,i):'"'+t.value+'"'}function F(t,e){if(rn.test(t)){var i=A(t);return i.filters?"this._applyFilters("+i.expression+",null,"+JSON.stringify(i.filters)+",false)":"("+t+")"}return e?t:"("+t+")"}function S(t,e,i,n){R(t,1,function(){e.appendChild(t)},i,n)}function P(t,e,i,n){R(t,1,function(){W(t,e)},i,n)}function D(t,e,i){R(t,-1,function(){I(t)},e,i)}function R(t,e,i,n,r){var s=t.__v_trans;if(!s||!s.hooks&&!ji||!n._isCompiled||n.$parent&&!n.$parent._isCompiled)return i(),void(r&&r());var o=e>0?"enter":"leave";s[o](i,r)}function H(t){if("string"==typeof t){t=document.querySelector(t)}return t}function L(t){var e=document.documentElement,i=t&&t.parentNode;return e===t||e===i||!(!i||1!==i.nodeType||!e.contains(i))}function V(t,e){var i=t.getAttribute(e);return null!==i&&t.removeAttribute(e),i}function B(t,e){var i=V(t,":"+e);return null===i&&(i=V(t,"v-bind:"+e)),i}function M(t,e){return t.hasAttribute(e)||t.hasAttribute(":"+e)||t.hasAttribute("v-bind:"+e)}function W(t,e){e.parentNode.insertBefore(t,e)}function z(t,e){e.nextSibling?W(t,e.nextSibling):e.parentNode.appendChild(t)}function I(t){t.parentNode.removeChild(t)}function U(t,e){e.firstChild?W(t,e.firstChild):e.appendChild(t)}function q(t,e){var i=t.parentNode;i&&i.replaceChild(e,t)}function J(t,e,i,n){t.addEventListener(e,i,n)}function Q(t,e,i){t.removeEventListener(e,i)}function G(t,e){!Oi||t instanceof SVGElement?t.setAttribute("class",e):t.className=e}function K(t,e){if(t.classList)t.classList.add(e);else{var i=" "+(t.getAttribute("class")||"")+" ";i.indexOf(" "+e+" ")<0&&G(t,(i+e).trim())}}function Z(t,e){if(t.classList)t.classList.remove(e);else{for(var i=" "+(t.getAttribute("class")||"")+" ",n=" "+e+" ";i.indexOf(n)>=0;)i=i.replace(n," ");G(t,i.trim())}t.className||t.removeAttribute("class")}function X(t,e){var i,n;if(et(t)&&t.content instanceof DocumentFragment&&(t=t.content),t.hasChildNodes())for(Y(t),n=e?document.createDocumentFragment():document.createElement("div");i=t.firstChild;)n.appendChild(i);return n}function Y(t){for(var e;e=t.firstChild,tt(e);)t.removeChild(e);for(;e=t.lastChild,tt(e);)t.removeChild(e)}function tt(t){return t&&(3===t.nodeType&&!t.data.trim()||8===t.nodeType)}function et(t){return t.tagName&&"template"===t.tagName.toLowerCase()}function it(t,e){var i=hn.debug?document.createComment(t):document.createTextNode(e?" ":"");return i.__vue_anchor=!0,i}function nt(t){if(t.hasAttributes())for(var e=t.attributes,i=0,n=e.length;n>i;i++){var r=e[i].name;if(cn.test(r))return l(r.replace(cn,""))}}function rt(t,e,i){for(var n;t!==e;)n=t.nextSibling,i(t),t=n;i(e)}function st(t,e,i,n,r){function s(){if(a++,o&&a>=h.length){for(var t=0;t<h.length;t++)n.appendChild(h[t]);r&&r()}}var o=!1,a=0,h=[];rt(t,e,function(t){t===e&&(o=!0),h.push(t),D(t,i,s)})}function ot(t,e){var i=t.tagName.toLowerCase(),n=t.hasAttributes();if(un.test(i)||fn.test(i)){if(n)return at(t)}else{if(gt(e,"components",i))return{id:i};var r=n&&at(t);if(r)return r}}function at(t){var e=V(t,"is");return null!=e?{id:e}:(e=B(t,"is"),null!=e?{id:e,dynamic:!0}:void 0)}function ht(t,e,i){var n=e.path;i=ct(e,i),t[n]=t._data[n]=lt(e,i)?i:void 0}function lt(t,e){if(null===t.raw&&!t.required)return!0;var i,n=t.options,r=n.type,s=!0;if(r&&(r===String?(i="string",s=typeof e===i):r===Number?(i="number",s="number"==typeof e):r===Boolean?(i="boolean",s="boolean"==typeof e):r===Function?(i="function",s="function"==typeof e):r===Object?(i="object",s=g(e)):r===Array?(i="array",s=$i(e)):s=e instanceof r),!s)return!1;var o=n.validator;return o&&!o.call(null,e)?!1:!0}function ct(t,e){var i=t.options.coerce;return i?i(e):e}function ut(e,n){var r,s,o;for(r in n)s=e[r],o=n[r],i(e,r)?m(s)&&m(o)&&ut(s,o):t(e,r,o);return e}function ft(t,e){var i=Object.create(t);return e?v(i,vt(e)):i}function pt(t){if(t.components)for(var e,i=t.components=vt(t.components),n=Object.keys(i),r=0,s=n.length;s>r;r++){var o=n[r];un.test(o)||fn.test(o)||(e=i[o],g(e)&&(i[o]=ci.extend(e)))}}function dt(t){var e,i,n=t.props;if($i(n))for(t.props={},e=n.length;e--;)i=n[e],"string"==typeof i?t.props[i]=null:i.name&&(t.props[i.name]=i);else if(g(n)){var r=Object.keys(n);for(e=r.length;e--;)i=n[r[e]],"function"==typeof i&&(n[r[e]]={type:i})}}function vt(t){if($i(t)){for(var e,i={},n=t.length;n--;){e=t[n];var r="function"==typeof e?e.options&&e.options.name||e.id:e.name||e.id;r&&(i[r]=e)}return i}return t}function mt(t,e,n){function r(i){var r=pn[i]||dn;o[i]=r(t[i],e[i],n,i)}pt(e),dt(e);var s,o={};if(e.mixins)for(var a=0,h=e.mixins.length;h>a;a++)t=mt(t,e.mixins[a],n);for(s in t)r(s);for(s in e)i(t,s)||r(s);return o}function gt(t,e,i){if("string"==typeof i){var n,r=t[e];return r[i]||r[n=l(i)]||r[n.charAt(0).toUpperCase()+n.slice(1)]}}function _t(t,e,i){}function yt(){this.id=gn++,this.subs=[]}function bt(t){if(this.value=t,this.dep=new yt,_(t,"__ob__",this),$i(t)){var e=ki?Ct:wt;e(t,mn,_n),this.observeArray(t)}else this.walk(t)}function Ct(t,e){t.__proto__=e}function wt(t,e,i){for(var n=0,r=i.length;r>n;n++){var s=i[n];_(t,s,e[s])}}function $t(t,e){if(t&&"object"==typeof t){var n;return i(t,"__ob__")&&t.__ob__ instanceof bt?n=t.__ob__:($i(t)||g(t))&&Object.isExtensible(t)&&!t._isVue&&(n=new bt(t)),n&&e&&n.addVm(e),n}}function kt(t,e,i){var n,r,s=new yt;if(hn.convertAllProperties){var o=Object.getOwnPropertyDescriptor(t,e);if(o&&o.configurable===!1)return;n=o&&o.get,r=o&&o.set}var a=$t(i);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=n?n.call(t):i;if(yt.target&&(s.depend(),a&&a.dep.depend(),$i(e)))for(var r,o=0,h=e.length;h>o;o++)r=e[o],r&&r.__ob__&&r.__ob__.dep.depend();return e},set:function(e){var o=n?n.call(t):i;e!==o&&(r?r.call(t,e):i=e,a=$t(e),s.notify())}})}function xt(t){t.prototype._init=function(t){t=t||{},this.$el=null,this.$parent=t.parent,this.$root=this.$parent?this.$parent.$root:this,this.$children=[],this.$refs={},this.$els={},this._watchers=[],this._directives=[],this._uid=bn++,this._isVue=!0,this._events={},this._eventsCount={},this._isFragment=!1,this._fragment=this._fragmentStart=this._fragmentEnd=null,this._isCompiled=this._isDestroyed=this._isReady=this._isAttached=this._isBeingDestroyed=this._vForRemoving=!1,this._unlinkFn=null,this._context=t._context||this.$parent,this._scope=t._scope,this._frag=t._frag,this._frag&&this._frag.children.push(this),this.$parent&&this.$parent.$children.push(this),t=this.$options=mt(this.constructor.options,t,this),this._updateRef(),this._data={},this._callHook("init"),this._initState(),this._initEvents(),this._callHook("created"),t.el&&this.$mount(t.el)}}function At(t){if(void 0===t)return"eof";var e=t.charCodeAt(0);switch(e){case 91:case 93:case 46:case 34:case 39:case 48:return t;case 95:case 36:return"ident";case 32:case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return e>=97&&122>=e||e>=65&&90>=e?"ident":e>=49&&57>=e?"number":"else"}function Ot(t){var e=t.trim();return"0"===t.charAt(0)&&isNaN(t)?!1:n(e)?h(e):"*"+e}function Nt(t){function e(){var e=t[c+1];return u===En&&"'"===e||u===Fn&&'"'===e?(c++,n="\\"+e,p[wn](),!0):void 0}var i,n,r,s,o,a,h,l=[],c=-1,u=An,f=0,p=[];for(p[$n]=function(){void 0!==r&&(l.push(r),r=void 0)},p[wn]=function(){void 0===r?r=n:r+=n},p[kn]=function(){p[wn](),f++},p[xn]=function(){if(f>0)f--,u=jn,p[wn]();else{if(f=0,r=Ot(r),r===!1)return!1;p[$n]()}};null!=u;)if(c++,i=t[c],"\\"!==i||!e()){if(s=At(i),h=Dn[u],o=h[s]||h["else"]||Pn,o===Pn)return;if(u=o[0],a=p[o[1]],a&&(n=o[2],n=void 0===n?i:n,a()===!1))return;if(u===Sn)return l.raw=t,l}}function Tt(t){var e=Cn.get(t);return e||(e=Nt(t),e&&Cn.put(t,e)),e}function jt(t,e){return Lt(e).get(t)}function Et(e,i,n){var r=e;if("string"==typeof i&&(i=Nt(i)),!i||!m(e))return!1;for(var s,o,a=0,h=i.length;h>a;a++)s=e,o=i[a],"*"===o.charAt(0)&&(o=Lt(o.slice(1)).get.call(r,r)),h-1>a?(e=e[o],m(e)||(e={},t(s,o,e))):$i(e)?e.$set(o,n):o in e?e[o]=n:t(e,o,n);return!0}function Ft(t,e){var i=Gn.length;return Gn[i]=e?t.replace(zn,"\\n"):t,'"'+i+'"'}function St(t){var e=t.charAt(0),i=t.slice(1);return Vn.test(i)?t:(i=i.indexOf('"')>-1?i.replace(Un,Pt):i,e+"scope."+i)}function Pt(t,e){return Gn[e]}function Dt(t){Mn.test(t),Gn.length=0;var e=t.replace(In,Ft).replace(Wn,"");return e=(" "+e).replace(Jn,St).replace(Un,Pt),Rt(e)}function Rt(t){try{return new Function("scope","return "+t+";")}catch(e){}}function Ht(t){var e=Tt(t);return e?function(t,i){Et(t,e,i)}:void 0}function Lt(t,e){t=t.trim();var i=Hn.get(t);if(i)return e&&!i.set&&(i.set=Ht(i.exp)),i;var n={exp:t};return n.get=Vt(t)&&t.indexOf("[")<0?Rt("scope."+t):Dt(t),e&&(n.set=Ht(t)),Hn.put(t,n),n}function Vt(t){return qn.test(t)&&!Qn.test(t)&&"Math."!==t.slice(0,5)}function Bt(){Zn=[],Xn=[],Yn={},tr={},er=ir=!1}function Mt(){Wt(Zn),ir=!0,Wt(Xn),Ai&&Ai.emit("flush"),Bt()}function Wt(t){for(var e=0;e<t.length;e++){var i=t[e],n=i.id;Yn[n]=null,i.run()}}function zt(t){var e=t.id;if(null==Yn[e]){if(ir&&!t.user)return void t.run();var i=t.user?Xn:Zn;Yn[e]=i.length,i.push(t),er||(er=!0,Di(Mt))}}function It(t,e,i,n){n&&v(this,n);var r="function"==typeof e;if(this.vm=t,t._watchers.push(this),this.expression=r?e.toString():e,this.cb=i,this.id=++nr,this.active=!0,this.dirty=this.lazy,this.deps=Object.create(null),this.newDeps=null,this.prevError=null,r)this.getter=e,this.setter=void 0;else{var s=Lt(e,this.twoWay);this.getter=s.get,this.setter=s.set}this.value=this.lazy?void 0:this.get(),this.queued=this.shallow=!1}function Ut(t){var e,i;if($i(t))for(e=t.length;e--;)Ut(t[e]);else if(m(t))for(i=Object.keys(t),e=i.length;e--;)Ut(t[i[e]])}function qt(t){if(br[t])return br[t];var e=Jt(t);return br[t]=br[e]=e,e}function Jt(t){t=u(t);var e=l(t),i=e.charAt(0).toUpperCase()+e.slice(1);Cr||(Cr=document.createElement("div"));for(var n,r=gr.length;r--;)if(n=_r[r]+i,n in Cr.style)return gr[r]+t;return e in Cr.style?t:void 0}function Qt(t,e){var i=e.map(function(t){var e=t.charCodeAt(0);return e>47&&58>e?parseInt(t,10):1===t.length&&(e=t.toUpperCase().charCodeAt(0),e>64&&91>e)?e:Tr[t]});return i=[].concat.apply([],i),function(e){return i.indexOf(e.keyCode)>-1?t.call(this,e):void 0}}function Gt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function Kt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Zt(t){return function(e){return e.target===e.currentTarget?t.call(this,e):void 0}}function Xt(t,e,i){for(var n,r,s,o=e?[]:null,a=0,h=t.options.length;h>a;a++)if(n=t.options[a],s=i?n.hasAttribute("selected"):n.selected){if(r=n.hasOwnProperty("_value")?n._value:n.value,!e)return r;o.push(r)}return o}function Yt(t,e){for(var i=t.length;i--;)if(w(t[i],e))return i;return-1}function te(t){return et(t)&&t.content instanceof DocumentFragment}function ee(t,e){var i=e?t:t.trim(),n=Lr.get(i);if(n)return n;var r=document.createDocumentFragment(),s=t.match(Mr),o=Wr.test(t);if(s||o){var a=s&&s[1],h=Br[a]||Br.efault,l=h[0],c=h[1],u=h[2],f=document.createElement("div");for(f.innerHTML=c+t+u;l--;)f=f.lastChild;for(var p;p=f.firstChild;)r.appendChild(p)}else r.appendChild(document.createTextNode(t));return e||Y(r),Lr.put(i,r),r}function ie(t){if(te(t))return Y(t.content),t.content;if("SCRIPT"===t.tagName)return ee(t.textContent);for(var e,i=ne(t),n=document.createDocumentFragment();e=i.firstChild;)n.appendChild(e);return Y(n),n}function ne(t){if(!t.querySelectorAll)return t.cloneNode();var e,i,n,r=t.cloneNode(!0);if(zr){var s=r;if(te(t)&&(t=t.content,s=r.content),i=t.querySelectorAll("template"),i.length)for(n=s.querySelectorAll("template"),e=n.length;e--;)n[e].parentNode.replaceChild(ne(i[e]),n[e])}if(Ir)if("TEXTAREA"===t.tagName)r.value=t.value;else if(i=t.querySelectorAll("textarea"),i.length)for(n=r.querySelectorAll("textarea"),e=n.length;e--;)n[e].value=i[e].value;return r}function re(t,e,i){var n,r;return t instanceof DocumentFragment?(Y(t),e?ne(t):t):("string"==typeof t?i||"#"!==t.charAt(0)?r=ee(t,i):(r=Vr.get(t),r||(n=document.getElementById(t.slice(1)),n&&(r=ie(n),Vr.put(t,r)))):t.nodeType&&(r=ie(t)),r&&e?ne(r):r)}function se(t,e,i,n,r,s){this.children=[],this.childFrags=[],this.vm=e,this.scope=r,this.inserted=!1,this.parentFrag=s,s&&s.childFrags.push(this),this.unlink=t(e,i,n,r,this);var o=this.single=1===i.childNodes.length&&!i.childNodes[0].__vue_anchor;o?(this.node=i.childNodes[0],this.before=oe,this.remove=ae):(this.node=it("fragment-start"),this.end=it("fragment-end"),this.frag=i,U(this.node,i),i.appendChild(this.end),this.before=he,this.remove=le),this.node.__vfrag__=this}function oe(t,e){this.inserted=!0;var i=e!==!1?P:W;i(this.node,t,this.vm),L(this.node)&&this.callHook(ce)}function ae(){this.inserted=!1;var t=L(this.node),e=this;this.beforeRemove(),D(this.node,this.vm,function(){t&&e.callHook(ue),e.destroy()})}function he(t,e){this.inserted=!0;var i=this.vm,n=e!==!1?P:W;rt(this.node,this.end,function(e){n(e,t,i)}),L(this.node)&&this.callHook(ce)}function le(){this.inserted=!1;var t=this,e=L(this.node);this.beforeRemove(),st(this.node,this.end,this.vm,this.frag,function(){e&&t.callHook(ue),t.destroy()})}function ce(t){t._isAttached||t._callHook("attached")}function ue(t){t._isAttached&&t._callHook("detached")}function fe(t,e){this.vm=t;var i,n="string"==typeof e;n||et(e)?i=re(e,!0):(i=document.createDocumentFragment(),i.appendChild(e)),this.template=i;var r,s=t.constructor.cid;if(s>0){var o=s+(n?e:e.outerHTML);r=qr.get(o),r||(r=xe(i,t.$options,!0),qr.put(o,r))}else r=xe(i,t.$options,!0);this.linker=r}function pe(t,e,i){var n=t.node.previousSibling;if(n){for(t=n.__vfrag__;!(t&&t.forId===i&&t.inserted||n===e);){if(n=n.previousSibling,!n)return;t=n.__vfrag__}return t}}function de(t){var e=t.node;if(t.end)for(;!e.__vue__&&e!==t.end&&e.nextSibling;)e=e.nextSibling;return e.__vue__}function ve(t){for(var e=-1,i=new Array(Math.floor(t));++e<t;)i[e]=e;return i}function me(t){Yr.push(t),ts||(ts=!0,Di(ge))}function ge(){for(var t=document.documentElement.offsetHeight,e=0;e<Yr.length;e++)Yr[e]();return Yr=[],ts=!1,t}function _e(t,e,i,n){this.id=e,this.el=t,this.enterClass=i&&i.enterClass||e+"-enter",this.leaveClass=i&&i.leaveClass||e+"-leave",this.hooks=i,this.vm=n,this.pendingCssEvent=this.pendingCssCb=this.cancel=this.pendingJsCb=this.op=this.cb=null,this.justEntered=!1,this.entered=this.left=!1,this.typeCache={},this.type=i&&i.type;var r=this;["enterNextTick","enterDone","leaveNextTick","leaveDone"].forEach(function(t){r[t]=p(r[t],r)})}function ye(t){return!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function be(t){for(var e={},i=t.trim().split(/\s+/),n=i.length;n--;)e[i[n]]=!0;return e}function Ce(t,e){return $i(t)?t.indexOf(e)>-1:i(t,e)}function we(t,e){for(var i,r,s,o,a,h,c,f=[],p=Object.keys(e),d=p.length;d--;)r=p[d],i=e[r]||ps,a=l(r),ds.test(a)&&(c={name:r,path:a,options:i,mode:fs.ONE_WAY,raw:null},s=u(r),null===(o=B(t,s))&&(null!==(o=B(t,s+".sync"))?c.mode=fs.TWO_WAY:null!==(o=B(t,s+".once"))&&(c.mode=fs.ONE_TIME)),null!==o?(c.raw=o,h=A(o),o=h.expression,c.filters=h.filters,n(o)&&!h.filters?c.optimizedLiteral=!0:c.dynamic=!0,c.parentPath=o):null!==(o=V(t,s))?c.raw=o:i.required,f.push(c));return $e(f)}function $e(t){return function(e,i){e._props={};for(var n,r,s,l,c,u=t.length;u--;)if(n=t[u],c=n.raw,r=n.path,s=n.options,e._props[r]=n,null===c)ht(e,n,ke(e,s));else if(n.dynamic)e._context&&(n.mode===fs.ONE_TIME?(l=(i||e._context).$get(n.parentPath),ht(e,n,l)):e._bindDir({name:"prop",def:hs,prop:n},null,null,i));else if(n.optimizedLiteral){var f=h(c);l=f===c?a(o(c)):f,ht(e,n,l)}else l=s.type===Boolean&&""===c?!0:c,ht(e,n,l)}}function ke(t,e){if(!i(e,"default"))return e.type===Boolean?!1:void 0;var n=e["default"];return m(n),"function"==typeof n&&e.type!==Function?n.call(t):n}function xe(t,e,i){var n=i||!e._asComponent?Fe(t,e):null,r=n&&n.terminal||"SCRIPT"===t.tagName||!t.hasChildNodes()?null:Le(t.childNodes,e);return function(t,e,i,s,o){var a=d(e.childNodes),h=Ae(function(){n&&n(t,e,i,s,o),r&&r(t,a,i,s,o)},t);return Ne(t,h)}}function Ae(t,e){e._directives=[];var i=e._directives.length;t();var n=e._directives.slice(i);n.sort(Oe);for(var r=0,s=n.length;s>r;r++)n[r]._bind();return n}function Oe(t,e){return t=t.descriptor.def.priority||Cs,e=e.descriptor.def.priority||Cs,t>e?-1:t===e?0:1}function Ne(t,e,i,n){function r(r){Te(t,e,r),i&&n&&Te(i,n)}return r.dirs=e,r}function Te(t,e,i){for(var n=e.length;n--;)e[n]._teardown()}function je(t,e,i,n){var r=we(e,i),s=Ae(function(){r(t,n)},t);return Ne(t,s)}function Ee(t,e,i){var n,r,s=e._containerAttrs,o=e._replacerAttrs;return 11!==t.nodeType&&(e._asComponent?(s&&i&&(n=Ue(s,i)),o&&(r=Ue(o,e))):r=Ue(t.attributes,e)),e._containerAttrs=e._replacerAttrs=null,function(t,e,i){var s,o=t._context;o&&n&&(s=Ae(function(){n(o,e,null,i)},o));var a=Ae(function(){r&&r(t,e)},t);return Ne(t,a,o,s)}}function Fe(t,e){var i=t.nodeType;return 1===i&&"SCRIPT"!==t.tagName?Se(t,e):3===i&&t.data.trim()?Pe(t,e):null}function Se(t,e){if("TEXTAREA"===t.tagName){var i=T(t.value);i&&(t.setAttribute(":value",j(i)),t.value="")}var n,r=t.hasAttributes();return r&&(n=We(t,e)),n||(n=Be(t,e)),n||(n=Me(t,e)),!n&&r&&(n=Ue(t.attributes,e)),n}function Pe(t,e){if(t._skip)return De;var i=T(t.wholeText);if(!i)return null;for(var n=t.nextSibling;n&&3===n.nodeType;)n._skip=!0,n=n.nextSibling;for(var r,s,o=document.createDocumentFragment(),a=0,h=i.length;h>a;a++)s=i[a],r=s.tag?Re(s,e):document.createTextNode(s.value),o.appendChild(r);return He(i,o,e)}function De(t,e){I(e)}function Re(t,e){function i(e){if(!t.descriptor){var i=A(t.value);t.descriptor={name:e,def:Xr[e],expression:i.expression,filters:i.filters}}}var n;return t.oneTime?n=document.createTextNode(t.value):t.html?(n=document.createComment("v-html"),i("html")):(n=document.createTextNode(" "),i("text")),n}function He(t,e){return function(i,n,r,s){for(var o,a,h,l=e.cloneNode(!0),c=d(l.childNodes),u=0,f=t.length;f>u;u++)o=t[u],a=o.value,o.tag&&(h=c[u],o.oneTime?(a=(s||i).$eval(a),o.html?q(h,re(a,!0)):h.data=a):i._bindDir(o.descriptor,h,r,s));q(n,l)}}function Le(t,e){for(var i,n,r,s=[],o=0,a=t.length;a>o;o++)r=t[o],i=Fe(r,e),n=i&&i.terminal||"SCRIPT"===r.tagName||!r.hasChildNodes()?null:Le(r.childNodes,e),s.push(i,n);return s.length?Ve(s):null}function Ve(t){return function(e,i,n,r,s){for(var o,a,h,l=0,c=0,u=t.length;u>l;c++){o=i[c],a=t[l++],h=t[l++];var f=d(o.childNodes);a&&a(e,o,n,r,s),h&&h(e,f,n,r,s)}}}function Be(t,e){var i=t.tagName.toLowerCase();if(!un.test(i)){"slot"===i&&M(t,"name")&&(i="_namedSlot");var n=gt(e,"elementDirectives",i);return n?Ie(t,i,"",e,n):void 0}}function Me(t,e){var i=ot(t,e);if(i){var n=nt(t),r={name:"component",ref:n,expression:i.id,def:us.component,modifiers:{literal:!i.dynamic}},s=function(t,e,i,s,o){n&&kt((s||t).$refs,n,null),t._bindDir(r,e,i,s,o)};return s.terminal=!0,s}}function We(t,e){if(null!==V(t,"v-pre"))return ze;if(t.hasAttribute("v-else")){var i=t.previousElementSibling;if(i&&i.hasAttribute("v-if"))return ze}for(var n,r,s=0,o=bs.length;o>s;s++)if(r=bs[s],n=t.getAttribute("v-"+r),null!=n)return Ie(t,r,n,e)}function ze(){}function Ie(t,e,i,n,r){var s=A(i),o={name:e,expression:s.expression,filters:s.filters,raw:i,def:r||Xr[e]};("for"===e||"router-view"===e)&&(o.ref=nt(t));var a=function(t,e,i,n,r){o.ref&&kt((n||t).$refs,o.ref,null),t._bindDir(o,e,i,n,r)};return a.terminal=!0,a}function Ue(t,e){function i(t,e,i){var n=i&&Qe(i),r=!n&&A(s);v.push({name:t,attr:o,raw:a,def:e,arg:l,modifiers:c,expression:r&&r.expression,filters:r&&r.filters,interp:i,hasOneTime:n})}for(var n,r,s,o,a,h,l,c,u,f,p,d=t.length,v=[];d--;)if(n=t[d],r=o=n.name,s=a=n.value,f=T(s),l=null,c=qe(r),r=r.replace(_s,""),f)s=j(f),l=r,i("bind",Xr.bind,f);else if(ys.test(r))c.literal=!vs.test(r),i("transition",us.transition);else if(ms.test(r))l=r.replace(ms,""),i("on",Xr.on);else if(vs.test(r))h=r.replace(vs,""),"style"===h||"class"===h?i(h,us[h]):(l=h,i("bind",Xr.bind));else if(p=r.match(gs)){if(h=p[1],l=p[2],"else"===h)continue;u=gt(e,"directives",h),u&&i(h,u)}return v.length?Je(v):void 0}function qe(t){var e=Object.create(null),i=t.match(_s);if(i)for(var n=i.length;n--;)e[i[n].slice(1)]=!0;return e}function Je(t){return function(e,i,n,r,s){for(var o=t.length;o--;)e._bindDir(t[o],i,n,r,s)}}function Qe(t){for(var e=t.length;e--;)if(t[e].oneTime)return!0}function Ge(t,e){return e&&(e._containerAttrs=Ze(t)),et(t)&&(t=re(t)),e&&(e._asComponent&&!e.template&&(e.template="<slot></slot>"),e.template&&(e._content=X(t),t=Ke(t,e))),t instanceof DocumentFragment&&(U(it("v-start",!0),t),t.appendChild(it("v-end",!0))),t}function Ke(t,e){var i=e.template,n=re(i,!0);if(n){var r=n.firstChild,s=r.tagName&&r.tagName.toLowerCase();return e.replace?(t===document.body,n.childNodes.length>1||1!==r.nodeType||"component"===s||gt(e,"components",s)||M(r,"is")||gt(e,"elementDirectives",s)||r.hasAttribute("v-for")||r.hasAttribute("v-if")?n:(e._replacerAttrs=Ze(r),Xe(t,r),r)):(t.appendChild(n),t)}}function Ze(t){return 1===t.nodeType&&t.hasAttributes()?d(t.attributes):void 0}function Xe(t,e){for(var i,n,r=t.attributes,s=r.length;s--;)i=r[s].name,n=r[s].value,e.hasAttribute(i)||ws.test(i)?"class"!==i||T(n)||n.split(/\s+/).forEach(function(t){K(e,t)}):e.setAttribute(i,n)}function Ye(e){function n(){}function s(t,e){var i=new It(e,t,null,{lazy:!0});return function(){return i.dirty&&i.evaluate(),yt.target&&i.depend(),i.value}}Object.defineProperty(e.prototype,"$data",{get:function(){return this._data},set:function(t){t!==this._data&&this._setData(t)}}),e.prototype._initState=function(){this._initProps(),this._initMeta(),this._initMethods(),this._initData(),this._initComputed()},e.prototype._initProps=function(){var t=this.$options,e=t.el,i=t.props;e=t.el=H(e),this._propsUnlinkFn=e&&1===e.nodeType&&i?je(this,e,i,this._scope):null},e.prototype._initData=function(){var e=this._data,n=this.$options.data,r=n&&n();if(r){this._data=r;for(var s in e)null===this._props[s].raw&&i(r,s)||t(r,s,e[s])}var o,a,h=this._data,l=Object.keys(h);for(o=l.length;o--;)a=l[o],this._proxy(a);$t(h,this)},e.prototype._setData=function(t){t=t||{};var e=this._data;this._data=t;var n,r,s;for(n=Object.keys(e),s=n.length;s--;)r=n[s],r in t||this._unproxy(r);for(n=Object.keys(t),s=n.length;s--;)r=n[s],i(this,r)||this._proxy(r);e.__ob__.removeVm(this),$t(t,this),this._digest()},e.prototype._proxy=function(t){if(!r(t)){var e=this;Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return e._data[t]},set:function(i){e._data[t]=i}})}},e.prototype._unproxy=function(t){r(t)||delete this[t]},e.prototype._digest=function(){for(var t=0,e=this._watchers.length;e>t;t++)this._watchers[t].update(!0)},e.prototype._initComputed=function(){var t=this.$options.computed;if(t)for(var e in t){var i=t[e],r={enumerable:!0,configurable:!0};"function"==typeof i?(r.get=s(i,this),r.set=n):(r.get=i.get?i.cache!==!1?s(i.get,this):p(i.get,this):n,r.set=i.set?p(i.set,this):n),Object.defineProperty(this,e,r)}},e.prototype._initMethods=function(){var t=this.$options.methods;if(t)for(var e in t)this[e]=p(t[e],this)},e.prototype._initMeta=function(){var t=this.$options._meta;if(t)for(var e in t)kt(this,e,t[e])}}function ti(t){function e(t,e){for(var i,n,r=e.attributes,s=0,o=r.length;o>s;s++)i=r[s].name,ks.test(i)&&(i=i.replace(ks,""),n=(t._scope||t._context).$eval(r[s].value,!0),n._fromParent=!0,t.$on(i.replace(ks),n))}function i(t,e,i){if(i){var r,s,o,a;for(s in i)if(r=i[s],$i(r))for(o=0,a=r.length;a>o;o++)n(t,e,s,r[o]);else n(t,e,s,r)}}function n(t,e,i,r,s){var o=typeof r;if("function"===o)t[e](i,r,s);else if("string"===o){var a=t.$options.methods,h=a&&a[r];h&&t[e](i,h,s)}else r&&"object"===o&&n(t,e,i,r.handler,r)}function r(){this._isAttached||(this._isAttached=!0,this.$children.forEach(s))}function s(t){!t._isAttached&&L(t.$el)&&t._callHook("attached")}function o(){this._isAttached&&(this._isAttached=!1,this.$children.forEach(a))}function a(t){t._isAttached&&!L(t.$el)&&t._callHook("detached")}t.prototype._initEvents=function(){var t=this.$options;t._asComponent&&e(this,t.el),i(this,"$on",t.events),i(this,"$watch",t.watch)},t.prototype._initDOMHooks=function(){this.$on("hook:attached",r),this.$on("hook:detached",o)},t.prototype._callHook=function(t){this.$emit("pre-hook:"+t);var e=this.$options[t];if(e)for(var i=0,n=e.length;n>i;i++)e[i].call(this);this.$emit("hook:"+t)}}function ei(){}function ii(t,e,i,n,r,s){this.vm=e,this.el=i,this.descriptor=t,this.name=t.name,this.expression=t.expression,this.arg=t.arg,this.modifiers=t.modifiers,this.filters=t.filters,this.literal=this.modifiers&&this.modifiers.literal,this._locked=!1,this._bound=!1,this._listeners=null,this._host=n,this._scope=r,this._frag=s}function ni(t){t.prototype._updateRef=function(t){var e=this.$options._ref;if(e){var i=(this._scope||this._context).$refs;t?i[e]===this&&(i[e]=null):i[e]=this}},t.prototype._compile=function(t){var e=this.$options,i=t;if(t=Ge(t,e),this._initElement(t),1!==t.nodeType||null===V(t,"v-pre")){var n,r=this._context&&this._context.$options,s=Ee(t,e,r),o=this.constructor;e._linkerCachable&&(n=o.linker,n||(n=o.linker=xe(t,e)));var a=s(this,t,this._scope),h=n?n(this,t):xe(t,e)(this,t);this._unlinkFn=function(){a(),h(!0)},e.replace&&q(i,t),this._isCompiled=!0,this._callHook("compiled")}},t.prototype._initElement=function(t){t instanceof DocumentFragment?(this._isFragment=!0,this.$el=this._fragmentStart=t.firstChild,this._fragmentEnd=t.lastChild,3===this._fragmentStart.nodeType&&(this._fragmentStart.data=this._fragmentEnd.data=""),this._fragment=t):this.$el=t,this.$el.__vue__=this,this._callHook("beforeCompile")},t.prototype._bindDir=function(t,e,i,n,r){this._directives.push(new ii(t,this,e,i,n,r))},t.prototype._destroy=function(t,e){if(this._isBeingDestroyed)return void(e||this._cleanup());var i,n,r=this,s=function(){!i||n||e||r._cleanup()};t&&this.$el&&(n=!0,this.$remove(function(){n=!1,s()})),this._callHook("beforeDestroy"),this._isBeingDestroyed=!0;var o,a=this.$parent;for(a&&!a._isBeingDestroyed&&(a.$children.$remove(this),this._updateRef(!0)),o=this.$children.length;o--;)this.$children[o].$destroy();for(this._propsUnlinkFn&&this._propsUnlinkFn(),this._unlinkFn&&this._unlinkFn(),o=this._watchers.length;o--;)this._watchers[o].teardown();this.$el&&(this.$el.__vue__=null),i=!0,s()},t.prototype._cleanup=function(){this._isDestroyed||(this._frag&&this._frag.children.$remove(this),this._data.__ob__&&this._data.__ob__.removeVm(this),this.$el=this.$parent=this.$root=this.$children=this._watchers=this._context=this._scope=this._directives=null,this._isDestroyed=!0,this._callHook("destroyed"),this.$off())}}function ri(t){t.prototype._applyFilters=function(t,e,i,n){var r,s,o,a,h,l,c,u,f;for(l=0,c=i.length;c>l;l++)if(r=i[l],s=gt(this.$options,"filters",r.name),s&&(s=n?s.write:s.read||s,"function"==typeof s)){if(o=n?[t,e]:[t],h=n?2:1,r.args)for(u=0,f=r.args.length;f>u;u++)a=r.args[u],o[u+h]=a.dynamic?this.$get(a.value):a.value;t=s.apply(this,o)}return t},t.prototype._resolveComponent=function(e,i){var n=gt(this.$options,"components",e);if(n)if(n.options)i(n);else if(n.resolved)i(n.resolved);else if(n.requested)n.pendingCallbacks.push(i);else{n.requested=!0;var r=n.pendingCallbacks=[i];n(function(e){g(e)&&(e=t.extend(e)),n.resolved=e;for(var i=0,s=r.length;s>i;i++)r[i](e)},function(t){})}}}function si(i){function n(t){return new Function("return function "+f(t)+" (options) { this._init(options) }")()}i.util=yn,i.config=hn,i.set=t,i["delete"]=e,i.nextTick=Di,i.compiler=$s,i.FragmentFactory=fe,i.internalDirectives=us,i.parsers={path:Rn,text:sn,template:Ur,directive:Xi,expression:Kn},i.cid=0;var r=1;i.extend=function(t){t=t||{};var e=this,i=0===e.cid;if(i&&t._Ctor)return t._Ctor;var s=t.name||e.options.name,o=n(s||"VueComponent");return o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.cid=r++,o.options=mt(e.options,t),o["super"]=e,o.extend=e.extend,hn._assetTypes.forEach(function(t){o[t]=e[t]}),s&&(o.options.components[s]=o),i&&(t._Ctor=o),o},i.use=function(t){if(!t.installed){var e=d(arguments,1);return e.unshift(this),"function"==typeof t.install?t.install.apply(t,e):t.apply(null,e),t.installed=!0,this}},i.mixin=function(t){i.options=mt(i.options,t)},hn._assetTypes.forEach(function(t){i[t]=function(e,n){return n?("component"===t&&g(n)&&(n.name=e,n=i.extend(n)),
this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function oi(t){function i(t){return JSON.parse(JSON.stringify(t))}t.prototype.$get=function(t,e){var i=Lt(t);if(i){if(e&&!Vt(t)){var n=this;return function(){n.$arguments=d(arguments);var t=i.get.call(n,n);return n.$arguments=null,t}}try{return i.get.call(this,this)}catch(r){}}},t.prototype.$set=function(t,e){var i=Lt(t,!0);i&&i.set&&i.set.call(this,this,e)},t.prototype.$delete=function(t){e(this._data,t)},t.prototype.$watch=function(t,e,i){var n,r=this;"string"==typeof t&&(n=A(t),t=n.expression);var s=new It(r,t,e,{deep:i&&i.deep,sync:i&&i.sync,filters:n&&n.filters,user:!i||i.user!==!1});return i&&i.immediate&&e.call(r,s.value),function(){s.teardown()}},t.prototype.$eval=function(t,e){if(xs.test(t)){var i=A(t),n=this.$get(i.expression,e);return i.filters?this._applyFilters(n,null,i.filters):n}return this.$get(t,e)},t.prototype.$interpolate=function(t){var e=T(t),i=this;return e?1===e.length?i.$eval(e[0].value)+"":e.map(function(t){return t.tag?i.$eval(t.value):t.value}).join(""):t},t.prototype.$log=function(t){var e=t?jt(this._data,t):this._data;if(e&&(e=i(e)),!t)for(var n in this.$options.computed)e[n]=i(this[n]);console.log(e)}}function ai(t){function e(t,e,n,r,s,o){e=i(e);var a=!L(e),h=r===!1||a?s:o,l=!a&&!t._isAttached&&!L(t.$el);return t._isFragment?(rt(t._fragmentStart,t._fragmentEnd,function(i){h(i,e,t)}),n&&n()):h(t.$el,e,t,n),l&&t._callHook("attached"),t}function i(t){return"string"==typeof t?document.querySelector(t):t}function n(t,e,i,n){e.appendChild(t),n&&n()}function r(t,e,i,n){W(t,e),n&&n()}function s(t,e,i){I(t),i&&i()}t.prototype.$nextTick=function(t){Di(t,this)},t.prototype.$appendTo=function(t,i,r){return e(this,t,i,r,n,S)},t.prototype.$prependTo=function(t,e,n){return t=i(t),t.hasChildNodes()?this.$before(t.firstChild,e,n):this.$appendTo(t,e,n),this},t.prototype.$before=function(t,i,n){return e(this,t,i,n,r,P)},t.prototype.$after=function(t,e,n){return t=i(t),t.nextSibling?this.$before(t.nextSibling,e,n):this.$appendTo(t.parentNode,e,n),this},t.prototype.$remove=function(t,e){if(!this.$el.parentNode)return t&&t();var i=this._isAttached&&L(this.$el);i||(e=!1);var n=this,r=function(){i&&n._callHook("detached"),t&&t()};if(this._isFragment)st(this._fragmentStart,this._fragmentEnd,this,this._fragment,r);else{var o=e===!1?s:D;o(this.$el,this,r)}return this}}function hi(t){function e(t,e,n){var r=t.$parent;if(r&&n&&!i.test(e))for(;r;)r._eventsCount[e]=(r._eventsCount[e]||0)+n,r=r.$parent}t.prototype.$on=function(t,i){return(this._events[t]||(this._events[t]=[])).push(i),e(this,t,1),this},t.prototype.$once=function(t,e){function i(){n.$off(t,i),e.apply(this,arguments)}var n=this;return i.fn=e,this.$on(t,i),this},t.prototype.$off=function(t,i){var n;if(!arguments.length){if(this.$parent)for(t in this._events)n=this._events[t],n&&e(this,t,-n.length);return this._events={},this}if(n=this._events[t],!n)return this;if(1===arguments.length)return e(this,t,-n.length),this._events[t]=null,this;for(var r,s=n.length;s--;)if(r=n[s],r===i||r.fn===i){e(this,t,-1),n.splice(s,1);break}return this},t.prototype.$emit=function(t){var e="string"==typeof t;t=e?t:t.name;var i=this._events[t],n=e||!i;if(i){i=i.length>1?d(i):i;var r=e&&i.some(function(t){return t._fromParent});r&&(n=!1);for(var s=d(arguments,1),o=0,a=i.length;a>o;o++){var h=i[o],l=h.apply(this,s);l!==!0||r&&!h._fromParent||(n=!0)}}return n},t.prototype.$broadcast=function(t){var e="string"==typeof t;if(t=e?t:t.name,this._eventsCount[t]){var i=this.$children,n=d(arguments);e&&(n[0]={name:t,source:this});for(var r=0,s=i.length;s>r;r++){var o=i[r],a=o.$emit.apply(o,n);a&&o.$broadcast.apply(o,n)}return this}},t.prototype.$dispatch=function(t){var e=this.$emit.apply(this,arguments);if(e){var i=this.$parent,n=d(arguments);for(n[0]={name:t,source:this};i;)e=i.$emit.apply(i,n),i=e?i.$parent:null;return this}};var i=/^hook:/}function li(t){function e(){this._isAttached=!0,this._isReady=!0,this._callHook("ready")}t.prototype.$mount=function(t){return this._isCompiled?void 0:(t=H(t),t||(t=document.createElement("div")),this._compile(t),this._initDOMHooks(),L(this.$el)?(this._callHook("attached"),e.call(this)):this.$once("hook:attached",e),this)},t.prototype.$destroy=function(t,e){this._destroy(t,e)},t.prototype.$compile=function(t,e,i,n){return xe(t,this.$options,!0)(this,t,e,i,n)}}function ci(t){this._init(t)}function ui(t,e,i){return i=i?parseInt(i,10):0,e=o(e),"number"==typeof e?t.slice(i,i+e):t}function fi(t,e,i){if(t=As(t),null==e)return t;if("function"==typeof e)return t.filter(e);e=(""+e).toLowerCase();for(var n,r,s,o,a="in"===i?3:2,h=d(arguments,a).reduce(function(t,e){return t.concat(e)},[]),l=[],c=0,u=t.length;u>c;c++)if(n=t[c],s=n&&n.$value||n,o=h.length){for(;o--;)if(r=h[o],"$key"===r&&di(n.$key,e)||di(jt(s,r),e)){l.push(n);break}}else di(n,e)&&l.push(n);return l}function pi(t,e,i){if(t=As(t),!e)return t;var n=i&&0>i?-1:1;return t.slice().sort(function(t,i){return"$key"!==e&&(m(t)&&"$value"in t&&(t=t.$value),m(i)&&"$value"in i&&(i=i.$value)),t=m(t)?jt(t,e):t,i=m(i)?jt(i,e):i,t===i?0:t>i?n:-n})}function di(t,e){var i;if(g(t)){var n=Object.keys(t);for(i=n.length;i--;)if(di(t[n[i]],e))return!0}else if($i(t)){for(i=t.length;i--;)if(di(t[i],e))return!0}else if(null!=t)return t.toString().toLowerCase().indexOf(e)>-1}function vi(t,e,i){function n(t){!et(t)||t.hasAttribute("v-if")||t.hasAttribute("v-for")||(t=re(t)),t=ne(t),r.appendChild(t)}for(var r=document.createDocumentFragment(),s=0,o=t.length;o>s;s++){var a=t[s];i&&!a.__v_selected?n(a):i||a.parentNode!==e||(a.__v_selected=!0,n(a))}return r}var mi=Object.prototype.hasOwnProperty,gi=/^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/,_i=/-(\w)/g,yi=/([a-z\d])([A-Z])/g,bi=/(?:^|[-_\/])(\w)/g,Ci=Object.prototype.toString,wi="[object Object]",$i=Array.isArray,ki="__proto__"in{},xi="undefined"!=typeof window&&"[object Object]"!==Object.prototype.toString.call(window),Ai=xi&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,Oi=xi&&navigator.userAgent.toLowerCase().indexOf("msie 9.0")>0,Ni=xi&&navigator.userAgent.toLowerCase().indexOf("android")>0,Ti=void 0,ji=void 0,Ei=void 0,Fi=void 0;if(xi&&!Oi){var Si=void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend,Pi=void 0===window.onanimationend&&void 0!==window.onwebkitanimationend;Ti=Si?"WebkitTransition":"transition",ji=Si?"webkitTransitionEnd":"transitionend",Ei=Pi?"WebkitAnimation":"animation",Fi=Pi?"webkitAnimationEnd":"animationend"}var Di=function(){function t(){n=!1;var t=i.slice(0);i=[];for(var e=0;e<t.length;e++)t[e]()}var e,i=[],n=!1;if("undefined"!=typeof MutationObserver){var r=1,s=new MutationObserver(t),o=document.createTextNode(r);s.observe(o,{characterData:!0}),e=function(){r=(r+1)%2,o.data=r}}else{var a=xi?window:"undefined"!=typeof global?global:{};e=a.setImmediate||setTimeout}return function(r,s){var o=s?function(){r.call(s)}:r;i.push(o),n||(n=!0,e(t,0))}}(),Ri=$.prototype;Ri.put=function(t,e){var i;this.size===this.limit&&(i=this.shift());var n=this.get(t,!0);return n||(n={key:t},this._keymap[t]=n,this.tail?(this.tail.newer=n,n.older=this.tail):this.head=n,this.tail=n,this.size++),n.value=e,i},Ri.shift=function(){var t=this.head;return t&&(this.head=this.head.newer,this.head.older=void 0,t.newer=t.older=void 0,this._keymap[t.key]=void 0,this.size--),t},Ri.get=function(t,e){var i=this._keymap[t];if(void 0!==i)return i===this.tail?e?i:i.value:(i.newer&&(i===this.head&&(this.head=i.newer),i.newer.older=i.older),i.older&&(i.older.newer=i.newer),i.newer=void 0,i.older=this.tail,this.tail&&(this.tail.newer=i),this.tail=i,e?i:i.value)};var Hi,Li,Vi,Bi,Mi,Wi,zi,Ii,Ui,qi,Ji,Qi,Gi=new $(1e3),Ki=/[^\s'"]+|'[^']*'|"[^"]*"/g,Zi=/^in$|^-?\d+/,Xi=Object.freeze({parseDirective:A}),Yi=/[-.*+?^${}()|[\]\/\\]/g,tn=void 0,en=void 0,nn=void 0,rn=/[^|]\|[^|]/,sn=Object.freeze({compileRegex:N,parseText:T,tokensToExp:j}),on=["{{","}}"],an=["{{{","}}}"],hn=Object.defineProperties({debug:!1,silent:!1,async:!0,warnExpressionErrors:!0,convertAllProperties:!1,_delimitersChanged:!0,_assetTypes:["component","directive","elementDirective","filter","transition","partial"],_propBindingModes:{ONE_WAY:0,TWO_WAY:1,ONE_TIME:2},_maxUpdateCount:100},{delimiters:{get:function(){return on},set:function(t){on=t,N()},configurable:!0,enumerable:!0},unsafeDelimiters:{get:function(){return an},set:function(t){an=t,N()},configurable:!0,enumerable:!0}}),ln=void 0,cn=/^v-ref:/,un=/^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/,fn=/^(slot|partial|component)$/,pn=hn.optionMergeStrategies=Object.create(null);pn.data=function(t,e,i){return i?t||e?function(){var n="function"==typeof e?e.call(i):e,r="function"==typeof t?t.call(i):void 0;return n?ut(n,r):r}:void 0:e?"function"!=typeof e?t:t?function(){return ut(e.call(this),t.call(this))}:e:t},pn.el=function(t,e,i){if(i||!e||"function"==typeof e){var n=e||t;return i&&"function"==typeof n?n.call(i):n}},pn.init=pn.created=pn.ready=pn.attached=pn.detached=pn.beforeCompile=pn.compiled=pn.beforeDestroy=pn.destroyed=function(t,e){return e?t?t.concat(e):$i(e)?e:[e]:t},pn.paramAttributes=function(){},hn._assetTypes.forEach(function(t){pn[t+"s"]=ft}),pn.watch=pn.events=function(t,e){if(!e)return t;if(!t)return e;var i={};v(i,t);for(var n in e){var r=i[n],s=e[n];r&&!$i(r)&&(r=[r]),i[n]=r?r.concat(s):[s]}return i},pn.props=pn.methods=pn.computed=function(t,e){if(!e)return t;if(!t)return e;var i=Object.create(null);return v(i,t),v(i,e),i};var dn=function(t,e){return void 0===e?t:e},vn=Array.prototype,mn=Object.create(vn);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(t){var e=vn[t];_(mn,t,function(){for(var i=arguments.length,n=new Array(i);i--;)n[i]=arguments[i];var r,s=e.apply(this,n),o=this.__ob__;switch(t){case"push":r=n;break;case"unshift":r=n;break;case"splice":r=n.slice(2)}return r&&o.observeArray(r),o.dep.notify(),s})}),_(vn,"$set",function(t,e){return t>=this.length&&(this.length=Number(t)+1),this.splice(t,1,e)[0]}),_(vn,"$remove",function(t){if(this.length){var e=b(this,t);return e>-1?this.splice(e,1):void 0}});var gn=0;yt.target=null,yt.prototype.addSub=function(t){this.subs.push(t)},yt.prototype.removeSub=function(t){this.subs.$remove(t)},yt.prototype.depend=function(){yt.target.addDep(this)},yt.prototype.notify=function(){for(var t=d(this.subs),e=0,i=t.length;i>e;e++)t[e].update()};var _n=Object.getOwnPropertyNames(mn);bt.prototype.walk=function(t){for(var e=Object.keys(t),i=0,n=e.length;n>i;i++)this.convert(e[i],t[e[i]])},bt.prototype.observeArray=function(t){for(var e=0,i=t.length;i>e;e++)$t(t[e])},bt.prototype.convert=function(t,e){kt(this.value,t,e)},bt.prototype.addVm=function(t){(this.vms||(this.vms=[])).push(t)},bt.prototype.removeVm=function(t){this.vms.$remove(t)};var yn=Object.freeze({defineReactive:kt,set:t,del:e,hasOwn:i,isLiteral:n,isReserved:r,_toString:s,toNumber:o,toBoolean:a,stripQuotes:h,camelize:l,hyphenate:u,classify:f,bind:p,toArray:d,extend:v,isObject:m,isPlainObject:g,def:_,debounce:y,indexOf:b,cancellable:C,looseEqual:w,isArray:$i,hasProto:ki,inBrowser:xi,devtools:Ai,isIE9:Oi,isAndroid:Ni,get transitionProp(){return Ti},get transitionEndEvent(){return ji},get animationProp(){return Ei},get animationEndEvent(){return Fi},nextTick:Di,query:H,inDoc:L,getAttr:V,getBindAttr:B,hasBindAttr:M,before:W,after:z,remove:I,prepend:U,replace:q,on:J,off:Q,setClass:G,addClass:K,removeClass:Z,extractContent:X,trimNode:Y,isTemplate:et,createAnchor:it,findRef:nt,mapNodeRange:rt,removeNodeRange:st,mergeOptions:mt,resolveAsset:gt,assertAsset:_t,checkComponentAttr:ot,initProp:ht,assertProp:lt,coerceProp:ct,commonTagRE:un,reservedTagRE:fn,warn:ln}),bn=0,Cn=new $(1e3),wn=0,$n=1,kn=2,xn=3,An=0,On=1,Nn=2,Tn=3,jn=4,En=5,Fn=6,Sn=7,Pn=8,Dn=[];Dn[An]={ws:[An],ident:[Tn,wn],"[":[jn],eof:[Sn]},Dn[On]={ws:[On],".":[Nn],"[":[jn],eof:[Sn]},Dn[Nn]={ws:[Nn],ident:[Tn,wn]},Dn[Tn]={ident:[Tn,wn],0:[Tn,wn],number:[Tn,wn],ws:[On,$n],".":[Nn,$n],"[":[jn,$n],eof:[Sn,$n]},Dn[jn]={"'":[En,wn],'"':[Fn,wn],"[":[jn,kn],"]":[On,xn],eof:Pn,"else":[jn,wn]},Dn[En]={"'":[jn,wn],eof:Pn,"else":[En,wn]},Dn[Fn]={'"':[jn,wn],eof:Pn,"else":[Fn,wn]};var Rn=Object.freeze({parsePath:Tt,getPath:jt,setPath:Et}),Hn=new $(1e3),Ln="Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat",Vn=new RegExp("^("+Ln.replace(/,/g,"\\b|")+"\\b)"),Bn="break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,proctected,static,interface,private,public",Mn=new RegExp("^("+Bn.replace(/,/g,"\\b|")+"\\b)"),Wn=/\s/g,zn=/\n/g,In=/[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g,Un=/"(\d+)"/g,qn=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/,Jn=/[^\w$\.](?:[A-Za-z_$][\w$]*)/g,Qn=/^(?:true|false)$/,Gn=[],Kn=Object.freeze({parseExpression:Lt,isSimplePath:Vt}),Zn=[],Xn=[],Yn={},tr={},er=!1,ir=!1,nr=0;It.prototype.addDep=function(t){var e=t.id;this.newDeps[e]||(this.newDeps[e]=t,this.deps[e]||(this.deps[e]=t,t.addSub(this)))},It.prototype.get=function(){this.beforeGet();var t,e=this.scope||this.vm;try{t=this.getter.call(e,e)}catch(i){}return this.deep&&Ut(t),this.preProcess&&(t=this.preProcess(t)),this.filters&&(t=e._applyFilters(t,null,this.filters,!1)),this.postProcess&&(t=this.postProcess(t)),this.afterGet(),t},It.prototype.set=function(t){var e=this.scope||this.vm;this.filters&&(t=e._applyFilters(t,this.value,this.filters,!0));try{this.setter.call(e,e,t)}catch(i){}var n=e.$forContext;if(n&&n.alias===this.expression){if(n.filters)return;n._withLock(function(){e.$key?n.rawValue[e.$key]=t:n.rawValue.$set(e.$index,t)})}},It.prototype.beforeGet=function(){yt.target=this,this.newDeps=Object.create(null)},It.prototype.afterGet=function(){yt.target=null;for(var t=Object.keys(this.deps),e=t.length;e--;){var i=t[e];this.newDeps[i]||this.deps[i].removeSub(this)}this.deps=this.newDeps},It.prototype.update=function(t){this.lazy?this.dirty=!0:this.sync||!hn.async?this.run():(this.shallow=this.queued?t?this.shallow:!1:!!t,this.queued=!0,zt(this))},It.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||(m(t)||this.deep)&&!this.shallow){var e=this.value;this.value=t;this.prevError;this.cb.call(this.vm,t,e)}this.queued=this.shallow=!1}},It.prototype.evaluate=function(){var t=yt.target;this.value=this.get(),this.dirty=!1,yt.target=t},It.prototype.depend=function(){for(var t=Object.keys(this.deps),e=t.length;e--;)this.deps[t[e]].depend()},It.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||this.vm._vForRemoving||this.vm._watchers.$remove(this);for(var t=Object.keys(this.deps),e=t.length;e--;)this.deps[t[e]].removeSub(this);this.active=!1,this.vm=this.cb=this.value=null}};var rr={bind:function(){var t=this.el;this.vm.$once("pre-hook:compiled",function(){t.removeAttribute("v-cloak")})}},sr={bind:function(){}},or=700,ar=800,hr=850,lr=1100,cr=1500,ur=1500,fr=1750,pr=2e3,dr=2e3,vr=2100,mr={priority:cr,bind:function(){if(this.arg){var t=this.id=l(this.arg),e=(this._scope||this.vm).$els;i(e,t)?e[t]=this.el:kt(e,t,this.el)}},unbind:function(){var t=(this._scope||this.vm).$els;t[this.id]===this.el&&(t[this.id]=null)}},gr=["-webkit-","-moz-","-ms-"],_r=["Webkit","Moz","ms"],yr=/!important;?$/,br=Object.create(null),Cr=null,wr={deep:!0,update:function(t){"string"==typeof t?this.el.style.cssText=t:$i(t)?this.handleObject(t.reduce(v,{})):this.handleObject(t||{})},handleObject:function(t){var e,i,n=this.cache||(this.cache={});for(e in n)e in t||(this.handleSingle(e,null),delete n[e]);for(e in t)i=t[e],i!==n[e]&&(n[e]=i,this.handleSingle(e,i))},handleSingle:function(t,e){if(t=qt(t))if(null!=e&&(e+=""),e){var i=yr.test(e)?"important":"";i&&(e=e.replace(yr,"").trim()),this.el.style.setProperty(t,e,i)}else this.el.style.removeProperty(t)}},$r="http://www.w3.org/1999/xlink",kr=/^xlink:/,xr=/^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/,Ar=/^(?:value|checked|selected|muted)$/,Or={value:"_value","true-value":"_trueValue","false-value":"_falseValue"},Nr={priority:hr,bind:function(){var t=this.arg,e=this.el.tagName;t||(this.deep=!0);var i=this.descriptor,n=i.interp;n&&(i.hasOneTime&&(this.expression=j(n,this._scope||this.vm)),(xr.test(t)||"name"===t&&("PARTIAL"===e||"SLOT"===e))&&(this.el.removeAttribute(t),this.invalid=!0))},update:function(t){if(!this.invalid){var e=this.arg;this.arg?this.handleSingle(e,t):this.handleObject(t||{})}},handleObject:wr.handleObject,handleSingle:function(t,e){var i=this.el,n=this.descriptor.interp;this.modifiers.camel&&(t=l(t)),!n&&Ar.test(t)&&t in i&&(i[t]="value"===t&&null==e?"":e);var r=Or[t];if(!n&&r){i[r]=e;var s=i.__v_model;s&&s.listener()}return"value"===t&&"TEXTAREA"===i.tagName?void i.removeAttribute(t):void(null!=e&&e!==!1?"class"===t?(i.__v_trans&&(e+=" "+i.__v_trans.id+"-transition"),G(i,e)):kr.test(t)?i.setAttributeNS($r,t,e===!0?"":e):i.setAttribute(t,e===!0?"":e):i.removeAttribute(t))}},Tr={esc:27,tab:9,enter:13,space:32,"delete":[8,46],up:38,left:37,right:39,down:40},jr={acceptStatement:!0,priority:or,bind:function(){if("IFRAME"===this.el.tagName&&"load"!==this.arg){var t=this;this.iframeBind=function(){J(t.el.contentWindow,t.arg,t.handler,t.modifiers.capture)},this.on("load",this.iframeBind)}},update:function(t){if(this.descriptor.raw||(t=function(){}),"function"==typeof t){this.modifiers.stop&&(t=Gt(t)),this.modifiers.prevent&&(t=Kt(t)),this.modifiers.self&&(t=Zt(t));var e=Object.keys(this.modifiers).filter(function(t){return"stop"!==t&&"prevent"!==t});e.length&&(t=Qt(t,e)),this.reset(),this.handler=t,this.iframeBind?this.iframeBind():J(this.el,this.arg,this.handler,this.modifiers.capture)}},reset:function(){var t=this.iframeBind?this.el.contentWindow:this.el;this.handler&&Q(t,this.arg,this.handler)},unbind:function(){this.reset()}},Er={bind:function(){function t(){var t=i.checked;return t&&i.hasOwnProperty("_trueValue")?i._trueValue:!t&&i.hasOwnProperty("_falseValue")?i._falseValue:t}var e=this,i=this.el;this.getValue=function(){return i.hasOwnProperty("_value")?i._value:e.params.number?o(i.value):i.value},this.listener=function(){var n=e._watcher.value;if($i(n)){var r=e.getValue();i.checked?b(n,r)<0&&n.push(r):n.$remove(r)}else e.set(t())},this.on("change",this.listener),i.hasAttribute("checked")&&(this.afterBind=this.listener)},update:function(t){var e=this.el;$i(t)?e.checked=b(t,this.getValue())>-1:e.hasOwnProperty("_trueValue")?e.checked=w(t,e._trueValue):e.checked=!!t}},Fr={bind:function(){var t=this,e=this.el;this.forceUpdate=function(){t._watcher&&t.update(t._watcher.get())};var i=this.multiple=e.hasAttribute("multiple");this.listener=function(){var n=Xt(e,i);n=t.params.number?$i(n)?n.map(o):o(n):n,t.set(n)},this.on("change",this.listener);var n=Xt(e,i,!0);(i&&n.length||!i&&null!==n)&&(this.afterBind=this.listener),this.vm.$on("hook:attached",this.forceUpdate)},update:function(t){var e=this.el;e.selectedIndex=-1;for(var i,n,r=this.multiple&&$i(t),s=e.options,o=s.length;o--;)i=s[o],n=i.hasOwnProperty("_value")?i._value:i.value,i.selected=r?Yt(t,n)>-1:w(t,n)},unbind:function(){this.vm.$off("hook:attached",this.forceUpdate)}},Sr={bind:function(){var t=this,e=this.el;this.getValue=function(){if(e.hasOwnProperty("_value"))return e._value;var i=e.value;return t.params.number&&(i=o(i)),i},this.listener=function(){t.set(t.getValue())},this.on("change",this.listener),e.hasAttribute("checked")&&(this.afterBind=this.listener)},update:function(t){this.el.checked=w(t,this.getValue())}},Pr={bind:function(){var t=this,e=this.el,i="range"===e.type,n=this.params.lazy,r=this.params.number,s=this.params.debounce,a=!1;if(Ni||i||(this.on("compositionstart",function(){a=!0}),this.on("compositionend",function(){a=!1,n||t.listener()})),this.focused=!1,i||n||(this.on("focus",function(){t.focused=!0}),this.on("blur",function(){t.focused=!1,(!t._frag||t._frag.inserted)&&t.rawListener()})),this.listener=this.rawListener=function(){if(!a&&t._bound){var n=r||i?o(e.value):e.value;t.set(n),Di(function(){t._bound&&!t.focused&&t.update(t._watcher.value)})}},s&&(this.listener=y(this.listener,s)),this.hasjQuery="function"==typeof jQuery,this.hasjQuery){var h=jQuery.fn.on?"on":"bind";jQuery(e)[h]("change",this.listener),n||jQuery(e)[h]("input",this.listener)}else this.on("change",this.listener),n||this.on("input",this.listener);!n&&Oi&&(this.on("cut",function(){Di(t.listener)}),this.on("keyup",function(e){(46===e.keyCode||8===e.keyCode)&&t.listener()})),(e.hasAttribute("value")||"TEXTAREA"===e.tagName&&e.value.trim())&&(this.afterBind=this.listener)},update:function(t){this.el.value=s(t)},unbind:function(){var t=this.el;if(this.hasjQuery){var e=jQuery.fn.off?"off":"unbind";jQuery(t)[e]("change",this.listener),jQuery(t)[e]("input",this.listener)}}},Dr={text:Pr,radio:Sr,select:Fr,checkbox:Er},Rr={priority:ar,twoWay:!0,handlers:Dr,params:["lazy","number","debounce"],bind:function(){this.checkFilters(),this.hasRead&&!this.hasWrite;var t,e=this.el,i=e.tagName;if("INPUT"===i)t=Dr[e.type]||Dr.text;else if("SELECT"===i)t=Dr.select;else{if("TEXTAREA"!==i)return;t=Dr.text}e.__v_model=this,t.bind.call(this),this.update=t.update,this._unbind=t.unbind},checkFilters:function(){var t=this.filters;if(t)for(var e=t.length;e--;){var i=gt(this.vm.$options,"filters",t[e].name);("function"==typeof i||i.read)&&(this.hasRead=!0),i.write&&(this.hasWrite=!0)}},unbind:function(){this.el.__v_model=null,this._unbind&&this._unbind()}},Hr={bind:function(){var t=this.el.nextElementSibling;t&&null!==V(t,"v-else")&&(this.elseEl=t)},update:function(t){this.apply(this.el,t),this.elseEl&&this.apply(this.elseEl,!t)},apply:function(t,e){function i(){t.style.display=e?"":"none"}L(t)?R(t,e?1:-1,i,this.vm):i()}},Lr=new $(1e3),Vr=new $(1e3),Br={efault:[0,"",""],legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]};Br.td=Br.th=[3,"<table><tbody><tr>","</tr></tbody></table>"],Br.option=Br.optgroup=[1,'<select multiple="multiple">',"</select>"],Br.thead=Br.tbody=Br.colgroup=Br.caption=Br.tfoot=[1,"<table>","</table>"],Br.g=Br.defs=Br.symbol=Br.use=Br.image=Br.text=Br.circle=Br.ellipse=Br.line=Br.path=Br.polygon=Br.polyline=Br.rect=[1,'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">',"</svg>"];var Mr=/<([\w:]+)/,Wr=/&#?\w+?;/,zr=function(){if(xi){var t=document.createElement("div");return t.innerHTML="<template>1</template>",!t.cloneNode(!0).firstChild.innerHTML}return!1}(),Ir=function(){if(xi){var t=document.createElement("textarea");return t.placeholder="t","t"===t.cloneNode(!0).value}return!1}(),Ur=Object.freeze({cloneNode:ne,parseTemplate:re});se.prototype.callHook=function(t){var e,i;for(e=0,i=this.childFrags.length;i>e;e++)this.childFrags[e].callHook(t);for(e=0,i=this.children.length;i>e;e++)t(this.children[e])},se.prototype.beforeRemove=function(){var t,e;for(t=0,e=this.childFrags.length;e>t;t++)this.childFrags[t].beforeRemove(!1);for(t=0,e=this.children.length;e>t;t++)this.children[t].$destroy(!1,!0);var i=this.unlink.dirs;for(t=0,e=i.length;e>t;t++)i[t]._watcher&&i[t]._watcher.teardown()},se.prototype.destroy=function(){this.parentFrag&&this.parentFrag.childFrags.$remove(this),this.node.__vfrag__=null,this.unlink()};var qr=new $(5e3);fe.prototype.create=function(t,e,i){var n=ne(this.template);return new se(this.linker,this.vm,n,t,e,i)};var Jr={priority:dr,bind:function(){var t=this.el;if(t.__vue__)this.invalid=!0;else{var e=t.nextElementSibling;e&&null!==V(e,"v-else")&&(I(e),this.elseFactory=new fe(this.vm,e)),this.anchor=it("v-if"),q(t,this.anchor),this.factory=new fe(this.vm,t)}},update:function(t){this.invalid||(t?this.frag||this.insert():this.remove())},insert:function(){this.elseFrag&&(this.elseFrag.remove(),this.elseFrag=null),this.frag=this.factory.create(this._host,this._scope,this._frag),this.frag.before(this.anchor)},remove:function(){this.frag&&(this.frag.remove(),this.frag=null),this.elseFactory&&!this.elseFrag&&(this.elseFrag=this.elseFactory.create(this._host,this._scope,this._frag),this.elseFrag.before(this.anchor))},unbind:function(){this.frag&&this.frag.destroy(),this.elseFrag&&this.elseFrag.destroy()}},Qr=0,Gr={priority:pr,params:["track-by","stagger","enter-stagger","leave-stagger"],bind:function(){var t=this.expression.match(/(.*) in (.*)/);if(t){var e=t[1].match(/\((.*),(.*)\)/);e?(this.iterator=e[1].trim(),this.alias=e[2].trim()):this.alias=t[1].trim(),this.expression=t[2]}if(this.alias){this.id="__v-for__"+ ++Qr;var i=this.el.tagName;this.isOption=("OPTION"===i||"OPTGROUP"===i)&&"SELECT"===this.el.parentNode.tagName,this.start=it("v-for-start"),this.end=it("v-for-end"),q(this.el,this.end),W(this.start,this.end),this.cache=Object.create(null),this.factory=new fe(this.vm,this.el)}},update:function(t){this.diff(t),this.updateRef(),this.updateModel()},diff:function(t){var e,n,r,s,o,a,h=t[0],l=this.fromObject=m(h)&&i(h,"$key")&&i(h,"$value"),c=this.params.trackBy,u=this.frags,f=this.frags=new Array(t.length),p=this.alias,d=this.iterator,v=this.start,g=this.end,_=L(v),y=!u;for(e=0,n=t.length;n>e;e++)h=t[e],s=l?h.$key:null,o=l?h.$value:h,a=!m(o),r=!y&&this.getCachedFrag(o,e,s),r?(r.reused=!0,r.scope.$index=e,s&&(r.scope.$key=s),d&&(r.scope[d]=null!==s?s:e),(c||l||a)&&(r.scope[p]=o)):(r=this.create(o,p,e,s),r.fresh=!y),f[e]=r,y&&r.before(g);if(!y){var b=0,C=u.length-f.length;for(this.vm._vForRemoving=!0,e=0,n=u.length;n>e;e++)r=u[e],r.reused||(this.deleteCachedFrag(r),this.remove(r,b++,C,_));this.vm._vForRemoving=!1,this.vm._watchers=this.vm._watchers.filter(function(t){return t.active});var w,$,k,x=0;for(e=0,n=f.length;n>e;e++)r=f[e],w=f[e-1],$=w?w.staggerCb?w.staggerAnchor:w.end||w.node:v,r.reused&&!r.staggerCb?(k=pe(r,v,this.id),k===w||k&&pe(k,v,this.id)===w||this.move(r,$)):this.insert(r,x++,$,_),r.reused=r.fresh=!1}},create:function(t,e,i,n){var r=this._host,s=this._scope||this.vm,o=Object.create(s);o.$refs=Object.create(s.$refs),o.$els=Object.create(s.$els),o.$parent=s,o.$forContext=this,kt(o,e,t),kt(o,"$index",i),n?kt(o,"$key",n):o.$key&&_(o,"$key",null),this.iterator&&kt(o,this.iterator,null!==n?n:i);var a=this.factory.create(r,o,this._frag);return a.forId=this.id,this.cacheFrag(t,a,i,n),a},updateRef:function(){var t=this.descriptor.ref;if(t){var e,i=(this._scope||this.vm).$refs;this.fromObject?(e={},this.frags.forEach(function(t){e[t.scope.$key]=de(t)})):e=this.frags.map(de),i[t]=e}},updateModel:function(){if(this.isOption){var t=this.start.parentNode,e=t&&t.__v_model;e&&e.forceUpdate()}},insert:function(t,e,i,n){t.staggerCb&&(t.staggerCb.cancel(),t.staggerCb=null);var r=this.getStagger(t,e,null,"enter");if(n&&r){var s=t.staggerAnchor;s||(s=t.staggerAnchor=it("stagger-anchor"),s.__vfrag__=t),z(s,i);var o=t.staggerCb=C(function(){t.staggerCb=null,t.before(s),I(s)});setTimeout(o,r)}else t.before(i.nextSibling)},remove:function(t,e,i,n){if(t.staggerCb)return t.staggerCb.cancel(),void(t.staggerCb=null);var r=this.getStagger(t,e,i,"leave");if(n&&r){var s=t.staggerCb=C(function(){t.staggerCb=null,t.remove()});setTimeout(s,r)}else t.remove()},move:function(t,e){e.nextSibling||this.end.parentNode.appendChild(this.end),t.before(e.nextSibling,!1)},cacheFrag:function(t,e,n,r){var s,o=this.params.trackBy,a=this.cache,h=!m(t);r||o||h?(s=o?"$index"===o?n:t[o]:r||t,a[s]||(a[s]=e)):(s=this.id,i(t,s)?null===t[s]&&(t[s]=e):_(t,s,e)),e.raw=t},getCachedFrag:function(t,e,i){var n,r=this.params.trackBy,s=!m(t);if(i||r||s){var o=r?"$index"===r?e:t[r]:i||t;n=this.cache[o]}else n=t[this.id];return n&&(n.reused||n.fresh),n},deleteCachedFrag:function(t){var e=t.raw,n=this.params.trackBy,r=t.scope,s=r.$index,o=i(r,"$key")&&r.$key,a=!m(e);if(n||o||a){var h=n?"$index"===n?s:e[n]:o||e;this.cache[h]=null}else e[this.id]=null,t.raw=null},getStagger:function(t,e,i,n){n+="Stagger";var r=t.node.__v_trans,s=r&&r.hooks,o=s&&(s[n]||s.stagger);return o?o.call(t,e,i):e*parseInt(this.params[n]||this.params.stagger,10)},_preProcess:function(t){return this.rawValue=t,t},_postProcess:function(t){if($i(t))return t;if(g(t)){for(var e,i=Object.keys(t),n=i.length,r=new Array(n);n--;)e=i[n],r[n]={$key:e,$value:t[e]};return r}return"number"!=typeof t||isNaN(t)||(t=ve(t)),t||[]},unbind:function(){if(this.descriptor.ref&&((this._scope||this.vm).$refs[this.descriptor.ref]=null),this.frags)for(var t,e=this.frags.length;e--;)t=this.frags[e],this.deleteCachedFrag(t),t.destroy()}},Kr={bind:function(){8===this.el.nodeType&&(this.nodes=[],this.anchor=it("v-html"),q(this.el,this.anchor))},update:function(t){t=s(t),this.nodes?this.swap(t):this.el.innerHTML=t},swap:function(t){for(var e=this.nodes.length;e--;)I(this.nodes[e]);var i=re(t,!0,!0);this.nodes=d(i.childNodes),W(i,this.anchor)}},Zr={bind:function(){this.attr=3===this.el.nodeType?"data":"textContent"},update:function(t){this.el[this.attr]=s(t)}},Xr={text:Zr,html:Kr,"for":Gr,"if":Jr,show:Hr,model:Rr,on:jr,bind:Nr,el:mr,ref:sr,cloak:rr},Yr=[],ts=!1,es="transition",is="animation",ns=Ti+"Duration",rs=Ei+"Duration",ss=_e.prototype;ss.enter=function(t,e){this.cancelPending(),this.callHook("beforeEnter"),this.cb=e,K(this.el,this.enterClass),t(),this.entered=!1,this.callHookWithCb("enter"),this.entered||(this.cancel=this.hooks&&this.hooks.enterCancelled,me(this.enterNextTick))},ss.enterNextTick=function(){this.justEntered=!0;var t=this;setTimeout(function(){t.justEntered=!1},17);var e=this.enterDone,i=this.getCssTransitionType(this.enterClass);this.pendingJsCb?i===es&&Z(this.el,this.enterClass):i===es?(Z(this.el,this.enterClass),this.setupCssCb(ji,e)):i===is?this.setupCssCb(Fi,e):e()},ss.enterDone=function(){this.entered=!0,this.cancel=this.pendingJsCb=null,Z(this.el,this.enterClass),this.callHook("afterEnter"),this.cb&&this.cb()},ss.leave=function(t,e){this.cancelPending(),this.callHook("beforeLeave"),this.op=t,this.cb=e,K(this.el,this.leaveClass),this.left=!1,this.callHookWithCb("leave"),this.left||(this.cancel=this.hooks&&this.hooks.leaveCancelled,this.op&&!this.pendingJsCb&&(this.justEntered?this.leaveDone():me(this.leaveNextTick)))},ss.leaveNextTick=function(){var t=this.getCssTransitionType(this.leaveClass);if(t){var e=t===es?ji:Fi;this.setupCssCb(e,this.leaveDone)}else this.leaveDone()},ss.leaveDone=function(){this.left=!0,this.cancel=this.pendingJsCb=null,this.op(),Z(this.el,this.leaveClass),this.callHook("afterLeave"),this.cb&&this.cb(),this.op=null},ss.cancelPending=function(){this.op=this.cb=null;var t=!1;this.pendingCssCb&&(t=!0,Q(this.el,this.pendingCssEvent,this.pendingCssCb),this.pendingCssEvent=this.pendingCssCb=null),this.pendingJsCb&&(t=!0,this.pendingJsCb.cancel(),this.pendingJsCb=null),t&&(Z(this.el,this.enterClass),Z(this.el,this.leaveClass)),this.cancel&&(this.cancel.call(this.vm,this.el),this.cancel=null)},ss.callHook=function(t){this.hooks&&this.hooks[t]&&this.hooks[t].call(this.vm,this.el)},ss.callHookWithCb=function(t){var e=this.hooks&&this.hooks[t];e&&(e.length>1&&(this.pendingJsCb=C(this[t+"Done"])),e.call(this.vm,this.el,this.pendingJsCb))},ss.getCssTransitionType=function(t){if(!(!ji||document.hidden||this.hooks&&this.hooks.css===!1||ye(this.el))){var e=this.type||this.typeCache[t];if(e)return e;var i=this.el.style,n=window.getComputedStyle(this.el),r=i[ns]||n[ns];if(r&&"0s"!==r)e=es;else{var s=i[rs]||n[rs];s&&"0s"!==s&&(e=is)}return e&&(this.typeCache[t]=e),e}},ss.setupCssCb=function(t,e){this.pendingCssEvent=t;var i=this,n=this.el,r=this.pendingCssCb=function(s){s.target===n&&(Q(n,t,r),i.pendingCssEvent=i.pendingCssCb=null,!i.pendingJsCb&&e&&e())};J(n,t,r)};var os={priority:lr,update:function(t,e){var i=this.el,n=gt(this.vm.$options,"transitions",t);t=t||"v",i.__v_trans=new _e(i,t,n,this.el.__vue__||this.vm),e&&Z(i,e+"-transition"),
K(i,t+"-transition")}},as=hn._propBindingModes,hs={bind:function(){var t=this.vm,e=t._context,i=this.descriptor.prop,n=i.path,r=i.parentPath,s=i.mode===as.TWO_WAY,o=this.parentWatcher=new It(e,r,function(e){e=ct(i,e),lt(i,e)&&(t[n]=e)},{twoWay:s,filters:i.filters,scope:this._scope});if(ht(t,i,o.value),s){var a=this;t.$once("pre-hook:created",function(){a.childWatcher=new It(t,n,function(t){o.set(t)},{sync:!0})})}},unbind:function(){this.parentWatcher.teardown(),this.childWatcher&&this.childWatcher.teardown()}},ls={priority:ur,params:["keep-alive","transition-mode","inline-template"],bind:function(){this.el.__vue__||(this.keepAlive=this.params.keepAlive,this.keepAlive&&(this.cache={}),this.params.inlineTemplate&&(this.inlineTemplate=X(this.el,!0)),this.pendingComponentCb=this.Component=null,this.pendingRemovals=0,this.pendingRemovalCb=null,this.anchor=it("v-component"),q(this.el,this.anchor),this.el.removeAttribute("is"),this.descriptor.ref&&this.el.removeAttribute("v-ref:"+u(this.descriptor.ref)),this.literal&&this.setComponent(this.expression))},update:function(t){this.literal||this.setComponent(t)},setComponent:function(t,e){if(this.invalidatePending(),t){var i=this;this.resolveComponent(t,function(){i.mountComponent(e)})}else this.unbuild(!0),this.remove(this.childVM,e),this.childVM=null},resolveComponent:function(t,e){var i=this;this.pendingComponentCb=C(function(n){i.ComponentName=n.options.name||t,i.Component=n,e()}),this.vm._resolveComponent(t,this.pendingComponentCb)},mountComponent:function(t){this.unbuild(!0);var e=this,i=this.Component.options.activate,n=this.getCached(),r=this.build();i&&!n?(this.waitingFor=r,i.call(r,function(){e.waitingFor===r&&(e.waitingFor=null,e.transition(r,t))})):(n&&r._updateRef(),this.transition(r,t))},invalidatePending:function(){this.pendingComponentCb&&(this.pendingComponentCb.cancel(),this.pendingComponentCb=null)},build:function(t){var e=this.getCached();if(e)return e;if(this.Component){var i={name:this.ComponentName,el:ne(this.el),template:this.inlineTemplate,parent:this._host||this.vm,_linkerCachable:!this.inlineTemplate,_ref:this.descriptor.ref,_asComponent:!0,_isRouterView:this._isRouterView,_context:this.vm,_scope:this._scope,_frag:this._frag};t&&v(i,t);var n=new this.Component(i);return this.keepAlive&&(this.cache[this.Component.cid]=n),n}},getCached:function(){return this.keepAlive&&this.cache[this.Component.cid]},unbuild:function(t){this.waitingFor&&(this.waitingFor.$destroy(),this.waitingFor=null);var e=this.childVM;return!e||this.keepAlive?void(e&&e._updateRef(!0)):void e.$destroy(!1,t)},remove:function(t,e){var i=this.keepAlive;if(t){this.pendingRemovals++,this.pendingRemovalCb=e;var n=this;t.$remove(function(){n.pendingRemovals--,i||t._cleanup(),!n.pendingRemovals&&n.pendingRemovalCb&&(n.pendingRemovalCb(),n.pendingRemovalCb=null)})}else e&&e()},transition:function(t,e){var i=this,n=this.childVM;switch(this.childVM=t,i.params.transitionMode){case"in-out":t.$before(i.anchor,function(){i.remove(n,e)});break;case"out-in":i.remove(n,function(){t.$before(i.anchor,e)});break;default:i.remove(n),t.$before(i.anchor,e)}},unbind:function(){if(this.invalidatePending(),this.unbuild(),this.cache){for(var t in this.cache)this.cache[t].$destroy();this.cache=null}}},cs={deep:!0,update:function(t){t&&"string"==typeof t?this.handleObject(be(t)):g(t)?this.handleObject(t):$i(t)?this.handleArray(t):this.cleanup()},handleObject:function(t){this.cleanup(t);for(var e=this.prevKeys=Object.keys(t),i=0,n=e.length;n>i;i++){var r=e[i];t[r]?K(this.el,r):Z(this.el,r)}},handleArray:function(t){this.cleanup(t);for(var e=0,i=t.length;i>e;e++)t[e]&&K(this.el,t[e]);this.prevKeys=t.slice()},cleanup:function(t){if(this.prevKeys)for(var e=this.prevKeys.length;e--;){var i=this.prevKeys[e];!i||t&&Ce(t,i)||Z(this.el,i)}}},us={style:wr,"class":cs,component:ls,prop:hs,transition:os},fs=hn._propBindingModes,ps={},ds=/^[$_a-zA-Z]+[\w$]*$/,vs=/^v-bind:|^:/,ms=/^v-on:|^@/,gs=/^v-([^:]+)(?:$|:(.*)$)/,_s=/\.[^\.]+/g,ys=/^(v-bind:|:)?transition$/,bs=["for","if"],Cs=1e3;ze.terminal=!0;var ws=/[^\w\-:\.]/,$s=Object.freeze({compile:xe,compileAndLinkProps:je,compileRoot:Ee,terminalDirectives:bs,transclude:Ge}),ks=/^v-on:|^@/;ii.prototype._bind=function(){var t=this.name,e=this.descriptor;if(("cloak"!==t||this.vm._isCompiled)&&this.el&&this.el.removeAttribute){var i=e.attr||"v-"+t;this.el.removeAttribute(i)}var n=e.def;if("function"==typeof n?this.update=n:v(this,n),this._setupParams(),this.bind&&this.bind(),this._bound=!0,this.literal)this.update&&this.update(e.raw);else if((this.expression||this.modifiers)&&(this.update||this.twoWay)&&!this._checkStatement()){var r=this;this.update?this._update=function(t,e){r._locked||r.update(t,e)}:this._update=ei;var s=this._preProcess?p(this._preProcess,this):null,o=this._postProcess?p(this._postProcess,this):null,a=this._watcher=new It(this.vm,this.expression,this._update,{filters:this.filters,twoWay:this.twoWay,deep:this.deep,preProcess:s,postProcess:o,scope:this._scope});this.afterBind?this.afterBind():this.update&&this.update(a.value)}},ii.prototype._setupParams=function(){if(this.params){var t=this.params;this.params=Object.create(null);for(var e,i,n,r=t.length;r--;)e=t[r],n=l(e),i=B(this.el,e),null!=i?this._setupParamWatcher(n,i):(i=V(this.el,e),null!=i&&(this.params[n]=""===i?!0:i))}},ii.prototype._setupParamWatcher=function(t,e){var i=this,n=!1,r=(this._scope||this.vm).$watch(e,function(e,r){if(i.params[t]=e,n){var s=i.paramWatchers&&i.paramWatchers[t];s&&s.call(i,e,r)}else n=!0},{immediate:!0,user:!1});(this._paramUnwatchFns||(this._paramUnwatchFns=[])).push(r)},ii.prototype._checkStatement=function(){var t=this.expression;if(t&&this.acceptStatement&&!Vt(t)){var e=Lt(t).get,i=this._scope||this.vm,n=function(t){i.$event=t,e.call(i,i),i.$event=null};return this.filters&&(n=i._applyFilters(n,null,this.filters)),this.update(n),!0}},ii.prototype.set=function(t){this.twoWay&&this._withLock(function(){this._watcher.set(t)})},ii.prototype._withLock=function(t){var e=this;e._locked=!0,t.call(e),Di(function(){e._locked=!1})},ii.prototype.on=function(t,e,i){J(this.el,t,e,i),(this._listeners||(this._listeners=[])).push([t,e])},ii.prototype._teardown=function(){if(this._bound){this._bound=!1,this.unbind&&this.unbind(),this._watcher&&this._watcher.teardown();var t,e=this._listeners;if(e)for(t=e.length;t--;)Q(this.el,e[t][0],e[t][1]);var i=this._paramUnwatchFns;if(i)for(t=i.length;t--;)i[t]();this.vm=this.el=this._watcher=this._listeners=null}};var xs=/[^|]\|[^|]/;xt(ci),Ye(ci),ti(ci),ni(ci),ri(ci),si(ci),oi(ci),ai(ci),hi(ci),li(ci);var As=Gr._postProcess,Os=/(\d{3})(?=\d)/g,Ns={orderBy:pi,filterBy:fi,limitBy:ui,json:{read:function(t,e){return"string"==typeof t?t:JSON.stringify(t,null,Number(e)||2)},write:function(t){try{return JSON.parse(t)}catch(e){return t}}},capitalize:function(t){return t||0===t?(t=t.toString(),t.charAt(0).toUpperCase()+t.slice(1)):""},uppercase:function(t){return t||0===t?t.toString().toUpperCase():""},lowercase:function(t){return t||0===t?t.toString().toLowerCase():""},currency:function(t,e){if(t=parseFloat(t),!isFinite(t)||!t&&0!==t)return"";e=null!=e?e:"$";var i=Math.abs(t).toFixed(2),n=i.slice(0,-3),r=n.length%3,s=r>0?n.slice(0,r)+(n.length>3?",":""):"",o=i.slice(-3),a=0>t?"-":"";return e+a+s+n.slice(r).replace(Os,"$1,")+o},pluralize:function(t){var e=d(arguments,1);return e.length>1?e[t%10-1]||e[e.length-1]:e[0]+(1===t?"":"s")},debounce:function(t,e){return t?(e||(e=300),y(t,e)):void 0}},Ts={priority:fr,params:["name"],paramWatchers:{name:function(t){Jr.remove.call(this),t&&this.insert(t)}},bind:function(){this.anchor=it("v-partial"),q(this.el,this.anchor),this.insert(this.params.name)},insert:function(t){var e=gt(this.vm.$options,"partials",t);e&&(this.factory=new fe(this.vm,e),Jr.insert.call(this))},unbind:function(){this.frag&&this.frag.destroy()}},js={priority:vr,bind:function(){var t=this.vm,e=t.$options._content;if(!e)return void this.fallback();var i=t._context,n=this.params&&this.params.name;if(n){var r='[slot="'+n+'"]',s=e.querySelectorAll(r);s.length?this.tryCompile(vi(s,e),i,t):this.fallback()}else this.tryCompile(vi(e.childNodes,e,!0),i,t)},tryCompile:function(t,e,i){t.hasChildNodes()?this.compile(t,e,i):this.fallback()},compile:function(t,e,i){if(t&&e){if(this.el.hasChildNodes()&&1===t.childNodes.length&&1===t.childNodes[0].nodeType&&t.childNodes[0].hasAttribute("v-if")){var n=document.createElement("template");n.setAttribute("v-else",""),n.innerHTML=this.el.innerHTML,t.appendChild(n)}var r=i?i._scope:this._scope;this.unlink=e.$compile(t,i,r,this._frag)}t?q(this.el,t):I(this.el)},fallback:function(){this.compile(X(this.el,!0),this.vm)},unbind:function(){this.unlink&&this.unlink()}},Es=v(v({},js),{priority:js.priority+1,params:["name"]}),Fs={slot:js,_namedSlot:Es,partial:Ts};return ci.version="1.0.16",ci.options={directives:Xr,elementDirectives:Fs,filters:Ns,transitions:{},components:{},partials:{},replace:!0},Ai&&Ai.emit("init",ci),ci});


/* ---- data/1B8LmXYHzMGZzcRWoidAQb5SmKSyfjN63f/js/ZeroTodos.coffee ---- */


(function() {
  var MySite, prepareSite,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MySite = (function(superClass) {
    extend(MySite, superClass);

    function MySite() {
      this.writeFile = bind(this.writeFile, this);
      this.loadFile = bind(this.loadFile, this);
      this.displayMessage = bind(this.displayMessage, this);
      this.selectUser = bind(this.selectUser, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return MySite.__super__.constructor.apply(this, arguments);
    }

    MySite.prototype.init = function() {
      this.vm = prepareSite();
      this.vm.selectUserCallback = this.selectUser;
      this.vm.writeFileCallback = this.writeFile;
      this.vm.messageCallback = this.displayMessage;
      return this.vm.startWatch();
    };

    MySite.prototype.route = function(cmd, message) {
      var inner_path;
      if (cmd === "setSiteInfo") {
        if (message.params.cert_user_id) {
          this.vm.cert_user_id = message.params.cert_user_id;
        } else {
          this.vm.cert_user_id = null;
        }
        this.site_info = message.params;
        this.log("Routed", cmd, message);
        if ((message.params != null) && (message.params.event != null) && message.params.event.length > 0 && this.vm.cert_user_id) {
          switch (message.params.event[0]) {
            case "cert_changed":
              this.loadFile();
              return this.updateDataSize();
            case "file_done":
              if (!this.vm.needsSaving) {
                inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
                if (message.params.event[1] === inner_path) {
                  this.loadFile();
                  return this.updateDataSize();
                }
              }
              break;
            default:
              return this.log("Unhandled event", message.params.event[0]);
          }
        }
      }
    };

    MySite.prototype.onOpenWebsocket = function(e) {
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(siteInfo) {
          var skipLoading;
          skipLoading = false;
          if (siteInfo.cert_user_id) {
            if (_this.vm.cert_user_id === siteInfo.cert_user_id) {
              skipLoading = true;
            }
            _this.vm.cert_user_id = siteInfo.cert_user_id;
          }
          _this.site_info = siteInfo;
          _this.log("Web Socket Opened", _this.vm.cert_user_id, siteInfo.cert_user_id);
          if (!skipLoading) {
            _this.loadFile();
          }
          return _this.updateDataSize();
        };
      })(this));
    };

    MySite.prototype.updateDataSize = function() {
      if (this.site_info.cert_user_id) {
        return this.cmd("fileRules", "data/users/" + this.site_info.auth_address + "/content.json", (function(_this) {
          return function(rules) {
            _this.log("Updating dataUsage");
            if (rules.current_size != null) {
              _this.vm.dataSize = rules.current_size;
            }
            if (rules.max_size != null) {
              return _this.vm.dataSizeMax = rules.max_size;
            }
          };
        })(this));
      }
    };

    MySite.prototype.selectUser = function() {
      Page.cmd("certSelect", [["zeroid.bit"]]);
      return false;
    };

    MySite.prototype.displayMessage = function(msgtype, text) {
      return this.cmd("wrapperNotification", [msgtype, text]);
    };

    MySite.prototype.loadFile = function() {
      var inner_path;
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      return this.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          if (data) {
            return _this.cmd("eciesDecrypt", data, function(result) {
              result = JSON.parse(result);
              _this.vm.needsSaving = false;
              _this.vm.loading = true;
              _this.vm.todos = result.todos;
              _this.vm.next_todo_id = result.next_todo_id;
              _this.vm.readNote = result.readNote;
              return Vue.nextTick(function() {
                return _this.vm.loading = false;
              });
            });
          }
        };
      })(this));
    };

    MySite.prototype.writeFile = function(json_raw, cb) {
      var inner_path;
      if (cb == null) {
        cb = false;
      }
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      return this.cmd("eciesEncrypt", json_raw, (function(_this) {
        return function(data) {
          return _this.cmd("fileWrite", [inner_path, btoa(data)], function(res) {
            if (res === "ok") {
              _this.log("File saved");
              if (cb) {
                cb(true);
              }
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                _this.log("Saved user data.json published");
                return _this.updateDataSize();
              });
            } else {
              _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
              if (cb) {
                return cb(false);
              }
            }
          });
        };
      })(this));
    };

    return MySite;

  })(ZeroFrame);

  prepareSite = function() {
    var vm;
    return vm = new Vue({
      el: '#app',
      data: {
        next_todo_id: 2,
        selected_todo: 0,
        newTask: '',
        editingTask: null,
        editedTask: '',
        editingTodo: null,
        editedTodo: '',
        dragging: null,
        dragover: null,
        dragType: null,
        footer: true,
        readNote: false,
        cert_user_id: null,
        loading: false,
        saving: false,
        needsSaving: false,
        dataSize: null,
        dataSizeMax: null,
        selectUserCallback: null,
        writeFileCallback: null,
        messageCallback: null,
        todos: [
          {
            todo_id: 1,
            title: "ZeroTodos",
            tasks: [
              {
                text: 'Select a todo list on the left',
                checked: true
              }, {
                text: 'Check a task to mark it as done',
                checked: false
              }, {
                text: 'Enter a new task',
                checked: false
              }, {
                text: 'Double click a task to edit it',
                checked: false
              }, {
                text: 'Hit ESC to cancel editing',
                checked: false
              }, {
                text: 'Click the X on a task to remove it',
                checked: false
              }, {
                text: 'Drag a task or todo list to a different position',
                checked: false
              }
            ]
          }
        ]
      },
      computed: {
        dataUsage: function() {
          if (this.dataSize === null || this.dataSizeMax === null) {
            return null;
          }
          return ((this.dataSize / 1024).toFixed(1)) + "kb / " + ((this.dataSizeMax / 1024).toFixed(1)) + "kb";
        }
      },
      methods: {
        todoClasses: function(index) {
          var classList;
          classList = [];
          if (this.dragType === "todo") {
            if (index === this.dragging) {
              classList.push("dragging");
            }
            if (index === this.dragover) {
              classList.push("dragover");
            }
          }
          if (index === this.selected_todo) {
            classList.push("selected");
          }
          return classList;
        },
        taskClasses: function(index) {
          if (this.dragType === "task") {
            if (index === this.dragging) {
              return ["dragging"];
            }
            if (index === this.dragover) {
              return ["dragover"];
            }
          } else {
            return [];
          }
        },
        dragStart: function(event, index, item) {
          this.dragging = index;
          if (item.todo_id != null) {
            this.dragType = "todo";
          } else {
            this.dragType = "task";
          }
          event.dataTransfer.effectAllowed = "move";
          return event.dataTransfer.setData("text", "dummy");
        },
        endDrag: function() {
          this.dragging = null;
          this.dragover = null;
          return this.dragType = null;
        },
        dropped: function(item, index) {
          var itemSrc, itemTarget;
          if (item.todo_id != null) {
            itemSrc = this.todos[this.dragging];
            itemTarget = this.todos[index];
            this.todos.$set(this.dragging, itemTarget);
            return this.todos.$set(index, itemSrc);
          } else {
            itemSrc = this.todos[this.selected_todo].tasks[this.dragging];
            itemTarget = this.todos[this.selected_todo].tasks[index];
            this.todos[this.selected_todo].tasks.$set(this.dragging, itemTarget);
            return this.todos[this.selected_todo].tasks.$set(index, itemSrc);
          }
        },
        startWatch: function() {
          return this.$watch("todos", this.todosChanged, {
            deep: true
          });
        },
        selectUser: function() {
          if (!this.selectUserCallback) {
            return;
          }
          return this.selectUserCallback();
        },
        todosChanged: function(todos) {
          if (!this.loading) {
            return this.needsSaving = true;
          }
        },
        todoClicked: function(index) {
          document.querySelector("#right").scrollTop = 0;
          return this.selected_todo = index;
        },
        addNewTodo: function() {
          var todo;
          todo = {
            todo_id: this.next_todo_id,
            title: "New Todo list",
            tasks: []
          };
          this.next_todo_id += 1;
          return this.todos.push(todo);
        },
        addTask: function() {
          if (this.newTask === '') {
            return;
          }
          this.todos[this.selected_todo].tasks.unshift({
            text: this.newTask,
            checked: false
          });
          return this.newTask = '';
        },
        deleteTask: function(task) {
          return this.todos[this.selected_todo].tasks.$remove(task);
        },
        taskCount: function(todo) {
          return todo.tasks.filter(function(task) {
            return !task.checked;
          }).length;
        },
        editTask: function(task, index) {
          this.editedTask = task.text;
          return this.editingTask = index;
        },
        editTaskDone: function(task) {
          task.text = this.editedTask;
          return this.editingTask = null;
        },
        cancelEditingTask: function(task) {
          return this.editingTask = null;
        },
        editTodo: function(todo, index) {
          this.editedTodo = todo.title;
          return this.editingTodo = index;
        },
        editTodoDone: function(todo) {
          todo.title = this.editedTodo;
          return this.editingTodo = null;
        },
        cancelEditingTodo: function(todo) {
          return this.editingTodo = null;
        },
        deleteTodo: function(index) {
          this.todos.$remove(this.todos[index]);
          return this.selected_todo = 0;
        },
        clearCompleted: function() {
          return this.todos[this.selected_todo].tasks = this.todos[this.selected_todo].tasks.filter(function(task) {
            return !task.checked;
          });
        },
        saveUserData: function() {
          var data, json_raw;
          if (this.saving) {
            if (this.messageCallback) {
              this.messageCallback("info", "Already saving");
            }
            return;
          }
          if (!this.writeFileCallback) {
            return;
          }
          data = {
            todos: this.todos,
            next_todo_id: this.next_todo_id,
            readNote: this.readNote
          };
          json_raw = unescape(encodeURIComponent(JSON.stringify(data)));
          this.saving = true;
          return this.writeFileCallback(json_raw, (function(_this) {
            return function(result) {
              _this.saving = false;
              return _this.needsSaving = false;
            };
          })(this));
        }
      },
      directives: {
        "task-focus": function(value) {
          var el;
          if (!value) {
            return;
          }
          el = this.el;
          return Vue.nextTick(function() {
            var length;
            el.focus();
            length = el.value.length;
            if (el.setSelectionRange != null) {
              return el.setSelectionRange(0, length);
            }
          });
        }
      }
    });
  };

  setTimeout(function() {
    return Page.vm.footer = false;
  }, 5000);

  window.Page = new MySite();

}).call(this);
