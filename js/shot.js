class Shot extends Gameobject {
	constructor() {
		super(0.5);
	}
	Move() {
		super.Move();
	}
	Phong() {
		this.obj.children[0].material = phong_s;
	}
	Gouraud() {
		this.obj.children[0].material = gouraud_s;
	}
	Action2(gameobj) {
		if(gameobj instanceof Invader) {
			points++;
			scene.remove(gameobj.obj);	
			scene.remove(this.obj);	
			gameobjs.splice(this.i, 1);	
			gameobjs.splice(gameobj.i, 1);
			hudBitmap.clearRect(0, 0, width, height);
    		hudBitmap.fillText("Points : "+points , width / 2, height / 2);
  			hudTexture.needsUpdate = true;
			if(points == 8) {
				stop = true;
				over = true;
				clock.stop();
				miniplane.material = game_won;
				sceneHUD.add(miniplane);
				points = 0; 
			}
		}
	}
	Action() {
		//if(this.obj.position.x > 35 || this.obj.position.x < -35 || this.obj.position.y > 45 || this.obj.position.y < -25) {
			scene.remove(this.obj);	
			gameobjs.splice(this.i, 1);
		//}
	}

	createShot(x,y,z) {
		this.obj = new THREE.Object3D();
		if(G)
			var material = gouraud_s;
		else
			var material = phong_s;		
		var shotGeo = new THREE.ConeGeometry(0.2,1, 5);
		shotGeo.dynamic = true;
		var mesh = new THREE.Mesh(shotGeo, material);
		this.obj.add(mesh);
		this.obj.position.set(x,y+4,z);
		scene.add(this.obj);
	}

}
