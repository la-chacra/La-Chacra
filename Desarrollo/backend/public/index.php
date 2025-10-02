<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

require dirname(__DIR__) . '/vendor/autoload.php';

use Router\Router;
use Config\Database;
use App\Models\ModeloBase;
use App\Controllers\ReservaController;
use App\Controllers\LoginController;
use App\Controllers\RegistroController;
use App\Controllers\AuthController;

$db = new Database();
ModeloBase::setDB($db);

$router = new Router();

// Ruta raíz de testing
$router->get("/", function() {
    return json_encode(["message" => "API La Chacra corriendo "]);
});

// API Usuario
$router->post("/api/login", [LoginController::class, "login"]);
$router->post("/api/registro", [RegistroController::class, "registrar"]);
$router->post("/api/logout", [AuthController::class, "logout"]);
$router->post("/api/estadoSesion", [AuthController::class, "me"]);
// API Reserva
$router->post("/api/reserva/crear", [ReservaController::class, "registrarReserva"]);


$allowedOrigin = "http://localhost:5173";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$router->despachar();