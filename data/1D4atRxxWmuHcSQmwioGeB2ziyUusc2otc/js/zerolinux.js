$.fn.order = function(buttons){
	var parent = $(this);
	var distros = parent.find('.distro');
	
	var sortByPopularity = function(a, b){
		return parseInt($(b).data('popularity')) - parseInt($(a).data('popularity'));
	}
	
	var sortByName = function(a, b){
		var nameA = $(a).data('name').toLowerCase(); 
		var nameB = $(b).data('name').toLowerCase();
		console.info(nameA, nameB);
		
		if (nameA < nameB)
			return -1;
		
		if (nameA > nameB)
			return 1;

		return 0;
	}
	
	buttons.on('click', function(){
		buttons.removeClass('selected');
		$(this).addClass('selected');
		
		var func = null;
		
		switch($(this).data('func')){
			case "sortByName":
				func = sortByName;
				break;
			
			case "sortByPopularity":
			default:
				func = sortByPopularity;
				break;
		}
		
		distros.sort(func).each(function(){
			var elem = $(this);
			elem.remove();
			$(elem).appendTo(parent);
		});
	});
	
	buttons[0].click();
	
}

$(function(){
	$("#display").order($("#order").find('span'));
});