import config from "../config/api";
import axios from "axios";

const baseUrl = config.BASE_API_URL;
const apiKey = config.API_KEY;

//HOME PAGE
export async function trending(media = "movie", timeWindow = "day") {
  try {
    const response = await axios.get(`${baseUrl}/trending/${media}/${timeWindow}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching trending:", error);
    return [];
  }
}
  
// export async function trendingMovies(timeWindow = "day") {
//   try {
//     const response = await axios.get(`${baseUrl}/trending/movies/${timeWindow}`, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data.results || [];
//   } catch (error) {
//     console.error("Error fetching trending movies:", error);
//     return [];
//   }
// }

// export async function trendingTV(timeWindow = "day") {
//   try {
//     const response = await axios.get(`${baseUrl}/trending/tv/${timeWindow}`, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data.results || [];
//   } catch (error) {
//     console.error("Error fetching trending TV:", error);
//     return [];
//   }
// }

export async function getTopRated() {
  const response = await axios.get(`${baseUrl}/movie/top_rated`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function getMovieDetails(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function getCastMovie(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}/credits`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },  
  });
  return response.data.cast;
}

export async function getMovieTrailer(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}/videos`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function reviewMovie(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}/reviews`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function photosMovie(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}/images`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.backdrops;
}

export async function recommendedMovies(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}/recommendations`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}


export async function similarMovies(movie_id) {
  const response = await axios.get(`${baseUrl}/movie/${movie_id}/similar`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}


//MOVIES PAGE
export async function discoverMovies() {
  const response = await axios.get(`${baseUrl}/discover/movie`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function nowPlayingMovies() {
  const response = await axios.get(`${baseUrl}/movie/now_playing`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function upcomingMovies() {
  const response = await axios.get(`${baseUrl}/movie/upcoming`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function popularMovies() {
  const response = await axios.get(`${baseUrl}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

//TV SHOWS PAGE
export async function discoverTvShows() {
  const response = await axios.get(`${baseUrl}/discover/tv`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function onAirTvShows() {
  const response = await axios.get(`${baseUrl}/tv/on_the_air`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function airingTodayTvShows() {
  const response = await axios.get(`${baseUrl}/tv/airing_today`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function popularTvShows() {
  const response = await axios.get(`${baseUrl}/tv/popular`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function topRatedTvShows() {
  const response = await axios.get(`${baseUrl}/tv/top_rated`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}