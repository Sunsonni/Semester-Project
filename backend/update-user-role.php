<?php
    require "db.php";
    require "verifyToken.php";
    
    $conn = $GLOBALS['conn'];

    $input = json_decode(file_get_contents('php://input'), true);


    $user_id = intval($input['id']);
    $role = $input['role'];

    if (!isset($user_id) || !isset($role)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing user_id or role"]);
        exit();
    }

    $stmt = $conn->prepare("
        UPDATE users
        SET role = :role
        WHERE id = :user_id
    ");
    $stmt->execute([
        ":role" => $role,
        ":user_id" => $user_id
    ]);

    // echo json_encode([
    //     "message" => "User role changed successfully"
    // ]);


?>