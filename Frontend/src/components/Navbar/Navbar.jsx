import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/TELEMEDICINE-logo.png";
import { AuthContext } from "../../context/AuthContext.jsx";
import LoginModal from "../../pages/majorPage/LoginModal.jsx"; // Import LoginModal

const Navbar = () => {
  const { user, role, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();

  const handleLoginRedirect = (userType) => {
    alert(`Redirecting to ${userType} login...`); // Replace with navigation logic
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Telemedicine Logo" className="logo" />
        </Link>
        
        {!user || role !== "doctor" ? (
          <ul className="nav-links">
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/hospitals">Hospitals</Link></li>
            <li><Link to="/consult">Book Appointment</Link></li>
            <li><Link to="/consult">Donate Us</Link></li>
          </ul>
        ) : null}
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <button className="user">
                  {role === "doctor" ? `Hi, ${user.name}` : `Hi, ${user.name}`}
                </button>
              </li>
              
              {role === "doctor" && (
                <li>
                  <button className="help-btn hover-btn" onClick={() => navigate("/help")}>
                    Need Help?
                  </button>
                </li>
              )}

              <li>
                <button className="logout-btn hover-btn" onClick={() => { logout(); navigate("/"); }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="login-btn hover-btn" onClick={() => setIsModalOpen(true)}>
                  LogIn/SignUp
                </button>
              </li>
              <li>
                <button className="join-btn hover-btn" onClick={() => navigate("/doctor-register")}>
                  Join as Doctor
                </button>
              </li>
            </>
          )}
        </ul>
        <button className="phone-btn">📞 04238900939</button>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleLoginRedirect}
      />
    </nav>
  );
};

export default Navbar;
