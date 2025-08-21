<?php 

function conexion_bd() : mysqli {
    $db = new mysqli("localhost", "root", "admin", "lachacra_db"); 

    if(!$db){
        echo "Error";
        exit;
    }
    return $db;
}