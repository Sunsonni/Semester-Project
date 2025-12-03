<?php
require 'db.php';
require 'verifyToken.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$conn = $GLOBALS['conn'];

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    try {
        if (!isset($authenticated_user)) {
            http_response_code(401);
            echo json_encode(['error' => 'User not authenticated']);
            exit;
        }

        $stmt = $conn->prepare("SELECT api_key, api_key_iv FROM users WHERE id = :id");
        $stmt->execute([':id' => $authenticated_user]); // Fixed variable name
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$row) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            exit;
        }

        if (empty($row['api_key']) || empty($row['api_key_iv'])) {
            http_response_code(404);
            echo json_encode(['error' => 'API key not found for user']);
            exit;
        }

        $method = 'AES-256-CBC';
        $key = "IiHKeu5yZp5XHzRB1n4kGyRkdWiRsgUo"; // 32 char random string
        
        $decrypted_key = openssl_decrypt(
            $row['api_key'], 
            $method, 
            $key, 
            0, 
            base64_decode($row['api_key_iv'])
        );

        if ($decrypted_key === false) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to decrypt API key']);
            exit;
        }

        echo json_encode(['api_key' => $decrypted_key]); 

    } catch (Exception $e) {
        error_log("Error in get-api-key.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);
    }
}
?>