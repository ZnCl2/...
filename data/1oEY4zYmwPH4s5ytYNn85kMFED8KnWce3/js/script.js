window.onload = function(e){
	window.onscroll = function(e){
		var wrap = document.querySelector(".wrap"),
			top = document.querySelector(".top"),
			allHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight,
			scrollHeight = document.body.scrollTop;
		// console.log((scrollHeight / allHeight).toFixed(3));
		top.style.opacity = scrollHeight / allHeight;
		top.onclick = function(e){
			document.body.scrollTop = 0;
		}
	}
	
}