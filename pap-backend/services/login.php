<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST'); 

  $servername = "localhost";
  $username = "root";
  $password = "c4c4fr1t489";
  $dbname = "themooe6_pap";
  $conn = new mysqli($servername, $username, $password, $dbname);

  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];
    // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
  $sql = "SELECT * FROM users WHERE username='" . $username . "' AND password='" . $password . "'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $response = json_decode ("{}");
      $response -> name = $row['name'];
      $response -> level = $row['level'];
      $response -> username = $username;
      printf(json_encode($response));
  } else {
      header('HTTP/1.0 403 Forbidden');
  }
  $conn->close();

 /* printf ("
    {
        username: " . $_REQUEST['username'] . "
    }
  ");*/
?>
