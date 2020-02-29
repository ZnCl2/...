

datePos = location.pathname.lastIndexOf("/");

var storyDate = location.pathname.substring(datePos, 4);

storyDate = storyDate.substring(0, 4) + "-" + storyDate.substring(4, 6) + "-" + storyDate.substring(6, 8);

var dateOfNow = new Date();

var today = dateOfNow.getFullYear() + "-" + (dateOfNow.getMonth() + 1) + "-" + dateOfNow.getDate();

dateDiff = dayMinus(storyDate, today);

var isExpired = "";

var username = getCookie("wsjcu");
var useremail = getCookie("wsjce");
var password = getCookie("wsjcp");

host = window.location.hostname;
if (host == 'cn.wsj.com' || host == 'chinese.wsj.com' || host == 'hk.wsj.com')
{
	host = 'https://id.cn.wsj.com';
}	
else
{
	host = 'http://' + host;
}

dest = "url=" + encodeURIComponent(document.URL);

if ((dateDiff > 3) && ((username == "" && useremail == "") || password == "")) 
{

	document.getElementById("A").innerHTML = '<div data-module-id="9" data-module-name="article.app/lib/module/articleSnippet" data-module-zone="article_snippet" class="zonedModule" style="height:45em"><div class="snippet"><div class="wsj-snippet-login"><span class="wsj-snippet-login-text">订户专享全文阅读，</span><span><a class="logInLink" href="../sysasp/registration.html">免费注册</a> 或 <a class="logInLink" href="' + host + '/gb/sysasp/login.html?' + dest + '" ref="nofollow" data-widget="LIFP.login">登录</a></span><a class="logInLink" href="../sysasp/registration.html"><img style="width:100%" src="http://cn.wsj.com/gb/img/LoginAD.jpg"></a></div></div></div>';

	document.getElementById("A").style.color = "#303030";
	document.getElementById("SwitchL").innerHTML = "";
	isExpired = "yes";
}

function dayMinus(asStartvalue,asEndvalue) {  
	var loinStart = asStartvalue.split("-");
	var loinEnd = asEndvalue.split("-");
	var loStart = new   Date(loinStart[0],loinStart[1]-1,loinStart[2],0,0,0,0);
	var loEnd = new   Date(loinEnd[0],loinEnd[1]-1,loinEnd[2],0,0,0,0);
	
	return (loEnd.getTime()-loStart.getTime())/(1000*24*3600);  
}

