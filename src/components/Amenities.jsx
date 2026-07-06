import React from 'react';

// ── IMPORT REAL RESORT AMENITY PHOTOGRAPHY ──
import imgBilliards from '../assets/DSC_0051.JPG';
import imgMusicRoom from '../assets/DSC_0026.JPG';

const Amenities = () => {
    return (
        <section className="amenities-section">
            <div className="section-header">
                <h2>Amenities</h2>
                <p>From lively recreation to premium relaxation, Casa Miranda features curated luxury spaces designed to keep your guests fully entertained throughout your private stay.</p>
                <a href="#" className="link-underline">View Amenities</a>
            </div>

            <div className="amenities-grid">
                {/* ── BILLIARDS CARD ── */}
                <div className="amenity-card">
                    <div className="amenity-img-placeholder">
                        <img
                            src={imgBilliards}
                            alt="Casa Miranda Professional Billiards Table"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <h3>Billiards</h3>
                    <p>Unwind and enjoy friendly competition over a game of pool on our professional-grade billiards table, situated in an open, stylishly lit recreational space.</p>
                </div>

                {/* ── MUSIC ROOM CARD ── */}
                <div className="amenity-card">
                    <div className="amenity-img-placeholder">
                        <img
                            src={imgMusicRoom}
                            alt="Casa Miranda Karaoke and Entertainment Sound Lounge"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <h3>Music Room</h3>
                    <p>Sing your heart out or lounge with premium sound in our dedicated entertainment music room, complete with high-quality audio equipment and comfortable seating.</p>
                </div>
            </div>
        </section>
    );
};

export default Amenities;