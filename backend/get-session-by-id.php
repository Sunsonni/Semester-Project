<?php
    require 'db.php';
    require 'verifyToken.php';

    $conn = $GLOBALS['conn'];

    $input = json_decode(file_get_contents('php://input'), true);

    $chat_session_id = $input['chat_session_id'] ?? null;

    if (!$chat_session_id) {
        http_response_code(500);
        echo json_encode(["error" => "chat_session_id missing"]);
    }

    try {
        $stmt = $conn->prepare(
        "SELECT role, content
            FROM chat_sessions cs
            INNER JOIN chat_messages cm ON cm.chat_session_id = cs.chat_session_id
            WHERE cs.chat_session_id = :session_id 
                AND cs.user_id = :user_id
            ORDER BY cm.created_at ASC"
        );
        $stmt->execute([
            ":session_id" => $chat_session_id,
            ":user_id" => $authenticated_user
        ]);

        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "message" => "Messages fetched successfully",
            "messages" => $messages
            ]
        ); 
    } catch (PDOException $e) {
        http_response_code(500);
        error_log($e ->getMessage());
        
    }

?>