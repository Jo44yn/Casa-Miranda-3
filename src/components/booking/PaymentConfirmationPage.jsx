import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmationPage = ({ bookingSummary, onPrevStep, onFinalSubmit }) => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(''); // 'upfront' or 'online'
    const [consentChecked, setConsentChecked] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const {
        guestName,
        phone,
        email,
        checkIn,
        checkOut,
        nights,
        days,
        bookingType,
        basePrice,
        enhancementsList,
        totalAmount
    } = bookingSummary;

    // Calculate downpayment totals dynamically (50% of booking absolute total)
    const downpaymentAmount = totalAmount * 0.5;
    const remainingBalance = totalAmount - downpaymentAmount;

    const handleBookNowSubmit = async (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            alert("Please select a preferred option to fulfill your transaction route.");
            return;
        }
        if (!consentChecked) {
            alert("Please confirm your consent to the resort terms to continue.");
            return;
        }

        setSubmitting(true);
        await onFinalSubmit(paymentMethod);
        setSubmitting(false);
    };

    return (
        <>
            {/* ── TOP NAV HEADER BAR ── */}
            <header className="top-bar">
                <button type="button" className="back-btn" onClick={onPrevStep}>← BACK</button>
                <div className="logo">Casa Miranda</div>
                <button type="button" className="close-btn" onClick={() => navigate('/')}>✕</button>
            </header>

            {/* ── TRACKER BREADCRUMBS INDICATOR BAR ── */}
            <nav className="progress-bar">
                <div className="progress-step"><span>✓ </span>CALENDAR</div>
                <div className="progress-line active-line"></div>
                <div className="progress-step"><span>✓ </span>ENHANCEMENTS</div>
                <div className="progress-line active-line"></div>
                <div className="progress-step"><span>✓ </span>GUEST INFORMATION</div>
                <div className="progress-line active-line"></div>
                <div className="progress-step active">CONFIRMATION</div>
            </nav>

            {/* ── MAIN CONTENT SPLIT GRID ── */}
            <div className="main-container">

                {/* LEFT PANEL */}
                <section className="left-panel">
                    <form onSubmit={handleBookNowSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
                        <h1>Payment Confirmation</h1>

                        {/* GUEST DETAILS PANEL MODULE */}
                        <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-dark)' }}>
                            <div className="section-title">GUEST INFORMATION</div>
                            <div className="form-row" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                <div className="form-group col-half">
                                    <label className="form-label">Name</label>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{guestName || 'Not Provided'}</div>
                                </div>
                                <div className="form-group col-half">
                                    <label className="form-label">Contact</label>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{phone || 'Not Provided'}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>{email}</div>
                                </div>
                            </div>
                            <button type="button" className="btn-inline-link" style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit', fontSize: '0.8rem' }} onClick={onPrevStep}>
                                Edit Details
                            </button>
                        </div>

                        {/* PAYMENT METHOD PICKER PANELS */}
                        <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-dark)' }}>
                            <div className="section-title">PAYMENT INFORMATION</div>
                            <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Select your preferred transaction fulfillment type:</p>

                            <div className="payment-options-matrix-row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* ── UPFRONT OPTION CARD WITH 50% POLICY NOTICE ── */}
                                <label className={`payment-method-selector-card ${paymentMethod === 'upfront' ? 'selected' : ''}`} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', display: 'flex', gap: '1.5rem', cursor: 'pointer', backgroundColor: paymentMethod === 'upfront' ? 'var(--bg-active)' : 'transparent' }}>
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        value="upfront"
                                        checked={paymentMethod === 'upfront'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginTop: '3px' }}
                                    />
                                    <div className="method-meta">
                                        <span className="method-main-title" style={{ display: 'block', fontWeight: '500', fontSize: '0.9rem' }}>Pay Upfront with 50% Security Deposit</span>
                                        <span className="method-sub-desc" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                            Settle a 50% downpayment via GCash QR code below to secure dates. Settle remaining 50% balance at resort front desk upon arrival.
                                        </span>
                                    </div>
                                </label>

                                <label className={`payment-method-selector-card ${paymentMethod === 'online' ? 'selected' : ''}`} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', display: 'flex', gap: '1.5rem', cursor: 'pointer', backgroundColor: paymentMethod === 'online' ? 'var(--bg-active)' : 'transparent' }}>
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        value="online"
                                        checked={paymentMethod === 'online'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginTop: '3px' }}
                                    />
                                    <div className="method-meta">
                                        <span className="method-main-title" style={{ display: 'block', fontWeight: '500', fontSize: '0.9rem' }}>Pay Online (Instant Full Verification)</span>
                                        <span className="method-sub-desc" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Scan our secure QR hub using GCash or digital banking apps to settle ledger rows instantly.</span>
                                    </div>
                                </label>
                            </div>

                            {/* ── DYNAMIC UPFRONT SECURITY DEPOSIT RECEIPT MODULE WITH QR CODE ── */}
                            {paymentMethod === 'upfront' && (
                                <div className="deposit-breakdown-overlay" style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-dark)', backgroundColor: 'var(--bg-card, #fcfbf9)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0 }}>
                                        Downpayment Confirmation Receipt
                                    </h4>

                                    {/* ⚠️ SAME-DAY PAYMENT TIMEOUT WARNING NOTICE */}
                                    <div style={{ backgroundColor: '#fff5f5', borderLeft: '4px solid #e53e3e', padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#c53030', fontWeight: '500', borderRadius: '4px' }}>
                                        ATTENTION: To secure your reservation, the 50% downpayment must be completed within the day. Unverified holds will auto-expire tonight.
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'between', width: '100%' }}>
                                            <span>Total Reservation Value:</span>
                                            <span style={{ fontWeight: '500', marginLeft: 'auto' }}>₱{totalAmount.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'between', width: '100%', color: '#b83b3b', fontWeight: '600' }}>
                                            <span>Required Downpayment (50%):</span>
                                            <span style={{ marginLeft: 'auto' }}>₱{downpaymentAmount.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'between', width: '100%', color: 'var(--text-muted)' }}>
                                            <span>Balance Due Upon Entry:</span>
                                            <span style={{ marginLeft: 'auto' }}>₱{remainingBalance.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* INTEGRATED GCASH QR HUB FOR UPFRONT DOWNPAYMENTS */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', padding: '1rem', borderTop: '1px dashed var(--border-color)' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: '500', textAlign: 'center' }}>Scan to Settle Downpayment (₱{downpaymentAmount.toLocaleString()})</div>
                                        <div className="qr-wrapper-frame" style={{ maxWidth: '180px', border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#fff' }}>
                                            <img
                                                src={new URL('../../assets/6f598b75-3122-47f3-b8d2-93ce180e6337.jfif', import.meta.url).href}
                                                alt="Secure GCash Deposit QR"
                                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DYNAMIC QR DISPLAY AREA (FULL REVENUE TRANSACTION) */}
                            {paymentMethod === 'online' && (
                                <div className="gcash-qr-display-container-overlay" style={{ marginTop: '1.5rem', padding: '2rem', border: '1px dashed var(--border-dark)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="gcash-instructions-block" style={{ textAlign: 'center' }}>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Scan to Settle Full Account Balance</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Open your GCash or local banking app, scan the secure merchant code below, and input the exact account balance value total before saving.</p>
                                    </div>
                                    <div className="qr-wrapper-frame" style={{ maxWidth: '240px', border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#fff' }}>
                                        <img
                                            src={new URL('../../assets/6f598b75-3122-47f3-b8d2-93ce180e6337.jfif', import.meta.url).href}
                                            alt="Secure QR Gateway"
                                            className="gcash-embedded-image"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CONSENT ROW */}
                        <div className="consent-row" style={{ marginBottom: '1rem' }}>
                            <input
                                type="checkbox"
                                className="consent-checkbox"
                                id="consent-check"
                                required
                                checked={consentChecked}
                                onChange={(e) => setConsentChecked(e.target.checked)}
                            />
                            <label className="consent-text" htmlFor="consent-check" style={{ cursor: 'pointer' }}>
                                I consent to receive updates and agree to the resort guidelines, processing rules, and booking policies established by Casa Miranda Management.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn-dark"
                            disabled={submitting}
                        >
                            {submitting ? "PROCESSING TRANSACTION..." : "BOOK NOW"}
                        </button>
                    </form>
                </section>

                {/* RIGHT SIDE PANEL */}
                <aside className="right-panel">
                    <div className="stay-summary">
                        <div className="summary-section">
                            <h2>Stay Summary</h2>
                            <p>Dates selected</p>
                        </div>

                        <div className="summary-section details-info">
                            <div className="summary-label">DATES</div>
                            <p>Arriving: {checkIn}</p>
                            {bookingType === 'overnight' && <p>Departing: {checkOut}</p>}
                            <p className="duration">{bookingType === 'daytime' ? '1 DAY RETREAT' : `${days} DAYS, ${nights} NIGHTS`}</p>

                            <div className="summary-divider"></div>

                            <div className="summary-label">ACCOMMODATION</div>
                            <div className="breakdown-header">Casa Miranda</div>
                            <div className="breakdown-row muted">
                                <span>{bookingType === 'overnight' ? 'Overnight rate' : 'Daytime rate'}<br />15 pax max</span>
                                <span>₱{basePrice.toLocaleString()}</span>
                            </div>

                            {enhancementsList && enhancementsList.length > 0 && (
                                <>
                                    <div className="summary-divider"></div>
                                    <div className="breakdown-row total-row">
                                        <span className="summary-label" style={{ margin: 0 }}>ENHANCEMENTS</span>
                                        <span>₱{enhancementsList.reduce((acc, current) => acc + current.price, 0).toLocaleString()}</span>
                                    </div>
                                    {enhancementsList.map((eh, i) => (
                                        <div key={i} className="breakdown-row muted">
                                            <span style={{ textTransform: 'capitalize' }}>{eh.name}</span>
                                            <span>₱{eh.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="summary-section">
                            <div className="total-header">
                                <h2>Total</h2>
                                <div className="total-price">₱{totalAmount.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default PaymentConfirmationPage;