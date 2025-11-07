import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../../components/HeaderAdmin";

export default function GestionStock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar stock desde backend
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

  // 🔍 Filtro de búsqueda y categoría (con comparación flexible)
  useEffect(() => {
    const result = stock.filter((item) => {
      const matchesSearch = item.nombre?.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType
        ? item.categoria?.toLowerCase().includes(filterType.toLowerCase())
        : true;
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

  const handleAdd = () => alert("Añadir producto (pendiente de implementación)");

  const handleEdit = async (producto) => {
    const nuevoNombre = prompt("Nuevo nombre del producto:", producto.nombre);
    const nuevoPrecio = prompt("Nuevo precio unitario:", producto.precio_unitario);
    const nuevaCantidadMin = prompt("Nueva cantidad mínima:", producto.cantidad_minima);

    if (!nuevoNombre || !nuevoPrecio || !nuevaCantidadMin) return;

    try {
      const res = await fetch(`/api/stock/${producto.insumo_id}/modificar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nuevoNombre,
          precio_unitario: parseFloat(nuevoPrecio),
          cantidad_minima: parseInt(nuevaCantidadMin),
          categoria: producto.categoria,
          unidad: producto.unidad,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      alert("Producto actualizado con éxito");

      setStock((prev) =>
        prev.map((p) =>
          p.insumo_id === producto.insumo_id
            ? {
                ...p,
                nombre: nuevoNombre,
                precio_unitario: nuevoPrecio,
                cantidad_minima: nuevaCantidadMin,
              }
            : p
        )
      );
    } catch (err) {
      alert("Error al actualizar el producto: " + err.message);
    }
  };

  const handleDelete = async (producto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${producto.nombre}" del inventario?`))
      return;

    try {
      const res = await fetch(`/api/stock/${producto.insumo_id}/desactivar`, {
        method: "PUT",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("🗑️ Producto desactivado correctamente");
      setStock((prev) =>
        prev.map((p) =>
          p.insumo_id === producto.insumo_id ? { ...p, activo: 0 } : p
        )
      );
    } catch (err) {
      alert("Error al desactivar el producto: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 flex flex-col">
      <AdminHeader />

      <div className="p-6 flex flex-col flex-1 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 mb-6 bg-neutral-900 p-4 rounded-xl shadow-md border border-neutral-800">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center bg-neutral-800 rounded-md px-3 w-full md:w-72 h-10">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-gray-200 placeholder-gray-500 w-full h-full flex items-center focus:outline-none"
              />
            </div>

            <div className="flex items-center bg-neutral-800 rounded-md px-3 h-10">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="">Categoría</option>
                <option value="Carnes">Carnes</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Secos">Secos</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Verduras">Verduras</option>
                <option value="Frutas">Frutas</option>
                <option value="Higiene">Higiene</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium shadow transition w-full md:w-auto justify-center"
          >
            <FaPlus /> Añadir
          </button>
        </div>

        {/* 🧾 Tabla */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-neutral-200">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="bg-neutral-100 text-gray-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center">#</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-center">Cantidad</th>
                <th className="px-4 py-3 text-center">Mínima</th>
                <th className="px-4 py-3 text-center">Unidad</th>
                <th className="px-4 py-3 text-center">Precio Unidad</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-center">Activo</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.length > 0 ? (
                filteredStock.map((producto, i) => (
                  <tr
                    key={producto.insumo_id}
                    className="border-t border-neutral-200 hover:bg-neutral-50"
                  >
                    <td className="px-4 py-3 text-center">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{producto.nombre}</td>
                    <td className="px-4 py-3">{producto.categoria}</td>
                    <td className="px-4 py-3 text-center">{producto.cantidad}</td>
                    <td className="px-4 py-3 text-center">{producto.cantidad_minima}</td>
                    <td className="px-4 py-3 text-center">{producto.unidad}</td>
                    <td className="px-4 py-3 text-center">${producto.precio_unitario}</td>
                    <td className="px-4 py-3 text-center">
                      ${(producto.cantidad * producto.precio_unitario).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`font-semibold ${
                          producto.activo ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {producto.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(producto)}
                          className="hover:scale-110 transition"
                        >
                          <FaEdit className="text-gray-600 hover:text-emerald-600" />
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
                  <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                    No hay productos disponibles.
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
