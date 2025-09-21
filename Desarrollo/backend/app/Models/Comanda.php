<?php

namespace App\Models;

use DateTime;

// Se necesita espeficiar antes los valores del enum, para poder asignarlos en la clase

// Estados de una Comanda
enum Estado {
    case EnProceso;
    case Finalizado;
    case Cancelado;
    
}


/**
 * @todo Arreglar errores e implementar ModeloBase
 */
class Comanda extends ModeloBase {

    //self:: Errores
    protected static $errores = [];

    private int $comanda_id;
    private int $n_mesa; 
    private estado $estado;
    private string $nota; 
    private DateTime $fecha;

    public function __construct(int $comanda_id, int $n_mesa, estado $estado, string $nota, string $fecha) {
        $this->comanda_id = $comanda_id;
        $this->n_mesa = $n_mesa;
        $this->estado = $estado;
        $this->nota = $nota;
        $this->fecha = new DateTime($fecha);
    }

    /**
     * Realizar el registro de un comanda en la Base de Datos
     * 
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function registrarComanda () : bool{
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "INSERT INTO comanda (n_mesa, estado, nota, fecha) VALUES (:n_mesa, :estado, :nota, :fecha)", 
            [
                '$n_mesa' => $this->n_mesa,
                'estado'  => $this->estado, 
                'nota'    => $this->nota,
                'fecha'   => $this->fecha
            ]
        );
    }

    /**
     * Realizar la modificación de una comanda en la Base de Datos
     * 
     * @return bool Verdadero o Falso según se pudo realizar la operación o no
     */
    public function modificarComanda() : bool{
        $conexion_bd = new Database;

        return $conexion_bd->ejecutarConsulta(
            "UPDATE comanda SET n_mesa = :n_mesa, estado = :estado, fecha WHERE comanda_id = {$this->comanda_id};", 
            [
                '$id_mesa'      => $this->n_mesa,
                'estado'        => $this->estado, 
                'nota'          => $this->nota,
                'fecha'         => $this->fecha
            ]
        );
    }

    public function eliminarComanda() {
        $query = "SELECT * FROM comanda";
    }

    public function imprimirComanda() {
        $query = "SELECT * FROM comanda";
    }

    

    /**
     * Get the value of comanda_id
     */ 
    public function getcomanda_id()
    {
        return $this->comanda_id;
    }

    /**
     * Set the value of comanda_id
     *
     * @return  self
     */ 
    public function setcomanda_id($comanda_id)
    {
        $this->comanda_id = $comanda_id;

        return $this;
    }

    /**
     * Get the value of id_mesa
     */ 
    public function getId_mesa()
    {
        return $this->n_mesa;
    }

    /**
     * Set the value of id_mesa
     *
     * @return  self
     */ 
    public function setId_mesa($n_mesa)
    {
        $this->n_mesa = $n_mesa;

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