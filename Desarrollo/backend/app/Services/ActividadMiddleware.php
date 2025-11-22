<?php

namespace App\Services;

use App\Models\HistorialCambios;

class ActividadMiddleware {
    /**
     * Middleware general para registrar cualquier cambio
     * 
     * @param string $categoria STOCK | PLATO | EMPLEADO
     * @param array|null $antes  Estado anterior (null si no existía)
     * @param array|null $despues Estado nuevo (null si fue eliminado)
     * @param int $usuario_id Usuario que realizó el cambio
     * @param array $ids Ej: ["insumo_id" => 3] ó ["producto_id" => 7]
     * @param string|null $detalle Mensaje adicional
     */
    public static function registrarCambio(
        string $categoria,
        ?array $antes,
        ?array $despues,
        int $usuario_id,
        array $ids = [],
        ?string $detalle = null
    ) {
        // -------------------------------
        // 1. Detectar tipo de cambio
        // -------------------------------
        $tipo = "";

        if ($antes === null && $despues !== null) {
            $tipo = "AGREGAR";
        } elseif ($antes !== null && $despues === null) {
            $tipo = "ELIMINAR";
        } else {
            // ambas existen → modificación
            $tipo = "MODIFICAR";

            // Caso especial: ajuste de cantidad
            if ($categoria === "STOCK" 
                && isset($antes["cantidad"]) 
                && isset($despues["cantidad"]) 
                && $antes["cantidad"] !== $despues["cantidad"]
            ) {
                $tipo = "AJUSTE_CANTIDAD";
            }
        }

        // -------------------------------
        // 2. Preparar registro para BD
        // -------------------------------
        $data = [
            "usuario_id"    => $usuario_id,
            "insumo_id"     => $ids["insumo_id"] ?? null,
            "producto_id"   => $ids["producto_id"] ?? null,
            "tipo_cambio"   => $tipo,
            "valor_antes"   => json_encode($antes),
            "valor_despues" => json_encode($despues),
            "detalle"       => $detalle ?? "$tipo en $categoria"
        ];

        // -------------------------------
        // 3. Guardar en historial
        // -------------------------------
        $registro = new HistorialCambios();
        return $registro->crearRegistro($data);
    }

    /**
     * Atajos para evitar escribir “STOCK, PLATO, EMPLEADO” siempre
     */

    public static function cambioStock($antes, $despues, $usuario_id, $insumo_id, ?string $detalle = null)
    {
        return self::registrarCambio(
            "STOCK",
            $antes,
            $despues,
            $usuario_id,
            ["insumo_id" => $insumo_id],
            $detalle
        );
    }

    public static function cambioPlato($antes, $despues, $usuario_id, $producto_id, ?string $detalle = null)
    {
        return self::registrarCambio(
            "PLATO",
            $antes,
            $despues,
            $usuario_id,
            ["producto_id" => $producto_id],
            $detalle
        );
    }

    public static function cambioEmpleado($antes, $despues, $usuario_id, $empleado_id, ?string $detalle = null)
    {
        return self::registrarCambio(
            "EMPLEADO",
            $antes,
            $despues,
            $usuario_id,
            ["usuario_afectado" => $empleado_id], // por si agregas columna luego
            $detalle
        );
    }
}
