import { getMovieDetails } from "../../API/index";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaArrowLeft } from "react-icons/fa";

const Header = () => {
  const [details, setDetails] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getMovieDetails(params.id);
      setDetails(response.data);
    };
    fetchDetails();
  }, []);
  return (
    <div className="flex gap-4 flex-col text-white rounded-lg w-full overflow-hidden pt-20 ">
      <Navbar />
      <div className="flex flex-row gap-10 p-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
          alt={details?.title}
          className="rounded-lg object-cover w-36"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl lg:text-4xl font-bold">{details?.title}</h1>
          <div className="flex gap-2 items-center">
            <a
              href={`/details/${details?.id}`} // Perbaikan di sini
              className="flex gap-2 items-center text-white hover:underline"
            >
              <FaArrowLeft className="text-xl" />
              <p>Back to Main</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
