$(window).on('scroll', function() {
    var st = $(this).scrollTop();

    if(st > 300) {
$('.entry-title').css('font-size', '2rem');
$('.entry-date').css('font-size', '1rem');
$('.entry-reading-time').css('opacity', '0');
$('.entry-image').css({
        'opacity' : 1 - (st-300)/100,
    });
$('.entry-header').css({
        'position': 'fixed',
'top': -300,
'z-index': 999,
'box-shadow' : 'rgba(0, 0, 0, 0.2) 0px 10px ' + (Math.min(Math.max(st,325),350)-300)/50*20 + 'px'
    });
$('#main').css('padding-top', 400);
$('.header-title').css({
'position': 'fixed',
'z-index': 999,
height: '0px'
});
$('.image-credit').css({
    'bottom': '-100%',
    'transition-duration': '1s'
});
} else {
$('.entry-title').css('font-size', '3rem');
$('.entry-date').css('font-size', '1.5rem');
$('.entry-reading-time').css('opacity', '1');
$('.entry-image').css({
        'opacity' : 1,
    });
$('.entry-header').css({
        'position': 'relative',
'top': 0,
'box-shadow': 'none'
    });
$('#main').css('padding-top', 0);
$('.header-title').css({
'position': 'absolute',
height: '400px'
});
$('.image-credit').css('bottom', "0%");
}

});
