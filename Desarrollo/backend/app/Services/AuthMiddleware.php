<?php

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
            "/api/reservas/registrar",
            "/api/reservas/cancelar",
            "/api/reservas/actualizar"
        ],
        "E" => [ // E = empleado
            /* Empleado (operaciones sobre comandas gestionadas por empleados)
               Rutas definidas en public/index.php usan el prefijo /api/gestion/comanda */
            "/api/gestion/comanda/crear",
            "/api/gestion/comanda/actualizar",
            /* si en el futuro existe un endpoint de listado para empleados, agregarlo aquí */
        ],
        "A" => [ // A = admin
            // Reservas (admin)
            "/api/reservas/obtener",
            "/api/reservas/obtener/{id}",
            "/api/reservas/modificar/{id}",
            "/api/reservas/desactivar/{id}",
            // Comanda (gestión)
            "/api/gestion/comanda/crear",
            "/api/gestion/comanda/actualizar",
            // Estadísticas
            "/api/estadistica/obtenerDashboard",
            "/api/estadistica/topPlatos",
            "/api/estadistica/pedidosTotales",
            "/api/estadistica/reservasTotales",
            "/api/estadistica/gananciasTotales",
            "/api/estadistica/obtenerTendenciasEstacionales",
            "/api/estadistica/obtenerRankingProductos",
            "/api/estadistica/obtenerRankingReservas",
            "/api/estadistica/obtenerRankingVentas",
            // Stock / Insumos
            "/api/stock",
            "/api/stock/{id}",
            "/api/stock/registrar",
            "/api/stock/{id}/modificar",
            "/api/stock/{id}/desactivar",
            "/api/stock/{id}/activar",
            /* también hay endpoints en StockController que usan /api/insumo/... */
            "/api/insumo/eliminar",
            "/api/insumo/actualizar",
            // Empleados
            "/api/empleado/obtener",
            "/api/exportar-usuarios",
            "/api/empleado/registrar",
            "/api/empleado/desactivar/{id}",
            "/api/empleado/obtener/{id}",
            "/api/empleado/modificar/{id}",
            // Platos / Productos del menú
            "/api/productos-menu",
            "/api/productos-menu/{id}",
            "/api/productos-menu",
            "/api/productos-menu/{id}",
            "/api/productos-menu/desactivar/{id}",
            
            
             
        ]
    ];

    /**
     * Lista de endpoints de la API que están exentos de las comprobaciones de autenticación.
     * Las solicitudes a estos endpoints omitirán el middleware de autenticación.
     *
     * @var array<string>
     */
    private const whitelist = [
        "/api/login",
        "/api/registro",
        "/api/logout",
        "/api/estadoSesion",
        // Recuperar contraseña (deben ser públicos para poder iniciar el flujo de recuperación)
        "/api/recuperar/enviarCodigo",
        "/api/recuperar/cambiarPassword"
    ];


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
            http_response_code(401); // 401 : error de credenciales
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

        // Soporte simple para rutas con parámetros como /api/stock/{id}.
        foreach($accesoURLs as $url) {
            // ruta exacta
            if ($urlActual === $url) return;

            // si la ruta permitida contiene un placeholder {, comparamos por prefijo
            $pos = strpos($url, '{');
            if ($pos !== false) {
                $prefix = rtrim(substr($url, 0, $pos), '/');
                // permitir coincidencias con y sin slash después del prefijo
                if ($prefix !== '' && (strpos($urlActual, $prefix) === 0)) {
                    return;
                }
            }
            // permitir rutas que son prefijos (por ejemplo /api/productos-menu matches /api/productos-menu/123)
            if (substr($url, -1) === '/') {
                $trimmed = rtrim($url, '/');
                if ($trimmed !== '' && strpos($urlActual, $trimmed) === 0) return;
            }
        }
        
        http_response_code(403);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["success" => false, "message" => "Acceso denegado."]);
        exit;
    }
}