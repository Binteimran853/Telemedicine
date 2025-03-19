import React, { useEffect, useState } from "react";
import { useParams,Navigate, useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../api/SelectedDoctorList/DoctorListApi";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const navigate=useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctorDetails = async () => {
      const doctorsData = await fetchDoctors();
      const selectedDoctor = doctorsData.find((doc) => doc.id.toString() === doctorId);

      if (selectedDoctor) {
        setDoctor(selectedDoctor);
      } else {
        console.error("Doctor not found!");
      }
      setLoading(false);
    };

    getDoctorDetails();
  }, [doctorId]);
function videoCallingHandler(){
navigate(`/video-calling/${doctorId}`)
}
  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found!</p>;

  return (
    <div className="doctor-details-container">
      <div className="doctor-details-left-container">
        <div className="doctor-header">
          <img src={doctor.image || "/default-doctor.png"} alt={doctor.name} className="doctor-profile-image" />
          <div className="doctor-info">
            <h1>{doctor.name}</h1>
            <p className="specialization">{doctor.specialization}</p>
            <p className="degree">{doctor.degree}</p>
            <p className="experience"><strong>Experience:</strong> {doctor.experience} Years</p>
            <p className="wait-time"><strong>Wait Time:</strong> {doctor.wait_time}</p>
            <p className="rating"><strong>Satisfied Patients:</strong> {doctor.satisfied_patients}% ({doctor.total_reviews})</p>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Dr. {doctor.name}’s Reviews ({doctor.total_reviews})</h2>
          <div className="rating-summary">
            <p className="overall-rating">100%</p>
            <div className="rating-bars">
              <p>Doctor Checkup <span>100%</span></p>
              <p>Clinic Environment <span>100%</span></p>
              <p>Staff Behaviour <span>100%</span></p>
            </div>
          </div>
          <div className="review">
            <p className="review-text">"{doctor.latest_review}"</p>
            <p className="reviewer">Verified patient: {doctor.latest_reviewer}</p>
          </div>
          <button className="read-reviews-btn">Read all reviews</button>
        </div>
      </div>

      <div className="doctor-details-right-container">
      <div className="consultation-box">
        <div className="consultation-header">
          <h3>Online Video Consultation</h3>
          <span className="discount-badge">
            Pay Online & Get {doctor.discount}% OFF
          </span>
        </div>

        <p className="fee"><strong>Fee:</strong> Rs. {doctor.fee}</p>
        <p className="address"><strong>Address:</strong> Use phone/laptop for video call</p>

        <div className="availability-container">
          <span className="availability">
            ✅ {doctor.availability}
          </span>
          <span className="available-time">{doctor.available_time}</span>
        </div>

        <button className="book-btn" onClick={videoCallingHandler}>
          📹 Book Video Consultation
        </button>
      </div>
      <div className="consultation-benefits">
          <ul>
            <li>🎧 Priority customer support</li>
            <li>🔒 100% secure</li>
            <li>⏳ Book Appointment in 30 sec</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
