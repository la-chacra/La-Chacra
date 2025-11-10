import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlus,
  faEllipsisV,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import IngredientsModal from "../../components/IngredientsModal";
import ControlBar from "../../components/ControlBar";

const MenuTable = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [menuData, setMenuData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState(null);
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
    Categoría: "#868E96",
    Todos: "#495057",
  };

  useEffect(() => {
    fetch("/api/productos-menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuData(data);
        } else if (data.success && Array.isArray(data.data)) {
          setMenuData(data.data);
        } else {
          console.error("Formato inesperado de respuesta:", data);
        }
      })
      .catch((err) => {
        console.error("Error al cargar los platos:", err);
        alert("No se pudieron cargar los productos del menú");
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

  const handleDelete = async (producto_id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        const res = await fetch(`/api/productos-menu/desactivar/${producto_id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.success) {
          setMenuData(menuData.filter((item) => item.producto_id !== producto_id));
          alert("Plato desactivado correctamente");
        } else {
          alert("Error al desactivar: " + data.message);
        }
      } catch {
        alert("Error de conexión con el servidor");
      }
    }
  };

  const handleExport = () => {
    const ids = Array.from(selectedItems).join(",");
    const url = ids
      ? `/api/exportar-productos?ids=${ids}`
      : `/api/exportar-productos`;
    window.open(url, "_blank");
  };

  const handleAddProduct = () => {
    navigate("/gestion/plato");
  };

  const handleEdit = (id) => {
    navigate(`/gestion/plato/${id}`);
  };

  const handleViewIngredients = (ingredientes) => {
    const modalData = {
      agregados: ingredientes,
      removidos: [],
    };
    setSelectedIngredients(modalData);
    setShowModal(true);
  };

  const filteredData = menuData.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(p.ingredientes) &&
        p.ingredientes.some((ing) => 
          ing.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        ));

    const matchesCategory =
      categoryFilter === "Todos" ||
      categoryFilter === "Categoría" ||
      p.categoria === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const filters = [
    {
      label: "Categoría",
      type: "select",
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: allCategories,
    },
  ];

  const buttons = [
    {
      label: "Añadir producto",
      icon: faPlus,
      onClick: handleAddProduct,
    },
    {
      label: selectedItems.size > 0 ? "Exportar seleccionados" : "Exportar",
      icon: faDownload,
      onClick: handleExport,
    },
  ];

  return (
    <div className="hs-history-container font-montserrat">
      <Header />

      <div className="hs-history-content">
        <ControlBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          buttons={buttons}
        />

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
