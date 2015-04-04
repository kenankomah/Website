<!DOCTYPE html>

<html>
<head>
<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"> </script> 
<script src="hover.js" type="text/javascript"> </script> 
<link href="sections.css" type="text/css" rel="stylesheet">
	<title>My Web Projects</title>
    <meta charset ="utf-8">
	<meta name="author" content ="Kenneth Ankomah">
</head>

<body style="background: url(images/bgnoise_lg.png) repeat left top;">

<div id="header" height="230" width="930">
	<img src="images/header.jpg"  height="230" width="935">
	<h1 id='home'><i>My Web Projects</i></h1>
</div>

<div id="container">

<ul id="navmenu">  
   <li><a href="index.html" id="round">Home</a></li>
   <li><a href="">JavaScript</a><span class ="darrow"><!--&#9660; --></span>
		<ul class="sub1"> 
			<li><a href="">HTML5 Games</a>
				<ul class="sub2"> 
					<li><a href="games\shooter\shter.html" target="_blank">Shooter</a></li>
					<li><a href="games\shooter\shter-ai.html" target="_blank">Shooter AI</a></li>
					<li><a href="games\colourmatch\cm.html" target="_blank">Color Match</a></li>
					<li><a href="games\snake\snake.html" target="_blank">Snake</a></li>
					<li><a href="games\snake\snake-ai.html" target="_blank">Snake AI</a></li>
				</ul>
			</li>
			<li><a href="">Experiments</a>
				<ul class="sub2"> 
					<li><a href="experiments\random-walk\rw.html" target="_blank">Random Walk</a></li>
					<li><a href="experiments\flock\t.html" target="_blank">Flock Simulation</a></li>
				</ul>
			</li>
		</ul>
   </li>
   <li><a href="">CSS3</a>
		<ul class="sub1"> 
			<li><a href="css3\earth-sun-system\esms.html" target="_blank">Earth Sun System</a></li>
			<li><a href="css3\language-tool\german.html" target="_blank"><span class="fontsize">language Tool</span></a></li>
		</ul>	
   </li>
   <li><a href="">PHP & SQL</a><span class ="darrow"><!--&#9660; --></span>
		<ul class="sub1"> 
			<li><a href="ajax\ajaxchat\index.php" target="_blank">AJAX Chat</a></li>
		</ul>
	</li>
	<li><a href="about.php">about</a></li>
	<li><a href="contact.php" id="round1">Contact</a></li>
 </ul>
 </div>

</body> 
</html>