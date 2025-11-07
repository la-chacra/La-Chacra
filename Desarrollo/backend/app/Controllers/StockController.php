<?php

namespace App\Controllers;

use App\Models\Insumo;
use App\Models\Enums\Categoria;
use App\Services\ControllerService;
use Exception;

class StockController
{
    /**
     * Obtener todos los insumos activos
     */
    public function obtenerInsumos($router)
    {
        try {
            // Solo insumos activos
            $insumos = ControllerService::handlerErrorConexion(fn() => Insumo::traerTodos("activo = 1"));

            return [
                "success" => true,
                "message" => "Insumos obtenidos con éxito",
                "data" => $insumos
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno del servidor",
                "data" => []
            ];
        }
    }

    /**
     * Obtener un insumo por ID
     */
    public static function obtenerPorID($router, $params)
    {
        $id = $params["id"];

        try {
            $insumo = ControllerService::handlerErrorConexion(fn() => Insumo::encontrarPorID($id));

            if (!$insumo) {
                http_response_code(404);
                return ["success" => false, "message" => "Insumo no encontrado"];
            }

            return [
                "success" => true,
                "message" => "Insumo obtenido con éxito",
                "data" => $insumo[0]
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno del servidor"
            ];
        }
    }

    /**
     * Registrar un nuevo insumo
     */
    public function registrarInsumo($router)
    {
        try {
            $datos = json_decode(file_get_contents("php://input"), true);

            $nombre          = $datos["nombre"] ?? "";
            $categoriaStr    = $datos["categoria"] ?? "";
            $cantidad        = $datos["cantidad"] ?? 0;
            $cantidadMinima  = $datos["cantidad_minima"] ?? 0;
            $unidad          = $datos["unidad"] ?? "";
            $precioUnitario  = $datos["precio_unitario"] ?? 0;

            if (
                empty($nombre) ||
                empty($categoriaStr) ||
                empty($unidad)
            ) {
                http_response_code(400);
                return ["success" => false, "message" => "Faltan datos obligatorios"];
            }

            // Convertir categoría de string a enum
            $categoria = Categoria::from($categoriaStr);

            $insumo = new Insumo(
                $nombre,
                $categoria,
                $cantidad,
                $cantidadMinima,
                $unidad,
                $precioUnitario
            );

            $resultado = ControllerService::handlerErrorConexion(fn() => $insumo->registrarInsumo());

            return $resultado
                ? ["success" => true, "message" => "Insumo registrado correctamente"]
                : ["success" => false, "message" => "Error al registrar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno del servidor"
            ];
        }
    }

    /**
     * Modificar un insumo existente
     */
    public function modificarInsumo($router, $params)
    {
        $id = $params["id"];
        $datos = json_decode(file_get_contents("php://input"), true);

        try {
            $nombre          = $datos["nombre"] ?? "";
            $categoriaStr    = $datos["categoria"] ?? "";
            $cantidad        = $datos["cantidad"] ?? 0;
            $cantidadMinima  = $datos["cantidad_minima"] ?? 0;
            $unidad          = $datos["unidad"] ?? "";
            $precioUnitario  = $datos["precio_unitario"] ?? 0;

            $categoria = Categoria::from($categoriaStr);

            $insumo = new Insumo(
                $nombre,
                $categoria,
                $cantidad,
                $cantidadMinima,
                $unidad,
                $precioUnitario
            );
            $insumo->setInsumoId($id);

            $resultado = ControllerService::handlerErrorConexion(fn() => $insumo->actualizarInsumo());

            return $resultado
                ? ["success" => true, "message" => "Insumo actualizado con éxito"]
                : ["success" => false, "message" => "No se pudo actualizar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno del servidor"
            ];
        }
    }

    /**
     * Desactivar (borrado lógico) un insumo
     */
    public function desactivarInsumo($router, $params)
    {
        try {
            $id = $params["id"];
            $resultado = ControllerService::handlerErrorConexion(fn() => Insumo::actualizarActividad($id, false));

            return $resultado
                ? ["success" => true, "message" => "Insumo desactivado correctamente"]
                : ["success" => false, "message" => "Error al desactivar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno del servidor"
            ];
        }
    }

    /**
     * Activar un insumo desactivado (opcional)
     */
    public function activarInsumo($router, $params)
    {
        try {
            $id = $params["id"];
            $resultado = ControllerService::handlerErrorConexion(fn() => Insumo::actualizarActividad($id, true));

            return $resultado
                ? ["success" => true, "message" => "Insumo activado correctamente"]
                : ["success" => false, "message" => "Error al activar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno del servidor"
            ];
        }
    }
}
