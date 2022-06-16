import React, { useState, useEffect } from "react";

import MoviesList from "../moviesList/MoviesList";
import HeroSlider from "../heroSlider/HeroSlider";
import { category } from "../../api/aoiConfig";
import { Link } from "react-router-dom";

const api_key = "233bf66f6557a07947e7ff65024c45d0";
const url = "https://api.themoviedb.org/3";

// export const category = {
//   movie: "movie",
//   tv: "tv",
// };

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const request = async () => {
      getNowPlaying();
    };
    request();
  }, []);

  const getNowPlaying = () => {
    fetch(`${url}/movie/top_rated?api_key=${api_key}`)
      .then((resp) => resp.json())
      .then((data) => {
        setNowPlaying(data.results);
      });
  };

  return (
    <>
      <div>
        <HeroSlider nowPlaying={nowPlaying} />
      </div>
      <main className="container-fluid">
        <section className="movie-list">
          <div className="movie-list__link-holder">
            <Link to="/movie" className="movie-list__link">
              <span>New releases</span>
              <span className="icon-chevron-right"></span>
            </Link>
          </div>

          <MoviesList category={category.movie} />
        </section>
        <section className="tv-list">
          <div className="tv-list__link-holder">
            <Link to="/tv" className="tv-list__link">
              <span>Featured TV shows</span>
              <span className="icon-chevron-right"></span>
            </Link>
          </div>

          <MoviesList category={category.tv} />
        </section>
      </main>
      <footer>footer</footer>
    </>
  );
};

export default Home;
