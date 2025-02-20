import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieTrailer } from "../../../API/index";

const Teaser = () => {
  const [isTrailer, setIsTrailer] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await getMovieTrailer(id);
      setIsTrailer(response || []);
    };
    fetchTrailer();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Teaser</h1>
      {isTrailer?.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
          {isTrailer?.slice(0, 5).map((video) => (
            <iframe
              key={video?.id}
              src={`https://www.youtube.com/embed/${video.key}`}
              className="w-full aspect-video rounded-2xl"
              title={video?.name}
              allowFullScreen
            ></iframe>
          ))}
          {isTrailer?.length > 5 && (
            <div className="mt-6 text-center">
              <Link
                to={`/details/${id}/videos`}
                className="text-blue-500 hover:underline font-semibold"
              >
                View all videos →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p className="text-white text-center italic">
          No teaser available for this movie.
        </p>
      )}
    </div>
  );
};

export default Teaser;
