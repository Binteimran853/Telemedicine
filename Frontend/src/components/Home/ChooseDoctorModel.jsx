import React, { useState, useEffect } from "react";
import { fetchDoctors } from "../../api/chooseDoctorSectionAPI";
import "./HomeCSS/choosedoctormodel.css";
import { useNavigate } from "react-router-dom"; 

const DoctorPopup = ({ isOpen, onClose }) => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent background scroll
            fetchDoctors().then((data) => {
                const sortedDoctors = data.specialists.sort((a, b) => b.online - a.online);
                setDoctors(sortedDoctors);
            });
        } else {
            document.body.style.overflow = "auto"; // Restore scroll when closed
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup when component unmounts
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="doctor-popup-overlay" onClick={onClose}>
            <div className="doctor-popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="doctor-popup-header">
                    <h2>Find a Doctor Online</h2>
                    <button className="doctor-popup-close-btn" onClick={onClose}>×</button>
                </div>
                <input
                    type="text"
                    placeholder="Search for a doctor..."
                    className="doctor-popup-search-box"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="doctor-popup-list">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor, index) => (
                            <div 
                                key={index} 
                                className="doctor-popup-card"
                                onClick={() => {navigate(`/doctors/${encodeURIComponent(doctor.name)}`);}}    
                            >
                                <img src={doctor.image} alt={doctor.name} />
                                <div className="doctor-popup-info">
                                    <p>{doctor.name}</p>
                                    <p className="doctor-specialty">{doctor.specialty}</p>
                                    {doctor.online && <span className="doctor-popup-online-badge">ONLINE</span>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No doctors found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorPopup;
