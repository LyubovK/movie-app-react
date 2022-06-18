import React from "react";
import ReactStars from "react-rating-stars-component";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./hero-slider.scss";

const HeroSlider = (props) => {
  console.log(props);
  const heroSlide = props.topRated.slice(0, 5).map((slide, i) => {
    return (
      <SwiperSlide key={i}>
        <div
          className="hero-slider__wrap"
          style={{ backgroundImage: `url(${slide.backPoster})` }}
        >
          <div className="hero-slider__content">
            <ReactStars
              classNames="movie-card__rage"
              value={slide.rating}
              count={10}
              edit={false}
              size={20}
              isHalf={true}
              activeColor="white"
            />

            <h2 className="hero-slider__title">{slide.title}</h2>
            <p className="hero-slider__paragraph">{slide.overview}</p>
            <div className="hero-slider__btn-holder">
              <Link className="btn btn_turquoise" to={`/movie/${slide.id}`}>
                More info
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <section className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {heroSlide}
      </Swiper>
    </section>
  );
};
export default HeroSlider;
