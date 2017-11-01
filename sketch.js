let bubbles = [];
let score = 20;

function setup() {
	createCanvas(800, 800); 
	let x1 = 30;
	let y1 = 75;
	let x2 = 58;
	let y2 = 20;
	let x3 = 86;
	let y3 = 75;
	let s = new Ship(x1, y1, x2, y2, x3, y3);
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
	Ship.show();
	for (let i = 0; i < bubbles.length; i++){
		if (bubbles[i].contains(mouseX, mouseY) && bubbles[i].brightness == 0){
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
		let d = dist(x, y, this.x, this.y);
		if(d < this.r){
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
		}else if(this.x < 0){
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

class Ship{
	constructor(x1, y1, x2, y2, x3, y3){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
	}
	
	show() {
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 100);
		triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
	}
}
