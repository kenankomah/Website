var canvas;
var ctx;
var timer;
var timer1;
var b = 22;
var b1 = 20;
var a = 0.6;
var a1 = /*1.047;*/ 2.094;
var pi = Math.PI;
var phi; 
var phi1;
var x = 400;
var y = 300+b;
var y1, y2 ,y3, x1, x2 ,x3;
var wall_bounce = 2.5;
var MaxShooter = 1;
var number;
var MaxCircles = 5;
var P,Q,Px,Py,Qx,Qy,Dx,Dy;
var dotProduct;
var theta;
var AB;
var M = null;
var stop = false;
var o = 0;
var n = 0;
var enemyColour = 'red';
var playerColour = 'blue';
var contact = true;
var sum = 0;
var drawEnemy = 0;
var hitCount = 5;
var e;
var f;
var score = 0;
var level = 1;
var alpha;
var max = 0;
var impacts = 0;
var enemyHits = 0;
var totalHits;
var numberOfShots = 0;
var shotsHittingTarget = 0;
var globAlph = 1;
var gameOver = false;
var levelOver = false; 
var level = 1;
var playTime = false;
var circleX;
var circleY;
var shotAccuracy;
var bonusPoints;
var shotPercent;
var totalImpacts;
var hits = 0;
var s,s1;
var w,w1;
var explosion = false;
var explosion1 = false;
var shooter = [];
var particles = [];
var fire = [];
var enemyFire = [];
var count = [0];
var impactCounter = [];
var impactCounter2 = [];

/*** Sound files ****/
var playerShot = new Audio("audio/playerShot.mp3");
var circleHit = new Audio("audio/circleHit.mp3");
var enemyShot = new Audio("audio/enemyShot.mp3");
var enemyHit = new Audio("audio/enemyHit.mp3");
var playerHit = new Audio("audio/playerHit.mp3");
var circleCollision = new Audio("audio/circleCollision.mp3");

/*** Volume settings for the sound****/
playerShot.volume = 1;
circleHit.volume = 0.2;
enemyShot.volume = 1;
enemyHit.volume = 1;
playerHit.volume = 1;
circleCollision.volume = 0.1;

var frame = 0;
var frame1 = 0;

var assets = ['sprites/particles/fireball.png',
              'sprites/particles/fireball2.png',
			  'sprites/particles/fireball3.png',
			  'sprites/particles/fireball4.png',
              'sprites/particles/fireball5.png',
			  'sprites/particles/fireball6.png',
			  'sprites/particles/fireball7.png',
              'sprites/particles/fireball8.png',
			  'sprites/particles/fireball9.png',
			  'sprites/particles/fireball10.png',
              'sprites/particles/fireball11.png',
			  'sprites/particles/fireball12.png'
			   ];
			   
var assets1 = ['sprites/shooter/exp.png',
               'sprites/shooter/exp.png', 
               'sprites/shooter/exp.png',			   
			   'sprites/shooter/exp2.png',
			   'sprites/shooter/exp2.png',
			   'sprites/shooter/exp2.png',
			   'sprites/shooter/exp3.png',
			   'sprites/shooter/exp3.png',
			   'sprites/shooter/exp4.png',
			   'sprites/shooter/exp5.png',
			   'sprites/shooter/exp6.png',
			   'sprites/shooter/exp7.png',
			   'sprites/shooter/exp8.png',
			   'sprites/shooter/exp9.png',
			   'sprites/shooter/exp10.png',
			   'sprites/shooter/exp11.png',
			   'sprites/shooter/exp12.png',
			   'sprites/shooter/exp13.png',
			   'sprites/shooter/exp14.png',
			   'sprites/shooter/exp15.png',
			   'sprites/shooter/exp16.png'
			  ];			   
			   
var frames = [];
var frames1 = [];

function initialise(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	var globalAlpha = 1;
	ctx.beginPath();
	ctx.rect(0, 195, 800, 100);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
	ctx.textAlign = 'center';
	ctx.font = '25px Arial';   
	ctx.fillStyle = 'black';
   	ctx.fillText('Click The Canvas To Start Playing', 400 ,250);
	if(!playTime){
		document.getElementById("one").innerHTML = "";
	}
}


function main(){ 
    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	e = canvas.width / 2;
    f = canvas.height / 2;
	var listen = setInterval(listener,10);
   //  MaxCircles = 5;
	document.getElementById("one").innerHTML = "Pause";
	var frame = function(){
	if(!gameOver){
		if(!levelOver){
			if(!stop){ 
				totalHits = enemyHits + 2*impacts;
	   			draw();
				text();		
				update();
				collision();
				shotImpact();
				shotImpact1();
				circleImpact();
				health();
				fireBall(s,w);
				fireBall1(s1,w1);
			}
		}
    } 	
	window.requestAnimationFrame(frame,canvas);
	};
	window.requestAnimationFrame(frame,canvas);  
}


var key_handler = function(e) {
		switch(e.keyCode){
			case 32:
			case 37: 
			case 39: 
			case 38:  
			case 40:
			case 13:
			e.preventDefault();
			break; 
			default: break; // do not block other keys
		}
	};
window.addEventListener("keydown", key_handler, false);    
 
 
function pause(){
	if(!levelOver && playTime){
		o+=1;	
		pauser()
	}
}


function pauser(){
	if(!gameOver){
		if(o%2 == 0){ 
			stop = false;
			document.getElementById("one").innerHTML = "Pause";
		}else {
			stop = true;
			document.getElementById("one").innerHTML = "Play";
		}
	}
}


var player = { 
	x:400, //starting x coordinate of the player
	y:250, //starting y coordinate of the player
	phi: pi/2, //starting angle of the player
};


function keyDown(e){
	if(e.keyCode == 13){ // runs the code below if it detects that the enter button has been pressed
		if(playTime){ // playtime is a variable that is only set to true when the game has started, its used to prevent shots being fired before the game starts
			if(!levelOver){
				shoot(); // calls the shoot function
				numberOfShots += 1; //keeps count of the number of shots fired
			}		
		}	
	}else if(e.keyCode == 32){ // runs the code below if it detects that the space button has been pressed
		pause(); // pauses the game
	}
}

	
var key = {
	pressed: {},
	anticlockwise: 37,
	forward: 38,
	clockwise: 39,
	reverse: 40,
	isDown: function(keyCode){
		return this.pressed[keyCode];
	},
	onKeydown: function(event){
		this.pressed[event.keyCode] = true;
	},
	onKeyup: function(event){
		delete this.pressed[event.keyCode];
	},
};
        
window.addEventListener('keyup', function(event) { key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { key.onKeydown(event); }, false);

	
function listener(){
	if (key.isDown(key.forward)) { forward();}
	if (key.isDown(key.anticlockwise)) {anticlockwise();}
	if (key.isDown(key.clockwise)) {clockwise();}
	if (key.isDown(key.reverse)) {reverse();}
};

initialise();

function Circles(){
	this.radius = 15*Math.random()+10;// this determines the size of the circles
	circlePos(); // this function sets the initial position of the circles
	this.x2 = circleX; // sets the variable that will be used to define the x coordinate of the circles
	this.y2 = circleY; // sets the variable that will be used to define the y coordinate of the circles
	this.xSpeed =2*(Math.random() - Math.random()); // speed is set randomly to between 0 and 2 pixels per frame for both x and y directions
    this.ySpeed =2*(Math.random() - Math.random());
} 

function circlePos(){
	circleX = (750)*Math.random()+25; //selects the x coordinate of the circle
	circleY = (450)*Math.random()+25; //selects the y coordinate of the circle
	var	exclusionZone = Math.sqrt(Math.pow((400 - circleX),2) +  Math.pow((250 - circleY),2)); //calculates the distance between each circle and the player
	if(exclusionZone < 100){
		circlePos(); // the function is called again if exclusionZone is less than 100 pixels from the player, this is so that they are not too close to the player at the start
	}
}

for(var i=0; i<MaxCircles; i++){
	particles[i] = new Circles(); // all the circles are stored in the array particles
}


function draw(){  //this function calls all the drawing functions
	ctx.clearRect(0,0,canvas.width,canvas.height); // erases drawings from previous frames to ensure that only the current position of an animation is drawn
//	setup();
	drawShots();
	if(drawEnemy < hitCount){ // this is used to delete the enemy shooter when it has been hit a certain number (hitCount=5) of times
		drawShooter();
		drawEnemyShots();
	}
	drawPlayer();
	drawCircles();
}


function update(){ // calls all the update functions
	updateShots();
	updateCircles();
	updateShooter();
	updateEnemyShots();
}


function updateShooter(){
	for(i=0; i<MaxShooter; i++){
		Px = shooter[i].x1 - player.x; // calculates the difference between the x-coordinates of the player and the red shooter
		Py = shooter[i].y1 - player.y; // calculates the difference between the x-coordinates of the player and the red shooter
		Qx = shooter[i].x1 - shooter[i].x1+b1*Math.cos(shooter[i].phi1); //Qy and Qx calculates the difference between the x or y-coordinates the centre of the player 
		Qy = shooter[i].y1 - shooter[i].y1-b1*Math.sin(shooter[i].phi1); //and the point where the bullets are fired from
		P = Math.sqrt(Math.pow(Px,2) + Math.pow(Py,2)); // P is a calculation of the distance between the shooter and the player
		Q = Math.sqrt(Math.pow(Qx,2) + Math.pow(Qy,2)); // Q is a 
   		dotProduct = Px*Qx + Py*Qy; //This is a calculation of the dot product of P and Q if they are treated as vectors
   		theta = (180/pi)*Math.acos(dotProduct/(P*Q)); // theta is the angle between the direction that the shooter is pointing and the player(converted from radians to degrees)
		// The code below calculates the distance between different points on the shooter and the player so that it can decide whether to rotate clockwise or anticlockwise
		// to find the player
		var Ax = shooter[i].x1-b1*Math.cos(shooter[i].phi1-a) - player.x; 
		var Ay = shooter[i].y1+b1*Math.sin(shooter[i].phi1-a) - player.y; 
		var Bx = shooter[i].x1-b1*Math.cos(shooter[i].phi1+a) - player.x;
		var By = shooter[i].y1+b1*Math.sin(shooter[i].phi1+a) - player.y;
		var C = Math.sqrt(Math.pow(Px,2) + Math.pow(Py,2)); // C is the distance between the player and the shooter
		var A = Math.sqrt(Math.pow(Ax,2) + Math.pow(Ay,2)); // A is the distance between the player and point A on the shooter
		var B = Math.sqrt(Math.pow(Bx,2) + Math.pow(By,2)); // B is the distance between the player and point B on the shooter

		if(B > A){ //if point A is closer the shooter will rotate in an anticlockwise direction
	   		shooter[i].phi1 += pi/100; // anticlockwise rotation
			if(theta > 170){ // if the angle is more than 170 the code below is execute
				if(n%300 == 0){ // the condition in the if statement controls the rate at which the shooter fires
					enemyShoot(); // this line calls the function that fires the shot
				}
				if(C>200){ //this if statement prevents the shooter from getting closer than 200 pixels from the player
					shooter[i].x1 += 1.5*Math.cos(shooter[i].phi1)*1.667; //these two lines moves the shooter forward towards the player when it's
					shooter[i].y1 -= 1.5*Math.sin(shooter[i].phi1)*1.667; // distance is more than 200 pixels
				}	
			}
		}else{
			shooter[i].phi1 -= pi/100; // clockwise rotation
			if(theta > 170){
				if(n%300 == 0){
				enemyShoot();
				}
				if(C>200){
					shooter[i].x1 += 1.5*Math.cos(shooter[i].phi1)*1.667;
					shooter[i].y1 -= 1.5*Math.sin(shooter[i].phi1)*1.667;
				}	
			}
		}
	}
}


function updateCircles(){
	for(i=0; i<particles.length; i++){
		particles[i].x2 += particles[i].xSpeed;
		particles[i].y2 += particles[i].ySpeed;
		if (particles[i].x2 + particles[i].radius > canvas.width ){  // if the x component of the particle is outside the canvas
			particles[i].x2 = canvas.width - particles[i].radius;   // puts the particle within canvas
			particles[i].xSpeed =-particles[i].xSpeed; // reverses x component of speed of particle
        }
        if (particles[i].x2 < particles[i].radius){
			particles[i].x2 = particles[i].radius;
			particles[i].xSpeed =-particles[i].xSpeed;
		}
        if (particles[i].y2  + particles[i].radius > canvas.height){
			particles[i].y2 = canvas.height - particles[i].radius;
			particles[i].ySpeed =-particles[i].ySpeed;
        }
        if (particles[i].y2 < particles[i].radius){
			particles[i].y2 = particles[i].radius;
			particles[i].ySpeed =-particles[i].ySpeed;
        } 
		Dx = particles[i].x2 - player.x;
		Dy = particles[i].y2 - player.y;
		var D = Math.sqrt(Math.pow(Dx,2) + Math.pow(Dy,2));
	}
}

function drawPlayer(){
 	ctx.globalAlpha	= alpha;
	ctx.beginPath();
	ctx.moveTo(player.x-b*Math.cos(player.phi+a),player.y+b*Math.sin(player.phi+a)); // sine and cosine are used to recalculate the players orientation after it rotates
	ctx.lineTo(player.x-b*Math.cos(player.phi-a),player.y+b*Math.sin(player.phi-a));
	ctx.lineTo(player.x+b*Math.cos(player.phi),player.y-b*Math.sin(player.phi));
	ctx.lineTo(player.x-b*Math.cos(player.phi+a),player.y+b*Math.sin(player.phi+a));
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
    ctx.stroke();
	ctx.fillStyle = playerColour;
    ctx.fill(); 
/*********************************************** The code below draws the players internal lines **********************************************/	
	ctx.beginPath();
	ctx.moveTo(player.x,player.y);
	ctx.lineTo(player.x+b*Math.cos(player.phi),player.y-b*Math.sin(player.phi));
	ctx.strokeStyle = 'black';
    ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(player.x,player.y);
	ctx.lineTo(player.x-b*Math.cos(player.phi+a),player.y+b*Math.sin(player.phi+a));
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
		
	ctx.beginPath();
	ctx.moveTo(player.x,player.y);
	ctx.lineTo(player.x-b*Math.cos(player.phi-a),player.y+b*Math.sin(player.phi-a));
    ctx.strokeStyle = 'black';
    ctx.stroke();
}	
	

function drawShooter(){	
	for(i=0; i<MaxShooter; i++){
/*********************************************** The code below draws the players internal lines **********************************************/
		ctx.globalAlpha = globAlph;
		ctx.beginPath();
		ctx.arc(shooter[i].x1, shooter[i].y1, b1, 0, 2 * Math.PI, false);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = enemyColour;
		ctx.fill(); 
		ctx.beginPath();
		ctx.moveTo(shooter[i].x1,shooter[i].y1);
		ctx.lineTo(shooter[i].x1+b1*Math.cos(shooter[i].phi1),shooter[i].y1-b1*Math.sin(shooter[i].phi1));
		ctx.stroke();
	
		ctx.beginPath();
		ctx.moveTo(shooter[i].x1,shooter[i].y1);
		ctx.lineTo(shooter[i].x1-b1*Math.cos(shooter[i].phi1+a1),shooter[i].y1+b1*Math.sin(shooter[i].phi1+a1));
		ctx.lineWidth = 1;
	    ctx.stroke();
	
		ctx.beginPath();
		ctx.moveTo(shooter[i].x1,shooter[i].y1);
		ctx.lineTo(shooter[i].x1-b1*Math.cos(shooter[i].phi1-a1),shooter[i].y1+b1*Math.sin(shooter[i].phi1-a1));
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}	
}


function drawCircles(){
	for(i=0; i<particles.length; i++){
	    ctx.globalAlpha = globAlph;
		ctx.beginPath();
		ctx.arc(particles[i].x2, particles[i].y2, particles[i].radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'brown';
		ctx.fill();
		ctx.lineWidth = 1.1;
		ctx.stroke();
	}
}

function forward(){ 
	if(!stop){ 
		player.y -= 1.5*Math.sin(player.phi); // moves the player forwards, sin and cos calculations ensures that it moves in the right direction 
		player.x += 1.5*Math.cos(player.phi);
/************************************************************ the code below are used to stop the player from leaving the canvas **********************************************/	
		if(player.y-b*Math.sin(player.phi)<=0){
			player.y += wall_bounce; 
		}else if(player.y-b*Math.sin(player.phi) >= canvas.height){
			player.y -= wall_bounce;  //the bounce prevents the player from being able to leave the canvas
		}else if(player.x+b*Math.cos(player.phi) > canvas.width){
			player.x -= wall_bounce;
		}else if(player.x+b*Math.cos(player.phi) <	0){  // checks to see if the top corner of the player has a position less than the left hand side of the canvas
			player.x += wall_bounce;   // pushes the corner back into the canvas
		}else if(player.x-b*Math.cos(player.phi-a) <= 0){ // checks to see if the left corner of the player has a position less than the left hand side of the canvas
			player.x += wall_bounce;   
		}else if(player.x-b*Math.cos(player.phi-a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi-a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi-a)>= canvas.height){
			player.y -= wall_bounce;
		}else if(player.x-b*Math.cos(player.phi+a)<=0  ) {
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi+a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi+a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi+a)>= canvas.height){ // checks to see if the right corner of the player has a position greater than the bottom side of the canvas
			player.y -= wall_bounce;
		}
	}
}
	
	
function reverse(){
	if(!stop){ 
		player.y += 1.5*Math.sin(player.phi);  
		player.x -= 1.5*Math.cos(player.phi);

		if(player.x-b*Math.cos(player.phi-a)<=0){
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi-a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi-a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi-a)>= canvas.height){
			player.y -= wall_bounce;
		}else if( player.x-b*Math.cos(player.phi+a)<=0  ){
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi+a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi+a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi+a)>= canvas.height){
			player.y -= wall_bounce;
		}
	}
}
	
	
function clockwise(){
	if(!stop){ 
		player.phi -= pi/100;  // clockwise rotation
		if(player.y-b*Math.sin(player.phi)<0){
			player.y += wall_bounce;
		}else if(player.y-b*Math.sin(player.phi)> canvas.height){
			player.y -= wall_bounce;
		}else if(player.x+b*Math.cos(player.phi) > canvas.width){
			player.x -= wall_bounce;
		}else if(player.x+b*Math.cos(player.phi) <	0){
			player.x += wall_bounce;
		}else if( player.x-b*Math.cos(player.phi-a)<=0  ) {
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi-a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi-a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi-a)>= canvas.height){
			player.y -= wall_bounce;
		}else if( player.x-b*Math.cos(player.phi+a)<=0  ) {
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi+a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi+a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi+a)>= canvas.height){
			player.y -= wall_bounce;
		}	
	}
}	
		
		
function anticlockwise(){
	if(!stop){ 
		player.phi += pi/100;
		if(player.y-b*Math.sin(player.phi)<0){
			player.y += wall_bounce;
		}else if(player.y-b*Math.sin(player.phi)> canvas.height){
			player.y -= wall_bounce;
		}else if(player.x+b*Math.cos(player.phi) > canvas.width){
			player.x -= wall_bounce;
		}else if(player.x+b*Math.cos(player.phi) <	0){
			player.x += wall_bounce;
		}else if( player.x-b*Math.cos(player.phi-a)<=0  ) {
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi-a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi-a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi-a)>= canvas.height){
			player.y -= wall_bounce;
		}else if( player.x-b*Math.cos(player.phi+a)<=0  ) {
			player.x += wall_bounce;
		}else if(player.x-b*Math.cos(player.phi+a)>= canvas.width){
			player.x -= wall_bounce;
		}else if( player.y+b*Math.sin(player.phi+a)<= 0){ 
			player.y += wall_bounce;
		}else if(player.y+b*Math.sin(player.phi+a)>= canvas.height){
			player.y -= wall_bounce;
		}	
	}
}

function Shots(){
	this.x3 = player.x;
	this.y3 = player.y;
	this.phi = player.phi; // sets the orientation of the player
	this.xVel =14*Math.cos(player.phi); // sets the speed of the bullets
	this.yVel =14*Math.sin(player.phi); // Math.sin and Math.cos calculations are used to make sure that the bullets move in the right direction
}

function EnemyShots(){
	this.x4 = shooter[0].x1;
	this.y4 = shooter[0].y1;
	this.phi1 = shooter[0].phi1;
	this.xVeloc =14*Math.cos(shooter[0].phi1);
	this.yVeloc =14*Math.sin(shooter[0].phi1);
}


function enemyShoot(){
	if(drawEnemy < hitCount){ 
	enemyShot.play();
		if(enemyFire.length < 1){ // this means that shots are only fired when enemyFire array is empty
		  	enemyFire.push(new EnemyShots()); //creates new shots
		}
	}	
}

function drawEnemyShots(){
	for(i=0; i<enemyFire.length; i++){
		ctx.globalAlpha = globAlph;
		ctx.beginPath();
		ctx.arc(enemyFire[i].x4+b*Math.cos(enemyFire[i].phi1),enemyFire[i].y4-b*Math.sin(enemyFire[i].phi1), 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
	}
}


function updateEnemyShots(){
	for(i=0; i<enemyFire.length; i++){
		enemyFire[i].x4 += enemyFire[i].xVeloc;
		enemyFire[i].y4 -= enemyFire[i].yVeloc;
		if(enemyFire[i].x4 > canvas.width || enemyFire[i].y4 > canvas.width || enemyFire[i].x4 < 0 || enemyFire[i].y4 < 0){
			enemyFire.splice(0,1); // removes the bullets from the array once it leaves the canvas
		}
	}
}


function shoot(){
	if(!stop){
		if(fire.length < 3){ // allows for only three shots at a time
			playerShot.currentTime = 0;
			playerShot.play();
			fire.push(new Shots()); //creates new shots
		}
	}	
}

 
function drawShots(){
	for(var i=0; i<fire.length; i++){
		//ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(fire[i].x3+b*Math.cos(fire[i].phi),fire[i].y3-b*Math.sin(fire[i].phi), 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
	}
}

	
function updateShots(){
    n+=1;
	for(i=0; i<fire.length; i++){
		fire[i].x3 += fire[i].xVel;
		fire[i].y3 -= fire[i].yVel;
		if(fire[i].x3 > canvas.width || fire[i].y3 > canvas.width || fire[i].x3 < 0 || fire[i].y3 < 0){
			fire.splice(0,1); //deletes shots when they are outside of the canvas
		}
	}
}


function Enemy(x1,y1,phi1){
	this.x1 = x1;
	this.y1 = y1;
	this.phi1 = phi1;
}


for(i=0; i<MaxShooter; i++){
	shooter[i] = new Enemy(760*Math.random()+20,460*Math.random()+20,2*pi*Math.random());
}

/******************* the function below checks to see if the players bullets have hit the circles **********/
function collision(){
	for(var j=0; j<particles.length; j++){		
		for(i=0; i<fire.length; i++){	
			if(particles[j] && fire[i]){ // this ensures that the  code below is not executed when the array is empty
				M = Math.sqrt(Math.pow((particles[j].x2 - fire[i].x3),2) +  Math.pow((particles[j].y2 - fire[i].y3),2));
		 		if(M < particles[j].radius){
				    explosion = true;
					s = particles[j].x2;
					w = particles[j].y2;
					circleHit.currentTime = 0;
				    circleHit.play();
					score = score + 50;
					fire.splice(i,1);  // makes bullet disappear on impact 
					particles.splice(j,1); // makes circle disappear on impact 
					shotsHittingTarget +=1;
				}
			}
		}
	}
}


/************************* the function below checks to see if the shooter/enemy has been hit ***************************/
function shotImpact(){ 
	enemyColour = 'red';
	for(i=0; i<fire.length; i++){	
		if(drawEnemy <= hitCount-1){ 
			var PlayerShotToEnemyDist = Math.sqrt(Math.pow((shooter[0].x1 - fire[i].x3),2) +  Math.pow((shooter[0].y1 - fire[i].y3),2));
		}
		if(PlayerShotToEnemyDist < b1){
		   	enemyColour = 'white';
			if(drawEnemy<=hitCount){			
				drawEnemy += 1;
			}
			explosion1 = true;
		    s1 = shooter[0].x1;
			w1 = shooter[0].y1;
			if(drawEnemy <= hitCount){
				enemyHit.currentTime = 0;
				enemyHit.play();
				fire.splice(i,1); // makes bullet disappear on impact
               	score += 100;
				shotsHittingTarget +=1;				
			}
		}
	}
}


function shotImpact1(){ // this function controls what happens when the player is hit
	playerColour = 'blue';
	for(i=0; i<enemyFire.length; i++){	
		var EnemyShotToPlayerDist = Math.sqrt(Math.pow((player.x - enemyFire[i].x4),2) +  Math.pow((player.y - enemyFire[i].y4),2));
		if(EnemyShotToPlayerDist < 12){
		    playerHit.play();
			playerColour = 'white';	
			enemyFire.splice(i,1);
			score -= 100;
			enemyHits += 1;
		}
	}	
}

/********************************************** This function is used to keep count of the number of times the player has been hit*********************************/
function circleImpact(){
    max = 0;
	sum = 0;
	hits = 0;
	count.splice(1,count.length-1);
	for(i=0; i<particles.length; i++){	
		var circlePlayerDis = Math.sqrt(Math.pow((player.x - particles[i].x2),2) +  Math.pow((player.y - particles[i].y2),2));
		if(circlePlayerDis < particles[i].radius +12){
		    circleCollision.play();
			count.push(1);
		}
    }
	
	for(i=0; i<count.length; i++){
		sum += count[i];
	}
	if(sum){
		alpha = 0.3; //fades the player when it gets hit
	}else{
		alpha = 1;	
	}
	if(count[1]){
		impactCounter.push(1)
		impactCounter2.push(1);
	}else{
		impactCounter.push(0)
		impactCounter2.push(0);
	}
	for(i=0; i<impactCounter.length; i++){
		if(impactCounter[i] != impactCounter[i+1]){
			max += 1; 
		}
	}
	for(var j=0; j<impactCounter2.length; j++){
		if(impactCounter2[j] != impactCounter2[j+1]){ 
			hits += 1; 
		}
	}
 	impacts = Math.floor(max/2);
    totalImpacts = Math.floor(hits/2); 	
	shotPercent = 100*(shotsHittingTarget/numberOfShots);
}	


function text(){
 	var globalAlpha = 1;
	ctx.font = '18px Arial';   
	ctx.textAlign = 'left';
	ctx.fillStyle = 'black';
   	ctx.fillText('Level: '+ level, canvas.width-120,20);
	ctx.fillText('Score: '+ (score - 100*totalImpacts), canvas.width-120,45);
	ctx.fillText('Health',10, 20);
		
	if(numberOfShots){
		ctx.fillText(' '+shotPercent.toFixed(2) +'%', canvas.width-80,canvas.height-20);
	}else{
		ctx.fillText('  0.00%', canvas.width-85,canvas.height-20);
	}
	ctx.fillText('Shot Accuracy:',canvas.width-205 + 5,canvas.height-20);
	if(totalHits >=6){
		gameOver = true;
		shotAccuracy = shotsHittingTarget/numberOfShots;
		if((score - 100*totalImpacts)>0){
			bonusPoints = (score - 100*totalImpacts)*shotAccuracy/4
			score = (score - 100*totalImpacts) + bonusPoints;//*(1+(shotAccuracy/4));
			ctx.font = '40px Arial'; 
			ctx.textAlign = "center";		
			ctx.fillStyle = 'black';
			ctx.fillText('Game Over!',e,f);
			ctx.font = '20px Arial'; 
			ctx.fillText('Accuracy Bonus Points = ' + bonusPoints.toFixed(0),e,f+60)
			ctx.fillText('Your Total Score Is ' + score.toFixed(0),e,f+120);
			ctx.font = '17px Arial'; 
			ctx.fillText('Click Anywhere On The Canvas To Restart',e,f+180);
		}else{
		    ctx.font = '40px Arial'; 
			ctx.textAlign = "center";	
		    ctx.fillText('Game Over!',e,f);
			ctx.font = '20px Arial'; 
			ctx.fillText('Your Score Is ' + (score-100*impacts),e,f+60);
			ctx.font = '17px Arial'; 
			ctx.fillText('Click Anywhere On The Canvas To Restart',e,f+120);
		}
	}
	
	if((particles.length == 0) && (drawEnemy >= hitCount)){
		if(level<10){
			levelOver = true; 
			frame = 0;
			ctx.font = '35px Arial'; 
			ctx.textAlign = "center";		
			ctx.fillStyle = 'black';
			ctx.fillText('You Have Completed Level ' + level + '!',e,f);
			ctx.font = '17px Arial'; 
			ctx.fillText('Click Anywhere On the canvas',e,f+40);
			ctx.fillText('To Get To The Next Level',e,f+80);
		}else if(level == 10){
			gameOver = true;
			shotAccuracy = shotsHittingTarget/numberOfShots;
			bonusPoints = (score - 100*totalImpacts)*shotAccuracy/4
			score = (score - 100*totalImpacts) + bonusPoints;//*(1+(shotAccuracy/4));
			ctx.font = '50px Arial'; 
			ctx.textAlign = "center";		
			ctx.fillStyle = 'black';
			ctx.fillText('Congratulations!',e,f);
			ctx.font = '25px Arial'; 
			ctx.textAlign = "center";		
			ctx.fillStyle = 'black';
			ctx.fillText('You Have Completed The Game!',e,f+50);
			ctx.font = '20px Arial'; 
			ctx.fillText('Accuracy Bonus Points = '+ bonusPoints.toFixed(0) ,e,f+110);
			ctx.fillText('Your Total Score Is ' + score.toFixed(0),e,f+170);
		}
	}
}

/********************************************************** The health function determines the state of the health bar ******************************************/
function health(){
	if(levelOver){
		enemyHits = 0 ; 
		impacts = 0;
		fire.splice(0,fire.length);
	}

	if(totalHits == 0){
		ctx.beginPath();
		ctx.rect(70, 12, 150, 5);
		ctx.fillStyle = '#33FF00';
		ctx.fill();
		ctx.strokeStyle = 'black';
	}else if(totalHits==1){
		ctx.beginPath();
		ctx.rect(70, 12, 125, 5);
		ctx.fillStyle = '#33FF00';
		ctx.fill();
		ctx.strokeStyle = 'black';
	}else if(totalHits==2){
		ctx.beginPath();
		ctx.rect(70, 12, 100, 5);
		ctx.fillStyle = 'orange';
		ctx.fill();
		ctx.strokeStyle = 'black';
	}else if(totalHits==3){
		ctx.beginPath();
		ctx.rect(70, 12, 75, 5);
		ctx.fillStyle = 'orange';
		ctx.fill();
		ctx.strokeStyle = 'black';
	}else if(totalHits==4){
		ctx.beginPath();
		ctx.rect(70, 12, 50, 5);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.strokeStyle = 'black';
	}else if(totalHits==5){
		ctx.beginPath();
		ctx.rect(70, 12, 25, 5);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.strokeStyle = 'black';
     }
	ctx.beginPath();
	ctx.rect(70, 12, 150, 5);
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = 'black';
	ctx.stroke();
}


function myFunction(){
	if(gameOver){
	   	location.reload();
	}else if(levelOver){
		explosion = false; 
		level+=1;
		number = 30;
		player.x = 400;
		player.y = 250;	
		player.phi = pi/2;
		   
	    if(level==2){
			MaxCircles = 10;
		}else if(level ==3){
			MaxCircles = 15;
		}else if(level==4){
			MaxCircles = 20;
		}else if(level==5){
			MaxCircles = 25;
		}else if(level==6){
			MaxCircles = 30;
		}else if(level==7){
			MaxCircles = 35;
		}else if(level==8){
			MaxCircles = 40;
		}else if(level==9){
			MaxCircles = 45;
		}else if(level==10){
			MaxCircles = 50;
		}
	
		drawEnemy = 0; 
		impactCounter.splice(0,impactCounter.length);
		enemyHits = 0; 
		impacts = 0;
		for(i=0; i<MaxCircles; i++){
			particles[i] = new Circles();
		}
		for(i=0; i<MaxShooter; i++){
			shooter[i] = new Enemy(760*Math.random()+20,460*Math.random()+20,2*pi*Math.random());
		}	
	}
	levelOver = false;
	if(!playTime){
		playTime = true
		main();
	}
}


function fireBall(s,w){
	if(explosion){ // runs the the fireball animation each time a circle is hit
		for(var k = 0; k < assets.length; k++){
			frames.push(new Image());
			frames[k].src = assets[k];
		}
		if(frame<assets.length-1){		
			ctx.drawImage(frames[frame],s-30,w-30);
		}
		if(frame<assets.length){
			frame = (frame + 1);//%assets.length;
		}else{
			explosion = false;
			frame = 0;
		}
	}
}


function fireBall1(s1,w1){
	if(drawEnemy == 5||drawEnemy == 6){ // Runs the explosion animation when the enemy play has been destroyed
		if(explosion1){
	  		for(var k = 0; k < assets1.length; k++){
				frames1.push(new Image());
				frames1[k].src = assets1[k];
			}
			if(frame1<assets1.length-1){		
				ctx.drawImage(frames1[frame1],s1-30,w1-30);
			}
			if(frame1<assets1.length){
				frame1 = (frame1 + 1);
			}else{
				explosion1 = false;
				frame1 = 0;
			}
		}
	}
}