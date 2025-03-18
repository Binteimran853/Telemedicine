import React, { useState, useEffect } from "react";
import { getDoctorAppointments } from "../../../api/Authenthication/doctorAuth"; 

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await getDoctorAppointments();
            setAppointments(data);
        };

        fetchAppointments();
    }, []);

    return (
        <div className="appointments">
            <h2>Appointments</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            {appointment.patientName} - {appointment.date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments scheduled.</p>
            )}
        </div>
    );
};

export default Appointments;
