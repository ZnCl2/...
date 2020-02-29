

/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/libs/ZeroFrame.coffee ---- */


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


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/libs/marked.min.js ---- */


/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/libs/search.js ---- */





/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/libs/slugger.js ---- */


// replaces all whitespace with '-' and removes
// all non-url friendly characters
(function () {
var whitespace = /\s+/g;

function slugger(string, opts) {
    opts || (opts = {});
    //var allowedCharacters = "\00000\fffffA-Za-z0-9_ -";
    //if (opts.alsoAllow) allowedCharacters = opts.alsoAllow + allowedCharacters;
    //var re = new RegExp('[^' + allowedCharacters + ']', 'g');
    var maintainCase = opts.maintainCase || false;
    var replacement = opts.replacement || '-';
    var smartTrim = opts.smartTrim;
    var decode = (opts.decode !== false);
    var result;
    var lucky;

    if (typeof string !== 'string') return '';
    if (!maintainCase) string = string.toLowerCase();
    if (decode) string = decodeURIComponent(string);
    result = string.trim().replace(whitespace, replacement);//.replace(re, '')
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


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/libs/tag.js ---- */


(function(){
"use strict";
var i, j, abs = Math.abs, sin = Math.sin, cos = Math.cos, max = Math.max,
  min = Math.min, ceil = Math.ceil, sqrt = Math.sqrt, pow = Math.pow,
  hexlookup3 = {}, hexlookup2 = {}, hexlookup1 = {
  0:"0,",   1:"17,",  2:"34,",  3:"51,",  4:"68,",  5:"85,",
  6:"102,", 7:"119,", 8:"136,", 9:"153,", a:"170,", A:"170,",
  b:"187,", B:"187,", c:"204,", C:"204,", d:"221,", D:"221,",
  e:"238,", E:"238,", f:"255,", F:"255,"  
  }, Oproto, Tproto, TCproto, Mproto, Vproto, TSproto, TCVproto,
  doc = document, ocanvas, handlers = {};
for(i = 0; i < 256; ++i) {
  j = i.toString(16);
  if(i < 16)
    j = '0' + j;
  hexlookup2[j] = hexlookup2[j.toUpperCase()] = i.toString() + ',';
}
function Defined(d) {
  return typeof d != 'undefined';
}
function IsObject(o) {
  return typeof o == 'object' && o != null;
}
function Clamp(v, mn, mx) {
  return isNaN(v) ? mx : min(mx, max(mn, v));
}
function Nop() {
  return false;
}
function TimeNow() {
  return new Date().valueOf();
}
function SortList(l, f) {
  var nl = [], tl = l.length, i;
  for(i = 0; i < tl; ++i)
    nl.push(l[i]);
  nl.sort(f);
  return nl;
}
function Shuffle(a) {
  var i = a.length-1, t, p;
  while(i) {
    p = ~~(Math.random()*i);
    t = a[i];
    a[i] = a[p];
    a[p] = t;
    --i;
  }
}
function Vector(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
Vproto = Vector.prototype;
Vproto.length = function() {
  return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
Vproto.dot = function(v) {
  return this.x * v.x + this.y * v.y + this.z * v.z;
};
Vproto.cross = function(v) {
  var x = this.y * v.z - this.z * v.y,
    y = this.z * v.x - this.x * v.z,
    z = this.x * v.y - this.y * v.x;
  return new Vector(x, y, z);
};
Vproto.angle = function(v) {
  var dot = this.dot(v), ac;
  if(dot == 0)
    return Math.PI / 2.0;
  ac = dot / (this.length() * v.length());
  if(ac >= 1)
    return 0;
  if(ac <= -1)
    return Math.PI;
  return Math.acos(ac);
};
Vproto.unit = function() {
  var l = this.length();
  return new Vector(this.x / l, this.y / l, this.z / l);
};
function MakeVector(lg, lt) {
  lt = lt * Math.PI / 180;
  lg = lg * Math.PI / 180;
  var x = sin(lg) * cos(lt), y = -sin(lt), z = -cos(lg) * cos(lt);
  return new Vector(x, y, z);
}
function Matrix(a) {
  this[1] = {1: a[0],  2: a[1],  3: a[2]};
  this[2] = {1: a[3],  2: a[4],  3: a[5]};
  this[3] = {1: a[6],  2: a[7],  3: a[8]};
}
Mproto = Matrix.prototype;
Matrix.Identity = function() {
  return new Matrix([1,0,0, 0,1,0, 0,0,1]);
};
Matrix.Rotation = function(angle, u) {
  var sina = sin(angle), cosa = cos(angle), mcos = 1 - cosa;
  return new Matrix([
    cosa + pow(u.x, 2) * mcos, u.x * u.y * mcos - u.z * sina, u.x * u.z * mcos + u.y * sina,
    u.y * u.x * mcos + u.z * sina, cosa + pow(u.y, 2) * mcos, u.y * u.z * mcos - u.x * sina,
    u.z * u.x * mcos - u.y * sina, u.z * u.y * mcos + u.x * sina, cosa + pow(u.z, 2) * mcos
  ]);
}
Mproto.mul = function(m) {
  var a = [], i, j, mmatrix = (m.xform ? 1 : 0);
  for(i = 1; i <= 3; ++i)
    for(j = 1; j <= 3; ++j) {
      if(mmatrix)
        a.push(this[i][1] * m[1][j] +
          this[i][2] * m[2][j] +
          this[i][3] * m[3][j]);
      else
        a.push(this[i][j] * m);
    }
  return new Matrix(a);
};
Mproto.xform = function(p) {
  var a = {}, x = p.x, y = p.y, z = p.z;
  a.x = x * this[1][1] + y * this[2][1] + z * this[3][1];
  a.y = x * this[1][2] + y * this[2][2] + z * this[3][2];
  a.z = x * this[1][3] + y * this[2][3] + z * this[3][3];
  return a;
};
function PointsOnSphere(n,xr,yr,zr) {
  var i, y, r, phi, pts = [], inc = Math.PI * (3-sqrt(5)), off = 2/n;
  for(i = 0; i < n; ++i) {
    y = i * off - 1 + (off / 2);
    r = sqrt(1 - y*y);
    phi = i * inc;
    pts.push([cos(phi) * r * xr, y * yr, sin(phi) * r * zr]);
  }
  return pts;
}
function Cylinder(n,o,xr,yr,zr) {
  var phi, pts = [], inc = Math.PI * (3-sqrt(5)), off = 2/n, i, j, k, l;
  for(i = 0; i < n; ++i) {
    j = i * off - 1 + (off / 2);
    phi = i * inc;
    k = cos(phi);
    l = sin(phi);
    pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
  }
  return pts;
}
function Ring(o, n, xr, yr, zr, j) {
  var phi, pts = [], inc = Math.PI * 2 / n, i, k, l;
  for(i = 0; i < n; ++i) {
    phi = i * inc;
    k = cos(phi);
    l = sin(phi);
    pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
  }
  return pts;
}
function PointsOnCylinderV(n,xr,yr,zr) { return Cylinder(n, 0, xr, yr, zr) }
function PointsOnCylinderH(n,xr,yr,zr) { return Cylinder(n, 1, xr, yr, zr) }
function PointsOnRingV(n, xr, yr, zr, offset) {
  offset = isNaN(offset) ? 0 : offset * 1;
  return Ring(0, n, xr, yr, zr, offset);
}
function PointsOnRingH(n, xr, yr, zr, offset) {
  offset = isNaN(offset) ? 0 : offset * 1;
  return Ring(1, n, xr, yr, zr, offset);
}
function CentreImage(t) {
  var i = new Image;
  i.onload = function() {
    var dx = i.width / 2, dy = i.height / 2;
    t.centreFunc = function(c, w, h, cx, cy) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalAlpha = 1;
      c.drawImage(i, cx - dx, cy - dy);
    };
  };
  i.src = t.centreImage;
}
function SetAlpha(c,a) {
  var d = c, p1, p2, ae = (a*1).toPrecision(3) + ')';
  if(c[0] === '#') {
    if(!hexlookup3[c])
      if(c.length === 4)
        hexlookup3[c] = 'rgba(' + hexlookup1[c[1]] + hexlookup1[c[2]] + hexlookup1[c[3]];
      else
        hexlookup3[c] = 'rgba(' + hexlookup2[c.substr(1,2)] + hexlookup2[c.substr(3,2)] + hexlookup2[c.substr(5,2)];
    d = hexlookup3[c] + ae;
  } else if(c.substr(0,4) === 'rgb(' || c.substr(0,4) === 'hsl(') {
    d = (c.replace('(','a(').replace(')', ',' + ae));
  } else if(c.substr(0,5) === 'rgba(' || c.substr(0,5) === 'hsla(') {
    p1 = c.lastIndexOf(',') + 1, p2 = c.indexOf(')');
    a *= parseFloat(c.substring(p1,p2));
    d = c.substr(0,p1) + a.toPrecision(3) + ')';
  }
  return d;
}
function NewCanvas(w,h) {
  // if using excanvas, give up now
  if(window.G_vmlCanvasManager)
    return null;
  var c = doc.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}
// I think all browsers pass this test now...
function ShadowAlphaBroken() {
  var cv = NewCanvas(3,3), c, i;
  if(!cv)
    return false;
  c = cv.getContext('2d');
  c.strokeStyle = '#000';
  c.shadowColor = '#fff';
  c.shadowBlur = 3;
  c.globalAlpha = 0;
  c.strokeRect(2,2,2,2);
  c.globalAlpha = 1;
  i = c.getImageData(2,2,1,1);
  cv = null;
  return (i.data[0] > 0);
}
function SetGradient(c, l, o, g) {
  var gd = c.createLinearGradient(0, 0, l, 0), i;
  for(i in g)
    gd.addColorStop(1 - i, g[i]);
  c.fillStyle = gd;
  c.fillRect(0, o, l, 1);
}
function FindGradientColour(tc, p, r) {
  var l = 1024, h = 1, gl = tc.weightGradient, cv, c, i, d;
  if(tc.gCanvas) {
    c = tc.gCanvas.getContext('2d');
    h = tc.gCanvas.height;
  } else {
    if(IsObject(gl[0]))
      h = gl.length;
    else
      gl = [gl];
    tc.gCanvas = cv = NewCanvas(l, h);
    if(!cv)
      return null;
    c = cv.getContext('2d');
    for(i = 0; i < h; ++i)
      SetGradient(c, l, i, gl[i]);
  }
  r = max(min(r || 0, h - 1), 0);
  d = c.getImageData(~~((l - 1) * p), r, 1, 1).data;
  return 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3]/255) + ')';
}
function TextSet(ctxt, font, colour, strings, padx, pady, shadowColour,
  shadowBlur, shadowOffsets, maxWidth, widths, align) {
  var xo = padx + (shadowBlur || 0) + 
    (shadowOffsets.length && shadowOffsets[0] < 0 ? abs(shadowOffsets[0]) : 0),
    yo = pady + (shadowBlur || 0) + 
    (shadowOffsets.length && shadowOffsets[1] < 0 ? abs(shadowOffsets[1]) : 0), i, xc;
  ctxt.font = font;
  ctxt.textBaseline = 'top';
  ctxt.fillStyle = colour;
  shadowColour && (ctxt.shadowColor = shadowColour);
  shadowBlur && (ctxt.shadowBlur = shadowBlur);
  shadowOffsets.length && (ctxt.shadowOffsetX = shadowOffsets[0],
    ctxt.shadowOffsetY = shadowOffsets[1]);
  for(i = 0; i < strings.length; ++i) {
    xc = 0;
    if(widths) {
      if('right' == align) {
        xc = maxWidth - widths[i];
      } else if('centre' == align) {
        xc = (maxWidth - widths[i]) / 2;
      }
    }
    ctxt.fillText(strings[i], xo + xc, yo);
    yo += parseInt(font);
  }
}
function RRect(c, x, y, w, h, r, s) {
  if(r) {
    c.beginPath();
    c.moveTo(x, y + h - r);
    c.arcTo(x, y, x + r, y, r);
    c.arcTo(x + w, y, x + w, y + r, r);
    c.arcTo(x + w, y + h, x + w - r, y + h, r);
    c.arcTo(x, y + h, x, y + h - r, r);
    c.closePath();
    c[s ? 'stroke' : 'fill']();
  } else {
    c[s ? 'strokeRect' : 'fillRect'](x, y, w, h);
  }
}
function TextCanvas(strings, font, w, h, maxWidth, stringWidths, align, valign,
  scale) {
  this.strings = strings;
  this.font = font;
  this.width = w;
  this.height = h;
  this.maxWidth = maxWidth;
  this.stringWidths = stringWidths;
  this.align = align;
  this.valign = valign;
  this.scale = scale;
}
TCVproto = TextCanvas.prototype;
TCVproto.SetImage = function(image, w, h, position, padding, align, valign,
  scale) {
  this.image = image;
  this.iwidth = w * this.scale;
  this.iheight = h * this.scale;
  this.ipos = position;
  this.ipad = padding * this.scale;
  this.iscale = scale;
  this.ialign = align;
  this.ivalign = valign;
};
TCVproto.Align = function(size, space, a) {
  var pos = 0;
  if(a == 'right' || a == 'bottom')
    pos = space - size;
  else if(a != 'left' && a != 'top')
    pos = (space - size) / 2;
  return pos;
};
TCVproto.Create = function(colour, bgColour, bgOutline, bgOutlineThickness,
  shadowColour, shadowBlur, shadowOffsets, padding, radius) {
  var cv, cw, ch, c, x1, x2, y1, y2, offx, offy, ix, iy, iw, ih, rr,
    sox = abs(shadowOffsets[0]), soy = abs(shadowOffsets[1]), shadowcv, shadowc;
  padding = max(padding, sox + shadowBlur, soy + shadowBlur);
  x1 = 2 * (padding + bgOutlineThickness);
  y1 = 2 * (padding + bgOutlineThickness);
  cw = this.width + x1;
  ch = this.height + y1;
  offx = offy = padding + bgOutlineThickness;

  if(this.image) {
    ix = iy = padding + bgOutlineThickness;
    iw = this.iwidth;
    ih = this.iheight;
    if(this.ipos == 'top' || this.ipos == 'bottom') {
      if(iw < this.width)
        ix += this.Align(iw, this.width, this.ialign);
      else
        offx += this.Align(this.width, iw, this.align);
      if(this.ipos == 'top')
        offy += ih + this.ipad;
      else
        iy += this.height + this.ipad;
      cw = max(cw, iw + x1);
      ch += ih + this.ipad;
    } else {
      if(ih < this.height)
        iy += this.Align(ih, this.height, this.ivalign);
      else
        offy += this.Align(this.height, ih, this.valign);
      if(this.ipos == 'right')
        ix += this.width + this.ipad;
      else
        offx += iw + this.ipad;
      cw += iw + this.ipad;
      ch = max(ch, ih + y1);
    }
  }

  cv = NewCanvas(cw, ch);
  if(!cv)
    return null;
  x1 = y1 = bgOutlineThickness / 2;
  x2 = cw - bgOutlineThickness;
  y2 = ch - bgOutlineThickness;
  rr = min(radius, x2 / 2, y2 / 2);
  c = cv.getContext('2d');
  if(bgColour) {
    c.fillStyle = bgColour;
    RRect(c, x1, y1, x2, y2, rr);
  }
  if(bgOutlineThickness) {
    c.strokeStyle = bgOutline;
    c.lineWidth = bgOutlineThickness;
    RRect(c, x1, y1, x2, y2, rr, true);
  }
  if(shadowBlur || sox || soy) {
    // use a transparent canvas to draw on
    shadowcv = NewCanvas(cw, ch);
    if(shadowcv) {
      shadowc = c;
      c = shadowcv.getContext('2d');
    }
  }

  // don't use TextSet shadow support because it adds space for shadow
  TextSet(c, this.font, colour, this.strings, offx, offy, 0, 0, [],
    this.maxWidth, this.stringWidths, this.align);
      
  if(this.image)
    c.drawImage(this.image, ix, iy, iw, ih);

  if(shadowc) {
    // draw the text and image with the added shadow
    c = shadowc;
    shadowColour && (c.shadowColor = shadowColour);
    shadowBlur && (c.shadowBlur = shadowBlur);
    c.shadowOffsetX = shadowOffsets[0];
    c.shadowOffsetY = shadowOffsets[1];
    c.drawImage(shadowcv, 0, 0);
  }
  return cv;
};
function ExpandImage(i, w, h) {
  var cv = NewCanvas(w, h), c;
  if(!cv)
    return null;
  c = cv.getContext('2d');
  c.drawImage(i, (w - i.width) / 2, (h - i.height) / 2);
  return cv;
}
function ScaleImage(i, w, h) {
  var cv = NewCanvas(w, h), c;
  if(!cv)
    return null;
  c = cv.getContext('2d');
  c.drawImage(i, 0, 0, w, h);
  return cv;
}
function AddBackgroundToImage(i, w, h, scale, colour, othickness, ocolour,
  padding, radius, ofill) {
  var cw = w + ((2 * padding) + othickness) * scale,
    ch = h + ((2 * padding) + othickness) * scale,
    cv = NewCanvas(cw, ch), c, x1, y1, x2, y2, ocanvas, cc, rr;
  if(!cv)
    return null;
  othickness *= scale;
  radius *= scale;
  x1 = y1 = othickness / 2;
  x2 = cw - othickness;
  y2 = ch - othickness;
  padding = (padding * scale) + x1; // add space for outline
  c = cv.getContext('2d');
  rr = min(radius, x2 / 2, y2 / 2);
  if(colour) {
    c.fillStyle = colour;
    RRect(c, x1, y1, x2, y2, rr);
  }
  if(othickness) {
    c.strokeStyle = ocolour;
    c.lineWidth = othickness;
    RRect(c, x1, y1, x2, y2, rr, true);
  }
  
  if(ofill) {
    // use compositing to colour in the image and border
    ocanvas = NewCanvas(cw, ch);
    cc = ocanvas.getContext('2d');
    cc.drawImage(i, padding, padding, w, h);
    cc.globalCompositeOperation = 'source-in';
    cc.fillStyle = ocolour;
    cc.fillRect(0, 0, cw, ch);
    cc.globalCompositeOperation = 'destination-over';
    cc.drawImage(cv, 0, 0);
    cc.globalCompositeOperation = 'source-over';
    c.drawImage(ocanvas, 0, 0);
  } else {
    c.drawImage(i, padding, padding, i.width, i.height);
  }
  return {image: cv, width: cw / scale, height: ch / scale};
}
/**
 * Rounds off the corners of an image
 */
function RoundImage(i, r, iw, ih, s) {
  var cv, c, r1 = parseFloat(r), l = max(iw, ih);
  cv = NewCanvas(iw, ih);
  if(!cv)
    return null;
  if(r.indexOf('%') > 0)
    r1 = l * r1 / 100;
  else
    r1 = r1 * s;
  c = cv.getContext('2d');
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#fff';
  if(r1 >= l/2) {
    r1 = min(iw,ih) / 2;
    c.beginPath();
    c.moveTo(iw/2,ih/2);
    c.arc(iw/2,ih/2,r1,0,2*Math.PI,false);
    c.fill();
    c.closePath();
  } else {
    r1 = min(iw/2,ih/2,r1);
    RRect(c, 0, 0, iw, ih, r1, true);
    c.fill();
  }
  c.globalCompositeOperation = 'source-in';
  c.drawImage(i, 0, 0, iw, ih);
  return cv;
}
/**
 * Creates a new canvas containing the image and its shadow
 * Returns an object containing the image and its dimensions at z=0
 */
function AddShadowToImage(i, w, h, scale, sc, sb, so) {
  var sw = abs(so[0]), sh = abs(so[1]), 
    cw = w + (sw > sb ? sw + sb : sb * 2) * scale,
    ch = h + (sh > sb ? sh + sb : sb * 2) * scale,
    xo = scale * ((sb || 0) + (so[0] < 0 ? sw : 0)),
    yo = scale * ((sb || 0) + (so[1] < 0 ? sh : 0)), cv, c;
  cv = NewCanvas(cw, ch);
  if(!cv)
    return null;
  c = cv.getContext('2d');
  sc && (c.shadowColor = sc);
  sb && (c.shadowBlur = sb * scale);
  so && (c.shadowOffsetX = so[0] * scale, c.shadowOffsetY = so[1] * scale);
  c.drawImage(i, xo, yo, w, h);
  return {image: cv, width: cw / scale, height: ch / scale};
}
function FindTextBoundingBox(s,f,ht) {
  var w = parseInt(s.toString().length * ht), h = parseInt(ht * 2 * s.length),
    cv = NewCanvas(w,h), c, idata, w1, h1, x, y, i, ex;
  if(!cv)
    return null;
  c = cv.getContext('2d');
  c.fillStyle = '#000';
  c.fillRect(0,0,w,h);
  TextSet(c,ht + 'px ' + f,'#fff',s,0,0,0,0,[],'centre')

  idata = c.getImageData(0,0,w,h);
  w1 = idata.width; h1 = idata.height;
  ex = {
    min: { x: w1, y: h1 },
    max: { x: -1, y: -1 }
  };
  for(y = 0; y < h1; ++y) {
    for(x = 0; x < w1; ++x) {
      i = (y * w1 + x) * 4;
      if(idata.data[i+1] > 0) {
        if(x < ex.min.x) ex.min.x = x;
        if(x > ex.max.x) ex.max.x = x;
        if(y < ex.min.y) ex.min.y = y;
        if(y > ex.max.y) ex.max.y = y;
      }
    }
  }
  // device pixels might not be css pixels
  if(w1 != w) {
    ex.min.x *= (w / w1);
    ex.max.x *= (w / w1);
  }
  if(h1 != h) {
    ex.min.y *= (w / h1);
    ex.max.y *= (w / h1);
  }

  cv = null;
  return ex;
}
function FixFont(f) {
  return "'" + f.replace(/(\'|\")/g,'').replace(/\s*,\s*/g, "', '") + "'";
}
function AddHandler(h,f,e) {
  e = e || doc;
  if(e.addEventListener)
    e.addEventListener(h,f,false);
  else
    e.attachEvent('on' + h, f);
}
function RemoveHandler(h,f,e) {
  e = e || doc;
  if(e.removeEventListener)
    e.removeEventListener(h, f);
  else
    e.detachEvent('on' + h, f);
}
function AddImage(i, o, t, tc) {
  var s = tc.imageScale, mscale, ic, bc, oc, iw, ih;
  // image not loaded, wait for image onload
  if(!o.complete)
    return AddHandler('load',function() { AddImage(i,o,t,tc); }, o);
  if(!i.complete)
    return AddHandler('load',function() { AddImage(i,o,t,tc); }, i);

  // Yes, this does look like nonsense, but it makes sure that both the
  // width and height are actually set and not just calculated. This is
  // required to keep proportional sizes when the images are hidden, so
  // the images can be used again for another cloud.
  o.width = o.width;
  o.height = o.height;

  if(s) {
    i.width = o.width * s;
    i.height = o.height * s;
  }
  // the standard width of the image, with imageScale applied
  t.iw = i.width;
  t.ih = i.height;
  if(tc.txtOpt) {
    ic = i;
    mscale = tc.zoomMax * tc.txtScale;
    iw = t.iw * mscale;
    ih = t.ih * mscale;
    if(iw < o.naturalWidth || ih < o.naturalHeight) {
      ic = ScaleImage(i, iw, ih);
      if(ic)
        t.fimage = ic;
    } else {
      iw = t.iw;
      ih = t.ih;
      mscale = 1;
    }
    if(parseFloat(tc.imageRadius))
      t.image = t.fimage = i = RoundImage(t.image, tc.imageRadius, iw, ih, mscale);
    if(!t.HasText()) {
      if(tc.shadow) {
        ic = AddShadowToImage(t.image, iw, ih, mscale, tc.shadow, tc.shadowBlur,
          tc.shadowOffset);
        if(ic) {
          t.fimage = ic.image;
          t.w = ic.width;
          t.h = ic.height;
        }
      }
      if(tc.bgColour || tc.bgOutlineThickness) {
        bc = tc.bgColour == 'tag' ? GetProperty(t.a, 'background-color') :
          tc.bgColour;
        oc = tc.bgOutline == 'tag' ? GetProperty(t.a, 'color') : 
          (tc.bgOutline || tc.textColour);
        iw = t.fimage.width;
        ih = t.fimage.height;
        if(tc.outlineMethod == 'colour') {
          // create the outline version first, using the current image state
          ic = AddBackgroundToImage(t.fimage, iw, ih, mscale, bc,
            tc.bgOutlineThickness, tc.outlineColour, tc.padding, tc.bgRadius, 1);
          if(ic)
            t.oimage = ic.image;
        }
        ic = AddBackgroundToImage(t.fimage, iw, ih, mscale, bc, 
          tc.bgOutlineThickness, oc, tc.padding, tc.bgRadius);
        if(ic) {
          t.fimage = ic.image;
          t.w = ic.width;
          t.h = ic.height;
        }
      }
      if(tc.outlineMethod == 'size') {
        if(tc.outlineIncrease > 0) {
          t.iw += 2 * tc.outlineIncrease;
          t.ih += 2 * tc.outlineIncrease;
          iw = mscale * t.iw;
          ih = mscale * t.ih;
          ic = ScaleImage(t.fimage, iw, ih);
          t.oimage = ic;
          t.fimage = ExpandImage(t.fimage, t.oimage.width, t.oimage.height);
        } else {
          iw = mscale * (t.iw + (2 * tc.outlineIncrease));
          ih = mscale * (t.ih + (2 * tc.outlineIncrease));
          ic = ScaleImage(t.fimage, iw, ih);
          t.oimage = ExpandImage(ic, t.fimage.width, t.fimage.height);
        }
      }
    }
  }
  t.Init();
}
function GetProperty(e,p) {
  var dv = doc.defaultView, pc = p.replace(/\-([a-z])/g,function(a){return a.charAt(1).toUpperCase()});
  return (dv && dv.getComputedStyle && dv.getComputedStyle(e,null).getPropertyValue(p)) ||
    (e.currentStyle && e.currentStyle[pc]);
}
function FindWeight(a, wFrom, tHeight) {
  var w = 1, p;
  if(wFrom) {
    w = 1 * (a.getAttribute(wFrom) || tHeight);
  } else if(p = GetProperty(a,'font-size')) {
    w = (p.indexOf('px') > -1 && p.replace('px','') * 1) ||
      (p.indexOf('pt') > -1 && p.replace('pt','') * 1.25) ||
      p * 3.3;
  }
  return w;
}
function EventToCanvasId(e) {
  return e.target && Defined(e.target.id) ? e.target.id :
    e.srcElement.parentNode.id;
}
function EventXY(e, c) {
  var xy, p, xmul = parseInt(GetProperty(c, 'width')) / c.width,
    ymul = parseInt(GetProperty(c, 'height')) / c.height;
  if(Defined(e.offsetX)) {
    xy = {x: e.offsetX, y: e.offsetY};
  } else {
    p = AbsPos(c.id);
    if(Defined(e.changedTouches))
      e = e.changedTouches[0];
    if(e.pageX)
      xy = {x: e.pageX - p.x, y: e.pageY - p.y};
  }
  if(xy && xmul && ymul) {
    xy.x /= xmul;
    xy.y /= ymul;
  }
  return xy;
}
function MouseOut(e) {
  var cv = e.target || e.fromElement.parentNode, tc = TagCanvas.tc[cv.id];
  if(tc) {
   tc.mx = tc.my = -1;
   tc.UnFreeze();
   tc.EndDrag();
  }
}
function MouseMove(e) {
  var i, t = TagCanvas, tc, p, tg = EventToCanvasId(e);
  for(i in t.tc) {
    tc = t.tc[i];
    if(tc.tttimer) {
      clearTimeout(tc.tttimer);
      tc.tttimer = null;
    }
  }
  if(tg && t.tc[tg]) {
    tc = t.tc[tg];
    if(p = EventXY(e, tc.canvas)) {
      tc.mx = p.x;
      tc.my = p.y;
      tc.Drag(e, p);
    }
    tc.drawn = 0;
  }
}
function MouseDown(e) {
  var t = TagCanvas, cb = doc.addEventListener ? 0 : 1,
    tg = EventToCanvasId(e);
  if(tg && e.button == cb && t.tc[tg]) {
    t.tc[tg].BeginDrag(e);
  }
}
function MouseUp(e) {
  var t = TagCanvas, cb = doc.addEventListener ? 0 : 1,
    tg = EventToCanvasId(e), tc;
  if(tg && e.button == cb && t.tc[tg]) {
    tc = t.tc[tg];
    MouseMove(e);
    if(!tc.EndDrag() && !tc.touchState)
      tc.Clicked(e);
  }
}
function TouchDown(e) {
  var tg = EventToCanvasId(e), tc = (tg && TagCanvas.tc[tg]), p;
  if(tc && e.changedTouches) {
    if(e.touches.length == 1 && tc.touchState == 0) {
      tc.touchState = 1;
      tc.BeginDrag(e);
      if(p = EventXY(e, tc.canvas)) {
        tc.mx = p.x;
        tc.my = p.y;
        tc.drawn = 0;
      }
    } else if(e.targetTouches.length == 2 && tc.pinchZoom) {
      tc.touchState = 3;
      tc.EndDrag();
      tc.BeginPinch(e);
    } else {
      tc.EndDrag();
      tc.EndPinch();
      tc.touchState = 0;
    }
  }
}
function TouchUp(e) {
  var tg = EventToCanvasId(e), tc = (tg && TagCanvas.tc[tg]);
  if(tc && e.changedTouches) {
    switch(tc.touchState) {
    case 1:
      tc.Draw();
      tc.Clicked();
      break;
    case 2:
      tc.EndDrag();
      break;
    case 3:
      tc.EndPinch();
    }
    tc.touchState = 0;
  }
}
function TouchMove(e) {
  var i, t = TagCanvas, tc, p, tg = EventToCanvasId(e);
  for(i in t.tc) {
    tc = t.tc[i];
    if(tc.tttimer) {
      clearTimeout(tc.tttimer);
      tc.tttimer = null;
    }
  }
  tc = (tg && t.tc[tg]);
  if(tc && e.changedTouches && tc.touchState) {
    switch(tc.touchState) {
    case 1:
    case 2:
      if(p = EventXY(e, tc.canvas)) {
        tc.mx = p.x;
        tc.my = p.y;
        if(tc.Drag(e, p))
          tc.touchState = 2;
      }
      break;
    case 3:
      tc.Pinch(e);
    }
    tc.drawn = 0;
  }
}
function MouseWheel(e) {
  var t = TagCanvas, tg = EventToCanvasId(e);
  if(tg && t.tc[tg]) {
    e.cancelBubble = true;
    e.returnValue = false;
    e.preventDefault && e.preventDefault();
    t.tc[tg].Wheel((e.wheelDelta || e.detail) > 0);
  }
}
function Scroll(e) {
  var i, t = TagCanvas;
  clearTimeout(t.scrollTimer);
  for(i in t.tc) {
    t.tc[i].Pause();
  }
  t.scrollTimer = setTimeout(function() {
    var i, t = TagCanvas;
    for(i in t.tc) {
      t.tc[i].Resume();
    }
  }, t.scrollPause);
}
function DrawCanvas() {
  DrawCanvasRAF(TimeNow());
}
function DrawCanvasRAF(t) {
  var tc = TagCanvas.tc, i;
  TagCanvas.NextFrame(TagCanvas.interval);
  t = t || TimeNow();
  for(i in tc)
    tc[i].Draw(t);
}
function AbsPos(id) {
  var e = doc.getElementById(id), r = e.getBoundingClientRect(),
    dd = doc.documentElement, b = doc.body, w = window,
    xs = w.pageXOffset || dd.scrollLeft,
    ys = w.pageYOffset || dd.scrollTop,
    xo = dd.clientLeft || b.clientLeft,
    yo = dd.clientTop || b.clientTop;
  return { x: r.left + xs - xo, y: r.top + ys - yo };
}
function Project(tc,p1,sx,sy) {
  var m = tc.radius * tc.z1 / (tc.z1 + tc.z2 + p1.z);
  return {
    x: p1.x * m * sx,
    y: p1.y * m * sy,
    z: p1.z,
    w: (tc.z1 - p1.z) / tc.z2
  };
}
/**
 * @constructor
 * for recursively splitting tag contents on <br> tags
 */
function TextSplitter(e) {
  this.e = e;
  this.br = 0;
  this.line = [];
  this.text = [];
  this.original = e.innerText || e.textContent;
}
TSproto = TextSplitter.prototype;
TSproto.Empty = function() {
  for(var i = 0; i < this.text.length; ++i)
    if(this.text[i].length)
      return false;
  return true;
};
TSproto.Lines = function(e) {
  var r = e ? 1 : 0, cn, cl, i;
  e = e || this.e;
  cn = e.childNodes;
  cl = cn.length;

  for(i = 0; i < cl; ++i) {
    if(cn[i].nodeName == 'BR') {
      this.text.push(this.line.join(' '));
      this.br = 1;
    } else if(cn[i].nodeType == 3) {
      if(this.br) {
        this.line = [cn[i].nodeValue];
        this.br = 0;
      } else {
        this.line.push(cn[i].nodeValue);
      }
    } else {
      this.Lines(cn[i]);
    }
  }
  r || this.br || this.text.push(this.line.join(' '));
  return this.text;
};
TSproto.SplitWidth = function(w, c, f, h) {
  var i, j, words, text = [];
  c.font = h + 'px ' + f;
  for(i = 0; i < this.text.length; ++i) {
    words = this.text[i].split(/\s+/);
    this.line = [words[0]];
    for(j = 1; j < words.length; ++j) {
      if(c.measureText(this.line.join(' ') + ' ' + words[j]).width > w) {
        text.push(this.line.join(' '));
        this.line = [words[j]];
      } else {
        this.line.push(words[j]);
      }
    }
    text.push(this.line.join(' '));
  }
  return this.text = text;
};
/**
 * @constructor
 */
function Outline(tc,t) {
  this.ts = TimeNow();
  this.tc = tc;
  this.tag = t;
  this.x = this.y = this.w = this.h = this.sc = 1;
  this.z = 0;
  this.Draw = tc.pulsateTo < 1 && tc.outlineMethod != 'colour' ? 
    this.DrawPulsate : this.DrawSimple;
  this.radius = tc.outlineRadius | 0;
  this.SetMethod(tc.outlineMethod);
}
Oproto = Outline.prototype;
Oproto.SetMethod = function(om) {
  var methods = {
    block: ['PreDraw','DrawBlock'],
    colour: ['PreDraw','DrawColour'],
    outline: ['PostDraw','DrawOutline'],
    classic: ['LastDraw','DrawOutline'],
    size: ['PreDraw','DrawColour'],
    none: ['LastDraw']
  }, funcs = methods[om] || methods.outline;
  if(om == 'none') {
    this.Draw = function() { return 1; }
  } else {
    this.drawFunc = this[funcs[1]];
  }
  this[funcs[0]] = this.Draw;
};
Oproto.Update = function(x,y,w,h,sc,z,xo,yo) {
  var o = this.tc.outlineOffset, o2 = 2 * o;
  this.x = sc * x + xo - o;
  this.y = sc * y + yo - o;
  this.w = sc * w + o2;
  this.h = sc * h + o2;
  this.sc = sc; // used to determine frontmost
  this.z = z;
};
Oproto.DrawOutline = function(c,x,y,w,h,colour) {
  var r = min(this.radius, h/2, w/2);
  c.strokeStyle = colour;
  RRect(c, x, y, w, h, r, true);
};
Oproto.DrawColour = function(c,x,y,w,h,colour,tag,x1,y1) {
  if(tag.oimage) {
    tag.alpha = 1;
    tag.Draw(c, x1, y1, tag.oimage);
    return 1;
  }
  return this[tag.image ? 'DrawColourImage' : 'DrawColourText'](c,x,y,w,h,colour,tag,x1,y1);
};
Oproto.DrawColourText = function(c,x,y,w,h,colour,tag,x1,y1) {
  var normal = tag.colour;
  tag.colour = colour;
  tag.alpha = 1;
  tag.Draw(c,x1,y1);
  tag.colour = normal;
  return 1;
};
Oproto.DrawColourImage = function(c,x,y,w,h,colour,tag,x1,y1) {
  var ccanvas = c.canvas, fx = ~~max(x,0), fy = ~~max(y,0), 
    fw = min(ccanvas.width - fx, w) + .5|0, fh = min(ccanvas.height - fy,h) + .5|0, cc;
  if(ocanvas)
    ocanvas.width = fw, ocanvas.height = fh;
  else
    ocanvas = NewCanvas(fw, fh);
  if(!ocanvas)
    return this.SetMethod('outline'); // if using IE and images, give up!
  cc = ocanvas.getContext('2d');

  cc.drawImage(ccanvas,fx,fy,fw,fh,0,0,fw,fh);
  c.clearRect(fx,fy,fw,fh);
  tag.alpha = 1;
  tag.Draw(c,x1,y1);
  c.setTransform(1,0,0,1,0,0);
  c.save();
  c.beginPath();
  c.rect(fx,fy,fw,fh);
  c.clip();
  c.globalCompositeOperation = 'source-in';
  c.fillStyle = colour;
  c.fillRect(fx,fy,fw,fh);
  c.restore();
  c.globalCompositeOperation = 'destination-over';
  c.drawImage(ocanvas,0,0,fw,fh,fx,fy,fw,fh);
  c.globalCompositeOperation = 'source-over';
  return 1;
};
Oproto.DrawBlock = function(c,x,y,w,h,colour) {
  var r = min(this.radius, h/2, w/2);
  c.fillStyle = colour;
  RRect(c, x, y, w, h, r);
};
Oproto.DrawSimple = function(c, tag, x1, y1) {
  var t = this.tc;
  c.setTransform(1,0,0,1,0,0);
  c.strokeStyle = t.outlineColour;
  c.lineWidth = t.outlineThickness;
  c.shadowBlur = c.shadowOffsetX = c.shadowOffsetY = 0;
  c.globalAlpha = 1;
  return this.drawFunc(c,this.x,this.y,this.w,this.h,t.outlineColour,tag,x1,y1);
};
Oproto.DrawPulsate = function(c, tag, x1, y1) {
  var diff = TimeNow() - this.ts, t = this.tc;
  c.setTransform(1,0,0,1,0,0);
  c.strokeStyle = t.outlineColour;
  c.lineWidth = t.outlineThickness;
  c.shadowBlur = c.shadowOffsetX = c.shadowOffsetY = 0;
  c.globalAlpha = t.pulsateTo + ((1 - t.pulsateTo) * 
    (0.5 + (cos(2 * Math.PI * diff / (1000 * t.pulsateTime)) / 2)));
  return this.drawFunc(c,this.x,this.y,this.w,this.h,t.outlineColour,tag,x1,y1);
};
Oproto.Active = function(c,x,y) {
  return (x >= this.x && y >= this.y &&
    x <= this.x + this.w && y <= this.y + this.h);
};
Oproto.PreDraw = Oproto.PostDraw = Oproto.LastDraw = Nop;
/**
 * @constructor
 */
function Tag(tc, text, a, v, w, h, col, bcol, bradius, boutline, bothickness,
  font, padding, original) {
  this.tc = tc;
  this.image = null;
  this.text = text;
  this.text_original = original;
  this.line_widths = [];
  this.title = a.title || null;
  this.a = a;
  this.position = new Vector(v[0], v[1], v[2]);
  this.x = this.y = this.z = 0;
  this.w = w;
  this.h = h;
  this.colour = col || tc.textColour;
  this.bgColour = bcol || tc.bgColour;
  this.bgRadius = bradius | 0;
  this.bgOutline = boutline || this.colour;
  this.bgOutlineThickness = bothickness | 0;
  this.textFont = font || tc.textFont;
  this.padding = padding | 0;
  this.sc = this.alpha = 1;
  this.weighted = !tc.weight;
}
Tproto = Tag.prototype;
Tproto.Init = function(e) {
  var tc = this.tc;
  this.outline = new Outline(tc,this);
  this.textHeight = tc.textHeight;
  if(this.HasText()) {
    this.Measure(tc.ctxt,tc);
  } else {
    this.w = this.iw;
    this.h = this.ih;
  }

  this.SetShadowColour = tc.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
  this.SetDraw(tc);
};
Tproto.Draw = Nop;
Tproto.HasText = function() {
  return this.text && this.text[0].length > 0;
};
Tproto.EqualTo = function(e) {
  var i = e.getElementsByTagName('img');
  if(this.a.href != e.href)
    return 0;
  if(i.length)
    return this.image.src == i[0].src;
  return (e.innerText || e.textContent) == this.text_original;
};
Tproto.SetImage = function(i) {
  this.image = this.fimage = i;
};
Tproto.SetDraw = function(t) {
  this.Draw = this.fimage ? (t.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
  t.noSelect && (this.CheckActive = Nop);
};
Tproto.MeasureText = function(c) {
  var i, l = this.text.length, w = 0, wl;
  for(i = 0; i < l; ++i) {
    this.line_widths[i] = wl = c.measureText(this.text[i]).width;
    w = max(w, wl);
  }
  return w;
};
Tproto.Measure = function(c,t) {
  var extents = FindTextBoundingBox(this.text, this.textFont, this.textHeight),
    s, th, f, soff, cw, twidth, theight, img, tcv;
  // add the gap at the top to the height to make equal gap at bottom
  theight = extents ? extents.max.y + extents.min.y : this.textHeight;
  c.font = this.font = this.textHeight + 'px ' + this.textFont;
  twidth = this.MeasureText(c);
  if(t.txtOpt) {
    s = t.txtScale;
    th = s * this.textHeight;
    f = th + 'px ' + this.textFont;
    soff = [s * t.shadowOffset[0], s * t.shadowOffset[1]];
    c.font = f;
    cw = this.MeasureText(c);
    tcv = new TextCanvas(this.text, f, cw + s, (s * theight) + s, cw,
      this.line_widths, t.textAlign, t.textVAlign, s);

    if(this.image)
      tcv.SetImage(this.image, this.iw, this.ih, t.imagePosition, t.imagePadding,
        t.imageAlign, t.imageVAlign, t.imageScale);

    img = tcv.Create(this.colour, this.bgColour, this.bgOutline,
      s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
      s * this.padding, s * this.bgRadius);

    // add outline image using highlight colour
    if(t.outlineMethod == 'colour') {
      this.oimage = tcv.Create(t.outlineColour, this.bgColour, t.outlineColour,
        s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
        s * this.padding, s * this.bgRadius);

    } else if(t.outlineMethod == 'size') {
      extents = FindTextBoundingBox(this.text, this.textFont,
        this.textHeight + t.outlineIncrease);
      th = extents.max.y + extents.min.y;
      f = (s * (this.textHeight + t.outlineIncrease)) + 'px ' + this.textFont;
      c.font = f;
      cw = this.MeasureText(c);

      tcv = new TextCanvas(this.text, f, cw + s, (s * th) + s, cw,
        this.line_widths, t.textAlign, t.textVAlign, s);
      if(this.image)
        tcv.SetImage(this.image, this.iw + t.outlineIncrease,
          this.ih + t.outlineIncrease, t.imagePosition, t.imagePadding,
          t.imageAlign, t.imageVAlign, t.imageScale);
          
      this.oimage = tcv.Create(this.colour, this.bgColour, this.bgOutline,
        s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
        s * this.padding, s * this.bgRadius);

      if(t.outlineIncrease > 0)
        img = ExpandImage(img, this.oimage.width, this.oimage.height);
      else
        this.oimage = ExpandImage(this.oimage, img.width, img.height);
    }
    if(img) {
      this.fimage = img;
      twidth = this.fimage.width / s;
      theight = this.fimage.height / s;
    }
    this.SetDraw(t);
    t.txtOpt = !!this.fimage;
  }
  this.h = theight;
  this.w = twidth;
};
Tproto.SetFont = function(f, c, bc, boc) {
  this.textFont = f;
  this.colour = c;
  this.bgColour = bc;
  this.bgOutline = boc;
  this.Measure(this.tc.ctxt, this.tc);
};
Tproto.SetWeight = function(w) {
  var tc = this.tc, modes = tc.weightMode.split(/[, ]/), m, s, wl = w.length;
  if(!this.HasText())
    return;
  this.weighted = true;
  for(s = 0; s < wl; ++s) {
    m = modes[s] || 'size';
    if('both' == m) {
      this.Weight(w[s], tc.ctxt, tc, 'size', tc.min_weight[s], 
        tc.max_weight[s], s);
      this.Weight(w[s], tc.ctxt, tc, 'colour', tc.min_weight[s],
        tc.max_weight[s], s);
    } else {
      this.Weight(w[s], tc.ctxt, tc, m, tc.min_weight[s], tc.max_weight[s], s);
    }
  }
  this.Measure(tc.ctxt, tc);
};
Tproto.Weight = function(w, c, t, m, wmin, wmax, wnum) {
  w = isNaN(w) ? 1 : w;
  var nweight = (w - wmin) / (wmax - wmin);
  if('colour' == m)
    this.colour = FindGradientColour(t, nweight, wnum);
  else if('bgcolour' == m)
    this.bgColour = FindGradientColour(t, nweight, wnum);
  else if('bgoutline' == m)
    this.bgOutline = FindGradientColour(t, nweight, wnum);
  else if('size' == m) {
    if(t.weightSizeMin > 0 && t.weightSizeMax > t.weightSizeMin) {
      this.textHeight = t.weightSize * 
        (t.weightSizeMin + (t.weightSizeMax - t.weightSizeMin) * nweight);
    } else {
      // min textHeight of 1
      this.textHeight = max(1, w * t.weightSize);
    }
  }
};
Tproto.SetShadowColourFixed = function(c,s,a) {
  c.shadowColor = s;
};
Tproto.SetShadowColourAlpha = function(c,s,a) {
  c.shadowColor = SetAlpha(s, a);
};
Tproto.DrawText = function(c,xoff,yoff) {
  var t = this.tc, x = this.x, y = this.y, s = this.sc, i, xl;
  c.globalAlpha = this.alpha;
  c.fillStyle = this.colour;
  t.shadow && this.SetShadowColour(c,t.shadow,this.alpha);
  c.font = this.font;
  x += xoff / s;
  y += (yoff / s) - (this.h / 2);
  for(i = 0; i < this.text.length; ++i) {
    xl = x;
    if('right' == t.textAlign) {
      xl += this.w / 2 - this.line_widths[i];
    } else if('centre' == t.textAlign) {
      xl -= this.line_widths[i] / 2;
    } else {
      xl -= this.w / 2;
    }
    c.setTransform(s, 0, 0, s, s * xl, s * y);
    c.fillText(this.text[i], 0, 0);
    y += this.textHeight;
  }
};
Tproto.DrawImage = function(c,xoff,yoff,im) {
  var x = this.x, y = this.y, s = this.sc,
    i = im || this.fimage, w = this.w, h = this.h, a = this.alpha,
    shadow = this.shadow;
  c.globalAlpha = a;
  shadow && this.SetShadowColour(c,shadow,a);
  x += (xoff / s) - (w / 2);
  y += (yoff / s) - (h / 2);
  c.setTransform(s, 0, 0, s, s * x, s * y);
  c.drawImage(i, 0, 0, w, h);
};
Tproto.DrawImageIE = function(c,xoff,yoff) {
  var i = this.fimage, s = this.sc,
    w = i.width = this.w*s, h = i.height = this.h * s,
    x = (this.x*s) + xoff - (w/2), y = (this.y*s) + yoff - (h/2);
  c.setTransform(1,0,0,1,0,0);
  c.globalAlpha = this.alpha;
  c.drawImage(i, x, y);
};
Tproto.Calc = function(m,a) {
  var pp, t = this.tc, mnb = t.minBrightness,
    mxb = t.maxBrightness, r = t.max_radius;
  pp = m.xform(this.position);
  this.xformed = pp;
  pp = Project(t, pp, t.stretchX, t.stretchY);
  this.x = pp.x;
  this.y = pp.y;
  this.z = pp.z;
  this.sc = pp.w;
  this.alpha = a * Clamp(mnb + (mxb - mnb) * (r - this.z) / (2 * r), 0, 1);
};
Tproto.UpdateActive = function(c, xoff, yoff) {
  var o = this.outline, w = this.w, h = this.h,
    x = this.x - w/2, y = this.y - h/2;
  o.Update(x, y, w, h, this.sc, this.z, xoff, yoff);
  return o;
};
Tproto.CheckActive = function(c,xoff,yoff) {
  var t = this.tc, o = this.UpdateActive(c, xoff, yoff);
  return o.Active(c, t.mx, t.my) ? o : null;
};
Tproto.Clicked = function(e) {
  var a = this.a, t = a.target, h = a.href, evt;
  if(t != '' && t != '_self') {
    if(self.frames[t]) {
      self.frames[t].document.location = h;
    } else{
      try {
        if(top.frames[t]) {
          top.frames[t].document.location = h;
          return;
        }
      } catch(err) {
        // different domain/port/protocol?
      }
      window.open(h, t);
    }
    return;
  }
  if(doc.createEvent) {
    evt = doc.createEvent('MouseEvents');
    evt.initMouseEvent('click', 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
    if(!a.dispatchEvent(evt))
      return;
  } else if(a.fireEvent) {
    if(!a.fireEvent('onclick'))
      return;
  }
  doc.location = h;
};
/**
 * @constructor
 */
function TagCanvas(cid,lctr,opt) {
  var i, p, c = doc.getElementById(cid), cp = ['id','class','innerHTML'], raf;

  if(!c) throw 0;
  if(Defined(window.G_vmlCanvasManager)) {
    c = window.G_vmlCanvasManager.initElement(c);
    this.ie = parseFloat(navigator.appVersion.split('MSIE')[1]);
  }
  if(c && (!c.getContext || !c.getContext('2d').fillText)) {
    p = doc.createElement('DIV');
    for(i = 0; i < cp.length; ++i)
      p[cp[i]] = c[cp[i]];
    c.parentNode.insertBefore(p,c);
    c.parentNode.removeChild(c);
    throw 0;
  }
  for(i in TagCanvas.options)
    this[i] = opt && Defined(opt[i]) ? opt[i] : 
      (Defined(TagCanvas[i]) ? TagCanvas[i] : TagCanvas.options[i]);

  this.canvas = c;
  this.ctxt = c.getContext('2d');
  this.z1 = 250 / max(this.depth, 0.001);
  this.z2 = this.z1 / this.zoom;
  this.radius = min(c.height, c.width) * 0.0075; // fits radius of 100 in canvas
  this.max_radius = 100;
  this.max_weight = [];
  this.min_weight = [];
  this.textFont = this.textFont && FixFont(this.textFont);
  this.textHeight *= 1;
  this.imageRadius = this.imageRadius.toString();
  this.pulsateTo = Clamp(this.pulsateTo, 0, 1);
  this.minBrightness = Clamp(this.minBrightness, 0, 1);
  this.maxBrightness = Clamp(this.maxBrightness, this.minBrightness, 1);
  this.ctxt.textBaseline = 'top';
  this.lx = (this.lock + '').indexOf('x') + 1;
  this.ly = (this.lock + '').indexOf('y') + 1;
  this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
  this.fixedAlpha = 1;
  this.source = lctr || cid;
  this.repeatTags = min(64, ~~this.repeatTags);
  this.minTags = min(200, ~~this.minTags);
  if(~~this.scrollPause > 0)
    TagCanvas.scrollPause = ~~this.scrollPause;
  else
    this.scrollPause = 0;
  if(this.minTags > 0 && this.repeatTags < 1 && (i = this.GetTags().length))
    this.repeatTags = ceil(this.minTags / i) - 1;
  this.transform = Matrix.Identity();
  this.startTime = this.time = TimeNow();
  this.mx = this.my = -1;
  this.centreImage && CentreImage(this);
  this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
  this.animTiming = (typeof TagCanvas[this.animTiming] == 'function' ?
    TagCanvas[this.animTiming] : TagCanvas.Smooth);
  if(this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
    // let the browser translate "red" into "#ff0000"
    this.ctxt.shadowColor = this.shadow;
    this.shadow = this.ctxt.shadowColor;
    this.shadowAlpha = ShadowAlphaBroken();
  } else {
    delete this.shadow;
  }
  this.Load();
  if(lctr && this.hideTags) {
    (function(t) {
    if(TagCanvas.loaded)
      t.HideTags();
    else
      AddHandler('load', function() { t.HideTags(); }, window);
    })(this);
  }

  this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
  this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
  if(this.tooltip) {
    this.ctitle = c.title;
    c.title = '';
    if(this.tooltip == 'native') {
      this.Tooltip = this.TooltipNative;
    } else {
      this.Tooltip = this.TooltipDiv;
      if(!this.ttdiv) {
        this.ttdiv = doc.createElement('div');
        this.ttdiv.className = this.tooltipClass;
        this.ttdiv.style.position = 'absolute';
        this.ttdiv.style.zIndex = c.style.zIndex + 1;
        AddHandler('mouseover',function(e){e.target.style.display='none';},this.ttdiv);
        doc.body.appendChild(this.ttdiv);
      }
    }
  } else {
    this.Tooltip = this.TooltipNone;
  }
  if(!this.noMouse && !handlers[cid]) {
    handlers[cid] = [
      ['mousemove', MouseMove],
      ['mouseout', MouseOut],
      ['mouseup', MouseUp],
      ['touchstart', TouchDown],
      ['touchend', TouchUp],
      ['touchcancel', TouchUp],
      ['touchmove', TouchMove]
    ];
    if(this.dragControl) {
      handlers[cid].push(['mousedown', MouseDown]);
      handlers[cid].push(['selectstart', Nop]);
    }
    if(this.wheelZoom) {
      handlers[cid].push(['mousewheel', MouseWheel]);
      handlers[cid].push(['DOMMouseScroll', MouseWheel]);
    }
    if(this.scrollPause) {
      handlers[cid].push(['scroll', Scroll, window]);
    }
    for(i = 0; i < handlers[cid].length; ++i) {
      p = handlers[cid][i];
      AddHandler(p[0], p[1], p[2] ? p[2] : c);
    }
  }
  if(!TagCanvas.started) {
    raf = window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    TagCanvas.NextFrame = raf ? TagCanvas.NextFrameRAF :
      TagCanvas.NextFrameTimeout;
    TagCanvas.interval = this.interval;
    TagCanvas.NextFrame(this.interval);
    TagCanvas.started = 1;
  }
}
TCproto = TagCanvas.prototype;
TCproto.SourceElements = function() {
  if(doc.querySelectorAll)
    return doc.querySelectorAll('#' + this.source);
  return [doc.getElementById(this.source)];
};
TCproto.HideTags = function() {
  var el = this.SourceElements(), i;
  for(i = 0; i < el.length; ++i)
    el[i].style.display = 'none';
};
TCproto.GetTags = function() {
  var el = this.SourceElements(), etl, tl = [], i, j, k;
  for(k = 0; k <= this.repeatTags; ++k) {
    for(i = 0; i < el.length; ++i) {
      etl = el[i].getElementsByTagName('a');
      for(j = 0; j < etl.length; ++j) {
        tl.push(etl[j]);
      }
    }
  }
  return tl;
};
TCproto.Message = function(text) {
  var tl = [], i, p, tc = text.split(''), a, t, x, z;
  for(i = 0; i < tc.length; ++i) {
    if(tc[i] != ' ') {
      p = i - tc.length / 2;
      a = doc.createElement('A');
      a.href = '#';
      a.innerText = tc[i];
      x = 100 * sin(p / 9);
      z = -100 * cos(p / 9);
      t = new Tag(this, tc[i], a, [x,0,z], 2, 18, '#000', '#fff', 0, 0, 0,
        'monospace', 2, tc[i]);
      t.Init();
      tl.push(t);
    }
  }
  return tl;
};
TCproto.CreateTag = function(e) {
  var im, i, t, txt, ts, font, bc, boc, p = [0, 0, 0];
  if('text' != this.imageMode) {
    im = e.getElementsByTagName('img');
    if(im.length) {
      i = new Image;
      i.src = im[0].src;

      if(!this.imageMode) {
        t = new Tag(this, "", e, p, 0, 0);
        t.SetImage(i);
        //t.Init();
        AddImage(i, im[0], t, this);
        return t;
      }
    }
  }
  if('image' != this.imageMode) {
    ts = new TextSplitter(e);
    txt = ts.Lines();
    if(!ts.Empty()) {
      font = this.textFont || FixFont(GetProperty(e,'font-family'));
      if(this.splitWidth)
        txt = ts.SplitWidth(this.splitWidth, this.ctxt, font, this.textHeight);

      bc = this.bgColour == 'tag' ? GetProperty(e, 'background-color') :
        this.bgColour;
      boc = this.bgOutline == 'tag' ? GetProperty(e, 'color') : this.bgOutline;
    } else {
      ts = null;
    }
  }
  if(ts || i) {
    t = new Tag(this, txt, e, p, 2, this.textHeight + 2,
      this.textColour || GetProperty(e,'color'), bc, this.bgRadius,
      boc, this.bgOutlineThickness, font, this.padding, ts && ts.original);
    if(i) {
      t.SetImage(i);
      AddImage(i, im[0], t, this);
    } else {
      t.Init();
    }
    return t;
  }
};
TCproto.UpdateTag = function(t, a) {
  var colour = this.textColour || GetProperty(a, 'color'),
    font = this.textFont || FixFont(GetProperty(a, 'font-family')),
    bc = this.bgColour == 'tag' ? GetProperty(a, 'background-color') :
      this.bgColour, boc = this.bgOutline == 'tag' ? GetProperty(a, 'color') :
      this.bgOutline;
  t.a = a;
  t.title = a.title;
  if(t.colour != colour || t.textFont != font || t.bgColour != bc ||
    t.bgOutline != boc)
    t.SetFont(font, colour, bc, boc);
};
TCproto.Weight = function(tl) {
  var ll = tl.length, w, i, s, weights = [], valid,
    wfrom = this.weightFrom ? this.weightFrom.split(/[, ]/) : [null],
    wl = wfrom.length;
  for(i = 0; i < ll; ++i) {
    weights[i] = [];
    for(s = 0; s < wl; ++s) {
      w = FindWeight(tl[i].a, wfrom[s], this.textHeight);
      if(!this.max_weight[s] || w > this.max_weight[s])
        this.max_weight[s] = w;
      if(!this.min_weight[s] || w < this.min_weight[s])
        this.min_weight[s] = w;
      weights[i][s] = w;
    }
  }
  for(s = 0; s < wl; ++s) {
    if(this.max_weight[s] > this.min_weight[s])
      valid = 1;
  }
  if(valid) {
    for(i = 0; i < ll; ++i) {
      tl[i].SetWeight(weights[i]);
    }
  }
};
TCproto.Load = function() {
  var tl = this.GetTags(), taglist = [], shape, t,
    shapeArgs, rx, ry, rz, vl, i, tagmap = [], pfuncs = {
      sphere: PointsOnSphere,
      vcylinder: PointsOnCylinderV,
      hcylinder: PointsOnCylinderH,
      vring: PointsOnRingV,
      hring: PointsOnRingH
    };

  if(tl.length) {
    tagmap.length = tl.length;
    for(i = 0; i < tl.length; ++i)
      tagmap[i] = i;
    this.shuffleTags && Shuffle(tagmap);
    rx = 100 * this.radiusX;
    ry = 100 * this.radiusY;
    rz = 100 * this.radiusZ;
    this.max_radius = max(rx, max(ry, rz));

    for(i = 0; i < tl.length; ++i) {
      t = this.CreateTag(tl[tagmap[i]]);
      if(t)
        taglist.push(t);
    }
    this.weight && this.Weight(taglist, true);
  
    if(this.shapeArgs) {
      this.shapeArgs[0] = taglist.length;
    } else {
      shapeArgs = this.shape.toString().split(/[(),]/);
      shape = shapeArgs.shift();
      if(typeof window[shape] === 'function')
        this.shape = window[shape];
      else
        this.shape = pfuncs[shape] || pfuncs.sphere;
      this.shapeArgs = [taglist.length, rx, ry, rz].concat(shapeArgs);
    }
    vl = this.shape.apply(this, this.shapeArgs);
    this.listLength = taglist.length;
    for(i = 0; i < taglist.length; ++i)
      taglist[i].position = new Vector(vl[i][0], vl[i][1], vl[i][2]);
  }
  if(this.noTagsMessage && !taglist.length)
    taglist = this.Message('');
  this.taglist = taglist;
};
TCproto.Update = function() {
  var tl = this.GetTags(), newlist = [],
    taglist = this.taglist, found,
    added = [], removed = [], vl, ol, nl, i, j;

  if(!this.shapeArgs)
    return this.Load();

  if(tl.length) {
    nl = this.listLength = tl.length;
    ol = taglist.length;

    // copy existing list, populate "removed"
    for(i = 0; i < ol; ++i) {
      newlist.push(taglist[i]);
      removed.push(i);
    }

    // find added and removed tags
    for(i = 0; i < nl; ++i) {
      for(j = 0, found = 0; j < ol; ++j) {
        if(taglist[j].EqualTo(tl[i])) {
          this.UpdateTag(newlist[j], tl[i]);
          found = removed[j] = -1;
        }
      }
      if(!found)
        added.push(i);
    }

    // clean out found tags from removed list
    for(i = 0, j = 0; i < ol; ++i) {
      if(removed[j] == -1)
        removed.splice(j,1);
      else
        ++j;
    }

    // insert new tags in gaps where old tags removed
    if(removed.length) {
      Shuffle(removed);
      while(removed.length && added.length) {
        i = removed.shift();
        j = added.shift();
        newlist[i] = this.CreateTag(tl[j]);
      }

      // remove any more (in reverse order)
      removed.sort(function(a,b) {return a-b});
      while(removed.length) {
        newlist.splice(removed.pop(), 1);
      }
    }

    // add any extra tags
    j = newlist.length / (added.length + 1);
    i = 0;
    while(added.length) {
      newlist.splice(ceil(++i * j), 0, this.CreateTag(tl[added.shift()]));
    }

    // assign correct positions to tags
    this.shapeArgs[0] = nl = newlist.length;
    vl = this.shape.apply(this, this.shapeArgs);
    for(i = 0; i < nl; ++i)
      newlist[i].position = new Vector(vl[i][0], vl[i][1], vl[i][2]);

    // reweight tags
    this.weight && this.Weight(newlist);
  }
  this.taglist = newlist;
};
TCproto.SetShadow = function(c) {
  c.shadowBlur = this.shadowBlur;
  c.shadowOffsetX = this.shadowOffset[0];
  c.shadowOffsetY = this.shadowOffset[1];
};
TCproto.Draw = function(t) {
  if(this.paused)
    return;
  var cv = this.canvas, cw = cv.width, ch = cv.height, max_sc = 0,
    tdelta = (t - this.time) * TagCanvas.interval / 1000,
    x = cw / 2 + this.offsetX, y = ch / 2 + this.offsetY, c = this.ctxt,
    active, a, i, aindex = -1, tl = this.taglist, l = tl.length,
    frontsel = this.frontSelect, centreDrawn = (this.centreFunc == Nop), fixed;
  this.time = t;
  if(this.frozen && this.drawn)
    return this.Animate(cw,ch,tdelta);
  fixed = this.AnimateFixed();
  c.setTransform(1,0,0,1,0,0);
  for(i = 0; i < l; ++i)
    tl[i].Calc(this.transform, this.fixedAlpha);
  tl = SortList(tl, function(a,b) {return b.z-a.z});
  
  if(fixed && this.fixedAnim.active) {
    active = this.fixedAnim.tag.UpdateActive(c, x, y);
  } else {
    this.active = null;
    for(i = 0; i < l; ++i) {
      a = this.mx >= 0 && this.my >= 0 && this.taglist[i].CheckActive(c, x, y);
      if(a && a.sc > max_sc && (!frontsel || a.z <= 0)) {
        active = a;
        aindex = i;
        active.tag = this.taglist[i];
        max_sc = a.sc;
      }
    }
    this.active = active;
  }

  this.txtOpt || (this.shadow && this.SetShadow(c));
  c.clearRect(0,0,cw,ch);
  for(i = 0; i < l; ++i) {
    if(!centreDrawn && tl[i].z <= 0) {
      // run the centreFunc if the next tag is at the front
      try { this.centreFunc(c, cw, ch, x, y); }
      catch(e) {
        alert(e);
        // don't run it again
        this.centreFunc = Nop;
      }
      centreDrawn = true;
    }

    if(!(active && active.tag == tl[i] && active.PreDraw(c, tl[i], x, y)))
      tl[i].Draw(c, x, y);
    active && active.tag == tl[i] && active.PostDraw(c);
  }
  if(this.freezeActive && active) {
    this.Freeze();
  } else {
    this.UnFreeze();
    this.drawn = (l == this.listLength);
  }
  if(this.fixedCallback) {
    this.fixedCallback(this,this.fixedCallbackTag);
    this.fixedCallback = null;
  }
  fixed || this.Animate(cw, ch, tdelta);
  active && active.LastDraw(c);
  cv.style.cursor = active ? this.activeCursor : '';
  this.Tooltip(active,this.taglist[aindex]);
};
TCproto.TooltipNone = function() { };
TCproto.TooltipNative = function(active,tag) {
  if(active)
    this.canvas.title = tag && tag.title ? tag.title : '';
  else
    this.canvas.title = this.ctitle;
};
TCproto.SetTTDiv = function(title, tag) {
  var tc = this, s = tc.ttdiv.style;
  if(title != tc.ttdiv.innerHTML)
    s.display = 'none';
  tc.ttdiv.innerHTML = title;
  tag && (tag.title = tc.ttdiv.innerHTML);
  if(s.display == 'none' && ! tc.tttimer) {
    tc.tttimer = setTimeout(function() {
      var p = AbsPos(tc.canvas.id);
      s.display = 'block';
      s.left = p.x + tc.mx + 'px';
      s.top = p.y + tc.my + 24 + 'px';
      tc.tttimer = null;
    }, tc.tooltipDelay);
  }
};
TCproto.TooltipDiv = function(active,tag) {
  if(active && tag && tag.title) {
    this.SetTTDiv(tag.title, tag);
  } else if(!active && this.mx != -1 && this.my != -1 && this.ctitle.length) {
    this.SetTTDiv(this.ctitle);
  } else {
    this.ttdiv.style.display = 'none';
  }
};
TCproto.Transform = function(tc, p, y) {
  if(p || y) {
    var sp = sin(p), cp = cos(p), sy = sin(y), cy = cos(y),
      ym = new Matrix([cy,0,sy, 0,1,0, -sy,0,cy]),
      pm = new Matrix([1,0,0, 0,cp,-sp, 0,sp,cp]);
    tc.transform = tc.transform.mul(ym.mul(pm));
  }
};
TCproto.AnimateFixed = function() {
  var fa, t1, angle, m, d;
  if(this.fadeIn) {
    t1 = TimeNow() - this.startTime;
    if(t1 >= this.fadeIn) {
      this.fadeIn = 0;
      this.fixedAlpha = 1;
    } else {
      this.fixedAlpha = t1 / this.fadeIn;
    }
  }
  if(this.fixedAnim) {
    if(!this.fixedAnim.transform)
      this.fixedAnim.transform = this.transform;
    fa = this.fixedAnim, t1 = TimeNow() - fa.t0, angle = fa.angle,
      m, d = this.animTiming(fa.t, t1);
    this.transform = fa.transform;
    if(t1 >= fa.t) {
      this.fixedCallbackTag = fa.tag;
      this.fixedCallback = fa.cb;
      this.fixedAnim = this.yaw = this.pitch = 0;
    } else {
      angle *= d;
    }
    m = Matrix.Rotation(angle, fa.axis);
    this.transform = this.transform.mul(m);
    return (this.fixedAnim != 0);
  }
  return false;
};
TCproto.AnimatePosition = function(w, h, t) {
  var tc = this, x = tc.mx, y = tc.my, s, r;
  if(!tc.frozen && x >= 0 && y >= 0 && x < w && y < h) {
    s = tc.maxSpeed, r = tc.reverse ? -1 : 1;
    tc.lx || (tc.yaw = ((x * 2 * s / w) - s) * r * t);
    tc.ly || (tc.pitch = ((y * 2 * s / h) - s) * -r * t);
    tc.initial = null;
  } else if(!tc.initial) {
    if(tc.frozen && !tc.freezeDecel)
      tc.yaw = tc.pitch = 0;
    else
      tc.Decel(tc);
  }
  this.Transform(tc, tc.pitch, tc.yaw);
};
TCproto.AnimateDrag = function(w, h, t) {
  var tc = this, rs = 100 * t * tc.maxSpeed / tc.max_radius / tc.zoom;
  if(tc.dx || tc.dy) {
    tc.lx || (tc.yaw = tc.dx * rs / tc.stretchX);
    tc.ly || (tc.pitch = tc.dy * -rs / tc.stretchY);
    tc.dx = tc.dy = 0;
    tc.initial = null;
  } else if(!tc.initial) {
    tc.Decel(tc);
  }
  this.Transform(tc, tc.pitch, tc.yaw);
};
TCproto.Freeze = function() {
  if(!this.frozen) {
    this.preFreeze = [this.yaw, this.pitch];
    this.frozen = 1;
    this.drawn = 0;
  }
};
TCproto.UnFreeze = function() {
  if(this.frozen) {
    this.yaw = this.preFreeze[0];
    this.pitch = this.preFreeze[1];
    this.frozen = 0;
  }
};
TCproto.Decel = function(tc) {
  var s = tc.minSpeed, ay = abs(tc.yaw), ap = abs(tc.pitch);
  if(!tc.lx && ay > s)
    tc.yaw = ay > tc.z0 ? tc.yaw * tc.decel : 0;
  if(!tc.ly && ap > s)
    tc.pitch = ap > tc.z0 ? tc.pitch * tc.decel : 0;
};
TCproto.Zoom = function(r) {
  this.z2 = this.z1 * (1/r);
  this.drawn = 0;
};
TCproto.Clicked = function(e) {
  var a = this.active;
  try {
    if(a && a.tag)
      if(this.clickToFront === false || this.clickToFront === null)
        a.tag.Clicked(e);
      else
        this.TagToFront(a.tag, this.clickToFront, function() {
          a.tag.Clicked(e);
        }, true);
  } catch(ex) {
  }
};
TCproto.Wheel = function(i) {
  var z = this.zoom + this.zoomStep * (i ? 1 : -1);
  this.zoom = min(this.zoomMax,max(this.zoomMin,z));
  this.Zoom(this.zoom);
};
TCproto.BeginDrag = function(e) {
  this.down = EventXY(e, this.canvas);
  e.cancelBubble = true;
  e.returnValue = false;
  e.preventDefault && e.preventDefault();
};
TCproto.Drag = function(e, p) {
  if(this.dragControl && this.down) {
    var t2 = this.dragThreshold * this.dragThreshold,
      dx = p.x - this.down.x, dy = p.y - this.down.y;
    if(this.dragging || dx * dx + dy * dy > t2) {
      this.dx = dx;
      this.dy = dy;
      this.dragging = 1;
      this.down = p;
    }
  }
  return this.dragging;
};
TCproto.EndDrag = function() {
  var res = this.dragging;
  this.dragging = this.down = null;
  return res;
};
function PinchDistance(e) {
  var t1 = e.targetTouches[0], t2 = e.targetTouches[1];
  return sqrt(pow(t2.pageX - t1.pageX, 2) + pow(t2.pageY - t1.pageY, 2));
}
TCproto.BeginPinch = function(e) {
  this.pinched = [PinchDistance(e), this.zoom];
  e.preventDefault && e.preventDefault();
};
TCproto.Pinch = function(e) {
  var z, d, p = this.pinched;
  if(!p)
    return;
  d = PinchDistance(e);
  z = p[1] * d / p[0];
  this.zoom = min(this.zoomMax,max(this.zoomMin,z));
  this.Zoom(this.zoom);
};
TCproto.EndPinch = function(e) {
  this.pinched = null;
};
TCproto.Pause = function() { this.paused = true; };
TCproto.Resume = function() { this.paused = false; };
TCproto.SetSpeed = function(i) {
  this.initial = i;
  this.yaw = i[0] * this.maxSpeed;
  this.pitch = i[1] * this.maxSpeed;
};
TCproto.FindTag = function(t) {
  if(!Defined(t))
    return null;
  Defined(t.index) && (t = t.index);
  if(!IsObject(t))
    return this.taglist[t];
  var srch, tgt, i;
  if(Defined(t.id))
    srch = 'id', tgt = t.id;
  else if(Defined(t.text))
    srch = 'innerText', tgt = t.text;

  for(i = 0; i < this.taglist.length; ++i)
    if(this.taglist[i].a[srch] == tgt)
      return this.taglist[i];
};
TCproto.RotateTag = function(tag, lt, lg, time, callback, active) {
  var t = tag.xformed, v1 = new Vector(t.x, t.y, t.z),
    v2 = MakeVector(lg, lt), angle = v1.angle(v2), u = v1.cross(v2).unit();
  if(angle == 0) {
    this.fixedCallbackTag = tag;
    this.fixedCallback = callback;
  } else {
    this.fixedAnim = {
      angle: -angle,
      axis: u,
      t: time,
      t0: TimeNow(),
      cb: callback,
      tag: tag,
      active: active
    };
  }
};
TCproto.TagToFront = function(tag, time, callback, active) {
  this.RotateTag(tag, 0, 0, time, callback, active);
};
TagCanvas.Start = function(id,l,o) {
  TagCanvas.Delete(id);
  TagCanvas.tc[id] = new TagCanvas(id,l,o);
};
function tccall(f,id) {
  TagCanvas.tc[id] && TagCanvas.tc[id][f]();
}
TagCanvas.Linear = function(t, t0) { return t0 / t; }
TagCanvas.Smooth = function(t, t0) { return 0.5 - cos(t0 * Math.PI / t) / 2; }
TagCanvas.Pause = function(id) { tccall('Pause',id); };
TagCanvas.Resume = function(id) { tccall('Resume',id); };
TagCanvas.Reload = function(id) { tccall('Load',id); };
TagCanvas.Update = function(id) { tccall('Update',id); };
TagCanvas.SetSpeed = function(id, speed) {
  if(IsObject(speed) && TagCanvas.tc[id] &&
    !isNaN(speed[0]) && !isNaN(speed[1])) {
    TagCanvas.tc[id].SetSpeed(speed);
    return true;
  }
  return false;
};
TagCanvas.TagToFront = function(id, options) {
  if(!IsObject(options))
    return false;
  options.lat = options.lng = 0;
  return TagCanvas.RotateTag(id, options);
};
TagCanvas.RotateTag = function(id, options) {
  if(IsObject(options) && TagCanvas.tc[id]) {
    if(isNaN(options.time))
      options.time = 500;
    var tt = TagCanvas.tc[id].FindTag(options);
    if(tt) {
      TagCanvas.tc[id].RotateTag(tt, options.lat, options.lng,
        options.time, options.callback, options.active);
      return true;
    }
  }
  return false;
};
TagCanvas.Delete = function(id) {
  var i, c;
  if(handlers[id]) {
    c = doc.getElementById(id);
    if(c) {
      for(i = 0; i < handlers[id].length; ++i)
        RemoveHandler(handlers[id][i][0], handlers[id][i][1], c);
    }
  }
  delete handlers[id];
  delete TagCanvas.tc[id];
};
TagCanvas.NextFrameRAF = function() {
  requestAnimationFrame(DrawCanvasRAF);
};
TagCanvas.NextFrameTimeout = function(iv) {
  setTimeout(DrawCanvas, iv);
};
TagCanvas.tc = {};
TagCanvas.options = {
z1: 20000,
z2: 20000,
z0: 0.0002,
freezeActive: false,
freezeDecel: false,
activeCursor: 'pointer',
pulsateTo: 1,
pulsateTime: 3,
reverse: false,
depth: 0.5,
maxSpeed: 0.05,
minSpeed: 0,
decel: 0.95,
interval: 20,
minBrightness: 0.1,
maxBrightness: 1,
outlineColour: '#ffff99',
outlineThickness: 2,
outlineOffset: 5,
outlineMethod: 'outline',
outlineRadius: 0,
textColour: '#ff99ff',
textHeight: 15,
textFont: 'Helvetica, Arial, sans-serif',
shadow: '#000',
shadowBlur: 0,
shadowOffset: [0,0],
initial: null,
hideTags: true,
zoom: 1,
weight: false,
weightMode: 'size',
weightFrom: null,
weightSize: 1,
weightSizeMin: null,
weightSizeMax: null,
weightGradient: {0:'#f00', 0.33:'#ff0', 0.66:'#0f0', 1:'#00f'},
txtOpt: true,
txtScale: 2,
frontSelect: false,
wheelZoom: true,
zoomMin: 0.3,
zoomMax: 3,
zoomStep: 0.05,
shape: 'sphere',
lock: null,
tooltip: null,
tooltipDelay: 300,
tooltipClass: 'tctooltip',
radiusX: 1,
radiusY: 1,
radiusZ: 1,
stretchX: 1,
stretchY: 1,
offsetX: 0,
offsetY: 0,
shuffleTags: false,
noSelect: false,
noMouse: false,
imageScale: 1,
paused: false,
dragControl: false,
dragThreshold: 4,
centreFunc: Nop,
splitWidth: 0,
animTiming: 'Smooth',
clickToFront: false,
fadeIn: 0,
padding: 0,
bgColour: null,
bgRadius: 0,
bgOutline: null,
bgOutlineThickness: 0,
outlineIncrease: 4,
textAlign: 'centre',
textVAlign: 'middle',
imageMode: null,
imagePosition: null,
imagePadding: 2,
imageAlign: 'centre',
imageVAlign: 'middle',
noTagsMessage: true,
centreImage: null,
pinchZoom: false,
repeatTags: 0,
minTags: 0,
imageRadius: 0,
scrollPause: false
};
for(i in TagCanvas.options) TagCanvas[i] = TagCanvas.options[i];
window.TagCanvas = TagCanvas;
// set a flag for when the window has loaded
AddHandler('load',function(){TagCanvas.loaded=1},window);
})();


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/libs/uuid.js ---- */


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


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/utils/LinkHelper.coffee ---- */


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


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/utils/Time.coffee ---- */


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


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/utils/WikiUi.coffee ---- */


(function() {
  var WikiUi;

  WikiUi = (function() {
    function WikiUi() {
      this.historyTools = document.getElementById("content-history-tools");
      this.viewTools = document.getElementById("content-view-tools");
      this.editTools = document.getElementById("content-edit-tools");
      this.addTools = document.getElementById("content-add-tools");
      this.contentPanel = document.getElementById("messages");
      this.contentEditor = document.getElementById("editor");
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
      this.editTools.style.display = "none";
      return this.addTools.style.display = "block";
    };

    WikiUi.prototype.showHistoryTools = function() {
      this.historyTools.style.display = "block";
      return this.addTools.style.display = "none";
    };

    WikiUi.prototype.showViewTools = function() {
      this.viewTools.style.display = "block";
      return this.addTools.style.display = "none";
    };

    WikiUi.prototype.showEditTools = function() {
      this.editTools.style.display = "block";
      return this.addTools.style.display = "none";
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
      var body, i, j, len, len1, link;
      this.hideTools();
      this.hidePanels();
      this.contentPanel.style.display = "block";
      body = "<canvas width='858' height='500' id='cloud'></canvas><ul id='tags' style='display: none'>";
      if (links.length > 0) {
        for (i = 0, len = links.length; i < len; i++) {
          link = links[i];
          body += "<li>" + link + "</li>";
        }
      }
      if (orphaned.length > 0) {
        for (j = 0, len1 = orphaned.length; j < len1; j++) {
          link = orphaned[j];
          body += "<li>" + link + "</li>";
        }
      }
      body += "</ul>";
      if (body === "") {
        body = "<p class=\"muted\">There are no pages yet.</p>";
      }
      return this.contentPanel.innerHTML = body;
    };

    WikiUi.prototype.loggedInMessage = function(cert) {
      if (cert) {
        return document.getElementById("select_user").innerHTML = "You are logged in as " + cert;
      } else {
        return document.getElementById("select_user").innerHTML = "Click here to login your user !";
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


/* ---- /1QDQ1NmFAfLE8GkUFwLFYXHwnrCaAkEr6V/js/ZeroWiki.coffee ---- */


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
      var keyword, query;
      keyword = this.getWord().replace("%", "\%");
      query = "SELECT id, body, slug, MAX(date_added), json_id FROM pages WHERE pages.slug like '%" + keyword + "%' GROUP BY pages.slug ORDER BY date_added DESC LIMIT 10000";
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
            var existingPages, j, k, len1, len2, links, normalized, orphaned, ref, ref1, ref2, tag, uniqueOrphans;
            existingPages = LinkHelper.getSlugs(false, slugs);
            links = [];
            normalized = [];
            for (j = 0, len1 = linkTags.length; j < len1; j++) {
              tag = linkTags[j];
              if (ref = tag.text.toLowerCase(), indexOf.call(normalized, ref) < 0) {
                links.push("<a href=\"?Page:" + tag.slug + "\">" + (decodeURIComponent(tag.text)) + "</a>");
                normalized.push(tag.text.toLowerCase());
              }
            }
            slugs = LinkHelper.getSlugs();
            orphaned = [];
            uniqueOrphans = [];
            for (k = 0, len2 = pages.length; k < len2; k++) {
              page = pages[k];
              if ((ref1 = page.slug, indexOf.call(slugs, ref1) < 0) && (ref2 = page.slug, indexOf.call(uniqueOrphans, ref2) < 0)) {
                orphaned.push("<a href=\"?Page:" + page.slug + "\">" + (decodeURIComponent(page.slug)) + "</a>");
                uniqueOrphans.push(page.slug);
              }
            }
            if (keyword !== "") {
              links.push("<a href=\"?Page:" + keyword + "\">[" + (decodeURIComponent(keyword)) + "]</a>");
              orphaned.push("<a href=\"?Page:" + keyword + "\">[" + (decodeURIComponent(keyword)) + "]</a>");
            }
            WikiUi.showIndexPage(links, orphaned.sort());
            TagCanvas.textFont = 'Microsoft YaHei,KaiTi,Arial,SimSun,sans-serif';
            TagCanvas.textColour = 'blue';
            TagCanvas.textHeight = 22;
            TagCanvas.outlineMethod = 'block';
            TagCanvas.outlineColour = 'silver';
            TagCanvas.maxSpeed = 0.05;
            TagCanvas.minBrightness = 0.2;
            TagCanvas.depth = 0.8;
            TagCanvas.pulsateTo = 0.6;
            TagCanvas.initial = [0.1, -0.1];
            TagCanvas.decel = 0.98;
            TagCanvas.reverse = true;
            TagCanvas.hideTags = false;
            TagCanvas.shadow = '#ccf';
            TagCanvas.shadowBlur = 3;
            TagCanvas.weight = false;
            TagCanvas.imageScale = null;
            TagCanvas.fadeIn = 1000;
            TagCanvas.clickToFront = 600;
            return TagCanvas.Start('cloud', 'tags');
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
      if (!(match = url.match(/Page:.*(&.*)?$/))) {
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
      if (match = url.match(/Page:([^&]*)(&.*)?History(&.*)?$/)) {
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
      if (match = url.match(/Page:([^&]*)(&.*)?$/)) {
        return match[1].toLowerCase();
      } else {
        return "";
      }
    };

    ZeroWiki.prototype.getWord = function(url) {
      var match;
      if (url == null) {
        url = null;
      }
      if (url === null) {
        url = window.location.search.substring(1);
      }
      if (match = url.match(/Index:([^&]*)(&.*)?$/)) {
        return match[1].toLowerCase();
      } else {
        return "";
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
      if (match = url.match(/Rev:([^&]*)(&.*)?$/)) {
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
              cssClass += " blue";
            }
            link.slug = encodeURIComponent(link.slug);
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
