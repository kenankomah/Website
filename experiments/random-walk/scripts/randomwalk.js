var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

	  var x,y,c,a,d,b;
	  var timer;
	  var n = 0;
	  var count = 1;
	  var play = true;
	  var halt = false;
		   
	timestep = 1;
     y = 250;
	 x = 400;
     
   timer = setInterval(gameStep, timestep);

      walk = [-1,1];
	
function gameStep(){

      a = Math.floor((Math.random()*2));
	  b = walk[Math.floor((Math.random()*2))];
	  
	 if(a == 1){
	   c = 5*b;
	   d = 0;
	 } else {
	   c = 0; 
       d = 5*b;	 
	 }
	 
	  context.beginPath();
   	  context.moveTo(x,y);
      context.lineTo(x + c, y + d);
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
	
	counter();
	stop();
	   
	}  
	 
	function counter() {
   		n = n + 1;
    }
    
    function stop(){
	document.getElementById('steps').innerHTML = n;
 	   	if(n>9999){
			clearInterval(timer);
		}
	}	
	
	
	
	
function pause(){
	if(n<10000){
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
	