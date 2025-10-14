<?php

namespace App\Services;

use Exception;

class ControllerService {

    public static function handlerErrorConexion(callable $fn) {
        try {

            return $fn();
        } catch (Exception $e) {
            $mensajeError = $e->getMessage();

            if (
                // Errores "recueprables" 
                str_contains($mensajeError, "Connection") ||
                str_contains($mensajeError, "timeout") ||
                str_contains($mensajeError, "Deadlock")
            ) {
                $intentos = 0;
                $maxIntentos = 5;

                $ultimoError = null;

                while($intentos < $maxIntentos) {
                    try {
                        
                        return $fn(); 
                    } catch (Exception $e) {
                        $ultimoError = $e;
                        $intentos++;
                        usleep(200000); // 0.2 segundos
                    } 
                }

                throw new Exception("Error persistente tras {$maxIntentos}: " . $ultimoError->getMessage());
            } else {
                throw $e;
            }            
        }
    }
}