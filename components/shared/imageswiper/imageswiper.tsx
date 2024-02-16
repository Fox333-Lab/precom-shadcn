"use client";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import "./imageswiper.module.css";
import { IImage } from "@/types/db/product";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const ImageSwiper = ({ images }: { images: IImage[] }) => {
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    swiperRef?.current?.swiper.autoplay.stop();
  }, [swiperRef]);
  return (
    <Card
      // className="flex overflow-hidden border-none h-full"
      className="h-auto overflow-hidden bg-gray-100 border-none shadow-none"
      onMouseEnter={() => {
        swiperRef?.current?.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef?.current?.swiper.autoplay.stop();
        swiperRef?.current?.swiper.slideTo(0);
      }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        // pagination={true}
        modules={[Autoplay, Pagination]}
      >
        {images.map((image: IImage, i: number) => (
          <SwiperSlide key={i} className="">
            <img
              src={image.url.toString()}
              alt="image"
              // className="object-cover w-full h-full"
              className="w-1/2 h-auto inset-0 box-border border-none mx-auto"
            />
            {/* <Image
              src={image.url.toString()}
              alt="Bold typography"
              fill
              className="object-cover w-full h-auto"
              sizes="100vw"
            /> */}
            {/* <div
              className="simg"
              style={{ backgroundImage: `URL(${image.url})` }}
            ></div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

export default ImageSwiper;
