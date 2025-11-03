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
  const [rankingReservas, setReservas] = useState([]);
  const [rankingVentas, setVentas] = useState([]);
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
        // Dashboard general
        const resDashboard = await fetch("/api/estadistica/obtenerDashboard");
        const dataDashboard = await resDashboard.json();

        if (dataDashboard.success) {
          const data = dataDashboard.data;

          setProductosMasVendidos(data.productosMasVendidos || []);
          setTemporadasAltas(
            (data.temporadasAltas || []).map((t) => ({
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

          setDiferentesProductos(data.productosMasVendidos?.length || 0);
          setTotalClientes(data.visitasTotales || 0);
        }

        // Tendencias estacionales
        const resTendencias = await fetch(
          "/api/estadistica/obtenerTendenciasEstacionales"
        );
        const dataTendencias = await resTendencias.json();
        if (dataTendencias.success) {
          setTendencias(dataTendencias.data);
        }

        // Ranking de productos
        const resProductos = await fetch(
          "/api/estadistica/obtenerRankingProductos"
        );
        const dataProductos = await resProductos.json();
        if (dataProductos.success) {
          setProductosMasVendidos(dataProductos.data);
        }

        // Ranking de reservas
        const resReservas = await fetch(
          "/api/estadistica/obtenerRankingReservas"
        );
        const dataReservas = await resReservas.json();
        if (dataReservas.success) {
          setRankingReservas(dataReservas.data);
        }

        // Ranking de ventas
        const resVentas = await fetch("/api/estadistica/obtenerRankingVentas");
        const dataVentas = await resVentas.json();
        if (dataVentas.success) {
          setRankingVentas(dataVentas.data);
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
    rankingReservas,
    rankingVentas,
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
            reservas={rankingReservas}
            selectedMes={selectedMes}
            setSelectedMes={setSelectedMes}
            selectedAnio={selectedAnio}
            setSelectedAnio={setSelectedAnio}
          />
        )}

        {/* RANKING VENTAS */}
        {activeTab === "Ranking Ventas" && (
          <RankingVentasTab
            ventas={rankingVentas}
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
