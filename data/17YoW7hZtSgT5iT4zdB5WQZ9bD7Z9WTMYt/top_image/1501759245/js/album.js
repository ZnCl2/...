$(window).load(function(){
    var str_h=0;
   $("#album").find("div[h]").each(function(i,ele){
      str_h+=$(ele).height();
     
   });
    $("#album").height(str_h);
});
$(function(){
   
$.jsSequence({frame:["orders","datepicker"]},function(){
    



    var city=$.cookie("city");
    var dxldate = new Date();
   
   	var defDate = [dxldate.getFullYear(),(dxldate.getMonth() + 1),dxldate.getDate()];
    defDate[1] = defDate[1] + 3;
    if(defDate[1] > 12){
			 defDate[1] = defDate[1] - 12;
			defDate[0] = defDate[0] + 1;
		} 
    $("#schedule").datepicker({
        numberOfMonths: 2,
        minDate:dxldate.getFullYear() + "-" + (dxldate.getMonth() + 1) + "-" + dxldate.getDate(),
        maxDate:(dxldate.getFullYear()+1) + "-12-31",
        stepMonths: 2,
        firstDay:7,
        defaultDate:defDate[0] + "-" + defDate[1] + "-" + dxldate.getDate(),
       	onSelect:function(selectedDate){
        	   var inpMobile =  $("#mobile614");
                          
               $(this).val("查看酒店档期");
               			
                var _window=$(window).width();
                var _realleft=$(this).offset().left;
                //alert(_realleft);
                $("#schedule-pop2").css({"top": $("#schedule").offset().top+$("#schedule").outerHeight(),"left":_realleft}).show();
                
				inpMobile.focus();

				
				var wjY = selectedDate.split("-")[0];
				var wjM = selectedDate.split("-")[1];
				var wjD = selectedDate.split("-")[2];
				
				$("#year").html(wjY);
				$("#mouth").html(wjM);
				$("#day").html(wjD);
				isShow = true;	
                
				
       	}
                 
     });
     //
     $("#btn614").live("click",function(){
			var $mobile = $("#mobile614").val();
			var flag = $mobile.isPhone();
			var hotelName = $("#hotel_name").val();
			var hotelId = $("#hotel_id").val();
			if(flag){
				$.dxl.webOrders({
					order_from:city + $("#schedule").attr("order-form"),
					type:"3",//下单形式
					phone:$mobile,
					hotel:hotelName,
					date:$("#schedule").val(),
					demand_class:2
				});
				$(this).parent().siblings(".inputBox").removeClass("error");
				$("#schedule-pop2").hide();
			}
			else{
				$(this).parent().siblings(".inputBox").addClass("error");
				$("#sx").html("");
				return false;
			}
		});
        //
        $("#mobile614").on("keydown", function(){
		if($(this).val().length < 1)
		{
			$(this).parent().find("label").html("");
		}
	});
	    var schedule2 = $("#schedule-pop2");
    	var schBox2 = schedule2.find(".mbInp");
        schBox2.on("click", function(){
		$(this).find("label").hide();
		$("#mobile614").focus();
	})
	$("#mobile614").on("keyup", function(){
		if($(this).val().length == 0)
		{
			$(this).parent().find("label").show();
			$(this).parent().find("label").html("请输入手机号");
		}
	});
    $("#reserve").on("click",function(){
			var	hotelId = $("#hotel_id").val(); // 酒店ID
			var hotelName = $("#hotel_name").val(); //酒店名称
            var _orderform=$(this).attr("order-form");
			 $.dxl.webOrders({
				order_from:city +  _orderform,
				type:"2",//下单形式
				hotel:hotelName
			});
		});
        
   });
   $("#close614_2").live("click",function(){
    $("#schedule-pop2").hide(4);
   });
  
});