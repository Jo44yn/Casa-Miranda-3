import React, { useState } from 'react';

const AvailabilityBar = () => {
    const [arrival, setArrival] = useState('');
    const [departure, setDeparture] = useState('');

    // Sample booked dates array matching your CalendarStep component
    const alreadyBookedDates = [
        new Date(2026, 6, 15).getTime(), // July 15, 2026
        new Date(2026, 6, 16).getTime(), // July 16, 2026
        new Date(2026, 6, 22).getTime()  // July 22, 2026
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (arrival && departure) {
            const startDate = new Date(arrival);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(departure);
            endDate.setHours(0, 0, 0, 0);

            if (endDate <= startDate) {
                alert("Departure date must be after arrival date.");
                return;
            }

            // Check if any date within the user's selected range conflicts with a booked date
            let isConflict = false;
            let checkDate = new Date(startDate);

            while (checkDate <= endDate) {
                if (alreadyBookedDates.includes(checkDate.getTime())) {
                    isConflict = true;
                    break;
                }
                // Move to the next day
                checkDate.setDate(checkDate.getDate() + 1);
            }

            // Notify the user without linking to another page
            if (isConflict) {
                alert(`Sorry, some dates between ${arrival} and ${departure} are already fully booked. Please try another selection!`);
            } else {
                alert(`Great news! Your selected dates from ${arrival} to ${departure} are fully available to book.`);
            }

        } else {
            alert("Please select both an arrival and departure date.");
        }
    };

    return (
        <section className="availability-bar">
            <form id="availability-form" className="availability-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="home-arrival">ARRIVAL</label>
                    <input
                        type="date"
                        id="home-arrival"
                        required
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="home-departure">DEPARTURE</label>
                    <input
                        type="date"
                        id="home-departure"
                        required
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-dark">CHECK AVAILABILITY</button>
            </form>
        </section>
    );
};

export default AvailabilityBar;