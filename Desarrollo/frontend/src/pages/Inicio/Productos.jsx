import React from "react";


export default function Productos() {
  return (
    <section className="bg-white-500 py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Imagen */}
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          alt="Productos orgánicos"
          className="bg-green w-full md:w-1/2 rounded-lg shadow-md"
        />

        {/* Texto */}
        <div className="bg-[#2c2c2c] p-7 rounded-lg shadow-md">
          <h2 className="bg-green-800 text-white px-3 py-1 rounded inline-block font-bold mb-4">
            Productos Orgánicos
          </h2>
          <p className="text-gray-300 leading-relaxed">
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
