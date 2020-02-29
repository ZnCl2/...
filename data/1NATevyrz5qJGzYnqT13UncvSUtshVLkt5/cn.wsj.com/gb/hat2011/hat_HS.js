$(document).ready(function() {
		var imageUrl = "./hat2011/images/hat_sprite_active.png";
		var inactiveImageUrl = "./hat2011/images/hat_sprite_inactive.png";
		
    $(".hat_sina_icon").click(function(e) {
        if ($("#sina_follow_overlay").css("display") == "none") {
            $("#sina_follow_overlay").css("display", "block");
            
            $("#hat_more_dropdown").removeClass("hat_moreTarget_click");
            $("#hat_more_dropdown").addClass("hat_moreTarget_inactive");
            $("#hat_navlist").removeClass("hat_navlist_show");
            $("#hat_navlist").addClass("hat_navlist_hide");
        }
        e.stopPropagation();
    });

    $("#hat_tab_wsj").mouseover(function() {
        $(this).css("background-color", "#404040");
        $("#hat_tab_wsj_top").css("background-image", "url('" + imageUrl + "')");
        $("#hat_tab_wsj_bottom").css("background-image", "url('" + imageUrl + "')");
    });
		
		$("#hat_tab_wsj").click(function() {
				window.open("http://wsj.com", "_blank", "");
    });
    
    $("#hat_tab_wsj_jp").click(function() {
				window.open("http://jp.wsj.com", "_blank", "");
    });
    
    $("#hat_tab_atd").click(function() {
				window.open("http://allthingsd.com", "_blank", "");
    });
    
    $("#hat_tab_mw").click(function() {
				window.open("http://www.marketwatch.com", "_blank", "");
    });
    
    $("#hat_tab_bar").click(function() {
				window.open("http://online.barrons.com/home", "_blank", "");
    });
    
    $("#hat_tab_wsj").mouseleave(function() {
        $(this).css("background-color", "#000000");
        $("#hat_tab_wsj_top").css("background-image", "url('" + inactiveImageUrl + "')");
        $("#hat_tab_wsj_bottom").css("background-image", "url('" + inactiveImageUrl + "')");
    });

    $("#hat_tab_wsj_jp").mouseover(function() {
        $(this).css("background-color", "#404040");
        $("#hat_tab_wsj_jp_top").css("background-image", "url('" + imageUrl + "')");
        $("#hat_tab_wsj_jp_bottom").css("background-image", "url('" + imageUrl + "')");
    });

    $("#hat_tab_wsj_jp").mouseleave(function() {
        $(this).css("background-color", "#000000");
        $("#hat_tab_wsj_jp_top").css("background-image", "url('" + inactiveImageUrl + "')");
        $("#hat_tab_wsj_jp_bottom").css("background-image", "url('" + inactiveImageUrl + "')");
    });

    $("#hat_tab_atd").mouseover(function() {
        $(this).css("background-color", "#404040");
        $("#hat_tab_atd_top").css("background-image", "url('" + imageUrl + "')");
        $("#hat_tab_atd_bottom").css("background-image", "url('" + imageUrl + "')");
    });

    $("#hat_tab_atd").mouseleave(function() {
        $(this).css("background-color", "#000000");
        $("#hat_tab_atd_top").css("background-image", "url('" + inactiveImageUrl + "')");
        $("#hat_tab_atd_bottom").css("background-image", "url('" + inactiveImageUrl + "')");
    });

    $("#hat_tab_mw").mouseover(function() {
        $(this).css("background-color", "#404040");
        $("#hat_tab_mw_top").css("background-image", "url('" + imageUrl + "')");
        $("#hat_tab_mw_bottom").css("background-image", "url('" + imageUrl + "')");
    });

    $("#hat_tab_mw").mouseleave(function() {
        $(this).css("background-color", "#000000");
        $("#hat_tab_mw_top").css("background-image", "url('" + inactiveImageUrl + "')");
        $("#hat_tab_mw_bottom").css("background-image", "url('" + inactiveImageUrl + "')");
    });

    $("#hat_tab_bar").mouseover(function() {
        $(this).css("background-color", "#404040");
        $("#hat_tab_bar_top").css("background-image", "url('" + imageUrl + "')");
        $("#hat_tab_bar_bottom").css("background-image", "url('" + imageUrl + "')");
    });

    $("#hat_tab_bar").mouseleave(function() {
        $(this).css("background-color", "#000000");
        $("#hat_tab_bar_top").css("background-image", "url('" + inactiveImageUrl + "')");
        $("#hat_tab_bar_bottom").css("background-image", "url('" + inactiveImageUrl + "')");
    });

    $(".hat_list_hover").mouseover(function() {
        $(this).css("background-color", "#8F8F8F");
    });

    $(".hat_list_hover").mouseleave(function() {
        $(this).css("background-color", "#F2F2F2");
    });
		
		$(".hat_subdd_list_china").mouseover(function() {
				$(".hat_subdd_list_span").css("background", "url('" + imageUrl + "') no-repeat scroll -346px -43px");
		});
		
		$(".hat_subdd_list_china").mouseleave(function() {
				$(".hat_subdd_list_span").css("background", "url('" + imageUrl + "') no-repeat scroll -1px -398px");
		});
		
		$(".hat_subdd_list_japan").mouseover(function() {
				$(".hat_subdd_list_span_jp").css("background", "url('" + imageUrl + "') no-repeat scroll -348px -66px");
		});
		
		$(".hat_subdd_list_japan").mouseleave(function() {
				$(".hat_subdd_list_span_jp").css("background", "url('" + imageUrl + "') no-repeat scroll -3px -421px");
		});
		
    $("#hat_tab_dropdown").mouseover(function() {
        $("#hat_more_dropdown").removeClass("hat_moreTarget_inactive");
        $("#hat_more_dropdown").addClass("hat_moreTarget_active");
    });

    $("#hat_tab_dropdown").mouseleave(function() {
        $("#hat_more_dropdown").removeClass("hat_moreTarget_active");
        $("#hat_more_dropdown").addClass("hat_moreTarget_inactive");
    });

    $("#hat_tab_dropdown").click(function(e) {
        if ($("#hat_navlist").hasClass("hat_navlist_hide")) {
            $("#hat_more_dropdown").removeClass("hat_moreTarget_active");
            $("#hat_more_dropdown").addClass("hat_moreTarget_click");
            $("#hat_navlist").removeClass("hat_navlist_hide");
            $("#hat_navlist").addClass("hat_navlist_show");
            
            $("#sina_follow_overlay").css("display", "none");
        }
        else {
            $("#hat_more_dropdown").removeClass("hat_moreTarget_click");
            $("#hat_more_dropdown").addClass("hat_moreTarget_active");
            $("#hat_navlist").removeClass("hat_navlist_show");
            $("#hat_navlist").addClass("hat_navlist_hide");
        }
        e.stopPropagation();
    });

    $(document).click(function() {
        if ($("#hat_navlist").hasClass("hat_navlist_show")) {
            $("#hat_more_dropdown").removeClass("hat_moreTarget_click");
            $("#hat_more_dropdown").addClass("hat_moreTarget_inactive");
            $("#hat_navlist").removeClass("hat_navlist_show");
            $("#hat_navlist").addClass("hat_navlist_hide");
        }

        if ($("#sina_follow_overlay").css("display") == "block") {
            $("#sina_follow_overlay").css("display", "none");
        }
    });
    
    $("#hat_search").click(function() {
    		$(this).val("");
    });
});