<?php

namespace App\Models;

use App\Models\ModeloBase;
use App\Services\ContrasenaService;
use DateTime;

/**
 * Clase Usuario
 *
 * Representa a los usuarios del sistema (clientes, mozos y administradores).
 * Gestiona su registro, autenticación, edición y eliminación lógica.
 *
 * @package App\Models
 */

abstract class Usuario extends ModeloBase {

    // -- Atributos para Base de Datos
    protected static string $pk_bd = "usuario_id";
    protected static string $tabla_bd = "usuario";
    protected static array $columnas_bd = ["usuario_id", "nombre", "apellido", "correo", "contrasena", "fecha_nacimiento", "tipo", "activo"];

    // -- Atributos de Usuario
    private ?int $usuario_id; // El ? antes de INT sirve para indicar que puede o no ser INT.
    private string $nombre;
    private string $apellido;
    private string $correo;
    private string $hashContrasena;
    private string $tipo;
    private DateTime $fechaNacimiento;

    // -- Constructor
    public function __construct(string $nombre, string $apellido, string $correo, string $contrasena, string $fechaNacimiento, string $tipo) {
        $this->usuario_id = null; // Es NULL porque al crear uno, no tiene ID todavia.
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->correo = $correo;
        $this->hashContrasena = ContrasenaService::hash($contrasena);
        $this->tipo = $tipo;
        $this->fechaNacimiento = new DateTime($fechaNacimiento);
    }

    // Métodos generales de un Usuario

    /**
     * Realizar el registro de un usuario en la Base de Datos
     * 
     * @return true|false Según se pudo realizar la operación o no
     */
    public function registrarUsuario () : bool{
        $resultado = $this->crearRegistro (
            [
                'nombre'           => $this->nombre, 
                'apellido'         => $this->apellido, 
                'correo'           => $this->correo, 
                'contrasena'       => $this->hashContrasena, 
                'fecha_nacimiento' => $this->fechaNacimiento->format('Y-m-d'),
                'tipo'             => $this->tipo
            ]
        );

        $id = self::encontrarPorCorreo($this->correo);
        $this->usuario_id = $id[static::$pk_bd] ?? null;

        return $resultado;
    }

    public static function obtenerUsuariosPorTipo (array $tipos) {

        $formateados = array_map(fn($tipo) => "'". addslashes($tipo) . "'", $tipos); // Les pone ''

        $condicion = implode(", ", $formateados); 

        $consulta = "SELECT * FROM ". static::$tabla_bd ." WHERE tipo IN ({$condicion})";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /**
     * Actualizar datos de un Usuario en una Base de Datos.
     * 
     * @return true|false Si se pudo realizar la operación o no
     */
    public function actualizarDatos () {
        return self::actualizar(
            [
                'usuario_id'       => $this->usuario_id,
                'nombre'           => $this->nombre, 
                'apellido'         => $this->apellido, 
                'correo'           => $this->correo, 
                'contrasena'       => $this->hashContrasena, 
                'fecha_nacimiento' => $this->fechaNacimiento->format('Y-m-d'),
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

    /**
     * Eliminar un usuario de la base de datos
     * 
     * @return true|false Si la eliminación fue éxitosa o no
     */
    public function eliminarCuentaPorID (int $id) {
        return $this->eliminar($id);
    }

    /**
     * Actualizar el estado de actividad de un Insumo en la Base de Datos.
     * 
     * @param bool $activo True o False si se lo quiere activar o desactivar.
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public static function actualizarActividad (int $id, bool $activo) : bool {
        return self::actualizar(
            [
                "usuario_id" => $id,
                "activo"  => $activo ? 1 : 0  // asegurar que se guarde como 0 o 1 en la BD
            ]
        );
    }


    /**
     * Verficar si existe un usuario en la base de datos
     * 
     * fix
     * 
     * @return true|false Si el usuario existe o no
     */
    public function esExistente(): bool{
        $resultado = self::encontrarPorID($this->usuario_id);
        return !empty($resultado);
    }

    //  Getters y Setters 

    public function setId(int $usuario_id) {
        $this->usuario_id = $usuario_id;
    }

    public function getId() {
        return $this->usuario_id;
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
        return $this->hashContrasena;
    }

    public function setContrasena (string $contrasena) {
        $this->hashContrasena = $contrasena;
    }

    public function getTipo () : string {
        return $this->tipo;
    }

    public function setTipo (string $tipo) {
        $this->tipo = $tipo;
    }

    public function getFchaNacimiento () : string {
        return $this->fechaNacimiento->format('Y-m-d');
    }

    public function setFechaNacimiento (string $fechaNacimiento) {
        $this->fechaNacimiento = new DateTime($fechaNacimiento);
    }

}