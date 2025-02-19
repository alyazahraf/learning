import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details.jsx";
import Movies from "./pages/Movies.jsx";
import TvShow from "./pages/TVShow.jsx";
import ReviewsPage from "./pages/DetailMovie/Reviews.jsx";
import AllCast from "./pages/DetailMovie/AllCast.jsx";
import Backdrops from "./pages/DetailMovie/Backdrops.jsx";
import Posters from "./pages/DetailMovie/Posters.jsx";
import LogoMovie from "./pages/DetailMovie/Logos.jsx";
import VideosMovie from "./pages/DetailMovie/Videos.jsx";
import SearchResult from "./components/card/home/SearchResult.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="details/:id/allCast" element={<AllCast />} />
        <Route path="details/:id/reviews" element={<ReviewsPage />} />
        <Route path="details/:id/backdrops" element={<Backdrops />} />
        <Route path="/details/:id/posters" element={<Posters />} />
        <Route path="/details/:id/logos" element={<LogoMovie />} />
        <Route path="/details/:id/videos" element={<VideosMovie />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<TvShow />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
