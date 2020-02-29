jQuery(document).ready(function() {
    "use strict";
    jQuery('#videoslider1').tabs({
        cache: true
    });
    // initialize paging
    function init() {
        jQuery('#videoslider1').tabs('paging', {
            cycle: true,
            nextButton: 'next &gt;',
            prevButton: '&lt; prev'
        });
    }
    init();
});

$(window).bind("load", function() {
    "use strict";
    var vidWidth = jQuery(".slide_content").width();
    jQuery(".video").css("width", vidWidth);
});
jQuery(document).ready(function() {
    "use strict";
    jQuery('.crsl-items').carousels({
        visible: 3,
        itemMargin: 20
    });
    jQuery('.crsl-items1').carousels({
        visible: 2,
        itemMargin: 20
    });
    jQuery('.crsl-items2').carousels({
        visible: 2,
        itemMargin: 20
    });
    jQuery('.crsl-items3').carousels({
        visible: 1,
        itemMargin: 20
    });
});

jQuery(document).ready(function() {
    "use strict";
    jQuery('.carousels').carousel()
    jQuery('#intertabs a').click(function(e) {
        e.preventDefault()
        jQuery(intertabs).tab('show')
    })

});



jQuery(function() {
    "use strict";
    jQuery('#datepicker').datepicker({
        inline: true,
        nextText: '',
        prevText: '',
        showOtherMonths: true,
        //dateFormat: 'dd MM yy',
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        //showOn: "button",
        //buttonImage: "img/calendar-blue.png",
        //buttonImageOnly: true,
    });
});

jQuery(document).ready(function() {
    "use strict";
    // hide #back-top first
    jQuery(".gotop").hide();

    // fade in #back-top
    jQuery(function() {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.gotop').fadeIn();
            } else {
                jQuery('.gotop').fadeOut();
            }
        });

        // scroll body to 0px on click
        jQuery('.gotop').click(function() {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});

jQuery(document).on('click', '.yamm .dropdown-menu', function(e) {
    "use strict";
    e.stopPropagation()
});

jQuery(function() {
    "use strict";
    jQuery("[data-toggle='tooltip']").tooltip();
    jQuery(".alert").alert()
    jQuery('#newTab a').click(function(e) {
        e.preventDefault()
        jQuery(this).tab('show')
    })
});

//tab effects

var TabbedContent = {
    init: function() {
        $(".tab_item").mouseover(function() {

            var background = $(this).parent().find(".moving_bg");

            $(background).stop().animate({
                left: $(this).position()['left']
            }, {
                duration: 300
            });

            TabbedContent.slideContent($(this));

        });
    },

    slideContent: function(obj) {
        var margin = $(obj).parent().parent().find(".slide_content").width();
        margin = margin * ($(obj).prevAll().size() - 1);
        margin = margin * -1;

        $(obj).parent().parent().find(".tabslider").stop().animate({
            marginLeft: margin + "px"
        }, {
            duration: 300
        });
    }
}

$(document).ready(function() {
    "use strict";
    TabbedContent.init();
});

/**
 * Javascript-Equal-Height-Responsive-Rows
 * https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows
 */
(function(jQuery) {
    jQuery.fn.equalHeight = function() {
        var heights = [];
        jQuery.each(this, function(i, element) {
            jQueryelement = jQuery(element);
            var element_height;
            var includePadding = (jQueryelement.css('box-sizing') == 'border-box') || (jQueryelement.css('-moz-box-sizing') == 'border-box');
            if (includePadding) {
                element_height = jQueryelement.innerHeight();
            } else {
                element_height = jQueryelement.height();
            }
            heights.push(element_height);
        });
        this.height(Math.max.apply(window, heights));
        return this;
    };
    jQuery.fn.equalHeightGrid = function(columns) {
        var jQuerytiles = this;
        jQuerytiles.css('height', 'auto');
        for (var i = 0; i < jQuerytiles.length; i++) {
            if (i % columns === 0) {
                var row = jQuery(jQuerytiles[i]);
                for (var n = 1; n < columns; n++) {
                    row = row.add(jQuerytiles[i + n]);
                }
                row.equalHeight();
            }
        }
        return this;
    };
    jQuery.fn.detectGridColumns = function() {
        var offset = 0,
            cols = 0;
        this.each(function(i, elem) {
            var elem_offset = jQuery(elem).offset().top;
            if (offset === 0 || elem_offset == offset) {
                cols++;
                offset = elem_offset;
            } else {
                return false;
            }
        });
        return cols;
    };
    jQuery.fn.responsiveEqualHeightGrid = function() {
        var _this = this;

        function syncHeights() {
            var cols = _this.detectGridColumns();
            _this.equalHeightGrid(cols);
        }
        jQuery(window).bind('resize load', syncHeights);
        syncHeights();
        return this;
    };
})(jQuery);

jQuery(function(jQuery) {
    "use strict";
    jQuery('.equalcol').responsiveEqualHeightGrid();
});