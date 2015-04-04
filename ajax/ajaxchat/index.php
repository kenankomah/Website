
<?php session_start(); ?>
<!DOCTYPE html>
<html>

<head>
	<title> Ajax Chat</title>
	
	<style type='text/css'>
	#chatbox{
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FFFFFF), color-stop(100%,#b5b5b5)); /* Chrome,Safari4+ */
		background: -webkit-linear-gradient(top, #FFFFFF 0%,#b5b5b5 100%); /* Chrome10+,Safari5.1+ */
		background: -moz-linear-gradient(top, #FFFFFF 0%, #b5b5b5 100%);
		background: -o-linear-gradient(top, #FFFFFF 0%, #b5b5b5 100%); /* Opera 11.10+ */
		background: -ms-linear-gradient(top, #FFFFFF  0%, #b5b5b5 100%); /* IE10+ */
		background: linear-gradient(top, #FFFFFF 0%, #b5b5b5 100%); /* W3C */
		border: 1px solid #999999;
		width:700px;
		height:370px;
		margin:auto;
		border-radius:20px;
		border-radius:0px 0px 20px 20px;
		margin-top:120px;
	}
	
	#chatbox #initial{
		text-align:center;
		width:250px;
		margin:auto;
		padding-top:100px;
		position:relative;
		top:20px;
	}
	
	#chatbox #primary{
		display:none;
	}
	
	#chatbox #message{
		position:relative;
		top:15px;
		clear:both;
	}
	
	#chatbox #primary #window{
		width: 100%;
		height: 265px;
		background-color:#fff;
		overflow:scroll;
	}
	
	#chatbox #primary #window .list1{
		background-color: #eee; 
		padding: 5px;
	}
	
	#chatbox #primary #window .list2{
		background-color: #ddd;
		padding: 5px;
	}
	
	#chatbox #primary #form{
		width:inherit;
	}
	
	#chat_user, #chat_text{
		border-radius:10px;
	}
	
	#chatbox .emot_div{
		background-color:#b5b5b5;
		width:30px;
		height:30px;
		float:left;
		margin-right:2px;
		position:relative;
		top:5px;
		left:5px;
	}
	
	#chatbox .emot_div:hover{
		background-color:#e5e5e5;
		border:0.5px solid #0033CC;
	}
	
	.emoticon{
		width:32px;
		position:relative;
		top:-1px;
	}
	
	.emot_message{
		width:20px;
		vertical-align:top;
	}
	
	#chat_user{
		margin-top:25px;
		margin-bottom:25px;
	}
	
	
	</style>
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
	<script>
	
		var receive_message = new Audio('message_received.mp3'); receive_message.volume = 1;
		var updateTime = 5000; 
	
		function chat_initial(){
			var user = document.getElementById('chat_user').value;
			
			$.post('./chat.php',{stage:'initial', user:user}, function(data){
				if(data == 'good'){
					chat_load();
					$('#chatbox #initial').css('display', 'none');
					$('#chatbox #primary').css('display', 'inline');
				}else{
					alert("That username is taken. Please try another");
				}
			});
		}
		
		function chat_load(){
			$.post('./chat.php', {stage:'load'}, function(data){
				$('#chatbox #primary #window').html(data);
				setTimeout('chat_load()', updateTime);
			});
		}
		
		function chat_send(){
			receive_message.play();
			var message = document.getElementById('chat_text');
			
			var text = message.value;
			
			$.post('./chat.php',{stage:'send', text:text}, function(data){
			
				document.getElementById('chat_text').value='';
				
				if(data == 'good')
					chat_load();
				else
					alert('No username was found. Please reload the chat window.');
			});
		}

		function smiley(){
			smileyFace = document.getElementById('chat_text');
			smileyFace.value +=' :-) ';
		}
		
		function sad(){
			sadFace = document.getElementById('chat_text');
			sadFace.value +=' :-( ';
		}
		
		function wink(){
			winkFace = document.getElementById('chat_text');
			winkFace.value +=' ;-) ';
		}
		
		function laugh(){
			laughFace = document.getElementById('chat_text');
			laughFace.value +=' :-D ';
		}
		
		function surprise(){
			laughFace = document.getElementById('chat_text');
			laughFace.value +=' :-O ';
		}
		
			//Emoticons from:  http://findicons.com/
	</script>
</head>
<body style="background: url(bgnoise_lg.png) repeat left top;">
	<div id = 'chatbox'>
		<div id='initial'>
			<table>
				<tr align='center'>
					<td>Enter a username to start chatting</td>
				</tr>
				<tr align='center'>
					<td><input type='text' name = 'user' id='chat_user' style='width: 250px;'
					onkeypress='if(event.keyCode == 13){chat_initial();}' /></td>
				</tr>
				<tr align='center'>
					<td><input type='button' value ='Continue' onclick='chat_initial();'/></td> 
					</tr>
			</table>
		</div>
		<div id='primary'>
			<div id='window'></div>
			<div id ='form'>
				<div class='emot_div' onclick='smiley()'><img class='emoticon' src='emoticons/smiley.png'></img></div>
				<div class='emot_div' onclick='sad()'><img class='emoticon' src='emoticons/sad.png'></img></div>
				<div class='emot_div' onclick='wink()'><img class='emoticon' src='emoticons/wink.png'></img></div>
				<div class='emot_div' onclick='laugh()'><img class='emoticon' src='emoticons/laugh.png'></img></div>
				<div class='emot_div' onclick='surprise()'><img class='emoticon' src='emoticons/surprise.png'></img></div>
				<table id='message' style='width:100%'>
					<tr>
						<td width='90%'><input type='text' name='chat_text' id='chat_text' style='width:100%;'
							onkeypress='if(event.keyCode == 13){chat_send();}'/></td>
						<td align='center'><input type='button' id='chat_send' value='send' onclick='chat_send();' /></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>