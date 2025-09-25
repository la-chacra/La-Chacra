<?php
ini_set('display_errors', 1);
error_reporting(E_ALL); // reportar todos los errores

require dirname(__DIR__) . '/vendor/autoload.php';

use Router\Router;
use Config\Database;
use App\Models\ModeloBase;
use App\Controllers\LoginController;
use App\Controllers\RegistroController;
use App\Models\Administrador; // remover despues

$router = new Router();

$router->post("/login", [LoginController::class, "login"]);
$router->post("/registro", [RegistroController::class, "login"]);

$router->despachar();

// Testing
// $admin = new Administrador("Kehian", "Martins", "asdasd@gmail.com", "9asdkas", "1987-03-20");

// $admin->registrar();

// echo $admin->get_id();

