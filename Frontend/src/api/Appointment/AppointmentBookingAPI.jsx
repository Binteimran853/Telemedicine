const BASE_URL = "http://localhost:5000"; // Update this if needed

// Fetch doctor's availability
export const fetchDoctorAvailability = async (doctorId) => {
  try {
    const response = await fetch(`${BASE_URL}/availability`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // ✅ Ensure doctorId matches correctly
    const doctorAvailability = data.find((entry) => entry.doctorId.toString() === doctorId.toString());

    if (!doctorAvailability) {
      console.warn(`No availability found for doctorId: ${doctorId}`);
      return [];
    }

    // ✅ Convert availability to array format for frontend
    return Object.entries(doctorAvailability.dates).map(([date, slots]) => ({
      date,
      ...slots,
    }));
  } catch (error) {
    console.error("Error fetching doctor availability:", error);
    return [];
  }
};

// Book an appointment and store it in db.json
export const bookAppointment = async (doctorId, userId, date, time) => {
  try {
    if (!doctorId || !userId || !date || !time) {
      throw new Error("Missing required fields for booking.");
    }

    const newAppointment = {
      id: Date.now().toString(), // Unique ID for the new appointment
      doctorId: doctorId.toString(),
      patientId: userId.toString(),
      date,
      time,
      status: "Pending", // Default status
    };

    // Store in db.json
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) {
      throw new Error(`Failed to book appointment. Status: ${response.status}`);
    }

    return { success: true, message: "Appointment booked successfully!", data: newAppointment };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return { success: false, message: error.message };
  }
};
