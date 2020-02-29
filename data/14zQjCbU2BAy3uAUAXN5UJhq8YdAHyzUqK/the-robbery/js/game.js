var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var FPS = 30;
var canvas = document.getElementById('game').getContext("2d");
var keydown = { right: false, left: false, up: false, down: false}
var gameOver = false;
var enemies = [];
var playerCoins = 0;
var loadBar = 0;
// var extension = 'mp3'; // firefox does not support mp3

/*
var ua = navigator.userAgent.toLowerCase();
if(ua.indexOf('applewebkit/') == -1) {
	extension = 'ogg';
}
*/

// graphics
var img = new Image(); 
var imgCoin = new Image();
var imgPlayer = new Image();
var imgSkl = new Image();
var imgEnemy = new Image();

// audio
// var music = new Audio('audio/empire.'+extension);	// firefox does not play mp3
// var sndScream = new Audio('audio/scream.wav');
// var sndPew = new Audio('audio/pew.wav');

// loadbar
function resourceLoaded(n) {
	loadBar += n;
	var x = loadBar * CANVAS_WIDTH / 100;
	canvas.fillStyle = "#000";
	canvas.fillRect(0, 10, x, 10);
	if(loadBar>=100) startGame();
}

// music.addEventListener('canplay', resourceLoaded(30), false);
// sndPew.addEventListener('canplay', resourceLoaded(10), false);
// sndScream.addEventListener('canplay', resourceLoaded(10), false);
img.addEventListener('load', function() {resourceLoaded(20)}, false);
imgCoin.addEventListener('load', function() {resourceLoaded(20)}, false);
imgPlayer.addEventListener('load', function() {resourceLoaded(20)}, false);
imgEnemy.addEventListener('load', function() {resourceLoaded(20)}, false);
imgSkl.addEventListener('load', function() {resourceLoaded(20)}, false);

img.src = 'img/tile.jpg';
imgCoin.src = 'img/coin.png';
imgPlayer.src = 'img/player.png';
imgSkl.src = 'img/skl.png';
imgEnemy.src = 'img/enemy.png';

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function drawBackground() {
	var imgHindex = 0;
	var imgVindex = 0;
	var tile = img;
	while(imgVindex < CANVAS_HEIGHT) {
		while(imgHindex < CANVAS_WIDTH) {
			canvas.drawImage(img, imgHindex, imgVindex);
			imgHindex += 40;
		}
		imgHindex = 0;
		imgVindex += 40;
	}	
}

/*
 * player
 */

var player = {
	color: '#f00',
	x: CANVAS_WIDTH / 2,
	y: CANVAS_HEIGHT / 4,
	width: 32,
	height: 32,
	sprite: 1,
	time: 5,
	movement: 'right',
	currentFrame: 0,
	draw: function() {
    	canvas.drawImage(imgPlayer, (this.currentFrame * this.width) , 0, this.width, 
			this.height, this.x, this.y, 32, 32);
  	},
	update: function() {
		if(this.time<=0){
			this.sprite = 1 - this.sprite;
			if(this.movement == 'left') {
				this.currentFrame = 2;
			}
			else {
				this.currentFrame = 0;
			}
			if(keydown.right || keydown.left || keydown.up || keydown.down) {
				this.currentFrame += this.sprite;
			}
			this.time = 2;
		}
		else {
			this.time--;
		}
	}
};

/*
 * bonus
 */

var coin = {
	color: '#ff0',
	x: CANVAS_WIDTH / 2,
	y: CANVAS_HEIGHT / 2 + (CANVAS_HEIGHT / 4),
	width: 15,
	height: 15,
	sprite: 0,
	spriteTime: 3,
	draw: function() {
		canvas.drawImage(imgCoin, (this.sprite * this.width), 0, this.width, this.height, this.x, this.y,
			15, 15);		
	},
	update: function() {
		if(this.spriteTime <= 0) {
			this.sprite++;
			if(this.sprite >= 3) this.sprite = 0;
			this.spriteTime = 3;
		}
		else {
			this.spriteTime--;
		}
	}
};

/*
 * enemies
 */

function Enemy(I) {
	I = I || {};
	I.width = 32;
	I.height = 32;
	I.x = 0;
	I.y = Math.random() * CANVAS_HEIGHT - I.height;
	I.velocity = 3;
	I.color = '#00f';
	I.direction = {
		left: false,
		right: true,
		up: true,
		down: false,
	};
	I.time = 10;
	I.sprite = 0;
	I.currentFrame = 0;
	I.draw = function() {	
    	canvas.drawImage(imgEnemy, (this.currentFrame * this.width) , 0, this.width, 
			this.height, this.x, this.y, 32, 32);
	};
	I.update = function() {
		if(this.x >= (CANVAS_WIDTH - this.width)) {
			this.direction.right = false;
			this.direction.left = true;
		}
		if(this.x <= 0) {
			this.direction.right = true;
			this.direction.left = false;	
		}
		
		if(this.y >= (CANVAS_HEIGHT - this.height)) {
			this.direction.up = true;
			this.direction.down = false;
		}
		if(this.y <= 0) {
			this.direction.up = false;
			this.direction.down = true;			
		}
		
		if(this.direction.right) {
			this.x += this.velocity;
		}
		else {
			this.x -= this.velocity;
		}
		
		if(this.direction.up) {
			this.y -= this.velocity;
		}
		else {
			this.y += this.velocity;
		}
		this.x = this.x.clamp(0, CANVAS_WIDTH - this.width);
		this.y = this.y.clamp(0, CANVAS_HEIGHT - this.height);
		if(this.time<=0){
			if(this.direction.left) {
				this.currentFrame = 2;
			}
			else {
				this.currentFrame = 0;
			}
			this.sprite = 1 - this.sprite;
			this.currentFrame += this.sprite;
			this.time = 5;
		}
		else {
			this.time--;
		}
	};
	return I;
}

/*
 * update game status
 */

function update() {
	if(keydown.right) player.x += 5;
	if(keydown.left) player.x -=5;
	if(keydown.up) player.y -=5;
	if(keydown.down) player.y +=5;

	player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
	player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
	player.update();

	enemies.forEach(function(enemy){
		enemy.update();
		if(collides(enemy, player)) {
			// sndScream.play();
			gameOver = true;
			// music.pause();
		}
	});

	if(collides(player, coin)) {
		playerCoins++;
		// sndPew.play();
		loadCoin();
		var enemy = Enemy();
		if(player.x > CANVAS_WIDTH / 2) {
			enemy.x = 0;
		}
		else {
			enemy.x = CANVAS_WIDTH - enemy.width;
			enemy.direction.right = false;
			enemy.direction.left = true;
			enemy.currentFrame = 2;
		}
		enemies.push(enemy);
	}
	coin.update();
}

/*
 * draw game
 */

function draw() {
	canvas.clearRect(0, 0, 480, 320);
	drawBackground();
	coin.draw();
	canvas.font = "bold 16px sans-serif";
	canvas.fillStyle = "#FFF";
	enemies.forEach(function(enemy){
		enemy.draw();
	});
	if(gameOver) {
		canvas.drawImage(imgSkl, player.x, player.y);
		canvas.fillText("Game Over", CANVAS_WIDTH / 2 - 42, CANVAS_HEIGHT / 2 - 30);
		canvas.fillText("(press spacebar to play again)", CANVAS_WIDTH / 2 - 115, CANVAS_HEIGHT / 2);		
	}
	else {
		player.draw();
	}
	canvas.fillText("Coins: " + playerCoins * 10, 10, 20);
	canvas.fillText("Enemies: " + enemies.length, 140, 20);
}

/*
 * key detection
 */

document.onkeydown = function(e) {

	if(e.keyCode==39) {
		keydown.right = true;
		keydown.left = false;
		player.movement = 'right';
	}
	if(e.keyCode==37) {
		keydown.left = true;
		keydown.right = false;
		player.movement = 'left';
	}
	
	if(e.keyCode == 38) {
		keydown.up = true;
		keydown.down = false;
	}
	if(e.keyCode == 40) {
		keydown.down = true;
		keydown.up = false;
	}
	if(e.keyCode == 32 && gameOver) {
		enemies = [];
		playerCoins = 0;
		loadCoin();
		gameOver = false;
//		music.currentTime = 0;
//		music.play();
	}
}

document.onkeyup = function(e) {
	if(e.keyCode==39) keydown.right = false;
	if(e.keyCode==37) keydown.left = false;
	if(e.keyCode == 38) keydown.up = false;
	if(e.keyCode == 40) keydown.down = false;
}

/*
 * collision detection
 */

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

/*
 * load coin using first sprite's frame in a random location
 */

function loadCoin() {
	coin.sprite = 0;
	coin.x = Math.random() * CANVAS_WIDTH;
	coin.y = Math.random() * CANVAS_HEIGHT;
	if(coin.x + coin.width > CANVAS_WIDTH) {
		coin.x = CANVAS_WIDTH - coin.x;
	}
	if(coin.y + coin.height > CANVAS_HEIGHT) {
		coin.y = CANVAS_HEIGHT - coin.y;
	}	
}

/*
 * start game
 */

function startGame() {
//	music.loop = true;
//	music.play();	
	setInterval(function() {
		if(!gameOver) {
	  		update();
	  		draw();
		}
	}, 1000/FPS);
}