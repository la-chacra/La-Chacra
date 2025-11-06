import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUserCircle,
  faSignOutAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import heroImg from "../../assets/hero.jpeg";
import logo from "../../assets/logo.png";
import profilePic from "../../assets/default-avatar.png";
import { logoutUsuario } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { usuario, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logoutUsuario();
      logout();
      if (!res || !res.success) console.warn("Logout no confirmado en servidor");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      logout();
    }
  };

  return (
    <section
      className="he-hero-section"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="he-overlay fade-in"></div>

      {/* NAVBAR TRANSPARENTE */}
      <header className="header !bg-transparent" style={{ background: 'transparent' }}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="La Chacra Logo" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/carta">{t("nav.carta")}</Link>
          <span>•</span>
          <Link to="/reserva">{t("nav.reserva")}</Link>
          <span>•</span>
          <Link to="/eventos">{t("nav.eventos")}</Link>
        </nav>

        {/* CONTROLES DERECHA */}
        <div className="right-controls">
          {!usuario ? (
            <>
              <div className="lang-wrapper">
                <select
                  className="lang-select"
                  value={i18n.language.split("-")[0]}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="es">{t("lang.es")}</option>
                  <option value="en">{t("lang.en")}</option>
                  <option value="pt">{t("lang.pt")}</option>
                </select>
              </div>
              
              <div className="auth-controls">
                <Link
                  to="/autenticacion"
                  state={{ openRegister: false }}
                  className="btn login"
                >
                  {t("auth.login")}
                </Link>
                <Link
                  to="/autenticacion"
                  state={{ openRegister: true }}
                  className="btn register"
                >
                  {t("auth.register")}
                </Link>
              </div>
            </>
          ) : (
            <div className="right-controls flex items-center gap-4">
              <div className="lang-wrapper">
                <select
                  className="lang-select"
                  value={i18n.language.split("-")[0]}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="es">{t("lang.es")}</option>
                  <option value="en">{t("lang.en")}</option>
                  <option value="pt">{t("lang.pt")}</option>
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
                    <FontAwesomeIcon icon={faUserCircle} /> {t("perfil.mi_perfil")}
                  </Link>
                  <button onClick={handleLogout} className="li-dropdown-item logout">
                    <FontAwesomeIcon icon={faSignOutAlt} /> {t("perfil.cerrar_sesion")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MENÚ MÓVIL */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        <div className={`mobile-menu bg-black/80 ${menuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <div className="mobile-nav-links">
              <Link to="/carta" onClick={() => setMenuOpen(false)}>
                {t("nav.carta")}
              </Link>
              <span>•</span>
              <Link to="/reserva" onClick={() => setMenuOpen(false)}>
                {t("nav.reserva")}
              </Link>
              <span>•</span>
              <Link to="/eventos" onClick={() => setMenuOpen(false)}>
                {t("nav.eventos")}
              </Link>
            </div>

            <hr className="mobile-divider" />

            {!usuario ? (
              <div className="mobile-auth">
                <Link
                  to="/autenticacion"
                  state={{ openRegister: false }}
                  onClick={() => setMenuOpen(false)}
                  className="btn login"
                >
                  {t("auth.login")}
                </Link>
                <Link
                  to="/autenticacion"
                  state={{ openRegister: true }}
                  onClick={() => setMenuOpen(false)}
                  className="btn register"
                >
                  {t("auth.register")}
                </Link>
              </div>
            ) : (
              <div className="li-mobile-profile">
                <img
                  src={profilePic}
                  alt="Perfil"
                  className="li-mobile-profile-pic"
                />
                <div className="li-mobile-profile-links">
                  <Link to="/perfil" onClick={() => setMenuOpen(false)}>
                    <FontAwesomeIcon icon={faUserCircle} /> {t("perfil.mi_perfil")}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="logout"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> {t("perfil.cerrar_sesion")}
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* HERO CONTENT */}
      <div className="he-hero-content fade-in-up">
        <h1 className="text-shadow text-hero-title font-texturina text-[#F2E3B3] tracking-wider fade-in-up">
          La Chacra Gourmet
        </h1>

        <Link to="/carta" className="menu-btn font-montserrat fade-in-up">
          {t("hero.menu_button")}{" "}
          <FontAwesomeIcon icon={faUtensils} className="he-icon" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
