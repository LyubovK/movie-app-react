import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./catalog.scss";

import SearchMovie from "../searchMovies/SearchMovies";
import MovieCard from "../movieCard/MovieCard";
import MoviesGenre from "../moviesGenre/MoviesGenre";

import { category as cate } from "../../api/aoiConfig";

const api_key = "233bf66f6557a07947e7ff65024c45d0";
const url = "https://api.themoviedb.org/3";

const Catalog = () => {
  const { category } = useParams();
  const [item, setItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      if (category === cate.movie) {
        getMovies(cate.movie);
        getGenreList(cate.movie);
      } else {
        getMovies(cate.tv);
        getGenreList(cate.tv);
      }
    };
    getList();
  }, [category]);

  const getMovies = (category, page) => {
    fetch(`${url}/discover/${category}?api_key=${api_key}&page=${(page = 1)}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItem(data.results);
        setTotalPage(data.total_pages);
      });
  };

  const getMoviesMore = (category, page) => {
    fetch(`${url}/discover/${category}?api_key=${api_key}&page=${page}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItem((item) => [...item, ...data.results]);
      });
  };

  const getMoviesSearch = (category, searchTerm) => {
    fetch(`${url}/search/${category}?&api_key=${api_key}&query=${searchTerm}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItem(data.results);
        setTotalPage(data.total_pages);
      });
  };

  const getGenreList = (category) => {
    fetch(`${url}/genre/${category}/list?api_key=${api_key}`)
      .then((resp) => resp.json())
      .then((data) => {
        const genres = data.genres.map((g) => ({
          id: g["id"],
          name: g["name"],
        }));
        setGenres(genres);
      });
  };
  const changeCategory = category === cate.movie ? "movie" : "tv";
  const loadMore = async () => {
    getMoviesMore(changeCategory, page + 1);
    setPage(page + 1);
  };

  const handkeGenreClick = async (id) => {
    fetch(`${url}/discover/${category}?api_key=${api_key}&with_genres=${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItem(data.results);
        console.log(data.results);
      });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMoviesSearch(category, searchTerm);
      setSearchTerm("");
    }
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="header__title">
            {category === cate.movie ? "Movie" : "Tv"}
          </h1>
          <div className="catalog__search search">
            <SearchMovie
              setSearchTerm={setSearchTerm}
              handleOnSubmit={handleOnSubmit}
            />
          </div>
        </div>
      </header>
      <main className="catalog">
        <div className="container container-fluid">
          <div className="genre-list">
            <MoviesGenre genres={genres} handkeGenreClick={handkeGenreClick} />
          </div>
          <div className="catalog__movie-list">
            {item.map((movie, i) => (
              <div key={i} className="catalog__card">
                <MovieCard movie={movie} category={category} />
              </div>
            ))}
          </div>
          <div className="loader">
            {page < totalPage ? (
              <button
                className="loader__btn btn btn_pink"
                onClick={() => loadMore()}
              >
                load more
              </button>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default Catalog;
