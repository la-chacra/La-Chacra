export default function TopBar() {
  return (
    <div className="flex flex-wrap justify-between items-center bg-olive-900 text-white p-4 rounded-md shadow-md">
      <div className="flex space-x-4 items-center">
        <button className="bg-olive-700 px-3 py-1 rounded-md hover:bg-olive-700/80 transition">
          ← Ir a inicio
        </button>
        <nav className="flex gap-6">
          <a href="#" className="hover:underline">Inventario</a>
          <a href="#" className="hover:underline">Empleados</a>
          <a href="#" className="hover:underline">Estadísticas</a>
          <a href="#" className="underline font-semibold">Comanda</a>
        </nav>
      </div>
      <h1 className="font-semibold text-lg">GESTIÓN</h1>
    </div>
  );
}
