import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./movie-detail.scss";
import MovieVideo from "./MovieVideo";
import MoviesList from "../moviesList/MoviesList";
import { getMovieDetail } from "../../api/apiConfig";

export function MovieDetail() {
  const img = "https://image.tmdb.org/t/p/w1280/";

  const { category, id } = useParams();
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const getFetch = async () => {
      setDetail(await getMovieDetail(category, id));
    };
    getFetch();
  }, [category, id]);
  const bgImg = img + detail.backdrop_path;
  const poster = img + detail.poster_path;
  return (
    <>
      <header
        className="header header_detail"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="container">
          <h1 className="header__title">{category}</h1>
        </div>
      </header>
      <main className="movie-detail">
        <section className="movie-detail__detail">
          <div className="container">
            <div className="movie-detail__poster">
              <img src={poster} alt={detail.title || detail.name} />
            </div>
            <div className="movie-detail__info">
              <h2 className="movie-detail__title">
                {detail.title || detail.name}
              </h2>
              <ul className="movie-detail__genres genre-list">
                {detail.genres &&
                  detail.genres.slice(0, 7).map((g, i) => (
                    <li className="genre-list__item" key={i}>
                      <p className="genre-list__btn">{g.name}</p>
                    </li>
                  ))}
              </ul>
              <p className="movie-detail__overview">{detail.overview}</p>
            </div>
          </div>
        </section>
        <section className="movie-detail__video">
          <div className="container">
            <MovieVideo id={detail.id} />
          </div>
        </section>
        <section className="similar-list">
          <div className="container-fluid">
            <MoviesList category={category} id={id} type="similar" />
          </div>
        </section>
      </main>
    </>
  );
}

export default MovieDetail;
