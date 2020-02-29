/**
*	Site-specific configuration settings for Highslide JS
*/
hs.graphicsDir = '/135Vdp9scEC2KzioQvKeRZk1mFB44zyQGP/css/graphics/';
hs.showCredits = false;
hs.outlineType = 'rounded-black';
hs.dimmingOpacity = 0.7;
hs.fadeInOut = true;
hs.easing = 'easeInBack';
hs.easingClose = 'easeOutBack';
hs.align = 'center';
hs.useBox = true;
hs.marginTop = 70;
hs.width = 800;
hs.height = 600;


// Add the slideshow controller
hs.addSlideshow({
	slideshowGroup: 'group1',
	interval: 5000,
	repeat: false,
	useControls: true,
	fixedControls: true,
	overlayOptions: {
		opacity: 0.6,
		position: 'top left',
		offsetX: 0,
		offsetY: -15,
		hideOnMouseOut: true
	},
	thumbstrip: {
		mode: 'horizontal',
		position: 'top',
		relativeTo: 'viewport'
	}

});

// gallery config object
var config1 = {
	slideshowGroup: 'group1',
	numberPosition: 'caption',
	transitions: ['expand', 'crossfade']
};
