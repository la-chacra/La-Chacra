<?php
namespace App\Controllers;

use App\Models\Usuario;

class AuthController {

    
    /**
     * Registra un nuevo usuario con los datos proporcionados.
     *
     * @param array $data Los datos del usuario a registrar.
     * @return array Resultado del proceso de registro, incluyendo información del usuario o mensajes de error.
     */
    public function registrar(array $data): array {
        // Validaciones básicas
        if (empty($data["nombre"]) || empty($data["apellido"]) || empty($data["correo"]) || empty($data["contrasena"])) {
            return ["success" => false, "message" => "Faltan datos obligatorios"];
        }

        // Cifrar contraseña antes de guardarla
        $contrasenaHasheada = password_hash($data["contrasena"], PASSWORD_DEFAULT);

        // Crear instancia del modelo Usuario
        $usuario = new Usuario(
            $data["nombre"],
            $data["apellido"],
            $data["correo"],
            $contrasenaHasheada,
            $data["fechaNacimiento"] ?? date("Y-m-d"),
            $data["tipo"] ?? "cliente"
        );

        // Registrar en BD
        $resultado = $usuario->registrarUsuario();

        if ($resultado) {
            return ["success" => true, "message" => "Usuario registrado correctamente"];
        } else {
            return ["success" => false, "message" => "Error al registrar el usuario"];
        }
    }

    
    /**
     * Maneja la funcionalidad de inicio de sesión de usuario.
     *
     * @param array $data Las credenciales de inicio de sesión, típicamente incluyendo 'correo' y 'contrasena'.
     * @return array El resultado del intento de inicio de sesión, que puede incluir información del usuario o mensajes de error.
     */
    public function login(array $data): array {
        if (empty($data["correo"]) || empty($data["contrasena"])) {
            return ["success" => false, "message" => "Correo y contraseña son obligatorios"];
        }

        $correo = $data["correo"];
        $contrasena = $data["contrasena"];

        // Buscar usuario
        $usuario = Usuario::encontrarPorCorreo($correo);

        if (!$usuario) {
            return ["success" => false, "message" => "Usuario no encontrado"];
        }

        // Verificar contraseña (comparar con hash guardado en BD)
        if (password_verify($contrasena, $usuario["contrasena"])) {
            return [
                "success" => true,
                "message" => "Login correcto",
                "usuario"    => [
                    "usuario_id"       => $usuario["usuario_id"],
                    "nombre"   => $usuario["nombre"],
                    "apellido" => $usuario["apellido"],
                    "correo"   => $usuario["correo"],
                    "tipo"     => $usuario["tipo"]
                ]
            ];
        }

        return ["success" => false, "message" => "Contraseña incorrecta"];
    }
}
