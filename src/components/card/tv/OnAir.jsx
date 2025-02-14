import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { onAirTvShows } from "../../../API/index";
import { Link } from "react-router-dom";

const OnAir = () => {
    const [onAir, setOnAir] = useState([]);
    
    useEffect(() => {
        const fetchOnAir = async () => {
            const movies = await onAirTvShows();
            setOnAir(movies);
        }
        fetchOnAir();
    }, []);

    return (
        <div>
        <h1 className="text-2xl font-bold text-white">On Air</h1>
      <Swiper
        modules={[Navigation]}
        slidesPerView={10}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {onAir.map((movie) => (
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

export default OnAir;
