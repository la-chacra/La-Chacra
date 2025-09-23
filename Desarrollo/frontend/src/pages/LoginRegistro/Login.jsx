import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import logo2 from "../../assets/logo2.png";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
          {/* registro */}
          <div className="form-container sign-up-container">
            <form>
              <h2 className="auth-title">REGISTRO</h2>
              <div className="input-group">
                <input type="text" placeholder="Nombre" />
                <input type="text" placeholder="Apellido" />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Correo" />
                <input
                  type="text"
                  placeholder="__/__/____"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
              <input type="password" placeholder="Contraseña" />
              <input type="password" placeholder="Confirme su contraseña" />
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

          {/* inicio */}
          <div className="form-container sign-in-container">
            <form>
              <h2 className="auth-title">INICIO DE SESIÓN</h2>
              <label>Correo Electrónico</label>
              <input type="email" placeholder="Ingrese su correo electrónico" />
              <label>Contraseña</label>
              <input type="password" placeholder="Ingrese su contraseña" />
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
                >
                  INICIA SESIÓN
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <div className="auth-logo">
                  <img src={logo2} alt="La Chacra Logo" />
                </div>
                <p>¿NO TENÉS UNA CUENTA?</p>
                <button
                  className="switch-btn"
                  onClick={() => setIsSignUp(true)}
                >
                  REGISTRATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
