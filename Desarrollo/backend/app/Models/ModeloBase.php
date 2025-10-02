<?php

namespace App\Models;

use App\Config\Database;

// Arreglar validaciones, agregar excepciones de la bd (que si la bd no responde, lance una ex)

abstract class ModeloBase {

    protected static $conexion_bd;

    /**
     * Define la tabla de la BD de cada clase, se debe redifinir en cada una. Ej: en Usuario.php, public static $tabla_bd = "usuario".
     * Variable estática, Variable estática, pertenecerá a la clase (que herede de ModeloBase) donde se esté utilizando y llamando los métodos de ModelosBase.
     * 
     * @var string $tabla_bd
     */
    protected static string $tabla_bd = "";

    /**
     * Columnas de una Tabla en la Base de Datos.
     * Variable estática, pertenecerá a la clase (que herede de ModeloBase) donde se esté utilizando y llamando los métodos de ModelosBase.
     * 
     * @var array $columnasBD
     */
    protected static array $columnas_bd = [];

    /**
     * PK de una Tabla en la Base de Datos.
     * Variable estática, pertenecerá a la clase (que herede de ModeloBase) donde se esté utilizando y llamando los métodos de ModelosBase.
     * 
     * @var string $pk_bd
     */
    protected static string $pk_bd = "";


    public static function setDB($database) {
        self::$conexion_bd = $database;
    }

    // ------------------------------------------------------------------
    // Principios CRUD - Create, Read, Update, Delete
    // ------------------------------------------------------------------

    /**
     * Crea un nuevo registro en la base de datos utilizando los datos proporcionados.
     *
     * Este método toma un array asociativo de datos, valida que las claves coincidan con las columnas
     * definidas en la base de datos y construye dinámicamente una consulta SQL de inserción.
     * Utiliza placeholders para evitar inyección SQL y ejecuta la consulta usando la conexión definida.
     *
     * @param array<string, mixed> $column_datos Array asociativo donde las claves son nombres de columnas y los valores son los datos a insertar. Debe ser [columna_a_insertar => valor_a_insertar].
     * @return bool Devuelve true si la inserción fue exitosa, false si falló o si los datos proporcionados no son válidos.
     */
    public function crearRegistro (array $column_datos) : bool {

        // $columnas : variable con las columnas en la base de datos, array_insersect sirve para 
        // hacer intersección entre las columnas de las llaves de $column_datos y las que existen en las columnasBD definidas en una clase.
        $columnas = array_intersect(array_keys($column_datos), static::$columnas_bd);

        // Validaciones
        if(count($column_datos) === 0) return false;

        if(count($columnas) === 0) return false;
        
        // Armar placeholder ":columna"
        // Arrow Function: fn($col) => ":$col", igualmente se optó por usar función convencional
        $placeholders = array_map(function($col) {
            return ":$col";
        }, $columnas);

        $consulta = "INSERT INTO " . static::$tabla_bd . " (" . implode(", ", $columnas) . ") VALUES (" . implode(", ", $placeholders) . ")";

        // Filtrar $column_datos para que solo incluya las claves presentes en $columnas
        $datos_filtrados = array_intersect_key($column_datos, array_flip($columnas));

        return static::$conexion_bd->ejecutarConsulta($consulta, $datos_filtrados);
    }

    /**
     * Busca y retorna un registro de la base de datos por su ID.
     *
     * @param int $id El identificador único del registro a buscar.
     * @return array El registro encontrado como un arreglo asociativo, o un arreglo vacío si no se encuentra.
     */
    public static function encontrarPorID(int $id) : array {
        $consulta = "SELECT * FROM " . static::$tabla_bd . " WHERE " . static::$pk_bd . " = :id LIMIT 1";
        return static::$conexion_bd->realizarConsulta($consulta, ["id" => $id]);
    }

    /**
     * Busca y retorna un registro de la base de datos por su correo.
     * 
     * @param string $correo El correo eléctronico a buscar.
     * @return array|null El registro encontrado como un arreglo asociativo, o null si no se encuentra.
     */
    public static function encontrarPorCorreo(string $correo) : array|null {
        $consulta = "SELECT * FROM " . static::$tabla_bd . " WHERE " . "correo = :correo LIMIT 1";
        $resultado = static::$conexion_bd->realizarConsulta($consulta, ["correo" => $correo]);
        return $resultado[0] ?? null;
    }

    /**
     * Obtiene el ID del último registro insertado en la base de datos.
     *
     * @return int El ID del último registro insertado.
     */
    public function encontrarUltimoRegistro() : int {
        $pdo = self::$conexion_bd->getPDO();
        return (int) $pdo->lastInsertId();
    }

    /**
     * Obtiene todos los registros de una tabla de la base de datos.
     * 
     * @return array Un arreglo asociativo con todos los registros de una tabla_bd.
     */
    public static function traerTodos() : array {
        $consulta = "SELECT * FROM " . static::$tabla_bd;
        return static::$conexion_bd->realizarConsulta($consulta);
    }

    /**
     * Actualiza un registro en la base de datos con los datos proporcionados.
     *
     * Este método toma un arreglo asociativo de datos, filtra las columnas válidas
     * según la definición del modelo, y ejecuta una consulta SQL UPDATE para modificar
     * el registro correspondiente en la base de datos. La clave primaria no se actualiza.
     *
     * @param array $datos Arreglo asociativo con los datos a actualizar. Debe incluir la clave primaria.
     * @return bool El resultado de la ejecución de la consulta o resultados de validaciones
     */
    public function actualizar(array $datos) : bool { 

        $columnas = array_intersect(array_keys($datos), static::$columnas_bd);

        if (count($columnas) === 0) return false;

        $pk_bd = static::$pk_bd;
        $cols_place = [];
        foreach ($columnas as $col) {
            if ($col === $pk_bd) continue; // no actualizar la pk
            $cols_place[] = "$col = :$col";
        }

        if (count($cols_place) === 0) return false;

        $consulta = "UPDATE " . static::$tabla_bd . 
                    " SET " . implode(", ", $cols_place) .
                    " WHERE $pk_bd = :$pk_bd";

        // filtrar $datos para que solo contenga las columnas + pk
        $datos_filtrados = array_intersect_key($datos, array_flip($columnas));
        $datos_filtrados[$pk_bd] = $datos[$pk_bd];

        return static::$conexion_bd->ejecutarConsulta($consulta, $datos_filtrados);
    }

    /**
     * Elimina un registro de la base de datos.
     * 
     * Este método toma la ID del registro que se desea eliminar de la base de datos, junto a la
     * tabla y el nombre de la PK de la misma en la base de datos y ejectuta una consulta de DELETE
     * con el ID especificado.
     * 
     * 
     * 
     * @param int $id Identificar del registro a eliminar en la base de datos.
     * @return bool True o False dependiendo si se pudo realizar la operación o no.
     */
    public function eliminar(int $id) : bool {
        $consulta = "DELETE FROM " . static::$tabla_bd . " WHERE " . static::$pk_bd . " = :id";
        return static::$conexion_bd->ejecutarConsulta($consulta, ["id" => $id]);
    }

    // Agregar métodos de sanitización de datos. @mateoparentini @kehianmartins
}