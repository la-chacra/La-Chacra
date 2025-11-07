import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const categoriasPredefinidas = [
  "Entradas",
  "Carnes",
  "Pescados",
  "Pastas",
  "Vinos",
  "Whiskey",
  "Cervezas",
  "Refrescos",
  "Helados",
  "Postres",
];

const EditarPlato = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay ID, estamos editando

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredienteInput, setIngredienteInput] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/productos-menu/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            const plato = data.data;
            setNombre(plato.nombre || "");
            setPrecio(plato.precio || "");
            setCategoria(plato.categoria || "");
            setDisponibilidad(!!plato.disponibilidad);
            setActivo(!!plato.activo);
            setImagenPreview(plato.imagen_url || null);

            try {
              setIngredientes(
                Array.isArray(plato.ingredientes)
                  ? plato.ingredientes
                  : JSON.parse(plato.ingredientes || "[]")
              );
            } catch {
              setIngredientes([]);
            }
          } else {
            alert("Error al cargar el plato: " + data.message);
          }
        })
        .catch((err) => {
          console.error("Error al obtener plato:", err);
        });
    }
  }, [id]);

  const handleAddIngrediente = (e) => {
    if (e.key === "Enter" && ingredienteInput.trim() !== "") {
      e.preventDefault();
      if (!ingredientes.includes(ingredienteInput.trim())) {
        setIngredientes([...ingredientes, ingredienteInput.trim()]);
      }
      setIngredienteInput("");
    }
  };

  const handleRemoveIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
formData.append("ingredientes", JSON.stringify(ingredientes).replace(/\\/g, ""));
    formData.append("categoria", categoria);
    formData.append("disponibilidad", disponibilidad ? "1" : "0");
    formData.append("activo", activo ? "1" : "0");
    if (imagen) formData.append("imagen", imagen);

    const url = id
      ? `/api/productos-menu/${id}`
      : "/api/productos-menu";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      const rawText = await res.text();
      console.log("Respuesta cruda:", rawText);

      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      if (data.success) {
        alert(id ? "Plato actualizado correctamente" : "Plato creado correctamente");
        navigate("/gestion/platos-tabla");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error en conexión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="om-order-management font-montserrat">
      <Header />

      <div className="om-content">
        <div className="om-header-actions">
          <button
            className="om-back-button"
            onClick={() => navigate("/gestion/platos-tabla")}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Volver a Tabla de Platos
          </button>

          <button className="om-export-button">
            Exportar <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <div className="om-main-content">
          {/* SECCIÓN IZQUIERDA */}
          <div className="om-left-section">
            <div className="gp-image-section">
              <h3>Imagen del Plato</h3>
              <div className="gp-image-upload">
                {imagenPreview ? (
                  <img
                    src={imagenPreview}
                    alt="preview"
                    className="gp-preview-img"
                  />
                ) : (
                  <div className="gp-image-placeholder">Sin imagen</div>
                )}
                <label className="gp-upload-btn">
                  <FontAwesomeIcon icon={faPlus} /> Subir Imagen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagenChange}
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="om-mesa-section">
              <h3>Nombre del Plato</h3>
              <input
                type="text"
                placeholder="Ingresar nombre del plato"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="om-nombre-plato"
              />
            </div>

            <div className="om-cdp-section">
              <h3>Precio</h3>
              <input
                type="number"
                min="0"
                placeholder="Ingresar precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="om-precio-input"
              />
            </div>

            <div className="gp-ingredientes-section">
              <h3>Ingredientes</h3>
              <div className="gp-ingredientes-input">
                <input
                  type="text"
                  placeholder="Agregar ingrediente y presionar Enter"
                  value={ingredienteInput}
                  onChange={(e) => setIngredienteInput(e.target.value)}
                  onKeyDown={handleAddIngrediente}
                />
              </div>

              <div className="gp-ingredientes-tags">
                {ingredientes && ingredientes.length > 0 ? (
                  ingredientes.map((ing, index) => (
                    <span key={index} className="gp-tag">
                      {ing.trim()}
                      <button
                        onClick={() => handleRemoveIngrediente(index)}
                        className="gp-tag-remove"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="gp-no-ingredientes">Sin ingredientes</span>
                )}
              </div>
            </div>

            <div className="om-estado-section">
              <h3>Categoría</h3>
              <div className="om-status-dropdown">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="om-status-select"
                >
                  <option value="">Seleccionar categoría</option>
                  {categoriasPredefinidas.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="gp-switch-section2">
              <label>
                <input
                  type="checkbox"
                  checked={disponibilidad}
                  onChange={(e) => setDisponibilidad(e.target.checked)}
                />{" "}
                Disponible
              </label>
            </div>

            <div className="gp-switch-section">
              <label>
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />{" "}
                Activo
              </label>
            </div>
          </div>

          {/* SECCIÓN DERECHA */}
          <div className="om-right-section">
            <div className="om-total-section">
              <h3>Acciones</h3>
              <div className="om-action-buttons">
                <button className="om-save-button" onClick={handleGuardar}>
                  {id ? "Actualizar Plato" : "Guardar Plato"}
                </button>
                <button
                  className="om-save-print-button"
                  onClick={() => navigate("/gestion/platos-tabla")}
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

export default EditarPlato;
