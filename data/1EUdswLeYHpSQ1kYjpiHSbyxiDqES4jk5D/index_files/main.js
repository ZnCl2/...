 // Toggles class open to display/hide folders
$( ".navigation-item.folder .item-name--parent" ).each(function() {
	$( this ).click(function() {
		$( this ).parent( ".navigation-item.folder" ).toggleClass( "open" );
	});
});


// Toggles class open to display/hide filters
$(document).on("click", ".filters-toggle", function() {
    $( ".ecomproductslist" ).toggleClass( "filters-open" );
});


$(document).ready(function(){
    if ( $("article").hasClass("post-article--has-image") ) {
        $(".blogpost-page").addClass("has-image");
    }
});


var publishedmode = true;

if($("body.edit-mode").length > 0) {
    publishedmode = false;
}

if(publishedmode==true) {

    $(document).on("click", ".basket-toggle", function() {
        $( "body" ).toggleClass( "basket-open" );
    });

    $(document).click(function(event) {
        if( $(event.target).is(".basket-body") ) {
            $( "body" ).removeClass( "basket-open" );
            $( "#page-zones__template-widgets__ecombasket-shopbasket" ).removeClass( "show-content" );
        }
    });

    $('.basket-body').click(function(e) {
        if (e.target == this) {
            $( "body" ).removeClass( "basket-open" );
            $( "#page-zones__template-widgets__ecombasket-shopbasket" ).removeClass( "show-content" );
        }
    });
}


// Toggles class open to display/hide the whole navigation

$(document).on("click", ".navigation-toggle", function() {
    $( "body" ).toggleClass( "nav-open" );
});


function closeEverything() {
    $( ".widget__extendednavigation" ).removeClass( "open" );
    $( "body" ).removeClass( "basket-open" );
    $( "#page-zones__template-widgets__ecombasket-shopbasket" ).removeClass( "show-content" );
    $( ".navigation-item.folder" ).removeClass( "open" );
}


// On ESC key
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        closeEverything();
    }
};
