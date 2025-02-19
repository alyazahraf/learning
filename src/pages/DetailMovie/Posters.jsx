import Header from "../../components/common/Header";
import SubNavbar from "../../components/common/SubNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { photosMovie } from "../../API";

const Posters = () => {
  const params = useParams();
  const [photos, setPhotos] = useState();

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await photosMovie(params.id);
      setPhotos(response.posters);
    };
    fetchPhotos();
  }, []);
  return (
    <div>
      <Header />
      <SubNavbar params={params} />
      <div className="pt-5">
        <h1>Posters</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos?.map((photo) => (
              <div key={photo.file_path} className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
                  alt={photo.file_path}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Posters;
