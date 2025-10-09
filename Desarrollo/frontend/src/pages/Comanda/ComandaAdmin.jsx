import React, { useState } from "react";
import AdminHeader from "../../components/HeaderAdmin";
import { FaClock, FaCheck, FaTrash, FaPlus, FaDownload, FaSearch } from "react-icons/fa";

export default function ComandaPage() {
  const [orders, setOrders] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      status: i === 0 ? "Pendiente" : "Hecho",
      price: (Math.random() * 500 + 100).toFixed(2),
      table: Math.floor(Math.random() * 10) + 1,
      date: "Hoy, 15:0" + i,
      checked: false,
      items: [
        { name: "Producto A", quantity: 2 },
        { name: "Producto B", quantity: 1 },
      ],
    }))
  );

  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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

  const filteredOrders = orders.filter(
    (o) =>
      (o.table.toString().includes(searchTerm) ||
        o.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || o.status === statusFilter)
  );

  const toggleItems = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  return (
    <div className="om-order-management font-overlock">
      <AdminHeader />

      <div className="om-content">
        {/* Barra de búsqueda y botones */}
        {/* Filtro por fecha y precio, agregar tabla para cantidad de personas */}
        <div className="om-header-actions mb-6 flex flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="om-search-input pl-10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="om-status-dropdown"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Hecho">Hecho</option>
            </select>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => alert("🆕 Añadir nuevo pedido...")}
              className="om-export-button flex items-center gap-2"
            >
              Añadir <FaPlus />
            </button>
            <button
              onClick={() => alert("⬇️ Exportando pedidos a CSV...")}
              className="om-export-button flex items-center gap-2"
            >
              Exportar <FaDownload />
            </button>
          </div>
        </div>

        {/* Tabla de pedidos */}
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
                        <FaClock className="om-status-icon om-blue mx-auto" />
                      ) : (
                        <FaCheck className="om-status-icon om-green mx-auto" />
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
                      <td colSpan={7} className="px-3 py-2 text-left">
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
