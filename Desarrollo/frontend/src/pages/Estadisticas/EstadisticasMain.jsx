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
        const mockTemporadasAltas = [
          {
            key: "Turismo",
            label: "Temporada de Turismo",
            ingresos: 0,
            icon: faSuitcaseRolling,
            colorClass: "ge-season--green",
          },
          {
            key: "FiestasFinAno",
            label: "Fiestas de Fin de Año",
            ingresos: 0,
            icon: faGift,
            colorClass: "ge-season--purple",
          },
          {
            key: "VacacionesVerano",
            label: "Vacaciones de Verano",
            ingresos: 0,
            icon: faSun,
            colorClass: "ge-season--yellow",
          },
          {
            key: "VacacionesInvierno",
            label: "Vacaciones de Invierno",
            ingresos: 0,
            icon: faSnowflake,
            colorClass: "ge-season--blue",
          },
        ];

        setTemporadasAltas(mockTemporadasAltas);

        // const res = await fetch("/api/estadisticas/dashboard");
        // const data = await res.json();
        // setProductosMasVendidos(data.productosMasVendidos);
        // setReservas(data.reservas);
        // setVentas(data.ventas);
        // setTemporadasAltas(data.temporadasAltas);
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
