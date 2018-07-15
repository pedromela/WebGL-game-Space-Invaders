class Star {
	constructor() {
		this.light = new THREE.PointLight( 0xffffff, 1, 50, 0.2); 
		this.obj = new THREE.Object3D();
	}
	createStar(x,y,z) {
		this.light.position.set(x,y,z);
		scene.add(this.light);
		// /*		
		var material = new THREE.MeshLambertMaterial ({ color: 0xffff00, emissive: 0xffff00});
 		var horizontalRectangle = new THREE.OctahedronGeometry(1,0);
	    var mesh = new THREE.Mesh(horizontalRectangle, material);
		this.obj.add(mesh);
		this.obj.position.set(x,y,z);
		scene.add(this.obj);
		// */
	}
}
