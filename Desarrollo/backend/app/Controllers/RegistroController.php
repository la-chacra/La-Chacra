<?php

namespace App\Controllers;

use App\Models\Cliente;
use App\Services\ContrasenaService;

class RegistroController {
    public function registrar($router): array {

        $data = json_decode(file_get_contents("php://input"), true);
        $nombre = $data["nombre"] ?? "";
        $apellido = $data["apellido"] ?? "";
        $correo = $data["correo"] ?? "";
        $contrasena = $data["contrasena"] ?? "";
        $fechaNacimiento = $data["fechaNacimiento"];

        if (empty($nombre) || empty($apellido) || empty($correo) || empty($contrasena) || empty($fechaNacimiento)) {
            return ["success" => false, "message" => "Faltan datos obligatorios"];
        }

        // Crear instancia del modelo Cliente (Default)
        $usuario = new Cliente(
            $nombre,
            $apellido,
            $correo,
            $contrasena,
            $fechaNacimiento ?? date("Y-m-d"),
        );

        // Registrar en BD
        $resultado = $usuario->registrarUsuario();
        
        if ($resultado) {

            $_SESSION["usuario_id"] = $usuario->getId();
            $_SESSION["nombre"] = $usuario->getNombre();
            $_SESSION["tipo"] = $usuario->getTipo();

            return ["success" => true, "message" => "Usuario registrado correctamente"];
        } else {
            return ["success" => false, "message" => "Error al registrar el usuario"];
        }
    }
}


