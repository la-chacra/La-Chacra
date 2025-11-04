import React, { useMemo, useState } from "react";

export default function RankingProductosTab({
  productosMasVendidos = [],
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

  // productos ordenados por ventas
  const productosOrdenados = useMemo(() => {
    return [...productosMasVendidos].sort(
      (a, b) => b.ventasPorProducto - a.ventasPorProducto
    );
  }, [productosMasVendidos]);

  const totalPages = Math.ceil(productosOrdenados.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = productosOrdenados.slice(startIdx, startIdx + itemsPerPage);

  


  return (
    <div className="ge-card ge-ranking-productos">
      <div className="ge-card__header">Ranking de Productos</div>

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
            <option key={m} value={m}>
              {m}
            </option>
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
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <table className="ge-client-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Ventas</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((p, idx) => (
            <tr key={p.producto_id}>
              <td>{startIdx + idx + 1}</td>
              <td>{p.producto}</td>
              <td>{p.categoria}</td>
              <td>${p.precio}</td>
              <td>{p.ventas}</td>
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
