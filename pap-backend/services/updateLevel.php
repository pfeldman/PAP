<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST'); 

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";
  $conn = new mysqli($servername, $username, $password, $dbname);

  $username = $_REQUEST['username'];
  $level = $_REQUEST['level'];
    // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 

  $sql = "UPDATE users SET level = '" . $level . "' WHERE username='" . $username . "'";
  if ($conn->query($sql) === TRUE) {
      $response = json_decode ("{}");
      $response -> updated = true;
      printf(json_encode($response));
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

?>
