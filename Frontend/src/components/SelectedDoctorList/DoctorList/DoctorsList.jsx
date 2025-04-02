import React, { useEffect, useState } from "react";
import { fetchDoctors } from "../../../api/SelectedDoctorList/DoctorListApi";
import DoctorItem from "./DoctorItem";
import { useSearchParams } from "react-router-dom";
import "./DoctorsList.css";

const DoctorsList = () => {
  const [searchParams] = useSearchParams();
  
  // Get speciality & location from query params
  const speciality = searchParams.get("specialty") || "";
  const location = searchParams.get("location") || "Gujranwala"; // Default to Gujranwala
  
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState(3);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      if (!speciality) {
        console.error("No speciality provided!");
        return;
      }
    
      const data = await fetchDoctors();
    
      // Extract only the required fields
      const filtered = data.map(({ id, name, specialization, qualification, experience, satisfaction, fee, rating, discount, location, videoConsultation, available_today, image }) => ({
        id, name, specialization, qualification, experience, satisfaction, fee, rating, discount, location, videoConsultation, available_today, image
      })).filter(doctor =>
        doctor.specialization?.toLowerCase() === speciality.toLowerCase() &&
        doctor.location?.toLowerCase() === location.toLowerCase()
      );
    
      setDoctors(filtered);
      setFilteredDoctors(filtered);
    };
    

    getDoctors();
  }, [speciality, location]);

  const applyFilter = (filterType) => {
    let updatedFilters = [...selectedFilters];

    if (updatedFilters.includes(filterType)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== filterType);
    } else {
      updatedFilters.push(filterType);
    }

    setSelectedFilters(updatedFilters);

    let filteredList = doctors.filter((doctor) => {
      let matches = true;

      if (updatedFilters.includes("female")) {
        matches = matches && doctor.gender?.toLowerCase() === "female";
      }

      if (updatedFilters.includes("available")) {
        matches = matches && doctor.available_today === true;
      }

      if (updatedFilters.includes("discount")) {
        matches = matches && doctor.discount > 0;
      }

      if (updatedFilters.includes("video")) {
        matches = matches && doctor.videoConsultation === true;
      }

      return matches;
    });

    if (updatedFilters.includes("low-fee") && filteredList.length > 0) {
      const minFee = Math.min(...filteredList.map((doctor) => doctor.fee));
      filteredList = filteredList.filter((doctor) => doctor.fee === minFee);
    }

    if (updatedFilters.includes("experienced") && filteredList.length > 0) {
      const maxExperience = Math.max(...filteredList.map((doctor) => doctor.experience));
      filteredList = filteredList.filter((doctor) => doctor.experience === maxExperience);
    }

    if (updatedFilters.includes("high-rated") && filteredList.length > 0) {
      const maxRating = Math.max(...filteredList.map((doctor) => doctor.rating));
      filteredList = filteredList.filter((doctor) => doctor.rating === maxRating);
    }

    setFilteredDoctors(filteredList);
  };

  return (
    <div className="doctors-container">
      <h2>
        {filteredDoctors.length} Best "{speciality || "Doctors"}" in {location} (Choose the one which suits you best!)
      </h2>

      <div className="filters">
        {[
          { type: "female", label: "Female Doctors" },
          { type: "experienced", label: "Most Experienced" },
          { type: "low-fee", label: "Lowest Fee" },
          { type: "high-rated", label: "Highest Rated" },
          { type: "available", label: "Available Today" },
          { type: "discount", label: "Discounts" },
          { type: "video", label: "Video Consultation" }
        ].map(({ type, label }) => (
          <button
            key={type}
            className={selectedFilters.includes(type) ? "active" : ""}
            onClick={() => applyFilter(type)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="doctors-list">
        {filteredDoctors.slice(0, visibleDoctors).map((doctor) => (
          <DoctorItem key={doctor.id} doctor={doctor} location={location} />
        ))}
      </div>

      {visibleDoctors < filteredDoctors.length && (
        <button className="load-more" onClick={() => setVisibleDoctors(visibleDoctors + 5)}>
          Load More Doctors
        </button>
      )}
    </div>
  );
};

export default DoctorsList;
