import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function RutaProtegida({ rolRequerido }) {
    const { autenticado, usuario, cargando } = useAuth();

    if (cargando) return (
        <div className="bg-black h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!autenticado) return <Navigate to="/autenticacion" />;
    if (rolRequerido) {
        const tipo = usuario?.tipo;

        // Admin ("A") tiene acceso a todo
        // Empleado ("E") accede solo a rutas de empleado
        // Cliente ("C") solo a cliente
        const accesoPermitido =
            tipo === rolRequerido || tipo === "A";

        if (!accesoPermitido) {
            return <Navigate to="/acceso-denegado" />;
        }
    }

    return <Outlet />;
}
