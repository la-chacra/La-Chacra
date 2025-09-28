<?php

namespace App\Models;

use App\Models\ModeloBase;
use App\Models\Usuario;
use DateTime;

// Enum para estado de la reserva
enum EstadoReserva : string {
    case PENDIENTE = "Pendiente";
    case CONFIRMADA = "Confirmada";
    case CANCELADA = "Cancelada";
    case FINALIZADA = "Finalizada";
}

class Reserva extends ModeloBase {

    // -- Atributos de la Base de Datos
    protected static string $pk_bd      = "reserva_id";
    protected static string $tabla_bd   = "reserva";
    protected static array  $columnas_bd = [
        "id_reserva",
        "id_usuario",
        "fecha_hora",
        "cantPersonas",
        "estado",
        "activa"
    ];

    // -- Atributos
    private ?int $reserva_id;
    private ?Usuario $usuario;
    private DateTime $fechaHora;
    private int $cantPersonas;
    private EstadoReserva $estado;

    // -- Constructor
    public function __construct(?Usuario $usuario = null, string $fechaHora, int $cantPersonas, EstadoReserva $estado) {
        $this->reserva_id = null;
        $this->usuario = $usuario;
        $this->fechaHora = new DateTime($fechaHora);
        $this->cantPersonas = $cantPersonas;
        $this->estado = $estado;
    }

   
    /**
     * Registra una nueva reserva en el sistema.
     *
     * @return bool Retorna true si la reserva se registró exitosamente, false en caso contrario.
     */
    public function registrarReserva(): bool {
        $resultado = $this->crearRegistro(
            [
            "id_usuario"   => $this->usuario->getId(),
            "fecha_hora"   => $this->fechaHora->format('Y-m-d H:i:s'),
            "cantPersonas" => $this->cantPersonas,
            "estado"       => $this->estado,
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
            "id_usuario"   => $this->usuario->getId(),
            "fecha_hora"   => $this->fechaHora->format('Y-m-d H:i:s'),
            "cantPersonas" => $this->cantPersonas,
            "estado"       => $this->estado,
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

    // Getters y Setters

    // Getter y setter de reserva_id
    public function getReservaId() : int {
        return $this->reserva_id;
    }

    public function setReservaId (int $reserva_id) {
        $this->reserva_id = $reserva_id;
    }


    // Getter y setter de usuario
    public function getUsuario() : Usuario {
        return $this->usuario;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
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


    

 