import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-top">
                <div className="footer-left">
                    <div className="logo-footer">Casa Miranda</div>
                    {/* ── UPDATED RESORT SHORT PROPERTY OVERVIEW ── */}
                    <p>An exclusive private pool resort escape tailored for unforgettable group gatherings, ultimate relaxation, and premium recreational getaways.</p>
                    <div className="social-icons">
                        {/* ── UPDATED: Facebook Link Gateway ── */}
                        <a
                            href="https://www.facebook.com/CasaMiranda032826"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Casa Miranda on Facebook"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="contact-info">
                        <span className="footer-label">CONTACTS</span>
                        <p>+63 917 800 1234</p>
                        <p>casamiranda@mail.com</p>
                    </div>
                    {/* ── UPDATED RESORT STREET ADDRESS SPECIFICS ── */}
                    <div className="address-info">
                        <p>Anime St. Block 8 Lot 10</p>
                        <p>Bucal, Calamba, Philippines, 4027</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div>© 2026 Casa Miranda. All Rights Reserved</div>
                <div className="footer-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Use</Link>
                    <Link to="/admin/login">Admin</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;