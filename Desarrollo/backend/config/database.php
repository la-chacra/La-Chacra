<?php

require dirname(__DIR__) . '/vendor/autoload.php';

// Libreria para manejar variables de entorno
use Dotenv\Dotenv;

// createInmutable() : crea un objeto Dotenv para cargar las variables
// __DIR__           : es una constante que devuelve la ruta del directorio donde está el archivo actual
// dirname()         : método que retorna el directorio padre del indicado

// Se hace así porque __DIR__ = config, y el ".env" está en "backend"
$dotenv = Dotenv::createImmutable(dirname(__DIR__));

$dovenv->load();

class Database {
    
    private PDO $db;

    public function __construct() {
        try {
            $this->db = new PDO(
                "mysql:host={$_ENV['DB_HOST']};" .  // host
                "dbname={$_ENV['DB_NAME']};" .      // nombre
                $_ENV['DB_USER'] .                  // usuario
                $_ENV['DB_PASS']                    // contraseña
            );
            
            // Hace que si hay un error, pdo lance una excepción
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e){
            exit($e);
        }
    }

    public function realizarConsulta(string $consulta, array $parametros = [], int $modo = PDO::FETCH_ASSOC) : array {
        $stmt = $this->db->prepare($consulta);
        $stmt->execute($parametros);
        return $stmt->fetchAll($modo);
    }

    public function ejecutarConsulta(string $consulta, array $parametros = [], int $modo = PDO::FETCH_ASSOC) : bool {
        $stmt = $this->db->prepare($consulta);
        return $stmt->execute($parametros);
    }
}






