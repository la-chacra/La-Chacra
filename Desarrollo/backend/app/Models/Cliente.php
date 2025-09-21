<?php

namespace App\Models;

use App\Models\Usuario;

class Cliente extends Usuario {
    public function __construct (string $nombre, string $apellido, string $correo, string $contrasena, string $fecha_nacimiento) {
    parent::__construct($nombre, $apellido, $correo, $contrasena, $fecha_nacimiento, "C");
   }
}

// actualizarDisponibilidad(),generarReporte(),obtenerTopClientes(),eliminarComanda(), todo admin