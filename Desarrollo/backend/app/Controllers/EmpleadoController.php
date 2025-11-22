<?php

namespace App\Controllers;

use App\Models\Administrador;
use App\Models\Empleado;
use App\Models\Usuario;
use App\Services\ControllerService;
use App\Services\ContrasenaService;
use App\Services\ActividadMiddleware;
use DateTime;
use Exception;

class EmpleadoController {

    public function obtenerEmpleados($router) {
        try {
            $usuarios = ControllerService::handlerErrorConexion(
                fn() => Usuario::obtenerUsuariosPorTipo(["A", "E"])
            );

            $admins_empleados = [];

            foreach ($usuarios as $usuario) {
                $fecha = new DateTime($usuario["fecha_registro"]);
                $admins_empleados[] = [
                    "usuario_id" => $usuario["usuario_id"],
                    "nombre_completo" => $usuario["nombre"] . " " . $usuario["apellido"],
                    "correo" => $usuario["correo"],
                    "rol" => $usuario["tipo"] === "A" ? "Administrador" : "Empleado",
                    "fecha_creacion" => $fecha->format("d-m-Y H-i")
                ];
            }

            return ["success" => true, "message" => "Usuarios obtenidos con éxito", "data" => $admins_empleados];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor", "data" => []];
        }
    }


    public static function obtenerPorID($router, $params) {
        $id = $params["id"];

        try {
            $usuario = ControllerService::handlerErrorConexion(fn() => Usuario::encontrarPorID($id));
            $usuario = $usuario[0];

            return [
                "success" => true,
                "message" => "Usuario obtenido con éxito",
                "data" => [
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


    /**
     * MODIFICAR EMPLEADO
     */
    public function modificarEmpleado($router, $params) {

        $datos = json_decode(file_get_contents("php://input"), true);
        $id = $params["id"];

        try {
            // Obtener estado ANTES
            $antes = Usuario::encontrarPorID($id)[0] ?? null;

            if ($datos["tipo"] === "A") {
                $usuarioEditado = new Administrador(
                    $datos["nombre"] ?? "",
                    $datos["apellido"] ?? "",
                    $datos["correo"] ?? "",
                    $datos["contrasena"] ?? "",
                    $datos["fechaNacimiento"]
                );
            } else if ($datos["tipo"] === "E") {
                $usuarioEditado = new Empleado(
                    $datos["nombre"] ?? "",
                    $datos["apellido"] ?? "",
                    $datos["correo"] ?? "",
                    $datos["contrasena"] ?? "",
                    $datos["fechaNacimiento"]
                );
            } else {
                return ["success" => false, "message" => "Rol inválido"];
            }

            $usuarioEditado->setId($id);
            $resultado = ControllerService::handlerErrorConexion(fn() => $usuarioEditado->actualizarDatos());

            if ($resultado) {
                // Obtener estado DESPUÉS
                $despues = Usuario::encontrarPorID($id)[0] ?? null;

                ActividadMiddleware::cambioEmpleado(
                    $antes,
                    $despues,
                    $_SESSION["usuario_id"],
                    $id,
                    "Modificación de empleado"
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Usuario actualizado con éxito"]
                : ["success" => false, "message" => "No se pudo actualizar el usuario"];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }


    /**
     * REGISTRAR EMPLEADO
     */
    public function registrarEmpleado($router): array {
        try {
            $datos = json_decode(file_get_contents("php://input"), true);

            if (empty($datos["nombre"]) || empty($datos["apellido"]) ||
                empty($datos["correo"]) || empty($datos["contrasena"]) ||
                empty($datos["tipo"]) || empty($datos["fechaNacimiento"])) {

                http_response_code(400);
                return ["success" => false, "message" => "Faltan datos obligatorios"];
            }

            if ($datos["tipo"] === "A") {
                $usuario = new Administrador(
                    $datos["nombre"],
                    $datos["apellido"],
                    $datos["correo"],
                    $datos["contrasena"],
                    $datos["fechaNacimiento"]
                );
            } else if ($datos["tipo"] === "E") {
                $usuario = new Empleado(
                    $datos["nombre"],
                    $datos["apellido"],
                    $datos["correo"],
                    $datos["contrasena"],
                    $datos["fechaNacimiento"]
                );
            } else {
                return ["success" => false, "message" => "Rol inválido"];
            }

            $resultado = ControllerService::handlerErrorConexion(fn() => $usuario->registrarUsuario());

            if ($resultado) {
                $nuevo = Usuario::encontrarPorCorreo($datos["correo"]);

                ActividadMiddleware::cambioEmpleado(
                    null,
                    $nuevo,
                    $_SESSION["usuario_id"],
                    $nuevo["usuario_id"],
                    "Registro de nuevo empleado"
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Usuario registrado correctamente"]
                : ["success" => false, "message" => "Error al registrar el usuario"];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor:" . $e->getMessage()];
        }
    }


    /**
     * DESACTIVAR EMPLEADO
     */
    public function desactivarEmpleado($router, $params) {

        try {
            $id = $params["id"];

            // Obtener estado ANTES
            $antes = Usuario::encontrarPorID($id)[0] ?? null;

            $resultado = ControllerService::handlerErrorConexion(
                fn() => Usuario::actualizarActividad($id, false)
            );

            if ($resultado) {
                // Obtener estado DESPUÉS
                $despues = Usuario::encontrarPorID($id)[0] ?? null;

                ActividadMiddleware::cambioEmpleado(
                    $antes,
                    $despues,
                    $_SESSION["usuario_id"],
                    $id,
                    "Desactivación de empleado"
                );
            }

            return $resultado
                ? ["success" => true, "message" => "Usuario desactivado correctamente"]
                : ["success" => false, "message" => "Error al desactivar el usuario"];

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
                $fecha = new DateTime($u["fecha_registro"]);
                $nombreCompleto = $u["nombre"] . " " . $u["apellido"];

                fputcsv($salida, [
                    $u["usuario_id"],
                    $nombreCompleto,
                    $u["correo"],
                    $u["tipo"] === "A" ? "Administrador" : "Empleado",
                    $fecha->format("d-m-Y H:i")
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
