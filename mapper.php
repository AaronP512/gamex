<?php

$conn = mysqli_connect("localhost", "root", "", "map") or die(mysql_error());
//mysqli_select_db("map") or die(mysql_error());

if(isset($_POST['a']) && $_POST['a'] == '2') {
    $array = array();
    $r = mysqli_query($conn, "SELECT * FROM map")  or die(mysql_error());
    //if(mysql_num_rows() > 0) {
        while($row = mysqli_fetch_assoc($r)) {
            $array[] = $row;
        }
   // }
    echo json_encode($array);
    die;
}

$a = $_POST['a'];
$x = $_POST['x'];
$y = $_POST['y'];
$i = $_POST['i'];


switch($a) {
    case 1:
        mysqli_query($conn,"INSERT INTO map VALUES ($x, $y, '$i')")  or die(mysql_error());
        break;
    case 0:
        mysqli_query($conn,"DELETE FROM map WHERE x = $x AND y = $y AND i = '$i';")  or die(mysql_error());
        break;
}







?>