
export async function verificarSesion() {
    try {
        const response = await fetch(`/api/estadoSesion`, {
            method: "GET",
            credentials: "include",
        });

        if (response.status === 200) {
            const data = await response.json();
            return { success: true, data: data.usuario };
        }

        if (response.status === 401) {
            return { success: false, message: "Sesión no iniciada", code: 401 };
        }

        if (response.status === 403) {
            return { success: false, message: "Acceso denegado", code: 403 };
        }

        return { success: false, message: "Error al verificar sesión" };
    } catch (error) {
        // console.error("Error en verificarSesion:", error);
        return { success: false, message: data.message || "Error del servidor" };
    }
}

export async function loginUsuario(credenciales) {
    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                correo: credenciales.loginCorreo,
                contrasena: credenciales.loginContrasena,
            }),
        });


        const dataRes = await res.json();

        if (response.status === 200 && dataRes.success) {
            return { success: true, message: data.message || "Sesión iniciada"};
        }

        return { success: false, message: "Credenciales inválidas", data: []};
    } catch (error) {
        // console.error("Error en login:", error);
        return { success: false, message: data.message || "Error del servidor" };
    }
}

export async function logoutUsuario() {
    try {
        const res = await fetch("/api/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const dataRes = await res.json();

        if (response.status === 200 && dataRes.success) {
            return { success: true, message: data.message || "Sesión cerrada"};
        }

        return { success: false, message: data.message || "Ocurrió un error cerrando sesión" };
    } catch (error) {
        // console.error("Error en logout:", error);
        return { success: false, message: data.message || "Error del servidor" };
    }
}
