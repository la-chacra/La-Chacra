<?php
ini_set('display_errors', 1);
error_reporting(E_ALL); // reportar todos los errores

require dirname(__DIR__) . '/vendor/autoload.php';

use Config\Database;
use App\Models\ModeloBase;
use App\Models\Administrador;

echo "hola";

$db = new Database();

ModeloBase::setDB($db);

// Testing
// $admin = new Administrador("Kehian", "Martins", "asdasd@gmail.com", "9asdkas", "1987-03-20");

// $admin->registrar();

// echo $admin->get_id();

