<?php 

namespace App\Controllers;

use App\Models\Insumo;
use DateTime;
use App\Models\Enums\Categoria;

class StockController {

    public function eliminar($router) {
        $datos = json_decode(file_get_contents("php://input"), true);
        $nombre = $datos["nombre"] ?? "";
        $categoria = $datos["categoria"] ?? Categoria::SinValor->value;
        
    }

    public function actualizar($router) {

    }
}
