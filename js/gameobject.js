class Gameobject {
	constructor(r) {
		this.r = r;
		this.obj = new THREE.Object3D();
		this.vx = 0;
		this.vy = 50;
		this.i = 0;
		this.angle = 0;
	}
	seti(i) {
		this.i = i;
	}
	setv(vx, vy) {
		this.vx = vx;
		this.vy = vy;
	}
	setvx(vx) {
		this.vx = vx;
	}
	setvy(vy) {
		this.vy = vy;
	}
	getvx() {
		return this.vx;
	}
	getvy() {
		return this.vy;
	}
	PositionX() {
		return this.obj.position.x;
	}
	Action() {
		if(this.obj.position.x > 35 || this.obj.position.x < -35) {
			this.setv(-this.vx, this.vy);
		}
		if(this.obj.position.y > 45 || this.obj.position.y < -25) {
			this.setv(this.vx, -this.vy);
		}
	}
	Move() {
		this.obj.position.set(this.obj.position.x+this.vx*time, this.obj.position.y+this.vy*time, this.obj.position.z);
	}
	hasColisionLimit() {
		if(this.obj.position.x > 35 || this.obj.position.x < -35) {
			return true;
		}
		if(this.obj.position.y > 45 || this.obj.position.y < -25) {
			return true;
		}
	}
	hasColision(gameobj) {
		if(this.r + gameobj.r >= Math.sqrt((this.obj.position.x-gameobj.obj.position.x)*(this.obj.position.x-gameobj.obj.position.x)+(this.obj.position.y-gameobj.obj.position.y)*(this.obj.position.y-gameobj.obj.position.y))) {
			return true;
		}
		return false;	
	}
	UserData() {
		return this.obj.userData;
	}
}
