<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use database;

abstract class Usuario {

    private int $usuario_id;
    private string $nombre;
    private string $apellido;
    private string $correo;
    private string $contrasena;
    private DateTime $fechaNacimiento;

    public function __construct(int $usuario_id, string $nombre, string $apellido, string $correo, string $contrasena, string $fechaNacimiento) {
        $this->usuario_id = $usuario_id;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->correo = $correo;
        $this->contrasena = $contrasena;
        $this->fechaNacimiento = new DateTime($fechaNacimiento);
    }

    /**
     * Realizar el registro de un usuario en la Base de Datos
     * 
     * @return true|false Según se pudo realizar la operación o no
     */
    public function registrar () : bool{
        $conexion_bd = new database;

        return $conexion_bd->ejecutarConsulta(
            // Los ":" al lado de los parámetros los hace poder insertarse con arrays asociativos. 
            "INSERT INTO usuario (nombre, apellido, correo, contrasena, fechaNacimiento) VALUES (:nombre, :apellido, :correo, :contrasena, :fechaNacimiento)", 
            [
                'nombre'          => $this->nombre, 
                'apellido'        => $this->apellido, 
                'correo'          => $this->correo, 
                'contrasena'      => $this->contrasena, 
                'fechaNacimiento' => $this->fechaNacimiento
            ]
        );
    }


    /**
     * Realizar la autenticación de un usuario en la Base de Datos
     * 
     * @return null Si el usuario no existe
     * @return true|false Si la autenticación es válida o no
     */
    public function autenticar () : bool|null{
        $conexion_bd = new Database;
        
        $resultado = $conexion_bd->realizarConsulta(
            "SELECT * FROM usuarios WHERE correo = :correo",
            ['correo' => $this->correo]
        );

        if (!$resultado):
            return null;
        endif;

        return $resultado['contrasena'] == $this->contrasena;
    }

    public function esExistente(): bool{
        $conexion_bd = new Database;

        $resultado = $conexion_bd->realizarConsulta(
            "SELECT * FROM usuarios WHERE usuario_id = :id",
            ['id' => $this->usuario_id]
        );

        return $resultado ? true : false;
    }

    public function actualizarDatos (array $columnas = []) {
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "UPDATE usuarios SET {} WHERE usuario_id = {$this->usuario_id}",

        );
    }

    public function eliminarCuenta () {
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "DELETE FROM usuarios WHERE usuario_id = :id",
            ['id' => $this->usuario_id]
        );
    }


    // Getters y Setters
    public function getId(): int {
        return $this->usuario_id;
    }

    public function setId(int $usuario_id) {
        $this->usuario_id = $usuario_id;
    }

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