var n = 0;

$(document).ready(function(){
	$("#flip").click(function(){
		$("#panel").slideToggle("fast");
		toggle = true;
	});
	
});


function rules(){
	document.getElementById('paragraph').innerHTML = '';
    n += 1;
	if(n%2 == 0){
		document.getElementById('flip').innerHTML = 'More Info';
	}else{
		document.getElementById('flip').innerHTML = 'Hide Info'; 
	}
}
