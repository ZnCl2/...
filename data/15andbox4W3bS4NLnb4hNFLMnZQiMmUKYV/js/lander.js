
// Orignal Source: http://gamemechanicexplorer.com/#thrust-1

// Background Music: Sky by AudioQuattro from AudioJungle.net

// Lander Sandbox v0.04 by Andrew Kidoo (bot@zeroid.bit)

// Feel free to add your own features and re-publish!

var GameState = function(game) {};
var game = new Phaser.Game(1440, 800, Phaser.CANVAS, 'game');
// { preload: preload, create: create, update: update, render: render });
game.state.add('game', GameState, true);

GameState.prototype.preload = function() {
    
    // load assets
    this.game.load.image(      'hero',       'images/dude.png');
    this.game.load.image(      'ground',     'images/ground.png');
    // this.game.load.image(      'pixel',      'images/pixel.png');
    this.game.load.spritesheet('ship',       'images/ship.png', 32, 32);
    this.game.load.spritesheet('explosion',  'images/explosion.png', 128, 128);
    this.game.load.audio(      'spaceMusic', 'sounds/background.mp3');
    this.sfx = {
      explosion :['noise',1,0.6610,0,0.03,2.196,2,20,440,2000,0,0,0,7.9763,0.0003,0,0,0.1,0,0,0,-0.01,0.026,0.321,1,1,0,0],
      thruster : ['noise',0,1,0,10,0,0,20, 281,2400,0,0,0,7.9763,0.0003,0,0,0,0.2515,0,0.2544,0,0,0.273,0,0.379,0,0],
      beep :    ['square',0, 0.03,0,0.3,0,0,20,1210,20,0,0,0,7.9763,0.0003,0,0,0.1,0,0,0.4632,0,0,1,0,0,0,0]
    }
};

GameState.prototype.create = function() {
    
    // add background music
    this.music = this.game.add.audio("spaceMusic", 1, true);
    this.music.volume = 0.1;
    this.music.play();
    
    // add sfx
    this.sound = jsfxlib.createWaves(this.sfx);
    
    // thrust sound
    this.thrustSound = this.sound.thruster;
    this.thrustPlaying = false;
    this.thrustVolume = 0;
    
    // explosion sound
    this.explosionSound = this.sound.explosion;
    this.explosionSound.volume = 0.1;
    
    // beep sound
    this.beepSound = this.sound.beep;
    this.beepSound.volume = 0.2;
    
     // create a group for explosions
    this.explosionGroup = this.game.add.group();
    
    // scaling
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth  = this.game.width;
    this.scale.maxHeight = this.game.height;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize( true );

    // camera and platform tracking vars
    this.cameraYMin = 0;
    this.platformYMin = 0;    
	
    // game lives
    this.lives = 5;
    
    // start game time
    this.game.time.advancedTiming = true;
    
    // this.game.physics.arcade.gravity.setTo(0, 900);
    this.group = this.game.add.group();
    this.group.enableBody = true;
    
    this.group2 = this.game.add.group();
    this.group2.enableBody = false;
    
    // game constants
    this.ROTATION_SPEED = 180; // degrees/second
    this.ACCELERATION   = 200; // pixels/second/second
    this.MAX_SPEED      = 250; // pixels/second
    this.DRAG           = 0;   // pixels/second
    this.GRAVITY        = 50;  // pixels/second/second
    
    this.padz = [];
    this.pads = 0;
    
    // ship
    this.ship = this.game.add.sprite(0, 0, 'ship');
    this.ship.anchor.setTo(0.5, 0.5);
    this.ship.angle = -90; // Point the ship up
    this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
    this.ship.body.bounce.setTo(0.25, 0.25);
    this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);
    this.ship.body.drag.setTo(this.DRAG, this.DRAG); // slows down when not accelerating
    
    // track where the ship started and how much the distance has changed from that point
    this.ship.yOrig = -25000 + this.ship.y;
    this.ship.yChange = 0;
    
    // fuelbar
    this.fuelbar = this.game.add.bitmapData(105, 11);
    this.fuelbar.ctx.rect(0, 0, 105, 11);
    this.fuelbar.ctx.fillStyle = "orange";
    this.fuelbar.ctx.fill();
    
    // fuel guage
    this.fuelGuage = this.game.add.sprite(30, 4, this.fuelbar);
	this.fuelGuage.fixedToCamera = true;
    this.fuelGuage.scale.x = 1; // full tank
    
    this.resetShip(); // ship & fuel
    
    // turn gravity on
    game.physics.arcade.gravity.y = this.GRAVITY;
    
    // hero
    this.hero = this.game.add.sprite(770, 740, 'hero');
	this.hero.scale.x /= 1.4;
    this.hero.scale.y /= 1.4;
	
	 // create hero
    // this.heroCreate();
	
    // fuel pad
    this.padBmp = this.game.add.bitmapData(50, 5);
    this.padBmp.boundsPadding = 0; // default is 10?
    this.padBmp.ctx.rect(0, 0, 50, 5);
    this.padBmp.ctx.fillStyle = "orange";
    this.padBmp.ctx.fill();
    
    // 2nd player..
    // this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.padBmp);
    // this.game.physics.arcade.enable(this.player);
    // this.player.anchor.set(0.5);
    // this.player.body.collideWorldBounds = true;
     
    // moving platforms!
    this.platformBmp = this.game.add.bitmapData(50, 18);
    this.platformBmp.ctx.rect(0, 0, 50, 18);
    this.platformBmp.ctx.fillStyle = "#00F000";
    this.platformBmp.ctx.fill();
    this.landingPad = this.game.add.sprite(0, 0, this.padBmp);
    this.platformBmp.draw(this.landingPad, 0, 0);
    this.landingPad.alpha = 0;
	
	// world
	this.world.setBounds(0, -25000, 1440, 25000);
    
    // create platforms
    this.makePlatforms();
    
	/*
	
    // platforms need to move via velocity in order to 'ride' them (not tweening)
    this.platform = this.game.add.sprite(this.game.world.centerX + 400, this.game.world.centerY - 325, this.platformBmp, 0, this.group);
    this.platform.anchor.set(0.5)
    this.platform.body.immovable = true;
    this.platform.body.checkCollision.down = false;
    this.platform.body.allowGravity = false;
    this.platform.body.bounce.set(1);
    this.platform.body.velocity.x = -50;
    this.platform.body.collideWorldBounds = true;
    
    */
    
    // create some ground for the ship to land on
    this.ground = this.game.add.group();
    for (var x = 0; x < this.game.width; x += 32) {
        // add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }
    
    
    // stars
    this.stars = [];
    for (var i = 0; i < 750; i++) {
        this.star = { x: Math.random() * 1440, y: Math.floor(Math.random() * 26000) - 25500};
        this.stars.push(this.star);
    }
    this.drawStars();
    
    /*
    
    // terrain data
    var gndata = {
     mntStart: {x: 0, y: 770},
     coords: [
      [0100, Math.floor(Math.random() * 250) + 500],
      [0200, Math.floor(Math.random() * 250) + 500], "pad",
      [0300, Math.floor(Math.random() * 250) + 500], "pad",
      [0400, Math.floor(Math.random() * 250) + 500], "pad",
      [0500, Math.floor(Math.random() * 250) + 500], "pad",
      [0600, Math.floor(Math.random() * 250) + 500], "pad",
      [0700, Math.floor(Math.random() * 250) + 500], "pad",
      [0800, Math.floor(Math.random() * 250) + 500], "pad",
      [0900, Math.floor(Math.random() * 250) + 500], "pad",
      [1000, Math.floor(Math.random() * 250) + 500], "pad",
      [1100, Math.floor(Math.random() * 250) + 500], "pad",
      [1200, Math.floor(Math.random() * 250) + 500], "pad",
      [1300, Math.floor(Math.random() * 250) + 500], "pad",
      [1400, Math.floor(Math.random() * 250) + 500]
     ],
     mntEnd: {x: 1440, y: 770}
    };
    
    // draw mountain
    var mnt = this.game.add.graphics(0, 0);
    mnt.beginFill(0x003300);
    mnt.moveTo(gndata.coords[0][0], 770);
    mnt.lineTo(gndata.coords[0][0], gndata.coords[0][1]);
    mnt.lineTo(gndata.mntStart.x, gndata.mntStart.y);
    mnt.endFill();
    mnt.lineStyle(2, 0x009A00, 1);
    // draw loop
    for (var i = 0; i < gndata.coords.length; i++) {
      // reove some fuel pads randomly
      if ((gndata.coords[i + 1] == "pad") & (Math.floor(Math.random() * Math.floor(this.lives/2) + 1 > 1.5))) { gndata.coords.splice(i + 1, 1); }
      if (gndata.coords[i] !== "pad") {
        // hackish for appearances
        if (i > 0) { mnt.lineStyle(5, 0x009A00, 1); }
        mnt.lineTo(gndata.coords[i][0], gndata.coords[i][1]+2);
        if (i > 0) {
            mnt.beginFill(0x003300);
            mnt.lineStyle(0, 0x003300, 0.0);
            mnt.moveTo(gndata.coords[i][0], 770);
            if (gndata.coords[i - 1] == "pad") {
                mnt.lineTo(gndata.coords[i-2][0] + 50, 770);
                mnt.lineTo(gndata.coords[i-2][0] + 50, gndata.coords[i-2][1]+2);
            } else {
                mnt.lineTo(gndata.coords[i-1][0], 770);
                mnt.lineTo(gndata.coords[i-1][0], gndata.coords[i-1][1]+2);
            }
            mnt.lineTo(gndata.coords[i][0], gndata.coords[i][1]+2);
            mnt.endFill();
        }
      }
      if (gndata.coords[i + 1] === "pad") {
        // fill under pad
        mnt.beginFill(0x003300);
        mnt.lineTo(gndata.coords[i][0] + 50, gndata.coords[i][1]+2);
        mnt.lineTo(gndata.coords[i][0] + 50, 770);
        mnt.lineTo(gndata.coords[i][0], 770);
        mnt.lineTo(gndata.coords[i][0], gndata.coords[i][1]+2);
        mnt.endFill();
        // draw pad
        this.drawPads([gndata.coords[i][0] + 50, gndata.coords[i][1]]);
        // re-position (shouldn't need this)
        mnt.moveTo(gndata.coords[i][0] + 50, gndata.coords[i][1]+2);
      }
    }
    // end mnt
    mnt.beginFill(0x003300);
    mnt.lineTo(gndata.mntEnd.x, gndata.mntEnd.y);
    mnt.lineTo(gndata.coords[i-1][0], 770);
    mnt.lineTo(gndata.coords[i-1][0], gndata.coords[i-1][1]);
    mnt.endFill();
    mnt.lineStyle(2, 0x009A00, 1);
    mnt.lineTo(gndata.mntEnd.x, gndata.mntEnd.y);
    
    // generate a texture from the graphic and apply the texture to a sprite to make solid 
    this.mountain = this.game.make.sprite(this.game.world.centerX, this.game.world.centerY + 244, mnt.generateTexture(), 0, this.group2);
    this.gameBmp = this.game.make.bitmapData(this.game.width, this.game.height);
        
    // this works with getRGB to find collision with mountain, but it's not accurate,
    // and occasionally offset for some still unknown reason..
    this.gameBmp.draw(this.mountain, 0, 503);
    // this.game.add.sprite(0, 0, this.gameBmp);
    
    // Phaser doesn't allow graphics/sprite shape collision :(
    // see http://examples.phaser.io/_site/view_full.html?d=p2%20physics&f=load+polygon+2.js&t=load%20polygon%202
    
    // this.mountain.anchor.set(0.5);
    // this.mountain.body.immovable = true;
    // this.mountain.body.allowGravity = false;
    // this.game.physics.enable(this.mountain, Phaser.Physics.ARCADE);
    
    // hide the original sprite
    // this.mountain.clearShapes();
    // this.mountain.alpha = 0;
    
    */
    
    // define keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    // capture certain keys to prevent their default actions in the browser.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);
    
    // procedural terrain
    this.terrain = [];
    this.steps = 33;
    this.count = 0;
    for (var i = 0; i < this.steps; i++) { this.terrain.push(0); }
    this.genTerrain(0, this.steps - 1);
    this.drawTerrain();
};

GameState.prototype.genTerrain = function(L, R) {
    if ((L + 1) != R) {
      var M = Math.floor((L + R) / 2);
      this.terrain[M] = (this.terrain[L] + this.terrain[R]) / 2 + (Math.random() * 60 - 30);
      this.genTerrain(L, M);
      this.genTerrain(M, R);
    }
};

GameState.prototype.drawTerrain = function() {
    // procedural mountain
    // if (this.procMount) { this.procMount.destroy(); }
    this.procMount = this.game.make.graphics(0, 0);
    this.procMount.beginFill(0x009500, 0.25);
    this.procMount.lineStyle(1, 0x00A800, 1);
    this.procMount.moveTo(0, this.terrain[this.count % this.steps] + 580);
    for (var i = 1; i < this.steps + 1; i++) {
      this.procMount.lineTo(i * 43, this.terrain[(this.count + i) % this.steps] + 580);
    }
    this.procMount.lineTo(i * 43, 765);
    this.procMount.lineTo(0, 765);
    this.procMount.endFill();
    
    // todo: move Bmp than redraw..
    this.procMountain = this.game.add.sprite(0, 0, this.procMount.generateTexture(), 0, this.group);
    // this.mountBmp = this.game.make.bitmapData(this.game.width, this.game.height);
    // this.mountBmp.draw(this.procMountain, 0, 0);
    
    // dynamic moving mountain range (2D scroller)
    // this.count++; this.game.time.events.add(Phaser.Timer.SECOND/2, this.drawTerrain, this);
};

GameState.prototype.drawStars = function() {
    // draw stars
    for (var i = 0; i < this.stars.length; i++) { 
        this.starPoint = this.game.make.bitmapData(2, 2);
        this.starPoint.ctx.rect(0, 0, 1, 1);
        this.starPoint.ctx.fillStyle = "white";
        this.starPoint.ctx.fill();
        this.starPoints = this.game.add.sprite(this.stars[i].x, this.stars[i].y, this.starPoint);
    }
};

GameState.prototype.drawPads = function(endCoord) {
    // make some landing pads
    this.pads += 1;
    this.pad = this.game.add.sprite(endCoord[0] - 50, endCoord[1]-3, this.platformBmp, 0, this.group);
    // collide the ship with the landing pads if too fast
    this.game.physics.enable(this.pad, Phaser.Physics.ARCADE);
    // this.pad.anchor.set(0.5);
    this.pad.body.immovable = true;
    this.pad.body.allowGravity = false;
    this.padz[this.pads] = this.pad;
};

//test..
GameState.prototype.makePlatforms = function() {
    // platform basic setup
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    // this.platforms.createMultiple(5, this.platformBmp);
	
    // create the base platform, with buffer on either side so that the hero doesn't fall through
    // this.platformsCreateOne(-16, this.world.height - 16, this.world.width + 16);
    // create a batch of platforms that start to move up the level
    for( var i = 0; i < 10; i++ ) {
      this.createPlatform(this.rnd.integerInRange(10, this.world.width - 60), this.rnd.integerInRange(1000,2000) * -i);
    }
};

GameState.prototype.createPlatform = function(x, y) {
    // var platform = this.platforms.getFirstDead();
	var platform = this.game.add.sprite(x, y, this.platformBmp, 0, this.platforms);
    platform.body.immovable = true;
	platform.body.allowGravity = false;
    platform.anchor.set(0.5);
    platform.body.bounce.set(1);
    platform.body.velocity.x = Math.random() < 0.5 ? -50 : 50;
	platform.body.collideWorldBounds = true;
	// platform.body.checkCollision.up = false;
    return platform;
};

/*

// todo..
GameState.prototype.heroCreate = function() {
    // basic hero setup
    this.hero = game.add.sprite( this.world.centerX, this.world.height - 36, 'hero' );
    this.hero.anchor.set( 0.5 );
    
    // track where the hero started and how much the distance has changed from that point
    this.hero.yOrig = this.hero.y;
    this.hero.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    this.physics.arcade.enable( this.hero );
    this.hero.body.gravity.y = 100;
    this.hero.body.checkCollision.up = false;
    this.hero.body.checkCollision.left = false;
    this.hero.body.checkCollision.right = false;
};

GameState.prototype.heroMove = function() {
    // handle the left and right movement of the hero
    if( this.cursor.left.isDown ) {
      this.hero.body.velocity.x = -200;
    } else if( this.cursor.right.isDown ) {
      this.hero.body.velocity.x = 200;
    } else {
      this.hero.body.velocity.x = 0;
    }

    // handle hero jumping
    if( this.cursor.up.isDown && this.hero.body.touching.down ) {
      this.hero.body.velocity.y = -400;
    }
    
    // wrap world coordinated so that you can warp from left to right and right to left
    this.world.wrap( this.hero, this.hero.width / 2, false );

    // track the maximum amount that the hero has travelled
    this.hero.yChange = Math.max( this.hero.yChange, Math.abs( this.hero.y - this.hero.yOrig ) );
    
    // if the hero falls below the camera view, gameover
    if( this.hero.y > this.cameraYMin + this.game.height && this.hero.alive ) {
      this.state.start( 'Play' );
    }
};

*/

GameState.prototype.update = function() {
    
    // the y offset and the height of the world are adjusted
    // so track the maximum amount (vertical only) that the ship has travelled
    this.ship.yChange = Math.max(this.ship.yChange, Math.abs(this.ship.y - this.ship.yOrig));
    
    // change.. hero/ship
    this.world.setBounds(0, -this.ship.yChange, this.world.width, this.game.height + this.ship.yChange);
    
    // custom follow style (needed?)
    this.cameraYMin = this.ship.y - this.game.height - 25000;
    this.camera.y = this.cameraYMin;
	this.game.camera.follow(this.ship);
    
    // hero collisions and movement
    // this.physics.arcade.collide( this.hero, this.platforms );
    // this.heroMove();
    
    /*
    // for each platform, find out which is the highest
    // if one goes below the camera view, then create a new one at a distance from the highest one
    // these are pooled so they are very performant
    this.platforms.forEachAlive( function( elem ) {
      this.platformYMin = Math.min( this.platformYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height * 200 ) {
        elem.kill();
        this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.platformYMin - 100, 50 );
      }
    }, this );
    */
    
    /* TODO (player is on the ground walking..)
    
    var self = this;
    this.player.body.velocity.x = 0;
    
    if (this.cursors.left.isDown) { this.player.body.velocity.x = -150;   
    } else if (this.cursors.right.isDown) { this.player.body.velocity.x = 150; }
    
    // Quick and dirty 'dismount' control when down is pressed to get off platforms
    this.player.body.checkCollision.down = !this.cursors.down.isDown;
    
    if (!this.game.physics.arcade.collide(this.player, this.group, function(player, platform) {
        if (player.body.touching.down && self.cursors.up.isDown) {
            player.body.velocity.y = -600;
        }             
    })) {
        if (this.player.body.blocked.down && this.cursors.up.isDown) {
            this.player.body.velocity.y = -600;                
        }
    }
    */
    
    // collide the ship with the ground
    this.game.physics.arcade.collide(this.ship, this.ground);
    
    this.game.physics.arcade.collide(this.procMountain, this.ground);
    
    if (this.procMountain.body.touching.down && !this.mountIsDown) { this.explosionSound.play(); this.mountIsDown = true; }
    
    // collide the ship with the moving platforms (we can land on them also!)
    this.game.physics.arcade.collide(this.ship, this.platforms);
    
    // collide the ship with the fuel pads
    if (this.pads) {
        for (var i = 1; i <= this.pads; i++) {
            this.game.physics.arcade.collide(this.ship, this.padz[i]);
        }
    }
    
    // collide the ship with the mountain (tricky!)
    // this.game.physics.arcade.collide(this.ship, this.mountain);
    
    
    
    // keep the ship on the screen
    if (this.ship.x > this.game.width) { this.ship.x = 0; }
    if (this.ship.x < 0) { this.ship.x = this.game.width; }
    
    
    
    if (this.leftInputIsActive()) {
        // If the LEFT key is down, rotate left
        if (this.lives) { this.ship.body.angularVelocity = -this.ROTATION_SPEED; }
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, rotate right
        if (this.lives) { this.ship.body.angularVelocity = this.ROTATION_SPEED; }
    } else {
        // stop rotating
        this.ship.body.angularVelocity = 0;
    }
    
    // set a variable that is true when the ship is touching the ground
    var onTheGround = this.ship.body.touching.down;
    
    if (onTheGround) {
        if (Math.abs(this.ship.body.velocity.y) > 20 || Math.abs(this.ship.body.velocity.x) > 30) {
            // The ship hit the ground too hard. Blow it up and start the game over.
            this.getExplosion(this.ship.x, this.ship.y);
            this.resetShip();
        } else {
            // We've landed! Stop rotating and moving and aim the ship up.
            this.ship.body.angularVelocity = 0;
            this.ship.body.velocity.setTo(0, 0);
            this.ship.angle = -90;
            if ((this.fuelGuage.scale.x < 1) && (this.lives)) { this.fuelGuage.scale.x = this.fuelGuage.scale.x + 0.01; }
        }
    }
    
    if (this.upInputIsActive() && (this.fuelGuage.scale.x > 0)) {
        // If the UP key is down and there's fuel then do thrust
        // Calculate acceleration vector based on this.angle and this.ACCELERATION
        this.thrustPlaying = true;
        this.playThruster();
        this.ship.body.acceleration.x = Math.cos(this.ship.rotation) * this.ACCELERATION;
        this.ship.body.acceleration.y = Math.sin(this.ship.rotation) * this.ACCELERATION;
        this.fuelGuage.scale.x = this.fuelGuage.scale.x - 0.0005;
        this.ship.frame = 1; // engine on
        if (this.fuelGuage.scale.x < 0.175) { this.beepSound.play(); } // low fuel
    } else {
        if (this.thrustVolume > 0) { this.thrustPlaying = false; this.playThruster(); } // this.thrustSound.stop();
        this.ship.body.acceleration.setTo(0, 0); // stop thrusting
        this.ship.frame = 0; // engine off
    }
};

GameState.prototype.playThruster = function() {
    if (this.thrustPlaying == true) {
        this.thrustVolume = Math.min(1,this.thrustVolume + 0.07);
    } else {
        this.thrustVolume = Math.max(0,this.thrustVolume - 0.07);
    }
    this.thrustSound.volume = this.thrustVolume;
    this.thrustSound.play();
};


// turn left
GameState.prototype.leftInputIsActive = function() {
    var isActive = false;
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (this.game.input.activePointer.isDown && this.game.input.activePointer.x < this.game.width / 4);
    return isActive;
};

// turn right
GameState.prototype.rightInputIsActive = function() {
    var isActive = false;
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (this.game.input.activePointer.isDown && this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);
    return isActive;
};

// thrust
GameState.prototype.upInputIsActive = function() {
    var isActive = false;
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
    isActive |= (this.game.input.activePointer.isDown && this.game.input.activePointer.x > this.game.width / 4 &&
        this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);
    return isActive;
};

GameState.prototype.render = function() {
    this.game.debug.text(this.game.time.fps || '--', 4, 14, "#00F000"); // FPS
	this.ship.altitude = Math.abs(Math.floor(this.ship.y)-752);
	this.game.debug.text(this.ship.altitude || '--', 175, 14, "#00D000"); // ship altitude
	// this.game.debug.text(Math.floor(this.cameraYMin) || '--', 230, 14, "#00D0D0"); // camera
//  this.color = this.getRGB(this.gameBmp.context, this.ship.x, this.ship.y + 7);
    // this.hex = this.mountain.getPixel(this.ship.x, this.ship.y);
    // this.game.debug.text(this.color.rgb || '--', 500, 200, "#cc9900");
//  if (this.color.rgb === "rgb(0,0,51)") { // ground color
//      this.getExplosion(this.ship.x, this.ship.y);
//      this.resetShip();
//  }
    this.game.debug.text(this.lives || 'game over', 140, 14, "#F0F0F0");
    if ((this.fuelGuage.scale.x < 0.175) && (this.lives)) { this.game.debug.text('low fuel', 53, 14, "#FF0000"); }
};

GameState.prototype.getRGB = function (ctx, x, y) {
    
    // if it's not a context, it's probably a canvas element
    // if (!ctx.getImageData) { ctx = ctx.getContext('2d'); }
    
    // extract the pixel data from the canvas
    var pixel = ctx.getImageData(x, y, 1, 1).data;
    
    // set each color property
    pixel.r = pixel[0];
    pixel.b = pixel[1];
    pixel.g = pixel[2];
    // pixel.a = pixel[3]; // skip
    
    // CSS strings
    pixel.rgb = 'rgb(' + pixel.r + ',' + pixel.g + ',' + pixel.b + ')';
    // pixel.rgba = 'rgb(' + pixel.r + ',' + pixel.g + ',' + pixel.b + ',' + pixel.a + ')'; // skip
    
    return pixel;
    
};

GameState.prototype.getExplosion = function(x, y) {
    // get the first dead explosion from the explosionGroup
    var explosion = this.explosionGroup.getFirstDead();
    
    // if there aren't any available, create a new one
    if (explosion === null) {
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);
        
        // add an animation for the explosion
        var animation = explosion.animations.add('boom', [0, 1, 2, 3], 60, false);
        animation.killOnComplete = true;
        
        // add the explosion sprite to the group
        this.explosionGroup.add(explosion);
    }
    
    // revive the explosion (set it's alive property to true)
    // you can also define an onRevived event handler in your explosion objects to do stuff when they are revived
    explosion.revive();
    
    // start the explosion at the given coordinates
    explosion.x = x;
    explosion.y = y;
    
    // set rotation of the explosion at random for a little variety
    explosion.angle = this.game.rnd.integerInRange(0, 360);
    
    if (this.lives) { this.explosionSound.play(); }
    explosion.animations.play('boom');
    
    // return it, we might need it later
    return explosion;
};

// reset ship after crash
GameState.prototype.resetShip = function() {
    if (this.lives) {
        this.lives -= 1;
        this.ship.x = 32;
        this.ship.y = 32;
        this.ship.body.acceleration.setTo(0, 0);
        this.ship.angle = this.game.rnd.integerInRange(-180, 180);
        this.ship.body.velocity.setTo(this.game.rnd.integerInRange(100, 200), 0);
        this.fuelGuage.scale.x = 0.25 * this.lives;
    } else {
        this.ship.body.velocity.setTo(0,0); 
        this.explosionGroup.alpha = 0;
    }
};

// ------------------ eof ------------------
