import React, { useState } from 'react';

const CalendarStep = ({ bookingType, setBookingType, startDate, setStartDate, endDate, setEndDate }) => {
    // 1. ALIGN WITH TODAY'S REAL DATE
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // 3. SIMULATED ALREADY BOOKED DATES
    const alreadyBookedDates = [
        new Date(2026, 6, 15).getTime(), // Example: July 15, 2026
        new Date(2026, 6, 16).getTime(), // Example: July 16, 2026
        new Date(2026, 6, 22).getTime()  // Example: July 22, 2026
    ];

    const renderMonthGrid = (monthOffset) => {
        const displayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth();

        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const cells = [];

        // Previous month empty fillers (removed numbers)
        for (let i = 0; i < firstDayIndex; i++) {
            cells.push(<div key={`prev-${i}`} className="day empty-cell"></div>);
        }

        // Current month valid days
        for (let i = 1; i <= daysInMonth; i++) {
            const cellDate = new Date(year, month, i);
            const cellTime = cellDate.getTime();

            // 2. PREVIOUS DAYS AND ALREADY BOOKED DAYS ARE NOT SELECTABLE
            const isPastDate = cellDate < today;
            const isAlreadyBooked = alreadyBookedDates.includes(cellTime);
            const isMuted = isPastDate || isAlreadyBooked;

            let cellClass = "day";

            if (isAlreadyBooked) {
                cellClass += " booked locked-date";
            } else if (isPastDate) {
                cellClass += " muted";
            } else {
                cellClass += " valid";
                if (startDate && cellTime === startDate.getTime()) cellClass += " selected-endpoint";
                if (endDate && cellTime === endDate.getTime()) cellClass += " selected-endpoint";
                if (startDate && endDate && cellDate > startDate && cellDate < endDate) cellClass += " selected-range";
            }

            cells.push(
                <div
                    key={`day-${i}`}
                    className={cellClass}
                    onClick={() => !isMuted && handleDayClick(cellDate)}
                    style={isAlreadyBooked ? { cursor: 'not-allowed', opacity: 0.5, textDecoration: 'line-through' } : {}}
                >
                    {i}
                </div>
            );
        }

        // Next month empty fillers (removed numbers)
        const remainingCells = 42 - cells.length;
        for (let i = 1; i <= remainingCells; i++) {
            cells.push(<div key={`next-${i}`} className="day empty-cell"></div>);
        }

        return { name: `${monthNames[month]} ${year}`, cells };
    };

    const handleDayClick = (clickedDate) => {
        const clickedTime = clickedDate.getTime();
        const startTime = startDate ? startDate.getTime() : null;
        const endTime = endDate ? endDate.getTime() : null;

        // Toggle removal logic: Deselect if clicking an already active selection
        if (startTime === clickedTime) {
            setStartDate(null);
            setEndDate(null);
            return;
        }
        if (endTime === clickedTime) {
            setEndDate(null);
            return;
        }

        if (bookingType === 'daytime') {
            setStartDate(clickedDate);
            setEndDate(null);
        } else {
            if (!startDate || (startDate && endDate)) {
                setStartDate(clickedDate);
                setEndDate(null);
            } else if (startDate && !endDate) {
                if (clickedDate > startDate) {
                    const hasBookedDateInRange = alreadyBookedDates.some(bookedTime =>
                        bookedTime > startDate.getTime() && bookedTime < clickedTime
                    );
                    if (!hasBookedDateInRange) {
                        setEndDate(clickedDate);
                    } else {
                        alert("Selected range includes dates that are already booked.");
                    }
                } else if (clickedDate < startDate) {
                    setStartDate(clickedDate);
                }
            }
        }
    };

    const changeMonth = (offset) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
    };

    const month1 = renderMonthGrid(0);
    const month2 = renderMonthGrid(1);

    return (
        <>
            <h1>Select your dates</h1>
            <p className="subtitle">Choose your preferred dates for a tranquil escape. Select between a serene daytime retreat or an immersive overnight stay</p>

            <div className="tabs">
                <div className={`tab ${bookingType === 'overnight' ? 'active' : ''}`} onClick={() => { setBookingType('overnight'); setStartDate(null); setEndDate(null); }}>OVERNIGHT STAY</div>
                <div className={`tab ${bookingType === 'daytime' ? 'active' : ''}`} onClick={() => { setBookingType('daytime'); setStartDate(null); setEndDate(null); }}>DAYTIME RETREAT</div>
            </div>

            <div className="calendar-wrapper">
                <div className="month">
                    <div className="month-header">
                        <span className="nav-btn" onClick={() => changeMonth(-1)}>‹</span>
                        <span>{month1.name}</span>
                        <span style={{ opacity: 0 }}>›</span>
                    </div>
                    <div className="days-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="day-label">{d}</div>)}
                        {month1.cells}
                    </div>
                </div>

                <div className="month">
                    <div className="month-header">
                        <span style={{ opacity: 0 }}>‹</span>
                        <span>{month2.name}</span>
                        <span className="nav-btn" onClick={() => changeMonth(1)}>›</span>
                    </div>
                    <div className="days-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="day-label">{d}</div>)}
                        {month2.cells}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarStep;