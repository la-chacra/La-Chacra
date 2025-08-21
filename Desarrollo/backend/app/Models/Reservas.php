<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Database;



//Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase
enum EstadoReserva {
    case Pendiente;
    case Confirmada;
    case Cancelada;
}

class Reserva {

    //self:: Errores
    protected static $errores = [];

    private int $id_reserva;
    private int $id_mesa; 
    private EstadoReserva $estado; 
    private DateTime $hora; 
    private DateTime $fecha;

    public function __construct(string $id_reserva, string $id_mesa, EstadoReserva $estado, string $hora, string $fecha) {
        $this->id_reserva = $id_reserva;
        $this->id_mesa = $id_mesa;
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
    public function registrar (Reserva $reserva) : bool{
        $conexion_bd = new Database;
        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO reserva (id_reserva, id_mesa, estado, hora, fecha) VALUES (:id_reserva, :id_mesa, :estado, :hora, :fecha)", 
            ['id_reserva' => $reserva->id_reserva, 'id_mesa' => $reserva->id_mesa, 'estado' => $reserva->estado, 'hora' => $reserva->hora,
             'fecha' => $reserva->fecha]
        );
    }

    public function crearReserva () {

    }

    public function cancelarReserva () {

    }

    public function validarReserva () {
             
        // if($this->estado){
        //     self::$errores[] = "Debes insertar un titulo";
        // }
        // if(!$this->precio){
        //     self::$errores[] = "Debes insertar un precio";
        // }
        // if(strlen($this->descripcion) < 50){//Debe escribir minimo 50 caracteres
        //     self::$errores[] = "Debes insertar un descripcion";
        // }
        // if( !$this->habitaciones){ 
        //     self::$errores[] = "Debes insertar un habitaciones";
        // }
        // if(!$this->wc){
        //     self::$errores[] = "Debes insertar un wc";
       
        
        // return self::$errores;
        // }
    }


    

    // Getters y Setters
    public function getid_reserva () : int {
        return $this->id_reserva;
    }

    public function setid_reserva (int $id_reserva) {
        $this->id_reserva = $id_reserva;
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