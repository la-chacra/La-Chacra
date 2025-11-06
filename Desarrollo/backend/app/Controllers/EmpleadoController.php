<?php

namespace App\Controllers;

use App\Models\Usuario;
use App\Services\ControllerService;
use DateTime;
use Exception;

class EmpleadoController {

    public static function obtenerEmpleados ($router) {
        try {
            $usuarios = ControllerService::handlerErrorConexion(fn() => Usuario::obtenerUsuariosPorTipo(["A", "E"]));
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor", "data" => []];
        }

            // este endpoint debe devolver un array de usuarios con esta estructura
            // [
            //   {
            //     usuario_id: number,
            //     nombre_completo: string,
            //     correo: string,
            //     rol: "Administrador" | "Empleado",
            //     fecha_creacion: "dd/mm/yyyy hh:mm"
            //   },
            //   ...
            // ]

        $admins_empleados = [];

        foreach ($usuarios as $usuario) {

            $fechaFormateada = new DateTime($usuario["fecha_registro"]);

            $fechaFormateada = $fechaFormateada->format("d-m-Y H-i");

            array_push($admins_empleados, 
            [
                "usuario_id" => $usuario["usuario_id"],
                "nombre_completo" => $usuario["nombre"] . " " . $usuario["apellido"],
                "correo" => $usuario["correo"],
                "rol" => $usuario["tipo"] === "A" ? "Administrador" : "Empleado" ,
                "fecha_creacion" => $fechaFormateada
            ]
            );
        }


        return ["success" => true, "message" => "Usuarios obtenidos con éxito", "data" => $admins_empleados];
    }
}