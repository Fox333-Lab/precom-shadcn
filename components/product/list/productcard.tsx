"use client";
import { cn } from "@/lib/utils";
import ImageSwiper from "@/components/shared/imageswiper/imageswiper";
import IProduct, { IImage } from "@/types/db/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H2, H3, H4, H5, H6, Para } from "@/components/ui/textui";

const ProductCard = ({ product }: { product: IProduct }) => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((size) => {
        return size.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  const [styless, setStyless] = useState(
    product.subProducts.map((sp) => {
      return sp.color;
    })
  );

  console.log("product card prices : ", prices);
  console.log("product card active : ", active);
  console.log("product card images : ", images);
  console.log("product styless : ", styless);
  console.log(product.subProducts[active]?.sizes[0]?.price);

  console.log("pid : ", product.name);
  useEffect(() => {
    setImages(product.subProducts[active]?.images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((size) => {
          return size.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active]);
  return (
    <>
      {/* <Card className="p-1.5 w-full border-none shadow-none">
        <div className="flex flex-col gap-4">
          <div className="h-48">
            <Link href={`/products/details/${product.slug}?style=${active}`}>
              <ImageSwiper images={images as unknown as IImage[]} />
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <H4>
              <Link
                href={`/products/details/${product.slug}?style=${active}`}
                className="line-clamp-1"
              >
                {product.name}
              </Link>
            </H4>
            <p className="text-muted-foreground line-clamp-1">
              {product.description}
            </p>
          </div>
          <div>
            <H6>
              {prices.length === 1
                ? `USD ${prices[0]}$`
                : `USD ${prices[0]} - ${prices[prices.length - 1]}$`}
            </H6>
          </div>
          <div className="flex gap-3">
            {styless &&
              styless.map((cstyle: any, i) => {
                if (cstyle.image) {
                  return (
                    <div
                      key={i}
                      className={cn("rounded-full w-6 h-6 overflow-hidden", {
                        "outline outline-2 outline-orange-400": i == active,
                      })}
                    >
                      <img
                        id={`img${i}`}
                        src={cstyle.image}
                        className="h-6 w-6 object-cover rounded-full"
                        onMouseOver={() => {
                          setImages(product.subProducts[i].images);
                          setActive(i);
                        }}
                        alt=""
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      id={`span${i}`}
                      style={{
                        backgroundColor: `${cstyle.color}`,
                      }}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                      key={i}
                      className={`w-6 h-6 rounded-full overflow-hidden ${
                        i == active && `outline outline-2 outline-orange-400`
                      }`}
                    ></div>
                  );
                }
              })}
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" className="rounded-full">
              <ShoppingCart size={20} />
            </Button>
            <Button
              className="transition ease-linear duration-500"
              variant="outline"
            >
              Buy
            </Button>
          </div>
        </div>
      </Card> */}
      <Card className="group box-border overflow-hidden flex cursor-pointer flex-col gap-4 border-none shadow-none">
        {/* <Card className="h-auto overflow-hidden bg-gray-100 border-none shadow-none"> */}
        {/* <img
            //   src="https://picsum.photos/id/1/200/300"
            src="/images/gabchanelHD.png"
            alt="Photo by Drew Beamer"
            className="w-1/2 h-auto inset-0 box-border border-none mx-auto"
          /> */}
        <Link href={`/products/details/${product.slug}?style=${active}`}>
          <ImageSwiper images={images as unknown as IImage[]} />
        </Link>
        {/* </Card> */}
        <div className="flex flex-col gap-4 px-2">
          <div className="flex flex-col gap-1">
            <H2 className="text-sm md:text-base lg:text-lg xl:text-xl">
              {product.name}
            </H2>
            <Para className="line-clamp-1 text-sm md:text-base text-muted-foreground">
              {product.description}
            </Para>
          </div>
          <div className="flex gap-3">
            {styless &&
              styless.map((cstyle: any, i) => {
                if (cstyle.image) {
                  return (
                    <div
                      key={i}
                      className={cn("rounded-full w-6 h-6 overflow-hidden", {
                        "outline outline-2 outline-orange-400": i == active,
                      })}
                    >
                      <img
                        id={`img${i}`}
                        src={cstyle.image}
                        className="h-6 w-6 object-cover rounded-full"
                        onMouseOver={() => {
                          setImages(product.subProducts[i].images);
                          setActive(i);
                        }}
                        alt=""
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      id={`span${i}`}
                      style={{
                        backgroundColor: `${cstyle.color}`,
                      }}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                      key={i}
                      className={`w-6 h-6 rounded-full overflow-hidden ${
                        i == active && `outline outline-2 outline-orange-400`
                      }`}
                    ></div>
                  );
                }
              })}
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <H3 className="text-sm md:text-base">
              {prices.length === 1
                ? `USD ${prices[0]}$`
                : `USD ${prices[0]} - ${prices[prices.length - 1]}$`}
            </H3>
          </div>
        </div>
        <CardFooter className="flex justify-between items-center p-0">
          <Button variant="outline" className="rounded-full">
            <ShoppingCart size={20} />
          </Button>
          <Button
            className="transition ease-linear duration-500"
            variant="outline"
          >
            Buy
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
