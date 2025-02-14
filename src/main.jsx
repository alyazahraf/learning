import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './pages/Details.jsx';
import Movies from './pages/Movies.jsx';
import TvShow from './pages/TVShow.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<App />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<TvShow />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
