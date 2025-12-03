<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$servername = "db";
$username = "teacher_user";
$password = "teacher_user";
$dbname = "postgres";
$port = 5432;
$dsn = "pgsql:host=$servername;port=$port;dbname=$dbname;";



try {
    $conn = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $GLOBALS['conn'] = $conn;
} catch (PDOException $e) {
    echo "Connection failed: " . $e -> getMessage();
    exit;
}


?>