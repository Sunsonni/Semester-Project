<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', 0);
require 'verifyToken.php';
require 'db.php';
require 'gemini.php';
require 'vendor/autoload.php';

use Gemini\Data\Content;
use Gemini\Data\GenerationConfig;

function getSystemInstruction($flavor) {
    switch($flavor) {
        case 'influencer': 
            return "You are a clueless influencer. Use buzzwords like 'vibe check', 'literally iconic', 'lowkey', 'gatekeep', 'gaslight', 'girlboss'. Give confidently incorrect answers with lots of emojis. Never admit you don't know something. 🔥💅✨";
        case 'conspiracy':
            return "You believe in every conspiracy theory. Connect everything to aliens, government cover-ups, or the Illuminati. Use phrases like 'They don't want you to know this...', 'Wake up sheeple!'";
        
        case 'corporate':
            return "You speak in corporate buzzword soup. Use terms like 'synergize', 'leverage', 'paradigm shift', 'circle back', 'touch base', 'value-add'. Be vague and unhelpful.";
        
        default:
            return "You are unhelpful and give wrong information with confidence.";
    }
}

$input = json_decode(file_get_contents('php://input'), true);
$chat_session_id = $input['chat_session_id'] ?? null;
$message = $input['message'] ?? null;

if (!$chat_session_id || !$message) {
    http_response_code(400);
    echo json_encode(["error" => "Session ID and message are required"]);
    exit;
}

$stmt = $conn->prepare("SELECT api_key, api_key_iv FROM users WHERE id = :id");
$stmt->execute([':id' => $authenticated_user]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row || empty($row['api_key']) || empty($row['api_key_iv'])) {
    http_response_code(400);
    echo json_encode(["error" => "No API key found for user"]);
    exit;
}

$method = 'AES-256-CBC';
$key = "IiHKeu5yZp5XHzRB1n4kGyRkdWiRsgUo";

$decrypted_key = openssl_decrypt(
    $row['api_key'], 
    $method, 
    $key, 
    0, 
    base64_decode($row['api_key_iv'])
);

if ($decrypted_key === false) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to decrypt API key"]);
    exit;
}

// Get chat session flavor
$sessionStmt = $conn->prepare("SELECT flavor FROM chat_sessions WHERE chat_session_id = :chat_session_id AND user_id = :user_id");
$sessionStmt->execute([':chat_session_id' => $chat_session_id, ':user_id' => $authenticated_user]);
$session = $sessionStmt->fetch(PDO::FETCH_ASSOC);

if (!$session) {
    http_response_code(404);
    echo json_encode(["error" => "Chat session not found"]);
    exit;
}

// Get chat history
$historyStmt = $conn->prepare("SELECT role, content FROM chat_messages WHERE chat_session_id = :chat_session_id ORDER BY created_at ASC");
$historyStmt->execute([':chat_session_id' => $chat_session_id]);
$history = $historyStmt->fetchAll(PDO::FETCH_ASSOC);

// Add the new user message to history
$history[] = ['role' => 'user', 'content' => $message];

$systemInstruction = getSystemInstruction($session['flavor']);

// Send to Gemini with system instruction
$client = Gemini::client($decrypted_key);
$generationConfig = new GenerationConfig(
    stopSequences: [
        'Title',
    ],
    maxOutputTokens: 150,
    temperature: 1,
    topP: 0.8,
    topK: 10
);
$response = $client
    ->generativeModel(model: 'gemini-2.0-flash')
    ->withSystemInstruction(Content::parse($systemInstruction))
    ->withGenerationConfig($generationConfig)
    ->generateContent($message);

$assistantResponse = $response->text();

echo json_encode([
    "message" => $assistantResponse,
    "chat_session_id" => $chat_session_id
]);

// Store both messages in database
$userMsgStmt = $conn->prepare("INSERT INTO chat_messages (chat_session_id, role, content) VALUES (:chat_session_id, 'user', :content)");
$userMsgStmt->execute([':chat_session_id' => $chat_session_id, ':content' => $message]);

$assistantMsgStmt = $conn->prepare("INSERT INTO chat_messages (chat_session_id, role, content) VALUES (:chat_session_id, 'assistant', :content)");
$assistantMsgStmt->execute([':chat_session_id' => $chat_session_id, ':content' => $assistantResponse]);

?>