<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT"); // include DELETE
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    require "db.php";
    require "verifyToken.php";
    
    $conn = $GLOBALS['conn'];

    if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "Missing user id"]);
    exit();
}

    $user_id = intval($_GET['id']);

    try {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = :user_id");
    $stmt->execute([":user_id" => $user_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "User deleted successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
    }
    //TODO: Fix so that it cascade deletes chat_sessions and chat_messages
    

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database error",
        "details" => $e->getMessage()
    ]);
}

?>