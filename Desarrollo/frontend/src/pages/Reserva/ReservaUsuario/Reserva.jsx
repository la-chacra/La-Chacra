import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from "../../../components/HeaderUnificado"
import { useAuth } from "../../../hooks/useAuth"
import Footer from "../../../components/Footer"
import DateSelector from '../../../components/DatePicker'
import TimeSelector from '../../../components/TimePicker'
import TableReservationMain from './ReservaMain'
import ReservaActivaModal from "../../../components/ReservaActivaModal"
import WindowWarning from "../../../components/Alert"

const ReservaMesas = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)

  const [reservaActiva, setReservaActiva] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const [alertData, setAlertData] = useState(null)

  const { t } = useTranslation()
  const { autenticado } = useAuth()

  // Obtener reserva activa
  useEffect(() => {
    const obtenerReservaActiva = async () => {
      try {
        const res = await fetch("/api/reserva/activa", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setReservaActiva(data.data);
          setShowModal(true);
        }
      } catch (err) {
        console.log("Error buscando reserva activa:", err);
      }
    };

    obtenerReservaActiva();
  }, []);

  const cancelarReserva = async () => {
    try {
      const res = await fetch("/api/reserva/cancelar", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setAlertData({
          type: "alert",
          message: "Reserva cancelada con éxito.",
          icon: "success"
        });
        setReservaActiva(null);
        setShowModal(false);
      } else {
        setAlertData({
          type: "alert",
          message: "Error al cancelar: " + data.message,
          icon: "warning"
        });
      }
    } catch (error) {
      setAlertData({
        type: "alert",
        message: "Error de conexión.",
        icon: "warning"
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time)
  };

  const handleTableChange = (table) => {
    setSelectedTable(table)
  };

  return (
    <div className="reserva-mesas-page">
      <Header />

      <div className={`reserva-center-wrapper ${showModal ? "blur-content" : ""}`}>
        <div className="reserva-container font-montserrat">
          <h1 className="reserva-title font-overlock fade-in text-3xl">
            {t('reserva.title')}
          </h1>

          <div className="reserva-content fade-in-up">
            <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
            <TimeSelector selectedDate={selectedDate} selectedTime={selectedTime} onTimeChange={handleTimeChange} />
            <TableReservationMain
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedTable={selectedTable}
              onTableChange={handleTableChange}
            />
          </div>
        </div>
      </div>

      <Footer />

      {showModal && reservaActiva && (
        <ReservaActivaModal
          reserva={reservaActiva}
          onClose={() => setShowModal(false)}
          onCancel={cancelarReserva}
        />
      )}

      {alertData && (
        <WindowWarning
          type={alertData.type}
          message={alertData.message}
          icon={alertData.icon}
          onConfirm={() => setAlertData(null)}
        />
      )}
    </div>
  );
};

export default ReservaMesas;
