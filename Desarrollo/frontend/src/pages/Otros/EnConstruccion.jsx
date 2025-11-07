import React from 'react';

import { useNavigate, Navigate} from "react-router-dom";
import enConstruccion from "../../assets/en-construccion.png";

export default function EnConstruccion() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-950">
      <div className="max-w-3xl w-full text-center">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-lg">
          <img
            src={enConstruccion}
            alt="Grúa construyendo sitio"
            className="mx-auto w-48 h-48 md:w-72 md:h-72 object-contain mb-6"
          />

          <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-800">
            En Construcción
          </h1>

          <p className="text-gray-600 mb-6">
            Este sitio está en construcción. Estamos trabajando para traerte una experiencia mejor. 
          </p>

          <div className="flex justify-center gap-3">
            <a
              href="/"
              className="inline-block px-5 py-2 rounded-full border border-transparent text-sm font-medium shadow-sm hover:shadow focus:outline-none bg-neutral-950 text-white"
            >
              Volver a Inicio
            </a>
            <a
              href="mailto:sparkindevelopment@gmail.com"
              className="inline-block px-5 py-2 rounded-full border border-gray-200 text-sm font-medium bg-white text-gray-700"
            >
              Enviar Correo
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-center text-gray-500">© La Chacra Gourmet</p>
      </div>
    </div>
  );
}
