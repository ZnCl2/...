!function(mod){"object"==typeof exports&&"object"==typeof module?mod(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],mod):mod(CodeMirror)}(function(CodeMirror){"use strict";function Context(indented,column,type,align,prev){this.indented=indented,this.column=column,this.type=type,this.align=align,this.prev=prev}function isStatement(type){return"statement"==type||"switchstatement"==type||"namespace"==type}function pushContext(state,col,type){var indent=state.indented;return state.context&&isStatement(state.context.type)&&!isStatement(type)&&(indent=state.context.indented),state.context=new Context(indent,col,type,null,state.context)}function popContext(state){var t=state.context.type;return")"!=t&&"]"!=t&&"}"!=t||(state.indented=state.context.indented),state.context=state.context.prev}function typeBefore(stream,state){return"variable"==state.prevToken||"variable-3"==state.prevToken?!0:/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(stream.string.slice(0,stream.start))?!0:void 0}function isTopScope(context){for(;;){if(!context||"top"==context.type)return!0;if("}"==context.type&&"namespace"!=context.prev.type)return!1;context=context.prev}}function words(str){for(var obj={},words=str.split(" "),i=0;i<words.length;++i)obj[words[i]]=!0;return obj}function contains(words,word){return"function"==typeof words?words(word):words.propertyIsEnumerable(word)}function cppHook(stream,state){if(!state.startOfLine)return!1;for(var ch,next=null;ch=stream.peek();){if("\\"==ch&&stream.match(/^.$/)){next=cppHook;break}if("/"==ch&&stream.match(/^\/[\/\*]/,!1))break;stream.next()}return state.tokenize=next,"meta"}function pointerHook(_stream,state){return"variable-3"==state.prevToken?"variable-3":!1}function cpp14Literal(stream){return stream.eatWhile(/[\w\.']/),"number"}function cpp11StringHook(stream,state){if(stream.backUp(1),stream.match(/(R|u8R|uR|UR|LR)/)){var match=stream.match(/"([^\s\\()]{0,16})\(/);return match?(state.cpp11RawStringDelim=match[1],state.tokenize=tokenRawString,tokenRawString(stream,state)):!1}return stream.match(/(u8|u|U|L)/)?stream.match(/["']/,!1)?"string":!1:(stream.next(),!1)}function cppLooksLikeConstructor(word){var lastTwo=/(\w+)::(\w+)$/.exec(word);return lastTwo&&lastTwo[1]==lastTwo[2]}function tokenAtString(stream,state){for(var next;null!=(next=stream.next());)if('"'==next&&!stream.eat('"')){state.tokenize=null;break}return"string"}function tokenRawString(stream,state){var delim=state.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&"),match=stream.match(new RegExp(".*?\\)"+delim+'"'));return match?state.tokenize=null:stream.skipToEnd(),"string"}function def(mimes,mode){function add(obj){if(obj)for(var prop in obj)obj.hasOwnProperty(prop)&&words.push(prop)}"string"==typeof mimes&&(mimes=[mimes]);var words=[];add(mode.keywords),add(mode.types),add(mode.builtin),add(mode.atoms),words.length&&(mode.helperType=mimes[0],CodeMirror.registerHelper("hintWords",mimes[0],words));for(var i=0;i<mimes.length;++i)CodeMirror.defineMIME(mimes[i],mode)}function tokenTripleString(stream,state){for(var escaped=!1;!stream.eol();){if(!escaped&&stream.match('"""')){state.tokenize=null;break}escaped="\\"==stream.next()&&!escaped}return"string"}function tokenKotlinString(tripleString){return function(stream,state){for(var next,escaped=!1,end=!1;!stream.eol();){if(!tripleString&&!escaped&&stream.match('"')){end=!0;break}if(tripleString&&stream.match('"""')){end=!0;break}next=stream.next(),!escaped&&"$"==next&&stream.match("{")&&stream.skipTo("}"),escaped=!escaped&&"\\"==next&&!tripleString}return!end&&tripleString||(state.tokenize=null),"string"}}function tokenCeylonString(type){return function(stream,state){for(var next,escaped=!1,end=!1;!stream.eol();){if(!escaped&&stream.match('"')&&("single"==type||stream.match('""'))){end=!0;break}if(!escaped&&stream.match("``")){stringTokenizer=tokenCeylonString(type),end=!0;break}next=stream.next(),escaped="single"==type&&!escaped&&"\\"==next}return end&&(state.tokenize=null),"string"}}CodeMirror.defineMode("clike",function(config,parserConfig){function tokenBase(stream,state){var ch=stream.next();if(hooks[ch]){var result=hooks[ch](stream,state);if(result!==!1)return result}if('"'==ch||"'"==ch)return state.tokenize=tokenString(ch),state.tokenize(stream,state);if(isPunctuationChar.test(ch))return curPunc=ch,null;if(numberStart.test(ch)){if(stream.backUp(1),stream.match(number))return"number";stream.next()}if("/"==ch){if(stream.eat("*"))return state.tokenize=tokenComment,tokenComment(stream,state);if(stream.eat("/"))return stream.skipToEnd(),"comment"}if(isOperatorChar.test(ch))return stream.eatWhile(isOperatorChar),"operator";if(stream.eatWhile(/[\w\$_\xa1-\uffff]/),namespaceSeparator)for(;stream.match(namespaceSeparator);)stream.eatWhile(/[\w\$_\xa1-\uffff]/);var cur=stream.current();return contains(keywords,cur)?(contains(blockKeywords,cur)&&(curPunc="newstatement"),contains(defKeywords,cur)&&(isDefKeyword=!0),"keyword"):contains(types,cur)?"variable-3":contains(builtin,cur)?(contains(blockKeywords,cur)&&(curPunc="newstatement"),"builtin"):contains(atoms,cur)?"atom":"variable"}function tokenString(quote){return function(stream,state){for(var next,escaped=!1,end=!1;null!=(next=stream.next());){if(next==quote&&!escaped){end=!0;break}escaped=!escaped&&"\\"==next}return(end||!escaped&&!multiLineStrings)&&(state.tokenize=null),"string"}}function tokenComment(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("/"==ch&&maybeEnd){state.tokenize=null;break}maybeEnd="*"==ch}return"comment"}var curPunc,isDefKeyword,indentUnit=config.indentUnit,statementIndentUnit=parserConfig.statementIndentUnit||indentUnit,dontAlignCalls=parserConfig.dontAlignCalls,keywords=parserConfig.keywords||{},types=parserConfig.types||{},builtin=parserConfig.builtin||{},blockKeywords=parserConfig.blockKeywords||{},defKeywords=parserConfig.defKeywords||{},atoms=parserConfig.atoms||{},hooks=parserConfig.hooks||{},multiLineStrings=parserConfig.multiLineStrings,indentStatements=parserConfig.indentStatements!==!1,indentSwitch=parserConfig.indentSwitch!==!1,namespaceSeparator=parserConfig.namespaceSeparator,isPunctuationChar=parserConfig.isPunctuationChar||/[\[\]{}\(\),;\:\.]/,numberStart=parserConfig.numberStart||/[\d\.]/,number=parserConfig.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,isOperatorChar=parserConfig.isOperatorChar||/[+\-*&%=<>!?|\/]/,endStatement=parserConfig.endStatement||/^[;:,]$/;return{startState:function(basecolumn){return{tokenize:null,context:new Context((basecolumn||0)-indentUnit,0,"top",!1),indented:0,startOfLine:!0,prevToken:null}},token:function(stream,state){var ctx=state.context;if(stream.sol()&&(null==ctx.align&&(ctx.align=!1),state.indented=stream.indentation(),state.startOfLine=!0),stream.eatSpace())return null;curPunc=isDefKeyword=null;var style=(state.tokenize||tokenBase)(stream,state);if("comment"==style||"meta"==style)return style;if(null==ctx.align&&(ctx.align=!0),endStatement.test(curPunc))for(;isStatement(state.context.type);)popContext(state);else if("{"==curPunc)pushContext(state,stream.column(),"}");else if("["==curPunc)pushContext(state,stream.column(),"]");else if("("==curPunc)pushContext(state,stream.column(),")");else if("}"==curPunc){for(;isStatement(ctx.type);)ctx=popContext(state);for("}"==ctx.type&&(ctx=popContext(state));isStatement(ctx.type);)ctx=popContext(state)}else if(curPunc==ctx.type)popContext(state);else if(indentStatements&&(("}"==ctx.type||"top"==ctx.type)&&";"!=curPunc||isStatement(ctx.type)&&"newstatement"==curPunc)){var type="statement";"newstatement"==curPunc&&indentSwitch&&"switch"==stream.current()?type="switchstatement":"keyword"==style&&"namespace"==stream.current()&&(type="namespace"),pushContext(state,stream.column(),type)}if("variable"==style&&("def"==state.prevToken||parserConfig.typeFirstDefinitions&&typeBefore(stream,state)&&isTopScope(state.context)&&stream.match(/^\s*\(/,!1))&&(style="def"),hooks.token){var result=hooks.token(stream,state,style);void 0!==result&&(style=result)}return"def"==style&&parserConfig.styleDefs===!1&&(style="variable"),state.startOfLine=!1,state.prevToken=isDefKeyword?"def":style||curPunc,style},indent:function(state,textAfter){if(state.tokenize!=tokenBase&&null!=state.tokenize)return CodeMirror.Pass;var ctx=state.context,firstChar=textAfter&&textAfter.charAt(0);if(isStatement(ctx.type)&&"}"==firstChar&&(ctx=ctx.prev),hooks.indent){var hook=hooks.indent(state,ctx,textAfter);if("number"==typeof hook)return hook}var closing=firstChar==ctx.type,switchBlock=ctx.prev&&"switchstatement"==ctx.prev.type;if(parserConfig.allmanIndentation&&/[{(]/.test(firstChar)){for(;"top"!=ctx.type&&"}"!=ctx.type;)ctx=ctx.prev;return ctx.indented}return isStatement(ctx.type)?ctx.indented+("{"==firstChar?0:statementIndentUnit):!ctx.align||dontAlignCalls&&")"==ctx.type?")"!=ctx.type||closing?ctx.indented+(closing?0:indentUnit)+(closing||!switchBlock||/^(?:case|default)\b/.test(textAfter)?0:indentUnit):ctx.indented+statementIndentUnit:ctx.column+(closing?0:1)},electricInput:indentSwitch?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/,blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});var cKeywords="auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile",cTypes="int long char short double float unsigned signed void size_t ptrdiff_t";def(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:words(cKeywords),types:words(cTypes+" bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),blockKeywords:words("case do else for if switch while struct"),defKeywords:words("struct"),typeFirstDefinitions:!0,atoms:words("null true false"),hooks:{"#":cppHook,"*":pointerHook},modeProps:{fold:["brace","include"]}}),def(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:words(cKeywords+" asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),types:words(cTypes+" bool wchar_t"),blockKeywords:words("catch class do else finally for if struct switch try while"),defKeywords:words("class namespace struct enum union"),typeFirstDefinitions:!0,atoms:words("true false null"),hooks:{"#":cppHook,"*":pointerHook,u:cpp11StringHook,U:cpp11StringHook,L:cpp11StringHook,R:cpp11StringHook,0:cpp14Literal,1:cpp14Literal,2:cpp14Literal,3:cpp14Literal,4:cpp14Literal,5:cpp14Literal,6:cpp14Literal,7:cpp14Literal,8:cpp14Literal,9:cpp14Literal,token:function(stream,state,style){return"variable"!=style||"("!=stream.peek()||";"!=state.prevToken&&null!=state.prevToken&&"}"!=state.prevToken||!cppLooksLikeConstructor(stream.current())?void 0:"def"}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}}),def("text/x-java",{name:"clike",keywords:words("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while"),types:words("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),blockKeywords:words("catch class do else finally for if switch try while"),defKeywords:words("class interface package enum"),typeFirstDefinitions:!0,atoms:words("true false null"),endStatement:/^[;:]$/,hooks:{"@":function(stream){return stream.eatWhile(/[\w\$_]/),"meta"}},modeProps:{fold:["brace","import"]}}),def("text/x-csharp",{name:"clike",keywords:words("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),types:words("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:words("catch class do else finally for foreach if struct switch try while"),defKeywords:words("class interface namespace struct var"),typeFirstDefinitions:!0,atoms:words("true false null"),hooks:{"@":function(stream,state){return stream.eat('"')?(state.tokenize=tokenAtString,tokenAtString(stream,state)):(stream.eatWhile(/[\w\$_]/),"meta")}}}),def("text/x-scala",{name:"clike",keywords:words("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble :: #:: "),types:words("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),multiLineStrings:!0,blockKeywords:words("catch class do else finally for forSome if match switch try while"),defKeywords:words("class def object package trait type val var"),atoms:words("true false null"),indentStatements:!1,indentSwitch:!1,hooks:{"@":function(stream){return stream.eatWhile(/[\w\$_]/),"meta"},'"':function(stream,state){return stream.match('""')?(state.tokenize=tokenTripleString,state.tokenize(stream,state)):!1},"'":function(stream){return stream.eatWhile(/[\w\$_\xa1-\uffff]/),"atom"},"=":function(stream,state){var cx=state.context;return"}"==cx.type&&cx.align&&stream.eat(">")?(state.context=new Context(cx.indented,cx.column,cx.type,null,cx.prev),"operator"):!1}},modeProps:{closeBrackets:{triples:'"'}}}),def("text/x-kotlin",{name:"clike",keywords:words("package as typealias class interface this super val var fun for is in This throw return break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix"),types:words("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),intendSwitch:!1,indentStatements:!1,multiLineStrings:!0,blockKeywords:words("catch class do else finally for if where try while enum"),defKeywords:words("class val var object package interface fun"),atoms:words("true false null this"),hooks:{'"':function(stream,state){return state.tokenize=tokenKotlinString(stream.match('""')),state.tokenize(stream,state)}},modeProps:{closeBrackets:{triples:'"'}}}),def(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:words("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),types:words("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),blockKeywords:words("for while do if else struct"),builtin:words("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),atoms:words("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),indentSwitch:!1,hooks:{"#":cppHook},modeProps:{fold:["brace","include"]}}),def("text/x-nesc",{name:"clike",keywords:words(cKeywords+"as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),types:words(cTypes),blockKeywords:words("case do else for if switch while struct"),atoms:words("null true false"),hooks:{"#":cppHook},modeProps:{fold:["brace","include"]}}),def("text/x-objectivec",{name:"clike",keywords:words(cKeywords+"inline restrict _Bool _Complex _Imaginery BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),types:words(cTypes),atoms:words("YES NO NULL NILL ON OFF true false"),hooks:{"@":function(stream){return stream.eatWhile(/[\w\$]/),"keyword"},"#":cppHook,indent:function(_state,ctx,textAfter){return"statement"==ctx.type&&/^@\w/.test(textAfter)?ctx.indented:void 0}},modeProps:{fold:"brace"}}),def("text/x-squirrel",{name:"clike",keywords:words("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),types:words(cTypes),blockKeywords:words("case catch class else for foreach if switch try while"),defKeywords:words("function local class"),typeFirstDefinitions:!0,atoms:words("true false null"),hooks:{"#":cppHook},modeProps:{fold:["brace","include"]}});var stringTokenizer=null;def("text/x-ceylon",{name:"clike",keywords:words("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),types:function(word){var first=word.charAt(0);return first===first.toUpperCase()&&first!==first.toLowerCase()},blockKeywords:words("case catch class dynamic else finally for function if interface module new object switch try while"),defKeywords:words("class dynamic function interface module object package value"),builtin:words("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),isPunctuationChar:/[\[\]{}\(\),;\:\.`]/,isOperatorChar:/[+\-*&%=<>!?|^~:\/]/,numberStart:/[\d#$]/,number:/^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,multiLineStrings:!0,typeFirstDefinitions:!0,atoms:words("true false null larger smaller equal empty finished"),indentSwitch:!1,styleDefs:!1,hooks:{"@":function(stream){return stream.eatWhile(/[\w\$_]/),"meta"},'"':function(stream,state){return state.tokenize=tokenCeylonString(stream.match('""')?"triple":"single"),state.tokenize(stream,state)},"`":function(stream,state){return stringTokenizer&&stream.match("`")?(state.tokenize=stringTokenizer,stringTokenizer=null,state.tokenize(stream,state)):!1},"'":function(stream){return stream.eatWhile(/[\w\$_\xa1-\uffff]/),"atom"},token:function(_stream,state,style){return"variable"!=style&&"variable-3"!=style||"."!=state.prevToken?void 0:"variable-2"}},modeProps:{fold:["brace","import"],closeBrackets:{triples:'"'}}})});