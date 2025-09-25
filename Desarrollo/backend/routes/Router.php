<?php

namespace Router;

class Router {

    private $rutasGET = [];
    private $rutasPOST = [];

    public function get($url, $controlador){
        $this->rutasGET[$url] = $controlador;
    }

    public function post($url, $controlador){
        $this->rutasPOST[$url] = $controlador;
    }

    public function despachar() {
        $urlActual = $_SERVER["PATH_INFO"] ?? "/";
        $metodo = $_SERVER["REQUEST_METHOD"];

        if($metodo === "GET") {
            $controlador = $this->rutasGET[$urlActual] ?? null;
        } elseif ($metodo === "POST") {
            $controlador = $this->rutasPOST[$urlActual] ?? null;
        } else {
            $controlador = null;
        }

        if($controlador) {
            if(is_array($controlador)) {
                [$clase, $funcion] = $controlador;

                $instancia = new $clase();
                echo call_user_func([$instancia, $funcion], $this);
            } else {
                echo call_user_func($controlador, $this);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
        }

    }
}