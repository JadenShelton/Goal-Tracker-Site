<?php
require_once 'config.php';

$conn = mysqli_connect($host, $user, $password, $db);

if(!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}
?>