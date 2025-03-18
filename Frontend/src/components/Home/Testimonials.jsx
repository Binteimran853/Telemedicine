import React, { useState, useEffect } from "react";
import { fetchTestimonials } from "../../api/testimonialsAPI";
import SwiperComponent from "../common/Swiper";
import "./HomeCSS/testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
    };
    getTestimonials();
  }, []);

  return (
    <div className="testimonials-section">
      <h2>Our Customers <span className="highlight">love us</span></h2>
      <p>Check out the reviews from our satisfied customers</p>
      <SwiperComponent data={testimonials} />
    </div>
  );
};

export default Testimonials;
