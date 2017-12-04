<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST'); 
  header('Content-Type: text/html;charset=utf-8');

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $response = array();

  $sql = "SELECT * FROM memoTest";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $response['memoTest'][$row['level']][$row['area']][] = $row;
      }
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

  var_dump($response);
  die();

  $sql = "SELECT * FROM circuitos";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $response['circuitos'][$row['level']][$row['area']][] = $row;
      }
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

  $sql = "SELECT * FROM agrupando";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $response['agrupando'][$row['level']][$row['area']][] = $row;
      }
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }

  var_dump($response);
  die();

  printf(json_encode($response));
  $conn->close();
?>
