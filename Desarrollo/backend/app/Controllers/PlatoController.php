<?php

namespace App\Controllers;

use App\Models\Plato;
use App\Services\ControllerService;
use App\Services\ActividadMiddleware;
use Exception;

class PlatoController
{
    /**
     * Obtiene todos los platos
     */
    public function obtenerPlatos($router)
    {
        try {
            $platos = Plato::obtenerTodos();

            foreach ($platos as &$plato) {
                if (isset($plato['ingredientes']) && is_string($plato['ingredientes'])) {
                    $plato['ingredientes'] = json_decode($plato['ingredientes'], true);
                }
            }

            return [
                "success" => true,
                "data" => $platos
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error al obtener los platos: " . $e->getMessage()
            ];
        }
    }

    /**
     * Obtiene plato por la id 
     */
    public function obtenerPorId($router, $params): array
    {
        $id = (int)$params["id"];
        try {
            $plato = ControllerService::handlerErrorConexion(fn() => Plato::buscarPorId($id));

            if (!$plato) {
                http_response_code(404);
                return ["success" => false, "message" => "Plato no encontrado."];
            }

            if (isset($plato['ingredientes']) && is_string($plato['ingredientes'])) {
                $plato['ingredientes'] = json_decode($plato['ingredientes'], true);
            }

            return ["success" => true, "data" => $plato];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error al buscar el plato."];
        }
    }

    /**
     * Crea nuevo plato
     */
    public function crearPlato($router): array
    {
        try {
            $nombre = $_POST["nombre"] ?? "";
            $precio = $_POST["precio"] ?? 0;
            $ingredientes = json_decode($_POST["ingredientes"] ?? "[]", true);
            $categoria = $_POST["categoria"] ?? "";
            $disponibilidad = $_POST["disponibilidad"] ?? true;
            $activo = $_POST["activo"] ?? true;

            if (empty($nombre) || empty($categoria) || $precio <= 0) {
                http_response_code(400);
                return ["success" => false, "message" => "Datos incompletos."];
            }

            // Imagen
            $imagenUrl = null;
            if (!empty($_FILES["imagen"]["name"])) {
                $nombreArchivo = uniqid("plato_") . "_" . basename($_FILES["imagen"]["name"]);
                $rutaDestino = __DIR__ . "/../../public/img/platos/" . $nombreArchivo;
                move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino);
                $imagenUrl = "/img/platos/" . $nombreArchivo;
            }

            $plato = new Plato(
                $nombre,
                $precio,
                $ingredientes,
                $categoria,
                $disponibilidad,
                $activo,
                $imagenUrl
            );

            $resultado = ControllerService::handlerErrorConexion(fn() => $plato->registrarPlato());

            if ($resultado) {
                // Obtener plato recién creado
                $nuevoPlato = Plato::buscarPorId($plato->getProductoId());

                ActividadMiddleware::cambioPlato(
                    null,
                    $nuevoPlato,
                    $_SESSION["usuario_id"],
                    $nuevoPlato["producto_id"],
                    "Registro de nuevo plato"
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Plato registrado correctamente."]
                : ["success" => false, "message" => "Error al registrar el plato."];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor: " . $e->getMessage()];
        }
    }

    /**
     * Actualiza plato
     */    
    public function actualizarPlato($router, $params): array
    {
        $id = (int)$params["id"];

        try {
            $platoExistente = Plato::buscarPorId($id);
            if (!$platoExistente) {
                http_response_code(404);
                return ["success" => false, "message" => "Plato no encontrado."];
            }

            // Estado ANTES
            $antes = $platoExistente;

            $nombre = $_POST["nombre"] ?? $platoExistente["nombre"];
            $precio = $_POST["precio"] ?? $platoExistente["precio"];
            $categoria = $_POST["categoria"] ?? $platoExistente["categoria"];
            $disponibilidad = isset($_POST["disponibilidad"])
                ? filter_var($_POST["disponibilidad"], FILTER_VALIDATE_BOOLEAN)
                : $platoExistente["disponibilidad"];
            $activo = isset($_POST["activo"])
                ? filter_var($_POST["activo"], FILTER_VALIDATE_BOOLEAN)
                : $platoExistente["activo"];

            $ingredientesRaw = $_POST["ingredientes"] ?? "[]";

            if (is_string($ingredientesRaw)) {
                $ingredientes = json_decode($ingredientesRaw, true);
                if (!is_array($ingredientes)) {
                    $ingredientes = array_map("trim", explode(",", $ingredientesRaw));
                }
            } elseif (is_array($ingredientesRaw)) {
                $ingredientes = $ingredientesRaw;
            } else {
                $ingredientes = [];
            }

            $imagenUrl = $platoExistente["imagen_url"] ?? null;
            if (!empty($_FILES["imagen"]["name"])) {
                $nombreArchivo = uniqid("plato_") . "_" . basename($_FILES["imagen"]["name"]);
                $rutaDestino = __DIR__ . "/../../public/img/platos/" . $nombreArchivo;
                move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino);
                $imagenUrl = "/img/platos/" . $nombreArchivo;
            }

            $plato = new Plato(
                $nombre,
                $precio,
                $ingredientes,
                $categoria,
                $disponibilidad,
                $activo,
                $imagenUrl
            );
            $plato->setProductoId($id);

            $resultado = ControllerService::handlerErrorConexion(fn() => $plato->actualizarPlato());

            if ($resultado) {
                // Estado DESPUÉS
                $despues = Plato::buscarPorId($id);

                ActividadMiddleware::cambioPlato(
                    $antes,
                    $despues,
                    $_SESSION["usuario_id"],
                    $id,
                    "Modificación de plato"
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Plato actualizado correctamente."]
                : ["success" => false, "message" => "No se pudo actualizar el plato."];

        } catch (Exception $e) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Error interno al actualizar: " . $e->getMessage()
            ];
        }
    }

    /**
     * Desactivar plato
     */   
    public function desactivarPlato($router, $params): array
    {
        $id = (int)$params["id"];

        try {
            // Estado ANTES
            $antes = Plato::buscarPorId($id);

            $resultado = ControllerService::handlerErrorConexion(
                fn() => Plato::actualizarActividad($id, false)
            );

            if ($resultado) {
                // Estado DESPUÉS
                $despues = Plato::buscarPorId($id);

                ActividadMiddleware::cambioPlato(
                    $antes,
                    $despues,
                    $_SESSION["usuario_id"],
                    $id,
                    "Desactivación de plato"
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Plato desactivado correctamente."]
                : ["success" => false, "message" => "No se pudo desactivar el plato."];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno al desactivar plato."];
        }
    }
}
