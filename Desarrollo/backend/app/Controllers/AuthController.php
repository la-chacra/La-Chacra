<?php
namespace App\Controllers;
/**
 * Controlador AuthController
 *
 * Gestiona la autenticación de usuarios en el sistema.
 * Controla el inicio y cierre de sesión, así como la verificación de credenciales.
 *
 * @package App\Controllers
 */
class AuthController {
    public function estadoSesion($router): array {
        if (isset($_SESSION["usuario_id"])) {
            return [
                "success" => true,
                "authenticated" => true,
                "usuario" => [
                    "usuario_id" => $_SESSION["usuario_id"],
                    "nombre" => $_SESSION["nombre"] ?? null,
                    "tipo" => $_SESSION["tipo"] ?? null
                ]
            ];
        } else {
            return ["success" => false, "authenticated" => false, "message" => "Sesión no iniciada."];
            exit;
        }
    }

    public function logout($router) {
        session_destroy();
        return ["success" => true, "message" => "Sesión cerrada"];
    }
}
