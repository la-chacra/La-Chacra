<?php

namespace App\Models;

use App\Models\ModeloBase;


class Producto extends ModeloBase {

    // -- Atributos de la Base de Datos
    protected static string $pk_bd = "producto_id";
    protected static string $tabla_bd = "productos_menu";
    protected static array $columnas_bd = ["producto_id", "nombre", "precio", "ingredientes", "categoria", "disponibilidad", "activo"];

    // -- Atributos de un Producto del menú
    private ?int $producto_id;
    private string $nombre;
    private float $precio;
    private array $ingredientes;
    private CategoriaProducto $categoria;
    private bool $disponibilidad;
    private bool $activo;

    // -- Constructor
    public function __construct(string $nombre, float $precio, array $ingredientes, CategoriaProducto $categoria, bool $disponibilidad = true, bool $activo = true) {
        $this->producto_id = null;
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->ingredientes = $ingredientes;
        $this->categoria = $categoria;
        $this->disponibilidad = $disponibilidad;
        $this->activo = $activo;
    }

    /**
     * Realizar el registro de un insumo en la base de datos
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function registrarProducto() : bool {
        // Guardar ingredientes como JSON en la BD
        $resultado = $this->crearRegistro(
            [
                "nombre"        => $this->nombre,
                "precio"        => $this->precio,
                "ingredientes"  => json_encode($this->ingredientes),
                "categoria"     => $this->categoria,
                "disponibilidad"=> $this->disponibilidad,
                "activo"        => $this->activo
            ]
        );

        // Asignar el ID al objeto localmente
        $id = $this->encontrarUltimoRegistro();
        $this->producto_id = $id[static::$pk_bd] ?? null;

        return $resultado;
    }

    /**
     * Actualizar datos de un Insumo en una base de datos.
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function actualizarDatos () : bool {
        return $this->actualizar(
            [
                "producto_id"     => $this->producto_id,
                "nombre"          => $this->nombre,
                "precio"          => $this->precio,
                "ingredientes"    => json_encode($this->ingredientes),
                "categoria"       => $this->categoria,
                "disponibilidad"  => $this->disponibilidad,
                "activo"          => $this->activo
            ]
        );
    }

    /**
     * Elimina el registro de un Insumo dada su ID.
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function eliminarProducto () {
        return $this->eliminar($this->producto_id);
    }

    /**
     * Actualizar la cantidad de un Insumo en la Base de Datos.abstract
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function actualizarDisponibilidad(bool $disponible) : bool {
        $this->disponibilidad = $disponible;
        return $this->actualizar(
            [
                "producto_id"   => $this->producto_id,
                "disponibilidad"=> $this->disponibilidad
            ]
        );
    }

    /**
     * Verficar si existe un Insumo en la base de datos
     * 
     * @return true|false Si el usuario existe o no
     */
    public function esExistente(): bool{
        $resultado = $this->encontrarPorID($this->producto_id);
        return !empty($resultado);
    }
    
    // Getters y Setters
    
    // Getter y setter para producto_id
    public function getProductoId() : ?int {
        return $this->producto_id;
    }

    public function setProductoId(int $producto_id) {
        $this->producto_id = $producto_id;
    }

    // Getter y setter para nombre
    public function getNombre() : string {
        return $this->nombre;
    }

    public function setNombre(string $nombre) {
        $this->nombre = $nombre;
    }

    // Getter y setter para categoria
    public function getCategoria() : CategoriaProducto {
        return $this->categoria;
    }

    public function setCategoria(CategoriaProducto $categoria) {
        $this->categoria = $categoria;
    }

    // Getter y setter para precio
    public function getPrecio() : float {
        return $this->precio;
    }

    public function setPrecio(float $precio) {
        $this->precio = $precio;
    }

    // Getter y setter para ingredientes
    public function getIngredientes() : array {
        return $this->ingredientes;
    }

    public function setIngredientes(array $ingredientes) {
        $this->ingredientes = $ingredientes;
    }

    // Getter y setter para disponibilidad
    public function isDisponible() : bool {
        return $this->disponibilidad;
    }

    public function setDisponibilidad(bool $disponibilidad) {
        $this->disponibilidad = $disponibilidad;
    }

    // Getter y setter para activo
    public function isActivo() : bool {
        return $this->activo;
    }

    public function setActivo(bool $activo) {
        $this->activo = $activo;
    }
}