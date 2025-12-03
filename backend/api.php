<?php
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 


$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $conn->query("SELECT * FROM users WHERE id = $id");
            $data = $result->fetch(PDO::FETCH_ASSOC);
            echo json_encode($data);
        } else {
            $result = $conn->query("SELECT * FROM users");
            $users = [];
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

        case 'POST':
            $name = $input['name'] ?? null;
            $email = $input['email'] ?? null;
            $username = $input['username'] ?? null;
            $password = $input['password'] ?? null;

            if (!$email) {
                http_response_code(400);
                echo json_encode(["message" => "Email is required"]);
                break;
            }
            if (!$password) {
                http_response_code(400);
                echo json_encode(["message" => "Password is required"]);
                break;
            }
            if (!$username) {
                http_response_code(400);
                echo json_encode(["message" => "Username is required"]);
                break;
            }

        try {
            $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT); 

            $api_key = $input['api_key'] ?? null;
            $encrypted_key = null;
            $iv_encoded = null;

            if ($api_key) {
                $method = 'AES-256-CBC';
                $key = "IiHKeu5yZp5XHzRB1n4kGyRkdWiRsgUo"; // 32 char random string
                $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
                $encrypted_key = openssl_encrypt($api_key, $method, $key, 0, $iv);
                $iv_encoded = base64_encode($iv);
            }
            
            $stmt = $conn->prepare("INSERT INTO users (name, email, password, api_key, api_key_iv, username) VALUES (:name, :email, :password, :api_key, :api_key_iv, :username)");
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':password' => $hashedPassword,
                ':api_key' => $encrypted_key,
                ':api_key_iv'=> $iv_encoded,
                ':username' => $username
            ]);

            http_response_code(201);
            echo json_encode(["message" => "User added successfully"]);
            } catch (PDOException $e) {
               http_response_code(500);
                error_log("PostgreSQL Error: " . $e->getMessage()); // Check your error logs for this

                // Check for duplicate entry in PostgreSQL
                if (strpos($e->getMessage(), 'duplicate key value violates unique constraint') !== false) {
                    if (strpos($e->getMessage(), 'users_email_key') !== false) {
                        echo json_encode(["message" => "Email already exists"]);
                    } elseif (strpos($e->getMessage(), 'users_username_key') !== false) {
                        echo json_encode(["message" => "Username already exists"]);
                    } else {
                        echo json_encode(["message" => "Duplicate entry found"]);
                    }
                } else {
                    echo json_encode(["message" => "Database error"]);
                }
            }
        break;
        
        case 'PUT':
            $id = $_GET['id'];
        $name = $input['name'];
        $email = $input['email'];
        $conn->query("UPDATE users SET name='$name', email='$email', password='$password' WHERE id=$id");
        echo json_encode(["message" => "User updated successfully"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $conn->query("DELETE FROM users WHERE id=$id");
        echo json_encode(["message" => "User deleted successfully"]);
        break;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}
$conn = null;
?>