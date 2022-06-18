import axios from "axios";

const apiKey = "233bf66f6557a07947e7ff65024c45d0";
const url = "https://api.themoviedb.org/3";
const topratedUrl = `${url}/movie/top_rated`;
const img = "https://image.tmdb.org/t/p/w1280/";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const tvType = {
  popular: "popular",
  topRated: "top_rated",
  on_the_iar: "on_the_iar",
};

export const movieType = {
  upcomig: "upcomig",
  popular: "popular",
  top_rated: "top_rated",
};

export const getTopRated = async () => {
  const { data } = await axios.get(topratedUrl, {
    params: {
      api_key: apiKey,
      page: 1,
    },
  });

  const modifiedData = data.results.map((m) => ({
    id: m["id"],
    backPoster: img + m["backdrop_path"],
    popularity: m["popularith"],
    title: m["title"],
    poster: img + m["poster_path"],
    overview: m["overview"],
    rating: m["vote_average"],
  }));

  return modifiedData;
};

export const getMoviesList = async (category, page) => {
  const movieList = `${url}/${category}/popular`;
  const { data } = await axios.get(movieList, {
    params: {
      api_key: apiKey,
      page: page,
    },
  });

  return data;
};

export const getSimilarList = async (category, id) => {
  const movieList = `${url}/${category}/${id}/similar`;
  const { data } = await axios.get(movieList, {
    params: {
      api_key: apiKey,
      page: 1,
    },
  });

  return data;
};

export const getGenreList = async (category) => {
  const genreList = `${url}/genre/${category}/list`;
  const { data } = await axios.get(genreList, {
    params: {
      api_key: apiKey,
    },
  });

  const modifiedData = data.genres.map((g) => ({
    id: g["id"],
    name: g["name"],
  }));
  return modifiedData;
};

export const getMoviesByGenreList = async (category, genre_id) => {
  const genreList = `${url}/discover/${category}`;
  const { data } = await axios.get(genreList, {
    params: {
      api_key: apiKey,
      page: 1,
      with_genres: genre_id,
    },
  });

  // const modifiedData = data.results.map((m) => ({
  //   id: m["id"],
  //   backPoster: img + m["backdrop_path"],
  //   popularity: m["popularith"],
  //   title: m["title"],
  //   poster: img + m["poster_path"],
  //   overview: m["overview"],
  //   rating: m["vote_average"],
  // }));
  return data;
};

export const getMoviesSearch = async (category, query, page) => {
  const movieSearch = `${url}/search/${category}`;
  const { data } = await axios.get(movieSearch, {
    params: {
      api_key: apiKey,
      query: query,
      page: page,
    },
  });

  return data;
};

export const getMovieDetail = async (category, id) => {
  const { data } = await axios.get(`${url}/${category}/${id}`, {
    params: {
      api_key: apiKey,
    },
  });
  return data;
};

export const getMovieVideos = async (category, id) => {
  const { data } = await axios.get(`${url}/${category}/${id}/videos`, {
    params: {
      api_key: apiKey,
    },
  });
  return data.results;
};
