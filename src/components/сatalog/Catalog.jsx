import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./catalog.scss";

import SearchMovie from "../searchMovies/SearchMovies";
import MovieCard from "../movieCard/MovieCard";
import MoviesGenre from "../moviesGenre/MoviesGenre";

import {
  category as cate,
  getGenreList,
  getMoviesList,
  getMoviesByGenreList,
  getMoviesSearch,
} from "../../api/apiConfig";

const Catalog = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const getList = async () => {
      let data = null;
      if (category === cate.movie) {
        data = await getMoviesList(cate.movie);
        setGenres(await getGenreList(cate.movie));
      } else {
        data = await getMoviesList(cate.tv);
        setGenres(await getGenreList(cate.tv));
      }
      setItems(data.results);
      setTotalPage(data.total_pages);
    };
    getList();
  }, [category]);

  const changeCategory = category === cate.movie ? "movie" : "tv";
  const loadMore = async () => {
    let data = await getMoviesList(changeCategory, page + 1);
    setItems([...items, ...data.results]);
    setPage(page + 1);
  };

  const handkeGenreClick = async (id) => {
    const data = await getMoviesByGenreList(category, id);
    setItems(data.results);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      setItems(await getMoviesSearch(category, searchTerm));
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
            {items.map((item, i) => (
              <div key={i} className="catalog__card">
                <MovieCard item={item} category={category} />
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
