import React, { useState, useEffect } from "react";
import Header from "../../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const AñadirReserva = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fechaHora, setFechaHora] = useState("");
  const [cantidadPersonas, setCantidadPersonas] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");

  // Si es edición (opcional)
  useEffect(() => {
    if (id) {
      fetch(`/api/reservas/${id}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            const r = response.data;
            setFechaHora(r.fecha_hora || "");
            setCantidadPersonas(r.cant_personas || "");
            setEstado(r.estado || "Pendiente");
            setNombreCliente(r.nombre || "");
            setApellidoCliente(r.apellido || "");
          } else {
            alert("Error al obtener reserva: " + response.message);
          }
        })
        .catch(() => alert("Error al cargar los datos de la reserva"));
    }
  }, [id]);

  const handleGuardar = async () => {
    if (!fechaHora || !cantidadPersonas) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    // ✅ Validación de fecha
    const fechaSeleccionada = new Date(fechaHora);
    const ahora = new Date();
    const maxFecha = new Date();
    maxFecha.setFullYear(ahora.getFullYear() + 1); // máximo un año en el futuro

    if (fechaSeleccionada < ahora) {
      alert("No puedes seleccionar una fecha pasada.");
      return;
    }
    if (fechaSeleccionada > maxFecha) {
      alert("No puedes seleccionar una fecha tan lejana (máximo 1 año).");
      return;
    }

    const reservaData = {
      fechaHora,
      cantidadPersonas: parseInt(cantidadPersonas),
      estado,
      nombreCliente,
      apellidoCliente,
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/reservas/modificar/${id}` : "/api/reservas/registrar";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaData),
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) navigate("/gestion/reserva");
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
            onClick={() => navigate("/gestion/reserva")}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Volver a Reservas
          </button>

          <button className="om-export-button" disabled>
            Exportar <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <div className="om-main-content">
          {/* IZQUIERDA */}
          <div className="om-left-section">
            <div className="om-mesa-section">
              <h3>Fecha y hora</h3>
              <input
                type="datetime-local"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
                className="om-nombre-plato"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Cantidad de personas</h3>
              <input
                type="number"
                placeholder="Ej: 4"
                value={cantidadPersonas}
                onChange={(e) => setCantidadPersonas(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Estado</h3>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="om-precio-input"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div className="om-cdp-section">
              <h3>Nombre del cliente</h3>
              <input
                type="text"
                placeholder="Ej: Juan"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Apellido del cliente</h3>
              <input
                type="text"
                placeholder="Ej: Pérez"
                value={apellidoCliente}
                onChange={(e) => setApellidoCliente(e.target.value)}
                className="om-precio-input"
              />
            </div>
          </div>

          {/* DERECHA */}
          <div className="om-right-section">
            <div className="om-total-section">
              <h3>Acciones</h3>
              <div className="om-action-buttons">
                <button className="om-save-button" onClick={handleGuardar}>
                  Guardar Reserva
                </button>
                <button
                  className="om-save-print-button"
                  onClick={() => navigate("/gestion/reserva")}
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

export default AñadirReserva;
