<?php

namespace App\Models;

use App\Models\ModeloBase;
use App\Models\Usuario;
use App\Models\Enums\EstadoReserva;
use DateTime;

class Reserva extends ModeloBase {

    // -- Atributos de la Base de Datos
    protected static string $pk_bd      = "reserva_id";
    protected static string $tabla_bd   = "reserva";
    protected static array  $columnas_bd = [
        "reserva_id",
        "usuario_id",
        "fecha_hora",
        "cant_personas",
        "estado",
        "activa"
    ];

    // -- Atributos
    private ?int $reserva_id;
    private int $usuario_id;
    private DateTime $fechaHora;
    private int $cantPersonas;
    private EstadoReserva $estado;

    // -- Constructor
    public function __construct(int $usuario_id, string $fechaHora, int $cantPersonas, EstadoReserva $estado) {
        $this->reserva_id = null;
        $this->usuario_id = $usuario_id;
        $this->fechaHora = new DateTime($fechaHora);
        $this->cantPersonas = $cantPersonas;
        $this->estado = $estado;
    }

    /**
     * Buscar una reserva por ID y devolver un objeto Reserva
     */
    public static function buscarPorId(int $reserva_id): ?Reserva {
        $data = self::encontrarPorID($reserva_id);
        if (empty($data)) {
            return null;
        }
        $reserva = new Reserva(
            $data[0]["usuario_id"] ?? null,
            $data[0]["fechaHora"] ?? null,
            $data[0]["cantPersonas"] ?? null,
            $data[0]["estado"] ?? null
        );
        $reserva->reserva_id = $data[0]["reserva_id"];
        return $reserva;
    }

    /**
     * Registra una nueva reserva en el sistema.
     *
     * @return bool Retorna true si la reserva se registró exitosamente, false en caso contrario.
     */
    public function registrarReserva(): bool {
        $resultado = $this->crearRegistro(
            [
            "usuario_id"   => $this->usuario_id,
            "fecha_hora"   => $this->fechaHora->format('Y-m-d H:i:s'),
            "cant_personas" => $this->cantPersonas,
            "estado"       => $this->estado->value,
            ]
        );

        // Asignar el ID al objeto localmente
        $id = $this->encontrarUltimoRegistro();
        $this->reserva_id = $id[static::$pk_bd] ?? null;

        return $resultado;
    }

    /**
     * Actualizar datos de una reserva en una Base de Datos.
     * 
     * @return bool Si se pudo realizar la operación o no
     */
    public function actualizarDatos (): bool {
        return $this->actualizar(
            [
            "usuario_id"   => $this->usuario_id,
            "fecha_hora"   => $this->fechaHora->format('Y-m-d H:i:s'),
            "cant_personas" => $this->cantPersonas,
            "estado"       => $this->estado->value,
            ]
        );
    }

    /**
     * Elimina la reserva actual.
     *
     * @return bool Retorna true si la reserva fue eliminada exitosamente, false en caso contrario.
     */
    public function eliminarReserva(): bool {
        return $this->eliminar($this->reserva_id);
    }

   public static function obtenerReservas(): array {
    $consulta = "
        SELECT 
            r.reserva_id,
            CONCAT(u.nombre, ' ', u.apellido) AS nombre_completo,
            u.correo AS correo_electronico,
            r.cant_personas AS cantidad_personas,
            r.fecha_hora AS fecha,
            r.estado AS estado
        FROM 
            reserva r
        INNER JOIN 
            usuario u ON r.usuario_id = u.usuario_id
        WHERE 
            r.activa = 1
        ORDER BY 
            r.fecha_hora DESC;
    ";
    return static::$conexion_bd->realizarConsulta($consulta);
}


public static function actualizarActividad(int $reserva_id, bool $activa): bool {
    $estado = $activa ? 1 : 0;

    $query = "UPDATE reserva SET activa = $estado WHERE reserva_id = $reserva_id";

    // Usamos el método correcto según tu estructura
return static::$conexion_bd->realizarConsulta($query) !== false;
}



    // Getters y Setters

    // Getter y setter de reserva_id
    public function getReservaId() : int {
        return $this->reserva_id;
    }

    public function setReservaId (int $reserva_id) {
        $this->reserva_id = $reserva_id;
    }


    // Getter y setter de usuario
    public function getUsuario() : int {
        return $this->usuario_id;
    }

    public function setUsuario(int $usuario_id) {
        $this->usuario_id = $usuario_id;
    }

    // Getter y setter de estado
    public function getEstado() : EstadoReserva {
        return $this->estado;
    }

    public function setEstado(EstadoReserva $estado) {
        $this->estado = $estado;
    }

    // Getter y setter de cantPersonas
    public function getCantPersonas() : int {
        return $this->cantPersonas;
    }

    public function setCantPersonas(int $cantPersonas) {
        $this->cantPersonas = $cantPersonas;
    }

    // Getter y setter de fechaHora
    public function getFechaHora () {
        return $this->fechaHora;
    }

    public function setFechaHora(string $fechaHora) {
        $this->fechaHora = new DateTime($fechaHora);
    }
}


    

 