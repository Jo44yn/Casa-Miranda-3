import React from 'react';
// Import your actual resort photo directly from your assets folder
import heroImage from '../assets/DSC_0008.JPG';

const Hero = () => {
    return (
        <section className="hero">
            <img
                src={heroImage}
                alt="Casa Miranda Private Pool Resort"
                className="hero-bg"
                style={{ objectPosition: 'center 65%' }} // Shifts the alignment slightly to frame the pool beautifully
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <span className="hero-subtitle">WELCOME TO</span>
                <h1 className="hero-title">A Sanctuary of Serenity</h1>
            </div>
        </section>
    );
};

export default Hero;