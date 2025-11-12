<?php

namespace App\Models;

use DateTime;
use App\Models\ModeloBase;
use App\Models\Enums\EstadoComanda;

/**
 * Clase Comanda
 *
 * Representa las comandas registradas por los mozos en el restaurante.
 * Gestiona el alta, actualización y eliminación de pedidos, así como su relación con mesas y usuarios.
 *
 * @package App\Models
 */
class Comanda extends ModeloBase {

    protected static string $pk_bd = "comanda_id";
    protected static string $tabla_bd = "comanda";
    protected static array $columnas_bd = ["comanda_id", "usuario_id", "n_mesa", "n_personas", "estado", "nota", "fecha_hora", "activa"];

    // Atributos de la clase
    private ?int $comanda_id = null;
    private int $usuario_id;
    private int $nMesa;
    private int $numPersonas;
    private EstadoComanda $estado;
    private string $nota;
    private DateTime $fecha;

    public function __construct(int $usuario_id, int $nMesa, int $numPersonas, EstadoComanda $estado, string $nota, string|DateTime $fecha) {
        $this->comanda_id  = null;
        $this->usuario_id = $usuario_id;
        $this->nMesa       = $nMesa;
        $this->numPersonas = $numPersonas;
        $this->estado      = $estado;
        $this->nota        = $nota;
        $this->fecha       = is_string($fecha) ? new DateTime($fecha) : $fecha;
    }

    public function registrarComanda(): bool {
        return $this->crearRegistro([
            "usuario_id"   => $this->usuario_id,
            "n_mesa"       => $this->nMesa,
            "n_personas"  => $this->numPersonas,
            "estado"       => $this->estado->value,
            "nota"         => $this->nota,
            "fecha"        => $this->fecha->format("Y-m-d H:i:s")
        ]);
    }

    public function modificarComanda(): bool {
        return $this->actualizar([
            "comanda_id"   => $this->comanda_id,
            "usuario_id"   => $this->usuario_id,
            "n_mesa"       => $this->nMesa,
            "n_personas"  => $this->numPersonas,
            "estado"       => $this->estado->value,
            "nota"         => $this->nota,
            "fecha"        => $this->fecha->format("Y-m-d H:i:s")
        ]);
    }


    
    /**
     * Elimina la comanda actual.
     *
     * @return bool Retorna true si la comanda fue eliminada exitosamente, false en caso contrario.
     */
    public function eliminarComanda(): bool {
        return $this->eliminar($this->comanda_id);
    }

    // Se necesirta ticketera 
    public static function imprimirComanda(){

        
        
    }



    // ------------------------------------------------------------------
    //  Getters y Setters 
    // ------------------------------------------------------------------


    /**
     * Get the value of comanda_id
     */ 
    public function getComandaId()
    {
        return $this->comanda_id;
    }

    /**
     * Set the value of comanda_id
     *
     * @return  self
     */ 
    public function setComandaId($comanda_id)
    {
        $this->comanda_id = $comanda_id;

        return $this;
    }

    /**
     * Get the value of n_mesa
     */ 
    public function getN_mesa()
    {
        return $this->nMesa;
    }

    /**
     * Set the value of n_mesa
     *
     * @return  self
     */ 
    public function setN_mesa($nMesa)
    {
        $this->nMesa = $nMesa;

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

    /**
     * Get the value of numPersonas
     */ 
    public function getnumPersonas()
    {
        return $this->numPersonas;
    }

    /**
     * Set the value of numPersonas
     *
     * @return  self
     */ 
    public function setnumPersonas($numPersonas)
    {
        $this->numPersonas = $numPersonas;

        return $this;
    }
}

  
    