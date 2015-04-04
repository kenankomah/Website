var ctx;    //Canvas object
var t;      //Tetrimino type
var x, y;   //Tetrimino position
var o;      //Tetrimino orientation
var d;
var grid;   //Game state grid
var timer;  //Game timer
var score;  //Player's score
var level;  //Current level
var timestep;   //Time between calls to gameStep(),left(),right() e.t.c
var snakeBody =[];
var gridUnit = 10;
var itemToRemove;
var c;
var counter = 1;
var step;
var leftm;
var rightm;
var upm;
var downm;
var start; // this variable will be used to prevent the play/pause from button working when the game is not being played
var e;
var a;
var b;
var eatingSound = new Audio('audio/beep-7.wav');
var gameOverSound = new Audio('audio/beep-10.wav');
eatingSound = new Audio('audio/beep-7.mp3');  // These two lines are a copy of the two above but the wav files have been replaced with mp3 files.
gameOverSound  = new Audio('audio/beep-10.mp3'); // this is necessary as some browsers are only compatible with mp3 or only wav audio files.

eatingSound.volume = 0.15;
gameOverSound.volume = 0.1;  

/************************************************
Initialize the drawing canvas
************************************************/
function init(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
	e = c.width / 2;
	ctx.clearRect(0,0,400,400);  
    ctx.font = "20px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = "white";
    ctx.fillText("Click on New Game to start!",e,200);
}


function initialize() {
  	ctx.clearRect(0,0,400,400);
	x =  gridUnit*6;
	y =  gridUnit*19;
   	score = 0;
    level = 1;
    timestep = 90;
	start = true;
    //Start the game timer
    clearInterval(timer); /**  setInterval is always used as a parameter of clearInterval  **/
    timer = setInterval(gameStep, timestep);
	snakeBody =[[drawBlock(x-gridUnit,y,120),x-gridUnit,y],[drawBlock(x,y,120),x,y]];
	food();
	document.getElementById("score").innerHTML = "Level " + 1 + " Score: " + 0;
}


/************************************************
Draws a cell at the specified game coordinate
x = [0,50]   x-coordinate
y = [0,50]   y-coordinate
c = [0,360]  cell colour
************************************************/

function drawBlock(x,y,c) {         
    /**** Draw the center part of the block ****/
    //Set the fill color using the supplied color
    ctx.fillStyle = "hsl(" + c + ",100%,50%)";
           
    //Create a filled rectangle
    ctx.fillRect(x+1,y+1,8,8);
           
    /**** Draw the top part of the block ****/
          
    //Set the fill color slightly lighter
    ctx.fillStyle = "hsl(" + c + ",100%,70%)";
          
    //Create the top polygon and fill it
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+10,y);
    ctx.lineTo(x+9,y+1);
    ctx.lineTo(x+1,y+1);
    ctx.fill();
      
    /**** Draw the sides of the block ****/
           
    //Set the fill color slightly darker
    ctx.fillStyle = "hsl(" + c + ",100%,40%)";
           
    //Create the left polygon and fill it
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+10);
    ctx.lineTo(x+1,y+9);
    ctx.lineTo(x+1,y+1);
    ctx.fill();
           
    //Create the right polygon and fill it
    ctx.beginPath();
    ctx.moveTo(x+10,y);
    ctx.lineTo(x+10,y+10);
    ctx.lineTo(x+9,y+9);
    ctx.lineTo(x+9,y+1);
     ctx.fill();
        
    /**** Draw the bottom part of the block ****/
           
    //Set the fill color much darker
    ctx.fillStyle = "hsl(" + c + ",100%,30%)";
           
    //Create the bottom polygon and fill it
    ctx.beginPath();
    ctx.moveTo(x,y+10);
    ctx.lineTo(x+10,y+10);
    ctx.lineTo(x+9,y+9);
    ctx.lineTo(x+1,y+9);
    ctx.fill();	   
}


var arrow_keys_handler = function(e) {
		switch(e.keyCode){
			case 32:
			case 37: 
			case 39: 
			case 38:  
			case 40: 
			e.preventDefault();
			break; 
			default: break; // do not block other keys
		}
	};
window.addEventListener("keydown", arrow_keys_handler, false); 

/************************ MOVING RIGHT WITH FOOD BEHIND - ABOVE OR BELOW ***********************************************/	    
function movingRightUD(){     
	if(a<x && b<y){
	    clearInterval(timer);		
	    timer = setInterval(up, timestep);
	}else if(a<x && b>y){
	    clearInterval(timer);		
	    timer = setInterval(down, timestep);
    }
}
/************************ MOVING LEFT WITH FOOD BEHIND - ABOVE OR BELOW ***********************************************/		
	
function movingLeftUD(){ 	
	if(a>x && b>y){
	    clearInterval(timer);		
	    timer = setInterval(down, timestep);
	}else if(a>x && b<y){
	    clearInterval(timer);		
	    timer = setInterval(up, timestep);
	}
}

	
/********************* MOVING UP WITH FOOD BELOW - TO THE LEFT OR RIGHT ******************************************/	  
function movingUpLR() {  
    if(a<=x && b>=y){   //Where the food is below
	    clearInterval(timer);		
	    timer = setInterval(left, timestep);
	}else if(a>=x && b>=y){ //Where the food is above
		clearInterval(timer);		
	    timer = setInterval(right, timestep);
	}
}
/********************* MOVING DOWN WITH FOOD ABOVE - TO THE LEFT OR RIGHT ******************************************/	
	
function movingDownLR(){
	if(a<x && b<y){  
	    clearInterval(timer);		
	    timer = setInterval(left, timestep);
	}else if(a>x && b<y){
	    clearInterval(timer);		
		timer = setInterval(right, timestep);
	}
}

/**********************************************************************************************************************/

function directionL(){
	if(a<x && b==y) {
        clearInterval(timer);		
	    timer = setInterval(left, timestep);
	}
}	


function directionD(){
     if(a==x && b>y) {    // Moves down towards the food if it has the same x coordinate as the snakes head and a y coordinate below it
        clearInterval(timer);		
	    timer = setInterval(down, timestep);
	}
}

	
function directionR(){
	if(a>x && b==y) {
        clearInterval(timer);		
	    timer = setInterval(right, timestep);
	}
}

	
function directionU() {
    if(a==x && b<y) {
		clearInterval(timer);		
	    timer = setInterval(up, timestep);
	}
}

/**********************************************************************************************************************/			

/************ The "behind" functions handle the scenerio where the food lands directly behind the snake ***************/	
function behindR(){ // if the snake is moving right when the food lands behind it
	if(a<x && b==y){
        if(b==0){ //for when the food lands on the top wall
	        clearInterval(timer);		 
	        timer = setInterval(down, timestep);
		}else if(b==39*gridUnit){ //for when the food lands on the bottom wall
		    clearInterval(timer);		
	        timer = setInterval(up, timestep);
		}else{ //for when the food lands away from any wall
		    clearInterval(timer);		
	        timer = setInterval(up, timestep);
		}
	}	
}

function behindL(){ // if the snake is moving left when the food lands behind it
	if(a>x && b==y){ 
	    if(b==0){ // //for when the food lands on the top wall
	        clearInterval(timer);		
	        timer = setInterval(down, timestep);
		}else if(b==39*gridUnit){ //for when the food lands on the bottom wall
			clearInterval(timer);		
	        timer = setInterval(up, timestep);
		}else{ //for when the food lands away from any wall
		    clearInterval(timer);		
	        timer = setInterval(up, timestep);
		}
	}
}	


function behindU(){ // if the snake is moving up when the food lands behind it
	if(a==x && b>y){
	    if(a==0){ //for when the food lands on the left wall
	        clearInterval(timer);		
	        timer = setInterval(right, timestep);
		}else if(a==39*gridUnit){ //for when the food lands on the right wall
			clearInterval(timer);		
	        timer = setInterval(left, timestep);
   		}else{ //for when the food lands away from any wall
			clearInterval(timer);		
	        timer = setInterval(right, timestep);
		}
	}	
}
	
function behindD(){ // if the snake is moving down when the food lands behind it
	if(a==x && b<y){
        if(a==0){ //for when the food lands on the left wall
	        clearInterval(timer);		
	        timer = setInterval(right, timestep);
		}else if(a==39*gridUnit){ //for when the food lands on the right wall
		    clearInterval(timer);		
	        timer = setInterval(left, timestep);
		}else{ //for when the food lands away from any wall
			clearInterval(timer);		
	        timer = setInterval(right, timestep);
		}
	}        
}	
	
 /**********************************************************************************************************************/
 
 
function gameStep() {
	if(x < 39*gridUnit){
	    snakeBody.push([drawBlock(x+gridUnit,y,120),x+gridUnit,y]); 
	    itemToRemove = snakeBody.shift()
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
		x += gridUnit;
		step = true;
    }else{
        gameOver();
	}
	//The functions below must be constantly run in order to keep everything working correctlty
	remakeFood();
	directionD();
	directionU();
	behindR();
	movingRightUD();
}
 
 
function down() {
	if(y < 39*gridUnit){
        itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x,y+gridUnit,120),x,y+gridUnit]);
	    leftm = false;
        rightm = false;
        downm = true;
        upm = false;           
		step = false;
		directionR();
		directionL();
		y += gridUnit;
	}else{
 	    gameOver();
	}
    selfBite();	
    remakeFood();
    directionL();
    directionR();
	behindD();
	movingDownLR();
	collAvoidanceDown();
}


function up() {
    if(y > 0){
	    itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x,y-gridUnit,120),x,y-gridUnit]);
		leftm = false;
        rightm = false;
        downm = false;
        upm = true;           
		step = false;
		y += -gridUnit; 
	}else{
        gameOver();
	}
	selfBite();
	remakeFood();
	directionL();
	directionR();
	behindU();
	movingUpLR();
	collAvoidanceUp();
}


function left() {
	if(x > 0){
        itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x-gridUnit,y,120),x-gridUnit,y]);
	    leftm = true;
        rightm = false;
        downm = false;
        upm = false;           
		step = false;
	    x += -gridUnit;
	}else{
	    gameOver();
	}
	selfBite();
	remakeFood();
	directionU();
	directionD();
	behindL();
	movingLeftUD();
	collAvoidanceLeft();
}	
	
 

function right() {
    if(x < 39*gridUnit) {
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x+gridUnit,y,120),x+gridUnit,y]);
		leftm = false;
        rightm = true;
        downm = false;
        upm = false;           
		step = false;
	    x += gridUnit; 
	}else{
		gameOver();
	} 
    selfBite();
	remakeFood();
	directionU();
	directionD();
	behindR();
	movingRightUD();
	collAvoidanceRight();
} 


/************************************************ The functions below are used to so that the snake can detect collisions with itself **********************************/

function collAvoidanceUp(){  // For a scenario where the snake is moving up
    for (var i=0; i < (snakeBody.length-1); i++){
        if(snakeBody[i][1] == x && (snakeBody[i][2] == y-gridUnit)){ //snakes head is 1 gridunit from biting itself
            if(snakeBody[0][1] <= x){ // if the tail is to the left of the head, the snake should escape to the left(it always avoids collision by heading 	towards the tail)
                clearInterval(timer);		
	            timer = setInterval(uLeft, timestep);
			}else if(snakeBody[0][1] > x){ //if the tail is to the right of the head, the snake should escape to the right
                clearInterval(timer);		
	            timer = setInterval(uRight, timestep); //calls a function that moves the snake to the right
			}
        }
    }
}



function collAvoidanceDown(){ 
    for (var i=0; i < (snakeBody.length-1); i++){
        if(snakeBody[i][1] == x && (snakeBody[i][2] == y+gridUnit)){
            if(snakeBody[0][1] <= x){
                clearInterval(timer);		
	            timer = setInterval(dLeft, timestep);
			}else if(snakeBody[0][1] > x){
                clearInterval(timer);		
	            timer = setInterval(dRight, timestep);
			}
        }
    }
}


function collAvoidanceLeft(){ 
    for (var i=0; i < (snakeBody.length-1); i++){
        if(snakeBody[i][2] == y && (snakeBody[i][1] == x-gridUnit)){ //snakes head is 1 gridunit from biting itself 
            if(snakeBody[0][2] >= y){ // if the tail is below the head
                clearInterval(timer);		
	            timer = setInterval(lDown, timestep);
		    }else if(snakeBody[0][2] < y){ // if the tail is above the head
                clearInterval(timer);		
	            timer = setInterval(lUp, timestep);
			}
        }
    }
}

function collAvoidanceRight(){ 
    for (var i=0; i < (snakeBody.length-1); i++){
        if(snakeBody[i][2] == y && (snakeBody[i][1] == x+gridUnit)){ //snakes head is 1 gridunit from biting itself 
            if(snakeBody[0][2] >= y){ // if the tail is below the head
                clearInterval(timer);		
	            timer = setInterval(rDown, timestep);
			}else if(snakeBody[0][2] < y){ // if the tail is above the head
                clearInterval(timer);		
	            timer = setInterval(rUp, timestep);
			}
        }
    }
}
/**********************************************************************************************************************************************************************/



/**************************** The functions below are used for collision avoidance once the functions above detect a collision ******************************************/

// Biting right and escaping downwards
function rDown(){
    if(y < 39*gridUnit){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x,y+gridUnit,120),x,y+gridUnit]);
	    y += gridUnit;
	    collAvoidanceDown();
	    remakeFood();
	}else if(y == 39*gridUnit){ // checks the y coordinate of the head against 
		clearInterval(timer);		
	    timer = setInterval(right, timestep);
	}else{
 	    gameOver();
	}
	selfBite();
}


function rUp(){
	if(y > 0){
        itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x,y-gridUnit,120),x,y-gridUnit]);
        y += -gridUnit; 
	    collAvoidanceUp();
	    remakeFood();
	}else if(y == 0){
		clearInterval(timer);		
	    timer = setInterval(right, timestep);
	}else{
        gameOver();
	}
	selfBite();	
}


function lDown() {
    if(y < 39*gridUnit){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x,y+gridUnit,120),x,y+gridUnit]);
	    y += gridUnit;
	    collAvoidanceDown();
	    remakeFood();
	}else if(y == 39*gridUnit){
		clearInterval(timer);		
	    timer = setInterval(left, timestep);
	}else{
		gameOver();
	}
	selfBite();
}


function lUp() {
	if(y > 0){
        itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x,y-gridUnit,120),x,y-gridUnit]);
        y += -gridUnit; 
	    collAvoidanceUp();
	    remakeFood();
	}else if(y == 0){
		clearInterval(timer);		
	    timer = setInterval(left, timestep);
	}else{
        gameOver();
	}
	selfBite();	
}


//Biting downwards and escaping to the left
function dLeft() {
	if(x > 0){
       	itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x-gridUnit,y,120),x-gridUnit,y]);
	    x += -gridUnit;
	    collAvoidanceLeft();
	    remakeFood();
	}else if(x == 0){
		clearInterval(timer);		
		timer = setInterval(down, timestep);
	}else{
	  	gameOver();
	}
	selfBite();
}

	
// Biting downwards and escaping to the right
function dRight(){
    if(x < 39*gridUnit){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x+gridUnit,y,120),x+gridUnit,y]);
	  	x += gridUnit; 
	    collAvoidanceRight();
	    remakeFood();
	}else if(x == 39*gridUnit){
	    clearInterval(timer);		
	    timer = setInterval(down, timestep);
	}else{
	   gameOver();
	} 
	selfBite();
} 

//Biting upwards and escaping to the left
function uLeft() {
	if(x > 0){
        itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x-gridUnit,y,120),x-gridUnit,y]);
		x += -gridUnit;
		collAvoidanceLeft();
	    remakeFood();
	}else if(x == 0){ 
		clearInterval(timer);		
	    timer = setInterval(up, timestep);
	}else{
	   	gameOver();
	}
	selfBite();
}
	
// Biting upwards and escaping to the right
function uRight(){
	if(x < 39*gridUnit){
        itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawBlock(x+gridUnit,y,120),x+gridUnit,y]);
	    x += gridUnit; 
		collAvoidanceRight();
	    remakeFood();
	}else if(x == 39*gridUnit){
	    clearInterval(timer);		
	    timer = setInterval(up, timestep);
	}else{
	    gameOver();
	} 
	selfBite();
} 

/*********************************************************************************************************************************************************************/
function selfBite(){ 
	for (var i=0; i < (snakeBody.length-1); i++){
		if(snakeBody[i][1] == x && snakeBody[i][2] == y){
			gameOverSound.play();
	        clearInterval(timer);
			start = false;
	        ctx.clearRect(0,0,400,400); 
            ctx.font="20px Arial";
	        ctx.fillStyle = "white";
			ctx.fillText("Game Over! You bit yourself!",e,170);
	        ctx.fillText("Click on New Game to restart",e,230);
	        timestep = 100000000;
        }
    }
}


function food(){
   var colours = [0,30,60,180];	
var p = colours[(Math.floor((Math.random()*4)))];
    a = gridUnit*Math.floor((Math.random()*40)); 
    b = gridUnit*Math.floor((Math.random()*40));

    for (var i=0; i < (snakeBody.length); i++){
        if(snakeBody[i][1]== a && snakeBody[i][2]== b){
            food();
			remakeFood();
		} 
    }
    drawBlock(a,b,p);
}


function remakeFood(){
    if(x==a && y==b){
		eatingSound.play();
	    growSnake();
	    food();
		score++;
		document.getElementById("score").innerHTML = "Level " + level + "   Score: " + score;
		if(score == level*10) {
            //Update the timer with a shorter timestep
            timestep *=0.9;
            level++; 
			document.getElementById("score").innerHTML = "Level " + level + "   Score: " + score;
        }
    }
}


function growSnake(){
    snakeBody.splice(0,0,(drawBlock(x,y,120),x,y));
}


function keyDown(e){
	if(e.keyCode == 32){ // space-bar
		pause();
	}
}


function pause(){
	if(start){
		console.log(start);	
		counter = counter + 1;
		switcher();
	}
}

function switcher(){
    if(counter % 2 == 0){
		document.getElementById("one").innerHTML = "&nbsp;Play";
		clearInterval(timer);
	}else{
		document.getElementById("one").innerHTML = "&nbsp;Pause";
		if(leftm){
			clearInterval(timer);
			if(b>y && a==x){ // to prevent the overshoot when play button is pressed 
				timer = setInterval(down, timestep);
			}else if(b<y && a==x){
				timer = setInterval(up, timestep);
			}else{
				timer = setInterval(left, timestep);
			} 
			directionU();
			directionD();
			behindL();
			movingLeftUD();
			collAvoidanceLeft();
		}else if(rightm){
			clearInterval(timer);	
			if(b>y && a==x){ // to prevent the overshoot when play button is pressed 
				timer = setInterval(down, timestep);
			}else if(b<y && a==x){
				timer = setInterval(up, timestep);
			}else{
				timer = setInterval(right, timestep);
			} 
			directionU();
			directionD();
			behindR();
			movingRightUD();
			collAvoidanceRight();
		}else if(downm){
			clearInterval(timer);
			if(b==y && a>x){ // to prevent the overshoot when play button is pressed 
				timer = setInterval(right, timestep);
			}else if(b==y && a<x){
				timer = setInterval(left, timestep);
			}else{
				timer = setInterval(down, timestep);
			} 	
			directionL();
			directionR();
			behindD();
			movingDownLR();
			collAvoidanceDown();
		}else if(upm){
			clearInterval(timer);
			if(b==y && a>x){ // to prevent the overshoot when play button is pressed 
				timer = setInterval(right, timestep);
			}else if(b==y && a<x){
				timer = setInterval(left, timestep);
			}else{
				timer = setInterval(up, timestep);
			}  
			directionL();
			directionR();
			behindU();
			movingUpLR();
			collAvoidanceUp();
		}else if(step){
			clearInterval(timer);
			if(b>y && a==x){ // to prevent the overshoot when play button is pressed 
				timer = setInterval(down, timestep);
			}else if(b<y && a==x){
				timer = setInterval(up, timestep);
			}else{
				timer = setInterval(right, timestep);
			}
		}
	}
}


function gameOver(){
    gameOverSound.play();
	clearInterval(timer);
	start = false;
	timestep = 10000000000;
    ctx.clearRect(0,0,500,500); 
    ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Game Over! You hit the wall!",e,170);
    ctx.fillText("Click on New Game to restart",e,230);
}