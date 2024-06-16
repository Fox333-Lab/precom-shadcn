import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

const ReviewImages = ({ images, setReviewImages }: any) => {
  const [error, setError] = useState("");
  const handleImages = (e: any) => {
    let files = Array.from(e.target.files);
    console.log("img files : ", files);
    console.log("img files : images.length :", images.length);
    files.forEach((img: any, i: number) => {
      console.log("file foreach : ", i);
      if (images.length == 3 || i > 2) {
        console.log("Max 3 images allowed");
        setError("Max 3 images allowed");
        // files.splice(3);
        return;
      }
      if (
        img.type !== "image/png" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/jpg"
      ) {
        setError(
          "All or one of the file has unsupported format, only .png/.jpg/.jpeg is allowed"
        );
        files = files.filter((item: any) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError("Max image size allowed is 5mb");
        files = files.filter((item: any) => item.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e: any) => {
          setReviewImages((images: any) => [...images, e.target.result]);
        };
      }
    });
  };
  const removeImage = (image: any) => {
    setReviewImages((images: any) =>
      images.filter((img: any) => img !== image)
    );
    if (images.length <= 3) {
      setError("");
    }
  };
  return (
    <div className="mt-2">
      Review images yo
      <div className="flex items-center bg-grey-lighter gap-2">
        <label className="w-28 flex flex-col items-center py-3 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-300 hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          {/* <span className="mt-2 text-sm leading-normal">Select a file</span> */}
          <input
            type="file"
            className="hidden"
            onChange={handleImages}
            multiple
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>
        {error && <div className="text-red-600">{error}</div>}
      </div>
      <div className="flex mt-5 gap-3">
        {images.length > 0 &&
          images.map((img: any, i: number) => {
            return (
              <span key={i} className="relative">
                <Button
                  onClick={() => removeImage(img)}
                  className="absolute -right-2 -top-2 cursor-pointer"
                >
                  <X size={20} color="red" />
                </Button>

                <img src={img} alt="" className="w-16 h-16 rounded-md" />
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default ReviewImages;
