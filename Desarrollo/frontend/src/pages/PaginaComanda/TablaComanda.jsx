import React from "react";
import OrderRow from "./FilaOrdenes";

export default function OrderTable() {
  const orders = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    status: i === 0 ? "Pendiente" : "Hecho",
    price: 512.4,
    table: 1,
    date: "Ayer, 20:30",
  }));

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Artículos</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Mesa</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
