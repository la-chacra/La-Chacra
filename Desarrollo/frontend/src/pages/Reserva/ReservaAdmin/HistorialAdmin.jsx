import React, { useEffect, useState } from "react";
import Header from "../../../components/HeaderUnificado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ControlBar from "../../../components/ControlBar";

export default function HistorialRes() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar reservas
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

  // 🔹 Filtro y búsqueda
  useEffect(() => {
    const result = reservas.filter((r) => {
      const matchesSearch =
        r.nombre_completo?.toLowerCase().includes(search.toLowerCase()) ||
        r.correo_electronico?.toLowerCase().includes(search.toLowerCase());
      const matchesEstado = filterEstado
        ? r.estado === filterEstado
        : true;
      return matchesSearch && matchesEstado;
    });
    setFilteredReservas(result);
  }, [search, filterEstado, reservas]);

  // 🔹 Selección múltiple
  const toggleSelectAll = () => {
    if (selected.length === filteredReservas.length) setSelected([]);
    else setSelected(filteredReservas.map((r) => r.reserva_id));
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // 🔹 Eliminar reserva
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
        setReservas((prev) =>
          prev.filter((r) => r.reserva_id !== reserva_id)
        );
      }
    } catch (err) {
      console.error("Error al eliminar reserva:", err);
    }
  };

  // 🔹 Limpiar filtros
  const handleClearFilters = () => {
    setSearch("");
    setFilterEstado("");
  };

  // 🔹 Exportar reservas
  const handleExport = () => {
    if (selected.length > 0) {
      const ids = selected.join(",");
      window.open(`/api/exportar-reservas?ids=${ids}`, "_blank");
    } else {
      window.open(`/api/exportar-reservas`, "_blank");
    }
  };

  // 🔹 Configuración de filtros
  const filters = [
    {
      label: "Estado",
      type: "select",
      value: filterEstado,
      onChange: setFilterEstado,
      options: ["Seleccionar", "Pendiente", "Confirmada", "Cancelada"],
    },
  ];

  // 🔹 Botones de acción
  const buttons = [
    {
      label: "Añadir reserva",
      icon: faPlus,
      onClick: () => navigate("/gestion/reserva"),
    },
    {
      label: selected.length > 0 ? "Exportar seleccionadas" : "Exportar",
      icon: faDownload,
      onClick: handleExport,
    },
  ];

  if (loading) {
    return (
      <div className="hs-history-container font-overlock text-gray-200">
        <Header />
        <div className="flex justify-center items-center h-[70vh] text-gray-400">
          Cargando reservas...
        </div>
      </div>
    );
  }

  return (
    <div className="hs-history-container font-montserrat">
      <Header />

      <div className="hs-history-content space-y-6">
        {/* 🔹 BARRA DE CONTROL UNIFICADA */}
        <ControlBar
          searchValue={search}
          onSearchChange={setSearch}
          filters={filters}
          onClearFilters={handleClearFilters}
          buttons={buttons}
        />

        {/* 🔹 TABLA DE RESERVAS */}
        <div className="hs-table-container">
          <table className="hs-history-table">
            <thead>
              <tr>
                <th className="hs-checkbox-column">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      filteredReservas.length > 0 &&
                      selected.length === filteredReservas.length
                    }
                  />
                </th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Personas</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservas.length > 0 ? (
                filteredReservas.map((r) => (
                  <tr
                    key={r.reserva_id}
                    className={
                      selected.includes(r.reserva_id)
                        ? "hs-selected"
                        : ""
                    }
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(r.reserva_id)}
                        onChange={() => toggleSelect(r.reserva_id)}
                      />
                    </td>
                    <td>{r.nombre_completo}</td>
                    <td>{r.correo_electronico}</td>
                    <td className="text-center">
                      {r.cantidad_personas}
                    </td>
                    <td className="text-center">{r.fecha}</td>
                    <td className="text-center">
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
                    <td className="text-center">
                      <button
                        onClick={() =>
                          desactivarReserva(r.reserva_id)
                        }
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
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No se encontraron reservas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔹 TOTAL SELECCIONADO */}
        {selected.length > 0 && (
          <div className="mt-4 bg-[#0D0F10] text-white p-4 rounded-md flex justify-between items-center shadow-lg">
            <p className="font-semibold">
              Reservas seleccionadas: {selected.length}
            </p>
            <button
              onClick={() =>
                selected.forEach((id) => desactivarReserva(id))
              }
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-semibold"
            >
              Eliminar seleccionadas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
