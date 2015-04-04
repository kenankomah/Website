var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
	  var count = 1;
	  var play = true;
	  var halt = false;

	  var x,y,c,a,d,b;
	  var x1,y1,c1,a1,d1,b1;
	  var x2,y2,c2,a2,d2,b2;
	  var n = 0;
	  var n1 = 0;
	  var n2 = 0;
	  
	  var timer;
	  var timer1;
	  var timer2;
	
	timestep = 1;
	
     y = 250;
	 x = 400;
	 
	 y1 = 250;
	 x1 = 400;
	 
	 y2 = 250;
	 x2 = 400;
    //Start the game timer
    clearInterval(timer);
    timer = setInterval(gameStep, timestep);
  	
      walk = [-1,1];
	  
	  walk1 = [-1,1];
	  
      walk2 = [-1,1];
	  
	  
function gameStep(){

      a = Math.floor((Math.random()*2));
	  b = walk[Math.floor((Math.random()*2))];
	  
	 if(a == 1){
	   c = 2*b;
	   d = 0;
	 } else {
	   c = 0; 
       d = 2*b;	 
	 }
	 
	
	 
	  context.beginPath();
   
	  context.moveTo(x,y);
      context.lineTo(x + c, y + d);
     
	  context.strokeStyle = 'black';
	  context.stroke();
	  
	  if(x>canvas.width){  // right border
	  
	  x = x + c - canvas.width;; 
	  y = y + d;
	  
	  }else if(x < 0){ // left border
	  
	  x = x + c + canvas.width;;
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
		


      a1 = Math.floor((Math.random()*2));
	  b1 = walk1[Math.floor((Math.random()*2))];
	  
	 if(a == 1){
	   c1 = 2*b1;
	   d1 = 0;
	 } else {
	   c1 = 0; 
       d1 = 2*b1;	 
	 }
	 
	
	 
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
	
	

      a2 = Math.floor((Math.random()*2));
	  b2 = walk2[Math.floor((Math.random()*2))];
	  
	 if(a2 == 1){
	   c2 = 2*b2;
	   d2 = 0;
	 } else {
	   c2 = 0; 
       d2= 2*b2;	 
	 }
	 
	
	 
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
	//  y = y + d - 2400;
	 y2 = y2 + d2 - canvas.height; 
	  }else{
	   
	   x2 = x2 + c2;
	   y2 = y2 + d2;
	  
	  }
	
	counter();
	stop();
}  
	
	
 function counter() {
     n = n + 1;
}
    
	
function stop(){
document.getElementById('steps').innerHTML = n;
 	console.log(n);
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
   
 