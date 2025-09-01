import React from "react";
import Hero from "./Hero";
import Mision from "./Mision";
import Horarios from "./Horarios";
import Productos from "./Productos";
import MasVendidos from "./MasVendidos";
import Footer from "../../components/Footer";

const Inicio = () => {
  return (
    <>
      <Hero />
      <Mision />
      <Horarios />
      <Productos />
      <MasVendidos />
      <Footer />
    </>
  );
};

export default Inicio;
