import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import logo2 from "../../assets/logo2.png";
import fuego from "../../assets/fuego.gif";

const Auth = () => {
  const [registrarse, setRegistrarse] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  // Estados para los formularios
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Función para registro
  const handleRegister = async (e) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const data = {
      action: "registrar",
      nombre,
      apellido,
      correo,
      contrasena,
      fechaNacimiento,
      tipo: "cliente", // por ejemplo
    };

    const res = await fetch("http://localhost/La-Chacra/Desarrollo/backend/app/Controllers/AuthController.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    alert(result.message || "Registro realizado");
  };

  // Función para login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      action: "login",
      correo,
      contrasena,
    };

    const res = await fetch("http://localhost/La-Chacra/Desarrollo/backend/app/Controllers/AuthController.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    if (result.success) {
      alert("Sesión iniciada correctamente");
    } else {
      alert(result.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className={`auth-container ${registrarse ? "right-panel-active" : ""}`}>

          {/* FORMULARIO REGISTRO */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
            <form onSubmit={handleRegister}>
              <h2 className="auth-title">REGISTRO</h2>
              <div className="input-group">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                <input
                  type="text"
                  name="fechaNacimiento"
                  placeholder="__/__/____"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <input type="password" placeholder="Confirme su contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
              <button type="submit" className="auth-btn">
                REGISTRARSE
              </button>
              <p className="auth-or">o continua con...</p>
              <div className="social-login">
                <button type="button">
                <button type="button">
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button type="button">
                <button type="button">
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </button>
              </div>
            </form>
          </div>

          {/* FORMULARIO LOGIN */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
            <form onSubmit={handleLogin}>
              <h2 className="auth-title">INICIO DE SESIÓN</h2>
              <label>Correo Electrónico</label>
              <input type="email" placeholder="Ingrese su correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              <label>Contraseña</label>
              <input type="password" placeholder="Ingrese su contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <button type="submit" className="auth-btn">
                INICIAR SESIÓN
              </button>
              <p className="auth-or">o continua con...</p>
              <div className="social-login">
                <button type="button">
                <button type="button">
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <button type="button">
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
                  onClick={() => setRegistrarse(false)}
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
                  onClick={() => setRegistrarse(true)}
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

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
