import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUserCircle,
  faSignOutAlt,
  faBoxesStacked,
  faCalendarCheck,
  faUtensils,
  faUsers,
  faChartBar,
  faConciergeBell,
  faArrowsRotate,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import profilePic from "../assets/default-avatar.png";
import { useAuth } from "../hooks/useAuth";
import { logoutUsuario } from "../services/authService";

const HeaderUnificado = () => {
  const { t, i18n } = useTranslation();
  const { usuario, autenticado, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const role = usuario?.tipo; // 'A', 'E' o 'C'
  const isInicio = location.pathname === "/";
  const isGestion = location.pathname.startsWith("/gestion");
  const mostrarWave = ["/carta", "/reserva", "/eventos"].includes(location.pathname);

  const handleLogout = async () => {
    try {
      const res = await logoutUsuario();
      logout();
      if (!res?.success) console.warn("Logout en servidor no confirmado:", res);
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      logout();
    }
  };

  // === Header Admin / Gestión ===
  if (autenticado && (role === "A" || role === "E") && isGestion) {
    return (
      <header className="admin-header">
        <div className="admin-logo">
          <NavLink to="/">
            <img src={logo} alt="La Chacra Logo" className="admin-logo-img" />
          </NavLink>
        </div>

        {/* NAV DESKTOP */}
        <nav className="admin-nav-links">
          {role === "A" ? (
            <>
              <NavLink to="/gestion/stock" className="admin-nav-link">
                <FontAwesomeIcon icon={faBoxesStacked} /> Stock
              </NavLink>
              <NavLink to="/gestion/reserva" className="admin-nav-link">
                <FontAwesomeIcon icon={faCalendarCheck} /> Reservas
              </NavLink>
              <NavLink to="/gestion/comanda" className="admin-nav-link">
                <FontAwesomeIcon icon={faConciergeBell} /> Comanda
              </NavLink>
              <NavLink to="/gestion/empleados-tabla" className="admin-nav-link">
                <FontAwesomeIcon icon={faUsers} /> Empleados
              </NavLink>
              <NavLink to="/gestion/estadisticas" className="admin-nav-link">
                <FontAwesomeIcon icon={faChartBar} /> Estadísticas
              </NavLink>
              <NavLink to="/gestion/platos-tabla" className="admin-nav-link">
                <FontAwesomeIcon icon={faUtensils} /> Platos
              </NavLink>
              <NavLink to="/gestion/stock-historial" className="admin-nav-link">
                <FontAwesomeIcon icon={faArrowsRotate} /> StockCambios
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/gestion/reserva" className="admin-nav-link">
                <FontAwesomeIcon icon={faCalendarCheck} /> Reservas
              </NavLink>
              <NavLink to="/gestion/comanda" className="admin-nav-link">
                <FontAwesomeIcon icon={faConciergeBell} /> Comanda
              </NavLink>
            </>
          )}
        </nav>

        {/* PERFIL */}
        <div className="right-controls">
          <div
            className="li-profile-wrapper"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <img src={profilePic} alt="Perfil" className="li-profile-pic" />
            <div className={`li-dropdown font-montserrat ${profileOpen ? "open" : ""}`}>
              <Link to="/perfil" className="li-dropdown-item">
                <FontAwesomeIcon icon={faUserCircle} /> Mi Perfil
              </Link>
              <Link to={role === "A" ? "/gestion/estadisticas" : "/gestion/comanda"} className="li-dropdown-item gestion">
                <FontAwesomeIcon icon={faGear} /> Gestión
              </Link>
              <button onClick={handleLogout} className="li-dropdown-item logout">
                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="admin-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        {/* MOBILE MENU */}
        <div className={`admin-mobile-menu ${menuOpen ? "open" : ""}`}>
          <nav className="admin-mobile-nav">
            {(role === "A"
              ? [
                ["Stock", "/gestion/stock", faBoxesStacked],
                ["Reservas", "/gestion/reserva", faCalendarCheck],
                ["Comanda", "/gestion/comanda", faConciergeBell],
                ["Empleados", "/gestion/empleados-tabla", faUsers],
                ["Estadísticas", "/gestion/estadisticas", faChartBar],
                ["Platos", "/gestion/platos-tabla", faUtensils],
                ["StockCambios", "/gestion/stock-historial", faArrowsRotate],
              ]
              : [
                ["Reservas", "/gestion/reserva", faCalendarCheck],
                ["Comanda", "/gestion/comanda", faConciergeBell],
              ]
            ).map(([text, path, icon]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="admin-mobile-link"
              >
                <FontAwesomeIcon icon={icon} className="admin-nav-icon" /> {text}
              </NavLink>
            ))}

            <hr className="mobile-divider" />

            <div className="li-mobile-profile">
              <img src={profilePic} alt="Perfil" className="li-mobile-profile-pic" />
              <div className="li-mobile-profile-links">
                <Link to="/perfil" onClick={() => setMenuOpen(false)}>
                  Mi Perfil
                </Link>
                <Link to={role === "A" ? "/gestion/estadisticas" : "/gestion/comanda"}  onClick={() => setMenuOpen(false)} className="gestion">
                  Gestión
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="logout"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </nav>
        </div>

      </header>
    );
  }

  // === Header Público o Cliente ===
  return (
    <>
      <header className={`header ${isInicio ? "header-transparent" : ""}`}>
        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="La Chacra Logo" className="logo-img" />
          </Link>
        </div>

        {/* NAV */}
        <nav className="nav-links">
          {!isInicio && (
            <>
              <Link to="/">{t("nav.inicio")}</Link>
              <span>•</span>
            </>
          )}
          <Link to="/carta">{t("nav.carta")}</Link>
          <span>•</span>
          <Link to="/reserva">{t("nav.reserva")}</Link>
          <span>•</span>
          <Link to="/eventos">{t("nav.eventos")}</Link>
        </nav>

        {/* CONTROLES DERECHA */}
        <div className="right-controls hidden md:flex">
          {/* Selector de idioma (si es público o cliente logeado) */}
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

          {/* Botones Login/Register */}
          {!autenticado && (
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
          )}

          {/* Perfil logeado */}
          {autenticado && (
            <div
              className="li-profile-wrapper"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img src={profilePic} alt="Perfil" className="li-profile-pic" />
              <div
                className={`li-dropdown font-montserrat ${profileOpen ? "open" : ""}`}
              >
                <Link to="/perfil" className="li-dropdown-item">
                  <FontAwesomeIcon icon={faUserCircle} /> {t("perfil.mi_perfil")}
                </Link>
                {(role === "A" || role === "E") && (
                  <Link to={role === "A" ? "/gestion/estadisticas" : "/gestion/comanda"}  className="li-dropdown-item gestion">
                    <FontAwesomeIcon icon={faGear} /> Gestión
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="li-dropdown-item logout"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> {t("perfil.cerrar_sesion")}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lang-mobile lg:hidden flex items-center gap-2 mr-3">
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

        {/* BOTÓN MENÚ MÓVIL */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        {/* MENÚ MÓVIL */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
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

            {/* AUTH O PERFIL */}
            {!autenticado ? (
              <div className="mobile-auth">
                <Link
                  to="/autenticacion"
                  state={{ openRegister: false }}
                  className="btn login"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("auth.login")}
                </Link>
                <Link
                  to="/autenticacion"
                  state={{ openRegister: true }}
                  className="btn register"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("auth.register")}
                </Link>
              </div>
            ) : (
              <div className="li-mobile-profile">
                <img src={profilePic} alt="Perfil" className="li-mobile-profile-pic" />
                <div className="li-mobile-profile-links">
                  <Link to="/perfil" onClick={() => setMenuOpen(false)}>
                    {t("perfil.mi_perfil")}
                  </Link>
                  {(role === "A" || role === "E") && (
                    <Link
                      to={role === "A" ? "/gestion/estadisticas" : "/gestion/comanda"} 
                      className="gestion"
                      onClick={() => setMenuOpen(false)}
                    >
                      Gestión
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="logout"
                  >
                    {t("perfil.cerrar_sesion")}
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* WAVE solo en secciones públicas */}
      {mostrarWave && (
        <div className="wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M 0 15 C 32 34 156 -21 479 21 C 770 61 801 -19 1207 9.25 C 1465 43 1440 0 1620 15 L 1620 0 L 0 0 Z"></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default HeaderUnificado;
