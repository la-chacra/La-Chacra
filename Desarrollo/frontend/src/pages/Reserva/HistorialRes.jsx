import React, { useState } from "react";

export default function HistorialRes() {
  const [filter, setFilter] = useState("Todos");

  const reservas = [
    { id: 1, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "28 set, 22:20", estado: "Pendiente" },
    { id: 2, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "18 set, 20:30", estado: "Confirmada" },
    { id: 3, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "30 ago, 20:30", estado: "Cancelada" },
  ];

  const filtered = filter === "Todos" ? reservas : reservas.filter((r) => r.estado === filter);

  const estadoStyle = {
    Pendiente: "text-blue-600",
    Confirmada: "text-green-600",
    Cancelada: "text-red-600",
  };

  // 👇 ahora el return sí está dentro de la función
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar superior */}
      <nav className="flex items-center justify-between bg-green-900 text-white p-4 rounded-md">
        <span className="font-bold text-lg">La Chacra</span>
        <div className="flex gap-4">
          <button>Inventario</button>
          <button>Empleados</button>
          <button>Estadísticas</button>
          <button className="font-semibold underline">Reservas</button>
          <button>Comanda</button>
        </div>
      </nav>

      {/* Panel principal */}
      <div className="max-w-6xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Historial de Reservas</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Exportar ⬇
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar"
            className="w-1/3 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2"><input type="checkbox" /></th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo Electrónico</th>
                <th className="px-4 py-2">Cantidad de Personas</th>
                <th className="px-4 py-2">Fecha y Hora</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2"><input type="checkbox" /></td>
                  <td className="px-4 py-2">{r.nombre}</td>
                  <td className="px-4 py-2">{r.correo}</td>
                  <td className="px-4 py-2">{r.personas}</td>
                  <td className="px-4 py-2">{r.fecha}</td>
                  <td className={`px-4 py-2 font-medium ${estadoStyle[r.estado]}`}>
                    {r.estado === "Pendiente" && "⏰ Pendiente"}
                    {r.estado === "Confirmada" && "✔ Confirmada"}
                    {r.estado === "Cancelada" && "❌ Cancelada"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
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
