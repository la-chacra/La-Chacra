export async function verificarSesion() {
  try {
    const response = await fetch(`/api/estadoSesion`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, autenticado: data.authenticated, data: data.usuario};
    }

    if (response.status === 401) {
      return { success: false, autenticado: data.authenticated, message: "Sesión no iniciada", code: 401 };
    }

    if (response.status === 403) {
      return { success: false, autenticado: data.authenticated, message: "Acceso denegado", code: 403 };
    }

    return { success: false, message: "Error al verificar sesión" };
  } catch (error) {
    return { success: false, message: "Error del servidor" };
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

    const data = await res.json();

    if (res.ok && data.success) {
      return { success: true, usuario: data.usuario, message: "Sesión iniciada" };
    }

    return { success: false, message: data.message || "Credenciales inválidas" };
  } catch (error) {
    return { success: false, message: "Error del servidor" };
  }
}

export async function logoutUsuario() {
  try {
    const res = await fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok && data.success) {
      return { success: true, message: "Sesión cerrada correctamente" };
    }

    return { success: false, message: "Ocurrió un error cerrando sesión" };
  } catch (error) {
    return { success: false, message: "Error del servidor" };
  }
}