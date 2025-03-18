import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/TELEMEDICINE-logo-white.png"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company-info">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
  <img src={logo} alt="Telemedicine Logo" className="logo" />
</Link>
          <p>
            Providing online doctor consultations and healthcare services
            across Pakistan, making quality healthcare accessible and
            convenient.
          </p>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Delivery Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Payment Terms</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Process</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Major Cities</h3>
          <ul>
          <li><a href="#">Lahore</a></li>
            <li><a href="#">Islamabad</a></li>
            <li><a href="#">Gujranwala</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Top Hospitals</h3>
          <ul>
          <li><a href="#">DHQ Teaching Hospital</a></li>
            <li><a href="#">GINUM Cancer Hospital</a></li>
            <li><a href="#">Combined Military Hospital </a></li>
            <li><a href="#">Mayo Hospital</a></li>
            <li><a href="#">Jinnah Hospital</a></li>
            <li><a href="#">Services Hospital</a></li>
            <li><a href="#">Shifa International Hospital</a></li>
            <li><a href="#">Capital Hospital</a></li>
            <li><a href="#">PAEC General Hospital</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Donate Us</h3>
          <ul>
            <li><a href="#">Support Healthcare Access</a></li>
            <li><a href="#">Sponsor a Patient</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-icons">
          <span>✔ PMC Verified Doctors</span>
          <span>✔ Reliable Customer Support</span>
          <span>✔ Secure Online Payment</span>
        </div>
        <p>
          © {new Date().getFullYear()} Telemedicine. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
