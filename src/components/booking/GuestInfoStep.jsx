import React, { useState } from 'react';

const GuestInfoStep = ({ onSubmitForm }) => {
    const [bookingType, setBookingType] = useState('myself');
    const [formData, setFormData] = useState({
        prefix: '', firstName: '', lastName: '', birthdate: '',
        nationality: '', email: '', confirmEmail: '', countryCode: '', phone: '', requests: ''
    });
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email !== formData.confirmEmail) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        onSubmitForm({ ...formData, bookingType });
    };

    // Limits entry to digits only and cuts off after 10 numbers
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length <= 10) {
            setFormData({ ...formData, phone: value });
        }
    };

    return (
        <>
            <h1>Confirm your stay</h1>
            <div className="section-title">GUEST INFORMATION</div>

            <div className="booking-type-toggle">
                <div className={`toggle-btn ${bookingType === 'myself' ? 'active' : ''}`} onClick={() => setBookingType('myself')}>I'm booking for myself</div>
                <div className={`toggle-btn ${bookingType === 'someone-else' ? 'active' : ''}`} onClick={() => setBookingType('someone-else')}>I'm booking for someone else</div>
            </div>

            <form id="guest-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-1">
                        <label className="form-label">Prefix</label>
                        <select className="form-input" value={formData.prefix} onChange={(e) => setFormData({ ...formData, prefix: e.target.value })} required>
                            <option value="">Select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-input" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    </div>
                    <div className="form-group col-2">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-input" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-half">
                        <label className="form-label">Birthdate</label>
                        <input type="date" className="form-input" value={formData.birthdate} onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })} required />
                    </div>
                    <div className="form-group col-half">
                        <label className="form-label">Nationality</label>
                        <select className="form-input" value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} required>
                            <option value="">Select Nationality</option>
                            {["Filipino", "American", "Australian", "British", "Canadian", "Japanese", "Korean"].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-half">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="form-group col-half">
                        <label className="form-label">Re-type Email</label>
                        <input type="email" className={`form-input ${emailError ? 'error' : ''}`} placeholder="Re-type Email Address" value={formData.confirmEmail} onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })} required />
                        {emailError && <span className="error-msg" style={{ display: 'block' }}>Emails do not match</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-1">
                        <label className="form-label">Contact Number</label>
                        <select className="form-input" value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} required>
                            <option value="">Code</option>
                            <option value="+63">+63 (PH)</option>
                            <option value="+1">+1 (US)</option>
                        </select>
                    </div>
                    <div className="form-group col-2">
                        {/* ── PHONE INPUT: ENFORCED 10-DIGIT MAX LENGTH ── */}
                        <input
                            type="tel"
                            className="form-input"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                </div>

                <div className="section-title" style={{ marginTop: '3rem' }}>ADDITIONAL DETAILS</div>

                {/* ── TEXTAREA: STYLED PLACEHOLDER ONLY (TYPED TEXT STAYS 100% OPAQUE) ── */}
                <textarea
                    className="textarea-input custom-placeholder"
                    placeholder="Please note your special requests here."
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    style={{
                        fontFamily: 'inherit',
                        width: '100%'
                    }}
                ></textarea>

                {/* Inline structural style block target to ensure pseudo-elements map correctly across browsers */}
                <style>{`
                    .custom-placeholder::placeholder {
                        color: var(--text-muted, #a09b95);
                        opacity: 0.65;
                    }
                `}</style>

                <button type="submit" style={{ display: 'none' }} id="hidden-submit-btn" />
            </form>
        </>
    );
};

export default GuestInfoStep;