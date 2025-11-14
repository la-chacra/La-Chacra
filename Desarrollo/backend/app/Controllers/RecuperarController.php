<?php
namespace App\Controllers;

use App\Models\Usuario;
use PHPMailer\PHPMailer\PHPMailer; // Se presisa instalar con composer
use PHPMailer\PHPMailer\Exception;

class RecuperarController {
    
    private string $archivoCodigos = __DIR__ . '/../../temp/codigos.json'; // archivo temporal

   
    /**
     * Lee y retorna los códigos necesarios para el proceso de recuperación.
     *
     * Este método se encarga de obtener los códigos requeridos, posiblemente desde una fuente de datos
     * como una base de datos, archivo o servicio externo, para ser utilizados en el flujo de recuperación.
     *
     * @return mixed Retorna los códigos obtenidos. El tipo de retorno depende de la implementación.
     */
    private function leerCodigos() {
        if (!file_exists($this->archivoCodigos)) return [];
        return json_decode(file_get_contents($this->archivoCodigos), true) ?? [];
    }

    /**
     * Guarda los códigos de recuperación en la base de datos.
     *
     * @param array $data Datos que contienen los códigos y la información necesaria para guardarlos.
     * @return void
     */
    private function guardarCodigos($data) {
        file_put_contents($this->archivoCodigos, json_encode($data));
    }

    
    /**
     * Envía un código de recuperación al usuario.
     *
     * Este método se encarga de generar y enviar un código de recuperación
     * (por ejemplo, para restablecer la contraseña) al usuario correspondiente.
     * Normalmente, valida la solicitud, genera el código y lo envía por correo electrónico
     * u otro medio configurado.
     *
     * @return void
     */
    public function enviarCodigo() {
        $data = json_decode(file_get_contents("php://input"), true);
        $correo = $data['correo'] ?? '';

        if (!$correo) {
            echo json_encode(["error" => "Debe ingresar un correo."]);
            return;
        }

        // Buscar si el correo existe
        $usuario = Usuario::encontrarPorCorreo($correo);
        if (!$usuario) {
            echo json_encode(["error" => "El correo no está registrado."]);
            return;
        }

        // Generar código
        $codigo = strval(mt_rand(100000, 999999));

        // Guardar código en archivo temporal
        $codigos = $this->leerCodigos();
        $codigos[$correo] = [
            'codigo' => $codigo,
            'expira' => time() + 600 // 10 minutos
        ];
        $this->guardarCodigos($codigos);

        // Enviar correo
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'tu_correo@gmail.com';
            $mail->Password = 'tu_app_password'; // contraseña de aplicación Gmail, es necesario esta opcion ya que gmail no permite apps menos seguras srria + por spam
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('tu_correo@gmail.com', 'La Chacra');
            $mail->addAddress($correo);

            $mail->isHTML(true);
            $mail->Subject = 'Código de verificación - La Chacra';
            $mail->Body = "
                <p>Hola,</p>
                <p>Tu código de verificación para cambiar la contraseña es:</p>
                <h2>$codigo</h2>
                <p>Este código expira en 10 minutos.</p>
            ";

            $mail->send();
            echo json_encode(["message" => "Se envió un código de verificación a tu correo."]);
        } catch (Exception $e) {
            echo json_encode(["error" => "Error al enviar el correo: {$mail->ErrorInfo}"]);
        }
    }

    /**
     * Cambia la contraseña de un usuario.
     *
     * Este método gestiona la lógica para actualizar la contraseña de un usuario,
     * generalmente después de un proceso de recuperación de contraseña.
     *
     * @return void
     */
    public function cambiarPassword() {
        $data = json_decode(file_get_contents("php://input"), true);
        $correo = $data['correo'] ?? '';
        $codigoIngresado = $data['codigo'] ?? '';
        $nuevaPassword = $data['password'] ?? '';

        if (!$correo || !$codigoIngresado || !$nuevaPassword) {
            echo json_encode(["error" => "Faltan datos."]);
            return;
        }

        $codigos = $this->leerCodigos();

        if (!isset($codigos[$correo])) {
            echo json_encode(["error" => "No se encontró un código para este correo."]);
            return;
        }

        $codigoGuardado = $codigos[$correo]['codigo'];
        $expira = $codigos[$correo]['expira'];

        if (time() > $expira) {
            unset($codigos[$correo]);
            $this->guardarCodigos($codigos);
            echo json_encode(["error" => "El código ha expirado."]);
            return;
        }

        if ($codigoIngresado !== $codigoGuardado) {
            echo json_encode(["error" => "El código no es válido."]);
            return;
        }

        /**
     * Actualiza passw
     */
        $hash = password_hash($nuevaPassword, PASSWORD_DEFAULT);
        $usuario = Usuario::encontrarPorCorreo($correo);
        if (!$usuario) {
            echo json_encode(["error" => "Usuario no encontrado."]);
            return;
        }

        $usuarioObj = new Usuario(
            $usuario['nombre'],
            $usuario['apellido'],
            $usuario['correo'],
            $nuevaPassword,
            $usuario['fecha_nacimiento'],
            $usuario['tipo']
        );
        $usuarioObj->setId($usuario['usuario_id']);
        $usuarioObj->actualizarDatos();

        unset($codigos[$correo]); // borrar el código usado
        $this->guardarCodigos($codigos);

        echo json_encode(["message" => "Contraseña actualizada correctamente."]);
    }
}
