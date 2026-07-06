import React, { useState, useEffect, useRef } from 'react';

// ── FIXED RELATIVE PATHS (Moving one folder up to 'src' then into 'assets') ──
import imgKitchen from '../assets/DSC_0017.JPG';
import imgGrill from '../assets/DSC_0018.JPG';
import imgBedroomPool from '../assets/DSC_0021.JPG';
import imgBathroom from '../assets/DSC_0022.JPG';
import imgLounge from '../assets/DSC_0024.JPG';
import imgBunkBeds from '../assets/IMG_4723.jpg';

const slidesData = [
    { id: 1, src: imgKitchen, alt: "Fully Equipped Kitchen and Dining Setup" },
    { id: 2, src: imgGrill, alt: "Outdoor BBQ Grill Station" },
    { id: 3, src: imgBedroomPool, alt: "Pool View Guest Room" },
    { id: 4, src: imgBathroom, alt: "Modern Bathroom and Walk-in Shower" },
    { id: 5, src: imgLounge, alt: "Spacious Indoor Living Lounge" },
    { id: 6, src: imgBunkBeds, alt: "Family Loft Bunk Bedrooms" },
];

const ExperienceSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3);
    const slideRef = useRef(null);

    const getVisibleSlidesCount = () => {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    };

    useEffect(() => {
        const handleResize = () => {
            setVisibleSlides(getVisibleSlidesCount());
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = slidesData.length - visibleSlides;
    const safeIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

    const nextSlide = () => {
        if (safeIndex < maxIndex) setCurrentIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (safeIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const slideWidth = slideRef.current ? slideRef.current.clientWidth : 0;
    const gap = 24;
    const translateX = safeIndex * (slideWidth + gap);

    return (
        <section className="experience-section">
            <div className="section-header">
                <span
                    className="subtitle"
                    style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '100%',
                        margin: '0 auto 1rem auto',
                        textAlign: 'center'
                    }}
                >
                    BUCAL, CALAMBA CITY
                </span>
                <h2>Experience Casa Miranda</h2>
                <p>Enjoy the ultimate luxury of a fully private resort getaway in Bucal. Designed for families, friends, and special gatherings, our exclusive property features a pristine swimming pool, premium lounge amenities, and comfortable modern spaces tailored for total relaxation.</p>
                <a href="#" className="link-underline">View Accommodation</a>
            </div>

            <div className="slider-container">
                <button
                    className="slider-btn prev-btn"
                    onClick={prevSlide}
                    style={{ opacity: safeIndex === 0 ? '0.2' : '1', cursor: safeIndex === 0 ? 'default' : 'pointer' }}
                >
                    ‹
                </button>
                <div
                    className="slider-track"
                    id="gallery-track"
                    style={{ transform: `translateX(-${translateX}px)` }}
                >
                    {slidesData.map((slide, index) => (
                        <div className="slide" key={slide.id} ref={index === 0 ? slideRef : null}>
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="slider-btn next-btn"
                    onClick={nextSlide}
                    style={{ opacity: safeIndex === maxIndex ? '0.2' : '1', cursor: safeIndex === maxIndex ? 'default' : 'pointer' }}
                >
                    ›
                </button>
            </div>
        </section>
    );
};

export default ExperienceSlider;