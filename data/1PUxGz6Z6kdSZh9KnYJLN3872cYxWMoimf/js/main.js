$(document).ready(function() {

    'use strict';

    /***************
    SLIDES
    ***************/

    $('#slides').superslides({
        animation: "fade",
        navigation: false,
        pagination: false
    });


    $('.link').on("click", function() {
        $('#slides').superslides('animate', $(this).attr("data-index"));
        $(this).siblings().addClass('current');
      });

    /***************
    SCROLL
    ***************/

    smoothScroll.init({
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutQuad', // Easing pattern to use
        updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        //callback: function ( toggle, anchor ) {} // Function to run after scrolling
    });

    /***************
    WHO WE ARE
    ***************/

    $("#owl-whoweare").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        pagination: false,
        navigationText: [
            "<span class='fa fa-long-arrow-left'></span>",
            "<span class='fa fa-long-arrow-right'></span>"
        ],

        singleItem: true

        // "singleItem:true" is a shortcut for:

        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: true,
        // itemsMobile : false

    });

    /***************
    HEADER ANIMATION
    ***************/

    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    /***************
    FEATURES
    ***************/

    $('.knob').knob({
        readOnly: true,
        fgColor: "#ffffff",
        bgColor: "#3b9aab",
        inputColor: "#ffffff",
        thickness: 0.05
    });
    $('.knob').each(function() {

        var $this = $(this);
        var myVal = $this.attr("data-rel");
        // alert(myVal);
        $this.knob({

        });

        $({
            value: 0

        }).animate({

            value: myVal
        }, {

            duration: 3000,
            easing: 'swing',
            step: function() {
                $this.val(Math.ceil(this.value)).trigger('change');

            }
        });

    });

}); // End 

/***************
PORTFOLIO
***************/

(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#grid-container').cubeportfolio({
        filters: '#filters-container',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'flipOut',
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 3
        }, {
            width: 500,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        caption: 'fadeIn',
        displayType: 'bottomToTop',
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: false,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
    });

})(jQuery, window, document);


/***************
CONTACT FORM FUNCTION
***************/
$("#send_message").click(function(){
     var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    if (name === "") {
        alert("Your name is empty!");
        $("#name").focus();
    } else if (email === "") {
        alert("Your email address is empty!");
        $("#email").focus();
    } else if (message === "") {
        alert("Your message is empty!");
        $("#message").focus();
    } else {
        $.post("contact.send.php", {
            name: name,
            email: email,
            message: message
        }, function(result) {
            if (result == "SUCCESS") {
                alert("Your contact form is sent.");
                setTimeout(function() {
                    $("#name").val("");
                    $("#email").val("");
                    $("#message").val("");
                }, 3000);
            } else {
                alert("Your contact form isn't sent. Please check fields and try again.");
            }
        });
    }
});

/***************
PRELOADING
***************/

$(window).load(function() {

    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.

});
