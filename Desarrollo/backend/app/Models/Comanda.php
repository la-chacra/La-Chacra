<?php

namespace App\Models;

use App\Models\ModeloBase;
use DateTime;

/**
 * Enum Estado
 *
 * Representa los posibles estados de una comanda.
 * Cada valor del enum corresponde a un estado específico en el ciclo de vida de una comanda.
 *
 * @package App\Models
 */
enum Estado: string {
    case EnProceso = 'EnProceso';
    case Finalizado = 'Finalizado';
    case Cancelado = 'Cancelado';
}

class Comanda extends ModeloBase {

    // Configuración de la tabla
    protected static string $pk_bd = "comanda_id";
    protected static string $tabla_bd = "comanda";
    protected static array $columnas_bd = ["comanda_id", "n_mesa", "estado", "nota", "fecha"];

    

    // Atributos de la clase
    private ?int $comanda_id = null;
    private int $n_mesa; 
    private Estado $estado;
    private string $nota; 
    private DateTime $fecha;

    public function __construct(array $datos = []) {
        $this->comanda_id = $datos["comanda_id"] ?? null;
        $this->n_mesa     = $datos["n_mesa"] ?? 0;
        $this->estado     = isset($datos["estado"]) ? Estado::from($datos["estado"]) : Estado::EnProceso;
        $this->nota       = $datos["nota"] ?? "";
        $this->fecha      = isset($datos["fecha"]) ? new DateTime($datos["fecha"]) : new DateTime();
    }

    
    /**
     * Registra una nueva comanda en el sistema.
     *
     * @return bool Retorna true si la comanda se registró correctamente, false en caso contrario.
     */
    public function registrarComanda(): bool {
        return $this->crearRegistro([
            "comanda_id" => $this->comanda_id,
            "n_mesa"     => $this->n_mesa,
            "estado"     => $this->estado->value,
            "nota"       => $this->nota,
            "fecha"      => $this->fecha->format("Y-m-d H:i:s")
        ]);
    }

    
    /**
     * Modifies the current Comanda instance.
     *
     * @return bool Returns true if the modification was successful, false otherwise.
     */
    public function modificarComanda(): bool {
        return $this->actualizar([
            "comanda_id" => $this->comanda_id,
            "n_mesa"     => $this->n_mesa,
            "estado"     => $this->estado->value,
            "nota"       => $this->nota,
            "fecha"      => $this->fecha->format("Y-m-d H:i:s")
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
    public function getComanda_id()
    {
        return $this->comanda_id;
    }

    /**
     * Set the value of comanda_id
     *
     * @return  self
     */ 
    public function setComanda_id($comanda_id)
    {
        $this->comanda_id = $comanda_id;

        return $this;
    }

    /**
     * Get the value of n_mesa
     */ 
    public function getN_mesa()
    {
        return $this->n_mesa;
    }

    /**
     * Set the value of n_mesa
     *
     * @return  self
     */ 
    public function setN_mesa($n_mesa)
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

  
    