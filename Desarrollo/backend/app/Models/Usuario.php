<?php

abstract class Usuario {

    protected string $nombre;
    protected string $apellido; 
    protected string $correo; 
    protected string $contrasena; 
    protected DateTime $fecha_nacimiento;

    public function __construct(string $nombre, string $apellido, string $correo, string $contrasena, string $fecha_nacimiento) {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->correo = $correo;
        $this->contrasena = $contrasena;
         $this->fecha_nacimiento = new DateTime($fecha_nacimiento);
    }



}