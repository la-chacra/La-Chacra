<?php

namespace App\Controllers;

use DateTime;
use App\Models\Comanda;
use App\Models\Enums\EstadoComanda;
use App\Services\ControllerService;

class ComandaController {

    /**
     * Crea una nueva comanda.
     *
     * @param Router $router Instancia del router para manejar la solicitud.
     * @return void
     */
    public function crear($router) {
        $datos = json_decode(file_get_contents("php://input"), true);
        date_default_timezone_set("America/Montevideo");

        $nMesa = $datos["nMesa"] ?? 0;
        $numPersonas = $datos["numPersonas"] ?? 1;
        $estadoString = $datos["estado"];
        $nota = $datos["nota"] ?? "";
        $fecha = date("Y-m-d H:i:s");

        $usuario_id = $_SESSION["usuario_id"];

        $estado = EstadoComanda::tryFrom($estadoString) ?? EstadoComanda::REALIZADA;

        $comanda = new Comanda(
            $usuario_id,
            $nMesa,
            $numPersonas,
            $estado,
            $nota,
            $fecha
        );

        $resultado = ControllerService::handlerErrorConexion(fn() => $comanda->registrarComanda());

        return $resultado 
            ? [
                "success" => true, 
                "message" => "Comanda creada correctamente", 
                "data" => [
                    "comanda_id" => $comanda->getComandaId()
                ]
              ]
            : ["success" => false, "message" => "Error al crear comanda"];
    }

    /**
     * Actualiza una comanda existente según el ID, y si tiene tiempo.
     *
     * @param Router $router Instancia del router para manejar la solicitud y respuesta.
     * @return void
     */
    public function actualizar($router) {
        $datos = json_decode(file_get_contents("php://input"), true);

        $comanda_id = $datos["comanda_id"];

        $comandaExistente = Comanda::encontrarPorID($comanda_id);

        if (!$comandaExistente) {
            http_response_code(404);
            return ["success" => false, "message" => "Comanda no encontrada"];
        }

        $nMesa = $datos["nMesa"] ?? $comandaExistente["n_mesa"];
        $numPersonas = $datos["numPersonas"] ?? $comandaExistente["numPersonas"];
        $estadoString = $datos["estado"] ?? $comandaExistente["estado"];
        $nota = $datos["nota"] ?? $comandaExistente["nota"];
        $fecha = date("Y-m-d H:i:s");

        $usuario_id = $_SESSION["usuario_id"];

        $estado = EstadoComanda::tryFrom($estadoString) ?? EstadoComanda::REALIZADA;

        $fechaCreacion = new DateTime($comandaExistente["fecha"]);
        $ahora = new DateTime();
        $diferencia = $ahora->getTimestamp() - $fechaCreacion->getTimestamp();

        if ($diferencia > 300) { // 300s = 5m
            http_response_code(403);
            return ["success" => false, "message" => "Pasaron mas de 5m"];
        }

        $comanda = new Comanda(
            $usuario_id,
            $nMesa,
            $numPersonas,
            $estado,
            $nota,
            $fecha
        );

        $comanda->setComandaId($comanda_id);

        $resultado = ControllerService::handlerErrorConexion(fn() => $comanda->modificarComanda());

        return $resultado
            ? ["success" => false, "message" => "Comanda actualizada correctamente"]
            : ["success" => false, "message" => "Error al actualizar comanda"];
    }

    public function imprimir($router) {
        
    }

}