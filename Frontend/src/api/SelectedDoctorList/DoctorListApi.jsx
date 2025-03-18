import axios from "axios";

const API_URL = "http://localhost:5000/doctors_list";

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
