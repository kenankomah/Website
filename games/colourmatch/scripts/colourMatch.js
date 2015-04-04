//'use strict';
//Global variables
var ctx,ctx1;    //Canvas object
var x, y, u, v, t;
var o = 0;
var o1 ;
var e,f;
var t1 = null;
var x1 = null;
var y1 = null;
var u2 = null;
var y2 = null;
var v3 = null;
var y3 = null;
var timer;  //Game timer
var timer1;
var timer2;
var timer3;
var score;  //Player's score
var level;  //Current level
var timestep;   //Time between calls to gameStep()
var blinkstep;  //Time between calls to gameStep()
var column = [];
var grid = [];
var pattern = [];
var pattern2 = [];
var flicker = [];
var b;
var n = 0;
var timeout;
var timeout1
var counter = 1;
var stop = false;
var play = true; //This variable is used to control the pause and play feature
var score = 0;
var level = 1;
var p; // used to determine how frequently the special black column appears
var q; // used to determine which colour blocks should disappear when the special black column lands
var conveyor = []; //array used to hold the columns drawn on the preview window
var gridUnitX,gridUnitY

/*** Sound files ****/
var endGame = new Audio("audio/EndGame.mp3");
var match = new Audio("audio/Score.mp3");
var rotation = new Audio("audio/Rotation.mp3");
var landing = new Audio("audio/landing.mp3")

/*** Volume settings for the sound****/
endGame.volume = 0.1;
match.volume = 0.5;  
rotation.volume = 0.5;
landing.volume = 1;

/************************************************
Initialize the drawing canvas
************************************************/

function init(){
    var c = document.getElementById("myCanvas");
	var d = document.getElementById("myCanvasB"); 
    ctx = c.getContext("2d");
	ctx1 = d.getContext("2d"); 
	e = c.width / 2;
    f = c.height / 2;
    ctx.clearRect(0,0,160,360);
	ctx1.clearRect(0,0,120,120);
	ctx.font = "17px Arial";   
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
    ctx.fillText("Click on New Game",e,190);
	ctx.fillText("to start!",e,220);
	stop = true;//This variable is used to freeze the arrow keys when the canvas has text on it.
	play = false; 
}

function initialize() {
    //Get the canvas context object from the body
    var c = document.getElementById("myCanvas");
    var d = document.getElementById("myCanvasB");  
	ctx = c.getContext("2d");
    ctx1 = d.getContext("2d"); 
	e = c.width / 2;
    f = c.height / 2;
	ctx.clearRect(0,0,160,360);
	/*** This used to select the column that will appear on the preview window when the game starts**/
	conveyor = [[Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)],[Math.ceil(Math.random()*6),Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)]];
	/** starting coordinates of the column **/
	x = 4;  
	y = -2;
  	t = conveyor[0][0]; 
	u = conveyor[0][1];
	v = conveyor[0][2];
    conveyor.push([Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)]); // adds new random column to the conveyor array 
 	previewColumn(1,1.5,conveyor[1][0]);
	previewColumn(1,2.5,conveyor[1][1]);
	previewColumn(1,3.5,conveyor[1][2]);
	conveyor.shift();	// removes the first element from the array
	timestep = 500;
	blinkstep = timestep*0.05;
    clearInterval(timer); /**  setInterval is always used as a parameter of clearInterval  **/
	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
    timer = setInterval(gameStep, timestep); 
	/** the setInterval codes below are used to control the flashing light effect when a pattern is achieved**/
	timer1 = setInterval(blink, blinkstep); 
	timer2 = setInterval(drawFlicker, blinkstep); 
	timer3 = setInterval(checkFlicker, blinkstep); 
			
	grid = new Array(8);
	for(var i = 0; i <= 8; i++){
		grid[i] = new Array(18);
	    for(var j = 0; j < 18; j++){
			grid[i][j] = 0;    // every point on the grid is set to 0, this means that nothing will be drawn to begin with
		}	
	}	
		
	pattern = new Array(8);
	for(i = 0; i < 8; i++){
		pattern[i] =  new Array(18);
	    for(j = 0; j < 18; j++){
			pattern[i][j] = false;    // every point is set to false as there are no patterns to begin with
		}	
	}
	
	
	pattern2 = new Array(8);         //pattern2 is used to store the coordinates of positions on the grid which form [art of a pattern
	    for(i = 0; i < 8; i++){ 
			pattern2[i] =  new Array(18);//new Array(10);
			for(j = 0; j < 18; j++){
				pattern2[i][j] = false;  
			}	
		}			
	
	
	flicker = new Array(8);
	    for(i = 0; i < 8; i++) {
			flicker[i] =  new Array(18);//new Array(10);
		    for(j = 0; j < 18; j++){
				flicker[i][j] = 0;    
			}	
		}
		
	drawGrid();
	drawFlicker();
	level = 1;
	score = 0;
	document.getElementById("score").innerHTML = "Level " + 1 + "   Score: " + 0;
	stop = false;
	play = true;
}

/************************************************
Draws the current game state grid
************************************************/
function drawGrid() {
   //Loop over each grid cell
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 18; j++){
            drawBlock(i, j, grid[i][j]);
		}	 
	}
	
	for(i = 0; i < 8; i++){	
		grid[i][18] = 7;
	}
}	


function drawFlicker() {
   //Loop over each grid cell
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 18; j++){
            drawBlock(i, j, flicker[i][j]);  // loops over entire grid, the coordinates that have a 'b' value will flash
		}	 
	}
}	


function blink() { //used to make the blocks flash when they form part of a pattern
	n = (n + 1)% 2 // the value of n will alternate between 0 and 1
	if(n==0){
		b = 7;  //white   //the two value of the variable 'b' are used to colour the column white or grey
	}else{
		b = 8;  //grey
	}
}	


function previewColumn(x,y,t){
//Check if a block needs to be drawn
    if(t > 0) {
		//Get the block color
        var c;
        if(t == 1)                                                 
            c = 'red';
        else if(t == 2) 
            c = 'orange';
        else if(t == 3) 
            c = 'yellow';
        else if(t == 4)
            c = '#00FF00'; //Green
         else if(t == 5) 
            c = 'blue'; 
         else if(t == 6) 
            c = 'cyan';//'#B800E6'; //purple
		 else if(t == 7)	
		    c = 'white';
	     else if(t == 8)
            c = 'grey';
		 else 
            c = 'black';		 
			           
		gridUnitX = 20*x;
		gridUnitY = 20*y;
	    ctx1.beginPath();
        ctx1.rect(gridUnitX, gridUnitY,20,20); 
        ctx1.fillStyle = c;
        ctx1.fill();
        ctx1.lineWidth = 1;
		ctx1.strokeStyle = 'grey';
		ctx1.stroke();
    }
}
	
/************************************************
Draws a block at the specified game coordinate
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [0,7]   block type
************************************************/
function drawBlock(x,y,t) {
    //Check if a block needs to be drawn
    if(t > 0) {
        //Get the block color
        var c;
        if(t == 1){                                                 
            c = 'red';
        }else if(t == 2){ 
            c = 'orange';
        }else if(t == 3){ 
            c = 'yellow';
		}else if(t == 4){
            c = '#00FF00'; //Green
        }else if(t == 5){ 
            c = 'blue'; 
        }else if(t == 6){ 
            c = 'cyan';
		}else if(t == 7){	
		    c = 'white';
	    }else if(t == 8){
            c = 'grey';
		}else{ 
            c = 'black';
		}	
		gridUnitX = 20*x;
		gridUnitY = 20*y;
	    ctx.beginPath();
        ctx.rect(gridUnitX, gridUnitY,20,20); 
        ctx.fillStyle = c;
        ctx.fill();
        ctx.lineWidth = 1;
		ctx.strokeStyle = 'grey';
		ctx.stroke();
    }
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
 
   
/*************************************************
Responds to a key press event
*************************************************/
function keyDown(e) {
    if(!stop){
		if(e.keyCode == 37) { //Left arrow
	    	if(x>=1){ //Collision detection that prevents the column from moving of the canvas
				if(!grid[x-1][y+2]){ //collision detection that checks if a cell on the left is occupied or not
				x = x - 1; 
			}  
		}
    }else if(e.keyCode == 39) { //Right arrow
	 	if(x<=6){
	  		if(!grid[x+1][y+2]){ //collision detection that checks if a cell on the right is occupied or not
				x = x + 1; 
			}
		}	   
    }else if(e.keyCode == 40) { //Down arrow
		if(!grid[x][y+2]){	
           y = y + 1;
		}else{
	 		checkBoundary();
		}
    }else if(e.keyCode == 38) { //Up arrow
		rotation.currentTime = 0; 
		rotation.play();  
		o = (o + 1) % 3  //changes the orientation of the columns
    }
	ctx.clearRect(0,0,160,360); 
   	if(o===0){  // chooses which type of column to draw depending on orientation
		column =[drawBlock(x,y,t),drawBlock(x,y+1,u),drawBlock(x,y+2,v)];
	}else if(o===1){ 
		column =[drawBlock(x,y,v),drawBlock(x,y+1,t),drawBlock(x,y+2,u)];
   	} else{  
   		column =[drawBlock(x,y,u),drawBlock(x,y+1,v),drawBlock(x,y+2,t)];
   	}
	checkBoundary();
	drawGrid();
	} 

	if(e.keyCode == 32) { //Space-bar
    	if(play){  //pauses and plays game
			counter = counter + 1;
			switcher();
		}
	}
}
 
 
/*************************************************
Updates the game state at regular intervals
*************************************************/
function gameStep() {
	ctx.clearRect(0,0,160,360);   
  	if(o===0){  
		column =[drawBlock(x,y,t),drawBlock(x,y+1,u),drawBlock(x,y+2,v)];
	}else if(o===1){ 
		column =[drawBlock(x,y,v),drawBlock(x,y+1,t),drawBlock(x,y+2,u)];
   	}else{  
   		column =[drawBlock(x,y,u),drawBlock(x,y+1,v),drawBlock(x,y+2,t)];
   	}
	
	if(!grid[x][y+2]){ //checks if the space below is occupied
		y = y + 1;
	}else{ 
		checkBoundary();
	}   
	checkGrid();
	checkFlicker();
	drawGrid();

	for(var i=0;  i<18; i++){ 
		for(var j=0; j<8; j++){
			flicker[j][i] = 0;
		}	
	}	  
}
 

 
function checkBoundary() {
	if(grid[x][y+2]){ //checks if the grid below is occupied
		if(t==9){	//i.e if the current column is black
			q = grid[x][y+2];
	    }else{
			q = -1;
		}
  // stores the position and colour values into new variables which will be used in the gameState function
    y1 = y;
    x1 = x;   
    t1 = t;
    y2 = y;
    u2 = u;
	y3 = y;
    v3 = v;
	o1 = o;
  
	gameState();
	newColumn();
	drawFlicker();
	}
} 

 
function newColumn() {
 	landing.currentTime = 0; 
	landing.play();  // plays a sound when a column lands
	o = 0;
	p = Math.ceil(Math.random()*40); // determines the frequency of special black column
	x = 4;
	y = -2;  
	t = conveyor[0][0];  //selects the values stored in the 2d array 'conveyor'
	u = conveyor[0][1];
	v = conveyor[0][2];
	if(p>1){ //if the special column is not selected a new random column is put into the array
		conveyor.push([Math.ceil(Math.random()*6),Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)]);
	}else{ //if the special column is selected it is put into the array
		conveyor.push([9,9,9]); 	
	}
	previewColumn(1,1.5,conveyor[1][0]);
	previewColumn(1,2.5,conveyor[1][1]);
	previewColumn(1,3.5,conveyor[1][2]);
	conveyor.shift();  // removes the first element of the array
}


function gameState(){
	if(o1==0){
		if(grid[x1]){ // used to prevent an error message Chrome: "Uncaught TypeError: Cannot set property '-1' of undefined"
			grid[x1][y1-1] = t1; 
			grid[x1][y2] = u2;
			grid[x1][y3+1] = v3;
		}
	}else if(o1==1){
		if(grid[x1]){ 
			grid[x1][y1-1] = v3;
			grid[x1][y2] = t1;
			grid[x1][y3+1] = u2;
		}
	}else{
		if(grid[x1]){
			grid[x1][y1-1] = u2;
			grid[x1][y2] = v3;
			grid[x1][y3+1] = t1;
		}
	}
	if(y1-1<0){
		gameOver();
	}
}

/************************************************************ Horizontal pattern recognition functions *****************************************************************************/

function checkGrid(){ // This function is used for pattern recognition
	for(var i=0; i<18; i++){  // Horizontal patterns
		for(var j=0; j<8; j++){
			if(grid[j][i]){  // this ensures that only grid locations that have been designated a number will be checked for patterns
				if(grid[j][i] == grid[j+1][i] && grid[j+1][i] == grid[j+2][i] && grid[j+2][i] == grid[j+3][i] && grid[j+3][i] == grid[j+4][i]){
					//checks if there are five of the same colour next to one another
					pattern[j][i] = true;
					pattern[j+1][i] = true;
					pattern[j+2][i] = true;
					pattern[j+3][i] = true;
					pattern[j+4][i] = true; // Setting pattern = true records the location of blocks that form a pattern and stores them
											// in the array called patterns 
				}else if(grid[j][i] == grid[j+1][i] && grid[j+1][i] == grid[j+2][i] && grid[j+2][i] == grid[j+3][i]){
					//checks if there are four of the same colour next to one another
					pattern[j][i] = true;
					pattern[j+1][i] = true;
					pattern[j+2][i] = true;
					pattern[j+3][i] = true;
				}else if(grid[j][i] == grid[j+1][i] && grid[j+1][i]== grid[j+2][i] ){
                    //checks if there are four of the same colour next to one another
					pattern[j][i] = true;
					pattern[j+1][i] = true;
					pattern[j+2][i] = true;
				}
			}
		}			
	}
	for(j=0; j<8; j++){
		for(i=18; i>0; i--){   // Vertical patterns
			if(grid[j][i]){
				if(grid[j][i] === grid[j][i-1] && grid[j][i-1] === grid[j][i-2] && grid[j][i-2] === grid[j][i-3] && grid[j][i-3] === grid[j][i-4]){
					pattern[j][i] = true;
					pattern[j][i-1] = true;
					pattern[j][i-2] = true;
					pattern[j][i-3] = true;
					pattern[j][i-4] = true;
				}else if(grid[j][i] === grid[j][i-1] && grid[j][i-1] === grid[j][i-2] && grid[j][i-2] === grid[j][i-3]){
					pattern[j][i] = true;
					pattern[j][i-1] = true;
					pattern[j][i-2] = true;
					pattern[j][i-3] = true;
				}else if(grid[j][i] === grid[j][i-1] && grid[j][i-1] === grid[j][i-2]){
					pattern[j][i] = true;
					pattern[j][i-1] = true;
					pattern[j][i-2] = true;
			    }
			}
		}			
	}





	for(i=0; i<18; i++){ // Backward diagonal patterns
		for(j=0; j<8; j++){
			if(grid[j][i]){
				if(grid[j][i] == grid[j+1][i+1] && grid[j+1][i+1] == grid[j+2][i+2] && grid[j+2][i+2] == grid[j+3][i+3] && grid[j+3][i+3] == grid[j+4][i+4]){
					pattern[j][i] = true;
					pattern[j+1][i+1] = true;
					pattern[j+2][i+2] = true;
					pattern[j+3][i+3] = true;
					pattern[j+4][i+4] = true;
				}else if(grid[j][i] == grid[j+1][i+1] && grid[j+1][i+1] == grid[j+2][i+2] && grid[j+2][i+2] == grid[j+3][i+3]){
					pattern[j][i] = true;
					pattern[j+1][i+1] = true;
					pattern[j+2][i+2] = true;
					pattern[j+3][i+3] = true;
				}else if(grid[j][i] == grid[j+1][i+1] && grid[j+1][i+1] == grid[j+2][i+2]){
					pattern[j][i] = true;
					pattern[j+1][i+1] = true;
					pattern[j+2][i+2] = true;
				}
			}			
        }			
	}
	for(j=0; j<8; j++){  // Forward diagonal patterns
		for(i=0; i<18; i++){
		   if(grid[j][i]){
				if(grid[j][i] == grid[j+1][i-1] && grid[j+1][i-1] == grid[j+2][i-2] && grid[j+2][i-2] == grid[j+3][i-3] && grid[j+3][i-3] == grid[j+4][i-4]){
					pattern[j][i] = true;
					pattern[j+1][i-1] = true;
					pattern[j+2][i-2] = true;
					pattern[j+3][i-3] = true;
					pattern[j+4][i-4] = true;
				}else if(grid[j][i] == grid[j+1][i-1] && grid[j+1][i-1] == grid[j+2][i-2] && grid[j+2][i-2] == grid[j+3][i-3]){
					pattern[j][i] = true;
					pattern[j+1][i-1] = true;
					pattern[j+2][i-2] = true;
					pattern[j+3][i-3] = true;
				}else if(grid[j][i] == grid[j+1][i-1] && grid[j+1][i-1] == grid[j+2][i-2]){
					pattern[j][i] = true;
					pattern[j+1][i-1] = true;
					pattern[j+2][i-2] = true;
				}	
			}			
        }			
	}
	for(i=0;  i<18; i++){ 
		for(j=0; j<8; j++){
			if(grid[j][i]==q){
			   pattern[j][i] = true;
			} 
		}
	}
	scoreSound();
	timeout =  setTimeout(deleteBlocks,5000); //creates a delay between pattern being recognised and it being deleted, to allow for the flashing effect
}


function scoreSound(){
	for(var i=0;  i<18; i++){ 
		for(var j=0; j<8; j++){
			if(pattern[j][i]){ 
				match.currentTime = 0; 
				match.play();  // plays the score sound
	        }				   
        }   
    } 
}

function deleteBlocks(){
	for(var i=0;  i<18; i++){ 
		for(var j=0; j<8; j++){
			if(pattern[j][i]){ // if the location i,j has pattern = true the deletion code below will execute
				score ++; // increments the score
				for(var m = i; m > -1; m--){ //loops through the grid vertically starting from the position of the pattern upwards 
					grid[j][m] = grid[j][m-1];// copies the grid location above and its colour over the position where the pattern is
						document.getElementById("score").innerHTML = "Level " + level + " Score: " + score; // updates score
						if(score >= level*80){
							level ++;
						    if(timestep>85){ //the speed of the game is capped at time intervals of 75 milliseconds
								timestep *= 0.85;
							}
							clearInterval(timer);
							timer = setInterval(gameStep, timestep);
						}
						if(o===0){  
						    column =[drawBlock(x,y,t),drawBlock(x,y+1,u),drawBlock(x,y+2,v)];
						}else if(o===1){ 
						    column =[drawBlock(x,y,v),drawBlock(x,y+1,t),drawBlock(x,y+2,u)];
						}else{  
						   	column =[drawBlock(x,y,u),drawBlock(x,y+1,v),drawBlock(x,y+2,t)];
						}
					}
				}  
			}
		}       		
		for(i=0;  i<18; i++){ 
			for(j=0; j<8; j++){
			pattern[j][i] = false;
		}	
	}		  
}



function checkFlicker(){ // this function uses the same code as 'checkGrid' to find patterns which will be used to determine where the flashes should occur
	for(var i=0; i<18; i++){  
		for(var j=0; j<8; j++){
			if(grid[j][i]){
				if(grid[j][i] == grid[j+1][i] && grid[j+1][i] == grid[j+2][i] && grid[j+2][i] == grid[j+3][i] && grid[j+3][i] == grid[j+4][i]){
					pattern2[j][i] = true;
					pattern2[j+1][i] = true;
					pattern2[j+2][i] = true;
					pattern2[j+3][i] = true;
					pattern2[j+4][i] = true;
				}else if(grid[j][i] == grid[j+1][i] && grid[j+1][i] == grid[j+2][i] && grid[j+2][i] == grid[j+3][i]){
					pattern2[j][i] = true;
					pattern2[j+1][i] = true;
					pattern2[j+2][i] = true;
					pattern2[j+3][i] = true;
				}else if(grid[j][i] == grid[j+1][i] && grid[j+1][i]== grid[j+2][i] ){
					pattern2[j][i] = true;
					pattern2[j+1][i] = true;
					pattern2[j+2][i] = true;
				}
			}
		}			
	}
	for(j=0; j<8; j++){
		for(i=18; i>0; i--){   // Vertical patterns
			if(grid[j][i]){
				if(grid[j][i] === grid[j][i-1] && grid[j][i-1] === grid[j][i-2] && grid[j][i-2] === grid[j][i-3] && grid[j][i-3] === grid[j][i-4]){
					pattern2[j][i] = true;
					pattern2[j][i-1] = true;
					pattern2[j][i-2] = true;
					pattern2[j][i-3] = true;
					pattern2[j][i-4] = true;
				}else if(grid[j][i] === grid[j][i-1] && grid[j][i-1] === grid[j][i-2] && grid[j][i-2] === grid[j][i-3]){
					pattern2[j][i] = true;
					pattern2[j][i-1] = true;
					pattern2[j][i-2] = true;
					pattern2[j][i-3] = true;
				}else if(grid[j][i] === grid[j][i-1] && grid[j][i-1] === grid[j][i-2]){
					pattern2[j][i] = true;
					pattern2[j][i-1] = true;
					pattern2[j][i-2] = true;
				}
			}
		}			
	}
	for(i=0; i<18; i++){ // Backward diagonal patterns
		for(j=0; j<8; j++){
			if(grid[j][i]){
				if(grid[j][i] == grid[j+1][i+1] && grid[j+1][i+1] == grid[j+2][i+2] && grid[j+2][i+2] == grid[j+3][i+3] && grid[j+3][i+3] == grid[j+4][i+4]){
					pattern2[j][i] = true;
					pattern2[j+1][i+1] = true;
					pattern2[j+2][i+2] = true;
					pattern2[j+3][i+3] = true;
					pattern2[j+4][i+4] = true;
				}else if(grid[j][i] == grid[j+1][i+1] && grid[j+1][i+1] == grid[j+2][i+2] && grid[j+2][i+2] == grid[j+3][i+3]){
					pattern2[j][i] = true;
					pattern2[j+1][i+1] = true;
					pattern2[j+2][i+2] = true;
					pattern2[j+3][i+3] = true;
				}else if(grid[j][i] == grid[j+1][i+1] && grid[j+1][i+1] == grid[j+2][i+2]){
					pattern2[j][i] = true;
					pattern2[j+1][i+1] = true;
					pattern2[j+2][i+2] = true;
				}
			}			
        }			
	}
	for(j=0; j<8; j++){  // Forward diagonal patterns
		for(i=0; i<18; i++){
		   if(grid[j][i]){
				if(grid[j][i] == grid[j+1][i-1] && grid[j+1][i-1] == grid[j+2][i-2] && grid[j+2][i-2] == grid[j+3][i-3] && grid[j+3][i-3] == grid[j+4][i-4]){
					pattern2[j][i] = true;
					pattern2[j+1][i-1] = true;
					pattern2[j+2][i-2] = true;
					pattern2[j+3][i-3] = true;
					pattern2[j+4][i-4] = true;
				}else if(grid[j][i] == grid[j+1][i-1] && grid[j+1][i-1] == grid[j+2][i-2] && grid[j+2][i-2] == grid[j+3][i-3]){
					pattern2[j][i] = true;
					pattern2[j+1][i-1] = true;
					pattern2[j+2][i-2] = true;
					pattern2[j+3][i-3] = true;
				}else if(grid[j][i] == grid[j+1][i-1] && grid[j+1][i-1] == grid[j+2][i-2]){
					pattern2[j][i] = true;
					pattern2[j+1][i-1] = true;
					pattern2[j+2][i-2] = true;
				}	
			}			
        }			
	}
	for(i=0;  i<18; i++){ 
		for(j=0; j<8; j++){
			if(grid[j][i]==q){
				pattern2[j][i] = true;
			}
		}
	}
	flickerBlocks();
}


function flickerBlocks(){
	for(var i=0;  i<18; i++){ 
		for(var j=0; j<8; j++){
			if(pattern2[j][i]){ 
			    flicker[j][i] = b; 
			}
		}  
	}
	for(i=0;  i<18; i++){ 
		for(j=0; j<8; j++){
			pattern2[j][i] = false;
		}	
	}
}


function pause(){
	if(play){
		counter = counter + 1; 
		switcher();
	}
}


function switcher(){
    if(counter % 2 == 0){ // counter % 2  will switch between 0 and 1 every time the pause play button is pressed
		document.getElementById("one").innerHTML = "&nbsp;Play"; // changes text to play when button is pressed
		stop = true;
		clearInterval(timer);
	}else{
		stop = false;
		document.getElementById("one").innerHTML = "&nbsp;Pause"; // changes text to play when button is pressed
		clearInterval(timer);
		timer = setInterval(gameStep, timestep);
	}
}	


function gameOver(){
	endGame.play(); // plays the game over sound
	clearInterval(timer);
	timer = setInterval(EndGame, timestep);
	stop = true; // prevents the blocks from moving after the game has ended if the arrow keys are pressed 
}	
	
	
function EndGame() {
    var c = document.getElementById("myCanvas");
	var e = c.width / 2;
	ctx.clearRect(0,0,160,360);
	ctx1.clearRect(0,0,120,120);
	ctx.font = "17px Arial"; 
    ctx.textAlign = "center";
	ctx.fillStyle = "black";
	ctx.fillText("Game Over!",e,140);
    ctx.fillText("Click on New Game ",e,190);
	ctx.fillText("to restart",e,240);
	clearInterval(timer);
	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
	play = false;
}