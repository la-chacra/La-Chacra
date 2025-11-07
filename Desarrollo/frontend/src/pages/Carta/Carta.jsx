import React from "react";
import { useTranslation } from 'react-i18next'
import MenuSection from "./MenuSection";

/* imágenes */
import hamburguesaImg from "../../assets/hamburguesa.png";
import cesarImg from "../../assets/cesar.png";
import pastaImg from "../../assets/pasta.png";
import braseritoImg from "../../assets/braserito.png";
import vinoImg from "../../assets/vino.png";
import heladoImg from "../../assets/helado.png";

import Footer from "../../components/Footer"; 
import Header from "../../components/HeaderUnificado";
import { useAuth } from "../../hooks/useAuth";

const Carta = () => {
  const { t } = useTranslation()
  const { autenticado } = useAuth();

  const menuData = [
    {
      title: t('carta.sections.house'),
      products: [
        {
          name: t('products.house.braserito.name'),
          description: t('products.house.braserito.description'),
          price: 1000,
          image: braseritoImg,
        },
      ],
    },
    {
      title: t('carta.sections.dishes'),
      categories: ["all", "entradas", "carnes", "pescados", "pastas"],
      products: [
        {
          name: t('products.main.hamburguesa.name'),
          description: t('products.main.hamburguesa.description'),
          price: 500,
          image: hamburguesaImg,
          category: "carnes",
        },
        {
          name: t('products.main.pasta.name'),
          description: t('products.main.pasta.description'),
          price: 650,
          image: pastaImg,
          category: "pastas",
        },
        {
          name: t('products.main.cesar.name'),
          description: t('products.main.cesar.description'),
          price: 400,
          image: cesarImg,
          category: "entradas",
        },
      ],
    },
    {
      title: t('carta.sections.drinks'),
      categories: ["all", "vinos", "whiskey", "cervezas", "refrescos"],
      products: [
        {
          name: t('products.drinks.vino.name'),
          description: t('products.drinks.vino.description'),
          price: 800,
          image: vinoImg,
          category: "vinos",
        },
      ],
    },
    {
      title: t('carta.sections.desserts'),
      categories: ["all", "helados", "postres"],
      products: [
        {
          name: t('products.desserts.helado.name'),
          description: t('products.desserts.helado.description'),
          price: 300,
          image: heladoImg,
          category: "helados",
        },
      ],
    },
  ];

  return (
    <div className="carta-page">
      <Header />

      <div className="carta-wrapper">
        <div className="sidebar left-sidebar"></div>

        <div className="carta-container">
          <h1 className="carta-title">{t('carta.title')}</h1>
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
