<?php

namespace App\Models;

use App\Models\ModeloBase;

class Inventario extends ModeloBase {

    // Configuración de la tabla
    protected static string $pk_bd = "item_inventario_id";
    protected static string $tabla_bd = "inventario";
    protected static array $columnas_bd = [
        "item_inventario_id",
        "item_cantidad",
        "cantidadMinima"
    ];

    // Errores
    protected static array $errores = [];

    // Atributos de la clase
    private ?int $item_inventario_id = null;
    private int $item_cantidad;
    private int $cantidadMinima;

    public function __construct(array $datos = []) {
        $this->item_inventario_id        = $datos["item_inventario_id"] ?? null;
        $this->item_cantidad  = $datos["item_cantidad"] ?? 0;
        $this->cantidadMinima  = $datos["cantidadMinima"] ?? 0;
    }

    /**
     * Registrar un nuevo stock en la base de datos
     */
    public function registrarInventario(): bool {
        return $this->crearRegistro([
            "item_inventario_id"       => $this->item_inventario_id,
            "item_cantidad" => $this->item_cantidad,
            "cantidadMinima" => $this->cantidadMinima
        ]);
    }

    /**
     * Actualizar el stock existente
     */
    public function actualizarStock(): bool {
        return $this->actualizar([
            "item_inventario_id"       => $this->item_inventario_id,
            "item_cantidad" => $this->item_cantidad,
            "cantidadMinima" => $this->cantidadMinima
        ]);
    }

    /**
     * Verificar el stock actual
     */
    public function verificarStock(): array {
        $consulta = "SELECT * FROM " . static::$tabla_bd . 
                    " WHERE item_cantidad <= cantidadMinima LIMIT 1";
        return static::$conexion_bd->realizarConsulta($consulta);
    }
   

    // ------------------------------------------------------------------
    //  Getters y Setters 
    // ------------------------------------------------------------------



    /**
     * Get the value of item_inventario_id
     */ 
    public function getItem_inventario_id()
    {
        return $this->item_inventario_id;
    }

    /**
     * Set the value of item_inventario_id
     *
     * @return  self
     */ 
    public function setItem_inventario_id($item_inventario_id)
    {
        $this->item_inventario_id = $item_inventario_id;

        return $this;
    }

    /**
     * Get the value of item_cantidad
     */ 
    public function getItem_cantidad()
    {
        return $this->item_cantidad;
    }

    /**
     * Set the value of item_cantidad
     *
     * @return  self
     */ 
    public function setItem_cantidad($item_cantidad)
    {
        $this->item_cantidad = $item_cantidad;

        return $this;
    }

    /**
     * Get the value of cantidadMinima
     */ 
    public function getCantidadMinima()
    {
        return $this->cantidadMinima;
    }

    /**
     * Set the value of cantidadMinima
     *
     * @return  self
     */ 
    public function setCantidadMinima($cantidadMinima)
    {
        $this->cantidadMinima = $cantidadMinima;

        return $this;
    }
}