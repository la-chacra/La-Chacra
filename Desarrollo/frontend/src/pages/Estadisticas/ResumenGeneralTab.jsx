import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ResumenGeneralTab({
  diferentesProductos,
  totalClientes,
  productosMasVendidos,
  temporadasAltasOrdenadas,
  ventasTotales,
  fmt,
}) {
  return (
    <>
      <div className="ge-tiles">
        <div className="ge-tile ge-tile--sales">
          <div className="ge-tile__title">Ventas Totales</div>
          <div className="ge-tile__value">${fmt(ventasTotales)}</div>
        </div>

        <div className="ge-tile ge-tile--products">
          <div className="ge-tile__title">Pedidos Totales este mes</div>
          <div className="ge-tile__value">{diferentesProductos}</div>
        </div>

        <div className="ge-tile ge-tile--clients">
          <div className="ge-tile__title">Reservas Totales este mes</div>
          <div className="ge-tile__value">{totalClientes}</div>
        </div>
      </div>

      {/* PRODUCTOS MAS VENDIDOS */}
      <div className="ge-main-grid">
        <div className="ge-left-col">
          <div className="ge-card ge-trending">
            <div className="ge-card__header">Productos Más Vendidos</div>
            <ul className="ge-trending-list">
              {productosMasVendidos.map((p, idx) => (
                <li className="ge-trending-item" key={p.producto_id || idx}>
                  <div className="ge-trending-rank">#{idx + 1}</div>
                  <img
                    className="ge-trending-thumb"
                    src={p.imagen_url}
                    alt={p.plato}
                  />
                  <div className="ge-trending-info">
                    <div className="ge-trending-name">{p.plato}</div>
                    <div className="ge-trending-price">
                      ${p.precio_unitario * p.total_vendidos}{"   Total "}
                      <span className="ge-trending-cat">{p.categoria}</span>
                    </div>
                  </div>
                  <div className="ge-trending-stats">
                    <div className="ge-trending-sales">
                      {p.total_vendidos}
                    </div>
                    <div className="ge-trending-percent">Vendidos</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TEMPORADAS ALTAS */}
        <div className="ge-right-col">
          <div className="ge-card ge-seasons">
            <div className="ge-card__header">Temporadas Altas</div>
            <div className="ge-season-list">
              {temporadasAltasOrdenadas.map((s) => (
                <div className={`ge-season ${s.colorClass}`} key={s.key}>
                  <div className="ge-season__icon">
                    <FontAwesomeIcon icon={s.icon} />
                  </div>
                  <div className="ge-season__body">
                    <div className="ge-season__title">{s.label}</div>
                    <div className="ge-season__revenue">
                      ${fmt(s.ingresos)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
