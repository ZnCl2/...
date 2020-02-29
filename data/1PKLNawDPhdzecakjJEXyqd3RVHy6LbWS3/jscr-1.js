var keep="";
var lsrc;

function on(src,txtup) {
if (!src.contains(event.fromElement)) {
  src.style.cursor = 'hand';
  src.bgColor = '#D4D4D4';
  keep = txtup;
  window.status = txtup;
  return true;
}
}

function sstat() {
  window.status = keep;
  setTimeout('window.status = keep',1);
  setTimeout('window.status = ""',3000);
  return true;
}

function off(src) {
if (!src.contains(event.toElement)) {
  src.style.cursor = 'default';
  src.bgColor = '#DDDDDD';
  window.status = ' ';
 }
}

function mclick(src) {
 if(event.srcElement.tagName=='TD') {
  lsrc = src;
  lsrc.bgColor = '#C0C0C0';
  setTimeout("lsrc.children.tags('a')[0].click()",200);
  setTimeout("lsrc.bgColor = '#D4D4D4'",100);
 }
}


function ImgOpen(url)
{
var w = window.open("cont/imgs.html", "imgs", "height=585,width=780,status=yes,toolbar=no,menubar=no,location=no,resizable=no");
var tmpImg = new Image();
tmpImg.src = url;
if (tmpImg.width > 780 || tmpImg.height > 585) {
if (tmpImg.width > tmpImg.height) {
w.document.images["imgs"].width = "780";
tmp = 78000/tmpImg.width;
tmp = (tmp/100)*tmpImg.height;
w.document.images["imgs"].height = tmp;
} else {
w.document.images["imgs"].height = "585";
tmp = 78000/tmpImg.height;
tmp = (tmp/100)*tmpImg.width;
w.document.images["imgs"].width = tmp;
}
}
w.document.images["imgs"].src = tmpImg.src;
}

function sendMail( text ) {
	window.open("core/sendmail.php?mail="+text, "mail", "height=380,width=490,status=yes,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=1");
}

// Funções do Load

function start_load(){
show_load()
barra( 0 )
}

function barra( pos ){
bar.style.clip="rect(0 "+pos+" auto 0)"
window.status="Carregando... "+pos/2+"%"
}

function show_load(){
if (document.all) {
	tela_load.style.visibility="visible";
	baranchor.style.visibility="visible";
}
}

function close_load(){
window.status=""
if (document.all) {
	tela_load.style.visibility="hidden";
	baranchor.style.visibility="hidden"
}
}

// Função Fade

startColor = "#BD1010";
endColor = "#000000";

stepIn = 20; // delay when fading in 
stepOut = 20; // delay when fading out 

hexa = new makearray(16); 
for(var i = 0; i < 10; i++) 
hexa[i] = i; 
hexa[10]="a"; hexa[11]="b"; hexa[12]="c"; 
hexa[13]="d"; hexa[14]="e"; hexa[15]="f"; 

document.onmouseover = domouseover; 
document.onmouseout = domouseout; 

startColor = dehexize(startColor.toLowerCase()); 
endColor = dehexize(endColor.toLowerCase()); 

var fadeId = new Array(); 

function dehexize(Color){ 
var colorArr = new makearray(3); 
for (i=1; i<7; i++){ 
for (j=0; j<16; j++){ 
if (Color.charAt(i) == hexa[j]){ 
if (i%2 !=0) 
colorArr[Math.floor((i-1)/2)]=eval(j)*16; 
else 
colorArr[Math.floor((i-1)/2)]+=eval(j); 
} 
} 
} 
return colorArr; 
} 

function domouseover() { 
if(document.all){ 
var srcElement = event.srcElement; 
if (srcElement.tagName == "A") {
fade(startColor,endColor,srcElement.uniqueID,stepIn); 
}
} 
} 

function domouseout() { 
if (document.all){ 
var srcElement = event.srcElement; 
if (srcElement.tagName == "A") 
fade(endColor,startColor,srcElement.uniqueID,stepOut); 
} 
} 

function makearray(n) { 
this.length = n; 
for(var i = 1; i <= n; i++) 
this[i] = 0; 
return this; 
} 

function hex(i) { 
if (i < 0) 
return "00"; 
else if (i > 255) 
return "ff"; 
else 
return "" + hexa[Math.floor(i/16)] + hexa[i%16];} 

function setColor(r, g, b, element) { 
var hr = hex(r); var hg = hex(g); var hb = hex(b); 
element.style.color = "#"+hr+hg+hb; 
} 

function fade(s,e, element,step){ 
var sr = s[0]; var sg = s[1]; var sb = s[2]; 
var er = e[0]; var eg = e[1]; var eb = e[2]; 

if (fadeId[0] != null && fade[0] != element){ 
setColor(sr,sg,sb,eval(fadeId[0])); 
var i = 1; 
while(i < fadeId.length){ 
clearTimeout(fadeId[i]); 
i++; 
} 
} 

for(var i = 0; i <= step; i++) { 
fadeId[i+1] = setTimeout("setColor(Math.floor(" +sr+ " *(( " +step+ " - " +i+ " )/ " +step+ " ) + " +er+ " * (" +i+ "/" + 
step+ ")),Math.floor(" +sg+ " * (( " +step+ " - " +i+ " )/ " +step+ " ) + " +eg+ " * (" +i+ "/" +step+ 
")),Math.floor(" +sb+ " * ((" +step+ "-" +i+ ")/" +step+ ") + " +eb+ " * (" +i+ "/" +step+ ")),"+element+");",i*step); 
} 
fadeId[0] = element; 
}