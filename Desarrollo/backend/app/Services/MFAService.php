<?php

namespace App\Services;

use Dotenv\Dotenv;
use Config\Database;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class MFAService {

    private PHPMailer $email;

    public function __construct() {
        try {

            $this->email = new PHPMailer(true);

            $dotenv = Dotenv::createImmutable(dirname(__DIR__));
            $dotenv->load();

            $this->email->isSMTP(); // Indicar que se ba a usar protocolo SMTP
            $this->email->Host = "smtp.gmail.com"; // Indicarle que el host será gmail
            $this->email->SMTPAuth = true; // Activa autenticación SMTP, o sea que se necesita usuario y contraseña para enviar correos
            $this->email->Username = $_ENV["MFA_EMAIL"]; /** Indica el correo @todo Crear correo para enviar, @mateoparentini @kehianmartins */
            $this->email->Password = $_ENV["MFA_PASS"];
            $this->email->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Indica que las pass y el user deben ir encriptados
            $this->email->Port = 587; // Puerto de donde se envía

            $this->email->setFrom($_ENV["MFA_EMAIL"], "La Chacra Gourmet"); // indica remitente y nombre que verá el destinatario


        } catch (Exception $e) {}
    }

    public function enviarMFA(string $correo, int $id) {

        try {
        $intervalo = 10;

        $this->email->clearAddresses();
        $this->email->addAddress($correo);

        // Código numérico de 6 dígitos
        // str_pad sirve para completar un string para llegar a cierta cantidad de dígitos, por ejemplo en este caso, hasta 6
        // Esto porque se puede generar un número como 32, entonces agrega 0 a la izquierda hasta los 6 caracteres: 000032
        $codigo = str_pad(random_int(0, 999999), 6, "0", STR_PAD_LEFT);


        // true enciende las excepciones

            // Contenido del correo
        $this->email->isHTML(true);
        $this->email->Subject = "Tu código de verificación";
        $this->email->Body    = "Tu código OTP es {$codigo} y expira en {$intervalo} minutos.";

        $db = new Database();

        $resultado = $db->ejecutarConsulta(
            "INSERT INTO otp_codigos (usuario_id, codigo, expiracion) 
            VALUES (:usuario_id, :codigo, DATE_ADD(NOW(), INTERVAL :intervalo MINUTE))", 
            [
                ":usuario_id" => $id,
                ":codigo"     => $codigo,
                ":intervalo"  => $intervalo
            ]
        );

        if($resultado) $this->email->send();

        return $resultado;

        } catch (Exception $e) {
            error_log("Error en MFAService: " . $e->getMessage());
            return null;
        }
    }
}



