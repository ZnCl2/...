

/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/00-jquery.min.js ---- */


/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)
},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec=/#.*$/,fc=/([?&])_=[^&]*/,gc=/^(.*?):[ \t]*([^\r\n]*)$/gm,hc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ic=/^(?:GET|HEAD)$/,jc=/^\/\//,kc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lc={},mc={},nc="*/".concat("*"),oc=a.location.href,pc=kc.exec(oc.toLowerCase())||[];function qc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rc(a,b,c,d){var e={},f=a===mc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function uc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:oc,type:"GET",isLocal:hc.test(pc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sc(sc(a,n.ajaxSettings),b):sc(n.ajaxSettings,a)},ajaxPrefilter:qc(lc),ajaxTransport:qc(mc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||oc)+"").replace(ec,"").replace(jc,pc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pc[1]&&h[2]===pc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pc[3]||("http:"===pc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rc(lc,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ic.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fc.test(d)?d.replace(fc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rc(mc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tc(k,v,f)),u=uc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vc=/%20/g,wc=/\[\]$/,xc=/\r?\n/g,yc=/^(?:submit|button|image|reset|file)$/i,zc=/^(?:input|select|textarea|keygen)/i;function Ac(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wc.test(a)?d(a,e):Ac(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ac(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ac(c,a[c],b,e);return d.join("&").replace(vc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zc.test(this.nodeName)&&!yc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xc,"\r\n")}}):{name:b.name,value:c.replace(xc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bc=0,Cc={},Dc={0:200,1223:204},Ec=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cc)Cc[a]()}),k.cors=!!Ec&&"withCredentials"in Ec,k.ajax=Ec=!!Ec,n.ajaxTransport(function(a){var b;return k.cors||Ec&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Dc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fc=[],Gc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hc)return Hc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ic=a.document.documentElement;function Jc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ic;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ic})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kc=a.jQuery,Lc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lc),b&&a.jQuery===n&&(a.jQuery=Kc),n},typeof b===U&&(a.jQuery=a.$=n),n});



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/highlight.pack.js ---- */


!function(e){"undefined"!=typeof exports?e(exports):(window.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return window.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){var n=(e.className+" "+(e.parentNode?e.parentNode.className:"")).split(/\s+/);return n=n.map(function(e){return e.replace(/^lang(uage)?-/,"")}),n.filter(function(e){return N(e)||/no(-?)highlight/.test(e)})[0]}function o(e,n){var t={};for(var r in e)t[r]=e[r];if(n)for(var r in n)t[r]=n[r];return t}function i(e){var n=[];return function r(e,a){for(var o=e.firstChild;o;o=o.nextSibling)3==o.nodeType?a+=o.nodeValue.length:1==o.nodeType&&(n.push({event:"start",offset:a,node:o}),a=r(o,a),t(o).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:o}));return a}(e,0),n}function c(e,r,a){function o(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function i(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function c(e){l+="</"+t(e)+">"}function u(e){("start"==e.event?i:c)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=o();if(l+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){f.reverse().forEach(c);do u(g.splice(0,1)[0]),g=o();while(g==e&&g.length&&g[0].offset==s);f.reverse().forEach(i)}else"start"==g[0].event?f.push(g[0].node):f.pop(),u(g.splice(0,1)[0])}return l+n(a.substr(s))}function u(e){function n(e){return e&&e.source||e}function t(t,r){return RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var c={},u=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");c[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?u("keyword",a.k):Object.keys(a.k).forEach(function(e){u(e,a.k[e])}),a.k=c}a.lR=t(a.l||/\b[A-Za-z0-9_]+\b/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(o(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var l=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=l.length?t(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function s(e,t,a,o){function i(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function c(e,n){return r(e.eR,n)?e:e.eW?c(e.parent,n):void 0}function f(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=x.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":E.classPrefix,o='<span class="'+a,i=t?"":"</span>";return o+=e+'">',o+n+i}function d(){if(!w.k)return n(y);var e="",t=0;w.lR.lastIndex=0;for(var r=w.lR.exec(y);r;){e+=n(y.substr(t,r.index-t));var a=g(w,r);a?(B+=a[1],e+=p(a[0],n(r[0]))):e+=n(r[0]),t=w.lR.lastIndex,r=w.lR.exec(y)}return e+n(y.substr(t))}function h(){if(w.sL&&!R[w.sL])return n(y);var e=w.sL?s(w.sL,y,!0,L[w.sL]):l(y);return w.r>0&&(B+=e.r),"continuous"==w.subLanguageMode&&(L[w.sL]=e.top),p(e.language,e.value,!1,!0)}function v(){return void 0!==w.sL?h():d()}function b(e,t){var r=e.cN?p(e.cN,"",!0):"";e.rB?(M+=r,y=""):e.eB?(M+=n(t)+r,y=""):(M+=r,y=t),w=Object.create(e,{parent:{value:w}})}function m(e,t){if(y+=e,void 0===t)return M+=v(),0;var r=i(t,w);if(r)return M+=v(),b(r,t),r.rB?0:t.length;var a=c(w,t);if(a){var o=w;o.rE||o.eE||(y+=t),M+=v();do w.cN&&(M+="</span>"),B+=w.r,w=w.parent;while(w!=a.parent);return o.eE&&(M+=n(t)),y="",a.starts&&b(a.starts,""),o.rE?0:t.length}if(f(t,w))throw new Error('Illegal lexeme "'+t+'" for mode "'+(w.cN||"<unnamed>")+'"');return y+=t,t.length||1}var x=N(e);if(!x)throw new Error('Unknown language: "'+e+'"');u(x);for(var w=o||x,L={},M="",k=w;k!=x;k=k.parent)k.cN&&(M=p(k.cN,"",!0)+M);var y="",B=0;try{for(var C,j,I=0;;){if(w.t.lastIndex=I,C=w.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}m(t.substr(I));for(var k=w;k.parent;k=k.parent)k.cN&&(M+="</span>");return{r:B,value:M,language:e,top:w}}catch(A){if(-1!=A.message.indexOf("Illegal"))return{r:0,value:n(t)};throw A}}function l(e,t){t=t||E.languages||Object.keys(R);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(N(n)){var t=s(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function f(e){return E.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,E.tabReplace)})),E.useBR&&(e=e.replace(/\n/g,"<br>")),e}function g(e,n,t){var r=n?x[n]:t,a=[e.trim()];return e.match(/(\s|^)hljs(\s|$)/)||a.push("hljs"),r&&a.push(r),a.join(" ").trim()}function p(e){var n=a(e);if(!/no(-?)highlight/.test(n)){var t;E.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,o=n?s(n,r,!0):l(r),u=i(t);if(u.length){var p=document.createElementNS("http://www.w3.org/1999/xhtml","div");p.innerHTML=o.value,o.value=c(u,i(p),r)}o.value=f(o.value),e.innerHTML=o.value,e.className=g(e.className,n,o.language),e.result={language:o.language,re:o.r},o.second_best&&(e.second_best={language:o.second_best.language,re:o.second_best.r})}}function d(e){E=o(E,e)}function h(){if(!h.called){h.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,p)}}function v(){addEventListener("DOMContentLoaded",h,!1),addEventListener("load",h,!1)}function b(n,t){var r=R[n]=t(e);r.aliases&&r.aliases.forEach(function(e){x[e]=n})}function m(){return Object.keys(R)}function N(e){return R[e]||R[x[e]]}var E={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},R={},x={};return e.highlight=s,e.highlightAuto=l,e.fixMarkup=f,e.highlightBlock=p,e.configure=d,e.initHighlighting=h,e.initHighlightingOnLoad=v,e.registerLanguage=b,e.listLanguages=m,e.getLanguage=N,e.inherit=o,e.IR="[a-zA-Z][a-zA-Z0-9_]*",e.UIR="[a-zA-Z_][a-zA-Z0-9_]*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/},e.CLCM={cN:"comment",b:"//",e:"$",c:[e.PWM]},e.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[e.PWM]},e.HCM={cN:"comment",b:"#",e:"$",c:[e.PWM]},e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e});hljs.registerLanguage("cpp",function(t){var i={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginaryintmax_t uintmax_t int8_t uint8_t int16_t uint16_t int32_t uint32_t  int64_t uint64_tint_least8_t uint_least8_t int_least16_t uint_least16_t int_least32_t uint_least32_tint_least64_t uint_least64_t int_fast8_t uint_fast8_t int_fast16_t uint_fast16_t int_fast32_tuint_fast32_t int_fast64_t uint_fast64_t intptr_t uintptr_t atomic_bool atomic_char atomic_scharatomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llongatomic_ullong atomic_wchar_t atomic_char16_t atomic_char32_t atomic_intmax_t atomic_uintmax_tatomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_int_least8_t atomic_int_least16_tatomic_int_least32_t atomic_int_least64_t atomic_uint_least8_t atomic_uint_least16_t atomic_uint_least32_tatomic_uint_least64_t atomic_int_fast8_t atomic_int_fast16_t atomic_int_fast32_t atomic_int_fast64_tatomic_uint_fast8_t atomic_uint_fast16_t atomic_uint_fast32_t atomic_uint_fast64_t",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"};return{aliases:["c","h","c++","h++"],k:i,i:"</",c:[t.CLCM,t.CBCM,t.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},t.CNM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line pragma",c:[{b:'include\\s*[<"]',e:'[>"]',k:"include",i:"\\n"},t.CLCM]},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:i,c:["self"]},{b:t.IR+"::"},{bK:"new throw return",r:0},{cN:"function",b:"("+t.IR+"\\s+)+"+t.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:i,c:[{b:t.IR+"\\s*\\(",rB:!0,c:[t.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:i,r:0,c:[t.CBCM]},t.CLCM,t.CBCM]}]}});hljs.registerLanguage("ruby",function(e){var b="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",c={cN:"yardoctag",b:"@[A-Za-z]+"},a={cN:"value",b:"#<",e:">"},s={cN:"comment",v:[{b:"#",e:"$",c:[c]},{b:"^\\=begin",e:"^\\=end",c:[c],r:10},{b:"^__END__",e:"\\n$"}]},n={cN:"subst",b:"#\\{",e:"}",k:r},t={cN:"string",c:[e.BE,n],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]},i={cN:"params",b:"\\(",e:"\\)",k:r},d=[t,a,s,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+e.IR+"::)?"+e.IR}]},s]},{cN:"function",bK:"def",e:" |$|;",r:0,c:[e.inherit(e.TM,{b:b}),i,s]},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":",c:[t,{b:b}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+e.RSR+")\\s*",c:[a,s,{cN:"regexp",c:[e.BE,n],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}],r:0}];n.c=d,i.c=d;var l="[>?]>",u="[\\w#]+\\(\\w+\\):\\d+:\\d+>",N="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",o=[{b:/^\s*=>/,cN:"status",starts:{e:"$",c:d}},{cN:"prompt",b:"^("+l+"|"+u+"|"+N+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,c:[s].concat(o).concat(d)}});hljs.registerLanguage("apache",function(e){var r={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"tag",b:"</?",e:">"},{cN:"keyword",b:/\w+/,r:0,k:{common:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",r]},r,e.QSM]}}],i:/\S/}});hljs.registerLanguage("python",function(e){var r={cN:"prompt",b:/^(>>>|\.\.\.) /},b={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[r],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[r],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},e.ASM,e.QSM]},l={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},c={cN:"params",b:/\(/,e:/\)/,c:["self",r,l,b]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[r,l,b,e.HCM,{v:[{cN:"function",bK:"def",r:10},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n]/,c:[e.UTM,c]},{cN:"decorator",b:/@/,e:/$/},{b:/\b(print|exec)\(/}]}});hljs.registerLanguage("javascript",function(r){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",r:10,v:[{b:/^\s*('|")use strict('|")/},{b:/^\s*('|")use asm('|")/}]},r.ASM,r.QSM,r.CLCM,r.CBCM,r.CNM,{b:"("+r.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[r.CLCM,r.CBCM,r.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[r.inherit(r.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[r.CLCM,r.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+r.IR,r:0}]}});hljs.registerLanguage("coffeescript",function(e){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"},n="[A-Za-z$_][0-9A-Za-z$_]*",t={cN:"subst",b:/#\{/,e:/}/,k:c},r=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,t]},{b:/"/,e:/"/,c:[e.BE,t]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[t,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{cN:"property",b:"@"+n},{b:"`",e:"`",eB:!0,eE:!0,sL:"javascript"}];t.c=r;var i=e.inherit(e.TM,{b:n}),s="(\\(.*\\))?\\s*\\B[-=]>",o={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(r)}]};return{aliases:["coffee","cson","iced"],k:c,i:/\/\*/,c:r.concat([{cN:"comment",b:"###",e:"###",c:[e.PWM]},e.HCM,{cN:"function",b:"^\\s*"+n+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,o]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[o]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{cN:"attribute",b:n+":",e:":",rB:!0,rE:!0,r:0}])}});hljs.registerLanguage("http",function(){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:!0}}]}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",a={cN:"function",b:c+"\\(",rB:!0,eE:!0,e:"\\("};return{cI:!0,i:"[=/|']",c:[e.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[a,e.ASM,e.QSM,e.CSSNM]}]},{cN:"tag",b:c,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[e.CBCM,{cN:"rule",b:"[^\\s]",rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{cN:"value",eW:!0,eE:!0,c:[a,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});hljs.registerLanguage("ini",function(e){return{cI:!0,i:/\S/,c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:!0,k:"on off true false yes no",c:[e.QSM,e.NM],r:0}]}]}});hljs.registerLanguage("objectivec",function(e){var t={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"NSString NSData NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView NSView NSViewController NSWindow NSWindowController NSSet NSUUID NSIndexSet UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection NSURLSession NSURLSessionDataTask NSURLSessionDownloadTask NSURLSessionUploadTask NSURLResponseUIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},o=/[a-zA-Z@][a-zA-Z0-9_]*/,a="@interface @class @protocol @implementation";return{aliases:["m","mm","objc","obj-c"],k:t,l:o,i:"</",c:[e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"preprocessor",b:"#",e:"$",c:[{cN:"title",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+a.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:a,l:o,c:[e.UTM]},{cN:"variable",b:"\\."+e.UIR,r:0}]}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)\}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,e.NM,s,a,t]}});hljs.registerLanguage("markdown",function(){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"link_reference",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link_url",e:"$"}}]}]}});hljs.registerLanguage("java",function(e){var a=e.UIR+"(<"+e.UIR+">)?",t="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",c="(\\b(0b[01_]+)|\\b0[xX][a-fA-F0-9_]+|(\\b[\\d_]+(\\.[\\d_]*)?|\\.[\\d_]+)([eE][-+]?\\d+)?)[lLfF]?",r={cN:"number",b:c,r:0};return{aliases:["jsp"],k:t,i:/<\//,c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",r:0,c:[{cN:"javadoctag",b:"(^|\\s)@[A-Za-z]+"}]},e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return",r:0},{cN:"function",b:"("+a+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:t,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},r,{cN:"annotation",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("diff",function(){return{aliases:["patch"],c:[{cN:"chunk",r:10,v:[{b:/^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"header",v:[{b:/Index: /,e:/$/},{b:/=====/,e:/=====$/},{b:/^\-\-\-/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+\+\+/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}});hljs.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},s={b:"->{",e:"}"},n={cN:"variable",v:[{b:/\$\d/},{b:/[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/},{b:/[\$\%\@][^\s\w{]/,r:0}]},o={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5},i=[e.BE,r,n],c=[n,e.HCM,o,{cN:"comment",b:"^\\=\\w",e:"\\=cut",eW:!0},s,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,o,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"sub",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",r:5},{cN:"operator",b:"-\\w\\b",r:0}];return r.c=c,s.c=c,{aliases:["pl"],k:t,c:c}});hljs.registerLanguage("makefile",function(e){var a={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{cN:"constant",e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[a]}}},{cN:"title",b:/^[\w]+:\s*$/},{cN:"phony",b:/^\.PHONY:/,e:/$/,k:".PHONY",l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,a]}]}});hljs.registerLanguage("cs",function(e){var r="abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",t=e.IR+"(<"+e.IR+">)?";return{aliases:["csharp"],k:r,i:/::/,c:[{cN:"comment",b:"///",e:"$",rB:!0,c:[{cN:"xmlDocTag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]},e.CLCM,e.CBCM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line region endregion pragma checksum"},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},e.ASM,e.QSM,e.CNM,{bK:"class namespace interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"new return throw await",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}});hljs.registerLanguage("json",function(e){var t={literal:"true false null"},i=[e.QSM,e.CNM],l={cN:"value",e:",",eW:!0,eE:!0,c:i,k:t},c={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[e.BE],i:"\\n",starts:l}],i:"\\S"},n={b:"\\[",e:"\\]",c:[e.inherit(l,{cN:null})],i:"\\S"};return i.splice(i.length,0,c,n),{c:i,k:t,i:"\\S"}});hljs.registerLanguage("nginx",function(e){var r={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},b={eW:!0,l:"[a-z/_]+",k:{built_in:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,r],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{cN:"url",b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[r]},{cN:"regexp",c:[e.BE,r],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},r]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"title",b:e.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("sql",function(e){var t={cN:"comment",b:"--",e:"$"};return{cI:!0,i:/[<>]/,c:[{cN:"operator",bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",e:/;/,eW:!0,k:{keyword:"abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}});hljs.registerLanguage("xml",function(){var t="[A-Za-z0-9\\._:-]+",e={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"},c={eW:!0,i:/</,r:0,c:[e,{cN:"attribute",b:t,r:0},{b:"=",r:0,c:[{cN:"value",c:[e],v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[c],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[c],starts:{e:"</script>",rE:!0,sL:"javascript"}},e,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:/[^ \/><\n\t]+/,r:0},c]}]}});hljs.registerLanguage("php",function(e){var c={cN:"variable",b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},i={cN:"preprocessor",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,i],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.CLCM,e.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"},i]},{cN:"comment",b:"__halt_compiler.+?;",eW:!0,k:"__halt_compiler",l:e.UIR},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[e.BE]},i,c,{b:/->+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}});


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/identicon.js ---- */


/**
 * Identicon.js v1.0
 * http://github.com/stewartlord/identicon.js
 *
 * Requires PNGLib
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2013, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */

(function() {
    Identicon = function(hash, size, margin){
        this.hash   = hash;
        this.size   = size   || 64;
        this.margin = margin || .08;
    }

    Identicon.prototype = {
        hash:   null,
        size:   null,
        margin: null,

        render: function(){
            var hash    = this.hash,
                size    = this.size,
                margin  = Math.floor(size * this.margin),
                cell    = Math.floor((size - (margin * 2)) / 5),
                image   = new PNGlib(size, size, 256);

            // light-grey background
            var bg      = image.color(240, 240, 240);

            // foreground is last 7 chars as hue at 50% saturation, 70% brightness
            var rgb     = this.hsl2rgb(parseInt(hash.substr(-7), 16) / 0xfffffff, .5, .7),
                fg      = image.color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);

            // the first 15 characters of the hash control the pixels (even/odd)
            // they are drawn down the middle first, then mirrored outwards
            var i, color;
            for (i = 0; i < 15; i++) {
                color = parseInt(hash.charAt(i), 16) % 2 ? bg : fg;
                if (i < 5) {
                    this.rectangle(2 * cell + margin, i * cell + margin, cell, cell, color, image);
                } else if (i < 10) {
                    this.rectangle(1 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                    this.rectangle(3 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                } else if (i < 15) {
                    this.rectangle(0 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                    this.rectangle(4 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                }
            }

            return image;
        },

        rectangle: function(x, y, w, h, color, image) {
            var i, j;
            for (i = x; i < x + w; i++) {
                for (j = y; j < y + h; j++) {
                    image.buffer[image.index(i, j)] = color;
                }
            }
        },

        // adapted from: https://gist.github.com/aemkei/1325937
        hsl2rgb: function(h, s, b){
            h *= 6;
            s = [
                b += s *= b < .5 ? b : 1 - b,
                b - h % 1 * s * 2,
                b -= s *= 2,
                b,
                b + h % 1 * s,
                b + s
            ];

            return[
                s[ ~~h    % 6 ],  // red
                s[ (h|16) % 6 ],  // green
                s[ (h|8)  % 6 ]   // blue
            ];
        },

        toString: function(){
            return this.render().getBase64();
        }
    }

    window.Identicon = Identicon;
})();


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/identicon_with_workaround.js ---- */


/**
 * Identicon.js v1.0
 * http://github.com/stewartlord/identicon.js
 *
 * Requires PNGLib
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2013, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */

(function() {
    Identicon_with_workaround = function(hash, size, margin){
        this.hash   = hash;
        this.size   = size   || 64;
        this.margin = margin || .08;
    }

    Identicon_with_workaround.prototype = {
        hash:   null,
        size:   null,
        margin: null,

        render: function(){
            var hash    = this.hash,
                size    = this.size,
                margin  = Math.floor(size * this.margin),
                cell    = Math.floor((size - (margin * 2)) / 5),
                image   = new PNGlib(size, size, 256);

            // light-grey background
            var bg      = image.color(240, 240, 240);

            // foreground color
            var random_from_hash = function (hash) {
                return parseInt(sha256.hex(hash).substr(-7), 16) / 0xfffffff;
            };
            var hue          = random_from_hash(hash);
            var saturation   = 0.5 + random_from_hash(hash + "s") * 0.2;
            var brightness   = 0.5 + random_from_hash(hash + "b") * 0.2;
            var rgb     = this.hsl2rgb(hue, saturation, brightness),
                fg      = image.color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);

            // the first 15 characters of the hash control the pixels (even/odd)
            // they are drawn down the middle first, then mirrored outwards
            var i, color;
            for (i = 0; i < 15; i++) {
                color = parseInt(hash.charAt(i), 16) % 2 ? bg : fg;
                if (i < 5) {
                    this.rectangle(2 * cell + margin, i * cell + margin, cell, cell, color, image);
                } else if (i < 10) {
                    this.rectangle(1 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                    this.rectangle(3 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                } else if (i < 15) {
                    this.rectangle(0 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                    this.rectangle(4 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                }
            }

            return image;
        },

        rectangle: function(x, y, w, h, color, image) {
            var i, j;
            for (i = x; i < x + w; i++) {
                for (j = y; j < y + h; j++) {
                    image.buffer[image.index(i, j)] = color;
                }
            }
        },

        // adapted from: https://gist.github.com/aemkei/1325937
        hsl2rgb: function(h, s, b){
            h *= 6;
            s = [
                b += s *= b < .5 ? b : 1 - b,
                b - h % 1 * s * 2,
                b -= s *= 2,
                b,
                b + h % 1 * s,
                b + s
            ];

            return[
                s[ ~~h    % 6 ],  // red
                s[ (h|16) % 6 ],  // green
                s[ (h|8)  % 6 ]   // blue
            ];
        },

        toString: function(){
            return this.render().getBase64();
        }
    }

    window.Identicon_with_workaround = Identicon_with_workaround;
})();


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/imagesloaded.pkgd.js ---- */


/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});




/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/jquery.cssanim.coffee ---- */


(function() {
  jQuery.fn.cssSlideDown = function() {
    var elem;
    elem = this;
    elem.css({
      "display": "none"
    });
    elem.children(":first").css({
      "margin-top": 0
    });
    elem.css({
      "opacity": 0,
      "margin-bottom": 0,
      "margin-top": 0,
      "padding-bottom": 0,
      "padding-top": 0,
      "transform": "scale(0.5)"
    });
    setTimeout((function() {
      var height;
      elem.css({
        "height": "auto",
        "display": ""
      });
      height = elem.outerHeight();
      elem.css({
        "height": 0,
        "display": ""
      });
      elem.cssLater("transition", "all 0.3s ease-out", 20);
      elem.cssLater({
        "height": height,
        "opacity": 1,
        "margin-bottom": "",
        "margin-top": "",
        "padding-bottom": "",
        "padding-top": "",
        "transform": "scale(1)"
      }, null, 40);
      return elem.cssLater({
        "transition": "",
        "transform": "",
        height: "auto"
      }, null, 400, "noclear");
    }), 10);
    return this;
  };

  jQuery.fn.cssSlideUp = function() {
    var elem, height;
    elem = this;
    height = elem.outerHeight();
    elem.css({
      "height": height
    });
    elem.css("transition", "all 0.3s ease-out");
    setTimeout((function() {
      elem.cssLater({
        "opacity": 0,
        "margin-bottom": 0,
        "margin-top": 0,
        "padding-bottom": 0,
        "padding-top": 0,
        "transform": "scale(0.5)",
        "height": 0
      }, null, 10);
      return elem.cssLater({
        "transition": "",
        "transform": "",
        "display": "none"
      }, null, 400, "noclear");
    }), 10);
    return this;
  };

  jQuery.fn.fancySlideDown = function() {
    var elem;
    elem = this;
    return elem.css({
      "opacity": 0,
      "transform": "scale(0.9)"
    }).slideDown().animate({
      "opacity": 1,
      "scale": 1
    }, {
      "duration": 600,
      "queue": false,
      "easing": "easeOutBack"
    });
  };

  jQuery.fn.fancySlideUp = function() {
    var elem;
    elem = this;
    return elem.delay(600).slideUp(600).animate({
      "opacity": 0,
      "scale": 0.9
    }, {
      "duration": 600,
      "queue": false,
      "easing": "easeOutQuad"
    });
  };

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/jquery.csslater.coffee ---- */


(function() {
  jQuery.fn.readdClass = function(class_name) {
    var elem;
    elem = this;
    elem.removeClass(class_name);
    setTimeout((function() {
      return elem.addClass(class_name);
    }), 1);
    return this;
  };

  jQuery.fn.removeLater = function(time) {
    var elem;
    if (time == null) {
      time = 500;
    }
    elem = this;
    setTimeout((function() {
      return elem.remove();
    }), time);
    return this;
  };

  jQuery.fn.hideLater = function(time) {
    if (time == null) {
      time = 500;
    }
    this.cssLater("display", "none", time);
    return this;
  };

  jQuery.fn.addClassLater = function(class_name, time, mode) {
    var base, elem, timers;
    if (time == null) {
      time = 5;
    }
    if (mode == null) {
      mode = "clear";
    }
    elem = this;
    if ((base = elem[0]).timers == null) {
      base.timers = {};
    }
    timers = elem[0].timers;
    if (timers[class_name] && mode === "clear") {
      clearInterval(timers[class_name]);
    }
    timers[class_name] = setTimeout((function() {
      return elem.addClass(class_name);
    }), time);
    return this;
  };

  jQuery.fn.removeClassLater = function(class_name, time, mode) {
    var base, elem, timers;
    if (time == null) {
      time = 500;
    }
    if (mode == null) {
      mode = "clear";
    }
    elem = this;
    if ((base = elem[0]).timers == null) {
      base.timers = {};
    }
    timers = elem[0].timers;
    if (timers[class_name] && mode === "clear") {
      clearInterval(timers[class_name]);
    }
    timers[class_name] = setTimeout((function() {
      return elem.removeClass(class_name);
    }), time);
    return this;
  };

  jQuery.fn.cssLater = function(name, val, time, mode) {
    var base, elem, timers;
    if (time == null) {
      time = 500;
    }
    if (mode == null) {
      mode = "clear";
    }
    elem = this;
    if ((base = elem[0]).timers == null) {
      base.timers = {};
    }
    timers = elem[0].timers;
    if (timers[name] && mode === "clear") {
      clearInterval(timers[name]);
    }
    if (time === "now") {
      elem.css(name, val);
    } else {
      timers[name] = setTimeout((function() {
        return elem.css(name, val);
      }), time);
    }
    return this;
  };

  jQuery.fn.toggleClassLater = function(name, val, time, mode) {
    var base, elem, timers;
    if (time == null) {
      time = 10;
    }
    if (mode == null) {
      mode = "clear";
    }
    elem = this;
    if ((base = elem[0]).timers == null) {
      base.timers = {};
    }
    timers = elem[0].timers;
    if (timers[name] && mode === "clear") {
      clearInterval(timers[name]);
    }
    timers[name] = setTimeout((function() {
      return elem.toggleClass(name, val);
    }), time);
    return this;
  };

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/jquery.initialize.js ---- */


/*!
 * https://github.com/adampietrasiak/jquery.initialize
 *
 * Copyright (c) 2015-2016 Adam Pietrasiak
 * Released under the MIT license
 * https://github.com/timpler/jquery.initialize/blob/master/LICENSE
 *
 * This is based on MutationObserver
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
;(function ($) {

    "use strict";

    var combinators = [' ', '>', '+', '~']; // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#Combinators
    var fraternisers = ['+', '~']; // These combinators involve siblings.
    var complexTypes = ['ATTR', 'PSEUDO', 'ID', 'CLASS']; // These selectors are based upon attributes.

    // Understand what kind of selector the initializer is based upon.
    function grok(msobserver) {
        if (!$.find.tokenize) {
            // This is an old version of jQuery, so cannot parse the selector.
            // Therefore we must assume the worst case scenario. That is, that
            // this is a complicated selector. This feature was available in:
            // https://github.com/jquery/sizzle/issues/242
            msobserver.isCombinatorial = true;
            msobserver.isFraternal = true;
            msobserver.isComplex = true;
            return;
        }

        // Parse the selector.
        msobserver.isCombinatorial = false;
        msobserver.isFraternal = false;
        msobserver.isComplex = false;
        var token = $.find.tokenize(msobserver.selector);
        for (var i = 0; i < token.length; i++) {
            for (var j = 0; j < token[i].length; j++) {
                if (combinators.indexOf(token[i][j].type) != -1)
                    msobserver.isCombinatorial = true; // This selector uses combinators.

                if (fraternisers.indexOf(token[i][j].type) != -1)
                    msobserver.isFraternal = true; // This selector uses sibling combinators.

                if (complexTypes.indexOf(token[i][j].type) != -1)
                    msobserver.isComplex = true; // This selector is based on attributes.
            }
        }
    }

    // MutationSelectorObserver represents a selector and it's associated initialization callback.
    var MutationSelectorObserver = function (selector, callback, options) {
        this.selector = selector.trim();
        this.callback = callback;
        this.options = options;

        grok(this);
    };

    // List of MutationSelectorObservers.
    var msobservers = [];
    msobservers.initialize = function (selector, callback, options) {

        // Wrap the callback so that we can ensure that it is only
        // called once per element.
        var seen = [];
        var callbackOnce = function () {
            if (seen.indexOf(this) == -1) {
                seen.push(this);
                $(this).each(callback);
            }
        };

        // See if the selector matches any elements already on the page.
        $(options.target).find(selector).each(callbackOnce);

        // Then, add it to the list of selector observers.
        var msobserver = new MutationSelectorObserver(selector, callbackOnce, options)
        this.push(msobserver);

        // The MutationObserver watches for when new elements are added to the DOM.
        var observer = new MutationObserver(function (mutations) {
            var matches = [];

            // For each mutation.
            for (var m = 0; m < mutations.length; m++) {

                // If this is an attributes mutation, then the target is the node upon which the mutation occurred.
                if (mutations[m].type == 'attributes') {
                    // Check if the mutated node matchs.
                    if (mutations[m].target.matches(msobserver.selector))
                        matches.push(mutations[m].target);

                    // If the selector is fraternal, query siblings of the mutated node for matches.
                    if (msobserver.isFraternal)
                        matches.push.apply(matches, mutations[m].target.parentElement.querySelectorAll(msobserver.selector));
                    else
                        matches.push.apply(matches, mutations[m].target.querySelectorAll(msobserver.selector));
                }
                
                // If this is an childList mutation, then inspect added nodes.
                if (mutations[m].type == 'childList') {

                    // Search added nodes for matching selectors.
                    for (var n = 0; n < mutations[m].addedNodes.length; n++) {
                        if (!(mutations[m].addedNodes[n] instanceof Element)) continue;

                        // Check if the added node matches the selector
                        if (mutations[m].addedNodes[n].matches(msobserver.selector))
                            matches.push(mutations[m].addedNodes[n]);

                        // If the selector is fraternal, query siblings for matches.
                        if (msobserver.isFraternal)
                            matches.push.apply(matches, mutations[m].addedNodes[n].parentElement.querySelectorAll(msobserver.selector));
                        else
                            matches.push.apply(matches, mutations[m].addedNodes[n].querySelectorAll(msobserver.selector));
                    }
                }
            }

            // For each match, call the callback using jQuery.each() to initialize the element (once only.)
            for (var i = 0; i < matches.length; i++)
                $(matches[i]).each(msobserver.callback);
        });

        // Observe the target element.
        var defaultObeserverOpts = { childList: true, subtree: true, attributes: msobserver.isComplex };
        observer.observe(options.target, options.observer || defaultObeserverOpts );

        return observer;
    };

    // Deprecated API (does not work with jQuery >= 3.1.1):
    $.fn.initialize = function (callback, options) {
        return msobservers.initialize(this.selector, callback, $.extend({}, $.initialize.defaults, options));
    };

    // Supported API
    $.initialize = function (selector, callback, options) {
        return msobservers.initialize(selector, callback, $.extend({}, $.initialize.defaults, options));
    };

    // Options
    $.initialize.defaults = {
        target: document.documentElement, // Defaults to observe the entire document.
        observer: null // MutationObserverInit: Defaults to internal configuration if not provided.
    }

})(jQuery);



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/jquery.parentdata.coffee ---- */


(function() {
  jQuery.fn.parentData = function(key) {
    var data, p;
    data = this.data(key);
    if (data) {
      return data;
    }
    p = jQuery(this).parent();
    if (p.length === 0) {
      return null;
    }
    return p.parentData(key);
  };

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/marked.v0.3.19.min.js ---- */


/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function(e){"use strict";var t={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:f,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:f,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:f,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,text:/^[^\n]+/};function n(e){this.tokens=[],this.tokens.links={},this.options=e||k.defaults,this.rules=t.normal,this.options.gfm&&(this.options.tables?this.rules=t.tables:this.rules=t.gfm)}t._label=/(?:\\[\[\]]|[^\[\]])+/,t._title=/(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/,t.def=p(t.def).replace("label",t._label).replace("title",t._title).getRegex(),t.bullet=/(?:[*+-]|\d+\.)/,t.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,t.item=p(t.item,"gm").replace(/bull/g,t.bullet).getRegex(),t.list=p(t.list).replace(/bull/g,t.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+t.def.source+")").getRegex(),t._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",t.html=p(t.html).replace("comment",/<!--[\s\S]*?-->/).replace("closed",/<(tag)[\s\S]+?<\/\1>/).replace("closing",/<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/).replace(/tag/g,t._tag).getRegex(),t.paragraph=p(t.paragraph).replace("hr",t.hr).replace("heading",t.heading).replace("lheading",t.lheading).replace("tag","<"+t._tag).getRegex(),t.blockquote=p(t.blockquote).replace("paragraph",t.paragraph).getRegex(),t.normal=d({},t),t.gfm=d({},t.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),t.gfm.paragraph=p(t.paragraph).replace("(?!","(?!"+t.gfm.fences.source.replace("\\1","\\2")+"|"+t.list.source.replace("\\1","\\3")+"|").getRegex(),t.tables=d({},t.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),n.rules=t,n.lex=function(e,t){return new n(t).lex(e)},n.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},n.prototype.token=function(e,n){var r,s,i,l,o,a,h,p,u,c,g;for(e=e.replace(/^ +$/gm,"");e;)if((i=this.rules.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]||""});else if(i=this.rules.heading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(n&&(i=this.rules.nptable.exec(e))){for(e=e.substring(i[0].length),a={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},p=0;p<a.align.length;p++)/^ *-+: *$/.test(a.align[p])?a.align[p]="right":/^ *:-+: *$/.test(a.align[p])?a.align[p]="center":/^ *:-+ *$/.test(a.align[p])?a.align[p]="left":a.align[p]=null;for(p=0;p<a.cells.length;p++)a.cells[p]=a.cells[p].split(/ *\| */);this.tokens.push(a)}else if(i=this.rules.hr.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,n),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(e)){for(e=e.substring(i[0].length),g=(l=i[2]).length>1,this.tokens.push({type:"list_start",ordered:g,start:g?+l:""}),r=!1,c=(i=i[0].match(this.rules.item)).length,p=0;p<c;p++)h=(a=i[p]).length,~(a=a.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(h-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+h+"}","gm"),"")),this.options.smartLists&&p!==c-1&&(l===(o=t.bullet.exec(i[p+1])[0])||l.length>1&&o.length>1||(e=i.slice(p+1).join("\n")+e,p=c-1)),s=r||/\n\n(?!\s*$)/.test(a),p!==c-1&&(r="\n"===a.charAt(a.length-1),s||(s=r)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(a,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(e))e=e.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===i[1]||"script"===i[1]||"style"===i[1]),text:i[0]});else if(n&&(i=this.rules.def.exec(e)))e=e.substring(i[0].length),i[3]&&(i[3]=i[3].substring(1,i[3].length-1)),u=i[1].toLowerCase(),this.tokens.links[u]||(this.tokens.links[u]={href:i[2],title:i[3]});else if(n&&(i=this.rules.table.exec(e))){for(e=e.substring(i[0].length),a={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},p=0;p<a.align.length;p++)/^ *-+: *$/.test(a.align[p])?a.align[p]="right":/^ *:-+: *$/.test(a.align[p])?a.align[p]="center":/^ *:-+ *$/.test(a.align[p])?a.align[p]="left":a.align[p]=null;for(p=0;p<a.cells.length;p++)a.cells[p]=a.cells[p].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(a)}else if(i=this.rules.lheading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(n&&(i=this.rules.paragraph.exec(e)))e=e.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1].charAt(i[1].length-1)?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var r={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:f,tag:/^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:f,text:/^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/};function s(e,t){if(this.options=t||k.defaults,this.links=e,this.rules=r.normal,this.renderer=this.options.renderer||new i,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=r.breaks:this.rules=r.gfm:this.options.pedantic&&(this.rules=r.pedantic)}function i(e){this.options=e||{}}function l(){}function o(e){this.tokens=[],this.token=null,this.options=e||k.defaults,this.options.renderer=this.options.renderer||new i,this.renderer=this.options.renderer,this.renderer.options=this.options}function a(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function h(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function p(e,t){return e=e.source,t=t||"",{replace:function(t,n){return n=(n=n.source||n).replace(/(^|[^\[])\^/g,"$1"),e=e.replace(t,n),this},getRegex:function(){return new RegExp(e,t)}}}function u(e,t){return c[" "+e]||(/^[^:]+:\/*[^/]*$/.test(e)?c[" "+e]=e+"/":c[" "+e]=e.replace(/[^/]*$/,"")),e=c[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+t:e+t}r._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,r._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,r.autolink=p(r.autolink).replace("scheme",r._scheme).replace("email",r._email).getRegex(),r._inside=/(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/,r._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,r.link=p(r.link).replace("inside",r._inside).replace("href",r._href).getRegex(),r.reflink=p(r.reflink).replace("inside",r._inside).getRegex(),r.normal=d({},r),r.pedantic=d({},r.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),r.gfm=d({},r.normal,{escape:p(r.escape).replace("])","~|])").getRegex(),url:p(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("email",r._email).getRegex(),_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:p(r.text).replace("]|","~]|").replace("|","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|").getRegex()}),r.breaks=d({},r.gfm,{br:p(r.br).replace("{2,}","*").getRegex(),text:p(r.gfm.text).replace("{2,}","*").getRegex()}),s.rules=r,s.output=function(e,t,n){return new s(t,n).output(e)},s.prototype.output=function(e){for(var t,n,r,s,i="";e;)if(s=this.rules.escape.exec(e))e=e.substring(s[0].length),i+=s[1];else if(s=this.rules.autolink.exec(e))e=e.substring(s[0].length),r="@"===s[2]?"mailto:"+(n=a(this.mangle(s[1]))):n=a(s[1]),i+=this.renderer.link(r,null,n);else if(this.inLink||!(s=this.rules.url.exec(e))){if(s=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),e=e.substring(s[0].length),i+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):a(s[0]):s[0];else if(s=this.rules.link.exec(e))e=e.substring(s[0].length),this.inLink=!0,i+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(e))||(s=this.rules.nolink.exec(e))){if(e=e.substring(s[0].length),t=(s[2]||s[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){i+=s[0].charAt(0),e=s[0].substring(1)+e;continue}this.inLink=!0,i+=this.outputLink(s,t),this.inLink=!1}else if(s=this.rules.strong.exec(e))e=e.substring(s[0].length),i+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(e))e=e.substring(s[0].length),i+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(e))e=e.substring(s[0].length),i+=this.renderer.codespan(a(s[2].trim(),!0));else if(s=this.rules.br.exec(e))e=e.substring(s[0].length),i+=this.renderer.br();else if(s=this.rules.del.exec(e))e=e.substring(s[0].length),i+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),i+=this.renderer.text(a(this.smartypants(s[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else s[0]=this.rules._backpedal.exec(s[0])[0],e=e.substring(s[0].length),"@"===s[2]?r="mailto:"+(n=a(s[0])):(n=a(s[0]),r="www."===s[1]?"http://"+n:n),i+=this.renderer.link(r,null,n);return i},s.prototype.outputLink=function(e,t){var n=a(t.href),r=t.title?a(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,a(e[1]))},s.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},s.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;s<r;s++)t=e.charCodeAt(s),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},i.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+a(t,!0)+'">'+(n?e:a(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:a(e,!0))+"\n</code></pre>"},i.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},i.prototype.html=function(e){return e},i.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},i.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},i.prototype.list=function(e,t,n){var r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"},i.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},i.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},i.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},i.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},i.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},i.prototype.strong=function(e){return"<strong>"+e+"</strong>"},i.prototype.em=function(e){return"<em>"+e+"</em>"},i.prototype.codespan=function(e){return"<code>"+e+"</code>"},i.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},i.prototype.del=function(e){return"<del>"+e+"</del>"},i.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(h(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return n}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return n}this.options.baseUrl&&!g.test(e)&&(e=u(this.options.baseUrl,e));var s='<a href="'+e+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>"},i.prototype.image=function(e,t,n){this.options.baseUrl&&!g.test(e)&&(e=u(this.options.baseUrl,e));var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},i.prototype.text=function(e){return e},l.prototype.strong=l.prototype.em=l.prototype.codespan=l.prototype.del=l.prototype.text=function(e){return e},l.prototype.link=l.prototype.image=function(e,t,n){return""+n},l.prototype.br=function(){return""},o.parse=function(e,t){return new o(t).parse(e)},o.prototype.parse=function(e){this.inline=new s(e.links,this.options),this.inlineText=new s(e.links,d({},this.options,{renderer:new l})),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},o.prototype.next=function(){return this.token=this.tokens.pop()},o.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},o.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},o.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,h(this.inlineText.output(this.token.text)));case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s="",i="";for(n="",e=0;e<this.token.header.length;e++)n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});i+=this.renderer.tablerow(n)}return this.renderer.table(s,i);case"blockquote_start":for(i="";"blockquote_end"!==this.next().type;)i+=this.tok();return this.renderer.blockquote(i);case"list_start":i="";for(var l=this.token.ordered,o=this.token.start;"list_end"!==this.next().type;)i+=this.tok();return this.renderer.list(i,l,o);case"list_item_start":for(i="";"list_item_end"!==this.next().type;)i+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(i);case"loose_item_start":for(i="";"list_item_end"!==this.next().type;)i+=this.tok();return this.renderer.listitem(i);case"html":var a=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(a);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}};var c={},g=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function f(){}function d(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function k(e,t,r){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(r||"function"==typeof t){r||(r=t,t=null);var s,i,l=(t=d({},k.defaults,t||{})).highlight,h=0;try{s=n.lex(e,t)}catch(e){return r(e)}i=s.length;var p=function(e){if(e)return t.highlight=l,r(e);var n;try{n=o.parse(s,t)}catch(t){e=t}return t.highlight=l,e?r(e):r(null,n)};if(!l||l.length<3)return p();if(delete t.highlight,!i)return p();for(;h<s.length;h++)!function(e){"code"!==e.type?--i||p():l(e.text,e.lang,function(t,n){return t?p(t):null==n||n===e.text?--i||p():(e.text=n,e.escaped=!0,void(--i||p()))})}(s[h])}else try{return t&&(t=d({},k.defaults,t)),o.parse(n.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||k.defaults).silent)return"<p>An error occurred:</p><pre>"+a(e.message+"",!0)+"</pre>";throw e}}f.exec=f,k.options=k.setOptions=function(e){return d(k.defaults,e),k},k.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new i,xhtml:!1,baseUrl:null},k.Parser=o,k.parser=o.parse,k.Renderer=i,k.TextRenderer=l,k.Lexer=n,k.lexer=n.lex,k.InlineLexer=s,k.inlineLexer=s.output,k.parse=k,"undefined"!=typeof module&&"object"==typeof exports?module.exports=k:"function"==typeof define&&define.amd?define(function(){return k}):e.marked=k}(this||("undefined"!=typeof window?window:global));


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/pnglib.js ---- */


/**
* A handy class to calculate color values.
*
* @version 1.0
* @author Robert Eisele <robert@xarg.org>
* @copyright Copyright (c) 2010, Robert Eisele
* @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
* @license http://www.opensource.org/licenses/bsd-license.php BSD License
*
*/

(function() {

	// helper functions for that ctx
	function write(buffer, offs) {
		for (var i = 2; i < arguments.length; i++) {
			for (var j = 0; j < arguments[i].length; j++) {
				buffer[offs++] = arguments[i].charAt(j);
			}
		}
	}

	function byte2(w) {
		return String.fromCharCode((w >> 8) & 255, w & 255);
	}

	function byte4(w) {
		return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
	}

	function byte2lsb(w) {
		return String.fromCharCode(w & 255, (w >> 8) & 255);
	}

	window.PNGlib = function(width,height,depth) {

		this.width   = width;
		this.height  = height;
		this.depth   = depth;

		// pixel data and row filter identifier size
		this.pix_size = height * (width + 1);

		// deflate header, pix_size, block headers, adler32 checksum
		this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;

		// offsets and sizes of Png chunks
		this.ihdr_offs = 0;									// IHDR offset and size
		this.ihdr_size = 4 + 4 + 13 + 4;
		this.plte_offs = this.ihdr_offs + this.ihdr_size;	// PLTE offset and size
		this.plte_size = 4 + 4 + 3 * depth + 4;
		this.trns_offs = this.plte_offs + this.plte_size;	// tRNS offset and size
		this.trns_size = 4 + 4 + depth + 4;
		this.idat_offs = this.trns_offs + this.trns_size;	// IDAT offset and size
		this.idat_size = 4 + 4 + this.data_size + 4;
		this.iend_offs = this.idat_offs + this.idat_size;	// IEND offset and size
		this.iend_size = 4 + 4 + 4;
		this.buffer_size  = this.iend_offs + this.iend_size;	// total PNG size

		this.buffer  = new Array();
		this.palette = new Object();
		this.pindex  = 0;

		var _crc32 = new Array();

		// initialize buffer with zero bytes
		for (var i = 0; i < this.buffer_size; i++) {
			this.buffer[i] = "\x00";
		}

		// initialize non-zero elements
		write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
		write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
		write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
		write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
		write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');

		// initialize deflate header
		var header = ((8 + (7 << 4)) << 8) | (3 << 6);
		header+= 31 - (header % 31);

		write(this.buffer, this.idat_offs + 8, byte2(header));

		// initialize deflate block headers
		for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {
			var size, bits;
			if (i + 0xffff < this.pix_size) {
				size = 0xffff;
				bits = "\x00";
			} else {
				size = this.pix_size - (i << 16) - i;
				bits = "\x01";
			}
			write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
		}

		/* Create crc32 lookup table */
		for (var i = 0; i < 256; i++) {
			var c = i;
			for (var j = 0; j < 8; j++) {
				if (c & 1) {
					c = -306674912 ^ ((c >> 1) & 0x7fffffff);
				} else {
					c = (c >> 1) & 0x7fffffff;
				}
			}
			_crc32[i] = c;
		}

		// compute the index into a png for a given pixel
		this.index = function(x,y) {
			var i = y * (this.width + 1) + x + 1;
			var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
			return j;
		}

		// convert a color and build up the palette
		this.color = function(red, green, blue, alpha) {

			alpha = alpha >= 0 ? alpha : 255;
			var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

			if (typeof this.palette[color] == "undefined") {
				if (this.pindex == this.depth) return "\x00";

				var ndx = this.plte_offs + 8 + 3 * this.pindex;

				this.buffer[ndx + 0] = String.fromCharCode(red);
				this.buffer[ndx + 1] = String.fromCharCode(green);
				this.buffer[ndx + 2] = String.fromCharCode(blue);
				this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);

				this.palette[color] = String.fromCharCode(this.pindex++);
			}
			return this.palette[color];
		}

		// output a PNG string, Base64 encoded
		this.getBase64 = function() {

			var s = this.getDump();

			var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var c1, c2, c3, e1, e2, e3, e4;
			var l = s.length;
			var i = 0;
			var r = "";

			do {
				c1 = s.charCodeAt(i);
				e1 = c1 >> 2;
				c2 = s.charCodeAt(i+1);
				e2 = ((c1 & 3) << 4) | (c2 >> 4);
				c3 = s.charCodeAt(i+2);
				if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
				if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
				r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
			} while ((i+= 3) < l);
			return r;
		}

		// output a PNG string
		this.getDump = function() {

			// compute adler32 of output pixels + row filter bytes
			var BASE = 65521; /* largest prime smaller than 65536 */
			var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
			var s1 = 1;
			var s2 = 0;
			var n = NMAX;

			for (var y = 0; y < this.height; y++) {
				for (var x = -1; x < this.width; x++) {
					s1+= this.buffer[this.index(x, y)].charCodeAt(0);
					s2+= s1;
					if ((n-= 1) == 0) {
						s1%= BASE;
						s2%= BASE;
						n = NMAX;
					}
				}
			}
			s1%= BASE;
			s2%= BASE;
			write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));

			// compute crc32 of the PNG chunks
			function crc32(png, offs, size) {
				var crc = -1;
				for (var i = 4; i < size-4; i += 1) {
					crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
				}
				write(png, offs+size-4, byte4(crc ^ -1));
			}

			crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
			crc32(this.buffer, this.plte_offs, this.plte_size);
			crc32(this.buffer, this.trns_offs, this.trns_size);
			crc32(this.buffer, this.idat_offs, this.idat_size);
			crc32(this.buffer, this.iend_offs, this.iend_size);

			// convert PNG to string
			return "\211PNG\r\n\032\n"+this.buffer.join('');
		}
	}

})();



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/sha256.js ---- */


/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, is224) {
    return function (message) {
      return new Sha256(is224, true).update(message)[outputType]();
    };
  };

  var createMethod = function (is224) {
    var method = createOutputMethod('hex', is224);
    if (NODE_JS) {
      method = nodeWrap(method, is224);
    }
    method.create = function () {
      return new Sha256(is224);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, is224);
    }
    return method;
  };

  var nodeWrap = function (method, is224) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var algorithm = is224 ? 'sha224' : 'sha256';
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw new Error(ERROR);
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  var createHmacOutputMethod = function (outputType, is224) {
    return function (key, message) {
      return new HmacSha256(key, is224, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (is224) {
    var method = createHmacOutputMethod('hex', is224);
    method.create = function (key) {
      return new HmacSha256(key, is224);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, is224);
    }
    return method;
  };

  function Sha256(is224, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (is224) {
      this.h0 = 0xc1059ed8;
      this.h1 = 0x367cd507;
      this.h2 = 0x3070dd17;
      this.h3 = 0xf70e5939;
      this.h4 = 0xffc00b31;
      this.h5 = 0x68581511;
      this.h6 = 0x64f98fa7;
      this.h7 = 0xbefa4fa4;
    } else { // 256
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
    }

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
    this.is224 = is224;
  }

  Sha256.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha256.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha256.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6,
      h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

    for (j = 16; j < 64; ++j) {
      // rightrotate
      t1 = blocks[j - 15];
      s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
      t1 = blocks[j - 2];
      s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
      blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
    }

    bc = b & c;
    for (j = 0; j < 64; j += 4) {
      if (this.first) {
        if (this.is224) {
          ab = 300032;
          t1 = blocks[0] - 1413257819;
          h = t1 - 150054599 << 0;
          d = t1 + 24177077 << 0;
        } else {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = t1 - 1521486534 << 0;
          d = t1 + 143694565 << 0;
        }
        this.first = false;
      } else {
        s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        ab = a & b;
        maj = ab ^ (a & c) ^ bc;
        ch = (e & f) ^ (~e & g);
        t1 = h + s1 + ch + K[j] + blocks[j];
        t2 = s0 + maj;
        h = d + t1 << 0;
        d = t1 + t2 << 0;
      }
      s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
      s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
      da = d & a;
      maj = da ^ (d & b) ^ ab;
      ch = (h & e) ^ (~h & f);
      t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
      t2 = s0 + maj;
      g = c + t1 << 0;
      c = t1 + t2 << 0;
      s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
      s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
      cd = c & d;
      maj = cd ^ (c & a) ^ da;
      ch = (g & h) ^ (~g & e);
      t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
      t2 = s0 + maj;
      f = b + t1 << 0;
      b = t1 + t2 << 0;
      s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
      s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
      bc = b & c;
      maj = bc ^ (b & d) ^ cd;
      ch = (f & g) ^ (~f & h);
      t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
      t2 = s0 + maj;
      e = a + t1 << 0;
      a = t1 + t2 << 0;
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
    this.h5 = this.h5 + f << 0;
    this.h6 = this.h6 + g << 0;
    this.h7 = this.h7 + h << 0;
  };

  Sha256.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
      HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
      HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
      HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
      HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
      HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
      HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
      HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
      HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
      HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
      HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
      HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
    if (!this.is224) {
      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
        HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
        HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
        HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }
    return hex;
  };

  Sha256.prototype.toString = Sha256.prototype.hex;

  Sha256.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var arr = [
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
      (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
      (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
    ];
    if (!this.is224) {
      arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
    }
    return arr;
  };

  Sha256.prototype.array = Sha256.prototype.digest;

  Sha256.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    dataView.setUint32(20, this.h5);
    dataView.setUint32(24, this.h6);
    if (!this.is224) {
      dataView.setUint32(28, this.h7);
    }
    return buffer;
  };

  function HmacSha256(key, is224, sharedMemory) {
    var i, type = typeof key;
    if (type === 'string') {
      var bytes = [], length = key.length, index = 0, code;
      for (i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    } else {
      if (type === 'object') {
        if (key === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
    }

    if (key.length > 64) {
      key = (new Sha256(is224, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (i = 0; i < 64; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha256.call(this, is224, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha256.prototype = new Sha256();

  HmacSha256.prototype.finalize = function () {
    Sha256.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha256.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha256.prototype.finalize.call(this);
    }
  };

  var exports = createMethod();
  exports.sha256 = exports;
  exports.sha224 = createMethod(true);
  exports.sha256.hmac = createHmacMethod();
  exports.sha224.hmac = createHmacMethod(true);

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }
})();



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/string.utils.js ---- */



String.prototype.removePrefix = function (prefix) {
    const hasPrefix = this.indexOf(prefix) === 0;
    return hasPrefix ? this.substr(prefix.length) : this.toString();
};




/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/00-lib/zoom.min.js ---- */


/**
 * zoom.js - It's the best way to zoom an image
 * @version v0.0.2
 * @link https://github.com/fat/zoom.js
 * @license MIT
 */

+function ($) { "use strict";

  /**
   * The zoom service
   */
  function ZoomService () {
    this._activeZoom            =
    this._initialScrollPosition =
    this._initialTouchPosition  =
    this._touchMoveListener     = null

    this._$document = $(document)
    this._$window   = $(window)
    this._$body     = $(document.body)

    this._boundClick = $.proxy(this._clickHandler, this)
  }

  ZoomService.prototype.listen = function () {
    this._$body.on('click', '[data-action="zoom"]', $.proxy(this._zoom, this))
  }

  ZoomService.prototype._zoom = function (e) {
    var target = e.target

    if (!target || target.tagName != 'IMG') return

    if (this._$body.hasClass('zoom-overlay-open')) return

    if (e.metaKey || e.ctrlKey) {
      return window.open((e.target.getAttribute('data-original') || e.target.src), '_blank')
    }

    if (target.width >= ($(window).width() - Zoom.OFFSET)) return

    this._activeZoomClose(true)

    this._activeZoom = new Zoom(target)
    this._activeZoom.zoomImage()

    // todo(fat): probably worth throttling this
    this._$window.on('scroll.zoom', $.proxy(this._scrollHandler, this))

    this._$document.on('keyup.zoom', $.proxy(this._keyHandler, this))
    this._$document.on('touchstart.zoom', $.proxy(this._touchStart, this))

    // we use a capturing phase here to prevent unintended js events
    // sadly no useCapture in jquery api (http://bugs.jquery.com/ticket/14953)
    if (document.addEventListener) {
      document.addEventListener('click', this._boundClick, true)
    } else {
      document.attachEvent('onclick', this._boundClick, true)
    }

    if ('bubbles' in e) {
      if (e.bubbles) e.stopPropagation()
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }
  }

  ZoomService.prototype._activeZoomClose = function (forceDispose) {
    if (!this._activeZoom) return

    if (forceDispose) {
      this._activeZoom.dispose()
    } else {
      this._activeZoom.close()
    }

    this._$window.off('.zoom')
    this._$document.off('.zoom')

    document.removeEventListener('click', this._boundClick, true)

    this._activeZoom = null
  }

  ZoomService.prototype._scrollHandler = function (e) {
    if (this._initialScrollPosition === null) this._initialScrollPosition = $(window).scrollTop()
    var deltaY = this._initialScrollPosition - $(window).scrollTop()
    if (Math.abs(deltaY) >= 40) this._activeZoomClose()
  }

  ZoomService.prototype._keyHandler = function (e) {
    if (e.keyCode == 27) this._activeZoomClose()
  }

  ZoomService.prototype._clickHandler = function (e) {
    if (e.preventDefault) e.preventDefault()
    else event.returnValue = false

    if ('bubbles' in e) {
      if (e.bubbles) e.stopPropagation()
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }

    this._activeZoomClose()
  }

  ZoomService.prototype._touchStart = function (e) {
    this._initialTouchPosition = e.touches[0].pageY
    $(e.target).on('touchmove.zoom', $.proxy(this._touchMove, this))
  }

  ZoomService.prototype._touchMove = function (e) {
    if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
      this._activeZoomClose()
      $(e.target).off('touchmove.zoom')
    }
  }


  /**
   * The zoom object
   */
  function Zoom (img) {
    this._fullHeight      =
    this._fullWidth       =
    this._overlay         =
    this._targetImageWrap = null

    this._targetImage = img

    this._$body = $(document.body)
  }

  Zoom.OFFSET = 80
  Zoom._MAX_WIDTH = 2560
  Zoom._MAX_HEIGHT = 4096

  Zoom.prototype.zoomImage = function () {
    var img = document.createElement('img')
    img.onload = $.proxy(function () {
      this._fullHeight = Number(img.height)
      this._fullWidth = Number(img.width)
      this._zoomOriginal()
    }, this)
    img.src = this._targetImage.src
  }

  Zoom.prototype._zoomOriginal = function () {
    this._targetImageWrap           = document.createElement('div')
    this._targetImageWrap.className = 'zoom-img-wrap'

    this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage)
    this._targetImageWrap.appendChild(this._targetImage)

    $(this._targetImage)
      .addClass('zoom-img')
      .attr('data-action', 'zoom-out')

    this._overlay           = document.createElement('div')
    this._overlay.className = 'zoom-overlay'

    document.body.appendChild(this._overlay)

    this._calculateZoom()
    this._triggerAnimation()
  }

  Zoom.prototype._calculateZoom = function () {
    this._targetImage.offsetWidth // repaint before animating

    var originalFullImageWidth  = this._fullWidth
    var originalFullImageHeight = this._fullHeight

    var scrollTop = $(window).scrollTop()

    var maxScaleFactor = originalFullImageWidth / this._targetImage.width

    var viewportHeight = ($(window).height() - Zoom.OFFSET)
    var viewportWidth  = ($(window).width() - Zoom.OFFSET)

    var imageAspectRatio    = originalFullImageWidth / originalFullImageHeight
    var viewportAspectRatio = viewportWidth / viewportHeight

    if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
      this._imgScaleFactor = maxScaleFactor

    } else if (imageAspectRatio < viewportAspectRatio) {
      this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor

    } else {
      this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor
    }
  }

  Zoom.prototype._triggerAnimation = function () {
    this._targetImage.offsetWidth // repaint before animating

    var imageOffset = $(this._targetImage).offset()
    var scrollTop   = $(window).scrollTop()

    var viewportY = scrollTop + ($(window).height() / 2)
    var viewportX = ($(window).width() / 2)

    var imageCenterY = imageOffset.top + (this._targetImage.height / 2)
    var imageCenterX = imageOffset.left + (this._targetImage.width / 2)

    this._translateY = viewportY - imageCenterY
    this._translateX = viewportX - imageCenterX

    var targetTransform = 'scale(' + this._imgScaleFactor + ')'
    var imageWrapTransform = 'translate(' + this._translateX + 'px, ' + this._translateY + 'px)'

    if ($.support.transition) {
      imageWrapTransform += ' translateZ(0)'
    }

    $(this._targetImage)
      .css({
        '-webkit-transform': targetTransform,
            '-ms-transform': targetTransform,
                'transform': targetTransform
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': imageWrapTransform,
            '-ms-transform': imageWrapTransform,
                'transform': imageWrapTransform
      })

    this._$body.addClass('zoom-overlay-open')
  }

  Zoom.prototype.close = function () {
    this._$body
      .removeClass('zoom-overlay-open')
      .addClass('zoom-overlay-transitioning')

    // we use setStyle here so that the correct vender prefix for transform is used
    $(this._targetImage)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    $(this._targetImage)
      .one("transitionend", $.proxy(this.dispose, this))
  }

  Zoom.prototype.dispose = function (e) {
    if (this._targetImageWrap && this._targetImageWrap.parentNode) {
      $(this._targetImage)
        .removeClass('zoom-img')
        .attr('data-action', 'zoom')

      this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap)
      this._overlay.parentNode.removeChild(this._overlay)

      this._$body.removeClass('zoom-overlay-transitioning')
    }
  }

  // wait for dom ready (incase script included before body)
  $(function () {
    new ZoomService().listen()
  })

}(jQuery);



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/00-Class.coffee ---- */


(function() {
  var Class,
    slice = [].slice;

  Class = (function() {
    function Class() {}

    Class.prototype.trace = true;

    Class.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!this.trace) {
        return;
      }
      if (typeof console === 'undefined') {
        return;
      }
      args.unshift("[" + this.constructor.name + "]");
      console.log.apply(console, args);
      return this;
    };

    Class.prototype.logStart = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (!this.trace) {
        return;
      }
      this.logtimers || (this.logtimers = {});
      this.logtimers[name] = +(new Date);
      if (args.length > 0) {
        this.log.apply(this, ["" + name].concat(slice.call(args), ["(started)"]));
      }
      return this;
    };

    Class.prototype.logEnd = function() {
      var args, ms, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ms = +(new Date) - this.logtimers[name];
      this.log.apply(this, ["" + name].concat(slice.call(args), ["(Done in " + ms + "ms)"]));
      return this;
    };

    return Class;

  })();

  window.Class = Class;

}).call(this);



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/10-ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroFrame = (function(superClass) {
    extend(ZeroFrame, superClass);

    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.onRequest = bind(this.onRequest, this);
      this.onMessage = bind(this.onMessage, this);
      ZeroFrame.__super__.constructor.call(this);
      this.url = url;
      this.waiting_cb = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.history_state = {};
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      this.cmd("innerReady");
      window.addEventListener("beforeunload", (function(_this) {
        return function(e) {
          _this.log("save scrollTop", window.pageYOffset);
          _this.history_state["scrollTop"] = window.pageYOffset;
          return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
        };
      })(this));
      return this.cmd("wrapperGetState", [], (function(_this) {
        return function(state) {
          if (state != null) {
            _this.history_state = state;
          }
          _this.log("restore scrollTop", state, window.pageYOffset);
          if (window.pageYOffset === 0 && state) {
            return window.scroll(window.pageXOffset, state.scrollTop);
          }
        };
      })(this));
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
        return this.onRequest(cmd, message);
      }
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
      return this.log("Unknown request", message);
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
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })(Class);

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/20-ZeroApp.coffee ---- */


(function() {
  var ZeroApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroApp = (function(superClass) {
    extend(ZeroApp, superClass);

    function ZeroApp() {
      this.onFileUpdate = bind(this.onFileUpdate, this);
      this.setSiteInfo = bind(this.setSiteInfo, this);
      this.actionSetServerInfo = bind(this.actionSetServerInfo, this);
      this.actionSetSiteInfo = bind(this.actionSetSiteInfo, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      return ZeroApp.__super__.constructor.apply(this, arguments);
    }

    ZeroApp.prototype.init = function() {
      ZeroApp.__super__.init.call(this);
      this.data_users_content_json_path = "data/users/content.json";
      this.components = [];
      this.site_info = null;
      this.server_info = null;
      this.event_site_info_ready = $.Deferred();
      this.event_server_info_ready = $.Deferred();
      this.event_site_ready = $.Deferred();
      this.event_data_ready = $.Deferred();
      this.event_page_load = $.Deferred();
      $.when(this.event_site_info_ready).done((function(_this) {
        return function() {
          return _this.log("event_site_info_ready");
        };
      })(this));
      $.when(this.event_server_info_ready).done((function(_this) {
        return function() {
          return _this.log("event_server_info_ready");
        };
      })(this));
      $.when(this.event_site_ready).done((function(_this) {
        return function() {
          return _this.log("event_site_ready");
        };
      })(this));
      $.when(this.event_data_ready).done((function(_this) {
        return function() {
          return _this.log("event_data_ready");
        };
      })(this));
      $.when(this.event_page_load).done((function(_this) {
        return function() {
          return _this.log("event_page_load");
        };
      })(this));
      return $.when(this.event_site_info_ready, this.event_server_info_ready).done((function(_this) {
        return function() {
          return _this.event_site_ready.resolve();
        };
      })(this));
    };

    ZeroApp.prototype.registerComponent = function(c) {
      var event_map, i, len, pair, results1;
      this.log("registered component: " + c.constructor.name);
      this.components.push(c);
      event_map = [["event_site_info_ready", "onSiteInfoReady"], ["event_server_info_ready", "onServerInfoReady"], ["event_site_ready", "onSiteReady"], ["event_data_ready", "onDataReady"], ["event_page_load", "onPageLoad"]];
      results1 = [];
      for (i = 0, len = event_map.length; i < len; i++) {
        pair = event_map[i];
        results1.push((function(_this) {
          return function() {
            var event, method;
            event = pair[0];
            method = pair[1];
            return $.when(_this[event]).done(function() {
              if (c[method]) {
                return c[method].apply(c);
              }
            });
          };
        })(this)());
      }
      return results1;
    };

    ZeroApp.prototype.dispatchToComponents = function(method, args) {
      var c, i, len, ref, result, results;
      results = [];
      ref = this.components;
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (c[method]) {
          result = c[method].apply(c, args);
          if (result != null) {
            results.push(result);
          }
        }
      }
      return results;
    };

    ZeroApp.prototype.onOpenWebsocket = function(e) {
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          return _this.setSiteInfo(site_info);
        };
      })(this));
      return this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {
          return _this.setServerInfo(server_info);
        };
      })(this));
    };

    ZeroApp.prototype.onRequest = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        this.actionSetSiteInfo(message);
      }
      if (cmd === "setServerInfo") {
        return this.actionSetServerInfo(message);
      } else {
        return this.log("Unknown command", message);
      }
    };

    ZeroApp.prototype.actionSetSiteInfo = function(message) {
      return this.setSiteInfo(message.params);
    };

    ZeroApp.prototype.actionSetServerInfo = function(message) {
      return this.setServerInfo(message.params);
    };

    ZeroApp.prototype.setServerInfo = function(server_info) {
      this.server_info = server_info;
      this.event_server_info_ready.resolve();
      return this.dispatchToComponents("setServerInfo", [server_info]);
    };

    ZeroApp.prototype.setSiteInfo = function(site_info) {
      var ref;
      this.site_info = site_info;
      this.event_site_info_ready.resolve();
      this.dispatchToComponents("setSiteInfo", [site_info]);
      if ((((ref = site_info.event) != null ? ref[0] : void 0) || "").match(/^file_/)) {
        return this.onFileUpdate(site_info.event[1], site_info.event[0]);
      }
    };

    ZeroApp.prototype.onFileUpdate = function(inner_path, state) {
      return this.dispatchToComponents("onFileUpdate", [inner_path, state]);
    };

    ZeroApp.prototype.readJSON = function(params, cb) {
      var json;
      json = null;
      return $.when().then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return _this.cmd("fileGet", params, function(res) {
              if (res) {
                try {
                  json = JSON.parse(res);
                } catch (error) {
                  json = null;
                }
              }
              if (cb) {
                cb(json);
              }
              if (json) {
                return d.resolve(json);
              } else {
                return d.reject();
              }
            });
          });
        };
      })(this)).promise();
    };

    ZeroApp.prototype.writeJSON = function(inner_path, json, publish, cb) {
      var json_raw;
      json.modified = Time.timestamp();
      json_raw = null;
      return $.when().then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            try {
              json_raw = unescape(encodeURIComponent(JSON.stringify(json, void 0, '\t')));
              return d.resolve();
            } catch (error) {
              return d.reject();
            }
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
              if (res === "ok") {
                if (cb) {
                  cb("write_ok");
                }
                _this.onFileUpdate(inner_path, "file_written");
                return d.resolve();
              } else {
                _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
                if (cb) {
                  cb("write_error");
                }
                return d.reject();
              }
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            if (publish) {
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                if (res === "ok") {
                  if (cb) {
                    cb("publish_ok");
                  }
                  _this.onFileUpdate(inner_path, "file_published");
                  return d.resolve();
                } else {
                  if (cb) {
                    cb("publish_error");
                  }
                  _this.onFileUpdate(inner_path, "file_publication_failed");
                  return d.reject();
                }
              });
            } else {
              return d.resolve();
            }
          });
        };
      })(this)).promise();
    };

    ZeroApp.prototype.certSelect = function() {
      return this.readJSON([this.data_users_content_json_path], (function(_this) {
        return function(res) {
          var cert_signers;
          if (res) {
            cert_signers = false;
            try {
              cert_signers = Object.keys(res.user_contents.cert_signers);
            } catch (error) {
              _this.log("Failed to get keys of user_contents.cert_signers from " + _this.data_users_content_json_path);
              _this.log(res);
            }
            if (cert_signers) {
              return _this.cmd("certSelect", [cert_signers]);
            }
          }
        };
      })(this));
    };

    return ZeroApp;

  })(ZeroFrame);

  window.ZeroApp = ZeroApp;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/BrowserTitle.coffee ---- */


(function() {
  var BrowserTitle,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BrowserTitle = (function() {
    function BrowserTitle(page, siteTitle) {
      if (siteTitle == null) {
        siteTitle = null;
      }
      this.update = bind(this.update, this);
      this.applyTitleParts = bind(this.applyTitleParts, this);
      this.applySiteTitle = bind(this.applySiteTitle, this);
      this.applySeparator = bind(this.applySeparator, this);
      this.page = page;
      this.siteTitle = siteTitle;
      this.titleParts = [];
      this.separator = " - ";
    }

    BrowserTitle.prototype.applySeparator = function(separator) {
      this.separator = separator;
      return this.update();
    };

    BrowserTitle.prototype.applySiteTitle = function(siteTitle) {
      this.siteTitle = siteTitle;
      if (this.titleParts.length > 0) {
        return this.update();
      }
    };

    BrowserTitle.prototype.applyTitleParts = function(titleParts) {
      this.titleParts = titleParts;
      return this.update();
    };

    BrowserTitle.prototype.update = function() {
      var title;
      if (this.siteTitle === null) {
        return;
      }
      title = [this.siteTitle].concat(this.titleParts).reverse().join(this.separator);
      return this.page.cmd("wrapperSetTitle", title);
    };

    return BrowserTitle;

  })();

  window.BrowserTitle = BrowserTitle;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/Component.coffee ---- */


(function() {
  var Component,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Component = (function(superClass) {
    extend(Component, superClass);

    function Component(app, component_id) {
      if (component_id == null) {
        component_id = null;
      }
      this.app = app;
      if (component_id == null) {
        component_id = this.constructor.name;
      }
      this.component_id = component_id;
      this.init();
    }

    Component.prototype.init = function() {
      return this;
    };

    return Component;

  })(Class);

  window.Component = Component;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/CorsRequester.coffee ---- */


(function() {
  var CorsRequester,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CorsRequester = (function(superClass) {
    extend(CorsRequester, superClass);

    function CorsRequester() {
      this.requestSiteAndContentJson = bind(this.requestSiteAndContentJson, this);
      this.requestSite = bind(this.requestSite, this);
      this.checkSiteAvailable = bind(this.checkSiteAvailable, this);
      this.siteRequest = {};
      this.thisSiteAddress = null;
    }

    CorsRequester.prototype.parseUrl = function(url) {
      return ZeroUrl.parse(url, {
        normalize: true
      });
    };

    CorsRequester.prototype.checkSiteAvailable = function(siteAddress, options) {
      var parsedUrl;
      if (options == null) {
        options = {};
      }
      if (options.parseUrl) {
        parsedUrl = this.parseUrl(siteAddress);
        if (!parsedUrl) {
          return $.Deferred().reject();
        }
        siteAddress = parsedUrl.siteAddress;
      }
      if (this.siteRequest[siteAddress] && this.siteRequest[siteAddress].state() === "resolved") {
        return this.siteRequest[siteAddress];
      }
      if (siteAddress === this.thisSiteAddress) {
        return $.Deferred().resolve(true);
      }
      return $.Deferred().resolve().then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return Page.cmd("siteInfo", {}, function(siteInfo) {
              var ref;
              _this.thisSiteAddress = siteInfo.address;
              if (siteAddress === _this.thisSiteAddress) {
                return d.resolve(true);
              } else if (ref = "Cors:" + siteAddress, indexOf.call(siteInfo.settings.permissions, ref) >= 0) {
                return Page.cmd("fileGet", ["cors-" + siteAddress + "/content.json", false, "text", 0], function(res) {
                  if (typeof res === "string") {
                    _this.log(siteAddress + ": available");
                    return d.resolve(true);
                  } else {
                    _this.log(siteAddress + ": we have permission, but the site is unavailable");
                    return d.resolve(false);
                  }
                });
              } else {
                _this.log(siteAddress + ": no permission");
                return d.resolve(false);
              }
            });
          });
        };
      })(this)).promise();
    };

    CorsRequester.prototype.requestSite = function(siteAddress, options) {
      var parsedUrl, request;
      if (options == null) {
        options = {};
      }
      if (options.parseUrl) {
        parsedUrl = this.parseUrl(siteAddress);
        if (!parsedUrl) {
          return $.Deferred().reject();
        }
        siteAddress = parsedUrl.siteAddress;
      }
      if (this.siteRequest[siteAddress]) {
        return this.siteRequest[siteAddress];
      }
      request = this.siteRequest[siteAddress] = this.checkSiteAvailable(siteAddress).then((function(_this) {
        return function(site_available) {
          return $.Deferred(function(d) {
            if (site_available) {
              return d.resolve();
            }
            return Page.cmd("corsPermission", [siteAddress], function(res) {
              if (res === "ok") {
                return d.resolve();
              } else {
                return d.reject();
              }
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            if (siteAddress === _this.thisSiteAddress) {
              return d.resolve(true);
            }
            return Page.cmd("siteInfo", {}, function(siteInfo) {
              return Page.cmd("fileGet", ["cors-" + siteAddress + "/content.json", true, "text", 5000], function(res) {
                if (typeof res === "string") {
                  _this.log(siteAddress + ": permission is granted and content.json is available");
                } else {
                  _this.log(siteAddress + ": permission is granted but content.json is unavailable");
                }
                return d.resolve(true);
              });
            });
          });
        };
      })(this)).promise();
      return request;
    };

    CorsRequester.prototype.requestSiteAndContentJson = function(url) {
      var innerPath, parsedUrl, request, siteAddress;
      parsedUrl = this.parseUrl(url);
      if (!parsedUrl) {
        return $.Deferred().reject();
      }
      siteAddress = parsedUrl.siteAddress;
      innerPath = parsedUrl.innerPath;
      request = this.requestSite(siteAddress).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            var contentJsonPath, corsPathPrefix, match, timeout;
            timeout = 10000;
            if (match = innerPath.match(/^(data\/users\/[^\/]+)/)) {
              contentJsonPath = match[1] + "/content.json";
            } else {
              contentJsonPath = "content.json";
            }
            if (siteAddress === _this.thisSiteAddress) {
              corsPathPrefix = "";
            } else {
              corsPathPrefix = "cors-" + siteAddress + "/";
            }
            Page.cmd("fileGet", ["" + corsPathPrefix + contentJsonPath, true, "text", timeout], function(res) {
              if (d.state() === "pending") {
                return d.resolve(res);
              }
            });
            return setTimeout((function() {
              if (d.state() === "pending") {
                return d.resolve(false);
              }
            }), timeout);
          });
        };
      })(this)).promise();
      return request;
    };

    return CorsRequester;

  })(Class);

  window.corsRequester = new CorsRequester();

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/CorsResolver.coffee ---- */


(function() {
  var CorsResolver,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CorsResolver = (function(superClass) {
    extend(CorsResolver, superClass);

    function CorsResolver(cb_selector) {
      this.onImagesLoaded_Always = bind(this.onImagesLoaded_Always, this);
      this.onImagesLoaded_Progress = bind(this.onImagesLoaded_Progress, this);
      this.start = bind(this.start, this);
      this.imagesLoaded = null;
      this.cb_selector = null;
      this.max_retries = 9;
      this.accessibleSites = {};
      this.timeStarted = null;
      this.maxTimeout = 200;
    }

    CorsResolver.prototype.start = function(cb_selector) {
      this.cb_selector = cb_selector;
      this.timeStarted = Time.timestamp();
      this.restartImageWatcher();
      return this.onTick();
    };

    CorsResolver.prototype.getAttachedData = function(img) {
      var data;
      data = $(img).data("cors-resolver-data");
      if (!data) {
        data = {
          retries: 0,
          startedAt: Time.timestamp(),
          statusCheckRequired: true,
          siteAvailable: null,
          contentJsonAvailable: null,
          fileInList: null
        };
        $(img).data("cors-resolver-data", data);
      }
      return data;
    };

    CorsResolver.prototype.getStatusIndicator = function(img) {
      var data, indicator, parsedUrl, siteAddress;
      data = this.getAttachedData(img);
      parsedUrl = corsRequester.parseUrl(img.src);
      siteAddress = parsedUrl.siteAddress;
      indicator = function(name, value) {
        var v;
        if (value === true) {
          v = "image-loading-indicator-true";
        } else if (value === false) {
          v = "image-loading-indicator-false";
        } else {
          v = "image-loading-indicator-unknown";
        }
        return "<span class='image-loading-indicator image-loading-indicator-" + name + " " + v + "'></span>";
      };
      return indicator("site-accessible", this.accessibleSites[siteAddress]) + indicator("site-available", data.siteAvailable) + indicator("content-json-available", data.contentJsonAvailable) + indicator("file-in-list", data.fileInList);
    };

    CorsResolver.prototype.runStatusCheck = function(img) {
      var data, url;
      data = this.getAttachedData(img);
      data.statusCheckRequired = false;
      url = img.src;
      corsRequester.checkSiteAvailable(url, {
        parseUrl: true
      }).then((function(_this) {
        return function(res) {
          return data.siteAvailable = res;
        };
      })(this));
      return corsRequester.requestSiteAndContentJson(url).then((function(_this) {
        return function(res) {
          var fileName, json, parsedUrl, path, ref, ref1;
          if (typeof res === "string") {
            data.siteAvailable = true;
            data.contentJsonAvailable = true;
            try {
              json = JSON.parse(res);
              path = ((ref = json.inner_path) != null ? ref : "").replace(/\/?content\.json$/, "");
              parsedUrl = corsRequester.parseUrl(url);
              fileName = ((ref1 = parsedUrl.innerPath) != null ? ref1 : "").removePrefix(path).removePrefix("/");
              if (json["files"][fileName] || json["files_optional"][fileName]) {
                return data.fileInList = true;
              } else {
                return data.fileInList = false;
              }
            } catch (error) {
              return data.fileInList = false;
            }
          }
        };
      })(this));
    };

    CorsResolver.prototype.reloadImage = function(img) {
      var data, src;
      data = this.getAttachedData(img);
      if (data.retries > this.max_retries) {
        return;
      }
      data.retries += 1;
      src = img.src;
      this.log("Reloading image [" + data.retries + "]: " + src);
      img.src = "";
      img.src = src;
      return this.runStatusCheck(img);
    };

    CorsResolver.prototype.handleImageProgress = function(image) {
      var data, img, indicator, m, message_div, parsedUrl, s, siteAddress, timePassed;
      img = image.img;
      data = this.getAttachedData(img);
      parsedUrl = corsRequester.parseUrl(img.src);
      siteAddress = parsedUrl.siteAddress;
      if (image.isLoaded) {
        if ($(img).next().hasClass("image-loading-box")) {
          $(img).next().hide();
        }
        if (siteAddress) {
          return this.accessibleSites[siteAddress] = true;
        }
      } else {
        if (data.statusCheckRequired) {
          this.runStatusCheck(img);
        }
        if (!$(img).next().hasClass("image-loading-box")) {
          message_div = $("<div class='image-loading-box'></div>");
          $(message_div).insertAfter($(img));
          $(message_div).html("<p class=\"image-loading-message\"></p>\n<pre><code class=\"image-url no-highlight\"><a href=\"" + img.src + "\">" + ($("<div>").text(img.src).html()) + "</a></code></pre>");
        }
        timePassed = Time.timestamp() - data.startedAt;
        m = Math.floor(timePassed / 60);
        s = timePassed % 60;
        m = ("00" + m).slice(-2);
        s = ("00" + s).slice(-2);
        indicator = this.getStatusIndicator(img);
        if (data.fileInList === false && timePassed > 3) {
          $(".image-loading-message", $(img).next()).html("Failed to load image: file not found");
          return $(img).next().addClass("failed");
        } else if (data.retries > 6 && timePassed > 100) {
          $(".image-loading-message", $(img).next()).html("Failed to load image: timeout");
          return $(img).next().addClass("failed");
        } else {
          return $(".image-loading-message", $(img).next()).html("Loading image... " + m + ":" + s + " " + indicator);
        }
      }
    };

    CorsResolver.prototype.handleFailedImage = function(image) {
      var data, img, parsedUrl;
      if (image.isLoaded) {
        return;
      }
      img = image.img;
      data = this.getAttachedData(img);
      if (data.retries > this.max_retries) {
        return;
      }
      parsedUrl = corsRequester.parseUrl(img.src);
      if (!parsedUrl) {
        return;
      }
      return corsRequester.requestSiteAndContentJson(img.src).then((function(_this) {
        return function() {
          if (data.retries > _this.max_retries) {
            return;
          }
          return setTimeout((function() {
            return _this.reloadImage(img);
          }), 500 + data.retries * 4000);
        };
      })(this));
    };

    CorsResolver.prototype.onImagesLoaded_Progress = function() {
      var i, image, len, ref, results;
      ref = this.imagesLoaded.images;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        image = ref[i];
        results.push(this.handleImageProgress(image));
      }
      return results;
    };

    CorsResolver.prototype.onImagesLoaded_Always = function() {
      var i, image, len, ref, results;
      ref = this.imagesLoaded.images;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        image = ref[i];
        this.handleImageProgress(image);
        results.push(this.handleFailedImage(image));
      }
      return results;
    };

    CorsResolver.prototype.restartImageWatcher = function() {
      this.imagesLoaded = new imagesLoaded(this.cb_selector());
      this.imagesLoaded.on("always", (function(_this) {
        return function(instance) {
          return _this.onImagesLoaded_Always();
        };
      })(this));
      return this.imagesLoaded.on("progress", (function(_this) {
        return function(instance, image, y) {
          return _this.onImagesLoaded_Progress();
        };
      })(this));
    };

    CorsResolver.prototype.onTick = function() {
      if ((Time.timestamp() - this.timeStarted) > this.maxTimeout) {
        return;
      }
      this.onImagesLoaded_Progress();
      if (this.imagesLoaded.isComplete && !this.imagesLoaded.hasAnyBroken) {
        return;
      }
      if (this.imagesLoaded.isComplete && this.imagesLoaded.hasAnyBroken) {
        this.restartImageWatcher();
      }
      return setTimeout(((function(_this) {
        return function() {
          return _this.onTick();
        };
      })(this)), 1000);
    };

    return CorsResolver;

  })(Class);

  window.CorsResolver = CorsResolver;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/CustomAlloyEditor.coffee ---- */


(function() {
  var CustomAlloyEditor,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CustomAlloyEditor = (function(superClass) {
    extend(CustomAlloyEditor, superClass);

    function CustomAlloyEditor(tag) {
      var editor, el, height_added, height_before, style;
      this.tag = tag;
      this.handleSelectionChange = bind(this.handleSelectionChange, this);
      this.handleChange = bind(this.handleChange, this);
      this.handleCommand = bind(this.handleCommand, this);
      this.handleAction = bind(this.handleAction, this);
      this.handleImageAdd = bind(this.handleImageAdd, this);
      this.getExtension = bind(this.getExtension, this);
      this.resizeImage = bind(this.resizeImage, this);
      editor = AlloyEditor.editable(this.tag);
      el = editor._editor.element.$;
      height_before = el.getClientRects()[0].height;
      style = getComputedStyle(el);
      el.style.position = "relative";
      el.style.paddingTop = (parseInt(style["padding-top"]) + 20) + "px";
      height_added = el.getClientRects()[0].height - height_before;
      el.style.top = (parseInt(style["marginTop"]) - 20 - height_added) + "px";
      el.style.marginBottom = (parseInt(style["marginBottom"]) + parseInt(el.style.top)) + "px";
      editor.get('nativeEditor').on("selectionChange", this.handleSelectionChange);
      editor.get('nativeEditor').on("focus", (function(_this) {
        return function(e) {
          return setTimeout((function() {
            return _this.handleSelectionChange(e);
          }), 100);
        };
      })(this));
      editor.get('nativeEditor').on("click", this.handleSelectionChange);
      editor.get('nativeEditor').on("change", this.handleChange);
      editor.get('nativeEditor').on('imageAdd', (function(_this) {
        return function(e) {
          if (e.data.el.$.width > 0) {
            return _this.handleImageAdd(e);
          } else {
            return setTimeout((function() {
              return _this.handleImageAdd(e);
            }), 100);
          }
        };
      })(this));
      editor.get('nativeEditor').on("actionPerformed", this.handleAction);
      editor.get('nativeEditor').on('afterCommandExec', this.handleCommand);
      window.editor = editor;
      this.el_last_created = null;
      this.image_size_limit = 200 * 1024;
      this.image_resize_width = 1200;
      this.image_resize_height = 900;
      this.image_preverse_ratio = true;
      this.image_try_png = false;
      return this;
    }

    CustomAlloyEditor.prototype.calcSize = function(source_width, source_height, target_width, target_height) {
      var height, width;
      if (source_width <= target_width && source_height <= target_height) {
        return [source_width, source_height];
      }
      width = target_width;
      height = width * (source_height / source_width);
      if (height > target_height) {
        height = target_height;
        width = height * (source_width / source_height);
      }
      return [Math.round(width), Math.round(height)];
    };

    CustomAlloyEditor.prototype.scaleHalf = function(image) {
      var canvas, ctx;
      canvas = document.createElement("canvas");
      canvas.width = image.width / 1.5;
      canvas.height = image.height / 1.5;
      ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas;
    };

    CustomAlloyEditor.prototype.resizeImage = function(image, width, height) {
      var canvas, ctx, image_base64uri, image_resized, ref;
      canvas = document.createElement("canvas");
      if (this.image_preverse_ratio) {
        ref = this.calcSize(image.width, image.height, width, height), canvas.width = ref[0], canvas.height = ref[1];
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      image_resized = image;
      while (image_resized.width > width * 1.5) {
        image_resized = this.scaleHalf(image_resized);
      }
      ctx.drawImage(image_resized, 0, 0, canvas.width, canvas.height);
      if (this.image_try_png && this.getExtension(image.src) === "png") {

        /*
        			quant = new RgbQuant({colors: 256, method: 1})
        			quant.sample(canvas)
        			quant.palette(true)
        			canvas_quant = drawPixels(quant.reduce(canvas), width)
        			optimizer = new CanvasTool.PngEncoder(canvas_quant, { bitDepth: 8, colourType: CanvasTool.PngEncoder.ColourType.TRUECOLOR })
        			image_base64uri = "data:image/png;base64," + btoa(optimizer.convert())
         */
        image_base64uri = canvas.toDataURL("image/png", 0.1);
        if (image_base64uri.length > this.image_size_limit) {
          this.log("PNG too large (" + image_base64uri.length + " bytes), convert to jpg instead");
          image_base64uri = canvas.toDataURL("image/jpeg", 0.7);
        } else {
          this.log("Converted to PNG");
        }
      } else {
        image_base64uri = canvas.toDataURL("image/jpeg", 0.7);
      }
      this.log("Resized " + image.width + "x" + image.height + " to " + canvas.width + "x" + canvas.height + " (" + image_base64uri.length + " bytes)");
      return [image_base64uri, canvas.width, canvas.height];
    };

    CustomAlloyEditor.prototype.getExtension = function(data) {
      return data.match("/[a-z]+")[0].replace("/", "").replace("jpeg", "jpg");
    };

    CustomAlloyEditor.prototype.handleImageAdd = function(e) {
      var height, image_base64uri, name, ref, width;
      if (e.data.file.name) {
        name = e.data.file.name.replace(/[^\w\.-]/gi, "_");
      } else {
        name = Time.timestamp() + "." + this.getExtension(e.data.file.type);
      }
      e.data.el.$.style.maxWidth = "2400px";
      if (e.data.file.size > this.image_size_limit) {
        this.log("File size " + e.data.file.size + " larger than allowed " + this.image_size_limit + ", resizing...");
        ref = this.resizeImage(e.data.el.$, this.image_resize_width, this.image_resize_height), image_base64uri = ref[0], width = ref[1], height = ref[2];
        e.data.el.$.src = image_base64uri;
        name = name.replace(/(png|gif|jpg)/, this.getExtension(image_base64uri));
      } else {
        image_base64uri = e.data.el.$.src;
        width = e.data.el.$.width;
        height = e.data.el.$.height;
      }
      e.data.el.$.style.maxWidth = "";
      e.data.el.$.alt = name + " (" + width + "x" + height + ")";
      return this.handleImageSave(name, image_base64uri, e.data.el.$);
    };

    CustomAlloyEditor.prototype.handleAction = function(e) {
      var el, new_el, ranges;
      el = e.editor.getSelection().getStartElement();
      if (el.getName() === "pre") {
        this.log("Fix pre");
        new_el = new CKEDITOR.dom.element("code");
        new_el.setHtml(el.getHtml().replace(/\u200B/g, ''));
        el.setHtml("");
        e.editor.insertElement(new_el);
        ranges = e.editor.getSelection().getRanges();
        ranges[0].startContainer = new_el;
        e.editor.getSelection().selectRanges(ranges);
      }
      if (el.getName() === "pre" && e.data._style.hasOwnProperty("removeFromRange")) {
        this.log("Remove pre");
        new_el = new CKEDITOR.dom.element("p");
        new_el.insertAfter(el);
        new_el.setHtml(el.getFirst().getHtml().replace(/\n/g, "<br>").replace(/\u200B/g, ''));
        el.remove();
        selectElement(e.editor, new_el);
      } else if (el.getName() === "code" && e.data._style.hasOwnProperty("removeFromRange")) {
        this.log("Remove code");
        new_el = new CKEDITOR.dom.element("p");
        new_el.insertAfter(el.getParent());
        new_el.setHtml(el.getHtml().replace(/\n/g, "<br>").replace(/\u200B/g, ''));
        el.getParent().remove();
        selectElement(e.editor, new_el);
      } else if (el.getName() === "code" && el.getHtml().indexOf("<br>") > 0) {
        this.log("Fix multiline code");
        new_el = new CKEDITOR.dom.element("pre");
        new_el.insertAfter(el);
        el.appendTo(new_el);
        selectElement(e.editor, new_el);
      }
      if (el.getName() === "h2" || el.getName() === "h3") {
        selectElement(e.editor, el);
      }
      return this.handleChange(e);
    };

    CustomAlloyEditor.prototype.handleCommand = function(e) {
      var el;
      if (e.data.name === 'enter') {
        el = e.editor.getSelection().getStartElement();
        if (el.getText().replace(/\u200B/g, '') === "" && el.getName() !== "p" && el.getParent().getName() === "p") {
          return el.remove();
        }
      } else if (e.data.name === 'shiftEnter') {
        el = e.editor.getSelection().getStartElement();
        if (el.getName() === "code" && el.getNext() && el.getNext().getName && el.getNext().getName() === "br") {
          return el.getNext().remove();
        }
      }
    };

    CustomAlloyEditor.prototype.handleChange = function(e) {
      return this.handleSelectionChange(e);
    };

    CustomAlloyEditor.prototype.handleSelectionChange = function(e) {
      var el, toolbar_add;
      if (this.el_last_created && this.el_last_created.getText().replace(/\u200B/g, '').trim() !== "") {
        this.el_last_created.removeClass("empty");
        this.el_last_created = null;
      }
      el = e.editor.getSelection().getStartElement();
      if (el.getName() === "br") {
        el = el.getParent();
      }
      toolbar_add = document.querySelector(".ae-toolbar-add");
      if (!toolbar_add || !el) {
        return false;
      }
      if (el.getText().replace(/\u200B/g, '').trim() === "") {
        if (el.getName() === "h2" || el.getName() === "h3") {
          el.addClass("empty");
          this.el_last_created = el;
        }
        toolbar_add.classList.remove("lineselected");
        return toolbar_add.classList.add("emptyline");
      } else {
        toolbar_add.classList.add("lineselected");
        return toolbar_add.classList.remove("emptyline");
      }

      /*
      		if e.editor.element.getPrivate().events.mouseout?.listeners.length
      			e.editor.element.removeListener("mouseout", e.editor.element.getPrivate().events.mouseout.listeners[0].fn)
      
      		if e.editor.element.getPrivate().events.mouseleave?.listeners.length
      			 * Keep only mouseout
      			func = e.editor.element.getPrivate().events.mouseleave.listeners[0]
      			console.log "remove", e.editor.element.removeListener("mouseleave", func.fn)
      			e.editor.element.on "mouseleave", (e_leave) ->
      				if document.querySelector(".ae-toolbar-styles") == null
      					window.editor._mainUI.forceUpdate()
      					func(e_leave, e_leave.data)
       */
    };

    return CustomAlloyEditor;

  })(Class);

  window.CustomAlloyEditor = CustomAlloyEditor;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/Follow.coffee ---- */


(function() {
  var Follow,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Follow = (function(superClass) {
    extend(Follow, superClass);

    function Follow(elem) {
      this.elem = elem;
      this.handleMenuClick = bind(this.handleMenuClick, this);
      this.init = bind(this.init, this);
      this.menu = new Menu(this.elem);
      this.feeds = {};
      this.follows = {};
      this.elem.off("click");
      this.elem.on("click", (function(_this) {
        return function() {
          var is_default_feed, menu_item, param, query, ref, ref1, title;
          if (Page.server_info.rev > 850) {
            if (_this.elem.hasClass("following")) {
              _this.showFeeds();
            } else {
              _this.followDefaultFeeds();
              ref = _this.feeds;
              for (title in ref) {
                ref1 = ref[title], query = ref1[0], menu_item = ref1[1], is_default_feed = ref1[2], param = ref1[3];
                if (!menu_item.hasClass("selected")) {
                  _this.showFeeds();
                  break;
                }
              }
            }
          } else {
            Page.cmd("wrapperNotification", ["info", "Please update your ZeroNet client to use this feature"]);
          }
          return false;
        };
      })(this));
    }

    Follow.prototype.init = function() {
      if (!this.feeds) {
        return;
      }
      return Page.cmd("feedListFollow", [], (function(_this) {
        return function(follows1) {
          var is_default_feed, menu_item, param, query, ref, ref1, title;
          _this.follows = follows1;
          ref = _this.feeds;
          for (title in ref) {
            ref1 = ref[title], query = ref1[0], menu_item = ref1[1], is_default_feed = ref1[2], param = ref1[3];
            if (_this.follows[title] && indexOf.call(_this.follows[title][1], param) >= 0) {
              menu_item.addClass("selected");
            } else {
              menu_item.removeClass("selected");
            }
          }
          _this.updateListitems();
          _this.elem.css("display", "inline-block");
          return setTimeout((function() {
            if (typeof Page.site_info.feed_follow_num !== "undefined" && Page.site_info.feed_follow_num === null) {
              return _this.followDefaultFeeds();
            }
          }), 100);
        };
      })(this));
    };

    Follow.prototype.addFeed = function(title, query, is_default_feed, param) {
      var menu_item;
      if (is_default_feed == null) {
        is_default_feed = false;
      }
      if (param == null) {
        param = "";
      }
      menu_item = this.menu.addItem(title, this.handleMenuClick);
      return this.feeds[title] = [query, menu_item, is_default_feed, param];
    };

    Follow.prototype.handleMenuClick = function(item) {
      item.toggleClass("selected");
      this.updateListitems();
      this.saveFeeds();
      return true;
    };

    Follow.prototype.showFeeds = function() {
      return this.menu.show();
    };

    Follow.prototype.followDefaultFeeds = function() {
      var is_default_feed, menu_item, param, query, ref, ref1, title;
      ref = this.feeds;
      for (title in ref) {
        ref1 = ref[title], query = ref1[0], menu_item = ref1[1], is_default_feed = ref1[2], param = ref1[3];
        if (is_default_feed) {
          menu_item.addClass("selected");
          this.log("Following", title, menu_item);
        }
      }
      this.updateListitems();
      return this.saveFeeds();
    };

    Follow.prototype.updateListitems = function() {
      if (this.menu.elem.find(".selected").length > 0) {
        return this.elem.addClass("following");
      } else {
        return this.elem.removeClass("following");
      }
    };

    Follow.prototype.saveFeeds = function() {
      return Page.cmd("feedListFollow", [], (function(_this) {
        return function(follows) {
          var is_default_feed, item, menu_item, param, params, query, ref, ref1, title;
          _this.follows = follows;
          ref = _this.feeds;
          for (title in ref) {
            ref1 = ref[title], query = ref1[0], menu_item = ref1[1], is_default_feed = ref1[2], param = ref1[3];
            if (follows[title]) {
              params = (function() {
                var i, len, ref2, results;
                ref2 = follows[title][1];
                results = [];
                for (i = 0, len = ref2.length; i < len; i++) {
                  item = ref2[i];
                  if (item !== param) {
                    results.push(item);
                  }
                }
                return results;
              })();
            } else {
              params = [];
            }
            if (menu_item.hasClass("selected")) {
              params.push(param);
            }
            if (params.length === 0) {
              delete follows[title];
            } else {
              follows[title] = [query, params];
            }
          }
          return Page.cmd("feedFollow", [follows]);
        };
      })(this));
    };

    return Follow;

  })(Class);

  window.Follow = Follow;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/InlineEditor.coffee ---- */


(function() {
  var InlineEditor,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  InlineEditor = (function() {
    function InlineEditor(elem1, getContent, saveContent, getObject) {
      this.elem = elem1;
      this.getContent = getContent;
      this.saveContent = saveContent;
      this.getObject = getObject;
      this.disabled = bind(this.disabled, this);
      this.enabled = bind(this.enabled, this);
      this.disable = bind(this.disable, this);
      this.enable = bind(this.enable, this);
      this.cancelEdit = bind(this.cancelEdit, this);
      this.deleteObject = bind(this.deleteObject, this);
      this.saveEdit = bind(this.saveEdit, this);
      this.stopEdit = bind(this.stopEdit, this);
      this.handleImageSave = bind(this.handleImageSave, this);
      this.startEdit = bind(this.startEdit, this);
      this.edit_button = $("<a href='#Edit' class='editable-edit icon-edit'></a>");
      if (this.disabled()) {
        this.edit_button.hide();
      }
      this.edit_button.on("click", this.startEdit);
      this.elem.addClass("editable").before(this.edit_button);
      this.editor = null;
      this.elem.on("mouseenter click", (function(_this) {
        return function(e) {
          var scrolltop, top;
          if (_this.disabled()) {
            _this.edit_button.hide().css("opacity", "");
            return;
          }
          _this.edit_button.show().css("opacity", "0.4");
          scrolltop = $(window).scrollTop();
          top = _this.edit_button.offset().top - parseInt(_this.edit_button.css("margin-top"));
          if (scrolltop > top) {
            return _this.edit_button.css("margin-top", scrolltop - top + e.clientY - 20);
          } else {
            return _this.edit_button.css("margin-top", "");
          }
        };
      })(this));
      this.elem.on("mouseleave", (function(_this) {
        return function() {
          return _this.edit_button.css("opacity", "");
        };
      })(this));
      if (this.elem.is(":hover")) {
        this.elem.trigger("mouseenter");
      }
    }

    InlineEditor.prototype.startEdit = function() {
      var j, results;
      if (this.disabled()) {
        return;
      }
      this.content_before = this.elem.html();
      if (this.elem.data("editable-mode") === "meditor") {
        this.editor = new Meditor(this.elem[0], this.getContent(this.elem, "raw"));
        this.editor.handleImageSave = this.handleImageSave;
        this.editor.load();
      } else {
        this.editor = $("<textarea class='editor'></textarea>");
        this.editor.val(this.getContent(this.elem, "raw"));
        this.elem.after(this.editor);
        this.elem.html((function() {
          results = [];
          for (j = 1; j <= 50; j++){ results.push(j); }
          return results;
        }).apply(this).join("fill the width"));
        this.copyStyle(this.elem, this.editor);
        this.elem.html(this.content_before);
        this.autoExpand(this.editor);
        this.elem.css("display", "none");
        if ($(window).scrollTop() === 0) {
          this.editor[0].selectionEnd = 0;
          this.editor.focus();
        }
      }
      $(".editbg").addClass("display-block").addClassLater("visible", 10);
      $(".editable-edit").css("display", "none");
      $(".editbar").css("display", "inline-block").addClassLater("visible", 10);
      $(".publishbar").css("opacity", 0);
      $(".editbar .object").text(this.getObject(this.elem).data("object") + "." + this.elem.data("editable"));
      $(".editbar .button").removeClass("loading");
      $(".editbar .save").off("click").on("click", this.saveEdit);
      $(".editbar .delete").off("click").on("click", this.deleteObject);
      $(".editbar .cancel").off("click").on("click", this.cancelEdit);
      if (this.getObject(this.elem).data("deletable")) {
        $(".editbar .delete").css("display", "").html("Delete " + this.getObject(this.elem).data("object").split(":")[0]);
      } else {
        $(".editbar .delete").css("display", "none");
      }
      window.onbeforeunload = function() {
        return 'Your unsaved blog changes will be lost!';
      };
      return false;
    };

    InlineEditor.prototype.handleImageSave = function(name, image_base64uri, el) {
      var file_path, object_name;
      el.style.opacity = 0.5;
      object_name = this.getObject(this.elem).data("object").replace(/[^A-Za-z0-9]/g, "_").toLowerCase();
      file_path = "data/img/" + object_name + "_" + name;
      return Page.cmd("fileWrite", [file_path, image_base64uri.replace(/.*,/, "")], (function(_this) {
        return function() {
          el.style.opacity = 1;
          return el.src = file_path;
        };
      })(this));
    };

    InlineEditor.prototype.stopEdit = function() {
      this.editor.remove();
      this.editor = null;
      this.elem.css("display", "").css("z-index", 999).css("position", "relative").cssLater("z-index", "").cssLater("position", "");
      $(".editbg").removeClass("visible").removeClassLater("display-block");
      $(".editable-edit").css("display", "");
      $(".editbar").cssLater("display", "none", 1000).removeClass("visible");
      $(".publishbar").css("opacity", 1);
      return window.onbeforeunload = null;
    };

    InlineEditor.prototype.saveEdit = function() {
      var content;
      content = this.editor.val();
      $(".editbar .save").addClass("loading");
      this.saveContent(this.elem, content, (function(_this) {
        return function(content_html) {
          if (content_html !== false) {
            $(".editbar .save").removeClass("loading");
            _this.stopEdit();
            if (typeof content_html === "string") {
              _this.elem.html(content_html);
            }
            $('pre code').each(function(i, block) {
              return hljs.highlightBlock(block);
            });
            return Page.addImageZoom(_this.elem);
          } else {
            return $(".editbar .save").removeClass("loading");
          }
        };
      })(this));
      return false;
    };

    InlineEditor.prototype.deleteObject = function() {
      var object_type;
      object_type = this.getObject(this.elem).data("object").split(":")[0];
      Page.cmd("wrapperConfirm", ["Are you sure you sure to delete this " + object_type + "?", "Delete"], (function(_this) {
        return function(confirmed) {
          $(".editbar .delete").addClass("loading");
          return Page.saveContent(_this.getObject(_this.elem), null, function() {
            return _this.stopEdit();
          });
        };
      })(this));
      return false;
    };

    InlineEditor.prototype.cancelEdit = function() {
      this.stopEdit();
      this.elem.html(this.content_before);
      $('pre code').each(function(i, block) {
        return hljs.highlightBlock(block);
      });
      Page.cleanupImages();
      return false;
    };

    InlineEditor.prototype.copyStyle = function(elem_from, elem_to) {
      var from_style;
      elem_to.addClass(elem_from[0].className);
      from_style = getComputedStyle(elem_from[0]);
      elem_to.css({
        fontFamily: from_style.fontFamily,
        fontSize: from_style.fontSize,
        fontWeight: from_style.fontWeight,
        marginTop: from_style.marginTop,
        marginRight: from_style.marginRight,
        marginBottom: from_style.marginBottom,
        marginLeft: from_style.marginLeft,
        paddingTop: from_style.paddingTop,
        paddingRight: from_style.paddingRight,
        paddingBottom: from_style.paddingBottom,
        paddingLeft: from_style.paddingLeft,
        lineHeight: from_style.lineHeight,
        textAlign: from_style.textAlign,
        color: from_style.color,
        letterSpacing: from_style.letterSpacing
      });
      if (elem_from.innerWidth() < 1000) {
        return elem_to.css("minWidth", elem_from.innerWidth());
      }
    };

    InlineEditor.prototype.autoExpand = function(elem) {
      var editor;
      editor = elem[0];
      elem.height(1);
      elem.on("input", function() {
        if (editor.scrollHeight > elem.height()) {
          return elem.height(1).height(editor.scrollHeight + parseFloat(elem.css("borderTopWidth")) + parseFloat(elem.css("borderBottomWidth")));
        }
      });
      elem.trigger("input");
      return elem.on('keydown', function(e) {
        var s, val;
        if (e.which === 9) {
          e.preventDefault();
          s = this.selectionStart;
          val = elem.val();
          elem.val(val.substring(0, this.selectionStart) + "\t" + val.substring(this.selectionEnd));
          return this.selectionEnd = s + 1;
        }
      });
    };

    InlineEditor.prototype.enable = function(v) {
      if (v == null) {
        v = true;
      }
      return this.disable(!v);
    };

    InlineEditor.prototype.disable = function(v) {
      if (v == null) {
        v = true;
      }
      this.elem.data("editable-disabled", "" + v);
      if (this.edit_button && this.disabled()) {
        return this.edit_button.hide();
      } else {
        return this.edit_button.show();
      }
    };

    InlineEditor.prototype.enabled = function() {
      return !this.disabled();
    };

    InlineEditor.prototype.disabled = function() {
      return this.elem.data("editable-disabled") === "true";
    };

    return InlineEditor;

  })();

  window.InlineEditor = InlineEditor;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/Meditor.coffee ---- */


(function() {
  var Meditor,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Meditor = (function(superClass) {
    extend(Meditor, superClass);

    function Meditor(tag_original, body) {
      this.tag_original = tag_original;
      this.val = bind(this.val, this);
      this.remove = bind(this.remove, this);
      this.save = bind(this.save, this);
      this.handleEditmodeChange = bind(this.handleEditmodeChange, this);
      this.handleEditorLoad = bind(this.handleEditorLoad, this);
      this.load = bind(this.load, this);
      this.log("Create", this);
      this.tag_original.insertAdjacentHTML('beforeBegin', "<div class='meditor'></div>");
      this.tag_container = this.tag_original.previousSibling;
      this.tag_container.insertAdjacentHTML('afterBegin', this.tag_original.outerHTML);
      this.tag_original.style.display = "none";
      this.tag = this.tag_container.firstChild;
      if (body) {
        this.tag.innerHTML = marked(body, {
          gfm: true,
          breaks: true
        });
      }
      this;
    }

    Meditor.prototype.load = function() {
      var script, style;
      if (!window.AlloyEditor) {
        style = document.createElement("link");
        style.href = "./static/css/alloy-editor.css";
        style.rel = "stylesheet";
        document.head.appendChild(style);
        script = document.createElement("script");
        script.src = "./static/js/alloy-editor.js?lang=" + ZeroNetBlog.lang;
        document.head.appendChild(script);
        return script.onload = this.handleEditorLoad;
      } else {
        return this.handleEditorLoad();
      }
    };

    Meditor.prototype.handleEditorLoad = function() {
      this.tag.insertAdjacentHTML('beforeBegin', "<a href='#Markdown' class='meditor-editmode' title='Switch to markdown'>&lt;/&gt;</a>");
      this.tag_editmode = this.tag.previousSibling;
      this.tag_editmode.onclick = this.handleEditmodeChange;
      this.editor = new CustomAlloyEditor(this.tag);
      if (this.handleImageSave) {
        this.editor.handleImageSave = this.handleImageSave;
      }
      this.tag.insertAdjacentHTML('beforeBegin', this.tag_original.outerHTML);
      this.tag_markdown = this.tag.previousSibling;
      this.tag_markdown.innerHTML = "<textarea class='meditor-markdown'>MARKDOWN</textarea>";
      this.autoHeight(this.tag_markdown.firstChild);
      this.tag_markdown.style.display = "none";
      return setTimeout(((function(_this) {
        return function() {
          return typeof _this.onLoad === "function" ? _this.onLoad() : void 0;
        };
      })(this)), 1);
    };

    Meditor.prototype.autoHeight = function(elem) {
      var h, height_before, scrollh;
      height_before = elem.style.height;
      if (height_before) {
        elem.style.height = "0px";
      }
      h = elem.offsetHeight;
      scrollh = elem.scrollHeight;
      elem.style.height = height_before;
      if (scrollh > h) {
        elem.style.height = scrollh + "px";
        return elem.style.scrollTop = "0px";
      } else {
        return elem.style.height = height_before;
      }
    };

    Meditor.prototype.getMarkdown = function() {
      var back;
      if (this.tag_editmode.classList.contains("markdown")) {
        back = this.tag_markdown.firstChild.value;
      } else {
        back = toMarkdown(this.tag.innerHTML, {
          gfm: true
        });
      }
      return back;
    };

    Meditor.prototype.getHtml = function() {
      var back;
      if (this.tag_editmode.classList.contains("markdown")) {
        return back = marked(this.tag_markdown.firstChild.value, {
          gfm: true,
          breaks: true
        });
      } else {
        return back = marked(this.getMarkdown(), {
          gfm: true,
          breaks: true
        });
      }
    };

    Meditor.prototype.handleEditmodeChange = function() {
      if (this.tag_editmode.classList.contains("markdown")) {
        this.tag_markdown.style.display = "none";
        this.tag.style.display = "";
        this.tag.innerHTML = this.getHtml();
      } else {
        this.tag_markdown.style.display = "";
        this.tag_markdown.style.width = this.tag.offsetWidth + "px";
        this.tag.style.display = "none";
        this.tag_markdown.firstChild.value = this.getMarkdown();
        this.autoHeight(this.tag_markdown.firstChild);
      }
      this.tag_editmode.classList.toggle("markdown");
      return false;
    };

    Meditor.prototype.save = function() {
      return this.tag_original.innerHTML = this.getHtml();
    };

    Meditor.prototype.remove = function() {
      this.tag_editmode.remove();
      this.tag_markdown.remove();
      this.tag_original.style.display = "";
      return this.tag.remove();
    };

    Meditor.prototype.val = function() {
      return this.getMarkdown();
    };

    return Meditor;

  })(Class);

  window.Meditor = Meditor;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/Menu.coffee ---- */


(function() {
  var Menu,
    slice = [].slice;

  Menu = (function() {
    function Menu(button) {
      this.button = button;
      this.elem = $(".menu.template").clone().removeClass("template");
      this.elem.appendTo("body");
      this.items = [];
    }

    Menu.prototype.show = function() {
      var button_pos;
      if (window.visible_menu && window.visible_menu.button[0] === this.button[0]) {
        window.visible_menu.hide();
        return this.hide();
      } else {
        button_pos = this.button.offset();
        this.elem.css({
          "top": button_pos.top + this.button.outerHeight(),
          "left": button_pos.left + this.button.outerWidth() - this.elem.outerWidth()
        });
        this.button.addClass("menu-active");
        this.elem.addClass("visible");
        if (window.visible_menu) {
          window.visible_menu.hide();
        }
        return window.visible_menu = this;
      }
    };

    Menu.prototype.hide = function() {
      this.elem.removeClass("visible");
      this.button.removeClass("menu-active");
      return window.visible_menu = null;
    };

    Menu.prototype.addItem = function(title, cb) {
      var item;
      item = $(".menu-item.template", this.elem).clone().removeClass("template");
      item.html(title);
      item.on("click", (function(_this) {
        return function() {
          if (!cb(item)) {
            _this.hide();
          }
          return false;
        };
      })(this));
      item.appendTo(this.elem);
      this.items.push(item);
      return item;
    };

    Menu.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[Menu]"].concat(slice.call(args)));
    };

    return Menu;

  })();

  window.Menu = Menu;

  $("body").on("click", function(e) {
    if (window.visible_menu && e.target !== window.visible_menu.button[0] && $(e.target).parent()[0] !== window.visible_menu.elem[0]) {
      return window.visible_menu.hide();
    }
  });

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/RateLimit.coffee ---- */


(function() {
  var call_after_interval, limits;

  limits = {};

  call_after_interval = {};

  window.RateLimit = function(interval, fn) {
    if (!limits[fn]) {
      call_after_interval[fn] = false;
      fn();
      return limits[fn] = setTimeout((function() {
        if (call_after_interval[fn]) {
          fn();
        }
        delete limits[fn];
        return delete call_after_interval[fn];
      }), interval);
    } else {
      return call_after_interval[fn] = true;
    }
  };

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/SizeLimits.coffee ---- */


(function() {
  var SizeLimits;

  SizeLimits = (function() {
    function SizeLimits() {}

    SizeLimits.prototype.increaseValue = function(v) {
      var d;
      if (v < 1000) {
        return 1000;
      }
      d = 1;
      while (v >= 10) {
        v = v / 10;
        d = d * 10;
      }
      if (v >= 5) {
        v = 10;
      } else if (v >= 2) {
        v = 5;
      } else if (v >= 1) {
        v = 2;
      } else {
        v = 1;
      }
      return v * d;
    };

    SizeLimits.prototype.decreaseValue = function(v) {
      var d;
      if (v <= 1000) {
        return v;
      }
      d = 1;
      while (v > 10) {
        v = v / 10;
        d = d * 10;
      }
      if (v > 5) {
        v = 5;
      } else if (v > 2) {
        v = 2;
      } else if (v > 1) {
        v = 1;
      } else {
        v = 0.5;
      }
      return v * d;
    };

    SizeLimits.prototype.increaseUserSizeLimit = function(app, user_address, mode) {
      var content_json, new_max_size, rules, user_content_json;
      rules = null;
      user_content_json = null;
      content_json = null;
      new_max_size = null;
      return $.when().then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return app.cmd("fileRules", "data/users/" + user_address + "/content.json", function(_rules) {
              rules = _rules;
              return d.resolve();
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return app.readJSON(["data/users/" + user_address + "/content.json"], function(res) {
              user_content_json = res;
              if (res) {
                return d.resolve();
              } else {
                return d.reject();
              }
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return app.readJSON(["data/users/content.json"], function(res) {
              content_json = res;
              if (res) {
                return d.resolve();
              } else {
                return d.reject();
              }
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            var cert_user_id;
            if (!content_json.user_contents) {
              d.reject();
              return;
            }
            if (!user_content_json.cert_user_id) {
              d.reject();
              return;
            }
            cert_user_id = "" + user_content_json.cert_user_id;
            if (mode < 0) {
              new_max_size = _this.decreaseValue(rules.max_size);
            } else {
              new_max_size = _this.increaseValue(rules.max_size);
            }
            if (!content_json.user_contents.permissions) {
              content_json.user_contents.permissions = {};
            }
            if (!content_json.user_contents.permissions[cert_user_id]) {
              content_json.user_contents.permissions[cert_user_id] = {};
            }
            content_json.user_contents.permissions[cert_user_id].max_size = new_max_size;
            return d.resolve();
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return app.writeJSON("data/users/content.json", content_json, false, function(res) {
              if (res === "write_ok") {
                return d.resolve();
              } else {
                return d.reject();
              }
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return app.cmd("fileRules", "data/users/" + user_address + "/content.json", function(_rules) {
              if (_rules.max_size === new_max_size) {
                return d.resolve();
              } else {
                return d.reject();
              }
            });
          });
        };
      })(this)).promise();
    };

    return SizeLimits;

  })();

  window.SizeLimits = new SizeLimits;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/Text.coffee ---- */


(function() {
  var Renderer, Text,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Renderer = (function(superClass) {
    extend(Renderer, superClass);

    function Renderer() {
      return Renderer.__super__.constructor.apply(this, arguments);
    }

    Renderer.prototype.image = function(href, title, text) {
      if (this.options.sanitize) {
        if (title && title !== "") {
          title = "\" " + title + "\"";
        } else {
          title = "";
        }
        return "<code>![" + text + "](" + href + title + ")</code>";
      }
      if (this.options.detect_media_by_description) {
        if (text.match(/^video:/)) {
          return this.extVideo(href, title, text);
        } else if (text.match(/^audio:/)) {
          return this.extAudio(href, title, text);
        }
      }
      if (this.options.detect_media_by_extension) {
        if (href.match(/\.(mp4|webm)(#.*)?$/i)) {
          return this.extVideo(href, title, text);
        } else if (href.match(/\.(mp3|wav|flac)(#.*)?$/i)) {
          return this.extAudio(href, title, text);
        }
      }
      return Renderer.__super__.image.call(this, href, title, text);
    };

    Renderer.prototype.extVideo = function(href, title, text) {
      if (title == null) {
        title = "";
      }
      return "<video controls=\"controls\" src=\"" + href + "\" title=\"" + title + "\">\n	Your browser does not support the video tag.\n</video>";
    };

    Renderer.prototype.extAudio = function(href, title, text) {
      if (title == null) {
        title = "";
      }
      return "<audio controls=\"controls\" src=\"" + href + "\" title=\"" + title + "\">\n	Your browser does not support the audio tag.\n</audio>";
    };

    return Renderer;

  })(marked.Renderer);

  Text = (function() {
    function Text() {}

    Text.prototype.formatBytes = function(n) {
      if (n >= 1000000000) {
        return ((n / 1000000000).toFixed(1)) + "GB";
      } else if (n >= 1000000) {
        return ((n / 1000000).toFixed(1)) + "MB";
      } else if (n >= 1000) {
        return ((n / 1000).toFixed(1)) + "kB";
      } else {
        return (n.toFixed(0)) + "B";
      }
    };

    Text.prototype.toColor = function(text, saturation, lightness) {
      var hash, i, j, ref, ref1, ref2;
      if (saturation == null) {
        saturation = 30;
      }
      if (lightness == null) {
        lightness = 50;
      }
      hash = 0;
      for (i = j = 0, ref = text.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        hash += text.charCodeAt(i) * i;
        hash = hash % 1777;
      }
      if (((ref1 = Page.server_info) != null ? (ref2 = ref1.user_settings) != null ? ref2.theme : void 0 : void 0) === "dark") {
        return "hsl(" + (hash % 360) + ("," + (saturation + 5) + "%," + (lightness + 15) + "%)");
      } else {
        return "hsl(" + (hash % 360) + ("," + saturation + "%," + lightness + "%)");
      }
    };

    Text.prototype.renderMarked = function(text, options) {
      if (options == null) {
        options = {};
      }
      options["gfm"] = true;
      options["breaks"] = true;
      options["renderer"] = renderer;
      text = marked(text, options);
      return this.fixHtmlLinks(text);
    };

    Text.prototype.fixHtmlLinks = function(text) {
      return ZeroUrl.rebaseHtmlLinks(text);
    };

    Text.prototype.fixLink = function(link) {
      return ZeroUrl.rebaseUrl(link);
    };

    Text.prototype.toUrl = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
    };

    Text.prototype.format = function() {
      var args, fmt;
      args = Array.from(arguments);
      fmt = args.shift();
      return fmt;
    };

    return Text;

  })();

  window.renderer = new Renderer();

  window.Text = new Text();

}).call(this);



/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/Time.coffee ---- */


(function() {
  var Time;

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(time) {
      var back, now, secs;
      now = +(new Date) / 1000;
      secs = now - time;
      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " minutes ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = "on " + this.date(time);
      }
      back = back.replace(/1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Time.prototype.date = function(timestamp, format) {
      var display, parts;
      if (format == null) {
        format = "short";
      }
      parts = (new Date(timestamp * 1000)).toString().split(" ");
      if (format === "short") {
        display = parts.slice(1, 4);
      } else {
        display = parts.slice(1, 5);
      }
      return display.join(" ").replace(/( [0-9]{4})/, ",$1");
    };

    Time.prototype.timestamp = function(date) {
      if (date == null) {
        date = "";
      }
      if (date === "now" || date === "") {
        return parseInt(+(new Date) / 1000);
      } else {
        return parseInt(Date.parse(date) / 1000);
      }
    };

    Time.prototype.readtime = function(text) {
      var chars;
      chars = text.length;
      if (chars > 1500) {
        return parseInt(chars / 1500) + " min read";
      } else {
        return "less than 1 min read";
      }
    };

    return Time;

  })();

  window.Time = new Time;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/10-utils/ZeroUrl.coffee ---- */


(function() {
  var ZeroUrl,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ZeroUrl = (function() {
    function ZeroUrl() {
      this.parse = bind(this.parse, this);
      this.normalizeUrl = bind(this.normalizeUrl, this);
      this.rebaseUrl = bind(this.rebaseUrl, this);
      this.isZeronetDomainsProxied = bind(this.isZeronetDomainsProxied, this);
    }

    ZeroUrl.prototype.isZeronetDomainsProxied = function() {
      return window.location.host === "zero" || window.location.pathname === "/";
    };

    ZeroUrl.prototype.rebaseHtmlLinks = function(text) {
      var replacer;
      replacer = (function(_this) {
        return function(match, p1, p2, p3) {
          return p1 + _this.rebaseUrl(p2) + p3;
        };
      })(this);
      return text.replace(/(href=")([^"]+)(")/g, replacer).replace(/(href=')([^']+)(')/g, replacer).replace(/(src=")([^"]+)(")/g, replacer).replace(/(src=')([^']+)(')/g, replacer);
    };

    ZeroUrl.prototype.rebaseUrl = function(url) {
      var tmp;
      if (this.isZeronetDomainsProxied()) {
        tmp = url.replace(/^http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
        return tmp.replace(/^http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
      } else {
        return url.replace(/^http:\/\/(127.0.0.1|localhost):43110/, '');
      }
    };

    ZeroUrl.prototype.normalizeUrl = function(url) {
      var match;
      if (this.isZeronetDomainsProxied()) {
        if (match = url.match(/^http:\/\/zero\/(.+)/)) {
          return 'http://127.0.0.1:43110/' + match[1];
        } else if (match = url.match(/^http:\/\/([^\/]+\.bit)\/(.+)/)) {
          return 'http://127.0.0.1:43110/' + match[1] + '/' + match[2];
        } else {
          return url;
        }
      } else {
        if (url.match(/^\/(1[a-km-zA-HJ-NP-Z1-9]{25,34}|[[^\/]+\.bit])/)) {
          return 'http://127.0.0.1:43110' + url;
        }
        if (url.startsWith(window.location.origin)) {
          return 'http://127.0.0.1:43110' + url.removePrefix(window.location.origin);
        } else {
          return url;
        }
      }
    };

    ZeroUrl.prototype.parse = function(url, options) {
      var match;
      if (options == null) {
        options = {};
      }
      if (options.normalize) {
        url = this.normalizeUrl(url);
      }
      match = url.match(/^http:\/\/127\.0\.0\.1:43110\/([^\/]+)\/?(.*)/);
      if (!match) {
        return false;
      }
      return {
        url: url,
        siteAddress: match[1],
        innerPath: match[2]
      };
    };

    return ZeroUrl;

  })();

  window.ZeroUrl = new ZeroUrl();

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/20-components/BlogSettings.coffee ---- */


(function() {
  var BlogSettings,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BlogSettings = (function(superClass) {
    extend(BlogSettings, superClass);

    function BlogSettings() {
      this.routeUrl = bind(this.routeUrl, this);
      return BlogSettings.__super__.constructor.apply(this, arguments);
    }

    BlogSettings.prototype.routeUrl = function(url) {
      var match;
      if (match = url.match(/Settings:(.*)/)) {
        return this.pageSettings(match[1]);
      }
      return void 0;
    };

    BlogSettings.prototype.pageSettings = function(tocType) {
      var d;
      this.app.applyPageClass("settings");
      d = tocType.match(/^LeftBar/) ? this.pageSettingsLeftBar() : tocType.match(/^Footer/) ? this.pageSettingsFooter() : tocType.match(/^Tags/) ? this.pageSettingsTags() : tocType.match(/^Editor/) ? this.pageSettingsEditor() : tocType.match(/^Content/) ? this.pageSettingsContent() : tocType.match(/^BuildLog/) ? this.pageSettingsBuildLog() : this.pageSettingsMain();
      Comments.hide();
      return d;
    };

    BlogSettings.prototype.pageSettingsLeftBar = function() {
      var body, title;
      title = "Left Bar Settings";
      body = "<label class='settings-boolean' data-settings='show_avatar'>Show Avatar</label>\n<label class='settings-boolean' data-settings='show_title'>Show Blog Title</label>\n<label class='settings-boolean' data-settings='show_description'>Show Blog Description</label>\n<label class='settings-boolean' data-settings='show_toc'>Show Table of Contents</label>\n<label class='settings-boolean' data-settings='show_links'>Show Additional Links</label>\n<label class='settings-boolean' data-settings='show_latest_comments'>Show Latest Comments</label>\n<p class='hrboldline'></p>\n\n**Display the Left Bar shadowed:**\n\n<label class='settings-boolean' data-settings='shadow_left_bar_on_regular_posts'>On regular post pages</label>\n<label class='settings-boolean' data-settings='shadow_left_bar_on_main_page'>On the main page</label>\n<label class='settings-boolean' data-settings='shadow_left_bar_on_aux_pages'>On auxiliary pages (TOC, Settings etc)</label>\n<small>Those settings apply in the desktop view only.</small>\n<p class='hrboldline'></p>\n\n[Back to the previous page](?Settings:Main)";
      return this.app.applyAuxPostData(title, body);
    };

    BlogSettings.prototype.pageSettingsFooter = function() {
      var body, title;
      title = "Footer Settings";
      body = "<label class='settings-boolean' data-settings='show_footer'>Show Footer</label>\n\n<p class='hrboldline'></p>\n\n[Back to the previous page](?Settings:Main)";
      return this.app.applyAuxPostData(title, body);
    };

    BlogSettings.prototype.pageSettingsTags = function() {
      var body, title;
      title = "Tag Settings";
      body = "<label class='settings-boolean' data-settings='enable_tags'>Enable Tag Support</label>\n\n<p class='hrboldline'></p>\n\n[Back to the previous page](?Settings:Main)";
      return this.app.applyAuxPostData(title, body);
    };

    BlogSettings.prototype.pageSettingsEditor = function() {
      var body, title;
      title = "Editor Settings";
      body = "<label class='settings-boolean' data-settings='enable_editbg'>Shadow other content on the page when editing a text entry</label>\n\n<p class='hrboldline'></p>\n\n[Back to the previous page](?Settings:Main)";
      return this.app.applyAuxPostData(title, body);
    };

    BlogSettings.prototype.pageSettingsContent = function() {
      var body, title;
      title = "Content Settings";
      body = "<label class='settings-boolean' data-settings='enable_cors_resolver'>Enable the automatic Cross Origin Resource Sharing requests for multimedia content. <small>(Only images, currently.)</small></label>\n\n<p class='hrboldline'></p>\n\n**Video and Audio:**\n\n<label class='settings-boolean' data-settings='detect_media_by_extension'>Allow the image markdown `![]()` to be interpreted as video or audio tag based on the well-known extensions:</label>\n<small>Video: **.mp4**, **.webm**. Audio: **.mp3**, **.wav**, **.flac**.</small>\n\n<label class='settings-boolean' data-settings='detect_media_by_description'>Allow the image markdown `![]()` to be interpreted as video or audio tag based on the keywords:</label>\n<small>Video: `![video:](/url)`</small>\n<small>Audio: `![audio:](/url)`</small>\n\n<p class='hrboldline'></p>\n\n[Back to the previous page](?Settings:Main)";
      return this.app.applyAuxPostData(title, body);
    };

    BlogSettings.prototype.pageSettingsBuildLog = function() {
      return this.queryBuildLog().then((function(_this) {
        return function(buildlog) {
          var body, title;
          title = "BuildLog";
          body = "\n```diff\n" + buildlog + "\n```\n";
          body += "<p class='hrboldline'></p>\n\n[Back to the previous page](?Settings:Main)";
          return _this.app.applyAuxPostData(title, body);
        };
      })(this));
    };

    BlogSettings.prototype.queryBuildLog = function() {
      return $.Deferred((function(_this) {
        return function(d) {
          return _this.app.cmd("fileGet", ["content.json"], function(res) {
            var buildlog_is_in_list, json;
            buildlog_is_in_list = false;
            try {
              json = JSON.parse(res);
              buildlog_is_in_list = Boolean(json && json["files"] && json["files"]["buildlog.txt"]);
            } catch (error) {
              buildlog_is_in_list = false;
            }
            return d.resolve(buildlog_is_in_list);
          });
        };
      })(this)).then((function(_this) {
        return function(buildlog_is_in_list) {
          return $.Deferred(function(d) {
            if (buildlog_is_in_list) {
              return _this.app.cmd("fileGet", ["buildlog.txt"], function(res) {
                return d.resolve(res);
              });
            } else {
              return d.resolve(null);
            }
          });
        };
      })(this)).promise();
    };

    BlogSettings.prototype.pageSettingsMain = function() {
      return this.queryBuildLog().then((function(_this) {
        return function(buildlog) {
          var body, title;
          title = "Blog Settings";
          body = "* [Left Bar](?Settings:LeftBar)\n* [Footer](?Settings:Footer)\n* [Tags](?Settings:Tags)\n* [Editor](?Settings:Editor)\n* [Content](?Settings:Content)\n\n";
          if (buildlog) {
            body += "<p class='hrboldline'></p>\n* [BuildLog](?/Settings:BuildLog)";
          }
          return _this.app.applyAuxPostData(title, body);
        };
      })(this));
    };

    return BlogSettings;

  })(Component);

  window.BlogSettings = BlogSettings;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/20-components/FollowButton.coffee ---- */


(function() {
  var FollowButton,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  FollowButton = (function(superClass) {
    extend(FollowButton, superClass);

    function FollowButton() {
      this.setSiteInfo = bind(this.setSiteInfo, this);
      this.onDataReady = bind(this.onDataReady, this);
      return FollowButton.__super__.constructor.apply(this, arguments);
    }

    FollowButton.prototype.onDataReady = function() {
      return this.initFollowButton();
    };

    FollowButton.prototype.setSiteInfo = function(site_info) {
      var mentions_menu_elem, ref;
      if (((ref = site_info.event) != null ? ref[0] : void 0) === "cert_changed" && site_info.cert_user_id) {
        this.initFollowButton();
        mentions_menu_elem = this.follow.feeds["Username mentions"][1];
        return setTimeout(((function(_this) {
          return function() {
            if (!mentions_menu_elem.hasClass("selected")) {
              return mentions_menu_elem.trigger("click");
            }
          };
        })(this)), 100);
      }
    };

    FollowButton.prototype.initFollowButton = function() {
      var username;
      this.follow = new Follow($(".feed-follow"));
      this.follow.addFeed("Posts", "SELECT post_id AS event_uri, 'post' AS type, date_published AS date_added, IFNULL(NULLIF(title, ''), '(untitled)') AS title, body AS body, '?Post:' || post_id AS url FROM post", true);
      if (this.app.site_info.cert_user_id) {
        username = this.app.site_info.cert_user_id.replace(/@.*/, "");
        this.follow.addFeed("Username mentions", "SELECT 'mention' AS type, date_added, IFNULL(NULLIF(post.title, ''), '(untitled)') AS title, keyvalue.value || ': ' || comment.body AS body, '?Post:' || comment.post_id || '#Comments' AS url FROM comment LEFT JOIN json USING (json_id) LEFT JOIN json AS json_content ON (json_content.directory = json.directory AND json_content.file_name='content.json') LEFT JOIN keyvalue ON (keyvalue.json_id = json_content.json_id AND key = 'cert_user_id') LEFT JOIN post ON (comment.post_id = post.post_id) WHERE comment.body LIKE '%[" + username + "%' OR comment.body LIKE '%@" + username + "%'", true);
      }
      this.follow.addFeed("Comments", "SELECT 'comment' AS type, date_added, IFNULL(NULLIF(post.title, ''), '(untitled)') AS title, keyvalue.value || ': ' || comment.body AS body, '?Post:' || comment.post_id || '#Comments' AS url FROM comment LEFT JOIN json USING (json_id) LEFT JOIN json AS json_content ON (json_content.directory = json.directory AND json_content.file_name='content.json') LEFT JOIN keyvalue ON (keyvalue.json_id = json_content.json_id AND key = 'cert_user_id') LEFT JOIN post ON (comment.post_id = post.post_id)");
      return this.follow.init();
    };

    return FollowButton;

  })(Component);

  window.FollowButton = FollowButton;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/20-components/LatestComments.coffee ---- */


(function() {
  var LatestComments,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  LatestComments = (function(superClass) {
    extend(LatestComments, superClass);

    function LatestComments() {
      this.onFileUpdate = bind(this.onFileUpdate, this);
      this.applyCommonParts = bind(this.applyCommonParts, this);
      return LatestComments.__super__.constructor.apply(this, arguments);
    }

    LatestComments.prototype.applyCommonParts = function() {
      return this.loadLastcomments("noanim");
    };

    LatestComments.prototype.onFileUpdate = function(inner_path, state) {
      if (inner_path.match(/.*users.*data.json$/)) {
        if (state === "file_done" || state === "file_written") {
          return RateLimit(500, (function(_this) {
            return function() {
              return _this.loadLastcomments();
            };
          })(this));
        }
      }
    };

    LatestComments.prototype.loadLastcomments = function(type, cb) {
      var query;
      if (type == null) {
        type = "show";
      }
      if (cb == null) {
        cb = false;
      }
      if (!this.app.getBooleanSettings("show_latest_comments")) {
        $(".lastcomments").css("display", "none");
        return;
      }
      query = "SELECT comment.*, json_content.json_id AS content_json_id, keyvalue.value AS cert_user_id, json.directory, post.title AS post_title FROM comment LEFT JOIN json USING (json_id) LEFT JOIN json AS json_content ON (json_content.directory = json.directory AND json_content.file_name='content.json') LEFT JOIN keyvalue ON (keyvalue.json_id = json_content.json_id AND key = 'cert_user_id') LEFT JOIN post ON (comment.post_id = post.post_id) WHERE post.title IS NOT NULL ORDER BY date_added DESC LIMIT 5";
      return this.app.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var comment_ids, elem, j, lastcomment, len, older_elems;
          if (res.length) {
            $(".lastcomments").css("display", "block");
            res.reverse();
          }
          comment_ids = res.map(function(comment) {
            return "lastcomment_" + comment.json_id + "_" + comment.comment_id;
          });
          $(".lastcomments .lastcomment:not(.deletion-in-progress)").each(function(i, elem) {
            var id;
            id = $(elem).attr("id");
            if (id && indexOf.call(comment_ids, id) < 0) {
              if (type !== "noanim") {
                $(elem).addClass("deletion-in-progress");
                return $(elem).slideUp(600, function() {
                  return $(elem).remove();
                });
              } else {
                return $(elem).remove();
              }
            }
          });
          for (j = 0, len = res.length; j < len; j++) {
            lastcomment = res[j];
            elem = $("#lastcomment_" + lastcomment.json_id + "_" + lastcomment.comment_id + ":not(.deletion-in-progress)");
            if (elem.length === 0) {
              elem = $(".lastcomment.template").clone().removeClass("template").attr("id", "lastcomment_" + lastcomment.json_id + "_" + lastcomment.comment_id);
              $(elem).data("date_added", lastcomment.date_added);
              if (type !== "noanim") {
                $(elem).cssSlideDown();
              }
              older_elems = $(".lastcomments .lastcomment").filter(function(i, elem2) {
                return $(elem2).data("date_added") < $(elem).data("date_added");
              }).sort(function(a, b) {
                return (+$(b).data("date_added")) - (+$(a).data("date_added"));
              });
              if (older_elems.length === 0) {
                $(elem).appendTo(".lastcomments ul");
              } else {
                $(elem).insertBefore($(older_elems[0]));
              }
            }
            _this.applyLastcommentdata(elem, lastcomment);
          }
          if (cb) {
            return cb();
          }
        };
      })(this));
    };

    LatestComments.prototype.applyLastcommentdata = function(elem, lastcomment) {
      var body, title, title_hash;
      elem.find(".user_name").text(lastcomment.cert_user_id + ":");
      body = this.app.renderMarkdown(lastcomment.body);
      body = body.replace(/[\r\n]/g, " ");
      body = body.replace(/\<blockquote\>.*?\<\/blockquote\>/g, " ");
      body = body.replace(/\<.*?\>/g, " ");
      if (body.length > 60) {
        body = body.slice(0, 61).replace(/(.*) .*?$/, "$1") + " ...";
      }
      elem.find(".body").html(body);
      title_hash = lastcomment.post_title.replace(/[#?& ]/g, "+").replace(/[+]+/g, "+");
      title = lastcomment.post_title;
      if (title === "") {
        title = "(untitled)";
      }
      return elem.find(".postlink").text(title).attr("href", "?Post:" + lastcomment.post_id + ":" + title_hash + "#Comments");
    };

    return LatestComments;

  })(Component);

  window.LatestComments = LatestComments;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/20-components/UserProfiles.coffee ---- */


(function() {
  var UserProfiles,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  UserProfiles = (function(superClass) {
    extend(UserProfiles, superClass);

    function UserProfiles() {
      this.onFileUpdate = bind(this.onFileUpdate, this);
      this.routeUrl = bind(this.routeUrl, this);
      this.onDataReady = bind(this.onDataReady, this);
      return UserProfiles.__super__.constructor.apply(this, arguments);
    }

    UserProfiles.prototype.onDataReady = function() {
      return this.requestZeroMeUserRegistry();
    };

    UserProfiles.prototype.routeUrl = function(url) {
      var match;
      if (match = url.match(/User:(.*)/)) {
        return this.pageUser(match[1]);
      }
      return void 0;
    };

    UserProfiles.prototype.pageUser = function(user) {
      var d, match;
      this.app.applyPageClass("user");
      d = (match = user.match(/^([1-9a-zA-Z]+)\/Comments/)) ? this.pageUserComments(match[1]) : (match = user.match(/^([1-9a-zA-Z]+)\/CommentVotes/)) ? this.pageUserCommentVotes(match[1]) : (match = user.match(/^([1-9a-zA-Z]+)\/PostVotes/)) ? this.pageUserPostVotes(match[1]) : (match = user.match(/^([1-9a-zA-Z]+)/)) ? this.pageUserProfile(match[1]) : this.pageUserList();
      Comments.hide();
      return d;
    };

    UserProfiles.prototype.pageUserProfile = function(user_address) {
      var content_json, data_json, rules, users;
      users = [];
      rules = {};
      content_json = false;
      data_json = false;
      return $.Deferred().resolve().then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return _this.queryUserProfileData(user_address, function(_users) {
              users = _users;
              return d.resolve();
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            return _this.app.cmd("fileRules", "data/users/" + user_address + "/content.json", function(_rules) {
              rules = _rules;
              return d.resolve();
            });
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            _this.app.cmd("fileQuery", "data/users/" + user_address + "/content.json", function(_content_json) {
              content_json = _content_json;
              return d.resolve();
            });
            return setTimeout((function() {
              return d.resolve();
            }), 5000);
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            _this.app.cmd("fileQuery", "data/users/" + user_address + "/data.json", function(_data_json) {
              data_json = _data_json;
              return d.resolve();
            });
            return setTimeout((function() {
              return d.resolve();
            }), 5000);
          });
        };
      })(this)).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            var body, content_json_modified, filler_offset, last_activity, title, user, user_cert_id;
            title = "";
            body = "";
            if (users.length === 1) {
              user = users[0];
              user_address = user.user_directory.replace("users/", "");
              user_cert_id = user.cert_id;
              content_json_modified = (function() {
                try {
                  return 0 + content_json[0].modified;
                } catch (error) {
                  return 0;
                }
              })();
              last_activity = Math.max(content_json_modified, user.comments_max_date);
              title = user_cert_id;
              body += "<table data-user-address='" + user_address + "'>";
              body += "<tr>";
              body += "<td colspan='2'> <span class='user-name' style='color: " + (Text.toColor(user_address)) + "'>" + user_cert_id + "</span>: <span class='user-address'>" + user_address + "</span> </td>";
              body += "</tr>";
              filler_offset = 0;
              if (rules.max_size > 0 && rules.current_size < rules.max_size) {
                filler_offset = 100 * rules.current_size / rules.max_size;
              }
              filler_offset = 100 - filler_offset;
              body += "<tr>";
              body += "<td>Space Used</td>";
              body += "<td>";
              body += "<div class='force-row grow-left'>";
              body += "	<div class='ui-user-used-space-bar'>";
              body += "		<div class='ui-user-used-space-bar-filler' style='right: " + filler_offset + "%'></div>";
              body += "		<span class='ui-user-used-space-bar-message'>" + (Text.formatBytes(rules.current_size)) + "/" + (Text.formatBytes(rules.max_size)) + "</span>";
              body += "	</div>";
              body += "	<div class='ui-user-used-space-control'></div>";
              body += "</div>";
              body += "</td>";
              body += "</tr>";
              body += "<tr>";
              body += "<td>Comments</td>";
              body += "<td>";
              body += "<span class='ui-user-comments-count'>" + user.comments + "</span>";
              if (user.comments > 0) {
                body += " <a href='?User:" + user_address + "/Comments'>[See all]</a>";
              }
              body += "</td>";
              body += "</tr>";
              body += "<tr>";
              body += "<td>Comment Votes</td>";
              body += "<td>";
              body += "<span class='ui-user-comment-votes-count'>" + user.comment_votes + "</span>";
              if (user.comment_votes > 0) {
                body += " <a href='?User:" + user_address + "/CommentVotes'>[See all]</a>";
              }
              body += "</td>";
              body += "</tr>";
              body += "<tr>";
              body += "<td>Post Votes</td>";
              body += "<td>";
              body += "<span class='ui-user-post-votes-count'>" + user.post_votes + "</span>";
              if (user.post_votes > 0) {
                body += " <a href='?User:" + user_address + "/PostVotes'>[See all]</a>";
              }
              body += "</td>";
              body += "</tr>";
              if (user.comments > 0 && user.comments_min_date !== 0) {
                body += "<tr>";
                body += "<td>The First Comment</td>";
                body += "<td>";
                body += "" + (Time.date(user.comments_min_date, "long"));
                body += "</td>";
                body += "</tr>";
              }
              if (last_activity > 0) {
                body += "<tr>";
                body += "<td>The Last Activity</td>";
                body += "<td>";
                body += "" + (Time.date(last_activity, "long"));
                body += "</td>";
                body += "</tr>";
              }
              body += "<tr class='ui-if-zerome-user-exists'>";
              body += "<td colspan='2'>";
              body += "<div><a class='ui-zerome-user-link'><div class='ui-zerome-user-avatar'></div> <span class='ui-zerome-user-name'></span>@ZeroMe</a>:</div>";
              body += "<div class='ui-zerome-user-intro'></div>";
              body += "</td>";
              body += "</tr>";
              body += "</table>";
            } else {
              title = user_address;
              body += "No such user";
            }
            body += "<p class='hrboldline'></p> <a href='?User:'>Member List</a>";
            _this.app.applyAuxPostData(title, body, {
              convert_from_markdown: false
            });
            _this.updateZeroMeProfileData();
            return d.resolve();
          });
        };
      })(this)).promise();
    };

    UserProfiles.prototype.pageUserList = function() {
      return $.Deferred((function(_this) {
        return function(d) {
          var query;
          query = "SELECT \n	json_content.directory AS user_directory, \n	keyvalue.value AS cert_id, \n	json_data.json_id AS json_data_id, \n	(SELECT COUNT(*) FROM comment WHERE comment.json_id = json_data.json_id) AS comments,  \n	(SELECT COUNT(*) FROM comment_vote WHERE comment_vote.json_id = json_data.json_id) AS comment_votes, \n	(SELECT COUNT(*) FROM post_vote WHERE post_vote.json_id = json_data.json_id) AS post_votes \nFROM json AS json_content \nINNER JOIN keyvalue \nON (json_content.json_id = keyvalue.json_id AND keyvalue.key = 'cert_user_id' AND json_content.file_name = 'content.json') \nLEFT JOIN json AS json_data \nON (user_directory = json_data.directory AND json_data.file_name = 'data.json') \nORDER BY cert_id; ";
          return _this.app.cmd("dbQuery", query, function(users) {
            var body, j, len, title, user, user_address, user_cert_id;
            title = "Users";
            body = "";
            body += "<table>";
            for (j = 0, len = users.length; j < len; j++) {
              user = users[j];
              user_address = user.user_directory.replace("users/", "");
              user_cert_id = user.cert_id;
              body += "<tr>";
              body += "<td> <a href='?User:" + user_address + "' class='invisible-link block'> <span class='user-name' style='color: " + (Text.toColor(user_address)) + "'>" + user_cert_id + "</span>: <span class='user-address'>" + user_address + "</span> </a> </td>";
              body += "<td>";
              body += "<a href='?User:" + user_address + "/Comments'>";
              body += "<span title='Comments'>" + user.comments + "</span>";
              body += "</a>/";
              body += "<a href='?User:" + user_address + "/CommentVotes'>";
              body += "<span title='Comment Votes'>" + user.comment_votes + "</span>";
              body += "</a>/";
              body += "<a href='?User:" + user_address + "/PostVotes'>";
              body += "<span title='Post Votes'>" + user.post_votes + "</span>";
              body += "</a>";
              body += "</td>";
              body += "</tr>";
            }
            body += "</table>";
            _this.app.applyAuxPostData(title, body, {
              convert_from_markdown: false
            });
            return d.resolve();
          });
        };
      })(this)).promise();
    };

    UserProfiles.prototype.onFileUpdate = function(inner_path, state) {
      if (inner_path.match(/.*users.*\.json$/)) {
        if (state === "file_done" || state === "file_written") {
          return RateLimit(500, (function(_this) {
            return function() {
              _this.updateUserData();
              return _this.updateZeroMeProfileData();
            };
          })(this));
        }
      }
    };

    UserProfiles.prototype.updateUserData = function() {
      var ui;
      $(".ui-user-used-space-bar").each((function(_this) {
        return function(i, elem) {
          var user_address;
          user_address = $(elem).parentData("user-address");
          if (user_address) {
            return _this.app.cmd("fileRules", "data/users/" + user_address + "/content.json", function(rules) {
              var filler_offset;
              filler_offset = 0;
              if (rules.max_size > 0 && rules.current_size < rules.max_size) {
                filler_offset = 100 * rules.current_size / rules.max_size;
              }
              filler_offset = 100 - filler_offset;
              $(".ui-user-used-space-bar-filler", elem).css("right", filler_offset + "%");
              return $(".ui-user-used-space-bar-message", elem).text((Text.formatBytes(rules.current_size)) + "/" + (Text.formatBytes(rules.max_size)));
            });
          }
        };
      })(this));
      ui = {};
      $(".ui-user-comments-count, .ui-user-comment-votes-count, .ui-user-post-votes-count, .ui-user-last-activity-date").each((function(_this) {
        return function(i, elem) {
          var base, user_address;
          user_address = $(elem).parentData("user-address");
          if (user_address && user_address.match(/^[0-9a-zA-Z]+$/)) {
            if (ui[user_address] == null) {
              ui[user_address] = {};
            }
            if ((base = ui[user_address]).ui_elems == null) {
              base.ui_elems = [];
            }
            return ui[user_address].ui_elems.push(elem);
          }
        };
      })(this));
      return Object.keys(ui).forEach((function(_this) {
        return function(user_address) {
          _this.app.log(user_address);
          return _this.queryUserProfileData(user_address, function(users) {
            var user;
            if (users.length !== 1) {
              return;
            }
            user = users[0];
            return ui[user_address].ui_elems.forEach(function(elem) {
              if ($(elem).hasClass("ui-user-comments-count")) {
                return $(elem).text(user.comments);
              } else if ($(elem).hasClass("ui-user-comment-votes-count")) {
                return $(elem).text(user.comment_votes);
              } else if ($(elem).hasClass("ui-user-post-votes-count")) {
                return $(elem).text(user.post_votes);
              }
            });
          });
        };
      })(this));
    };

    UserProfiles.prototype.queryUserProfileData = function(user_address, cb) {
      var filter, query, query_params;
      if (user_address) {
        query_params = {
          directory: "users/" + user_address
        };
        filter = ' AND json_content.directory = :directory';
      } else {
        query_params = void 0;
        filter = '';
      }
      query = "SELECT \n	json_content.directory AS user_directory, \n	keyvalue.value AS cert_id, \n	json_data.json_id AS json_data_id, \n	(SELECT COUNT(*) FROM comment WHERE comment.json_id = json_data.json_id) AS comments, \n	(SELECT COUNT(*) FROM comment_vote WHERE comment_vote.json_id = json_data.json_id) AS comment_votes, \n	(SELECT COUNT(*) FROM post_vote WHERE post_vote.json_id = json_data.json_id) AS post_votes, \n	(SELECT MIN(date_added) FROM comment WHERE comment.json_id = json_data.json_id) AS comments_min_date,\n	(SELECT MAX(date_added) FROM comment WHERE comment.json_id = json_data.json_id) AS comments_max_date\nFROM json AS json_content \nINNER JOIN keyvalue \nON (json_content.json_id = keyvalue.json_id AND keyvalue.key = 'cert_user_id' AND json_content.file_name = 'content.json' " + filter + ") \nLEFT JOIN json AS json_data \nON (user_directory = json_data.directory AND json_data.file_name = 'data.json') \nORDER BY cert_id; ";
      return this.app.cmd("dbQuery", [query, query_params], (function(_this) {
        return function(users) {
          return cb(users);
        };
      })(this));
    };

//    UserProfiles.prototype.requestZeroMeUserRegistry = function() {
//      return corsRequester.requestSite('1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV');
//    };

    UserProfiles.prototype.updateZeroMeProfileData = function() {
      var cors_prefix, ui;
      ui = {};
      $(".ui-zerome-user-name, .ui-zerome-user-hub, .ui-zerome-user-intro, .ui-zerome-user-avatar, .ui-zerome-user-link, .ui-if-zerome-user-exists").each((function(_this) {
        return function(i, elem) {
          var base, user_address;
          user_address = $(elem).parentData("user-address");
          if (user_address && user_address.match(/^[0-9a-zA-Z]+$/)) {
            if (ui[user_address] == null) {
              ui[user_address] = {};
            }
            if ((base = ui[user_address]).ui_elems == null) {
              base.ui_elems = [];
            }
            return ui[user_address].ui_elems.push(elem);
          }
        };
      })(this));
      cors_prefix = "cors-1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV/";
      return Object.keys(ui).forEach((function(_this) {
        return function(user_address) {
          var cors_path;
          cors_path = "data/userdb/" + user_address + "/content.json";
          return _this.app.cmd("fileGet", ["" + cors_prefix + cors_path, true, "text", 3000], function(res) {
            var content, ref, ref1, user, user_exists;
            if (!res) {
              return;
            }
            try {
              content = JSON.parse(res);
            } catch (error) {
              content = {};
            }
            user = (ref = content != null ? (ref1 = content.user) != null ? ref1[0] : void 0 : void 0) != null ? ref : {};
            user_exists = user.hub && user.user_name;
            return ui[user_address].ui_elems.forEach(function(elem) {
              var href, intro, ref2, ref3, src, v;
              if ($(elem).hasClass("ui-zerome-user-name")) {
                return $(elem).text((ref2 = user.user_name) != null ? ref2 : content.cert_user_id);
              } else if ($(elem).hasClass("ui-zerome-user-hub")) {
                return $(elem).text(user.hub);
              } else if ($(elem).hasClass("ui-zerome-user-intro")) {
                intro = _this.app.renderMarkdown((ref3 = user.intro) != null ? ref3 : "", {
                  "sanitize": true
                });
                return $(elem).html(intro);
              } else if ($(elem).hasClass("ui-zerome-user-avatar")) {
                _this.app.log(user.avatar);
                if (user.avatar === 'jpg' || user.avatar === 'png') {
                  src = "/" + user.hub + "/data/users/" + user_address + "/avatar." + user.avatar + "?" + (Time.timestamp());
                  return $(elem).css("background-image", "url(" + src + ")");
                } else {
                  v = "linear-gradient(" + Text.toColor(user_address) + "," + Text.toColor(user_address.slice(-5)) + ")";
                  return $(elem).css("background", v);
                }
              } else if ($(elem).hasClass("ui-zerome-user-link")) {
                href = "/Me.ZeroNetwork.bit/?Profile/" + user.hub + "/" + user_address;
                return $(elem).attr("href", href);
              } else if ($(elem).hasClass("ui-if-zerome-user-exists")) {
                if (user_exists) {
                  return $(elem).show();
                } else {
                  return $(elem).hide();
                }
              }
            });
          });
        };
      })(this));
    };

    return UserProfiles;

  })(Component);

  window.UserProfiles = UserProfiles;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/20-components/UserSpaceControl.coffee ---- */


(function() {
  var UserSpaceControl,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  UserSpaceControl = (function(superClass) {
    extend(UserSpaceControl, superClass);

    function UserSpaceControl() {
      this.modifySpace = bind(this.modifySpace, this);
      this.updateSpaceControl = bind(this.updateSpaceControl, this);
      this.onSiteInfoReady = bind(this.onSiteInfoReady, this);
      return UserSpaceControl.__super__.constructor.apply(this, arguments);
    }

    UserSpaceControl.prototype.onSiteInfoReady = function() {
      return $.initialize(".ui-user-used-space-control", (function(_this) {
        return function(i, elem) {
          return _this.updateSpaceControl(elem);
        };
      })(this));
    };

    UserSpaceControl.prototype.updateSpaceControl = function(elem) {
      var minus_button, own, plus_button;
      own = this.app.site_info.settings.own;
      if (own) {
        $(elem).show();
        if ($(elem).children().length < 2) {
          $(elem).html("<span></span><span></span>");
          minus_button = $(elem).children()[0];
          plus_button = $(elem).children()[1];
          $(minus_button).click((function(_this) {
            return function() {
              return _this.modifySpace(elem, -1);
            };
          })(this));
          return $(plus_button).click((function(_this) {
            return function() {
              return _this.modifySpace(elem, +1);
            };
          })(this));
        }
      } else {
        return $(elem).hide();
      }
    };

    UserSpaceControl.prototype.modifySpace = function(elem, mode) {
      var user_address;
      if (!this.app.site_info.settings.own) {
        return;
      }
      user_address = $(elem).parentData("user-address");
      if (!user_address) {
        return;
      }
      return SizeLimits.increaseUserSizeLimit(this.app, user_address, mode);
    };

    return UserSpaceControl;

  })(Component);

  window.UserSpaceControl = UserSpaceControl;

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/Comments.coffee ---- */


(function() {
  var Comments,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Comments = (function(superClass) {
    extend(Comments, superClass);

    function Comments() {
      return Comments.__super__.constructor.apply(this, arguments);
    }

    Comments.prototype.pagePost = function(post_id, cb) {
      if (cb == null) {
        cb = false;
      }
      this.post_id = post_id;
      this.rules = {};
      $(".button-submit-comment").off("click").on("click", (function(_this) {
        return function() {
          _this.submitComment();
          return false;
        };
      })(this));
      this.loadComments("noanim", cb);
      this.autoExpand($(".comment-textarea"));
      return $(".certselect").off("click").on("click", (function(_this) {
        return function() {
          if (Page.server_info.rev < 160) {
            Page.cmd("wrapperNotification", ["error", "Comments requires at least ZeroNet 0.3.0 Please upgade!"]);
          } else {
            Page.certSelect();
          }
          return false;
        };
      })(this));
    };

    Comments.prototype.updateCommentCount = function() {
      var count, text;
      count = $(".comments .comment:not(.template)").length;
      text = count === 0 ? count + " Comments" : count === 1 ? count + " Comment:" : count + " Comments:";
      return $("#Comments_header").text(text);
    };

    Comments.prototype.loadComments = function(type, cb) {
      var query;
      if (type == null) {
        type = "show";
      }
      if (cb == null) {
        cb = false;
      }
      query = "SELECT comment.*, json_content.json_id AS content_json_id, keyvalue.value AS cert_user_id, json.directory, (SELECT COUNT(*) FROM comment_vote WHERE comment_vote.comment_uri = comment.comment_id || '@' || json.directory)+1 AS votes FROM comment LEFT JOIN json USING (json_id) LEFT JOIN json AS json_content ON (json_content.directory = json.directory AND json_content.file_name='content.json') LEFT JOIN keyvalue ON (keyvalue.json_id = json_content.json_id AND key = 'cert_user_id') WHERE post_id = " + this.post_id + " ORDER BY date_added DESC";
      return Page.cmd("dbQuery", query, (function(_this) {
        return function(comments) {
          var comment, comment_address, elem, i, len, user_address;
          for (i = 0, len = comments.length; i < len; i++) {
            comment = comments[i];
            user_address = comment.directory.replace("users/", "");
            comment_address = comment.comment_id + "_" + user_address;
            elem = $("#comment_" + comment_address);
            if (elem.length === 0) {
              elem = $(".comment.template").clone().removeClass("template").attr("id", "comment_" + comment_address).data("post_id", _this.post_id);
              if (type !== "noanim") {
                elem.cssSlideDown();
              }
              $(".reply", elem).off("click").on("click", function(e) {
                return _this.buttonReply($(e.target).parents(".comment"));
              });
            }
            _this.applyCommentData(elem, comment, user_address);
            elem.appendTo(".comments");
          }
          _this.updateCommentCount();
          return setTimeout((function() {
            return Page.addInlineEditors(".comments");
          }), 1000);
        };
      })(this));
    };

    Comments.prototype.applyCommentData = function(elem, comment, user_address) {
      var cert_domain, ref, user_name;
      ref = comment.cert_user_id.split("@"), user_name = ref[0], cert_domain = ref[1];
      user_address = comment.directory.replace("users/", "");
      $(".comment-body", elem).html(Page.renderMarkdown(comment.body, {
        "sanitize": true
      }));
      $(".user_name", elem).text(user_name + "@" + cert_domain).css({
        "color": Text.toColor(user_address)
      }).attr("title", user_name + "@" + cert_domain + ": " + user_address);
      $(".user-profile-link", elem).attr("href", "?User:" + user_address);
      $(".added", elem).text(Time.since(comment.date_added)).attr("title", Time.date(comment.date_added, "long"));
      if (user_address === Page.site_info.auth_address) {
        $(elem).attr("data-object", "Comment:" + comment.comment_id).attr("data-deletable", "yes");
        return $(".comment-body", elem).attr("data-editable", "body").data("content", comment.body);
      }
    };

    Comments.prototype.buttonReply = function(elem) {
      var body_add, elem_quote, post_id, user_name;
      this.log("Reply to", elem);
      user_name = $(".user_name", elem).text();
      post_id = elem.attr("id");
      body_add = "> [" + user_name + "](\#" + post_id + "): ";
      elem_quote = $(".comment-body", elem).clone();
      $("blockquote", elem_quote).remove();
      body_add += elem_quote.text().trim("\n").replace(/\n/g, "\n> ");
      body_add += "\n\n";
      $(".comment-new .comment-textarea").val($(".comment-new .comment-textarea").val() + body_add);
      $(".comment-new .comment-textarea").trigger("input").focus();
      return false;
    };

    Comments.prototype.submitComment = function() {
      var body, inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
        return false;
      }
      body = $(".comment-new .comment-textarea").val();
      if (!body) {
        $(".comment-new .comment-textarea").focus();
        return false;
      }
      $(".comment-new .button-submit").addClass("loading");
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          var json_raw;
          if (data) {
            data = JSON.parse(data);
          } else {
            data = {
              "next_comment_id": 1,
              "comment": [],
              "comment_vote": {},
              "topic_vote": {}
            };
          }
          data.comment.push({
            "comment_id": data.next_comment_id,
            "body": body,
            "post_id": _this.post_id,
            "date_added": Time.timestamp()
          });
          data.next_comment_id += 1;
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          return Page.writePublish(inner_path, btoa(json_raw), function(res) {
            $(".comment-new .button-submit").removeClass("loading");
            _this.loadComments();
            _this.checkCert("updaterules");
            _this.log("Writepublish result", res);
            if (res !== false) {
              return $(".comment-new .comment-textarea").val("");
            }
          });
        };
      })(this));
    };

    Comments.prototype.checkCert = function(type) {
      var last_cert_user_id;
      last_cert_user_id = $(".comment-new .user_name").text();
      if (Page.site_info.cert_user_id) {
        $(".comment-new").removeClass("comment-nocert");
        $(".comment-new .user_name").text(Page.site_info.cert_user_id);
      } else {
        $(".comment-new").addClass("comment-nocert");
        $(".comment-new .user_name").text("Please sign in");
      }
      if ($(".comment-new .user_name").text() !== last_cert_user_id || type === "updaterules") {
        if (Page.site_info.cert_user_id) {
          return Page.cmd("fileRules", "data/users/" + Page.site_info.auth_address + "/content.json", (function(_this) {
            return function(rules) {
              _this.rules = rules;
              if (rules.max_size) {
                return _this.setCurrentSize(rules.current_size);
              } else {
                return _this.setCurrentSize(0);
              }
            };
          })(this));
        } else {
          return this.setCurrentSize(0);
        }
      }
    };

    Comments.prototype.setCurrentSize = function(current_size) {
      var current_size_kb;
      if (current_size) {
        current_size_kb = current_size / 1000;
        $(".user-size").text("used: " + (current_size_kb.toFixed(1)) + "k/" + (Math.round(this.rules.max_size / 1000)) + "k");
        return $(".user-size-used").css("width", Math.round(70 * current_size / this.rules.max_size));
      } else {
        return $(".user-size").text("");
      }
    };

    Comments.prototype.autoExpand = function(elem) {
      var editor;
      editor = elem[0];
      if (elem.height() > 0) {
        elem.height(1);
      }
      elem.off("input").on("input", (function(_this) {
        return function() {
          var current_size, min_height, new_height, old_height;
          if (editor.scrollHeight > elem.height()) {
            old_height = elem.height();
            elem.height(1);
            new_height = editor.scrollHeight;
            new_height += parseFloat(elem.css("borderTopWidth"));
            new_height += parseFloat(elem.css("borderBottomWidth"));
            new_height -= parseFloat(elem.css("paddingTop"));
            new_height -= parseFloat(elem.css("paddingBottom"));
            min_height = parseFloat(elem.css("lineHeight")) * 2;
            if (new_height < min_height) {
              new_height = min_height + 4;
            }
            elem.height(new_height - 4);
          }
          if (_this.rules.max_size) {
            if (elem.val().length > 0) {
              current_size = _this.rules.current_size + elem.val().length + 90;
            } else {
              current_size = _this.rules.current_size;
            }
            return _this.setCurrentSize(current_size);
          }
        };
      })(this));
      if (elem.height() > 0) {
        return elem.trigger("input");
      } else {
        return elem.height("48px");
      }
    };

    Comments.prototype.hide = function() {
      $(".comment").hide();
      return $("#Comments_header").hide();
    };

    return Comments;

  })(Class);

  window.Comments = new Comments();

}).call(this);


/* ---- /19fZJhX7FGENeRRLB8ftgrziBJ5vsLtFog/js/ZeroBlog.coffee ---- */


(function() {
  var ZeroBlog,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroBlog = (function(superClass) {
    extend(ZeroBlog, superClass);

    function ZeroBlog() {
      this.setSiteInfo = bind(this.setSiteInfo, this);
      this.submitPostVote = bind(this.submitPostVote, this);
      this.saveContent = bind(this.saveContent, this);
      this.getContent = bind(this.getContent, this);
      this.getObject = bind(this.getObject, this);
      this.tagToHtml = bind(this.tagToHtml, this);
      this.publish = bind(this.publish, this);
      this.pageLoaded = bind(this.pageLoaded, this);
      return ZeroBlog.__super__.constructor.apply(this, arguments);
    }

    ZeroBlog.prototype.init = function() {
      ZeroBlog.__super__.init.call(this);
      this.page = 1;
      this.my_post_votes = {};
      this.browserTitle = new BrowserTitle(this);
      this.default_settings = {
        show_title: true,
        show_description: true,
        show_links: true,
        show_footer: true,
        show_toc: true,
        show_avatar: true,
        show_latest_comments: true,
        enable_tags: true,
        shadow_left_bar_on_regular_posts: true,
        shadow_left_bar_on_aux_pages: false,
        shadow_left_bar_on_main_page: false,
        enable_editbg: true,
        identicon_mode: "identicon_zeroblog_with_workaround",
        enable_cors_resolver: true,
        detect_media_by_extension: true,
        detect_media_by_description: true
      };
      this.data = null;
      this.settings = {};
      $.when(this.event_site_ready).done((function(_this) {
        return function() {
          return _this.loadData().done(function() {
            return _this.event_data_ready.resolve();
          });
        };
      })(this));
      $.when(this.event_data_ready).done((function(_this) {
        return function() {
          _this.initBlogAvatar();
          return _this.loadCurrentUserVotes().then(function() {
            return _this.routeUrl(window.location.search.substring(1));
          });
        };
      })(this));
      $.when(this.event_page_load).done((function(_this) {
        return function() {
          if (_this.site_info.settings.own || _this.data.demo) {
            _this.addInlineEditors();
            _this.checkPublishbar();
            $(".publishbar").off("click").on("click", _this.publish);
            $(".left .settings").css("display", "block");
            $(".posts .button.new").css("display", "inline-block");
            return $(".editbar .icon-help").off("click").on("click", function() {
              $(".editbar .markdown-help").css("display", "block");
              $(".editbar .markdown-help").toggleClassLater("visible", 10);
              $(".editbar .icon-help").toggleClass("active");
              return false;
            });
          }
        };
      })(this));
      this.registerComponent(new LatestComments(this));
      this.registerComponent(new FollowButton(this));
      this.registerComponent(new BlogSettings(this));
      this.registerComponent(new UserProfiles(this));
      this.registerComponent(new UserSpaceControl(this));
      return this.log("inited!");
    };

    ZeroBlog.prototype.initBlogAvatar = function() {
      var imagedata;
      imagedata = this.generateIdenticon(this.site_info.address);
      return $("body").append("<style>.avatar { background-image: url(data:image/png;base64," + imagedata + ") }</style>");
    };

    ZeroBlog.prototype.generateIdenticon = function(input, mode) {
      var size;
      if (mode == null) {
        mode = false;
      }
      size = 70;
      if (!mode) {
        mode = this.getSettings("identicon_mode");
      }
      if (mode === "identicon_zeroblog_broken") {
        return new Identicon(input, size).toString();
      } else if (mode === "identicon_zeroblog_with_workaround") {
        return new Identicon_with_workaround(input, size).toString();
      } else if (mode === "jdenticon") {
        return null;
      }
      return this.generateIdenticon(input, "identicon_zeroblog_with_workaround");
    };

    ZeroBlog.prototype.applyCommonParts = function() {
      if (this.data && this.data.title) {
        this.browserTitle.applySiteTitle(this.data.title);
      }
      if (this.data && this.data.title && this.getBooleanSettings("show_title")) {
        $(".left h1 a:not(.editable-edit)").show().html(this.data.title).data("content", this.data.title);
      } else {
        $(".left h1 a:not(.editable-edit)").hide();
      }
      if (this.data && this.data.description && this.getBooleanSettings("show_description")) {
        $(".left h2").show().html(this.renderMarkdown(this.data.description)).data("content", this.data.description);
      } else {
        $(".left h2").hide();
      }
      if (this.data && this.data.links && this.getBooleanSettings("show_links")) {
        $(".left .links").show().html(this.renderMarkdown(this.data.links)).data("content", this.data.links);
      } else {
        $(".left .links").hide();
      }
      if (this.data && this.data.footer && this.getBooleanSettings("show_footer")) {
        $(".footer div").show().html(this.renderMarkdown(this.data.footer)).data("content", this.data.footer);
      } else {
        $(".footer div").hide();
      }
      if (this.getBooleanSettings("show_toc")) {
        $(".left .toc").show();
      } else {
        $(".left .toc").hide();
      }
      if (this.getBooleanSettings("show_avatar")) {
        $(".left .avatar-wrapper").show();
      } else {
        $(".left .avatar-wrapper").hide();
      }
      if (this.getBooleanSettings("enable_tags")) {
        $(".left .toggle-tags").show();
      } else {
        $(".left .toggle-tags").hide();
      }
      $("body").toggleClass("enable-editbg", this.getBooleanSettings("enable_editbg"));
      this.applyPageClass();
      return this.dispatchToComponents("applyCommonParts", []);
    };

    ZeroBlog.prototype.writeSettings = function(data, cb) {
      var json_raw;
      if (cb == null) {
        cb = null;
      }
      if (!data) {
        return this.log("Settings data missing");
      }
      json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      return this.cmd("fileWrite", ["data/settings.json", btoa(json_raw)], (function(_this) {
        return function(res) {
          if (res === "ok") {
            if (cb) {
              cb(true);
            }
          } else {
            _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            if (cb) {
              cb(false);
            }
          }
          return _this.checkPublishbar();
        };
      })(this));
    };

    ZeroBlog.prototype.saveSettings = function() {
      this.settings["modified"] = Time.timestamp();
      return this.cmd("fileGet", ["data/settings.json"], (function(_this) {
        return function(res) {
          var key, ref, settings_json, value;
          settings_json = JSON.parse(res);
          settings_json.settings = [];
          ref = _this.settings;
          for (key in ref) {
            value = ref[key];
            settings_json.settings.push({
              key: key,
              value: value
            });
          }
          return _this.writeSettings(settings_json);
        };
      })(this));
    };

    ZeroBlog.prototype.setSettings = function(key, value) {
      if (this.settings[key] === value) {
        return;
      }
      this.settings[key] = value;
      this.applyCommonParts();
      return this.saveSettings();
    };

    ZeroBlog.prototype.getSettings = function(key) {
      var ref;
      return (ref = this.settings[key]) != null ? ref : this.default_settings[key];
    };

    ZeroBlog.prototype.getBooleanSettings = function(key) {
      var value;
      value = this.getSettings(key);
      if (value === "0") {
        return false;
      }
      if (value === "false") {
        return false;
      }
      return Boolean(value);
    };

    ZeroBlog.prototype.renderMarkdown = function(text, options) {
      if (options == null) {
        options = {};
      }
      if (!options.sanitize) {
        if (options.detect_media_by_description == null) {
          options.detect_media_by_description = this.getBooleanSettings("detect_media_by_description");
        }
        if (options.detect_media_by_extension == null) {
          options.detect_media_by_extension = this.getBooleanSettings("detect_media_by_extension");
        }
      }
      return Text.renderMarked(text, options);
    };

    ZeroBlog.prototype.loadData = function() {
      var d1, d2, data_res, settings_res;
      settings_res = [];
      data_res = [];
      d1 = $.Deferred((function(_this) {
        return function(d) {
          var query;
          query = "SELECT key, value FROM json LEFT JOIN settings USING (json_id) WHERE directory = '' AND file_name = 'settings.json'";
          return _this.cmd("dbQuery", [query], function(res) {
            settings_res = res;
            return d.resolve();
          });
        };
      })(this));
      d2 = $.Deferred((function(_this) {
        return function(d) {
          var query;
          query = "SELECT key, value FROM json LEFT JOIN keyvalue USING (json_id) WHERE directory = '' AND file_name = 'data.json'";
          return _this.cmd("dbQuery", [query], function(res) {
            data_res = res;
            return d.resolve();
          });
        };
      })(this));
      return $.when(d1, d2).then((function(_this) {
        return function() {
          return $.Deferred(function(d) {
            var j, l, len, len1, row;
            _this.settings = {};
            _this.data = {};
            if (data_res) {
              for (j = 0, len = data_res.length; j < len; j++) {
                row = data_res[j];
                _this.data[row.key] = row.value;
              }
            }
            if (settings_res) {
              for (l = 0, len1 = settings_res.length; l < len1; l++) {
                row = settings_res[l];
                _this.settings[row.key] = row.value;
              }
            }
            _this.applyCommonParts();
            return d.resolve();
          });
        };
      })(this)).promise();
    };

    ZeroBlog.prototype.loadCurrentUserVotes = function() {
      return $.Deferred((function(_this) {
        return function(d) {
          var query_my_votes;
          query_my_votes = "SELECT\n	'post_vote' AS type,\n	post_id AS uri\nFROM json\nLEFT JOIN post_vote USING (json_id)\nWHERE directory = 'users/" + _this.site_info.auth_address + "' AND file_name = 'data.json'";
          return _this.cmd("dbQuery", [query_my_votes], function(res) {
            var j, len, row;
            for (j = 0, len = res.length; j < len; j++) {
              row = res[j];
              _this.my_post_votes[row["uri"]] = 1;
            }
            return d.resolve();
          });
        };
      })(this)).promise();
    };

    ZeroBlog.prototype.applyPagerdata = function(page, limit, has_next) {
      var pager;
      pager = $(".pager");
      if (page > 1) {
        pager.find(".prev").css("display", "inline-block").attr("href", "?page=" + (page - 1));
      }
      if (has_next) {
        return pager.find(".next").css("display", "inline-block").attr("href", "?page=" + (page + 1));
      }
    };

    ZeroBlog.prototype.applyPageClass = function(css_class) {
      var c, j, know_classes, len, shadow_left_bar;
      if (css_class == null) {
        css_class = false;
      }
      if (!css_class) {
        css_class = this.page_class;
      } else {
        this.page_class = css_class;
      }
      if (!css_class) {
        return;
      }
      know_classes = ["main", "post", "toc", "settings", "user"];
      for (j = 0, len = know_classes.length; j < len; j++) {
        c = know_classes[j];
        $("body").toggleClass("page-" + c, css_class === c);
      }
      $("body").toggleClass("page-post-full", (css_class === "post" || css_class === "toc" || css_class === "settings" || css_class === "user"));
      shadow_left_bar = false;
      if ((css_class === "post") && this.getBooleanSettings("shadow_left_bar_on_regular_posts")) {
        shadow_left_bar = true;
      }
      if ((css_class === "main") && this.getBooleanSettings("shadow_left_bar_on_main_page")) {
        shadow_left_bar = true;
      }
      if ((css_class === "toc" || css_class === "settings" || css_class === "user") && this.getBooleanSettings("shadow_left_bar_on_aux_pages")) {
        shadow_left_bar = true;
      }
      return $("body").toggleClass("enable-left-bar-transparency", shadow_left_bar);
    };

    ZeroBlog.prototype.routeUrl = function(url) {
      var promises;
      this.log("Routing url:", url);
      promises = this.dispatchToComponents("routeUrl", [url]);
      if (promises.length === 0) {
        this.routeUrl_old(url);
        return;
      }
      if (promises.length > 1) {
        this.log("Multiple components returned routing promises for url " + url);
      }
      return $.when.apply($, promises).then((function(_this) {
        return function() {
          return _this.pageLoaded();
        };
      })(this));
    };

    ZeroBlog.prototype.routeUrl_old = function(url) {
      var match;
      if (match = url.match(/Post:([0-9]+)/)) {
        this.applyPageClass("post");
        this.post_id = parseInt(match[1]);
        return this.log(this.pagePost());
      } else if (match = url.match(/Toc[=:](.*)/)) {
        this.applyPageClass("toc");
        return this.pageToc(match[1]);
      } else {
        this.applyPageClass("main");
        if (match = url.match(/page=([0-9]+)/)) {
          this.page = parseInt(match[1]);
        }
        return this.pageMain();
      }
    };

    ZeroBlog.prototype.applyAuxPostData = function(title, body, post_settings) {
      if (post_settings == null) {
        post_settings = {};
      }
      if (post_settings.full == null) {
        post_settings.full = true;
      }
      if (post_settings.editable == null) {
        post_settings.editable = false;
      }
      if (post_settings.show_details == null) {
        post_settings.show_details = false;
      }
      this.browserTitle.applyTitleParts([title]);
      this.applyPostdata($(".post-full"), {
        title: title,
        post_id: -1,
        votes: -1,
        comments: -1,
        body: body
      }, post_settings);
      return this.activateEmbeddedUI();
    };

    ZeroBlog.prototype.activateEmbeddedUI = function() {
      var elem, j, len, post, ref, results;
      post = $(".post-full");
      ref = $(".settings-boolean", post);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        elem = ref[j];
        results.push((function(_this) {
          return function(elem) {
            var checkbox, settings_name;
            elem = $(elem);
            settings_name = elem.data("settings");
            if (settings_name) {
              $('<input>', {
                checked: _this.getBooleanSettings(settings_name),
                type: "checkbox"
              }).prependTo(elem);
              checkbox = $(':checkbox', elem);
              return checkbox.change(function() {
                var checked;
                checked = $(checkbox).prop("checked");
                if (_this.getBooleanSettings(settings_name) !== checked) {
                  _this.setSettings(settings_name, checked);
                  return $(".post-full .settings-boolean[data-settings='" + settings_name + "'] :checkbox").prop("checked", checked);
                }
              });
            }
          };
        })(this)(elem));
      }
      return results;
    };

    ZeroBlog.prototype.pageToc = function(tocType) {
      if (tocType.match(/^dateDesc/)) {
        this.pageTocDateDesc();
      } else if (this.getBooleanSettings("enable_tags") && tocType.match(/^tagAll/)) {
        this.pageTocTagAll();
      } else if (this.getBooleanSettings("enable_tags") && tocType.match(/^tag/)) {
        this.pageTocByTag(tocType.split("&")[0].substring(3));
      }
      this.pageLoaded();
      return Comments.hide();
    };

    ZeroBlog.prototype.emptyTocPage = function(title, body) {
      return this.applyPostdata($(".post-full"), {
        title: title,
        post_id: -1,
        votes: -1,
        comments: -1,
        body: body
      }, {
        full: true,
        editable: false,
        show_details: false
      });
    };

    ZeroBlog.prototype.pageTocByTag = function(tagType) {
      var queryString, tag;
      this.pageTocTagAll();
      queryString = "";
      tag = "";
      if (tagType.match(/^None/)) {
        tag = "untagged";
        queryString = "SELECT date_published,title,post_id FROM post\nWHERE post_id NOT IN (SELECT DISTINCT (post_id) FROM tag)\nORDER BY date_published DESC";
      } else {
        tag = decodeURIComponent(tagType.substring(1));
        this.log("Toc by tag:", tag);
        queryString = "SELECT post.date_published AS date_published,\npost_id,post.title AS title FROM tag\nJOIN (SELECT date_published,title,post_id FROM post) AS post\nUSING (post_id) WHERE value=\"" + tag + "\"\nORDER BY date_published DESC";
      }
      return this.cmd("dbQuery", [queryString], (function(_this) {
        return function(res) {
          var parse_res;
          parse_res = function(res) {
            var date, i, j, len, markdown;
            if (res.length === 0) {
              _this.emptyTocPage("" + tag, "no posts found");
              return;
            }
            markdown = "";
            for (j = 0, len = res.length; j < len; j++) {
              i = res[j];
              date = new Date(i.date_published * 1000);
              markdown += "- [" + (date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + ":" + i.title + "](?Post:" + i.post_id + ")\n";
            }
            return _this.applyPostdata($(".post-full"), {
              title: tag,
              post_id: -1,
              votes: -1,
              comments: -1,
              body: markdown
            }, {
              full: true,
              editable: false,
              show_details: false
            });
          };
          if (res.error) {
            return _this.emptyTocPage("error when getting index", "error when getting index");
          } else {
            return parse_res(res);
          }
        };
      })(this));
    };

    ZeroBlog.prototype.pageTocTagAll = function() {
      return this.cmd("dbQuery", ["SELECT \"all\" AS value,COUNT(*) AS count FROM post\nUNION ALL\nSELECT \"tagged\" AS value,COUNT(DISTINCT post_id) AS count\nFROM tag\nUNION ALL\nSELECT value, COUNT(post_id)\nFROM tag	GROUP BY value ORDER BY count DESC"], (function(_this) {
        return function(res) {
          var parse_res;
          parse_res = function(res) {
            var escaped, j, len, markdown, one, tagged, total_post, untagged;
            total_post = res[0].count;
            if (total_post === 0) {
              emptyTocPage("no post", "no post at all");
              return;
            }
            markdown = "";
            tagged = res.slice(2);
            for (j = 0, len = tagged.length; j < len; j++) {
              one = tagged[j];
              escaped = encodeURIComponent(one.value);
              markdown += "[" + one.value + " (" + one.count + ")](?Toc:tag:" + escaped + ")\n";
            }
            untagged = total_post - res[1].count;
            if (untagged !== 0) {
              markdown += "\n[untagged (" + untagged + ")](?Toc:tagNone)";
            }
            if (!$(".left .tags").data('visible')) {
              $(".left .tags").html(_this.renderMarkdown(markdown));
              $(".left .tags").data('visible', true);
              return $(".left .tags").cssSlideDown();
            } else {
              $(".left .tags").data('visible', false);
              return $(".left .tags").cssSlideUp();
            }
          };
          if (res.error) {
            return _this.emptyTocPage("error when getting index", "sorry, error happened");
          } else {
            return parse_res(res);
          }
        };
      })(this));
    };

    ZeroBlog.prototype.pageTocDateDesc = function() {
      this.log("Toc by date desc");
      return this.cmd("dbQuery", ["SELECT post_id,date_published,title FROM post ORDER BY date_published DESC"], (function(_this) {
        return function(res) {
          var parse_res;
          parse_res = function(res) {
            var j, len, markdown, month, post, post_date, s_date, s_month, s_title;
            if (res.length === 0) {
              _this.emptyTocPage("no post", "no post at all");
              return;
            }
            month = new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000);
            markdown = "";
            for (j = 0, len = res.length; j < len; j++) {
              post = res[j];
              post_date = new Date(post.date_published * 1000);
              if (post_date < month) {
                month = new Date(post_date);
                month.setDate(1);
                month.setHours(0);
                month.setMinutes(0);
                month.setSeconds(0);
                s_month = String(month.getMonth() + 1).padStart(2, "0");
                markdown += "\n" + (month.getFullYear()) + "-" + s_month + "\n";
              }
              s_date = String(post_date.getDate()).padStart(2, "0");
              s_title = post.title;
              if (s_title === "") {
                s_title = "(untitled)";
              }
              markdown += "- [" + s_date + ": " + s_title + "](?Post:" + post.post_id + ")\n";
            }
            return _this.applyPostdata($(".post-full"), {
              title: "index by date",
              post_id: -1,
              votes: -1,
              comments: -1,
              body: markdown
            }, {
              full: true,
              editable: false,
              show_details: false
            });
          };
          if (res.error) {
            return _this.emptyTocPage("error", "error while getting index");
          } else {
            return parse_res(res);
          }
        };
      })(this));
    };

    ZeroBlog.prototype.pagePost = function() {
      var s;
      s = +(new Date);
      return this.cmd("dbQuery", ["SELECT *, (SELECT COUNT(*) FROM post_vote WHERE post_vote.post_id = post.post_id) AS votes FROM post WHERE post_id = " + this.post_id + " LIMIT 1"], (function(_this) {
        return function(res) {
          var deal_post, parse_res, tag_query;
          parse_res = function(res, tag_res) {
            var j, len, post, tag;
            if (res.length) {
              post = res[0];
              post.tag = [];
              for (j = 0, len = tag_res.length; j < len; j++) {
                tag = tag_res[j];
                post.tag.push(tag.value);
              }
              _this.browserTitle.applyTitleParts([post.title]);
              _this.applyPostdata($(".post-full"), post, {
                full: true
              });
              $(".post-full").css("display", "block");
              $(".post-full .like").attr("id", "post_like_" + post.post_id).off("click").off("click").on("click", _this.submitPostVote);
              $(".notfound").css("display", "none");
              Comments.pagePost(_this.post_id);
            } else {
              $(".notfound").css("display", "block");
              $(".post-full").css("display", "none");
            }
            _this.pageLoaded();
            return Comments.checkCert();
          };
          tag_query = "SELECT value FROM tag\nWHERE post_id=" + _this.post_id;
          deal_post = function(post_res, tag_res) {
            if (res.error) {
              return _this.cmd("dbQuery", ["SELECT *, -1 AS votes FROM post WHERE post_id = " + _this.post_id + " LIMIT 1"], function(res) {
                return parse_res(res, tag_res);
              });
            } else {
              return parse_res(res, tag_res);
            }
          };
          return _this.cmd("dbQuery", [tag_query], function(tag_res) {
            if (tag_res.error) {
              return deal_post(res, []);
            } else {
              return deal_post(res, tag_res);
            }
          });
        };
      })(this));
    };

    ZeroBlog.prototype.pageMain = function() {
      var limit, query;
      limit = 15;
      query = "SELECT\n	post.*, COUNT(comment_id) AS comments,\n	(SELECT COUNT(*) FROM post_vote WHERE post_vote.post_id = post.post_id) AS votes\nFROM post\nLEFT JOIN comment USING (post_id)\nGROUP BY post_id\nORDER BY date_published DESC\nLIMIT " + ((this.page - 1) * limit) + ", " + (limit + 1);
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var deal_post, parse_res, tag_query;
          parse_res = function(res, tags) {
            var elem, j, l, len, len1, post, s, tag;
            s = +(new Date);
            if (res.length > limit) {
              res.pop();
              _this.applyPagerdata(_this.page, limit, true);
            } else {
              _this.applyPagerdata(_this.page, limit, false);
            }
            res.reverse();
            for (j = 0, len = res.length; j < len; j++) {
              post = res[j];
              post.tag = [];
              for (l = 0, len1 = tags.length; l < len1; l++) {
                tag = tags[l];
                if (post.post_id === tag.post_id) {
                  post.tag.push(tag.value);
                }
              }
              elem = $("#post_" + post.post_id);
              if (elem.length === 0) {
                elem = $(".post.template").clone().removeClass("template").attr("id", "post_" + post.post_id);
                elem.prependTo(".posts");
                elem.find(".like").attr("id", "post_like_" + post.post_id).off("click").on("click", _this.submitPostVote);
              }
              _this.applyPostdata(elem, post);
            }
            _this.pageLoaded();
            _this.log("Posts loaded in", (+(new Date)) - s, "ms");
            return $(".posts .new").off("click").on("click", function() {
              _this.cmd("fileGet", ["data/data.json"], function(res) {
                var data;
                data = JSON.parse(res);
                data.post.unshift({
                  post_id: data.next_post_id,
                  title: "New blog post",
                  date_published: (+(new Date)) / 1000,
                  body: "Blog post body"
                });
                data.next_post_id += 1;
                elem = $(".post.template").clone().removeClass("template");
                _this.applyPostdata(elem, data.post[0]);
                elem.hide();
                elem.prependTo(".posts").slideDown();
                _this.addInlineEditors(elem);
                return _this.writeData(data);
              });
              return false;
            });
          };
          tag_query = "SELECT tag.* FROM tag\nLEFT JOIN (\nSELECT post_id FROM post\nORDER BY date_published DESC\nLIMIT " + ((_this.page - 1) * limit) + ", " + (limit + 1) + "\n) AS post USING (post_id)";
          deal_post = function(post_res, tag_res) {
            if (res.error) {
              query = "SELECT\n	post.*, COUNT(comment_id) AS comments,\n	-1 AS votes\nFROM post\nLEFT JOIN comment USING (post_id)\nGROUP BY post_id\nORDER BY date_published DESC\nLIMIT " + ((this.page - 1) * limit) + ", " + (limit + 1);
              return this.cmd("dbQuery", [query], function(res) {
                return parse_res(res, tag_res);
              });
            } else {
              return parse_res(res, tag_res);
            }
          };
          return _this.cmd("dbQuery", [tag_query], function(tag_res) {
            if (tag_res.error) {
              return deal_post(res, []);
            } else {
              return deal_post(res, tag_res);
            }
          });
        };
      })(this));
    };

    ZeroBlog.prototype.pageLoaded = function() {
      this.browserTitle.update();
      $("body").addClass("loaded");
      $('pre code').each(function(i, block) {
        return hljs.highlightBlock(block);
      });
      this.event_page_load.resolve();
      this.cmd("innerLoaded", true);
      if (this.getBooleanSettings("enable_cors_resolver")) {
        return this.corsResolver = new CorsResolver().start((function(_this) {
          return function() {
            return $(".post-full, .posts");
          };
        })(this));
      }
    };

    ZeroBlog.prototype.enableInlineEditor = function(elems, v) {
      var editor, elem, j, len, results;
      if (v == null) {
        v = true;
      }
      results = [];
      for (j = 0, len = elems.length; j < len; j++) {
        elem = elems[j];
        elem = $(elem);
        editor = elem.data("editor");
        if (editor) {
          results.push(editor.enable(v));
        } else {
          results.push(elem.data("editable-disabled", "" + (!v)));
        }
      }
      return results;
    };

    ZeroBlog.prototype.disableInlineEditor = function(elems, v) {
      if (v == null) {
        v = true;
      }
      return enableInlineEditor(elems, !v);
    };

    ZeroBlog.prototype.addInlineEditors = function(parent) {
      var editor, elem, elems, j, len;
      this.logStart("Adding inline editors");
      elems = $("[data-editable]:visible", parent);
      for (j = 0, len = elems.length; j < len; j++) {
        elem = elems[j];
        elem = $(elem);
        if (!elem.data("editor") && !elem.hasClass("editor")) {
          editor = new InlineEditor(elem, this.getContent, this.saveContent, this.getObject);
          elem.data("editor", editor);
        }
      }
      return this.logEnd("Adding inline editors");
    };

    ZeroBlog.prototype.addImageZoom = function(parent) {
      return $("img", parent).each((function(_this) {
        return function(i, img_elem) {
          img_elem.onload = function() {
            var ref, size;
            img_elem = $(img_elem);
            size = (ref = img_elem.attr("alt")) != null ? ref.match("([0-9]+)x([0-9]+)") : void 0;
            if (!size) {
              return;
            }
            if (img_elem.width() < parseInt(size[1]) || img_elem.height() < parseInt(size[2])) {
              img_elem.attr("data-action", "zoom");
            }
            return img_elem.onload = null;
          };
          if (img_elem.complete) {
            return img_elem.onload();
          }
        };
      })(this));
    };

    ZeroBlog.prototype.checkPublishbar = function() {
      var visible;
      visible = false;
      if ((this.data != null) && (!this.data["modified"] || this.data["modified"] > this.site_info.content.modified)) {
        visible = true;
      }
      if ((this.settings != null) && this.settings["modified"] && (this.settings["modified"] > this.site_info.content.modified)) {
        visible = true;
      }
      if (visible) {
        return $(".publishbar").addClass("visible");
      } else {
        return $(".publishbar").removeClass("visible");
      }
    };

    ZeroBlog.prototype.publish = function() {
      if (this.site_info.privatekey) {
        this.cmd("sitePublish", ["stored"], (function(_this) {
          return function(res) {
            return _this.log("Publish result:", res);
          };
        })(this));
      } else {
        this.cmd("wrapperPrompt", ["Enter your private key:", "password"], (function(_this) {
          return function(privatekey) {
            $(".publishbar .button").addClass("loading");
            return _this.cmd("sitePublish", [privatekey], function(res) {
              $(".publishbar .button").removeClass("loading");
              return _this.log("Publish result:", res);
            });
          };
        })(this));
      }
      return false;
    };

    ZeroBlog.prototype.tagToHtml = function(tag) {
      var i, j, len, ret;
      if (typeof tag === 'string') {
        tag = tag.split(" ");
      }
      if (tag.length === 0) {
        ret = "<a href='?Toc:tagNone'>(untagged)</a>";
      } else {
        ret = " ";
        for (j = 0, len = tag.length; j < len; j++) {
          i = tag[j];
          ret += "<a href='?Toc:tag:" + encodeURIComponent(i) + "'>" + i + "</a> ";
        }
      }
      return ret;
    };

    ZeroBlog.prototype.applyPostdata = function(elem, post, post_settings) {
      var body, body_html, date_published, post_url, readtime, tag, title, title_hash;
      if (post_settings == null) {
        post_settings = {};
      }
      tag = post.tag;
      if (!tag) {
        tag = [];
      }
      delete post.tag;
      if (post_settings.full == null) {
        post_settings.full = false;
      }
      if (post_settings.editable == null) {
        post_settings.editable = true;
      }
      if (post_settings.show_details == null) {
        post_settings.show_details = true;
      }
      if (post_settings.convert_from_markdown == null) {
        post_settings.convert_from_markdown = true;
      }
      post.body = post.body.replace(/^\* \* \*/m, "---");
      this.enableInlineEditor($(".title .editable, .details .published, .details .tag, .body", elem), post_settings.editable);
      title_hash = post.title.replace(/[#?& ]/g, "+").replace(/[+]+/g, "+");
      post_url = "#";
      if (post.post_id > 0) {
        post_url = "?Post:" + post.post_id + ":" + title_hash;
      }
      elem.data("object", "Post:" + post.post_id);
      title = post.title;
      if (title === "" && post_settings.editable) {
        title = "(untitled)";
      }
      if (title === "") {
        $(".title .editable", elem).hide();
      } else {
        $(".title .editable", elem).show().html(title).attr("href", post_url).data("content", post.title);
      }
      if (post_settings.show_details) {
        $(".details", elem).show();
        if (post.date_published) {
          date_published = Time.since(post.date_published);
          $(".details .published", elem).show().html(date_published).data("content", post.date_published);
        } else {
          $(".details .published", elem).hide();
        }
        readtime = "";
        if (post.body.match(/^---/m)) {
          readtime = "" + (Time.readtime(post.body));
        }
        if (readtime !== "") {
          $(".details .readtime", elem).show().html(readtime);
        } else {
          $(".details .readtime", elem).hide();
        }
        if (this.getBooleanSettings("enable_tags")) {
          $(".details .tag", elem).show();
          if (!$(".details .tag", elem).hasClass("tagged")) {
            $(".details .tag", elem).addClass("tagged");
            $(".details .tag", elem).append(this.tagToHtml(tag));
          }
          $(".details .tag", elem).data("content", tag.join(" "));
        } else {
          $(".details .tag", elem).hide();
        }
        if (post.comments > 0) {
          $(".details .comments-num", elem).css("display", "inline").attr("href", post_url + "#Comments");
          if (post.comments > 1) {
            $(".details .comments-num .num", elem).text(post.comments + " comments");
          } else {
            $(".details .comments-num .num", elem).text(post.comments + " comment");
          }
        } else {
          $(".details .comments-num", elem).css("display", "none");
        }
        if (post.votes > 0) {
          $(".like .num", elem).text(post.votes);
        } else if (post.votes === -1) {
          $(".like", elem).css("display", "none");
        } else {
          $(".like .num", elem).text("");
        }
        if (this.my_post_votes[post.post_id]) {
          $(".like", elem).addClass("active");
        }
      } else {
        $(".details", elem).hide();
      }
      if (post_settings.full) {
        body = post.body;
      } else {
        if (post.body.match(/^---/m)) {
          $(".more", elem).css("display", "inline-block").attr("href", post_url);
        }
        body = post.body.replace(/^([\s\S]*?)\n---\n[\s\S]*$/, "$1");
      }
      if ($(".body", elem).data("content") !== post.body) {
        body_html = post_settings.convert_from_markdown ? this.renderMarkdown(body) : body;
        $(".body", elem).html(body_html).data("content", post.body);
        return this.addImageZoom(elem);
      }
    };

    ZeroBlog.prototype.getObject = function(elem) {
      return elem.parents("[data-object]:first");
    };

    ZeroBlog.prototype.getContent = function(elem, raw) {
      var content, id, ref, type;
      if (raw == null) {
        raw = false;
      }
      ref = this.getObject(elem).data("object").split(":"), type = ref[0], id = ref[1];
      id = parseInt(id);
      content = elem.data("content");
      if (elem.data("editable-mode") === "timestamp") {
        content = Time.date(content, "full");
      }
      if (elem.data("editable-mode") === "simple" || raw) {
        return content;
      } else {
        return this.renderMarkdown(content);
      }
    };

    ZeroBlog.prototype.saveContent = function(elem, content, cb) {
      var id, ref, type;
      if (cb == null) {
        cb = false;
      }
      if (elem.data("deletable") && content === null) {
        return this.deleteObject(elem, cb);
      }
      if (elem.data('editableMode') === "timestamp") {
        elem.data("content", Time.timestamp(content));
      } else {
        elem.data("content", content);
      }
      ref = this.getObject(elem).data("object").split(":"), type = ref[0], id = ref[1];
      id = parseInt(id);
      if (type === "Post" || type === "Site") {
        return this.saveSite(elem, type, id, content, cb);
      } else if (type === "Comment") {
        return this.saveComment(elem, type, id, content, cb);
      }
    };

    ZeroBlog.prototype.saveSite = function(elem, type, id, content, cb) {
      return this.cmd("fileGet", ["data/data.json"], (function(_this) {
        return function(res) {
          var changeKey, data, dedup, idx, j, k, l, len, len1, post, ref, tag, tag_index, temp, v, val;
          data = JSON.parse(res);
          if (type === "Post") {
            changeKey = elem.data("editable");
            if (changeKey !== "tag") {
              post = ((function() {
                var j, len, ref, results;
                ref = data.post;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  post = ref[j];
                  if (post.post_id === id) {
                    results.push(post);
                  }
                }
                return results;
              })())[0];
              if (elem.data("editable-mode") === "timestamp") {
                content = Time.timestamp(content);
              }
              post[changeKey] = content;
            } else {
              temp = {};
              dedup = [];
              ref = content.split(" ");
              for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
                val = ref[idx];
                if (val !== "") {
                  temp[val] = idx;
                }
              }
              for (k in temp) {
                v = temp[k];
                dedup.push(k);
              }
              if (!data.tag) {
                data.tag = [];
              }
              tag_index = (function() {
                var l, len1, ref1, results;
                ref1 = data.tag;
                results = [];
                for (l = 0, len1 = ref1.length; l < len1; l++) {
                  tag = ref1[l];
                  if (tag.post_id !== id) {
                    results.push(tag);
                  }
                }
                return results;
              })();
              data["tag"] = tag_index;
              for (l = 0, len1 = dedup.length; l < len1; l++) {
                tag = dedup[l];
                data["tag"].push({
                  value: tag,
                  post_id: id
                });
              }
            }
          } else if (type === "Site") {
            data[elem.data("editable")] = content;
          }
          return _this.writeData(data, function(res) {
            if (cb) {
              if (res === true) {
                _this.cleanupImages();
                if (elem.data("editable") === "tag") {
                  return cb($(".post.template span.tag").text() + _this.tagToHtml(dedup));
                } else if (elem.data("editable-mode") === "simple") {
                  return cb(content);
                } else if (elem.data("editable-mode") === "timestamp") {
                  return cb(Time.since(content));
                } else {
                  return cb(_this.renderMarkdown(content));
                }
              } else {
                return cb(false);
              }
            }
          });
        };
      })(this));
    };

    ZeroBlog.prototype.saveComment = function(elem, type, id, content, cb) {
      var inner_path;
      this.log("Saving comment...", id);
      this.getObject(elem).css("height", "auto");
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          var comment, json_raw;
          data = JSON.parse(data);
          comment = ((function() {
            var j, len, ref, results;
            ref = data.comment;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              comment = ref[j];
              if (comment.comment_id === id) {
                results.push(comment);
              }
            }
            return results;
          })())[0];
          comment[elem.data("editable")] = content;
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          return _this.writePublish(inner_path, btoa(json_raw), function(res) {
            if (res === true) {
              Comments.checkCert("updaterules");
              if (cb) {
                return cb(_this.renderMarkdown(content, {
                  "sanitize": true
                }));
              }
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

    ZeroBlog.prototype.deleteObject = function(elem, cb) {
      var id, inner_path, ref, type;
      if (cb == null) {
        cb = False;
      }
      ref = elem.data("object").split(":"), type = ref[0], id = ref[1];
      id = parseInt(id);
      if (type === "Post") {
        return this.cmd("fileGet", ["data/data.json"], (function(_this) {
          return function(res) {
            var data, post, tag, tag_index;
            data = JSON.parse(res);
            if (type === "Post") {
              post = ((function() {
                var j, len, ref1, results;
                ref1 = data.post;
                results = [];
                for (j = 0, len = ref1.length; j < len; j++) {
                  post = ref1[j];
                  if (post.post_id === id) {
                    results.push(post);
                  }
                }
                return results;
              })())[0];
              if (!post) {
                return false;
              }
              if (!data.tag) {
                data.tag = [];
              }
              tag_index = (function() {
                var j, len, ref1, results;
                ref1 = data.tag;
                results = [];
                for (j = 0, len = ref1.length; j < len; j++) {
                  tag = ref1[j];
                  if (tag.post_id !== id) {
                    results.push(tag);
                  }
                }
                return results;
              })();
              data["tag"] = tag_index;
              data.post.splice(data.post.indexOf(post), 1);
              return _this.writeData(data, function(res) {
                if (cb) {
                  cb();
                }
                if (res === true) {
                  return elem.slideUp();
                }
              });
            }
          };
        })(this));
      } else if (type === "Comment") {
        inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
        return this.cmd("fileGet", {
          "inner_path": inner_path,
          "required": false
        }, (function(_this) {
          return function(data) {
            var comment, json_raw;
            data = JSON.parse(data);
            comment = ((function() {
              var j, len, ref1, results;
              ref1 = data.comment;
              results = [];
              for (j = 0, len = ref1.length; j < len; j++) {
                comment = ref1[j];
                if (comment.comment_id === id) {
                  results.push(comment);
                }
              }
              return results;
            })())[0];
            data.comment.splice(data.comment.indexOf(comment), 1);
            json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
            return _this.writePublish(inner_path, btoa(json_raw), function(res) {
              if (res === true) {
                elem.slideUp(600, function() {
                  elem.remove();
                  return Comments.updateCommentCount();
                });
              }
              if (cb) {
                return cb();
              }
            });
          };
        })(this));
      }
    };

    ZeroBlog.prototype.writeData = function(data, cb) {
      var json_raw;
      if (cb == null) {
        cb = null;
      }
      if (!data) {
        return this.log("Data missing");
      }
      this.data["modified"] = data.modified = Time.timestamp();
      json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      this.cmd("fileWrite", ["data/data.json", btoa(json_raw)], (function(_this) {
        return function(res) {
          if (res === "ok") {
            if (cb) {
              cb(true);
            }
          } else {
            _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            if (cb) {
              cb(false);
            }
          }
          return _this.checkPublishbar();
        };
      })(this));
      return this.cmd("fileGet", ["content.json"], (function(_this) {
        return function(content) {
          content = content.replace(/"title": ".*?"/, "\"title\": \"" + data.title + "\"");
          content = unescape(encodeURIComponent(content));
          return _this.cmd("fileWrite", ["content.json", btoa(content)], function(res) {
            if (res !== "ok") {
              _this.cmd("wrapperNotification", ["error", "Content.json write error: " + res]);
            }
            if (_this.site_info["privatekey"]) {
              return _this.cmd("siteSign", ["stored", "content.json"], function(res) {
                return _this.log("Sign result", res);
              });
            }
          });
        };
      })(this));
    };

    ZeroBlog.prototype.writePublish = function(inner_path, data, cb) {
      return this.cmd("fileWrite", [inner_path, data], (function(_this) {
        return function(res) {
          if (res !== "ok") {
            _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            cb(false);
            return false;
          }
          _this.onFileUpdate(inner_path, "file_written");
          return _this.cmd("sitePublish", {
            "inner_path": inner_path
          }, function(res) {
            if (res === "ok") {
              _this.onFileUpdate(inner_path, "file_published");
              return cb(true);
            } else {
              _this.onFileUpdate(inner_path, "file_publication_failed");
              return cb(res);
            }
          });
        };
      })(this));
    };

    ZeroBlog.prototype.submitPostVote = function(e) {
      var elem, inner_path;
      if (!Page.site_info.cert_user_id) {
        Page.certSelect();
        return false;
      }
      elem = $(e.currentTarget);
      elem.toggleClass("active").addClass("loading");
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      Page.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          var current_num, json_raw, post_id;
          if (data) {
            data = JSON.parse(data);
          } else {
            data = {
              "next_comment_id": 1,
              "comment": [],
              "comment_vote": {},
              "post_vote": {}
            };
          }
          if (!data.post_vote) {
            data.post_vote = {};
          }
          post_id = elem.attr("id").match("_([0-9]+)$")[1];
          if (elem.hasClass("active")) {
            data.post_vote[post_id] = 1;
          } else {
            delete data.post_vote[post_id];
          }
          json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
          current_num = parseInt(elem.find(".num").text());
          if (!current_num) {
            current_num = 0;
          }
          if (elem.hasClass("active")) {
            elem.find(".num").text(current_num + 1);
          } else {
            elem.find(".num").text(current_num - 1);
          }
          return Page.writePublish(inner_path, btoa(json_raw), function(res) {
            elem.removeClass("loading");
            return _this.log("Writepublish result", res);
          });
        };
      })(this));
      return false;
    };

    ZeroBlog.prototype.cleanupImages = function() {
      return this.cmd("fileGet", ["data/data.json"], (function(_this) {
        return function(data) {
          return Page.cmd("fileList", "data/img", function(files) {
            var file, j, len, results;
            results = [];
            for (j = 0, len = files.length; j < len; j++) {
              file = files[j];
              if (file.indexOf("post_") !== 0) {
                continue;
              }
              if (data.indexOf(file) === -1) {
                _this.log("Deleting image", file, "...");
                results.push(_this.cmd("fileDelete", "data/img/" + file));
              } else {
                results.push(void 0);
              }
            }
            return results;
          });
        };
      })(this));
    };

    ZeroBlog.prototype.setSiteInfo = function(site_info) {
      var ref, ref1;
      ZeroBlog.__super__.setSiteInfo.call(this, site_info);
      if ($("body").hasClass("page-post")) {
        Comments.checkCert();
      }
      if (((ref = site_info.event) != null ? ref[0] : void 0) === "file_done" && site_info.event[1].match(/.*users.*data.json$/)) {
        RateLimit(500, (function(_this) {
          return function() {
            if ($("body").hasClass("page-post")) {
              _this.pagePost();
              Comments.loadComments();
            }
            if ($("body").hasClass("page-main")) {
              return _this.pageMain();
            }
          };
        })(this));
      } else if (((ref1 = site_info.event) != null ? ref1[0] : void 0) === "file_done" && site_info.event[1].match(/data\/[^\/]+\.json$/)) {
        this.loadData();
        if ($("body").hasClass("page-main")) {
          this.pageMain();
        }
        if ($("body").hasClass("page-post")) {
          this.pagePost();
        }
      }
      return this.checkPublishbar();
    };

    return ZeroBlog;

  })(ZeroApp);

  window.Page = new ZeroBlog();

}).call(this);
