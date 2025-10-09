import React, { useState } from "react";
import AdminHeader from "../../components/HeaderAdmin";
import {
  FaFilter,
  FaSearch,
  FaPlus,
  FaDownload,
  FaClock,
  FaCheck,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

export default function ComandaPage() {
  const [orders, setOrders] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      status: i === 0 ? "Pendiente" : "Hecho",
      price: (Math.random() * 500 + 100).toFixed(2),
      table: Math.floor(Math.random() * 10) + 1,
      date: "Hoy, 15:0" + i,
      checked: false,
    }))
  );

  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Checkbox individual
  const handleCheck = (id) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === id ? { ...o, checked: !o.checked } : o
      );

      const allSelected = updated.every((o) => o.checked);
      setSelectAll(allSelected);
      return updated;
    });
  };

  // ✅ Checkbox general
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setOrders((prev) => prev.map((o) => ({ ...o, checked: newSelectAll })));
  };

  // ✅ Buscar pedido
  const filteredOrders = orders.filter((o) =>
    o.table.toString().includes(searchTerm) ||
    o.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Botones de acción
  const handleFilter = () => alert("🔍 Filtro avanzado en construcción...");
  const handleExport = () => alert("⬇️ Exportando pedidos a CSV...");
  const handleAdd = () => alert("🆕 Añadir nuevo pedido...");

  // ✅ Calcular totales de los pedidos seleccionados
  const selectedOrders = orders.filter((o) => o.checked);
  const totalSelected = selectedOrders.reduce(
    (acc, o) => acc + Number(o.price),
    0
  );
  const allSelected = orders.length > 0 && selectedOrders.length === orders.length;

  return (
    <div className="min-h-screen bg-yellow-50">
      <AdminHeader />

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* 🔎 Barra de búsqueda */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-md shadow">
          <div className="flex items-center gap-2 w-full md:w-1/2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
            >
              Filtrar <FaFilter />
            </button>
          </div>

          <div className="flex gap-3 mt-3 md:mt-0">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 shadow"
            >
              Añadir Pedido <FaPlus />
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow"
            >
              Exportar <FaDownload />
            </button>
          </div>
        </div>

        {/* 📋 Tabla de pedidos */}
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
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`${
                    order.status === "Pendiente"
                      ? "bg-emerald-50"
                      : "bg-white"
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
                      <FaClock className="text-blue-600 mx-auto" />
                    ) : (
                      <FaCheck className="text-green-600 mx-auto" />
                    )}
                  </td>
                  <td className="px-3 py-2 text-blue-700 underline cursor-pointer">
                    Ver
                  </td>
                  <td className="px-3 py-2">${order.price}</td>
                  <td className="px-3 py-2">{order.table}</td>
                  <td className="px-3 py-2">{order.date}</td>
                  <td className="px-3 py-2 flex justify-center gap-3">
                    <button>
                      <FaTrash className="text-red-500 hover:text-red-600" />
                    </button>
                    <button>
                      <FaEdit className="text-gray-700 hover:text-gray-900" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🧮 Footer (solo si todos los pedidos están seleccionados) */}
        {allSelected && (
          <div className="bg-gray-800 text-white p-4 rounded-md flex justify-between items-center animate-fadeIn">
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
