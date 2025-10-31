import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/HeaderAdmin";
import {
  faSuitcaseRolling,
  faGift,
  faSun,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

import ResumenGeneralTab from "./ResumenGeneralTab";
import TendenciasEstacionalesTab from "./TendenciasEstacionalesTab";
import RankingProductosTab from "./RankingProductosTab";
import RankingReservasTab from "./RankingReservasTab";
import RankingVentasTab from "./RankingVentasTab";

const TABS = [
  "Resumen General",
  "Tendencias Estacionales",
  "Ranking Productos",
  "Ranking Reservas",
  "Ranking Ventas",
];

export default function GeAdminDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // UI State
  const [diferentesProductos, setDiferentesProductos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [temporadasAltas, setTemporadasAltas] = useState([]);
  const [periodoActual, setPeriodoActual] = useState("Primavera");
  const [porcentajeCrecimiento, setPorcentajeCrecimiento] = useState(0);
  const [tendencias, setTendencias] = useState([]);

  // nuevos estados para filtro
  const [selectedMes, setSelectedMes] = useState("Todos");
  const [selectedAnio, setSelectedAnio] = useState(new Date().getFullYear());

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/estadistica/obtenerDashboard");
      const result = await res.json();

      if (result.success) {
        const data = result.data;

        setProductosMasVendidos(data.productosMasVendidos);
        setTemporadasAltas(
          data.temporadasAltas.map((t) => ({
            key: t.temporada,
            label: `Temporada ${t.temporada}`,
            ingresos: Number(t.total_vendido),
            icon:
              t.temporada === "Verano"
                ? faSun
                : t.temporada === "Invierno"
                ? faSnowflake
                : t.temporada === "Primavera"
                ? faGift
                : faSuitcaseRolling,
            colorClass:
              t.temporada === "Verano"
                ? "ge-season--yellow"
                : t.temporada === "Invierno"
                ? "ge-season--blue"
                : t.temporada === "Primavera"
                ? "ge-season--purple"
                : "ge-season--green",
          }))
        );

        setVentas([
          {
            titulo: "Pedidos Totales",
            valor: data.pedidosTotales,
          },
          {
            titulo: "Visitas Totales",
            valor: data.visitasTotales,
          },
          {
            titulo: "Ganancias Totales",
            valor: data.gananciasTotales,
          },
        ]);

        // si más adelante agregamos reservas o clientes
        setReservas([]);
        setDiferentesProductos(data.productosMasVendidos.length || 0);
        setTotalClientes(data.visitasTotales);
        setPeriodoActual("Primavera");
      } else {
        console.warn("No se pudieron obtener los datos del dashboard.");
      }
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

  // propiedades comunes
  const commonProps = {
    diferentesProductos,
    totalClientes,
    productosMasVendidos,
    reservas,
    ventas,
    temporadasAltasOrdenadas,
    ventasTotales,
    porcentajeCrecimiento,
    tendencias,
    fmt,
  };

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
          <ResumenGeneralTab {...commonProps} />
        )}

        {/* TENDENCIAS ESTACIONALES */}
        {activeTab === "Tendencias Estacionales" && (
          <TendenciasEstacionalesTab {...commonProps} />
        )}

        {/* RANKING PRODUCTOS */}
        {activeTab === "Ranking Productos" && (
          <RankingProductosTab
            productosMasVendidos={productosMasVendidos}
            selectedMes={selectedMes}
            setSelectedMes={setSelectedMes}
            selectedAnio={selectedAnio}
            setSelectedAnio={setSelectedAnio}
          />
        )}

        {/* RANKING RESERVAS */}
        {activeTab === "Ranking Reservas" && (
          <RankingReservasTab
            reservas={reservas}
            selectedMes={selectedMes}
            setSelectedMes={setSelectedMes}
            selectedAnio={selectedAnio}
            setSelectedAnio={setSelectedAnio}
          />
        )}

        {/* RANKING VENTAS */}
        {activeTab === "Ranking Ventas" && (
          <RankingVentasTab
            ventas={ventas}
            selectedMes={selectedMes}
            setSelectedMes={setSelectedMes}
            selectedAnio={selectedAnio}
            setSelectedAnio={setSelectedAnio}
          />
        )}
      </div>
    </div>
  );
}
