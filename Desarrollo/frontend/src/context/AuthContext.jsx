import { createContext, useState, useEffect } from "react";
import { verificarSesion } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);

  // --- Verificar sesión con backend ---
  const checkSesion = async () => {
    setCargando(true);

    try {
      const sesion = await verificarSesion();

      if (sesion && sesion.success) {
        setUsuario(sesion.data);
        setAutenticado(!!sesion.autenticado);
        sessionStorage.setItem("usuario", JSON.stringify(sesion.data));
      } else {
        setUsuario(null);
        // cuando la verificación falla asumimos no autenticado
        setAutenticado(!!(sesion && sesion.autenticado));
        sessionStorage.removeItem("usuario");
      }
    } catch (error) {
      console.error("Error verificando la sesión:", error);
      setUsuario(null);
      setAutenticado(false);
    } finally {
      // siempre desactivar el estado de carga al finalizar
      setCargando(false);
    }
  };

  // Ejecutar una vez al montar
  useEffect(() => {
    checkSesion();
  }, []);

  // --- Manejo de login ---
  // Nota: no navegamos desde el contexto porque el AuthProvider
  // puede estar fuera del Router; la navegación debe hacerla el componente
  // que llama a login.
  const login = async (datosUsuario) => {
    setUsuario(datosUsuario);
    setAutenticado(true);
    sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  // --- Manejo de logout ---
  // Igual que en login, no hacemos navigate aquí.
  const logout = async () => {
    setUsuario(null);
    setAutenticado(false);
    sessionStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{
      usuario, autenticado, cargando, login, logout, checkSesion
    }}>
      {children}
    </AuthContext.Provider>
  );
}
