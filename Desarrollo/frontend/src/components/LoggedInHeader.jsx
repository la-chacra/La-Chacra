import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import profilePic from "../assets/default-avatar.png";
import { logoutUsuario } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next"

const LoggedInHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { t } = useTranslation();


  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await logoutUsuario();

      // actualizar estado en el contexto (aunque el backend falle, limpiamos el cliente)
      logout();

      if (!res || !res.success) {
        // opcional: informar al usuario que el cierre en servidor falló
        console.warn("Logout en servidor no confirmado:", res);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aun así limpiamos el estado local
      logout();
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="La Chacra Logo" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">{t("nav.inicio")}</Link>
          <span>•</span>
          <Link to="/carta">{t("nav.carta")}</Link>
          <span>•</span>
          <Link to="/reserva">{t("nav.reserva")}</Link>
          <span>•</span>
          <Link to="/eventos">{t("nav.eventos")}</Link>
        </nav>

        <div className="right-controls">
          <div className="lang-wrapper">
            <LanguageSelector />
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
                <FontAwesomeIcon icon={faUserCircle} /> {t("perfil.mi_perfil")}
              </Link>
              <button onClick={handleLogout} className="li-dropdown-item logout">
                <FontAwesomeIcon icon={faSignOutAlt} /> {t("perfil.cerrar_sesion")}
              </button>
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
              <Link to="/carta" onClick={() => setMenuOpen(false)}>{t("nav.carta")}</Link>
              <span>•</span>
              <Link to="/reserva" onClick={() => setMenuOpen(false)}>{t("nav.reserva")}</Link>
              <span>•</span>
              <Link to="/eventos" onClick={() => setMenuOpen(false)}>{t("nav.eventos")}</Link>
            </div>

            <hr className="mobile-divider" />

            {/* perfil responsive */}
            <div className="li-mobile-profile">
              <img src={profilePic} alt="Perfil" className="li-mobile-profile-pic" />
                <div className="li-mobile-profile-links">
                <Link to="/perfil">{t("perfil.mi_perfil")}</Link>
                <button onClick={handleLogout} className="logout">{t("perfil.cerrar_sesion")}</button>
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

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <select
      className="lang-select"
      value={i18n.language.split("-")[0]}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="es">{t("lang.es")}</option>
      <option value="en">{t("lang.en")}</option>
      <option value="pt">{t("lang.pt")}</option>
    </select>
  );
}

export default LoggedInHeader;
