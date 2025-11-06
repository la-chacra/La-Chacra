import React from "react";
import productosOrganicos from "../../assets/productos-organicos.png";
import { useTranslation } from 'react-i18next'

export default function Productos() {
  const { t } = useTranslation()

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
            {t('productos.title')}
          </h2>
          <p className="leading-relaxed">
            {t('productos.paragraph')}
          </p>
        </div>
      </div>
    </section>
  );
}
