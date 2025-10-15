import React, { useState, useEffect } from 'react'

const DateSelector = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

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
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === today.toDateString()
      const isPastOrToday = date <= today
      const isSelectable = isCurrentMonth && isPastOrToday
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelectable,
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
    if (!selectedDate) return `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
    const day = selectedDate.getDate()
    const month = months[selectedDate.getMonth()]
    const year = selectedDate.getFullYear()
    return `${day} ${month} ${year}`
  }

  return (
    <div className="ndp-date-selector">

      <div className="ndp-calendar">
        <div className="ndp-calendar-header">
          <span className="ndp-month-year">
            {formatSelectedDate()}
          </span>
          <div className="ndp-nav-buttons">
            <button onClick={handlePrevMonth} className="ndp-nav-btn">‹</button>
            <button onClick={handleNextMonth} className="ndp-nav-btn">›</button>
          </div>
        </div>
        
        <div className="ndp-weekdays">
          {weekDays.map((day, index) => (
            <div key={index} className="ndp-weekday">{day}</div>
          ))}
        </div>
        
        <div className="ndp-calendar-grid">
          {calendarDays.map((dayObj, index) => (
            <button
              key={index}
              className={`ndp-calendar-day ${
                !dayObj.isCurrentMonth ? 'ndp-other-month' : ''
              } ${
                dayObj.isToday ? 'ndp-today' : ''
              } ${
                !dayObj.isSelectable ? 'ndp-disabled' : ''
              } ${
                selectedDate && dayObj.date.toDateString() === selectedDate.toDateString() ? 'ndp-selected' : ''
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
