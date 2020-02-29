!function(mod){"object"==typeof exports&&"object"==typeof module?mod(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],mod):mod(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("ruby",function(config){function wordObj(words){for(var o={},i=0,e=words.length;e>i;++i)o[words[i]]=!0;return o}function chain(newtok,stream,state){return state.tokenize.push(newtok),newtok(stream,state)}function tokenBase(stream,state){if(stream.sol()&&stream.match("=begin")&&stream.eol())return state.tokenize.push(readBlockComment),"comment";if(stream.eatSpace())return null;var m,ch=stream.next();if("`"==ch||"'"==ch||'"'==ch)return chain(readQuoted(ch,"string",'"'==ch||"`"==ch),stream,state);if("/"==ch){var currentIndex=stream.current().length;if(stream.skipTo("/")){var search_till=stream.current().length;stream.backUp(stream.current().length-currentIndex);for(var balance=0;stream.current().length<search_till;){var chchr=stream.next();if("("==chchr?balance+=1:")"==chchr&&(balance-=1),0>balance)break}if(stream.backUp(stream.current().length-currentIndex),0==balance)return chain(readQuoted(ch,"string-2",!0),stream,state)}return"operator"}if("%"==ch){var style="string",embed=!0;stream.eat("s")?style="atom":stream.eat(/[WQ]/)?style="string":stream.eat(/[r]/)?style="string-2":stream.eat(/[wxq]/)&&(style="string",embed=!1);var delim=stream.eat(/[^\w\s=]/);return delim?(matching.propertyIsEnumerable(delim)&&(delim=matching[delim]),chain(readQuoted(delim,style,embed,!0),stream,state)):"operator"}if("#"==ch)return stream.skipToEnd(),"comment";if("<"==ch&&(m=stream.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/)))return chain(readHereDoc(m[1]),stream,state);if("0"==ch)return stream.eat("x")?stream.eatWhile(/[\da-fA-F]/):stream.eat("b")?stream.eatWhile(/[01]/):stream.eatWhile(/[0-7]/),"number";if(/\d/.test(ch))return stream.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/),"number";if("?"==ch){for(;stream.match(/^\\[CM]-/););return stream.eat("\\")?stream.eatWhile(/\w/):stream.next(),"string"}if(":"==ch)return stream.eat("'")?chain(readQuoted("'","atom",!1),stream,state):stream.eat('"')?chain(readQuoted('"',"atom",!0),stream,state):stream.eat(/[\<\>]/)?(stream.eat(/[\<\>]/),"atom"):stream.eat(/[\+\-\*\/\&\|\:\!]/)?"atom":stream.eat(/[a-zA-Z$@_\xa1-\uffff]/)?(stream.eatWhile(/[\w$\xa1-\uffff]/),stream.eat(/[\?\!\=]/),"atom"):"operator";if("@"==ch&&stream.match(/^@?[a-zA-Z_\xa1-\uffff]/))return stream.eat("@"),stream.eatWhile(/[\w\xa1-\uffff]/),"variable-2";if("$"==ch)return stream.eat(/[a-zA-Z_]/)?stream.eatWhile(/[\w]/):stream.eat(/\d/)?stream.eat(/\d/):stream.next(),"variable-3";if(/[a-zA-Z_\xa1-\uffff]/.test(ch))return stream.eatWhile(/[\w\xa1-\uffff]/),stream.eat(/[\?\!]/),stream.eat(":")?"atom":"ident";if("|"!=ch||!state.varList&&"{"!=state.lastTok&&"do"!=state.lastTok){if(/[\(\)\[\]{}\\;]/.test(ch))return curPunc=ch,null;if("-"==ch&&stream.eat(">"))return"arrow";if(/[=+\-\/*:\.^%<>~|]/.test(ch)){var more=stream.eatWhile(/[=+\-\/*:\.^%<>~|]/);return"."!=ch||more||(curPunc="."),"operator"}return null}return curPunc="|",null}function tokenBaseUntilBrace(depth){return depth||(depth=1),function(stream,state){if("}"==stream.peek()){if(1==depth)return state.tokenize.pop(),state.tokenize[state.tokenize.length-1](stream,state);state.tokenize[state.tokenize.length-1]=tokenBaseUntilBrace(depth-1)}else"{"==stream.peek()&&(state.tokenize[state.tokenize.length-1]=tokenBaseUntilBrace(depth+1));return tokenBase(stream,state)}}function tokenBaseOnce(){var alreadyCalled=!1;return function(stream,state){return alreadyCalled?(state.tokenize.pop(),state.tokenize[state.tokenize.length-1](stream,state)):(alreadyCalled=!0,tokenBase(stream,state))}}function readQuoted(quote,style,embed,unescaped){return function(stream,state){var ch,escaped=!1;for("read-quoted-paused"===state.context.type&&(state.context=state.context.prev,stream.eat("}"));null!=(ch=stream.next());){if(ch==quote&&(unescaped||!escaped)){state.tokenize.pop();break}if(embed&&"#"==ch&&!escaped){if(stream.eat("{")){"}"==quote&&(state.context={prev:state.context,type:"read-quoted-paused"}),state.tokenize.push(tokenBaseUntilBrace());break}if(/[@\$]/.test(stream.peek())){state.tokenize.push(tokenBaseOnce());break}}escaped=!escaped&&"\\"==ch}return style}}function readHereDoc(phrase){return function(stream,state){return stream.match(phrase)?state.tokenize.pop():stream.skipToEnd(),"string"}}function readBlockComment(stream,state){return stream.sol()&&stream.match("=end")&&stream.eol()&&state.tokenize.pop(),stream.skipToEnd(),"comment"}var curPunc,keywords=wordObj(["alias","and","BEGIN","begin","break","case","class","def","defined?","do","else","elsif","END","end","ensure","false","for","if","in","module","next","not","or","redo","rescue","retry","return","self","super","then","true","undef","unless","until","when","while","yield","nil","raise","throw","catch","fail","loop","callcc","caller","lambda","proc","public","protected","private","require","load","require_relative","extend","autoload","__END__","__FILE__","__LINE__","__dir__"]),indentWords=wordObj(["def","class","case","for","while","until","module","then","catch","loop","proc","begin"]),dedentWords=wordObj(["end","until"]),matching={"[":"]","{":"}","(":")"};return{startState:function(){return{tokenize:[tokenBase],indented:0,context:{type:"top",indented:-config.indentUnit},continuedLine:!1,lastTok:null,varList:!1}},token:function(stream,state){curPunc=null,stream.sol()&&(state.indented=stream.indentation());var kwtype,style=state.tokenize[state.tokenize.length-1](stream,state),thisTok=curPunc;if("ident"==style){var word=stream.current();style="."==state.lastTok?"property":keywords.propertyIsEnumerable(stream.current())?"keyword":/^[A-Z]/.test(word)?"tag":"def"==state.lastTok||"class"==state.lastTok||state.varList?"def":"variable","keyword"==style&&(thisTok=word,indentWords.propertyIsEnumerable(word)?kwtype="indent":dedentWords.propertyIsEnumerable(word)?kwtype="dedent":"if"!=word&&"unless"!=word||stream.column()!=stream.indentation()?"do"==word&&state.context.indented<state.indented&&(kwtype="indent"):kwtype="indent")}return(curPunc||style&&"comment"!=style)&&(state.lastTok=thisTok),"|"==curPunc&&(state.varList=!state.varList),"indent"==kwtype||/[\(\[\{]/.test(curPunc)?state.context={prev:state.context,type:curPunc||style,indented:state.indented}:("dedent"==kwtype||/[\)\]\}]/.test(curPunc))&&state.context.prev&&(state.context=state.context.prev),stream.eol()&&(state.continuedLine="\\"==curPunc||"operator"==style),style},indent:function(state,textAfter){if(state.tokenize[state.tokenize.length-1]!=tokenBase)return 0;var firstChar=textAfter&&textAfter.charAt(0),ct=state.context,closing=ct.type==matching[firstChar]||"keyword"==ct.type&&/^(?:end|until|else|elsif|when|rescue)\b/.test(textAfter);return ct.indented+(closing?0:config.indentUnit)+(state.continuedLine?config.indentUnit:0)},electricInput:/^\s*(?:end|rescue|\})$/,lineComment:"#"}}),CodeMirror.defineMIME("text/x-ruby","ruby")});