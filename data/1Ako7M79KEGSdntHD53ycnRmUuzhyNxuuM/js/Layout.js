$(window).resize(function() {

  if ($(this).width() < 320) {

    $('#votetime').css({"position": "absolute", "top": "-35px", "height": "50px", "width": "170px", "right": "30px"});
	$('#votego').css("right", "0");
	$('#votediv').css("right", "0");
	$('sat').css("padding-left", "55px");

  } else {

    $('#votetime').removeAttr("style");
	$('sat').removeAttr("style");
	$('#votediv').css("right", "225px");
	$('#votego').css("right", "221px");

    }

});


$(document).on('click','#poppop',function(){
	var targetModal =  $(this).attr('href');
	$('#mrModal').hide();
	$('.modal-content').hide();
	
	$('#mrModal').fadeIn();
	$(targetModal).fadeIn();
  return false;
});

$("body" ).on( "click",".close", function() {
  	$('#mrModal').hide();
	$('.modal-content').hide();
});


 $(".form-control").on("keyup", function() {
   if ($(this).val())
     $(this).next(".show").show();
   else
     $(this).next(".show").hide();
 }).trigger('keyup');

 $(".show").mousedown(function() {
   $(this).prev(".form-control").prop('type', 'text');
 }).mouseup(function() {
   $(this).prev(".form-control").prop('type', 'password');
 }).mouseout(function() {
   $(this).prev(".form-control").prop('type', 'password');
 });

 
 function flip() {
    $('.card').toggleClass('flipped');
}

function openNav() {
	$("#bottom").css("bottom", "0");
	//$("#bottom").removeAttr("style");
}
	
function closeNav() {
	$("#bottom").removeAttr("style");
	//$("#bottom").css("bottom", "-300px");
}
	
function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("cant be blank");
    return false;
  }
}

function copypin() {var copyText = document.getElementById("pin"); copyText.select();document.execCommand("copy");
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + copyText.value;
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  
}
 
 
/* 

//$(".topmenu a").each( function(i, elem) {$(elem).attr("href", Text.fixLink($(elem).attr("href")))});

function toggleNav() {
  var x = document.getElementById("bottom");
  if (x.style.bottom = "-310px") {
    x.removeAttr("style");
  } else {
    x.style.bottom = "-310px";
  }
}

window.onresize = function() {
    if (window.innerWidth >= 400) {  
	document.getElementById("left").style.visibility = "visible";
	document.getElementById("openbtn").style.visibility = "hidden";
  document.getElementById("right").style.marginLeft= "240px"; }
      if (window.innerWidth <= 400) { 
	  document.getElementById("left").style.visibility = "hidden";
	  document.getElementById("openbtn").style.visibility = "visible";
  document.getElementById("right").style.marginLeft = "20px"; }
};

function openNav() {
	$("#bottom").removeAttr("style");} 
	 document.getElementById("left").removeAttr("style");
	document.getElementById("left").style.visibility = "visible";
	document.getElementById("openbtn").style.visibility = "hidden";
	document.getElementById("closebtn").style.visibility = "visible";
  document.getElementById("left").removeAttr("style");
}

function closeNav() {
	$("#bottom").css("bottom", "-310px"); 
	document.getElementById("left").style.visibility = "hidden";
	document.getElementById("openbtn").style.visibility = "visible";
	document.getElementById("closebtn").style.visibility = "hidden";
  document.getElementById("right").style.marginLeft= "20px"; 
}

function flip() {
    $('.wall').toggleClass('flipped');
}

$("h1").removeAttr("style");
*/