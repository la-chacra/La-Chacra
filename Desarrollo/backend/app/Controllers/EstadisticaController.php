<?php

namespace App\Controllers;

use App\Services\ControllerService;
use App\Models\Estadistica;
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

}
