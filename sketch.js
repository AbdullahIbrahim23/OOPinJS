let bubbles = [];
let bullet = [];
let health = 20;
let timer = 30;
let gameState = "title";
let ship = {
x1: 400,
y1: 700,
}

function setup() {
	createCanvas(800, 800);
	
	setInterval(time, 1000)
	setInterval(shoot, 500)
	
	for (let i = 0; i < 15; i++){
	let x = random(width);
	let y = random(height);
	let r = random(10, 50);
	let b = new Bubble(x, y, r)
	bubbles.push(b);
	} 
}

function draw() {
	if(gameState == "win"){
		gameWon();
	}else if(gameState == "lose"){	
		gameLost();
	}
	else{
		play();
	}
}

function gameLost(){
	background(0);
	textSize(50);
	textAlign(CENTER);
	fill(250, 100, 180);
	text("YOU LOSE!", width/2, height/2);
}

function gameWon(){
	background(255);
	textSize(50);
	textAlign(CENTER);
	fill(250, 100, 180);
	text("YOU WIN!", width/2, height/2);
}

function play(){
	background(0);
	healthAndTimer();
	drawShip();
	moveShip();
	shipLoop();
	bubbleTouchingShip();
	winOrLose();
 }

function winOrLose(){
	if(health <= 0){
		gameState = "lose";
	}
	else if(health > 0 && timer == 0){
		gameState = "win";
	}
}

function bubbleTouchingShip(){
		for(let i = 0; i < bubbles.length; i++){
		if (bubbles[i].contains(ship.x1, ship.y1) && bubbles[i].brightness == 0){
			bubbles[i].changeColor();
			health-=2;
		}
		target = bubbles[i];
		bubbles[i].show();
		bubbles[i].move();
		checkForCollision(i);
	}
}


function checkForCollision(target){
	for (let i=bullet.length-1; i>=0; i--){
		if (bubbles[target].contains(bullet[i].x, bullet[i].y)){
			bubbles.splice(target,1);
			bullet.splice(i,1);
			health+=1;
		}
	}
}

function shipLoop(){
	for (let i = 0; i < bullet.length; i++){
		bullet[i].show();
		bullet[i].move();
	}
}

function drawShip(){
	fill(255, 25, 25);
	triangle(ship.x1, ship.y1-15, ship.x1-10, ship.y1+15, ship.x1+10, ship.y1+15);
}

function time(){
	timer--;
}

function healthAndTimer(){
	textSize(32);
	textAlign(LEFT);
	fill(250, 100, 180);
	text("Health: "+ health, 10, 30);
	fill(0, 200, 150);
	text("Timer: "+ timer, 10, 65);
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
	}else if(ship.x1 < 0){
		ship.x1 = width;
	}
	if(ship.y1 > height){
		ship.y1 = 0;
	}else if(ship.y1 < 0){
		ship.y1 = height;
	}
}

function shoot(){
	if(keyIsDown(32)){
		let bx = ship.x1;
		let by = ship.y1-10;
		let br = 2;
		let b1 = new Bullet(bx, by, br);
		bullet.push(b1);
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
		this.brightness = 200;
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

class Bullet{
	constructor(bx, by, br){
		this.x = bx;
		this.y = by;
		this.r = br;
		this.brightness = 255;
	}
	move(){
		this.y = this.y -5;
		if(this.y < 0){
		bullet.splice(0,1);
		}
	}
	
	show(){
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 100);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}


