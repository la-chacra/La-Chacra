<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Database;


//Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase
enum Estado {
    case EnProceso;
    case Finalizado;
    case Cancelado;
    
}

class Comanda{

    //self:: Errores
    protected static $errores = [];

    private int $id_comanda;
    private int $id_mesa; 
    private estado $estado;
    private string $nota; 
    private DateTime $fecha;

    public function __construct(int $id_comanda, int $id_mesa, estado $estado, string $nota, string $fecha) {
        $this->id_comanda = $id_comanda;
        $this->id_mesa = $id_mesa;
        $this->estado = $estado;
        $this->nota = $nota;
        $this->fecha = new DateTime($fecha);


    }

    /**
     * Realizar el registro de un comanda en la Base de Datos
     * 
     * @param comanda $comanda Recibe una solicitud
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function registrarComanda (Comanda $comanda) : bool{
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO comanda (id_comanda, id_mesa, estado, nota, fecha) VALUES (:id_comanda, :id_mesa, :estado, :nota, :fecha)", 
            ['id_comanda' => $comanda->id_comanda, '$id_mesa' => $comanda->id_mesa, 'estado' => $comanda->estado, 'nota' => $comanda->nota,
             'fecha' => $comanda->fecha]
        );
    }

    public function crearComanda() {
        $query = "SELECT * FROM comanda";
        
}
    public function modificarComanda() {
        $query = "SELECT * FROM comanda";
        
}
    public function eliminarComanda() {
        $query = "SELECT * FROM comanda";
        
}
    public function imprimirComanda() {
        $query = "SELECT * FROM comanda";
        
}

    

    /**
     * Get the value of id_comanda
     */ 
    public function getId_comanda()
    {
        return $this->id_comanda;
    }

    /**
     * Set the value of id_comanda
     *
     * @return  self
     */ 
    public function setId_comanda($id_comanda)
    {
        $this->id_comanda = $id_comanda;

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
     * Get the value of nota
     */ 
    public function getNota()
    {
        return $this->nota;
    }

    /**
     * Set the value of nota
     *
     * @return  self
     */ 
    public function setNota($nota)
    {
        $this->nota = $nota;

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