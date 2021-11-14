<?php

header('Acces-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Acces-Control-Allow-Methods:DELETE');
header('Acces-Control-Allow-Headers:Acces-Control-Allow-Headers,Content-Type,Acces-Control-Allow-Methods,Authorization,X-Requested-With');


include_once("../../config/db.php");
include_once("../../model/question.php");


$db = new db();
$connect = $db->connect();

$question = new Question($connect);


$data = json_decode(file_get_contents("php://input"));
$question->id_cauhoi = $data->id_cauhoi;



if($question->delete()){

    echo json_encode(array('message','Câu hỏi được xóa thành công'));
    
}
else {
    echo json_encode(array('message','Câu hỏi chưa được xóa'));
}
?>