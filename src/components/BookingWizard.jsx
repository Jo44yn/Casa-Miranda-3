import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import from the sub-folder directly next to this file
import CalendarStep from "./booking/CalendarStep";
import EnhancementsStep from "./booking/EnhancementsStep";
import GuestInfoStep from "./booking/GuestInfoStep";
import PaymentConfirmationPage from "./booking/PaymentConfirmationPage"; // 💡 Integrated custom payment module step

// Import CSS states dynamically based on wizard state
import '../css/booking.css';

const BookingWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Calendar, 2: Enhancements, 3: Guest Info, 4: Confirmation

    // State calculations
    const [bookingType, setBookingType] = useState('overnight');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guestDetails, setGuestDetails] = useState(null); // Saved tracking state container to buffer wizard data
    const [selectedEnhancements, setSelectedEnhancements] = useState({
        jacuzzi: { active: false, price: 0, name: 'Jacuzzi' },
        heater: { active: false, price: 0, name: 'Heater' },
        lpg: { active: false, price: 0, name: 'LPG' },
        pet: { active: false, price: 0, name: 'Pet Fee' }
    });

    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

    // Calculate days, nights, and base pricing rules
    let nights = 0;
    let days = 1;
    if (bookingType === 'overnight' && startDate && endDate) {
        nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        days = nights + 1;
    }
    const basePrice = bookingType === 'daytime' ? 6000 : nights * 6000;

    // Calculate enhancements allocation subtotal values
    const enhancementsTotal = Object.values(selectedEnhancements)
        .reduce((sum, item) => sum + (item.active ? item.price : 0), 0);

    const grandTotal = basePrice + enhancementsTotal;

    const updateEnhancement = (type, active, price, name) => {
        setSelectedEnhancements(prev => ({
            ...prev,
            [type]: { active, price, name }
        }));
    };

    const handleNextAction = () => {
        if (step === 1) setStep(2);
        else if (step === 2) setStep(3);
        else if (step === 3) {
            // Programmatically triggers the hidden internal submit button managed inside GuestInfoStep
            document.getElementById('hidden-submit-btn').click();
        }
    };

    // Buffer the validated form input values and push the user forward onto the final checkout confirmation block
    const handleGuestFormSubmit = (guestData) => {
        setGuestDetails(guestData);
        setStep(4); // Advance into the choice payment matrix layout window
    };

    // Fires the transaction package payload into the backend when they select options and click "Book Now"
    const handleFormFinalization = async (paymentOption) => {
        if (!guestDetails) return;

        const formatDateString = (dateObj) => {
            if (!dateObj) return null;
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const checkoutPayload = {
            guest: {
                prefix: guestDetails.prefix || "Mr.",
                firstName: guestDetails.firstName,
                lastName: guestDetails.lastName,
                email: guestDetails.email,
                birthdate: guestDetails.birthdate || null,
                nationality: guestDetails.nationality || "Filipino",
                countryCode: guestDetails.countryCode || "+63",
                phone: guestDetails.phone,
            },
            booking: {
                bookingType: bookingType,
                startDate: formatDateString(startDate),
                endDate: bookingType === 'daytime' ? formatDateString(startDate) : formatDateString(endDate),
                nights: nights,
                basePrice: basePrice,
                grandTotal: grandTotal,
                payment_method: paymentOption // Dynamically tag the database record as upfront or online scan
            },
            enhancements: Object.values(selectedEnhancements).map(item => ({
                name: item.name,
                price: item.price,
                active: item.active,
                quantity: 1
            }))
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(checkoutPayload),
            });

            const result = await response.json();

            if (result.success) {
                alert(`✨ Booking Successful! Your tracking confirmation number is: ${result.reference}`);
                navigate('/');
            } else {
                alert(`⚠️ Reservation Rejected: ${result.message}\n${JSON.stringify(result.errors || '')}`);
            }
        } catch (error) {
            console.error("API Communications Link Error:", error);
            alert("✕ Connection Failed: Unable to link seamlessly to the Laravel local API engine.");
        }
    };

    const isStepValid = () => {
        if (step === 1) return bookingType === 'daytime' ? !!startDate : (!!startDate && !!endDate);
        return true;
    };

    // If step 4 is reached, give it full screen access to render the unique template design layouts beautifully
    if (step === 4) {
        return (
            <PaymentConfirmationPage
                bookingSummary={{
                    guestName: `${guestDetails?.prefix || 'Mr.'} ${guestDetails?.firstName} ${guestDetails?.lastName}`,
                    phone: `${guestDetails?.countryCode || '+63'} ${guestDetails?.phone}`,
                    email: guestDetails?.email,
                    checkIn: startDate ? startDate.toLocaleDateString('en-US', options) : '--',
                    checkOut: endDate ? endDate.toLocaleDateString('en-US', options) : '--',
                    nights: nights,
                    days: days,
                    bookingType: bookingType,
                    basePrice: basePrice,
                    enhancementsList: Object.values(selectedEnhancements).filter(item => item.active),
                    totalAmount: grandTotal
                }}
                onPrevStep={() => setStep(3)}
                onFinalSubmit={handleFormFinalization}
            />
        );
    }

    return (
        <div className="booking-wizard-view">
            <header className="top-bar">
                <button className="back-btn" style={{ background: 'none', border: 'none' }} onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}>← BACK</button>
                <Link to="/" className="logo" style={{ color: 'inherit', textDecoration: 'none' }}>Casa Miranda</Link>
                <Link to="/" className="close-btn">✕</Link>
            </header>

            <nav className="progress-bar">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>{step > 1 && <span>✓ </span>}CALENDAR</div>
                <div className={`progress-line ${step > 1 ? 'active-line' : ''}`}></div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>{step > 2 && <span>✓ </span>}ENHANCEMENTS</div>
                <div className={`progress-line ${step > 2 ? 'active-line' : ''}`}></div>
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>{step > 3 && <span>✓ </span>}GUEST INFORMATION</div>
                <div className={`progress-line ${step > 3 ? 'active-line' : ''}`}></div>
                <div className={`progress-step ${step === 4 ? 'active' : ''}`}>CONFIRMATION</div>
            </nav>

            <main className="main-container">
                <section className="left-panel">
                    {step === 1 && <CalendarStep bookingType={bookingType} setBookingType={setBookingType} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />}
                    {step === 2 && <EnhancementsStep selectedEnhancements={selectedEnhancements} updateEnhancement={updateEnhancement} />}
                    {step === 3 && <GuestInfoStep onSubmitForm={handleGuestFormSubmit} />}

                    <div className="continue-btn-container" style={{ marginTop: '2rem' }}>
                        <button className="btn-dark" onClick={handleNextAction} disabled={!isStepValid()} style={{ opacity: isStepValid() ? 1 : 0.5, cursor: isStepValid() ? 'pointer' : 'not-allowed' }}>
                            {step === 1 ? 'CONTINUE TO ENHANCEMENTS' : step === 2 ? 'CONTINUE TO GUEST INFO' : 'CONTINUE TO PAYMENT'}
                        </button>
                    </div>
                </section>

                <aside className="right-panel">
                    <div className="stay-summary">
                        <div className="summary-section">
                            <h2>Stay Summary</h2>
                            <p>{startDate ? 'Dates selected' : 'Please select your dates.'}</p>
                        </div>
                        <div className="summary-section details-info">
                            <div className="summary-label">DATES</div>
                            <p>Arriving: {startDate ? startDate.toLocaleDateString('en-US', options) : '--'}</p>
                            {bookingType === 'overnight' && <p>Departing: {endDate ? endDate.toLocaleDateString('en-US', options) : '--'}</p>}
                            <p className="duration">{bookingType === 'daytime' ? '1 DAY RETREAT' : `${days} DAYS, ${nights} NIGHTS`}</p>

                            {step > 1 && (
                                <>
                                    <div className="summary-divider"></div>
                                    <div className="summary-label">ACCOMMODATION</div>
                                    <div className="breakdown-header">Casa Miranda</div>
                                    <div className="breakdown-row muted">
                                        <span>{bookingType === 'overnight' ? 'Overnight rate' : 'Daytime rate'}<br />15 pax</span>
                                        <span>₱{basePrice.toLocaleString()}</span>
                                    </div>
                                </>
                            )}

                            {step > 1 && enhancementsTotal > 0 && (
                                <>
                                    <div className="summary-divider"></div>
                                    <div className="breakdown-row total-row">
                                        <span className="summary-label" style={{ margin: 0 }}>ENHANCEMENTS</span>
                                        <span>₱{enhancementsTotal.toLocaleString()}</span>
                                    </div>
                                    {Object.values(selectedEnhancements).map(item => item.active && (
                                        <div key={item.name} className="breakdown-row muted">
                                            <span>{item.name}</span>
                                            <span>₱{item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="summary-section">
                            <div className="total-header">
                                <h2>Total</h2>
                                <div className="total-price">₱{grandTotal.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* ── FIXED: SCALED DOWN WIZARD FOOTER COPYRIGHT NOTICE ── */}
            <footer style={{ padding: '2rem' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>
                    © 2026 Casa Miranda. All Rights Reserved
                </div>
            </footer>
        </div>
    );
};

export default BookingWizard;