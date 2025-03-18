import React, { useEffect, useState } from "react";
import { fetchConditions } from "../../api/searchByConditionsAPI";
import { useNavigate } from "react-router-dom";
import "./HomeCSS/searchbyconditions.css";

const ConditionsPage = () => {
    const [conditions, setConditions] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchConditions().then((data) => setConditions(data));
    }, []);

    // Filter conditions across all specialists
    const filteredSpecialists = Object.entries(conditions)
        .map(([specialist, { image, conditions: conditionList }]) => {
            const filteredConditions = conditionList.filter((condition) =>
                condition.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return filteredConditions.length > 0 ? { specialist, image, conditions: filteredConditions } : null;
        })
        .filter(Boolean); // Remove null values (i.e., specialists with no matching conditions)

    // Function to redirect to doctors list with specialty
    const handleRedirect = (specialty) => {
        navigate(`/doctors?specialty=${encodeURIComponent(specialty)}`);
    };

    return (
        <div className="main-container">
            <div className="conditions-container">
                <h2>Find a doctor by condition</h2>
                <input
                    type="text"
                    placeholder="Search by condition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {/* Show "No results found" message if no conditions match */}
                {filteredSpecialists.length === 0 ? (
                    <p className="no-results">❌ No results found for "{searchTerm}"</p>
                ) : (
                    filteredSpecialists.map(({ specialist, image, conditions }) => (
                        <div key={specialist} className="specialist-section">
                            <h3 className="specialist-title">
                                <img 
                                    src={image} 
                                    alt={specialist} 
                                    className="clickable-image"
                                    onClick={() => handleRedirect(specialist)} // ✅ Clicking image redirects
                                />
                                <span 
                                    className="clickable-doctor" 
                                    onClick={() => handleRedirect(specialist)} // ✅ Clicking doctor redirects
                                >
                                    {specialist}
                                </span>
                            </h3>
                            <div className="conditions-list">
                                {conditions.map((condition) => (
                                    <span
                                        key={condition}
                                        className="condition-item"
                                        onClick={() => handleRedirect(specialist)} // ✅ Clicking condition redirects
                                    >
                                        {condition}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Right Sidebar */}
            <div className="right-sidebar">
                <div className="info-box">
                    <img src="/images/booking-assistance.jpg" alt="Booking Assistance" />
                    <h4>Booking Assistance</h4>
                    <p>Call us</p>
                    <button className="btn">Contact</button>
                </div>

                <div className="info-box">
                    <img src="/images/ask-question.jpg" alt="Ask a Question" />
                    <h4>Need Advice</h4>
                    <p>from a doctor</p>
                    <button className="btn">Ask a Question</button>
                </div>
            </div>
        </div>
    );
};

export default ConditionsPage;
