import React from "react";
import fotoMision from "../../assets/fotoMision.jpg";

export default function Mision() {
  return (
    <section className="bg-[#f8f5ef] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-green-900 text-white rounded-lg shadow-md p-6 flex items-center gap-6">
          
          {/* Imagen/avatar */}
          <div className="flex-shrink-0">
            <img
              src={fotoMision}
              alt="Nuestra misión"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <h3 className="bg-black text-white px-3 py-1 rounded inline-block font-bold mb-4">
              Nuestra misión
            </h3>
            <p className="leading-relaxed text-gray-100">
              Ofrecer a nuestros clientes una experiencia gastronómica única, 
              combinando ingredientes orgánicos y frescos con recetas cuidadas, 
              promoviendo un estilo de vida saludable y respetuoso con la naturaleza, 
              mientras brindamos un servicio cálido y cercano.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
