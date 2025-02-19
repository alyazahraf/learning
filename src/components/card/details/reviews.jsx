import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { reviewMovie } from "../../../API/index";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const [review, setReview] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      const response = await reviewMovie(id);
      setReview(response || []);
    };
    fetchReview();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {review.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
          {review.slice(0, 5).map((reviewItem) => (
            <div
              key={reviewItem.id}
              className="border p-4 rounded-lg bg-gray-800 text-white"
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({
                  length: reviewItem?.author_details?.rating || 0,
                }).map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-500 w-5 h-5 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="italic line-clamp-3">{reviewItem?.content}</p>

              <p className="text-sm text-gray-400 mt-2">
                by {reviewItem?.author}
              </p>
            </div>
          ))}
          {review.length > 5 && (
            <div className="mt-6 text-center">
              <Link
                to={`/details/${id}/reviews`}
                className="text-blue-500 hover:underline font-semibold"
              >
                View all reviews →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p className="text-white text-center italic">
          No reviews available for this movie.
        </p>
      )}
    </div>
  );
};

export default Reviews;
