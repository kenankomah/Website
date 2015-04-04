var c;
var ctx;
var timer;
var b = 8;
var a = 0.6;
var pi = Math.PI;
var phi; 
var phi1;
var x = 400;
var y = 300+b;
var y1, x1;
var wall_bounce = 2.5;
var MaxShooter;
shooter = [];
shooter1 = [];
shooter2 = [];
shooter3 = [];
shooter4 = [];
shooter5 = [];
function main(){ 

    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	timer = setInterval(clockwise, 10);
	timer = setInterval(forward, 10);
	
	var frame = function(){
		draw();
		animate();
			
		window.requestAnimationFrame(frame,canvas);
	};
	 window.requestAnimationFrame(frame,canvas);  
	
	MaxShooter = 37;
	
}


player = { 
	x:400,
	y:300,
	phi:pi/2,

	draw: function(){
	
	ctx.clearRect(0,0,canvas.width,canvas.height);	
	ctx.beginPath();
	ctx.moveTo(this.x-b*Math.cos(this.phi+a),this.y+b*Math.sin(this.phi+a));
	ctx.lineTo(this.x-b*Math.cos(this.phi-a),this.y+b*Math.sin(this.phi-a));

	ctx.lineTo(this.x+b*Math.cos(this.phi),this.y-b*Math.sin(this.phi));
	ctx.lineTo(this.x-b*Math.cos(this.phi-a),this.y+b*Math.sin(this.phi-a));

	ctx.lineTo(this.x+b*Math.cos(this.phi),this.y-b*Math.sin(this.phi));
	ctx.lineTo(this.x-b*Math.cos(this.phi+a),this.y+b*Math.sin(this.phi+a));
	ctx.strokeStyle = 'black';
    ctx.stroke();
		
	ctx.fillStyle = 'blue';
    ctx.fill(); 
	

/*********************************************** The code below draws the players internal lines **********************************************/	
	
	ctx.beginPath();
	ctx.moveTo(this.x,this.y);
	ctx.lineTo(this.x+b*Math.cos(this.phi),this.y-b*Math.sin(this.phi));
	ctx.strokeStyle = 'black';
    ctx.stroke();
	
	ctx.beginPath();
	ctx.lineTo(this.x,this.y);
	ctx.lineTo(this.x-b*Math.cos(this.phi+a),this.y+b*Math.sin(this.phi+a));

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
	
	
	ctx.beginPath();
	ctx.lineTo(this.x,this.y);
	ctx.lineTo(this.x-b*Math.cos(this.phi-a),this.y+b*Math.sin(this.phi-a));
	
    ctx.strokeStyle = 'black';
    ctx.stroke();

	},

};
	
main();

function draw(){
	player.draw();
	a += 0.1;
}


function forward(){ // Up arrow 38
	player.y -= 1.5*Math.sin(player.phi);
	player.x += 1.5*Math.cos(player.phi);
}
	

function clockwise(){
	player.phi -= pi/150;  //Right arrow 39
}	


function Enemy(x1,y1,phi1){
	this.x1 = x1;
	this.y1 = y1;
	this.phi1 = phi1;
}
/********************************************* The code below adds a method called 'update' to the Enemy class **********************************************/

Enemy.prototype.update = function() {
	this.phi1 -= pi/90;
	this.y1 -= 2.5*Math.sin(this.phi1);
	this.x1 += 2.5*Math.cos(this.phi1);
};



Enemy.prototype.drawer = function (){

	ctx.beginPath();
	ctx.moveTo(this.x1-b*Math.cos(this.phi1+a),this.y1+b*Math.sin(this.phi1+a));
	ctx.lineTo(this.x1-b*Math.cos(this.phi1-a),this.y1+b*Math.sin(this.phi1-a));
   // console.log(this.y1);
	ctx.lineTo(this.x1+b*Math.cos(this.phi1),this.y1-b*Math.sin(this.phi1));
	ctx.lineTo(this.x1-b*Math.cos(this.phi1-a),this.y1+b*Math.sin(this.phi1-a));

	ctx.lineTo(this.x1+b*Math.cos(this.phi1),this.y1-b*Math.sin(this.phi1));
	ctx.lineTo(this.x1-b*Math.cos(this.phi1+a),this.y1+b*Math.sin(this.phi1+a));
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;
    ctx.stroke();
		
	ctx.fillStyle = 'red';
    ctx.fill(); 

/*********************************************** The code below draws the players internal lines **********************************************/	
	
	ctx.beginPath();
	ctx.moveTo(this.x1,this.y1);
	ctx.lineTo(this.x1+b*Math.cos(this.phi1),this.y1-b*Math.sin(this.phi1));
//	ctx.strokeStyle = 'black';
    ctx.stroke();
	
	ctx.beginPath();
	ctx.lineTo(this.x1,this.y1);
	ctx.lineTo(this.x1-b*Math.cos(this.phi1+a),this.y1+b*Math.sin(this.phi1+a));

    ctx.lineWidth = 1;
   // ctx.strokeStyle = 'yellow';
    ctx.stroke();
	
	
	ctx.beginPath();
	ctx.lineTo(this.x1,this.y1);
	ctx.lineTo(this.x1-b*Math.cos(this.phi1-a),this.y1+b*Math.sin(this.phi1-a));
	
    ctx.strokeStyle = 'black';
    ctx.stroke();
};


for(i=0; i<MaxShooter; i++){
	shooter[i] = new Enemy(200*Math.random()+300,250,2*pi*Math.random());
	shooter1[i] = new Enemy(300,200*Math.random()+150,2*pi*Math.random());
	shooter2[i] = new Enemy(400,200*Math.random()+150,2*pi*Math.random());
	shooter3[i] = new Enemy(500,200*Math.random()+150,2*pi*Math.random());
	shooter4[i] = new Enemy(200*Math.random()+300,150,2*pi*Math.random());
	shooter5[i] = new Enemy(200*Math.random()+300,350,2*pi*Math.random());
}


function animate(){
	for(i=0; i<MaxShooter; i++){
		shooter[i].drawer();
		shooter[i].update();
		
		shooter1[i].drawer();
		shooter1[i].update();
		
		shooter2[i].drawer();
		shooter2[i].update();
		
		shooter3[i].drawer();
		shooter3[i].update();
		
		shooter4[i].drawer();
		shooter4[i].update();
		
		shooter5[i].drawer();
		shooter5[i].update();
	}
}