<?php
// --- Mostrar errores ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Autoload ---
require_once __DIR__ . '/../vendor/autoload.php';

// --- Importar clases ---
use Config\Database;
use App\Models\ModeloBase;
use App\Models\Usuario;
use App\Controllers\EmpleadoController;

// --- Inicializar la conexión a la base de datos ---
$db = new Database();
ModeloBase::setDB($db);

// --- Pruebas ---
try {
    $usuarios = EmpleadoController::obtenerPorID("si", ["id" => 3]);

    echo "<pre>";
    var_dump($usuarios);
    echo "<hr>";
    echo json_encode($usuarios);
    echo "</pre>";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
