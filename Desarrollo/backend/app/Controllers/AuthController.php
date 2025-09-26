<?php
namespace App\Controllers;

class AuthController {
    public function estadoSesion($router): array {
        if (isset($_SESSION["usuario_id"])) {
            return [
                "authenticated" => true,
                "usuario" => [
                    "id" => $_SESSION["usuario_id"],
                    "nombre" => $_SESSION["nombre"] ?? null,
                    "tipo" => $_SESSION["tipo"] ?? null
                ]
            ];
        } else {
            return [
                "authenticated" => false
            ];
        }
    }

    public function logout($router) {
        session_destroy();
        return json_encode(["success" => true, "message" => "Sesión cerrada"]);
    }
}
