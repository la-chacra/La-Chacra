import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const GestorEmpleado = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si existe id, significa que estamos editando

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Empleado");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/empleado/obtener/${id}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            setNombre(response.data.nombre || "");
            setApellido(response.data.apellido || "");
            setCorreo(response.data.correo || "");
            setRol(response.data.tipo === "A" ? "Administrador" : "Empleado");
            setFechaNacimiento(response.data.fecha_nacimiento || "");
            setActivo(Boolean(response.data.activo));
          } else {
            alert("Error," + response.message)
          }

        })
        .catch(() => {
          console.error("Error al cargar los datos del empleado");
        });
    }
  }, [id]);

  const handleGuardar = async () => {
    if (!nombre || !apellido || !correo || !fechaNacimiento) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // formato del objeto que se enviará al servidor
    // Este mismo formato debe ser recibido y procesado por el backend
    const usuarioData = {
      nombre,
      apellido,
      correo,
      tipo: rol === "Administrador" ? "A" : "E",
      fechaNacimiento: fechaNacimiento,
      activo,
    };

    if (contrasena.trim() !== "") {
      usuarioData.contrasena = contrasena;
    }

    // si existe ID → editar (PUT)
    // si no existe → crear (POST)
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/empleado/modificar/${id}` : "/api/empleado/registrar";

    try {
      // implementar estos endpoints:
      // - POST /api/empleado/registrar → crea nuevo usuario
      //     debe validar que el correo no exista y guardar la contraseña cifrada.
      //     retornar JSON: { success: true, message: "Usuario creado" }
      //
      // - PUT /api/usuarios/:id → actualiza datos del usuario existente
      //     debe aceptar los campos modificables (nombre, correo, rol, activo, etc.)
      //     retornar JSON: { success: true, message: "Usuario actualizado" }
      //
      // Aabos deben responder con success = false y message si hay errores.
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("Empleado guardado correctamente");
        navigate("/gestion/empleados-tabla");
      } else {
        alert("Error: " + data.message);
      }
    } catch {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="om-order-management font-montserrat">
      <Header />

      <div className="om-content">
        <div className="om-header-actions">
          <button
            className="om-back-button"
            onClick={() => navigate("/gestion/empleados-tabla")}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Volver a Empleados
          </button>

          <button className="om-export-button">
            {/* crear endpoint GET /api/exportar-usuario/:id
                que exporte la información del usuario actual en PDF o CSV */}
            Exportar
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <div className="om-main-content">
          <div className="om-left-section">
            <div className="om-mesa-section">
              <h3>Nombre</h3>
              <input
                type="text"
                placeholder="Ingresar nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="om-nombre-plato"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Apellido</h3>
              <input
                type="text"
                placeholder="Ingresar apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Correo electrónico</h3>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="om-precio-input"
              />
            </div>

            {!id && (
              <div className="om-cdp-section">
                <h3>Contraseña</h3>
                <input
                  type="password"
                  placeholder="Ingresar contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="om-precio-input"
                />
              </div>
            )}


            <div className="om-estado-section">
              <h3>Rol</h3>
              <div className="om-status-dropdown">
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="om-status-select"
                >
                  <option value="Empleado">Empleado</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>

            <div className="om-cdp-section">
              <h3>Fecha de nacimiento</h3>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="gp-switch-section">
              <label className="ae-switch-label">
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />{" "}
                Activo
              </label>
            </div>
          </div>

          <div className="om-right-section">
            <div className="om-total-section">
              <h3>Acciones</h3>
              <div className="om-action-buttons">
                <button className="om-save-button" onClick={handleGuardar}>
                  Guardar Empleado
                </button>
                <button
                  className="om-save-print-button"
                  onClick={() => navigate("/gestion/empleados")}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestorEmpleado;
