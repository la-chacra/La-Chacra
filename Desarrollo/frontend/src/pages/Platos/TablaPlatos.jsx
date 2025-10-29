import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faDownload,
  faPlus,
  faEllipsisV,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import IngredientsModal from "../../components/IngredientsModal";

const MenuTable = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [menuData, setMenuData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState(null);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const navigate = useNavigate();

  const allCategories = [
    "Categoría",
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
    // se pueden agregar más categorías aquí si se cambian en la carta
  ];

  const categoryColors = {
    Entradas: "#f07748ff",
    Carnes: "#c42c39ff",
    Pescados: "#3e89cfff",
    Pastas: "#eeb73fff",
    Vinos: "#5b32d4ff",
    Whiskey: "#25a325ff",
    Cervezas: "#dfad0aff",
    Refrescos: "#19c28fff",
    Helados: "#e062acff",
    Postres: "#b47ce7ff",
    "Categoría": "#868E96",
    Todos: "#495057",
  };

  useEffect(() => { 
     // necesitan exponer un endpoint GET /api/productos-menu 
     // que devuelva todos los productos con campos:
     // producto_id, nombre, precio, ingredientes[], categoria, disponibilidad, activo, imagen_url
     // imagen URL es importante para mostrar la imagen en la carta y tabla. 
     // puede ser ruta relativa o absoluta
     // tal vez se tenga que cambiar la forma que la carta funciona para soportar esto, si ustedes pueden revisar
    fetch("/api/productos-menu")
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch(() => {
        // mock para pruebas
        setMenuData([
          {
            producto_id: 1,
            nombre: "Hamburguesa",
            precio: 500,
            ingredientes: ["Carne", "Queso", "Lechuga", "Tomate"],
            categoria: "Carnes",
            disponibilidad: true,
            activo: true,
            imagen_url: "/src/assets/hamburguesa.png",
          },
          {
            producto_id: 2,
            nombre: "Pasta Alfredo",
            precio: 650,
            ingredientes: ["Fettuccine", "Salsa Alfredo", "Parmesano"],
            categoria: "Pastas",
            disponibilidad: true,
            activo: true,
            imagen_url: "/src/assets/pasta.png",
          },
          {
            producto_id: 3,
            nombre: "Ensalada César",
            precio: 400,
            ingredientes: ["Lechuga", "Crutones", "Parmesano", "Aderezo César"],
            categoria: "Entradas",
            disponibilidad: false,
            activo: true,
            imagen_url: "/src/assets/cesar.png",
          },
        ]);
      });
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedItems(new Set(menuData.map((p) => p.producto_id)));
    else setSelectedItems(new Set());
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedItems(newSelected);
  };

  const filteredData = menuData.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ingredientes.some((ing) =>
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "Todos" ||
      categoryFilter === "Categoría" ||
      p.categoria === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    // crear endpoint GET /api/exportar-historial
    // debe generar CSV o Excel, usando los IDs seleccionados si se pasan
    // ejemplo: /api/exportar-productos?ids=1,2,3
    const ids = Array.from(selectedItems).join(",");
    const url = ids
      ? `/api/exportar-productos?ids=${ids}`
      : `/api/exportar-productos`;
    window.open(url, "_blank");
  };

  const handleViewIngredients = (ingredientes) => {
    const modalData = {
      agregados: ingredientes,
      removidos: [],
    };
    setSelectedIngredients(modalData);
    setShowModal(true);
  };

  const handleAddProduct = () => {
    // redirige a la ruta de crear producto, backend debe soportar POST /api/productos
    navigate("/gestion/plato");
  };

  const handleEdit = (id) => {
    // redirige a editar producto, backend debe soportar PUT /api/productos/:id
    navigate(`/gestion/plato/${id}`);
  };

  const handleDelete = (id) => {
     // necesitan DELETE /api/productos/:id
     // para eliminar el producto del menú
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      setMenuData(menuData.filter((item) => item.producto_id !== id));
      setOpenActionMenu(null);
    }
  };

  return (
    <div className="hs-history-container font-montserrat">
      <Header />

      <div className="hs-history-content">
        <div className="hs-controls-bar">
          <div className="hs-search-section">
            <div className="hs-search-input-container">
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hs-search-input"
              />
              <FontAwesomeIcon icon={faSearch} className="hs-search-icon" />
            </div>

            <button
              className="hs-filter-btn"
              onClick={() => setShowCategoryFilter((prev) => !prev)}
            >
              <span>Filtrar</span>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>

          <div
            className={`hs-date-filter-wrapper ${
              showCategoryFilter ? "visible" : ""
            }`}
          >
            <div className="hs-date-filter">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="hs-date-select"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="hs-export-btn" onClick={handleAddProduct}>
            <span>Añadir producto</span>
            <FontAwesomeIcon icon={faPlus} />
          </button>

          <button className="hs-export-btn" onClick={handleExport}>
            <span>
              {selectedItems.size > 0 ? "Exportar seleccionados" : "Exportar"}
            </span>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <div className="hs-table-container">
          <table className="hs-history-table">
            <thead>
              <tr>
                <th className="hs-checkbox-column">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedItems.size === menuData.length}
                  />
                </th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Ingredientes</th>
                <th>Categoría</th>
                <th>Disponibilidad</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((p) => (
                <tr
                  key={p.producto_id}
                  className={selectedItems.has(p.producto_id) ? "hs-selected" : ""}
                >
                  <td className="hs-checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(p.producto_id)}
                      onChange={(e) =>
                        handleSelectItem(p.producto_id, e.target.checked)
                      }
                    />
                  </td>

                  <td className="tp-image-cell">
                    {p.imagen_url ? (
                      <img
                        src={p.imagen_url}
                        alt={p.nombre}
                        className="tp-product-image"
                      />
                    ) : (
                      <span>-</span>
                    )}
                  </td>

                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>
                    <button
                      onClick={() => handleViewIngredients(p.ingredientes)}
                      className="tp-link-btn"
                    >
                      Ver
                    </button>
                  </td>
                  <td>
                    <span
                      className="tp-category-badge"
                      style={{
                        backgroundColor: categoryColors[p.categoria] || "#868E96",
                      }}
                    >
                      {p.categoria}
                    </span>
                  </td>
                  <td>
                    <span
                      className={p.disponibilidad ? "hs-positive" : "hs-negative"}
                    >
                      {p.disponibilidad ? "Disponible" : "No disponible"}
                    </span>
                  </td>
                  <td>
                    <span className={p.activo ? "hs-positive" : "hs-negative"}>
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="tp-actions-cell">
                    <button
                      className="tp-action-btn"
                      onClick={() =>
                        setOpenActionMenu(
                          openActionMenu === p.producto_id ? null : p.producto_id
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>

                    {openActionMenu === p.producto_id && (
                      <div className="tp-action-menu">
                        <button
                          className="tp-action-item tp-edit"
                          onClick={() => handleEdit(p.producto_id)}
                        >
                          <FontAwesomeIcon icon={faPen} className="tp-action-icon" />
                          Editar
                        </button>
                        <button
                          className="tp-action-item tp-delete"
                          onClick={() => handleDelete(p.producto_id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="tp-action-icon" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <IngredientsModal
          ingredients={selectedIngredients}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MenuTable;
