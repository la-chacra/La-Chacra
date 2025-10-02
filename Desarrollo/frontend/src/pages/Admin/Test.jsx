import React from "react";
import AdminHeader from "../../components/HeaderAdmin";

export default function HeaderTestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* header */}
      <AdminHeader />

      {/* info */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pagina de testeo para el header admin</h1>
        <p className="text-gray-700">
          Se importa el header con "import AdminHeader from "../../components/HeaderAdmin";" Cuando lo usas en una página que se ubique en "pages/Admin", como esta página.<br/>
          Las páginas se declaran en App.jsx, con las URL siguientes (cada una contiene un /admin/ antes del nombre):<br/>
          stock, reservas, comanda, empleados, estadisticas, platos, stockcambios<br/>
          Igual, este no es el diseño final, Igual, este no es el diseño final, es solo por el hecho de tener uno ahora mismo.<br/>
        </p>
      </main>
    </div>
  );
}
