import React from "react";
import "./movies-genre.scss";

const MoviesGenre = (props) => {
  return (
    //   <></>
    <ul className="genre-list">
      {props.genres.map((genre, i) => (
        <li className="genre-list__item" key={i}>
          <button
            className="genre-list__btn"
            type="button"
            onClick={() => {
              props.handkeGenreClick(genre.id);
            }}
          >
            {genre.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MoviesGenre;
