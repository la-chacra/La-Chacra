import React, { useMemo, useState } from "react";

export default function RankingReservasTab({
  reservas = [],
  selectedMes,
  setSelectedMes,
  selectedAnio,
  setSelectedAnio,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const meses = [
    "Todos",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const anios = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear - 1, currentYear - 2];
  }, []);

  const reservasOrdenadas = useMemo(() => {
    return [...reservas].sort((a, b) => b.cantidad - a.cantidad);
  }, [reservas]);

  const totalPages = Math.ceil(reservasOrdenadas.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = reservasOrdenadas.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="ge-card ge-ranking-reservas">
      <div className="ge-card__header">Ranking de Reservas</div>

      <div className="ge-filters">
        <select
          className="ge-filter-select"
          value={selectedMes}
          onChange={(e) => {
            setSelectedMes(e.target.value);
            setCurrentPage(1);
          }}
        >
          {meses.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          className="ge-filter-select"
          value={selectedAnio}
          onChange={(e) => {
            setSelectedAnio(e.target.value);
            setCurrentPage(1);
          }}
        >
          {anios.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <table className="ge-client-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((r, idx) => (
            <tr key={r.id}>
              <td>{startIdx + idx + 1}</td>
              <td>{r.cliente}</td>
              <td>{r.cantidad}</td>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ge-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ← Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
