import React from "react";
import { useTranslation } from 'react-i18next'
import fotoMision from "../../assets/fotoMision.jpg";

export default function Mision() {
  const { t } = useTranslation()

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
              {t('mision.title')}
            </h3>
            <p className="leading-relaxed text-gray-100">
              {t('mision.paragraph')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
