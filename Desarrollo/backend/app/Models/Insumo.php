<?php

namespace App\Models;

use App\Models\ModeloBase;

// Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase
enum Categoria : string {
    case Carne = "Carne";
    case Bebida = "Bebida";
    case Aderezos = "Aderezos";
    case Accesorios = "Accesorios";
}

class Insumo extends ModeloBase {

    // -- Atributos de la Base de Datos
    protected static string $pk_bd = "insumo_id";
    protected static string $tabla_bd = "inventario";
    protected static array $columnas_bd = ["usuario_id", "nombre", "categoria", "cantidad", "cantidad_minima", "unidad", "precio_unitario"];

    // -- Atributos de un Insumo del Inventario
    private ?int $insumo_id;
    private string $nombre; 
    private Categoria $categoria;
    private int $cantidad;
    private int $cantidadMinima;
    private string $unidad; 
    private float $precioUnitario;

    // -- Constructor
    public function __construct(string $nombre, Categoria $categoria, float $cantidad, float $cantidadMinima, string $unidad, float $precioUnitario) {
        $this->insumo_id = null;
        $this->nombre = $nombre;
        $this->categoria = $categoria;
        $this->cantidad = $cantidad;
        $this->cantidadMinima = $cantidadMinima;
        $this->unidad = $unidad;
        $this->precioUnitario = $precioUnitario;
    }

    /**
     * Realizar el registro de un insumo en la base de datos
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function registrarInsumo () : bool{
        $resultado = $this->crearRegistro(
            [
                "nombre"          => $this->nombre,
                "categoria"       => $this->categoria,
                "cantidad"        => $this->cantidad,
                "cantidad_minima" => $this->cantidadMinima,
                "unidad"          => $this->unidad,
                "precioUnitario"  => $this->precioUnitario
            ]
        );

        // Automaticamente asigna el ID al objeto de forma local
        $id = $this->encontrarUltimoRegistro();
        $this->insumo_id = $id[static::$pk_bd];

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
                "insumo_id"       => $this->insumo_id,
                "nombre"          => $this->nombre,
                "categoria"       => $this->categoria,
                "cantidad"        => $this->cantidad,
                "cantidad_minima" => $this->cantidadMinima,
                "unidad"          => $this->unidad,
                "precioUnitario"  => $this->precioUnitario
            ]
        );
    }

    /**
     * Elimina el registro de un Insumo dada su ID.
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function eliminarInsumo () {
        return $this->eliminar($this->insumo_id);
    }

    /**
     * Actualizar la cantidad de un Insumo en la Base de Datos.
     * 
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function actualizarCantidad() : bool {
        return $this->actualizar(
            [
                "insumo_id" => $this->insumo_id,
                "cantidad"  => $this->cantidad
            ]
        );
    }

    /**
     * Actualizar el estado de actividad de un Insumo en la Base de Datos.
     * 
     * @param bool $activo True o False si se lo quiere activar o desactivar.
     * @return bool True o False según se pudo realizar la operación o no.
     */
    public function actualizarActividad (bool $activo) : bool {
        return $this->actualizar(
            [
                "insumo_id" => $this->insumo_id,
                "activo"  => $activo
            ]
        );
    }

    /**
     * Verficar si existe un Insumo en la base de datos
     * 
     * @return true|false Si el usuario existe o no
     */
    public function esExistente(): bool{
        $resultado = $this->encontrarPorID($this->insumo_id);
        return !empty($resultado);
    }

    // public function actualizarDisponibilidad() {
    // $consulta = "UPDATE productos 
    //           SET disponible = :disponible 
    //           WHERE id_producto = :id_producto";

    // $parametros = [
    //     ':disponible' => $this->disponible,  // puede ser 1 = disponible, 0 = no disponible
    //     ':id_producto' => $this->id_producto
    // ];

    // return $this->actualizar(
    //     [
    //         static::$pk_bd => $this->insumo_id,
    //         "disponibilidad" => $this->disponiblidad
    //     ]
    // );
    
    // Getters y Setters
    
    // Getter y setter para insumo_id
    public function getInsumoId() : ?int {
        return $this->insumo_id;
    }

    public function setInsumoId(int $insumo_id) {
        $this->insumo_id = $insumo_id;
    }

    // Getter y setter para nombre
    public function getNombre() : string {
        return $this->nombre;
    }

    public function setNombre(string $nombre) {
        $this->nombre = $nombre;
    }

    // Getter y setter para categoria
    public function getCategoria() : Categoria {
        return $this->categoria;
    }

    public function setCategoria(Categoria $categoria) {
        $this->categoria = $categoria;
    }

    // Getter y setter para cantidad
    public function getCantidad() : float {
        return $this->cantidad;
    }

    public function setCantidad(int $cantidad) {
        $this->cantidad = $cantidad;
    }

    // Getter y setter para cantidadMinima
    public function getCantidadMinima() : float {
        return $this->cantidad;
    }

    public function setCantidadMinima(int $cantidadMinima) {
        $this->cantidadMinima = $cantidadMinima;
    }

    // Getter y setter para unidad
    public function getUnidad(): string {
        return $this->unidad;
    }

    public function setUnidad(string $unidad) {
        $this->unidad = $unidad;
    }

    // Getter y setter para precioUnitario
    public function getPrecioUnitario() : float {
        return $this->precioUnitario;
    }

    public function setPrecioUnitario(float $precioUnitario) {
        $this->precioUnitario = $precioUnitario;
    }
}

    