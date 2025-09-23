import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="La Chacra Logo" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/carta">Carta</Link>
          <span>•</span>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          <span>•</span>
          <Link to="/reserva">Reserva</Link>
          <span>•</span>
          <Link to="/eventos">Eventos</Link>
        </nav>

        <div className="right-controls">
          <div className="auth-controls">
            <Link to="/login" className="btn login">
              INICIAR SESIÓN
            </Link>
            <Link to="/login" className="btn register">
              REGISTRARSE
            </Link>
          </div>

          <div className="lang-wrapper">
            <select className="lang-select">
              <option value="es">ES 🇺🇾</option>
              <option value="en">EN 🇺🇸</option>
            </select>
          </div>
        </div>

        {/* menu desplegable */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <div className="mobile-nav-links">
              <Link to="/carta" onClick={() => setMenuOpen(false)}>Carta</Link>
              <span>•</span>
              <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
              <span>•</span>
              <Link to="/reserva" onClick={() => setMenuOpen(false)}>Reserva</Link>
              <span>•</span>
              <Link to="/eventos" onClick={() => setMenuOpen(false)}>Eventos</Link>
            </div>

            <hr className="mobile-divider" />

            <div className="mobile-auth">
              <button className="btn login">INICIAR SESIÓN</button>
              <button className="btn register">REGISTRARSE</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Decorative wave absolutely positioned */}
      <div className="wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M 0 15 C 32 34 156 -21 479 21 C 770 61 801 -19 1207 9.25 C 1465 43 1440 0 1620 15 L 1620 0 L 0 0 Z"></path>
        </svg>
      </div>
    </>
  );
};

export default Header;
