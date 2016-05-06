<?php 
require_once('db.php');


if(isset($_POST["action"])){
	$function = $_POST["action"];

	if(function_exists($function)){
    	call_user_func($function);
  	}
}

function getAll(){
	$db = new DBOperations();
    $db -> connect();
    $conn = $db -> getConnection();
	$sql = "SELECT * FROM test";
	$result = $conn -> query($sql);
	if ($result->num_rows > 0) {
		$data = array();
	    // output data of each row
	    while($row = $result -> fetch_assoc()) {
	    	$array = array("id"=>$row['int_id'], "date"=>$row['str_date'], "title"=>$row['str_title'], "desc"=>$row['str_description'], "color"=>$row['str_color']);
	    	array_push($data, $array);
	    }

	    echo json_encode($data);
	} else {
			echo "0 results";
	}
}

function add(){
	$element = $_POST["element"];
	$desc = $element[0]["description"];
	$date = $element[0]["date"];
	$title = $element[0]["title"];
	$color = $element[0]["color"];

	$db = new DBOperations();
    $db -> connect();
    $conn = $db -> getConnection();
	$sql = "INSERT INTO test (str_date,str_title,str_description,str_color) VALUES ('$date', '$title' ,'$desc', '$color')";
	if ($conn -> query($sql) === TRUE) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
	$conn->close();
}

function remove(){
	$element = $_POST["element"];

	$db = new DBOperations();
    $db -> connect();
    $conn = $db -> getConnection();

    /* create a prepared statement */
	if ($stmt = $conn -> prepare("DELETE FROM test WHERE int_id=?")) {
		$stmt -> bind_param("s", $element);
    	$stmt -> execute();
    	$stmt->close();
    	echo "Deleted successfully";

	}
	else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
}

function update(){
	$element = $_POST["element"];

	$desc = $element[0]["description"];
	$id = $element[0]["id"];
	$title = $element[0]["title"];
	$color = $element[0]["color"];

	$db = new DBOperations();
    $db -> connect();
    $conn = $db -> getConnection();

    /* create a prepared statement */
	if ($stmt = $conn -> prepare("UPDATE test SET str_title = ?, str_description = ?, str_color = ? WHERE int_id=?")) {
		$stmt -> bind_param("sssi", $title, $desc, $color, $id);
    	$stmt -> execute();
    	$stmt->close();
    	echo "edited successfully";

	}
	else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
}





?>