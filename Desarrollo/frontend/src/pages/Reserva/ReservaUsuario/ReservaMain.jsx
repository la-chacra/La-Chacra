import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const TableReservationMain = ({ selectedDate, selectedTime, selectedTable, onTableChange }) => {
  const { t } = useTranslation()
  const [customTableCount, setCustomTableCount] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const predefinedTables = [1, 2, 4, 6]

  const handleTableSelect = (tableCount) => {
    onTableChange(tableCount)
    setShowCustomInput(false)
    setCustomTableCount('')
  }

  const handleCustomTableClick = () => {
    setShowCustomInput(true)
    onTableChange(null)
  }

  const handleCustomTableSubmit = () => {
    const count = parseInt(customTableCount)
    if (count && count > 0) {
      onTableChange(count)
      setShowCustomInput(false)
    }
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedTable) {
      alert(t('reserva.alerts.incomplete'))
      return
    }
    
    // aqui iria la logica para enviar la reserva al backend. se tiene que conectar con los usuarios tambien
    
    // Convierte del formato de JS (ej: Fri Oct 17 2025 00:00:00 GMT-0300) al formato ISO
    // en formato ISO queda, por ej: 2025-10-17T03:00:00.000Z, entonces se usa split() para
    // separar y obtener obtener un array con la fecha completa en la posición 0 y lo demás después 
    // de la "T" en la 1.
    const fecha = new Date(selectedDate).toISOString().split("T")[0];

    const datosReserva = {
      fecha: fecha,
      hora: selectedTime,
      cantidadPersonas: selectedTable
    }
    
    try {
      const respuesta = await fetch("/api/reserva/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(datosReserva),
      });

      const dataRes = await respuesta.json();

      if (dataRes.success) {
        alert(t('reserva.alerts.success'));
      } else {
        alert(t('reserva.alerts.error_prefix') + dataRes.message);
      }
    } catch (error) {
      alert(t('reserva.alerts.connection'));
    }
    /*console.log('Reservation data:', {
      date: selectedDate,
      time: selectedTime,
      tableCount: selectedTable
    })*/
  }

  const canMakeReservation = selectedDate && selectedTime && selectedTable

  return (
    <div className="table-reservation-main">
      <div className="table-selection">
        <h3 className="table-section-title">{t('reserva.persons_title')}</h3>
        <p className="section-subtitle">
          {t('reserva.persons_subtitle')}
        </p>
        
        <div className="table-options">
          {predefinedTables.map((count) => (
            <button
              key={count}
              className={`table-option ${selectedTable === count ? 'selected' : ''}`}
              onClick={() => handleTableSelect(count)}
            >
              {count}
            </button>
          ))}
          
          <button
            className={`table-option custom ${showCustomInput ? 'selected' : ''}`}
            onClick={handleCustomTableClick}
          >
            {t('reserva.other')}
          </button>
        </div>
        
        {showCustomInput && (
          <div className="custom-input-container">
            <input
              type="number"
              placeholder={t('reserva.placeholder_number')}
              value={customTableCount}
              onChange={(e) => setCustomTableCount(e.target.value)}
              className="custom-input"
              min="1"
              max="20"
            />
            <button 
              onClick={handleCustomTableSubmit}
              className="custom-submit"
              disabled={!customTableCount}
            >
              {t('reserva.confirm')}
            </button>
          </div>
        )}
      </div>
      
      <div className="information-panel">
        <div className="info-header">
          <div className="info-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
          <span className="info-title">Información</span>
        </div>
        
        <div className="info-content">
          <p>
            {t('reserva.info_p1')}
          </p>
          
          <p>
            {t('reserva.info_p2')}
          </p>
        </div>
        
        <button 
          className={`submit-button ${canMakeReservation ? 'enabled' : 'disabled'}`}
          onClick={handleSubmit}
          disabled={!canMakeReservation}
        >
          Realizar Reserva
        </button>
      </div>
    </div>
  ) 
}

export default TableReservationMain
