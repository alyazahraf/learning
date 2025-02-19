import { getMovieDetails, socialMediaMovie } from "../../../API/index";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const DetailCard = () => {
  const [details, setDetails] = useState();
  const [social, setSocial] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getMovieDetails(params.id);
      setDetails(response.data);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchSocial = async () => {
      const response = await socialMediaMovie(params.id);
      setSocial(response);
    };
    fetchSocial();
  }, []);

  return (
    <div>
      <h1>Details</h1>
      <div className="text-white flex flex-col gap-5">
        {details && (
          <div className="grid grid-cols-2 gap-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-2">
                <h2>Status</h2>
                <p>{details?.status}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2>Original Language</h2>
                <p>{details?.spoken_languages[0]?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2>Budget</h2>
                <p>
                  {details?.budget
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(details.budget)
                    : "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2>Revenue</h2>
                <p>
                  {details?.revenue
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(details.revenue)
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Social</h2>
              {social?.facebook_id ||
              social?.instagram_id ||
              social?.twitter_id ? (
                <div className="flex gap-5">
                  {social?.facebook_id && (
                    <a
                      href={`https://www.facebook.com/${social.facebook_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="w-6 h-6" />
                    </a>
                  )}
                  {social?.instagram_id && (
                    <a
                      href={`https://www.instagram.com/${social.instagram_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="w-6 h-6" />
                    </a>
                  )}
                  {social?.twitter_id && (
                    <a
                      href={`https://twitter.com/${social.twitter_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  )}
                </div>
              ) : (
                <p className="italic">No social media information available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailCard;
