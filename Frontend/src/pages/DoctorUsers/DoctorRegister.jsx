import React from "react";
import { useState } from "react";
import { applyAsDoctor } from "../../api/Authenthication/doctorAuth";
import "../../components/Authenthication/auth.css";
import { useNavigate } from "react-router-dom";

const DoctorApplication = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    contact: "",
    license: "",
    status: "pending", // Default status
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await applyAsDoctor(formData);
      alert("Application Submitted! Verification Message will be sent to your Email.");
      navigate("/")
    } catch (error) {
      alert(error.message || "Error submitting application.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="headingh2">Apply as a Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience (Years)" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
        <input type="text" name="license" placeholder="Medical License ID" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DoctorApplication;
