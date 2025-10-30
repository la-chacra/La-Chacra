import React from "react";
import heroImg from "../../assets/hero.jpeg";
import logo from "../../assets/logo.png"; 
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <section
      className="he-hero-section"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="he-overlay fade-in"></div>

      {/* NAVBAR */}
      <nav className="he-navbar">
        <img 
          src={logo} 
          alt="La Chacra Logo" 
          className="he-logo fade-in" 
        />

        {/* NAV LINKS */}
        <div className="he-nav-links font-overlock text-white font-semibold">
          <a href="/carta" className="he-link underline-center fade-in">Carta</a>
          <span className="he-separator fade-in">•</span>
          <a href="/reserva" className="he-link underline-center fade-in">Reserva</a>
          <span className="he-separator fade-in">•</span>
          <a href="/eventos" className="he-link underline-center fade-in">Eventos</a>
        </div>

        {/* LOGIN / REGISTER BUTTONS */}
        <div className="he-login-buttons fade-in">
          <Link to="/login" className="he-btn he-login-btn">
            INICIAR SESIÓN
          </Link>
          <Link to="/login" className="he-btn he-register-btn">
            REGISTRARSE
          </Link>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="he-hero-content">
        <h1 className="text-shadow text-hero-title font-texturina text-[#F2E3B3] tracking-wider fade-in-up">
          La Chacra Gourmet
        </h1>

        <Link to="/carta" className="menu-btn font-montserrat fade-in-up">
          Ver menú <FontAwesomeIcon icon={faUtensils} className="he-icon" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
