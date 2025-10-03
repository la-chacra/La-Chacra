import React, { useState } from 'react'
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import DateSelector from '../../../components/DatePicker'
import TimeSelector from '../../../components/TimePicker'
import TableReservationMain from './ReservaMain'

const ReservaMesas = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime(null) // reiniciar hora al cambiar fecha
  }

  const handleTimeChange = (time) => {
    setSelectedTime(time)
  }

  const handleTableChange = (table) => {
    setSelectedTable(table)
  }

  return (
    <div className="reserva-mesas-page">
  <Header />

  <div className="reserva-center-wrapper">
    <div className="reserva-container font-montserrat">
      <h1 className="reserva-title font-overlock fade-in">RESERVA DE MESAS</h1>

      <div className="reserva-content fade-in-up">
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <TimeSelector
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />

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
</div>

  )
}

export default ReservaMesas