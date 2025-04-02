import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../api/chooseDoctorSectionAPI"; // Import API
import "./HomeCSS/searchdoctor.css";

const SearchModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState("specialty");
    const [locationQuery, setLocationQuery] = useState(""); // Removed default location
    const [specialtyQuery, setSpecialtyQuery] = useState("");
    const [specialties, setSpecialties] = useState([]);

    const locations = ["Gujranwala", "Lahore", "Islamabad"];

    // Fetch specialties from API when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocationQuery(""); // Reset input when modal opens
            setSpecialtyQuery("");

            fetchDoctors().then((data) => {
                const allSpecialties = data.specialists.map((specialist) => specialist.name);
                setSpecialties(allSpecialties);
            });
        }
    }, [isOpen]);

    // Redirect when both inputs are filled
    const handleRedirect = (specialty) => {
        const selectedLocation = locationQuery.trim() || "Gujranwala"; // Default to Gujranwala if empty
        if (specialty) {
            navigate(`/doctors?location=${encodeURIComponent(selectedLocation)}&specialty=${encodeURIComponent(specialty)}`);
            onClose();
        }
    };
    

    // Show all locations when input is empty or focused
    const displayedLocations =
        locationQuery.trim() === "" ? locations : locations.filter(item => item.toLowerCase().includes(locationQuery.toLowerCase()));

    // Specialty filtering
    const displayedSpecialties =
        specialtyQuery.trim() === "" ? specialties.slice(0, 15) : specialties.filter(item => item.toLowerCase().includes(specialtyQuery.toLowerCase()));

    return (
        <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Search for doctors</h2>
                <p>First select location, then select doctor.</p>

                {/* Search Inputs */}
                <div className="search-options">
                    <div>
                        <input
                            type="text"
                            placeholder="Select location if not Gujranwala"
                            value={locationQuery}
                            onFocus={() => setSearchType("location")}
                            onChange={(e) => setLocationQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Select specialty, service, or doctor"
                            value={specialtyQuery}
                            onFocus={() => setSearchType("specialty")}
                            onChange={(e) => setSpecialtyQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Dynamic Search List */}
                <ul className="search-list">
                    {searchType === "location"
                        ? displayedLocations.map((item, index) => (
                            <li key={index} className="search-item" onClick={() => setLocationQuery(item)}>
                                {item}
                            </li>
                        ))
                        : displayedSpecialties.map((item, index) => (
                            <li key={index} className="search-item" onClick={() => handleRedirect(item)}>
                                {item}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchModal;
