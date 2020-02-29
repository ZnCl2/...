/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:cap[1]==="pre"||cap[1]==="script"||cap[1]==="style",text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=escape(this.smartypants(cap[0]));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

// Generated by CoffeeScript 1.10.0
(function() {
  var Page, Promise, Text, Time, ZeroFrame, call_after_interval, calling, editor, last_time, left_menuify, profile_editor, seedbox, top_menuify, uploader, video_lister, video_playing, videobox,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Promise = (function() {
    Promise.join = function() {
      var args, fn1, l, len, num_uncompleted, promise, task, task_id, tasks;
      tasks = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      num_uncompleted = tasks.length;
      args = new Array(num_uncompleted);
      promise = new Promise();
      fn1 = function(task_id) {
        return task.then(function() {
          var callback, len1, m, ref2, results;
          args[task_id] = Array.prototype.slice.call(arguments);
          num_uncompleted--;
          if (num_uncompleted === 0) {
            ref2 = promise.callbacks;
            results = [];
            for (m = 0, len1 = ref2.length; m < len1; m++) {
              callback = ref2[m];
              results.push(callback.apply(promise, args));
            }
            return results;
          }
        });
      };
      for (task_id = l = 0, len = tasks.length; l < len; task_id = ++l) {
        task = tasks[task_id];
        fn1(task_id);
      }
      return promise;
    };

    function Promise() {
      this.resolved = false;
      this.end_promise = null;
      this.result = null;
      this.callbacks = [];
    }

    Promise.prototype.resolve = function() {
      var back, callback, l, len, ref2;
      if (this.resolved) {
        return false;
      }
      this.resolved = true;
      this.data = arguments;
      if (!arguments.length) {
        this.data = [true];
      }
      this.result = this.data[0];
      ref2 = this.callbacks;
      for (l = 0, len = ref2.length; l < len; l++) {
        callback = ref2[l];
        back = callback.apply(callback, this.data);
      }
      if (this.end_promise && back && back.then) {
        return back.then((function(_this) {
          return function(back_res) {
            return _this.end_promise.resolve(back_res);
          };
        })(this));
      }
    };

    Promise.prototype.fail = function() {
      return this.resolve(false);
    };

    Promise.prototype.then = function(callback) {
      if (this.resolved === true) {
        return callback.apply(callback, this.data);
      }
      this.callbacks.push(callback);
      this.end_promise = new Promise();
      return this.end_promise;
    };

    return Promise;

  })();

  window.Promise = Promise;

  last_time = {};

  calling = {};

  call_after_interval = {};

  window.RateLimitCb = function(interval, fn, args) {
    var cb;
    if (args == null) {
      args = [];
    }
    cb = function() {
      var left;
      left = interval - (Date.now() - last_time[fn]);
      if (left <= 0) {
        delete last_time[fn];
        if (calling[fn]) {
          RateLimitCb(interval, fn, calling[fn]);
        }
        return delete calling[fn];
      } else {
        return setTimeout((function() {
          delete last_time[fn];
          if (calling[fn]) {
            RateLimitCb(interval, fn, calling[fn]);
          }
          return delete calling[fn];
        }), left);
      }
    };
    if (last_time[fn]) {
      return calling[fn] = args;
    } else {
      last_time[fn] = Date.now();
      return fn.apply(this, [cb].concat(slice.call(args)));
    }
  };

  window.RateLimit = function(interval, fn) {
    if (!calling[fn]) {
      call_after_interval[fn] = false;
      fn();
      return calling[fn] = setTimeout((function() {
        if (call_after_interval[fn]) {
          fn();
        }
        delete calling[fn];
        return delete call_after_interval[fn];
      }), interval);
    } else {
      return call_after_interval[fn] = true;
    }
  };

  Text = (function() {
    function Text() {
      this.renderLinks = bind(this.renderLinks, this);
      this.renderMarked = bind(this.renderMarked, this);
    }

    Text.prototype.toColor = function(text, saturation, lightness) {
      var hash, i, l, ref2;
      if (saturation == null) {
        saturation = 30;
      }
      if (lightness == null) {
        lightness = 50;
      }
      hash = 0;
      for (i = l = 0, ref2 = text.length - 1; 0 <= ref2 ? l <= ref2 : l >= ref2; i = 0 <= ref2 ? ++l : --l) {
        hash += text.charCodeAt(i) * i;
        hash = hash % 1777;
      }
      return "hsl(" + (hash % 360) + ("," + saturation + "%," + lightness + "%)");
    };

    Text.prototype.renderMarked = function(text, options) {
      if (options == null) {
        options = {};
      }
      if (!text) {
        return "";
      }
      options["gfm"] = true;
      options["breaks"] = true;
      options["sanitize"] = true;
      options["renderer"] = marked_renderer;
      text = this.fixReply(text);
      text = marked(text, options);
      text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:');
      return this.fixHtmlLinks(text);
    };

    Text.prototype.renderLinks = function(text) {
      text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      text = text.replace(/(https?:\/\/[^\s)]+)/g, function(match) {
        return "<a href=\"" + (match.replace(/&amp;/g, '&')) + "\">" + match + "</a>";
      });
      text = text.replace(/\n/g, '<br>');
      text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:');
      text = this.fixHtmlLinks(text);
      return text;
    };

    Text.prototype.emailLinks = function(text) {
      return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
    };

    Text.prototype.fixHtmlLinks = function(text) {
      text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110\/(Me.ZeroNetwork.bit|1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH)\/\?/gi, 'href="?');
      if (window.is_proxy) {
        text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/gi, 'href="http://zero');
        text = text.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
        text = text.replace(/href="\/([A-Za-z0-9]{26,35})/g, 'href="http://zero/$1');
      } else {
        text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
      }
      text = text.replace(/href="\?/g, 'onclick="return Page.handleLinkClick(window.event)" href="?');
      return text;
    };

    Text.prototype.fixLink = function(link) {
      var back;
      if (window.is_proxy) {
        back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
        back = back.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
        back = back.replace(/\/([A-Za-z0-9]{26,35})/, "http://zero/$1");
        return back;
      } else {
        return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
      }
    };

    Text.prototype.toUrl = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
    };

    Text.prototype.getSiteUrl = function(address) {
      if (window.is_proxy) {
        if (indexOf.call(address, ".") >= 0) {
          return "http://" + address + "/";
        } else {
          return "http://zero/" + address + "/";
        }
      } else {
        return "/" + address + "/";
      }
    };

    Text.prototype.fixReply = function(text) {
      return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
    };

    Text.prototype.toBitcoinAddress = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "");
    };

    Text.prototype.jsonEncode = function(obj) {
      return unescape(encodeURIComponent(JSON.stringify(obj)));
    };

    Text.prototype.jsonDecode = function(obj) {
      return JSON.parse(decodeURIComponent(escape(obj)));
    };

    Text.prototype.fileEncode = function(obj) {
      if (typeof obj === "string") {
        return btoa(unescape(encodeURIComponent(obj)));
      } else {
        return btoa(unescape(encodeURIComponent(JSON.stringify(obj, void 0, '\t'))));
      }
    };

    Text.prototype.utf8Encode = function(s) {
      return unescape(encodeURIComponent(s));
    };

    Text.prototype.utf8Decode = function(s) {
      return decodeURIComponent(escape(s));
    };

    Text.prototype.distance = function(s1, s2) {
      var char, extra_parts, key, l, len, match, next_find, next_find_i, val;
      s1 = s1.toLocaleLowerCase();
      s2 = s2.toLocaleLowerCase();
      next_find_i = 0;
      next_find = s2[0];
      match = true;
      extra_parts = {};
      for (l = 0, len = s1.length; l < len; l++) {
        char = s1[l];
        if (char !== next_find) {
          if (extra_parts[next_find_i]) {
            extra_parts[next_find_i] += char;
          } else {
            extra_parts[next_find_i] = char;
          }
        } else {
          next_find_i++;
          next_find = s2[next_find_i];
        }
      }
      if (extra_parts[next_find_i]) {
        extra_parts[next_find_i] = "";
      }
      extra_parts = (function() {
        var results;
        results = [];
        for (key in extra_parts) {
          val = extra_parts[key];
          results.push(val);
        }
        return results;
      })();
      if (next_find_i >= s2.length) {
        return extra_parts.length + extra_parts.join("").length;
      } else {
        return false;
      }
    };

    Text.prototype.queryParse = function(query) {
      var key, l, len, params, part, parts, ref2, val;
      params = {};
      parts = query.split('&');
      for (l = 0, len = parts.length; l < len; l++) {
        part = parts[l];
        ref2 = part.split("="), key = ref2[0], val = ref2[1];
        if (val) {
          params[decodeURIComponent(key)] = decodeURIComponent(val);
        } else {
          params["url"] = decodeURIComponent(key);
          params["urls"] = params["url"].split("/");
        }
      }
      return params;
    };

    Text.prototype.queryEncode = function(params) {
      var back, key, val;
      back = [];
      if (params.url) {
        back.push(params.url);
      }
      for (key in params) {
        val = params[key];
        if (!val || key === "url") {
          continue;
        }
        back.push((encodeURIComponent(key)) + "=" + (encodeURIComponent(val)));
      }
      return back.join("&");
    };

    Text.prototype.highlight = function(text, search) {
      var back, i, l, len, part, parts;
      parts = text.split(RegExp(search, "i"));
      back = [];
      for (i = l = 0, len = parts.length; l < len; i = ++l) {
        part = parts[i];
        back.push(part);
        if (i < parts.length - 1) {
          back.push(h("span.highlight", {
            key: i
          }, search));
        }
      }
      return back;
    };

    Text.prototype.sqlIn = function(values) {
      var value;
      return "(" + ((function() {
        var l, len, results;
        results = [];
        for (l = 0, len = values.length; l < len; l++) {
          value = values[l];
          results.push("'" + value + "'");
        }
        return results;
      })()).join(',') + ")";
    };

    Text.prototype.formatSize = function(size) {
      var size_mb;
      size_mb = size / 1024 / 1024;
      if (size_mb >= 1000) {
        return (size_mb / 1024).toFixed(1) + " GB";
      } else if (size_mb >= 100) {
        return size_mb.toFixed(0) + " MB";
      } else if (size / 1024 >= 1000) {
        return size_mb.toFixed(2) + " MB";
      } else {
        return (size / 1024).toFixed(2) + " KB";
      }
    };

    return Text;

  })();

  window.is_proxy = document.location.host === "zero" || window.location.pathname === "/";

  window.Text = new Text();

  Text = new Text();

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(timestamp) {
      var back, now, secs;
      now = +(new Date) / 1000;
      if (timestamp > 1000000000000) {
        timestamp = timestamp / 1000;
      }
      secs = now - timestamp;
      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " minutes ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = "on " + this.date(timestamp);
      }
      back = back.replace(/^1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Time.prototype.date = function(timestamp, format) {
      var display, parts;
      if (format == null) {
        format = "short";
      }
      if (timestamp > 1000000000000) {
        timestamp = timestamp / 1000;
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

    return Time;

  })();

  window.Time = new Time();

  Time = new Time();

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.onRequest = bind(this.onRequest, this);
      this.processQueue = bind(this.processQueue, this);
      this.onMessage = bind(this.onMessage, this);
      this.queue = [];
      this.url = url;
      this.waiting_cb = {};
      this.history_state = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
      this.ready = false;
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      this.send({
        "cmd": "innerReady"
      });
      window.addEventListener("beforeunload", (function(_this) {
        return function(e) {
          console.log("Save scrollTop", window.pageYOffset);
          _this.history_state["scrollTop"] = window.pageYOffset;
          return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
        };
      })(this));
      return this.cmd("wrapperGetState", [], (function(_this) {
        return function(state) {
          return _this.handleState(state);
        };
      })(this));
    };

    ZeroFrame.prototype.handleState = function(state) {
      if (state !== null) {
        this.history_state = state;
      }
      console.log("Restore scrollTop", state, window.pageYOffset);
      if (window.pageYOffset === 0 && state) {
        return window.scroll(window.pageXOffset, state.scrollTop);
      }
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return console.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.send({
          "cmd": "innerReady"
        });
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        this.onOpenWebsocket();
        this.ready = true;
        return this.processQueue();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else if (cmd === "wrapperPopState") {
        this.handleState(message.params.state);
        return this.onRequest(cmd, message.params);
      } else {
        return this.onRequest(cmd, message.params);
      }
    };

    ZeroFrame.prototype.processQueue = function() {
      var cb, cmd, i, l, len, params, ref, ref1;
      ref = this.queue;
      for (i = l = 0, len = ref.length; l < len; i = ++l) {
        ref1 = ref[i];
        cmd = ref1[0];
        params = ref1[1];
        cb = ref1[2];
        this.cmd(cmd, params, cb);
      }
      return this.queue = [];
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
      return console.log("Unknown request", message);
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
      if (params === null) {
        params = {};
      }
      if (cb === null) {
        cb = null;
      }
      if (this.ready) {
        return this.send({
          "cmd": cmd,
          "params": params
        }, cb);
      } else {
        return this.queue.push([cmd, params, cb]);
      }
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
      return console.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return console.log("Websocket close");
    };

    return ZeroFrame;

  })();

  window.ZeroFrame = ZeroFrame;

  editor = (function() {
    function editor() {
      this.render = bind(this.render, this);
      this.save_info = bind(this.save_info, this);
      this.register_info = bind(this.register_info, this);
      this.check_content_json = bind(this.check_content_json, this);
      this.convert_base64 = bind(this.convert_base64, this);
    }

    editor.prototype.convert_base64 = function() {
      var max_size, thumbnail_upload;
      max_size = 1024 * 25;
      thumbnail_upload = $("#thumbnail_upload").prop("files")[0];
      if (thumbnail_upload && thumbnail_upload.size < max_size) {
        return convertImage(thumbnail_upload);
      } else {
        Page.cmd("wrapperNotification", ["info", "Max image size: 25kb (Tip: use GIMP or online compression tools to reduce resolution/quality!)"]);
        debugger;
        return false;
      }
    };

    editor.prototype.check_content_json = function(cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          var optional_pattern;
          if (res) {
            res = JSON.parse(res);
          }
          if (res == null) {
            res = {};
          }
          optional_pattern = "(?!data.json)";
          if (res.optional === optional_pattern) {
            return cb();
          }
          res.optional = optional_pattern;
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    editor.prototype.register_info = function(v_file, v_date, v_size, v_title, v_description, v_image, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null) {
            res = {};
          }
          if (res.file === null) {
            res.file = {};
          }
          res.file[v_file] = {
            title: v_title,
            date_added: v_date,
            size: v_size,
            description: v_description,
            image_link: v_image
          };
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    editor.prototype.save_info = function(v_file, v_date, v_size, v_title, v_description, v_image) {
      var register_info;
      register_info = this.register_info;
      return this.check_content_json((function(_this) {
        return function(res) {
          return register_info(v_file, v_date, v_size, v_title, v_description, v_image, function(res) {
            return Page.cmd("siteSign", {
              inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
            }, function(res) {
              return Page.cmd("sitePublish", {
                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                "sign": false
              }, function(res) {
                return Page.set_url("?Box");
              });
            });
          });
        };
      })(this));
    };

    editor.prototype.render = function() {
      var date_added, editorbox, init_url, query, real_url, user_address;
      console.log("[KopyKate: Rendering editor.]");
      init_url = Page.history_state["url"];
      real_url = init_url.split("Editor=")[1];
      date_added = real_url.split("_")[0];
      user_address = real_url.split("_")[1];
      editorbox = $("<div></div>");
      editorbox.attr("id", "editor");
      editorbox.attr("class", "editor");
      query = "SELECT * FROM file LEFT JOIN json USING (json_id) WHERE date_added='" + date_added + "' AND directory='" + user_address + "'";
      Page.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var brief_div, brief_input, brief_label, convert_base64, editor_container, editor_submit, file_name, my_row, save_info, thumbnail_container, thumbnail_div, thumbnail_image, thumbnail_input, thumbnail_title, thumbnail_upload, thumbnail_upload_label, title_div, title_input, title_label, user_directory, video_date_added, video_description, video_image, video_size, video_title, video_type;
          if (res.length === 0) {
            return $("#editor").html("<span>Error: No such video found!</span>");
          } else {
            my_row = res[0];
            file_name = my_row['file_name'];
            video_title = my_row['title'];
            video_type = my_row['type'];
            video_image = my_row['image_link'];
            video_description = my_row['description'];
            video_date_added = my_row['date_added'];
            video_size = my_row['size'];
            user_directory = my_row['directory'];
            if (user_directory === Page.site_info.auth_address) {
              editor_container = $("<div></div>");
              editor_container.attr("id", "editor_container");
              editor_container.attr("class", "editor_container");
              editor_submit = $("<button></button>");
              editor_submit.attr("id", "editor_submit_button");
              editor_submit.attr("class", "standard_button");
              editor_submit.text("PUBLISH");
              title_div = $("<div></div>");
              title_div.attr("id", "title_row");
              title_div.attr("class", "editor_row");
              title_label = $("<label></label>");
              title_label.attr("for", "editor_title");
              title_label.attr("class", "editor_input_label");
              title_label.text("Title");
              title_input = $("<input>");
              title_input.attr("id", "editor_title");
              title_input.attr("class", "editor_input");
              title_input.attr("type", "text");
              title_input.attr("name", "editor_title");
              title_input.attr("value", video_title);
              brief_div = $("<div></div>");
              brief_div.attr("id", "brief_row");
              brief_div.attr("class", "editor_row");
              brief_label = $("<span></span>");
              brief_label.attr("class", "editor_input_label");
              brief_label.text("Description");
              brief_input = $("<textarea>");
              brief_input.attr("id", "editor_brief");
              brief_input.attr("class", "editor_brief_input");
              brief_input.attr("type", "text");
              brief_input.attr("name", "editor_brief");
              brief_input.text(video_description);
              thumbnail_div = $("<div></div>");
              thumbnail_div.attr("id", "thumbnail_row");
              thumbnail_div.attr("class", "editor_row");
              thumbnail_title = $("<span></span>");
              thumbnail_title.attr("class", "editor_input_label");
              thumbnail_title.text("Thumbnail");
              thumbnail_container = $("<div></div>");
              thumbnail_container.attr("id", "thumbnail_container");
              thumbnail_container.attr("class", "thumbnail_container");
              thumbnail_image = $("<div></div>");
              thumbnail_image.attr("id", "thumbnail_preview");
              thumbnail_image.attr("class", "thumbnail_preview");
              thumbnail_image.css("background-image", "url('" + video_image + "')");
              thumbnail_input = $("<input>");
              thumbnail_input.attr("id", "thumbnail_input");
              thumbnail_input.attr("class", "editor_input");
              thumbnail_input.attr("type", "text");
              thumbnail_input.attr("name", "thumbnail_input");
              thumbnail_input.attr("value", video_image);
              thumbnail_input.attr("style", "display: none");
              thumbnail_upload_label = $("<label></label>");
              thumbnail_upload_label.attr("class", "standard_button");
              thumbnail_upload_label.attr("for", "thumbnail_upload");
              thumbnail_upload_label.text("UPLOAD IMAGE");
              thumbnail_upload = $("<input>");
              thumbnail_upload.attr("id", "thumbnail_upload");
              thumbnail_upload.attr("type", "file");
              thumbnail_upload.attr("style", "display: none");
              $("#editor").append(editor_container);
              $("#editor_container").append(title_div);
              $("#title_row").append(title_label);
              $("#title_row").append(title_input);
              $("#editor_container").append(brief_div);
              $("#brief_row").append(brief_label);
              $("#brief_row").append(brief_input);
              $("#editor_container").append(thumbnail_div);
              $("#thumbnail_row").append(thumbnail_title);
              $("#thumbnail_row").append(thumbnail_container);
              $("#thumbnail_container").append(thumbnail_image);
              $("#editor_container").append(editor_submit);
              $("#editor_container").append(thumbnail_upload_label);
              $("#editor_container").append(thumbnail_upload);
              $("#editor_container").append(thumbnail_input);
              convert_base64 = _this.convert_base64;
              $("#thumbnail_upload").on("change", function(e) {
                return convert_base64();
              });
              save_info = _this.save_info;
              return $("#editor_submit_button").on("click", function(e) {
                save_info(file_name, video_date_added, video_size, $("#editor_title").val(), $("#editor_brief").val(), $("#thumbnail_input").val());
                return e.preventDefault();
              });
            } else {
              return $("#editor").html("<span>Error: Permission denied!</span>");
            }
          }
        };
      })(this));
      $("#main").attr("class", "main_nomenu");
      $("#main").html("");
      donav();
      return $("#main").append(editorbox);
    };

    return editor;

  })();

  editor = new editor();

  profile_editor = (function() {
    function profile_editor() {
      this.render = bind(this.render, this);
      this.render_box = bind(this.render_box, this);
      this.render_timeout;
    }

    profile_editor.prototype.render_box = function() {
      $("#profile_editor").text("Welcome to KopyKate BIG!");
      $("#profile_editor_title").text("You are logged in as:");
      return $("#profile_editor_user").text(Page.site_info.cert_user_id);
    };

    profile_editor.prototype.render = function() {
      var container_editorbox, profile_editorbox, render_box, render_user, title_peditorbox, user_peditorbox;
      console.log("[KopyKate: Rendering profile editor.]");
      container_editorbox = $("<div></div>");
      container_editorbox.attr("id", "container_editorbox");
      container_editorbox.attr("class", "editor");
      profile_editorbox = $("<div></div>");
      profile_editorbox.attr("id", "profile_editor");
      profile_editorbox.attr("class", "peditor_divs");
      title_peditorbox = $("<div></div>");
      title_peditorbox.attr("id", "profile_editor_title");
      title_peditorbox.attr("class", "peditor_divs");
      user_peditorbox = $("<div></div>");
      user_peditorbox.attr("id", "profile_editor_user");
      user_peditorbox.attr("class", "peditor_divs");
      $("#main").attr("class", "main_nomenu");
      $("#main").html("");
      donav();
      $("#main").append(container_editorbox);
      $("#container_editorbox").append(profile_editorbox);
      $("#container_editorbox").append(title_peditorbox);
      $("#container_editorbox").append(user_peditorbox);
      $("#profile_editor").text("Loading user info...");
      render_box = this.render_box;
      render_user = this.render_user;
      return this.render_timeout = setTimeout(function() {
        if (Page.site_info) {
          if (Page.site_info.cert_user_id) {
            clearTimeout(this.render_timeout);
            render_box();
            return render_user();
          } else {
            return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
              return function(res) {
                console.log("This isn't right.");
                clearTimeout(_this.render_timeout);
                render_box();
                return render_user();
              };
            })(this));
          }
        }
      }, 1000);
    };

    return profile_editor;

  })();

  profile_editor = new profile_editor();

  left_menuify = (function() {
    function left_menuify() {
      this.render = bind(this.render, this);
    }

    left_menuify.prototype.render = function() {
      var item_head_version, item_home, item_home_link, item_latest, item_latest_link, item_seedbox, item_seedbox_link, item_source, item_source_link, item_subbed, item_subbed_link, item_videobox, item_videobox_link, menu_left, menu_left_items;
      menu_left = $("<div></div>");
      menu_left.attr("id", "menu_left");
      menu_left.attr("class", "menu_left");
      menu_left_items = $("<ul></ul>");
      menu_left_items.attr("id", "menu_left_items");
      menu_left_items.attr("class", "menu_left_items");
      item_head_version = $("<li></li>");
      item_head_version.attr("id", "item_head_version");
      item_head_version.attr("class", "list_item li_head");
      item_head_version.text("BETA v0.2.11.2");
      item_home = $("<li></li>");
      item_home.attr("id", "item_home");
      item_home.attr("class", "list_item li_home");
      item_home_link = $("<a></a>");
      item_home_link.attr("id", "item_home_link");
      item_home_link.attr("class", "item_link");
      item_home_link.attr("href", "?Home");
      item_home_link.text("Home");
      item_latest = $("<li></li>");
      item_latest.attr("id", "item_latest");
      item_latest.attr("class", "list_item li_latest");
      item_latest_link = $("<a></a>");
      item_latest_link.attr("id", "item_latest_link");
      item_latest_link.attr("class", "item_link");
      item_latest_link.attr("href", "?Latest");
      item_latest_link.text("Airing Now");
      item_subbed = $("<li></li>");
      item_subbed.attr("id", "item_subbed");
      item_subbed.attr("class", "list_item li_subbed");
      item_subbed_link = $("<a></a>");
      item_subbed_link.attr("id", "item_subbed_link");
      item_subbed_link.attr("class", "item_link");
      item_subbed_link.attr("href", "?Subbed");
      item_subbed_link.text("Subscribed");
      item_videobox = $("<li></li>");
      item_videobox.attr("id", "item_videobox");
      item_videobox.attr("class", "list_item li_videobox");
      item_videobox_link = $("<a></a>");
      item_videobox_link.attr("id", "item_videobox_link");
      item_videobox_link.attr("class", "item_link");
      item_videobox_link.attr("href", "?Box");
      item_videobox_link.text("VideoBox");
      item_seedbox = $("<li></li>");
      item_seedbox.attr("id", "item_seedbox");
      item_seedbox.attr("class", "list_item li_seedbox");
      item_seedbox_link = $("<a></a>");
      item_seedbox_link.attr("id", "item_seedbox_link");
      item_seedbox_link.attr("class", "item_link");
      item_seedbox_link.attr("href", "?Seed");
      item_seedbox_link.text("SeedBox");
      item_source = $("<li></li>");
      item_source.attr("id", "item_source");
      item_source.attr("class", "list_item li_source");
      item_source_link = $("<a></a>");
      item_source_link.attr("id", "item_source_link");
      item_source_link.attr("class", "item_link");
      item_source_link.attr("href", "http://127.0.0.1:43110/12NptcFqnsxiydK4W8VLK6EwjpbZS3bTHS");
      item_source_link.text("Source Code");
      $("#nav").html("");
      $("#nav").append(menu_left);
      $("#menu_left").append(menu_left_items);
      $("#menu_left_items").append(item_head_version);
      $("#menu_left_items").append(item_home);
      $("#item_home").append(item_home_link);
      $("#menu_left_items").append(item_latest);
      $("#item_latest").append(item_latest_link);
      $("#menu_left_items").append(item_subbed);
      $("#item_subbed").append(item_subbed_link);
      $("#menu_left_items").append(item_videobox);
      $("#item_videobox").append(item_videobox_link);
      $("#menu_left_items").append(item_seedbox);
      $("#item_seedbox").append(item_seedbox_link);
      $("#menu_left_items").append(item_source);
      $("#item_source").append(item_source_link);
      $("#item_home_link").on("click", function() {
        return Page.nav(this.href);
      });
      $("#item_latest_link").on("click", function() {
        return Page.nav(this.href);
      });
      $("#item_videobox_link").on("click", function() {
        return Page.nav(this.href);
      });
      $("#item_seedbox_link").on("click", function() {
        return Page.nav(this.href);
      });
      return $("#item_subbed_link").on("click", function() {
        return Page.nav(this.href);
      });
    };

    return left_menuify;

  })();

  left_menuify = new left_menuify();

  top_menuify = (function() {
    function top_menuify() {
      this.render = bind(this.render, this);
    }

    top_menuify.prototype.render = function() {
      var channel_icon, channel_link, logo, main_menu, menu_top, search_bar, search_button, search_icon, search_swap, search_swap_icon, search_wrap, toggle_button, toggle_icon, upload_icon, upload_link;
      menu_top = $("<div></div>");
      menu_top.attr("id", "menu_top");
      menu_top.attr("class", "menu_top");
      main_menu = $("<a></a>");
      main_menu.attr("id", "main_menu");
      main_menu.attr("class", "main_menu");
      main_menu.attr("href", "javascript:void(0)");
      logo = $("<a></a>");
      logo.attr("id", "site_logo");
      logo.attr("class", "logo pc");
      logo.attr("href", "?Home");
      search_bar = $("<input>");
      search_bar.attr("type", "text");
      search_bar.attr("id", "search_bar");
      search_bar.attr("class", "search_bar");
      search_bar.attr("placeholder", "What are you looking for?");
      search_button = $("<button></button>");
      search_button.attr("id", "search_button");
      search_button.attr("class", "search_button");
      search_icon = $("<div></div>");
      search_icon.attr("id", "search_icon");
      search_icon.attr("class", "search_icon");
      toggle_button = $("<div></div>");
      toggle_button.attr("id", "search_toggle");
      toggle_button.attr("class", "search_toggle");
      toggle_icon = $("<div></div>");
      toggle_icon.attr("id", "search_toggle_icon");
      toggle_icon.attr("class", "search_toggle_icon");
      search_wrap = $("<div></div>");
      search_wrap.attr("id", "search_wrap");
      search_wrap.attr("class", "search_wrap");
      upload_link = $("<a></a>");
      upload_link.attr("id", "upload_link");
      upload_link.attr("class", "upload_link");
      upload_link.attr("href", "?Upload");
      upload_icon = $("<div></div>");
      upload_icon.attr("id", "main_upload");
      upload_icon.attr("class", "main_upload");
      channel_link = $("<a></a>");
      channel_link.attr("id", "usr_channel_link");
      channel_link.attr("class", "usr_channel_link");
      channel_link.attr("href", "?Profile");
      channel_icon = $("<div></div>");
      channel_icon.attr("id", "channel_icon");
      channel_icon.attr("class", "channel_icon");
      search_swap = $("<a></a>");
      search_swap.attr("id", "search_swap");
      search_swap.attr("class", "search_swap");
      search_swap.attr("href", "javascript:void(0)");
      search_swap_icon = $("<div></div>");
      search_swap_icon.attr("id", "main_search_swap");
      search_swap_icon.attr("class", "main_search_swap");
      $("#header").html("");
      $("#header").append(menu_top);
      $("#menu_top").append(main_menu);
      $("#menu_top").append(logo);
      $("#search").append(search_wrap);
      $("#menu_top").append(channel_link);
      $("#menu_top").append(upload_link);
      $("#upload_link").html(upload_icon);
      $("#usr_channel_link").html(channel_icon);
      $("#menu_top").append(search_swap);
      $("#search_swap").append(search_swap_icon);
      $("#search_wrap").append(toggle_button);
      $("#search_toggle").append(toggle_icon);
      $("#search_wrap").append(search_button);
      $("#search_button").append(search_icon);
      $("#search_wrap").append(search_bar);
      $("#search_bar").change(function() {
        if (Page.history_state["url"]) {
          if (Page.history_state["url"].indexOf("Home") > -1) {
            return video_lister.get_query();
          } else if (Page.history_state["url"].indexOf("Latest") > -1) {
            return video_lister.get_query();
          } else if (Page.history_state["url"].indexOf("Channel") > -1) {
            return video_lister.get_query();
          } else if (Page.history_state["url"].indexOf("Box") > -1) {
            return videobox.get_query();
          } else if (Page.history_state["url"].indexOf("Seed") > -1) {
            return seedbox.get_query();
          } else {
            return Page.set_url("?Home");
          }
        } else {
          return video_lister.get_query();
        }
      });
      $("#usr_channel_link").on("click", function() {
        return Page.nav(this.href);
      });
      $("#upload_link").on("click", function() {
        return Page.nav(this.href);
      });
      $("#site_logo").on("click", function() {
        return Page.nav(this.href);
      });
      $("#main_menu").on("click", function() {
        return $("#nav").toggle();
      });
      $("#search_toggle").on("click", function(e) {
        $("#search").toggle();
        $("#search").attr("class", "search");
        return e.preventDefault();
      });
      return $("#search_swap").on("click", function(e) {
        $("#search").toggle();
        $("#search").attr("class", "search_nomove");
        return e.preventDefault();
      });
    };

    return top_menuify;

  })();

  top_menuify = new top_menuify();

  seedbox = (function() {
    function seedbox() {
      this.render = bind(this.render, this);
      this.update = bind(this.update, this);
      this.delete_optional_files = bind(this.delete_optional_files, this);
      this.get_query = bind(this.get_query, this);
      this.flush = bind(this.flush, this);
      this.more_videos_yes = bind(this.more_videos_yes, this);
      this.max_videos = 15;
      this.query_string = "";
      this.counter = 1;
    }

    seedbox.prototype.more_videos_yes = function() {
      this.max_videos += 15;
      this.counter = 1;
      return this.update();
    };

    seedbox.prototype.flush = function(mode) {
      if (mode === "all") {
        this.max_videos = 15;
        return this.counter = 1;
      } else {
        return this.counter = 1;
      }
    };

    seedbox.prototype.get_query = function() {
      var query_value;
      query_value = $("#search_bar").val();
      this.query_string = query_value;
      this.flush("all");
      return this.update();
    };

    seedbox.prototype.delete_optional_files = function(form) {
      var bigfile_row, bigfiles, i, l, len, len1, m, value_row, values;
      values = [];
      bigfiles = form.bigfile;
      for (i = l = 0, len = bigfiles.length; l < len; i = ++l) {
        bigfile_row = bigfiles[i];
        if (bigfile_row.checked) {
          values.push(bigfile_row.value);
        }
      }
      for (i = m = 0, len1 = values.length; m < len1; i = ++m) {
        value_row = values[i];
        Page.cmd("optionalFileDelete", value_row);
        Page.cmd("optionalFileDelete", value_row + ".piecemap.msgpack");
        console.log("[KopyKate: Deleted optional file " + value_row + "]");
      }
      this.flush("all");
      return this.update();
    };

    seedbox.prototype.update = function() {
      var query, query_string_no_space;
      console.log("[KopyKate: Retrieving seedbox]");
      query_string_no_space = this.query_string.replace(/\s/g, "%");
      query = "WHERE file.title LIKE '%" + query_string_no_space + "%'";
      return Page.cmd("dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) " + query + " ORDER BY date_added DESC"], (function(_this) {
        return function(res1) {
          return Page.cmd("optionalFileList", {
            filter: "downloaded",
            limit: 1000
          }, function(res2) {
            var checkbox_label, checkbox_label_id, checkmark_span, file_name, file_peer, file_seed, file_seed_no_null, file_size, i, j, l, len, megabytes, optional_path, results, row1, row2, text_display, video_brief, video_checkbox, video_checkbox_id, video_date_added, video_image, video_link, video_link_id, video_name, video_row, video_row_id, video_size, video_string, video_title, video_user_address;
            $("#seedbox_actual_list").html("");
            $("#more_videos").html("<div class='more_videos text'>More videos!</div>");
            results = [];
            for (i = l = 0, len = res1.length; l < len; i = ++l) {
              row1 = res1[i];
              results.push((function() {
                var len1, m, results1;
                results1 = [];
                for (j = m = 0, len1 = res2.length; m < len1; j = ++m) {
                  row2 = res2[j];
                  optional_path = row2['inner_path'];
                  file_name = row2['inner_path'].replace(/.*\//, "");
                  file_seed = row2['peer_seed'];
                  file_peer = row2['peer'];
                  file_size = row2['bytes_downloaded'];
                  video_name = row1['file_name'];
                  video_title = row1['title'];
                  video_brief = row1['description'];
                  video_image = row1['image_link'];
                  video_date_added = row1['date_added'];
                  video_user_address = row1['directory'];
                  video_size = row1['size'];
                  if (video_name === file_name && this.counter < this.max_videos) {
                    file_seed_no_null = file_seed || 0;
                    if (file_size >= video_size) {
                      text_display = "DONE " + Text.formatSize(video_size);
                    } else {
                      text_display = Text.formatSize(file_size) + " / " + Text.formatSize(video_size);
                    }
                    video_string = video_date_added + "_" + video_user_address;
                    video_row_id = "seedrow_" + this.counter;
                    video_link_id = video_string;
                    video_row = $("<div></div>");
                    video_row.attr("id", video_row_id);
                    video_row.attr("class", "seedbox_row");
                    video_checkbox_id = "vcheck_" + this.counter;
                    video_checkbox = $("<input>");
                    video_checkbox.attr("id", video_checkbox_id);
                    video_checkbox.attr("type", "checkbox");
                    video_checkbox.attr("name", "bigfile");
                    video_checkbox.attr("value", optional_path);
                    video_checkbox.attr("style", "display: none");
                    checkbox_label_id = "vcheck_label_" + this.counter;
                    checkbox_label = $("<label></label>");
                    checkbox_label.attr("id", checkbox_label_id);
                    checkbox_label.attr("class", "checkbox_container");
                    checkmark_span = $("<span></span>");
                    checkmark_span.attr("class", "checkmark");
                    megabytes = $("<span></span>");
                    megabytes.attr("class", "video_link seedbox_bytes");
                    megabytes.text(text_display);
                    video_link_id = "link_" + video_string;
                    video_link = $("<a></a>");
                    video_link.attr("id", video_link_id);
                    video_link.attr("class", "video_link edit_link");
                    video_link.attr("href", "?Video=" + video_string);
                    video_link.text(video_title);
                    $("#seedbox_actual_list").append(video_row);
                    $("#" + video_row_id).append(checkbox_label);
                    $("#" + checkbox_label_id).append(video_checkbox);
                    $("#" + checkbox_label_id).append(checkmark_span);
                    $("#" + video_row_id).append(megabytes);
                    $("#" + video_row_id).append(video_link);
                    $("#" + video_link_id).on("click", function() {
                      return Page.nav(this.href);
                    });
                    results1.push(this.counter = this.counter + 1);
                  } else {
                    results1.push(void 0);
                  }
                }
                return results1;
              }).call(_this));
            }
            return results;
          });
        };
      })(this));
    };

    seedbox.prototype.render = function() {
      var checkbox_buttons, delete_optional_files, footer, more_videos, more_videos_yes, query_value, seedbox_actual_list, seedbox_div, seedbox_form;
      query_value = $("#search_bar").val();
      this.query_string = query_value;
      seedbox_div = $("<div></div>");
      seedbox_div.attr("id", "seedbox");
      seedbox_div.attr("class", "seedbox");
      seedbox_form = $("<form></form>");
      seedbox_form.attr("id", "seedbox_form");
      seedbox_actual_list = $("<div></div>");
      seedbox_actual_list.attr("id", "seedbox_actual_list");
      checkbox_buttons = $("<div></div>");
      checkbox_buttons.attr("id", "checkbox_buttons");
      footer = $("<div></div>");
      footer.attr("id", "footer");
      footer.attr("class", "footer");
      more_videos = $("<a></a>");
      more_videos.attr("id", "more_videos");
      more_videos.attr("class", "more_videos");
      more_videos.attr("href", "javascript:void(0)");
      $("#main").attr("class", "main");
      $("#main").html("");
      donav();
      $("#main").append(seedbox_div);
      $("#seedbox").append(seedbox_form);
      $("#seedbox_form").append(checkbox_buttons);
      $("#checkbox_buttons").html("<label class='file_button' for='deselect_seed'>DESELECT</label><label class='file_button' for='delete_seed'>DELETE</label><input type='reset' id='deselect_seed' value='Deselect' style='display: none'><input type='submit' id='delete_seed' value='Delete' style='display: none'>");
      $("#seedbox_form").append(seedbox_actual_list);
      $("#main").append(footer);
      $("#footer").append(more_videos);
      $("#more_videos").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
      more_videos_yes = this.more_videos_yes;
      $("#more_videos").on("click", function() {
        $("#more_videos").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
        return more_videos_yes();
      });
      delete_optional_files = this.delete_optional_files;
      $("#seedbox_form").on("submit", function(e) {
        delete_optional_files(this);
        return e.preventDefault();
      });
      return this.update();
    };

    return seedbox;

  })();

  seedbox = new seedbox();

  uploader = (function() {
    function uploader() {
      this.render = bind(this.render, this);
      this.upload_file = bind(this.upload_file, this);
      this.upload_done = bind(this.upload_done, this);
      this.register_upload = bind(this.register_upload, this);
      this.check_content_json = bind(this.check_content_json, this);
      var file_info;
      file_info = {};
    }

    uploader.prototype.check_content_json = function(cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          var optional_pattern;
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null) {
            res = {};
          }
          optional_pattern = "(?!data.json)";
          if (res.optional === optional_pattern) {
            cb();
          }
          res.optional = optional_pattern;
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    uploader.prototype.register_upload = function(title, type, description, image_link, file_name, file_size, date_added, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null || res === void 0) {
            res = {};
          }
          if (res.file === null || res.file === void 0) {
            res.file = {};
          }
          res.file[file_name] = {
            title: title,
            type: type,
            description: description,
            image_link: image_link,
            size: file_size,
            date_added: date_added
          };
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    uploader.prototype.upload_done = function(files, date_added, user_address) {
      Page.set_url("?Editor=" + date_added + "_" + user_address);
      return console.log("Upload done!", files);
    };

    uploader.prototype.upload_file = function(files) {
      var file_info, ref2, register_upload, time_stamp, upload_done;
      time_stamp = Math.floor(new Date() / 1000);
      console.log("Uploading: " + files.name);
      if (files.size > 2000 * 1024 * 1024) {
        Page.cmd("wrapperNotification", ["info", "Maximum file size on this site: 2000MB"]);
        $("#uploader_title").html("<span>Error!</span>");
        return false;
      }
      if (files.size < 0.1 * 1024 * 1024) {
        Page.cmd("wrapperNotification", ["info", "Minimum file size: 100kb"]);
        $("#uploader_title").html("<span>Error!</span>");
        return false;
      }
      if ((ref2 = files.name.split(".").slice(-1)[0]) !== "mp4" && ref2 !== "m4v" && ref2 !== "webm") {
        Page.cmd("wrapperNotification", ["info", "Only mp4, m4v and webm allowed on this site!"]);
        $("#uploader_title").html("<span>Error!</span>");
        debugger;
        return false;
      }
      file_info = this.file_info = {};
      register_upload = this.register_upload;
      upload_done = this.upload_done;
      return this.check_content_json((function(_this) {
        return function(res) {
          var file_name;
          file_name = time_stamp + "-" + files.name;
          return Page.cmd("bigfileUploadInit", ["data/users/" + Page.site_info.auth_address + "/" + file_name, files.size], function(init_res) {
            var formdata, req;
            formdata = new FormData();
            formdata.append(file_name, files);
            req = new XMLHttpRequest();
            this.req = req;
            file_info = {
              size: files.size,
              name: file_name,
              type: files.type,
              url: init_res.url
            };
            req.upload.addEventListener("loadstart", function(progress) {
              console.log("loadstart", arguments);
              return file_info.started = progress.timeStamp;
            });
            req.upload.addEventListener("loadend", function() {
              var default_description, default_image, default_type;
              default_type = "720p";
              default_image = "img/video_empty.png";
              default_description = "Write description here!";
              console.log("loadend", arguments);
              file_info.status = "done";
              return register_upload(files.name, default_type, default_description, default_image, init_res.file_relative_path, files.size, time_stamp, function(res) {
                return Page.cmd("siteSign", {
                  inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
                }, function(res) {
                  return Page.cmd("sitePublish", {
                    inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                    "sign": false
                  }, function(res) {
                    return upload_done(files, time_stamp, Page.site_info.auth_address);
                  });
                });
              });
            });
            req.upload.addEventListener("progress", function(progress) {
              file_info.speed = 1000 * progress.loaded / (progress.timeStamp - file_info.started);
              file_info.percent = progress.loaded / progress.total;
              file_info.loaded = progress.loaded;
              return file_info.updated = progress.timeStamp;
            });
            req.addEventListener("load", function() {
              return console.log("load", arguments);
            });
            req.addEventListener("error", function() {
              return console.log("error", arguments);
            });
            req.addEventListener("abort", function() {
              return console.log("abort", arguments);
            });
            req.withCredentials = true;
            req.open("POST", init_res.url);
            return req.send(formdata);
          });
        };
      })(this));
    };

    uploader.prototype.render = function() {
      var upload_container, upload_file, uploader_input, uploader_input_label, uploader_title, video_uploader;
      video_uploader = $("<div></div>");
      video_uploader.attr("id", "uploader");
      video_uploader.attr("class", "uploader");
      uploader_title = $("<div></div>");
      uploader_title.attr("id", "uploader_title");
      uploader_title.attr("class", "uploader_title");
      uploader_title.text("Upload your video here!");
      upload_container = $("<div></div>");
      upload_container.attr("id", "upload_container");
      upload_container.attr("class", "upload_container");
      uploader_input = $("<input>");
      uploader_input.attr("id", "uploader_input");
      uploader_input.attr("class", "uploader_input");
      uploader_input.attr("name", "uploader_input");
      uploader_input.attr("type", "file");
      uploader_input_label = $("<label></label>");
      uploader_input_label.attr("id", "uploader_input_label");
      uploader_input_label.attr("class", "uploader_input_label");
      uploader_input_label.attr("for", "uploader_input");
      upload_file = this.upload_file;
      $("#main").attr("class", "main_nomenu");
      $("#main").html("");
      donav();
      $("#main").append(video_uploader);
      $("#uploader").append(uploader_title);
      $("#uploader").append(upload_container);
      $("#upload_container").append(uploader_input);
      $("#upload_container").append(uploader_input_label);
      return $(document).on("change", ".uploader_input", function() {
        if (Page.site_info.cert_user_id) {
          $("#uploader_title").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
          console.log("[KopyKate: Uploading file.]");
          upload_file(this.files[0]);
        } else {
          Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
            return function(res) {
              $("#uploader_title").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
              console.log("KopyKate: Uploading file.");
              return upload_file(_this.files[0]);
            };
          })(this));
        }
        return false;
      });
    };

    return uploader;

  })();

  uploader = new uploader();

  videobox = (function() {
    function videobox() {
      this.render = bind(this.render, this);
      this.update = bind(this.update, this);
      this.delete_video = bind(this.delete_video, this);
      this.delete_from_data_json = bind(this.delete_from_data_json, this);
      this.delete_from_content_json = bind(this.delete_from_content_json, this);
      this.get_query = bind(this.get_query, this);
      this.flush = bind(this.flush, this);
      this.more_videos_yes = bind(this.more_videos_yes, this);
      this.max_videos = 15;
      this.query_string = "";
      this.counter = 1;
    }

    videobox.prototype.more_videos_yes = function() {
      this.max_videos += 15;
      this.counter = 1;
      return this.update();
    };

    videobox.prototype.flush = function(mode) {
      if (mode === "all") {
        this.max_videos = 15;
        return this.counter = 1;
      } else {
        return this.counter = 1;
      }
    };

    videobox.prototype.get_query = function() {
      var query_value;
      query_value = $("#search_bar").val();
      this.query_string = query_value;
      this.flush("all");
      return this.update();
    };

    videobox.prototype.delete_from_content_json = function(inner_path, cb) {
      var content_inner_path, video_directory, video_name;
      video_directory = inner_path.split("/")[2];
      video_name = inner_path.split("/")[3];
      content_inner_path = "data/users/" + video_directory + "/content.json";
      console.log("deleting from content.json at directory: " + video_directory + "and file: " + video_name);
      return Page.cmd("fileGet", content_inner_path, (function(_this) {
        return function(res) {
          var data;
          data = JSON.parse(res);
          delete data["files_optional"][video_name];
          delete data["files_optional"][video_name + ".piecemap.msgpack"];
          return Page.cmd("fileWrite", [content_inner_path, Text.fileEncode(data)], function(res) {
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    videobox.prototype.delete_from_data_json = function(inner_path, cb) {
      var data_inner_path, video_directory, video_name;
      video_directory = inner_path.split("/")[2];
      video_name = inner_path.split("/")[3];
      data_inner_path = "data/users/" + video_directory + "/data.json";
      console.log("deleting from data.json at directory: " + video_directory + "and file: " + video_name);
      return Page.cmd("fileGet", data_inner_path, (function(_this) {
        return function(res) {
          var data;
          data = JSON.parse(res);
          delete data["file"][video_name];
          delete data["file"][video_name + ".piecemap.msgpack"];
          return Page.cmd("fileWrite", [data_inner_path, Text.fileEncode(data)], function(res) {
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    videobox.prototype.delete_video = function(video) {
      var content_inner_path, delete_from_content_json, delete_from_data_json, this_flush, this_update, video_directory;
      delete_from_data_json = this.delete_from_data_json;
      delete_from_content_json = this.delete_from_content_json;
      video_directory = video.split("/")[2];
      content_inner_path = "data/users/" + video_directory + "/content.json";
      this_flush = this.flush;
      this_update = this.update;
      return Page.cmd("wrapperConfirm", ["Are you sure?", "Delete"], (function(_this) {
        return function() {
          return delete_from_content_json(video, function(res) {
            if (!res === "ok") {
              return cb(false);
            }
            return delete_from_data_json(video, function(res) {
              if (res === "ok") {
                Page.cmd("sitePublish", {
                  "inner_path": content_inner_path
                });
                console.log("[KopyKate: Deleted video " + video + "]");
                this_flush("all");
                return this_update();
              }
            });
          });
        };
      })(this));
    };

    videobox.prototype.update = function() {
      var query, query_string_no_space;
      console.log("[KopyKate: Retrieving videobox]");
      query_string_no_space = this.query_string.replace(/\s/g, "%");
      query = "WHERE file.title LIKE '%" + query_string_no_space + "%'";
      return Page.cmd("dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) " + query + " ORDER BY date_added DESC"], (function(_this) {
        return function(res1) {
          return Page.cmd("optionalFileList", {
            filter: "",
            limit: 1000
          }, function(res2) {
            var delete_video, file_name, file_peer, file_seed, file_seed_no_null, i, j, l, len, optional_path, results, row1, row2, video_brief, video_date_added, video_delete_link, video_delete_link_id, video_edit_link, video_edit_link_id, video_image, video_link, video_link_id, video_name, video_row, video_row_id, video_string, video_title, video_user_address;
            $("#videobox").html("");
            $("#more_videos").html("<div class='more_videos text'>More videos!</div>");
            results = [];
            for (i = l = 0, len = res1.length; l < len; i = ++l) {
              row1 = res1[i];
              results.push((function() {
                var len1, m, results1;
                results1 = [];
                for (j = m = 0, len1 = res2.length; m < len1; j = ++m) {
                  row2 = res2[j];
                  optional_path = row2['inner_path'];
                  file_name = row2['inner_path'].replace(/.*\//, "");
                  file_seed = row2['peer_seed'];
                  file_peer = row2['peer'];
                  video_name = row1['file_name'];
                  video_title = row1['title'];
                  video_brief = row1['description'];
                  video_image = row1['image_link'];
                  video_date_added = row1['date_added'];
                  video_user_address = row1['directory'];
                  if (video_name === file_name && video_user_address === Page.site_info.auth_address && this.counter < this.max_videos) {
                    file_seed_no_null = file_seed || 0;
                    video_string = video_date_added + "_" + video_user_address;
                    video_row_id = "boxrow_" + this.counter;
                    video_link_id = video_string;
                    video_row = $("<div></div>");
                    video_row.attr("id", video_row_id);
                    video_row.attr("class", "videobox_row");
                    video_edit_link_id = "edit_" + this.counter;
                    video_edit_link = $("<a></a>");
                    video_edit_link.attr("id", video_edit_link_id);
                    video_edit_link.attr("class", "editor_button");
                    video_edit_link.attr("href", "?Editor=" + video_string);
                    video_delete_link_id = "delete_" + this.counter;
                    video_delete_link = $("<button></button>");
                    video_delete_link.attr("id", video_delete_link_id);
                    video_delete_link.attr("class", "delete_button");
                    video_delete_link.attr("value", optional_path);
                    video_link_id = "vlink_" + video_string;
                    video_link = $("<a></a>");
                    video_link.attr("id", video_link_id);
                    video_link.attr("class", "video_link edit_link_alt");
                    video_link.attr("href", "?Video=" + video_string);
                    video_link.text(video_title);
                    $("#videobox").append(video_row);
                    $("#" + video_row_id).append(video_delete_link);
                    $("#" + video_row_id).append(video_edit_link);
                    $("#" + video_row_id).append(video_link);
                    delete_video = this.delete_video;
                    $("#" + video_delete_link_id).on("click", function() {
                      return delete_video(this.value);
                    });
                    $("#" + video_edit_link_id).on("click", function() {
                      return Page.nav(this.href);
                    });
                    $("#" + video_link_id).on("click", function() {
                      return Page.nav(this.href);
                    });
                    results1.push(this.counter = this.counter + 1);
                  } else {
                    results1.push(void 0);
                  }
                }
                return results1;
              }).call(_this));
            }
            return results;
          });
        };
      })(this));
    };

    videobox.prototype.render = function() {
      var footer, more_videos, more_videos_yes, query_value, videobox_div;
      query_value = $("#search_bar").val();
      this.query_string = query_value;
      videobox_div = $("<div></div>");
      videobox_div.attr("id", "videobox");
      videobox_div.attr("class", "videobox");
      footer = $("<div></div>");
      footer.attr("id", "footer");
      footer.attr("class", "footer");
      more_videos = $("<a></a>");
      more_videos.attr("id", "more_videos");
      more_videos.attr("class", "more_videos");
      more_videos.attr("href", "javascript:void(0)");
      $("#main").attr("class", "main");
      $("#main").html("");
      donav();
      $("#main").append(videobox_div);
      $("#main").append(footer);
      $("#footer").append(more_videos);
      $("#more_videos").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
      more_videos_yes = this.more_videos_yes;
      $("#more_videos").on("click", function() {
        $("#more_videos").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
        return more_videos_yes();
      });
      return this.update();
    };

    return videobox;

  })();

  videobox = new videobox();

  video_lister = (function() {
    function video_lister() {
      this.render = bind(this.render, this);
      this.update = bind(this.update, this);
      this.query_database = bind(this.query_database, this);
      this.print_row = bind(this.print_row, this);
      this.seed_click = bind(this.seed_click, this);
      this.link_click = bind(this.link_click, this);
      this.linkify = bind(this.linkify, this);
      this.get_query = bind(this.get_query, this);
      this.flush = bind(this.flush, this);
      this.more_videos_yes = bind(this.more_videos_yes, this);
      this.max_videos = 15;
      this.query_string = "";
      this.counter = 1;
      this.order_by = "";
    }

    video_lister.prototype.more_videos_yes = function() {
      this.max_videos += 15;
      this.counter = 1;
      return this.update();
    };

    video_lister.prototype.flush = function(mode) {
      if (mode === "all") {
        this.max_videos = 15;
        return this.counter = 1;
      } else {
        return this.counter = 1;
      }
    };

    video_lister.prototype.get_query = function() {
      var query_value;
      query_value = $("#search_bar").val();
      this.query_string = query_value;
      this.flush("all");
      return this.update();
    };

    video_lister.prototype.linkify = function(to, display, tag_class, tag_id, tag_style) {
      var link;
      if (tag_class == null) {
        tag_class = "";
      }
      if (tag_id == null) {
        tag_id = "";
      }
      if (tag_style == null) {
        tag_style = "";
      }
      link = "<a id='" + tag_id + "' href='?Video=" + to + "'";
      if (tag_class && tag_class !== "") {
        link += " class='" + tag_class + "'";
      }
      if (tag_style && tag_style !== "") {
        link += " style='" + tag_style + "'";
      }
      if (tag_id && tag_id !== "") {
        link += " style='" + tag_id + "'";
      }
      link += ">" + display + "</a>";
      return link;
    };

    video_lister.prototype.link_click = function() {
      return console.log("Prevented page refresh...");
    };

    video_lister.prototype.seed_click = function(inner_path) {
      Page.cmd("fileNeed", inner_path + "|all", (function(_this) {
        return function(res) {
          return console.log(res);
        };
      })(this));
      return false;
    };

    video_lister.prototype.print_row = function(item) {
      var file_is_downloading, file_name, file_peer, file_seed, file_seed_no_null, flush_page, full_channel_name, optional_inner_path, optional_size, seed_button_display, seed_click, size_display, update_page, user_info, user_info_id, video_brief, video_channel_name, video_date_added, video_description, video_image, video_info, video_info_id, video_link, video_link_id, video_name, video_peers, video_peers_id, video_peers_info, video_row, video_row_id, video_seed_button, video_seed_button_id, video_size, video_string, video_thumbnail, video_thumbnail_id, video_title, video_user_address;
      optional_inner_path = item.inner_path;
      file_name = item.inner_path.replace(/.*\//, "");
      file_seed = item.stats.peer_seed;
      file_peer = item.stats.peer;
      file_is_downloading = item.stats.is_downloading;
      optional_size = item.stats.bytes_downloaded;
      video_name = item.file_name;
      video_title = item.title;
      video_size = item.size;
      video_brief = item.description;
      video_image = item.image_link;
      video_date_added = item.date_added;
      video_user_address = item.directory;
      full_channel_name = item.cert_user_id;
      video_channel_name = item.cert_user_id.split("@")[0];
      file_seed_no_null = file_seed || 0;
      if (optional_size >= video_size) {
        size_display = Text.formatSize(video_size);
        seed_button_display = false;
      } else if (file_is_downloading) {
        size_display = Text.formatSize(optional_size) + " / " + Text.formatSize(video_size);
        seed_button_display = false;
      } else if ((0 < optional_size && optional_size < video_size)) {
        size_display = Text.formatSize(optional_size) + " / " + Text.formatSize(video_size);
        seed_button_display = true;
      } else {
        size_display = Text.formatSize(video_size);
        seed_button_display = true;
      }
      video_string = video_date_added + "_" + video_user_address;
      video_row_id = "row_" + this.counter;
      video_link_id = video_string;
      video_row = $("<div></div>");
      video_row.attr("id", video_row_id);
      video_row.attr("class", "video_row");
      video_thumbnail_id = "thumb_" + this.counter;
      video_thumbnail = $("<a></a>");
      video_thumbnail.attr("id", video_thumbnail_id);
      video_thumbnail.attr("class", "video_thumbnail");
      video_thumbnail.css("background-image", "url('" + video_image + "')");
      video_thumbnail.attr("href", "?Video=" + video_string);
      video_info_id = "info_" + this.counter;
      video_info = $("<div></div>");
      video_info.attr("id", video_info_id);
      video_info.attr("class", "video_info");
      video_link = this.linkify(video_string, video_title, "video_link", video_string);
      video_peers_id = "peer_" + this.counter;
      video_peers = $("<div></div>");
      video_peers.attr("id", video_peers_id);
      video_peers.attr("class", "video_brief");
      video_seed_button_id = "seed_" + this.counter;
      video_seed_button = $("<button></button>");
      video_seed_button.attr("id", video_seed_button_id);
      video_seed_button.attr("class", "video_seed_button");
      video_seed_button.attr("value", optional_inner_path);
      video_seed_button.text("+ SEED");
      video_peers_info = $("<span> Peers " + file_seed_no_null + " / " + file_peer + " - " + size_display + "</span>");
      user_info_id = "user_" + this.counter;
      user_info = $("<a></a>");
      user_info.attr("id", user_info_id);
      user_info.attr("class", "video_brief channel_link");
      user_info.attr("href", "?Channel=" + full_channel_name);
      user_info.text(video_channel_name.charAt(0).toUpperCase() + video_channel_name.slice(1) + " - " + Time.since(video_date_added));
      video_description = $("<div></div>");
      video_description.attr("id", "video_brief");
      video_description.attr("class", "video_brief");
      video_description.text(video_brief);
      $("#video_list").append(video_row);
      $("#" + video_row_id).append(video_thumbnail);
      $("#" + video_row_id).append(video_info);
      $("#" + video_info_id).append(video_link);
      $("#" + video_info_id).append(user_info);
      $("#" + video_info_id).append(video_peers);
      if (seed_button_display) {
        $("#" + video_peers_id).append(video_seed_button);
      }
      $("#" + video_peers_id).append(video_peers_info);
      $("#" + video_info_id).append(video_description);
      $("#" + video_link_id).text(video_title);
      $("#" + video_link_id).on("click", function() {
        return Page.nav(this.href);
      });
      $("#" + video_thumbnail_id).on("click", function() {
        return Page.nav(this.href);
      });
      $("#" + user_info_id).on("click", function() {
        return Page.nav(this.href);
      });
      seed_click = this.seed_click;
      flush_page = this.flush;
      update_page = this.update;
      $("#" + video_seed_button_id).on("click", function() {
        console.log("Seeding: " + this.value);
        seed_click(this.value);
        flush_page();
        return update_page();
      });
      return this.counter = this.counter + 1;
    };

    video_lister.prototype.query_database = function(query, file_limit, order_actual) {
      var query_full;
      query_full = "SELECT * FROM file LEFT JOIN json USING (json_id) " + query + " ORDER BY date_added DESC" + file_limit;
      console.log(query_full);
      return Page.cmd("dbQuery", [query_full], (function(_this) {
        return function(res1) {
          return Page.cmd("optionalFileList", order_actual, function(res2) {
            var base1, base2, base3, i, j, k, l, len, len1, len2, m, n, optional_name, optional_piecemap, results, row1, row2, row3, stats;
            $("#video_list").html("");
            $("#more_videos").html("<div class='more_videos text'>More videos!</div>");
            stats = {};
            for (i = l = 0, len = res2.length; l < len; i = ++l) {
              row2 = res2[i];
              stats[row2.inner_path] = row2;
            }
            for (j = m = 0, len1 = res1.length; m < len1; j = ++m) {
              row1 = res1[j];
              optional_piecemap = optional_name + ".piecemap.msgpack";
              optional_name = row2.inner_path.replace(/.*\//, "");
              row1.inner_path = "data/users/" + row1.directory + "/" + row1.file_name;
              row1.stats = stats[row1.inner_path];
              if (row1.stats == null) {
                row1.stats = {};
              }
              if (row1.stats == null) {
                row1.stats = {};
              }
              if ((base1 = row1.stats).peer == null) {
                base1.peer = 0;
              }
              if ((base2 = row1.stats).peer_seed == null) {
                base2.peer_seed = 0;
              }
              if ((base3 = row1.stats).peer_leech == null) {
                base3.peer_leech = 0;
              }
            }
            if (i === res2.length && j === res1.length) {
              if (_this.order_by === "peer") {
                res1.sort(function(a, b) {
                  return Math.min(5, b.stats["peer_seed"]) + b.stats["peer"] - a.stats["peer"] - Math.min(5, a.stats["peer_seed"]);
                });
              }
              results = [];
              for (k = n = 0, len2 = res1.length; n < len2; k = ++n) {
                row3 = res1[k];
                if (_this.counter < _this.max_videos) {
                  results.push(_this.print_row(row3));
                } else {
                  results.push(void 0);
                }
              }
              return results;
            }
          });
        };
      })(this));
    };

    video_lister.prototype.update = function() {
      var channel_name, file_limit, init_url, max_videos, order_actual, query, query_database, query_string_no_space, query_timeout;
      console.log("[KopyKate: Updating video list]");
      query = "";
      query_database = this.query_database;
      max_videos = this.max_videos;
      if (this.order_by === "peer") {
		console.log("-----------------peer");
		console.log(Page.address)
        order_actual = {
          orderby: "peer DESC",
          filter: "",
          address: "1tvshuFLkoockzDmvmgmoDoXYe7G6GWxL",
          limit: 1000
        };
        query_string_no_space = this.query_string.replace(/\s/g, "%");
        query = "WHERE file.title LIKE '%" + query_string_no_space + "%'";
        file_limit = "";
        return query_database(query, file_limit, order_actual);
      } else if (this.order_by === "channel") {
        init_url = Page.history_state["url"];
        channel_name = init_url.split("Channel=")[1];
		console.log("-----------------");
		console.log(this);
        order_actual = {
          filter: "",
          address: "1tvshuFLkoockzDmvmgmoDoXYe7G6GWxL",
          limit: 1000
        };
        query_string_no_space = this.query_string.replace(/\s/g, "%");
        query = "WHERE cert_user_id='" + channel_name + "' AND file.title LIKE '%" + query_string_no_space + "%'";
        file_limit = " LIMIT " + max_videos + "";
        return query_database(query, file_limit, order_actual);
      } else if (this.order_by === "subbed") {
        query_string_no_space = this.query_string.replace(/\s/g, "%");
        return query_timeout = setTimeout(function() {
          if (Page.site_info) {
            if (Page.site_info.auth_address) {
              clearTimeout(query_timeout);
              return Page.cmd("dbQuery", ["SELECT * FROM subscription LEFT JOIN json USING (json_id) WHERE directory='" + Page.site_info.auth_address + "'"], (function(_this) {
                return function(res0) {
                  var i, l, len, row0;
                  query = "WHERE ";
                  i = 0;
                  for (i = l = 0, len = res0.length; l < len; i = ++l) {
                    row0 = res0[i];
                    if (i < 1) {
                      query += "directory='" + row0.user_address + "'";
                    } else {
                      query += " OR directory='" + row0.user_address + "'";
                    }
                  }
                  if (i === res0.length) {
                    order_actual = {
                      filter: "",
                      address: "1tvshuFLkoockzDmvmgmoDoXYe7G6GWxL",
                      limit: 1000
                    };
                    file_limit = " LIMIT " + max_videos + "";
                    return query_database(query, file_limit, order_actual);
                  }
                };
              })(this));
            }
          }
        }, 1000);
      } else {
        order_actual = {
          filter: "",
          address: "1tvshuFLkoockzDmvmgmoDoXYe7G6GWxL",
          limit: 1000
        };
        query_string_no_space = this.query_string.replace(/\s/g, "%");
        query = "WHERE file.title LIKE '%" + query_string_no_space + "%'";
        file_limit = " LIMIT " + max_videos + "";
        return query_database(query, file_limit, order_actual);
      }
    };

    video_lister.prototype.render = function() {
      var footer, more_videos, more_videos_yes, query_value, video_list;
      query_value = $("#search_bar").val();
      this.query_string = query_value;
      video_list = $("<div></div>");
      video_list.attr("id", "video_list");
      video_list.attr("class", "video_list");
      footer = $("<div></div>");
      footer.attr("id", "footer");
      footer.attr("class", "footer");
      more_videos = $("<a></a>");
      more_videos.attr("id", "more_videos");
      more_videos.attr("class", "more_videos");
      more_videos.attr("href", "javascript:void(0)");
      $("#main").attr("class", "main");
      $("#main").html("");
      donav();
      $("#main").append(video_list);
      $("#main").append(footer);
      $("#footer").append(more_videos);
      $("#more_videos").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
      more_videos_yes = this.more_videos_yes;
      $("#more_videos").on("click", function() {
        $("#more_videos").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
        return more_videos_yes();
      });
      return this.update();
    };

    return video_lister;

  })();

  video_lister = new video_lister();

  video_playing = (function() {
    function video_playing() {
      this.render = bind(this.render, this);
      this.render_player = bind(this.render_player, this);
      this.render_video = bind(this.render_video, this);
      this.load_comments = bind(this.load_comments, this);
      this.load_likes = bind(this.load_likes, this);
      this.load_report = bind(this.load_report, this);
      this.load_subs = bind(this.load_subs, this);
      this.load_related = bind(this.load_related, this);
      this.write_comment = bind(this.write_comment, this);
      this.add_report = bind(this.add_report, this);
      this.add_vote = bind(this.add_vote, this);
      this.subscribe = bind(this.subscribe, this);
      this.register_report = bind(this.register_report, this);
      this.register_vote = bind(this.register_vote, this);
      this.register_comment = bind(this.register_comment, this);
      this.register_subscription = bind(this.register_subscription, this);
      this.delete_comment = bind(this.delete_comment, this);
      this.delete_subscription = bind(this.delete_subscription, this);
      this.delete_like = bind(this.delete_like, this);
      this.delete_report = bind(this.delete_report, this);
      this.delete_sub_from_data_json = bind(this.delete_sub_from_data_json, this);
      this.delete_like_from_data_json = bind(this.delete_like_from_data_json, this);
      this.delete_report_from_data_json = bind(this.delete_report_from_data_json, this);
      this.delete_from_data_json = bind(this.delete_from_data_json, this);
      this.video_started = 0;
      this.player_timeout;
    }

    video_playing.prototype.delete_from_data_json = function(file_uri, cid, com_body, com_date_added, cb) {
      var data_inner_path;
      data_inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      console.log("deleting comment from data.json at directory: " + Page.site_info.auth_address);
      return Page.cmd("fileGet", data_inner_path, (function(_this) {
        return function(res) {
          var comment_count, data, i, l, len, ref2;
          data = JSON.parse(res);
          console.log(data["comment"][file_uri]);
          comment_count = 0;
          ref2 = data["comment"][file_uri];
          for (l = 0, len = ref2.length; l < len; l++) {
            i = ref2[l];
            console.log("Comment row: " + data["comment"][file_uri][comment_count]);
            if (com_date_added.toString().indexOf(data["comment"][file_uri][comment_count]["date_added"]) !== -1) {
              data["comment"][file_uri].splice(comment_count, 1);
              break;
            }
            comment_count++;
          }
          return Page.cmd("fileWrite", [data_inner_path, Text.fileEncode(data)], function(res) {
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    video_playing.prototype.delete_report_from_data_json = function(file_uri, cb) {
      var data_inner_path;
      data_inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", data_inner_path, (function(_this) {
        return function(res) {
          var data;
          data = JSON.parse(res);
          delete data["file_report"][file_uri];
          return Page.cmd("fileWrite", [data_inner_path, Text.fileEncode(data)], function(res) {
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    video_playing.prototype.delete_like_from_data_json = function(file_uri, cb) {
      var data_inner_path;
      data_inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", data_inner_path, (function(_this) {
        return function(res) {
          var data;
          data = JSON.parse(res);
          delete data["file_vote"][file_uri];
          return Page.cmd("fileWrite", [data_inner_path, Text.fileEncode(data)], function(res) {
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    video_playing.prototype.delete_sub_from_data_json = function(user_directory, cb) {
      var data_inner_path;
      data_inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", data_inner_path, (function(_this) {
        return function(res) {
          var data;
          data = JSON.parse(res);
          delete data["subscription"][user_directory];
          return Page.cmd("fileWrite", [data_inner_path, Text.fileEncode(data)], function(res) {
            return typeof cb === "function" ? cb(res) : void 0;
          });
        };
      })(this));
    };

    video_playing.prototype.delete_report = function(date_added, user_address) {
      var content_inner_path, delete_report_from_data_json, file_uri, this_load_report;
      file_uri = date_added + "_" + user_address;
      delete_report_from_data_json = this.delete_report_from_data_json;
      content_inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
      this_load_report = this.load_report;
      return Page.cmd("wrapperConfirm", ["Unreport?", "Ok"], (function(_this) {
        return function() {
          return delete_report_from_data_json(file_uri, function(res) {
            if (res === "ok") {
              Page.cmd("sitePublish", {
                "inner_path": content_inner_path
              });
              console.log("[KopyKate: Unreported]");
              return this_load_report();
            }
          });
        };
      })(this));
    };

    video_playing.prototype.delete_like = function(date_added, user_address) {
      var content_inner_path, delete_like_from_data_json, file_uri, this_load_likes;
      file_uri = date_added + "_" + user_address;
      delete_like_from_data_json = this.delete_like_from_data_json;
      content_inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
      this_load_likes = this.load_likes;
      return Page.cmd("wrapperConfirm", ["Unlike?", "Ok"], (function(_this) {
        return function() {
          return delete_like_from_data_json(file_uri, function(res) {
            if (res === "ok") {
              Page.cmd("sitePublish", {
                "inner_path": content_inner_path
              });
              console.log("[KopyKate: Unliked]");
              return this_load_likes();
            }
          });
        };
      })(this));
    };

    video_playing.prototype.delete_subscription = function(user_address) {
      var content_inner_path, delete_sub_from_data_json, this_load_subs;
      delete_sub_from_data_json = this.delete_sub_from_data_json;
      content_inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
      this_load_subs = this.load_subs;
      return Page.cmd("wrapperConfirm", ["Unsubscribe?", "Ok"], (function(_this) {
        return function() {
          return delete_sub_from_data_json(user_address, function(res) {
            if (res === "ok") {
              Page.cmd("sitePublish", {
                "inner_path": content_inner_path
              });
              console.log("[KopyKate: Unsubscribed]");
              return this_load_subs();
            }
          });
        };
      })(this));
    };

    video_playing.prototype.delete_comment = function(file_uri, cid, body, date_added) {
      var content_inner_path, delete_from_data_json, this_load_comments;
      delete_from_data_json = this.delete_from_data_json;
      content_inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
      this_load_comments = this.load_comments;
      return Page.cmd("wrapperConfirm", ["Delete comment?", "Delete"], (function(_this) {
        return function() {
          return delete_from_data_json(file_uri, cid, body, date_added, function(res) {
            if (res === "ok") {
              Page.cmd("sitePublish", {
                "inner_path": content_inner_path
              });
              console.log("[KopyKate: Deleted comment]");
              return this_load_comments();
            }
          });
        };
      })(this));
    };

    video_playing.prototype.register_subscription = function(file_directory, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null) {
            res = {};
          }
          if (res.subscription === null || res.subscription === void 0) {
            res.subscription = {};
          }
          if (res.subscription[file_directory] === null || res.subscription[file_directory] === void 0) {
            res.subscription[file_directory] = 1;
          }
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    video_playing.prototype.register_comment = function(file_uri, body, date_added, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          console.log("This is comment res: " + JSON.parse(res));
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null) {
            res = {};
          }
          if (res.comment === null || res.comment === void 0) {
            res.comment = {};
          }
          if (res.comment[file_uri] === null || res.comment[file_uri] === void 0) {
            res.comment[file_uri] = [];
          }
          console.log(res.comment);
          console.log(file_uri);
          console.log(res.comment[file_uri]);
          res.comment[file_uri].push({
            body: body,
            date_added: date_added
          });
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    video_playing.prototype.register_vote = function(file_uri, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null) {
            res = {};
          }
          if (res.file_vote === null || res.file_vote === void 0) {
            res.file_vote = {};
          }
          if (res.file_vote[file_uri] === null || res.file_vote[file_uri] === void 0) {
            res.file_vote[file_uri] = [];
          }
          console.log(res.file_vote);
          console.log(file_uri);
          console.log(res.file_vote[file_uri]);
          res.file_vote[file_uri] = 1;
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    video_playing.prototype.register_report = function(file_uri, cb) {
      var inner_path;
      inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
      return Page.cmd("fileGet", [inner_path, false], (function(_this) {
        return function(res) {
          if (res) {
            res = JSON.parse(res);
          }
          if (res === null) {
            res = {};
          }
          if (res.file_vote === null || res.file_report === void 0) {
            res.file_report = {};
          }
          if (res.file_report[file_uri] === null || res.file_report[file_uri] === void 0) {
            res.file_report[file_uri] = [];
          }
          res.file_report[file_uri] = 1;
          return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
        };
      })(this));
    };

    video_playing.prototype.subscribe = function(file_directory) {
      var load_subs, register_subscription;
      register_subscription = this.register_subscription;
      load_subs = this.load_subs;
      return editor.check_content_json((function(_this) {
        return function(res) {
          return register_subscription(file_directory, function(res) {
            load_subs();
            return Page.cmd("siteSign", {
              inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
            }, function(res) {
              return Page.cmd("sitePublish", {
                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                "sign": false
              });
            });
          });
        };
      })(this));
    };

    video_playing.prototype.add_vote = function(file_date_added, file_directory) {
      var file_uri, load_likes, register_vote;
      file_uri = file_date_added + "_" + file_directory;
      register_vote = this.register_vote;
      load_likes = this.load_likes;
      return editor.check_content_json((function(_this) {
        return function(res) {
          return register_vote(file_uri, function(res) {
            load_likes();
            return Page.cmd("siteSign", {
              inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
            }, function(res) {
              return Page.cmd("sitePublish", {
                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                "sign": false
              });
            });
          });
        };
      })(this));
    };

    video_playing.prototype.add_report = function(file_date_added, file_directory) {
      var file_uri, load_report, register_report;
      file_uri = file_date_added + "_" + file_directory;
      register_report = this.register_report;
      load_report = this.load_report;
      return editor.check_content_json((function(_this) {
        return function(res) {
          return register_report(file_uri, function(res) {
            load_report();
            return Page.cmd("siteSign", {
              inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
            }, function(res) {
              return Page.cmd("sitePublish", {
                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                "sign": false
              });
            });
          });
        };
      })(this));
    };

    video_playing.prototype.write_comment = function(file_date_added, file_directory, comment_body) {
      var file_uri, load_comments, register_comment;
      register_comment = this.register_comment;
      load_comments = this.load_comments;
      file_uri = file_date_added + "_" + file_directory;
      return editor.check_content_json((function(_this) {
        return function(res) {
          return register_comment(file_uri, comment_body, Time.timestamp(), function(res) {
            load_comments();
            return Page.cmd("siteSign", {
              inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
            }, function(res) {
              return Page.cmd("sitePublish", {
                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                "sign": false
              });
            });
          });
        };
      })(this));
    };

    video_playing.prototype.load_related = function(query_string) {
      return Page.cmd("dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) WHERE file.title LIKE '%" + query_string + "%' ORDER BY date_added DESC"], (function(_this) {
        return function(res0) {
          var order_actual, query;
          if (res0.length < 15) {
            query = "WHERE file.title LIKE '%%'";
          } else {
            query = "WHERE file.title LIKE '%" + query_string + "%'";
          }
          console.log("FIRST WORD: " + query_string);
          order_actual = {
            filter: "",
            address: "1tvshuFLkoockzDmvmgmoDoXYe7G6GWxL",
            limit: 1000
          };
          return Page.cmd("dbQuery", ["SELECT * FROM file LEFT JOIN json USING (json_id) " + query + " ORDER BY date_added DESC LIMIT 15"], function(res1) {
            var full_channel_name, i, l, len, related_counter, results, row1, thumbnail, thumbnail_id, video_channel, video_channel_id, video_channel_name, video_info, video_info_id, video_link, video_link_id, video_row, video_row_id, video_string;
            related_counter = 0;
            $("#related_column").html("");
            $("#related_column").append("<span>Up next</span>");
            results = [];
            for (i = l = 0, len = res1.length; l < len; i = ++l) {
              row1 = res1[i];
              video_string = row1.date_added + "_" + row1.directory;
              full_channel_name = row1.cert_user_id;
              video_channel_name = row1.cert_user_id.split("@")[0];
              video_row_id = "related_" + related_counter;
              video_row = $("<div></div>");
              video_row.attr("id", video_row_id);
              video_row.attr("class", "related_row");
              video_info_id = "relate_info_" + related_counter;
              video_info = $("<div></div>");
              video_info.attr("id", video_info_id);
              video_info.attr("class", "related_info");
              video_link_id = "related_link_" + related_counter;
              video_link = $("<a></a>");
              video_link.attr("id", video_link_id);
              video_link.attr("class", "related_link");
              video_link.attr("href", "?Video=" + video_string);
              video_link.text(row1.title);
              video_channel_id = "related_channel" + related_counter;
              video_channel = $("<a></a>");
              video_channel.attr("id", video_channel_id);
              video_channel.attr("class", "related_channel");
              video_channel.attr("href", "?Channel=" + full_channel_name);
              video_channel.text(video_channel_name.charAt(0).toUpperCase() + video_channel_name.slice(1));
              thumbnail_id = "related_thumb_" + related_counter;
              thumbnail = $("<a></a>");
              thumbnail.attr("id", thumbnail_id);
              thumbnail.attr("class", "related_thumb");
              thumbnail.css("background-image", "url('" + row1.image_link + "')");
              thumbnail.attr("href", "?Video=" + video_string);
              $("#related_column").append(video_row);
              $("#" + video_row_id).append(thumbnail);
              $("#" + video_row_id).append(video_info);
              $("#" + video_info_id).append(video_link);
              $("#" + video_info_id).append(video_channel);
              $("#" + thumbnail_id).on("click", function() {
                return Page.nav(this.href);
              });
              $("#" + video_link_id).on("click", function() {
                return Page.nav(this.href);
              });
              $("#" + video_channel_id).on("click", function() {
                return Page.nav(this.href);
              });
              results.push(related_counter += 1);
            }
            return results;
          });
        };
      })(this));
    };

    video_playing.prototype.load_subs = function() {
      var file_url, init_url, query, real_url, video_date_added, video_user_address;
      init_url = Page.history_state["url"];
      real_url = init_url.split("Video=")[1];
      video_date_added = real_url.split("_")[0];
      video_user_address = real_url.split("_")[1];
      file_url = real_url;
      query = "SELECT * FROM subscription LEFT JOIN json USING (json_id) WHERE user_address='" + video_user_address + "'";
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var delete_subscription, i, is_subscribed, l, len, sub, sub_counter, subscribe, subscribe_button, unsubscribe_button;
          sub_counter = 0;
          i = 0;
          is_subscribed = false;
          for (i = l = 0, len = res.length; l < len; i = ++l) {
            sub = res[i];
            sub_counter += 1;
            if (sub.directory === Page.site_info.auth_address) {
              is_subscribed = true;
            }
          }
          if (i === res.length) {
            if (is_subscribed) {
              unsubscribe_button = $("<a></a>");
              unsubscribe_button.attr("id", "unsubscribe_now_button");
              unsubscribe_button.attr("class", "subscribe_icon b64_green");
              unsubscribe_button.attr("href", "javascript:void(0)");
              $("#subscribers").html("&middot; Unsubscribe (" + sub_counter + ")");
              $("#subscribe_button").html(unsubscribe_button);
              delete_subscription = _this.delete_subscription;
              return $("#unsubscribe_now_button").on("click", function() {
                if (Page.site_info.cert_user_id) {
                  return delete_subscription(video_user_address);
                } else {
                  return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                    return function(res) {
                      return delete_subscription(video_user_address);
                    };
                  })(this));
                }
              });
            } else {
              subscribe_button = $("<a></a>");
              subscribe_button.attr("id", "subscribe_now_button");
              subscribe_button.attr("class", "subscribe_icon");
              subscribe_button.attr("href", "javascript:void(0)");
              $("#subscribers").html("&middot; Subscribe (" + sub_counter + ")");
              $("#subscribe_button").html(subscribe_button);
              subscribe = _this.subscribe;
              return $("#subscribe_now_button").on("click", function() {
                if (Page.site_info.cert_user_id) {
                  return subscribe(video_user_address);
                } else {
                  return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                    return function(res) {
                      return subscribe(video_user_address);
                    };
                  })(this));
                }
              });
            }
          }
        };
      })(this));
    };

    video_playing.prototype.load_report = function() {
      var file_uri, init_url, query, real_url, video_date_added, video_user_address;
      init_url = Page.history_state["url"];
      real_url = init_url.split("Video=")[1];
      video_date_added = real_url.split("_")[0];
      video_user_address = real_url.split("_")[1];
      file_uri = real_url;
      query = "SELECT * FROM file_report LEFT JOIN json USING (json_id) WHERE file_uri='" + real_url + "'";
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var add_report, delete_report, i, is_reported, l, len, report, report_button, report_counter, unreport_button;
          report_counter = 0;
          i = 0;
          is_reported = false;
          for (i = l = 0, len = res.length; l < len; i = ++l) {
            report = res[i];
            report_counter += 1;
            if (report.directory === Page.site_info.auth_address) {
              is_reported = true;
            }
          }
          if (i === res.length) {
            if (is_reported) {
              unreport_button = $("<a></a>");
              unreport_button.attr("id", "unreport_now_button");
              unreport_button.attr("class", "report_icon b64_red");
              unreport_button.attr("href", "javascript:void(0)");
              $("#report_button").html("");
              $("#report_button").append("<span>&middot; Unreport</span>");
              $("#report_button").append(unreport_button);
              delete_report = _this.delete_report;
              return $("#unreport_now_button").on("click", function() {
                if (Page.site_info.cert_user_id) {
                  return delete_report(video_date_added, video_user_address);
                } else {
                  return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                    return function(res) {
                      return delete_report(video_date_added, video_user_address);
                    };
                  })(this));
                }
              });
            } else {
              report_button = $("<a></a>");
              report_button.attr("id", "report_now_button");
              report_button.attr("class", "report_icon");
              report_button.attr("href", "javascript:void(0)");
              $("#report_button").html("");
              $("#report_button").append("<span>&middot; Report</span>");
              $("#report_button").append(report_button);
              add_report = _this.add_report;
              return $("#report_now_button").on("click", function() {
                if (Page.site_info.cert_user_id) {
                  return add_report(video_date_added, video_user_address);
                } else {
                  return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                    return function(res) {
                      return add_report(video_date_added, video_user_address);
                    };
                  })(this));
                }
              });
            }
          }
        };
      })(this));
    };

    video_playing.prototype.load_likes = function() {
      var file_uri, init_url, query, real_url, video_date_added, video_user_address;
      init_url = Page.history_state["url"];
      real_url = init_url.split("Video=")[1];
      video_date_added = real_url.split("_")[0];
      video_user_address = real_url.split("_")[1];
      file_uri = real_url;
      query = "SELECT * FROM file_vote LEFT JOIN json USING (json_id) WHERE file_uri='" + real_url + "'";
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var add_vote, delete_like, i, is_liked, l, len, like_button, like_counter, unlike_button, vote;
          like_counter = 0;
          i = 0;
          is_liked = false;
          for (i = l = 0, len = res.length; l < len; i = ++l) {
            vote = res[i];
            like_counter += 1;
            if (vote.directory === Page.site_info.auth_address) {
              is_liked = true;
            }
          }
          if (i === res.length) {
            if (is_liked) {
              unlike_button = $("<a></a>");
              unlike_button.attr("id", "unlike_now_button");
              unlike_button.attr("class", "like_icon b64_green");
              unlike_button.attr("href", "javascript:void(0)");
              $("#like_button").html(unlike_button);
              $("#likes_total").text("Unlike (" + like_counter + ")");
              delete_like = _this.delete_like;
              return $("#unlike_now_button").on("click", function() {
                if (Page.site_info.cert_user_id) {
                  return delete_like(video_date_added, video_user_address);
                } else {
                  return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                    return function(res) {
                      return delete_like(video_date_added, video_user_address);
                    };
                  })(this));
                }
              });
            } else {
              like_button = $("<a></a>");
              like_button.attr("id", "like_now_button");
              like_button.attr("class", "like_icon");
              like_button.attr("href", "javascript:void(0)");
              $("#like_button").html(like_button);
              $("#likes_total").text("Like (" + like_counter + ")");
              add_vote = _this.add_vote;
              return $("#like_now_button").on("click", function() {
                if (Page.site_info.cert_user_id) {
                  return add_vote(video_date_added, video_user_address);
                } else {
                  return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                    return function(res) {
                      return add_vote(video_date_added, video_user_address);
                    };
                  })(this));
                }
              });
            }
          }
        };
      })(this));
    };

    video_playing.prototype.load_comments = function() {
      var file_uri, init_url, query, real_url, video_date_added, video_user_address;
      init_url = Page.history_state["url"];
      real_url = init_url.split("Video=")[1];
      video_date_added = real_url.split("_")[0];
      video_user_address = real_url.split("_")[1];
      file_uri = real_url;
      query = "SELECT * FROM comment LEFT JOIN json USING (json_id) WHERE file_uri='" + real_url + "' ORDER BY date_added DESC";
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(res) {
          var comment, comment_body, comment_counter, comment_date, comment_date_added, comment_delete, comment_delete_id, comment_directory, comment_icon, comment_id, comment_input, comment_single, comment_single_id, comment_text, comment_this_user_id, comment_user, comment_user_id, comment_username, delete_comment, l, len, my_counter, results, write_comment;
          comment_input = $("<input>");
          comment_input.attr("id", "comment_box_input");
          comment_input.attr("class", "comment_box_input");
          comment_input.attr("placeholder", "Write a comment...");
          my_counter = 0;
          comment_counter = 0;
          $("#comment_actual").html("");
          $("#comment_actual").append(comment_input);
          write_comment = _this.write_comment;
          $("#comment_box_input").on("keypress", function(e) {
            var comment_body;
            comment_body = this.value;
            if (e.which === 13) {
              if (Page.site_info.cert_user_id) {
                return write_comment(video_date_added, video_user_address, comment_body);
              } else {
                return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                  return function(res) {
                    return write_comment(video_date_added, video_user_address, comment_body);
                  };
                })(this));
              }
            }
          });
          results = [];
          for (l = 0, len = res.length; l < len; l++) {
            comment = res[l];
            comment_body = comment.body;
            comment_body = comment.body.replace(/</g, ' < ');
            comment_body = comment.body.replace(/>/g, ' > ');
            comment_date_added = comment.date_added;
            comment_directory = comment.directory;
            if (comment.cert_user_id === null || comment.cert_user_id === void 0) {
              comment_user_id = "guest";
            } else {
              comment_user_id = comment.cert_user_id.split("@")[0];
            }
            comment_id = "comment_" + comment_date_added + "_" + comment_directory;
            comment_single_id = "comment_" + comment_counter;
            comment_single = $("<div></div>");
            comment_single.attr("id", comment_single_id);
            comment_single.attr("class", "comment_single");
            comment_this_user_id = "comment_user_" + comment_counter;
            comment_user = $("<div></div>");
            comment_user.attr("id", comment_this_user_id);
            comment_icon = $("<div></div>");
            comment_icon.attr("class", "comment_icon");
            comment_username = $("<span></span>");
            comment_username.attr("class", "comment_user");
            comment_username.text(comment_user_id.charAt(0).toUpperCase() + comment_user_id.slice(1));
            comment_date = $("<span></span>");
            comment_date.attr("id", "comment_date");
            comment_date.attr("class", "comment_date");
            comment_date.text(" " + Time.since(comment_date_added));
            comment_delete_id = "comment_delete_" + comment_counter;
            comment_delete = $("<a></a>");
            comment_delete.attr("id", comment_delete_id);
            comment_delete.attr("class", "comment_delete");
            comment_delete.attr("href", "javascript:void(0)");
            comment_delete.attr("data-uri", file_uri);
            comment_delete.attr("data-cid", my_counter);
            comment_delete.attr("data-body", comment.body);
            comment_delete.attr("data-date", comment.date_added);
            comment_delete.text(" [-delete]");
            comment_text = $("<div></div>");
            comment_text.attr("id", "comment_text");
            comment_text.attr("class", "comment_text");
            comment_text.text(comment_body);
            $("#comment_actual").append(comment_single);
            $("#" + comment_single_id).append(comment_user);
            $("#" + comment_this_user_id).append(comment_username);
            $("#" + comment_this_user_id).append(comment_date);
            $("#" + comment_this_user_id).append(comment_icon);
            if (Page.site_info.cert_user_id === comment.cert_user_id) {
              $("#" + comment_this_user_id).append(comment_delete);
            }
            $("#" + comment_single_id).append(comment_text);
            delete_comment = _this.delete_comment;
            $("#" + comment_delete_id).on("click", function() {
              console.log("Body: " + $(this).data("body"));
              console.log("Date added: " + $(this).data("date"));
              console.log("File uri: " + $(this).data("uri"));
              console.log("Cid: " + $(this).data("cid"));
              return delete_comment($(this).data("uri"), $(this).data("cid"), $(this).data("body"), $(this).data("date"));
            });
            comment_counter = comment_counter + 1;
            if (Page.site_info.cert_user_id === comment.cert_user_id) {
              results.push(my_counter += 1);
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this));
    };

    video_playing.prototype.render_video = function(video_path) {
      var loading_signal, render_video, video_actual, video_started;
      $("#video_box").html("");
      video_actual = $("<video></video>");
      video_actual.attr("id", "video_actual");
      video_actual.attr("class", "video_actual");
      video_actual.attr("src", video_path);
      video_actual.attr("controls", true);
      video_actual.attr("autoplay", true);
      loading_signal = $("<div></div>");
      loading_signal.attr("id", "player_loading");
      loading_signal.attr("class", "player_loading");
      video_started = this.video_started;
      render_video = this.render_video;
      this.player_timeout = setTimeout(function() {
        if (video_started === 0) {
          console.log("[KopyKate] Player reloaded!");
          return render_video(video_path);
        }
      }, 10000);
      $("#video_box").append(video_actual);
      $("#video_box").append(loading_signal);
      return $("#video_actual").on("canplaythrough", function() {
        video_started = 1;
        return $("#player_loading").remove();
      });
    };

    video_playing.prototype.render_player = function() {
      var date_added, init_url, query, real_url, user_address;
      init_url = Page.history_state["url"];
      real_url = init_url.split("Video=")[1];
      date_added = real_url.split("_")[0];
      user_address = real_url.split("_")[1];
      query = "SELECT * FROM file LEFT JOIN json USING (json_id) WHERE date_added='" + date_added + "' AND directory='" + user_address + "'";
      return Page.cmd("dbQuery", [query], (function(_this) {
        return function(res1) {
          return Page.cmd("optionalFileList", {
            filter: "",
            limit: 1000
          }, function(res2) {
            var add_report, file_name, i, l, len, my_file, my_row, optional_name, optional_peer, optional_seed, stats_loaded, user_directory, video_actual, video_channel, video_date_added, video_description, video_title, word_array;
            my_row = res1[0];
            file_name = my_row['file_name'];
            video_title = my_row['title'];
            video_channel = my_row['cert_user_id'].split("@")[0];

            video_description = marked(my_row['description'], {"sanitize": true});

            video_date_added = my_row['date_added'];
            user_directory = my_row['directory'];
            stats_loaded = false;
            i = 0;
            for (i = l = 0, len = res2.length; l < len; i = ++l) {
              my_file = res2[i];
              optional_name = my_file['inner_path'].replace(/.*\//, "");
              optional_peer = my_file['peer'];
              optional_seed = my_file['peer_seed'];
              if (optional_name === file_name) {
                stats_loaded = true;
                $("#player_info").append("<span class='video_player_title'>" + video_title + "</span>");
                $("#player_info").append("<div id='player_stats' class='video_player_stats'><span>" + optional_seed + " / " + optional_peer + " Peers &middot; </span></div>");
                $("#player_info").append("<span class='video_player_username'>" + video_channel.charAt(0).toUpperCase() + video_channel.slice(1) + "</span>");
                $("#player_info").append("<span class='video_player_userdate'>Published " + Time.since(video_date_added) + "</span><br>");
                $("#player_info").append("<span class='video_player_brief'>" + video_description + "</span>");
                $("#player_info").append("<div class='player_icon'></div>");
              }
            }
            if (i === res2.length) {
              if (stats_loaded === false) {
                $("#player_info").append("<span class='video_player_title'>" + video_title + "</span>");
                $("#player_info").append("<div id='player_stats' class='video_player_stats'><span>0 / 0 Peers &middot; </span></div><br>");
                $("#player_info").append("<span class='video_player_username'>" + video_channel.charAt(0).toUpperCase() + video_channel.slice(1) + "</span>");
                $("#player_info").append("<span class='video_player_userdate'>Published " + Time.since(video_date_added) + "</span><br>");
                $("#player_info").append("<span class='video_player_brief'>" + video_description + "</span>");
                $("#player_info").append("<div class='player_icon'></div>");
              }
            }
            video_actual = "data/users/" + user_directory + "/" + file_name;
            _this.render_video(video_actual);
            word_array = video_title.split(" ");
            _this.load_related(word_array[0]);
            $("#player_stats").append("<span id='likes_total'></span>");
            $("#player_stats").append("<span id='like_button'></span>");
            $("#player_stats").append("<span id='subscribers'></span>");
            $("#player_stats").append("<span id='subscribe_button'></span>");
            $("#player_stats").append("<span id='report_button'></span>");
            _this.load_likes();
            _this.load_subs();
            _this.load_report();
            add_report = _this.add_report;
            return $("#report_button").on("click", function() {
              if (Page.site_info.cert_user_id) {
                return add_report(date_added, user_address);
              } else {
                return Page.cmd("certSelect", [["zeroid.bit"]], (function(_this) {
                  return function(res) {
                    return add_report(date_added, user_address);
                  };
                })(this));
              }
            });
          });
        };
      })(this));
    };

    video_playing.prototype.render = function() {
      var comment_actual, comment_div, related_column, related_text, video_box, video_column, video_info, video_player;
      video_player = $("<div></div>");
      video_player.attr("id", "video_player");
      video_player.attr("class", "video_player");
      video_column = $("<div></div>");
      video_column.attr("id", "video_column");
      video_column.attr("class", "video_column");
      related_column = $("<div></div>");
      related_column.attr("id", "related_column");
      related_column.attr("class", "related_column");
      related_text = video_box = $("<div></div>");
      video_box.attr("id", "video_box");
      video_box.attr("class", "video_box");
      video_info = $("<div></div>");
      video_info.attr("id", "player_info");
      video_info.attr("class", "player_info");
      comment_div = $("<div></div>");
      comment_div.attr("id", "comment_box");
      comment_div.attr("class", "player_info");
      comment_actual = $("<div></div>");
      comment_actual.attr("id", "comment_actual");
      comment_actual.attr("class", "comment_actual");
      $("#main").attr("class", "main_nomenu");
      $("#main").html("");
      donav();
      $("#main").append(video_player);
      $("#video_player").append(video_column);
      $("#video_player").append(related_column);
      $("#related_column").html("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
      $("#video_column").append(video_box);
      $("#video_column").append(video_info);
      $("#video_column").append(comment_div);
      $("#comment_box").append(comment_actual);
      clearTimeout(this.player_timeout);
      this.render_player();
      return this.load_comments();
    };

    return video_playing;

  })();

  video_playing = new video_playing();

  Page = (function(superClass) {
    extend(Page, superClass);

    function Page() {
      this.nav = bind(this.nav, this);
      this.set_url = bind(this.set_url, this);
      this.route = bind(this.route, this);
      this.project_this = bind(this.project_this, this);
      this.onRequest = bind(this.onRequest, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.update_site_info = bind(this.update_site_info, this);
      this.set_site_info = bind(this.set_site_info, this);
      this.render = bind(this.render, this);
      var already_rendered;
      Page.__super__.constructor.call(this);
      already_rendered = false;
    }

    Page.prototype.render = function() {
      var url;
      this.already_rendered = true;
      top_menuify.render();
      left_menuify.render();
      if (base.href.indexOf("?") === -1) {
        this.route("", "home");
        this.state = {};
        this.state.page = "home";
      } else {
        url = base.href.replace(/.*?\?/, "");
        this.history_state["url"] = url;
        if (base.href.indexOf("Video") > -1) {
          this.route(url, "video");
          this.state = {};
          this.state.page = "video";
        } else if (base.href.indexOf("Upload") > -1) {
          this.route(url, "upload");
          this.state = {};
          this.state.page = "upload";
        } else if (base.href.indexOf("Editor") > -1) {
          this.route(url, "editor");
          this.state = {};
          this.state.page = "editor";
        } else if (base.href.indexOf("Profile") > -1) {
          this.route(url, "profile");
          this.state = {};
          this.state.page = "profile";
        } else if (base.href.indexOf("Box") > -1) {
          this.route(url, "box");
          this.state = {};
          this.state.page = "box";
        } else if (base.href.indexOf("Seed") > -1) {
          this.route(url, "seed");
          this.state = {};
          this.state.page = "seedbox";
        } else if (base.href.indexOf("Latest") > -1) {
          this.route(url, "latest");
          this.state = {};
          this.state.page = "latest";
        } else if (base.href.indexOf("Channel") > -1) {
          this.route(url, "channel");
          this.state = {};
          this.state.page = "channel";
        } else if (base.href.indexOf("Subbed") > -1) {
          this.route(url, "subbed");
          this.state = {};
          this.state.page = "subbed";
        } else if (base.href.indexOf("Home") > -1) {
          this.route("", "home");
          this.state = {};
          this.state.page = "home";
        }
      }
      this.on_site_info = new Promise();
      return this.on_loaded = new Promise();
    };

    Page.prototype.set_site_info = function(site_info) {
      return this.site_info = site_info;
    };

    Page.prototype.update_site_info = function() {
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          _this.address = site_info.address;
          _this.set_site_info(site_info);
          return _this.on_site_info.resolve();
        };
      })(this));
    };

    Page.prototype.onOpenWebsocket = function() {
      this.update_site_info();
      if (this.already_rendered) {
        return console.log("[KopyKate: Websocket opened]");
      } else {
        this.render();
        return console.log("[KopyKate: Websocket opened]");
      }
    };

    Page.prototype.onRequest = function(cmd, params) {
      console.log("[KopyKate: Request]");
      if (cmd === "setSiteInfo") {
        return this.set_site_info(params);
      } else if (cmd === "wrapperPopState") {
        if (params.state) {
          if (!params.state.url) {
            params.state.url = params.href.replace(/.*\?/, "");
          }
          this.on_loaded.resolved = false;
          document.body.className = "";
          window.scroll(window.pageXOffset, params.state.scrollTop || 0);
          return this.route(params.state.url || "");
        }
      }
    };

    Page.prototype.project_this = function(mode) {
      console.log("[KopyKate: Mode (" + mode + ")]");
      if (mode === "home") {
        video_lister.order_by = "peer";
        video_lister.max_videos = 15;
        video_lister.counter = 1;
        return video_lister.render();
      } else if (mode === "latest") {
        video_lister.order_by = "date";
        video_lister.max_videos = 15;
        video_lister.counter = 1;
        return video_lister.render();
      } else if (mode === "subbed") {
        video_lister.order_by = "subbed";
        video_lister.max_videos = 15;
        video_lister.counter = 1;
        return video_lister.render();
      } else if (mode === "channel") {
        video_lister.order_by = "channel";
        video_lister.max_videos = 15;
        video_lister.counter = 1;
        return video_lister.render();
      } else if (mode === "video") {
        return video_playing.render();
      } else if (mode === "upload") {
        return uploader.render();
      } else if (mode === "editor") {
        return editor.render();
      } else if (mode === "profile") {
        return profile_editor.render();
      } else if (mode === "box") {
        videobox.max_videos = 15;
        videobox.counter = 1;
        return videobox.render();
      } else if (mode === "seed") {
        seedbox.max_videos = 15;
        seedbox.counter = 1;
        return seedbox.render();
      }
    };

    Page.prototype.route = function(query) {
      query = JSON.stringify(query);
      console.log("[KopyKate: Routing (" + query + ")]");
      if (query.indexOf("Video") > -1) {
        return this.project_this("video");
      } else if (query.indexOf("Upload") > -1) {
        return this.project_this("upload");
      } else if (query.indexOf("Editor") > -1) {
        return this.project_this("editor");
      } else if (query.indexOf("Profile") > -1) {
        return this.project_this("profile");
      } else if (query.indexOf("Box") > -1) {
        return this.project_this("box");
      } else if (query.indexOf("Seed") > -1) {
        return this.project_this("seed");
      } else if (query.indexOf("Latest") > -1) {
        return this.project_this("latest");
      } else if (query.indexOf("Channel") > -1) {
        return this.project_this("channel");
      } else if (query.indexOf("Subbed") > -1) {
        return this.project_this("subbed");
      } else {
        return this.project_this("home");
      }
    };

    Page.prototype.set_url = function(url) {
      url = url.replace(/.*?\?/, "");
      console.log("[KopyKate: Setting url (FROM " + this.history_state["url"] + " TO -> " + url + ")]");
      if (this.history_state["url"] === url) {
        return false;
      }
      this.history_state["url"] = url;
      this.cmd("wrapperPushState", [this.history_state, "", url]);
      this.route(url);
      return false;
    };

    Page.prototype.nav = function(identifier) {
      if (identifier === null) {
        return true;
      } else {
        console.log("save scrollTop", window.pageYOffset);
        this.history_state["scrollTop"] = window.pageYOffset;
        this.cmd("wrapperReplaceState", [this.history_state, null]);
        window.scroll(window.pageXOffset, 0);
        this.history_state["scroll_top"] = 0;
        this.on_loaded.resolved = false;
        document.body.className = "";
        this.set_url(identifier);
        return false;
      }
    };

    return Page;

  })(ZeroFrame);

  Page = new Page();

}).call(this);
