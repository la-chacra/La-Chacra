import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faDownload,
  faEllipsisV,
  faPen,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../components/DatePickerNormal";

const EmployeesTable = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Rol");
  const [dateFilter, setDateFilter] = useState("Fecha");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // se debe crear un endpoint tipo GET: /api/usuarios
    // este endpoint debe devolver un array de usuarios con esta estructura
    // [
    //   {
    //     usuario_id: number,
    //     nombre_completo: string,
    //     correo: string,
    //     rol: "Administrador" | "Empleado",
    //     fecha_creacion: "dd/mm/yyyy hh:mm"
    //   },
    //   ...
    // ]
    //
    // este endpoint puede consultar la base de datos "usuarios" y devolver todos
    // el frontend se encarga de filtrar por nombre, correo, rol o fecha.
    fetch("/api/empleado/obtener")
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setEmployeeData(response.data);
        } else {
          setEmployeeData([]);
          alert("Error," + response.message)
        }
      })
      .catch(() => {
        setEmployeeData([]);
        alert("Ocurrió un error desconocido.")
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
    // crear endpoint tipo GET: /api/exportar-usuarios
    // sste endpoint debe generar un archivo (CSV o Excel) con los usuarios seleccionados
    // si se pasan IDs, ejemplo: /api/exportar-usuarios?ids=1,2,3
    // entonces debe exportar solo esos. si no, exportar todos los usuarios
    //
    // el frontend simplemente abre ese archivo en una nueva pestaña
    const ids = Array.from(selectedItems).join(",");
    const url = ids ? `/api/exportar-usuarios?ids=${ids}` : `/api/exportar-usuarios`;
    window.open(url, "_blank");
  };

  const handleAddEmployee = () => {
    navigate("/gestion/empleado");
  };

  const handleEdit = (id) => {
    // al navegar a /gestion/empleado/:id
    // el formulario de edición debe hacer:
    //   - GET /api/usuarios/:id → obtener los datos del usuario
    //   - PUT /api/usuarios/:id → actualizar nombre, correo, rol, etc.
    navigate(`/gestion/empleado/${id}`);
  };

  const handleDelete = (id) => {
    // crear endpoint tipo DELETE: /api/usuarios/:id
    // este endpoint debe eliminar el usuario con ese ID de la base de datos.
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      setEmployeeData(employeeData.filter((e) => e.usuario_id !== id));
      setOpenActionMenu(null);
    }
  };

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
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <span>Filtrar</span>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>

          <div className={`hs-date-filter-wrapper ${showFilters ? "visible" : ""}`}>
            <div className="et-filters-container">
              <div className="et-filter-group">
                <label>Rol:</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="hs-date-select"
                >
                  <option value="Rol">Rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                </select>
              </div>

              <div className="et-filter-group">
                <label>Fecha de adición:</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="hs-date-select"
                >
                  <option value="Fecha">Fecha</option>
                  <option value="Hoy">Hoy</option>
                  <option value="Esta semana">Esta semana</option>
                  <option value="Este mes">Este mes</option>
                  <option value="Fecha personalizada">Fecha personalizada</option>
                </select>

                {dateFilter === "Fecha personalizada" && (
                  <div className="hs-date-picker-container">
                    <DatePicker
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="hs-export-btn" onClick={handleAddEmployee}>
            <span>Añadir Usuario</span>
            <FontAwesomeIcon icon={faUserPlus} />
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
                      checked={selectedItems.size === (Array.isArray(employeeData) ? employeeData.length : 0)}
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
