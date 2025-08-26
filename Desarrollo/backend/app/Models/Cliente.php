<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use database;

class Cliente extends Usuario{

    private string $historialReserva;
   

    public function __construct (string $historialReserva) {
   
        $this->historialReserva = $historialReserva;
        
    }

    /**
     * Realizar el registro de un Cliente en la Base de Datos
     * 
     * @return true|false Según se pudo realizar la operación o no
     */
    public function registrar () : bool{
        $conexion_bd = new database;

        return $conexion_bd->ejecutarConsulta(
            // Los ":" al lado de los parámetros los hace poder insertarse con arrays asociativos. 
            "INSERT INTO cliente (historialReserva) VALUES (:historialReserva)", 
            [
                'historialReserva' => $this->historialReserva, 
                
            ]
        );
    }


    /**
     * Realizar la autenticación de un Cliente en la Base de Datos
     * 
     * @return null Si el Cliente no existe
     * @return true|false Si la autenticación es válida o no
     */
   

    public function realizarReserva(){
        
    }
    public function verCarta(){
        
    }
  


  

}
