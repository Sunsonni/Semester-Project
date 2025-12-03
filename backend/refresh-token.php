<?php
require 'db.php';
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if($_SERVER['REQUEST_METHOD'] === 'OPTION') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$refreshToken = $input['refresh_token'] ?? '';

$secret_key = "totallysecretkey";

if(!$refreshToken){
    http_response_code(401);
    echo json_encode(['message' => "Refresh token required"]);
    exit;
}

try {
    $decoded = JWT::decode($refreshToken, new Key($secret_key, 'HS256'));
    $user_id = $decoded->user_id;

    $stmt = $conn->prepare("SELECT id, name, role FROM users WHERE id = :user_id");
    $stmt->execute([':user_id' => $user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(["message" => "User not found"]);
        exit;
    }

    $accessPayload = [
        "iss" => "http://localhost:8888",
        "aud" => "http://localhost:4200",
        "iat" => time(),
        "exp" => time() + 60*60, // 1 hour
        "user_id" => $user['id'],
        "name" => $user['name'],
        "role" => $user['role'],
        "type" => 'access'
    ];
    
    // generate a new access token
    $newAccessToken = JWT::encode(
        $accessPayload, 
        $secret_key,
        'HS256'
    );

    echo json_encode([
        "access_token" => $newAccessToken,
        "expires_in" => 60*60,
        "token_type" => "Bearer"
    ]);

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid refresh token"]);
}

?>