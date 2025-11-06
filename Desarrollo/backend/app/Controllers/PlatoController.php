<?php

namespace App\Controllers;

use App\Models\Plato;
use App\Services\ControllerService;
use Exception;

class PlatoController {

    public function obtenerPlatos($router)
{
    try {
        $platos = Plato::obtenerTodos(); // o el método que uses para traer los platos
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

    // Obtener un plato por ID
    public function obtenerPorId($router, $params): array {
        $id = (int)$params["id"];
        try {
            $plato = ControllerService::handlerErrorConexion(fn() => Plato::buscarPorId($id));
            if (!$plato) {
                http_response_code(404);
                return ["success" => false, "message" => "Plato no encontrado."];
            }
            return ["success" => true, "data" => $plato];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error al buscar el plato."];
        }
    }

    // Crear nuevo plato
    public function crearPlato($router): array {
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

            $imagenUrl = null;
            if (!empty($_FILES["imagen"]["name"])) {
                $nombreArchivo = uniqid("plato_") . "_" . basename($_FILES["imagen"]["name"]);
                $rutaDestino = __DIR__ . "/../../public/img/platos/" . $nombreArchivo;
                move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino);
                $imagenUrl = "/img/platos/" . $nombreArchivo;
            }

            $plato = new Plato($nombre, $precio, $ingredientes, $categoria, $disponibilidad, $activo, $imagenUrl);
            $resultado = ControllerService::handlerErrorConexion(fn() => $plato->registrarPlato());

            return $resultado
                ? ["success" => true, "message" => "Plato registrado correctamente."]
                : ["success" => false, "message" => "Error al registrar el plato."];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor."];
        }
    }

    // Actualizar plato existente
    public function actualizarPlato($router, $params): array {
        $id = (int)$params["id"];
        try {
            $platoExistente = Plato::buscarPorId($id);
            if (!$platoExistente) {
                http_response_code(404);
                return ["success" => false, "message" => "Plato no encontrado."];
            }

            $nombre = $_POST["nombre"] ?? $platoExistente["nombre"];
            $precio = $_POST["precio"] ?? $platoExistente["precio"];
            $ingredientes = json_decode($_POST["ingredientes"] ?? "[]", true);
            $categoria = $_POST["categoria"] ?? $platoExistente["categoria"];
            $disponibilidad = $_POST["disponibilidad"] ?? $platoExistente["disponibilidad"];
            $activo = $_POST["activo"] ?? $platoExistente["activo"];

            $imagenUrl = $platoExistente["imagen_url"];
            if (!empty($_FILES["imagen"]["name"])) {
                $nombreArchivo = uniqid("plato_") . "_" . basename($_FILES["imagen"]["name"]);
                $rutaDestino = __DIR__ . "/../../public/img/platos/" . $nombreArchivo;
                move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino);
                $imagenUrl = "/img/platos/" . $nombreArchivo;
            }

            $plato = new Plato($nombre, $precio, $ingredientes, $categoria, $disponibilidad, $activo, $imagenUrl);
            $plato->setProductoId($id);

            $resultado = ControllerService::handlerErrorConexion(fn() => $plato->actualizarPlato());

            return $resultado
                ? ["success" => true, "message" => "Plato actualizado correctamente."]
                : ["success" => false, "message" => "No se pudo actualizar el plato."];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno al actualizar."];
        }
    }

    // Desactivar plato (no eliminar)
    public function desactivarPlato($router, $params): array {
        $id = (int)$params["id"];
        try {
            $resultado = ControllerService::handlerErrorConexion(fn() => Plato::actualizarActividad($id, false));

            return $resultado
                ? ["success" => true, "message" => "Plato desactivado correctamente."]
                : ["success" => false, "message" => "No se pudo desactivar el plato."];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno al desactivar plato."];
        }
    }
}
