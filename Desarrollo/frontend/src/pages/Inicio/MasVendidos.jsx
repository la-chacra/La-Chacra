import React from "react";
import Footer from "../../components/Footer";
import { useTranslation } from 'react-i18next'

import braserito from "../../assets/braserito.png";
import chivito from "../../assets/chivito.jpeg";
import napolitana from "../../assets/napolitana.jpeg";
import lomo from "../../assets/lomo-de-cerdo.jpg";

const platos = [
  { nombre: "Braserito", img: braserito, masVendido: true },
  { nombre: "Chivito La Chacra", img: chivito, masVendido: true },
  { nombre: "Napolitana", img: napolitana, masVendido: false },
  { nombre: "Lomo de Cerdo", img: lomo, masVendido: false },
];

export default function MejoresPlatos() {
  const { t } = useTranslation()

  return (
    <section className="bg-orange-700 py-12 text-white">
      <div className="max-w-6xl mx-auto px-6">
  <h2 className="text-2xl font-bold mb-8">{t('masVendidos.title')}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platos.map((plato, i) => (
            <div key={i} className="bg-white text-black rounded-lg shadow-md p-4 relative">
              {plato.masVendido && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
                  {t('masVendidos.best_seller')}
                </span>
              )}
              <img src={plato.img} alt={plato.nombre} className="rounded-lg w-full h-32 object-cover mb-3" />
              <p className="font-semibold text-center">{plato.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
