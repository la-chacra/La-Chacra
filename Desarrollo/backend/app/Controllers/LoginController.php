<?php

namespace App\Controllers;

use App\Models\Cliente;
use App\Services\ContrasenaService;
/**
 * Controlador LoginController
 *
 * Gestiona el inicio de sesión de los usuarios.
 * Valida credenciales y define los roles de acceso (cliente, mozo, administrador).
 *
 * @package App\Controllers
 */

class LoginController {

    /**
     * se logea con datos de la bd
     */
        public function login($router) : array {
        
        $datos = json_decode(file_get_contents("php://input"), true);
        $correo = $datos["correo"] ?? "";
        $contrasena = $datos["contrasena"] ?? "";

        if (empty($correo) || empty($contrasena)){
            return ["success" => false, "message" => "Correo y contraseña son obligatorios"];
        }

    /**
     * Busca usuario
     */
        $usuario = Cliente::encontrarPorCorreo($correo);

        if (!$usuario) {
            return ["success" => false, "message" => "Usuario no encontrado"];
        }

    /**
     * Verifica contreseña
     */       
     if (ContrasenaService::verificarPass($contrasena, $usuario["contrasena"])) {

            $_SESSION["usuario_id"] = $usuario["usuario_id"];
            $_SESSION["nombre"] = $usuario["nombre"];
            $_SESSION["tipo"] = $usuario["tipo"];

            return [
                "success" => true,
                "message" => "Login correcto",
                "usuario"    => [
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


