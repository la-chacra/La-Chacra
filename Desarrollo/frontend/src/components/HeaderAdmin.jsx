import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faCalendarCheck,
  faUtensils,
  faUsers,
  faChartBar,
  faConciergeBell,
  faArrowsRotate,
  faBars,
  faTimes,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="admin-header">
      {/* Left Logo */}
      <div className="admin-logo">
        <NavLink to="/">
          <img src={logo} alt="Admin Logo" className="admin-logo-img" />
        </NavLink>
      </div>

      {/* Desktop nav */}
      <nav className="admin-nav-links">
        <NavLink to="/admin/stock" className="admin-nav-link">
          <FontAwesomeIcon icon={faBoxesStacked} className="admin-nav-icon" /> Stock
        </NavLink>
        <NavLink to="/gestion/reserva" className="admin-nav-link">
          <FontAwesomeIcon icon={faCalendarCheck} className="admin-nav-icon" /> Reservas
        </NavLink>
        <NavLink to="/gestion/comanda" className="admin-nav-link">
          <FontAwesomeIcon icon={faConciergeBell} className="admin-nav-icon" /> Comanda
        </NavLink>
        <NavLink to="/admin/empleados" className="admin-nav-link">
          <FontAwesomeIcon icon={faUsers} className="admin-nav-icon" /> Empleados
        </NavLink>
        <NavLink to="/admin/estadisticas" className="admin-nav-link">
          <FontAwesomeIcon icon={faChartBar} className="admin-nav-icon" /> Estadísticas
        </NavLink>
        <NavLink to="/gestion/platos-tabla" className="admin-nav-link">
          <FontAwesomeIcon icon={faUtensils} className="admin-nav-icon" /> Platos
        </NavLink>
        <NavLink to="/gestion/stock-historial" className="admin-nav-link">
          <FontAwesomeIcon icon={faArrowsRotate} className="admin-nav-icon" /> StockCambios
        </NavLink>
      </nav>

      {/* Right GESTIÓN */}
      <div className="admin-gestion">
        <FontAwesomeIcon icon={faGear} className="gestion-icon" />
        <span className="gestion-text font-montserrat">GESTIÓN</span>
      </div>

      {/* Mobile toggle */}
      <div className="admin-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>

      {/* Mobile menu */}
      <div className={`admin-mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav className="admin-mobile-nav">
          <NavLink to="/admin/stock" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faBoxesStacked} className="admin-nav-icon" /> Stock
          </NavLink>
          <NavLink to="/gestion/reserva" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faCalendarCheck} className="admin-nav-icon" /> Reservas
          </NavLink>
          <NavLink to="/gestion/comanda" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faConciergeBell} className="admin-nav-icon" /> Comanda
          </NavLink>
          <NavLink to="/admin/empleados" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faUsers} className="admin-nav-icon" /> Empleados
          </NavLink>
          <NavLink to="/admin/estadisticas" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faChartBar} className="admin-nav-icon" /> Estadísticas
          </NavLink>
          <NavLink to="/gestion/platos-tabla" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faUtensils} className="admin-nav-icon" /> Platos
          </NavLink>
          <NavLink to="/gestion/stock-historial" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faArrowsRotate} className="admin-nav-icon" /> StockCambios
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
