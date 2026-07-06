import React, { useEffect } from 'react';
import '../css/amenities.css';

// ── IMPORT REAL RESORT PHOTOGRAPHY FROM ASSETS ──
import heroBgNight from '../assets/DSC_0073.JPG';
import imgBilliardsDark from '../assets/IMG_4731.jpg';
import imgBilliardsLight from '../assets/DSC_0050.JPG';
import imgKaraokeMedia from '../assets/DSC_0026.JPG';

const AmenitiesPage = () => {
    // Ensure the page loads scrolled smoothly back to the top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="amenities-page-wrapper">
            <main>
                {/* Hero Section */}
                <section className="hero">
                    <img src={heroBgNight} alt="Casa Miranda Amenities Overview" className="hero-bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="hero-overlay"></div>
                </section>

                {/* Overlapping Section with Dark Billiards Shot */}
                <section className="overlapping-section">
                    <div className="overlapping-image-wrapper">
                        <img
                            src={imgBilliardsDark}
                            alt="Casa Miranda Private Entertainment Hub"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </section>

                {/* Amenities Intro Copy */}
                <section className="amenities-intro">
                    <h1>Billiards & Music Room</h1>
                    <p>At Casa Miranda, entertainment is entirely private. Our dedicated recreation wing combines a classic billiards room with a modern sound and media lounge, offering the perfect indoor spaces to unwind, socialize, and sing your heart out without any outside interruptions during your stay.</p>
                </section>

                {/* ── AMENITIES GALLERY: ADJUSTED LIGHT BILLIARDS FOCUS ── */}
                <section className="amenities-gallery">
                    <div className="gallery-img">
                        <img
                            src={imgBilliardsLight}
                            alt="Professional Billiards Table"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
                        />
                    </div>
                    <div className="gallery-img">
                        <img
                            src={imgKaraokeMedia}
                            alt="Karaoke Smart TV Sound Lounge"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </section>

                {/* Additional Details Band */}
                <section className="text-holder-band">
                    <h3>Resort Guidelines & Details</h3>
                    <p>Both recreational spaces are fully available to you and your party throughout your booking window. To ensure a pristine experience, we kindly ask that guests keep all refreshments on the side bar tables and handle the professional-grade sound hardware and billiards equipment with care.</p>
                </section>
            </main>
        </div>
    );
};

export default AmenitiesPage;