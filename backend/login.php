<?php
    require 'vendor/autoload.php';
    require 'db.php';

    use Firebase\JWT\JWT;

    // Just in backend for ease of access. Would be in an environment variable other wise.
    $conn = $GLOBALS['conn'];
    $secret_key = "totallysecretkey";
    
    // CORS
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

    $method = $_SERVER['REQUEST_METHOD'];

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(["message" => "Invalid request method"]);
        exit;
    }
    $input = json_decode(file_get_contents('php://input'), true);

    $identifier = $input['identifier'];
    $password = $input['password'];

    if (!$identifier || !$password) {
        http_response_code(400);
        echo json_encode(['message'=> 'Email and password required']);
        exit;
    }

    // Fetch password
    $stmt = $conn->prepare("SELECT password FROM users WHERE (email = :identifier OR username = :identifier)");
    $stmt->execute([':identifier' => $identifier]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $stored_password = $result["password"];
        if (password_verify($password, $stored_password)) {
            $stmt = $conn->prepare("SELECT id, name, api_key, role FROM users WHERE (email = :identifier OR username = :identifier)");
            $stmt->execute([':identifier' => $identifier]);
            $user = $stmt -> fetch(PDO::FETCH_ASSOC);
            
            $payload = [
                "iss" => "http://localhost:8888",
                "aud" => "http://localhost:4200",
                "iat" => time(),
                "exp" => time() + 60*60, // 1 hour
                "user_id" => $user['id'],
                "name" => $user['name'],
                "role" => $user['role'],
                "type" => "access"
            ];
            $token = JWT::encode($payload, $secret_key, 'HS256');

            $refreshPayload = [
                "iss" => "http://localhost:8888",
                "aud" => "http://localhost:4200", 
                "iat" => time(),
                "exp" => time() + 60 * 60 * 24 * 7, // 7 days
                "user_id" => $user['id'],
                "type" => "refresh"
            ];
            $refreshToken = JWT::encode($refreshPayload, $secret_key, 'HS256');


            // sending token, role, and if user has api key or not
            echo json_encode([
                "message" => "You've logged in successfully",
                "token" => $token,
                "refresh_token" => $refreshToken,
                "expires_in" => 60*60, // 1 hour
                "has_api_key" => !empty($user['api_key']),
                "role" => $user['role'],
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name']
                ]
            ]);
            exit;
        } else {
            http_response_code(401);
            echo json_encode(["message"=> "Invalid password"]);
            exit;
        }
    } else {
        http_response_code(404);
        echo json_encode(["message"=> "User not found"]);
        exit;
    }

?>