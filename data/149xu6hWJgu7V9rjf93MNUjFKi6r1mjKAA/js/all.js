

/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/libs/ZeroFrame.coffee ---- */


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
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
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
      message.wrapper_nonce = this.wrapper_nonce;
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


/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/libs/marked.min.js ---- */


/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){function e(e){this.tokens=[],this.tokens.links={},this.options=e||a.defaults,this.rules=p.normal,this.options.gfm&&(this.options.tables?this.rules=p.tables:this.rules=p.gfm)}function t(e,t){if(this.options=t||a.defaults,this.links=e,this.rules=u.normal,this.renderer=this.options.renderer||new n,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=u.breaks:this.rules=u.gfm:this.options.pedantic&&(this.rules=u.pedantic)}function n(e){this.options=e||{}}function r(e){this.tokens=[],this.token=null,this.options=e||a.defaults,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options}function s(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function i(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function l(e,t){return e=e.source,t=t||"",function n(r,s){return r?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,s),n):new RegExp(e,t)}}function o(){}function h(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function a(t,n,i){if(i||"function"==typeof n){i||(i=n,n=null),n=h({},a.defaults,n||{});var l,o,p=n.highlight,u=0;try{l=e.lex(t,n)}catch(c){return i(c)}o=l.length;var g=function(e){if(e)return n.highlight=p,i(e);var t;try{t=r.parse(l,n)}catch(s){e=s}return n.highlight=p,e?i(e):i(null,t)};if(!p||p.length<3)return g();if(delete n.highlight,!o)return g();for(;u<l.length;u++)!function(e){return"code"!==e.type?--o||g():p(e.text,e.lang,function(t,n){return t?g(t):null==n||n===e.text?--o||g():(e.text=n,e.escaped=!0,void(--o||g()))})}(l[u])}else try{return n&&(n=h({},a.defaults,n)),r.parse(e.lex(t,n),n)}catch(c){if(c.message+="\nPlease report this to https://github.com/chjj/marked.",(n||a.defaults).silent)return"<p>An error occured:</p><pre>"+s(c.message+"",!0)+"</pre>";throw c}}var p={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:o,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:o,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:o,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};p.bullet=/(?:[*+-]|\d+\.)/,p.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,p.item=l(p.item,"gm")(/bull/g,p.bullet)(),p.list=l(p.list)(/bull/g,p.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+p.def.source+")")(),p.blockquote=l(p.blockquote)("def",p.def)(),p._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",p.html=l(p.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,p._tag)(),p.paragraph=l(p.paragraph)("hr",p.hr)("heading",p.heading)("lheading",p.lheading)("blockquote",p.blockquote)("tag","<"+p._tag)("def",p.def)(),p.normal=h({},p),p.gfm=h({},p.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),p.gfm.paragraph=l(p.paragraph)("(?!","(?!"+p.gfm.fences.source.replace("\\1","\\2")+"|"+p.list.source.replace("\\1","\\3")+"|")(),p.tables=h({},p.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=p,e.lex=function(t,n){var r=new e(n);return r.lex(t)},e.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},e.prototype.token=function(e,t,n){for(var r,s,i,l,o,h,a,u,c,e=e.replace(/^ +$/gm,"");e;)if((i=this.rules.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]||""});else if(i=this.rules.heading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(t&&(i=this.rules.nptable.exec(e))){for(e=e.substring(i[0].length),h={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},u=0;u<h.align.length;u++)/^ *-+: *$/.test(h.align[u])?h.align[u]="right":/^ *:-+: *$/.test(h.align[u])?h.align[u]="center":/^ *:-+ *$/.test(h.align[u])?h.align[u]="left":h.align[u]=null;for(u=0;u<h.cells.length;u++)h.cells[u]=h.cells[u].split(/ *\| */);this.tokens.push(h)}else if(i=this.rules.lheading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=this.rules.hr.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,t,!0),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(e)){for(e=e.substring(i[0].length),l=i[2],this.tokens.push({type:"list_start",ordered:l.length>1}),i=i[0].match(this.rules.item),r=!1,c=i.length,u=0;c>u;u++)h=i[u],a=h.length,h=h.replace(/^ *([*+-]|\d+\.) +/,""),~h.indexOf("\n ")&&(a-=h.length,h=this.options.pedantic?h.replace(/^ {1,4}/gm,""):h.replace(new RegExp("^ {1,"+a+"}","gm"),"")),this.options.smartLists&&u!==c-1&&(o=p.bullet.exec(i[u+1])[0],l===o||l.length>1&&o.length>1||(e=i.slice(u+1).join("\n")+e,u=c-1)),s=r||/\n\n(?!\s*$)/.test(h),u!==c-1&&(r="\n"===h.charAt(h.length-1),s||(s=r)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(h,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(e))e=e.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===i[1]||"script"===i[1]||"style"===i[1]),text:i[0]});else if(!n&&t&&(i=this.rules.def.exec(e)))e=e.substring(i[0].length),this.tokens.links[i[1].toLowerCase()]={href:i[2],title:i[3]};else if(t&&(i=this.rules.table.exec(e))){for(e=e.substring(i[0].length),h={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<h.align.length;u++)/^ *-+: *$/.test(h.align[u])?h.align[u]="right":/^ *:-+: *$/.test(h.align[u])?h.align[u]="center":/^ *:-+ *$/.test(h.align[u])?h.align[u]="left":h.align[u]=null;for(u=0;u<h.cells.length;u++)h.cells[u]=h.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(h)}else if(t&&(i=this.rules.paragraph.exec(e)))e=e.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1].charAt(i[1].length-1)?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var u={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:o,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:o,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};u._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,u._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,u.link=l(u.link)("inside",u._inside)("href",u._href)(),u.reflink=l(u.reflink)("inside",u._inside)(),u.normal=h({},u),u.pedantic=h({},u.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),u.gfm=h({},u.normal,{escape:l(u.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(u.text)("]|","~]|")("|","|https?://|")()}),u.breaks=h({},u.gfm,{br:l(u.br)("{2,}","*")(),text:l(u.gfm.text)("{2,}","*")()}),t.rules=u,t.output=function(e,n,r){var s=new t(n,r);return s.output(e)},t.prototype.output=function(e){for(var t,n,r,i,l="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),l+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=":"===i[1].charAt(6)?this.mangle(i[1].substring(7)):this.mangle(i[1]),r=this.mangle("mailto:")+n):(n=s(i[1]),r=n),l+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),l+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):s(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,l+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){l+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,l+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),l+=this.renderer.strong(this.output(i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),l+=this.renderer.em(this.output(i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),l+=this.renderer.codespan(s(i[2],!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),l+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),l+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),l+=this.renderer.text(s(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(i[0].length),n=s(i[1]),r=n,l+=this.renderer.link(r,null,n);return l},t.prototype.outputLink=function(e,t){var n=s(t.href),r=t.title?s(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,s(e[1]))},t.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},t.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;r>s;s++)t=e.charCodeAt(s),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},n.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+s(t,!0)+'">'+(n?e:s(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:s(e,!0))+"\n</code></pre>"},n.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},n.prototype.html=function(e){return e},n.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},n.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},n.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},n.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},n.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},n.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},n.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},n.prototype.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},n.prototype.strong=function(e){return"<strong>"+e+"</strong>"},n.prototype.em=function(e){return"<em>"+e+"</em>"},n.prototype.codespan=function(e){return"<code>"+e+"</code>"},n.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},n.prototype.del=function(e){return"<del>"+e+"</del>"},n.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(i(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(s){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:"))return""}var l='<a href="'+e+'"';return t&&(l+=' title="'+t+'"'),l+=">"+n+"</a>"},n.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},n.prototype.text=function(e){return e},r.parse=function(e,t,n){var s=new r(t,n);return s.parse(e)},r.prototype.parse=function(e){this.inline=new t(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var n="";this.next();)n+=this.tok();return n},r.prototype.next=function(){return this.token=this.tokens.pop()},r.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},r.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},r.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s,i="",l="";for(n="",e=0;e<this.token.header.length;e++)r={header:!0,align:this.token.align[e]},n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(i+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",s=0;s<t.length;s++)n+=this.renderer.tablecell(this.inline.output(t[s]),{header:!1,align:this.token.align[s]});l+=this.renderer.tablerow(n)}return this.renderer.table(i,l);case"blockquote_start":for(var l="";"blockquote_end"!==this.next().type;)l+=this.tok();return this.renderer.blockquote(l);case"list_start":for(var l="",o=this.token.ordered;"list_end"!==this.next().type;)l+=this.tok();return this.renderer.list(l,o);case"list_item_start":for(var l="";"list_item_end"!==this.next().type;)l+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(l);case"loose_item_start":for(var l="";"list_item_end"!==this.next().type;)l+=this.tok();return this.renderer.listitem(l);case"html":var h=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(h);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},o.exec=o,a.options=a.setOptions=function(e){return h(a.defaults,e),a},a.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new n,xhtml:!1},a.Parser=r,a.parser=r.parse,a.Renderer=n,a.Lexer=e,a.lexer=e.lex,a.InlineLexer=t,a.inlineLexer=t.output,a.parse=a,"undefined"!=typeof module&&"object"==typeof exports?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):this.marked=a}).call(function(){return this||("undefined"!=typeof window?window:global)}());



/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/libs/slugger.js ---- */


// replaces all whitespace with '-' and removes
// all non-url friendly characters
(function () {
var whitespace = /\s+/g;

function slugger(string, opts) {
    opts || (opts = {});
    var allowedCharacters = "A-Za-z0-9_ -";
    if (opts.alsoAllow) allowedCharacters = opts.alsoAllow + allowedCharacters;
    var re = new RegExp('[^' + allowedCharacters + ']', 'g');
    var maintainCase = opts.maintainCase || false;
    var replacement = opts.replacement || '-';
    var smartTrim = opts.smartTrim;
    var decode = (opts.decode !== false);
    var result;
    var lucky;

    if (typeof string !== 'string') return '';
    if (!maintainCase) string = string.toLowerCase();
    if (decode) string = decodeURIComponent(string);
    result = string.trim().replace(re, '').replace(whitespace, replacement);
    if (smartTrim && result.length > smartTrim) {
        lucky = result.charAt(smartTrim) === replacement;
        result = result.slice(0, smartTrim);
        if (!lucky) result = result.slice(0, result.lastIndexOf(replacement));
    }
    return result;
}

if (typeof module !== 'undefined') {
    module.exports = slugger;
} else {
    window.slugger = slugger;
}
})();


/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/libs/uuid.js ---- */


//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/*global window, require, define */
(function(_window) {
  'use strict';

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;

  function setupBrowser() {
    // Allow for MSIE11 msCrypto
    var _crypto = _window.crypto || _window.msCrypto;

    if (!_rng && _crypto && _crypto.getRandomValues) {
      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
      //
      // Moderately fast, high quality
      try {
        var _rnds8 = new Uint8Array(16);
        _whatwgRNG = _rng = function whatwgRNG() {
          _crypto.getRandomValues(_rnds8);
          return _rnds8;
        };
        _rng();
      } catch(e) {}
    }

    if (!_rng) {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var  _rnds = new Array(16);
      _mathRNG = _rng = function() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) { r = Math.random() * 0x100000000; }
          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }

        return _rnds;
      };
      if ('undefined' !== typeof console && console.warn) {
        console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
      }
    }
  }

  function setupNode() {
    // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
    //
    // Moderately fast, high quality
    if ('function' === typeof require) {
      try {
        var _rb = require('crypto').randomBytes;
        _nodeRNG = _rng = _rb && function() {return _rb(16);};
        _rng();
      } catch(e) {}
    }
  }

  if (_window) {
    setupBrowser();
  } else {
    setupNode();
  }

  // Buffer class to use
  var BufferClass = ('function' === typeof Buffer) ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = (options.clockseq != null) ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = (options.msecs != null) ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = (options.nsecs != null) ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) === 'string') {
      buf = (options === 'binary') ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;
  uuid._rng = _rng;
  uuid._mathRNG = _mathRNG;
  uuid._nodeRNG = _nodeRNG;
  uuid._whatwgRNG = _whatwgRNG;

  if (('undefined' !== typeof module) && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});


  } else {
    // Publish as global (in browsers)
    _previousRoot = _window.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _window.uuid = _previousRoot;
      return uuid;
    };

    _window.uuid = uuid;
  }
})('undefined' !== typeof window ? window : null);


/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/utils/LinkHelper.coffee ---- */


(function() {
  var LinkHelper,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  LinkHelper = (function() {
    function LinkHelper() {
      this.uniqueLinks = [];
    }

    LinkHelper.prototype.extractLinks = function(content) {
      var i, label, len, links, m, match, text, unique;
      links = [];
      if (match = content.match(/(\[\[(.+?)\]\])/g)) {
        unique = [];
        for (i = 0, len = match.length; i < len; i++) {
          m = match[i];
          text = m.match(/\[\[(.*?)(\|(.*?))?\]\]/);
          label = text[1];
          if (text[3] !== void 0) {
            label = text[3];
          }
          links.push({
            tag: m,
            slug: slugger(text[1]),
            text: label
          });
        }
      }
      return this.getUniqueLinks(links);
    };

    LinkHelper.prototype.getUniqueLinks = function(links) {
      var i, len, link, ref, unique, uniqueLinks;
      unique = [];
      uniqueLinks = [];
      for (i = 0, len = links.length; i < len; i++) {
        link = links[i];
        if (ref = link.tag, indexOf.call(unique, ref) < 0) {
          unique.push(link.tag);
          uniqueLinks.push(link);
        }
      }
      return uniqueLinks;
    };

    LinkHelper.prototype.parseContent = function(content) {
      var links;
      links = this.extractLinks(content);
      links = links.concat(this.uniqueLinks);
      this.uniqueLinks = this.getUniqueLinks(links);
      return true;
    };

    LinkHelper.prototype.getLinks = function() {
      return this.uniqueLinks.sort(function(a, b) {
        if (a.slug > b.slog) {
          return 1;
        } else if (a.slug < b.slug) {
          return -1;
        } else {
          return 0;
        }
      });
    };

    LinkHelper.prototype.getSlugs = function(quote, links) {
      var i, len, link, slug, slugs;
      if (quote == null) {
        quote = false;
      }
      if (links == null) {
        links = null;
      }
      if (links === null) {
        links = this.uniqueLinks;
      }
      slugs = [];
      for (i = 0, len = links.length; i < len; i++) {
        link = links[i];
        slug = link.slug;
        if (quote) {
          slug = "'" + slug + "'";
        }
        slugs.push(slug);
      }
      return slugs;
    };

    LinkHelper.prototype.reset = function() {
      this.uniqueLinks = [];
      return true;
    };

    return LinkHelper;

  })();

  window.LinkHelper = new LinkHelper;

}).call(this);


/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/utils/Time.coffee ---- */


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


/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/utils/WikiUi.coffee ---- */


(function() {
  var WikiUi;

  WikiUi = (function() {
    function WikiUi() {
      this.historyTools = document.getElementById("content-history-tools");
      this.viewTools = document.getElementById("content-view-tools");
      this.editTools = document.getElementById("content-edit-tools");
      this.contentPanel = document.getElementById("messages");
      this.contentEditor = document.getElementById("editor");
      this.contentHistory = document.getElementById("history");
      this.markedOptions = {
        "gfm": true,
        "breaks": true,
        "sanitize": true,
        "tables": true,
        "smartLists": true
      };
    }

    WikiUi.prototype.hideTools = function() {
      this.historyTools.style.display = "none";
      this.viewTools.style.display = "none";
      return this.editTools.style.display = "none";
    };

    WikiUi.prototype.showHistoryTools = function() {
      return this.historyTools.style.display = "block";
    };

    WikiUi.prototype.showViewTools = function() {
      return this.viewTools.style.display = "block";
    };

    WikiUi.prototype.showEditTools = function() {
      return this.editTools.style.display = "block";
    };

    WikiUi.prototype.hidePanels = function() {
      this.contentPanel.style.display = "none";
      this.contentEditor.style.display = "none";
      return this.contentHistory.style.display = "none";
    };

    WikiUi.prototype.showContent = function(rev) {
      if (rev == null) {
        rev = null;
      }
      this.hideTools();
      this.showViewTools();
      this.hidePanels();
      if (rev !== null) {
        document.getElementById('revision').style.display = "block";
        document.getElementById('edit_page').style.display = "none";
      }
      return this.contentPanel.style.display = "block";
    };

    WikiUi.prototype.showEdit = function() {
      this.hideTools();
      this.showEditTools();
      this.hidePanels();
      this.contentEditor.style.display = "block";
      return this.contentEditor.focus();
    };

    WikiUi.prototype.showNewPageMessage = function() {
      var body;
      this.hideTools();
      this.hidePanels();
      body = "<div class=\"new-page-message\">";
      body += "<p class=\"muted\">This page doesn't exist yet.</p>";
      body += "<p><a href=\"#\" class=\"pure-button\" onclick=\"return Page.pageEdit()\">Create this page</a></p>";
      body += "</div>";
      this.contentPanel.innerHTML = body;
      return this.contentPanel.style.display = "block";
    };

    WikiUi.prototype.showHistory = function(messages) {
      var body, history_list, i, len, message, parsedDate;
      this.hideTools();
      this.showHistoryTools();
      this.hidePanels();
      this.contentHistory.style.display = "block";
      history_list = document.getElementById("history_list");
      body = "";
      for (i = 0, len = messages.length; i < len; i++) {
        message = messages[i];
        parsedDate = Time.since(message.date_added / 1000);
        body += "<li>Edited by " + message.cert_user_id + " <span class=\"muted\">" + parsedDate + "</span>";
        body += "<a href=\"?Page:" + message.slug + "&Rev:" + message.id + "\" class=\"pure-button button-success\">";
        body += "View</a></li>";
      }
      history_list = document.getElementById("history_list");
      return history_list.innerHTML = body;
    };

    WikiUi.prototype.loadContent = function(originalContent, HTMLContent, rev) {
      var i, len, link, ref;
      if (rev == null) {
        rev = null;
      }
      this.contentEditor.innerHTML = originalContent;
      this.contentPanel.innerHTML = HTMLContent;
      ref = this.contentPanel.querySelectorAll('a:not(.internal)');
      for (i = 0, len = ref.length; i < len; i++) {
        link = ref[i];
        link.className += ' external';
        if (link.href.indexOf(location.origin) === 0) {
          link.className += ' zeronet';
        } else {
          link.className += ' clearnet';
        }
      }
      return this.showContent(rev);
    };

    WikiUi.prototype.showIndexPage = function(links, orphaned) {
      var body, i, j, len, len1, link, linksBody;
      this.hideTools();
      this.hidePanels();
      this.contentPanel.style.display = "block";
      body = "";
      linksBody = "";
      for (i = 0, len = links.length; i < len; i++) {
        link = links[i];
        linksBody += "<li>" + link + "</li>";
      }
      if (linksBody !== "") {
        body = "<h1>Linked Pages</h1><ul>" + linksBody + "</ul>";
      }
      if (orphaned.length > 0) {
        body += "<h1>Orphaned pages</h1><ul>";
        for (j = 0, len1 = orphaned.length; j < len1; j++) {
          link = orphaned[j];
          body += "<li>" + link + "</li>";
        }
        body += "</ul>";
      }
      if (body === "") {
        body = "<p class=\"muted\">There are no pages yet.</p>";
      }
      return this.contentPanel.innerHTML = body;
    };

    WikiUi.prototype.loggedInMessage = function(cert) {
      if (cert) {
        return document.getElementById("select_user").innerHTML = "You are logged in as " + cert;
      } else {
        return document.getElementById("select_user").innerHTML = "Login";
      }
    };

    WikiUi.prototype.setUserQuota = function(current, max) {
      var quotaElement;
      if (current == null) {
        current = null;
      }
      if (max == null) {
        max = null;
      }
      quotaElement = document.getElementById("user_quota");
      if (current !== null && max !== null) {
        return quotaElement.innerHTML = "(" + ((current / 1024).toFixed(1)) + "kb/" + ((max / 1024).toFixed(1)) + "kb)";
      } else {
        return quotaElement.innerHTML = "";
      }
    };

    return WikiUi;

  })();

  window.WikiUi = new WikiUi;

}).call(this);


/* ---- /149xu6hWJgu7V9rjf93MNUjFKi6r1mjKAA/js/ZeroWiki.coffee ---- */


(function() {
  var ZeroWiki,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ZeroWiki = (function(superClass) {
    extend(ZeroWiki, superClass);

    function ZeroWiki() {
      this.selectUser = bind(this.selectUser, this);
      ZeroWiki.__super__.constructor.call(this);
      this.editingPage = false;
      this.pageId = null;
      this.waitingConfirmation = false;
    }

    ZeroWiki.prototype.onOpenWebsocket = function(e) {
      this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          _this.site_info = site_info;
          WikiUi.loggedInMessage(site_info.cert_user_id);
          return _this.updateUserQuota();
        };
      })(this));
      if (!this.isStaticRequest()) {
        return this.pageLoad();
      }
    };

    ZeroWiki.prototype.route = function(cmd, message) {
      var query, slug;
      if (cmd === "setSiteInfo") {
        this.site_info = message.params;
        WikiUi.loggedInMessage(message.params.cert_user_id);
        this.updateUserQuota();
        if (message.params.event[0] === "file_done") {
          slug = this.getSlug();
          query = "SELECT * FROM pages WHERE pages.slug = '" + slug + "' ORDER BY date_added DESC LIMIT 1";
          return this.cmd("dbQuery", [query], (function(_this) {
            return function(page) {
              var confirmMessage;
              if (page.length === 1 && _this.editingPage === true) {
                if (page[0].id !== _this.pageId && _this.waitingConfirmation !== true) {
                  _this.waitingConfirmation = true;
                  confirmMessage = "This page has been updated. Do you want to load the changes?";
                  return _this.cmd("wrapperConfirm", [confirmMessage, "Yes"], function(confirmed) {
                    _this.waitingConfirmation = false;
                    return _this.pageLoad();
                  });
                }
              } else {
                if (!_this.isStaticRequest()) {
                  return _this.pageLoad();
                }
              }
            };
          })(this));
        }
      }
    };

    ZeroWiki.prototype.selectUser = function() {
      Page.cmd("certSelect", [["zeroid.bit"]]);
      return false;
    };

    ZeroWiki.prototype.pageLoad = function(slug, rev) {
      var query;
      if (slug == null) {
        slug = null;
      }
      if (rev == null) {
        rev = null;
      }
      this.editingPage = false;
      if (slug === null) {
        slug = this.getSlug();
      }
      if (rev === null) {
        rev = this.getRevisionNumber();
      }
      if (rev === null) {
        query = "SELECT * FROM pages WHERE pages.slug = '" + slug + "' ORDER BY date_added DESC LIMIT 1";
      } else {
        query = "SELECT * FROM pages WHERE pages.id = '" + rev + "'";
      }
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(page) {
          if (page.length === 1) {
            _this.pageId = page[0].id;
            return _this.parseContent(page[0].body, rev);
          } else {
            if (rev !== null) {
              return _this.cmd("wrapperNotification", ["error", "Wrong revision number."]);
            } else {
              return WikiUi.showNewPageMessage();
            }
          }
        };
      })(this));
    };

    ZeroWiki.prototype.pageSave = function(reload) {
      var inner_path, slug;
      if (reload == null) {
        reload = false;
      }
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
        return false;
      }
      slug = this.getSlug();
      if (slug === false) {
        this.cmd("wrapperNotification", ["error", "Operation not permitted."]);
        return false;
      }
      inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
      return this.cmd("fileGet", {
        "inner_path": inner_path,
        "required": false
      }, (function(_this) {
        return function(data) {
          var i, json_raw, len, new_data, page, pages_limit, ref;
          if (data) {
            data = JSON.parse(data);
          } else {
            data = {
              "pages": []
            };
          }
          data.pages.unshift({
            "id": uuid.v1(),
            "body": document.getElementById("editor").value,
            "date_added": new Date().getTime(),
            "slug": slug
          });
          new_data = {
            "pages": []
          };
          pages_limit = {};
          ref = data.pages;
          for (i = 0, len = ref.length; i < len; i++) {
            page = ref[i];
            if (pages_limit[page.slug] === void 0) {
              pages_limit[page.slug] = 0;
            }
            if (pages_limit[page.slug] < 5) {
              new_data.pages.push(page);
              pages_limit[page.slug]++;
            }
          }
          json_raw = unescape(encodeURIComponent(JSON.stringify(new_data, void 0, '\t')));
          _this.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
            if (res === "ok") {
              if (reload === true) {
                return window.location = "?Page:" + slug;
              }
              _this.pageLoad();
              _this.updateUserQuota();
              return _this.cmd("sitePublish", {
                "inner_path": inner_path
              }, function(res) {
                if (res.error) {
                  return _this.cmd("wrapperNotification", ["error", res.error]);
                }
              });
            } else {
              return _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            }
          });
          return false;
        };
      })(this));
    };

    ZeroWiki.prototype.pageEdit = function() {
      this.editingPage = true;
      return WikiUi.showEdit();
    };

    ZeroWiki.prototype.pageHistory = function(slug) {
      var query;
      query = "SELECT pages.*, keyvalue.value AS cert_user_id FROM pages\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nWHERE pages.slug = '" + slug + "'\nORDER BY date_added DESC";
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(pages) {
          return WikiUi.showHistory(pages);
        };
      })(this));
    };

    ZeroWiki.prototype.showIndexPage = function() {
      var query;
      query = "SELECT id, body, slug, MAX(date_added), json_id FROM pages GROUP BY pages.slug ORDER BY date_added DESC";
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(pages) {
          var i, len, linkTags, page, slugs;
          LinkHelper.reset();
          for (i = 0, len = pages.length; i < len; i++) {
            page = pages[i];
            LinkHelper.parseContent(page.body);
          }
          linkTags = LinkHelper.getLinks();
          slugs = LinkHelper.getSlugs(true).join(",");
          query = "SELECT slug FROM pages WHERE pages.slug in (" + slugs + ") GROUP BY slug";
          return _this.cmd("dbQuery", [query], function(slugs) {
            var cssClass, existingPages, j, k, len1, len2, links, normalized, orphaned, ref, ref1, ref2, ref3, tag, uniqueOrphans;
            existingPages = LinkHelper.getSlugs(false, slugs);
            links = [];
            normalized = [];
            for (j = 0, len1 = linkTags.length; j < len1; j++) {
              tag = linkTags[j];
              if (ref = tag.text.toLowerCase(), indexOf.call(normalized, ref) < 0) {
                cssClass = "";
                if (ref1 = tag.slug, indexOf.call(existingPages, ref1) < 0) {
                  cssClass = "red";
                }
                links.push("<a href=\"?Page:" + tag.slug + "\" class=\"" + cssClass + "\">" + tag.text + "</a>");
                normalized.push(tag.text.toLowerCase());
              }
            }
            slugs = LinkHelper.getSlugs();
            orphaned = [];
            uniqueOrphans = [];
            for (k = 0, len2 = pages.length; k < len2; k++) {
              page = pages[k];
              if ((ref2 = page.slug, indexOf.call(slugs, ref2) < 0) && (ref3 = page.slug, indexOf.call(uniqueOrphans, ref3) < 0) && page.slug !== "home") {
                orphaned.push("<a href=\"?Page:" + page.slug + "\">[[" + page.slug + "]]</a>");
                uniqueOrphans.push(page.slug);
              }
            }
            return WikiUi.showIndexPage(links, orphaned.sort());
          });
        };
      })(this));
    };

    ZeroWiki.prototype.isStaticRequest = function(url) {
      var match;
      if (url == null) {
        url = null;
      }
      if (url === null) {
        url = window.location.search.substring(1);
      }
      if (match = url.match(/Index(&.*)?$/)) {
        this.showIndexPage();
        return true;
      }
      if (this.isHistory(url)) {
        this.pageHistory(this.getSlug());
        return true;
      }
      return false;
    };

    ZeroWiki.prototype.isHistory = function(url) {
      var match;
      if (url == null) {
        url = null;
      }
      if (url === null) {
        url = window.location.search.substring(1);
      }
      if (match = url.match(/Page:([a-z0-9\-]*)(&.*)?History(&.*)?$/)) {
        return true;
      }
      return false;
    };

    ZeroWiki.prototype.getSlug = function(url) {
      var match;
      if (url == null) {
        url = null;
      }
      if (url === null) {
        url = window.location.search.substring(1);
      }
      if (match = url.match(/Page:([a-z0-9\-]*)(&.*)?$/)) {
        return match[1].toLowerCase();
      } else {
        return "home";
      }
    };

    ZeroWiki.prototype.getRevisionNumber = function(url) {
      var match;
      if (url == null) {
        url = null;
      }
      if (url === null) {
        url = window.location.search.substring(1);
      }
      if (match = url.match(/Rev:([a-z0-9\-]*)(&.*)?$/)) {
        return match[1];
      } else {
        return null;
      }
    };

    ZeroWiki.prototype.parseContent = function(content, rev) {
      var HTMLcontent, links, query, slugs;
      if (rev == null) {
        rev = null;
      }
      HTMLcontent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      HTMLcontent = marked(HTMLcontent, this.markedOptions);
      HTMLcontent = HTMLcontent.replace(/{SidebarStart}/g, "<div class='sidebar'><div class='sidebar-header'>");
      HTMLcontent = HTMLcontent.replace(/{SidebarMid}/g, "</div><div class='sidebar-content'>");
      HTMLcontent = HTMLcontent.replace(/{SidebarEnd}/g, "</div></div>");
      LinkHelper.reset();
      LinkHelper.parseContent(HTMLcontent);
      links = LinkHelper.getLinks();
      slugs = LinkHelper.getSlugs(true).join(",");
      query = "SELECT slug FROM pages WHERE pages.slug in (" + slugs + ") GROUP BY slug ORDER BY date_added";
      return this.cmd("dbQuery", [query], (function(_this) {
        return function(slugs) {
          var cssClass, existingPages, i, len, link, ref, replace;
          existingPages = LinkHelper.getSlugs(false, slugs);
          for (i = 0, len = links.length; i < len; i++) {
            link = links[i];
            cssClass = "internal";
            if (ref = link.slug, indexOf.call(existingPages, ref) < 0) {
              cssClass += " red";
            }
            replace = "<a href=\"?Page:" + link.slug + "\" class=\"" + cssClass + "\">" + link.text + "</a>";
            link.tag = link.tag.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            HTMLcontent = HTMLcontent.replace(new RegExp(link.tag, "g"), replace);
          }
          return WikiUi.loadContent(content, HTMLcontent, rev);
        };
      })(this));
    };

    ZeroWiki.prototype.updateUserQuota = function() {
      if (this.site_info.cert_user_id) {
        return this.cmd("fileRules", "data/users/" + this.site_info.auth_address + "/content.json", (function(_this) {
          return function(rules) {
            return WikiUi.setUserQuota(rules.current_size, rules.max_size);
          };
        })(this));
      } else {
        return WikiUi.setUserQuota();
      }
    };

    ZeroWiki.prototype.getCurrentRevision = function() {
      var slug;
      slug = this.getSlug();
      return window.location = "?Page:" + slug;
    };

    ZeroWiki.prototype.getHistory = function() {
      var slug;
      slug = this.getSlug();
      return window.location = "?Page:" + slug + "&History";
    };

    ZeroWiki.prototype.deleteCurrentPage = function() {
      var slug;
      if (!Page.site_info.cert_user_id) {
        Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
        return false;
      }
      console.log(Page);
      slug = this.getSlug();
      return this.cmd("wrapperConfirm", ["Are you sure you want to delete the page: <b>" + slug + "</b>", "Delete"], (function(_this) {
        return function(confirmed) {
          return _this.log("Deleting " + slug + "...", confirmed);
        };
      })(this));
    };

    return ZeroWiki;

  })(ZeroFrame);

  window.Page = new ZeroWiki();

}).call(this);
