import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { similarMovies } from "../../../API/index";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import noImage from "../../../assets/no-img.jpg";

const Similar = () => {
  const [similar, setSimilar] = useState([]);
  const params = useParams();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const response = await similarMovies(params.id);
        setSimilar(response || []);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
        setSimilar([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSimilar();
  }, [params.id]);

  const handleSlideChange = () => {
    if (swiperRef.current?.swiper) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div className="py-10">
      <h1>Similar Movies</h1>
      <div className="relative px-14">
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : similar.length === 0 ? (
          <p className="text-white italic text-center">
            No similar movies available
          </p>
        ) : (
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
            }}
            onSlideChange={handleSlideChange}
          >
            {similar?.map((movie) => (
              <SwiperSlide key={movie?.id}>
                <a href={`/details/${movie.id}`}>
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : noImage
                    }
                    alt={movie?.title}
                    className="rounded-lg object-cover w-36"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {similar?.length > 0 && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Similar;
