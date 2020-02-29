//Omniture Variables Batched List

// Log
// Add s.eVar23 = getCookie("_ncg_id_"); ----- by TianFei on 20160713

if (location.href.toUpperCase().indexOf("GB") > 0) {
	s.charSet = "GB2312";
	s.prop8 = "CWSJ Online GB";
} else {
	s.charSet = "Big5";
	s.prop8 = "CWSJ Online BIG5";
}

s.channel = "Chinese WSJ";
s.server = "cn.wsj.com";
s.wsjcx = getCookie("wsjcx");

var abasedocid=location.href.substring(location.href.lastIndexOf("\/") + 1).replace(location.hash, "").replace(location.search, "").replace(".asp", "").replace(".shtml", "");

s.pageName = "CWSJ_" + atype + "_" + abasedocid;
s.prop1 = "Article";
s.prop3 = "CWSJ_" + s.prop1 + "_" + atype;
//s.eVar3=username;
s.eVar4 = s.pageName;
s.prop5 = location.href.replace(location.hash, "").replace(location.search, "");
s.prop6 = location.href;
s.prop7 = "off";
s.prop9 = "free";
s.prop10 = s.prop3 + "_" + s.prop4 + "_" + s.prop5;
s.eVar11 = s.channel;

if (location.href.toUpperCase().indexOf("VID") > 0) {
	s.prop19 = "video";
} else if (location.href.toUpperCase().indexOf("PHO") > 0) {
	s.prop19 = "photos";
} else if (location.href.toUpperCase().indexOf("BOG") > 0) {
	s.prop19 = "blogs";
} else if (location.href.toUpperCase().indexOf("_COMMENTS.SHTML") > 0) {
	s.prop19 = "comments";
} else {
	s.prop19 = "article";	
}

s.prop22 = s.prop2 + "_" + s.prop1 + "_" + s.pageName;
s.eVar23 = getCookie("_ncg_id_");
s.prop24 = "Edition_China";

if (username != "" || useremail != "") {
	s.prop27 = "CWSJ_login_yes";
	s.eVar3 = s.wsjcx
	s.prop25 = s.wsjcx
} else {
	s.prop27 = "CWSJ_" + s.prop9;
}

//s.prop25=username;
s.eVar25 = s.prop2;
s.prop26 = ("CWSJ_" + atype).replace(" story", "");

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

s.eVar31 = weekday[d.getDay()];
s.eVar32 = d.getHours() + ":00";

s.events = "event12,event18";

s.hier1 = s.channel + "," + s.prop1 + "," + s.prop2 + "," + s.prop26 + "," + s.prop22 + "," + s.prop3 + "," + s.prop4 + "," + s.prop5;
s.hier2 = s.channel + "," + s.prop19 + "," + s.prop2 + "," + s.prop3;
s.hier3 = s.channel + "," + s.prop2 + "," + s.prop26 + "," + s.pageName;
s.hier4 = s.channel + "," + s.prop2 + "," + s.prop1;
//Omniture Variables End