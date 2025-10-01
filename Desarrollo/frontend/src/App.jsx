import React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Carta from './pages/Carta/Carta';
import Reserva from './pages/ReservaUsuario/Reserva';
import Login from './pages/LoginRegistro/Login';
import Test from './pages/Admin/test';

// (cuando agreguen más páginas, las importas acá)

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Consultar al backend si hay sesión
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUsuario(data.usuario);
        } else {
          setUsuario(null);
        }
      })
      .catch((err) => {
        console.error("Error verificando sesión:", err);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/carta" element={<Carta/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/test" element={<Test/>}/>
        {/* Ejemplo de otras rutas futuras */}
        {/* <Route path="/carta" element={<Carta />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

