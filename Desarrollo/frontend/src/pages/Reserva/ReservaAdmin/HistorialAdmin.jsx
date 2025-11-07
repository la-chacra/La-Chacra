import React, { useEffect, useState } from "react";
import Header from "../../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function HistorialRes() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar reservas
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
          setReservas(data.data);
          setFilteredReservas(data.data);
        }
      } catch (err) {
        console.error("Error al cargar reservas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  // Filtro y búsqueda
  useEffect(() => {
    const result = reservas.filter((r) => {
      const matchesSearch =
        r.nombre_completo?.toLowerCase().includes(search.toLowerCase()) ||
        r.correo_electronico?.toLowerCase().includes(search.toLowerCase());
      const matchesEstado = filterEstado ? r.estado === filterEstado : true;
      return matchesSearch && matchesEstado;
    });
    setFilteredReservas(result);
  }, [search, filterEstado, reservas]);

  // Selección múltiple
  const toggleSelectAll = () => {
    if (selected.length === filteredReservas.length) setSelected([]);
    else setSelected(filteredReservas.map((r) => r.reserva_id));
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Eliminar reserva
  const desactivarReserva = async (reserva_id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reserva?")) return;

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
    } catch (err) {
      console.error("Error al eliminar reserva:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] font-montserrat text-gray-200">
        <Header />
        <div className="flex justify-center items-center h-[70vh] text-gray-400">
          Cargando reservas...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] font-montserrat text-gray-200">
      <Header />

      <div className="max-w-7xl mx-auto p-8">
        {/* 🔹 Header de acciones */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/gestion")}
            className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] shadow-sm px-4 py-2 rounded-lg hover:bg-[#222] transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Volver al Panel</span>
          </button>
        </div>

        {/* 🔹 Contenedor principal */}
        <div className="flex gap-8">
          {/* 🧭 Sección izquierda (tabla) */}
          <div className="flex-1 bg-[#181818] rounded-2xl shadow-md p-6 border border-[#2a2a2a]">
            

            {/* Filtros y búsqueda alineados */}
            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Buscar reserva..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#111] border border-[#333] text-gray-200 placeholder-gray-500 px-4 py-3 rounded-md w-78 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="bg-[#111] border border-[#333] text-gray-200 px-3 py-3 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto rounded-xl border border-[#2a2a2a] shadow-sm">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-[#101010] text-gray-100 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={selected.length === filteredReservas.length}
                        className="accent-emerald-500"
                      />
                    </th>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Correo</th>
                    <th className="px-4 py-3 text-center">Personas</th>
                    <th className="px-4 py-3 text-center">Fecha</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                    <th className="px-4 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservas.length > 0 ? (
                    filteredReservas.map((r) => (
                      <tr
                        key={r.reserva_id}
                        className={`border-b border-[#2a2a2a] hover:bg-[#222]/60 transition ${
                          selected.includes(r.reserva_id)
                            ? "bg-emerald-900/20"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selected.includes(r.reserva_id)}
                            onChange={() => toggleSelect(r.reserva_id)}
                            className="accent-emerald-500"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {r.nombre_completo}
                        </td>
                        <td className="px-4 py-3">{r.correo_electronico}</td>
                        <td className="px-4 py-3 text-center">
                          {r.cantidad_personas}
                        </td>
                        <td className="px-4 py-3 text-center">{r.fecha}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              r.estado === "Confirmada"
                                ? "bg-green-500/20 text-green-400"
                                : r.estado === "Pendiente"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {r.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => desactivarReserva(r.reserva_id)}
                            className="hover:scale-110 transition"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-red-500 hover:text-red-600"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        No se encontraron reservas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 🧭 Sección derecha (acciones) */}
          <div className="w-64 flex-shrink-0 bg-[#181818] rounded-2xl shadow-md p-6 border border-[#2a2a2a] h-fit">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">
              Acciones
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => alert("Exportar historial...")}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Exportar
              </button>
              <button
                onClick={() => navigate("/gestion")}
                className="bg-[#222] text-gray-200 px-4 py-2 rounded-lg hover:bg-[#2f2f2f] transition"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
