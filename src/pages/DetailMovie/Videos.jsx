import Header from "../../components/common/Header";
import SubNavbar from "../../components/common/SubNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "../../API";

const VideosMovie = () => {
  const params = useParams();
  const [video, setVideo] = useState();

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await getMovieTrailer(params.id);
      setVideo(response);
      console.log(response);
    };
    fetchVideo();
  }, []);
  return (
    <div>
      <Header />
      <SubNavbar params={params} />
      <div className="pt-5">
        <h1>Videos</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {video?.map((videos) => (
              <div key={videos?.file_path} className="relative">
                <iframe
                  key={videos?.id}
                  src={`https://www.youtube.com/embed/${videos?.key}`}
                  className="w-full aspect-video rounded-2xl"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideosMovie;
