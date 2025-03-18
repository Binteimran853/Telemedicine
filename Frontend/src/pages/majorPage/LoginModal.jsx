import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css"; // Import CSS
import { AiOutlineClose } from "react-icons/ai"; // Close icon

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize navigation

  if (!isOpen) return null;

  const handleSelect = (type) => {
    if (type === "patient") {
      navigate("/patient-login"); // Redirect to patient login
    } else if (type === "doctor") {
      navigate("/doctor-login"); // Redirect to doctor login
    }
    onClose(); // Close modal after selection
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
        <h2>Select Login Type</h2>
        <button className="modal-option" onClick={() => handleSelect("patient")}>
          Login as Patient
        </button>
        <button className="modal-option" onClick={() => handleSelect("doctor")}>
          Login as Doctor
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
