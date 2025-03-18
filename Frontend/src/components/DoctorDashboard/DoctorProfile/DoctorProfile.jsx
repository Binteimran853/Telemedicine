import React from "react";

const DoctorProfile = ({ doctor }) => {
    return (
        <div className="doctor-profile">
            <h2>Welcome, Dr. {doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Phone:</strong> {doctor.phone}</p>
        </div>
    );
};

export default DoctorProfile;
