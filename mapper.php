<?php

mysql_connect("localhost", "root", "") or die(mysql_error());
mysql_select_db("map") or die(mysql_error());

if(isset($_POST['a']) && $_POST['a'] == '2') {
    $array = array();
    $r = mysql_query("SELECT * FROM map")  or die(mysql_error());
    //if(mysql_num_rows() > 0) {
        while($row = mysql_fetch_assoc($r)) {
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
        mysql_query("INSERT INTO map VALUES ($x, $y, '$i')")  or die(mysql_error());
        break;
    case 0:
        mysql_query("DELETE FROM map WHERE x = $x AND y = $y AND i = '$i';")  or die(mysql_error());
        break;
}







?>