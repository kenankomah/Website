//'use strict';
var ctx;    //Canvas object
var x, y;   //Snake head position
var timer;  //Game timer
var score;  //Player's score
var level;  //Current level
var timestep;   //Time between calls to gameStep(), left(), right(), down(), up()
var snakeBody = []; // This is the array that holds the snakes body, each element represents a segment
var gridUnit = 10; //this defines the size of the smallest unit of the game grid and of movement and the size of the food and snake segements
var itemToRemove; // this is used in conjunction with the array method shift, its used to delete the last segment of the snake as it moves
var c;  // used to determine the colour of the food and snake
var counter = 1;
var stop = false;
var step;
var leftm;
var rightm;
var upm;
var downm;
var start; // this variable will be used to prevent the play/pause from button working when the game is not being played
var e;
var a;
var b;
var eatingSound = new Audio('audio/beep-7.wav');    // These two lines refer to the audio files
var gameOverSound = new Audio('audio/beep-10.wav');
eatingSound = new Audio('audio/beep-7.mp3');  // These two lines are a copy of the two above but the wav files have been replaced with mp3 files.
gameOverSound  = new Audio('audio/beep-10.mp3'); // this is necessary as some browsers are only compatible with mp3 or only wav audio files.

eatingSound.volume = 0.15; //sets the sound volume
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
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
	ctx.clearRect(0,0,400,400);  
	x =  gridUnit*6;
	y =  gridUnit*24;
	score = 0;    
    level = 1;
    timestep = 90; //Determines the speed of the snake
    start = true;  // This means that the play/pause button should function
	stop = false;
    //Start the game timer
    clearInterval(timer); /**  setInterval is always used as a parameter of clearInterval  **/
    timer = setInterval(gameStep, timestep); 
	snakeBody =[[drawGridCell(x-gridUnit,y,120),x-gridUnit,y],[drawGridCell(x,y,120),x,y]]; // Draws the snake at the beginning of each game
	food();
	document.getElementById("score").innerHTML = "Level " + 1 + "   Score: " + 0; // Resets the score and level after the game ends
}


/************************************************
Draws a cell at the specified game coordinate
x = [0,50]   x-coordinate
y = [0,50]   y-coordinate
c = [0,360]  cell colour
************************************************/

function drawGridCell(x,y,c) {         
    /**** Draw the center part of the cell ****/
	//Set the fill color using the supplied color
    ctx.fillStyle = "hsl(" + c + ",100%,50%)";
	//Create a filled rectangle
    ctx.fillRect(x+1,y+1,8,8);
	
	/**** Draw the top part of the cell ****/
	//Set the fill color slightly lighter
    ctx.fillStyle = "hsl(" + c + ",100%,70%)";
    //Create the top polygon and fill it
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+10,y);
    ctx.lineTo(x+9,y+1);
    ctx.lineTo(x+1,y+1);
    ctx.fill();
              
    /**** Draw the sides of the cell ****/
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
           
    /**** Draw the bottom part of the cell ****/
       
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

function keyDown(e){
	if(!stop){   
		if(e.keyCode == 37) { //Left arrow
			// The line below refers to the head of the snake and the segment directly behind it, it prevents movements parallel 
			if(snakeBody[snakeBody.length-1][1] == snakeBody[snakeBody.length-2][1] ){ //This if statement is used to prevent the snake from reversing
				clearInterval(timer); // clearInterval is required to stop any other setInterval function from continuing to run and interrupting new commands
            	leftm = true;
				rightm = false;
				downm = false;
				upm = false;           
				step = false;
				timer = setInterval(left, timestep);// creates a new setInterval function to run the function left
			}
		}else if(e.keyCode == 38) { //Up arrow
			if(snakeBody[snakeBody.length-1][2] == snakeBody[snakeBody.length-2][2]){
				clearInterval(timer);
         		leftm = false;
				rightm = false;
				downm = false;
				upm = true; 
				step = false;   			
				timer = setInterval(up, timestep);
			}
		}else if(e.keyCode == 39) { //Right arrow
			if(snakeBody[snakeBody.length-1][1] == snakeBody[snakeBody.length-2][1]){
				clearInterval(timer);	
         		leftm = false;
				rightm = true;
				downm = false;
				upm = false;    
				step = false;
				timer = setInterval(right, timestep);
			}
		}else if(e.keyCode == 40) { //Down arrow
			if((snakeBody[snakeBody.length-1][2] == snakeBody[snakeBody.length-2][2])){
				clearInterval(timer);	
				leftm = false;
				rightm = false;
				downm = true;
				upm = false; 
				step = false;			
				timer = setInterval(down, timestep);
			}
		}
	}
	if(e.keyCode == 32){ // space-bar
		pause();
	}
}
 
 
function gameStep(){
    // The snake moves by storing all its segments in an array and selectively deleting and clearing the last element in the array 
	if(x < 39*gridUnit){ //checks if the head of the sanke is within the canvas
	    snakeBody.push([drawGridCell(x+gridUnit,y,120),x+gridUnit,y]); // Adds a new element to the end of the array snakeBody
	    itemToRemove = snakeBody.shift() // Removes the last element in the array and stores it in the variable itemToRemove
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit); // Clears the last element by getting its location from itemToRemove[1] and itemToRemove[2]
        x += gridUnit; // moves the snake by one gridunit each time the function gameStep is run
		step = true;
    }else{
        gameOver(); // Calls the game over function if the head of the snake is outside the range of the canvas
	}
		remakeFood(); // Checks if the food has been eaten and needs to be redrawn
}
 
 
function down(){    // moves the snake in a downward direction
    if(y < 39*gridUnit){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawGridCell(x,y+gridUnit,120),x,y+gridUnit]);
	    y += gridUnit;
	}else{
 	    gameOver();
	}
	    selfBite();	 // Checks if the snake has collided with itself
	    remakeFood();
}		


function up() { // moves the snake in an upward direction
    if(y > 0){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawGridCell(x,y-gridUnit,120),x,y-gridUnit]);
        y += -gridUnit; 
	}else{
    	gameOver();
	}
	    selfBite();
	    remakeFood();
}


function left(){ // moves the snake towards the left direction
    if(x > 0){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawGridCell(x-gridUnit,y,120),x-gridUnit,y]);
	     x += -gridUnit;
 	}else {
	    gameOver();
	}
	    selfBite();
		remakeFood();
}	
	
 
function right(){ // moves the snake towards the right direction
    if(x < 39*gridUnit){
		itemToRemove = snakeBody.shift();
	    ctx.clearRect(itemToRemove[1], itemToRemove[2], gridUnit, gridUnit);
        snakeBody.push([drawGridCell(x+gridUnit,y,120),x+gridUnit,y]);
	    x += gridUnit; 
	}else{
 	    gameOver();
	} 
	    selfBite();
	    remakeFood();
} 


function selfBite(){ 
    for (var i=0; i < (snakeBody.length-1); i++){ // loops through all the snakes segments and checks if its in the same location as the head
        if(snakeBody[i][1] == x && snakeBody[i][2] == y){
			gameOverSound.play(); //plays the game over sound
	        clearInterval(timer);
			stop = true;
			start = false;
			leftm = false;
			rightm = true;
			downm = false;
			upm = false;    
			step = false;
	        ctx.clearRect(0,0,400,400); //Clears the canvas before test is written on it
            ctx.font="20px Arial";
	        ctx.fillStyle = "white";
            ctx.fillText("Game Over! You bit yourself!",e,170);
	        ctx.fillText("Click on New Game to restart",e,230);
	        timestep = 100000000; //This line is used to fix a bug in the game
        }
    }
}


function food(){
	var colours = [0,30,60,180];	
	var	p = colours[(Math.floor((Math.random()*4)))];
	a = gridUnit*Math.floor((Math.random()*40)); //these are the random coordinates for the food
    b = gridUnit*Math.floor((Math.random()*40));

    for (var i=0; i < (snakeBody.length); i++){ //loops through the snakes segments
        if(snakeBody[i][1]== a && snakeBody[i][2]== b){ //Checks the location of the food against the snakes body segments
            food(); // Calls the food function again if the food over laps the snake
        }   
    }   //draws the food
        drawGridCell(a,b,p); //this function will draw the food if it does not overlap the snake
}


function remakeFood(){
    if(x==a && y==b){ // compares the location of the food to that of the snakes head
        eatingSound.play(); //if the snakes head overlaps(eats) the food then the sound file will be played 
	    growSnake(); //this function will add another segment to the snake to grow it
	    food(); //the food is redrawn
		//Updates score
		score++;
		document.getElementById("score").innerHTML = "Level " + level + "   Score: " + score;
		if(score == level*10){
            //Update the timer with a shorter timestep
            timestep *= 0.9;
            level++; //increases level
			document.getElementById("score").innerHTML = "Level " + level + "   Score: " + score; //updates score and level immediately
        }
    }
}


function growSnake(){
    // adds a new segment to the snake
    snakeBody.splice(0,0,(drawGridCell(x,y,120),x,y));
}


function pause(){
	if(start){
		counter = counter + 1;
		switcher();
	}
}

function switcher(){
    if(counter % 2 == 0){
		document.getElementById("one").innerHTML = "&nbsp;Play";
		stop = true;
		clearInterval(timer);
	}else{
		stop = false;
		document.getElementById("one").innerHTML = "&nbsp;Pause";
		if(leftm){
			clearInterval(timer);
			timer = setInterval(left, timestep);
		}else if(rightm){
			clearInterval(timer);	
			timer = setInterval(right, timestep);
		}else if(downm){
			clearInterval(timer);
			timer = setInterval(down, timestep);
		}else if(upm){
			clearInterval(timer);
			timer = setInterval(up, timestep);
		}else if(step){
			clearInterval(timer);
			timer = setInterval(gameStep, timestep);
		}
	}
}

function gameOver(){
    gameOverSound.play();
	clearInterval(timer);
	start = false;
	stop = true;
	leftm = false;
	rightm = true;
	downm = false;
	upm = false;    
	step = false;
	timestep = 10000000000; // this line is used to fix a bug
    ctx.clearRect(0,0,500,500); 
    ctx.font = "20px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = "white";
	ctx.fillText("Game Over! You hit the wall!",e,170);
    ctx.fillText("Click on New Game to restart",e,230);
}