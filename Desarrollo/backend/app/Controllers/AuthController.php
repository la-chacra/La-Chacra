<?php
namespace App\Controllers;

use App\Models\Usuario;
use App\Services\ControllerService;
use App\Services\ContrasenaService;
use DateTime;
use Exception;

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

    public function obtenerDatosUsuario($router) : array {
        try {
            // El id debería venir de la sesión
            if (!isset($_SESSION["usuario_id"])) {
                return ["success" => false, "message" => "No se pudo identificar al usuario."];
            }

            $id = $_SESSION["usuario_id"];

            $resultado = ControllerService::handlerErrorConexion(
                fn() => Usuario::encontrarPorID($id)
            );

            if (empty($resultado)) {
                return ["success" => false, "message" => "No se encontró el usuario"];
            }

            $resultado = $resultado[0];

            $fechaNacimiento = null;
            if (!empty($resultado["fecha_nacimiento"])) {
                $fecha = new DateTime($resultado["fecha_nacimiento"]);
                $fechaNacimiento = $fecha->format('Y-m-d'); // FORMATO PARA INPUT DATE
            }

            return [
                "success" => true,
                "message" => "Usuario obtenido con éxito",
                "data" => [
                    "nombre" => $resultado["nombre"],
                    "apellido" => $resultado["apellido"],
                    "correo" => $resultado["correo"],
                    "fechaNacimiento" => $fechaNacimiento
                ]
            ];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }
    }

    public static function actualizarDatos() {
        try {
            if (!isset($_SESSION["usuario_id"])) {
                return ["success" => false, "message" => "Usuario no autenticado."];
            }

            $datos = json_decode(file_get_contents("php://input"), true);

            $nombre  = trim($datos["nombre"] ?? "");
            $apellido = trim($datos["apellido"] ?? "");
            $correo = trim($datos["correo"] ?? "");
            $fechaNacimiento = $datos["fecha_nacimiento"] ?? null;

            if (!$nombre || !$apellido || !$correo) {
                return ["success" => false, "message" => "Completa todos los campos requeridos."];
            }

            $id = $_SESSION["usuario_id"];

            // Preparar datos para actualizar
            $dataUpdate = [
                "usuario_id" => $id,
                "nombre" => $nombre,
                "apellido" => $apellido,
                "correo" => $correo
            ];

            if ($fechaNacimiento) {
                $dataUpdate["fecha_nacimiento"] = $fechaNacimiento;
            }

            // Actualizar en la BD
            $resultado = ControllerService::handlerErrorConexion(
                fn() => Usuario::actualizar($dataUpdate)
            );

            if (!$resultado) {
                return ["success" => false, "message" => "No se pudo actualizar la información."];
            }

            return ["success" => true, "message" => "Datos actualizados correctamente."];

        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor."];
        }
    }

    public static function cambiarContrasena() {
        try {
            if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
                http_response_code(405);
                return ["success" => false, "message" => "Método no permitido."];
            }

            if (!isset($_SESSION["usuario_id"])) {
                return ["success" => false, "message" => "Usuario no autenticado."];
            }

            $id = $_SESSION["usuario_id"];
            $datos = json_decode(file_get_contents("php://input"), true);

            $old = $datos["oldPassword"] ?? "";
            $new = $datos["newPassword"] ?? "";

            if (!$old || !$new) {
                return ["success" => false, "message" => "Ambas contraseñas son obligatorias."];
            }

            // Obtener datos actuales
            $registro = Usuario::encontrarPorID($id);

            if (!$registro) {
                return ["success" => false, "message" => "Usuario no encontrado."];
            }

            // Verificar contraseña actual
            if (!ContrasenaService::verificarPass($old, $registro["contrasena"])) {
                return ["success" => false, "message" => "La contraseña actual no es correcta."];
            }

            // Encriptar nueva contraseña
            $nuevaHash = ContrasenaService::hash($new);

            // Actualizar en BD
            $resultado = Usuario::actualizar([
                "usuario_id" => $id,
                "contrasena" => $nuevaHash
            ]);

            if (!$resultado) {
                return ["success" => false, "message" => "No se pudo actualizar la contraseña."];
            }

            return ["success" => true, "message" => "Contraseña actualizada correctamente."];

        } catch (\Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor."];
        }
    }

}
