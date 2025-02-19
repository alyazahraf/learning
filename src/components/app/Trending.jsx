import { useState } from "react";
import TrendingCard from "../card/home/TrendingCard";

const Trending = () => {
  const [media, setMedia] = useState("movie");
  const [time, setTime] = useState("day");

  return (
    <div className="flex gap-4 mb-10 flex-col text-white rounded-lg w-full overflow-hidden pt-20 ">
      <div>
        <h1>Trending</h1>
      </div>
      <div className="flex gap-4">
        <div className="flex bg-gray-800 rounded-full p-1">
          {["all", "movie", "tv"].map((item) => (
            <button
              key={item}
              onClick={() => setMedia(item)}
              className={`px-4 py-1 rounded-full transition-colors duration-200 ${
                media === item ? "bg-blue-500 text-white" : "text-gray-300"
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
              onClick={() => setTime(item)}
              className={`px-4 py-1 rounded-full transition-colors duration-200 ${
                time === item ? "bg-blue-500 text-white" : "text-gray-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <TrendingCard media={media} time={time} />
    </div>
  );
};

export default Trending;
