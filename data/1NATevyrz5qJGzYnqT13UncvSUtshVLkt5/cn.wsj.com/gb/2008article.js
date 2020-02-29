if (document.getElementById("summary") != null)
{
	if (document.getElementById("summary").innerHTML == "[this is the Summary]") {
		document.getElementById("summary").innerHTML = "";
	}
}

var dURL = location.protocol + "\/\/" + location.host + location.pathname;
var dUserName = getCookie("wsjcu");

if(document.getElementById("comments").innerHTML == "") {
	document.getElementById("tabdiv").getElementsByTagName("a")[1].style.display = "none";
	document.getElementById("comattext").style.display = "none";
}

if (document.getElementById("gotocolumn") != null) {
	if (document.getElementById("gotocolumn").getElementsByTagName("a")[0] != null)
	{
		document.getElementById("gotocolumn").getElementsByTagName("a")[0].style.fontWeight = "bold";
		document.getElementById("gotocolumn").getElementsByTagName("a")[0].style.marginLeft = "2";
		document.getElementById("gotocolumn").getElementsByTagName("a")[0].style.marginRight = "2";
	}
}


var thedate = new Date();
var year = thedate.getFullYear();
var month = thedate.getMonth()+1;
var date = thedate.getDate();
var weekday=new Array(7);
weekday[0]="�P����";
weekday[1]="�P���@";
weekday[2]="�P���G";
weekday[3]="�P���T";
weekday[4]="�P���|";
weekday[5]="�P����";
weekday[6]="�P����";
var day = weekday[thedate.getDay()];
if (document.getElementById("thedate") != null) {
	document.getElementById("thedate").innerHTML = year + " " + "�~" + " " + month + " " + "��" + " " + date + " " + "��" + "   " + day;
}
if (document.getElementById("publication-date") != null) {
	document.getElementById("publication-date").innerHTML = year + " " + "�~" + " " + month + " " + "��" + " " + date + " " + "��" + "   " + day;
}

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
			document.getElementById("thetitle").getElementsByTagName("a")[0].style.color = colors[thecolor];
			thecolor++;
			var t = setTimeout("setColumnNameColor()", 300);
		}
	}
	else {
		clearTimeout(t);
	}
}


document.getElementById("datetime").innerHTML = document.getElementById("datetime").innerHTML.replace("�~", "�~ ").replace("��", "�� ").replace("��", "�� ");


var req;
var url;
//FName For Example:	20091123/bus090451.asp
function ShowComments (FName) {	
	//alert(FName);
	var encode1="";

	if (window.location.href.indexOf("big5")>0) {
		encode1="big5";
	}
	else {
		encode1="gb";
	}
	
	url=FName.replace(/\//g, "-");

	dateFolder=FName.substring(0, 8);
	url = "../" + dateFolder + "/comments/" + encode1 + "-" + url;
	url=url.replace(".shtml", ".asp");

	
	$.ajax({ cache: false,
		type: 'get',
		url: url,
		success: function (data) {
			if (document.getElementById("comarea")) {
				//document.getElementById("comarea").innerHTML = req.responseText;
				if (data.indexOf("id='errorMark'")<1)
					document.getElementById("comarea").innerHTML = data;
			}
			else {
				//document.getElementById("comments").innerHTML = req.responseText;
				if (data.indexOf("id='errorMark'")<1)
					document.getElementById("comments").innerHTML = data;
			}
			intCommentsCount = document.getElementById("CommentsCount").value;
			document.getElementById("txtComentsCount").innerHTML = "(" + intCommentsCount + ")";
		},
		error:function (xhr, ajaxOptions, thrownError){
			if(xhr.status==404) {
				//alert(thrownError);
			}
		}
	});
	
	
	//if (window.XMLHttpRequest)
	//{
		//req = new XMLHttpRequest();
	//}
	//else if (window.ActiveXObject)
	//{
	  //req = new ActiveXObject("Microsoft.XMLHTTP");
	//}
	
	//req.onreadystatechange = callback;
	//req.open("GET", url, true);
	//req.send(null);
}

//Modified by TianFei on 12,Oct,2009 -- Begin
//intCommentsCount variable added for retrieving comments number
var intCommentsCount;

function callback()
{
	if (req.readyState == 4)
	{
		if (req.status == 200)
		{
			document.getElementById("comarea").innerHTML = req.responseText;
			intCommentsCount = document.getElementById("CommentsCount").value;
			document.getElementById("txtComentsCount").innerHTML = "(" + intCommentsCount + ")";
		}
	}
}
//Modified by TianFei on 12,Oct,2009 -- End

$(document).ready(function(){
	ShowComments(FileName);
});

var NameField=document.getElementById("name")
if (NameField != null) {
	document.getElementById("name").value=getCookie("wsjcu");
}

function submitform() {
	document.comform.submit();
}

function PrintArticle() {
	var PrintText = "<table border='0' width='100%' cellspacing='0' cellpadding='0' ><tr><td height='17' colspan='4'></td></tr><tr><td width='20' rowspan='2'></td><td align='left' width='420'><img src='../img/2008wsjlogo.gif' alt='The Wall Street Journal' border='0' /></td><td align='right' style='white-space:nowrap;'>  	</td><td width='10' rowspan='2'><img src='../img/b.gif' height='1' width='10' border='0' alt='' /><div style='width:180px;margin-left:5px;border-left:1px solid #ccc;padding-left:5px;float:right;'><span class='boldTwelve'><font style='font-family: Arial, Helvetica, sans-serif'><b>�A���D�ܡH</b></font></span><div width='100%'><img src='g.gif' alt='' width='100%' height='1'></div><div width='100%'><img src='b.gif' alt='' width='100%' height='5'></div><img src='../img/reprintsIcon.gif' border='0' align='top' vspace='0' hspace='4'><font class='elevenpxArial'>�ѯ��ڵ�S�u�b���W�ʶR�T�ذӫ~�G���y�B���P�M�غ�����������(<b>cn.WSJ.com</b>)<br/></div></td></tr><tr><td width='418' height='12' colspan='1' align='center'><!-- ----- Date starts here ----- --><p style='font-family: times new roman, times, arial;font-size: 15px;font-weight: bold;margin-top: 7px; margin-bottom: 0px;'></p><!-- ----- Date ends here ----- --></td></tr><tr><td width='630' height='23' colspan='4'></td></tr></table><!-- ----- Header Table Ends Here ----- --><!-- ----- Article Title and Author Table Starts Here ----- --><table border='0' width='97%' cellspacing='0' cellpadding='0'><tr><td width='20' rowspan='2'><img src='../img/b.gif' height='1' width='20' border='0' alt='' /></td><td></td></tr><tr><td><p class='articleTitle' style='margin: 0px 0px 0px 0px;' id=printheadline>[headline]</p><div style='padding: 13px 0px 0px 0px; margin:0px; color:#666; font: bold 16px/17px Times New Roman, Times, Serif;'></div><span class='aTime' id=T>[time]</span></span><br/></div><p><div style='float:left;width:0px;'></div><span style='font-size: 14px;' id=printA>[bodytext]</span></p><!-- article end --><table width='477'  cellpadding='0' cellspacing='0' border='0'><tr><td width='70' style='line-height:1px;width:70px;'>&nbsp;</td><td width='407'  style='font-family: Arial, Helv, Helvetica; font-size: 11px; font-weight: bold;'>������}:<br/><b><span id=Link>[URL]</span></b><br/>�K�O�n���غ��������������(cn.WSJ.com)�A�\Ū��h��m����<br/><br/>���n����ĳ�H�ЩM�Dã�����q�_�ʿ�ƳB�pô<br/>�q�ܡG(010)8400 7799<br/>�ǯu�G(010)8400 7397<br/>�q�l�l��GInfo.chinese@dowjones.com</td></tr></table></td></tr></table><center><div style='margin:28px 0px 9px 0px;width:617px;' align='center' class='b11'>        ����ؤ�r���e�k�Dã�����q�Ҧ��A������έӤH���g�\�i�A���o�զ�����ϥ�<br>	Copyright 2006 - 2008 Dow Jones &amp; Company, Inc.  All Rights Reserved</div></center>";

	var headline1=$("#headline h1").html();
	var bodytext1=document.getElementById("A").innerHTML;
	time1=document.getElementById("datetime").innerHTML;
	
	document.body.innerHTML=PrintText;
	document.body.style.backgroundColor = "#FFF";
	document.getElementById("printA").innerHTML=bodytext1;
	document.getElementById("printheadline").innerHTML=headline1;
	document.getElementById("T").innerHTML=time1;
	document.getElementById("bottomlink").style.display = "none";
	document.getElementById("Link").innerHTML=encodeURI(window.location.href);

	window.print();
}


function MSN(event) {
	/* var MSN1="";
	var headline = document.getElementById("headline").innerHTML;
	MSN1=window.location.href.replace(/\?source=.*/g,"");
	MSN1="���ˤ@�gWSJ���峹�G" + headline + " �]cn.WSJ.com�^\r\n" + MSN1 + "?source=MSN";

	document.getElementById("HeadURL").innerHTML="<textarea id=copyall rows=6 cols=80 style='font-size:12px; color:#303030;border:0px; background-color:whitesmoke; padding:15px 15px 15px 15px; overflow:auto;' onblur='hidetoolpanel();'>" + MSN1 + "</textarea>" + "<div style='color:#303030;font-size:12px;margin-left:10px;background: url(../../pictures/format/dot3.gif) repeat-x top; padding-top: 4px; padding-bottom:3px;'>�z�i�H�ƻs�W��奻�ؤ�����r�A�óq�LMSN�ζl��o�e���z���n��</div>";
	document.getElementById("WrapHeadURL").style.display = "block";
	document.getElementById("WrapHeadURL").style.left = event.clientX+document.body.scrollLeft - 250;
	document.getElementById("WrapHeadURL").style.top = event.clientY+document.body.scrollTop + 30;
	document.getElementById("copyall").focus();
	document.getElementById("copyall").select(); */
}

function Blog(event) {
	/* var MSN1="";
	var headline = document.getElementById("headline").innerHTML;
	MSN1=window.location.href.replace(/\?source=.*/g,"");

	var Blog1="<span style='font-size:8px;color:990000'>&#9600;</span>&nbsp;";

	Blog1 +="<a target=_blank style='color:0066cc;font-weight:bolder;font-size:14px' href=" + MSN1 + "?source=blog>" + headline + "</a>";

	document.getElementById("HeadURL").innerHTML="<textarea id=copyall rows=6 cols=80 style='font-size:12px; color:#303030;border:0px; background-color:whitesmoke; padding:15px 15px 15px 15px; overflow:hidden;' onblur='hidetoolpanel();'>" + Blog1 + "</textarea>" + "<div style='color:#303030;font-size:12px;margin-left:10px; background: url(../../pictures/format/dot3.gif) repeat-x top; padding-top: 4px; padding-bottom:3px;'>�z�i�H�ƻs�W��奻�ؤ�����r�A���߶K����HTML�s��\�઺�իȩΪ̽׾¤�</div>";
	document.getElementById("WrapHeadURL").style.display = "block";
	document.getElementById("WrapHeadURL").style.left = event.clientX+document.body.scrollLeft - 330;
	document.getElementById("WrapHeadURL").style.top = event.clientY+document.body.scrollTop + 30;
	document.getElementById("copyall").focus();
	document.getElementById("copyall").select(); */
}

function hidetoolpanel() {
	document.getElementById("WrapHeadURL").style.display = "none";
}

function WriteEditor() {
	window.location = 'mailto:Info.chinese@dowjones.com?subject=Reader Feedback&body=Dear Editor, %0D%0A%0D%0AI would like to comment on this article (' + window.location.href + '). I hope you can publish my letter on Chinese.WSJ.com. %0D%0A%0D%0A%0D%0A%0D%0A�s��z�n, %0D%0A%0D%0A�ڷQ�N���g�峹�o��p�U���� (' + window.location.href + '). �Ʊ榳���|�Z�n�C%0D%0A%0D%0A%0D%0A%0D%0A';
}

function ForwardEmail() {
	window.open('../emailforward.asp','emailforward','height=524, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
}

// Added by TianFei on 2013.Oct.11 --- Begin
function ChangeImage()
{
	var ranum = Math.round((Math.random()) * 100000000);
	document.getElementById("codeImage").src="../sysasp/imgchk/validatecode.asp?r=" + ranum;
	document.getElementById("ValiSymbol").value="";
	document.getElementById("ValiSymbol").focus();
} 
// Added by TianFei on 2013.Oct.11 --- End

$(document).ready(function() {
	$("#videolink.video545 span").hover(function() {
		$(this).css('cursor', 'pointer');
		$(this).css('background-position', '-40px -310px');
	}, function() {
		$(this).css('background-position', '-40px 300px');
	});

	$("#videolink.video545 span").click(function() {
		var guid = $("#videolink").attr("videoGUID");

		var content = $("#videolink .videoContainer").html();
		content = content.replace("autoStart=false", "autoStart=true");
		$("#videolink .videoContainer").html(content);
		
		$("#videolink span").css("background-image", "url('')");
		$("#videolink span").css("width", "0px");
		$("#videolink span").css("height", "0px");
	});
	
	
	$("#videolink.video262 span").hover(function() {
		$(this).css('cursor', 'pointer');
		$(this).css('background-position', '-60px -490px');
	}, function() {
		$(this).css('background-position', '-60px 120px');
	});
	
	$("#videolink.video262 span").click(function() {
		var guid = $("#videolink").attr("videoGUID");

		var content = $("#videolink .videoContainer").html();
		content = content.replace("autoStart=false", "autoStart=true");
		$("#videolink .videoContainer").html(content);
		
		$("#videolink span").css("background-image", "url('')");
		$("#videolink span").css("width", "0px");
		$("#videolink span").css("height", "0px");
	});
});
