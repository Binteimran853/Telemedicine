import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../api/chooseDoctorSectionAPI";
import DoctorPopup from "./ChooseDoctorModel";
import "./HomeCSS/choosedoctorsection.css";

const DoctorsSection = () => {
    const [data, setData] = useState({ specialists: [], conditions: [] });
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        fetchDoctors().then((res) => setData(res));
    }, []);

    // Function to get specialty for a selected condition
    const handleConditionClick = (condition) => {
        const selectedCondition = data.conditions.find((c) => c.name === condition);
        if (selectedCondition?.specialty) {
            navigate(`/doctors?specialty=${encodeURIComponent(selectedCondition.specialty)}`);
        } else {
            console.error("No specialty found for this condition.");
        }
    };

    return (
        <div className="doctors-section">
            <div className="section">
                <div className="heading-container">
                    <h2>Consult best doctors online</h2>
                    <button className="view-all" onClick={(e) => { e.preventDefault(); setPopupOpen(true); }}>
                        View All
                    </button>
                    <DoctorPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
                </div>
                <div className="grid-container">
                    {data.specialists.slice(0, 14).map((specialist, index) => (
                        <div 
                            key={index} 
                            className="grid-item" 
                            onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(specialist.name)}`)}
                        >
                            <img src={specialist.image} alt={specialist.name} />
                            <p>{specialist.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <div className="heading-container">
                    <h2>Search doctor by condition</h2>
                    <button className="view-all" onClick={() => navigate("/all-conditions")}>View All</button>
                </div>
                <div className="grid-container">
                    {data.conditions.map((condition, index) => (
                        <div 
                            key={index} 
                            className="grid-item" 
                            onClick={() => handleConditionClick(condition.name)} // ✅ Now navigates based on condition
                        >
                            <img src={condition.image} alt={condition.name} />
                            <p>{condition.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsSection;
