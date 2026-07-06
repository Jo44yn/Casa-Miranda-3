import React from "react";
import Hero from "./components/Hero";
import AvailabilityBar from "./components/AvailabilityBar";
import ExperienceSlider from "./components/ExperienceSlider";
import Amenities from "./components/Amenities";
import CTA from "./components/CTA";
import './css/home.css';

const Home = () => {
    return (
        <>
            <Hero />
            <AvailabilityBar />
            <ExperienceSlider />
            <Amenities />
            <CTA />
        </>
    );
};

export default Home;