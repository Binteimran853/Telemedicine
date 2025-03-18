import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeCSS/servicesection.css";

// Import images
import heroDoctor from "../../assets/images/online-doctor.png";
import appointment from "../../assets/images/appointment-icon.jpg";
import doctor2 from "../../assets/images/doctor-icon.jpg";
import hospital from "../../assets/images/hospital-icon.jpg";
import donate from "../../assets/images/donate-icon.jpg";

const services = [
    {
        title: "Consult Online Now",
        description: "Instantly connect with Specialists through Video call.",
        image: heroDoctor, 
        link: "/consult-online",
        badge: "38 Doctors Online Now",
    },
    {
        title: "Book Appointments",
        description: "Book an Appointment to doctor.",
        image: appointment,
        link: "/in-clinic-appointments",
    },
    {
        title: "See All Doctors",
        description: "See which doctor is best for you.",
        image: doctor2,
        link: "/medicines",
    },
    {
        title: "See All Hospitals",
        description: "See which hospital's doctor is best for you.",
        image: hospital,
        link: "/procedures-surgeries",
    },
    {
        title: "Donate Us",
        description: "Donate us to support financially weak patients.",
        image: donate,
        link: "/laboratory-tests",
    },
];

const ServicesSection = () => {
    const navigate = useNavigate();

    return (
        <div className="services-container">
            {services.map((service, index) => (
                <div key={index} className="service-card" onClick={() => navigate(service.link)}>
                    <div className="image-container"><img src={service.image} alt={service.title} className="service-image" /></div>
                    {service.badge && <span className="service-badge">🟢 {service.badge}</span>}
                    <div className="content-container">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicesSection;
