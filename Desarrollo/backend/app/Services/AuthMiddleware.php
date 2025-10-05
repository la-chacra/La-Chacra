<?

namespace App\Services;

/**
 * Clase AuthMiddleware
 *
 * Middleware de autenticación y autorización para la API.
 *
 * Esta clase proporciona métodos estáticos para:
 * - Verificar si el usuario tiene una sesión activa antes de acceder a rutas protegidas.
 * - Validar si el usuario tiene permisos suficientes para acceder a determinados endpoints según su rol.
 *
 * Características:
 * - Define un mapa de accesos por tipo de usuario (cliente, empleado, administrador).
 * - Permite especificar rutas exentas de autenticación y autorización (whitelist).
 * - Responde con códigos HTTP y mensajes JSON apropiados en caso de acceso no autorizado o denegado.
 *
 * Métodos:
 * @method static void verificarSesion() Verifica si el usuario tiene una sesión activa o responde con 401.
 * @method static void verificarPermisos() Verifica si el usuario tiene permisos para la URL actual o responde con 401/403.
 */
class AuthMiddleware {

    /**
     * Mapa de accesos por rol de usuario.
     *
     * Esta constante define las rutas de la API a las que cada tipo de usuario puede acceder.
     * 
     * Claves:
     * - "C": Cliente. Permisos para crear, cancelar y actualizar reservas.
     * - "E": Empleado. Permisos para crear y listar comandas.
     * - "A": Administrador. Permisos para gestionar reservas, empleados, comandas y estadísticas.
     *
     * @var array<string, array<string>>
     */
    private const mapaDeAccesos = [
        "C" => [ // C = cliente
            "/api/reserva/crear",
            "/api/reserva/cancelar",
            "/api/reserva/actualizar"
        ],
        "E" => [ // E = empleado
            "/api/comanda/crear",
            "/api/comanda/listar"
        ],
        "A" => [ // A = admin
            "/api/gestion/reserva",
            "/api/gestion/empleados",
            "/api/gestion/comanda",
            "/api/gestion/estadisticas"
        ]
    ];

    /**
     * Lista de endpoints de la API que están exentos de las comprobaciones de autenticación.
     * Las solicitudes a estos endpoints omitirán el middleware de autenticación.
     *
     * @var array<string>
     */
    private const whitelist = ["/api/login", "/api/registro", "/api/logout", "/api/estadoSesion"];


    /**
     * Verifica si el usuario tiene una sesión activa.
     *
     * - Obtiene la URL actual desde la variable `$_SERVER["PATH_INFO"]`.
     * - Si la URL está en la lista blanca (`whitelist`), omite la validación de sesión.
     * - Si no existe un identificador de usuario en la sesión (`$_SESSION["usuario_id"]`), 
     *   responde con un código HTTP 401 y un mensaje JSON indicando que se debe iniciar sesión.
     * - Si la validación es exitosa o la URL está en la whitelist, la función retorna sin hacer nada.
     *
     * @return void Si la verificación es exitosa.
     */
    public static function verificarSesion() {
        $urlActual = $_SERVER["PATH_INFO"] ?? "/";

        if (in_array($urlActual, self::whitelist)) return; // Si la URL está en la whitelist, evita validaciones

        if(empty($_SESSION["usuario_id"])) {
            http_response_code(401); // 401 : se asocia con credenciales de autenticación no válidas
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode(["success" => false, "message" => "Debe iniciar sesión"]);
            exit;
        }

        return;
    }

    /**
     * Verifica si el usuario tiene permisos para acceder a la URL actual.
     *
     * - Si la URL está en la whitelist, permite el acceso sin validaciones adicionales.
     * - Si la sesión no contiene un tipo de usuario válido, retorna un error 401 (no autorizado).
     * - Si el tipo de usuario no está definido en el mapa de accesos, retorna un error 403 (acceso denegado).
     * - Si la URL actual está permitida para el tipo de usuario, permite el acceso.
     * - Si ninguna condición anterior se cumple, retorna un error 403 (acceso denegado).
     *
     * @return void Si la verificación es exitosa.
     */
    public static function verificarPermisos() {
        $urlActual = $_SERVER["PATH_INFO"] ?? "/";

        if (in_array($urlActual, self::whitelist)) return; // Si la URL está en la whitelist, evita validaciones

        $tipo = $_SESSION["tipo"];

        if (empty($_SESSION["tipo"])) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Sesión inválida o expirada."]);
            exit;
        }


        if(!array_key_exists($tipo, self::mapaDeAccesos)) {
            http_response_code(403); // 403 : Forbidden, error que demuestra un acceso denegado
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode(["success" => false, "message" => "Acceso denegado."]);
            exit;
        }

        $accesoURLs = self::mapaDeAccesos[$tipo];

        foreach($accesoURLs as $url) {
            if($urlActual === $url) {
                return;
            }
        }
        
        http_response_code(403);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["success" => false, "message" => "Acceso denegado."]);
        exit;
    }
}