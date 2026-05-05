<?php
header('Content-Type: application/json');
require_once 'db.php';

$title = mysqli_real_escape_string($conn, $_POST['title']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$start_value = mysqli_real_escape_string($conn, $_POST['start_value']);
$target_value = mysqli_real_escape_string($conn, $_POST['target_value']);
//$current_value = mysqli_real_escape_string($conn, $_POST['current_value']);
$unit = mysqli_real_escape_string($conn, $_POST['unit']);
$achievable = mysqli_real_escape_string($conn, $_POST['achievable']);
$relevant = mysqli_real_escape_string($conn, $_POST['relevant']);
$deadline = mysqli_real_escape_string($conn, $_POST['deadline']);
$category = mysqli_real_escape_string($conn, $_POST['category']);

if(empty($title) || empty($target_value) || empty($deadline)){
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
} else {
    $sql = "INSERT INTO jshel02_goals (title, description, start_value, target_value, current_value, unit, achievable, relevant, deadline, category) 
            VALUES ('$title', '$description', $start_value, $target_value, $start_value, '$unit', '$achievable', '$relevant', '$deadline', '$category')";
    $result = mysqli_query($conn, $sql);

    if($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
    }
}
mysqli_close($conn);
?>