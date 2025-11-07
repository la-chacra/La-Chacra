import React, { useState } from "react";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation()

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="La Chacra Logo" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">{t('nav.inicio')}</Link>
          <span>•</span>
          <Link to="/carta">{t('nav.carta')}</Link>
          <span>•</span>
          <Link to="/reserva">{t('nav.reserva')}</Link>
          <span>•</span>
          <Link to="/eventos">{t('nav.eventos')}</Link>
        </nav>

        <div className="right-controls">
          <div className="auth-controls">
            <Link to="/autenticacion" state={{ openRegister: false }} className="btn login">
              {t('auth.login')}
            </Link>
            <Link to="/autenticacion" state={{ openRegister: true }} className="btn register">
              {t('auth.register')}
            </Link>
          </div>

          <div className="lang-wrapper">
            <select
              className="lang-select"
              value={i18n.language.split('-')[0]}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="es">{t('lang.es')}</option>
              <option value="en">{t('lang.en')}</option>
              <option value="pt">{t('lang.pt')}</option>
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
              <Link to="/carta" onClick={() => setMenuOpen(false)}>{t('nav.carta')}</Link>
              <span>•</span>
              <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)}>{t('nav.inicio')}</Link>
              <span>•</span>
              <Link to="/reserva" onClick={() => setMenuOpen(false)}>{t('nav.reserva')}</Link>
              <span>•</span>
              <Link to="/eventos" onClick={() => setMenuOpen(false)}>{t('nav.eventos')}</Link>
            </div>

            <hr className="mobile-divider" />

            <div className="mobile-auth">
              <Link to="/autenticacion" state={{ openRegister: false }} className="btn login">
                {t('auth.login')}
              </Link>
              <Link to="/autenticacion" state={{ openRegister: true }} className="btn register">
                {t('auth.register')}
              </Link>
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
