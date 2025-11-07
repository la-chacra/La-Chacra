import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/HeaderUnificado";
import logo from "../../../assets/logo2.png";

export default function HistorialRes() {
  const [reservas, setReservas] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchReservas = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reservas/obtener", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setReservas(data.data || []);
      } else {
        console.warn("No se pudieron obtener las reservas:", data.message);
      }
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchReservas();
}, []);


const desactivarReserva = async (reserva_id) => {
  if (!window.confirm("¿Seguro que deseas desactivar esta reserva?")) return;

  try {
    const res = await fetch(`/api/reservas/desactivar/${reserva_id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      setReservas((prev) => prev.filter((r) => r.reserva_id !== reserva_id));
    }
  } catch (error) {
    console.error("Error al desactivar reserva:", error);
  }
};


  

  const estadoColor = {
    Pendiente: "text-blue-400",
    Confirmada: "text-green-400",
    Cancelada: "text-red-400",
    Advertencia: "text-yellow-400",
  };

  const filtered = reservas.filter((r) => {
    const matchEstado = filter === "Todos" || r.estado === filter;
    const matchBusqueda =
      r.nombre_completo?.toLowerCase().includes(search.toLowerCase()) ||
      r.correo_electronico?.toLowerCase().includes(search.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-gray-200 font-sans">
      <AdminHeader />

      <div className="max-w-7xl mx-auto mt-10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="La Chacra" className="w-10 h-10" />
            <h1 className="text-3xl font-semibold text-white tracking-wide">
              Historial de Reservas
            </h1>
          </div>
          <button className="bg-[#1e1e1e] border border-gray-700 px-5 py-2 rounded-lg hover:bg-[#2a2a2a] transition flex items-center gap-2">
            <span className="text-gray-300">Exportar</span>
            <span className="text-gray-500 text-lg">↓</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o correo..."
              className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-l-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="px-5 bg-green-700 text-white font-semibold rounded-r-lg hover:bg-green-800 transition">
              Buscar
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-[#111111] rounded-xl border border-gray-800 shadow-lg">
          {loading ? (
            <div className="text-center py-10 text-gray-400 animate-pulse">
              Cargando reservas...
            </div>
          ) : filtered.length > 0 ? (
            <table className="w-full border-collapse text-sm text-left">
              <thead className="bg-[#202020] text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700">#</th>
                  <th className="px-4 py-3 border-b border-gray-700">Nombre</th>
                  <th className="px-4 py-3 border-b border-gray-700">Correo</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center">
                    Personas
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">Fecha</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center">
                    Estado
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={r.reserva_id ?? i}
                    className="hover:bg-[#1b1b1b] transition-colors border-b border-gray-800"
                  >
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-100 font-medium">
                      {r.nombre_completo || "Sin nombre"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {r.correo_electronico || "Sin correo"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {r.cantidad_personas || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{r.fecha || "—"}</td>
                    <td
                      className={`px-4 py-3 text-center font-semibold ${
                        estadoColor[r.estado] || "text-gray-400"
                      }`}
                    >
                      {r.estado || "Desconocido"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => desactivarReserva(r.reserva_id)}
                          className="px-3 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:text-red-300 transition"
                          title="Eliminar reserva"
                        >
                          Eliminar
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-gray-400">
              No se encontraron reservas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
