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


if(isset($_GET['a']) && $_GET['a'] == '3') {
    $array = array();
    $r = mysqli_query($conn, "SELECT * FROM map")  or die(mysql_error());

    ?>
    function loadobjects(game) {
    <?php
        
        while($row = mysqli_fetch_assoc($r)) {
            $x = $row['x'];
            $y = $row['y'];
            $i = $row['i'];

            ?> 

            
               


            <?php if($i == 'pond-a') { ?>

                var element = ponds.create(<?php echo $x; ?>, <?php echo $y; ?>, "<?php echo $i; ?>");
               
                element.body.setSize(205,40,35,30);
                element.body.immovable = true;
                console.log("creating " + element.z + ", "+ element.key);


                element.animations.add('rip',[3,4,5],3,true);
                element.animations.add('default',[0,1,2],3,true);
                element.animations.play('default');
                element.animations.currentAnim.speed = 10;


            <?php } 
            else if($i == 'fire-a') { ?>


                var element = fires.create(<?php echo $x; ?>, <?php echo $y; ?>, "<?php echo $i; ?>");
                element.body.immovable = true;
                console.log("creating " + element.z + ", "+ element.key);

                element.animations.add('default',[0,1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17],18,true);
                element.animations.play('default');
                element .animations.currentAnim.speed = 10;
                playState.objectsThatRequireLight.push(element);
            <?php } else { ?>

                var element = feet.create(<?php echo $x; ?>, <?php echo $y; ?>, "<?php echo $i; ?>");
                element.body.immovable = true;
                console.log("creating " + element.z + ", "+ element.key);

            <?php } ?>

            <?php if($i == 'tree_foot') { ?>

                element.body.setSize(30, 2, 21, 0); //check
                element.body.immovable = true;
                
                var abelly =  belly.create(<?php echo $x; ?> + 30, <?php echo $y; ?> + 30, 'tree_belly');
                console.log("creating belly as "+ abelly.z);
                abelly.anchor.setTo(0.5, 0.8);
        
            <?php } ?>

            

            
            <?php
        }

    ?> } <?php
    die;
}














                    
                    


$a = $_POST['a'];
$x = $_POST['x'];
$y = $_POST['y'];
$i = $_POST['i'];


switch($a) {
    case 1:
        mysqli_query($conn,"INSERT INTO map (x,y,i) VALUES ($x, $y, '$i')")  or die(mysql_error());
        break;
    case 0:
        mysqli_query($conn,"DELETE FROM map WHERE x = $x AND y = $y AND i = '$i';")  or die(mysql_error());
        break;
}







?>