import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const GestorProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [cantidadMinima, setCantidadMinima] = useState("");
  const [unidad, setUnidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/stock/${id}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            const p = response.data;
            setNombre(p.nombre || "");
            setCategoria(p.categoria || "");
            setCantidad(p.cantidad || "");
            setCantidadMinima(p.cantidad_minima || "");
            setUnidad(p.unidad || "");
            setPrecioUnitario(p.precio_unitario || "");
            setActivo(Boolean(p.activo));
          } else {
            alert("Error al obtener producto: " + response.message);
          }
        })
        .catch(() => alert("Error al cargar los datos del producto"));
    }
  }, [id]);

  const handleGuardar = async () => {
    if (!nombre || !categoria || !unidad) {
      alert("Por favor completa los campos obligatorios (nombre, categoría, unidad).");
      return;
    }

    const productoData = {
      nombre,
      categoria,
      cantidad: parseFloat(cantidad) || 0,
      cantidad_minima: parseFloat(cantidadMinima) || 0,
      unidad,
      precio_unitario: parseFloat(precioUnitario) || 0,
      activo,
    };

    const method = id ? "PUT" : "POST";
    const url = id
      ? `/api/stock/modificar/${id}`
      : "/api/stock/registrar"; 

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoData),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("Producto guardado correctamente");
        navigate("/gestion/stock");
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
            onClick={() => navigate("/gestion/stock")}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Volver al Stock
          </button>

          <button className="om-export-button" disabled>
            Exportar <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <div className="om-main-content">
          <div className="om-left-section">
            <div className="om-mesa-section">
              <h3>Nombre del producto</h3>
              <input
                type="text"
                placeholder="Ej: Tomates"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="om-nombre-plato"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Categoría</h3>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="om-precio-input"
              >
                <option value="">Seleccionar categoría</option>
                <option value="Carnes">Carnes</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Secos">Secos</option>
                <option value="Frutas">Frutas</option>
                <option value="Verduras">Verduras</option>
                <option value="Aderezos">Aderezos</option>
                <option value="Condimentos">Condimentos</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Postres">Postres</option>
              </select>
            </div>

            <div className="om-cdp-section">
              <h3>Cantidad</h3>
              <input
                type="number"
                placeholder="0"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Cantidad mínima</h3>
              <input
                type="number"
                placeholder="0"
                value={cantidadMinima}
                onChange={(e) => setCantidadMinima(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Unidad</h3>
              <select
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                className="om-precio-input"
              >
                <option value="">Seleccionar unidad</option>
                <option value="Kg">Kg</option>
                <option value="g">g</option>
                <option value="Lt">Lt</option>
                <option value="ml">ml</option>
                <option value="Atado">Atado</option>
                <option value="Unidad">Unidad</option>
              </select>
            </div>

            <div className="om-cdp-section">
              <h3>Precio unitario</h3>
              <input
                type="number"
                placeholder="0"
                value={precioUnitario}
                onChange={(e) => setPrecioUnitario(e.target.value)}
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
                  Guardar Producto
                </button>
                <button
                  className="om-save-print-button"
                  onClick={() => navigate("/gestion/stock")}
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

export default GestorProducto;
