import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faDownload } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../components/DatePickerNormal";

const HistoryTable = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("Fecha");
  const [selectedDate, setSelectedDate] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    // se debe crear un endpoint tipo GET: /api/historial-stock
    // debe devolver un array de objetos con esta estructura:
    // {
    //   insumo_id,
    //   fecha,         // "dd/mm/yyyy hh:mm"
    //   nombre,        // coincide con $nombre en PHP
    //   tipo_cambio,   // "Cantidad" o "Precio" o "Nombre" o "Categoria" o "Agregación de producto" o "Eliminación de producto"
    //   cambio: {
    //     cantidad?: { nuevo, anterior, diferencia },
    //     precio?: { nuevo, anterior, diferencia },
    //     nombre?: { nuevo, anterior },
    //     categoria?: { nueva, anterior },
    //     agregacion?: { cantidad, precio },
    //     eliminacion?: { cantidadAnterior }
    //   },
    //   usuario,       // nombre del usuario que hizo el cambio
    //   motivo         // razón del cambio
    // }
    fetch("/api/historial-stock")
      .then((res) => res.json())
      .then((data) => setHistoryData(data))
      .catch(() => {
        // mock para pruebas
        setHistoryData([
          {
            insumo_id: 1,
            fecha: "20/09/2025 13:24",
            nombre: "Asado Vacío",
            tipo_cambio: "Cantidad",
            cambio: { cantidad: { nuevo: 60, anterior: 40, diferencia: "+20" } },
            usuario: "Roberto Juan",
            motivo: "Compra proveedor",
          },
          {
            insumo_id: 2,
            fecha: "16/09/2025 14:35",
            nombre: "Asado Vacío",
            tipo_cambio: "Precio",
            cambio: { precio: { nuevo: 280, anterior: 250, diferencia: "+30" } },
            usuario: "Roberto Juan",
            motivo: "Aumento de costos",
          },
          {
            insumo_id: 3,
            fecha: "16/09/2025 14:34",
            nombre: "Asado Vacío",
            tipo_cambio: "Nombre",
            cambio: { nombre: { anterior: "Asado Tira", nuevo: "Asado Vacío" } },
            usuario: "Roberto Juan",
            motivo: "Reemplazamiento",
          },
          {
            insumo_id: 4,
            fecha: "16/09/2025 14:33",
            nombre: "Asado Tira",
            tipo_cambio: "Agregación de producto",
            cambio: { agregacion: { cantidad: 40, precio: 250 } },
            usuario: "Roberto Juan",
            motivo: "",
          },
          {
            insumo_id: 5,
            fecha: "16/09/2025 14:32",
            nombre: "Asado Tira",
            tipo_cambio: "Eliminación de producto",
            cambio: { eliminacion: { cantidadAnterior: 40 } },
            usuario: "Roberto Juan",
            motivo: "",
          },
        ]);
      });
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedItems(new Set(historyData.map((item) => item.insumo_id)));
    else setSelectedItems(new Set());
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedItems(newSelected);
  };

  const renderCambio = (item) => {
    const { tipo_cambio, cambio } = item;
    switch (tipo_cambio) {
      case "Cantidad":
        const diff = cambio.cantidad.diferencia;
        const isPositive = diff.startsWith("+");
        return (
          <div>
            {cambio.cantidad.nuevo}{" "}
            <span className={isPositive ? "hs-positive" : "hs-negative"}>
              ({diff})
            </span>
          </div>
        );
      case "Precio":
        const priceDiff = cambio.precio.diferencia;
        const isPricePositive = priceDiff.startsWith("+");
        return (
          <div>
            ${cambio.precio.nuevo}{" "}
            <span className={isPricePositive ? "hs-positive" : "hs-negative"}>
              ({priceDiff})
            </span>
          </div>
        );
      case "Nombre":
        return (
          <div>
            {cambio.nombre.anterior} → {" "}
            <span className="hs-highlight">{cambio.nombre.nuevo}</span>
          </div>
        );
      case "Categoria":
      return (
        <div>
          {cambio.categoria.anterior} →{" "}
          <span className="hs-highlight">{cambio.categoria.nueva}</span>
        </div>
      );
      case "Agregación de producto":
        return (
          <div className="hs-agregacion-details">
            <div><strong>Cantidad:</strong> {cambio.agregacion.cantidad}</div>
            <div><strong>Precio:</strong> ${cambio.agregacion.precio}</div>
          </div>
        );
      case "Eliminación de producto":
        return (
          <div>
            0 <span className="hs-negative">(-{cambio.eliminacion.cantidadAnterior})</span>
          </div>
        );
      default:
        return <div>-</div>;
    }
  };

  // aplicar filtros de búsqueda y fecha
  const filteredData = historyData.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.motivo && item.motivo.toLowerCase().includes(searchTerm.toLowerCase()));

    const [day, month, yearTime] = item.fecha.split("/");
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

    return matchesSearch && matchesDate;
  });

  const handleExport = () => {
    // crear endpoint GET /api/exportar-historial
    // debe generar CSV o Excel, usando los IDs seleccionados si se pasan
    // ejemplo: /api/exportar-historial?ids=1,2,3
    window.open("/api/exportar-historial", "_blank");
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
              onClick={() => setShowDateFilter((prev) => !prev)}
            >
              <span>Filtrar</span>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>

          <div className={`hs-date-filter-wrapper ${showDateFilter ? "visible" : ""}`}>
            <div className="hs-date-filter">
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
                    checked={selectedItems.size === historyData.length}
                  />
                </th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Tipo de Cambio</th>
                <th>Cambio</th>
                <th>Usuario</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.insumo_id}
                  className={selectedItems.has(item.insumo_id) ? "hs-selected" : ""}
                >
                  <td className="hs-checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.insumo_id)}
                      onChange={(e) => handleSelectItem(item.insumo_id, e.target.checked)}
                    />
                  </td>
                  <td className="hs-fecha-column">{item.fecha}</td>
                  <td>{item.nombre}</td>
                  <td>{item.tipo_cambio}</td>
                  <td className="hs-cambio-column">{renderCambio(item)}</td>
                  <td>{item.usuario}</td>
                  <td>{item.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
