<?php
require 'verifyToken.php';
require 'db.php';

//Helper function for initial message

$conn = $GLOBALS['conn'];
function getInitialMessage($flavor) {
    switch($flavor) {
        case 'influencer': 
            return "Omg hiiii bestie 😭✨ Today’s energy is literally iconic so let’s do a vibe check before we dive in 💅🔥 Ask me anything because I’m in my girlboss era and totally know everything always 😌✨";
        case 'conspiracy':
            return "Wake up, sheeple. Nothing is what it seems. Whatever you ask, I’ll tell you what the Illuminati doesn’t want published. Let’s expose the truth together.";
        
        case 'corporate':
            return "Appreciate you reaching out. I’m looking forward to synergizing around your core inquiry and leveraging cross-functional insights to deliver a high-impact, future-forward response. Please advise on next steps so we can align strategically.";
        
        default:
            return "Hi there! I’m ready to help with whatever you need. I’ve got a solid understanding of pretty much every topic, so feel free to ask away.";
    }
}



$input = json_decode(file_get_contents('php://input'), true);

$title = $input['title'] ?? 'New Chat';
$flavor = $input['flavor'] ?? 'default';

$stmt = $conn->prepare("
    INSERT INTO chat_sessions (user_id, title, flavor)
    VALUES (:user_id, :title, :flavor)
    RETURNING chat_session_id, created_at
");
$stmt->execute([
    ':user_id' => $authenticated_user,
    ':title' => $title,
    ':flavor' => $flavor
]);
$newSession = $stmt->fetch(PDO::FETCH_ASSOC);

$chat_session_id = $newSession['chat_session_id'];
$created_at = $newSession['created_at'];
$content = getInitialMessage($flavor);

$messageStmt = $conn->prepare("
    INSERT INTO chat_messages (chat_session_id, role, content)
    VALUES (:chat_session_id, 'assistant', :content)
");
$messageStmt->execute([
    ':chat_session_id' => $chat_session_id,
    ':content' => $content
]);

echo json_encode([
    "chat_session_id" => $newSession['chat_session_id'],
    "title" => $title,
    "created_at" => $newSession['created_at'],
    'flavor' => $flavor,
    
]);
?>