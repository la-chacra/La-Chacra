import React from "react";
import MenuSection from "./MenuSection";

/* imágenes */
import hamburguesaImg from "../../assets/hamburguesa.png";
import cesarImg from "../../assets/cesar.png";
import pastaImg from "../../assets/pasta.png";
import braseritoImg from "../../assets/braserito.png";
import vinoImg from "../../assets/vino.png";
import heladoImg from "../../assets/helado.png";

import Footer from "../../components/Footer"; 
import Header from "../../components/Header"; 

const Carta = () => {
  const menuData = [
    {
      title: "PLATOS DE LA CASA",
      products: [
        {
          name: "Braserito",
          description: "Chorizo, morcilla, asado",
          price: 1000,
          image: braseritoImg,
        },
      ],
    },
    {
      title: "PLATOS",
      categories: ["Todos", "Entradas", "Carnes", "Pescados", "Pastas"],
      products: [
        {
          name: "Hamburguesa",
          description:
            "Hamburguesa, aderezo, lechuga, tomate, jamón cocido y queso cheddar.",
          price: 500,
          image: hamburguesaImg,
          category: "Carnes",
        },
        {
          name: "Pasta Alfredo",
          description: "Fettuccine con salsa Alfredo y parmesano.",
          price: 650,
          image: pastaImg,
          category: "Pastas",
        },
        {
          name: "Ensalada César",
          description: "Lechuga, crutones, parmesano y aderezo César.",
          price: 400,
          image: cesarImg,
          category: "Entradas",
        },
      ],
    },
    {
      title: "BEBIDAS",
      categories: ["Todos", "Vinos", "Whiskey", "Cervezas", "Refrescos"],
      products: [
        {
          name: "Vino",
          description: "Vino blanco",
          price: 800,
          image: vinoImg,
          category: "Vinos",
        },
      ],
    },
    {
      title: "POSTRES",
      categories: ["Todos", "Helados", "Postres"],
      products: [
        {
          name: "Helado",
          description: "Helado de vainilla",
          price: 300,
          image: heladoImg,
          category: "Helados",
        },
      ],
    },
  ];

  return (
    <div className="carta-page">
      <Header/>

      <div className="carta-wrapper">
        <div className="sidebar left-sidebar"></div>

        <div className="carta-container">
          <h1 className="carta-title">CARTA</h1>
          {menuData.map((section, index) => (
            <MenuSection key={index} {...section} />
          ))}
        </div>

        <div className="sidebar right-sidebar"></div>
      </div>

      <Footer/>
    </div>
  );
};

export default Carta;
