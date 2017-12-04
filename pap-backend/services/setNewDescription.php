<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Content-Type: text/html;charset=utf-8');

  $servername = "localhost";
  $username = "themooe6_pap";
  $password = "qwe123..";
  $dbname = "themooe6_pap";

  $description = $_REQUEST['description'];
  $game = $_REQUEST['game'];
  $area = $_REQUEST['area'];
  $level = $_REQUEST['level'];

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "UPDATE " . $game . " SET description='" . $description . "' WHERE level = '" . $level . "' AND area = '" . $area . "'";

  if ($conn->query($sql) === TRUE) {
      $response = array();
      $response->updated = true;
      printf(json_encode($response));
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

  $conn->close();
?>
