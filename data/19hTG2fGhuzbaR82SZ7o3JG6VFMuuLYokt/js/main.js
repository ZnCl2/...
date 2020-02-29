$(document).ready(function(){	
	var target = document.getElementById('province1');
	if (target.addEventListener) {
		target.addEventListener('click', selectedHandler, false);
	} else if (target.attachEvent) {
		target.attachEvent('click', selectedHandler);
	}
	maphover();
});

function selectedHandler(){	
	if($("#province1")[0].value!='')
	{
		var selectedText = $("#province1")[0].value;
		$(".city").each(function(){
			$(this).children("div").hide();
			$(this).removeClass("hover");
		})
		$(".city").each(function(){
			if($(this)[0].textContent==selectedText){
				$(this).addClass("hover").children("div").show();
			}
		})
	}			
};

function maphover(){	
	var self = "";
	$(".city").hover(
		function(){
			self = $(this);
			self.addClass("hover").children("div").show();
		},
		function(){
			self = $(this);
			self.children("div").hide();
			self.removeClass("hover");
		}
	);
	$(".city").click(
		function(){
			self = $(this);
			self.addClass("hover").children("div").show();
		},
		function(){
			self = $(this);
			self.children("div").hide();
			self.removeClass("hover");
		}
	);		
};
