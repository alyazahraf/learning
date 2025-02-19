import Navbar from "../components/common/Navbar";
import Trending from "../components/app/Trending";
import TopRatedCard from "../components/card/home/TopRatedCard";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Trending />
      </div>
      <div>
        <TopRatedCard />
      </div>
    </div>
  );
};

export default Home;
