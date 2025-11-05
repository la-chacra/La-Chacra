import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUserCircle, faSignOutAlt, faGear } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import profilePic from "../assets/default-avatar.png"; // Add your profile image here

const LoggedInHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="La Chacra Logo" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <span>•</span>
          <Link to="/carta">Carta</Link>
          <span>•</span>
          <Link to="/reserva">Reserva</Link>
          <span>•</span>
          <Link to="/eventos">Eventos</Link>
        </nav>

        <div className="right-controls">
          <div className="lang-wrapper">
            <select className="lang-select">
              <option value="es">ES 🇺🇾</option>
              <option value="en">EN 🇺🇸</option>
              <option value="pt">PT-BR 🇧🇷</option>
            </select>
          </div>

          <div
            className="li-profile-wrapper"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <img
              src={profilePic}
              alt="Perfil"
              className="li-profile-pic"
            />
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

        {/* menu despegable */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <div className="mobile-nav-links">
              <Link to="/carta" onClick={() => setMenuOpen(false)}>Carta</Link>
              <span>•</span>
              <Link to="/reserva" onClick={() => setMenuOpen(false)}>Reserva</Link>
              <span>•</span>
              <Link to="/eventos" onClick={() => setMenuOpen(false)}>Eventos</Link>
            </div>

            <hr className="mobile-divider" />

            {/* perfil responsive */}
            <div className="li-mobile-profile">
              <img src={profilePic} alt="Perfil" className="li-mobile-profile-pic" />
              <div className="li-mobile-profile-links">
                <Link to="/perfil">Mi Perfil</Link>
                <Link to="/gestion " className="gestion">Gestión</Link>
                <Link to="/logout" className="logout">Cerrar Sesión</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M 0 15 C 32 34 156 -21 479 21 C 770 61 801 -19 1207 9.25 C 1465 43 1440 0 1620 15 L 1620 0 L 0 0 Z"></path>
        </svg>
      </div>
    </>
  );
};

export default LoggedInHeader;
