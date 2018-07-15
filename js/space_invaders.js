var ncam = -1;
var over = false;
var LIFES = 2;
var lifes = LIFES;
var camera;
var cameraHUD;
var ship;
var clock;
var renderer;
var scene;
var sceneHUD;
var gameobjs = [];
var stars = [];
var vec = new THREE.Vector3(0,0,0);
var atirou = false;
var points = 0;
var plight;
var sun = true;
var star = true;
var light = true;
var G = true;
var H = true;
var stop = false;
var time;
var star_positions = [[-10,10,10], [-30,40,10],[30,40,10],[-30,-15,10],[30,-15,10],[10,10,10]];
var camera = [[]];
var texture = new THREE.TextureLoader().load( "textures/background.jpg" );
var texture_game_over = new THREE.TextureLoader().load( "textures/gameover.png" );
var texture_game_paused = new THREE.TextureLoader().load( "textures/paused.png" );
var texture_game_won = new THREE.TextureLoader().load( "textures/pause.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 1 );
var phong_s = new THREE.MeshPhongMaterial({ color: 0x0000f0, emissive: 0x000000,specular: 0xffffff, shininess: 20});
var phong_red = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x000000,specular: 0xffffff, shininess: 20});
var phong_i = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x000000,specular: 0x00ff00, shininess: 10});
var galaxy =  new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide } );
var game_over =  new THREE.MeshBasicMaterial( { map: texture_game_over, side:THREE.DoubleSide } );
var game_paused =  new THREE.MeshBasicMaterial( { map: texture_game_paused, side:THREE.DoubleSide } );
var game_won =  new THREE.MeshBasicMaterial( { map: texture_game_won, side:THREE.DoubleSide } );
var gouraud_s = new THREE.MeshLambertMaterial ({ color: 0xf0f0f0, emissive: 0x000000, side: THREE.DoubleSide});
var gouraud_i = new THREE.MeshLambertMaterial ({ color: 0xff0000, emissive: 0x000000 });
var gouraud_p = new THREE.MeshBasicMaterial ({ color: 0x000d00});
var plane;
var miniplane;
var vidas = [];
var hudBitmap;
var hudTexture;
var width = window.innerWidth;
var height = window.innerHeight;

function allGouraud() {
	var i, k, l = gameobjs.length;
	for(i = 0; i < l; i++) {
		gameobjs[i].Gouraud();			
	}
}
function allPhong() {
	var i, k, l = gameobjs.length;
	for(i = 0; i < l; i++) {
		gameobjs[i].Phong();	
	}
}
function disableLight() {
	for(i = 0; i < star_positions.length; i++) {
		stars[i].light.intensity = 0;
	}
}
function enableLight() {
	for(i = 0; i < star_positions.length; i++) {
		stars[i].light.intensity = 1;
	}
}
function createSceneHUD() {	
	'use strict';
	var i,k;
	sceneHUD = new THREE.Scene();
	for(i = 0; i < lifes; i++) { 
		vidas.push(new Ship);
		vidas[i].createShip(40+i*5,-20,0, sceneHUD);
		vidas[i].obj.scale.set(0.5,0.5,0.5)
		vidas[i].Phong_red();		
	}
	var w =  window.innerWidth;
	var h = window.innerHeight;
	var aspect = w / h;
	w = w / 10;
	h = h / 10;
	var hudCanvas = document.createElement('canvas');
  
    hudCanvas.width = width;
    hudCanvas.height = height;

    hudBitmap = hudCanvas.getContext('2d');
	hudBitmap.font = "Normal 26px Arial";
    hudBitmap.textAlign = 'center';
    hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
    hudBitmap.fillText('Points : 0', width / 2, height / 2);
	hudTexture = new THREE.Texture(hudCanvas) 
	hudTexture.needsUpdate = true;
   
    var material = new THREE.MeshBasicMaterial( {map: hudTexture} );	
	material.transparent = true;
	var planeGeometry = new THREE.PlaneGeometry( 200, 50 );
	var plane_ = new THREE.Mesh( planeGeometry, material );
	plane_.position.set(50,-16,0);
    sceneHUD.add(plane_);
    var geometry1 = new THREE.PlaneGeometry( 40, 20);
	geometry1.translate(0,10,20);
	miniplane = new THREE.Mesh( geometry1, game_paused);

	cameraHUD = new THREE.OrthographicCamera(-comp*aspect,comp*aspect,comp+10,-comp+10,-comp,comp);
	cameraHUD.position.x = 0;
	cameraHUD.position.y = 0;
	cameraHUD.position.z = 10;
	cameraHUD.lookAt(scene.position);
	var plight = new THREE.DirectionalLight( 0xffffff, 1);
	plight.position.set( 50, 0, 50 );
	sceneHUD.add(plight);
}
function createScene() {
	'use strict';
	var i;
	scene = new THREE.Scene();
    var geometry = new THREE.PlaneGeometry( 250, 250);
	geometry.translate(0,0,-3);
	plane = new THREE.Mesh( geometry, galaxy );
	scene.add(plane);
	gameobjs.push(new Ship());
	gameobjs[0].createShip(0,-10,0, scene);
	ship = gameobjs[0];
	for(i = 0; i < star_positions.length; i++) {
		stars.push(new Star());
		stars[i].createStar(star_positions[i][0],star_positions[i][1],star_positions[i][2]);
	}
	for(i = 0; i < 8; i++) {
		gameobjs.push(new Invader((Math.random()*2-1)/5,(Math.random()*2-1)/5));
	}
	for(i = 0; i < 4; i++) {
		gameobjs[i+1].createInvader(-20+10*i,37,0);
	}
	for(i = 0; i < 4; i++) {
		gameobjs[i+5].createInvader(-20+10*i,25,0);
	}
	// point light
	plight = new THREE.DirectionalLight( 0xffffff, 1);
	plight.position.set( 50, 0, 50 );
	scene.add(plight);
}
var comp = 35;
function createOrthogonalCamera() {
	'use strict';
	ncam = 0;
	var factor = 10;
	var a = 25;
	var w =  window.innerWidth;
	var h = window.innerHeight;
	var aspect = w / h;
	w = w / factor;
	h = h / factor
	if(aspect > 1) {
		camera = new THREE.OrthographicCamera(-comp*aspect,comp*aspect,comp+10,-comp+10,-comp,comp);
	}else {
		camera = new THREE.OrthographicCamera(-comp,comp,(comp+10)*aspect,(-comp+10)*aspect,-comp,comp);
	}	
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 10;
	camera.lookAt(scene.position);

}
function createPerspectiveCamera() {
	'use strict';
	ncam = 1;
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,1,1000);
	camera.position.x = 0;
	camera.position.y = -30;
	camera.position.z = 10;
    vec = new THREE.Vector3(0,50,0);
	vec.set(0, 50, 0);
	camera.lookAt(vec);

}
function createPerspectiveBackCamera() {
	'use strict';
	ncam = 2;
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,1,1000);
	camera.position.x = ship.PositionX();
	camera.position.y = -30;
	camera.position.z = 10;
	vec.set( ship.PositionX(), 50, 0);
	camera.lookAt(vec);

}
function render() {
	'use strict';
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	//camera.updateProjectionMatrix();
	cameraHUD.updateProjectionMatrix();

	renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.clear();
	
	renderer.setViewport( 1, 1,  SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
	renderer.render( scene, camera );
	
	renderer.setViewport( 1, 1,  SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
//	renderer.setViewport( 0.6 * SCREEN_WIDTH + 1, 1,   0.5 * SCREEN_WIDTH - 2, 0.5*SCREEN_HEIGHT - 2 );
	renderer.render( sceneHUD, cameraHUD );	
}
function onResize() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	if(ncam == 1) {
		if(window.innerHeight > 0 && window.innerWidth > 0) {
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
			camera.updateProjectionMatrix();
		}
	}
	if(ncam == 0) {
		var aspect = window.innerWidth/window.innerHeight;
		if(aspect > 1) {
			camera.left = -comp*aspect;
			camera.right = comp*aspect;
		}else {
			camera.top = (comp+10)*aspect;
			camera.bottom (-comp+10)*aspect;
		}
		camera.aspect = renderer.getSize().width / renderer.getSize().height;

	}
}
function restartInvaders() {
	var i;	
	for(i = 1; i < gameobjs.length; i++) {
		scene.remove(gameobjs[i].obj);
	}
	gameobjs = [];	
	gameobjs.push(ship);		
	for(i = 0; i < 8; i++) {
		gameobjs.push(new Invader((Math.random()*2-1)/5,(Math.random()*2-1)/5));
	}
	for(i = 0; i < 4; i++) {
		gameobjs[i+1].createInvader(-20+10*i,37,0);
	}
	for(i = 0; i < 4; i++) {
		gameobjs[i+5].createInvader(-20+10*i,25,0);
	}
}
function restart () {
	restartInvaders(); 
	lifes = LIFES;
	for(i = 0; i < lifes; i++) { 
		sceneHUD.add(vidas[i].obj);		
	}
	clock.start();
	stop = false;
	createOrthogonalCamera();
	ship.obj.position.set(0,-10,0); 
	sceneHUD.remove(miniplane);
	hudBitmap.clearRect(0, 0, width, height);
    hudBitmap.fillText("Points : 0" , width / 2, height / 2);
  	hudTexture.needsUpdate = true;
}
function onKeyUp(e) {
	'use strict';
	
	switch(e.keyCode) {
		case 37:
			ship.UserData().left = false;
			break;
		case 39:
			ship.UserData().right = false;
			break;
		case 66:
		case 98:
			atirou = false;
			break;
	}
	
}
var s;
function onKeyDown(e) {
	'use strict';
	
	switch(e.keyCode) {
		case 65: //A
		case 97: //a
			if(!stop && !over)
			if(G) {
				gouraud_i.wireframe = !gouraud_i.wireframe;
				gouraud_s.wireframe = !gouraud_s.wireframe;
			}else {
				phong_i.wireframe = !phong_i.wireframe;
				phong_s.wireframe = !phong_s.wireframe;
			}		
			/*scene.traverse(function(node) {
				if(node instanceof THREE.Mesh)
					node.material.wireframe = !node.material.wireframe;
			});*/	
			break;
		case 66:
		case 98:
			if(atirou == false) {
				s = new Shot();
				s.createShot(ship.PositionX(), -10, 0);	
				gameobjs.push(s);
				atirou = true;
			}
			break;
		case 67:
		case 99:
			if(!stop && !over)
			if(star) {
				disableLight();
				star = false;
			}else {
				enableLight();
				star = true;
			}			
			break;
		case 37:
			ship.UserData().left = true;
			break;
		case 39:
			ship.UserData().right = true;
			break;
		case 49:
			createOrthogonalCamera(); 
			break;
		case 50:
			if(!stop)
				createPerspectiveCamera(); 
			break;
		case 51:
			if(!stop)
				createPerspectiveBackCamera(); 
			break;
		case 71:
		case 103:
			if(!stop && !over)
			if(G) {
				allPhong();
				G = false;
			}else {
				allGouraud();
				G = true;
			}
			break;
		case 72:
		case 104:
			if(!stop)
			if(H) {
                ship.spotLight.intensity = 0;	
				H = false;
			}else {
                ship.spotLight.intensity = 1;	
				H = true;
			}
			break;
		case 76:
		case 108:
			if(!stop && !over)
			if(light) {
				disableLight();
				plight.intensity = 0;	
				light = false;
			}else {
				enableLight();
				plight.intensity = 1;	
				light = true;
			}			
			break;
		case 78:
		case 110:
			if(!stop && !over)
			if(sun) {
				plight.intensity = 0;	
				sun = false;
			}else {
				plight.intensity = 1;	
				sun = true;
			}
			break;
		case 82:
		case 114:
			if(over) {
				restart();
				over = false;
			}
			break;
		case 83:
		case 115:
			if(!over) {
			if(stop) {
				clock.start();
				stop = false;
				sceneHUD.remove(miniplane);
			}else {
				miniplane.material = game_paused;
				sceneHUD.add(miniplane);
				stop = true;
				clock.stop();
			}
			}
			break;
	}
}
function colisions_limits() {
	var i, k, l = gameobjs.length;
	for(i = 0; i < gameobjs.length; i++) {
		if(gameobjs[i].hasColisionLimit()) {
				gameobjs[i].seti(i);
				gameobjs[i].Action();	
		}
	}
}
function colisions() {
	var i, k, l = gameobjs.length;
	for(i = 0; i < gameobjs.length; i++) {
		for(k = i+1; k < gameobjs.length; k++) {
			if(gameobjs[i].hasColision(gameobjs[k])) {
				gameobjs[i].seti(i);
				gameobjs[k].seti(k);
				gameobjs[i].Action2(gameobjs[k]);	
				gameobjs[k].Action2(gameobjs[i]);	
			}
		}
	}
}
function move_gameobjs() {
	var i, l = gameobjs.length;	
	for(i = 0; i < l; i++) {
		gameobjs[i].Move();
	}
}

function animate() {
	'use strict';
	if(clock.running) {
		time = clock.getDelta();
	
	//else
		//time = 0;
	move_gameobjs(); 
	colisions_limits();
	colisions();
	if(ncam == 2) {
		camera.position.x = ship.PositionX();
		camera.position.y = -30;
		camera.position.z = 10;
		vec.set(ship.PositionX(), 50, 0)
		camera.lookAt(vec);
	}

    ship.spotLight.position.set( ship.PositionX(), ship.obj.position.y, ship.obj.position.z );
    ship.spotLight.target.position.set( ship.PositionX(), 30, ship.obj.position.z);
	
	}
	else
		time = 0;
	render();
	requestAnimationFrame(animate);
}


function init(){
	'use strict';
	clock = new THREE.Clock();
	renderer = new THREE.WebGLRenderer({ antialias: true});
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createOrthogonalCamera();
	createSceneHUD();
	
	render();
	
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	clock.start();
}
