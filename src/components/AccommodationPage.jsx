import React, { useState, useEffect, useRef } from 'react';
import '../css/accommodation.css';

// Import resort photography from assets
import heroBgNight from '../assets/DSC_0073.JPG';
import imgKitchen from '../assets/DSC_0017.JPG';
import imgLiving from '../assets/DSC_0024.JPG';
import imgBedroom from '../assets/DSC_0021.JPG';
import imgBathroom from '../assets/DSC_0022.JPG';

const slidesData = [
    { id: 1, src: imgBedroom, alt: "Pool View Guest Room" },
    { id: 2, src: imgBathroom, alt: "Modern Bathroom and Walk-in Shower" },
    { id: 3, src: imgLiving, alt: "Spacious Indoor Living Lounge" },
    { id: 4, src: imgKitchen, alt: "Fully Equipped Kitchen and Dining Setup" },
];

const AccommodationPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3);
    const slideRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getVisibleSlidesCount = () => {
            if (window.innerWidth > 1024) return 3;
            if (window.innerWidth > 768) return 2;
            return 1;
        };

        const handleResize = () => setVisibleSlides(getVisibleSlidesCount());
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = slidesData.length - visibleSlides;
    const safeIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

    const nextSlide = () => { if (safeIndex < maxIndex) setCurrentIndex(prev => prev + 1); };
    const prevSlide = () => { if (safeIndex > 0) setCurrentIndex(prev => prev - 1); };

    const slideWidth = slideRef.current ? slideRef.current.clientWidth : 0;
    const gap = 24;
    const translateX = safeIndex * (slideWidth + gap);

    return (
        <div className="accommodation-page-wrapper">
            <main>
                <section className="hero">
                    <img src={heroBgNight} alt="Casa Miranda Pool at Night" className="hero-bg" />
                    <div className="hero-overlay"></div>
                </section>

                <section className="features-bar">
                    <div className="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                        <span>High-Speed WiFi</span>
                    </div>
                    <div className="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        <span>Air-conditioned Rooms</span>
                    </div>
                    <div className="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        <span>Clean Environment</span>
                    </div>
                    <div className="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        <span>Room Service</span>
                    </div>
                </section>

                <section className="section-intro">
                    <h2>Accommodations</h2>
                    <p>Casa Miranda provides beautifully appointed overnight spaces crafted for exceptional comfort. Each room features full climate control, luxury bedding, and elegant layouts to ensure a peaceful night's rest for your entire party during your private stay.</p>
                </section>

                <section className="slider-wrapper">
                    <div className="slider-container">
                        <button className="slider-btn prev-btn" onClick={prevSlide} style={{ opacity: safeIndex === 0 ? '0.2' : '1', cursor: safeIndex === 0 ? 'default' : 'pointer' }}>‹</button>
                        <div className="slider-track" style={{ transform: `translateX(-${translateX}px)` }}>
                            {slidesData.map((slide, idx) => (
                                <div className="slide" key={slide.id} ref={idx === 0 ? slideRef : null}>
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="slider-btn next-btn" onClick={nextSlide} style={{ opacity: safeIndex === maxIndex ? '0.2' : '1', cursor: safeIndex === maxIndex ? 'default' : 'pointer' }}>›</button>
                    </div>
                </section>

                <section className="split-section">
                    <div className="split-image">
                        <img src={imgKitchen} alt="Casa Miranda Modern Kitchen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="split-content">
                        <h2>Kitchen</h2>
                        <p>Prepare family feasts or quick snacks with ease in our fully functional, modern kitchen space. Equipped with premium appliances, ample countertop real estate, and essential cookware, it offers everything you need to feel right at home during your private booking.</p>
                    </div>
                </section>

                <section className="split-section reverse">
                    <div className="split-content">
                        <h2>Living</h2>
                        <p>Gather together in an expansive living lounge designed for ultimate relaxation. Featuring comfortable seating, generous natural light, and smooth transitions out to the pool deck area, this open layout serves as the perfect indoor hub for storytelling and group bonding.</p>
                    </div>
                    <div className="split-image">
                        <img src={imgLiving} alt="Casa Miranda Living Room Lounge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </section>

                <section className="dark-band">
                    <p>Whether you're hosting an intimate family reunion or a restful weekend retreat, our exclusive spaces blend private recreation with residential luxury to elevate your escape.</p>
                </section>
            </main>
        </div>
    );
};

export default AccommodationPage;