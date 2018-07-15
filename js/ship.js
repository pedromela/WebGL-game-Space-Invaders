var a = 0;// mudar isto!!
var stop = 20;
var sentido = 0;
var colidiu = false;
class Ship extends Gameobject {
	
	constructor() {
		super(3.5);
		this.spotLight = new THREE.SpotLight(0xffffff ,0.8 , 0,Math.PI/6, 0.5, 2);
	}
	Action() {
		if(this.obj.position.x > 35 || this.obj.position.x < -35) {
			this.setv(-this.vx, -this.vy);
		}
		if(this.obj.position.y > 45 || this.obj.position.y < -25) {
			this.setv(-this.vx, -this.vy);
		}
	}
	Action2(gameobj) {
		if(gameobj instanceof Invader) {
				lifes--;
				points = 0;
				this.obj.position.set(0,-10,0);
				restartInvaders();
				sceneHUD.remove(vidas[lifes].obj);
				if(lifes == 0) { 
					stop = true;
					over = true;
					clock.stop();
					miniplane.material = game_over;
					sceneHUD.add(miniplane);
				}
				hudBitmap.clearRect(0, 0, width, height);
    			hudBitmap.fillText("Points : 0" , width / 2, height / 2);
  				hudTexture.needsUpdate = true;
		}
	}
    Move() {
		if(this.UserData().left) {
			sentido = -1;
		}	
		if(this.UserData().right) {
			sentido = 1;
		}
		if(!this.UserData().right && !this.UserData().left) {
			sentido = 0;
			super.setv(this.vx/1.05,0);			
		}
		super.setv(this.vx+sentido,0);
		super.Move();
	}
	Phong() {
		var i;
		for(i = 0; i < this.obj.children.length; i++) {
			this.obj.children[i].material = phong_s;
		}
	}
	Phong_red() {
		var i;
		for(i = 0; i < this.obj.children.length; i++) {
			this.obj.children[i].material = phong_red;
		}
	}
	Gouraud() {
		var i;
		for(i = 0; i < this.obj.children.length; i++) {
			this.obj.children[i].material = gouraud_s;
		}
	}
    createShip(x,y,z, scene) {
		  var geometry = new THREE.Geometry(); 
          geometry.vertices.push(new THREE.Vector3(-2.5,  1.0, 0.0)); //0
          geometry.vertices.push(new THREE.Vector3( 2.5,  1.0, 0.0)); //1
          geometry.vertices.push(new THREE.Vector3( 2.5, -1.0, 0.0)); //2
          geometry.vertices.push(new THREE.Vector3(-2.5, -1.0, 0.0)); //3
		  geometry.vertices.push(new THREE.Vector3(-0.75,  1.0, 0.0)); //4
          geometry.vertices.push(new THREE.Vector3(0.75,  1.0, 0.0)); //5
          geometry.vertices.push(new THREE.Vector3(-0.75, 2.75, 0.0)); //6
          geometry.vertices.push(new THREE.Vector3(0.75, 2.75, 0.0)); //7
          geometry.vertices.push(new THREE.Vector3(0.75, 4.0, 0.0)); //8
          geometry.vertices.push(new THREE.Vector3(-0.75, 4.0, 0.0)); //9
 		  geometry.vertices.push(new THREE.Vector3(-1.8,  1.0, 0.0)); //10
          geometry.vertices.push(new THREE.Vector3( 1.8,  1.0, 0.0)); //11
		  geometry.vertices.push(new THREE.Vector3(-0.25,  4.0, 0.0)); //12
          geometry.vertices.push(new THREE.Vector3( 0.25,  4.0, 0.0)); //13
          geometry.vertices.push(new THREE.Vector3( 0.25, 4.75, 0.0)); //14
          geometry.vertices.push(new THREE.Vector3(-0.25, 4.75, 0.0)); //15
		  geometry.vertices.push(new THREE.Vector3(-2.5,  1.0, -1.0)); //0 = 16
          geometry.vertices.push(new THREE.Vector3( 2.5,  1.0, -1.0)); //1
          geometry.vertices.push(new THREE.Vector3( 2.5, -1.0, -1.0)); //2
          geometry.vertices.push(new THREE.Vector3(-2.5, -1.0, -1.0)); //3
		  geometry.vertices.push(new THREE.Vector3(-0.75,  1.0, -1.0)); //4
          geometry.vertices.push(new THREE.Vector3(0.75,  1.0, -1.0)); //5
          geometry.vertices.push(new THREE.Vector3(-0.75, 2.75, -1.0)); //6
          geometry.vertices.push(new THREE.Vector3(0.75, 2.75, -1.0)); //7
          geometry.vertices.push(new THREE.Vector3(0.75, 4.0, -1.0)); //8
          geometry.vertices.push(new THREE.Vector3(-0.75, 4.0, -1.0)); //9
 		  geometry.vertices.push(new THREE.Vector3(-1.8,  1.0, -1.0)); //10
          geometry.vertices.push(new THREE.Vector3( 1.8,  1.0, -1.0)); //11
		  geometry.vertices.push(new THREE.Vector3(-0.25,  4.0, -1.0)); //12
          geometry.vertices.push(new THREE.Vector3( 0.25,  4.0, -1.0)); //13
          geometry.vertices.push(new THREE.Vector3( 0.25, 4.75, -1.0)); //14
          geometry.vertices.push(new THREE.Vector3(-0.25, 4.75, -1.0)); //15
          geometry.vertices.push(new THREE.Vector3( -4.5, -1.0, -0.5)); //16
          geometry.vertices.push(new THREE.Vector3(4.5, -1.0, -0.5)); //17
		  geometry.vertices.push(new THREE.Vector3( 1.5, -0.8, 0.0)); //18
          geometry.vertices.push(new THREE.Vector3(1.3, -0.8, 0.0)); //19
          geometry.vertices.push(new THREE.Vector3( 1.4, -0.8, 1.5)); //20
          geometry.vertices.push(new THREE.Vector3(1.4, 1.0, 0.0)); //21
		  geometry.vertices.push(new THREE.Vector3( -1.5, -0.8, 0.0)); //22
          geometry.vertices.push(new THREE.Vector3(-1.3, -0.8, 0.0)); //23
          geometry.vertices.push(new THREE.Vector3( -1.4, -0.8, 1.5)); //24
          geometry.vertices.push(new THREE.Vector3(-1.4, 1.0, 0.0)); //25 + 16 = 41
		  geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5)); //26 + 16 = 42
          geometry.vertices.push(new THREE.Vector3(1.5, -2.0, 1.0)); //43
          geometry.vertices.push(new THREE.Vector3(-1.3, -2.0, 0.0)); //23
          geometry.vertices.push(new THREE.Vector3(-1.3, -0.8, 0.0)); //23
          geometry.vertices.push(new THREE.Vector3(1.5, -2.0, -0.5)); //43
          geometry.faces.push(new THREE.Face3(2, 1, 0)); // cima 
          geometry.faces.push(new THREE.Face3(3, 2, 0)); 
		  geometry.faces.push(new THREE.Face3(10, 4, 6)); 
          geometry.faces.push(new THREE.Face3(7, 5, 11));
		  geometry.faces.push(new THREE.Face3(4, 5, 8)); 
          geometry.faces.push(new THREE.Face3(8, 9, 4)); 
		  geometry.faces.push(new THREE.Face3(12, 13, 14)); 
          geometry.faces.push(new THREE.Face3(14, 15, 12)); 
		  geometry.faces.push(new THREE.Face3(16, 17, 18)); // baixo
          geometry.faces.push(new THREE.Face3(16, 18, 19)); 
		  geometry.faces.push(new THREE.Face3(22, 20, 26)); 
          geometry.faces.push(new THREE.Face3(27, 21, 23));
		  geometry.faces.push(new THREE.Face3(24, 21, 20)); 
          geometry.faces.push(new THREE.Face3(20, 25, 24)); 
		  geometry.faces.push(new THREE.Face3(30, 29, 28)); 
          geometry.faces.push(new THREE.Face3(28, 31, 30)); 		
		  geometry.faces.push(new THREE.Face3(19, 18, 2)); // parte de traz 
          geometry.faces.push(new THREE.Face3(2, 3, 19)); 
		  geometry.faces.push(new THREE.Face3(17, 16, 0)); // 2
          geometry.faces.push(new THREE.Face3(0, 1, 17));
		  geometry.faces.push(new THREE.Face3(32, 3, 0)); // ASAS 
          geometry.faces.push(new THREE.Face3(1, 2, 33));
		  geometry.faces.push(new THREE.Face3(19, 3, 32)); 
          geometry.faces.push(new THREE.Face3(33, 2, 18));
	      geometry.faces.push(new THREE.Face3(32, 19, 16)); 
          geometry.faces.push(new THREE.Face3(17, 18, 33));
          geometry.faces.push(new THREE.Face3(32, 0, 16)); 
          geometry.faces.push(new THREE.Face3(17, 1, 33)); 
		  geometry.faces.push(new THREE.Face3(11, 27, 7)); // lados
          geometry.faces.push(new THREE.Face3(23, 7, 27));
		  geometry.faces.push(new THREE.Face3(6, 26, 10)); 
          geometry.faces.push(new THREE.Face3(26, 6, 22));
		  geometry.faces.push(new THREE.Face3(22, 6, 9)); 
          geometry.faces.push(new THREE.Face3(9, 25, 22));
		  geometry.faces.push(new THREE.Face3(8, 7, 23)); 
          geometry.faces.push(new THREE.Face3(23, 24, 8));
		  geometry.faces.push(new THREE.Face3(24, 9, 8)); 
          geometry.faces.push(new THREE.Face3(24, 25, 9));
		  geometry.faces.push(new THREE.Face3(30, 14, 13)); 
		  geometry.faces.push(new THREE.Face3(13, 29, 30)); 
          geometry.faces.push(new THREE.Face3(12, 15, 31));
          geometry.faces.push(new THREE.Face3(31, 28, 12));
		  geometry.faces.push(new THREE.Face3(31, 15, 14));
          geometry.faces.push(new THREE.Face3(14, 30, 31));
          geometry.faces.push(new THREE.Face3(36, 35, 34));
          geometry.faces.push(new THREE.Face3(37, 35, 36));
          geometry.faces.push(new THREE.Face3(36, 34, 37));
		  geometry.faces.push(new THREE.Face3(38, 39, 40));
          geometry.faces.push(new THREE.Face3(40, 39, 41));
          geometry.faces.push(new THREE.Face3(41, 38, 40));
  		  //geometry.computeVertexNormals();
		  geometry.computeFaceNormals();
          var material = (G ? gouraud_s : phong_s);
	   	  var fire = new THREE.Mesh(fireGeo, material);
		  var fireGeo = new THREE.ConeGeometry(0.8,2, 6);
		  fireGeo.translate(-2,-0.5,-0.5);
		  //fireGeo.computeFaceNormals();
		  var fire2 = new THREE.Mesh(fireGeo, material);
		  var fireGeo2 = new THREE.ConeGeometry(0.8,2, 6);
		  fireGeo2.translate(2,-0.5,-0.5);
		  fireGeo2.computeFaceNormals();
		  var mesh1 = new THREE.Mesh(fireGeo, material); 
		  var mesh2 = new THREE.Mesh(fireGeo2, material); 
   
          var mesh = new THREE.Mesh(geometry, material);
		  this.obj.add(mesh);
		  this.obj.add(mesh1);
		  this.obj.add(mesh2);
          //this.obj.rotation.x = Math.PI;	
	      this.obj.position.set(x,y,z);
          scene.add(this.obj); 
			
		  this.spotLight = new THREE.SpotLight(0xffffff ,1.8 , 40,Math.PI/4, 0.1);
		  this.spotLight.position.set( this.obj.position.x, this.obj.position.y, 30 );
          this.spotLight.target.position.set(0,30,0);// = new THREE.Vector3(0,5,5);
        
		  scene.add(this.spotLight);
		  scene.add(this.spotLight.target);
	}
	createShip2(x,y,z) {
	
	this.obj.userData = {left: false, right: false, a: 0, stop: 20, sentido: 0}; // depois mudar isto!!
	
	//var material = new THREE.MeshBasicMaterial({ color: 0xfffff0, wireframe: true});
	var material = gouraud_s;
	var gunGeo = new THREE.CubeGeometry(0.5,1, 1);
	gunGeo.translate(0,4,0);
	var gun = new THREE.Mesh(gunGeo, material);
	var fire = new THREE.Mesh(fireGeo, material);
	var fireGeo = new THREE.ConeGeometry(0.5,1, 5);
	fireGeo.rotateZ(3.14159);
	fireGeo.translate(-2,-1.5,0);
	var fire = new THREE.Mesh(fireGeo, material);
	var fireGeo2 = new THREE.ConeGeometry(0.5,1, 5);
	fireGeo2.rotateZ(3.14159);
	fireGeo2.translate(2,-1.5,0);
	var fire2 = new THREE.Mesh(fireGeo2, material);
	var wingGeo = new THREE.CubeGeometry(1.5,2.5,1);
	wingGeo.rotateZ(3.14159/6);
	wingGeo.translate(0.5,1.5,0);
	var wingGeo2 = new THREE.CubeGeometry(1.5,2.5,1);
	wingGeo2.rotateZ(-3.14159/6);
	wingGeo2.translate(-0.5,1.5,0);
	var wing = new THREE.Mesh(wingGeo, material);
	var wing2 = new THREE.Mesh(wingGeo2, material);
	var cubeGeo = new THREE.CubeGeometry(5,2,1);
	var cube = new THREE.Mesh(cubeGeo, material);
	
	var coreGeo = new THREE.CubeGeometry(1.5 ,3.25, 1);
	coreGeo.translate(0,2,0);
	//cube.updateMatrix();
	coreGeo.merge(cube.geometry, cube.matrix);
	coreGeo.merge(wing.geometry, wing.matrix);
	coreGeo.merge(wing2.geometry, wing2.matrix);
	coreGeo.merge(fire.geometry, fire.matrix);
	coreGeo.merge(fire2.geometry, fire2.matrix);
	coreGeo.merge(gun.geometry, gun.matrix);
	coreGeo.dynamic = true;
	var mesh = new THREE.Mesh(coreGeo, material);
	
	this.obj.add(mesh);
	this.obj.position.set(x,y,z);
	
	scene.add(this.obj);
}

}
