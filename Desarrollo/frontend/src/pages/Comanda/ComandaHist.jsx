import React, { useState } from "react";
import Header from "../../components/HeaderUnificado";
import { FaClock, FaCheck, FaTrash, FaPlus, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ControlBar from "../../components/ControlBar";
import DatePicker from "../../components/DatePickerNormal";

export default function ComandaHistorial() {
  const navigate = useNavigate();

  // --- Estado de datos simulados ---
  const [orders, setOrders] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      status: i === 0 ? "Pendiente" : "Hecho",
      price: (Math.random() * 500 + 100).toFixed(2),
      table: Math.floor(Math.random() * 10) + 1,
      people: Math.floor(Math.random() * 5) + 1,
      date: `2025-10-${(i + 1).toString().padStart(2, "0")}`,
      checked: false,
      items: [
        { name: "Producto A", quantity: 2 },
        { name: "Producto B", quantity: 1 },
      ],
    }))
  );

  // --- Estado de filtros ---
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("Fecha");
  const [selectedDate, setSelectedDate] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);

  // --- Lógica de selección ---
  const handleCheck = (id) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === id ? { ...o, checked: !o.checked } : o
      );
      setSelectAll(updated.every((o) => o.checked));
      return updated;
    });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setOrders((prev) => prev.map((o) => ({ ...o, checked: newSelectAll })));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta comanda?")) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  const handleClearFilters = () => {
    setStatusFilter("");
    setDateFilter("Fecha");
    setSelectedDate(null);
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredOrders = orders.filter((o) => {
    const withinStatus = statusFilter === "" || o.status === statusFilter;

    const [year, month, day] = o.date.split("-");
    const orderDate = new Date(`${year}-${month}-${day}`);
    const now = new Date();
    let matchesDate = true;

    if (dateFilter === "Hoy") {
      matchesDate = orderDate.toDateString() === now.toDateString();
    } else if (dateFilter === "Esta semana") {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      matchesDate = orderDate >= start && orderDate < end;
    } else if (dateFilter === "Este mes") {
      matchesDate =
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear();
    } else if (dateFilter === "Fecha personalizada" && selectedDate) {
      matchesDate = orderDate.toDateString() === selectedDate.toDateString();
    }

    const withinMin = minPrice === "" || Number(o.price) >= Number(minPrice);
    const withinMax = maxPrice === "" || Number(o.price) <= Number(maxPrice);

    return withinStatus && matchesDate && withinMin && withinMax;
  });

  const toggleItems = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  const selectedOrders = orders.filter((o) => o.checked);
  const totalSelected = selectedOrders.reduce(
    (acc, o) => acc + Number(o.price),
    0
  );

  const filters = [
    {
      label: "Estado",
      type: "select",
      value: statusFilter,
      onChange: setStatusFilter,
      options: ["Seleccionar", "Pendiente", "Hecho"],
    },
    {
      label: "Fecha",
      type: "date",
      value: dateFilter,
      onChange: setDateFilter,
      options: [
        "Fecha",
        "Hoy",
        "Esta semana",
        "Este mes",
        "Fecha personalizada",
      ],
      customComponent:
        dateFilter === "Fecha personalizada" && (
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        ),
    },
    {
      label: "Precio mínimo",
      type: "number",
      value: minPrice,
      onChange: setMinPrice,
      placeholder: "Min",
    },
    {
      label: "Precio máximo",
      type: "number",
      value: maxPrice,
      onChange: setMaxPrice,
      placeholder: "Max",
    },
  ];

  const buttons = [
    {
      label: "Añadir",
      icon: FaPlus,
      onClick: () => navigate("/gestion/comanda"),
    },
    {
      label: "Exportar",
      icon: FaDownload,
      onClick: () => alert("⬇️ Exportando historial..."),
    },
  ];

  return (
    <div className="hs-history-container font-montserrat">
      <Header />

      <div className="hs-history-content space-y-6">
        {/* --- BARRA DE CONTROL --- */}
        <ControlBar
          searchValue={""}
          onSearchChange={() => {}}
          filters={filters}
          onClearFilters={handleClearFilters}
          buttons={buttons}
        />

        {/* --- TABLA DE COMANDAS --- */}
        <div className="hs-table-container">
          <table className="hs-history-table">
            <thead>
              <tr>
                <th className="hs-checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Estado</th>
                <th>Artículos</th>
                <th>Precio</th>
                <th>Mesa</th>
                <th>Personas</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr
                    className={
                      order.status === "Pendiente" ? "hs-selected" : ""
                    }
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={order.checked}
                        onChange={() => handleCheck(order.id)}
                      />
                    </td>
                    <td>
                      {order.status === "Pendiente" ? (
                        <FaClock className="text-yellow-400 mx-auto" />
                      ) : (
                        <FaCheck className="text-emerald-400 mx-auto" />
                      )}
                    </td>
                    <td
                      className="text-blue-700 underline cursor-pointer"
                      onClick={() => toggleItems(order.id)}
                    >
                      Ver
                    </td>
                    <td className="hs-highlight">${order.price}</td>
                    <td>{order.table}</td>
                    <td>{order.people}</td>
                    <td className="hs-fecha-column">{order.date}</td>
                    <td className="text-center">
                      <button onClick={() => handleDelete(order.id)}>
                        <FaTrash className="text-red-500 hover:text-red-600" />
                      </button>
                    </td>
                  </tr>

                  {openOrderId === order.id && (
                    <tr>
                      <td colSpan={8}>
                        <div className="hs-agregacion-details">
                          <strong>Productos en la comanda:</strong>
                          <ul className="list-disc pl-6">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} — Cantidad: {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- TOTAL SELECCIONADO --- */}
        {selectedOrders.length > 0 && (
          <div className="mt-4 bg-[#0D0F10] text-white p-4 rounded-md flex justify-between items-center shadow-lg">
            <p className="font-semibold">Total de comandas seleccionadas</p>
            <p>
              ${totalSelected.toFixed(2)} — {selectedOrders.length} comandas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
