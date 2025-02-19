import { useState, useEffect } from "react";
import { searchMovie } from "../../../API/index";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { FaStar } from "react-icons/fa";
import noImage from "../../../assets/no-img.jpg";

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await searchMovie(query);
        setSearchResults(response || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen text-white pt-20">
        <h2 className="text-xl font-bold mb-5">Search Results for "{query}"</h2>

        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((movie) => (
              <div
                key={movie.id} // Tambahkan key untuk optimasi
                className="relative w-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 bg-gray-100"
                />
                <div className="relative flex flex-row h-72 p-6">
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                        : noImage
                    }
                    alt={movie.title}
                    className="w-[100px] 2xl:w-[150px] aspect-[2/] object-cover rounded-lg shadow-lg bg-blue-950"
                  />
                  <div className="ml-6 w-3/4 text-white">
                    <h3 className="text-xl font-bold">
                      {movie.title || movie.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {movie.release_date}
                    </p>
                    <div className="flex items-center text-yellow-400 mt-1">
                      <FaStar className="mr-1" /> {movie.vote_average}
                      <span className="ml-1 text-gray-400">
                        ({movie.vote_count})
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                      {movie.overview}
                    </p>
                    <Link
                      to={`/details/${movie.id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};
export default SearchResult;
