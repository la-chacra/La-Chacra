<?php

namespace App\Models;

use App\Models\ModeloBase;
use DateTime;
use App\Models\Usuario;

// Enum para estado de la reserva
enum EstadoReserva {
    case Pendiente;
    case Confirmada;
    case Cancelada;
}

class Reserva extends ModeloBase {

    // Configuración de la tabla
    protected static string $pk_bd      = "id_reserva";
    protected static string $tabla_bd   = "reservas";
    protected static array  $columnas_bd = [
        "id_reserva",
        "id_mesa",
        "id_usuario",
        "estado",
        "hora",
        "fecha",
        "cantPersonas"
    ];

    // Errores
    protected static array $errores = [];

    // Atributos
    private ?int $id_reserva = null;
    private int $id_mesa;
    private ?Usuario $usuario = null;
    private EstadoReserva $estado;
    private int $cantPersonas;
    private DateTime $hora;
    private DateTime $fecha;

    public function __construct(array $datos = []) {
        $this->id_reserva   = $datos["id_reserva"] ?? null;
        $this->id_mesa      = $datos["id_mesa"] ?? 0;
        $this->usuario      = $datos["usuario"] ?? null; // Usuario o null
        $this->estado       = $datos["estado"] ?? EstadoReserva::Pendiente;
        $this->cantPersonas = $datos["cantPersonas"] ?? 1;
        $this->hora         = isset($datos["hora"]) ? new DateTime($datos["hora"]) : new DateTime();
        $this->fecha        = isset($datos["fecha"]) ? new DateTime($datos["fecha"]) : new DateTime();
    }

   
    /**
     * Registra una nueva reserva en el sistema.
     *
     * @return bool Retorna true si la reserva se registró exitosamente, false en caso contrario.
     */
    public function registrarReserva(): bool {
        return $this->crearRegistro([
            "id_reserva"   => $this->id_reserva,
            "id_mesa"      => $this->id_mesa,
            "id_usuario"   => $this->usuario->getId(),
            "estado"       => $this->estado->name,
            "hora"         => $this->hora->format('H:i:s'),
            "fecha"        => $this->fecha->format('Y-m-d'),
            "cantPersonas" => $this->cantPersonas
        ]);
    }

    /**
     * Registra una nueva reserva en el sistema.
     *
     * @return bool Retorna true si la reserva se registró correctamente, false en caso contrario.
     */
    public function modificarReserva(): bool {
        return $this->actualizar([
            "id_reserva"   => $this->id_reserva,
            "id_mesa"      => $this->id_mesa,
            "id_usuario"   => $this->usuario->getId(),
            "estado"       => $this->estado->name,
            "hora"         => $this->hora->format('H:i:s'),
            "fecha"        => $this->fecha->format('Y-m-d'),
            "cantPersonas" => $this->cantPersonas
        ]);
    }

    /**
     * Elimina la reserva actual.
     *
     * @return bool Retorna true si la reserva fue eliminada exitosamente, false en caso contrario.
     */
    public function eliminarReserva(): bool {
        return $this->eliminar($this->id_reserva);
    }

    /**
     * Validar si ya existe una reserva en la misma mesa, fecha y hora
     */
    public function validarReserva(): bool {
        $consulta = "SELECT * FROM reservas 
                     WHERE fecha = :fecha 
                       AND hora = :hora 
                       AND id_mesa = :id_mesa";

        $resultado = static::$conexion_bd->realizarConsulta($consulta, [
            ":fecha"   => $this->fecha->format('Y-m-d'),
            ":hora"    => $this->hora->format('H:i:s'),
            ":id_mesa" => $this->id_mesa
        ]);

        if (!empty($resultado)) {
            self::$errores[] = "Ya existe una reserva en esa mesita";
            return false;
        }

        return true;
    }

    /**
     * Obtener errores de validación
     */
    public static function getErrores(): array {
        return self::$errores;
    }

    /**
     * Get the value of id_reserva
     */ 
    public function getId_reserva()
    {
        return $this->id_reserva;
    }

    /**
     * Set the value of id_reserva
     *
     * @return  self
     */ 
    public function setId_reserva($id_reserva)
    {
        $this->id_reserva = $id_reserva;

        return $this;
    }

    /**
     * Get the value of id_mesa
     */ 
    public function getId_mesa()
    {
        return $this->id_mesa;
    }

    /**
     * Set the value of id_mesa
     *
     * @return  self
     */ 
    public function setId_mesa($id_mesa)
    {
        $this->id_mesa = $id_mesa;

        return $this;
    }

    /**
     * Get the value of usuario
     */ 
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * Set the value of usuario
     *
     * @return  self
     */ 
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * Get the value of estado
     */ 
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set the value of estado
     *
     * @return  self
     */ 
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get the value of cantPersonas
     */ 
    public function getCantPersonas()
    {
        return $this->cantPersonas;
    }

    /**
     * Set the value of cantPersonas
     *
     * @return  self
     */ 
    public function setCantPersonas($cantPersonas)
    {
        $this->cantPersonas = $cantPersonas;

        return $this;
    }

    /**
     * Get the value of hora
     */ 
    public function getHora()
    {
        return $this->hora;
    }

    /**
     * Set the value of hora
     *
     * @return  self
     */ 
    public function setHora($hora)
    {
        $this->hora = $hora;

        return $this;
    }

    /**
     * Get the value of fecha
     */ 
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set the value of fecha
     *
     * @return  self
     */ 
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;

        return $this;
    }
}


    

 