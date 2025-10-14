<?php 

namespace App\Controllers;

use App\Models\Insumo;
use App\Models\Enums\Categoria;
use App\Services\ControllerService;
use Exception;

/**
 * Controlador para la gestión de insumos en el stock.
 *
 * Proporciona métodos para agregar, eliminar, actualizar información, cantidad y estado de insumos,
 * así como para obtener todos los registros del inventario. Cada método recibe datos en formato JSON
 * desde la entrada estándar y utiliza servicios auxiliares para interactuar con la base de datos y
 * manejar posibles errores de conexión.
 *
 * Métodos:
 * - agregar($router): Agrega un nuevo insumo al stock.
 * - eliminar($router): Elimina un insumo del stock por nombre (implementación pendiente).
 * - actualizar($router): Actualiza la información de un insumo existente.
 * - actualizarCantidad($router): Actualiza la cantidad de un insumo específico.
 * - actualizarEstado($router): Actualiza el estado de actividad de un insumo.
 * - obtenerRegistros($router): Obtiene todos los registros de insumos del inventario.
 *
 * @package App\Controllers
 */
class StockController {

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**
     * Agrega un nuevo insumo al stock.
     *
     * Este método recibe los datos de un insumo en formato JSON desde la entrada estándar,
     * los decodifica y crea una instancia de la clase Insumo con dichos datos. Luego,
     * intenta registrar el insumo en la base de datos utilizando el método registrarInsumo().
     * Si el registro es exitoso, retorna un arreglo con éxito y el ID del insumo registrado;
     * en caso contrario, retorna un mensaje de error.
     *
     * @param mixed $router Instancia del router (no utilizada directamente en este método).
     * @return array Arreglo asociativo con el resultado de la operación, incluyendo éxito, mensaje y datos adicionales.
     */
    public function agregar($router) {
        $datos = json_decode(file_get_contents("php://input"), true);
        
        $nombre = $datos["nombre"] ?? "";
        $categoria = $datos["categoria"] ?? Categoria::SinValor->value;
        $cantidad = $datos["cantidad"] ?? 0;
        $cantidadMinima = $datos["cantidadMinima"] ?? 1;
        $unidad = $datos["unidad"];
        $precioUnitario = $datos["precio_unitario"];

        $insumo = new Insumo(
            $nombre,
            $categoria,
            $cantidad,
            $cantidadMinima,
            $unidad,
            $precioUnitario
        );

        try {
            $resultado = ControllerService::handlerErrorConexion(fn() => $insumo->registrarInsumo());
            
            if($resultado) {
                return [
                "success" => true,
                "message" => "Insumo registrado con éxito",
                "data" => ["insumo_id" => $insumo->getInsumoId()]
                ];
            }
        } catch(Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    /**
     * Elimina un elemento de stock basado en su ID.
     *
     * @param mixed $router Instancia del router para manejar la solicitud.
     * @return array Arreglo asociativo con el resultado de la operación, incluyendo éxito.
     */
    public function eliminar($router) {
        $datos = json_decode(file_get_contents("php://input"), true);
    }

    /**
     * Actualiza la información de un insumo existente.
     *
     * Este método recibe los datos del insumo a actualizar a través de una petición JSON,
     * busca el insumo por su ID, y actualiza sus campos con los valores proporcionados o,
     * en su defecto, mantiene los valores existentes. Posteriormente, intenta guardar los
     * cambios en la base de datos y retorna una respuesta indicando el éxito o fallo de la operación.
     *
     * @param mixed $router Instancia del router (no utilizada directamente en este método).
     * @return array Retorna un arreglo asociativo con las claves 'success' (bool) y 'message' (string)
     *               indicando el resultado de la actualización.
     */
    public function actualizar($router) {
        $datos = json_decode(file_get_contents("php://input"), true);
        
        $insumo_id = $datos["insumo_id"];

        if(empty($insumo_id) || !is_int($insumo_id)) {
            http_response_code(400);
            return ["success" => false, "message" => "Error, datos faltantes o inválidos"];
        }

        $insumoExistente = Insumo::encontrarPorID($insumo_id);

        if(empty($insumoExistente)) {
            http_response_code(400);
            return ["success" => false, "message" => "No se encontró el insumo a actualizar"];
        }

        $nombre = $datos["nombre"] ?? $insumoExistente["nombre"];
        $categoria = $datos["categoria"] ?? $insumoExistente["categoria"];
        $cantidad = $insumoExistente["cantidad"];
        $cantidadMinima = $datos["cantidadMinima"] ?? $insumoExistente["cantidad_minima"];
        $unidad = $datos["unidad"] ?? $insumoExistente["unidad"];
        $precioUnitario = $datos["precioUnitario"] ?? $insumoExistente["precio_unitario"];

        if(
            empty($nombre) 
            || empty($categoria) 
            || empty($cantidad) 
            || empty($cantidadMinima) 
            || empty($unidad) 
            || empty($precioUnitario)
            ) {
            http_response_code(400);
            return ["success" => false, "message" => "Error, datos faltantes o inválidos"];
        }
        
        $insumo = new Insumo(
            $nombre,
            $categoria,
            $cantidad,
            $cantidadMinima,
            $unidad,
            $precioUnitario
        );

        $insumo->setInsumoId($insumo_id);

        try {
            $resultado = ControllerService::handlerErrorConexion(fn() => $insumo->actualizarInsumo());

            if($resultado) {
                return ["success" => true, "message" => "Insumo actualizado con éxito"];
            }
        } catch(Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    /**
     * Actualiza la cantidad de un insumo específico.
     *
     * Este método recibe una solicitud JSON con los campos 'insumo_id' y 'cantidad',
     * valida que ambos estén presentes, y luego intenta actualizar la cantidad del insumo
     * utilizando el método Insumo::actualizarCantidad. Si la actualización es exitosa,
     * retorna un mensaje de éxito; de lo contrario, retorna un mensaje de error.
     *
     * @param mixed $router Instancia del router (no utilizado en el método).
     * @return array Resultado de la operación con las claves 'success' y 'message'.
     */
    public function actualizarCantidad($router) {
        $datos = json_decode(file_get_contents("php://input"), true);

        $insumo_id = $datos["insumo_id"];
        $cantidad = $datos["cantidad"];

        if(empty($insumo_id) || empty($cantidad)) {
            http_response_code(400);
            return ["success" => false, "message" => "Datos faltantes o inválidos"];
        }

        try {
            $resultado = ControllerService::handlerErrorConexion(
                fn() => Insumo::actualizarCantidad(
                    $insumo_id,
                    $cantidad
                )
            );

            if($resultado) {
                return ["success" => true, "message" => "Cantidad actualizada con éxito"];
            }
        } catch(Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    /**
     * Actualiza el estado de actividad de un insumo.
     *
     * Recibe datos en formato JSON desde la entrada estándar, incluyendo el ID del insumo y el nuevo estado.
     * Valida que ambos datos estén presentes. Si faltan, retorna un mensaje de error.
     * Utiliza el servicio ControllerService para manejar posibles errores de conexión al actualizar el estado
     * mediante el método Insumo::actualizarActividad.
     *
     * @param mixed $router Instancia del router (no utilizada en este método).
     * @return array Retorna un arreglo asociativo con la clave 'success' indicando el resultado de la operación
     *               y 'message' con el mensaje correspondiente.
     */
    public function actualizarEstado($router) {
        $datos = json_decode(file_get_contents("php://input"), true);

        $insumo_id = $datos["insumo_id"];
        $activo = $datos["estado"];

        if(empty($insumo_id) || empty($activo)) {
            http_response_code(400);
            return ["success" => false, "message" => "Datos faltantes"];
        }

        try {
            $resultado = ControllerService::handlerErrorConexion(
                fn() => Insumo::actualizarActividad(
                    $insumo_id,
                    $activo
                )
            );
        
            if($resultado) {
                return ["success" => true, "message" => "Estado actualizado con éxito"];
            }
        } catch(Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }


    /**
     * Obtiene todos los registros de insumos del inventario.
     *
     * Este método utiliza el servicio ControllerService para manejar posibles errores de conexión
     * al intentar recuperar todos los insumos mediante el método Insumo::traerTodos().
     * Si no se obtienen insumos, retorna un arreglo indicando el error.
     * Si se obtienen insumos, los procesa y retorna un arreglo con los datos estructurados.
     *
     * @param mixed $router Instancia del router (no utilizada en este método).
     * @return array [
     *     'success' => bool,   -> Indica si la operación fue exitosa.
     *     'message' => string, -> Mensaje descriptivo del resultado.
     *     'data' => array      -> Arreglo de insumos obtenidos o vacío en caso de error.
     * ]
     */
    public function obtenerRegistros($router) {
        try  {
            $inventario = ControllerService::handlerErrorConexion(fn() => Insumo::traerTodos());
        } catch(Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if(empty($inventario)) {
            return ["success" => false, "message" => "Error obteniendo insumos.", "data" => []];
        }

        $datos = [];

        foreach($inventario as $insumo) {
            array_push(
                $datos,
                [
                    "insumo_id" => $insumo["insumo_id"],
                    "nombre" => $insumo["nombre"],
                    "categoria" => $insumo["categoria"],
                    "unidad" => $insumo["unidad"],
                    "cantidad" => $insumo["cantidad"],
                    "precioUnitario" => $insumo["precioUnitario"],
                    "cantidad_minima" => $insumo["cantidad_minima"]
                ]
            );
        }
        
        return ["success" => true, "message" => "Inventario obtenido con éxito", "data" => $datos];
    }
}
