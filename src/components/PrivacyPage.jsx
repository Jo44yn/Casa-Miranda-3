import React, { useEffect } from 'react';
import '../css/legal.css';

const PrivacyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="legal-content">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: June 2026</p>

            <h2>1. Information We Collect</h2>
            <p>At Casa Miranda, we respect your privacy. We only collect information that is necessary to fulfill your booking and improve your experience. This may include your name, email address, phone number, billing address, and payment details when you make a reservation or submit an inquiry.</p>

            <h2>2. How We Use Your Data</h2>
            <p>The information we collect is used to:</p>
            <ul>
                <li>Process and confirm your resort reservations.</li>
                <li>Communicate with you regarding your stay, special requests, or inquiries.</li>
                <li>Process payments securely through our financial partners.</li>
                <li>Improve our website functionality and customer service.</li>
            </ul>

            <h2>3. Data Protection and Security</h2>
            <p>We implement a variety of standard security measures to maintain the safety of your personal information. All sensitive payment data is transmitted via Secure Socket Layer (SSL) technology and encrypted into our payment gateway providers' database, accessible only by authorized personnel.</p>

            <h2>4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to request access to the personal data we hold about you. You may also request that we correct or delete any inaccurate information. If you have any questions or concerns about our privacy practices, please contact us at casamiranda@mail.com.</p>
        </main>
    );
};

export default PrivacyPage;