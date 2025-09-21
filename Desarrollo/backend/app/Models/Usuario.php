<?php

namespace App\Models;

use App\Models\ModeloBase;
use DateTime;

class Usuario extends ModeloBase {

    // Atributos para Base de Datos
    protected static string $pk_bd = "usuario_id";
    protected static string $tabla_bd = "usuario";
    protected static array $columnas_bd = ["usuario_id", "nombre", "apellido", "correo", "contrasena", "fecha_nacimiento", "tipo"];

    // -- Atributos de Usuario
    private ?int $usuario_id; // El ? antes de INT sirve para indicar que puede o no ser INT.
    private string $nombre;
    private string $apellido;
    private string $correo;
    private string $contrasena;
    private string $tipo;
    private DateTime $fecha_nacimiento;

    // -- Constructor
    public function __construct(string $nombre, string $apellido, string $correo, string $contrasena, string $fecha_nacimiento, string $tipo) {
        $this->usuario_id = null; // Es NULL porque al crear uno, no tiene ID todavia.
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->correo = $correo;
        $this->contrasena = $contrasena;
        $this->tipo = $tipo;
        $this->fecha_nacimiento = new DateTime($fecha_nacimiento);
    }

    // ------------------------------------------------------------------
    //  Metodos general de un usuario (Registro, Autenticación, Eliminación)
    // ------------------------------------------------------------------

    /**
     * Realizar la autenticación de un usuario en la Base de Datos
     * 
     * @return null Si el usuario no se pudo encontrar
     * @return true|false Si la autenticación es válida o no
     */
    public static function autenticarSesion (string $correo, string $contrasena) : bool|null{        
        $resultado = self::encontrarPorCorreo($correo);

        if (!$resultado):
            return null;
        endif;

        return $resultado["contrasena"] === $contrasena;
    }

    /**
     * Realizar el registro de un usuario en la Base de Datos
     * 
     * @todo Se agregó que cuando se registre, localmente agregue la ID, trayendola usando el correo. Hay que probarlo.
     * 
     * @return true|false Según se pudo realizar la operación o no
     */
    public function registrar () : bool{
        return $this->crearRegistro (
            [
                'nombre'           => $this->nombre, 
                'apellido'         => $this->apellido, 
                'correo'           => $this->correo, 
                'contrasena'       => $this->contrasena, 
                'fecha_nacimiento' => $this->fecha_nacimiento->format('Y-m-d'),
                'tipo'             => $this->tipo
            ]
        );

        
        $id = $this->encontrarPorCorreo($this->correo);
        $id = $id[$pk_bd];

        $this->set_id($id);
    }

    /**
     * Verficar si existe un usuario en la base de datos
     * 
     * @return true|false Si el usuario existe o no
     */
    public function esExistente(): bool{
        $resultado = $this->encontrarPorID($this->usuario_id);
        return !empty($resultado);
    }

    /**
     * Actualizar datos de un Usuario en una Base de Datos.
     * 
     * @return true|false Si se pudo realizar la operación o no
     */
    public function actualizarDatos () {
        return $this->actualizar(
            [
                'usuario_id'       => $this->usuario_id,
                'nombre'           => $this->nombre, 
                'apellido'         => $this->apellido, 
                'correo'           => $this->correo, 
                'contrasena'       => $this->contrasena, 
                'fecha_nacimiento' => $this->fecha_nacimiento->format('Y-m-d'),
                'tipo'             => $this->tipo
            ]
        );
    }

    /**
     * Eliminar un usuario de la base de datos
     * 
     * @return true|false Si la eliminación fue éxitosa o no
     */
    public function eliminarCuenta () {
        return $this->eliminar($this->usuario_id);
    }

    // ------------------------------------------------------------------
    //  Getters y Setters 
    // ------------------------------------------------------------------


    public function set_id(int $usuario_id) {
        $this->usuario_id = $usuario_id;
    }

    public function get_id() {
        return $this->usuario_id;
    }

    public function get_nombre () : string {
        return $this->nombre;
    }

    public function set_nombre (string $nombre) {
        $this->nombre = $nombre;
    }

    public function get_apellido () : string {
        return $this->apellido;
    }

    public function set_apellido (string $apellido) {
        $this->apellido = $apellido;
    }

    public function get_correo () : string {
        return $this->correo;
    }

    public function set_correo (string $correo) {
        $this->correo = $correo;
    }

    public function get_contrasena () : string {
        return $this->contrasena;
    }

    public function set_contrasena (string $contrasena) {
        $this->contrasena = $contrasena;
    }

    public function get_fecha_nacimiento () : string {
        return $this->fecha_nacimiento->format('Y-m-d');
    }

    public function set_fecha_nacimiento (string $fecha_nacimiento) {
        $this->fecha_nacimiento = new DateTime($fecha_nacimiento);
    }

}