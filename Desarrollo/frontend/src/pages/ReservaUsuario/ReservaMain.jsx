import React, { useState } from 'react'

const TableReservationMain = ({ selectedDate, selectedTime, selectedTable, onTableChange }) => {
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

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedTable) {
      alert('Por favor completa todos los campos antes de continuar')
      return
    }
    
    // aqui iria la logica para enviar la reserva al backend. se tiene que conectar con los usuarios tambien
    /*console.log('Reservation data:', {
      date: selectedDate,
      time: selectedTime,
      tableCount: selectedTable
    })*/
    
    alert('Reserva enviada correctamente')
  }

  const canMakeReservation = selectedDate && selectedTime && selectedTable

  return (
    <div className="table-reservation-main">
      <div className="table-selection">
        <h3 className="table-section-title">Cantidad de personas</h3>
        <p className="section-subtitle">
          Seleccione la cantidad de personas que asistirán a su reserva
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
            Otro
          </button>
        </div>
        
        {showCustomInput && (
          <div className="custom-input-container">
            <input
              type="number"
              placeholder="Ingrese un número"
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
              Confirmar
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
            Cada reserva se debe hacer para una hora específica, sin 
            hora límite más haya del cierre del local.
          </p>
          
          <p>
            Usted tiene un margen de <strong>15 minutos de retardo</strong> para 
            llegar al local, si usted no llegó al local habiendo pasado ese 
            tiempo, la reserva se vuelve <strong>inválida y la mesa puede ser 
            ocupada</strong>.
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
