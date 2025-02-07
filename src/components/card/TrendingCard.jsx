import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { getAllMoviesDay } from "../../utils/index";

const TrendingCard = () => {
  const [moviesDay, setMoviesDay] = useState([]);

  useEffect(() => {
    const fetchMoviesDay = async () => {
      const movies = await getAllMoviesDay();
      setMoviesDay(movies);
      console.log(movies);
    };
    fetchMoviesDay();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {moviesDay.map((movie) => (
        <SwiperSlide key={movie.id} className="flex items-center px-14">
          <div className="flex flex-row items-center flex-y-center  rounded-2xl overflow-hidden relative z-10">
            <div className=" h-full p-5">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
            (<h3 className="mt-2 text-center text-lg font-semibold">
              {movie.vote_count}
            </h3>)
            </div>
            <h3 className="mt-2 text-center text-lg font-semibold">
              {movie.overview}
            </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingCard;
