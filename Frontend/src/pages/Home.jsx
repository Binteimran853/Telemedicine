import React from "react";
import HeroSection from "../components/Home/Herosection";
import ServicesSection from "../components/Home/ServiceSection"
import DoctorsSection from "../components/Home/ChooseDoctorSection"
import Testimonials from "../components/Home/Testimonials";


const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <DoctorsSection />
      <Testimonials />
    </div>
  );
};

export default Home;
