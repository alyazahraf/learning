import React from "react";

import Navbar from "../components/common/Navbar";
import Trending from "../components/app/Trending";
import TopRatedCard from "../components/card/TopRatedCard";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div>
        <Trending />
      </div>
      {/* <div>
        <TopRatedCard/>
      </div> */}
    </div>
  );
};

export default Home;
