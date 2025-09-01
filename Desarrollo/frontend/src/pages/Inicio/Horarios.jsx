import React from "react";

export default function Horarios() {
  return (
    <section className="bg-[#1c1c1c] text-white py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
        
        {/* Horarios */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 shadow-md">
          <h2 className="flex items-center text-xl font-bold mb-4">
            <span className="mr-2">🕒</span> Horarios
          </h2>
          <ul className="space-y-3">
            <li>
              <p className="font-semibold">Viernes y Sábados</p>
              <p className="text-gray-300">11:30 a.m - 2:30 p.m</p>
              <p className="text-gray-300">8:30 p.m - 12 a.m</p>
            </li>
            <li>
              <p className="font-semibold">Domingos</p>
              <p className="text-gray-300">11:30 a.m - 2:30 p.m</p>
            </li>
          </ul>
          <button className="mt-6 bg-yellow-200 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">
            Hacé tu reserva
          </button>
        </div>

        {/* Mapa */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-black font-bold text-lg px-4 pt-4">¿Dónde estamos?</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="w-full h-64 border-0 mt-2"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
