<?php

header('Acces-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Acces-Control-Allow-Methods:POST');
header('Acces-Control-Allow-Headers:Acces-Control-Allow-Headers,Content-Type,Acces-Control-Allow-Methods,Authorization,X-Requested-With');


include_once("../../config/db.php");
include_once("../../model/question.php");


$db = new db();
$connect = $db->connect();

$question = new Question($connect);


$data = json_decode(file_get_contents("php://input"));
$question->title = $data->title;
$question->cau_a = $data->cau_a;
$question->cau_b = $data->cau_b;
$question->cau_c = $data->cau_c;
$question->cau_d = $data->cau_d;
$question->cau_dung = $data->cau_dung;


if($question->create()){

    echo json_encode(array('message','Câu hỏi được tạo'));
    
}
else {
    echo json_encode(array('message','Câu hỏi không được tạo'));
}
?>