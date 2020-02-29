//Desktop
$('#bg').contextmenu(function(ev){
    ev.preventDefault();
    $(".custom-menu#for_BG").toggleClass('hidden').
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});

//Icon
$('a.icon').contextmenu(function(ev){
    ev.preventDefault();
    ev.stopPropagation()
    $(".custom-menu#for_icon").toggleClass('hidden').
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});

//Start Menu
$('button.start').bind('click',function(ev){
    ev.preventDefault();
    $(".custom-menu#for_start").toggleClass('hidden');
});

//All
$(document).bind('mousedown',function(ev){
    if (!$(ev.target).parents(".custom-menu").length > 0) {
        $(".custom-menu").addClass('hidden');
    }
});