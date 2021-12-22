<?php
$_POST = json_decode( file_get_contents("php://input"), true ); //исключительно для отправки json
echo var_dump($_POST);