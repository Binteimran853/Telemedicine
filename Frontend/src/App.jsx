import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/PatientUsers/PatientLogin.jsx";
import Register from "./pages/PatientUsers/PatientRegister.jsx";
import ScrollToTop from "./components/common/ScrollToTop";
import Verify from "./pages/PatientUsers/Verify";
import Navbar from "./components/Navbar/Navbar.jsx";
import ConditionsPage from "./components/Home/SearchByConditions.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DoctorsList from "./components/SelectedDoctorList/DoctorList/DoctorsList.jsx";
import DoctorApplication from "./pages/DoctorUsers/DoctorRegister.jsx";
import DoctorLogin from "./pages/DoctorUsers/DoctorLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DoctorDashboard from "./pages/DoctorUsers/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "./pages/PatientUsers/PatientDashboard";
import DoctorDetails from "./components/SelectedDoctorList/DoctorDetails/DoctorDetails.jsx";
import AppointmentBooking from "./components/Appointment/AppointmentBooking.jsx";
import { cleanupAvailability } from "./api/DoctorDashboard/CalendarAPI";

function App() {
  useEffect(() => {
    cleanupAvailability();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-login" element={<Login />} />
        <Route path="/patient-register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/doctorsFilter" element={<DoctorsList />} />
        <Route path="/all-conditions" element={<ConditionsPage />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctor-register" element={<DoctorApplication />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor/:id/*" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard/:id" element={<PatientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor-profile/:doctorId" element={<DoctorDetails />} />
        <Route path="/book-appointment/:doctorId" element={<AppointmentBooking />} />
      </Routes>   
      <Footer />
    </Router>
  );
}

export default App;


// json-server --watch db.json --port 5000


