<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require dirname(__DIR__) . '/vendor/autoload.php';

use Config\Database;
use App\Models\ModeloBase;

$db = new Database();

ModeloBase::setDB($db);

