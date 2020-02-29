var dUserName = getCookie("wsjcu");



var thecolor = 0;
var colors = new Array(10);
colors[0] = "#666";
colors[1] = "#777";
colors[2] = "#888";
colors[3] = "#999";
colors[4] = "#AAA";
colors[5] = "#BBB";
colors[6] = "#CCC";
colors[7] = "#DDD";
colors[8] = "#EEE";
colors[9] = "#FFF";

function setColumnNameColor() {
if (thecolor < 10) {
	if (document.getElementById("thetitle") != null)
	{
		document.getElementById("thetitle").style.color = colors[thecolor];
		thecolor++;
		var t = setTimeout("setColumnNameColor()", 300);
	}
}
else {
	clearTimeout(t);
}
}




function displayslide (theslides,cs,i,j) {
	var theslides;
	var cs;
	if (document.getElementById(theslides) != null)
	{
		var slidesnumber=document.getElementById(theslides).getElementsByTagName("div").length;
		for (var k=0;k<slidesnumber; k++) {
		document.getElementById(theslides).getElementsByTagName("div")[k].style.display="none";
		}
		document.getElementById(theslides).getElementsByTagName("div")[cs].style.display="";
		var currentslide=cs;
		document.getElementById(i).innerHTML=currentslide + 1;
		document.getElementById(j).innerHTML=slidesnumber;
	}
}

function prevnext(theslides,m,i,j) {
var m;
var currentslide = document.getElementById(i).innerHTML-1;
var slidesnumber = document.getElementById(j).innerHTML;
manualforward=1
if (m==0) {
currentslide --
} else {
currentslide ++
}

if (currentslide==-1) {
currentslide = slidesnumber -1;
}

if (currentslide==slidesnumber) {
currentslide = 0;
}

displayslide (theslides,currentslide,i,j);
}

displayslide ("slides",0,"thisslide","allslides");
if (document.getElementById("slides") != null)
{
	document.getElementById("slides").innerHTML=document.getElementById("slides").innerHTML.replace(/奥运视频：/g,"").replace(/原声视频：/g,"").replace(/视频：/g,"");
}
displayslide ("vslides",0,"thisvslide","allvslides");
if (document.getElementById("vslides") != null)
{
	document.getElementById("vslides").innerHTML=document.getElementById("vslides").innerHTML.replace(/奥运视频：/g,"").replace(/原声视频：/g,"").replace(/视频：/g,"");
	document.getElementById("vslides").style.display="block";
}
if (document.getElementById("slides") != null)
{
	document.getElementById("slides").style.display="block";
}