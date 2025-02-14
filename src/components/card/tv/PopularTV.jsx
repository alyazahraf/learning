import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { popularTvShows } from "../../../API/index";
import { Link } from "react-router-dom";

const PopularTV = () => {
    const [popularTv, setPopularTv] = useState([]);
    
    useEffect(() => {
        const fetchPopularTV = async () => {
            const movies = await popularTvShows();
            setPopularTv(movies);
        }
        fetchPopularTV();
    }, []);

    return (
        <div>
        <h1 className="text-2xl font-bold text-white">Popular TV</h1>
      <Swiper
        modules={[Navigation]}
        slidesPerView={10}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {popularTv.map((movie) => (
          <SwiperSlide key={movie.id} className="flex items-center">
            <div className="flex flex-row items-center flex-y-center  rounded-2xl overflow-hidden relative z-10">
              <div className=" h-full p-5">
                <Link to={`/details/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg object-fill"
                />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

    );
}

export default PopularTV;
