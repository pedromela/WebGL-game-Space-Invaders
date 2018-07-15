class Invader extends Gameobject {	
	
	
	constructor(vx, vy) {
		super(2.5);
		this.vx = vx*30;
		this.vy = vy*30;
	}
	Action2(gameobj) {
		if(gameobj instanceof Invader) {
			this.setv(-this.vx, -this.vy);
			//gameobj.setv(-gameobj.vx, -gameobj.vy);
		}
	}
	Action() {
		super.Action();
	}
	Move() {
		super.Move();	
	}
	Phong() {
		this.obj.children[0].material = phong_i;
	}
	Gouraud() {
		this.obj.children[0].material = gouraud_i;
	}
//	Action(gameobj) {}
	createInvader(x,y,z) {
	    this.obj.userData = {moving: false, left: false, right: false, position: 0};
	//    var material = new THREE.MeshLambertMaterial ({ color: 0xff0000, emissive: 0x000000});
          var material = (G ? gouraud_i : phong_i);
	    var sphereGeometry = new THREE.SphereGeometry(1,10,10);
	    var horizontalRectangle = new THREE.CubeGeometry(4,0.5,1);
	    var _horizontalRectangle = new THREE.Mesh(horizontalRectangle, material);
	    var leftRectangle = new THREE.CubeGeometry(0.5,5,5);
		leftRectangle.translate(2,0,0);
	    var _leftRectangle = new THREE.Mesh(leftRectangle,material);
	    var rightRectangle = new THREE.CubeGeometry(0.5,5,5);
		rightRectangle.translate(-2,0,0);
	    var _rightRectangle = new THREE.Mesh(rightRectangle,material);
 
	    sphereGeometry.merge(_horizontalRectangle.geometry, _horizontalRectangle.matrix);
	    sphereGeometry.merge(_leftRectangle.geometry, _leftRectangle.matrix);
	    sphereGeometry.merge(_rightRectangle.geometry,_rightRectangle.matrix);
 		sphereGeometry.dynamic = true;
	    var mesh = new THREE.Mesh(sphereGeometry, material);
	   
	    this.obj.add(mesh);
	    this.obj.position.set(x,y,z);
   
	    scene.add(this.obj);
	}
}
