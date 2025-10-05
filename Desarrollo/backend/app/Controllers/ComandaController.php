<?php

namespace App\Controllers;

class Comanda {

    public function registrar($router) {

        if(empty($_SESSION["usuario_id"]) || $_SESSION["tipo"] == "C") {
            return ["success" => false, "message" => "Acceso Denegado", "c"];
        }
    }
}