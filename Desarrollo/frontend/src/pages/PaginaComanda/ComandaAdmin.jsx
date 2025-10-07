import { FaSearch, FaFilter, FaTrash, FaEdit, FaCheck, FaClock, FaDownload, FaPlus } from "react-icons/fa";

function HeaderAdmin() {
  return (
    <header className="flex items-center justify-between bg-green-900 px-8 py-4">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-12" />
        <button className="bg-black text-white px-4 py-2 rounded-md">Ir a inicio</button>
      </div>
      <nav className="flex gap-2">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-t-md">Inventario</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-t-md">Empleados</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-t-md">Estadísticas</button>
        <button className="bg-yellow-200 text-black px-4 py-2 rounded-t-md font-semibold border-b-4 border-yellow-400">Comanda</button>
      </nav>
      <div className="flex items-center gap-2">
        <FaFilter className="text-white" />
        <span className="text-white text-xl font-semibold">GESTION</span>
      </div>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow mb-4">
      <div className="flex items-center gap-2 w-1/3">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar Pedido"
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />
        <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md border border-gray-300">
          Filtrar
          <FaFilter />
        </button>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow hover:bg-gray-50">
          Añadir Pedido <FaPlus />
        </button>
        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow hover:bg-gray-50">
          Exportar <FaDownload />
        </button>
      </div>
    </div>
  );
}

function OrderRow({ order }) {
  return (
    <tr className={order.status === "Pendiente" ? "bg-emerald-50" : ""}>
      <td className="px-2 py-2 text-center">
        {order.status === "Pendiente" ? (
          <FaClock className="text-blue-600 mx-auto" />
        ) : (
          <FaCheck className="text-green-600 mx-auto" />
        )}
      </td>
      <td className="px-2 py-2 text-blue-700 underline cursor-pointer text-center">Ver</td>
      <td className="px-2 py-2 text-center">${order.price}</td>
      <td className="px-2 py-2 text-center">{order.table}</td>
      <td className="px-2 py-2 text-center">{order.date}</td>
      <td className="px-2 py-2 text-center">
        <button className="inline-block mx-1"><FaTrash className="text-red-500" /></button>
        <button className="inline-block mx-1"><FaEdit className="text-gray-700" /></button>
      </td>
    </tr>
  );
}

function OrderTable() {
  const orders = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    status: i === 0 ? "Pendiente" : "Hecho",
    price: 512.4,
    table: 1,
    date: "hoy, 15:02",
  }));

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-center"><input type="checkbox" /></th>
            <th className="px-2 py-2 text-center">Estado</th>
            <th className="px-2 py-2 text-center">Artículos</th>
            <th className="px-2 py-2 text-center">Precio</th>
            <th className="px-2 py-2 text-center">Mesa</th>
            <th className="px-2 py-2 text-center">Fecha</th>
            <th className="px-2 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={order.status === "Pendiente" ? "bg-emerald-50" : ""}>
              <td className="px-2 py-2 text-center"><input type="checkbox" /></td>
              <td className="px-2 py-2 text-center">
                {order.status === "Pendiente" ? (
                  <FaClock className="text-blue-600 mx-auto" />
                ) : (
                  <FaCheck className="text-green-600 mx-auto" />
                )}
              </td>
              <td className="px-2 py-2 text-blue-700 underline cursor-pointer text-center">Ver</td>
              <td className="px-2 py-2 text-center">${order.price}</td>
              <td className="px-2 py-2 text-center">{order.table}</td>
              <td className="px-2 py-2 text-center">{order.date}</td>
              <td className="px-2 py-2 text-center">
                <button className="inline-block mx-1"><FaTrash className="text-red-500" /></button>
                <button className="inline-block mx-1"><FaEdit className="text-gray-700" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SummaryFooter() {
  return (
    <div className="bg-gray-800 text-white mt-0 p-4 rounded-b-md flex justify-between items-center">
      <p className="font-semibold">Total en pedidos</p>
      <p className="text-sm opacity-90">$24,367.37 de 125 pedidos</p>
    </div>
  );
}

export default function ComandaPage() {
  return (
    <div className="min-h-screen bg-yellow-100">
      <HeaderAdmin />
      <div className="max-w-6xl mx-auto mt-8">
        <SearchBar />
        <OrderTable />
        <SummaryFooter />
      </div>
    </div>
  );
}
import ComandaPage from './pages/PaginaComanda/ComandaAdmin';