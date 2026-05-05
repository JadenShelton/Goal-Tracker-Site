<?php
header('Content-Type: application/json');
require_once 'db.php';

$id = mysqli_real_escape_string($conn, $_POST['id']);
$current_value = mysqli_real_escape_string($conn, $_POST['current_value']);

if(empty($id) || !isset($_POST['current_value'])){
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
} else {
    $sql = "UPDATE jshel02_goals SET current_value = $current_value WHERE id = $id";
    $result = mysqli_query($conn, $sql);

    if($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?>