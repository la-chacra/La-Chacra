import React, { useEffect, useState } from "react";
import Header from "../../../components/HeaderUnificado";
import ControlBar from "../../../components/ControlBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ReservasActuales() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
        const hoy = new Date().toISOString().split("T")[0];

        // 🔹 Filtrar solo reservas pendientes cuya fecha (sin hora) coincida con hoy
        const actuales = data.data.filter((r) => {
          const fechaReserva = r.fecha.split(" ")[0]; // <- cortar la hora
          return r.estado === "Pendiente" && fechaReserva === hoy;
        });

        setReservas(actuales);
        setFiltered(actuales);
      }
    } catch (err) {
      console.error("Error al cargar reservas actuales:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchReservas();
}, []);


  // 🔹 Buscar por nombre o correo
  useEffect(() => {
    const result = reservas.filter(
      (r) =>
        r.nombre_completo?.toLowerCase().includes(search.toLowerCase()) ||
        r.correo_electronico?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, reservas]);

  // 🔹 Marcar llegada (actualiza estado a “En curso”)
  const marcarLlegada = async (id) => {
    if (!window.confirm("¿Confirmar que el cliente llegó?")) return;
    try {
      const res = await fetch(`/api/reservas/marcar-llegada/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        setReservas((prev) => prev.filter((r) => r.reserva_id !== id));
      }
    } catch (err) {
      console.error("Error al marcar llegada:", err);
    }
  };

  if (loading) {
    return (
      <div className="hs-history-container font-overlock text-gray-200">
        <Header />
        <div className="flex justify-center items-center h-[70vh] text-gray-400">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="hs-history-container font-montserrat">
      <Header />

      <div className="hs-history-content space-y-6">
        <ControlBar
          searchValue={search}
          onSearchChange={setSearch}
          buttons={[
            {
              label: "Volver al historial",
              icon: faRotateLeft,
              onClick: () => navigate("/historial/reservas"),
            },
          ]}
        />

        <div className="hs-table-container">
          <table className="hs-history-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Personas</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((r) => (
                  <tr key={r.reserva_id}>
                    <td>{r.nombre_completo}</td>
                    <td>{r.correo_electronico}</td>
                    <td className="text-center">{r.cantidad_personas}</td>
                    <td className="text-center">{r.hora}</td>
                    <td className="text-center">
                      <button
                        onClick={() => marcarLlegada(r.reserva_id)}
                        className="text-green-500 hover:text-green-600 hover:scale-110 transition"
                      >
                        <FontAwesomeIcon icon={faCheckCircle} /> Marcar llegada
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No hay reservas pendientes para hoy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
