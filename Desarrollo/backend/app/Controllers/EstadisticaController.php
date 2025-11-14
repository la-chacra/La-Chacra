<?php

namespace App\Controllers;

use App\Services\ControllerService;
use App\Models\Estadistica;
use DateTime;
use Exception;

/**
 * Controlador de estadísticas del sistema.
 * 
 * Métodos para obtener información general sobre:
 * - Platos más vendidos
 * - Total de pedidos realizados
 * - Total de visitas (reservas confirmadas/finalizadas)
 * - Total de ganancias generadas
 * 
 * @package App\Controllers
 */
class EstadisticaController {

    /**
     * Obtiene los platos más vendidos.
     */
    public function obtenerTopPlatos($router) {
        try {
            $platos = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerTopPlatos());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($platos)) {
            return ["success" => false, "message" => "No se encontraron platos vendidos", "data" => []];
        }

        return ["success" => true, "message" => "Top platos obtenidos correctamente", "data" => $platos];
    }

    /**
     * Obtiene el total de pedidos (comandas finalizadas).
     */
    public function obtenerPedidosTotales($router) {
        try {
            $pedidos = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerPedidosTotales());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($pedidos)) {
            return ["success" => false, "message" => "No hay pedidos registrados", "data" => []];
        }

        return ["success" => true, "message" => "Pedidos totales obtenidos correctamente", "data" => $pedidos];
    }

    /**
     * Obtiene el total de visitas (reservas confirmadas o finalizadas).
     */
    public function obtenerReservasTotales($router) {
        try {
            $visitas = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerReservasTotales());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($visitas)) {
            return ["success" => false, "message" => "No se registraron visitas", "data" => []];
        }

        return ["success" => true, "message" => "Visitas totales obtenidas correctamente", "data" => $visitas];
    }

    /**
     * Obtiene el total de ganancias.
     */
    public function obtenerGananciasTotales($router) {
        try {
            $ganancias = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerGananciasTotales());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($ganancias)) {
            return ["success" => false, "message" => "No se pudieron calcular las ganancias", "data" => []];
        }

        return ["success" => true, "message" => "Ganancias totales obtenidas correctamente", "data" => $ganancias];
    }

    public function obtenerVentasPorTemporada($router) {
    try {
        $ventas = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerVentasPorTemporada());
    } catch (Exception $e) {
        http_response_code(500);
        return ["success" => false, "message" => "Error interno del servidor"];
    }

    if (empty($ventas)) {
        return ["success" => false, "message" => "No se encontraron ventas por temporada", "data" => []];
    }

    return [
        "success" => true,
        "message" => "Ventas por temporada obtenidas con éxito",
        "data" => $ventas
    ];
}

/**
     * Muestra el dashboard
     * 
     */
public function obtenerDashboard($router) {
    try {
        $topPlatos = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerTopPlatos());
        $pedidos = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerPedidosTotales());
        $visitas = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerReservasTotales());
        $ganancias = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerGananciasTotales());
        $temporadas = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerVentasPorTemporada());
    } catch (Exception $e) {
        http_response_code(500);
        return ["success" => false, "message" => "Error interno del servidor"];
    }
    return [
        "success" => true,
        "message" => "Datos del dashboard obtenidos correctamente",
        "data" => [
            "productosMasVendidos" => $topPlatos,
            "pedidosTotales" => $pedidos[0]["total_pedidos"] ?? 0,
            "visitasTotales" => $visitas[0]["total_visitas"] ?? 0,
            "gananciasTotales" => $ganancias[0]["total_ganancias"] ?? 0,
            "temporadasAltas" => $temporadas
        ]
    ];
}

    public function obtenerTendenciasEstacionales($router) {
        try {
            $tendencias = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerTendenciasEstacionales());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($tendencias)) {
            return ["success" => false, "message" => "No se encontraron datos de tendencias estacionales", "data" => []];
        }

        /**
     * De string a array
   
     * 
     */
        foreach ($tendencias as &$fila) {
            if (!empty($fila["productos"])) {
                $fila["productos"] = array_map("trim", explode(",", $fila["productos"]));
            } else {
                $fila["productos"] = [];
            }
        }

        return [
            "success" => true,
            "message" => "Tendencias estacionales obtenidas correctamente",
            "data" => $tendencias
        ];
    }

     
    public function obtenerRankingProductos($router) {
        try {
            $productos = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerRankingProductos());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($productos)) {
            return ["success" => false, "message" => "No se encontraron productos en el ranking", "data" => []];
        }

        $datos = [];

        foreach($productos as $producto) {
            array_push(
                $datos,
                [
                    "producto_id" => $producto["id"],
                    "producto" => $producto["producto"],
                    "categoria" => $producto["categoria"],
                    "precio" => $producto["precio"],
                    "ventas" => $producto["ventas"],
                ]
            );
        }

        return ["success" => true, "message" => "Ranking de productos obtenido correctamente", "data" => $productos];
    }

    public function obtenerRankingReservas($router) {
        try {
            $reservas = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerRankingReservas());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "error" => $e->getMessage()];
        }

        if (empty($reservas)) {
            return ["success" => false, "message" => "No se encontraron reservas", "data" => []];
        }

        $datos = [];

        foreach($reservas as $reserva) {
            array_push(
                $datos,
                [
                    "cliente" => $reserva["cliente"],
                    "cantidad" => $reserva["total_reservas"],
                    "totalPersonas" => $reserva["total_personas"],
                ]
            );
        }

        return ["success" => true, "message" => "Ranking de reservas obtenido correctamente", "data" => $datos];
    }

    
    public function obtenerRankingVentas($router) {
        try {
            $ventas = ControllerService::handlerErrorConexion(fn() => Estadistica::obtenerRankingVentas());
        } catch (Exception $e) {
            http_response_code(500);
            return ["success" => false, "message" => "Error interno del servidor"];
        }

        if (empty($ventas)) {
            return ["success" => false, "message" => "No se encontraron ventas en el ranking", "data" => []];
        }

        // conv a array
        foreach ($ventas as &$fila) {
            if (isset($fila["productos"])) {
                $fila["productos"] = array_map("trim", explode(",", $fila["productos"]));
            }
        }

        $datos = [];

        foreach($ventas as $venta) {

            $fechaVenta = new DateTime($venta["fecha"]);

            array_push(
                $datos,
                [
                    "productos" => $venta["productos"],
                    "cantidadVentas" => $venta["cantidad_vendida"],
                    "totalGanancia" => $venta["total"],
                    "fecha" => $fechaVenta->format("d-m-Y")
                ]
            );
        }

        return ["success" => true, "message" => "Ranking de ventas obtenido correctamente", "data" => $datos];
    }
}
