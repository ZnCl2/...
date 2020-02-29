window.audioTag = null;
window.canvas = null;
window.webGl = null;
window.program = null;
window.vertexPosAttrib = null;
window.timeLocation = null;

var date = new Date();
var start = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000;
var oldTime = 0;

// Init audio
function initAudio() {
	audioTag = document.getElementById("audio");

	audioTag.oncanplaythrough = function() {
		audioTag.oncanplaythrough = null;

		if(audioTag.play) {
			date = new Date();
			audioTag.currentTime = (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000) - start;
			audioTag.play();
		}
	};
	if(!isNaN(audioTag.duration) && audioTag.duration != 0) {
		audioTag.oncanplaythrough(); // Already loaded
	}
}

// Restart audio from the beginning
function restartAudio() {
	audioTag.currentTime = 0;
}

// Init WebGL
function initWebGL() {
	canvas = document.getElementById("canvas");

	webGl = canvas.getContext("experimental-webgl");
	if(!webGl) {
		canvas.style.display = "none";
		document.getElementById("image").style.display = "inline-block";
		return false;
	}

	webGl.bindBuffer(webGl.ARRAY_BUFFER, webGl.createBuffer());
	webGl.viewport(0, 0, canvas.width, canvas.height);

	webGl.bufferData(webGl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), webGl.STATIC_DRAW);
	return true;
}

// Create shader object
function createShader(code, type) {
	var shader = webGl.createShader(type);
	webGl.shaderSource(shader, code);
	webGl.compileShader(shader);
	return shader;
}

// Init WebGL shaders and program
function initShaders() {
	program = webGl.createProgram();

	var vertexShader = createShader(vertex, webGl.VERTEX_SHADER);
	webGl.attachShader(program, vertexShader);

	var fragmentShader = createShader(fragment, webGl.FRAGMENT_SHADER);
	webGl.attachShader(program, fragmentShader);

	webGl.linkProgram(program);
	webGl.useProgram(program);

	vertexPosAttrib = webGl.getAttribLocation(program, "pos");
	webGl.enableVertexAttribArray(vertexPosAttrib);
	webGl.vertexAttribPointer(vertexPosAttrib, 2, webGl.FLOAT, false, 0, 0);

	timeLocation = webGl.getUniformLocation(program, "t");
}

// Draw image
function draw() {
	webGl.uniform1f(timeLocation, getTime());
	webGl.drawArrays(webGl.TRIANGLE_FAN, 0, 4);
}


if(initWebGL()) {
	window.vertex = document.getElementById("vertex_shader").innerHTML;
	window.fragment = document.getElementById("fragment_shader").innerHTML;
	initShaders();

	function getTime() {
		date = new Date();
		var ts = (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000) - start;
		ts %= 106;

		if(ts < oldTime) {
			restartAudio();
		}

		oldTime = ts;
		return ts;
	}

	setInterval(function() {
		draw();
	}, 30);

	initAudio();
}