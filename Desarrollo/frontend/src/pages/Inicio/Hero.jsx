import React, { useState } from "react";
import heroImg from "../../assets/hero.jpeg";
import logo from "../../assets/logo.png";
import profilePic from "../../assets/default-avatar.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBars, faTimes, faUserCircle, faSignOutAlt, faGear } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { usuario, autenticado, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const role = usuario?.tipo; // 'A', 'E' o 'C'

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <section
      className="he-hero-section"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="he-overlay fade-in"></div>

      {/* NAVBAR */}
      <nav className="he-navbar">
        <img src={logo} alt="La Chacra Logo" className="he-logo fade-in" />

        {/* NAV LINKS */}
        <div className="he-nav-links font-overlock text-white font-semibold">
          <Link to="/carta" className="he-link underline-center fade-in">
            {t("nav.carta")}
          </Link>
          <span className="he-separator fade-in">•</span>
          <Link to="/reserva" className="he-link underline-center fade-in">
            {t("nav.reserva")}
          </Link>
          <span className="he-separator fade-in">•</span>
          <Link to="/eventos" className="he-link underline-center fade-in">
            {t("nav.eventos")}
          </Link>
        </div>

        {/* DERECHA: LOGIN O AVATAR */}
        <div className="he-login-buttons fade-in">
          {!autenticado ? (
            <>
              <Link
                to="/autenticacion"
                state={{ openRegister: false }}
                className="he-btn he-login-btn"
              >
                {t("auth.login")}
              </Link>
              <Link
                to="/autenticacion"
                state={{ openRegister: true }}
                className="he-btn he-register-btn"
              >
                {t("auth.register")}
              </Link>
              <div className="lang-wrapper he-lang-desktop">
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
            </>
          ) : (
            <>
              {/* Selector de idioma desktop */}
              <div className="lang-wrapper he-lang-desktop">
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

              {/* Avatar con dropdown */}
              <div
                className="li-profile-wrapper"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img src={profilePic} alt="Perfil" className="li-profile-pic" />
                <div
                  className={`li-dropdown font-montserrat ${profileOpen ? "open" : ""
                    }`}
                >
                  <Link to="/perfil" className="li-dropdown-item">
                    <FontAwesomeIcon icon={faUserCircle} /> {t("perfil.mi_perfil")}
                  </Link>
                  {(role === "A" || role === "E") && (
                    <Link to={role === "A" ? "/gestion/estadisticas" : "/gestion/comanda"}  className="li-dropdown-item gestion">
                      <FontAwesomeIcon icon={faGear} /> Gestión
                    </Link>
                  )}
                  <button onClick={handleLogout} className="li-dropdown-item logout">
                    <FontAwesomeIcon icon={faSignOutAlt} /> {t("perfil.cerrar_sesion")}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* BOTÓN HAMBURGUESA MOBILE */}
        {autenticado && (
          <div
            className="hamburger fixed right-4 top-4 text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >

            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
          </div>
        )}
      </nav>

      {/* MENÚ MOBILE LOGEADO */}
      {autenticado && (
        <div
          className={`he-mobile-menu z-[55] font-montserrat transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >

          <div className="flex flex-col items-start px-6 pt-6 pb-10 mt-[20px] space-y-5 text-white">
            {/* MI PERFIL */}
            <Link
              to="/perfil"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 hover:text-[#F2E3B3] transition"
            >
              <FontAwesomeIcon icon={faUserCircle} />
              <span>{t("perfil.mi_perfil")}</span>
            </Link>

            {/* GESTIÓN */}
            {(role === "A" || role === "E") && (
              <Link
                to={role === "A" ? "/gestion/estadisticas" : "/gestion/comanda"} 
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-[#F2E3B3] transition"
              >
                <FontAwesomeIcon icon={faGear} />
                <span>Gestión</span>
              </Link>
            )}

            {/* CERRAR SESIÓN */}
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-3 hover:text-[#F2E3B3] transition"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>{t("perfil.cerrar_sesion")}</span>
            </button>

            <hr className="w-full border-gray-500 my-3" />

            {/* SELECTOR DE IDIOMA */}
            <div className="flex items-center gap-3 text-sm">
              <FontAwesomeIcon className="text-lg" />
              <select
                className="bg-transparent border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-[#F2E3B3]"
                value={i18n.language.split("-")[0]}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="es">{t("lang.es")}</option>
                <option value="en">{t("lang.en")}</option>
                <option value="pt">{t("lang.pt")}</option>
              </select>
            </div>
          </div>
        </div>


      )}

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}



      {/* HERO CONTENT */}
      <div className="he-hero-content">
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
