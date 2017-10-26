let bubbles = [];


function setup() {
	createCanvas(600, 400); 
	let x = random(width);
	let y = random(height);
	let r = random(10, 50);
	let b = new Bubble(x, y, r)
	bubbles.push(b);
}

function mousePressed(){
	for (let i = 0; i < bubbles.length; i++){
	bubbles[i].clicked();
	}
}


/*
function mouseDragged(){
	let r = random(10, 50);
	let b = new Bubble(mouseX, mouseY, r)
	bubbles.push(b);
}
*/

function draw() {
	background(0);
	for (let i = 0; i < bubbles.length; i++){
		bubbles[i].move();
		bubbles[i].show();	
	}
	
}

class Bubble{
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
	}
	
	clicked(){
		let d = dist(mouseX, mouseY, this.x, this.y);
		if(d < this.r){
		console.log("CLICKED ON BUBBLE!");
		}
	}
	
	
	move(){
		this.x = this.x + random(-5,5);
		this.y = this.y + random(-5,5);
	}

	show() {
		stroke(255);
		strokeWeight(4);
		noFill();
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}