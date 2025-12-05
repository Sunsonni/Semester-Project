<?php
require 'db.php';
require 'verifyToken.php';

$conn = $GLOBALS['conn'];

$input = json_decode(file_get_contents('php://input'), true);

try {
    $api_key = $input['api_key'];
    $method = 'AES-256-CBC';
    $key = "IiHKeu5yZp5XHzRB1n4kGyRkdWiRsgUo"; // 32 char random string
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
    $encrypted_key = openssl_encrypt($api_key, $method, $key, 0, $iv);
    $iv_encoded = base64_encode($iv);
    
    $role = $input['role'] ?? null;
    
    $stmt = $conn->prepare("UPDATE users SET api_key =  :api_key, api_key_iv = :api_key_iv WHERE id = :user_id");
    $stmt->execute([
        ':api_key' => $encrypted_key,
        ':api_key_iv'=> $iv_encoded,
        'user_id' => $authenticated_user
    ]);
    echo json_encode(["message" => "API key added successfully"]);
} catch (PDOException $e) {
    echo $e->getMessage();
}

?>