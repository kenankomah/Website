var n = 0;
var m = 0;

var open = true;
var open1 = true;

$(document).ready(function(){
    $("#flip").click(function(){
		if(!open){
			$("#panel").slideDown("fast");
			open = true;
			if(open1){
				$("#panel1").slideUp("fast");
				open1 = false;
				info();
			}
		}else if(open){
			$("#panel").slideUp("fast");
			open = false;	
		}
	});
	
	
	$("#flip1").click(function(){
		if(!open1){
			$("#panel1").slideDown("fast");
			open1 = true;
			if(open){
				$("#panel").slideUp("fast");
				open = false;
				rules();
			}
		}else if(open1){
			$("#panel1").slideUp("fast");
			open1 = false;	
		}
	});
});



function rules(){
	n += 1;
	if(n%2 == 0){
		document.getElementById('flip').innerHTML = 'Show Rules';
	}else{
		document.getElementById('flip').innerHTML = 'Hide Rules'; 
	}
}


function info(){
    m += 1;
	if(m%2 == 0){
		document.getElementById('flip1').innerHTML = 'More Details';
	}else{
		document.getElementById('flip1').innerHTML = 'Hide Details'; 
	}
}
