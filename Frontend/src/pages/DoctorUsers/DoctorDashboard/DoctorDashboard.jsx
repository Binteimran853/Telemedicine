import { Routes, Route, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorById } from "../../../api/Authenthication/doctorAuth"; // Import API function

import DoctorProfile from "../../../components/DoctorDashboard/DoctorProfile/DoctorProfile.jsx";
import Calendar from "../../../components/DoctorDashboard/Calendar/Calendar";
import Appointments from "../../../components/DoctorDashboard/Appointments/Appointments";
import Patients from "../../../components/DoctorDashboard/Patients/Patients";
import Messages from "../../../components/DoctorDashboard/Messages/Messages";
import Notifications from "../../../components/DoctorDashboard/Notifications/Notifications";
import PaymentInfo from "../../../components/DoctorDashboard/PaymentInfo/PaymentInfo";
import Settings from "../../../components/DoctorDashboard/Settings/Settings";

import "./DoctorDashboard.css"; // Import styles

const DoctorDashboard = () => {
    const { id } = useParams(); // Extract Doctor ID from URL
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const doctorData = await getDoctorById(id);
                if (doctorData) {
                    setDoctor(doctorData);
                } else {
                    setError("Doctor profile not found.");
                }
            } catch (err) {
                setError("Error fetching doctor.");
                console.error("Error fetching doctor:", err.message);
            }
        };

        fetchDoctor();
    }, [id]);

    if (error) return <h3>{error}</h3>;
    if (!doctor) return <h3>Loading...</h3>;

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <nav>
                    <NavLink to={`/doctor/${id}`} className="nav-item">Dashboard</NavLink>
                    <NavLink to={`/doctor/${id}/calendar`} className="nav-item">Calendar</NavLink>
                    <NavLink to={`/doctor/${id}/appointments`} className="nav-item">Appointments</NavLink>
                    <NavLink to={`/doctor/${id}/patients`} className="nav-item">Patients</NavLink>
                    <NavLink to={`/doctor/${id}/messages`} className="nav-item">Messages</NavLink>
                    <NavLink to={`/doctor/${id}/notifications`} className="nav-item">Notifications</NavLink>
                    <NavLink to={`/doctor/${id}/payment-info`} className="nav-item">Payment Info</NavLink>
                    <NavLink to={`/doctor/${id}/settings`} className="nav-item">Settings</NavLink>
                </nav>
                <div className="help-section"><button className="help-btn" onClick={() => navigate("/help")}>Need Help?</button></div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<DoctorProfile doctor={doctor} />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="payment-info" element={<PaymentInfo />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </main>
        </div>
    );
};

export default DoctorDashboard;
