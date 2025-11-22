import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUndo } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../components/DatePickerNormal";
import ControlBar from "../../components/ControlBar";

const HistoryTable = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("Fecha");
  const [selectedDate, setSelectedDate] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Cargar historial
  useEffect(() => {
    fetch("/api/gestion/historial")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHistoryData(data.data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // Alternar expandido
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // PrettyObject con diferencias
  const renderPrettyObject = (obj, compareObj) => {
    if (!obj) return <div className="hs-empty">—</div>;

    return (
      <div className="hs-pretty">
        {Object.entries(obj).map(([key, value]) => {
          const changed = compareObj && value !== compareObj[key];

          return (
            <div key={key} className={`hs-pretty-item ${changed ? "hs-changed" : ""}`}>
              <span className="hs-pretty-key">{key}</span>
              <span className="hs-pretty-value">{String(value)}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Seleccionar todos
  const handleSelectAll = (checked) => {
    if (checked) setSelectedItems(new Set(historyData.map((i) => i.log_id)));
    else setSelectedItems(new Set());
  };

  // Seleccionar uno
  const handleSelectItem = (id, checked) => {
    const newSel = new Set(selectedItems);
    checked ? newSel.add(id) : newSel.delete(id);
    setSelectedItems(newSel);
    setExpandedId(null);
  };

  // Exportar
  const handleExport = () => {
    window.open(`/api/gestion/exportar-historial?ids=${[...selectedItems].join(",")}`);
  };

  // Restaurar cambio
  const handleRestore = async (item) => {
    const confirm = window.confirm(
      "¿Seguro que deseas recuperar este registro? Se revertirán los valores."
    );
    if (!confirm) return;

    const res = await fetch("/api/gestion/restaurar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ log_id: item.log_id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Registro restaurado correctamente");
      window.location.reload();
    } else {
      alert("Error al restaurar: " + data.message);
    }
  };

  // Filtros
  const filteredData = historyData.filter((item) => {
    const text = (item.detalle + item.usuario + item.categoria + item.tipo_cambio).toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());

    const [day, month, yearTime] = item.fecha.split("/");
    const [year, time] = yearTime.split(" ");
    const fechaItem = new Date(`${year}-${month}-${day}T${time}`);
    const now = new Date();

    let matchesDate = true;

    switch (dateFilter) {
      case "Hoy":
        matchesDate = fechaItem.toDateString() === now.toDateString();
        break;
      case "Esta semana": {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        matchesDate = fechaItem >= start && fechaItem < end;
        break;
      }
      case "Este mes":
        matchesDate =
          fechaItem.getMonth() === now.getMonth() &&
          fechaItem.getFullYear() === now.getFullYear();
        break;
      case "Fecha personalizada":
        if (selectedDate) {
          matchesDate = fechaItem.toDateString() === selectedDate.toDateString();
        }
        break;
    }

    return matchesSearch && matchesDate;
  });

  // Configuración ControlBar
  const filters = [
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
      label: selectedItems.size > 0 ? "Exportar seleccionados" : "Exportar",
      icon: faDownload,
      onClick: handleExport,
    },
  ];

  // Render
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
                    checked={selectedItems.size === historyData.length}
                  />
                </th>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Tipo de Cambio</th>
                <th>Cambio</th>
                <th>Usuario</th>
                <th>Detalle</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <React.Fragment key={item.log_id}>
                  <tr className={selectedItems.has(item.log_id) ? "hs-selected" : ""}>
                    <td className="hs-checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.log_id)}
                        onChange={(e) => handleSelectItem(item.log_id, e.target.checked)}
                      />
                    </td>
                    <td>{item.fecha}</td>
                    <td>{item.categoria}</td>
                    <td>{item.tipo_cambio}</td>

                    {/* BOTÓN VER */}
                    <td className="hs-cambio-column">
                      <button className="hs-view-btn" onClick={() => toggleExpand(item.log_id)}>
                        Ver
                      </button>
                    </td>

                    <td>{item.usuario}</td>
                    <td>{item.detalle}</td>

                    <td>
                      {item.tipo_cambio !== "AGREGAR" && (
                        <button onClick={() => handleRestore(item)} className="hs-restore-btn">
                          <FontAwesomeIcon icon={faUndo} /> Recuperar
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Fila expandida */}
                  {expandedId === item.log_id && (
                    <tr className="hs-expanded-row">
                      <td colSpan="8">
                        <div className="hs-expand-box">
                          <div className="hs-expand-column">
                            <h4>Antes</h4>
                            {renderPrettyObject(item.valor_antes, item.valor_despues)}
                          </div>

                          <div className="hs-expand-column">
                            <h4>Después</h4>
                            {renderPrettyObject(item.valor_despues, item.valor_antes)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;