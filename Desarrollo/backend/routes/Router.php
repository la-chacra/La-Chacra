<?php

namespace Router;

class Router {

    private $rutasGET = [];
    private $rutasPOST = [];
    private $rutasPUT = [];
    private $rutasDELETE = [];

    public function get($url, $controlador) {
        $this->rutasGET[$url] = $controlador;
    }

    public function post($url, $controlador) {
        $this->rutasPOST[$url] = $controlador;
    }

    public function put($url, $controlador) {
        $this->rutasPUT[$url] = $controlador;
    }

    public function delete($url, $controlador) {
        $this->rutasDELETE[$url] = $controlador;
    }

    public function despachar() {
        $urlActual = $_SERVER["PATH_INFO"] ?? "/";
        $metodo = $_SERVER["REQUEST_METHOD"];

        if ($metodo === "GET") {
            $rutas = $this->rutasGET;
        } elseif ($metodo === "POST") {
            $rutas = $this->rutasPOST;
        } elseif ($metodo === "PUT") {
            $rutas = $this->rutasPUT;
        } elseif ($metodo === "DELETE") {
            $rutas = $this->rutasDELETE;
        } else {
            $rutas = [];
        }

        $controlador = null;
        $params = [];

        foreach ($rutas as $ruta => $handler) {
            if ($ruta === $urlActual) {
                $controlador = $handler;
                break;
            }

            $patron = preg_replace('#\{([^/]+)\}#', '([^/]+)', $ruta);
            $patron = "#^" . $patron . "$#";

            if (preg_match($patron, $urlActual, $matches)) {
                array_shift($matches);
                preg_match_all('#\{([^/]+)\}#', $ruta, $paramNames);
                $paramNames = $paramNames[1];

                $params = array_combine($paramNames, $matches);
                $controlador = $handler;
                break;
            }
        }

        if ($controlador) {
            if (is_array($controlador)) {
                [$clase, $funcion] = $controlador;
                $instancia = new $clase();
                $resultado = call_user_func([$instancia, $funcion], $this, $params);
            } else {
                $resultado = call_user_func($controlador, $this, $params);
            }

            header("Content-Type: application/json; charset=utf-8");
            echo json_encode($resultado);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
        }
    }
}
