import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Base API URL

// 🔹 Apply as a Doctor (Submit Application)
export const applyAsDoctor = async (doctorData) => {
    try {
        const { data: existingApplications } = await axios.get(`${API_BASE_URL}/doctor_applications?email=${doctorData.email}`);
        const { data: existingDoctors } = await axios.get(`${API_BASE_URL}/doctors?email=${doctorData.email}`);

        if (existingApplications.length > 0 || existingDoctors.length > 0) {
            throw new Error("Email is already in use. Please use a different email.");
        }

        // Step 2: Save application with status "pending"
        const response = await axios.post(`${API_BASE_URL}/doctor_applications`, doctorData);
        return response.data;
    } catch (error) {
        console.error("Doctor application error:", error.message || error);
        throw error;
    }
};

// 🔹 Doctor Login
export const doctorLogin = async (email, password) => {
    try {
        const { data: doctors } = await axios.get(`${API_BASE_URL}/doctors?email=${email}`);

        if (doctors.length === 0) {
            throw new Error("Doctor not found.");
        }

        const doctor = doctors[0];

        if (doctor.password !== password) {
            throw new Error("Incorrect password.");
        }

        return { token: "mocked-jwt-token", user: { ...doctor, role: "doctor" } };
    } catch (error) {
        console.error("Doctor login error:", error.message || error);
        throw error;
    }
};

// 🔹 Verify & Approve Doctor (Admin Action)
export const approveDoctor = async (doctorId) => {
    try {
        const { data: pendingDoctors } = await axios.get(`${API_BASE_URL}/doctor_applications?id=${doctorId}`);

        if (pendingDoctors.length === 0) {
            throw new Error("Doctor application not found.");
        }

        const approvedDoctor = {
            ...pendingDoctors[0],
            status: "approved",
            role: "doctor"
        };

        // Step 2: Move the doctor to `doctors` table
        await axios.post(`${API_BASE_URL}/doctors`, approvedDoctor);

        // 🔹 FIX: Remove doctor application by specific ID (not query)
        await axios.delete(`${API_BASE_URL}/doctor_applications/${doctorId}`);

        return { message: "Doctor approved successfully.", doctor: approvedDoctor };
    } catch (error) {
        console.error("Doctor approval error:", error.message || error);
        throw error;
    }
};

// 🔹 Fetch Doctor by ID
export const getDoctorById = async (id) => {
    try {
        const { data: doctors } = await axios.get(`${API_BASE_URL}/doctors?id=${id}`);

        if (doctors.length === 0) {
            throw new Error("Doctor not found.");
        }

        return doctors[0]; // Return the first doctor that matches the ID
    } catch (error) {
        console.error("Error fetching doctor:", error.message || error);
        throw error;
    }
};

// 🔹 Fetch Doctor Appointments
export const getDoctorAppointments = async (doctorId) => {
    try {
        const { data: appointments } = await axios.get(`${API_BASE_URL}/appointments?doctorId=${doctorId}`);

        return appointments;
    } catch (error) {
        console.error("Error fetching doctor appointments:", error.message || error);
        throw error;
    }
};

// 🔹 Fetch Doctor Patients
export const getDoctorPatients = async (doctorId) => {
    try {
        const { data: appointments } = await axios.get(`${API_BASE_URL}/appointments?doctorId=${doctorId}`);

        if (appointments.length === 0) {
            return [];
        }

        // Extract unique patient IDs
        const patientIds = [...new Set(appointments.map((appt) => appt.patientId))];

        // 🔹 FIX: Ensure fetching only existing patients
        const patients = await Promise.all(
            patientIds.map(async (id) => {
                try {
                    const { data: patientData } = await axios.get(`${API_BASE_URL}/patients?id=${id}`);
                    return patientData.length > 0 ? patientData[0] : null;
                } catch (error) {
                    console.error(`Error fetching patient with ID ${id}:`, error.message);
                    return null;
                }
            })
        );

        return patients.filter(Boolean); // Remove any `null` values
    } catch (error) {
        console.error("Error fetching doctor patients:", error.message || error);
        throw error;
    }
};
