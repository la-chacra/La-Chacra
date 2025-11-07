import React from "react";
import Hero from "./Hero";
import Mision from "./Mision";
import Horarios from "./Horarios";
import MasVendidos from "./MasVendidos";
import Productos from "./Productos";
import Footer from "../../components/Footer";
import ScrollButton from "./ScrollButton";

const Inicio = () => {
  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="horarios"><Horarios /></section>
      <section id="mision"><Mision /></section>
      <section id="productos"><Productos /></section>
      <section id="mas-vendidos"><MasVendidos /></section>
      <section id="footer"><Footer /></section>

      <ScrollButton />
    </>
  );
};

export default Inicio;
