import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./productdetailswiper.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { IImage } from "@/types/db/product";
const ProductDetailSwiper = ({ images }: { images: IImage[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="w-full mx-auto">
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        style={{ height: "350px" }}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images &&
          images.map((image: IImage, i: number) => (
            <SwiperSlide key={i} className="">
              <div className="border w-full h-full bg-gray-50 rounded-lg overflow-hidden">
                <img src={image.url.toString()} alt="image" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images &&
          images.map((image: IImage, i: number) => (
            <SwiperSlide key={i}>
              {/* <AspectRatio ratio={1 / 1} className=""> */}
              <img src={image.url.toString()} alt="image" />
              {/* </AspectRatio> */}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductDetailSwiper;
