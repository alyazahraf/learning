import Header from "../../components/common/Header";
import SubNavbar from "../../components/common/SubNavbar";
import { useParams } from "react-router-dom";
import { getCastMovie } from "../../API";
import { useState, useEffect } from "react";

const AllCast = () => {
  const params = useParams();
  const [cast, setIsCast] = useState();

  useEffect(() => {
    const fetchCast = async () => {
      const response = await getCastMovie(params.id);
      setIsCast(response);
    };
    fetchCast();
  }, []);

  const initialCount = 20;
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isExpanded, setIsExpanded] = useState(false);

  const showMore = () => {
    setVisibleCount(cast.length);
    setIsExpanded(true);
  };

  const showLess = () => {
    setVisibleCount(initialCount);
    setIsExpanded(false);
  };

  return (
    <div>
      <Header />
      <SubNavbar params={params} />
      <div className="pt-5">
        <h1>Cast</h1>
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
          {cast?.cast?.slice(0, visibleCount)?.map((actor) => (
            <div
              key={actor?.id}
              className="flex flex-col items-center text-center"
            >
              <img
                src={
                  actor?.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor?.profile_path}`
                    : "https://via.placeholder.com/100x150?text=No+Image"
                }
                alt={actor?.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
              />
              <p className="mt-2 text-sm">{actor?.name}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {!isExpanded ? (
            <button
              onClick={showMore}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mx-2"
            >
              Show more
            </button>
          ) : (
            <button
              onClick={showLess}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mx-2"
            >
              Show less
            </button>
          )}
        </div>
      </div>
      <div className="pt-5">
        <h1>Crew</h1>
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
          {cast?.crew?.slice(0, visibleCount)?.map((actor) => (
            <div
              key={actor?.id}
              className="flex flex-col items-center text-center"
            >
              <img
                src={
                  actor?.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor?.profile_path}`
                    : "https://via.placeholder.com/100x150?text=No+Image"
                }
                alt={actor?.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
              />
              <p className="mt-2 text-sm">{actor?.name}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {!isExpanded ? (
            <button
              onClick={showMore}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mx-2"
            >
              Show more
            </button>
          ) : (
            <button
              onClick={showLess}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mx-2"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCast;
