<?php

namespace App\Models;

use App\Models\ModeloBase;

class Plato extends ModeloBase {

    protected static string $pk_bd = "producto_id";
    protected static string $tabla_bd = "menu_productos";
    protected static array $columnas_bd = [
        "producto_id",
        "nombre",
        "precio",
        "ingredientes",
        "categoria",
        "disponibilidad",
        "activo",
        "imagen_url"
    ];

    private ?int $producto_id;
    private string $nombre;
    private float $precio;
    private array $ingredientes;
    private string $categoria;
    private bool $disponibilidad;
    private bool $activo;
    private ?string $imagen_url;

    public function __construct(
        string $nombre,
        float $precio,
        array $ingredientes,
        string $categoria,
        bool $disponibilidad,
        bool $activo,
        ?string $imagen_url = null
    ) {
        $this->producto_id = null;
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->ingredientes = $ingredientes;
        $this->categoria = $categoria;
        $this->disponibilidad = $disponibilidad;
        $this->activo = $activo;
        $this->imagen_url = $imagen_url;
    }

    public static function buscarPorId(int $id): ?array {
        $res = self::encontrarPorID($id);
        return $res ? $res[0] : null;
    }

    public static function obtenerTodos(): array {
        $consulta = "SELECT * FROM productos_menu WHERE activo = 1 ORDER BY categoria, nombre";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    public function registrarPlato(): bool {
        return $this->crearRegistro([
            "nombre" => $this->nombre,
            "precio" => $this->precio,
            "ingredientes" => json_encode($this->ingredientes, JSON_UNESCAPED_UNICODE),
            "categoria" => $this->categoria,
            "disponibilidad" => $this->disponibilidad,
            "activo" => $this->activo,
            "imagen_url" => $this->imagen_url
        ]);
    }

    public function actualizarPlato(): bool {
        return $this->actualizar([
            "producto_id" => $this->producto_id,
            "nombre" => $this->nombre,
            "precio" => $this->precio,
            "ingredientes" => json_encode($this->ingredientes, JSON_UNESCAPED_UNICODE),
            "categoria" => $this->categoria,
            "disponibilidad" => $this->disponibilidad,
            "activo" => $this->activo,
            "imagen_url" => $this->imagen_url
        ]);
    }

    public static function actualizarActividad(int $producto_id, bool $activo): bool {
        $query = "UPDATE productos_menu SET activo = " . ($activo ? 1 : 0) . " WHERE producto_id = $producto_id";
        return static::$conexion_bd->realizarConsulta($query) !== false;
    }



    public function getProductoId(): ?int { return $this->producto_id; }
    public function setProductoId(int $producto_id): void { $this->producto_id = $producto_id; }

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
     * Get the value of precio
     */ 
    public function getPrecio()
    {
        return $this->precio;
    }

    /**
     * Set the value of precio
     *
     * @return  self
     */ 
    public function setPrecio($precio)
    {
        $this->precio = $precio;

        return $this;
    }

    /**
     * Get the value of ingredientes
     */ 
    public function getIngredientes()
    {
        return $this->ingredientes;
    }

    /**
     * Set the value of ingredientes
     *
     * @return  self
     */ 
    public function setIngredientes($ingredientes)
    {
        $this->ingredientes = $ingredientes;

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
     * Get the value of disponibilidad
     */ 
    public function getDisponibilidad()
    {
        return $this->disponibilidad;
    }

    /**
     * Set the value of disponibilidad
     *
     * @return  self
     */ 
    public function setDisponibilidad($disponibilidad)
    {
        $this->disponibilidad = $disponibilidad;

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

        /**
         * Get the value of imagen_url
         */ 
        public function getImagen_url()
        {
                return $this->imagen_url;
        }

        /**
         * Set the value of imagen_url
         *
         * @return  self
         */ 
        public function setImagen_url($imagen_url)
        {
                $this->imagen_url = $imagen_url;

                return $this;
        }
}
