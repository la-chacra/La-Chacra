import React, { useState } from "react";
import AdminHeader from "../../components/HeaderAdmin";
import { FaClock, FaCheck, FaTrash, FaPlus, FaDownload } from "react-icons/fa";

export default function ComandaPage() {
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
    if (window.confirm("¿Seguro que quieres eliminar este pedido?")) {
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
    <div className="om-order-management font-overlock bg-yellow-50 min-h-screen">
      <AdminHeader />

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* FILTROS + BOTONES (alineados en una sola fila) */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-4 flex flex-wrap justify-between items-center gap-3">
          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Hecho">Hecho</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <input
              type="number"
              placeholder="Precio mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-36 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <input
              type="number"
              placeholder="Precio máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-36 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("🆕 Añadir nuevo pedido...")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow"
            >
              Añadir <FaPlus />
            </button>
            <button
              onClick={() => alert("⬇️ Exportando pedidos...")}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow"
            >
              Exportar <FaDownload />
            </button>
          </div>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="accent-emerald-500"
                  />
                </th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Artículos</th>
                <th className="px-3 py-2">Precio</th>
                <th className="px-3 py-2">Mesa</th>
                <th className="px-3 py-2">Personas</th>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr
                    className={`${
                      order.status === "Pendiente" ? "bg-emerald-50" : "bg-white"
                    } border-b hover:bg-gray-50 transition`}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={order.checked}
                        onChange={() => handleCheck(order.id)}
                        className="accent-emerald-500"
                      />
                    </td>
                    <td className="px-3 py-2">
                      {order.status === "Pendiente" ? (
                        <FaClock className="text-yellow-500 mx-auto" />
                      ) : (
                        <FaCheck className="text-green-600 mx-auto" />
                      )}
                    </td>
                    <td
                      className="px-3 py-2 text-blue-700 underline cursor-pointer"
                      onClick={() => toggleItems(order.id)}
                    >
                      Ver
                    </td>
                    <td className="px-3 py-2">${order.price}</td>
                    <td className="px-3 py-2">{order.table}</td>
                    <td className="px-3 py-2">{order.people}</td>
                    <td className="px-3 py-2">{order.date}</td>
                    <td className="px-3 py-2 flex justify-center gap-3">
                      <button onClick={() => handleDelete(order.id)}>
                        <FaTrash className="text-red-500 hover:text-red-600" />
                      </button>
                    </td>
                  </tr>

                  {/* Mostrar artículos */}
                  {openOrderId === order.id && (
                    <tr className="bg-gray-100">
                      <td colSpan={8} className="px-3 py-2 text-left">
                        <ul className="list-disc pl-6">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.name} - Cantidad: {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        {selectedOrders.length > 0 && (
          <div className="bg-gray-800 text-white p-4 rounded-md flex justify-between items-center animate-fadeIn mt-4">
            <p className="font-semibold">Total en pedidos seleccionados</p>
            <p className="text-sm opacity-90">
              ${totalSelected.toFixed(2)} de {selectedOrders.length} pedidos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
 