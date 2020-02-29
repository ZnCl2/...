
// load menu (demo list)
var files = [];

// parse JSON object into array
loadJSON(function(response) {
  var json = JSON.parse(response);
  var keys = Object.keys(json);
  keys.forEach(function(key){
    this.files.push(json[key]);
  });
  // for (var i=0; i < files.length; i++) { document.write(files[i]+".js"+"<br>"); }
});

// ajax loader
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/demos.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") { callback(xobj.responseText); }
    }
    xobj.send(null);  
}

// init
var activeButton = -1; // selected menu item
var mouseX;
var mouseY;
var frames       = 30;
var timerId      = 0;
var fadeId       = 0;
var time         = 0;
var backgroundY  = 0;
var speed        = 1;
var shipVisible  = false;
var shipRotate   = 0;
var shipWidth    = 30;
var shipHeight   = 40;
var shipSize     = shipWidth;
var shipX        = [0,0];
var shipY        = [0,0];
var buttonX      = [90,90,90,90];
var buttonY      = [75,115,155,195];
var buttonWidth  = [290,290,290,290];
var buttonHeight = [40,40,40,40];

var canvas       = document.getElementById("menu");
var context      = canvas.getContext("2d");
var width        = canvas.getAttribute('width');
var height       = canvas.getAttribute('height');

var bgImage      = new Image(); bgImage.src   = "images/background.png";
var logoImage    = new Image(); logoImage.src = "images/sandbox.png";
var heroImage    = new Image(); heroImage.src = "images/dude.png";
bgImage.onload   = function() { context.drawImage(bgImage, 0, backgroundY); }
logoImage.onload = function() { context.drawImage(logoImage, 10, 5); }

timerId = setInterval("update()", 1000/frames);
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

function update() { clear(); move(); draw(); }
function clear()  { context.clearRect(0, 0, width, height); }

function move() {
	backgroundY -= speed;
	if (backgroundY == -1 * height) { backgroundY = 0; }
	if (shipSize == shipWidth) { shipRotate = -1; }
	if (shipSize == 0) { shipRotate = 1; }
	shipSize += shipRotate;
}

function draw() {
	context.drawImage(bgImage, 0, backgroundY);
	context.drawImage(logoImage, 10, 5);
	// menu item
	context.fillStyle = "#00D000";
	context.font = "bold 32px monospace";
	for (var i = 0; i < this.files.length; i++) {
		var textWidth = context.measureText(this.files[i]);
		var xPos = Math.floor((context.canvas.width - textWidth.width) / 2) - 10;
		context.fillText(this.files[i], xPos, buttonY[i] + 30);
	}
	
	if (shipVisible == true) {
		context.drawImage(heroImage, shipX[0] - (shipSize/2), shipY[0], shipSize, shipHeight);
		context.drawImage(heroImage, shipX[1] - (shipSize/2), shipY[1], shipSize, shipHeight);
	}
}

function checkPos(mouseEvent) {
	if (mouseEvent.pageX || mouseEvent.pageY == 0) {
	    mouseX = mouseEvent.pageX - this.offsetLeft;
		mouseY = mouseEvent.pageY - this.offsetTop;
	} else if (mouseEvent.offsetX || mouseEvent.offsetY == 0) {
		mouseX = mouseEvent.offsetX;
		mouseY = mouseEvent.offsetY;
	}
	for (i = 0; i < files.length; i++) {
		if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
			if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
				shipVisible = true;
				activeButton = i;
				shipX[0] = buttonX[i] - (shipWidth/2) - 2;
				shipY[0] = buttonY[i] + 2;
				shipX[1] = buttonX[i] + buttonWidth[i] + (shipWidth/2); 
				shipY[1] = buttonY[i] + 2;
			}
		} else { shipVisible = false; }
	}
}

function checkClick(mouseEvent) {
	for (i = 0; i < files.length; i++) {
		if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
			if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
				fadeId = setInterval("fadeOut()", 1000/frames);
				clearInterval(timerId);
				canvas.removeEventListener("mousemove", checkPos);
				canvas.removeEventListener("mouseup", checkClick);
			}
		}
	}
}

function fadeOut() {
	context.fillStyle = "rgba(0,0,0, 0.2)";
	context.fillRect(0, 0, width, height);
	time += 0.1;
	if (time >= 3) {
		clearInterval(fadeId);
		
		// remove menu
		var element = document.getElementById("menu-div");
		element.parentNode.removeChild(element);
		
		// load chosen lander script
		var script = document.createElement("script");
		script.src = "js/" + files[activeButton] + ".js";
		document.body.appendChild(script);
	}
}


// optional file select method (not used)
/*
function loadFile() {
    // alert("pressed");
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Couldn't find the fileinput element.");
    } else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    } else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    } else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      lines = e.target.result;
      var json = JSON.parse(lines);
  var files = [];
  var keys = Object.keys(json);
      keys.forEach(function(key){
        files.push(json[key]);
      });
  for (var i=0; i < files.length; i++) {
    document.write(files[i]+".js"+"<br>");
  }
    }
}
*/
