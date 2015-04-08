<?php

/*
	This class defines everything having to do with the database.	
*/
class Database {

	// The server to connect to
	private $server_name = 'localhost';

	// Database name to connect to
	private $database = 'tmplApp';

	// The user ID
	private $uid = 'root';

	// The password
	private $password = 'root';

	// Database connection object
	private $connection = false;

	//Constructor method
	function __construct () {

		try {

			$uid = $this->uid;
			$pwd = $this->password;

			$this->connection = new PDO("mysql:host={$this->server_name};dbname={$this->database}", $uid, $pwd);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			//clean up the variables now
			unset($uid, $pwd, $this->uid, $this->serverName, $this->database, $this->password);
			
		} catch (PDOException $e) {
			
			trigger_error($e, E_USER_WARNING);

			$this->connection = false;

		}
	}

	//Checks if database has a connection 
	public function hasConnection () {

		if(!($this->connection === false)) {

			return true;

		} else {

			return false;
		}
	}

	//Executes queries
	public function executeQuery ($sql) {

		if(!empty($sql)) {
			$this->connection->exec($sql);
		}

	}
}