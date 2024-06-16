import { Para } from "@/components/ui/textui";
import { ThumbsUp } from "lucide-react";
import ReactStars from "react-rating-star-with-type";
const ReviewCard = ({ review }: any) => {
  const { name, image } = review.reviewBy;
  return (
    <div className="border p-3 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img src={image} alt="" className="w-8 h-8 rounded-full" />
        <div className="">
          <h4 className="p-0 m-0">
            {name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}
          </h4>
          <ReactStars value={review.rating} size={24} isEdit={false} />
        </div>
      </div>
      <div className="flex gap-3">
        <div>
          <span>Overall Fit : </span>
          <b>{review.fit}</b>
        </div>
        <div>
          <span>Size : </span>
          <b>{review.size}</b>
        </div>
      </div>
      <div>
        <img src={review.style.image} alt="" className="w-20" />
      </div>
      <Para>{review.review}</Para>
      <div>
        {review.images.length > 0 &&
          review.images.map((img: any, i: number) => (
            <img src={img?.url} alt="" key={i} />
          ))}
      </div>
      <div className="flex justify-between">
        <span>{review?.updatedAt?.slice(0, 10)}</span>
        <span className="flex items-center gap-1">
          <ThumbsUp />
          <span>{review.likes && review.likes?.likes}</span>
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
