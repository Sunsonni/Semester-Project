<?php
error_log("=== COMPLETE HEADER DEBUG ===");

// Method 1: getallheaders()
$allHeaders = getallheaders();
error_log("getallheaders(): " . print_r($allHeaders, true));

// Method 2: Check all $_SERVER variables
error_log("=== ALL SERVER VARIABLES ===");
foreach ($_SERVER as $key => $value) {
    error_log("$key: $value");
}

// Method 3: Raw input (if available)
error_log("=== RAW INPUT ===");
error_log("php://input: " . file_get_contents("php://input"));

echo json_encode([
    "status" => "debug_complete", 
    "headers_received" => $allHeaders,
    "server_keys" => array_keys($_SERVER)
]);
?>