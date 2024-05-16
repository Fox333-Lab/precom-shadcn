import React, { useState } from "react";
import Select from "./select";
import ReactStars from "react-rating-star-with-type";
import ReviewImages from "./reviewimages";
import { Button } from "@/components/ui/button";
import { dataURLtoBlob } from "@/lib/utils";
import axios from "axios";

const AddReview = ({ product, setReviews }: any) => {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);
  let fits = ["small", "true to size", "large"];
  let uploaded_images: any = [];
  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    if (!style) {
      alert("Please select a style");
      return;
    }
    if (!fit) {
      alert("Please select a fit");
      return;
    }
    if (!rating) {
      alert("Please select a rating");
      return;
    }
    if (!review) {
      alert("Please add review");
      return;
    }
    if (reviewImages.length > 0) {
      let temp = reviewImages.map((img: any) => {
        return dataURLtoBlob(img);
      });
      const path = "review images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((img: any) => {
        formData.append("file", img);
      });
      uploaded_images = await uploadImages(formData);
    }
    let reviewPayload = {
      size,
      style,
      fit,
      rating,
      review,
      images: uploaded_images,
    };
    const { data } = await axios.put(
      `/api/products/id/${product._id}/reviews`,
      reviewPayload
    );
    setReviews(data.reviews);
    setSize("");
    setStyle("");
    setFit("");
    setRating(0);
    setReview("");
    setReviewImages([]);
  };
  // this function is present at other places try to make it generic
  const uploadImages = async (formData: FormData) => {
    const { data } = await axios.post("/api/cloudinary/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  };

  return (
    <div>
      <div className="flex">
        <Select
          property={size}
          text="Size"
          data={product.allSizes.filter((x: any) => x.size !== size)}
          handleChange={setSize}
        />
        <Select
          property={style}
          text="Style"
          data={product.colors.filter((x: any) => x !== style)}
          handleChange={setStyle}
        />
        <Select
          property={fit}
          text="Fit"
          data={fits.filter((x) => x !== fit)}
          handleChange={setFit}
        />
      </div>
      <ReviewImages images={reviewImages} setReviewImages={setReviewImages} />
      <textarea
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="write your review here"
        className="border ml-1 mt-5 w-full h-28 p-2 rounded-md"
      ></textarea>
      <ReactStars
        value={rating}
        size={24}
        isEdit={true}
        isHalf={true}
        onChange={ratingChanged}
      />
      <Button className="mt-4" size="full" onClick={() => handleSubmit()}>
        Submit Review
      </Button>
    </div>
  );
};

export default AddReview;
