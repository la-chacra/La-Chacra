import React from "react";
import { useTranslation } from 'react-i18next'
import heroImg from "../../assets/hero.jpeg";
import logo from "../../assets/logo.png"; 
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const { t } = useTranslation()

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
          <a href="/carta" className="he-link underline-center fade-in">{t('nav.carta')}</a>
          <span className="he-separator fade-in">•</span>
          <a href="/reserva" className="he-link underline-center fade-in">{t('nav.reserva')}</a>
          <span className="he-separator fade-in">•</span>
          <a href="/eventos" className="he-link underline-center fade-in">{t('nav.eventos')}</a>
        </div>

        {/* LOGIN / REGISTER BUTTONS */}
        <div className="he-login-buttons fade-in">
          <Link to="/login" className="he-btn he-login-btn">
            {t('auth.login')}
          </Link>
          <Link to="/login" className="he-btn he-register-btn">
            {t('auth.register')}
          </Link>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="he-hero-content">
        <h1 className="text-shadow text-hero-title font-texturina text-[#F2E3B3] tracking-wider fade-in-up">
          La Chacra Gourmet
        </h1>

        <Link to="/carta" className="menu-btn font-montserrat fade-in-up">
          {t('hero.menu_button')} <FontAwesomeIcon icon={faUtensils} className="he-icon" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
