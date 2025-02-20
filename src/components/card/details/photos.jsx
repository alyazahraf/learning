import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { photosMovie } from "../../../API/index";
import noImage from "../../../assets/no-img.jpg";

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
      <h1 className="text-2xl font-bold">Photos</h1>
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
          {photos?.slice(0, 5).map((photo, index) => (
            <img
              key={photo?.file_path}
              src={
                photo?.file_path
                  ? `https://image.tmdb.org/t/p/w500${photo.file_path}`
                  : noImage
              }
              alt={`Movie scene ${index + 1}`}
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
