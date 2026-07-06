import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`top-nav ${isScrolled ? 'scrolled' : ''}`} id="main-nav">
            <nav className="nav-links">
                <Link to="/">HOME</Link>
                <Link to="/accommodation">ACCOMMODATION</Link>
                <Link to="/amenities">AMENITIES</Link>
                <Link to="/contact">CONTACT</Link>
            </nav>

            {/* ── EDIT HERE TO ADJUST LOGO SIZE INLINE ── */}
            <Link
                to="/"
                className="logo"
                style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: '1.9rem' /* Adjusted from default to make it smaller */
                }}
            >
                Casa Miranda
            </Link>

            <Link to="/booking" className="btn-primary">Book your stay</Link>
        </header>
    );
};

export default Header;