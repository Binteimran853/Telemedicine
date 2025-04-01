import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDoctors } from "../../../api/SelectedDoctorList/DoctorListApi";
import "./DoctorDetails.css";
import { useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visibleReviews, setVisibleReviews] = useState(1); // Initially show 1 review

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

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found!</p>;

  // Handle showing more reviews
  const toggleReviews = () => {
    setVisibleReviews((prev) => (prev === 1 ? 4 : 1)); // Toggle between 1 and 4 reviews
  };

  return (
    <div className="doctor-details-container">
      <div className="doctor-details-left-container">
        <div className="doctor-header">
          <img src={doctor.image || "/default-doctor.png"} alt={doctor.name} className="doctor-profile-image" />

          <div className="doctor-info">
            <h1>{doctor.name}</h1>
            <p className="specialization">{doctor.specialization}</p>
            <p className="degree">{doctor.degree}</p>

            <div className="doctor-stats">
              <div className="stat-item">
                <span>Wait Time</span>
                <strong>{doctor.wait_time}</strong>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <span>Experience</span>
                <strong>{doctor.experience} Years</strong>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <span>Satisfied Patients</span>
                <strong>{doctor.satisfied_patients}% ({doctor.total_reviews})</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>
            {doctor.name.startsWith("Dr.") ? doctor.name : `Dr. ${doctor.name}`}’s Reviews ({doctor.total_reviews})
          </h2>
          <div className="rating-summary">
            <p className="overall-rating">{doctor.satisfied_patients || "N/A"}%</p>
            <div className="rating-bars">
              <p>Doctor Checkup <span>{doctor.review_summary?.checkup || "N/A"}%</span></p>
              <p>Clinic Environment <span>{doctor.review_summary?.environment || "N/A"}%</span></p>
              <p>Staff Behaviour <span>{doctor.review_summary?.staff || "N/A"}%</span></p>
            </div>
          </div>

          {/* Display Reviews */}
          {doctor.reviews?.slice(0, visibleReviews).map((review, index) => (
            <div className="review" key={index}>
              <p className="review-text">"{review.text}"</p>
              <p className="reviewer">Verified patient: {review.reviewer}</p>
            </div>
          ))}
          {console.log(doctor.reviews)}
          {/* Read More / Show Less Button */}
          {doctor.reviews?.length > 1 && (
            <button className="read-reviews-btn" onClick={toggleReviews}>
              {visibleReviews === 1 ? "Read More Reviews" : "Show Less"}
            </button>
          )}
        </div>
      </div>

      {/* Right Side - Consultation Section */}
      <div className="doctor-details-right-container">
        <div className="consultation-box">
          <div className="consultation-header">
            <h3>Online Video Consultation</h3>
            {doctor.discount > 0 && (
              <span className="discount-badge">
                Pay Online & Get {doctor.discount}% OFF
              </span>
            )}
          </div>

          <p className="fee"><strong>Fee:</strong> Rs. {doctor.fee}</p>
          <p className="address"><strong>Address:</strong> Use phone/laptop for video call</p>

          <div className="availability-container">
            <span className="availability">✅ {doctor.availability}</span>
            <span className="available-time">{doctor.available_time}</span>
          </div>

          <button
            className="book-btn"
            onClick={() => navigate(`/book-appointment/${doctor.id}`, { state: { doctor } })}
          >
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
