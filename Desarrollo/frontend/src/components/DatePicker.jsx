import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const DateSelector = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const weekDays = ['D', 'L', 'M', 'W', 'J', 'V', 'S']

  useEffect(() => {
    generateCalendar()
  }, [currentMonth])

  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const today = new Date()
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 21) // 3 semanas en el futuro
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === today.toDateString()
      const isPast = date < today && !isToday
      const isFuture = date > maxDate
      const isSelectable = isCurrentMonth && !isPast && !isFuture
      
      days.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isFuture,
        isSelectable
      })
    }
    
    setCalendarDays(days)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (dayObj) => {
    if (dayObj.isSelectable) {
      onDateChange(dayObj.date)
    }
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Selecciona la fecha'
    
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const dayName = days[selectedDate.getDay()]
    const month = months[selectedDate.getMonth()].substring(0, 3)
    const day = selectedDate.getDate()
    
    return `${dayName}, ${month} ${day}`
  }

    return (
    <div className="date-selector">
        <div className="date-header">
        <span className="date-label">Selecciona la fecha</span>
        <button className="edit-button">
            <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
      
      <div className="selected-date">
        {formatSelectedDate()}
      </div>
      
      <div className="calendar">
        <div className="calendar-header">
          <span className="month-year">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <div className="nav-buttons">
            <button onClick={handlePrevMonth} className="nav-btn">‹</button>
            <button onClick={handleNextMonth} className="nav-btn">›</button>
          </div>
        </div>
        
        <div className="weekdays">
          {weekDays.map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {calendarDays.map((dayObj, index) => (
            <button
              key={index}
              className={`calendar-day ${
                !dayObj.isCurrentMonth ? 'other-month' : ''
              } ${
                dayObj.isToday ? 'today' : ''
              } ${
                !dayObj.isSelectable ? 'disabled' : ''
              } ${
                selectedDate && dayObj.date.toDateString() === selectedDate.toDateString() ? 'selected' : ''
              }`}
              onClick={() => handleDateClick(dayObj)}
              disabled={!dayObj.isSelectable}
            >
              {dayObj.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DateSelector
