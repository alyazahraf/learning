import Header from "../../components/common/Header";
import SubNavbar from "../../components/common/SubNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { photosMovie } from "../../API";
import noImage from "../../assets/no-img.jpg";

const LogoMovie = () => {
  const params = useParams();
  const [logo, setLogo] = useState();

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await photosMovie(params.id);
      setLogo(response.logos);
    };
    fetchPhotos();
  }, []);
  return (
    <div>
      <Header />
      <SubNavbar params={params} />
      <div className="pt-5">
        <h1>Logos</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {logo?.map((photo) => (
              <div key={photo?.file_path} className="relative">
                <img
                  src={
                    photo?.file_path
                      ? `https://image.tmdb.org/t/p/original${photo.file_path}`
                      : noImage
                  }
                  alt={photo?.file_path}
                  className="w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogoMovie;
