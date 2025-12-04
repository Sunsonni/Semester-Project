<?php
    require 'db.php';
    require 'verifyToken.php';

    $conn = $GLOBALS['conn'];

    $stmt = $conn->prepare(
    "select 
                title, 
                flavor,
                created_at, 
                last_updated
            from chat_sessions cs 
            where user_id = :user_id" 
    );
    $stmt->execute([
        ":user_id" => $authenticated_user
    ]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "data" => $data
    ]);


?>