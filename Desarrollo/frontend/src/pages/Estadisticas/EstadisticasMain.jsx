import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faSnowflake,
  faSuitcaseRolling,
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

const TABS = ["Resumen General", "Tendencias Estacionales", "Top Clientes"];

export default function GeAdminDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // UI State
  const [diferentesProductos, setDiferentesProductos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [temporadasAltas, setTemporadasAltas] = useState([]);
  const [periodoActual, setPeriodoActual] = useState("Primavera");
  const [porcentajeCrecimiento, setPorcentajeCrecimiento] = useState(0);
  const [topClientes, setTopClientes] = useState([]);
  const [tendencias, setTendencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // endpoint /api/estadisticas/dashboard
      // este endpoint debe retornar todos los datos que se cargan a continuación:
      // - productosMasVendidos 
      // - temporadasAltas
      // - topClientes 
      // - tendencias
      // - diferentesProductos 
      // - totalClientes 
      // - porcentajeCrecimiento comparación mes actual vs anterior
      //
      // ejemplo de estructura esperada:
      // {
      //   productosMasVendidos: [
      //     { producto_id, nombre, precio, categoria, imagen_url, ventasPorProducto }
      //   ],
      //   temporadasAltas: [
      //     { key, label, ingresos }
      //   ],
      //   topClientes: [
      //     { id, nombre, visitas, ultima_visita }
      //   ],
      //   tendencias: [
      //     { periodo, ventas, productos: [nombres...] }
      //   ],
      //   diferentesProductos: 60,
      //   totalClientes: 340,
      //   porcentajeCrecimiento: 12.5
      // }
      // -----------------------------------------------

      try {
        //  solo mock para temporadasAltas con ingresos = 0
        const mockTemporadasAltas = [
          { key: "Turismo", label: "Temporada de Turismo", ingresos: 0, icon: faSuitcaseRolling, colorClass: "ge-season--green" },
          { key: "FiestasFinAno", label: "Fiestas de Fin de Año", ingresos: 0, icon: faGift, colorClass: "ge-season--purple" },
          { key: "VacacionesVerano", label: "Vacaciones de Verano", ingresos: 0, icon: faSun, colorClass: "ge-season--yellow" },
          { key: "VacacionesInvierno", label: "Vacaciones de Invierno", ingresos: 0, icon: faSnowflake, colorClass: "ge-season--blue" },
        ];

        setTemporadasAltas(mockTemporadasAltas);

        // cuando el backend esté listo, reemplazar esto por:
        // const res = await fetch("/api/estadisticas/dashboard");
        // const data = await res.json();
        // setProductosMasVendidos(data.productosMasVendidos);
        // setTemporadasAltas(data.temporadasAltas);
        // setTopClientes(data.topClientes);
        // setTendencias(data.tendencias);
        // setDiferentesProductos(data.diferentesProductos);
        // setTotalClientes(data.totalClientes);
        // setPeriodoActual(data.periodoActual);
        // setPorcentajeCrecimiento(data.porcentajeCrecimiento);

      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
      }
    };

    fetchData();
  }, []);

  const ventasTotales = useMemo(
    () => temporadasAltas.reduce((total, t) => total + t.ingresos, 0),
    [temporadasAltas]
  );

  const temporadasAltasOrdenadas = useMemo(
    () => [...temporadasAltas].sort((a, b) => b.ingresos - a.ingresos),
    [temporadasAltas]
  );

  const fmt = (value) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 0 });

  return (
    <div className="ge-page font-montserrat">
      <Header />

      <div className="ge-container">
        <div className="ge-top-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`ge-tab ${t === activeTab ? "ge-tab--active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* RESUMEN GENERAL */}
        {activeTab === "Resumen General" && (
          <>
            <div className="ge-tiles">
              <div className="ge-tile ge-tile--sales">
                <div className="ge-tile__title">Ventas Totales</div>
                <div className="ge-tile__value">${fmt(ventasTotales)}</div>
                <div className="ge-tile__meta">+{porcentajeCrecimiento}%</div>
              </div>

              <div className="ge-tile ge-tile--products">
                <div className="ge-tile__title">Productos Totales</div>
                <div className="ge-tile__value">{diferentesProductos}</div>
                <div className="ge-tile__meta">10 categorías</div>
              </div>

              <div className="ge-tile ge-tile--clients">
                <div className="ge-tile__title">Clientes Totales</div>
                <div className="ge-tile__value">{totalClientes}</div>
                <div className="ge-tile__meta">Activos</div>
              </div>
            </div>

            {/*
                endpoint sugerido: GET /api/productos/top
                devuelve lista ordenada por cantidad de ventas
            */}
            <div className="ge-main-grid">
              <div className="ge-left-col">
                <div className="ge-card ge-trending">
                  <div className="ge-card__header">Productos Más Vendidos</div>
                  <ul className="ge-trending-list">
                    {productosMasVendidos.map((p, idx) => (
                      <li className="ge-trending-item" key={p.producto_id}>
                        <div className="ge-trending-rank">#{idx + 1}</div>
                        <img
                          className="ge-trending-thumb"
                          src={p.imagen_url}
                          alt={p.nombre}
                        />
                        <div className="ge-trending-info">
                          <div className="ge-trending-name">{p.nombre}</div>
                          <div className="ge-trending-price">
                            ${p.precio}{" "}
                            <span className="ge-trending-cat">
                              {p.categoria}
                            </span>
                          </div>
                        </div>
                        <div className="ge-trending-stats">
                          <div className="ge-trending-sales">
                            {p.ventasPorProducto}
                          </div>
                          <div className="ge-trending-percent">Ventas</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 
                  datos desde Estadistica::generarReporte()
                  cada temporada alta debe incluir el campo 'ingresos' total
              */}
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
        )}

        {/* TENDENCIAS ESTACIONALES */}
        {activeTab === "Tendencias Estacionales" && (
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
        )}

        {/* TOP CLIENTES */}
        {activeTab === "Top Clientes" && (
          <div className="ge-card ge-top-clientes">
            <div className="ge-card__header">Top Clientes</div>

            {/*
                endpoint sugerido: GET /api/clientes/top
                debe devolver los 5 clientes con más visitas
                campos esperados: id, nombre, visitas, ultima_visita
            */}
            <table className="ge-client-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Visitas</th>
                  <th>Última Visita</th>
                </tr>
              </thead>

              <tbody>
                {topClientes.map((c, idx) => (
                  <tr key={c.id}>
                    <td>{idx + 1}</td>
                    <td>{c.nombre}</td>
                    <td>{c.visitas}</td>
                    <td>{new Date(c.ultima_visita).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
