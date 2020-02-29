jQuery(document).ready(function($){

    function homeFullScreen() {

        var homeSection = $('#at-banner-slider');
        var windowHeight = $(window).outerHeight();

        if (homeSection.hasClass('home-fullscreen')) {

            $('.home-fullscreen').css('height', windowHeight);
        }
    }
    //make slider full width
    homeFullScreen();

    //window resize
    $(window).resize(function () {
        homeFullScreen();
    });

    $(window).load(function () {
        $('.at-featured-text-slider').show().bxSlider({
            auto: true,
            pager: false,
            mode: 'fade',
            prevText: '<i class="fa fa-angle-left fa-3x"></i>',
            nextText: '<i class="fa fa-angle-right fa-3x"></i>'
        });
        /*parallax*/
        jQuery('.at-parallax,.inner-main-title').each(function() {
            jQuery(this).parallax('center', 0.2, true);
        });

        /*parallax scolling*/
        $('a[href*=#]').click(function(event){
            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top-$('.at-navbar').height()
            }, 1000);
            event.preventDefault();
        });
        /*bootstrap sroolpy*/
        $("body").scrollspy({target: ".navbar-fixed-top", offset: $('.at-navbar').height()+50 } );
    });

    function stickyMenu() {

        var scrollTop = $(window).scrollTop();
        var offset = 0;

        if ( scrollTop > offset ) {
            $('#navbar').addClass('navbar-small');
            $('.sm-up-container').show();
            $('.scroll-wrap').hide();
        }
        else {
            $('#navbar').removeClass('navbar-small');
            $('.sm-up-container').hide();
            $('.scroll-wrap').show();
        }
    }
    //What happen on window scroll
    stickyMenu();
    $(window).on("scroll", function (e) {
        setTimeout(function () {
            stickyMenu();
        }, 300)
    });


});

/*animation with wow*/
wow = new WOW({
        boxClass: 'init-animate',
        animateClass: 'animated', // default
    }
);
wow.init();