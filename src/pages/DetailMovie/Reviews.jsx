import Header from "../../components/common/Header";
import SubNavbar from "../../components/common/SubNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { reviewMovie } from "../../API/index";
import { FaStar } from "react-icons/fa";

const ReviewsPage = () => {
  const params = useParams();
  const [review, setReview] = useState();

  useEffect(() => {
    const fetchReview = async () => {
      const response = await reviewMovie(params.id);
      setReview(response);
    };
    fetchReview();
  }, []);
  return (
    <div>
      <Header />
      <SubNavbar params={params} />
      <div className="pt-5">
        <h1>Reviews</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {review?.map((rev) => (
              <div
                key={rev.id}
                className="border p-4 rounded-lg bg-gray-800 text-white"
              >
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: rev?.author_details?.rating || 0 }).map(
                    (_, i) => (
                      <FaStar
                        key={i}
                        className="text-yellow-500 w-5 h-5 fill-yellow-500"
                      />
                    )
                  )}
                </div>

                <p className="italic line-clamp-3">{rev?.content}</p>

                <p className="text-sm text-gray-400 mt-2">by {rev?.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewsPage;
