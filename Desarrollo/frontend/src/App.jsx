import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Carta from './pages/Carta/Carta';
import Login from './pages/LoginRegistro/Login';

// (cuando agreguen más páginas, las importas acá)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/carta" element={<Carta/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* Ejemplo de otras rutas futuras */}
        {/* <Route path="/carta" element={<Carta />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

