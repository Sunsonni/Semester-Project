<?php
    require "db.php";
    require "verifyToken.php";
    
    $conn = $GLOBALS['conn'];

    $stmt = $conn->prepare("
        SELECT 
            id, 
            name, 
            email, 
            role, 
            created_at, 
            username
        FROM USERS
        ORDER BY role 
    ");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "users" => $users,
        "current_user_id" => $authenticated_user
    ]);


?>