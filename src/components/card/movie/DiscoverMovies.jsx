import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState, useRef } from "react";
import { discoverMovies } from "../../../API/index";
import { FaStar } from "react-icons/fa";

const DiscoverMovies = () => {
  const [discoverMovie, setDiscoverMovie] = useState([]);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const fetchDiscoverMovie = async () => {
      const movies = await discoverMovies();
      setDiscoverMovie(movies);
    };
    fetchDiscoverMovie();
  }, []);

  const handleSlideChange = () => {
    if (swiperRef.current?.swiper) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };
  return (
    <div>
      <div className="relative px-14 ">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            nextEl: ".top-rated-next",
            prevEl: ".top-rated-prev",
          }}
          breakpoints={{
            1280: { slidesPerView: 3 },
            1024: { slidesPerView: 2 },
            768: { slidesPerView: 1.5 },
            0: { slidesPerView: 1 },
          }}
          onSlideChange={handleSlideChange}
        >
          {discoverMovie.map((movie) => (
            <SwiperSlide key={movie.id} className="flex ">
              <div className="relative w-full rounded-2xl overflow-auto bg-gray-900 shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative flex flex-row h-72 p-6">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[150px] aspect-[2/3] object-cover rounded-lg shadow-lg"
                  />
                  <div className="ml-6 w-3/4 text-white">
                    <h3 className="text-xl font-bold ">
                      {movie.title ? movie.title : movie.name}
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
                    <a
                      href={`/details/${movie.id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`button-prev ${
            isBeginning
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-500 hover:text-blue-700"
          }`}
          onClick={() => {
            if (!isBeginning) {
              swiperRef.current?.swiper.slidePrev();
            }
          }}
        >
          ❮
        </button>
        <button
          className={`button-next ${
            isEnd
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-500 hover:text-blue-700"
          }`}
          onClick={() => {
            if (!isEnd) {
              swiperRef.current?.swiper.slideNext();
            }
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default DiscoverMovies;
