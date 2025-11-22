import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

import Header from "../../components/HeaderUnificado";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import { loginUsuario } from "../../services/authService";

import WindowWarning from "../../components/Alert";

import logo2 from "../../assets/logo2.png";
import fuego from "../../assets/fuego.gif";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, login, checkSesion } = useAuth();

  const [esRegistrado, setesRegistrado] = useState(
    () => !!location.state?.openRegister
  );
  const [hoveredPanel, setHoveredPanel] = useState(null);

  // Estados Registro
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [regCorreo, setRegCorreo] = useState("");
  const [regContrasena, setRegContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Estados Login
  const [loginCorreo, setLoginCorreo] = useState("");
  const [loginContrasena, setLoginContrasena] = useState("");

  // ALERTA CUSTOM
  const [alertData, setAlertData] = useState({
    visible: false,
    message: "",
    icon: "warning",
    type: "alert",
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = ({
    message,
    icon = "warning",
    type = "alert",
    onConfirm = () =>
      setAlertData((prev) => ({
        ...prev,
        visible: false,
      })),
    onCancel = () =>
      setAlertData((prev) => ({
        ...prev,
        visible: false,
      })),
  }) => {
    setAlertData({
      visible: true,
      message,
      icon,
      type,
      onConfirm,
      onCancel,
    });
  };

  // SI YA ESTÁ LOGEADO
  if (usuario) {
    return (
      <>
        <Header />
        <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/40 z-50">
          <div className="bg-neutral-950 rounded-2xl shadow-xl p-10 text-center max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">
              Ya estás logeado
            </h2>
            <p className="text-gray-300 mb-6">
              No es necesario volver a iniciar sesión o registrarte.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginCorreo || !loginContrasena) {
      showAlert({
        message: "Debe ingresar correo y contraseña",
        icon: "warning",
      });
      return;
    }

    try {
      const result = await loginUsuario({
        loginCorreo,
        loginContrasena,
      });

      if (result.success) {
        if (result.usuario) login(result.usuario);

        if (checkSesion) await checkSesion();

        navigate("/");
      } else {
        showAlert({
          message: result.message || "Credenciales inválidas",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error en login:", error);
      showAlert({
        message: "Error de conexión con el servidor",
        icon: "error",
      });
    }
  };

  // REGISTRO
  const handleRegister = async (e) => {
    e.preventDefault();

    if (regContrasena !== confirmarContrasena) {
      showAlert({
        message: "Las contraseñas no coinciden",
        icon: "warning",
      });
      return;
    }

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nombre,
          apellido,
          correo: regCorreo,
          fechaNacimiento,
          contrasena: regContrasena,
        }),
      });

      const dataRes = await res.json();

      if (dataRes.success) {
        showAlert({
          message: "Usuario registrado correctamente",
          icon: "success",
        });

        if (checkSesion) await checkSesion();

        navigate("/");
      } else {
        showAlert({
          message: "Error: " + dataRes.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error en registro:", error);
      showAlert({
        message: "Error de conexión con el servidor",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />

      {alertData.visible && (
        <WindowWarning
          type={alertData.type}
          message={alertData.message}
          icon={alertData.icon}
          onConfirm={alertData.onConfirm}
          onCancel={alertData.onCancel}
        />
      )}

      <div className="auth-page">
        <div
          className={`auth-container fade-in-up ${
            esRegistrado ? "right-panel-active" : ""
          }`}
        >
          {/* REGISTRO – DESKTOP */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
              <h2 className="auth-title">REGISTRO</h2>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={regCorreo}
                  onChange={(e) => setRegCorreo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="__/__/____"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>

              <input
                type="password"
                placeholder="Contraseña"
                value={regContrasena}
                onChange={(e) => setRegContrasena(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirme su contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />

              <button type="submit" className="auth-btn">
                REGISTRARSE
              </button>

              {/* <p className="auth-or">o continua con...</p> */}

              {/* <div className="social-login">
                <button type="button">
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button type="button">
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div> */}
            </form>
          </div>

          {/* LOGIN – DESKTOP */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h2 className="auth-title">INICIO DE SESIÓN</h2>

              <label>Correo Electrónico</label>
              <input
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={loginCorreo}
                onChange={(e) => setLoginCorreo(e.target.value)}
              />

              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={loginContrasena}
                onChange={(e) => setLoginContrasena(e.target.value)}
              />

              <button type="submit" className="auth-btn">
                INICIAR SESIÓN
              </button>

              {/* <p className="auth-or">o continua con...</p> */}
{/* 
              <div className="social-login">
                <button type="button">
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button type="button">
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div> */}
            </form>
          </div>

          {/* OVERLAY */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="auth-logo">
                  <img src={logo2} alt="La Chacra Logo" />
                </div>

                <p>¿YA TENÉS UNA CUENTA?</p>

                <button
                  type="button"
                  className="switch-btn"
                  onClick={() => setesRegistrado(false)}
                  onMouseEnter={() => setHoveredPanel("left")}
                  onMouseLeave={() => setHoveredPanel(null)}
                >
                  INICIA SESIÓN
                </button>

                <img
                  src={fuego}
                  alt="Fuego"
                  className={`fuego-gif ${
                    hoveredPanel === "left" ? "show" : ""
                  }`}
                />
              </div>

              <div className="overlay-panel overlay-right">
                <div className="auth-logo">
                  <img src={logo2} alt="La Chacra Logo" />
                </div>

                <p>¿NO TENÉS UNA CUENTA?</p>

                <button
                  type="button"
                  className="switch-btn"
                  onClick={() => setesRegistrado(true)}
                  onMouseEnter={() => setHoveredPanel("right")}
                  onMouseLeave={() => setHoveredPanel(null)}
                >
                  REGISTRATE
                </button>

                <img
                  src={fuego}
                  alt="Fuego"
                  className={`fuego-gif ${
                    hoveredPanel === "right" ? "show" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* FORMULARIOS MOBILE */}
          <div className="form-container-mobile">
            {esRegistrado ? (
              <>
                <form
                  className="sign-up-container-mobile"
                  onSubmit={handleRegister}
                >
                  <h2 className="auth-title">REGISTRO</h2>

                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Correo"
                      value={regCorreo}
                      onChange={(e) => setRegCorreo(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="__/__/____"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                  </div>

                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={regContrasena}
                    onChange={(e) => setRegContrasena(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Confirme su contraseña"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                  />

                  <button type="submit" className="auth-btn">
                    REGISTRARSE
                  </button>

                  {/* <p className="auth-or">o continua con...</p> */}

                  {/* <div className="social-login">
                    <button type="button">
                      <FontAwesomeIcon icon={faGoogle} /> Google
                    </button>
                    <button type="button">
                      <FontAwesomeIcon icon={faFacebookF} /> Facebook
                    </button>
                  </div> */}
                </form>
              </>
            ) : (
              <>
                <form
                  className="sign-in-container-mobile"
                  onSubmit={handleLogin}
                >
                  <h2 className="auth-title">INICIO DE SESIÓN</h2>

                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={loginCorreo}
                    onChange={(e) => setLoginCorreo(e.target.value)}
                  />

                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={loginContrasena}
                    onChange={(e) => setLoginContrasena(e.target.value)}
                  />

                  <button type="submit" className="auth-btn">
                    INICIAR SESIÓN
                  </button>

                  {/* <p className="auth-or">o continua con...</p> */}

                  {/* <div className="social-login">
                    <button type="button">
                      <FontAwesomeIcon icon={faGoogle} /> Google
                    </button>
                    <button type="button">
                      <FontAwesomeIcon icon={faFacebookF} /> Facebook
                    </button>
                  </div> */}
                </form>
              </>
            )}

            {/* BOTÓN DE CAMBIO */}
            <div className="mobile-switch">
              {esRegistrado ? (
                <>
                  <p>¿YA TENÉS UNA CUENTA?</p>
                  <button
                    type="button"
                    className="switch-btn"
                    onClick={() => setesRegistrado(false)}
                  >
                    INICIAR SESIÓN
                  </button>
                </>
              ) : (
                <>
                  <p>¿NO TENÉS UNA CUENTA?</p>
                  <button
                    type="button"
                    className="switch-btn"
                    onClick={() => setesRegistrado(true)}
                  >
                    REGISTRATE
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Auth;
