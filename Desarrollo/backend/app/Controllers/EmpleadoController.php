<?php

namespace App\Controllers;

use App\Models\Administrador;
use App\Models\Empleado;
use App\Models\Usuario;
use App\Services\ControllerService;
use App\Services\ContrasenaService;
use DateTime;
use Exception;

class EmpleadoController {

    public function obtenerEmpleados ($router) {
        try {
            $usuarios = ControllerService::handlerErrorConexion(fn() => Usuario::obtenerUsuariosPorTipo(["A", "E"]));

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
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor", "data" => []];
        }



        return ["success" => true, "message" => "Usuarios obtenidos con éxito", "data" => $admins_empleados];
    }

    public static function obtenerPorID($router, $params) {

        $id = $params["id"];

        try {
            $usuario = ControllerService::handlerErrorConexion(fn() => Usuario::encontrarPorID($id));

            $usuario = $usuario[0];

            return ["success" => true, "message" => "Usuario obtenido con éxito", 
                "data" => 
                    [
                        "usuario_id"       => $usuario["usuario_id"],
                        "nombre"           => $usuario["nombre"],
                        "apellido"         => $usuario["apellido"],
                        "correo"           => $usuario["correo"],
                        "tipo"             => $usuario["tipo"],
                        "contrasena"       => $usuario["contrasena"],
                        "fecha_nacimiento" => $usuario["fecha_nacimiento"],
                        "activo"           => $usuario["activo"]
                    ]
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor", "data" => []];
        }
    }

    public function modificarEmpleado($router, $params) {

        $datos = json_decode(file_get_contents("php://input"), true);

        $nombre = $datos["nombre"] ?? "";
        $apellido = $datos["apellido"] ?? "";
        $correo = $datos["correo"] ?? "";
        $tipo = $datos["tipo"] ?? "";
        $contrasena = $datos["contrasena"] ?? "";
        $fechaNacimiento = $datos["fechaNacimiento"];


        $id = $params["id"];

        try {

            if ($datos["tipo"] === "A") {
            $usuarioEditado = new Administrador (
                $nombre,
                $apellido,
                $correo,
                $contrasena,
                $fechaNacimiento,
            );
            } else if ($datos["tipo"] === "E") {
                $usuarioEditado = new Empleado (
                    $nombre,
                    $apellido,
                    $correo,
                    $contrasena,
                    $fechaNacimiento,
                );
            } else {
                return ["success" => false, "message" => "Rol inválido"];
            }

            $usuarioEditado->setId($id);
            $resultado = ControllerService::handlerErrorConexion(fn() => $usuarioEditado->actualizarDatos());

            return $resultado ? ["success" => true, "message" => "Usuario actualizado con éxito"] : ["success" => false, "message" => "No se pudo actualizar el usuario"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    public function registrarEmpleado ($router): array {
        try {
            $datos = json_decode(file_get_contents("php://input"), true);

            $nombre = $datos["nombre"] ?? "";
            $apellido = $datos["apellido"] ?? "";
            $correo = $datos["correo"] ?? "";
            $tipo = $datos["tipo"] ?? "";
            $contrasena = $datos["contrasena"] ?? "";
            $fechaNacimiento = $datos["fechaNacimiento"];

            if (empty($nombre) || empty($apellido) || empty($correo) || empty($contrasena) || empty($tipo) || empty($fechaNacimiento)) {
                http_response_code(400);
                return ["success" => false, "message" => "Faltan datos obligatorios"];
            }
            
            if ($tipo === "A") {
                $usuario = new Administrador (
                    $nombre,
                    $apellido,
                    $correo,
                    $contrasena,
                    $fechaNacimiento,
                );
            } else if ($tipo === "E") {
                $usuario = new Empleado (
                    $nombre,
                    $apellido,
                    $correo,
                    $contrasena,
                    $fechaNacimiento,
                );
            } else {
                return ["success" => false, "message" => "Rol inválido"];
            }

            // fix: da error
            // if($usuario->esExistente()) {
            //     return ["success" => false, "message" => "El usuario ya está registrado"];
            // }

            // Registrar en BD
            $resultado = ControllerService::handlerErrorConexion(fn() => $usuario->registrarUsuario());
            
            return $resultado ? ["success" => true, "message" => "Usuario registrado correctamente"] : ["success" => false, "message" => "Error al registrar el usuario"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    public function desactivarEmpleado($router, $params) {
        try {
            $id = $params["id"];

            $resultado = ControllerService::handlerErrorConexion(fn() => Usuario::actualizarActividad($id, false));
            
            return $resultado ? ["success" => true, "message" => "Usuario desactivado correctamente"] : ["success" => false, "message" => "Error al desactivar el usuario"];
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    public function exportarUsuarios($router) {
        try {
            $ids = $_GET["ids"] ?? null;

            if ($ids) {
                $idsArray = explode(",", $ids);

                $usuarios = ControllerService::handlerErrorConexion(
                    fn() => Usuario::obtenerUsuariosPorIDs($idsArray)
                );
            } else {
                $usuarios = ControllerService::handlerErrorConexion(
                    fn() => Usuario::obtenerUsuariosPorTipo(["A", "E"])
                );
            }

            $nombreArchivo = "usuarios_" . date("Y-m-d_H-i-s") . ".csv";

            header("Content-Type: text/csv; charset=utf-8");
            header("Content-Disposition: attachment; filename=$nombreArchivo");

            $salida = fopen("php://output", "w");

            fputcsv($salida, ["ID", "Nombre completo", "Correo", "Rol", "Fecha de creación"], ',', '"', '\\');

            foreach ($usuarios as $u) {
                $nombreCompleto = $u["nombre"] . " " . $u["apellido"];
                $fecha = new DateTime($u["fecha_registro"]);
                $fechaFormateada = $fecha->format("d-m-Y H:i");

                fputcsv($salida, [
                    $u["usuario_id"],
                    $nombreCompleto,
                    $u["correo"],
                    $u["tipo"] === "A" ? "Administrador" : "Empleado",
                    $fechaFormateada
                ], ',', '"', '\\');
            }

            fclose($salida);
            exit; 

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }


}