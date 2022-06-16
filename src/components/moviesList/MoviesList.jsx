import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper";

import MovieCard from "../movieCard/MovieCard";
import { category } from "../../api/aoiConfig";

import "./movie-list.scss";

const api_key = "233bf66f6557a07947e7ff65024c45d0";
const url = "https://api.themoviedb.org/3";

const MoviesList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getFetch = async () => {
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            getList(category.movie);
            break;
          default:
            getList(category.tv);
        }
      } else {
        getSimilar(props.category, props.id);
      }
    };
    getFetch();
  }, [props.category, props.id, props.type, props]);
  const getList = (category) => {
    fetch(`${url}/${category}/popular?api_key=${api_key}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItems(data.results);
      });
  };

  const getSimilar = (category, id) => {
    fetch(`${url}/${category}/${id}/similar?api_key=${api_key}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItems(data.results);
      });
  };

  const movieList = items.slice(0, 10).map((item, i) => {
    return (
      <SwiperSlide key={i} className="movie-list__card movie-card">
        <MovieCard item={item} category={props.category} />
      </SwiperSlide>
    );
  });
  return (
    <>
      <Swiper
        modules={[A11y, Navigation, Autoplay]}
        navigation
        grabCursor={true}
        spaceBetween={6}
        slidesPerView={"auto"}
        className="movie-swiper"
      >
        {movieList}
      </Swiper>
    </>
  );
};

export default MoviesList;
