<?php

namespace App\Models;

use App\Models\ModeloBase;

class Insumo extends ModeloBase
{
    // Atributos de la Base de Datos
    protected static string $pk_bd      = "insumo_id";
    protected static string $tabla_bd   = "inventario";
    protected static array  $columnas_bd = [
        "insumo_id",
        "nombre",
        "categoria",
        "cantidad",
        "cantidad_minima",
        "unidad",
        "precio_unitario",
        "activo"
    ];

    // Atributos
    private ?int $insumo_id;
    private string $nombre;
    private ?string $categoria;
    private float $cantidad;
    private float $cantidad_minima;
    private ?string $unidad;
    private ?int $precio_unitario;
    private bool $activo;

    // Constructor
    public function __construct(
        string $nombre,
        ?string $categoria,
        float $cantidad,
        float $cantidad_minima,
        ?string $unidad,
        ?int $precio_unitario,
        bool $activo = true
    ) {
        $this->insumo_id = null;
        $this->nombre = $nombre;
        $this->categoria = $categoria;
        $this->cantidad = $cantidad;
        $this->cantidad_minima = $cantidad_minima;
        $this->unidad = $unidad;
        $this->precio_unitario = $precio_unitario;
        $this->activo = $activo;
    }

    public function registrarInsumo(): bool
    {
        $resultado = $this->crearRegistro([
            "nombre" => $this->nombre,
            "categoria" => $this->categoria,
            "cantidad" => $this->cantidad,
            "cantidad_minima" => $this->cantidad_minima,
            "unidad" => $this->unidad,
            "precio_unitario" => $this->precio_unitario,
            "activo" => $this->activo ? 1 : 0
        ]);

        $id = $this->encontrarUltimoRegistro();
        $this->insumo_id = $id[static::$pk_bd] ?? null;

        return $resultado;
    }

    public function actualizarInsumo(): bool
    {
        return $this->actualizar([
            "insumo_id" => $this->insumo_id,
            "nombre" => $this->nombre,
            "categoria" => $this->categoria,
            "cantidad" => $this->cantidad,
            "cantidad_minima" => $this->cantidad_minima,
            "unidad" => $this->unidad,
            "precio_unitario" => $this->precio_unitario,
            "activo" => $this->activo ? 1 : 0
        ]);
    }

    public function eliminarInsumo(): bool
    {
        return $this->actualizarActividad($this->insumo_id, false);
    }

    public static function obtenerInsumos(): array
    {
        $consulta = "
            SELECT 
                insumo_id,
                nombre,
                categoria,
                cantidad,
                cantidad_minima,
                unidad,
                precio_unitario,
                activo
            FROM inventario
            WHERE activo = 1
            ORDER BY nombre ASC;
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /** Actualizar estado de actividad (borrado lógico) */
    public static function actualizarActividad(int $insumo_id, bool $activo): bool
    {
        $estado = $activo ? 1 : 0;
        $query = "UPDATE inventario SET activo = $estado WHERE insumo_id = $insumo_id";
        return static::$conexion_bd->realizarConsulta($query) !== false;
    }

    // ------------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------------

   

    /**
     * Get the value of insumo_id
     */ 
    public function getInsumoId()
    {
        return $this->insumo_id;
    }

    /**
     * Set the value of insumo_id
     *
     * @return  self
     */ 
    public function setInsumoId($insumo_id)
    {
        $this->insumo_id = $insumo_id;

        return $this;
    }

        /**
         * Get the value of nombre
         */ 
        public function getNombre()
        {
                return $this->nombre;
        }

        /**
         * Set the value of nombre
         *
         * @return  self
         */ 
        public function setNombre($nombre)
        {
                $this->nombre = $nombre;

                return $this;
        }

    /**
     * Get the value of categoria
     */ 
    public function getCategoria()
    {
        return $this->categoria;
    }

    /**
     * Set the value of categoria
     *
     * @return  self
     */ 
    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;

        return $this;
    }

    /**
     * Get the value of cantidad_minima
     */ 
    public function getCantidad_minima()
    {
        return $this->cantidad_minima;
    }

    /**
     * Set the value of cantidad_minima
     *
     * @return  self
     */ 
    public function setCantidad_minima($cantidad_minima)
    {
        $this->cantidad_minima = $cantidad_minima;

        return $this;
    }

    /**
     * Get the value of unidad
     */ 
    public function getUnidad()
    {
        return $this->unidad;
    }

    /**
     * Set the value of unidad
     *
     * @return  self
     */ 
    public function setUnidad($unidad)
    {
        $this->unidad = $unidad;

        return $this;
    }

    /**
     * Get the value of precio_unitario
     */ 
    public function getPrecio_unitario()
    {
        return $this->precio_unitario;
    }

    /**
     * Set the value of precio_unitario
     *
     * @return  self
     */ 
    public function setPrecio_unitario($precio_unitario)
    {
        $this->precio_unitario = $precio_unitario;

        return $this;
    }

    /**
     * Get the value of activo
     */ 
    public function getActivo()
    {
        return $this->activo;
    }

    /**
     * Set the value of activo
     *
     * @return  self
     */ 
    public function setActivo($activo)
    {
        $this->activo = $activo;

        return $this;
    }
}
