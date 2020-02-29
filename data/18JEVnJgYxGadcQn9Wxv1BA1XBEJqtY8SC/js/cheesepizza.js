class ZFrame extends ZeroFrame{};
zf = new ZFrame();

function cheesepizza() {
	document.body.style.backgroundImage = "url(cheese.jpg)";
	document.getElementById("main").id = "hide";
	var boom = new Audio("boom.wav");
	zf.cmd("wrapperNotification", ["error", "You have been reported to the ZeroFBI. ", 10000]);
	setTimeout(function(){ document.body.innerHTML = "<center><br><br><br><br><img src=\"boom.gif\"></center>"; }, 500);
	setTimeout(function(){ boom.play() }, 900);
	setTimeout(function(){ document.body.innerHTML = "<center><h1 style=\"color: black\">Enjoy your\"re pizza :^)</h1><br><br><br><img src=\"pizza.gif\"></center>"; }, 2000);
}
