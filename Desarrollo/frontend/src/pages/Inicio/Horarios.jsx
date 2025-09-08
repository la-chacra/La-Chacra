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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.546731919751!2d-57.59506732521384!3d-30.278493474806517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95acd7fae122a4d3%3A0xaea5a6f448772d48!2sLa%20Chacra!5e0!3m2!1ses!2suy!4v1757120390819!5m2!1ses!2suy"
            className="w-full h-64 border-0 mt-2"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
