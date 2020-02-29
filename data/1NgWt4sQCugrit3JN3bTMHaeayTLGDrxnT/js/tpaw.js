$(document).ready(function () {
    $(".core_page").on("click", function (e) {


        var target = $(this).attr("href");
        $(target).show();
        $(".core_parent").not(target).hide();
        e.preventDefault();
    });
});

$(document).ready(function () {
    $(".core_sub").on("click", function (e) {
        
        var target = $(this).attr("href");
        $(target).show();
        $(".sub_parent").not(target).hide();
        e.preventDefault();
    });
});