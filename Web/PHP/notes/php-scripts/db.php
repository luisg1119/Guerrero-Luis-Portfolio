<?php

final class DBOperations{

	private $servername;
	private $username;
	private $password; 
	private $conn;
	private $localhost = "";

	public function __construct(){
		$this -> dbName = "";
		$this -> username = "";
		$this -> password = "";
	}

	public function connect(){
		$this -> conn = mysqli_connect($this -> localhost, $this -> username, $this -> password, $this -> dbName)
		// Check connection
		  or die("Unable to connect to MySQL");
		//echo $this -> conn -> host_info;
	}

	public function getConnection(){
		return $this -> conn;
	}

	public function close(){
		echo "Closed";
		$this -> conn -> close();
	}
}



?>
