<?php
require 'db.php';
require 'vendor/autoload.php';
error_log("headers received: ". print_r(getallheaders(), true));

function getAuthorizationHeader() {
    error_log("=== CHECKING ALL AUTH LOCATIONS ===");
    
    // Check the redirect location first
    if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        error_log("FOUND in REDIRECT_HTTP_AUTHORIZATION: " . $_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    
    // Check other locations
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        error_log("FOUND in HTTP_AUTHORIZATION: " . $_SERVER['HTTP_AUTHORIZATION']);
        return $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    if (isset($_SERVER['Authorization'])) {
        error_log("FOUND in Authorization: " . $_SERVER['Authorization']);
        return $_SERVER['Authorization'];
    }
    
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        error_log("FOUND in getallheaders(): " . $headers['Authorization']);
        return $headers['Authorization'];
    }
    
    error_log("NOT found in any location");
    return null;
}

$secret_key = "totallysecretkey";

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$authHeader = getAuthorizationHeader();
error_log("Auth header: " . $authHeader);

if ($authHeader !== null && preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
    $token = $matches[1];
    error_log("Token received: " . $token);
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        $authenticated_user = $decoded->user_id;
        error_log("User authenticated: " . $authenticated_user);
    } catch (Exception $e) {
        error_log("JWT decode error: " . $e->getMessage());
        http_response_code(401);
        echo json_encode(["message" => "Invalid or expired token"]);
        exit;
    }
} else {
    http_response_code(401);
    echo json_encode(['error' => 'No token provided']);
    exit;
}
?>