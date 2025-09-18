<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Database;


//Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase
enum Periodo {
    case Verano;
    case Otono;
    case Primavera;
    
}
enum TemporadasAltas {
    case VacacionesVerano;
    case VacacionesInvierno;
    case Turismo;
    case FiestasFinAno;
    
}

class Estadistica{

    //self:: Errores
    protected static $errores = [];

    private int $id_estadistica;
    private int $ventasPorProducto; 
    private Periodo $periodo;
    private string $productosMasVendidos; 
    private TemporadasAltas $temporadasAltas;

    public function __construct(int $id_estadistica, int $ventasPorProducto, Periodo $periodo, string $productosMasVendidos, TemporadasAltas $temporadasAltas) {
        $this->id_estadistica = $id_estadistica;
        $this->ventasPorProducto = $ventasPorProducto;
        $this->periodo = $periodo;
        $this->productosMasVendidos = $productosMasVendidos;
        $this->temporadasAltas = $temporadasAltas;


    }

    /**
     * Realizar el registro de un Estadistica en la Base de Datos
     * 
     * @param Estadistica $Estadistica Recibe una solicitud
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function registrarEstadistica (Estadistica $estadistica) : bool{
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO estadistica (id_estadistica, ventasPorProducto, periodo, productosMasVendidos, temporadasAltas) VALUES (:id_estadistica, :ventasPorProducto, :Periodo, :productosMasVendidos, :temporadasAltas)", 
            ['id_estadistica' => $estadistica->id_estadistica, 'ventasPorProducto' => $estadistica->ventasPorProducto, 'periodo' => $estadistica->periodo, 'productosMasVendidos' => $estadistica->productosMasVendidos,
             'temporadasAltas' => $estadistica->temporadasAltas]
        );
    }

    public function generarReporte() {
    $conexion_bd = new Database();
    $consulta = "SELECT * FROM Estadistica";
    $resultado = $conexion_bd->ejecutarConsulta($consulta);

    return $resultado; 
}

   public function obtenerTopClientes() {
    $conexion_bd = new Database();
    $consulta = "SELECT * FROM Cliente ORDER BY puntos DESC LIMIT 5";  // Se debe decidir la variable "puntos", ej: reservas
    return $conexion_bd->ejecutarConsulta($consulta);
}


    /**
     * Get the value of id_estadistica
     */ 
    public function getId_estadistica()
    {
        return $this->id_estadistica;
    }

    /**
     * Set the value of id_estadistica
     *
     * @return  self
     */ 
    public function setId_estadistica($id_estadistica)
    {
        $this->id_estadistica = $id_estadistica;

        return $this;
    }

    /**
     * Get the value of ventasPorProducto
     */ 
    public function getVentasPorProducto()
    {
        return $this->ventasPorProducto;
    }

    /**
     * Set the value of ventasPorProducto
     *
     * @return  self
     */ 
    public function setVentasPorProducto($ventasPorProducto)
    {
        $this->ventasPorProducto = $ventasPorProducto;

        return $this;
    }

    /**
     * Get the value of periodo
     */ 
    public function getPeriodo()
    {
        return $this->periodo;
    }

    /**
     * Set the value of periodo
     *
     * @return  self
     */ 
    public function setPeriodo($periodo)
    {
        $this->periodo = $periodo;

        return $this;
    }

    /**
     * Get the value of productosMasVendidos
     */ 
    public function getProductosMasVendidos()
    {
        return $this->productosMasVendidos;
    }

    /**
     * Set the value of productosMasVendidos
     *
     * @return  self
     */ 
    public function setProductosMasVendidos($productosMasVendidos)
    {
        $this->productosMasVendidos = $productosMasVendidos;

        return $this;
    }

    /**
     * Get the value of temporadasAltas
     */ 
    public function getTemporadasAltas()
    {
        return $this->temporadasAltas;
    }

    /**
     * Set the value of temporadasAltas
     *
     * @return  self
     */ 
    public function setTemporadasAltas($temporadasAltas)
    {
        $this->temporadasAltas = $temporadasAltas;

        return $this;
    }
}