<?php

//For development only
ini_set('display_errors', 1);
error_reporting(E_ALL);

//Data is posted to file, parsed from JSON, saved as object to $data variable
$data = json_decode(file_get_contents('php://input'), true);

//Include Database class
include "./PhpClasses/Database.inc";

//New instance of the database
$db = new Database();

//If DB is connected, execute code...
if($db->hasConnection()) {

	try {

		//Loop through dataset and set each variable as a field value
		foreach($data as $item) {
			
			$id = $item['UNIQUE_ID'];
			$Field1 = $item['Field1'];
			$Field2 = $item['Field2'];
			$Field3 = $item['Field3'];
			$Field4 = $item['Field4'];
			$Field5 = $item['Field5'];

			//Insert values into database
			$sql = "INSERT INTO entries VALUES (null, '$id', '$Field1', '$Field2', '$Field3', '$Field4', '$Field5')";
			$db->executeQuery($sql);
			
		}
	} catch (PDOException $e) {

		echo 'ERROR: ' . $e->getMessage();
	}


}


?>