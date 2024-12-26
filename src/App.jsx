import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FavoriteMoviesPage from "./pages/FavoriteMoviesPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoriteMoviesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
