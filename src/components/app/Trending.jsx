import { useState } from "react";
import TrendingCard from "../card/TrendingCard";
import TopRatedCard from "../card/TopRatedCard";

const TrendingMovies = () => {
  const [media, setMedia] = useState("movie");
  const [time, setTime] = useState("day");

  const handleMediaChange = (newMedia) => {
    if (["all", "movie", "tv"].includes(newMedia)) {
      setMedia(newMedia);
    } else {
      console.error("Invalid media type");
    }
  };

  const handleTimeChange = (newTime) => {
    if (["day", "week"].includes(newTime)) {
      setTime(newTime);
    } else {
      console.error("Invalid time type");
    }
  };

  return (
    <div className="flex gap-4 my-4 flex-col text-white rounded-lg w-full px-10 overflow-hidden ">
      <div>
        <h1 className="text-xl font-bold">Trending</h1>
      </div>
      <div className="flex gap-4">
        <div className="flex bg-gray-800 rounded-full p-1">
          {["all", "movie", "tv"].map((item) => (
            <button
              key={item}
              onClick={() => handleMediaChange(item)}
              className={`px-4 py-1 rounded-full transition-colors duration-200 ${
                media === item ? "bg-blue-500" : "text-gray-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex bg-gray-800 rounded-full p-1">
          {["day", "week"].map((item) => (
            <button
              key={item}
              onClick={() => handleTimeChange(item)}
              className={`px-4 py-1 rounded-full transition-colors duration-200 ${
                time === item ? "bg-blue-500" : "text-gray-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <TrendingCard media={media} time={time} />
      </div>
      
    </div>
  );
};

export default TrendingMovies;
