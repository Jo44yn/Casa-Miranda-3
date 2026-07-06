import React, { useEffect } from 'react';
import '../css/legal.css';

const TermsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="legal-content">
            <h1>Terms of Use</h1>
            <p className="last-updated">Last Updated: June 2026</p>

            <h2>1. Welcome to Casa Miranda</h2>
            <p>By accessing our website and booking a stay at Casa Miranda, you agree to be bound by these Terms of Use and our policies. Please read them carefully.</p>

            <h2>2. Booking & Payment Policies</h2>
            <p>All bookings made through our website are subject to availability. A valid payment method is required to secure your reservation. Full payment or a deposit may be charged at the time of booking depending on the rate selected. All prices are in Philippine Peso (PHP) unless otherwise stated.</p>

            <h2>3. Check-In and Check-Out</h2>
            <ul>
                <li><strong>Check-in time:</strong> 6:00 AM</li>
                <li><strong>Check-out time:</strong> 12:00 PM (Noon)</li>
            </ul>
            <p>Late check-outs are subject to availability and may incur additional charges. Guests are required to present valid government-issued identification upon arrival.</p>

            <h2>4. Cancellation and Refunds</h2>
            <p>Cancellations made up to 7 days before the scheduled arrival date are fully refundable. Cancellations made within 7 days of arrival, or no-shows, will be charged the full amount of the reservation. Special promotional rates may be strictly non-refundable.</p>

            <h2>5. Resort Rules</h2>
            <p>To ensure a serene sanctuary for all guests, we ask that you respect our property and other visitors. Smoking is prohibited in all indoor areas. Pets are not allowed unless explicitly stated in your booking arrangement. Casa Miranda reserves the right to evict any guest violating these rules without refund.</p>

            <h2>6. Liability</h2>
            <p>Casa Miranda is not liable for any loss, damage, or theft of personal property. Guests use the resort's facilities, including the pool and amenities, at their own risk.</p>
        </main>
    );
};

export default TermsPage;