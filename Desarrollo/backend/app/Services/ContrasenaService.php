<?php

namespace App\Services;

/**
 * Servicio para gestionar el hash y la verificación de contraseñas utilizando bcrypt.
 *
 * Métodos:
 * - hash(string $pass): Genera un hash seguro de la contraseña proporcionada usando bcrypt.
 * - verificarPass(string $passIngresada, string $passEnBD): Verifica si la contraseña ingresada coincide con el hash almacenado.
 *
 * @final
 * @version 1.0
 */
final class ContrasenaService {

    private static $opciones = [
        "cost" => 12 // el costo es la cantidad de veces que se aplica el algoritmo de hashing de bcrypt
    ];


    /**
     * Genera un hash de bcrypt para una contraseña.
     *
     * @param string $pass La contraseña en texto plano para hashear.
     * @return string La contraseña hasheada.
     */
    public static function hash(string $pass) {
        return password_hash($pass, PASSWORD_BCRYPT, self::$opciones);
    }

    /**
     * Verifica si la contraseña ingresada coincide con el hash almacenado en la base de datos.
     *
     * @param string $passIngresada La contraseña ingresada por el usuario.
     * @param string $passEnBD El hash de la contraseña almacenado en la base de datos.
     * @return bool True si la contraseña es válida, false en caso contrario.
     */
    public static function verificarPass(string $passIngresada, string $passEnBD) {
        return password_verify($passIngresada, $passEnBD);
    }
}