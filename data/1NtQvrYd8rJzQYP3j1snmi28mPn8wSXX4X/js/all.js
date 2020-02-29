

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
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());


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
