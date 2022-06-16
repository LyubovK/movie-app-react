import React from "react";
import "./search-movies.scss";

const SearchMovie = (props) => {
  return (
    <form onSubmit={props.handleOnSubmit}>
      <input
        className="search__input"
        type="search"
        placeholder="search"
        value={props.value}
        onChange={(e) => {
          props.setSearchTerm(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchMovie;
