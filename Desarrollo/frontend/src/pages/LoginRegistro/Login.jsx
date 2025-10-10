import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import logo2 from "../../assets/logo2.png";
import fuego from "../../assets/fuego.gif";

const Auth = () => {
  const [esRegistrado, setesRegistrado] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  // Estados para formulario de Registro
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [regCorreo, setRegCorreo] = useState("");
  const [regContrasena, setRegContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Estados para formulario de Login
  const [loginCorreo, setLoginCorreo] = useState("");
  const [loginContrasena, setLoginContrasena] = useState("");

   const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginCorreo || !loginContrasena) {
      alert("Debe ingresar correo y contraseña");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          correo: loginCorreo,
          contrasena: loginContrasena,
        }),
      });

      const dataRes = await res.json();
      // console.log("Login response:", dataRes);

      if (dataRes.success) {
        alert("Login exitoso");
      } else {
        alert("Error: " + dataRes.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (regContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
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
      console.log("Register response:", dataRes);

      if (dataRes.success) {
        alert("Usuario registrado correctamente");
        // Opcional: cambiar a login automáticamente
        setesRegistrado(false);
      } else {
        alert("Error: " + dataRes.message);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className={`auth-container fade-in-up ${esRegistrado ? "right-panel-active" : ""}`}>
          
          {/* FORMULARIOS PARA DESKTOP */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
              <h2 className="auth-title">REGISTRO</h2>
              <div className="input-group">
                <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <input type="text" name="apellido" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
              </div>
              <div className="input-group">
                <input type="email" name="regCorreo" placeholder="Correo electrónico" value={regCorreo} onChange={(e) => setRegCorreo(e.target.value)} />
                <input
                  type="text"
                  name="fechaNacimiento"
                  placeholder="__/__/____"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              <input type="password" name="regContrasena" placeholder="Contraseña" value={regContrasena} onChange={(e) => setRegContrasena(e.target.value)}/>
              <input type="password" name="confirmarContrasena" placeholder="Confirme su contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)}/>
              <button type="submit" className="auth-btn">
                REGISTRARSE
              </button>
              <p className="auth-or">o continua con...</p>
              <div className="social-login">
                <button type="button">
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button type="button">
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div>
            </form>
          </div>

          {/* FORMULARIO LOGIN */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h2 className="auth-title">INICIO DE SESIÓN</h2>
              <label>Correo Electrónico</label>
              <input type="email" id="LogCorreo" name="loginCorreo" placeholder="Ingrese su correo electrónico" value={loginCorreo} onChange={(e) => setLoginCorreo(e.target.value)}/>
              <label>Contraseña</label>
              <input type="password" id="LogContrasena" name="loginContrasena" placeholder="Ingrese su contraseña" value={loginContrasena} onChange={(e) => setLoginContrasena(e.target.value)}/>
              <button type="submit" className="auth-btn">
                INICIAR SESIÓN
              </button>
              <p className="auth-or">o continua con...</p>
              <div className="social-login">
                <button type="button">
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button type="button">
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div>
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
                  className={`fuego-gif ${hoveredPanel === "left" ? "show" : ""}`}
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
                  className={`fuego-gif ${hoveredPanel === "right" ? "show" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* FORMULARIOS MÓVIL */}
          <div className="form-container-mobile">
            {esRegistrado ? (
              <form className="sign-up-container-mobile" onSubmit={handleRegister}>
                <h2 className="auth-title">REGISTRO</h2>
                <div className="input-group">
                  <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                  <input type="text" name="apellido" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                </div>
                <div className="input-group">
                  <input type="email" name="regCorreo" placeholder="Correo" value={regCorreo} onChange={(e) => setRegCorreo(e.target.value)}/>
                  <input
                    type="text"
                    name="fechaNacimiento"
                    placeholder="__/__/____"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                  />
                </div>(
                <input type="password" name="regContrasena" placeholder="Contraseña" value={regContrasena} onChange={(e) => setRegContrasena(e.target.value)}/>
                <input type="password" name="confirmarContrasena" placeholder="Confirme su contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)}/>
                <button type="submit" className="auth-btn">
                  REGISTRARSE
                </button>
                <p className="auth-or">o continua con...</p>
                <div className="social-login">
                  <button type="button">
                    <FontAwesomeIcon icon={faGoogle} /> Google
                  </button>
                  <button type="button">
                    <FontAwesomeIcon icon={faFacebookF} /> Facebook
                  </button>
                </div>
              </form>
            ) : (
              <form className="sign-in-container-mobile">
                <h2 className="auth-title">INICIO DE SESIÓN</h2>
                <label>Correo Electrónico</label>
                <input type="email" id="LogCorreoMobile" name="loginCorreo" placeholder="Ingrese su correo electrónico" value={loginCorreo} onChange={(e) => setLoginCorreo(e.target.value)} />
                <label>Contraseña</label>
                <input type="password" id="LogContrasenaMobile" name="loginContrasena" placeholder="Ingrese su contraseña" value={loginContrasena} onChange={(e) => setLoginContrasena(e.target.value)}/>
                <button type="submit" className="auth-btn">
                  INICIAR SESIÓN
                </button>
                <p className="auth-or">o continua con...</p>
                <div className="social-login">
                  <button type="button">
                    <FontAwesomeIcon icon={faGoogle} /> Google
                  </button>
                  <button type="button">
                    <FontAwesomeIcon icon={faFacebookF} /> Facebook
                  </button>
                </div>
              </form>
            )}

            {/* BOTÓN CAMBIO FORMULARIO */}
            <div className="mobile-switch">
              {esRegistrado ? (
                <>
                  <p>¿YA TENÉS UNA CUENTA?</p>
                  <button type="button" className="switch-btn" onClick={() => setesRegistrado(false)}>
                    INICIAR SESIÓN
                  </button>
                </>
              ) : (
                <>
                  <p>¿NO TENÉS UNA CUENTA?</p>
                  <button type="button" className="switch-btn" onClick={() => setesRegistrado(true)}>
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
