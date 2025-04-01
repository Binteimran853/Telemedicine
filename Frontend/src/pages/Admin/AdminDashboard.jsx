import { useEffect, useState } from "react";
import { fetchDoctorApplications, approveDoctor, rejectDoctor } from "../../api/DoctorUsers/doctorApi";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      const data = await fetchDoctorApplications();
      setApplications(data);
    };

    loadApplications();
  }, []);

  const handleApproval = async (id) => {
    await approveDoctor(id);
    alert("Doctor Approved!");
    setApplications(applications.map(app => app.id === id ? { ...app, status: "approved" } : app));
  };

  const handleRejection = async (id) => {
    await rejectDoctor(id);
    alert("Doctor Rejected!");
    setApplications(applications.map(app => app.id === id ? { ...app, status: "rejected" } : app));
  };

  return (
    <div>
      <h2>Admin Panel - Manage Doctor Applications</h2>
      {applications.length === 0 ? <p>No Applications Found</p> : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience} years</td>
                <td>{doctor.status}</td>
                <td>
                  {doctor.status === "pending" && (
                    <>
                      <button onClick={() => handleApproval(doctor.id)}>Approve</button>
                      <button onClick={() => handleRejection(doctor.id)}>Reject</button>
                    </>
                  )}
                  {doctor.status !== "pending" && <span>{doctor.status.toUpperCase()}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
