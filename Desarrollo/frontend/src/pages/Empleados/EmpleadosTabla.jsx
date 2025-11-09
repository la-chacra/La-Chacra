import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderUnificado";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsisV,
  faPen,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../components/DatePickerNormal";
import ControlBar from "../../components/ControlBar";

const EmployeesTable = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Rol");
  const [dateFilter, setDateFilter] = useState("Fecha");
  const [selectedDate, setSelectedDate] = useState(null);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/empleado/obtener")
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setEmployeeData(response.data);
        } else {
          setEmployeeData([]);
          alert("Error," + response.message);
        }
      })
      .catch(() => {
        setEmployeeData([]);
        alert("Ocurrió un error desconocido.");
      });
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedItems(new Set(employeeData.map((e) => e.usuario_id)));
    else setSelectedItems(new Set());
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedItems(newSelected);
  };

  const handleExport = () => {
    const ids = Array.from(selectedItems).join(",");
    const url = ids ? `/api/exportar-usuarios?ids=${ids}` : `/api/exportar-usuarios`;
    window.open(url, "_blank");
  };

  const handleAddEmployee = () => {
    navigate("/gestion/empleado");
  };

  const handleEdit = (id) => {
    navigate(`/gestion/empleado/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      const res = await fetch(`/api/empleado/desactivar/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setEmployeeData(employeeData.filter((e) => e.usuario_id !== id));
        setOpenActionMenu(null);
        alert("Empleado desactivado correctamente");
      } else {
        alert("Error: " + data.message);
      }
    } catch (e) {
      alert("Error de conexión con el servidor");
    }
  };

  // Configuración para ControlBar
  const filters = [
    {
      label: "Rol",
      type: "select",
      value: roleFilter,
      onChange: setRoleFilter,
      options: ["Rol", "Administrador", "Empleado"],
    },
    {
      label: "Fecha de adición",
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
      label: "Añadir Usuario",
      icon: faUserPlus,
      onClick: handleAddEmployee,
    },
    {
      label: selectedItems.size > 0 ? "Exportar seleccionados" : "Exportar",
      icon: faDownload,
      onClick: handleExport,
    },
  ];

  const safeEmployeeData = Array.isArray(employeeData) ? employeeData : [];

  const filteredData = safeEmployeeData.filter((e) => {
    const matchesSearch =
      e.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.rol.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "Rol" || e.rol.toLowerCase() === roleFilter.toLowerCase();

    const [day, month, yearTime] = e.fecha_creacion.split("-");
    const [year, time] = yearTime.split(" ");
    const fechaItem = new Date(`${year}-${month}-${day}T${time}`);
    const now = new Date();
    let matchesDate = true;

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

    return matchesSearch && matchesRole && matchesDate;
  });

  return (
    <div className="hs-history-container font-montserrat">
      <Header />

      <div className="hs-history-content">
        {/* ✅ Reemplazo visual: ControlBar */}
        <ControlBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          buttons={buttons}
        />

        {/* 🔽 Tabla original sin cambios */}
        <div className="hs-table-container">
          <table className="hs-history-table">
            <thead>
              <tr>
                <th className="hs-checkbox-column">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedItems.size ===
                      (Array.isArray(employeeData) ? employeeData.length : 0)
                    }
                  />
                </th>
                <th>Nombre completo</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Fecha de adición</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((e) => (
                <tr
                  key={e.usuario_id}
                  className={selectedItems.has(e.usuario_id) ? "hs-selected" : ""}
                >
                  <td className="hs-checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(e.usuario_id)}
                      onChange={(ev) =>
                        handleSelectItem(e.usuario_id, ev.target.checked)
                      }
                    />
                  </td>
                  <td>{e.nombre_completo}</td>
                  <td>{e.correo}</td>
                  <td>
                    <span
                      className={`et-role-badge ${
                        e.rol === "Administrador" ? "admin" : "empleado"
                      }`}
                    >
                      {e.rol}
                    </span>
                  </td>
                  <td>{e.fecha_creacion}</td>
                  <td className="tp-actions-cell">
                    <button
                      className="tp-action-btn"
                      onClick={() =>
                        setOpenActionMenu(
                          openActionMenu === e.usuario_id ? null : e.usuario_id
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>

                    {openActionMenu === e.usuario_id && (
                      <div className="tp-action-menu">
                        <button
                          className="tp-action-item tp-edit"
                          onClick={() => handleEdit(e.usuario_id)}
                        >
                          <FontAwesomeIcon icon={faPen} className="tp-action-icon" />
                          Editar
                        </button>
                        <button
                          className="tp-action-item tp-delete"
                          onClick={() => handleDelete(e.usuario_id)}
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
    </div>
  );
};

export default EmployeesTable;
