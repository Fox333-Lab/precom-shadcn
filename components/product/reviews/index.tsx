import { signIn, useSession } from "next-auth/react";
import ReactStars from "react-rating-star-with-type";
import AddReview from "./addreview";
import ReviewTable from "./reviewtable";
import { useState } from "react";

const Reviews = ({ product }: any) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(product.reviews);
  //   console.log("review session", session);
  return (
    <div className="mt-10 w-full">
      <div>
        <h1>Customer Reviews ({product.reviews.length})</h1>
        <div className="w-full">
          <div className="stats_overviews flex justify-between">
            {/* <span>Average Rating</span> */}
            <div className="stats_overview_rating flex items-center gap-1">
              <ReactStars value={product.rating} size={24} isEdit={false} />
              <span className="font-medium">
                {product.rating == 0 ? "no reviews yet" : ""}
              </span>
            </div>
            <div className="stats_reviews_perc">
              <div className="stats_stars">
                {product.ratings.map((rating: any, i: number) => (
                  <div className="flex items-center gap-3" key={i}>
                    <div className="stats_reviews_review">
                      <ReactStars value={5 - i} size={24} isEdit={false} />
                    </div>
                    <div className="stats_bar flex items-center gap-2">
                      <div className="bar">
                        <progress
                          className="progress progress-primary w-56"
                          value={rating.percentage}
                          max="100"
                        ></progress>
                      </div>
                      <span>{rating.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {session ? (
            <AddReview product={product} setReviews={setReviews} />
          ) : (
            <button className="btn btn-wide" onClick={() => signIn()}>
              Log in to add review
            </button>
          )}
          <ReviewTable
            reviews={reviews}
            allSizes={product.allSizes}
            colors={product.colors}
          />
        </div>
      </div>
    </div>
  );
};
export default Reviews;
