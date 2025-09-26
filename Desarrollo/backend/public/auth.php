<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . "/../vendor/autoload.php";

use App\Controllers\AuthController;

// Recibir JSON del frontend
$data = json_decode(file_get_contents("php://input"), true);

$controller = new AuthController();

// Identificar acción
$action = $data["action"] ?? null;

if ($action === "registrar") {
    echo json_encode($controller->registrar($data));
} elseif ($action === "login") {
    echo json_encode($controller->login($data));
} else {
    echo json_encode(["success" => false, "message" => "Acción no válida"]);
}
