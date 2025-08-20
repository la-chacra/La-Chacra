<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Database;

abstract class Usuario {

    private string $nombre;
    private string $apellido; 
    private string $correo; 
    private string $contrasena; 
    private DateTime $fechaNacimiento;

    public function __construct(string $nombre, string $apellido, string $correo, string $contrasena, string $fechaNacimiento) {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->correo = $correo;
        $this->contrasena = $contrasena;
        $this->fechaNacimiento = new DateTime($fechaNacimiento);
    }

    /**
     * Realizar el registro de un usuario en la Base de Datos
     * 
     * @param Usuario $usuario Recibe un usuario
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function registrar (Usuario $usuario) : bool{
        $conexion_bd = new Database;
        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO usuario (nombre, apellido, correo, contrasena, fechaNacimiento) VALUES (:nombre, :apellido, :correo, :contrasena, :fechaNacimiento)", 
            ['nombre' => $usuario->nombre, 'apellido' => $usuario->apellido, 'correo' => $usuario->correo, 'contrasena' => $usuario->contrasena, 'fechaNacimiento' => $usuario->fechaNacimiento]
        );
    }

    public function autenticar () {

    }

    public function actualizarDatos () {

    }

    public function eliminarCuenta () {

    }


    // Getters y Setters
    public function getNombre () : string {
        return $this->nombre;
    }

    public function setNombre (string $nombre) {
        $this->nombre = $nombre;
    }

    public function getApellido () : string {
        return $this->apellido;
    }

    public function setApellido (string $apellido) {
        $this->apellido = $apellido;
    }

    public function getCorreo () : string {
        return $this->correo;
    }

    public function setCorreo (string $correo) {
        $this->correo = $correo;
    }

    public function getContrasena () : string {
        return $this->contrasena;
    }

    public function setContrasena (string $contrasena) {
        $this->contrasena = $contrasena;
    }

    public function getFechaNacimiento () : DateTime {
        return $this->fechaNacimiento;
    }

    public function setFechaNacimient (DateTime $fechaNacimiento) {
        $this->fechaNacimiento = $fechaNacimiento;
    }

}