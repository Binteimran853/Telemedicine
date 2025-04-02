import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchDoctorAvailability, bookAppointment } from "../../api/Appointment/AppointmentBookingAPI";
import "./AppointmentBooking.css";

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const today = new Date();
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication check

  useEffect(() => {
    if (doctorId) {
      const loadAvailability = async () => {
        try {
          setLoading(true);
          const slots = await fetchDoctorAvailability(doctorId);
          console.log("Fetched Availability:", slots);
          setAvailability(slots);
        } catch (err) {
          setError("Failed to load availability.");
        } finally {
          setLoading(false);
        }
      };
      loadAvailability();
    }

    // Mock check for user authentication
    const userToken = localStorage.getItem("userToken"); // Assume token stored in localStorage
    setIsLoggedIn(!!userToken);
  }, [doctorId]);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleDateChange = (days) => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      setSelectedSlot(null); // Reset selected slot when changing date
      return newDate;
    });
  };

  const canNavigateBack = selectedDate > today;
  const slotsForDate = availability.find((day) => day.date === formatDate(selectedDate));

  // Get the next available date that is AFTER the currently selected date
  const nextAvailableDate = availability
    .map((day) => new Date(day.date))
    .filter((date) => date > selectedDate)
    .sort((a, b) => a - b)[0];

  // Convert slot string (e.g., "4:00 PM") to total minutes for easy comparison
  const timeToMinutes = (timeStr) => {
    const [hour, minute, period] = timeStr.match(/(\d+):(\d+) (\w+)/).slice(1);
    let hours = parseInt(hour, 10);
    const minutes = parseInt(minute, 10);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Function to filter valid slots
  const filterValidSlots = (slots) => {
    if (!slots) return [];
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (selectedDate.toDateString() !== today.toDateString()) {
      return slots.slice().sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
    }

    return slots
      .filter((slot) => timeToMinutes(slot) > currentMinutes)
      .sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  const handleConfirmBooking = async () => {
    if (!isLoggedIn) {
      navigate("/patient-login");
    } else {
      const userId = localStorage.getItem("userId"); // Retrieve logged-in user ID
  
      const result = await bookAppointment(doctorId, userId, formatDate(selectedDate), selectedSlot);
      if (result.success) {
        alert(`Your appointment has been booked with Dr. ${doctor?.name} at ${selectedSlot} successfully.`);
      } else {
        alert(`Booking failed: ${result.message}`);
      }
    }
  };  

  return (
    <div className="appointment-booking">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="doctor-details">
            <img src={doctor?.image || "/default-doctor.png"} alt={doctor?.name} />
            <div className="doctor-details-content">
              <div className="doctor-details-content-left">
                <h2>{doctor?.name || "Doctor"}</h2>
                <p>Specialization: {doctor?.specialization || "N/A"}</p>
                <p>Fee: Rs. {doctor?.fee || "N/A"}</p>
              </div>
              <div className="doctor-details-content-right">
                <h3>Online Video Consultation</h3>
                {doctor.discount > 0 && (
                  <span className="discount-badge">
                    Pay Online & Get {doctor.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="date-navigation">
            <button onClick={() => handleDateChange(-1)} disabled={!canNavigateBack}>
              {"<"}
            </button>
            <span data-day={selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}>
              {selectedDate.toDateString().split(' ').slice(1).join(' ')}
            </span>
            <button onClick={() => handleDateChange(1)}>{">"}</button>
          </div>

          {slotsForDate && Object.values(slotsForDate).some((slots) => slots.length > 0) ? (
            <div className="slots-container">
              {["Morning", "Afternoon", "Evening"].map((time) => {
                const validSlots = filterValidSlots(slotsForDate[time]);
                return validSlots.length > 0 ? (
                  <div key={time} className="slot-section">
                    <h3>{time} Slots</h3>
                    <div className="slots">
                      {validSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`slot-button ${selectedSlot === slot ? "selected" : ""}`}
                          onClick={() => handleSlotSelection(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="no-slots">
              <p>No free slots available for selected date</p>
              {nextAvailableDate ? (
                <button onClick={() => setSelectedDate(nextAvailableDate)}>
                  Next Availability on {formatDate(nextAvailableDate)}
                </button>
              ) : (
                <p>No upcoming slots available.</p>
              )}
            </div>
          )}

          {selectedSlot && (
            <div className="confirm-booking">
              <button className="confirm-booking-button" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentBooking;
