<?php

namespace App\Controllers;

use App\Models\Insumo;
use App\Models\Enums\Categoria;
use App\Services\ControllerService;
use App\Services\ActividadMiddleware; // ← AGREGADO
use Exception;

class StockController {

    public function obtener($router) {
        try {
            $insumos = ControllerService::handlerErrorConexion(fn() => Insumo::traerTodos());
            return ["success" => true, "message" => "Insumos obtenidos", "data" => $insumos];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor: " . $e->getMessage()];
        }
    }

    public function registrar($router) {
        try {
            $datos = json_decode(file_get_contents("php://input"), true);

            if (
                empty($datos["nombre"]) ||
                empty($datos["categoria"]) ||
                !isset($datos["cantidad"]) ||
                !isset($datos["cantidad_minima"]) ||
                empty($datos["unidad"]) ||
                !isset($datos["precio_unitario"])
            ) {
                http_response_code(400);
                return ["success" => false, "message" => "Faltan datos obligatorios"];
            }

            $insumo = new Insumo(
                $datos["nombre"],
                $datos["categoria"],
                floatval($datos["cantidad"]),
                floatval($datos["cantidad_minima"]),
                $datos["unidad"],
                floatval($datos["precio_unitario"])
            );

            $resultado = ControllerService::handlerErrorConexion(fn() => $insumo->registrarInsumo());

            if ($resultado) {
                $nuevo = Insumo::encontrarPorID($insumo->getInsumoId());
                ActividadMiddleware::cambioStock(
                    null,                                  // antes
                    $nuevo ? $nuevo[0] : null,             // después
                    $_SESSION["usuario_id"],
                    $nuevo ? $nuevo[0]["insumo_id"] : null
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Insumo registrado correctamente"]
                : ["success" => false, "message" => "Error al registrar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno: " . $e->getMessage()];
        }
    }

    public function modificar($router, $params) {
        try {
            $id = intval($params["id"]);
            $datos = json_decode(file_get_contents("php://input"), true);

            // ANTES
            $antes = Insumo::encontrarPorID($id);
            $antes = $antes ? $antes[0] : null;

            $insumo = new Insumo(
                $datos["nombre"],
                $datos["categoria"],
                floatval($datos["cantidad"]),
                floatval($datos["cantidad_minima"]),
                $datos["unidad"],
                floatval($datos["precio_unitario"])
            );

            $insumo->setInsumoId($id);

            $resultado = ControllerService::handlerErrorConexion(fn() => $insumo->actualizarInsumo());

            if ($resultado) {
                // DESPUÉS
                $despues = Insumo::encontrarPorID($id);
                $despues = $despues ? $despues[0] : null;

                ActividadMiddleware::cambioStock(
                    $antes,
                    $despues,
                    $_SESSION["usuario_id"],
                    $id
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Insumo actualizado correctamente"]
                : ["success" => false, "message" => "No se pudo actualizar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno: " . $e->getMessage()];
        }
    }

    public function eliminar($router, $params) {
        try {
            $id = intval($params["id"]);

            // ANTES
            $antes = Insumo::encontrarPorID($id);
            $antes = $antes ? $antes[0] : null;

            $resultado = ControllerService::handlerErrorConexion(fn() => Insumo::actualizarActividad($id, false));

            if ($resultado) {
                // DESPUÉS
                $despues = Insumo::encontrarPorID($id);
                $despues = $despues ? $despues[0] : null;

                ActividadMiddleware::cambioStock(
                    $antes,
                    $despues,
                    $_SESSION["usuario_id"],
                    $id
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Insumo eliminado correctamente"]
                : ["success" => false, "message" => "No se pudo eliminar el insumo"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno: " . $e->getMessage()];
        }
    }

    public function obtenerPorId($router, $params) {
        try {
            $id = intval($params["id"]);
            $insumo = ControllerService::handlerErrorConexion(fn() => Insumo::encontrarPorID($id));

            if (empty($insumo)) {
                return ["success" => false, "message" => "Producto no encontrado"];
            }

            return ["success" => true, "data" => $insumo[0]];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno: " . $e->getMessage()];
        }
    }
}

