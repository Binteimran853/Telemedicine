import React, { useState, useEffect } from "react";
import { getDoctorPatients } from "../../../api/Authenthication/doctorAuth";

const Patients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const data = await getDoctorPatients();
            setPatients(data);
        };

        fetchPatients();
    }, []);

    return (
        <div className="patients">
            <h2>Patients</h2>
            {patients.length > 0 ? (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.id}>
                            {patient.name} - {patient.age} years old
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No registered patients yet.</p>
            )}
        </div>
    );
};

export default Patients;
