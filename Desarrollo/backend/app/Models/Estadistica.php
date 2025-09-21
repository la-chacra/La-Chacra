<?php

namespace App\Models;

use App\Models\ModeloBase;

// ENUMS como Backed Enum (más fácil para BD)
enum Periodo: string {
    case Verano = 'Verano';
    case Otono = 'Otono';
    case Primavera = 'Primavera';
}

enum TemporadasAltas: string {
    case VacacionesVerano = 'VacacionesVerano';
    case VacacionesInvierno = 'VacacionesInvierno';
    case Turismo = 'Turismo';
    case FiestasFinAno = 'FiestasFinAno';
}

class Estadistica extends ModeloBase {

    // Configuración de la tabla
    protected static string $pk_bd = "id_estadistica";
    protected static string $tabla_bd = "estadistica";
    protected static array $columnas_bd = [
        "id_estadistica", 
        "ventasPorProducto", 
        "periodo", 
        "productosMasVendidos", 
        "temporadasAltas"
    ];

    // Errores
    protected static array $errores = [];

    // Atributos de la clase
    private ?int $id_estadistica = null;
    private string $ventasPorProducto;
    private Periodo $periodo;
    private string $productosMasVendidos;
    private TemporadasAltas $temporadasAltas;

    public function __construct(array $datos = []) {
        $this->id_estadistica       = $datos["id_estadistica"] ?? null;
        $this->ventasPorProducto    = $datos["ventasPorProducto"] ?? "";
        $this->periodo              = isset($datos["periodo"]) 
                                        ? Periodo::from($datos["periodo"]) 
                                        : Periodo::Verano;
        $this->productosMasVendidos = $datos["productosMasVendidos"] ?? "";
        $this->temporadasAltas      = isset($datos["temporadasAltas"]) 
                                        ? TemporadasAltas::from($datos["temporadasAltas"]) 
                                        : TemporadasAltas::Turismo;
    }

    /**
     * Registra una nueva estadística en la base de datos.
     */
    public function registrarEstadistica(): bool {
        return $this->crearRegistro([
            "id_estadistica"       => $this->id_estadistica,
            "ventasPorProducto"    => $this->ventasPorProducto,
            "periodo"              => $this->periodo->value, // guardamos como string
            "productosMasVendidos" => $this->productosMasVendidos,
            "temporadasAltas"      => $this->temporadasAltas->value // guardamos como string
        ]);
    }

    /**
     * Generar reporte de todas las estadísticas
     */
    public static function generarReporte(): array {
        return (new self())->traerTodos();
    }

    /**
     * Obtener top clientes por puntos
     */
    public static function obtenerTopClientes(): array {
        $consulta = "SELECT * FROM cliente ORDER BY puntos DESC LIMIT 5";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

      // ------------------------------------------------------------------
    //  Getters y Setters 
    // ------------------------------------------------------------------


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
   





