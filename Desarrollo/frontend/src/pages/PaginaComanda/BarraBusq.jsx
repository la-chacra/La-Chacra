export default function SearchBar() {
  return (
    <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-md shadow-sm">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Buscar Pedido"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-olive-700"
        />
        <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition">
          ⚙️
        </button>
      </div>

      <div className="flex gap-2 mt-3 md:mt-0">
        <button className="bg-olive-700 text-white px-4 py-2 rounded-md hover:bg-olive-700/90">
          Añadir Pedido
        </button>
        <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100">
          Exportar ⬇️
        </button>
      </div>
    </div>
  );
}
