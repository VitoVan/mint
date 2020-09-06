<?php
require_once "../path.php";
require_once "../public/_pdo.php";
require_once '../public/function.php';

global $PDO;
PDO_Connect("sqlite:"._FILE_DB_COURSE_);

$query="UPDATE course SET  title = ? , subtitle = ? ,  summary = ? , teacher = ?  , tag = ?  , lang = ?  , attachment = ? , receive_time = ?  , modify_time = ?   where  id = ?  ";
$sth = $PDO->prepare($query);

$sth->execute(array( $_POST["title"] , $_POST["subtitle"] ,  $_POST["summary"] ,   $_POST["teacher"]  ,  $_POST["tag"] ,  $_POST["lang"] , $_POST["attachment"] , mTime() , mTime() , $_POST["course"]));
$respond=array("status"=>0,"message"=>"");
if (!$sth || ($sth && $sth->errorCode() != 0)) {
	$error = PDO_ErrorInfo();
	$respond['status']=1;
	$respond['message']=$error[2];
	echo "<div style=''>Course 数据修改失败：{$error[2]}</div>";
}
else{
	$respond['status']=0;
	$respond['message']="成功";
	echo "<div style=''>Course 数据修改成功</div>";
}
//echo json_encode($respond, JSON_UNESCAPED_UNICODE);
?>