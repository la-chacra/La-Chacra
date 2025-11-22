<?php

namespace App\Models;

use App\Models\ModeloBase;

class HistorialCambios extends ModeloBase
{
    protected static string $tabla_bd = "registro_actividades";
    protected static string $pk_bd = "log_id";
    protected static array  $columnas_bd = [
        "log_id",
        "usuario_id",
        "insumo_id",
        "producto_id",
        "tipo_cambio",
        "fecha_cambio",
        "valor_antes",
        "valor_despues",
        "detalle"
    ];

    public static function obtenerHistorial()
    {
        $sql = "
            SELECT
                r.*,
                u.nombre AS usuario_nombre,
                CASE 
                    WHEN r.insumo_id IS NOT NULL THEN 'STOCK'
                    WHEN r.producto_id IS NOT NULL THEN 'PLATO'
                    ELSE 'EMPLEADO'
                END AS categoria
            FROM registro_actividades r
            LEFT JOIN usuario u ON r.usuario_id = u.usuario_id
            ORDER BY r.fecha_cambio DESC
        ";

        $filas = static::$conexion_bd->realizarConsulta($sql);

        foreach ($filas as &$f) {
            $f["fecha"] = date("d/m/Y H:i", strtotime($f["fecha_cambio"]));
            $f["usuario"] = $f["usuario_nombre"] ?? "Desconocido";

            $f["valor_antes"] = $f["valor_antes"] ? json_decode($f["valor_antes"], true) : null;
            $f["valor_despues"] = $f["valor_despues"] ? json_decode($f["valor_despues"], true) : null;
        }

        return $filas;
    }

    public static function registrarCambio(array $data): bool
    {
        return (new self())->crearRegistro($data);
    }

    public static function obtenerPorId(int $log_id)
    {
        return self::encontrarPorID($log_id)[0] ?? null;
    }

public static function restaurarCambio(int $log_id, int $usuario_admin): array
{
    $registro = self::obtenerPorId($log_id);

    if (!$registro) {
        return ["success" => false, "message" => "Registro no encontrado"];
    }

    $antes   = $registro["valor_antes"] ? json_decode($registro["valor_antes"], true) : null;
    $despues = $registro["valor_despues"] ? json_decode($registro["valor_despues"], true) : null;

    // Detectar tabla destino
    if ($registro["insumo_id"]) {
        $tabla = "inventario";
        $pk = "insumo_id";
        $idAfectado = $registro["insumo_id"];
    } elseif ($registro["producto_id"]) {
        $tabla = "productos_menu";
        $pk = "producto_id";
        $idAfectado = $registro["producto_id"];
    } else {
        $tabla = "usuario";
        $pk = "usuario_id";
        $idAfectado = $registro["usuario_id"];
    }

    // ----------------------------------
    // REGLA REAL: nunca se elimina físicamente
    // ----------------------------------

    // CASO 1: Se eliminó o desactivó → restaurar valores y activar
    if ($antes && !$despues) {

        $antes["activo"] = 1; // Siempre reactivar

        $sets = [];
        foreach ($antes as $k => $v) {
            $sets[] = "$k = :$k";
        }

        $sql = "UPDATE $tabla SET ".implode(",", $sets)." WHERE $pk = :id";
        $params = array_merge($antes, ["id" => $idAfectado]);

        static::$conexion_bd->ejecutarConsulta($sql, $params);
    }

    // CASO 2: Se agregó → desactivar en vez de borrar
    elseif (!$antes && $despues) {

        $sql = "UPDATE $tabla SET activo = 0 WHERE $pk = :id";
        static::$conexion_bd->ejecutarConsulta($sql, ["id" => $idAfectado]);
    }

    // CASO 3: Modificación normal
    elseif ($antes && $despues) {

        $sets = [];
        foreach ($antes as $k => $v) {
            $sets[] = "$k = :$k";
        }

        $sql = "UPDATE $tabla SET ".implode(",", $sets)." WHERE $pk = :id";
        $params = array_merge($antes, ["id" => $idAfectado]);

        static::$conexion_bd->ejecutarConsulta($sql, $params);
    }

    // Registrar rollback
    $nuevo = new self();

    $nuevo->crearRegistro([
        "usuario_id"   => $usuario_admin,
        "insumo_id"    => $registro["insumo_id"],
        "producto_id"  => $registro["producto_id"],
        "tipo_cambio"  => "MODIFICAR",
        "valor_antes"  => json_encode($despues),
        "valor_despues"=> json_encode($antes),
        "detalle"      => "Reversión del cambio $log_id",
    ]);

    return ["success" => true];
}

}