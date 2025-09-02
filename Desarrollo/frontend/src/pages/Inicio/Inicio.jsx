import React from "react";
import Hero from "./Hero";
import Mision from "./Mision";
import Horarios from "./Horarios";
import MasVendidos from "./MasVendidos";
import Productos from "./Productos";
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
