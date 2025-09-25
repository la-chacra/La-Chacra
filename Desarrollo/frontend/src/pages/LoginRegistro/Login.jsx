import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import logo2 from "../../assets/logo2.png";
import fuego from "../../assets/fuego.gif";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  

  /* Estados para Registro */
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [fecha, setFecha] = useState("");


  return (
    <>
      <Header />
      <div className="auth-page">
        <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
          
          {/* FORMULARIOS PARA DESKTOP */}
          <div className="form-container sign-up-container">
            <form>
              <h2 className="auth-title">REGISTRO</h2>
              <div className="input-group">
                <input type="text" name="nombre" placeholder="Nombre" />
                <input type="text" name="apellido" placeholder="Apellido" />
              </div>
              <div className="input-group">
                <input type="email" name="RegCorreo" placeholder="Correo electrónico" />
                <input
                  type="text"
                  name="fechaNacimiento"
                  placeholder="__/__/____"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
              <input type="password" name="RegContrasena" placeholder="Contraseña" />
              <input type="password" name="confContrasena" placeholder="Confirme su contraseña" />
              <button type="submit" className="auth-btn">
                REGISTRARSE
              </button>
              <p className="auth-or">o continua con...</p>
              <div className="social-login">
                <button>
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button>
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form>
              <h2 className="auth-title">INICIO DE SESIÓN</h2>
              <label for="LogCorreo">Correo Electrónico</label>
              <input type="email" id="LogCorreo" name="LoginCorreo" placeholder="Ingrese su correo electrónico" />
              <label for="LogContrasena">Contraseña</label>
              <input type="password" id="LogContrasena" name="LoginContrasena" placeholder="Ingrese su contraseña" />
              <button type="submit" className="auth-btn">
                INICIAR SESIÓN
              </button>
              <p className="auth-or">o continua con...</p>
              <div className="social-login">
                <button>
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button>
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div>
            </form>
          </div>

          {/* OVERLAY DESKTOP */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="auth-logo">
                  <img src={logo2} alt="La Chacra Logo" />
                </div>
                <p>¿YA TENÉS UNA CUENTA?</p>
                <button
                  className="switch-btn"
                  onClick={() => setIsSignUp(false)}
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
                  className="switch-btn"
                  onClick={() => setIsSignUp(true)}
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
            {isSignUp ? (
              <form className="sign-up-container-mobile">
                <h2 className="auth-title">REGISTRO</h2>
                <div className="input-group">
                  <input type="text" name="nombre" placeholder="Nombre" />
                  <input type="text" name="apellido" placeholder="Apellido" />
                </div>
                <div className="input-group">
                  <input type="email" name="RegCorreo" placeholder="Correo" />
                  <input
                    type="text"
                    name="fechaNacimiento"
                    placeholder="__/__/____"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
                <input type="password" name="RegContrasena" placeholder="Contraseña" />
                <input type="password" name="confContrasena" placeholder="Confirme su contraseña" />
                <button type="submit" className="auth-btn">
                  REGISTRARSE
                </button>
                <p className="auth-or">o continua con...</p>
                <div className="social-login">
                  <button>
                    <FontAwesomeIcon icon={faGoogle} /> Google
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faFacebookF} /> Facebook
                  </button>
                </div>
              </form>
            ) : (
              <form className="sign-in-container-mobile">
                <h2 className="auth-title">INICIO DE SESIÓN</h2>
                <label>Correo Electrónico</label>
                <input type="email" name="LoginCorreo" placeholder="Ingrese su correo electrónico" />
                <label>Contraseña</label>
                <input type="password" name="LoginContrasena" placeholder="Ingrese su contraseña" />
                <button type="submit" className="auth-btn">
                  INICIAR SESIÓN
                </button>
                <p className="auth-or">o continua con...</p>
                <div className="social-login">
                  <button>
                    <FontAwesomeIcon icon={faGoogle} /> Google
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faFacebookF} /> Facebook
                  </button>
                </div>
              </form>
            )}

            {/* BOTÓN CAMBIO FORMULARIO */}
            <div className="mobile-switch">
              {isSignUp ? (
                <>
                  <p>¿YA TENÉS UNA CUENTA?</p>
                  <button className="switch-btn" onClick={() => setIsSignUp(false)}>
                    INICIAR SESIÓN
                  </button>
                </>
              ) : (
                <>
                  <p>¿NO TENÉS UNA CUENTA?</p>
                  <button className="switch-btn" onClick={() => setIsSignUp(true)}>
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
