<?php

namespace App\Controllers;

use App\Models\Reserva;
use App\Services\ControllerService;
use DateTime;
use Exception;

class ReservaController {

    public function obtenerReservas($router) {
        try {
            $reservas = ControllerService::handlerErrorConexion(
                fn() => Reserva::obtenerReservas()
            );

            return ["success" => true, "message" => "Reservas obtenidas correctamente", "data" => $reservas];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor", "data" => []];
        }
    }

    public function obtenerPorID($router, $params) {
        $id = $params["id"];
        try {
            $reserva = ControllerService::handlerErrorConexion(fn() => Reserva::buscarPorId($id));
            if (!$reserva) {
                return ["success" => false, "message" => "Reserva no encontrada"];
            }

            return [
                "success" => true,
                "message" => "Reserva obtenida con éxito",
                "data" => $reserva
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor", "data" => []];
        }
    }

    public function registrar($router): array {
        try {
            $datos = json_decode(file_get_contents("php://input"), true);
            $usuario_id = $_SESSION["usuario_id"] ?? null;
            $fechaHora = $datos["fechaHora"] ?? "";
            $cantidadPersonas = $datos["cantidadPersonas"] ?? "";
            $estado = $datos["estado"] ?? "Pendiente";

            if (empty($usuario_id) || empty($fechaHora) || empty($cantidadPersonas)) {
                http_response_code(400);
                return ["success" => false, "message" => "Faltan datos obligatorios"];
            }

            $reserva = new Reserva($usuario_id, $fechaHora, (int)$cantidadPersonas, $estado);
            $resultado = ControllerService::handlerErrorConexion(fn() => $reserva->registrarReserva());

            return $resultado
                ? ["success" => true, "message" => "Reserva registrada correctamente"]
                : ["success" => false, "message" => "Error al registrar la reserva"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

  


public function desactivarReserva($router, $params) {
    try {
        $id = $params["id"];

        $resultado = ControllerService::handlerErrorConexion(
            fn() => Reserva::actualizarActividad($id, false)
        );

        return $resultado
            ? ["success" => true, "message" => "Reserva desactivada correctamente."]
            : ["success" => false, "message" => "Error al desactivar la reserva."];
    } catch (Exception $e) {
        http_response_code(500);
        return ["success" => false, "message" => "Error interno del servidor"];
    }
}




}
