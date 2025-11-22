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
use App\Controllers\PlatoController;
use App\Controllers\HistorialController;


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
$router->get("/api/obtenerDatos", [AuthController::class, "obtenerDatosUsuario"]);
$router->put("/api/usuario/cambiar-contraseña", [AuthController::class, "cambiarContrasena"]);
$router->put("/api/usuario/actualizar", [AuthController::class, "actualizarDatos"]);

// API Reserva Cliente
$router->post('/api/reserva/crear', [ReservaController::class, 'registrar']);
$router->post('/api/reserva/actualizar', [ReservaController::class, 'actualizar']);
$router->post('/api/reserva/cancelar', [ReservaController::class, 'cancelar']);
$router->put('/api/reservas/marcar-llegada/{id}', [ReservaController::class, 'marcarLlegada']);
$router->get('/api/reserva/activa', [ReservaController::class, 'reservaActiva']);
$router->delete('/api/reserva/cancelar', [ReservaController::class, 'cancelar']);


//API Reserva Admin
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
$router->get('/api/stock/{id}', [StockController::class, 'obtenerPorId']);
$router->get('/api/stock', [StockController::class, 'obtener']);
$router->post('/api/stock/registrar', [StockController::class, 'registrar']);
$router->put('/api/stock/modificar/{id}', [StockController::class, 'modificar']);
$router->delete('/api/stock/eliminar/{id}', [StockController::class, 'eliminar']);

// API EmpleadoController
$router->get("/api/empleado/obtener", [EmpleadoController::class, "obtenerEmpleados"]);
$router->get("/api/exportar-usuarios", [EmpleadoController::class, "exportarUsuarios"]);
$router->post("/api/empleado/registrar", [EmpleadoController::class, "registrarEmpleado"]);
$router->delete("/api/empleado/desactivar/{id}", [EmpleadoController::class, "desactivarEmpleado"]);
$router->get("/api/empleado/obtener/{id}", [EmpleadoController::class, "obtenerPorID"]);
$router->put("/api/empleado/modificar/{id}", [EmpleadoController::class, "modificarEmpleado"]);


//API Gestión de Platos
$router->get('/api/productos-menu', [PlatoController::class, 'obtenerPlatos']);
$router->get('/api/productos-menu/{id}', [PlatoController::class, 'obtenerPorId']);
$router->post('/api/productos-menu', [PlatoController::class, 'crearPlato']);
$router->put('/api/productos-menu/{id}', [PlatoController::class, 'actualizarPlato']);
$router->delete('/api/productos-menu/desactivar/{id}', [PlatoController::class, 'desactivarPlato']);

// API Historial de Cambios

$router->get("/api/gestion/historial", [HistorialController::class, "obtenerHistorial"]);
$router->post("/api/gestion/restaurar", [HistorialController::class, "restaurarCambio"]);
$router->get("/api/gestion/exportar-historial", [HistorialController::class, "exportarHistorial"]);

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
