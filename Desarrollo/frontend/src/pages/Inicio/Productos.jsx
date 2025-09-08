import React from "react";
import productosOrganicos from "../../assets/productos-organicos.png";

export default function Productos() {
  return (
    <section className="bg-[#1c1c1c] py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Imagen */}
        <img
          src={productosOrganicos}
          alt="Productos orgánicos"
          className="bg-green w-full md:w-1/2 rounded-lg shadow-md"
        />

        {/* Texto */}
        <div className="bg-[#f8f5ef] p-7 rounded-lg shadow-md">
          <h2 className="bg-green-800 text-white px-3 py-1 rounded inline-block font-bold mb-4">
            Productos Orgánicos
          </h2>
          <p className="leading-relaxed">
            Cultivamos de manera responsable, cuidando cada detalle 
            para que disfrutes de ingredientes frescos y saludables 
            en nuestros platos. La calidad y el respeto por la tierra 
            nos definen.
          </p>
        </div>
      </div>
    </section>
  );
}
