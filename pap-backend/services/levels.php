<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST'); 

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
  $sql = "SELECT * FROM levels";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      $response = array();
      while($row = $result->fetch_assoc()) {
        $response[$row['id']]->data['label'] = $row['name'];
        $response[$row['id']]->data['time'] = $row['time'];
      }
      printf(json_encode($response));
  } else {
      header('HTTP/1.0 500 Internal Server Error');
  }
  $conn->close();
?>
