import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import {
  getMovieDetails,
  getCastMovie,
  getMovieTrailer,
  reviewMovie,
  photosMovie,
  recommendedMovies,
  similarMovies,
} from "../API/index";
import { Link, useParams } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaTwitter, FaStar } from "react-icons/fa";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Details = () => {
  const [isOverview, setIsOverview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCast, setIsCast] = useState();
  const [isTrailer, setIsTrailer] = useState();
  const [review, setReview] = useState();
  const [photos, setPhotos] = useState();
  const [recommended, setRecommended] = useState();
  const [similar, setSimilar] = useState();
  const params = useParams();
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getMovieDetails(params.id);
      setDetails(response.data);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await getCastMovie(params.id);
      setIsCast(response);
    };
    fetchCast();
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await getMovieTrailer(params.id);
      setIsTrailer(response);
    };
    fetchTrailer();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await reviewMovie(params.id);
      setReview(response);
    };
    fetchReview();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await photosMovie(params.id);
      setPhotos(response);
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      const response = await recommendedMovies(params.id);
      setRecommended(response);
    };
    fetchRecommended();
  }, []);

  useEffect(() => {
    const fetchSimilar = async () => {
      const response = await similarMovies(params.id);
      setSimilar(response);
    };
    fetchSimilar();
  }, []);

  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center">
        <img
          src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`}
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75 -z-10 "
          alt={details?.title}
        />
        <div className="absolute -z-10 inset-0 shadow-[inset_0_-50px_210px_140px_rgba(0,0,0,1)] md:shadow-[inset_0_-50px_310px_150px_rgba(0,0,0,1)] pointer-events-none" />

        <div className="relative gap-0 px-5 lg:px-10 h-full flex items-center">
          <div className="flex gap-10 items-center text-white flex-col lg:flex-row">
            <div className="md:scale-90 aspect-[5/7] flex-1 lg:basis-5/12 xl:basis-4/12">
              <img
                src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
                alt={details?.title}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold">
                {details?.title}
              </h1>
              <h3 className="text-xl italic">{details?.tagline}</h3>
              <p className="text-lg">{details?.overview}</p>
              <div className="flex items-center gap-4 text-md">
                <span className="bg-blue-600 px-4 py-1 rounded-lg">
                  {details?.runtime}m
                </span>
                <span>{details?.release_date}</span>
                <span className="capitalize">
                  {details?.genres?.map((genre) => genre.name).join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                ⭐ <span>{details?.vote_average}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full items-center justify-center flex flex-row gap-5 p-5">
        <div className="relative">
          <button
            className="text-lg font-medium flex items-center gap-1"
            onClick={() => setIsOverview(!isOverview)}
          >
            Overview <BiChevronDown className="w-6 h-6" />
          </button>
          {isOverview && (
            <div className="absolute left-0 mt-2 w-36 bg-white text-black rounded-lg shadow-lg">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Main
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Cast
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-lg font-medium flex items-center gap-1"
          >
            Media <BiChevronDown className="w-6 h-6" />
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-36 bg-white text-black rounded-lg shadow-lg">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Backdrops
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Posters
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logos
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Videos
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <button className="text-lg font-medium flex items-center gap-1">
            Reviews
          </button>
        </div>
      </div>
      <div className="py-5 space-y-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="md:w-1/2 space-y-14">
            {isCast && isCast.length > 0 && (
              <div className="py-5">
                <h1 className="text-2xl font-bold text-white">Cast</h1>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={5}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 7 },
                  }}
                  modules={[Navigation]}
                  navigation
                >
                  {isCast.map((actor) => (
                    <SwiperSlide key={actor.id}>
                      <div className="flex flex-col items-center text-white">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                          className="w-20 h-20 object-cover rounded-full"
                          alt={actor.name}
                        />
                        <p className="mt-2 text-sm">{actor.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            <div>
              <h1>Details</h1>
              <div className="text-white flex flex-col gap-5">
                {details && (
                  <div className="flex gap-5 justify-between">
                    <div className="flex flex-col gap-5">
                      <div>
                        <h2>Status</h2>
                        <p>{details.status}</p>
                      </div>
                      <div>
                        <h2>Original Language</h2>
                        <p>{details.spoken_languages[0].name}</p>
                      </div>
                      <div>
                        <h2>Budget</h2>
                        <p>{details.budget}</p>
                      </div>
                      <div>
                        <h2>Revenue</h2>
                        <p>{details.revenue}</p>
                      </div>
                    </div>
                    <div>
                      <h2>Social</h2>
                      <div className="flex gap-5">
                        <FaFacebook className="w-6 h-6" />
                        <FaInstagram className="w-6 h-6" />
                        <FaTwitter className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1>Reviews</h1>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {review?.map((review) => (
                  <div key={review.id} className="border p-4 rounded-lg">
                    <div className="flex items-center gap-1">
                      {Array.from({
                        length: review?.author_details?.rating || 0,
                      }).map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-yellow-500 w-5 h-5 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <p className="italic">"{review?.content}"</p>
                    <p className="text-sm text-gray-500">by {review?.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-14">
            <div>
              <h1>Teaser</h1>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
                {isTrailer?.slice(0, 5)?.map((video) => (
                  <iframe
                    key={video.id}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    className="w-full aspect-video rounded-2xl"
                  ></iframe>
                ))}
              </div>
            </div>
            <div>
              <h1>Photos</h1>
              <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
                {photos?.slice(0, 5)?.map((photo) => (
                  <img
                    key={photo.file_path}
                    src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
                    alt={photo.file_path}
                    className="w-full aspect-photo rounded-2xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Recommended Movies</h1>
        <div className="flex gap-5">
        <Swiper
        spaceBetween={10}
        slidesPerView={5}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
        modules={[Navigation]}
        navigation
      >
        {recommended?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex flex-col items-center text-white">
            <a href={`/details/${movie.id}`}>

              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
                className="w-20  object-cover rounded-lg"
              />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
      </div>
      <div>
        <h1>Similar Movies</h1>
        <div className="flex gap-5">
        <Swiper
        spaceBetween={10}
        slidesPerView={5}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
        modules={[Navigation]}
        navigation
      >
        {similar?.map((movie) => (
  <SwiperSlide key={movie.id}>
    <div className="flex flex-col items-center text-white">
      <a href={`/details/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className="w-20 object-cover rounded-lg"
        />
      </a>
    </div>
  </SwiperSlide>
))}

      </Swiper>
          </div>
      </div>
    </div>
  );
};

export default Details;
