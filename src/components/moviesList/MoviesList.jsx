import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper";

import MovieCard from "../movieCard/MovieCard";
import { category, getMoviesList, getSimilarList } from "../../api/apiConfig";

import "./movie-list.scss";

const MoviesList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getFetch = async () => {
      let data = null;
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            data = await getMoviesList(category.movie);
            break;
          default:
            data = await getMoviesList(category.tv);
        }
      } else {
        data = await getSimilarList(props.category, props.id);
        console.log(data);
      }
      setItems(data.results);
    };
    getFetch();
  }, [props.category, props.id, props.type, props]);

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
