import React from "react";

import Navbar from "../components/common/Navbar";
import Trending from "../components/card/Trending";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div>
        <Trending />
      </div>
    </div>
  );
};

export default Home;
