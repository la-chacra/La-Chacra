<?php

namespace App\Models;

use App\Models\ModeloBase;
use App\Models\Enums\Periodo;
use App\Models\Enums\TemporadasAltas;




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
     *
     * @return bool Retorna true si la estadística fue registrada exitosamente, false en caso contrario.
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
     * Genera un reporte estadístico.
     *
     * @return array El reporte generado en forma de arreglo.
     */
    public static function generarReporte(): array {
        return (new self())->traerTodos();
    }


    /**
     * Obtiene una lista de los clientes con mayor actividad o compras.
     *
     * @return array Lista de los clientes destacados según el criterio definido.
     */
    public static function obtenerTopClientes(): array {
        $consulta = "SELECT * FROM cliente ORDER BY puntos DESC LIMIT 5";
        return static::$conexion_bd->realizarConsulta($consulta);
    }
      public static function obtenerTopPlatos(): array {
    $consulta =  "
            SELECT 
        pm.nombre AS plato,
        pm.precio AS precio_unitario,
        SUM(dc.cantidad) AS total_vendidos
    FROM detalle_comanda dc
    JOIN productos_menu pm ON pm.producto_id = dc.producto_id
    JOIN comanda c ON c.comanda_id = dc.comanda_id
    WHERE c.estado = 'Finalizada'
    GROUP BY pm.producto_id, pm.nombre, pm.precio
    ORDER BY total_vendidos DESC
    LIMIT 5;

    ";
    return static::$conexion_bd->realizarConsulta($consulta);
}

    public static function obtenerVentasPorTemporada(): array {
    $consulta = "
        SELECT 
            CASE 
                WHEN MONTH(c.fecha_hora) IN (12, 1, 2) THEN 'Verano'
                WHEN MONTH(c.fecha_hora) IN (3, 4, 5) THEN 'Otoño'
                WHEN MONTH(c.fecha_hora) IN (6, 7, 8) THEN 'Invierno'
                WHEN MONTH(c.fecha_hora) IN (9, 10, 11) THEN 'Primavera'
            END AS temporada,
            SUM(pm.precio * dc.cantidad) AS total_vendido
        FROM detalle_comanda dc
        JOIN productos_menu pm ON pm.producto_id = dc.producto_id
        JOIN comanda c ON c.comanda_id = dc.comanda_id
        WHERE c.estado = 'Finalizada'
        GROUP BY temporada
        ORDER BY FIELD(temporada, 'Verano', 'Otoño', 'Invierno', 'Primavera');
    ";
    return static::$conexion_bd->realizarConsulta($consulta);
}
    public static function obtenerPedidosTotales(): array {
        $consulta = "
            SELECT COUNT(*) AS total_pedidos
            FROM comanda
            WHERE estado = 'Finalizada'
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    public static function obtenerReservasTotales(): array {
        $consulta = "
            SELECT COUNT(*) AS total_visitas
            FROM reserva
            WHERE estado IN ('Confirmada', 'Finalizada')
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    public static function obtenerGananciasTotales(): array {
        $consulta = "
            SELECT 
                SUM(pm.precio * dc.cantidad) AS total_ganancias
            FROM detalle_comanda dc
            JOIN productos_menu pm ON pm.producto_id = dc.producto_id
            JOIN comanda c ON c.comanda_id = dc.comanda_id
            WHERE c.estado = 'Finalizada'
        ";
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
   





