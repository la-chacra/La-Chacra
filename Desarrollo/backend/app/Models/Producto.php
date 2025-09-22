<?php
namespace App\Models;

use App\Models\ModeloBase;
use DateTime;

enum Categoria: string {
    case Carne = 'Carne';
    case Bebida = 'Bebida';
    case Aderezos = 'Aderezos';
    case Accesorios = 'Accesorios';
}

class Producto extends ModeloBase {

    // Atributos para Base de Datos
    protected static string $pk_bd = "producto_id";
    protected static string $tabla_bd = "productos";
    protected static array $columnas_bd = [
        "producto_id",
        "precio",
        "categoria",
        "nombre",
        "ingredientes",
        "disponible"
    ];

    // Propiedades
    private int $producto_id;
    private int $precio; 
    private Categoria $categoria;
    private string $nombre; 
    private string $ingredientes; 
    private bool $disponible;

    public function __construct(array $datos = []) {
        $this->producto_id  = $datos["producto_id"] ?? 0;
        $this->precio       = $datos["precio"] ?? 0;
        $this->categoria    = isset($datos["categoria"]) ? Categoria::from($datos["categoria"]) : Categoria::Carne;
        $this->nombre       = $datos["nombre"] ?? "";
        $this->ingredientes = $datos["ingredientes"] ?? "";
        $this->disponible   = $datos["disponible"] ?? true;
    }

   
    /**
     * Registra un nuevo producto en la base de datos.
     *
     * @return bool Retorna true si el producto fue registrado exitosamente, false en caso contrario.
     */
    public function registrarProducto(): bool {
        return $this->crearRegistro([
            "producto_id"  => $this->producto_id,
            "precio"       => $this->precio,
            "categoria"    => $this->categoria->value,
            "nombre"       => $this->nombre,
            "ingredientes" => $this->ingredientes,
            "disponible"   => $this->disponible ? 1 : 0
        ]);
    }

    
    /**
     * Actualiza la disponibilidad del producto.
     *
     * Este método verifica y actualiza el estado de disponibilidad del producto
     * según las condiciones definidas en la lógica interna.
     *
     * @return bool Retorna true si la disponibilidad fue actualizada correctamente, false en caso contrario.
     */
    public function actualizarDisponibilidad(): bool {
        return $this->actualizar([
            "producto_id" => $this->producto_id,
            "disponible"  => $this->disponible ? 1 : 0
        ]);
    }


    
    // ------------------------------------------------------------------
    //  Getters y Setters 
    // ------------------------------------------------------------------


    /**
     * Get the value of producto_id
     */ 
    public function getProducto_id()
    {
        return $this->producto_id;
    }

    /**
     * Set the value of producto_id
     *
     * @return  self
     */ 
    public function setProducto_id($producto_id)
    {
        $this->producto_id = $producto_id;

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
     * Get the value of disponible
     */ 
    public function getDisponible()
    {
        return $this->disponible;
    }

    /**
     * Set the value of disponible
     *
     * @return  self
     */ 
    public function setDisponible($disponible)
    {
        $this->disponible = $disponible;

        return $this;
    }
}
