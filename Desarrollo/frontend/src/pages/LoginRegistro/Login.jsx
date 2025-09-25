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
    e.preventDefault(); // evita recargar la página

    const dataSend = {
      correo: loginCorreo,
      contrasena: loginContrasena
    };

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSend),
    });

    const dataRes = await res.json();
    console.log("Login response:", data);

    if (dataRes.status === "ok") {
      localStorage.setItem("token", dataRes.token);
      alert("Login exitoso");
    } else {
      alert("Error: " + dataRes.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (regContrasenaontrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const res = await fetch("http://localhost:8000/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        apellido,
        correo: regCorreo,
        fecha,
        contrasena: regContrasena,
      }),
    });

    const dataRes = await res.json();
    console.log("Register response:", dataRes);

    if (dataRes.status === "ok") {
      alert("Usuario registrado");
    } else {
      alert("Error: " + dataRes.message);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
          
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
            <form onSubmit={handleLogin}>
              <h2 className="auth-title">INICIO DE SESIÓN</h2>
              <label for="LogCorreo">Correo Electrónico</label>
              <input type="email" id="LogCorreo" name="loginCorreo" placeholder="Ingrese su correo electrónico" />
              <label for="LogContrasena">Contraseña</label>
              <input type="password" id="LogContrasena" name="loginContrasena" placeholder="Ingrese su contraseña" />
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
              <form className="sign-up-container-mobile" onSubmit={handleRegister}>
                <h2 className="auth-title">REGISTRO</h2>
                <div className="input-group">
                  <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  <input type="text" name="apellido" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
                <div className="input-group">
                  <input type="email" name="regCorreo" placeholder="Correo" value={regCorreo} onChange={(e) => setRegCorreo(e.target.value)} />
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
                <input type="password" name="regContrasena" placeholder="Contraseña" value={regContrasena} onChange={(e) => setRegContrasena(e.target.value)} />
                <input type="password" name="confContrasena" placeholder="Confirme su contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
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
              <form className="sign-in-container-mobile" onSubmit={handleLogin}>
                <h2 className="auth-title">INICIO DE SESIÓN</h2>
                <label>Correo Electrónico</label>
                <input type="email" name="loginCorreo" placeholder="Ingrese su correo electrónico" value={loginCorreo} onChange={(e) => setLoginCorreo(e.target.value)} />
                <label>Contraseña</label>
                <input type="password" name="loginContrasena" placeholder="Ingrese su contraseña" value={loginContrasena} onChange={(e) => setLoginContrasena(e.target.value)} />
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
