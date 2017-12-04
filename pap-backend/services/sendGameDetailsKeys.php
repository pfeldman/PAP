<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Content-Type: text/html;charset=utf-8');

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";

  $id = $_REQUEST['id'];
  $game = $_REQUEST['game'];
  $details = $_REQUEST['details'];
  $value = $_REQUEST['value'];

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "UPDATE " . $game . " SET " . $details . "='" . $value . "' WHERE id = '" . $id . "'";

  if ($conn->query($sql) === TRUE) {
      $response = array();
      $response->updated = true;
      printf(json_encode($response));
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

  $conn->close();
?>
