import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faGift,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TendenciasEstacionalesTab({ tendencias }) {
  return (
    <div className="ge-card ge-tendencias">
      <div className="ge-card__header">Tendencias Estacionales</div>
      <p className="ge-tendencias-subtitle">
        Comparación de ventas totales por período del año
      </p>

      {/*
              endpoint sugerido: GET /api/estadisticas/tendencias
              agrupa ventas por periodo (Primavera, Verano, Otoño)
              retorna { periodo, ventas, productos: [...] }
          */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={tendencias}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodo" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="ventas"
            stroke="#34aecc"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="ge-tendencias-grid">
        {tendencias.map((t) => (
          <div key={t.periodo} className="ge-tendencia-card">
            <div className="ge-tendencia-header">
              <FontAwesomeIcon
                icon={
                  t.periodo === "Primavera"
                    ? faLeaf
                    : t.periodo === "Verano"
                    ? faSun
                    : faGift
                }
                className="ge-tendencia-icon"
              />
              <h3>{t.periodo}</h3>
            </div>
            <p className="ge-tendencia-title">Productos destacados</p>
            <div className="ge-product-tags">
              {t.productos.map((p, i) => (
                <span key={i} className="ge-tag">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}