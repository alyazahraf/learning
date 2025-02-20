import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState, useRef } from "react";
import { popularTvShows } from "../../../API/index";
import { Link } from "react-router-dom";
import noImage from "../../../assets/no-img.jpg";

const PopularTV = () => {
  const [popularTv, setPopularTv] = useState([]);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const fetchPopularTV = async () => {
      const movies = await popularTvShows();
      setPopularTv(movies);
    };
    fetchPopularTV();
  }, []);

  const handleSlideChange = () => {
    if (swiperRef.current?.swiper) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Popular TV</h1>
      <div className="relative px-14">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={10}
          navigation={{
            nextEl: ".top-rated-next",
            prevEl: ".top-rated-prev",
          }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
            1280: { slidesPerView: 10 },
          }}
          onSlideChange={handleSlideChange}
        >
          {popularTv?.map((movie) => (
            <SwiperSlide key={movie?.id}>
              <Link to={`/details/${movie?.id}`}>
                <img
                  src={
                    movie?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noImage
                  }
                  alt={movie?.title}
                  className="rounded-lg object-cover w-36"
                />
              </Link>
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

export default PopularTV;
