import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const AccesoDenegado = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#212423] via-[#1C5E4C] to-[#2e302e] text-white p-6 text-center">
      {/* Icono principal */}
      <div className="bg-white/10 p-6 rounded-2xl shadow-xl mb-6">
        <ShieldAlert size={80} className="text-green-300 drop-shadow-md" />
      </div>

      {/* Texto principal */}
      <h1 className="text-4xl font-bold mb-4 text-green-100">
        Acceso Denegado
      </h1>
      <p className="text-lg text-green-200 max-w-md mb-8">
        No tienes permisos para acceder a esta sección.  
        Si crees que esto es un error, comunícate con el administrador del sistema.
      </p>

      {/* Botón de regreso */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-neutral-800 hover:bg-green-950 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
      >
        Volver
      </button>

    </div>
  );
};

export default AccesoDenegado;
