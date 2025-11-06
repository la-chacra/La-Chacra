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
use App\Controllers\StockController;
use App\Controllers\EstadisticaController;
use App\Controllers\EmpleadoController;



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
$router->post('/api/reservas/registrar', [ReservaController::class, 'registrar']);
$router->post('/api/reservas/actualizar', [ReservaController::class, 'actualizar']);
$router->post('/api/reservas/cancelar', [ReservaController::class, 'cancelar']);

$router->get("/api/reservas/obtener", [ReservaController::class, "obtenerReservas"]);
$router->get("/api/reservas/obtener/{id}", [ReservaController::class, "obtenerPorID"]);
$router->put("/api/reservas/modificar/{id}", [ReservaController::class, "modificarReserva"]);
$router->delete('/api/reservas/desactivar/{id}', [ReservaController::class, 'desactivarReserva']);





//API Comanda
$router->post("/api/gestion/comanda/crear", [ComandaController::class, "crear"]);
$router->post("/api/gestion/comanda/actualizar", [ComandaController::class, "actualizar"]);

//API Recuperar Contraseña
$router->post("/api/recuperar/enviarCodigo", [RecuperarController::class, "enviarCodigo"]);
$router->post("/api/recuperar/cambiarPassword", [RecuperarController::class, "cambiarPassword"]);  

// API Insumo
$router->post("/api/insumo/eliminar", [StockController::class, "eliminar"]);
$router->post("/api/insumo/actualizar", [StockController::class, "actualizar"]);

//API EstadisticaController
$router->post("/api/estadistica/topPlatos", [EstadisticaController::class, "obtenerTopPlatos"]);
$router->post("/api/estadistica/pedidosTotales", [EstadisticaController::class, "obtenerPedidosTotales"]);
$router->post("/api/estadistica/reservasTotales", [EstadisticaController::class, "obtenerReservasTotales"]);
$router->post("/api/estadistica/gananciasTotales", [EstadisticaController::class, "obtenerGananciasTotales"]);
$router->get("/api/estadistica/obtenerDashboard", [EstadisticaController::class, "obtenerDashboard"]);
$router->get("/api/estadistica/obtenerTendenciasEstacionales", [EstadisticaController::class, "obtenerTendenciasEstacionales"]);
$router->get('/api/estadistica/obtenerRankingProductos', [EstadisticaController::class, 'obtenerRankingProductos']);
$router->get('/api/estadistica/obtenerRankingReservas', [EstadisticaController::class, 'obtenerRankingReservas']);
$router->get('/api/estadistica/obtenerRankingVentas', [EstadisticaController::class, 'obtenerRankingVentas']);

//API StockController

$router->get("/api/gestion/historialStock", [StockController::class, "obtenerHistorialStock"]);
$router->get("/api/stock", [StockController::class, "obtenerStock"]);

// API EmpleadoController

$router->get("/api/empleado/obtener", [EmpleadoController::class, "obtenerEmpleados"]);
$router->get("/api/exportar-usuarios", [EmpleadoController::class, "exportarUsuarios"]);
$router->post("/api/empleado/registrar", [EmpleadoController::class, "registrarEmpleado"]);
$router->delete("/api/empleado/desactivar/{id}", [EmpleadoController::class, "desactivarEmpleado"]);
$router->get("/api/empleado/obtener/{id}", [EmpleadoController::class, "obtenerPorID"]);
$router->put("/api/empleado/modificar/{id}", [EmpleadoController::class, "modificarEmpleado"]);




$allowedOrigin = "http://localhost:5173";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


try {

    AuthMiddleware::verificarSesion();
    AuthMiddleware::verificarPermisos();

    $router->despachar();
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error interno del servidor.",
        "detalle" => $e->getMessage()
    ]);
}
