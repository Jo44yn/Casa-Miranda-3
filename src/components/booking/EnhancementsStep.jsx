import React from 'react';

// ── IMPORT REAL RESORT ENHANCEMENT ASSETS ──
import imgJacuzzi from '../../assets/IMG_4709.jpg';
import imgHeater from '../../assets/DSC_0019.JPG';
import imgLPG from '../../assets/images (1).jfif';

const EnhancementsStep = ({ selectedEnhancements, updateEnhancement }) => {
    return (
        <>
            <h1>Curate your stay</h1>
            <p className="subtitle">Elevate your experience at Casa Miranda with our additions</p>

            <div className="enhancements-grid">
                {/* ── JACUZZI CARD ── */}
                <div className="card">
                    <div className="card-img-placeholder">
                        <img
                            src={imgJacuzzi}
                            alt="Casa Miranda Active Warm Jacuzzi Jets"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h3>Jacuzzi</h3>
                            <div className="price">₱1,000</div>
                        </div>
                        <p className="card-desc">Indulge in absolute relaxation by adding warm jacuzzi jets to your swim session—perfect for unwinding under the stars.</p>
                        <div className="card-action enhancement-toggle" onClick={() => updateEnhancement('jacuzzi', !selectedEnhancements.jacuzzi.active, 1000, 'Jacuzzi')}>
                            <div className="checkbox">{selectedEnhancements.jacuzzi.active ? '✓' : ''}</div>
                            <span className="checkbox-text">{selectedEnhancements.jacuzzi.active ? 'ADDED TO STAY' : 'ADD TO STAY'}</span>
                        </div>
                    </div>
                </div>

                {/* ── HEATER CARD ── */}
                <div className="card">
                    <div className="card-img-placeholder">
                        <img
                            src={imgHeater}
                            alt="Casa Miranda Comfortable Heated Swimming Pool"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h3>Heater</h3>
                            <div className="price">₱800</div>
                        </div>
                        <p className="card-desc">Keep the swimming pool at a comfortable, warm temperature during chilly evening swims or early morning gatherings.</p>
                        <div className="card-action enhancement-toggle" onClick={() => updateEnhancement('heater', !selectedEnhancements.heater.active, 800, 'Heater')}>
                            <div className="checkbox">{selectedEnhancements.heater.active ? '✓' : ''}</div>
                            <span className="checkbox-text">{selectedEnhancements.heater.active ? 'ADDED TO STAY' : 'ADD TO STAY'}</span>
                        </div>
                    </div>
                </div>

                {/* ── LPG CARD ── */}
                <div className="card">
                    <div className="card-img-placeholder">
                        <img
                            src={imgLPG}
                            alt="Standard LPG gas cylinder tank"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#ffffff' }}
                        />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h3>LPG</h3>
                            <div className="price">₱300 / ₱700</div>
                        </div>
                        <p className="card-desc">Access our heavy-duty kitchen cooking range. Select a continuous tank rental period that aligns perfectly with your group's stay.</p>
                        <div className="card-action">
                            <select
                                className="dropdown"
                                value={selectedEnhancements.lpg.price}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    updateEnhancement('lpg', val > 0, val, val === 300 ? 'LPG 11 hrs' : 'LPG 21-22 hrs');
                                }}
                            >
                                <option value="0">- SELECT -</option>
                                <option value="300">11 hrs (₱300)</option>
                                <option value="700">21-22 hrs (₱700)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── PET FEE CARD ── */}
                <div className="card">
                    <div className="card-img-placeholder">
                        <img
                            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop"
                            alt="Happy pet dog"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h3>Pet Fee</h3>
                            <div className="price">₱300 / ₱500</div>
                        </div>
                        <p className="card-desc">Bring your furry family members along! Covers structural sanitation routines to keep our private villa safe and hygienic.</p>
                        <div className="card-action">
                            <select
                                className="dropdown"
                                value={selectedEnhancements.pet.price}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    updateEnhancement('pet', val > 0, val, val === 300 ? 'Small Pet Fee' : 'Big Pet Fee');
                                }}
                            >
                                <option value="0">- SELECT -</option>
                                <option value="300">Small Pet (₱300)</option>
                                <option value="500">Big Pet (₱500)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnhancementsStep;