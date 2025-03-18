import React, { useState, useEffect } from "react";
import "./HomeCSS/herosection.css";
import doctorImage from "../../assets/images/hero-doctor.png";
import SearchModal from "./SearchDoctor";

const HeroSection = () => {
  const texts = ["Trusted by certified doctors", "Your health, our priority", "Quality care, anytime, anywhere"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>
          Find and Book the <span className="highlight">Best Doctors</span> near you
        </h1>
        <div className="info-box">
          <span className="check-icon">✅</span>
          <span>{texts[currentIndex]}</span>
        </div>
        <div className="search-bar" onClick={() => setModalOpen(true)}>
          <h3>Doctors, Hospital, Conditions</h3>
          <button className="search-btn">Search</button>
        </div>
      </div>
      <img src={doctorImage} alt="Doctor" className="doctor-image" />
      <SearchModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default HeroSection;
