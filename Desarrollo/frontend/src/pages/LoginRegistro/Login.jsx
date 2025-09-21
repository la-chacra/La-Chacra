import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f3eb]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
        <div className="flex items-center gap-2">
          {/* Aquí podrías poner el logo */}
          <img
            src="/logo.png"
            alt="La Chacra"
            className="h-10 w-auto"
          />
          <span className="font-semibold text-lg">la chacra</span>
        </div>
        <ul className="flex gap-6 text-sm font-medium">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Carta</a></li>
          <li><a href="#">Reserva</a></li>
          <li><a href="#">Eventos</a></li>
        </ul>
      </nav>

      {/* Login Section */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-black text-white rounded-xl shadow-lg overflow-hidden w-full max-w-3xl flex flex-col md:flex-row">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">
              INICIO DE SESIÓN
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                  className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-md bg-amber-600 hover:bg-amber-700 font-semibold"
              >
                INICIAR SESIÓN
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-400">
              o continua con...
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-800">
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-800">
                <FaFacebookF className="text-blue-500" /> Facebook
              </button>
            </div>
          </div>

          {/* Right: Logo & Register */}
          <div className="w-full md:w-1/2 bg-black flex flex-col justify-center items-center p-8 relative">
            <img
              src="/logo.png"
              alt="La Chacra"
              className="h-20 mb-4"
            />
            <h3 className="text-lg font-light tracking-wide mb-6">
              gourmet
            </h3>
            <p className="mb-4 text-sm">¿NO TENÉS UNA CUENTA?</p>
            <button className="px-6 py-2 rounded-md bg-amber-50 text-black font-semibold hover:bg-amber-200">
              REGISTRATE
            </button>

            {/* Efecto llamas (puedes reemplazar con un gif o animación real) */}
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-orange-600/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )

}