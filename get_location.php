<?php
 $query = $_POST['name'];
 $lat = $_POST['lat'];
 $lon = $_POST['lon'];


 $html = file_get_contents('https://developers.zomato.com/api/v2.1/locations?query='.$query.'&lat='.$lat.'&lon='.$lon.'&count=10');

 $json = json_decode($html, true);

 $address = $json['location_suggestions'];
 $add = count($address);

 for($i=0;$i<$add;$i++){
 	$entity_type = $json['location_suggestions'][$i]['entity_type'];
 	$entity_id = $json['location_suggestions'][$i]['entity_id'];

 	$adres = array('entity_type'=>$entity_type ,'entity_id' => $entity_id);
 	$we[] = $adres;
 	//$lat[] = array('lat' => $la);
 	//$lng[] = array('lng' => $ln);

     $result=json_encode($we);
     //$latitude = json_encode($lat);
     //$longitude = json_encode($lng);
 }

 echo $result;
 ?>
