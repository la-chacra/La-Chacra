import React from "react";
import Footer from "../../components/Footer";

const platos = [
  { nombre: "Pizza a la Piedra", img: "https://via.placeholder.com/150", masVendido: true },
  { nombre: "Hamburguesa Doble Queso", img: "https://via.placeholder.com/150", masVendido: false },
  { nombre: "Napolitana", img: "https://via.placeholder.com/150", masVendido: true },
  { nombre: "Lomo de Cerdo", img: "https://via.placeholder.com/150", masVendido: false },
];

export default function MejoresPlatos() {
  return (
    <section className="bg-orange-700 py-12 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Nuestros Mejores Platos</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platos.map((plato, i) => (
            <div key={i} className="bg-white text-black rounded-lg shadow-md p-4 relative">
              {plato.masVendido && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
                  Más Vendido 🔥
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
