<?php
 $username = "";
 $userid = "";
 $nickname = "";
 $email = "";
 
 $USER_ID = "";
 $UID = "";
 $USER_NAME = "";
 $NICK_NAME = "";
if(isset($_COOKIE["username"]) && !empty($_COOKIE["username"])){
//已经登陆
 $USER_ID = $_COOKIE["user_id"];
 $UID = $_COOKIE["user_uid"];
 $USER_NAME = $_COOKIE["username"];
 $NICK_NAME = $_COOKIE["nickname"];
 
 $username = $_COOKIE["username"];
 $userid = $_COOKIE["user_id"];
 $nickname = $_COOKIE["nickname"];
 if(isset($_COOKIE["email"])){$email = $_COOKIE["email"];}
}
else{
	//尚未登陆
?>
<html>
	<head>
		<title>wikipali login</title>
		<meta http-equiv="refresh" content="0,../ucenter/index.php"/>
	</head>
	
	<body>
		<br>
		<br>
		<p align="center"><a href="../ucenter/index.php">您尚未登陆。正在自动转向登陆页面。也可以单击此处登陆。</a></p>
    </body>
</html>
<?php
exit;
}
?>