const API_URL = "http://localhost:5000";

export const fetchDoctorApplications = async () => {
  const response = await fetch(`${API_URL}/doctor_applications`);
  return response.json();
};

export const approveDoctor = async (id) => {
  // Step 1: Fetch the doctor application by ID
  const response = await fetch(`${API_URL}/doctor_applications/${id}`);
  const doctor = await response.json();

  if (!doctor) {
    throw new Error("Doctor application not found.");
  }

  // Step 2: Move doctor to `doctors` collection
  await fetch(`${API_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...doctor, status: "approved" }),
  });

  // Step 3: Remove doctor from `doctor_applications`
  await fetch(`${API_URL}/doctor_applications/${id}`, {
    method: "DELETE",
  });
};


export const rejectDoctor = async (id) => {
  await fetch(`${API_URL}/doctor_applications/${id}`, {
    method: "DELETE",
  });
};

