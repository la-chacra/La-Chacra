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
        cantidad: Math.floor(Math.random() * 50) + 1,
        precioUnidad: (Math.random() * 100 + 20).toFixed(2),
      };
    })
  );

  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ open: false, type: "", product: null });

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

  const handleAdd = () =>
    setModal({
      open: true,
      type: "add",
      product: {
        nombre: "",
        tipo: "",
        color: "",
        cantidad: 0,
        precioUnidad: "",
      },
    });

  const handleExport = () => alert("⬇️ Exportando inventario...");
  const handleFilter = () => alert("⚙️ Filtro avanzado en construcción...");
  const handleDelete = (product) =>
    setModal({ open: true, type: "delete", product });
  const handleEdit = (product) =>
    setModal({ open: true, type: "edit", product: { ...product } });

  const confirmAction = () => {
    if (modal.type === "delete") {
      setProducts((prev) => prev.filter((p) => p.id !== modal.product.id));
    } else if (modal.type === "edit") {
      setProducts((prev) =>
        prev.map((p) => (p.id === modal.product.id ? modal.product : p))
      );
    } else if (modal.type === "add") {
      const newProduct = {
        ...modal.product,
        id: products.length + 1,
        color:
          tipos.find((t) => t.nombre === modal.product.tipo)?.color ||
          "bg-gray-500",
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setModal({ open: false, type: "", product: null });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 flex flex-col">
      <div className="w-full bg-neutral-800 shadow-md">
        <AdminHeader />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* 🔍 Barra de control */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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
                <th className="px-4 py-3 text-center">Cantidad</th>
                <th className="px-4 py-3 text-center">Precio Unidad</th>
                <th className="px-4 py-3 text-center">Precio Total</th>
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

                  {/* 🔹 Aquí agregamos la unidad según el tipo */}
                  <td className="px-4 py-3 text-center">
                    {p.cantidad}{" "}
                    {["Carne", "Fruta", "Verdura"].includes(p.tipo) ? "kg" : "u"}
                  </td>

                  <td className="px-4 py-3 text-center">${p.precioUnidad}</td>
                  <td className="px-4 py-3 text-center">
                    ${(p.precioUnidad * p.cantidad).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => handleDelete(p)}
                        className="hover:scale-110 transition"
                      >
                        <FaTrash className="text-red-500 hover:text-red-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(p)}
                        className="hover:scale-110 transition"
                      >
                        <FaEdit className="text-gray-300 hover:text-white" />
                      </button>
                    </div>
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
              Total de {selected.length} producto
              {selected.length > 1 && "s"}
            </p>
            <p className="text-sm">${totalPrecio}</p>
          </div>
        )}
      </div>

      {/* 🧾 Modal */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-[450px] text-gray-200 border border-neutral-700">
            <h2 className="text-lg font-semibold mb-4 text-center capitalize">
              {modal.type === "delete"
                ? "Eliminar Producto"
                : modal.type === "edit"
                ? "Editar Producto"
                : "Añadir Producto"}
            </h2>

            {modal.type === "delete" ? (
              <p className="text-center mb-6">
                ¿Seguro que deseas eliminar{" "}
                <span className="font-semibold text-red-400">
                  {modal.product.nombre}
                </span>
                ?
              </p>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={modal.product.nombre}
                  onChange={(e) =>
                    setModal((prev) => ({
                      ...prev,
                      product: { ...prev.product, nombre: e.target.value },
                    }))
                  }
                  className="w-full bg-neutral-700 text-white px-3 py-2 rounded-md"
                />

                <select
                  value={modal.product.tipo}
                  onChange={(e) =>
                    setModal((prev) => ({
                      ...prev,
                      product: {
                        ...prev.product,
                        tipo: e.target.value,
                        color:
                          tipos.find((t) => t.nombre === e.target.value)
                            ?.color || "bg-gray-500",
                      },
                    }))
                  }
                  className="w-full bg-neutral-700 text-white px-3 py-2 rounded-md"
                >
                  <option value="">Selecciona tipo</option>
                  {tipos.map((t) => (
                    <option key={t.nombre} value={t.nombre}>
                      {t.nombre}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Cantidad"
                  value={modal.product.cantidad}
                  onChange={(e) =>
                    setModal((prev) => ({
                      ...prev,
                      product: {
                        ...prev.product,
                        cantidad: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full bg-neutral-700 text-white px-3 py-2 rounded-md"
                />

                <input
                  type="number"
                  placeholder="Precio por unidad"
                  value={modal.product.precioUnidad}
                  onChange={(e) =>
                    setModal((prev) => ({
                      ...prev,
                      product: {
                        ...prev.product,
                        precioUnidad: e.target.value,
                      },
                    }))
                  }
                  className="w-full bg-neutral-700 text-white px-3 py-2 rounded-md"
                />
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() =>
                  setModal({ open: false, type: "", product: null })
                }
                className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-400 text-white"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded-md text-white ${
                  modal.type === "delete"
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                {modal.type === "delete" ? "Eliminar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
