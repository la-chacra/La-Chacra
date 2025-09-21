<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Database;
use App\Models\Usuario;


//Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase
enum EstadoReserva {
    case Pendiente;
    case Confirmada;
    case Cancelada;
}

class Reserva{

    //self:: Errores
    protected static $errores = [];
    private Usuario $usuario;
    private int $id_reserva;
    private int $id_mesa; 
    private EstadoReserva $estado;
    private int $cantPersonas; 
    private DateTime $hora; 
    private DateTime $fecha;

    public function __construct(string $id_reserva, string $id_mesa, EstadoReserva $estado, string $hora, string $fecha, int $cantPersonas) {
        $this->id_reserva = $id_reserva;
        $this->id_mesa = $id_mesa;
        $this->cantPersonas = $cantPersonas;
        $this->estado = $estado;
        $this->hora = new DateTime($hora);
        $this->fecha = new DateTime($fecha);


    }

    /**
     * Realizar el registro de un reserva en la Base de Datos
     * 
     * @param Reserva $reserva Recibe una solicitud
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function registrarReserva (Reserva $reserva) : bool{
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO reserva (id_reserva, id_mesa, estado, hora, fecha) VALUES (:id_reserva, :id_mesa, :estado, :hora, :fecha)", 
            ['id_reserva' => $reserva->id_reserva, 'id_mesa' => $reserva->id_mesa, 'estado' => $reserva->estado, 'hora' => $reserva->hora,
             'fecha' => $reserva->fecha]
        );
    }
    private function getIdUsuario(): int {
    // Aquí se obtiene el id_usuario desde la clase Usuario
    return $this->usuario->getId();
}


    public function crearReserva () {
        $conexion_bd = new Database();
        $consulta = "INSERT INTO reservas (id_reserva, id_mesa, estado,hora,fecha) 
        VALUES (:id_reserva, :id_mesa, :estado, :hora, :fecha)";
        $resultado = $conexion_bd->ejecutarConsulta($consulta);
}
    

    public function cancelarReserva () {
        $conexion_bd = new Database();
        $consulta = "DELETE FROM reservas WHERE id_reserva = :id_reserva";
        $resultado = $conexion_bd->ejecutarConsulta($consulta); 
    
    }

    public function validarReserva () {
       $conexion_bd = new Database();
       $consulta = "SELECT * FROM reservas 
                    WHERE fecha = :fecha 
                    AND hora = :hora 
                    AND id_usuario = :id_usuario 
                    AND cantPersonas = :cantPersonas";
        $resultado = $conexion_bd->realizarConsulta($consulta);

        if ($consulta)  {
            $errores[] = "Esta reserva ya existe"; // La reserva ya existe
        } else {
            return true; // Se puede hacer la reserva
        }
    
       
    }


    

    // Getters y Setters
    public function getid_reserva () : int {
        return $this->id_reserva;
    }

    public function setid_reserva (int $id_reserva) {
        $this->id_reserva = $id_reserva;
    }
    public function getcantPersonas () : int {
        return $this->cantPersonas;
    }

    public function setcantPersonas (int $cantPersonas) {
        $this->cantPersonas = $cantPersonas;
    }

    public function getestado () : EstadoReserva {
        return $this->estado;
    }

    public function setestado (EstadoReserva $estado) {
        $this->estado = $estado;
    }

    public function gethora () : DateTime {
        return $this->hora;
    }

    public function sethora (DateTime $hora) {
        $this->hora = $hora;
    }

    public function getfecha () : DateTime {
        return $this->fecha;
    }

    public function setFechaNacimient (DateTime $fecha) {
        $this->fecha = $fecha;
    }

}