import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsisV,
  faPen,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 
import ControlBar from "../../components/ControlBar";
import DatePicker from "../../components/DatePickerNormal";

const GestionStock = () => {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [sortFilter, setSortFilter] = useState("Ordenar por");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Categoría");
  const [dateFilter, setDateFilter] = useState("Fecha");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const cargarStock = async () => {
      try {
        const res = await fetch("/api/stock", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.success) {
          setStock(data.data);
          setFilteredStock(data.data);
        } else {
          alert("Error al cargar stock: " + data.message);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    cargarStock();
  }, []);

 useEffect(() => {
  let result = stock.filter((item) => {
    const matchesSearch = item.nombre
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "Categoría" ||
      item.categoria?.toLowerCase() === categoryFilter.toLowerCase();

    const now = new Date();
    let matchesDate = true;

    if (item.fecha_creacion) {
      const [day, month, yearTime] = item.fecha_creacion.split("-");
      const [year, time] = yearTime.split(" ");
      const fechaItem = new Date(`${year}-${month}-${day}T${time}`);

      if (dateFilter === "Hoy") {
        matchesDate = fechaItem.toDateString() === now.toDateString();
      } else if (dateFilter === "Esta semana") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        matchesDate = fechaItem >= startOfWeek && fechaItem < endOfWeek;
      } else if (dateFilter === "Este mes") {
        matchesDate =
          fechaItem.getMonth() === now.getMonth() &&
          fechaItem.getFullYear() === now.getFullYear();
      } else if (dateFilter === "Fecha personalizada" && selectedDate) {
        matchesDate = fechaItem.toDateString() === selectedDate.toDateString();
      }
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  // Ordenamiento según filtro seleccionado
  if (sortFilter === "Precio ↓") {
    result.sort((a, b) => a.precio_unitario - b.precio_unitario);
  } else if (sortFilter === "Precio ↑") {
    result.sort((a, b) => b.precio_unitario - a.precio_unitario);
  } else if (sortFilter === "Cantidad ↓") {
    result.sort((a, b) => a.cantidad - b.cantidad);
  } else if (sortFilter === "Cantidad ↑") {
    result.sort((a, b) => b.cantidad - a.cantidad);
  } else if (sortFilter === "Unidad (A-Z)") {
    result.sort((a, b) => a.unidad.localeCompare(b.unidad));
  } else if (sortFilter === "Unidad (Z-A)") {
    result.sort((a, b) => b.unidad.localeCompare(a.unidad));
  }

  setFilteredStock(result);
}, [searchTerm, categoryFilter, dateFilter, selectedDate, stock, sortFilter]);


  const handleSelectAll = (checked) => {
    if (checked) setSelectedItems(new Set(filteredStock.map((i) => i.insumo_id)));
    else setSelectedItems(new Set());
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedItems(newSelected);
  };

  const handleAdd = () => {
    navigate("/gestion/stock/nuevo");
  };

  const handleEdit = (id) => {
    navigate(`/gestion/stock/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      const res = await fetch(`/api/stock/eliminar/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("Producto eliminado (desactivado)");
        setStock((prev) => prev.filter((p) => p.insumo_id !== id));
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Error al eliminar: " + error);
    }
  };


  const handleExport = () => {
    const ids = Array.from(selectedItems).join(",");
    const url = ids
      ? `/api/exportar-stock?ids=${ids}`
      : `/api/exportar-stock`;
    window.open(url, "_blank");
  };

  // Configuración ControlBar
  const filters = [
    {
      label: "Categoría",
      type: "select",
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: [
        "Categoría",
        "Carnes",
        "Bebidas",
        "Lácteos",
        "Secos",
        "Frutas",
        "Verduras",
        "Aderezos",
        "Condimentos",
        "Accesorios",
        "Postres",
      ],
    },
    {
  label: "Ordenar",
  type: "select",
  value: sortFilter,
  onChange: setSortFilter,
  options: [
    "Ordenar por",
    "Precio ↑",
    "Precio ↓",
    "Cantidad ↑",
    "Cantidad ↓",
    "Unidad (A-Z)",
    "Unidad (Z-A)",
  ],
},
    {
      label: "Fecha",
      type: "date",
      value: dateFilter,
      onChange: setDateFilter,
      options: ["Fecha", "Hoy", "Esta semana", "Este mes", "Fecha personalizada"],
      customComponent:
        dateFilter === "Fecha personalizada" && (
          <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        ),
    },
  ];
  

  const buttons = [
    {
      label: "Añadir producto",
      icon: faPlus,
      onClick: handleAdd,
    },
    {
      label: selectedItems.size > 0 ? "Exportar seleccionados" : "Exportar",
      icon: faDownload,
      onClick: handleExport,
    },
  ];

  if (loading) {
    return (
      <div className="hs-history-container font-overlock text-gray-200">
        <Header />
        <div className="flex justify-center items-center h-[70vh] text-gray-400">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
      </div>
    );
  }

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
                    checked={selectedItems.size === filteredStock.length}
                  />
                </th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Mínima</th>
                <th>Unidad</th>
                <th>Precio Unidad</th>
                <th>Total</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.length > 0 ? (
                      filteredStock
                        .filter((p) => p.activo) 
                        .map((p) => (
                  <tr
                    key={p.insumo_id}
                    className={selectedItems.has(p.insumo_id) ? "hs-selected" : ""}
                  >
                    <td className="hs-checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(p.insumo_id)}
                        onChange={(e) =>
                          handleSelectItem(p.insumo_id, e.target.checked)
                        }
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td className="text-center">{p.cantidad}</td>
                    <td className="text-center">{p.cantidad_minima}</td>
                    <td className="text-center">{p.unidad}</td>
                    <td className="text-center">${p.precio_unitario}</td>
                    <td className="text-center">
                      ${(p.cantidad * p.precio_unitario).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          p.activo
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {p.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="tp-actions-cell">
                      <button
                        className="tp-action-btn"
                        onClick={() =>
                          setOpenActionMenu(
                            openActionMenu === p.insumo_id ? null : p.insumo_id
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>

                      {openActionMenu === p.insumo_id && (
                        <div className="tp-action-menu">
                          <button
                            className="tp-action-item tp-edit"
                            onClick={() => handleEdit(p.insumo_id)}
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              className="tp-action-icon"
                            />
                            Editar
                          </button>
                          <button
                            className="tp-action-item tp-delete"
                            onClick={() => handleDelete(p.insumo_id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="tp-action-icon"
                            />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                    No hay productos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionStock;
