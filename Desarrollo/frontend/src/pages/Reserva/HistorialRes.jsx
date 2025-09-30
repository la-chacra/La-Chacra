import React, { useState } from "react";

export default function HistorialRes() {
  const [filter, setFilter] = useState("Todos");

  const reservas = [
    { id: 1, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "hoy, 22:20", estado: "Pendiente" },
    { id: 2, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "ayer, 20:30", estado: "Confirmada" },
    { id: 3, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "30 ago, 20:30", estado: "Cancelada" },
  ];

  const filtered =
    filter === "Todos" ? reservas : reservas.filter((r) => r.estado === filter);

  const estadoStyle = {
    Pendiente: "text-blue-600",
    Confirmada: "text-green-600",
    Cancelada: "text-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-green-900 text-white px-6 py-3">
        <span className="font-bold text-lg">La Chacra</span>
        <div className="flex gap-4">
          <button className="hover:underline">Inventario</button>
          <button className="hover:underline">Empleados</button>
          <button className="hover:underline">Estadísticas</button>
          <button className="underline font-semibold">Reservas</button>
          <button className="hover:underline">Comanda</button>
        </div>
      </nav>

      {/* Panel principal */}
      <div className="max-w-7xl mx-auto mt-6 bg-yellow-100 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Historial de Reservas</h2>
          <button className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-2 rounded shadow hover:bg-gray-100">
            Exportar ⬇
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Todos">Estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-3 py-2 border"><input type="checkbox" /></th>
                <th className="px-3 py-2 border">Nombre</th>
                <th className="px-3 py-2 border">Correo Electrónico</th>
                <th className="px-3 py-2 border">Cantidad de Personas</th>
                <th className="px-3 py-2 border">Fecha y Hora de Reserva</th>
                <th className="px-3 py-2 border">Estado</th>
                <th className="px-3 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="bg-white hover:bg-gray-50 border-b">
                  <td className="px-3 py-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-2 border">{r.nombre}</td>
                  <td className="px-3 py-2 border">{r.correo}</td>
                  <td className="px-3 py-2 border text-center">{r.personas}</td>
                  <td className="px-3 py-2 border">{r.fecha}</td>
                  <td className={`px-3 py-2 border font-medium ${estadoStyle[r.estado]}`}>
                    {r.estado === "Pendiente" && "⏰"}
                    {r.estado === "Confirmada" && "✔"}
                    {r.estado === "Cancelada" && "❌"}
                  </td>
                  <td className="px-3 py-2 border flex gap-2">
                    <button className="text-red-500 hover:text-red-700">🗑</button>
                    <button className="text-gray-600 hover:text-gray-800">✏</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
