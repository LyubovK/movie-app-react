import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import MovieDetail from "./components/movieDetail/MovieDetail";
import Catalog from "./components/сatalog/Catalog";

export function App() {
  return (
    <div className="page-wrap">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/:category/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
