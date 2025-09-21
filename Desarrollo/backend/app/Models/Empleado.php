<?php

namespace App\Models;

use App\Models\Usuario;

class Empleado extends Usuario {
    public function __construct (string $nombre, string $apellido, string $correo, string $contrasena, string $fecha_nacimiento) {
    parent::__construct($nombre, $apellido, $correo, $contrasena, $fecha_nacimiento, "E");
   }
}

   
    // public function gestionarComanda(){
        
    // }


  

