import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { photosMovie } from "../../../API/index";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await photosMovie(id);
      setPhotos(response?.backdrops || []);
    };
    fetchPhotos();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Photos</h1>
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
          {photos.slice(0, 5).map((photo) => (
            <img
              key={photo.file_path}
              src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
              alt="Movie scene"
              className="w-full rounded-2xl"
            />
          ))}
          {photos.length > 5 && (
            <div className="mt-6 text-center">
              <Link
                to={`/details/${id}/backdrops`}
                className="text-blue-500 hover:underline font-semibold"
              >
                View all photos →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p className="text-white text-center italic">
          No photos available for this movie.
        </p>
      )}
    </div>
  );
};

export default Photos;
