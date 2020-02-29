$.dxl = {};
$.dxl.extend = $.extend;
$.dxl.fn = $.fn;
var windowHttp = window.location.protocol == "https:" ? "https:" : "http:";
var dxlfiles = window.location.protocol == "https:" ? "s" : "";
var dxlHost = window.location.hostname.split(".");
var windowServer = dxlHost[2];
var s4Com = windowServer == "com" || windowServer == undefined ? "com" : windowServer;
var s4Net = windowServer == "com" || windowServer == undefined ? "net" : windowServer;
var dxlHttp = {
	v:"201409021744",
	ie:$.browser != undefined && $.browser.msie && $.browser.version==6.0 ? true : false,
	com:windowHttp + "//www.daoxila." + s4Com + "/",
	cityCom:windowHttp + "//" + dxlHost[0] + ".daoxila." + s4Com + "/",
	b:windowHttp + "//b.daoxila." + s4Com + "/",
	my:windowHttp + "//my.daoxila." + s4Com + "/",
	cms:windowHttp + "//cms.daoxila." + s4Com + "/",
	app:windowHttp + "//app.daoxila." + s4Com + "/",
	i:windowHttp + "//i" + dxlfiles + ".dxlfile." + s4Com + "/",
	//net:windowHttp + "//script.daoxila." + s4Net + "/",
	net:windowHttp + "//s4" + dxlfiles + ".dxlfile." + s4Com + "/",
	imageNet:windowHttp + "//image.daoxila." + s4Net + "/",
	s1:windowHttp + "//s1" + dxlfiles + ".dxlfile." + s4Com + "/",
	s4:windowHttp + "//s4" + dxlfiles + ".dxlfile." + s4Com + "/",
	m:windowHttp + "//m.daoxila." + s4Com + "/",
	e:windowHttp + "//event.daoxila.com/"
}
var dxlGALoginStatus = "unknown";
var	dxlCom = "daoxila.com"; 
var dxlHttpCom = dxlHttp.com;
var currentHost = $("head").attr("currentHost");
var dxlHttpNet = currentHost == undefined || currentHost == "" ? dxlHttp.net : currentHost;

(function($) {
	$.extend(String.prototype, {
		'isPhone': function() {
            return (new RegExp(/^((1(?:3[4-9]|5[012789]|8[78])\d{8}|1(?:3[0-2]|5[56]|8[56])\d{8}|18[0-9]\d{8}|1[35]3\d{8})|14[57]\d{8}|170[059]\d{7}|176\d{8})$/).test(this));
        },
		'isMail': function() {
            return (new RegExp(/^([_a-zA-Z\d\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/).test(this));
        },
		'isPassword': function() {
            return (new RegExp(/^[a-zA-Z0-9_-]{6,18}$/).test(this));
        }, 
		'isName': function() {
            return (new RegExp(/^[a-z0-9_-]{6,18}$/).test(this));
        },
		'isMoney': function() {
            return (new RegExp(/^[1-9]\d*$/).test(this));
        },
		'isNull': function() {
            return $.trim(this) == "" ? false : true;
        },
		'isStringLength': function() {
            return this.replace(/([\u4E00-\u9FA5\uf900-\ufa2d])/g,'aa').length;
        },
		'isAjaxMail': function(execute) {
			$.getJSON(dxlHttp.my + "jsonp/index?act=checkEmail&account="+encodeURIComponent(this)+"&callback=?",function(data){
				$.isFunction(execute) ? execute(data) : "";
			});
        },
		'isAjaxName': function(execute) {
			$.getJSON(dxlHttp.my + "jsonp/index?act=checkNickName&nickname="+encodeURIComponent(this)+"&callback=?",function(data){
				$.isFunction(execute) ? execute(data) : "";
			});
        },
		'isAjaxPhone': function(execute) {
			$.getJSON(dxlHttp.my + "jsonp/index?act=checkMoblie&account="+encodeURIComponent(this)+"&callback=?",function(data){
				$.isFunction(execute) ? execute(data) : "";
			});
        }
	});
})(jQuery);

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

(function($) {
	$.ajaxSetup({cache:true});
	var v = dxlHttp.v;
	var net = dxlHttpNet + "public/";
	var frameSet = [
		{name:"ad",js:"public/js/jquery.mas.js",css:""},
		{name:"datepicker",js:"public/js/jquery.widgets.datepicker.js",css:"public/css/jquery.custom.css"},
		{name:"datepickerNoCss",js:"public/js/jquery.widgets.datepicker.js",css:""},
		{name:"tools",js:"public/js/jquery.tools.js",css:""},
		{name:"dxlSlider",js:"public/js/jquery.dxlSlider.js",css:""},
		{name:"alert",js:"public/js/jquery.alert.js",css:"public/css/jquery.alert.css"},
		{name:"orders",js:"public/js/jquery.orders.js",css:"public/css/jquery.orders.css"},
		{name:"dxl3dRoll",js:"public/js/jquery.dxl3dRoll.js",css:""},
		{name:"orders-mall",js:"public/js/jquery.orders.mall.js",css:"public/css/jquery.orders.mall.css"},
		{name:"dxlShare",js:"public/js/jquery.dxlShare.js",css:""},
		{name:"confirm",js:"public/js/jquery.confirm.js",css:"public/css/jquery.confirm.css"},
		{name:"uploadify",js:"public/js/jquery.uploadify.min.js",css:""},
		{name:"searchTxt",js:"public/js/jquery.searchTxt.js",css:""},
		{name:"dxldslider",js:"public/js/jquery.dxldslider.js",css:""},
        {name:"waterfall",js:"public/js/jquery.waterfall.js",css:""},
		{name:"falls",js:"public/js/jquery.falls.js",css:""},
		{name:"statistics",js:"public/js/jquery.statistics.js",css:""},
		{name:"json",js:"public/js/jquery.json.js",css:""},
		{name:"md5",js:"public/js/jquery.md5.js",css:""},
		{name:"base64",js:"public/js/jquery.base64.min.js",css:""},
		{name:"umeditor",js:"public/js/jquery.umeditor.min.js",css:"public/css/jquery.umeditor.min.css"},
		{name:"elemtFixed",js:"public/js/jquery.elemtFixed.js",css:""},
		{name:"touchSlider",js:"public/js/jquery.touchslider.js",css:""},
		{name:"evaluate",js:"public/js/jquery.evaluate.js",css:""},
		{name:"dxlCountdown",js:"public/js/jquery.dxlCountdown.js",css:""},
		{name:"dxlCalendar",js:"public/js/jquery.dxlCalendar.js",css:""},
		{name:"dxlTouchEvent",js:"public/js/jquery.dxlTouchEvent.js",css:""},
		{name:"mallOrder",js:"order/js/mallOrder.js",css:"order/css/mallOrder.css"},
		{name:"mPhoto",js:"m/js/mPhoto.js",css:""},
		{name:"bootstrap-datetimepicker",js:"cms/js/bootstrap-datetimepicker.min.js",css:"cms/css/bootstrap-datetimepicker.min.css"}
	];
	$.extend({
		'jsSequence': function(date,execute) {
			var _data = date.frame;
			var _dataLength = _data.length;
			var _dataLengthNum = 0;
			var head = $("head");
			var ajax = function (){
				$(frameSet).each(function(index, fs) {
					if(_data[_dataLengthNum] == fs.name && !fs.loading){
						!fs.css == "" ? head.append('<link href="'+ dxlHttpNet + fs.css + "?v=" + v + '" rel="stylesheet">') : "";
						$.getScript(dxlHttpNet + fs.js + "?v=" + v,function(){
							fs.loading = true;
							ajaxRct();
						});
					}else if(_data[_dataLengthNum] == fs.name){
						ajaxRct();
					}
				});
			}
			var ajaxRct = function(){
				_dataLengthNum++;
				if(_dataLengthNum < _dataLength) ajax(); else $.isFunction(execute) ? execute() : "";
			}
			ajax();
        },
		'dxlcookie':function(name){
			//return $.cookie($.md5(name + "dxl_cookie"));
			return $.base64.decode($.cookie($.md5(name + "dxl_cookie")));
		},
		'isUrlParameters':function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
   			var r = window.location.search.substr(1).match(reg);
    		if (r != null) return decodeURI(r[2]); return null;
		},
		'dxlLayerShow':function(obj){
			var w = $(window).width()/2;
			var h = ($(window).outerHeight()/2) - 50;
			var g_h = $(document).scrollTop();
			var obj_w = obj.width()/2; 
			var obj_h = obj.height()/2; 
			obj.css({"left":w-obj_w,"top":g_h + (h-obj_h),"position":"absolute"});
			return obj;
		},
		'dxlCollection':function(cs,execute){
			var _cs = {id:"",name:"",url:""};
			$.extend(_cs,cs);	
			$.getJSON(dxlHttpCom + "jsonp/?act=addFavoriteHotel&" +  $.param(_cs) + "&callback=?",function(data){
				$.isFunction(execute) ? execute(data) : "";
			});	
		},
		"dxlLodinShow":function(execute){
			$.getJSON(dxlHttp.my + "jsonp/?act=checkloginStatus&callback=?",function(data){
				if(data.code == 1){
					var name = data.user_name ? data.user_name : "新会员";
					$("#topTools .login span").html("您好 " + name + " <a href='"+dxlHttp.my+"user/logout' target='_self'>退出</a> | <a href='"+dxlHttp.my+"user/info' target='_self'>会员中心</a>");
					dxlGALoginStatus = "return";
				}
				$.isFunction(execute) ? execute(data) : "";
				
			});
		},
		"dxlBackgroundShow":function(type,execute){
			$.dxlBackgroundHide();
			$("body").append('<div id="dxlBackgroundDiv" style="z-index:999; position:absolute; top:0; left:0; filter:alpha(opacity=50); opacity: 0.5; -moz-opacity:0.5;"></div>');
			type == "fadeIn" ? $("#dxlBackgroundDiv").hide().fadeIn() : "";
			function dxlBackgroundDivFun(){
				$("#dxlBackgroundDiv").css({"width":$(window).width(),"height":$(document).height()})
			}
			$("#dxlBackgroundDiv").on("resize",dxlBackgroundDivFun);
			dxlBackgroundDivFun();
			$.isFunction(execute) ? execute(data) : "";
		},
		"dxlBackgroundHide":function(type,execute){
			if(type == "fadeOut"){
				$("#dxlBackgroundDiv").fadeOut(function(){
					$("#dxlBackgroundDiv").remove();
				})
			}else{
				$("#dxlBackgroundDiv").remove();
			}
		},
		"googleConversion":function(execute){
			$("#baiduConversion20131225").remove();
			$("head").append('<iframe id="baiduConversion20131225" src="'+dxlHttpCom+'static/baidu_conversion.html?v='+v+'" style="display:none"></iframe>');
			if($.cookie('utm_source') == "google" || $.cookie('utm_source') == "Google" || $.cookie('utm_source') == "GOOGLE"){
				$("#googleConversion20131010").remove();
				$("head").append('<iframe id="googleConversion20131010" src="'+dxlHttpCom+'static/google_conversion.html?v='+v+'" style="display:none"></iframe>');
			}
		},
		"dxlLazyload":function(obj,execute){
			var _obj = $(obj);
			if(_obj.length <= 0) return false;
			function dxlLazyloadFun(){
				if(_obj.position().top < ($(document).scrollTop() + $(window).height()) && !_obj.attr("show")){
					_obj.attr("show",true);
					_obj.find("img[_src]").each(function(index, element) {
						$(this).attr("src",$(this).attr("_src")).removeAttr("_src").hide().fadeIn();
					});
					$.isFunction(execute) ? execute() : "";
				}
			}
			$(window).on("scroll",dxlLazyloadFun);
			dxlLazyloadFun();
		},
		"dxljiri":function(execute){
			$.getJSON(dxlHttpCom + "jsonp/?act=getJiri&city=7&callback=?",function(data){$.isFunction(execute) ? execute(data) : "";});
		},
		"dxljiudian":function(rq,t){
			var _thisDate = rq.split("-");
			var date = new Date();
			var date2 = new Date(Math.floor(_thisDate[0]),(Math.floor(_thisDate[1])-1),Math.floor(_thisDate[2]));
			var days = Math.floor((date2.getTime()-date.getTime())/(24*3600*1000)) + 1;

			if(days > 365){
				return 50;
			}else{
				return parseInt(((days/365) + 0.2) * t) + 1;	
			}
		},
		"dxlLoginPage":function(url){
			$.cookie("from_url_click",url ? url : window.location,{domain:"daoxila.com",path:"/"});
			window.location = dxlHttp.my + "user/login";
		},
		"dxlNavGlobal":function(){
			$.getScript(dxlHttpNet + "public/js/nav/2013.js?v=" + v);
		},
		"dxlGetJSON":function(atc,jsonPar,ex){
			$.getJSON(dxlHttp.com + "jsonp/?act=" + atc + "&" + $.param(jsonPar) + "&callback=?",function(data){
				$.isFunction(ex) ? ex(data) : "";
			});
		},
		"dxlMyGetJSON":function(atc,jsonPar,ex){
			$.getJSON(dxlHttp.my + "jsonp/?act=" + atc + "&" + $.param(jsonPar) + "&callback=?",function(data){
				$.isFunction(ex) ? ex(data) : "";
			});
		},
		"dxlWeiboShare":function(text,img,url){
			var _img = img ? img : dxlHttpNet + "public/img/logo/normal.png";
			var _url = url ? url : dxlHttpCom;
			window.open("http://service.weibo.com/share/share.php?searchPic=false&url=" + encodeURIComponent(_url) + "&appkey=3933900156&title=" + encodeURIComponent(text) + "&pic=" + encodeURIComponent(_img) +"&ralateUid=&language=");
		},
		"dxlCustomerService":function(){
			
			$("#MallCustomerService").remove();
			var MallCustomerService = $('<a href="#Service" id="MallCustomerService" target="_blank"></a>');
			$("body").append(MallCustomerService);
			MallCustomerService.on("click",function(event){
				event.preventDefault();
				window.open("http://b.qq.com/webc.htm?new=0&sid=4008201709&eid=218808P8z8p8x8x8p8q8K&o="+dxlHttp.com+"&q=7");
				//window.open("http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=378034&jid=3193679090&enterurl="+window.location.href+"&pagetitle="+$("title").text()+"&pagereferrer=&firstEnterUrl=&lan=zh&tm=1401167172111",'newwindow','height=450,width=800');
			});
			$(window).on("resize",resizeCss).resize();

			if(dxlHttp.ie){
				MallCustomerService.css("position","absolute");
				$(window).on("scroll",resizeCss);
			}
			function resizeCss(){
				var h = dxlHttp.ie ? $(window).scrollTop() : 0;
				MallCustomerService.css("top",$("header").height() + h + 12);
				if($(window).width() < 1100){
					MallCustomerService.css("left",$(window).width() - 50);
				}else{
					MallCustomerService.css("left",($(window).width()/2) + 500);
				}
			}
		},
		"dxlTopCall":function(_par){
			var par = {
				apple:false,
				android:false
			}
			$.extend(par,_par);
			$("#dxlTopCall").remove();
			var html = "";
			html += '<div id="dxlTopCall">';
			html += '<a href="#top" class="topCall" target="_self"></a>';
			html += par.apple ? '<a href="#apple" class="pingGuo" target="_self"></a>' : "";
			html += par.android ? '<a href="#android" class="anZhuo" target="_self"></a>' : "";
			html += '</div>';
			html += '<div id="dxlTopCallAlertImg1" class="dxlTopCallAlertImg clearfix"><div class="img">';
			html += 'iPhone客户端';
			html += '<div>扫一扫下载到手机<br/>更多下载方式</div></div>';
			html += '</div>';
			html += '<div id="dxlTopCallAlertImg2" class="dxlTopCallAlertImg clearfix"><div class="img">';
			html += 'Android客户端';
			html += '<div>扫一扫下载到手机<br/>更多下载方式</div></div>';
			html += '</div>';

			$("body").append(html);
			var dxlTopCall = $("#dxlTopCall");
			$(window).on("resize",resizeCss).resize();
			$(window).on("scroll",function(){
				if(parseFloat($(window).scrollTop()) > 700){
					$("#dxlTopCall .topCall").css("display","block");
				}else{
					$("#dxlTopCall .topCall").css("display","none");
				}
				resizeCss();
				$("#dxlTopCallAlertImg1").hide();
				$("#dxlTopCallAlertImg2").hide();
			}).scroll();
			
			$("#dxlTopCall .topCall").on("click",function(event){
				event.stopPropagation();
				event.preventDefault();
				$('body,html').animate({scrollTop:0},300);
			});
			
			$("#dxlTopCall .pingGuo,#dxlTopCallAlertImg1").on("mouseover",function(event){
				$("#dxlTopCallAlertImg1").css({
					"top":$("#dxlTopCall").position().top - ($("#dxlTopCallAlertImg1").height() - $("#dxlTopCall").height()) - 2,
					"left":$("#dxlTopCall").position().left - $("#dxlTopCallAlertImg1").width() - 2
				}).show();
			}).on("mouseout",function(event){
				event.stopPropagation();
				event.preventDefault();
				$("#dxlTopCallAlertImg1").hide();
			}).on("click",function(event){
				event.stopPropagation();
				event.preventDefault();
				window.open(dxlHttp.app + "HunYan/iPhone/");
			});
			
			$("#dxlTopCall .anZhuo,#dxlTopCallAlertImg2").on("mouseover",function(event){
				event.stopPropagation();
				event.preventDefault();
				$("#dxlTopCallAlertImg2").css({
					"top":$("#dxlTopCall").position().top - ($("#dxlTopCallAlertImg2").height() - $("#dxlTopCall").height()) - 2,
					"left":$("#dxlTopCall").position().left - $("#dxlTopCallAlertImg2").width() - 2
				}).show();
			}).on("mouseout",function(event){
				event.stopPropagation();
				event.preventDefault();
				$("#dxlTopCallAlertImg2").hide();
			}).on("click",function(event){
				event.stopPropagation();
				event.preventDefault();
				window.open(dxlHttp.app + "HunYan/android/");
			});
			
			
			if(dxlHttp.ie){
				dxlTopCall.css("position","absolute");
				$(window).on("scroll",resizeCss);
			}
			function resizeCss(){
				var h = dxlHttp.ie ? $(window).scrollTop() : 0;
				dxlTopCall.css("top",($(window).height() + h) - dxlTopCall.height());
				
				if($(window).width() < 1100){
					dxlTopCall.css("left",$(window).width() - 50);
				}else{
					dxlTopCall.css("left",($(window).width()/2) + 500);
				}
				
			}

		},
		"dxlDiaoCha":function(){
				$("#dxlDiaoCha").remove();
				var dxlDiaoCha = $('<a href="#dxlDiaoCha" id="dxlDiaoCha" target="_blank"></a>');
				$("body").append(dxlDiaoCha);
				dxlDiaoCha.on("click",function(event){
					event.preventDefault();
					window.open("http://www.sojump.com/jq/3475233.aspx");
				});
				$(window).on("resize",resizeCss).resize();
	
				if(dxlHttp.ie){
					dxlDiaoCha.css("position","absolute");
					$(window).on("scroll",resizeCss);
				}
				function resizeCss(){
					var h = dxlHttp.ie ? $(window).scrollTop() : 0;
					dxlDiaoCha.css("top",$("header").height() + h + 125);
					if($(window).width() < 1100){
						dxlDiaoCha.css("left",$(window).width() - 50);
					}else{
						dxlDiaoCha.css("left",($(window).width()/2) + 500);
					}
				}

		},
		"dxlGuangGao":function(){
			if(!dxlHttp.ie){
				if($.cookie("dxl_ad") != "hide"){
					$.getJSON(dxlHttp.com + "jsonp/?act=getAdLayoutStatus&callback=?",function(data){
						if(data.code == 1){
							var gatc = $('<div id="box_hssy_ad" style="width:680px; height:409px; background:url(http://script.daoxila.net/public/img/ad/140630.png) no-repeat; z-index:1005; cursor:pointer;"><span style="display:block; width:30px; height:30px; cursor:pointer; position:absolute; top:0; right:0;"></span></div>');
							gatc.appendTo("body");
							gatc.dxlLayerFixedShow();
							$.dxlBackgroundShow();
							$("#dxlBackgroundDiv").css({"background-color":"#333333","opacity":"0.6","z-index":"1001"});
							gatc.on("click",function(event){
								event.stopPropagation();
								ga('send','pageview',"/VPTracker/HunYan/Ad/HunShaSheYing-POP");
								setTimeout(function(){
									window.open("http://sh.daoxila.com/HunShaSheYing/?from=hunyan-AD");
								},100);
							});
							gatc.find("span").on("click",function(event){
								event.stopPropagation();
								gatc.remove();
								$.dxlBackgroundHide();
								$.cookie("dxl_ad","hide",{expires:1,domain:"daoxila.com",path:"/"});
							});
							function gatcAdClose(){
								$("#box_hssy_ad").length > 0 ? gatc.find("span").click() : "";
							}
							$("#dxlBackgroundDiv").on("click",function(event){
								event.stopPropagation();
								gatc.remove();
								$.dxlBackgroundHide();
							});
							setTimeout(function(event){
								event.stopPropagation();
								gatc.remove();
								$.dxlBackgroundHide();
							},15000);
							
						}
					});	
				}
			}

		}
	});

	$.fn.extend({
		'dxlLayerShow':function(){return $.dxlLayerShow($(this));},
		'dxlLayerFixedHide':function(){
			var _this = $(this);_this.css("position","static");$(window).off("resize");
		},
		'dxlLayerFixedShowBlock':function(position){
			$(this).dxlLayerFixedShow(position);
			$(this).show()
		},
		'dxlLayerFixedShow':function(position){
			var _this = $(this);
			var _position = position;
			if (dxlHttp.ie) {
				$(window).on("scroll",function(){_this._dxlLayerFixedShow(_position);});
			}
			$(window).on("resize",function(){_this._dxlLayerFixedShow(_position);}).resize();

			
		},
		"dxlSelect":function(callback){
			var _this = $(this);
			_this.on("click",function(event){
				event.stopPropagation();
				_this.find("ul").show();
				_this.find("i").addClass("cur");
			})
			_this.find("ul li").on("click",function(event){
				event.stopPropagation();
				$(this).parent().hide();
				_this.find("i").removeClass("cur");
				_this.find("span").attr("val",$(this).attr("val"));
				_this.find("span").text($(this).text());
				$.isFunction(callback) ? callback($(this)) : "";
			})
			$(document).on("click",function(){
				_this.find("ul").hide();
				_this.find("i").removeClass("cur");
			});
			
		},
		"dxlCheckbox":function(callback){
			var _this = $(this);
			_this.off("click");
			_this.on("click",function(){
				$(this).toggleClass("cur");
				$.isFunction(callback) ? callback($(this)) : "";
			})
		},
		"dxlRadio":function(callback){
			var _this = $(this);
			_this.find("li").off("click");
			_this.find("li").on("click",function(){
				_this.find("li").removeClass("cur");
				$(this).addClass("cur");
				$.isFunction(callback) ? callback($(this)) : "";
			})
		},
		'_dxlLayerFixedShow':function(position){
			var _this = $(this);
			var ie = dxlHttp.ie;
			var def = {
				w:$(window).width()/2,
				h:($(window).height()/2) - 40,
				obj_w:_this.width()/2,
				obj_h:_this.height()/2,
				top:"auto",
				left:"auto",
				right:"auto",
				bottom:"auto"
			}
			if(_this.parent().css("position") == "relative"){
				var _thisRelative = _this.parent();
				if(ie){
					def.w = (_thisRelative.width()/2); 
				}else{
					def.w = _thisRelative.offset().left + (_thisRelative.width()/2);
				}
			}
			_this.css("position",ie ? "absolute" : "fixed");
			def.top = def.h - def.obj_h;
			def.top <= 0 ? def.top = 0 : "";
			def.left = def.w - def.obj_w;
			switch(position){
				case "top":def.top = 0;break
				case "left":def.left = 0;break
				case "right":def.left = "auto";def.right = 0;break
				case "bottom":def.top = "auto";def.bottom = 0;break
			}
			if(ie){
				if(position == "bottom"){
					def.bottom = "auto";
					def.top = ($(document).scrollTop() + $(window).height()) - _this.height();
				}else{def.top += $(document).scrollTop();}
			}
			_this.css({"left":def.left,"top":def.top,"right":def.right,"bottom":def.bottom});
			return _this;
		}
	});
})(jQuery)


$(document).ready(function(){
	if(dxlHost[0] != "crm" && dxlHost[0] != "cms" && dxlHost[0] != "sys2" && dxlHost[0] != "admin" && dxlHost[0] != "b" && dxlHost[0] != "kiss" && dxlHost[0] != ""){
		try{
			if (self != top && typeof parent.dxlHttp == "undefined") {
				parent.window.location = parent.window.location;
			}
		}catch(e){}
		$.jsSequence({frame:["statistics"]});
	}
});

