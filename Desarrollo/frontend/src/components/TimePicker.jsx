import React, { useState, useEffect } from 'react'

const TimeSelector = ({ selectedDate, selectedTime, onTimeChange }) => {
  const [availableTimes, setAvailableTimes] = useState([])

  const restaurantHours = {
    5: { // viernes
      lunch: { start: '11:30', end: '14:30' },
      dinner: { start: '20:30', end: '24:00' }
    },
    6: { // sabado
      lunch: { start: '11:30', end: '14:30' },
      dinner: { start: '20:30', end: '24:00' }
    },
    0: { // domingo
      lunch: { start: '11:30', end: '14:30' }
    }
  }

  useEffect(() => {
    if (selectedDate) {
      generateAvailableTimes()
    } else {
      setAvailableTimes([])
    }
  }, [selectedDate])

  const generateAvailableTimes = () => {
    const dayOfWeek = selectedDate.getDay()
    const hours = restaurantHours[dayOfWeek]
    
    if (!hours) {
      setAvailableTimes([])
      return
    }

    const times = []
    
    // generar tiempo de almuerzo
    if (hours.lunch) {
      const lunchTimes = generateTimeSlots(hours.lunch.start, hours.lunch.end)
      times.push(...lunchTimes)
    }
    
    // generar tiempo de cena
    if (hours.dinner) {
      const dinnerTimes = generateTimeSlots(hours.dinner.start, hours.dinner.end)
      times.push(...dinnerTimes)
    }
    
    setAvailableTimes(times)
  }

  const generateTimeSlots = (startTime, endTime) => {
    const slots = []
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    
    let currentHour = startHour
    let currentMin = startMin
    
    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`
      slots.push(timeString)
      
      currentMin += 30
      if (currentMin >= 60) {
        currentMin = 0
        currentHour++
      }
      
      if (currentHour >= 24) break
    }
    
    return slots
  }

  const formatTime12Hour = (time24) => {
    const [hour, minute] = time24.split(':').map(Number)
    const period = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`
  }

  const getSelectedTimeDisplay = () => {
    if (!selectedTime) return '10:20'
    return selectedTime
  }

  const isRestaurantOpen = () => {
    if (!selectedDate) return false
    const dayOfWeek = selectedDate.getDay()
    return restaurantHours.hasOwnProperty(dayOfWeek)
  }

  return (
    <div className="time-selector">
      <div className="time-display">
        <span className="time-label">Hora :</span>
        <div className="time-value">
          {getSelectedTimeDisplay()}
        </div>
      </div>
      
      {selectedDate && (
        <div className="time-options">
          {isRestaurantOpen() ? (
            availableTimes.length > 0 ? (
              <div className="time-grid">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => onTimeChange(time)}
                  >
                    {formatTime12Hour(time)}
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-times">
                No hay horarios disponibles para esta fecha
              </div>
            )
          ) : (
            <div className="closed-message">
              El restaurante está cerrado este día
            </div>
          )}
        </div>
      )}
      
      {!selectedDate && (
        <div className="select-date-first">
          Selecciona una fecha primero
        </div>
      )}
    </div>
  )
}

export default TimeSelector
