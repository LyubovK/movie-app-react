import React, { useState, useEffect } from "react";

import MoviesList from "../moviesList/MoviesList";
import HeroSlider from "../heroSlider/HeroSlider";
import { category, getTopRated } from "../../api/apiConfig";
import { Link } from "react-router-dom";

const Home = () => {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const request = async () => {
      setTopRated(await getTopRated());
    };
    request();
  }, []);

  return (
    <>
      <div>
        <HeroSlider topRated={topRated} />
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
