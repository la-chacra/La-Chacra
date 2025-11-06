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
  const login = async (credenciales, e) => {

  };

  // logout(): destruye sesión en backend y limpia datos locales
  const logout = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          correo: credenciales.id
        }),
      });

      const dataRes = await res.json();

      return dataRes;
    } catch (error) {
      return error;
    }

  };

  // checkSesion(): consultar /api/estadoSesion para verificar sesión
  const checkSesion = async () => {
    fetch("/api/estadoSesion", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUsuario(data.usuario);
        } else {
          setUsuario(null);
        }
      })
      .catch((err) => {
        console.error("Error verificando sesión:", err);
      })
      .finally(() => {
        setCargando(false);
      });
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
