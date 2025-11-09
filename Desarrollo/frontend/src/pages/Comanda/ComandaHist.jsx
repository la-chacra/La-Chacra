import React, { useState } from "react";
import Header from "../../components/HeaderUnificado";
import { FaClock, FaCheck, FaTrash, FaPlus, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ComandaHistorial() {
  const navigate = useNavigate();
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

  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);

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

  const selectedOrders = orders.filter((o) => o.checked);
  const totalSelected = selectedOrders.reduce(
    (acc, o) => acc + Number(o.price),
    0
  );

  const filteredOrders = orders.filter((o) => {
    const withinStatus = statusFilter === "" || o.status === statusFilter;
    const withinDate = dateFilter === "" || o.date === dateFilter;
    const withinMin = minPrice === "" || Number(o.price) >= Number(minPrice);
    const withinMax = maxPrice === "" || Number(o.price) <= Number(maxPrice);
    return withinStatus && withinDate && withinMin && withinMax;
  });

  const toggleItems = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  return (
    <div className="hs-history-container font-monstserrat">
      <Header />

      <div className="hs-history-content space-y-6">
        {/* --- FILTROS --- */}
        <div className="hs-filters-bar">
          <div className="hs-filters-left">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white text-black px-3 py-2 rounded-md text-sm focus:outline-none"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Hecho">Hecho</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white text-black px-3 py-2 rounded-md text-sm focus:outline-none w-32"
            />

            <input
              type="number"
              placeholder="Precio mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-white text-black px-3 py-2 rounded-md text-sm focus:outline-none w-32"
            />

            <input
              type="number"
              placeholder="Precio máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-white text-black px-3 py-2 rounded-md text-sm focus:outline-none w-32"
            />
          </div>

          <div className="hs-filters-right">
            <button
              onClick={() => {
                setStatusFilter("");
                setDateFilter("");
                setMinPrice("");
                setMaxPrice("");
              }}
              className="hs-export-btn"
              style={{
                background: "#E6E6F1",
                color: "#29292b",
              }}
            >
              Limpiar filtros
            </button>
            <button
              onClick={() => navigate("/gestion/comanda")}
              className="hs-export-btn bg-white hover:bg-gray-100"
            >
              <FaPlus /> Añadir
            </button>
            <button
              onClick={() => alert("⬇️ Exportando historial...")}
              className="hs-export-btn bg-white hover:bg-gray-100"
            >
              <FaDownload /> Exportar
            </button>
          </div>
        </div>

        {/* --- TABLA --- */}
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

        {/* --- Total seleccionado --- */}
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
