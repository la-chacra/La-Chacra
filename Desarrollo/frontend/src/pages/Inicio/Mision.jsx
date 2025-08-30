import React from "react";

import profileImg from '../../assets/hero.jpg';

const Mision = ({ 
  title = "Nuestra Misión", 
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus efficitur ultricies tincidunt. Donec hendrerit blandit eros in cursus",
  image = profileImg 
}) => {
  return (
    <section className="p-8 bg-gray-50 rounded-2xl shadow-md">
      {/* Título */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
        {title}
      </h2>

      {/* Contenedor flexible */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Imagen */}
        <img
          src={image}
          alt={`Imagen representativa de ${title}`}
          className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover"
        />

        {/* Texto */}
        <p className="mt-4 md:mt-0 md:ml-6 text-gray-700 text-lg leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Mision;