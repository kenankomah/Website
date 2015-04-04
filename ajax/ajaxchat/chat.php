<?php

	session_start();

	//connect to the database
	mysql_connect("localhost", "root", "");
	#mysql_connect("localhost", "cl27-kenank", "j-z!Cr2hq"/*,"cl27-kenank"*/);
	mysql_select_db("Chat");

// read the stage	
	$stage = $_POST['stage'];
	
// primary code
	if($stage == "initial"){
		//check the username
		$user = $_POST['user'];
		
		$query = mysql_query("SELECT * FROM chat_active WHERE user='$user'");
		if(mysql_num_rows($query) == 0){
			
			$time = time();
		
			mysql_query("INSERT INTO chat_active VALUES ('$user', '$time')");
			//set the session
			$_SESSION['user'] = $user;
						
			echo 'good';
		}
		else
			echo'taken';
	}
	else if($stage == "send"){
		//get the text
		$text = $_POST['text'];
		
		//check for a user
		if(isset($_SESSION['user'])){
			$user = $_SESSION['user'];
			$time = time();
			
			mysql_query("INSERT INTO chat_chats VALUES ('$user', '$time', '$text')");
			
			echo 'good';
		}
		else
			echo 'no user'; 
			
	}
	else if($stage == 'load'){
	    $num = 1;
		$query = mysql_query("SELECT * FROM chat_chats ORDER BY time DESC"); # $query is the number of times an item is found
		if(mysql_num_rows($query)>0){
			while($row = mysql_fetch_assoc($query)){
			
				$user = $row['user'];
				$time = $row['time'];
				$content = $row['content'];
				
				$emoticonQuery = mysql_query("SELECT * FROM `emoticons`");
				while($row = mysql_fetch_assoc($emoticonQuery))	
				{  
					$chars = $row['chars'];
					$imageTag = "<img width='20' height='20' src='emoticons/".$row['image']."' />";
					$content = str_replace($chars,$imageTag,$content);
				}
				
				//$content = htmlentities($content);
				
				echo '<div class="list'.$num.'">';
					echo '<b>'.$user.'</b>. at <i>'.date("M d, Y", $time).'</ i> - '.$content;
				echo '</div >';
				
				# $num will alternate between 1 and 2
				if($num == 1){
					$num = 2;
				}else{
					$num = 1;
				}
			} 
			
		}
		else
			echo 'No chats found. Be the first!!!';
	}
	else
		echo 'error';

?>