import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { trending } from "../../../API/index";

const TrendingCard = ({media, time}) => {
  const [Trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchAllTrending = async () => {
      const movies = await trending(media, time);
      setTrending(movies);
    };
    fetchAllTrending();
  }, [media, time]);

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={3}
      navigation

    >
      {Trending.map((movie) => (
        <SwiperSlide key={movie.id} className="flex items-center px-14">
        <div className="flex flex-row items-center flex-y-center  rounded-2xl overflow-hidden relative z-10">
          <div className=" h-full p-5">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg object-fill"
            />
          </div>
          <div>
            <h3 className="mt-2 text-center text-lg font-semibold">
              {movie.original_title}
            </h3>

            <div className="flex flex-row items-center flex-y-center gap-2">
              <h3 className="mt-2 text-center text-lg font-semibold">
                {movie.release_date}
              </h3>
              <h3 className="mt-2 text-center text-lg font-semibold">
                {movie.vote_average}
              </h3>
              (
              <h3 className="mt-2 text-center text-lg font-semibold">
                {movie.vote_count}
              </h3>
              )
            </div>
            <h3 className="mt-2 text-center text-lg font-semibold">
              {movie.overview}
            </h3>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a href={`/details/${movie.id}`}>Details</a>
          </button>
        </div>
      </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingCard;
