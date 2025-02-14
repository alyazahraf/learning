import React from "react";
import DiscoverMovies from "../components/card/movie/DiscoverMovies";
import Navbar from "../components/common/Navbar";
import NowPlaying from "../components/card/movie/NowPlaying";
import UpcomingMovie from "../components/card/movie/UpcomingMovies";
import PopularMovie from "../components/card/movie/PopularMovies";
import TopRatedCard from "../components/card/Home/TopRatedCard";

const Movies = () => {
  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <div className="flex gap-4 my-4 flex-col text-white rounded-lg w-full overflow-hidden pt-20 ">
        <h1>Discover Movie</h1>
        <div>
          <DiscoverMovies />
        </div>
        <div>
          <NowPlaying />
      </div>
      <div>
        <UpcomingMovie />
      </div>
      <div>
        <PopularMovie />
      </div>
      <div>
        <TopRatedCard />
      </div>
      </div>
    </div>
  );
};

export default Movies;
