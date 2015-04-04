var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
	  var count = 1;
	  var play = true;
	  var halt = false;

	  var x,y,c,a,d,b;
	  var x1,y1,c1,a1,d1,b1;
	  var x2,y2,c2,a2,d2,b2;
	  var x3,y3,c3,a3,d3,b3;
	  var n = 0;
	  	  
	  var timer;
	  var step = 2;
	  var pi = Math.PI;
	  var phi,phi1,phi2,phi3; 
	
	timestep = 1;
		
     y = 250;  //black
	 x = 400;
	 
	 y1 = 250; //blue
	 x1 = 400;
	 
	 y2 = 250; //red
	 x2 = 400;
	 
	 y3 = 250; //green
	 x3 = 400;
	 
    //Start the game timer
    clearInterval(timer);
    timer = setInterval(gameStep, timestep);
  
	  
function gameStep(){
/************************************************** this is for the black walkers *********************************************************/
	    phi = Math.random()*2*pi;
	 
		c = step*Math.cos(phi);
		d = step*Math.sin(phi);
	 
	
	 	context.beginPath();
   
		context.moveTo(x,y);
		context.lineTo(x + c, y + d);
		context.strokeStyle = 'black';
		context.stroke();
	 
	  if(x>canvas.width){  // right border
	  
	  x = x + c - canvas.width; 
	  y = y + d;
	  
	  }else if(x < 0){ // left border
	  
	  x = x + c + canvas.width;
      y = y + d;
	   
	  }else if(y < 0){ // upper border
	  
	  x = x + c;
	  y = y + d + canvas.height;
	
	  }else if(y > canvas.height){ //lower border
	   
	  x = x + c;
	  y = y + d - canvas.height;
	  
	  }else{
	   
	   x = x + c;
	   y = y + d;
	  
	  }
/************************************************** this is for the blue walkers *********************************************************/

		phi1 = Math.random()*2*pi;
	 
		c1 = step*Math.cos(phi1);
		d1 = step*Math.sin(phi1);
	 
	
	 
	  context.beginPath();
   
	  context.moveTo(x1,y1);
      context.lineTo(x1 + c1, y1 + d1);
      context.strokeStyle = 'blue';
	  context.stroke();
	  
	  if(x1>canvas.width){  // right border
	  
	  x1 = x1 + c1 - canvas.width; 
	  y1 = y1 + d1;
	  
	  }else if(x1 < 0){ // left border
	  
	  x1 = x1 + c1 + canvas.width;
      y1 = y1 + d1;
	   
	  }else if(y1 < 0){ // upper border
	  
	  x1 = x1 + c1;
	  y1 = y1 + d1 + canvas.height;
	
	  }else if(y1 > canvas.height){ //lower border
	   
	  x1 = x1 + c1;
	  y1 = y1 + d1 - canvas.height;
	  
	  }else{
	   
	   x1 = x1 + c1;
	   y1 = y1 + d1;
	  
	  }
	
/************************************************** this is for the red walkers *********************************************************/	

		phi2 = Math.random()*2*pi;
	 
		c2 = step*Math.cos(phi2);
		d2 = step*Math.sin(phi2);
	
	 
	  context.beginPath();
   
	  context.moveTo(x2,y2);
      context.lineTo(x2 + c2, y2 + d2);
      context.strokeStyle = 'red';
	  context.stroke();
	  
	  if(x2>canvas.width){  // right border
	  
	  x2 = x2 + c2 - canvas.width; 
	  y2 = y2 + d2;
	  
	  }else if(x2 < 0){ // left border
	  
	  x2 = x2 + c2 + canvas.width;
      y2 = y2 + d2;
	   
	  }else if(y2 < 0){ // upper border
	  
	 // x2 = x1 + c2;
	  x2 = x2 + c2;
	  y2 = y2 + d2 + canvas.height;
	
	  }else if(y2 > canvas.height){ //lower border
	   
	  x2 = x2 + c2;
	//  y = y + d - canvas.height;
	 y2 = y2 + d2 - canvas.height; 
	  }else{
	   
	   x2 = x2 + c2;
	   y2 = y2 + d2;
	  
	  }
	  
/************************************************** this is for the green walkers *********************************************************/	  
		phi3 = Math.random()*2*pi;
	 
		c3 = step*Math.cos(phi3);
		d3 = step*Math.sin(phi3);
	
	 
	  context.beginPath();
   
	  context.moveTo(x3,y3);
      context.lineTo(x3 + c3, y3 + d3);
      context.strokeStyle = 'green';
	  context.stroke();
	 
	  if(x3>canvas.width){  // right border
	  
	  x3 = x3 + c3 - canvas.width; 
	  y3 = y3 + d3;
	  
	  }else if(x3 < 0){ // left border
	  
	  x3 = x3 + c3 + canvas.width;
      y3 = y3 + d3;
	   
	  }else if(y3 < 0){ // upper border
	  
	 // x2 = x1 + c2;
	  x3 = x3 + c3;
	  y3 = y3 + d3 + canvas.height;
	
	  }else if(y3 > canvas.height){ //lower border
	   
	  x3 = x3 + c3;
	//  y = y + d - canvas.height;
	 y3 = y3 + d3 - canvas.height; 
	  }else{
	   
	   x3 = x3 + c3;
	   y3 = y3 + d3;
	  
	  }
	
	counter();
	stop();
}  
		
 function counter() {
      n = n + 1;
 }
    
function stop(){
document.getElementById('steps').innerHTML = n;
 	if(n+1>25000){
		clearInterval(timer);
	}
}


	
		
function pause(){
	if(n<25000){
		if(play){
			count = count + 1; 
			switcher();
		}
	}	
}


function switcher(){
     if(count % 2 == 0){ // counter % 2  will switch between 0 and 1 every time the pause play button is pressed
		document.getElementById("one").innerHTML = "&nbsp;Play"; // changes text to play when button is pressed
		halt = true;
		clearInterval(timer);
	}else{
		halt = false;
		document.getElementById("one").innerHTML = "&nbsp;Pause"; // changes text to play when button is pressed
		clearInterval(timer);
		timer = setInterval(gameStep, timestep);
	}
}	

	
function reset(){
	location.reload();
}	



function keyDown(e){
	if(e.keyCode == 32){ // runs the code below if it detects that the space button has been pressed
		pause(); // pauses the game
	}	
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
 