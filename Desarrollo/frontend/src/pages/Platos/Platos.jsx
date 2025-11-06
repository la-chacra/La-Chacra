import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

// Categorías predefinidas
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

const GestorPlatos = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay un ID, estamos editando un plato existente

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredienteInput, setIngredienteInput] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  // 🔹 Si estamos editando, obtenemos los datos del plato
  useEffect(() => {
    if (id) {
      fetch(`/api/productos-menu/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            const plato = data.data;
            setNombre(plato.nombre || "");
            setPrecio(plato.precio || "");
            setIngredientes(
              plato.ingredientes ? JSON.parse(plato.ingredientes) : []
            );
            setCategoria(plato.categoria || "");
            setDisponibilidad(Boolean(plato.disponibilidad));
            setActivo(Boolean(plato.activo));
            if (plato.imagen_url) {
              setImagenPreview(plato.imagen_url);
            }
          } else {
            console.error("Error al obtener plato:", data);
            alert("No se pudo cargar la información del plato.");
          }
        })
        .catch((err) => {
          console.error("Error de conexión con el servidor:", err);
          alert("Error al conectar con el servidor.");
        });
    }
  }, [id]);

  // 🔹 Añadir un ingrediente
  const handleAddIngrediente = (e) => {
    if (e.key === "Enter" && ingredienteInput.trim() !== "") {
      e.preventDefault();
      if (!ingredientes.includes(ingredienteInput.trim())) {
        setIngredientes([...ingredientes, ingredienteInput.trim()]);
      }
      setIngredienteInput("");
    }
  };

  // 🔹 Eliminar un ingrediente
  const handleRemoveIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  // 🔹 Cambiar imagen
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Guardar plato (crear o editar)
  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("ingredientes", JSON.stringify(ingredientes));
    formData.append("categoria", categoria);
    formData.append("disponibilidad", disponibilidad);
    formData.append("activo", activo);
    if (imagen) formData.append("imagen", imagen);

    const url = id
      ? `/api/productos-menu/${id}` // PUT si existe id
      : "/api/productos-menu"; // POST si no hay id

    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        alert("Plato guardado correctamente");
        navigate("/gestion/platos-tabla");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("Error al conectar con el servidor");
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
            Exportar
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <div className="om-main-content">
          <div className="om-left-section">
            {/* SECCIÓN IMAGEN */}
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

            {/* NOMBRE */}
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

            {/* PRECIO */}
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

            {/* INGREDIENTES */}
            <div className="gp-ingredientes-section">
              <h3>Ingredientes</h3>
              <div className="gp-ingredientes-input">
                <input
                  type="text"
                  placeholder="Ingresar ingredientes"
                  value={ingredienteInput}
                  onChange={(e) => setIngredienteInput(e.target.value)}
                  onKeyDown={handleAddIngrediente}
                />
              </div>
              <div className="gp-ingredientes-tags">
                {ingredientes.map((ing, index) => (
                  <span key={index} className="gp-tag">
                    {ing}
                    <button
                      onClick={() => handleRemoveIngrediente(index)}
                      className="gp-tag-remove"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* CATEGORÍA */}
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

            {/* DISPONIBILIDAD */}
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

            {/* ACTIVO */}
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

          {/* BOTONES DE ACCIÓN */}
          <div className="om-right-section">
            <div className="om-total-section">
              <h3>Acciones</h3>
              <div className="om-action-buttons">
                <button
                  className="om-save-button"
                  onClick={handleGuardar}
                >
                  Guardar Plato
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

export default GestorPlatos;
