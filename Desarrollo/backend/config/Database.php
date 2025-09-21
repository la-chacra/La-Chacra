<?php

namespace Config;

require dirname(__DIR__) . '/vendor/autoload.php';

use Dotenv\Dotenv;
use PDO;
use PDOException;


class Database {
    
    private PDO $db;

    public function __construct() {
        
        // Dotenv es una Libreria para manejar variables de entorno, lo que se usa en ella es:

        // createInmutable() : crea un objeto Dotenv para cargar las variables
        // __DIR__           : es una constante que devuelve la ruta del directorio donde está el archivo actual
        // dirname()         : método que retorna el directorio padre del indicado

        // Se hace así porque __DIR__ = config, y el ".env" está en "backend"

        if (!isset($_ENV['DB_HOST'])) {
            $dotenv = Dotenv::createImmutable(dirname(__DIR__));
            $dotenv->load();
        }
        
        try {
            $this->db = new PDO(
                "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
                $_ENV['DB_USER'],   // usuario
                $_ENV['DB_PASS']    // contraseña
            );

            // Hace que si hay un error, PDO lance una excepción
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e){
            exit($e);
        }
    }

    /** 
     * Realizar una consulta SQL SELECT
     * 
     * @param string $consulta String con la consulta SQL
     * @param array $parametros Parametros de la consulta
     * @param int $modo Modo de devolución de los datos. Predeterminado como FETCH_ASSOC
     * @return array Resultado de la consulta
     */
    public function realizarConsulta(string $consulta, array $parametros = [], int $modo = PDO::FETCH_ASSOC) : array {
        $stmt = $this->db->prepare($consulta);
        $stmt->execute($parametros);
        return $stmt->fetchAll($modo);
    }

    /** 
     * Ejecutar una consulta en la Base de Datos, realiza todas las operaciones SQL menos SELECT
     * 
     * @param string $consulta String con la consulta SQL
     * @param array $parametros Parametros de la consulta
     * @return bool Verdadero o Falso según la consulta se pudo ejecutar o no
     */
    public function ejecutarConsulta(string $consulta, array $parametros = []) : bool {
        $stmt = $this->db->prepare($consulta);
        return $stmt->execute($parametros);
    }

    public function getPDO() : PDO {
        return $this->db;
    }
}






