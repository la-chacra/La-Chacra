import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import AdminHeader from "../../../components/HeaderAdmin";

export default function HistorialRes() {
  const [filter, setFilter] = useState("Todos");

  const reservas = [
    { id: 1, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "hoy, 22:20", estado: "Pendiente" },
    { id: 2, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "hoy, 20:30", estado: "Advertencia" },
    { id: 3, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "ayer, 20:30", estado: "Confirmada" },
    { id: 4, nombre: "Roberto Juan", correo: "robertojuan@gmail.com", personas: 4, fecha: "30 ago, 20:30", estado: "Cancelada" },
  ];

  const filtered =
    filter === "Todos" ? reservas : reservas.filter((r) => r.estado === filter);

  const estadoIcon = {
    Pendiente: (
      <div className="flex justify-center">
        <span className="rounded-full bg-blue-100 px-2 py-1">⏰</span>
      </div>
    ),
    Confirmada: (
      <div className="flex justify-center">
        <span className="rounded-full bg-green-100 px-2 py-1">✔️</span>
      </div>
    ),
    Cancelada: (
      <div className="flex justify-center">
        <span className="rounded-full bg-red-100 px-2 py-1">❌</span>
      </div>
    ),
    Advertencia: (
      <div className="flex justify-center">
        <span className="rounded-full bg-yellow-100 px-2 py-1">❗</span>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-yellow-100">
      <AdminHeader />

      {/* Panel principal */}
      <div className="max-w-7xl mx-auto mt-6 p-6">
        {/* Header con Exportar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-xl font-bold text-gray-800">Historial de Reservas</h2>
          <button className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-2 rounded shadow hover:bg-gray-100">
            ⬇️ Exportar
          </button>
        </div>

        {/* Filtros */}
<div className="flex flex-col sm:flex-row gap-3 mb-4">
  {/* Input de búsqueda con botón */}
  <div className="flex flex-1">
    <input
      type="text"
      placeholder="Ingrese Nombre o Correo"
      className="flex-1 border border-gray-300 rounded-l px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300 h-11"
    />
    <button className="px-4 bg-black text-white font-semibold rounded-r hover:bg-green-700 transition-colors duration-200 h-11">
      Buscar
    </button>
  </div>

  {/* Botón Filtrar */}
  <button className="flex items-center gap-1 border border-gray-300 rounded px-3 py-2 bg-white hover:bg-gray-100 h-11">
    ⚙️ Filtrar
  </button>

  {/* Select Estado */}
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300 h-11"
  >
    <option value="Todos">Estado</option>
    <option value="Pendiente">Pendiente</option>
    <option value="Advertencia">Advertencia</option>
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
                  <td className="px-3 py-2 border text-center">
                    {estadoIcon[r.estado]}
                  </td>
                  <td className="px-3 py-2 border">
                    <div className="flex justify-center gap-3">
                      <button className="text-red-500 hover:text-red-700">🗑</button>
                      <button className="text-gray-600 hover:text-gray-800">✏</button>
                    </div>
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
