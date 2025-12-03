<?php
require 'vendor/autoload.php';
use Gemini\Enums\ModelVariation;
use Gemini\GeminiHelper;
use Gemini;
use Gemini\Data\Content;
use Gemini\Enums\Role;

function sendToGemini ($history, $apiKey, $modelName = 'gemini-2.0-flash'){

$client = Gemini::client($apiKey);

$chat = $client
->generativeModel(model: $modelName)
->startChat(
    history: array_map(
        fn($msg) => Content::parse(
            part: $msg['content'],
            role: $msg['role'] === 'user' ? Role::USER : Role::MODEL
        ),
        $history
    )
);
$response = $chat->sendMessage($history[count($history) - 1]['content']);
return $response->text();
}
?>