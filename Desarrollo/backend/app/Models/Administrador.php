<?php

namespace App\Models;

use App\Models\Usuario;

class Administrador extends Usuario {
   public function __construct (string $nombre, string $apellido, string $correo, string $contrasena, string $fecha_nacimiento) {
      parent::__construct($nombre, $apellido, $correo, $contrasena, $fecha_nacimiento, "A");
   }
}

   // Comentados : deben ser controladores
    // public function gestionarUsuarios(){
        
    // }
    // public function gestionarStock(){
        
    // }
    // public function gestionarPlatos(){
        
    // }
    // public function verEstadisticas(){
        
    // }