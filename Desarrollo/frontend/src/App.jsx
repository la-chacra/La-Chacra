import React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Carta from './pages/Carta/Carta';
import Reserva from './pages/Reserva/ReservaUsuario/Reserva';
import Login from './pages/LoginRegistro/Login';
import ReservaHist from './pages/Reserva/ReservaAdmin/HistorialAdmin';
import Comanda from './pages/Comanda/Comanda';
import Test from './pages/Admin/Test';
import ComandaHist from './pages/Comanda/ComandaHist';
import StockHist from './pages/Stock/HistorialStock.jsx';
import PlatosTabla from './pages/Platos/TablaPlatos.jsx';
import Platos from './pages/Platos/Platos.jsx';
import Estadisticas from './pages/Estadisticas/EstadisticasMain.jsx';
import GestionStock from './pages/Stock/GestionStock';
import Eventos from './pages/Eventos/Eventos'; // Importa la página de eventos
import EmpleadosTabla from './pages/Empleados/EmpleadosTabla.jsx';
import Empleados from './pages/Empleados/Empleados.jsx';
// (cuando agreguen más páginas, las importas acá)

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Consultar al backend si hay sesión
    fetch("/api/estadoSesion", { credentials: "include" })
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
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/eventos" element={<Eventos/>}/>
        <Route path="/autenticacion" element={<Login/>}/>
        <Route path="/gestion/reserva" element={<ReservaHist/>}/>
        <Route path="/gestion/comanda" element={<Comanda/>}/>
        <Route path="/gestion/comanda-historial" element={<ComandaHist/>}/>
        <Route path="/gestion/stock" element={<GestionStock/>}/>
        <Route path="/gestion/stock-historial" element={<StockHist/>}/>
        <Route path="/gestion/platos-tabla" element={<PlatosTabla/>}/>
        <Route path="/gestion/plato" element={<Platos/>}/>
        <Route path="/gestion/plato/:id" element={<Platos/>}/>
        <Route path="/gestion/estadisticas" element={<Estadisticas/>}/>
        <Route path="/gestion/empleados-tabla" element={<EmpleadosTabla/>}/>
        <Route path="/gestion/empleado" element={<Empleados/>}/>
        <Route path="/gestion/empleado/:id" element={<Empleados/>}/>
        {/* Testing */}
        <Route path="/test" element={<Test/>}/>
        {/* Ejemplo de otras rutas futuras */}
        {/* <Route path="/carta" element={<Carta />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

