<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Content-Type: text/html;charset=utf-8');

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";

  $game = $_REQUEST['game'];
  $id = $_REQUEST['id'];

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "DELETE FROM " . $game . " WHERE id = '" . $id . "'";

  if ($conn->query($sql) === TRUE) {
      $response = array();
      $response->updated = true;
      printf(json_encode($response));
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

  $conn->close();
?>
