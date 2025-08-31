import React from 'react';

import './App.css';
import './index.css';
import Header from "./Header";
import Hero from "./Hero";
import Horarios from "./Horarios";
import MasVendidos from "./MasVendidos";
import Mision from "./Mision";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Horarios />
      <MasVendidos />
      <Mision />
      <Footer />
    </div>
  );
}

export default App;