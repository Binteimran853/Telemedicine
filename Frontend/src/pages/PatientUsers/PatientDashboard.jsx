import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PatientDashboard = () => {
    const { id } = useParams(); // Get patient ID from URL
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await fetch(`http://localhost:5000/patients?id=${id}`);
                const data = await response.json();

                if (data.length > 0) {
                    setPatient(data[0]); // JSON Server returns an array, get first result
                } else {
                    setError("Patient profile not found.");
                }
            } catch (err) {
                setError("Error fetching patient.");
                console.error("Error fetching patient:", err.message);
            }
        };

        fetchPatient();
    }, [id]);

    if (error) return <h3>{error}</h3>;
    if (!patient) return <h3>Loading...</h3>;

    return (
        <div>
            <h2>Welcome, {patient.name}</h2>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Phone: {patient.phone}</p>
        </div>
    );
};

export default PatientDashboard;
