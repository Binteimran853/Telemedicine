import axios from "axios";

const API_URL = "http://localhost:5000/availability";

// Fetch doctor's availability
export const fetchAvailability = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}?doctorId=${doctorId}`);
    
    if (!response.data.length) return { doctorId, dates: {} };

    let data = response.data[0];

    // Remove past dates
    const cleanedDates = removePastDates(data.dates);

    if (JSON.stringify(cleanedDates) !== JSON.stringify(data.dates)) {
      await axios.put(`${API_URL}/${data.id}`, { doctorId, dates: cleanedDates });
      console.log(`Removed past dates for doctor ID ${doctorId}`);
    }

    return { doctorId, dates: cleanedDates };
  } catch (error) {
    console.error("Error fetching availability:", error);
    return { doctorId, dates: {} };
  }
};



// Format date correctly (YYYY-MM-DD)
const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const removePastDates = (dates) => {
  const today = formatDate(new Date()); // Get today's date
  return Object.fromEntries(
    Object.entries(dates).filter(([date]) => date >= today)
  );
};


// Update doctor's availability (merge new dates instead of overwriting)
export const updateAvailability = async (doctorId, newDates) => {
  try {
    // Fetch existing availability
    const response = await axios.get(`${API_URL}?doctorId=${doctorId}`);
    const existingData = response.data.length ? response.data[0] : { doctorId, dates: {} };

    // Remove past dates from existing data
    const cleanedOldDates = removePastDates(existingData.dates);

    // Merge cleaned old dates with new selected slots
    const updatedDates = { 
      ...cleanedOldDates, 
      ...newDates  // Ensure new slots are stored properly
    };

    if (Object.keys(updatedDates).length === 0) {
      // If no future dates remain, delete the availability entry
      await axios.delete(`${API_URL}/${existingData.id}`);
      console.info(`Deleted outdated availability for doctor ${doctorId}`);
      return;
    }

    if (existingData.id) {
      // Update existing record with merged new slots
      await axios.put(`${API_URL}/${existingData.id}`, {
        doctorId,
        dates: updatedDates,
      });
    } else {
      // Create a new record if none exists
      await axios.post(API_URL, {
        doctorId,
        dates: updatedDates,
      });
    }

    console.info("Updated availability:", updatedDates);
  } catch (error) {
    console.error("Error updating availability:", error);
  }
};


export const cleanupAvailability = async () => {
  try {
    const response = await axios.get(API_URL);
    const availabilityData = response.data;

    for (const doctor of availabilityData) {
      const cleanedDates = removePastDates(doctor.dates);

      if (JSON.stringify(cleanedDates) !== JSON.stringify(doctor.dates)) {
        if (Object.keys(cleanedDates).length === 0) {
          // Delete entry if all dates are expired
          await axios.delete(`${API_URL}/${doctor.id}`);
          console.info(`Deleted outdated availability for doctor ${doctor.doctorId}`);
        } else {
          // Update availability with cleaned dates
          await axios.put(`${API_URL}/${doctor.id}`, {
            doctorId: doctor.doctorId,
            dates: cleanedDates,
          });
          console.info(`Updated availability for doctor ${doctor.doctorId}`);
        }
      }
    }
  } catch (error) {
    console.error("Error cleaning up expired availability:", error);
  }
};
