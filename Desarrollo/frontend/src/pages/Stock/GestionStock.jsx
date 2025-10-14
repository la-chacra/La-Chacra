import React, { useState } from "react";
import { FaFilter, FaPlus, FaDownload, FaTrash, FaEdit } from "react-icons/fa";
import AdminHeader from "../../components/HeaderAdmin";

export default function GestionStock() {
  const tipos = [
    { nombre: "Carne", color: "bg-red-500" },
    { nombre: "Bebida", color: "bg-sky-500" },
    { nombre: "Producto de higiene", color: "bg-purple-500" },
    { nombre: "Vino", color: "bg-rose-500" },
    { nombre: "Aderezo", color: "bg-yellow-500" },
    { nombre: "Fruta", color: "bg-pink-500" },
    { nombre: "Verdura", color: "bg-green-600" },
  ];

  const [products, setProducts] = useState(
    Array.from({ length: 10 }).map((_, i) => {
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      return {
        id: i + 1,
        nombre: `Producto ${i + 1}`,
        tipo: tipo.nombre,
        color: tipo.color,
        precioUnidad: (Math.random() * 200 + 50).toFixed(2),
        cantidad: Math.floor(Math.random() * 50) + 1,
      };
    })
  );

  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(products.map((p) => p.id));
      setSelectAll(true);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? p.tipo === filter : true)
  );

  const totalPrecio = selected
    .map((id) => {
      const prod = products.find((p) => p.id === id);
      return prod ? prod.precioUnidad * prod.cantidad : 0;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const handleAdd = () => alert("🆕 Añadir producto...");
  const handleExport = () => alert("⬇️ Exportando inventario...");
  const handleFilter = () => alert("⚙️ Filtro avanzado en construcción...");
  const handleDelete = (id) => alert(`🗑️ Eliminar producto ${id}`);
  const handleEdit = (id) => alert(`✏️ Editar producto ${id}`);

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 flex flex-col">
      {/* 🔝 Header superior ocupando todo el ancho */}
      <div className="w-full bg-neutral-800 shadow-md">
        <AdminHeader />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* 🔍 Barra de control alineada */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Grupo de búsqueda y filtros */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar Producto"
              className="bg-neutral-700 text-gray-100 placeholder-gray-400 px-4 py-2 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-500"
            >
              <FaFilter /> Filtrar
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-neutral-700 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Tipo</option>
              {tipos.map((t) => (
                <option key={t.nombre} value={t.nombre}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 shadow"
            >
              <FaPlus /> Añadir Producto
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 shadow"
            >
              <FaDownload /> Exportar
            </button>
          </div>
        </div>

        {/* 📋 Tabla */}
        <div className="overflow-x-auto bg-neutral-800 rounded-lg shadow border border-neutral-700">
          <table className="w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-neutral-700 text-gray-100 uppercase">
              <tr>
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="accent-emerald-500"
                  />
                </th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Precio Unidad</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Precio Total</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b border-neutral-700 hover:bg-neutral-700/50 transition ${
                    selected.includes(p.id) ? "bg-emerald-900/40" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="accent-emerald-500"
                    />
                  </td>
                  <td className="px-4 py-3">{p.nombre}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${p.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {p.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3">${p.precioUnidad}</td>
                  <td className="px-4 py-3">{p.cantidad}</td>
                  <td className="px-4 py-3">
                    ${(p.precioUnidad * p.cantidad).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button onClick={() => handleDelete(p.id)}>
                      <FaTrash className="text-red-500 hover:text-red-600" />
                    </button>
                    <button onClick={() => handleEdit(p.id)}>
                      <FaEdit className="text-gray-300 hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🧮 Total (solo si hay seleccionados) */}
        {selected.length > 0 && (
          <div className="bg-emerald-700 text-white mt-4 p-4 rounded-md flex justify-between items-center">
            <p className="font-semibold">
              Total de {selected.length} producto{selected.length > 1 && "s"}
            </p>
            <p className="text-sm">${totalPrecio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
