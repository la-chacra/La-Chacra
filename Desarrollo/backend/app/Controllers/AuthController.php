<?php
namespace App\Controllers;

class AuthController {
    public function estadoSesion($router): array {
        if (isset($_SESSION["usuario_id"])) {
            return [
                "authenticated" => true,
                "usuario" => [
                    "usuario_id" => $_SESSION["usuario_id"],
                    "nombre" => $_SESSION["nombre"] ?? null,
                    "tipo" => $_SESSION["tipo"] ?? null
                ]
            ];
        } else {
            http_response_code(401); // 401: unauthorized
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode(["success" => false, "message" => "Sesión no iniciada."]);
            exit;
        }
    }

    public function logout($router) {
        session_destroy();
        return json_encode(["success" => true, "message" => "Sesión cerrada"]);
    }
}
