import { getCastMovie } from "../../../API/index";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import noImage from "../../../assets/no-img.jpg";

const Cast = () => {
  const [isCast, setIsCast] = useState();
  const params = useParams();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const response = await getCastMovie(params.id);
        setIsCast(response.cast);
      } catch (error) {
        setError(error);
        console.error("Error fetching cast:", error);
        setIsCast([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, []);

  const handleSlideChange = () => {
    if (swiperRef.current?.swiper) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  if (loading)
    return <div className="text-center text-white py-5">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-white py-5">
        SOMETHING WENT WRONGGGG...
        {error.message}
      </div>
    );

  if (!isCast || isCast.length === 0)
    return (
      <div className="text-center text-white py-5">No cast available.</div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Cast</h1>
      <div className="relative px-8">
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
            640: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
          onSlideChange={handleSlideChange}
        >
          {isCast?.map((actor) => (
            <SwiperSlide key={actor?.id}>
              <div className="flex flex-col items-center text-white">
                <img
                  src={
                    actor?.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : noImage
                  }
                  className="w-20 h-20 object-cover rounded-full"
                  alt={actor?.name || "No Image"}
                />
                <p className="mt-2 text-sm">{actor?.name}</p>
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

export default Cast;
