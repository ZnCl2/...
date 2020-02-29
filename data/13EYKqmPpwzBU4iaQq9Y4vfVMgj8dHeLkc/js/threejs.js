/*
 * 3D Animation
 * 2017 - by Morgan
 * https://morgancaron.fr/
 */
 
 var Colors = {
	red: new THREE.Color(0xff0000),
    green: new THREE.Color(0x00ff00),
    blue: new THREE.Color(0x0000ff),
	blueScript: new THREE.Color(0x008CBA),
	lightYellow: new THREE.Color(0xffff99),
	yellow: new THREE.Color(0xffff00),
    white: new THREE.Color(0xffffff),
    lightGrey: new THREE.Color(0xbbbbbb),
    grey: new THREE.Color(0x888888),
    darkGrey: new THREE.Color(0x444444),
    black: new THREE.Color(0x000000),
	semiAqua: new THREE.Color(0x34c7f9),
	aqua: new THREE.Color(0x64E6E3),
	teal: new THREE.Color(0x008080),
	lightPurple: new THREE.Color(0xB576E9),
	purple: new THREE.Color(0x965FF9)
};

class ThreeJS {
	constructor($container, width, height, alpha, shadow) {
		this.scene = new THREE.Scene();
		this.origin = new THREE.Vector3(0, 0, 0);
		this.window = new THREE.Vector2(width, height);
		this.mouse = new THREE.Vector2(0, 0);
		
		this.renderer = new THREE.WebGLRenderer({
			alpha: alpha,
			antialias: true
		});
		this.renderer.setSize(this.window.width, this.window.height);
		if (shadow) {
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.Type = THREE.PCFSoftShadowMap;
		}
		
		$container.prepend(this.renderer.domElement);
		
		this.camera = new THREE.PerspectiveCamera(60, this.window.width / this.window.height, 1, 10000);
	}
	
	resize(width, height) {
		this.window.set(width, height);
		this.renderer.setSize(this.window.width, this.window.height);
		this.camera.aspect = this.window.width / this.window.height;
		this.camera.updateProjectionMatrix();
	}
	
	updateMousePosition(event) {
		this.mouse.set(event.clientX, event.clientY);
	}
	
	update() {
		this.renderer.render(this.scene, this.camera);
	}
}

class BackgroundPolygon extends THREE.Object3D {
	constructor(x, y, z, w, h, color) {
		super(x, y, z);
		this.position.set(x, y, z);
		
		this.animation = new THREE.PlaneGeometry(w, h, w/3, h/3);
		var size = this.animation.vertices.length;
		for (var i=0; i<size; i+=1) {
			this.animation.vertices[i].set(/*vitesse*/Math.random(), /*position*/Math.random() / 100, 0);
		}
		var geometry = new THREE.PlaneGeometry(w, h, w/3, h/3);
		var material = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide});
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		this.add(this.mesh);
	}
	
	delete() {
		delete this.animation;
		delete this.geometry;
		delete this.material;
		delete this.mesh;
	}
	
	update() {
		var size = this.mesh.geometry.vertices.length;
		for (var i=0; i<size; i+=1) {
			this.animation.vertices[i].y += this.animation.vertices[i].x / 100;
			if (this.animation.vertices[i].y > 1)
				this.animation.vertices[i].y -= 1;
			this.mesh.geometry.vertices[i].z = Math.sin(this.animation.vertices[i].y * Math.PI) * 10;
		}
		this.mesh.geometry.dynamic = true;
		this.mesh.geometry.verticesNeedUpdate = true;
	}
}

class ZeronetLogo extends THREE.Object3D {
	constructor(x, y, z) {
		super(x, y, z);
		this.position.set(x, y, z);
		var h = Math.sqrt(3)/2;
		
		var shape = new THREE.Shape();
		shape.moveTo(h*2, 1.5);
		shape.lineTo(h*2, 0.5);
		shape.lineTo(-h*2, -1.5);
		shape.lineTo(-h*2, -0.5);
		var geometry = new THREE.ShapeBufferGeometry(shape);
		var colors = new Float32Array([
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b
		]);
		geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
		var mesh0 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide }));
		mesh0.castShadow = true;
		mesh0.receiveShadow = true;
		this.add(mesh0);
		
		var depth = 0.3;
		var h2 = Math.sqrt(Math.pow(h, 2) + Math.pow(depth, 2));
		var angle = Math.atan(depth/h);
		var space = 0.1;
		
		var shape = new THREE.Shape();
		shape.moveTo(0, -0.5);
		shape.lineTo(0, 0.5);
		shape.lineTo(-h2*2, 1.5);
		shape.lineTo(-h2*2, 0.5);
		var geometry = new THREE.ShapeBufferGeometry(shape);
		var colors = new Float32Array([
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b
		]);
		geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
		var mesh1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide }));
		mesh1.castShadow = true;
		mesh1.receiveShadow = true;
		mesh1.position.set(h*2, 1, 0);
		mesh1.rotation.set(0, -angle, 0);
		mesh0.add(mesh1);
		
		var shape = new THREE.Shape();
		shape.moveTo(0, -0.5);
		shape.lineTo(0, 0.5);
		shape.lineTo(-h2*2, -0.5);
		shape.lineTo(-h2*2, -2.5 + space);
		shape.lineTo(-h2, -2 + space);
		shape.lineTo(-h2, -1);
		var geometry = new THREE.ShapeBufferGeometry(shape);
		var colors = new Float32Array([
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b
		]);
		geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
		var mesh2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide }));
		mesh2.castShadow = true;
		mesh2.receiveShadow = true;
		mesh2.position.set(-h2*2, 1, 0);
		mesh2.rotation.set(0, angle*2, 0);
		mesh1.add(mesh2);
		
		var shape = new THREE.Shape();
		shape.moveTo(0, 0.5);
		shape.lineTo(0, -0.5);
		shape.lineTo(h2*2, -1.5);
		shape.lineTo(h2*2, -0.5);
		var geometry = new THREE.ShapeBufferGeometry(shape);
		var colors = new Float32Array([
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b
		]);
		geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
		var mesh3 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide }));
		mesh3.castShadow = true;
		mesh3.receiveShadow = true;
		mesh3.position.set(-h*2, -1, 0);
		mesh3.rotation.set(0, angle, 0);
		mesh0.add(mesh3);
		
		var shape = new THREE.Shape();
		shape.moveTo(0, 0.5);
		shape.lineTo(0, -0.5);
		shape.lineTo(h2*2, 0.5);
		shape.lineTo(h2*2, 2.5 - space);
		shape.lineTo(h2, 2 - space);
		shape.lineTo(h2, 1);
		var geometry = new THREE.ShapeBufferGeometry(shape);
		var colors = new Float32Array([
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.lightPurple.r, Colors.lightPurple.g, Colors.lightPurple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b,
			Colors.purple.r, Colors.purple.g, Colors.purple.b
		]);
		geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
		var mesh4 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide }));
		mesh4.castShadow = true;
		mesh4.receiveShadow = true;
		mesh4.position.set(h2*2, -1, 0);
		mesh4.rotation.set(0, -angle*2, 0);
		mesh3.add(mesh4);
	}
}

class HeaderCanvas extends ThreeJS {
	constructor() {
		super($('#header-canvas'), window.innerWidth, window.innerHeight, true, true);
		// this.scene.add(new THREE.AxisHelper(5));
		this.camera.position.set(0, 0, 20);
		
		var dirLight = new THREE.DirectionalLight(Colors.white, 0.5);
		dirLight.position.set(0, 0, 20);
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;
		this.scene.add(dirLight);
		// this.scene.add(new THREE.DirectionalLightHelper(dirLight, 10));
		
		var spotLight = new THREE.SpotLight(Colors.white, 0.5, 100, Math.PI / 3, 0.05, 2);
		spotLight.position.set(0, 0, 15);
		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 2048;
		spotLight.shadow.mapSize.height = 2048;
		spotLight.target.position.set(0, 0, 0);
		this.scene.add(spotLight);
		// spotLight.add(new THREE.SpotLightHelper(spotLight));
		// spotLight.add(new THREE.CameraHelper(spotLight.shadow.camera));

		this.backgroundPolygon = new BackgroundPolygon(0, 0, -20, this.window.width/10, this.window.height/10, Colors.teal);
		this.scene.add(this.backgroundPolygon);

		this.zeronetLogo = new ZeronetLogo(0, 0, 0);
		this.zeronetLogo.scale.set(3, 3, 3);
		this.scene.add(this.zeronetLogo);
	}
	
	resize(width, height) {
		super.resize(width, height);
		
		this.backgroundPolygon.delete();
		this.scene.remove(this.backgroundPolygon);
		delete this.backgroundPolygon;
		this.backgroundPolygon = new BackgroundPolygon(0, 0, -20, this.window.width/10, this.window.height/10, Colors.teal);
		this.scene.add(this.backgroundPolygon);
	}
	
	update() {
		var posX, posY;
		posX = (this.mouse.x - this.window.width/2) / this.window.width/2;
		posY = (this.mouse.y - this.window.height/2) / this.window.height/2;
		
		this.backgroundPolygon.update();
		
		this.zeronetLogo.position.x += (-posX*10 - this.zeronetLogo.position.x) / 20;
		this.zeronetLogo.position.y += (-posY*10 - this.zeronetLogo.position.y) / 20;
		
		this.camera.position.x += (posX*20 - this.camera.position.x) / 10;
		this.camera.position.y += (posY*20 - this.camera.position.y) / 10;
		
		this.camera.lookAt(this.origin);
		super.update();
	}
}

window.addEventListener('load', onLoad, false);

var headerCanvas;
function onLoad() {
	headerCanvas = new HeaderCanvas();
	
	window.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
	update();
}

function onMouseMove(event) {
	headerCanvas.updateMousePosition(event);
}

function onWindowResize() {
	headerCanvas.resize(window.innerWidth, window.innerHeight);
}

function update() {
	headerCanvas.update();
	requestAnimationFrame(update);
}
