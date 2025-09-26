<?php

namespace App\Controllers;

use App\Models\Cliente;
use App\Services\ContrasenaService;

class LoginController {
        public function login($router): array {
        
        $datos = json_decode(file_get_contents("php://input"), true);
        $correo = $datos["correo"] ?? "";
        $contrasena = $datos["contrasena"] ?? "";

        if (empty($correo) || empty($contrasena)){
            return ["success" => false, "message" => "Correo y contraseña son obligatorios"];
        }

        // Buscar usuario
        $usuario = Cliente::encontrarPorCorreo($correo);

        if (!$usuario) {
            return ["success" => false, "message" => "Usuario no encontrado"];
        }

        // Verificar contraseña (comparar con hash guardado en BD)
        if (ContrasenaService::verificarPass($contrasena, $usuario["contrasena"])) {

            $_SESSION["usuario_id"] = $usuario["usuario_id"];
            $_SESSION["nombre"] = $usuario["nombre"];
            $_SESSION["tipo"] = $usuario["tipo"];

            return [
                "success" => true,
                "message" => "Login correcto",
                "usuario"    => [
                    "usuario_id" => $usuario["usuario_id"],
                    "nombre"     => $usuario["nombre"],
                    "apellido"   => $usuario["apellido"],
                    "correo"     => $usuario["correo"],
                    "tipo"       => $usuario["tipo"]
                ]
            ];
        }

        return ["success" => false, "message" => "Contraseña incorrecta"];
    }
}


