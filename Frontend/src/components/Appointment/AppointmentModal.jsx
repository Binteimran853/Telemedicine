import React, { useState } from "react";
import "./AppointmentModal.css"; // ✅ Import modal styles

const AppointmentModal = ({ isOpen, onClose, doctor }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null; // ✅ Don't render if modal is closed

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setMessage("❌ Please select a date and time.");
      return;
    }

    const appointmentDetails = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentDetails),
      });

      if (response.ok) {
        setMessage("✅ Appointment booked successfully!");
        setTimeout(onClose, 2000); // ✅ Close modal after success
      } else {
        setMessage("❌ Failed to book appointment. Try again.");
      }
    } catch (error) {
      setMessage("❌ Error booking appointment.");
    }
  };

  return (
    <div className="appointment-modal-overlay" onClick={onClose}>
      <div className="appointment-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Book Appointment with {doctor.name}</h2>
        <label>Date:</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

        <label>Time:</label>
        <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />

        {message && <p className="message">{message}</p>}

        <button className="confirm-btn" onClick={handleBooking}>Confirm Appointment</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AppointmentModal;
