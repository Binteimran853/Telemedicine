import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorItem.css";

const DoctorItem = ({ doctor, location }) => {
  const navigate = useNavigate();

  const handleDoctorClick = () => {
    navigate(`/doctor-profile/${doctor.id}`);
  };  

  // Filter doctors by location
  if (doctor.location.toLowerCase() !== location.toLowerCase()) {
    return null; // Hide doctors that don't match the selected location
  }

  return (
    <div className="doctor-card">
      {/* Doctor Profile Section */}
      <div className="doctor-info" onClick={handleDoctorClick} role="button" tabIndex={0}>
        <img
          src={doctor.image || "/default-doctor.png"}
          alt={doctor.name || "Doctor Image"}
          className="doctor-image"
        />
        <div className="doctor-details">
          <h3>{doctor.name || "Unknown Doctor"}</h3>
          <p className="specialization">{doctor.specialization || "Specialization not available"}</p>
          <p className="qualification">{doctor.qualification || "Qualification not available"}</p>
          <div className="experience-rating">
            <span>{doctor.experience ? `${doctor.experience} Years Experience` : "Experience not available"}</span>
            <span>{doctor.rating ? `${doctor.rating}% (${doctor.reviews || 0}) Satisfied Patients` : "No Ratings"}</span>
          </div>
        </div>
        {doctor.isPlatinum && <span className="platinum-badge">PLATINUM DOCTOR</span>}
        <span className="pmc-badge">PMC Verified</span>
      </div>

      {/* Consultation Section */}
      <div className="consultation">
        {doctor.available_today && <span className="available">✔ Available today</span>}
        <p className="fee">Rs. {doctor.fee ?? "Not listed"}</p>
        {doctor.discount > 0 && (
          <button className="discount-button" onClick={handleDoctorClick}>
            Pay Online & Get {doctor.discount}% OFF
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="doctor-actions">
        {doctor.videoConsultation && (
          <button className="video-btn" onClick={handleDoctorClick}>
            Video Consultation
          </button>
        )}
        <button className="book-btn" onClick={handleDoctorClick}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorItem;
