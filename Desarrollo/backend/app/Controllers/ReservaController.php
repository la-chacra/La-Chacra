<?php

namespace App\Controllers;

use DateTime;
use App\Models\Reserva;
use App\Models\Usuario;
use App\Models\Enums\EstadoReserva;

/**
 * Controlador para gestionar las reservas.
 *
 * Este controlador proporciona métodos para registrar, cancelar, actualizar y obtener registros de reservas.
 * Cada método valida los datos recibidos, interactúa con los modelos correspondientes y retorna una respuesta
 * estructurada para el frontend.
 *
 * Métodos principales:
 * - registrar($router): Registra una nueva reserva validando los datos y el estado.
 * - cancelar($router): Cancela una reserva existente cambiando su estado a "CANCELADA".
 * - actualizar($router): Actualiza los datos de una reserva existente.
 * - obtenerRegistros($router): Obtiene y formatea todos los registros de reservas para su presentación.
 *
 * @package App\Controllers
 */
class ReservaController {

    /**
     * Registrar una reserva en la base de datos.
     * 
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
        $fecha = $datos["fecha"] ?? "";
        $hora = $datos["hora"] ?? "";
        $cantidadPersonas = $datos["cantidadPersonas"] ?? "";
        $estado = EstadoReserva::CONFIRMADA;

        if (empty($fecha) || empty($hora) || empty($cantidadPersonas)) {
            return ["success" => false, "message" => "Faltan datos obligatorios"];
        }
        
        $usuario_id = $_SESSION["usuario_id"];

        if(empty($usuario_id)) {
            return ["success" => false, "message" => "Error de sesión."];
        }

        // Se agrega ":00" para coincidir con el formato de DATETIME de MySQL
        $fechaHora = $fecha . " " . $hora . ":00";

        // Crear instancia del modelo Reserva
        $reserva = new Reserva(
            $usuario_id,
            $fechaHora,
            (int)$cantidadPersonas,
            $estado,
        );

        // Registrar en BD
        $resultado = $reserva->registrarReserva();
        
        return $resultado ? ["success" => true, "message" => "Reserva registrada correctamente"] : ["success" => false, "message" => "Error al registrar la reserva"];
    }

    /**
     * Cancela una reserva existente.
     *
     * Este método recibe un identificador de reserva a través de la entrada JSON,
     * busca la reserva correspondiente y, si existe, cambia su estado a "CANCELADA".
     * Luego, intenta actualizar los datos de la reserva en la base de datos.
     *
     * @param mixed $router Instancia del router (no utilizada en este método).
     * @return array Retorna un arreglo asociativo con la clave 'success' indicando el resultado
     *               y 'message' con un mensaje descriptivo.
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
     * Actualiza los datos de una reserva existente.
     *
     * Este método recibe los datos de la reserva a actualizar a través de una petición JSON,
     * valida que todos los campos obligatorios estén presentes, busca la reserva por su ID,
     * actualiza sus atributos y guarda los cambios en la base de datos.
     *
     * @param mixed $router Instancia del router (no se utiliza en este método, pero se mantiene por compatibilidad).
     * @return array Retorna un arreglo asociativo con la clave 'success' indicando si la operación fue exitosa,
     *               y 'message' con el mensaje correspondiente.
     *
     * Posibles respuestas:
     * - ['success' => false, 'message' => 'Faltan datos obligatorios para actualizar la reserva.']
     * - ['success' => false, 'message' => 'Reserva no encontrada.']
     * - ['success' => false, 'message' => 'No se pudo actualizar la reserva.']
     * - ['success' => true, 'message' => 'Reserva actualizada correctamente.']
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

    /**
     * Obtiene todos los registros de reservas y los formatea para su presentación.
     *
     * @param mixed $router Instancia del router (no se utiliza en el método).
     * @return array Retorna un arreglo asociativo con las siguientes claves:
     *               - 'success': bool, indica si la operación fue exitosa.
     *               - 'message': string, mensaje descriptivo del resultado.
     *               - 'result': array|string, lista de reservas formateadas o cadena vacía si falla.
     *
     * Cada reserva en 'result' contiene:
     *   - 'id': int, identificador de la reserva.
     *   - 'nombre': string, nombre del usuario que realizó la reserva.
     *   - 'correo': string, correo electrónico del usuario.
     *   - 'cantPersonas': int, cantidad de personas en la reserva.
     *   - 'fechaHora': string, fecha y hora formateada de la reserva.
     *   - 'estado': string, estado actual de la reserva.
     *
     * Si no se encuentran reservas, retorna un mensaje de error.
     */
    public function obtenerRegistros($router) {
        $reservas = Reserva::traerTodos();

        if(empty($reserva)) {
            return ["success" => false, "message" => "No se pudo concretar la operación", "result" => ""];
        }

        $datos = [];

        foreach($reservas as $reserva) {

            $usuario = Usuario::encontrarPorID($reserva["usuario_id"]);
            
            $fechaHoy = new DateTime();
            $fechaReserva = new DateTime($reserva["fecha_hora"]);
            
            if($fechaHoy->format("d-m-Y") === $fechaReserva->format("d-m-Y")) {
                $fechaReserva = "hoy, " . $fechaReserva->format("H-i");
            } else {
                $fechaReserva = $fechaReserva->format("m-d") . ", " . $fechaReserva->format("H-i");
            }

            array_push(
                $datos, 
                [
                    "id"           => $reserva["reserva_id"],
                    "nombre"       => $usuario["nombre"],
                    "correo"       => $usuario["correo"],
                    "cantPersonas" => $reserva["cantidad_personas"],
                    "fechaHora"    => $fechaReserva,
                    "estado"       => $reserva["estado"]
                ]
            );
        }

        return ["success" => true, "message" => "Reservas obtenidas con éxito", "result" => $datos];
    }
}


