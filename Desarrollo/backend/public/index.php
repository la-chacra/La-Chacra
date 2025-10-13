<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

require dirname(__DIR__) . '/vendor/autoload.php';

use Router\Router;
use Config\Database;
use App\Models\ModeloBase;
use App\Services\AuthMiddleware;
use App\Controllers\ReservaController;
use App\Controllers\LoginController;
use App\Controllers\RegistroController;
use App\Controllers\AuthController;
use App\Controllers\ComandaController;
use App\Controllers\RecuperarController;

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
$router->get("/api/logout", [AuthController::class, "logout"]);
$router->get("/api/estadoSesion", [AuthController::class, "estadoSesion"]);

// API Reserva
$router->post("/api/reserva/crear", [ReservaController::class, "registrar"]);
$router->post("/api/reserva/actualizar", [ReservaController::class, "actualizar"]);
$router->post("/api/reserva/cancelar", [ReservaController::class, "cancelar"]);
$router->get("/api/reserva/gestion/historialReservas", [ReservaController::class, "obtenerRegistros"]);

//API Comanda
$router->post("/api/gestion/comanda/crear", [ComandaController::class, "crear"]);
$router->post("/api/gestion/comanda/actualizar", [ComandaController::class, "actualizar"]);

//API Recuperar Contraseña
$router->post("/api/recuperar/enviarCodigo", [RecuperarController::class, "enviarCodigo"]);
$router->post("/api/recuperar/cambiarPassword", [RecuperarController::class, "cambiarPassword"]);   


$allowedOrigin = "http://localhost:5173";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

AuthMiddleware::verificarSesion();
AuthMiddleware::verificarPermisos();

try {
    $router->despachar();
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error interno del servidor.",
        "detalle" => $e->getMessage()
    ]);
}
