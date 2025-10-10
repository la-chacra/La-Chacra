import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
export const AuthContext = createContext();

// Componente proveedor del contexto
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Estados de sesión
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);

  // --- FUNCIONES PRINCIPALES ---
  // login(): establece sesión tras autenticarse
  const login = async (credenciales) => {
    return await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          correo: loginCorreo,
          contrasena: loginContrasena,
        }),
      });
  };

  // logout(): destruye sesión en backend y limpia datos locales
  const logout = async () => {
    // todo: implementar
  };

  // checkSesion(): consultar /api/estadoSesion para verificar sesión
  const checkSesion = async () => {
    // todo: implementar
  };

  // Al montar el componente, verificar sesión automáticamente
  useEffect(() => {
    checkSesion();
  }, []);

  // Proveer valores y funciones a toda la app
  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado,
        cargando,
        login,
        logout,
        checkSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
