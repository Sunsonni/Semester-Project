<?php
    require 'vendor/autoload.php';
    require 'db.php';
    require 'verifyToken.php';

    $conn = $GLOBALS['conn'];

    try {
        $stmt = $conn->prepare("
            SELECT role
            FROM users
            WHERE id = :user_id
        ");
        $stmt->execute([
            ":user_id" => $authenticated_user
        ]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(401);
            echo json_encode(["message" => "User not found"]);
        }

        if($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(["message" => "Forbidden"]);
            exit;
        }

        echo json_encode([
            "admin" => true
        ]);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message" => "Invalid token"]);
    }
?>