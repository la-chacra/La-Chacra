<?php

namespace App\Models;

use App\Models\ModeloBase;
use App\Models\Enums\Periodo;
use App\Models\Enums\TemporadasAltas;

/**
 * Clase Estadistica
 *
 * Proporciona las consultas necesarias para generar estadísticas del restaurante,
 * como ventas por mes, productos más vendidos y temporadas más activas.
 *
 * @package App\Models
 */
class Estadistica extends ModeloBase {
    
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

    /**
     * Obtiene el Top de Platos
     * Los mejores 5
     */
    public static function obtenerTopPlatos(): array {
        $consulta =  "
            SELECT 
                pm.producto_id,
                pm.nombre AS plato,
                pm.precio AS precio_unitario,
                pm.categoria,
                SUM(dc.cantidad) AS total_vendidos
            FROM detalle_comanda dc
            JOIN productos_menu pm ON pm.producto_id = dc.producto_id
            JOIN comanda c ON c.comanda_id = dc.comanda_id
            WHERE c.estado = 'Finalizada'
            GROUP BY pm.producto_id, pm.nombre, pm.precio, pm.categoria
            ORDER BY total_vendidos DESC
            LIMIT 5;
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /**
     * Obtiene el Top de Ventas por Temporada
     * Con la cantidad de productos vendidos
     */
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

     /**
     * Obtiene el Top de Pedidos
     * Con la comanda, al hacer el pedido y este se de por finalizado,
     * al guardarse como finalizado se usa para obtener la cantidad de pedidos
    
     */
    public static function obtenerPedidosTotales(): array {
        $consulta = "
            SELECT COUNT(*) AS total_pedidos
            FROM comanda
            WHERE estado = 'Finalizada'
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

     /**
     * Obtiene el Top de Reservas 
     * Parecida al de obtenerPedidosTotales()
     * Busca la reserva hecha que este finalizada para obtener la cantidad de la misma
     */
    public static function obtenerReservasTotales(): array {
        $consulta = "
            SELECT COUNT(*) AS total_visitas
            FROM reserva
            WHERE estado IN ('Confirmada', 'Finalizada')
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /**
     * Obtiene el Top de Ganancias Totales 
     * Se multiplica el precio de Productos Menu de la BD,
     * para que este muestre la ganancia total
     * 
     */
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

    /**
     * Obtiene el Top de Tendencias Estacionales 
     * La única grafica de la parte de estadistica
     * Muestra las estaciones con sus productos mas vendidos
     */
    public static function obtenerTendenciasEstacionales(): array {
        $consulta = "
        SELECT 
            CASE 
                WHEN MONTH(c.fecha_hora) IN (9,10,11) THEN 'Primavera'
                WHEN MONTH(c.fecha_hora) IN (12,1,2) THEN 'Verano'
                WHEN MONTH(c.fecha_hora) IN (3,4,5) THEN 'Otoño'
                ELSE 'Invierno'
            END AS periodo,
            SUM(dc.cantidad * pm.precio) AS ventas,
            GROUP_CONCAT(DISTINCT pm.nombre SEPARATOR ', ') AS productos
        FROM detalle_comanda dc
        JOIN productos_menu pm ON pm.producto_id = dc.producto_id
        JOIN comanda c ON c.comanda_id = dc.comanda_id
        WHERE c.estado = 'Finalizada'
        GROUP BY periodo
        ORDER BY FIELD(periodo, 'Primavera', 'Verano', 'Otoño', 'Invierno');
        ";

        return static::$conexion_bd->realizarConsulta($consulta);
    }
    /**
     * Obtiene el Top de Ranking Productos 
     * Una de las 3 tablas de la parte de estadistica
     * Muestra los productos mas vendidos
     */
    public static function obtenerRankingProductos(): array {
        $consulta = "
            SELECT 
                pm.producto_id AS id,
                pm.nombre AS producto,
                pm.categoria,
                pm.precio,
                SUM(dc.cantidad) AS ventas
            FROM productos_menu pm
            JOIN detalle_comanda dc ON pm.producto_id = dc.producto_id
            JOIN comanda c ON c.comanda_id = dc.comanda_id
            WHERE c.estado = 'Finalizada'
            GROUP BY pm.producto_id, pm.nombre, pm.categoria, pm.precio
            ORDER BY ventas DESC
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /**
     * Obtiene el Top de Ranking Reservas 
     * Una de las 3 tablas de la parte de estadistica
     * Muestra los reservas mas vendidos
     */
    public static function obtenerRankingReservas(): array {
        $consulta = "
            SELECT 
                u.usuario_id AS usuario_id,
                CONCAT(u.nombre, ' ', u.apellido) AS cliente,
                COUNT(r.reserva_id) AS total_reservas,
                SUM(r.cant_personas) AS total_personas
            FROM reserva r
            JOIN usuario u ON r.usuario_id = u.usuario_id
            WHERE r.estado IN ('Confirmada', 'Finalizada')
            GROUP BY u.usuario_id
            ORDER BY total_reservas DESC;
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /**
     * Obtiene el Top de Ranking Ventas 
     * Una de las 3 tablas de la parte de estadistica
     * Muestra los ventas mas vendidos
     */
    public static function obtenerRankingVentas(): array {
        $consulta = "
            SELECT 
                c.comanda_id AS id,
                GROUP_CONCAT(DISTINCT pm.nombre SEPARATOR ', ') AS productos,
                SUM(dc.cantidad) AS cantidad_vendida,
                SUM(dc.cantidad * pm.precio) AS total,
                DATE_FORMAT(c.fecha_hora, '%Y-%m-%d %H:%i') AS fecha
            FROM comanda c
            JOIN detalle_comanda dc ON c.comanda_id = dc.comanda_id
            JOIN productos_menu pm ON dc.producto_id = pm.producto_id
            WHERE c.estado = 'Finalizada'
            GROUP BY c.comanda_id, c.fecha_hora
            ORDER BY total DESC;
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }
}
   





