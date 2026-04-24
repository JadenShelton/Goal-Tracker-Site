<?php
header('Content-Type: application/json');
require_once 'db.php';

$sql = "SELECT * FROM jshel02_goals ORDER BY deadline ASC";
$result = mysqli_query($conn, $sql);

$goals = [];
while($row = mysqli_fetch_assoc($result)) {
    array_push($goals, $row);
}

echo json_encode($goals);

mysqli_close($conn);
?>