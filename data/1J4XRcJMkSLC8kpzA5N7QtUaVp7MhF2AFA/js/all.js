

/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/libs/ZeroFrame.coffee ---- */


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



/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/libs/marked.min.js ---- */


/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function(e){"use strict";var k={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:g,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,nptable:g,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:g,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,text:/^[^\n]+/};function a(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||d.defaults,this.rules=k.normal,this.options.pedantic?this.rules=k.pedantic:this.options.gfm&&(this.options.tables?this.rules=k.tables:this.rules=k.gfm)}k._label=/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,k._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,k.def=t(k.def).replace("label",k._label).replace("title",k._title).getRegex(),k.bullet=/(?:[*+-]|\d+\.)/,k.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,k.item=t(k.item,"gm").replace(/bull/g,k.bullet).getRegex(),k.list=t(k.list).replace(/bull/g,k.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+k.def.source+")").getRegex(),k._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",k._comment=/<!--(?!-?>)[\s\S]*?-->/,k.html=t(k.html,"i").replace("comment",k._comment).replace("tag",k._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),k.paragraph=t(k.paragraph).replace("hr",k.hr).replace("heading",k.heading).replace("lheading",k.lheading).replace("tag",k._tag).getRegex(),k.blockquote=t(k.blockquote).replace("paragraph",k.paragraph).getRegex(),k.normal=f({},k),k.gfm=f({},k.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),k.gfm.paragraph=t(k.paragraph).replace("(?!","(?!"+k.gfm.fences.source.replace("\\1","\\2")+"|"+k.list.source.replace("\\1","\\3")+"|").getRegex(),k.tables=f({},k.gfm,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),k.pedantic=f({},k.normal,{html:t("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",k._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/}),a.rules=k,a.lex=function(e,t){return new a(t).lex(e)},a.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},a.prototype.token=function(e,t){var n,r,s,i,l,o,a,h,p,c,u,g,f,d,b,m;for(e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),1<s[0].length&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:y(s,"\n")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2],text:s[3]||""});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(t&&(s=this.rules.nptable.exec(e))&&(o={type:"table",header:x(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/\n$/,"").split("\n"):[]}).header.length===o.align.length){for(e=e.substring(s[0].length),u=0;u<o.align.length;u++)/^ *-+: *$/.test(o.align[u])?o.align[u]="right":/^ *:-+: *$/.test(o.align[u])?o.align[u]="center":/^ *:-+ *$/.test(o.align[u])?o.align[u]="left":o.align[u]=null;for(u=0;u<o.cells.length;u++)o.cells[u]=x(o.cells[u],o.header.length);this.tokens.push(o)}else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),a={type:"list_start",ordered:d=1<(i=s[2]).length,start:d?+i:"",loose:!1},this.tokens.push(a),n=!(h=[]),f=(s=s[0].match(this.rules.item)).length,u=0;u<f;u++)c=(o=s[u]).length,~(o=o.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(c-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+c+"}","gm"),"")),this.options.smartLists&&u!==f-1&&(i===(l=k.bullet.exec(s[u+1])[0])||1<i.length&&1<l.length||(e=s.slice(u+1).join("\n")+e,u=f-1)),r=n||/\n\n(?!\s*$)/.test(o),u!==f-1&&(n="\n"===o.charAt(o.length-1),r||(r=n)),r&&(a.loose=!0),m=void 0,(b=/^\[[ xX]\] /.test(o))&&(m=" "!==o[1],o=o.replace(/^\[[ xX]\] +/,"")),p={type:"list_item_start",task:b,checked:m,loose:r},h.push(p),this.tokens.push(p),this.token(o,!1),this.tokens.push({type:"list_item_end"});if(a.loose)for(f=h.length,u=0;u<f;u++)h[u].loose=!0;this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===s[1]||"script"===s[1]||"style"===s[1]),text:s[0]});else if(t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),s[3]&&(s[3]=s[3].substring(1,s[3].length-1)),g=s[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[g]||(this.tokens.links[g]={href:s[2],title:s[3]});else if(t&&(s=this.rules.table.exec(e))&&(o={type:"table",header:x(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/(?: *\| *)?\n$/,"").split("\n"):[]}).header.length===o.align.length){for(e=e.substring(s[0].length),u=0;u<o.align.length;u++)/^ *-+: *$/.test(o.align[u])?o.align[u]="right":/^ *:-+: *$/.test(o.align[u])?o.align[u]="center":/^ *:-+ *$/.test(o.align[u])?o.align[u]="left":o.align[u]=null;for(u=0;u<o.cells.length;u++)o.cells[u]=x(o.cells[u].replace(/^ *\| *| *\| *$/g,""),o.header.length);this.tokens.push(o)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var n={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:g,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:g,text:/^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/};function h(e,t){if(this.options=t||d.defaults,this.links=e,this.rules=n.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=n.pedantic:this.options.gfm&&(this.options.breaks?this.rules=n.breaks:this.rules=n.gfm)}function r(e){this.options=e||d.defaults}function s(){}function p(e){this.tokens=[],this.token=null,this.options=e||d.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}function c(e,t){if(t){if(c.escapeTest.test(e))return e.replace(c.escapeReplace,function(e){return c.replacements[e]})}else if(c.escapeTestNoEncode.test(e))return e.replace(c.escapeReplaceNoEncode,function(e){return c.replacements[e]});return e}function u(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function t(n,e){return n=n.source||n,e=e||"",{replace:function(e,t){return t=(t=t.source||t).replace(/(^|[^\[])\^/g,"$1"),n=n.replace(e,t),this},getRegex:function(){return new RegExp(n,e)}}}function i(e,t){return l[" "+e]||(/^[^:]+:\/*[^/]*$/.test(e)?l[" "+e]=e+"/":l[" "+e]=y(e,"/",!0)),e=l[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+t:e+t}n._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,n._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,n._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,n.autolink=t(n.autolink).replace("scheme",n._scheme).replace("email",n._email).getRegex(),n._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,n.tag=t(n.tag).replace("comment",k._comment).replace("attribute",n._attribute).getRegex(),n._label=/(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/,n._href=/\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/,n._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,n.link=t(n.link).replace("label",n._label).replace("href",n._href).replace("title",n._title).getRegex(),n.reflink=t(n.reflink).replace("label",n._label).getRegex(),n.normal=f({},n),n.pedantic=f({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:t(/^!?\[(label)\]\((.*?)\)/).replace("label",n._label).getRegex(),reflink:t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",n._label).getRegex()}),n.gfm=f({},n.normal,{escape:t(n.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:t(n.text).replace("]|","~]|").replace("|$","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|$").getRegex()}),n.gfm.url=t(n.gfm.url).replace("email",n.gfm._extended_email).getRegex(),n.breaks=f({},n.gfm,{br:t(n.br).replace("{2,}","*").getRegex(),text:t(n.gfm.text).replace("{2,}","*").getRegex()}),h.rules=n,h.output=function(e,t,n){return new h(t,n).output(e)},h.prototype.output=function(e){for(var t,n,r,s,i,l,o="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),o+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),r="@"===i[2]?"mailto:"+(n=c(this.mangle(i[1]))):n=c(i[1]),o+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(i[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(i[0])&&(this.inRawBlock=!1),e=e.substring(i[0].length),o+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):c(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,r=i[2],this.options.pedantic?(t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))?(r=t[1],s=t[3]):s="":s=i[3]?i[3].slice(1,-1):"",r=r.trim().replace(/^<([\s\S]*)>$/,"$1"),o+=this.outputLink(i,{href:h.escapes(r),title:h.escapes(s)}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){o+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),o+=this.renderer.strong(this.output(i[4]||i[3]||i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),o+=this.renderer.em(this.output(i[6]||i[5]||i[4]||i[3]||i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),o+=this.renderer.codespan(c(i[2].trim(),!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),o+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),o+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.inRawBlock?o+=this.renderer.text(i[0]):o+=this.renderer.text(c(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else{if("@"===i[2])r="mailto:"+(n=c(i[0]));else{for(;l=i[0],i[0]=this.rules._backpedal.exec(i[0])[0],l!==i[0];);n=c(i[0]),r="www."===i[1]?"http://"+n:n}e=e.substring(i[0].length),o+=this.renderer.link(r,null,n)}return o},h.escapes=function(e){return e?e.replace(h.rules._escapes,"$1"):e},h.prototype.outputLink=function(e,t){var n=t.href,r=t.title?c(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,c(e[1]))},h.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},h.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;s<r;s++)t=e.charCodeAt(s),.5<Math.random()&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+c(t,!0)+'">'+(n?e:c(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:c(e,!0))+"</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t,n){var r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(u(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return n}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return n}this.options.baseUrl&&!o.test(e)&&(e=i(this.options.baseUrl,e));try{e=encodeURI(e).replace(/%25/g,"%")}catch(e){return n}var s='<a href="'+c(e)+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>"},r.prototype.image=function(e,t,n){this.options.baseUrl&&!o.test(e)&&(e=i(this.options.baseUrl,e));var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},s.prototype.strong=s.prototype.em=s.prototype.codespan=s.prototype.del=s.prototype.text=function(e){return e},s.prototype.link=s.prototype.image=function(e,t,n){return""+n},s.prototype.br=function(){return""},p.parse=function(e,t){return new p(t).parse(e)},p.prototype.parse=function(e){this.inline=new h(e.links,this.options),this.inlineText=new h(e.links,f({},this.options,{renderer:new s})),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},p.prototype.next=function(){return this.token=this.tokens.pop()},p.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},p.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},p.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,u(this.inlineText.output(this.token.text)));case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s="",i="";for(n="",e=0;e<this.token.header.length;e++)n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});i+=this.renderer.tablerow(n)}return this.renderer.table(s,i);case"blockquote_start":for(i="";"blockquote_end"!==this.next().type;)i+=this.tok();return this.renderer.blockquote(i);case"list_start":i="";for(var l=this.token.ordered,o=this.token.start;"list_end"!==this.next().type;)i+=this.tok();return this.renderer.list(i,l,o);case"list_item_start":i="";var a=this.token.loose;for(this.token.task&&(i+=this.renderer.checkbox(this.token.checked));"list_item_end"!==this.next().type;)i+=a||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(i);case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},c.escapeTest=/[&<>"']/,c.escapeReplace=/[&<>"']/g,c.replacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},c.escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,c.escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g;var l={},o=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function g(){}function f(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function x(e,t){var n=e.replace(/\|/g,function(e,t,n){for(var r=!1,s=t;0<=--s&&"\\"===n[s];)r=!r;return r?"|":" |"}).split(/ \|/),r=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function y(e,t,n){if(0===e.length)return"";for(var r=0;r<e.length;){var s=e.charAt(e.length-r-1);if(s!==t||n){if(s===t||!n)break;r++}else r++}return e.substr(0,e.length-r)}function d(e,n,r){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(r||"function"==typeof n){r||(r=n,n=null);var s,i,l=(n=f({},d.defaults,n||{})).highlight,t=0;try{s=a.lex(e,n)}catch(e){return r(e)}i=s.length;var o=function(t){if(t)return n.highlight=l,r(t);var e;try{e=p.parse(s,n)}catch(e){t=e}return n.highlight=l,t?r(t):r(null,e)};if(!l||l.length<3)return o();if(delete n.highlight,!i)return o();for(;t<s.length;t++)!function(n){"code"!==n.type?--i||o():l(n.text,n.lang,function(e,t){return e?o(e):null==t||t===n.text?--i||o():(n.text=t,n.escaped=!0,void(--i||o()))})}(s[t])}else try{return n&&(n=f({},d.defaults,n)),p.parse(a.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(n||d.defaults).silent)return"<p>An error occurred:</p><pre>"+c(e.message+"",!0)+"</pre>";throw e}}g.exec=g,d.options=d.setOptions=function(e){return f(d.defaults,e),d},d.getDefaults=function(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:new r,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tables:!0,xhtml:!1}},d.defaults=d.getDefaults(),d.Parser=p,d.parser=p.parse,d.Renderer=r,d.TextRenderer=s,d.Lexer=a,d.lexer=a.lex,d.InlineLexer=h,d.inlineLexer=h.output,d.parse=d,"undefined"!=typeof module&&"object"==typeof exports?module.exports=d:"function"==typeof define&&define.amd?define(function(){return d}):e.marked=d}(this||("undefined"!=typeof window?window:global));

/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/libs/slugger.js ---- */


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


/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/libs/uuid.js ---- */


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


/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/utils/LinkHelper.coffee ---- */


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



/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/utils/Time.coffee ---- */


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



/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/utils/WikiUi.coffee ---- */


(function() {
  var WikiUi;

  WikiUi = (function() {
    function WikiUi() {
      this.historyTools = document.getElementById("content-history-tools");
      this.viewTools = document.getElementById("content-view-tools");
      this.editTools = document.getElementById("content-edit-tools");
      this.contentPanel = document.getElementById("messages");
      this.contentEditor = document.getElementById("article");
      this.contentHistory = document.getElementById("history");
      this.markedOptions = {
        "gfm": true,
        "breaks": true,
        "sanitize": true
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
      body += "<p><a href=\"#\" class=\"pure-button\" onclick=\"return Page.pageEdit()\">Crea un nuovo articolo</a></p>";
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
        body += "<li> <div style='background-image: url(https://steemitimages.com/u/"+message.cert_user_id.replace(/@.*/, "")+"/avatar); box-shadow: 0 0 2px 0px black; max-width: 45px; background-position: center; background-size: cover; display: inline-block; width: 45px; height: 45px; border-radius: 36px; vertical-align: middle; margin-right: 10px; float: left;margin-top: -8px;'></div> <a style=\"float: left;\"href=\"/"+message.cert_user_id.replace(/@.*/, "")+".ex\">Edited by "+message.cert_user_id.replace(/@.*/, "")+"</a>  <span class=\"muted\">" + parsedDate + "</span>";
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
        return document.getElementById("select_user").innerHTML = "<div style='background-image: url(https://steemitimages.com/u/"+cert.replace(/@.*/, "")+"/avatar); box-shadow: 0 0 2px 0px black; max-width: 45px; background-position: center; background-size: cover; display: inline-block; width: 35px; height: 35px; border-radius: 36px; vertical-align: middle; margin-right: 10px; float: left;margin-top: -8px;'></div> " + cert.replace(/@.*/, "");
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



/* ---- /138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP/js/ZeroWiki.coffee ---- */


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
      Page.cmd("certSelect", [["zeroid.bit"],["metaverse"] ]);
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
	  
  
  
  
  
  
  steemitWidgets.profile({
    element: 'steemit-widgets-profile2',
    template: '<div style="font-size: 16px; padding: 10px; font-family: \'Source Sans Pro\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; text-shadow: rgb(0, 0, 0) 1px 1px 4px; background: linear-gradient(rgb(26, 64, 114) 0px, rgb(35, 87, 157));"><a href="https://steemit.com/@${USER}" style="color: rgb(255, 255, 255); text-decoration: none; line-height: 50px; display: block; text-align: center; font-size: 25px;"><span style="background: url(\'${IMAGE}\') center center / cover; display: inline-block; width: 50px; height: 50px; border-radius: 36px; vertical-align: middle; margin-right: 10px;"></span> <b>${USER}</b> <!----></a> <div style="margin: 10px; line-height: 18px; text-align: center; color: rgb(255, 255, 255);"><div style="color: rgb(255, 255, 255); margin: 8px 0px;">${ABOUT}</div> <div style="margin: 5px 0px;"><span>${FOLLOWERS} followers</span> <span style="padding: 0px 10px;">|</span> <!----> <!----> <span>${FOLLOWING} following</span></div> <div style="margin: 8px 0px;"><!----> <!----> <span style="margin: 0px 5px;"><span style="width: 15px; height: 15px; display: inline-block; vertical-align: top; margin-top: 2px;"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></svg></span>                            Joined ${CREATED}                        </span></div> <div style="margin: 8px 0px;"><div><span style="width: 15px; height: 15px; display: inline-block; vertical-align: top; margin-top: 2px;"><svg fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><g><path d="M50.2,39.9c-2.3,0-4.1,1.8-4.1,4.1v41.5c0,2.3,1.8,4.1,4.1,4.1c2.3,0,4.1-1.8,4.1-4.1V44C54.3,41.7,52.4,39.9,50.2,39.9z"></path><path d="m30.4,39.9c-2.3,0-4.1,1.8-4.1,4.1v41.5c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-41.5c0-2.3-1.9-4.1-4.1-4.1z"></path><path d="m10.5,105h86.7c2.3,0 4.1-1.8 4.1-4.1v-17.4h17.2c2.3,0 4.1-1.8 4.1-4.1v-30c0-2.3-1.8-4.1-4.1-4.1h-17.2v-17.2c0-2.3-1.8-4.1-4.1-4.1h-86.7c-2.3,0-4.1,1.8-4.1,4.1v72.8c0,2.2 1.9,4.1 4.1,4.1zm90.8-51.5h13.1v21.9h-13.1v-21.9zm-86.7-21.3h78.5v17.2 30 17.4h-78.5v-64.6z"></path></g></g></svg></span>                            Voting Power: ${VOTINGPOWER} %                        </div></div></div></div>',
    user: 'project-exodus',
    reputationPrecision: 1,
    votingPowerPrecision: 1,
    updateInterval: 60
  });
  
 
  
  
  
  
  steemitWidgets.ticker({
    element: 'steemit-widgets-ticker',
    template: ' <div style="color: rgb(120, 120, 120); background: rgb(255, 255, 255);"><div style="display: table; table-layout: fixed; width: 100%; text-align: center; font-size: 18px; line-height: 21px; padding: 10px 0px 5px;"><div style="display: table-cell;"><b>CAP: ${PRICEMOB} BTC</b></div><div style="display: table-cell;"><b>${PRICE_USD} USD</b></div> <div style="display: table-cell;"><b>${PRICE_BTC} BTC</b></div></div> <div style="display: table; table-layout: fixed; width: 100%; text-align: center; font-size: 12px; border-top: 1px solid rgb(221, 221, 221); padding: 5px 0px;"><div style="display: table-cell;">1h: ${PERCENT_CHANGE_1H}</div> <div style="display: table-cell;">24h: ${PERCENT_CHANGE_24H}</div> <div style="display: table-cell;">7d: ${PERCENT_CHANGE_7D}</div></div></div></div>',
    currency: 'steem',
    priceBTCPrecision: 8,
    priceUSDPrecision: 3,
    updateInterval: 60
  });

  
  

   
  

 
  
  


  
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
            "body": document.getElementById("article").value,
            "date_added": new Date().getTime(),
            "slug": slug,
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
			  _this.cmd("wrapperNotification", ["info", "Voto registrato"]);
			 
			  
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
              if ((ref2 = page.slug, indexOf.call(slugs, ref2) < 0) && (ref3 = page.slug, indexOf.call(uniqueOrphans, ref3) < 0) && page.slug !== "errore") {
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
        return "exodus-project";
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

    return ZeroWiki;

  })(ZeroFrame);

  window.Page = new ZeroWiki();

}).call(this);



