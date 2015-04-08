<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
	
	$conn = new PDO('mysql:host=localhost;dbname=tmplApp', $config['DB_USERNAME'], $config['DB_PASSWORD']);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	// $sql = "DROP TABLE IF EXISTS entries";
	// $conn->exec($sql);

	// $sql = "CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY, Field1 varchar(30), Field2 varchar(30), Field3 varchar(500), Field4 varchar(20), Field5 varchar(20))";
	// $conn->exec($sql);
		
	foreach($data as $item) {
		
		$id = $item['UNIQUE_ID'];
		$Field1 = $item['Field1'];
		$Field2 = $item['Field2'];
		$Field3 = $item['Field3'];
		$Field4 = $item['Field4'];
		$Field5 = $item['Field5'];

		$sql = "INSERT INTO entries VALUES (null, '$id', '$Field1', '$Field2', '$Field3', '$Field4', '$Field5')";
		$conn->exec($sql);
		
	}

} catch (PDOExeption $e) {
	echo 'ERROR: ' . $e->getMessage();
}


?>