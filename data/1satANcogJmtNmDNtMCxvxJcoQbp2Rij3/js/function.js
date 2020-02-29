$(document).ready(function() {
	$( "#newKeysBtn" ).click(function() {
		$("#alert2" ).show();
		$("#register" ).show();
		$("#newKeysBtn").hide();
		$(".checkbox" ).hide();
		$("#noti").val("Create an OP_Return transaction containing your public key and send 0.001 BTC to this address 14tqQ3EDvgtzcT82tuCsLRHKY1KfpJNH8h")
});
});


$(document).ready(function() {
	$( "#p1" ).change(function() {
		var value = $(this).val();
		//p2 bingobook
		//p3 extortion game
		//0 is select pl, 1 = bingobook 2=extortion 
		if (value =='1'){
			$("#p2").show();
			$("#p3").hide();
		}else if (value =='2'){
			$("#p3").show();
			$("#p2").hide();
		}else{
			$("#p2").hide();
			$("#p3").hide();
		}
		
		
	});
});





$(document).ready(function() {
	$( "#b1" ).change(function() {
		var value = $(this).val();
		if (value =='1'){
			$("#bet").show();
		}
		
		if (value =='2'){
			$("#terr").show();
			
		}
		if (value =='0'){
			$("#bet").hide();
			
		}
		
		
	});
});


$(document).ready(function() {
	$( "#exGame" ).change(function() {
		var value = $(this).val();
		if (value =='0'){
			$("#terr").hide();
		}
		
		if (value =='1'){
			$("#terr").show();
		
		}
		if (value =='2'){
			$("#terr").show();
		}
		
		
	});
});



