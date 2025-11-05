<?php

namespace App\Models;

use App\Models\ModeloBase;
use App\Models\Enums\Categoria;



class Insumo extends ModeloBase {

    // -- Atributos de la Base de Datos
    protected static string $pk_bd = "insumo_id";
    protected static string $tabla_bd = "inventario";
    protected static array $columnas_bd = ["insumo_id", "nombre", "categoria", "cantidad", "cantidad_minima", "unidad", "precio_unitario", "activo"];

    // -- Atributos de un Insumo del Inventario
    private ?int $insumo_id;
    private string $nombre; 
    private Categoria $categoria;
    private int $cantidad;
    private int $cantidadMinima;
    private string $unidad; 
    private float $precioUnitario;

    // -- Constructor
    public function __construct(string $nombre, Categoria $categoria, float $cantidad, float $cantidadMinima, string $unidad, float $precioUnitario) {
        $this->insumo_id = null;
        $this->nombre = $nombre;
        $this->categoria = $categoria;
        $this->cantidad = $cantidad;
        $this->cantidadMinima = $cantidadMinima;
        $this->unidad = $unidad;
        $this->precioUnitario = $precioUnitario;
    }

    /**
     * Crea una instancia del modelo Insumo basada en el ID de insumo proporcionado.
     *
     * Este método de fábrica estático recupera los datos del Insumo usando el ID dado,
     * y retorna un nuevo objeto Insumo con los datos correspondientes.
     * Si no se encuentra información para el ID especificado, retorna null.
     *
     * @param int $insumo_id El identificador único del Insumo a recuperar.
     * @return Insumo|null La instancia de Insumo si se encuentra, o null si no.
     */
    public static function factory(int $insumo_id): ?Insumo {
        $datos = self::encontrarPorID($insumo_id);
        
        if (empty($data)) {
            return null;
        }

        $insumo = new Insumo(
            $datos["nombre"] ?? null,
            $datos["categoria"] ?? null,
            $datos["cantidad"] ?? null,
            $datos["cantidad_minima"] ?? null,
            $datos["unidad"] ?? null,
            $datos["precio_unitario"] ?? null
        );

        $insumo->insumo_id = $datos["insumo_id"];
        return $insumo;
    }

    /**
     * Registra un nuevo insumo en la base de datos utilizando los atributos actuales del objeto.
     * 
     * Crea un registro con los datos del insumo (nombre, categoría, cantidad, cantidad mínima, unidad y precio unitario).
     * Asigna automáticamente el ID generado al atributo local `insumo_id` del objeto.
     *
     * @see ModeloBase::crearRegistro()
     * @return bool Retorna `true` si el registro fue creado exitosamente, `false` en caso contrario.
     */
    public function registrarInsumo () : bool{
        $resultado = $this->crearRegistro(
            [
                "nombre"          => $this->nombre,
                "categoria"       => $this->categoria,
                "cantidad"        => $this->cantidad,
                "cantidad_minima" => $this->cantidadMinima,
                "unidad"          => $this->unidad,
                "precioUnitario"  => $this->precioUnitario
            ]
        );

        // Automaticamente asigna el ID al objeto de forma local
        $id = $this->encontrarUltimoRegistro();
        $this->insumo_id = $id[static::$pk_bd];

        return $resultado;
    }

    /**
     * Actualizar datos de un Insumo en una base de datos.
     * 
     * Actualiza un registro con los datos del insumo (nombre, categoría, cantidad, cantidad mínima, unidad y precio unitario).
     * 
     * @return bool Retorna `true` si el registro fue actualziado exitosamente, `false` en caso contrario.
     */
    public function actualizarInsumo () : bool {
        return $this->actualizar(
            [
                "insumo_id"       => $this->insumo_id,
                "nombre"          => $this->nombre,
                "categoria"       => $this->categoria,
                "cantidad"        => $this->cantidad,
                "cantidad_minima" => $this->cantidadMinima,
                "unidad"          => $this->unidad,
                "precioUnitario"  => $this->precioUnitario
            ]
        );
    }

    /**
     * Elimina el registro de un Insumo dada su ID.
     * 
     * @return bool Retorna `true` si el registro fue eliminado exitosamente, `false` en caso contrario.
     */
    public function eliminarInsumo () : bool {
        return $this->eliminar($this->insumo_id);
    }

    /**
     * Actualizar el estado de actividad de un Insumo en la Base de Datos.
     * 
     * @param bool $activo `true` o `false` según si se lo quiere activar o desactivar.
     * @return bool Retorna `true` si el registro fue actualizado exitosamente, `false` en caso contrario.
     */
    public static function actualizarActividad (int $insumo_id, bool $activo) : bool {
        return self::actualizar(
            [
                "insumo_id" => $insumo_id,
                "activo"  => $activo
            ]
        );
    }

    /**
     * Actualizar la cantidad de un Insumo en la Base de Datos.
     * 
     * @param bool $activo `true` o `false` según si se lo quiere activar o desactivar.
     * @return bool Retorna `true` si el registro fue actualizado exitosamente, `false` en caso contrario.
     */
    public static function actualizarCantidad (int $insumo_id, int $cantidad) : bool {
        // Se optó porque sea estático para que no sea necesario crear un objeto entero solamente
        // para actualizar la cantidad.
        return self::actualizar(
            [
                "insumo_id" => $insumo_id,
                "cantidad"  => $cantidad
            ]
        );
    }

    /**
     * Verficar si existe un Insumo en la base de datos
     * 
     * @return bool Retorna `true` si el insumo ya es existente, `false` en caso contrario.
     */
    public function esExistente(): bool{
        $resultado = $this->encontrarPorID($this->insumo_id);
        return !empty($resultado);
    }

     public static function obtenerHistorial(): array {
        $consulta = "
          SELECT 
                ra.log_id,
                ra.insumo_id,
                ra.fecha_cambio,
                ra.tipo_cambio,
                ra.valor_antes,
                ra.valor_despues,
                ra.detalle AS motivo,
                u.nombre AS usuario,
                i.nombre AS nombre_insumo
            FROM registro_actividades ra
            JOIN usuario u ON ra.usuario_id = u.usuario_id
            LEFT JOIN inventario i ON ra.insumo_id = i.insumo_id
            ORDER BY ra.fecha_cambio DESC
        ";
        return static::$conexion_bd->realizarConsulta($consulta);
    }
    // public function actualizarDisponibilidad() {

    // return $this->actualizar(
    //     [
    //         static::$pk_bd => $this->insumo_id,
    //         "disponibilidad" => $this->disponiblidad
    //     ]
    // );
    
    // Getters y Setters
    
    // Getter y setter para insumo_id
    public function getInsumoId() : ?int {
        return $this->insumo_id;
    }

    public function setInsumoId(int $insumo_id) {
        $this->insumo_id = $insumo_id;
    }

    // Getter y setter para nombre
    public function getNombre() : string {
        return $this->nombre;
    }

    public function setNombre(string $nombre) {
        $this->nombre = $nombre;
    }

    // Getter y setter para categoria
    public function getCategoria() : Categoria {
        return $this->categoria;
    }

    public function setCategoria(Categoria $categoria) {
        $this->categoria = $categoria;
    }

    // Getter y setter para cantidad
    public function getCantidad() : float {
        return $this->cantidad;
    }

    public function setCantidad(int $cantidad) {
        $this->cantidad = $cantidad;
    }

    // Getter y setter para cantidadMinima
    public function getCantidadMinima() : float {
        return $this->cantidad;
    }

    public function setCantidadMinima(int $cantidadMinima) {
        $this->cantidadMinima = $cantidadMinima;
    }

    // Getter y setter para unidad
    public function getUnidad(): string {
        return $this->unidad;
    }

    public function setUnidad(string $unidad) {
        $this->unidad = $unidad;
    }

    // Getter y setter para precioUnitario
    public function getPrecioUnitario() : float {
        return $this->precioUnitario;
    }

    public function setPrecioUnitario(float $precioUnitario) {
        $this->precioUnitario = $precioUnitario;
    }
}

    