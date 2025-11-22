<?php

namespace App\Controllers;

use App\Models\HistorialCambios;

class HistorialController {

    /**
     * GET /api/gestion/historial
     */
    public function obtenerHistorial()
    {
        $historial = HistorialCambios::obtenerHistorial();

        return [
            "success" => true,
            "data" => $historial
        ];
    }

    /**
     * POST /api/gestion/restaurar
     */
    public function restaurarCambio()
    {
        $req = json_decode(file_get_contents("php://input"), true);

        if (!isset($req["log_id"])) {
            return [
                "success" => false,
                "message" => "log_id es requerido"
            ];
        }

        // No usar session_start aquí
        $usuario_admin = $_SESSION["usuario_id"] ?? null;

        if (!$usuario_admin) {
            return [
                "success" => false,
                "message" => "No autenticado"
            ];
        }

        return HistorialCambios::restaurarCambio(
            $req["log_id"],
            $usuario_admin
        );
    }
}
