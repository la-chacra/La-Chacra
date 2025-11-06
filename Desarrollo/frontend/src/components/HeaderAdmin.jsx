import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
  faGear,
  faUserCircle,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import profilePic from "../assets/default-avatar.png";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
        <NavLink to="/gestion/empleados-tabla" className="admin-nav-link">
          <FontAwesomeIcon icon={faUsers} className="admin-nav-icon" /> Empleados
        </NavLink>
        <NavLink to="/gestion/estadisticas" className="admin-nav-link">
          <FontAwesomeIcon icon={faChartBar} className="admin-nav-icon" /> Estadísticas
        </NavLink>
        <NavLink to="/gestion/platos-tabla" className="admin-nav-link">
          <FontAwesomeIcon icon={faUtensils} className="admin-nav-icon" /> Platos
        </NavLink>
        <NavLink to="/gestion/historialStock" className="admin-nav-link">
          <FontAwesomeIcon icon={faArrowsRotate} className="admin-nav-icon" /> StockCambios
        </NavLink>
      </nav>
      <div className="admin-gestion">
        <FontAwesomeIcon icon={faGear} className="gestion-icon" />
        <span className="gestion-text font-montserrat">GESTIÓN</span>
      </div>

      {/* Right Side Controls */}
      <div className="right-controls">
        {/* GESTIÓN Icon + Text */}

        {/* Profile Dropdown */}
        <div
          className="li-profile-wrapper"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img src={profilePic} alt="Perfil" className="li-profile-pic" />
          <div className={`li-dropdown font-montserrat ${profileOpen ? "open" : ""}`}>
            <Link to="/perfil" className="li-dropdown-item">
              <FontAwesomeIcon icon={faUserCircle} /> Mi Perfil
            </Link>
            <Link to="/gestion" className="li-dropdown-item gestion">
              <FontAwesomeIcon icon={faGear} /> Gestión
            </Link>
            <Link to="/logout" className="li-dropdown-item logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="admin-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>

      {/* Mobile Menu */}
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
          <NavLink to="/gestion/empleados-tabla" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faUsers} className="admin-nav-icon" /> Empleados
          </NavLink>
          <NavLink to="/gestion/estadisticas" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faChartBar} className="admin-nav-icon" /> Estadísticas
          </NavLink>
          <NavLink to="/gestion/platos-tabla" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faUtensils} className="admin-nav-icon" /> Platos
          </NavLink>
          <NavLink to="/gestion/historialStock" onClick={() => setMenuOpen(false)} className="admin-mobile-link">
            <FontAwesomeIcon icon={faArrowsRotate} className="admin-nav-icon" /> StockCambios
          </NavLink>

          <hr className="mobile-divider" />

          {/* Profile section for mobile */}
          <div className="li-mobile-profile">
            <img src={profilePic} alt="Perfil" className="li-mobile-profile-pic" />
            <div className="li-mobile-profile-links">
              <Link to="/perfil" onClick={() => setMenuOpen(false)}>Mi Perfil</Link>
              <Link to="/gestion" onClick={() => setMenuOpen(false)} className="gestion">Gestión</Link>
              <Link to="/logout" onClick={() => setMenuOpen(false)} className="logout">Cerrar Sesión</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
