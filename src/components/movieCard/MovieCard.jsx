import React from "react";
import ReactStars from "react-rating-stars-component";

import defImg from "../../assets/img/def-img.jpg";
import { category } from "../../api/apiConfig";
import { Link } from "react-router-dom";

import "./movie-card.scss";

const MovieCard = (props) => {
  const item = props.item;
  const link = `/${category[props.category]}/${item.id}`;
  const poster = `https://image.tmdb.org/t/p/w1280/${item.poster_path}`;
  return (
    <Link className="movie-card__link" to={link}>
      <div className="movie-card__wrap">
        <img src={item.poster_path ? poster : defImg} alt={item.title} />
        <div className="movie-card__body">
          <ReactStars
            classNames="movie-card__rage"
            value={item.vote_average}
            count={10}
            edit={false}
            size={20}
            isHalf={true}
            activeColor="white"
          />
          <h3 className="movie-card__title movie-card__title_small">
            {item.title || item.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
