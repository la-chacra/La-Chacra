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
        $cantidad = $datos["cantidad"] ?? 0;
        $cantidadMinima = $datos["cantidadMinima"] ?? 1;
        $unidad = $datos["unidad"] ?? "";
        $precioUnitario = $datos["precioUnitario"] ?? 0.0;

        $insumo = new Insumo(
            $nombre,
            $categoria,
            $cantidad,
            $cantidadMinima,
            $unidad,
            $precioUnitario
        );

       $resultado = $insumo->eliminarInsumo();
        return $resultado 
            ? [
                "success" => true, 
                "message" => "Insumo eliminado correctamente", 
                "data" => [
                    "insumo_id" => $insumo->getInsumoId()
                ]
              ]
            : ["success" => false, "message" => "Error al eliminar insumo"];
    
        
    }

    public function actualizar($router) {

        $datos = json_decode(file_get_contents("php://input"), true);
        $insumo_id = $datos["insumo_id"];
        $insumoExistente = Insumo::encontrarPorID($insumo_id);

    }
}
