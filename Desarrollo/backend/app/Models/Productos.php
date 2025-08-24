<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Database;


//Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase
enum Categoria {
    case Carne;
    case Bebida;
    case Aderezos;
    case Accesorios;
}

class Productos{

    //self:: Errores
    protected static $errores = [];

    private int $id_producto;
    private int $precio; 
    private Categoria $categoria;
    private int $nombre; 
    private string $ingredientes; 
    private bool $disponible;

    public function __construct(int $id_producto, int $precio, Categoria $categoria, string $ingredientes, bool $disponible, string $nombre) {
        $this->id_producto = $id_producto;
        $this->precio = $precio;
        $this->nombre = $nombre;
        $this->categoria = $categoria;
        $this->ingredientes = $ingredientes;
        $this->disponible = $disponible;


    }

    /**
     * Realizar el registro de un productos en la Base de Datos
     * 
     * @param productos $productos Recibe una solicitud
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function registrarProductos (Productos $productos) : bool{
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO productos (id_producto, precio, categoria, ingredientes, fecha) VALUES (:id_producto, :precio, :categoria, :ingredientes, :fecha)", 
            ['id_producto' => $productos->id_producto, 'precio' => $productos->precio, 'categoria' => $productos->categoria, 'ingredientes' => $productos->ingredientes,
             'disponible' => $productos->disponible]
        );
    }

    public function actualizarDisponibilidad() {
        $query = "SELECT * FROM productos";
        
}

    // Getters y Setters
    /**
     * Get the value of id_producto
     */ 
    public function getId_producto()
    {
        return $this->id_producto;
    }

    /**
     * Set the value of id_producto
     *
     * @return  self
     */ 
    public function setId_producto($id_producto)
    {
        $this->id_producto = $id_producto;

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