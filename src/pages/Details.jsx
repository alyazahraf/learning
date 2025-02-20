import { useState, useEffect, useRef } from "react";
import Navbar from "../components/common/Navbar";
import { getMovieDetails } from "../API/index";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Cast from "../components/card/details/cast";
import Reviews from "../components/card/details/reviews";
import Teaser from "../components/card/details/teaser";
import Photos from "../components/card/details/photos";
import Recommended from "../components/card/details/recommended";
import Similar from "../components/card/details/similar";
import DetailCard from "../components/card/details/detailCard";
import SubNavbar from "../components/common/SubNavbar";
import noImage from "../assets/no-img.jpg";

const Details = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState();
  const params = useParams();
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getMovieDetails(params.id);
      setDetails(response.data);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center">
        <img
          src={
            details?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${details?.backdrop_path}`
              : noImage
          }
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75 -z-10 "
          alt={details?.title}
        />
        <div className="absolute -z-10 inset-0 shadow-[inset_0_-50px_210px_140px_rgba(0,0,0,1)] md:shadow-[inset_0_-50px_310px_150px_rgba(0,0,0,1)] pointer-events-none" />

        <div className="relative gap-0 px-5 lg:px-10 h-full flex items-center">
          <div className="flex gap-10 items-center text-white flex-col lg:flex-row">
            <div className="md:scale-90 aspect-[5/7] flex-1 lg:basis-5/12 xl:basis-4/12">
              <img
                src={
                  details?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${details?.poster_path}`
                    : noImage
                }
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
                <FaStar className="mr-1" />{" "}
                <span>{details?.vote_average}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubNavbar params={params} />
      <div className="space-y-10 pt-5">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="md:w-1/2 space-y-14">
            <Cast />
            <DetailCard />
            <Reviews />
          </div>
          <div className="md:w-1/2 space-y-14">
            <Teaser />
            <Photos />
          </div>
        </div>
      </div>
      <Recommended />
      <Similar />
    </div>
  );
};

export default Details;
