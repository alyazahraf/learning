import React from "react";
import Navbar from "../components/common/Navbar";
import DiscoverTV from "../components/card/tv/DiscoverTV";
import OnAir from "../components/card/tv/OnAir";
import AiringToday from "../components/card/tv/AiringToday";
import PopularTV from "../components/card/tv/PopularTV";
import TopRatedTV from "../components/card/tv/TopRatedTV";

const TvShow = () => {
  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <div className="flex gap-4 my-4 flex-col text-white rounded-lg w-full overflow-hidden pt-20 ">
        <h1>Discover TV</h1>
        <div>
          <DiscoverTV />
        </div>
        <div>
          <OnAir />
        </div>
        <div>
          <AiringToday />
        </div>
        <div>
            <PopularTV />
            </div>
            <div>
                <TopRatedTV />
            </div>
      </div>
    </div>
  );
};

export default TvShow;
