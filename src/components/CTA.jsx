import React, { useState } from 'react';
// ── IMPORT REAL RESORT BACKGROUND IMAGERY ──
import ctaBgImage from '../assets/DSC_0077.JPG';

const CTA = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Clean transition style to turn the button background white on hover
    const btnStyle = {
        transition: 'all 0.25s ease-in-out',
        backgroundColor: isHovered ? '#ffffff' : 'transparent',
        color: isHovered ? '#1a1a1a' : 'inherit',
        borderColor: '#ffffff',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none'
    };

    // Background overlay styles to keep your text perfectly readable over the image
    const sectionStyle = {
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(26, 24, 20, 0.75), rgba(26, 24, 20, 0.75)), url(${ctaBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff',
        textAlign: 'center'
    };

    return (
        <section className="cta-section" style={sectionStyle}>
            <h2>Ready to Experience Casa Miranda?</h2>
            <p>Your exclusive private pool getaway is just a click away. Secure your dates today and prepare for a premium resort experience tailored entirely to your group.</p>

            {/* ── WHITE HOVER BUTTON ── */}
            <a
                href="/booking"
                className="btn-outline"
                style={btnStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Book your stay <span>→</span>
            </a>
        </section>
    );
};

export default CTA;