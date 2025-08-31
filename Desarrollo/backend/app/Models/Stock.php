<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use database;

class Stock extends Productos{


    private int $cantidadActual;
    private int $cantidadMinima;
   

    public function __construct (int $cantidadActual, int $cantidadMinima) {
   
        $this->cantidadActual = $cantidadActual;
        $this->cantidadMinima = $cantidadMinima;
        
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
            "INSERT INTO cliente (cantidadActual, cantidadMinima) VALUES (:cantidadActual, :cantidadMinima)", 
            [
                'cantidadActual' => $this->cantidadActual, 
                'cantidadMinima' => $this->cantidadMinima, 
                
            ]
        );
    }


    /**
     * Realizar la autenticación de un Cliente en la Base de Datos
     * 
     * @return null Si el Cliente no existe
     * @return true|false Si la autenticación es válida o no
     */
   

    public function actualizarStock(){
        
    }
    public function verificarStock(){
        
    }
   


  

}