
$(document).ready(function(){
  $(".resize").mouseenter(function(){
    $(this).css("font-size",'15px')
	 $(this).css("color",'#04B4AE');
 })
  
   $(".resize").mouseleave(function(){
    $(this).css("font-size",'13.5px')
	$(this).css("color",'#4c4c4c');
  });
  
});