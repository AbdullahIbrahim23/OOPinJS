let bubbles = [];
let score = 20;
let ship = {
x1: 400,
y1: 700,
r1: 0
}
	
function setup() {
	createCanvas(800, 800);

	for (let i = 0; i < random(20,30); i++){
	let x = random(width);
	let y = random(height);
	let r = random(10, 50);
	let b = new Bubble(x, y, r)
	bubbles.push(b);
	}
}

	
function draw() {
	background(0);
	triangle(ship.x1, ship.y1-15, ship.x1-10, ship.y1+15, ship.x1+10, ship.y1+15);
	moveShip();
	for (let i = 0; i < bubbles.length; i++){
		if (bubbles[i].contains(ship.x1, ship.y1) && bubbles[i].brightness == 0){
		bubbles[i].changeColor();
		score-=2;
		}
		bubbles[i].move();
		bubbles[i].show();
	}
}

class Bubble{
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
	}
	
	changeColor(){
		this.brightness = 255;
	}
	
	contains(x ,y){
		let d = dist(x, y, ship.x, ship.y);
		if(d < ship.r){
		return true;
		}else{
			return false;
		}
	}
	
	
	move(){
		this.x = this.x + random(-3,3);
		this.y = this.y + random(7,11);
		if(this.x > width){
			this.x = 0;
		}else if(this.x < 0){
			this.x = width;
		}
		if(this.y > height){
			this.y = 0;
		}else if(this.y < 0){
			this.y = height;
		}
	}


	show() {
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 100);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}

function moveShip() {
	if (keyIsDown(LEFT_ARROW))
    ship.x1-=5;

	if (keyIsDown(RIGHT_ARROW))
    ship.x1+=5;

	if (keyIsDown(UP_ARROW))
    ship.y1-=5;

	if (keyIsDown(DOWN_ARROW))
    ship.y1+=5;

	if(ship.x1 > width){
		ship.x1 = 0;
	}else if(this.x < 0){
		ship.x1 = width;
	}
	if(ship.y1 > height){
		ship.y1 = 0;
	}else if(this.y < 0){
		ship.y1 = height;
	}
}