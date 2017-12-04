<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST'); 
  header('Content-Type: text/html;charset=utf-8');

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";

  $game = $_REQUEST['game'];
  $area = $_REQUEST['area'];
  $level = $_REQUEST['level'];
  $type = $_REQUEST['type'];

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
  $sql = "SELECT * FROM " . $game . " 
            WHERE level = '" . $level . "'
            AND area = '" . $area . "'";
//            AND type = '" . $type . "'";

  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      $response = array();
      while($row = $result->fetch_assoc()) {
        $response[] = $row;
      }

      printf(json_encode($response));
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }
  $conn->close();
?>
