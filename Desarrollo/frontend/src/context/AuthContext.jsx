import { createContext, useState, useEffect } from "react";
import { verificarSesion } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);

  // --- Verificar sesión con backend ---
  const checkSesion = async () => {
    try {
      const sesion = await verificarSesion();

      if (sesion.success) {
        setUsuario(sesion.data);
        setAutenticado(true);
        sessionStorage.setItem("usuario", JSON.stringify(sesion.data));
      } else {
        setUsuario(null);
        setAutenticado(false);
        sessionStorage.removeItem("usuario");
      }
    } catch (error) {
      console.error("Error verificando la sesión:", error);
      setUsuario(null);
      setAutenticado(false);
    } finally {
      setCargando(false);
    }
  };

  // Ejecutar una vez al montar
  useEffect(() => {
    checkSesion();
  }, []);

  // --- Manejo de login ---
  const login = async (datosUsuario) => {
    navigate("/");
    setUsuario(datosUsuario);
    setAutenticado(true);
    sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  // --- Manejo de logout ---
  const logout = async () => {
    navigate("/");
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
