/** *************Init JS*********************
	
    TABLE OF CONTENTS
	---------------------------
	1.Ready function
	2.Load function
	3.Subscribe JS
	4.Full height function
	5.Map Sticky function
	6.Resize function
	
	beryl function
		1.Counter JS
		2.Ticker JS
		3.Services carousel
		4.Map initialization js
		
	7.Service toggle window	
	8.Placehoder ie9
	9.Partical JS
 ** ***************************************/
 "use strict"; 


/*****Ready function start*****/
$(document).ready(function(){
  $('.la-anim-1').addClass('la-animate');
  $('body').niceScroll({cursorcolor:"#333333"});
  beryl();
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).load(function(){
	$(".preloader-it").delay(800).fadeOut("slow");
});
/*****Load function* end*****/


/***** Subscribe JS start *****/
$("#notifyMe").notifyMe(); 
/***** Subscribe JS end*****/

/***** Full height function start *****/
var height;
var setHeight = function () {
	height = $(window).height();
	$('.full-height').css('min-height', (height));
	$('.fullpage-height').css('height', (height));
	
	/* About Height Cal*/
	height = $('.about-img-wrap').height();
	$('.about-content-wrap').css('height', (height));
};
/***** Full height function end *****/

/***** Map Sticky function start*****/
var relative_sticky = function (id, topSpacing){
	var win_width = $(window).width();
	if(win_width > 1024) {
		if(!topSpacing){ var topSpacing = 0; }

			var el_top = parseFloat(document.getElementById(id).getBoundingClientRect().top);
			el_top = el_top - parseFloat(document.getElementById(id).style.top);
			el_top = el_top * (-1);
			el_top = el_top + topSpacing;

			if(el_top > 0){
			document.getElementById(id).style.top = el_top + "px";
			} else{
			document.getElementById(id).style.top = "0px";
			}
		}	
	}
/***** Map Sticky function end*****/	

/***** Resize function start *****/
$(window).on("resize", function () {
	setHeight();
	var target,win_width;
	target = $('#splitlayout');
	win_width = $(window).width();
	if(win_width <= 1024) {
		$(".copyright-text").appendTo($(".contact-sec .address-details"));
	}
	else 
		{
		$(".copyright-text").appendTo($(".side.side-right"));
	}
	/*Navigation click function start*/
	$("#goto_about,#goto_contact" ).unbind("click");
	$("#goto_about").on('click', function(e){
		if(win_width > 1024) {
			if ( target.hasClass('reset-layout') ) {
				target.removeClass('close-right');
				target.addClass('open-left');
				target.removeClass('close-left');
				target.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
				function() {
					target.removeClass('reset-layout')
				}); 
			 }
			else if ( target.hasClass('open-left') ) {
				target.removeClass('reset-layout');
				target.removeClass('open-left');
				target.addClass('close-left');
				target.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
				function() {
					target.addClass('reset-layout')
				});
			}
			$('.side-left .call-to-action .fa-times').toggleClass('opacity-hide');
			$('.call-to-action .fa-info').toggleClass('opacity-hide');
		}
		else {
			$('html, body').animate({
				scrollTop: $('.page.page-left').offset().top
			}, 1000);
		}
	});
	
	$("#goto_contact").on('click', function(e){
		
		if(win_width > 1024) {
			if ( target.hasClass('reset-layout') ) {
				target.addClass('open-right');
				target.removeClass('close-right');
				target.removeClass('close-left');
				target.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
				function() {
					target.removeClass('reset-layout')
				}); 
			 }
			else if ( target.hasClass('open-right') ) {
				target.removeClass('reset-layout');
				target.removeClass('open-right');
				target.addClass('close-right');
				target.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
				function() {
					target.addClass('reset-layout')
				});
			}
			$('.call-to-action .fa-envelope').toggleClass('opacity-hide');
			$('.side-right .call-to-action .fa-times').toggleClass('opacity-hide');
		}	
		else {
			$('html, body').animate({
				scrollTop: $('.page.page-right').offset().top
			}, 1000);
		}
		return false;
	});
	$(".close-btn").on('click', function(){
		if ( target.hasClass('open-left') ) {
			target.removeClass('reset-layout');
			target.removeClass('open-left');
			target.addClass('close-left');
			target.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
			function() {
				target.addClass('reset-layout')
			});
		}
		else if ( target.hasClass('open-right') ) {
			target.removeClass('reset-layout');
			target.removeClass('open-right');
			target.addClass('close-right');
			target.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
			function() {
				target.addClass('reset-layout')
			});
		}
		return false;
	});
	/*Navigation click function end*/
	
	/*Map sticky event start*/
	var ua = window.navigator.userAgent;
	var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
	var trident = ua.indexOf('Trident/');
	var edge = ua.indexOf('Edge/'); 
	//Chacking for IE	
	
	if(!(is_explorer||trident > 0||trident > 0)){
		var delay = (function(){
		  var timer = 0;
		  return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		  };
		})();
		relative_sticky("map_canvas", 0);
		window.onscroll = function(){
			relative_sticky("map_canvas", 0);
		}	
	}
	else 
		$('.map-sec-wrap').addClass('ie-spacific');
	/*Map sticky event end*/
	
}).resize();
/***** Resize function end *****/

/***** Beryl function start *****/
function beryl(){
	
	/*Counter JS*/
	$('#countdown').countdown({
		date: '9/24/2016',
	});
	
	/*Ticker JS*/
	$('.tlt').textillate({loop: true,minDisplayTime: 1000});
	
	/*Services carousel*/
	$('.services-slider').owlCarousel({
		loop:true,
		margin:0,
		nav:false,
		dots:false,
		responsive:{
			0:{
				items:1,
			},
			450:{
				items:2,
			},
			768:{
				items:3
			},
			1401:{
				items:4
			}
		}
	});
	
	/* Map initialization js*/
	if( $('#map_canvas').length > 0 ){	
		var settings = {
			zoom: 16,
			center: new google.maps.LatLng(43.270441,6.640888),
			mapTypeControl: false,
			scrollwheel: false,
			draggable: true,
			panControl:false,
			scaleControl: false,
			zoomControl: false,
			streetViewControl:false,
			navigationControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		 styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]};		
		var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});	
		var contentString = '<div id="content-map-marker" style="text-align:left; padding-top:10px; padding-left:10px">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h4 id="firstHeading" class="firstHeading" style="color:#000; margin-bottom:0px;"><strong>Hello Friend!</strong></h4>'+
			'<div id="bodyContent">'+
			'<p style="font-family:Verdana; color:#999; font-size:12px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
			'</div>'+
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});	
		var companyImage = new google.maps.MarkerImage('img/pin-dark.png',
			new google.maps.Size(58,63),
			new google.maps.Point(0,0),
			new google.maps.Point(35,20)
		);
		var companyPos = new google.maps.LatLng(43.270441,6.640888);	
		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyImage,               
			title:"Our Office",
			zIndex: 3});	
		google.maps.event.addListener(companyMarker, 'click', function() {
			infowindow.open(map,companyMarker);
		});
	}

}
/***** Beryl function end *****/

/***** Service toggle window start*****/
$(document).on( 'click', ".services-item .toggle-expand", function (e) {
	e.preventDefault();
	e.stopPropagation();
	var $this = $(this).parent();
	if(($this.find('.expand-content').hasClass('expand-visible')) && (!$this.find('.excont').hasClass('opacity-hide')) ) { 
		$this.find('.excont').addClass('opacity-hide');
		$this.find('.toggle-expand .minus').addClass('opacity-hide');
		$this.find('.toggle-expand .plus').removeClass('opacity-hide');
		setTimeout(function() { 
			$this.find('.expand-content').removeClass('expand-visible');
		},400);
	}
	if(!($this.find('.expand-content').hasClass('expand-visible'))) {
		$this.find('.expand-content').addClass('expand-visible');
		$this.find('.toggle-expand .minus').removeClass('opacity-hide');
		$this.find('.toggle-expand .plus').addClass('opacity-hide');
		setTimeout(function() { 
			$this.find('.excont').removeClass('opacity-hide');
		},800);
	}
	return false;
});
/***** Service toggle window end*****/


/***** Placehoder ie9 start*****/
$('input[type=text], textarea').placeholder();
/***** Placehoder ie9 end*****/	

/***** Partical JS start*****/
particlesJS("particles-js", {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}},"color":{"value":"#1b1e34"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000"},"polygon":{"nb_sides":6},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.3,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":58.34159839310571,"random":false,"anim":{"enable":true,"speed":10,"size_min":40,"sync":false}},"line_linked":{"enable":false,"distance":200,"color":"#ffffff","opacity":1,"width":2},"move":{"enable":true,"speed":8,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
/***** Partical JS end*****/
