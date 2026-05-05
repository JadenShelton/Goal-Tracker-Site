<?php
header('Content-Type: application/json');
require_once 'db.php';

$id = mysqli_real_escape_string($conn, $_POST['id']);

if(empty($id)){
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
} else {
    $sql = "DELETE FROM jshel02_goals WHERE id = $id";
    $result = mysqli_query($conn, $sql);

    if($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?>