/*
	Framework.js r1 | (c) 2014 - 2018 Plasmmer | https://plasnerd.github.io/Framework.js/LICENSE.md 
*/

jQuery(document).ready(function($){

if(!window.zeroPage) {
	zeroFrame = new ZeroFrame();
	zeroPage = new ZeroPage(zeroFrame);
}

/*Show features only for ZeroNet or only for clearnet.*/

if (document.location.href.indexOf("wrapper_nonce") > 0) zeronet();
else clearnet();

function clearnet() {
$("body").prepend("<style>zeronet{display:none}</style>");
}

function zeronet() {
$("body").prepend("<style>clearnet{display:none}</style>");
}

/*Tabs menu from kickstart.js, which is part of 99Lime.com HTML KickStart by Joshua Gatcke.*/

	/*---------------------------------
		Tabs
	-----------------------------------*/
	// tab setup
	$('.tab-content').addClass('clearfix').not(':first').hide();
	$('ul.tabs').each(function(){
		var current = $(this).find('li.current');
		if(current.length < 1) { $(this).find('li:first').addClass('current'); }
		current = $(this).find('li.current a').attr('href');
		$(current).show();
	});

	// tab click
	$(document).on('click', 'ul.tabs a[href^="#"]', function(e){
/*body = document.createElement('audio');
                body.innerHTML = '<audio id="sound" src="' + 'System/Resources/snd/Navigation.flac'+ '" autoplay></audio>';*/
		e.preventDefault();
		var tabs = $(this).parents('ul.tabs').find('li');
		var tab_next = $(this).attr('href');
		var tab_current = tabs.filter('.current').find('a').attr('href');
		$(tab_current).hide();
		tabs.removeClass('current');
		$(this).parent().addClass('current');
		$(tab_next).show();
		return false;
	});

 	// tab hashtag identification and auto-focus
    	var wantedTag = window.location.hash;
    	if (wantedTag != "")
    	{
			// This code can and does fail, hard, killing the entire app.
			// Esp. when used with the jQuery.Address project.
			try {
				var allTabs = $("ul.tabs a[href^=" + wantedTag + "]").parents('ul.tabs').find('li');
				var defaultTab = allTabs.filter('.current').find('a').attr('href');
				$(defaultTab).hide();
				allTabs.removeClass('current');
				$("ul.tabs a[href^=" + wantedTag + "]").parent().addClass('current');
				$("#" + wantedTag.replace('#','')).show();
			} catch(e) {
				// I have no idea what to do here, so I'm leaving this for the maintainer.
			};
    	}
});

/*Get hash links working (for endnotes, etc.)*/
var elements = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < elements.length; i++) {
    var hash = elements[i].hash;
    elements[i].href = window.location.pathname + hash;
}

/*Clones FrameworkJS and opens your own project*/
function clone() {
return zeroPage.getSiteInfo().then(siteInfo => zeroPage.cmd("siteClone", [siteInfo.address]));
}

/*Clones the zite you want. You can use this as model to create your own clonning functions.*/
function cloneselect() {
return zeroPage.cmd("siteClone", ["1Fmwk685eaX7GjoQ7JKo3QvywizGfnYRCB"]);
}