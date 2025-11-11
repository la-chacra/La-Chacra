import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// --- Contexto y protección de rutas ---
import { useAuth } from "./hooks/useAuth";
import { RutaProtegida } from "./components/RutaProtegida";

// --- Páginas del sitio ---
import Inicio from "./pages/Inicio/Inicio";
import Carta from "./pages/Carta/Carta";
import Reserva from "./pages/Reserva/ReservaUsuario/Reserva";
import Login from "./pages/LoginRegistro/Login";
import Eventos from "./pages/Eventos/Eventos";
import AccesoDenegado from "./pages/Otros/AccesoDenegado";

// --- Páginas de gestión ---
import ReservaHist from "./pages/Reserva/ReservaAdmin/ReservaHistorial";
import Comanda from "./pages/Comanda/Comanda";
import ComandaHist from "./pages/Comanda/ComandaHist";
import GestionStock from "./pages/Stock/GestionStock";
import StockHist from "./pages/Stock/HistorialStock";
import Platos from "./pages/Platos/Platos";
import PlatosTabla from "./pages/Platos/TablaPlatos";
import Estadisticas from "./pages/Estadisticas/EstadisticasMain";
import Empleados from "./pages/Empleados/Empleados";
import EmpleadosTabla from "./pages/Empleados/EmpleadosTabla";

// --- Testing ---
import Test from "./pages/Admin/Test";
import EnConstruccion from "./pages/Otros/EnConstruccion";
import GestorProducto from "./pages/Stock/AñadirStock";

function App() {
  const { cargando } = useAuth();

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
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/autenticacion" element={<Login />} />

        {/* Rutas protegidas para usuarios autenticados (cualquier rol) */}
        <Route element={<RutaProtegida />}>
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/perfil" element={<Navigate to="/en-construccion" replace />} />
        </Route>

        {/* Rutas protegidas para empleados */}
        <Route element={<RutaProtegida rolRequerido="E" />}>
          <Route path="/gestion/comanda" element={<Comanda />} />
          <Route path="/gestion/comanda-historial" element={<ComandaHist />} />
        </Route>

        {/* Rutas protegidas para administradores */}
        <Route element={<RutaProtegida rolRequerido="A" />}>
          <Route path="/gestion/reserva" element={<ReservaHist />} />
          <Route path="/gestion/stock" element={<GestionStock />} />
          <Route path="/gestion/stock-historial" element={<StockHist/>} />
          <Route path="/gestion/platos-tabla" element={<PlatosTabla />} />
          <Route path="/gestion/plato" element={<Platos />} />
          <Route path="/gestion/plato/:id" element={<Platos />} />
          <Route path="/gestion/estadisticas" element={<Estadisticas />} />
          <Route path="/gestion/empleados-tabla" element={<EmpleadosTabla />} />
          <Route path="/gestion/empleado" element={<Empleados />} />
          <Route path="/gestion/empleado/:id" element={<Empleados />} />
          <Route path="/gestion/stock" element={<GestionStock />} />
          <Route path="/gestion/stock/nuevo" element={<GestorProducto />} />
          <Route path="/gestion/stock/:id" element={<GestorProducto />} />

        </Route>

        {/* Página de acceso denegado */}
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />
        <Route path="/en-construccion" element={<EnConstruccion />} />

        {/* Rutas de prueba */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;