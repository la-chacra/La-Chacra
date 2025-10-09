<?php

class ControllerService {

    public static function handlerErrorConexion(callable $fn, array $success, array $error) {
        try {
            $fn();
        } catch (Exception $e) {
            $mensajeError = $e->getMessage();

            if (
                str_contains($mensajeError, "Connection") ||
                str_contains($mensajeError, "timeout") ||
                str_contains($mensajeError, "Deadlock")
            ) {
                $intentos = 0;
                $maxIntentos = 5;
                $exito = false;

                while($intentos < $maxIntentos && !$exito) {
                    try {
                        $fn(); 
                        $exito = true;
                    } catch (Exception $e) {
                        $intentos++;
                        usleep(200000); // 0.2 segundos
                    } 
                }

                if ($exito) {
                    return $success;
                } else {
                    return $error;
                }
            } else {
                return false;
            }            
        }
    }
}