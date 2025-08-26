<?php

require dirname(__DIR__) . '/vendor/autoload.php';

class Cliente extends Usuario {

    public function __construct(int $usuario_id, int $nivelDeAcceso = 0, string $nombre, string $apellido, string $correo, string $contrasena, string $fechaNacimiento) {
        parent::__construct($usuario_id, $nivelDeAcceso, $nombre, $apellido, $correo, $contrasena, $fechaNacimiento,);
    }
}


