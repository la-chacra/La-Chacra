<?php

namespace App\Controllers;

use App\Models\EstadoReserva;
use App\Models\Reserva;

class ReservaController {

    /**
     * Registrar una reserva en la base de datos.
     * Método del controlador que obtiene los datos enviados del frontend y valida si están vacios. Obtiene
     * la ID del usuario actual en sesión y valida si está vacio. Valida si el estado obtenido coincide con
     * algunos de los estados de reserva predefinidos. En caso de pasar validaciones, registra la reserva en
     * la base de datos.
     * 
     * @param $router El enrutador
     * @return array Retorna un arreglo de respuesta para el frontend que luego el Router transforma en JSON.
     */
    public function registrar($router): array {

        $datos = json_decode(file_get_contents("php://input"), true);
        $fechaHora = $datos["fechaHora"] ?? "";
        $cantidadPersonas = $datos["cantidadPersonas"] ?? "";
        $estado = $datos["estado"] ?? "";

        if (empty($fechaHora) || empty($cantidadPersonas) || empty($estado)) {
            return ["success" => false, "message" => "Faltan datos obligatorios"];
        }
        
        $usuario_id = $_SESSION["usuario_id"];

        if(empty($usuario_id)) {
            return ["success" => false, "message" => "Error de sesión."];
        }

        if($estado != EstadoReserva::CANCELADA || $estado != EstadoReserva::CONFIRMADA || $estado != EstadoReserva::PENDIENTE || $estado != EstadoReserva::FINALIZADA) {
            return ["success" => false, "message" => "Error en el estado de reserva."];
        }

        // Crear instancia del modelo Reserva
        $reserva = new Reserva(
            $usuario_id,
            $fechaHora,
            $cantidadPersonas,
            $estado ?? EstadoReserva::CONFIRMADA,
        );

        // Registrar en BD
        $resultado = $reserva->registrarReserva();
        
        return $resultado ? ["success" => true, "message" => "Reserva registrada correctamente"] : ["success" => false, "message" => "Error al registrar la reserva"];
    }

    /**
     * @todo @mateoparentini @kehianmartins Funcion de Cancelar reserva.
     */
    public function cancelar($router) :  array {
        $datos = json_decode(file_get_contents("php://input"), true);
        $reserva_id = $datos["reserva_id"] ?? null;

        $reserva = Reserva::buscarPorId($reserva_id);
        if (!$reserva) {
            return ["success" => false, "message" => "Reserva no encontrada."];
        }

        $reserva->setEstado(EstadoReserva::CANCELADA);
        $resultado = $reserva->actualizarDatos();

        return $resultado
            ? ["success" => true, "message" => "Reserva cancelada correctamente."]
            : ["success" => false, "message" => "No se pudo cancelar la reserva."];
    }
    /**
     * @todo @mateoparentini @kehianmartins Funcion de Actualizar reserva.
     */
    public function actualizar($router) :  array {
        $datos = json_decode(file_get_contents("php://input"), true);
        $reserva_id = $datos["reserva_id"] ?? null;
        $fechaHora = $datos["fechaHora"] ?? null;
        $cantidadPersonas = $datos["cantidadPersonas"] ?? null;
        $estado = $datos["estado"] ?? null;

        if (empty($reserva_id) || empty($fechaHora) || empty($cantidadPersonas) || empty($estado)) {
            return ["success" => false, "message" => "Faltan datos obligatorios para actualizar la reserva."];
        }

        $reserva = Reserva::buscarPorId($reserva_id);
        if (!$reserva) {
            return ["success" => false, "message" => "Reserva no encontrada."];
        }

        $reserva->setFechaHora($fechaHora);
        $reserva->setCantPersonas((int)$cantidadPersonas);
        $reserva->setEstado($estado);
        $resultado = $reserva->actualizarDatos();

        return $resultado
            ? ["success" => true, "message" => "Reserva actualizada correctamente."]
            : ["success" => false, "message" => "No se pudo actualizar la reserva."];
    }

}


