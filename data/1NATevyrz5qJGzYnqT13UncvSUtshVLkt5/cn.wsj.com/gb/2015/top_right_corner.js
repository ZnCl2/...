function getCookie(c_name) {
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}

var username = getCookie("wsjcu");
var useremail = getCookie("wsjce");
var password = getCookie("wsjcp");
var remote_user = getCookie('REMOTE_USER');

di = document.getElementById('fake_subscribe_container');
mi = document.getElementById('masthead_small_screen_container');
current_url = encodeURI(window.location.href);
backurl = "backurl="+current_url;
//logout_url = "https://" + location.hostname + "/gb/sysasp/2008unauthen.asp?"+backurl;
if (location.hostname == "cn.wsj.com" || location.hostname == "chinese.wsj.com" || location.hostname == "hk.wsj.com") 
{
	logout_url = "https://id.cn.wsj.com/gb/sysasp/2008unauthen.asp?"+backurl;
}
else
{
	logout_url = "https://" + location.hostname + "/gb/sysasp/2008unauthen.asp?"+backurl;
}
console.log(logout_url);
if ((username == "" && useremail == "") || password == "") {

	if (location.hostname == "cn.wsj.com" || location.hostname == "chinese.wsj.com" || location.hostname == "hk.wsj.com") 
	{
		$host = "https://id.cn.wsj.com";
	}
	else
	{
		$host = "https://" + location.hostname;
	}
	if (location.pathname == "/index.asp")
	{
		$dest = "HomePage";
	}
	else
	{
		$dest = "url=" + encodeURIComponent(document.URL);
	}

	di.insertAdjacentHTML('afterbegin','	 <span class="fake-subscribe"  data-reactid=".0.1.0.0.1.0.0.0.0.0" style="border-right:none;right:0;left:initial;position:absolute;white-space: nowrap;"><a href ="' + $host + '/gb/sysasp/registration.html">免费注册</a> | <a href ="' + $host + '/gb/sysasp/login.html?' + $dest + '">登录</a></span><br><br>');
	
	
	mi.insertAdjacentHTML('afterbegin','  <a style="  font-size: 1.2rem; font-weight: 500; display: inline-block; position: relative; top: 8px;" href="'+$host+'/gb/sysasp/registration.html" rel="nofollow" data-reactid=".0.1.0.0.2.0">免费注册</a> <span style="  font-size: 1.2rem; font-weight: 500; display: inline-block; position: relative; top: 8px;">|</span> <a style="  font-size: 1.2rem; font-weight: 500; display: inline-block; position: relative; top: 8px;" href="'+$host+'/gb/sysasp/login.html?'+$dest+'" rel="nofollow" data-reactid=".0.1.0.0.2.0">登录</a>	  <a style="  font-size: 1.2rem;	  font-weight: 500;	  display: none;	  position: relative;	  top: 8px;		margin-left: 10px;	  border-left: 1px solid #ccc;	  padding-left: 12px;"href="https://id.wsj.com/access/509b1a086458232f6e000002/latest/login_standalone.html?url=http%3A%2F%2Fwww.wsj.com" rel="nofollow" data-reactid=".0.1.0.0.2.1">Sign In</a>');
	
	
	
}
else {

	di.insertAdjacentHTML('beforeend','<span class="fake-subscribe"  data-reactid=".0.1.0.0.1.0.0.0.0.0" style="border-right:none;right:0;left:initial;position:absolute;white-space: nowrap;">欢迎 '+ escape(username) + '&nbsp;&nbsp;|&nbsp;&nbsp;<a href ="'+logout_url+'">登出</a></span><br><br>');
	

	mi.insertAdjacentHTML('beforeend','<span style="  font-size: 1.2rem; font-weight: 500; display: inline-block; position: relative; top: 8px;">欢迎 ' + escape(username) +  '&nbsp;&nbsp;|&nbsp;&nbsp;</span><a style="  font-size: 1.2rem; font-weight: 500; display: inline-block; position: relative; top: 8px;" href="'+logout_url+'" rel="nofollow" data-reactid=".0.1.0.0.2.0">登出</a>');

}
if (remote_user=="")
{
			
		di.insertAdjacentHTML('beforeend','		  <div class="ad2-wrapper" data-reactid=".0.1.0.0.1.0.0.0.0.3" style="text-align:right">  <div class="wsj-responsive-ad-wrap navpromobottom" id="AD_CP" data-cb-ad-id="navigationPromo" data-reactid=".0.1.0.0.1.0.0.0.0.3.0" ></div> </div>');

}
 
window.onresize = function () {
	var caption = document.querySelectorAll('.wsj-disclaimer.wsj-card-feature');
	if (caption.length <= 0) {
		var x = document.querySelectorAll('.FP_BUCKET_BUSINESS .BUCKET-LEAD .wsj-card-body');
		x[0].insertAdjacentHTML("beforeBegin", '<h4 class="wsj-disclaimer wsj-card-feature" data-reactid=".0.1.0.4.$/=10.$2/=1$2.$0/=1$0.$16/=1$16.$1/=1$1.$/=10.$0/=11=2$0.1">此内容不属于《华尔街日报》</h4>');	
	}
}
var x = document.querySelectorAll('.FP_BUCKET_BUSINESS .BUCKET-LEAD .wsj-card-body');
x[0].insertAdjacentHTML("beforeBegin", '<h4 class="wsj-disclaimer wsj-card-feature" data-reactid=".0.1.0.4.$/=10.$2/=1$2.$0/=1$0.$16/=1$16.$1/=1$1.$/=10.$0/=11=2$0.1">此内容不属于《华尔街日报》</h4>');
