import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";

const SwiperComponent = ({ data }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={3} // Shows 3 testimonials at a time
      spaceBetween={15}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      className="swiper-container"
    >
      {data.map((item) => (
        <SwiperSlide key={item.id} className="swiper-slide">
          <div className="testimonial">
            <img src={item.image} alt={item.name} className="testimonial-img" />
            <p>{item.review}</p>
            <h4>{item.name}</h4>
            <div className="rating">⭐ {item.rating}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
