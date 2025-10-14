<?php 

namespace App\Controllers;

use App\Models\Insumo;
use App\Models\Enums\Categoria;
use App\Services\ControllerService;
use Exception;

class StockController {

    /**
     * Elimina un registro de stock.
     *
     * Recupera los parámetros necesarios (por ejemplo, el identificador del recurso)
     * a través del enrutador/request, valida permisos y existencia del recurso,
     * ejecuta la operación de borrado en el modelo correspondiente y maneja la
     * respuesta (redirección o renderizado de la vista).
     *
     * Este método centraliza las comprobaciones necesarias antes del borrado:
     * - Validación de entrada (ID presente y válido).
     * - Comprobación de permisos/autorización del usuario.
     * - Manejo de errores y mensajes para la interfaz.
     *
     * @param mixed $router Instancia del enrutador o controlador de peticiones que
     *                      proporciona acceso a parámetros de ruta, datos POST/GET
     *                      y utilidades de render/redirección.
     */

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

    /**
     * Acción actualizar para la gestión de stock.
     *
     * Valida los datos de la petición, aplica las reglas de negocio y permisos,
     * actualiza uno o varios registros de stock en la capa de persistencia, y
     * prepara una respuesta apropiada (redirección, JSON o vista renderizada)
     * usando la instancia de router proporcionada.
     *
     * Responsabilidades típicas:
     * - Parsear y validar la entrada (cantidades, identificadores de producto).
     * - Ejecutar las actualizaciones en la base de datos dentro de una transacción cuando proceda.
     * - Registrar los cambios y establecer mensajes flash o mensajes de error visibles al usuario.
     * - Usar el router para generar redirecciones o dirigir a la siguiente acción/vista.
     *
     */
    public function actualizar($router) {

        $datos = json_decode(file_get_contents("php://input"), true);
        $insumo_id = $datos["insumo_id"];
        $insumoExistente = Insumo::encontrarPorID($insumo_id);

        $nombre = $datos["nombre"] ??  $insumoExistente["nombre"];
        $categoria = $datos["categoria"] ?? $insumoExistente["categoria"];
        $cantidad = $datos["cantidad"] ?? $insumoExistente["cantidad"];
        $cantidadMinima = $datos["cantidadMinima"] ?? $insumoExistente["cantidadMinima"];
        $unidad = $datos["unidad"] ?? $insumoExistente["unidad"];
        $precioUnitario = $datos["precioUnitario"] ?? $insumoExistente["precioUnitario"];

        $insumo = new Insumo(
            $nombre,
            $categoria,
            $cantidad,
            $cantidadMinima,
            $unidad,
            $precioUnitario
        );

          $resultado =  $insumo->actualizarDatos();

        return $resultado
            ? ["success" => false, "message" => "Insumos actualizados correctamente"]
            : ["success" => false, "message" => "Error al actualizar los insumos"];
    

    }
}
