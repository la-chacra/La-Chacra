import React from 'react';
import ActionButtons from './Botones';

export default function OrderRow({ order }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        {order.status === "pending" ? "⏳" : "✅"}
      </td>
      <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
        Ver
      </td>
      <td className="px-4 py-3">${order.price.toFixed(2)}</td>
      <td className="px-4 py-3">{order.table}</td>
      <td className="px-4 py-3">{order.date}</td>
      <td className="px-4 py-3 text-center">
        <ActionButtons />
      </td>
    </tr>
  );
}
