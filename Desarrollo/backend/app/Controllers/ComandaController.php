<?php

namespace App\Controllers;

use App\Models\Comanda;
use App\Models\Enums\EstadoComanda;
use DateTime;

class ComandaController {

    /**
     * Crea una nueva comanda.
     *
     * @param Router $router Instancia del router para manejar la solicitud.
     * @return void
     */
    public function crear($router) {
        $datos = json_decode(file_get_contents("php://input"), true);
        date_default_timezone_set('America/Montevideo');

        $nMesa = $datos["nMesa"] ?? 0;
        $nPersonas = $datos["nPersonas"] ?? 1;
        $estado = $datos["estado"] ?? EstadoComanda::EnProceso->value;
        $nota = $datos["nota"] ?? "";
        $fecha = date("Y-m-d H:i:s");

        $comanda = new Comanda(
            $nMesa,
            $nPersonas, 
            $estado,
            $nota,
            $fecha
        );

        $resultado = $comanda->registrarComanda();

        $intentos = 0;
        $maxIntentos = 5;
        $exito = false;

        if(!$resultado) {

        }

        return $resultado ? ["success" => true, "mensaje" => "Comanda creada correctamente"] : ["success" => false, "message" => "Error al crear comanda"];
    }

/**
 * Actualiza una comanda existente según el ID, y si tiene tiempo.
 *
 * @param Router $router Instancia del router para manejar la solicitud y respuesta.
 * @param int $id Identificador único de la comanda a actualizar.
 * @return void
 */
public function actualizar($router, $comanda_id) {
    $datos = json_decode(file_get_contents("php://input"), true);

    $comandaExistente = Comanda::encontrarPorID($comanda_id);
    if (!$comandaExistente) {
        http_response_code(404);
        echo json_encode(["error" => "Comanda no encontrada"]);
        return;
    }

    $fechaCreacion = new DateTime($comandaExistente["fecha"]);
    $ahora = new DateTime();
    $diferencia = $ahora->getTimestamp() - $fechaCreacion->getTimestamp();

    if ($diferencia > 300) { // 300s = 5m
        http_response_code(403);
        echo json_encode(["error" => "Pasaron mas de 5m"]);
        return;
    }

    $comanda = new Comanda([
        "comanda_id"   => $comanda_id,
        "n_mesa"       => $datos["n_mesa"] ?? $comandaExistente["n_mesa"],
        "n_personas"   => $datos["n_personas"] ?? $comandaExistente["n_personas"], 
        "estado"       => $datos["estado"] ?? $comandaExistente["estado"],
        "nota"         => $datos["nota"] ?? $comandaExistente["nota"],
        "fecha"        => $comandaExistente["fecha"]
    ]);

    $resultado = $comanda->modificarComanda();

    echo json_encode([
        "mensaje" => $resultado ? "Comanda actualizada correctamente" : "Error al actualizar comanda"
    ]);
}

}