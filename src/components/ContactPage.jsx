import React, { useState, useEffect } from 'react';
import '../css/contact.css';

// ── IMPORT REAL RESORT HALLWAY VIEW FOR HERO BACKGROUND ──
import heroBgHallway from '../assets/DSC_0077.JPG';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Inquiry Submitted: ", formData);
        alert("Thank you for your message! Our concierge will get back to you shortly.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page-wrapper">
            <main>
                {/* ── UPDATED HERO BACKGROUND ONLY ── */}
                <section
                    className="page-header"
                    style={{
                        position: 'relative',
                        backgroundImage: `url(${heroBgHallway})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        padding: '8rem 2rem 6rem 2rem',
                        color: '#ffffff'
                    }}
                >
                    {/* Dark overlay to maintain high text readability over the lighting */}
                    <div
                        className="hero-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.45)',
                            zIndex: 1
                        }}
                    ></div>

                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
                        <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Contact Us at Casa Miranda</h1>
                        <p style={{ maxWidth: '600px', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: '1.5' }}>
                            Have questions about bookings, amenities, or special events? Reach out to our concierge team and we will help you plan your perfect private getaway.
                        </p>
                    </div>
                </section>

                <section className="contact-section">
                    <div className="contact-grid">
                        <div className="contact-form-box">
                            <h2>Send an inquiry</h2>
                            <form onSubmit={handleSubmit} className="inquiry-form">
                                <div className="form-group">
                                    <label htmlFor="name">NAME</label>
                                    <input type="text" id="name" name="name" placeholder="Your full name" required value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">EMAIL</label>
                                    <input type="email" id="email" name="email" placeholder="Email address" required value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">MESSAGE</label>
                                    <textarea id="message" name="message" placeholder="How may we assist you?" rows="4" required value={formData.message} onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn-link">Submit Inquiry</button>
                            </form>
                        </div>

                        <div className="contact-info">
                            <h2>Concierge Services</h2>
                            <div className="info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <div>
                                    <span className="info-label">Direct line</span>
                                    <p>+63 917 800 1234</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <div>
                                    <span className="info-label">Email address</span>
                                    <p>casamiranda@mail.com</p>
                                </div>
                            </div>

                            <h2 className="mt-4">Address</h2>
                            <div className="info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path></svg>
                                <div>
                                    <span className="info-label">Location</span>
                                    <p>Anime St. Block 8 Lot 10, Bucal, Calamba, Philippines, 4027</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="map-section">
                    <iframe src="https://maps.google.com/maps?q=Bucal,%20Calamba,%20Laguna&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="500" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Casa Miranda Location Map"></iframe>
                </section>
            </main>
        </div>
    );
};

export default ContactPage;