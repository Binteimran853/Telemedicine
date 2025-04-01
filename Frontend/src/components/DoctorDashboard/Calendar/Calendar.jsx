import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { fetchAvailability, updateAvailability } from "../../../api/DoctorDashboard/CalendarAPI";
import { AuthContext } from "../../../context/AuthContext"; // Import the context

const DoctorCalendar = () => {
  const { user } = useContext(AuthContext); // Get logged-in user from context
  const doctorId = user?.id; // Extract doctor ID dynamically

  const [date, setDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(null);
  const [existingSlots, setExistingSlots] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchAvailability(doctorId).then((data) => {
        setAvailableDates(data?.dates || {});
        setLoading(false);
      });
    }
  }, [doctorId]);

  const formatDate = (dateObj) => {
    return (
      dateObj.getFullYear() +
      "-" +
      String(dateObj.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateObj.getDate()).padStart(2, "0")
    );
  };

  const handleDateClick = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    setSelectedDate(formattedDate);
    setExistingSlots(!!availableDates[formattedDate]);
  };

  const handleReset = () => {
    setSelectedDate(null);
    setExistingSlots(false);
  };

  const handleContinue = () => {
    if (selectedDate) {
      setStep("slots");
    }
  };

  return (
    <div className="calendar-container">
      <h2>Manage Your Schedule</h2>
      {step === "calendar" ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Calendar
              onClickDay={handleDateClick}
              value={date}
              minDate={new Date()}
              tileClassName={({ date }) => {
                const formattedDate = formatDate(date);
                return availableDates[formattedDate] ? "highlighted-day" : "";
              }}
            />
            <p>Click on a date to mark availability.</p>
            {existingSlots && (
              <p className="info-message">This date already has selected slots. You can modify them.</p>
            )}
            <div className="calendar-buttons">
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
              <button
                className="continue-btn"
                onClick={handleContinue}
                disabled={!selectedDate}
              >
                Continue
              </button>
            </div>
          </>
        )
      ) : (
        <SlotSelection
          availableDates={availableDates}
          setAvailableDates={setAvailableDates}
          updateAvailability={updateAvailability}
          doctorId={doctorId}
          selectedDate={selectedDate}
          onBack={() => {
            setStep("calendar");
            setSelectedDate(null);
            setExistingSlots(false);
          }}
        />
      )}
    </div>
  );
};

const SlotSelection = ({ availableDates, setAvailableDates, updateAvailability, doctorId, selectedDate, onBack }) => {
  const [selectedSlots, setSelectedSlots] = useState(
    availableDates[selectedDate] || { Morning: [], Afternoon: [], Evening: [] }
  );

  const slots = {
    Morning: ["09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM", "10:15 AM"],
    Afternoon: ["03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM", "04:00 PM"],
    Evening: ["06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM", "07:00 PM"]
  };

  const handleSlotClick = (period, time) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [period]: prev[period].includes(time) ? prev[period].filter((t) => t !== time) : [...prev[period], time]
    }));
  };

  const handleSaveSlots = async () => {
    const updatedDates = { ...availableDates, [selectedDate]: selectedSlots };

    await updateAvailability(doctorId, updatedDates);

    alert(`Slots for ${selectedDate} are saved successfully!`);

    setAvailableDates(updatedDates);
    onBack();
  };

  return (
    <div className="slot-selection">
      <h3>Select Available Slots for {selectedDate}</h3>

      {availableDates[selectedDate] && (
        <p className="info-message">
          This date already has selected slots. Modify as needed.
        </p>
      )}

      {selectedDate &&
        Object.entries(slots).map(([period, times]) => (
          <div key={period}>
            <h4>{period} Slots</h4>
            <div className="slot-buttons">
              {times.map((time) => (
                <button
                  key={time}
                  className={`slot-button ${selectedSlots[period]?.includes(time) ? "selected" : ""}`}
                  onClick={() => handleSlotClick(period, time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}

      <div className="action-buttons">
        <button className="reset-btn" onClick={onBack}>Back</button>
        <button className="continue-btn" onClick={handleSaveSlots} disabled={Object.values(selectedSlots).every((arr) => arr.length === 0)}>
          Save Slots
        </button>
      </div>
    </div>
  );
};

export default DoctorCalendar;
