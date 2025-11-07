import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../../components/HeaderAdmin";

export default function GestionStock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarStock = async () => {
      try {
        const res = await fetch("/api/stock", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Error al obtener stock");
        setStock(data.data);
        setFilteredStock(data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    cargarStock();
  }, []);

  useEffect(() => {
    const result = stock.filter((item) => {
      const matchesSearch = item.nombre
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = filterType ? item.categoria === filterType : true;
      return matchesSearch && matchesType;
    });
    setFilteredStock(result);
  }, [search, filterType, stock]);

  const toggleSelectAll = () => {
    if (selected.length === filteredStock.length) setSelected([]);
    else setSelected(filteredStock.map((p) => p.insumo_id));
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = () => alert("➕ Añadir producto (pendiente de implementación)");
  const handleEdit = (producto) => alert(`✏️ Editar producto: ${producto.nombre}`);
  const handleDelete = (producto) =>
    alert(`🗑️ Eliminar producto: ${producto.nombre}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col text-gray-200">
        <AdminHeader />
        <div className="flex flex-1 items-center justify-center text-gray-400">
          Cargando inventario...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 flex flex-col">
      <AdminHeader />

      <div className="p-6 flex flex-col flex-1 max-w-7xl mx-auto w-full">
        {/* Header de control */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 mb-6 bg-[#1a1a1a] p-4 rounded-xl shadow-md border border-[#2a2a2a]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Buscar */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#111] text-gray-200 placeholder-gray-500 w-full px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filtro */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#111] text-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Tipo</option>
              <option value="Carne">Carne</option>
              <option value="Bebida">Bebida</option>
              <option value="Verdura">Verdura</option>
              <option value="Fruta">Fruta</option>
              <option value="Vino">Vino</option>
              <option value="Aderezo">Aderezo</option>
              <option value="Higiene">Producto de Higiene</option>
            </select>
          </div>

          {/* Añadir */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium shadow transition w-full md:w-auto justify-center"
          >
            <FaPlus /> Añadir
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-[#181818] rounded-xl shadow-lg border border-[#2a2a2a]">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#101010] text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selected.length === filteredStock.length}
                    className="accent-emerald-500"
                  />
                </th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3 text-center">Cantidad</th>
                <th className="px-4 py-3 text-center">Cantidad Mínima</th>
                <th className="px-4 py-3 text-center">Unidad</th>
                <th className="px-4 py-3 text-center">Precio Unidad</th>
                <th className="px-4 py-3 text-center">Precio Total</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.length > 0 ? (
                filteredStock.map((producto) => (
                  <tr
                    key={producto.insumo_id}
                    className={`border-b border-[#2a2a2a] hover:bg-[#222]/50 transition ${
                      selected.includes(producto.insumo_id)
                        ? "bg-emerald-900/30"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(producto.insumo_id)}
                        onChange={() => toggleSelect(producto.insumo_id)}
                        className="accent-emerald-500"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{producto.nombre}</td>
                    <td className="px-4 py-3">{producto.categoria}</td>
                    <td className="px-4 py-3 text-center">{producto.cantidad}</td>
                    <td className="px-4 py-3 text-center">{producto.cantidadMinima}</td>
                    <td className="px-4 py-3 text-center">{producto.unidad}</td>
                    <td className="px-4 py-3 text-center">
                      ${parseFloat(producto.precioUnitario).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      ${(producto.cantidad * producto.precioUnitario).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() => handleEdit(producto)}
                          className="hover:scale-110 transition"
                        >
                          <FaEdit className="text-gray-300 hover:text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(producto)}
                          className="hover:scale-110 transition"
                        >
                          <FaTrash className="text-red-500 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No hay productos en el inventario.
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
